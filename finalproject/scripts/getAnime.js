export function openModal(anime) {
    const modal = document.querySelector("#anime-modal");
    const details = document.querySelector("#modal-details");
    const closeBtn = document.querySelector("#close-modal");

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.close();
        });
    }

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

    const modal = document.querySelector("#anime-modal");
    const details = document.querySelector("#modal-details");

    if (!exists) {
        myList.push(anime);
        localStorage.setItem('animeHutList', JSON.stringify(myList));
        
        details.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
                <h2 style="color: var(--secondary-color); border: none; padding: 0;">Success!</h2>
                <p><strong>${anime.title}</strong> has been added to your list.</p>
                <button class="btn save-btn" style="margin-top: 20px; width: 100%; max-width: 200px;" onclick="document.querySelector('#anime-modal').close()">Got it!</button>
            </div>
        `;
    } else {
        details.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
                <h2 style="color: var(--primary-color); border: none; padding: 0;">Already Added</h2>
                <p><strong>${anime.title}</strong> is already in your collection.</p>
                <button class="btn detail-btn" style="margin-top: 20px; width: 100%; max-width: 200px;" onclick="document.querySelector('#anime-modal').close()">Close</button>
            </div>
        `;
    }
    
    modal.showModal();
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

export function initModalClosing() {
    document.addEventListener("click", (e) => {
        if (e.target.id === "close-modal" || e.target.id === "anime-modal") {
            const modal = document.querySelector("#anime-modal");
            if (modal) modal.close();
        }
    });
}

export function initHamburgerMenu() {
    const menuButton = document.querySelector('#menu-button');
    const navList = document.querySelector('#nav-list');

    if (menuButton && navList) {
        menuButton.addEventListener('click', () => {
            navList.classList.toggle('open');
            // Swaps between hamburger icon and "X"
            menuButton.innerHTML = navList.classList.contains('open') ? '&times;' : '&#9776;';
        });
    }
}