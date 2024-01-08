"use strict";

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

window.addEventListener("scroll", () => {
  if (this.scrollY >= 85) {
    navMenu.classList.add("on-scroll");
  } else {
    navMenu.classList.remove("on-scroll");
  }
});

const url = "./zelda.json";

function getZelda() {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err.message));
}

getZelda();
