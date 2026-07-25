const themeToggle = document.getElementById('themetoggle')
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const typingText = document.getElementById("typing-text");
const reveals = document.querySelectorAll(".reveal");
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileMenu = document.getElementById("mobileMenu");



document.querySelectorAll(".mobile-nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });
});

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("active");
});


closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
});


const mobileThemeToggle = document.getElementById("mobileThemeToggle");


function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

themeToggle.addEventListener("click", toggleTheme);
mobileThemeToggle.addEventListener("click", toggleTheme);


window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
            current = section.id;
        }
    });



    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

        }

    });

}, {
    threshold: 0.15
});

reveals.forEach(section => {
    observer.observe(section);
});

const roles = [
    "Frontend Developer",
    "React Developer",
    "JavaScript Developer",
    "UI Enthusiast"
];


let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!isDeleting) {

        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

    }

    setTimeout(typeEffect, isDeleting ? 60 : 120);
}

typeEffect();

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("preloader").classList.add("hide");

    }, 2000);

});

function toggleTheme() {
    document.body.classList.toggle("light-mode");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("light-mode")
        ? "light"
        : "dark"
    );
}

window.addEventListener("load", () => {
    if(localStorage.getItem("theme") === "light"){
        document.body.classList.add("light-mode");
    }
});