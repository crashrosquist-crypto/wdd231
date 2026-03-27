console.log("Join script is loaded!");

const timestampInput = document.getElementById('timestamp');
if (timestampInput) {
    timestampInput.value = new Date().toISOString();
}

const memberships = [
    { id: "np", title: "Non-Profit", level: "NP Membership", fee: "Free"},
    { id: "bronze", title: "Bronze", level: "Bronze Membership", fee: "$50/mo" },
    { id: "silver", title: "Silver", level: "Silver Membership", fee: "$100/mo" },
    { id: "gold", title: "Gold", level: "Gold Membership", fee: "$200/mo" }
];

const cardsContainer = document.querySelector('.membership-cards');

function displayCards(levels) {
    cardsContainer.innerHTML = "";
    levels.forEach(level => {
        const card = document.createElement("section");
        card.classList.add("membership-card");

        card.innerHTML = `
            <h3>${level.title}</h3>
            <p>${level.level}</p>
            <button class="open-button" data-modal="${level.id}">Learn More</button>
        `;

        cardsContainer.appendChild(card);
    });
}

displayCards(memberships);

cardsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('open-button')) {
        const modalId = e.target.getAttribute('data-modal');
        const modal = document.getElementById(`${modalId}-modal`);
        if (modal) {
            modal.showModal();
        }
    }
});