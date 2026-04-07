const listGrid = document.querySelector("#mylist-grid");
const listCountLabel = document.querySelector("#list-count");
const clearBtn = document.querySelector("#clear-list");

function displayMyList() {
    const savedAnime = JSON.parse(localStorage.getItem('animeHutList')) || [];

    if (listCountLabel) {
        listCountLabel.textContent = `You have ${savedAnime.length} items in your list.`;
    }

    if (!listGrid) return;
    listGrid.innerHTML = "";

    if (savedAnime.length === 0) {
        listGrid.innerHTML = "<p>Your list is currently empty. Go to the <a href='search.html'>Search page</a> to add some!</p>";
        return;
    }

    savedAnime.forEach(anime => {
        const card = document.createElement("div");
        card.className = "anime-card";
        card.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}" loading="lazy">
            <div class="card-content">
                <h4>${anime.title}</h4>
                <p>Rating: ⭐ ${anime.score || 'N/A'}</p>
                <div class="card-buttons">
                    <button class="btn remove-btn" data-id="${anime.mal_id}">Remove</button>
                    <button class="btn detail-btn">Details</button>
                </div>
            </div>
        `;

        card.querySelector('.remove-btn').addEventListener('click', () => {
            removeAnime(anime.mal_id);
        });

        listGrid.appendChild(card);
    });
}

function removeAnime(id) {
    let myList = JSON.parse(localStorage.getItem('animeHutList')) || [];
    myList = myList.filter(item => item.mal_id != id);
    localStorage.setItem('animeHutList', JSON.stringify(myList));
    displayMyList(); 
}

if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear your entire list?")) {
            localStorage.removeItem('animeHutList');
            displayMyList();
        }
    });
}

displayMyList();