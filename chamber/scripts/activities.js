import { places } from './places.js';

const yearSpan = document.querySelector('#currentyear');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const lastMod = document.querySelector('#lastModified');
if (lastMod) lastMod.textContent = `Last Modification: ${document.lastModified}`;

const visitMsgElement = document.querySelector("#visit-msg");
const msPerDay = 86400000; 
const lastVisit = window.localStorage.getItem("lastVisit-ls") || 0;
const currentVisit = Date.now();

if (lastVisit == 0) {
    visitMsgElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysPassed = Math.floor((currentVisit - lastVisit) / msPerDay);

    if (daysPassed < 1) {
        visitMsgElement.textContent = "Back so soon! Awesome!";
    } else {
        const dayText = daysPassed === 1 ? "day" : "days";
        visitMsgElement.textContent = `You last visited ${daysPassed} ${dayText} ago.`;
    }
}


window.localStorage.setItem("lastVisit-ls", currentVisit);



const container = document.querySelector("#places-container");

function displayPlaces(destinations) {
    destinations.forEach((place) => {
        
        let card = document.createElement("section");
        let title = document.createElement("h2");
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let address = document.createElement("address");
        let desc = document.createElement("p");
        let button = document.createElement("button");

        
        title.textContent = place.name;
        
        img.setAttribute("src", place.photo_url);
        img.setAttribute("alt", `A scenic view of ${place.name}`);
        img.setAttribute("loading", "lazy"); 
        img.setAttribute("width", "300");
        img.setAttribute("height", "200");

        address.textContent = place.address;
        desc.textContent = place.description;
        button.textContent = "Learn More";

        
        figure.appendChild(img);

        
        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(desc);
        card.appendChild(button);

        
        card.classList.add("place-card");

        
        container.appendChild(card);
    });
}


displayPlaces(places.destinations);