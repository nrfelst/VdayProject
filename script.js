// ===== VALENTINE'S SLIDESHOW SCRIPT =====

// 1️⃣ List of images
// ===== Generate images array automatically =====
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

let current = 0;
// 3️⃣ Preload next image function
function preloadImage(index) {
    const img = new Image();
    img.src = images[index];
    return img;
}

// 4️⃣ Show next image with fade
function showNext() {
    if (current >= images.length) {
        // End of slideshow
        slideshowContainer.style.display = "none";
        message.style.display = "block";
        return;
    }

    // Start fade-out
    slide.style.opacity = 0;

    // Preload next image
    const nextImg = preloadImage(current);

    nextImg.onload = () => {
        // Wait for fade-out to finish (matches CSS)
        setTimeout(() => {
            slide.src = nextImg.src;   // switch image
            slide.style.opacity = 1;   // fade in
            current++;

            // Schedule next slide after 4s visible + 2s fade
            setTimeout(showNext, 4000); // adjust visible time
        }, 2000); // fade-out duration in ms
    };
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
    // slideshowInterval = setInterval(showNext, 5000); // flip every 10 seconds
}

// 5️⃣ Start button click event
startButton.addEventListener("click", startSlideshow);
