const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming',
        completed: true

    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more proficient...',
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the concepts of Object-Oriented Programming...',
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with HTML and CSS...',
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on user experience...',
        completed: false
    }
];

function displayCourses(filteredCourses) {
    const container = document.querySelector('#course-list-container');
    container.innerHTML = ''; 

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : ''}`;
        card.innerHTML = `<span>${course.subject} ${course.number}</span>`;
        container.appendChild(card);
    });

    
    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.querySelector('#total-credits').textContent = `Total Credits: ${total}`;
}


displayCourses(courses);




const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

document.querySelector('#all').addEventListener('click', () => displayCourses(courses));

document.querySelector('#cse').addEventListener('click', () => {
    displayCourses(courses.filter(course => course.subject === 'CSE'));
});

document.querySelector('#wdd').addEventListener('click', () => {
    displayCourses(courses.filter(course => course.subject === 'WDD'));
});



document.querySelector('#currentyear').textContent = new Date().getFullYear();


document.querySelector('#lastModified').textContent = `Last Modification: ${document.lastModified}`;

