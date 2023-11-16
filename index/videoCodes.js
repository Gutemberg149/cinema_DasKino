const closeModal = document.querySelector(".modal_header i");
const playTrailer = document.querySelector(".playTrailer");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};

[closeModal, playTrailer, fade].forEach((el) => {
  el.addEventListener("click", toggleModal);
});

export default toggleModal;
