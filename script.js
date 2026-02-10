// ===== VALENTINE'S SLIDESHOW SCRIPT =====

// 1️⃣ Generate image list automatically
const images = [];
for (let i = 2; i <= 39; i++) {
    images.push(`images/image${i}.jpeg`);
}

// 2️⃣ Get HTML elements
const slide = document.getElementById("slide");
const message = document.getElementById("message");
const startButton = document.getElementById("start-button");
const startContainer = document.getElementById("start-container");
const slideshowContainer = document.getElementById("slideshow-container");
const music = document.getElementById("music");

// 3️⃣ Timing settings
const fadeDuration = 2000;     // fade-out / fade-in duration in ms
const visibleDuration = 4000;  // fully visible duration in ms
const pauseDuration = 500;     // pause between fade-out and fade-in in ms

let current = 0;               // current image index
let preloadedImages = [];      // store preloaded images

// 4️⃣ Preload all images before starting
let imagesLoaded = 0;
images.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === images.length) {
            console.log("All images preloaded!");
            startButton.disabled = false; // enable start button
        }
    };
    preloadedImages.push(img);
});

// 5️⃣ Show next image with smooth fade
function showNext() {
    if (current >= preloadedImages.length) {
        // End of slideshow
        slideshowContainer.style.display = "none";
        message.style.display = "block";
        return;
    }

    // Start fade-out
    slide.style.opacity = 0;

    setTimeout(() => {
        // Pause a little before switching image
        setTimeout(() => {
            // Switch image and fade in
            slide.src = preloadedImages[current].src;
            slide.style.opacity = 1;
            current++;

            // Schedule next image after visible duration
            setTimeout(showNext, visibleDuration);
        }, pauseDuration);
    }, fadeDuration);
}

// 6️⃣ Start slideshow function
function startSlideshow() {
    if (imagesLoaded < images.length) {
        alert("Images are still loading, please wait a moment.");
        return;
    }

    startContainer.style.display = "none";       // hide start button
    slideshowContainer.style.display = "block";  // show slideshow

    // Show first image immediately
    slide.src = preloadedImages[0].src;
    slide.style.opacity = 1;
    current = 1; // next image to show

    // Start music
    music.play().catch(() => console.log("Autoplay blocked"));

    // Start the slideshow chain
    setTimeout(showNext, visibleDuration); // wait visibleDuration before first fade
}

// 7️⃣ Start button click event
startButton.addEventListener("click", startSlideshow);

// 8️⃣ Disable start button until images are preloaded
startButton.disabled = true;
