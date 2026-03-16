import type { InboundContentMessage } from "./types/messages.ts";

let isMuted = false;

function applyMuteToAllVideos(muted: boolean): void {
  for (const video of Array.from(document.querySelectorAll("video"))) {
    video.muted = muted;
  }
}

// Watch for dynamically added <video> elements
const observer = new MutationObserver(() => {
  applyMuteToAllVideos(isMuted);
});

observer.observe(document.body, { childList: true, subtree: true });

// Handle YouTube SPA navigation
document.addEventListener("yt-navigate-finish", () => {
  applyMuteToAllVideos(isMuted);
});

// Handle messages from service worker
chrome.runtime.onMessage.addListener((message: InboundContentMessage) => {
  if (message.type === "SET_MUTED") {
    isMuted = message.muted;
    applyMuteToAllVideos(isMuted);
  }
});
