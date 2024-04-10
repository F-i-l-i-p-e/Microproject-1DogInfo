// Function to fetch data from the server
async function fetchData() {
    try {
        const searchInput = document.getElementById('searchInput').value;
        const sizeFilter = document.getElementById('sizeFilter').value;
        let url = '/dogs';
        if (searchInput || sizeFilter) {
            url += `?searchInput=${searchInput}&sizeFilter=${sizeFilter}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display fetched data
function displayData(data) {
    const dogCardsContainer = document.getElementById('dogCards');
    // Clear existing content
    dogCardsContainer.innerHTML = '';
    // Create a card for each dog in the JSON data
    data.forEach(dog => {
        const card = `
            <div class="col-md-6 mb-4">
                <div class="card">
                    <img src="${dog.image}" class="card-img-top dog-image" alt="${dog.name}">
                    <div class="card-body">
                        <h5 class="card-title">${dog.name}</h5>
                        <p class="card-text"><strong>Breed Group:</strong> ${dog.breed_group}</p>
                        <p class="card-text"><strong>Size:</strong> ${dog.size}</p>
                        <p class="card-text"><strong>Temperament:</strong> ${dog.temperament.join(', ')}</p>
                        <p class="card-text"><strong>Life Expectancy:</strong> ${dog.life_expectancy}</p>
                        <p class="card-text">${dog.description}</p>
                    </div>
                </div>
            </div>
        `;
        dogCardsContainer.innerHTML += card;
    });

    // Add event listeners to images for opening in larger view
    const dogImages = document.querySelectorAll('.dog-image');
    dogImages.forEach(image => {
        image.addEventListener('click', () => {
            image.classList.toggle('expanded');
        });
    });
}

// Event listener for the button to fetch data
document.getElementById('fetchDataBtn').addEventListener('click', fetchData);
