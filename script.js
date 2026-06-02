const videos = Array.from(document.querySelectorAll("video"));
const currentYear = document.querySelector("#current-year");

videos.forEach((video) => {
  video.addEventListener("play", () => {
    videos.forEach((other) => {
      if (other !== video) {
        other.pause();
      }
    });
  });
});

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
