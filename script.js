const currentYear = document.querySelector("#current-year");
const modal = document.querySelector("#video-modal");
const modalTitle = document.querySelector("#video-modal-title");
const videoPlayer = document.querySelector("#project-video-player");
const playButtons = Array.from(document.querySelectorAll(".project-play"));
const closeButtons = Array.from(document.querySelectorAll("[data-close-video]"));

const closeVideo = () => {
  if (!modal || !videoPlayer) {
    return;
  }

  videoPlayer.pause();
  videoPlayer.removeAttribute("src");
  videoPlayer.load();
  modal.hidden = true;
  document.body.style.overflow = "";
};

const openVideo = (button) => {
  if (!modal || !videoPlayer || !button) {
    return;
  }

  const source = button.dataset.video;
  const title = button.dataset.title || "项目视频";

  if (!source) {
    return;
  }

  modalTitle.textContent = title;
  videoPlayer.src = source;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  videoPlayer.play().catch(() => {});
};

playButtons.forEach((button) => {
  button.addEventListener("click", () => openVideo(button));
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeVideo);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeVideo();
  }
});

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
