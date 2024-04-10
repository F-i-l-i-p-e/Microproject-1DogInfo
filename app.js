// Import required modules
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the style directory
app.use('/style', express.static(path.join(__dirname, 'style')));

// Serve static files from the root directory
app.use(express.static(__dirname));

// Define routes for the welcome, about, and contact pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Route to serve JSON data
app.get('/dogs', async (req, res) => {
  try {
    const fetch = await import('node-fetch'); // Use dynamic import
    const response = await fetch.default('https://raw.githubusercontent.com/F-i-l-i-p-e/Microproject-1DogInfo/main/data/data.json');
    const jsonData = await response.json();

    // Get search parameters from query string
    const { searchInput, sizeFilter } = req.query;

    // Filter data based on search parameters
    let filteredData = jsonData;
    if (searchInput) {
      filteredData = filteredData.filter(dog => dog.name.toLowerCase().includes(searchInput.toLowerCase()));
    }
    if (sizeFilter) {
      filteredData = filteredData.filter(dog => dog.size === sizeFilter);
    }

    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
