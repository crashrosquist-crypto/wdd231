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


const courses = [
    { subject: 'CSE', number: 110, title: 'Intro to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 230, title: 'Web Frontend Development', credits: 2, completed: false }
];

const courseContainer = document.querySelector('#course-list-container');
const totalCreditsDisplay = document.querySelector('#total-credits');

function displayCourses(filter = 'all') {
    courseContainer.innerHTML = "";

    const filtered = filter === 'all'
        ? courses
        : courses.filter(c => c.subject.toLowerCase() === filter);

    filtered.forEach(course => {
        const card = document.createElement('button');
        card.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
        card.innerHTML = `<strong>${course.subject} ${course.number}</strong>`;
        card.addEventListener('click', () => {
        displayCourseDetails(course);
        });
        courseContainer.appendChild(card);
    });


    const total = filtered.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = `Total Credits: ${total}`;
}

function displayCourseDetails(course) {
    const modalContent = document.querySelector('#course-details'); 
    
    modalContent.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Status</strong>: ${course.completed ? 'Completed' : 'In Progress'}</p>
        <p>Explore the fundamentals of ${course.title} in this core certificate requirement.</p>
    `;

    modalContent.showModal();

    document.querySelector('#closeModal').addEventListener('click', () => {
        modalContent.close();
    });
}

displayCourses();

document.querySelector('#all')?.addEventListener('click', () => displayCourses('all'));
document.querySelector('#cse')?.addEventListener('click', () => displayCourses('cse'));
document.querySelector('#wdd')?.addEventListener('click', () => displayCourses('wdd'));

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

const modal = document.querySelector('#course-details');
const openModal = document.querySelector('.open-button'); 
const closeModal = document.querySelector('#closeModal'); 


if (openModal) {
    openModal.addEventListener("click", () => {
        modal.showModal();
    });
}


if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.close();
    });
}


modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

// NEXT: Update displayCourses to use buttons instead of divs



