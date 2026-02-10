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
let slideshowInterval;

// 3️⃣ Function to show next image with fade effect
function showNext() {
    if (current < images.length) {
        // Start fade out
        slide.style.opacity = 0;

        // Preload the next image
        const nextImage = new Image();
        nextImage.src = images[current];

        nextImage.onload = () => {
            // Wait a short time to let fade-out apply
            setTimeout(() => {
                slide.src = nextImage.src; // change image
                slide.style.opacity = 1;   // fade in
                current++;
            }, 2000); // 50ms delay ensures fade-out is applied
        };

    } else {
        // End of slideshow
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
    slideshowInterval = setInterval(showNext, 6000); // flip every 4 seconds
}

// 5️⃣ Start button click event
startButton.addEventListener("click", startSlideshow);
