import { fetchPrompt, renderTrendingSnippet, initModalClosing, initHamburgerMenu } from "./getAnime.js";

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('query');
const resultsContainer = document.querySelector('#anime-results-grid');
const statusMsg = document.querySelector('#search-status');
const filterButtons = document.querySelectorAll(".filter-btn");

let searchResultsData = [];

// search.js

// 1. Select both elements
const formatFilter = document.querySelector('#filter-format');
const statusFilter = document.querySelector('#filter-status');

function setupFilters() {
    if (!formatFilter || !statusFilter) return;

    const applyFilters = () => {
        const selectedFormat = formatFilter.value;
        const selectedStatus = statusFilter.value;

        const filteredResults = searchResultsData.filter(anime => {
            // Check Format (matches 'tv', 'movie', etc. from Jikan API)
            const matchesFormat = selectedFormat === "all" || 
                                 anime.type.toLowerCase() === selectedFormat;

            // Check Status (matches 'airing' or 'complete')
            const matchesStatus = selectedStatus === "all" || 
                                 anime.status.toLowerCase().includes(selectedStatus.toLowerCase());

            return matchesFormat && matchesStatus;
        });

        renderTrendingSnippet(filteredResults, resultsContainer);
    };

    // 2. Attach listeners to both
    formatFilter.addEventListener("change", applyFilters);
    statusFilter.addEventListener("change", applyFilters);
}


async function initSearchPage() {
    if (query) {
        if (statusMsg) statusMsg.textContent = `Searching for "${query}"...`;

        try {
            const data = await fetchPrompt(`https://api.jikan.moe/v4/anime?q=${query}`);
            
            if (data && data.data && data.data.length > 0) {
                searchResultsData = data.data;
                if (statusMsg) statusMsg.textContent = `Found ${data.data.length} results.`;
                
                renderTrendingSnippet(searchResultsData, resultsContainer);
            } else {
                if (statusMsg) statusMsg.textContent = "No anime found. Try a different search!";
            }
        } catch (error) {
            console.error("Search Page Error:", error);
            if (statusMsg) statusMsg.textContent = "API is busy. Please refresh.";
        }
    }
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const genre = button.getAttribute("data-genre");
        
        const filteredResults = searchResultsData.filter(anime => {
            if (genre === "all") return true;
            return anime.genres.some(g => g.name === genre);
        });

        renderTrendingSnippet(filteredResults, resultsContainer); 
    });
});

initSearchPage();

document.addEventListener("click", (e) => {
    if (e.target.id === "close-modal" || e.target.closest("#close-modal")) {
        const modal = document.querySelector("#anime-modal");
        if (modal) {
            modal.close();
        }
    }
});

initModalClosing();
initHamburgerMenu();