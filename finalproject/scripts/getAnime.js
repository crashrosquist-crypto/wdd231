export function openModal(anime) {
    const modal = document.querySelector("#anime-modal");
    const details = document.querySelector("#modal-details");
    const closeBtn = document.querySelector("#close-modal");

    if (!modal || !details) return;
    details.innerHTML = `
        <h2>${anime.title}</h2>
        <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
        <p><strong>Episodes:</strong> ${anime.episodes || 'N/A'}</p>
        <p><strong>Status:</strong> ${anime.status}</p>
        <p><strong>Synopsis:</strong> ${anime.synopsis || 'No description available.'}</p>
    `;

    modal.showModal();

    closeBtn.addEventListener("click", () => {
        modal.close();
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.close();
    });
}
export function saveToMyList(anime) {
    let myList = JSON.parse(localStorage.getItem('animeHutList')) || [];
    const exists = myList.find(item => item.mal_id === anime.mal_id);

    if (!exists) {
        myList.push(anime);
        localStorage.setItem('animeHutList', JSON.stringify(myList));
        alert(`${anime.title} added to your list!`);
    } else {
        alert("This anime is already in your list.");
    }
}

export async function fetchPrompt(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch from Jikan API");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Logic Error:", error);
        return null;
    }
}

export function renderTrendingSnippet(animeList, container) {
    if (!container) return;
    container.innerHTML = "";

    animeList.forEach(anime => {
        const card = document.createElement("div");
        card.className = "anime-card";

        card.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}" loading="lazy">
            <div class="card-content">
                <h4>${anime.title}</h4>
                <p>Rating: ⭐ ${anime.score || 'N/A'}</p>
                <p>Type: ${anime.type || 'N/A'}</p>
                <div class="card-buttons">
                    <button class="btn save-btn">Add to List</button>
                    <button class="btn detail-btn">View Details</button>
                </div>
            </div>
        `;

        const saveBtn = card.querySelector('.save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => saveToMyList(anime));
        }

        const detailBtn = card.querySelector('.detail-btn');
        if (detailBtn) {
            detailBtn.addEventListener('click', () => {
                openModal(anime);
            });
        }

        container.appendChild(card);
    });
}