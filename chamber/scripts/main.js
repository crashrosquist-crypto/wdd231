import { fetchWeather } from "./chamber-weather.js";


const weatherSection = document.querySelector('#weather');
if (weatherSection) {
    fetchWeather();
}


const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

if (navButton) {
    navButton.addEventListener('click', () => {
        navButton.classList.toggle('show');
        navBar.classList.toggle('show');
    });
}


const yearSpan = document.querySelector('#currentyear');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const lastMod = document.querySelector('#lastModified');
if (lastMod) lastMod.textContent = `Last Modification: ${document.lastModified}`;




const membersURL = "data/members.json";

async function getSpotlights() {
    const spotlightContainer = document.querySelector('.spotlight-cards');
    if (!spotlightContainer) return; 

    try {
        const response = await fetch("data/members.json"); 
        const data = await response.json();

        const eligibleMembers = data.filter(m => m.membershipLevel === 3 || m.membershipLevel === 2);

        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        spotlightContainer.innerHTML = ""; 

        
        selected.forEach(member => {
            const isGold = member.membershipLevel === 3;
            const statusClass = isGold ? 'gold-status' : 'silver-status';
            const statusText = isGold ? 'Gold Member' : 'Silver Member';
            const card = document.createElement('section');
            card.className = "spotlight-card";
            card.innerHTML = `
                <h3>${member.name}</h3>
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
                <hr>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <a href="${member.website}" target="_blank">Official Website</a>
                <p class="membership-label ${statusClass}">${statusText}</p>
            `;
            spotlightContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Spotlight fetch error:", error);
    }
}
getSpotlights();