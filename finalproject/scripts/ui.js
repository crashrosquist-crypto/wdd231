export function createAnimeCard(anime, openModalCallback) {
    const card = document.createElement('section');
    card.className = 'anime-card';
    card.innerHTML = `
        <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" loading="lazy">
        <div class="card-content">
            <h3>${anime.title}</h3>
            <p><strong>Rating:</strong> ⭐ ${anime.score || 'N/A'}</p>
            <button class="btn view-details-btn">View Details</button>
        </div>
    `;

    card.querySelector('.view-details-btn').addEventListener('click', () => {
        openModalCallback(anime);
    });

    return card;
}

export function updateModal(anime, modalElement) {
    const content = modalElement.querySelector('#modal-content');
    content.innerHTML = `
        <h2>${anime.title}</h2>
        <p><strong>Episodes:</strong> ${anime.episodes || 'N/A'}</p>
        <p>${anime.synopsis || 'No synopsis available.'}</p>
    `;
    modalElement.showModal();
}