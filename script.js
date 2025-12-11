// Toggle reason cards in Why NextGEN section
const reasonCards = document.querySelectorAll('.reasons');
reasonCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove active class from all cards
        reasonCards.forEach(c => c.classList.remove('active'));
        // Add active class to clicked card
        this.classList.add('active');
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Register event function
// Register event function
// Register event function (prompts for details and submits to server)
async function registerEvent(eventName) {
    const name = prompt('Your name:');
    if (!name) return alert('Name is required');
    const email = prompt('Your email:');
    if (!email) return alert('Email is required');
    const project = prompt('If you have a project idea (optional), describe it:') || '';

    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Name: name, Email: email, EventName: eventName, Project: project })
        });
        const data = await res.json();
        if (res.ok) alert('Registration saved. Thank you!');
        else alert('Error: ' + (data.error || 'Could not register'));
    } catch (err) {
        console.error(err);
        alert('Network error while registering');
    }
}

// Handle contact form submission
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    if (!name || !email || !message) return alert('Please complete all fields');

    fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name: name, Email: email, Message: message })
    }).then(r => r.json()).then(data => {
        if (data.success) {
            alert('Thank you — your message has been saved.');
            form.reset();
        } else {
            alert('Error: ' + (data.error || 'Could not submit'));
        }
    }).catch(err => {
        console.error(err);
        alert('Network error sending message');
    });
}

// Join club (simple prompt, stores into TeamMembers)
async function joinClub() {
    const name = prompt('Full name:');
    if (!name) return alert('Name is required');
    const email = prompt('Email:');
    if (!email) return alert('Email is required');
    const bio = prompt('Short bio (optional):') || '';

    try {
        const res = await fetch('/api/join', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Name: name, Email: email, Bio: bio })
        });
        const data = await res.json();
        if (res.ok) alert('Thanks — membership request saved.');
        else alert('Error: ' + (data.error || 'Could not submit'));
    } catch (err) {
        console.error(err);
        alert('Network error while joining');
    }
}

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        hamburger.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        navLinks.classList.remove('show');
        hamburger.classList.remove('active');
    }));

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('show');
            hamburger.classList.remove('active');
        }
    });
}


