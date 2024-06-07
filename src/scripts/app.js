"use strict";
const container = document.querySelector('.container');
let isDown = false;
let startX;
let scrollLeft;
const maxScrollLeft = 0;

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

function initializeDragScroll() {
    if (!isTouchDevice && window.innerWidth <= 1800) {
        container.addEventListener('mousedown', mouseDownHandler);
        container.addEventListener('mouseleave', mouseLeaveHandler);
        container.addEventListener('mouseup', mouseUpHandler);
        container.addEventListener('mousemove', mouseMoveHandler);
    }
}

function removeDragScroll() {
    container.removeEventListener('mousedown', mouseDownHandler);
    container.removeEventListener('mouseleave', mouseLeaveHandler);
    container.removeEventListener('mouseup', mouseUpHandler);
    container.removeEventListener('mousemove', mouseMoveHandler);
}

function mouseDownHandler(e) {
    isDown = true;
    container.classList.add('active');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
}

function mouseLeaveHandler() {
    isDown = false;
    container.classList.remove('active');
}

function mouseUpHandler() {
    isDown = false;
    container.classList.remove('active');
}

function mouseMoveHandler(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 3;
    let newScrollLeft = scrollLeft + walk;

    // Limiter le défilement à la valeur maximale
    if (newScrollLeft < 0) {
        newScrollLeft = -375;
    } else if (newScrollLeft > maxScrollLeft) {
        newScrollLeft = maxScrollLeft;
    }

    container.style.transform = `translateX(${newScrollLeft}px)`;
}

// Initialize the script based on screen width
initializeDragScroll();

// Listen for window resize events
window.addEventListener('resize', () => {
    if (window.innerWidth > 1800) {
        removeDragScroll();
    } else {
        initializeDragScroll();
    }
});









let items = document.querySelectorAll('.projets__slider .projets__container--items');
let active = 0;
let next = document.getElementById('next');
let prev = document.getElementById('prev');

function loadShow() {
    if (window.innerWidth < 1000) {
        return;
    }

    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;

    let stt = 0;
    for (let i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    stt = 0;
    for (let i = (active - 1); i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}

function updateEventListeners() {
    if (window.innerWidth >= 1000) {
        next.onclick = function () {
            active = (active + 1) % items.length;
            loadShow();
        }

        prev.onclick = function () {
            active = (active - 1 + items.length) % items.length;
            loadShow();
        }
    } else {
        next.onclick = null;
        prev.onclick = null;
    }
}

window.addEventListener('resize', function() {
    updateEventListeners();
    loadShow();
});

updateEventListeners();
loadShow();







const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDirection() {
    return (Math.random() < 0.5 ? -1 : 1) * 0.2;
}

function getRadius() {
    if (window.innerWidth <= 480) {
        return { r1: 50, r2: 75, r3: 60, r4: 80 };
    } else if (window.innerWidth <= 768) {
        return { r1: 100, r2: 160, r3: 125, r4: 140 };
    } else {
        return { r1: 200, r2: 125, r3: 250, r4: 300 };
    }
}

function initializeCircles() {
    const radius = getRadius();
    circles[0].radius = radius.r1;
    circles[1].radius = radius.r2;
    circles[2].radius = radius.r3;
    circles[3].radius = radius.r4;

    circles.forEach(circle => {
        circle.x = getRandomInt(circle.radius, canvas.width - circle.radius);
        circle.y = getRandomInt(circle.radius, canvas.height - circle.radius);
    });
}

const circles = [
    { radius: 200, dx: getRandomDirection(), dy: getRandomDirection(), zIndex: 6, color: 'rgba(141, 169, 196, 0.5)' },
    { radius: 300, dx: getRandomDirection(), dy: getRandomDirection(), zIndex: 6, color: 'rgba(141, 169, 196, 0.8)' },
    { radius: 250, dx: getRandomDirection(), dy: getRandomDirection(), zIndex: 6, color: 'rgba(141, 169, 196, 0.65)' },
    { radius: 400, dx: getRandomDirection(), dy: getRandomDirection(), zIndex: 6, color: 'rgba(141, 169, 196, 0.35)' }
];

function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}

function updateCircle(circle) {
    if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
        circle.dx = -circle.dx;
    }
    if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
        circle.dy = -circle.dy;
    }

    circle.x += circle.dx;
    circle.y += circle.dy;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.sort((a, b) => a.zIndex - b.zIndex);
    circles.forEach(circle => {
        drawCircle(circle);
        updateCircle(circle);
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initializeCircles();
});

resizeCanvas();
initializeCircles();
animate();



document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour changer la langue
    function setLanguage(lang) {
        const allLangElements = document.querySelectorAll('.lang');
        const targetLangElements = document.querySelectorAll(`.lang--${lang}`);

        allLangElements.forEach(el => el.style.display = 'none');
        targetLangElements.forEach(el => el.style.display = 'block');
    }

    // Définition des écouteurs d'événements pour les boutons de langue
    const btnLangFr = document.getElementById('btn-lang-fr');
    const btnLangEn = document.getElementById('btn-lang-en');

    btnLangFr.addEventListener('click', () => {
        setLanguage('fr');
    });

    btnLangEn.addEventListener('click', () => {
        setLanguage('en');
    });

    // Initialisation avec la langue par défaut
    setLanguage('en');
});

