import { fetchPrompt, renderTrendingSnippet } from "./getAnime.js";
import { saveToMyList, openModal } from "./getAnime.js";

const menuButton = document.querySelector('#menu-button');
const navList = document.querySelector('#nav-list');

if (menuButton && navList) {
    menuButton.addEventListener('click', () => {
        navList.classList.toggle('open');
        menuButton.innerHTML = navList.classList.contains('open') ? '&times;' : '&#9776;';
    });
}

const heroContainer = document.querySelector("#hero-content");
const trendingGrid = document.querySelector('#anime-list');

async function initHomePage() {
    if (!heroContainer) return;

    try {
        const response = await fetchPrompt('https://api.jikan.moe/v4/top/anime?limit=15');
        if (response && response.data) {
            renderHero(response.data[0]);
            renderTrendingSnippet(response.data, trendingGrid); 
        }
    } catch (error) {
        console.error("Initialization Error:", error);
    }
}

function renderHero(anime) {
    const heroContainer = document.querySelector("#hero-content");
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

initHomePage();