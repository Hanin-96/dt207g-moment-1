"use strict"

//Hämtar element 
const hamburgerEl = document.querySelector(".hamburger");
const navMenuEl = document.querySelector(".nav-menu");

//Eventlistener
hamburgerEl.addEventListener("click", toggleMenu);
closeDropDown();

//Toggle effekt
function toggleMenu() {
    hamburgerEl.classList.toggle("active");
    navMenuEl.classList.toggle("active");

    // Toggle the menu text
    const menuTextEl = document.querySelector(".menu-text");
    if (menuTextEl.innerHTML === "Meny") {
        menuTextEl.innerHTML = "Stäng";
        menuTextEl.style.color = "white";
    } else {
        menuTextEl.innerHTML = "Meny";
        menuTextEl.style.color = "#0f0f0f";
    }
}

//Stänga menyn
function closeDropDown() {
    const linksEl = document.querySelectorAll(".nav-link");
   
    document.querySelectorAll(".nav-link").forEach(link =>
        link.addEventListener("click", toggleMenu));
}
