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
    if (current < images.length) {
        slide.style.opacity = 0; // fade out
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

        setTimeout(() => {
            slide.src = images[current]; // change image
            slide.style.opacity = 1; // fade in
            current++;
        }, 2000); // matches CSS transition duration
    } else {

        // End of slideshow
        clearInterval(slideshowInterval); // stop interval

        // Uncomment the next line if you want it to loop instead of stopping:
        // current = 0;

        slideshowContainer.style.display = "none"; // hide slideshow
        message.style.display = "block"; // show message
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
    slideshowInterval = setInterval(showNext, 5000); // flip every 10 seconds
}

// 5️⃣ Start button click event
startButton.addEventListener("click", startSlideshow);
