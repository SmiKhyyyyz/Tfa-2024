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
        newScrollLeft = -275;
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

function loadShow() {
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
loadShow();

let next = document.getElementById('next');
let prev = document.getElementById('prev');

next.onclick = function () {
    active = (active + 1) % items.length;
    loadShow();
}

prev.onclick = function () {
    active = (active - 1 + items.length) % items.length;
    loadShow();
}
