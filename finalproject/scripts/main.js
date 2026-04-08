import { fetchPrompt, renderTrendingSnippet, saveToMyList, openModal, initModalClosing } from "./getAnime.js";

// GLOBAL STATE - This lets the filter buttons "see" the data
let allAnimeData = []; 

const menuButton = document.querySelector('#menu-button');
const navList = document.querySelector('#nav-list');
const heroContainer = document.querySelector("#hero-content");
const trendingGrid = document.querySelector('#anime-list');
const filterButtons = document.querySelectorAll(".filter-btn");

// INITIALIZATION
async function initHomePage() {
    try {
        const response = await fetchPrompt('https://api.jikan.moe/v4/top/anime?limit=15');
        if (response && response.data) {
            allAnimeData = response.data; // Store it globally for filters
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

    heroContainer.innerHTML = `
        <div class="hero-card">
            <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" loading="lazy">
            <div class="hero-info">
                <h3>${anime.title}</h3>
                <p>${anime.synopsis ? anime.synopsis.slice(0, 150) + '...' : 'No description available.'}</p>
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

// FILTER LOGIC (Array Methods Requirement)
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const genre = button.getAttribute("data-genre");
        
        // Use the .filter() method as required by the rubric
        const filteredAnime = allAnimeData.filter(anime => {
            if (genre === "all") return true;
            return anime.genres.some(g => g.name === genre);
        });

        // Re-render the grid with the filtered list
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