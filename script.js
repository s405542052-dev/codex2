const currentYear = document.querySelector("#current-year");
const playButtons = Array.from(document.querySelectorAll(".project-play"));

let activeMedia = null;

const stopMedia = (media) => {
  if (!media) {
    return;
  }

  const inlineVideo = media.querySelector(".project-video-inline");
  if (inlineVideo) {
    inlineVideo.pause();
    inlineVideo.currentTime = 0;
  }

  media.classList.remove("is-playing");
};

const ensureInlineVideo = (media, source, title) => {
  let inlineVideo = media.querySelector(".project-video-inline");

  if (!inlineVideo) {
    inlineVideo = document.createElement("video");
    inlineVideo.className = "project-video-inline";
    inlineVideo.controls = true;
    inlineVideo.playsInline = true;
    inlineVideo.preload = "metadata";
    inlineVideo.setAttribute("aria-label", title || "项目视频");
    media.appendChild(inlineVideo);

    inlineVideo.addEventListener("play", () => {
      media.classList.add("is-playing");
    });

    inlineVideo.addEventListener("pause", () => {
      if (inlineVideo.currentTime === 0 || inlineVideo.ended) {
        media.classList.remove("is-playing");
      }
    });

    inlineVideo.addEventListener("ended", () => {
      media.classList.remove("is-playing");
    });
  }

  if (inlineVideo.dataset.source !== source) {
    inlineVideo.src = source;
    inlineVideo.dataset.source = source;
    inlineVideo.load();
  }

  return inlineVideo;
};

playButtons.forEach((button) => {
  button.textContent = "点击播放项目视频";

  button.addEventListener("click", () => {
    const media = button.closest(".project-media");
    const source = button.dataset.video;
    const title = button.dataset.title || "项目视频";

    if (!media || !source) {
      return;
    }

    if (activeMedia && activeMedia !== media) {
      stopMedia(activeMedia);
    }

    const inlineVideo = ensureInlineVideo(media, source, title);
    media.classList.add("is-playing");
    activeMedia = media;
    inlineVideo.play().catch(() => {});
  });
});

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
