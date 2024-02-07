"use strict";
const modalBtn = document.querySelector(".modal_container_btn_img");
const modal = document.querySelector("#customCardForm");
const closeBtn = document.querySelector(".close_form");

modalBtn.addEventListener("click", toggleModal);
closeBtn.addEventListener("click", function (event) {
  event.preventDefault();
  closeModal();
});

function toggleModal() {
  modal.classList.toggle("active");
}

function closeModal() {
  modal.classList.remove("active");
}
