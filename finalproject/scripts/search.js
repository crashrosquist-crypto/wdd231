import { fetchPrompt, renderTrendingSnippet } from "./getAnime.js";

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('query');
const resultsContainer = document.querySelector('#anime-results-grid');
const statusMsg = document.querySelector('#search-status');

async function initSearchPage() {
    if (query) {
        if (statusMsg) statusMsg.textContent = `Searching for "${query}"...`;

        try {
            const data = await fetchPrompt(`https://api.jikan.moe/v4/anime?q=${query}`);
            
            if (data && data.data && data.data.length > 0) {
                if (statusMsg) statusMsg.textContent = `Found ${data.data.length} results.`;
                
                renderTrendingSnippet(data.data, resultsContainer);
            } else {
                if (statusMsg) statusMsg.textContent = "No anime found. Try a different search!";
            }
        } catch (error) {
            console.error("Search Page Error:", error);
            if (statusMsg) statusMsg.textContent = "API is busy. Please refresh.";
        }
    }
}

initSearchPage();