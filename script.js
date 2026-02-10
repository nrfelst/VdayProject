// ===== VALENTINE'S SLIDESHOW SCRIPT =====

// 1️⃣ List of images
// ===== Generate images array automatically =====
const images = [];
for (let i = 2; i <= 39; i++) {
    images.push(`images/image${i}.jpeg`);
}

const preloadedImages = [];
images.forEach((src) => {
    const img = new Image();
    img.src = src;
    preloadedImages.push(img);
});
// 2️⃣ Get HTML elements
const slide = document.getElementById("slide");
const message = document.getElementById("message");
const startButton = document.getElementById("start-button");
const startContainer = document.getElementById("start-container");
const slideshowContainer = document.getElementById("slideshow-container");
const music = document.getElementById("music");

let current = 0;
let slideshowInterval;

// 3️⃣ Function to show next image with fade effect
function showNext() {
    if (current < preloadedImages.length) {
        // 1️⃣ Start fade-out
        slide.style.opacity = 0;

        // 2️⃣ Wait for fade-out to finish (matches CSS transition duration)
        setTimeout(() => {
            // 3️⃣ Change image AFTER fade-out
            slide.src = preloadedImages[current].src;

            // 4️⃣ Fade in
            slide.style.opacity = 1;

            // 5️⃣ Move to next image
            current++;

            // 6️⃣ Schedule next slide
            slideshowTimeout = setTimeout(showNext, 10000); // 4 seconds per slide

        }, 10000); // fade-out duration = 2s (match your CSS)
    } else {
        clearInterval(slideshowInterval);
        slideshowContainer.style.display = "none";
        message.style.display = "block";
    }
}

// 4️⃣ Function to start slideshow and music
function startSlideshow() {
    startContainer.style.display = "none"; // hide start button
    slideshowContainer.style.display = "block"; // show slideshow
    music.play().catch(() => {
        console.log("Autoplay blocked. Click to start music.");
    });

    current = 0; // reset counter
    showNext(); // show first image immediately
    slideshowInterval = setInterval(showNext, 10000); // flip every 10 seconds
}

// 5️⃣ Start button click event
startButton.addEventListener("click", startSlideshow);
