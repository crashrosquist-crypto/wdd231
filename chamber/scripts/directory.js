const url = "data/members.json";
const cards = document.querySelector("#members-container");

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

const displayMembers = (members) => {
    cards.innerHTML = "";

    members.forEach((member, index) => {
        let card = document.createElement("section");

        const loadingStrategy = index < 3 ? "eager" : "lazy";

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo"
            loading="${loadingStrategy}" width="400" height="299">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p class="membership-level">Level: ${member.membershipLevel}</p>
        `;

        cards.appendChild(card);
    });
}

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

gridbutton.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});

listbutton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});

getMemberData();

document.querySelector("#currentYear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#nav-button');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
})