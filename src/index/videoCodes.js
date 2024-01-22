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
//--------------------------------------------
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("video_container", {
    videoId: "d9MyW72ELq0",
    width: "100%",
    height: 400,
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 0,
    },
    events: {
      onReady: onPlayerReady,
    },
  });
}

function onPlayerReady() {
  closeModal.addEventListener("click", () => {
    player.stopVideo();
  });
}
onPlayerReady();
playTrailer.addEventListener("click", () => {
  onYouTubeIframeAPIReady();
});

export default toggleModal;
