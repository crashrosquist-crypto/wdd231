import { fetchPrompt, renderTrendingSnippet, saveToMyList, openModal, initModalClosing } from "./getAnime.js";

// Helps me see the data
let allAnimeData = []; 

const menuButton = document.querySelector('#menu-button');
const navList = document.querySelector('#nav-list');
const heroContainer = document.querySelector("#hero-content");
const trendingGrid = document.querySelector('#anime-list');
const filterButtons = document.querySelectorAll(".filter-btn");

// Initializes the data
async function initHomePage() {
    try {
        const response = await fetchPrompt('https://api.jikan.moe/v4/top/anime?limit=15');
        if (response && response.data) {
            allAnimeData = response.data; //here is where I store globally
            renderHero(allAnimeData[0]);
            renderTrendingSnippet(allAnimeData, trendingGrid); 
        }
    } catch (error) {
        console.error("Initialization Error:", error);
    }
}



// RENDER HERO (Featured Anime)
function renderHero(anime) {
    if (!heroContainer) return;

    const genres = anime.genres ? anime.genres.map(g => g.name).slice(0, 3).join(', ') : 'N/A';
    // Get the first studio name if it exists
    const studio = anime.studios && anime.studios.length > 0 ? anime.studios[0].name : 'Unknown Studio';

    heroContainer.innerHTML = `
        <div class="hero-card">
            <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" loading="lazy">
            <div class="hero-info">
                <div class="hero-header-text">
                    <h3>${anime.title}</h3>
                    <div class="hero-meta">
                        <span class="score">⭐ ${anime.score || 'N/A'}</span> | 
                        <span>${anime.year || '2023'}</span> | 
                        <span>${genres}</span>
                    </div>
                    <p class="studio-tag"><strong>Studio:</strong> ${studio}</p>
                </div>

                <p class="hero-description">${anime.synopsis ? anime.synopsis.slice(0, 450) + '...' : 'No description available.'}</p>
                
                <div class="card-buttons">
                    <button class="btn save-btn" id="hero-save">Add to List</button>
                    <button class="btn detail-btn" id="hero-details">View Details</button>
                </div>
            </div>
        </div>
    `;

    document.querySelector("#hero-save").addEventListener("click", () => saveToMyList(anime));
    document.querySelector("#hero-details").addEventListener("click", () => openModal(anime));
}

// array method arrow function
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const genre = button.getAttribute("data-genre");
        
        // here is my .filter() method
        const filteredAnime = allAnimeData.filter(anime => {
            if (genre === "all") return true;
            return anime.genres.some(g => g.name === genre);
        });

        // rerender with the list here
        renderTrendingSnippet(filteredAnime, trendingGrid); 
    });
});

// NAVIGATION
if (menuButton && navList) {
    menuButton.addEventListener('click', () => {
        navList.classList.toggle('open');
        menuButton.innerHTML = navList.classList.contains('open') ? '&times;' : '&#9776;';
    });
}

initHomePage();
initModalClosing();