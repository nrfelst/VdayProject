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
const fadeDuration = 2000;      // 2 seconds fade-out / fade-in
const visibleDuration = 4000;   // 4 seconds fully visible
function showNext() {
    if (current >= images.length) {
        // End of slideshow
        slideshowContainer.style.display = "none";
        message.style.display = "block";
        return;
    }

    // Preload the next image
    const nextImg = new Image();
    nextImg.src = images[current];

    nextImg.onload = () => {
        // Wait for the image to be fully visible before starting fade-out
        setTimeout(() => {
            // Start fade-out
            slide.style.opacity = 0;

            setTimeout(() => {
                // Switch image after fade-out
                slide.src = nextImg.src;
                slide.style.opacity = 1; // fade-in
                current++;

                // Schedule next slide
                showNext();
            }, fadeDuration); // wait for fade-out to complete
        }, visibleDuration); // image stays fully visible before fading
    };
}


// 4️⃣ Function to start slideshow and music
function startSlideshow() {
    startContainer.style.display = "none"; // hide start button
    slideshowContainer.style.display = "block"; // show slideshow
    music.play().catch(() => {
        console.log("Autoplay blocked. Click to start music.");
    });
    slide.src = images[0];
    slide.style.opacity = 1;
    current = 1; // next image to show

    music.play().catch(() => console.log("Autoplay blocked"));

    // Start the chain
    showNext();
}

// 5️⃣ Start button click event
startButton.addEventListener("click", startSlideshow);
