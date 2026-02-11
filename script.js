// ===== VALENTINE'S SLIDESHOW SCRIPT =====
window.addEventListener("DOMContentLoaded", () => {
// 1️⃣ Generate image list automatically
const images = [];
for (let i = 2; i <= 43; i++) {
    images.push(`images/image${i}.jpeg`);
}

// 2️⃣ Get HTML elements
const slide1 = document.getElementById("slide1");
const slide2 = document.getElementById("slide2");
const message = document.getElementById("message");
const startButton = document.getElementById("start-button");
const startContainer = document.getElementById("start-container");
const slideshowContainer = document.getElementById("slideshow-container");
const music = document.getElementById("music");
const heartsContainer = document.getElementById("hearts");

    function startHearts() {
        const heartsContainer = document.getElementById("hearts");
        console.log("Hearts container found:", heartsContainer);
        if (!heartsContainer) {
            console.error("Hearts container not found!");
            return;
        }

        function spawnHeart() {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.textContent = "❤️";

            heart.style.left = Math.random() * 100 + "%";

            heartsContainer.appendChild(heart);

            setTimeout(() => heart.remove(), 6000);
        }

        setInterval(spawnHeart, 400);
    }

// 3️⃣ Timing settings
const fadeDuration = 2000;     // fade-out / fade-in duration in ms
const visibleDuration = 4000;  // fully visible duration in ms
const pauseDuration = 500;     // pause between fade-out and fade-in

let current = 0;               // current image index
let preloadedImages = [];
let showingSlide1 = true;      // track which slide is visible

// 4️⃣ Preload all images
let imagesLoaded = 0;
images.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === images.length) {
            console.log("All images preloaded!");
            startButton.disabled = false;
        }
    };
    preloadedImages.push(img);
});



// 5️⃣ Crossfade to next image
function showNext() {
    if (current >= preloadedImages.length) {
        slideshowContainer.style.display = "none";
        message.style.display = "block";
        return;
    }

    const nextImage = preloadedImages[current];

    // Determine which slide is hidden
    const fadeInSlide = showingSlide1 ? slide2 : slide1;
    const fadeOutSlide = showingSlide1 ? slide1 : slide2;

    // Set next image src BEFORE fading in
    fadeInSlide.src = nextImage.src;

    // Wait a short pause to ensure rendering
    setTimeout(() => {
        fadeInSlide.style.opacity = 1;
        fadeOutSlide.style.opacity = 0;

        showingSlide1 = !showingSlide1;
        current++;

        // Schedule next slide
        setTimeout(showNext, visibleDuration);
    }, pauseDuration);
}

// 6️⃣ Start slideshow
function startSlideshow() {
    if (imagesLoaded < preloadedImages.length) {
        alert("Images are still loading, please wait.");
        return;
    }

    startContainer.style.display = "none";
    slideshowContainer.style.display = "block";
    console.log("Starting slideshow + hearts...");

    startHearts();
    // Start everything from current = 0
    current = 0;
    showNext();

    music.play().catch(() => console.log("Autoplay blocked"));
}

// 7️⃣ Start button click event
startButton.disabled = true;  // disable until images are loaded
startButton.addEventListener("click", startSlideshow);
});