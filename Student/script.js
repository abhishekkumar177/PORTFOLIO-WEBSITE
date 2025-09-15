// This file is for any interactive functionality related to the video.

console.log("JavaScript file is linked.");

// Example: You could use JavaScript to add a button that toggles play/pause
const video = document.getElementById("myVideo");
const btn = document.createElement("button");
btn.textContent = "Pause";
btn.onclick = () => {
  if (video.paused) {
    video.play();
    btn.textContent = "Pause";
  } else {
    video.pause();
    btn.textContent = "Play";
  }
};

// Append the button to the content container or another element
const contentDiv = document.querySelector(".content");
contentDiv.appendChild(btn);