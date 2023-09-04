import "./src/plugins";

import { FaceDetector } from "./src/controllers/FaceDetector";
import { UserMedia } from "./src/controllers/UserMedia";
import { FaceFilters } from "./src/controllers/FaceFilters";

import { options, filters } from "./src/filters";

var btnUpload = document.querySelector('.upload');
let srImage = "img1.jpg"

var userMedia = 0;
var faceDetector;
var faceFilters;

// Start the app
async function app() {
  userMedia = new UserMedia(document.querySelector(".js-media-container"), {
    type: "image",
    src: srImage,
    onCanvasCreated: (canvas) => {
      canvas.className = "absolute top-0 left-0 w-full h-full";
      return canvas;
    },
  });

  faceDetector = new FaceDetector();

  faceFilters = new FaceFilters(userMedia.getCanvas(), [
    ...options,
    ...filters,
  ]);

  var [media, _] = await Promise.all([userMedia.init(), faceDetector.init()]);

  faceDetector.subscribe(media, faceFilters.render.bind(faceFilters));
}

// Get the button and input elements
var input = document.getElementById("fileInput");

// Listen for the click event on the button
btnUpload.addEventListener("click", function() {
  // Trigger the click event on the input element
  input.click();
});

// Listen for the change event on the input element
input.addEventListener("change", function() {
  // Get the selected file
  var file = input.files[0];
  srImage = file['name'];
  // Delete image canvas
  userMedia = document.querySelector(".js-media-container");
  userMedia.innerHTML = "";
  // Upload new image canvas
  app();
  
});

app();

