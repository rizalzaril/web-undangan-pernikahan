// Image sources
const images = [
  "https://i.pinimg.com/564x/be/f5/1e/bef51eb072f9944553181d078bae17c5.jpg",
  "https://i.pinimg.com/564x/be/f5/1e/bef51eb072f9944553181d078bae17c5.jpg",
  "https://i.pinimg.com/564x/be/f5/1e/bef51eb072f9944553181d078bae17c5.jpg",
  "https://i.pinimg.com/564x/be/f5/1e/bef51eb072f9944553181d078bae17c5.jpg",
  "https://i.pinimg.com/564x/42/90/33/42903394deb41cd1a526a1c06a82edd0.jpg",
  "https://i.pinimg.com/564x/91/27/46/912746cbc50756032266eaefcb87a269.jpg",
  "https://i.pinimg.com/564x/91/27/46/912746cbc50756032266eaefcb87a269.jpg",
  "https://i.pinimg.com/564x/91/27/46/912746cbc50756032266eaefcb87a269.jpg",
  // Add other images here...
];

// Generate gallery dynamically
const gallery = document.getElementById("imgGallery");

if (images.length === 0) {
  // Display a message if no images are available
  const message = document.createElement("p");
  message.textContent = "No images available";
  message.classList.add("text-center", "mt-3");
  gallery.appendChild(message);
} else {
  images.map((imageSrc, index) => {
    if (imageSrc) {
      // Only create elements if imageSrc exists
      const col = document.createElement("div");
      col.classList.add(
        "col",
        "mt-3",
        "col-home-scroll-up",
        "gallery-shadow-img",
        "transition-flip-360",
        "p-3"
      );

      const link = document.createElement("a");
      link.href = "#";
      link.setAttribute("data-bs-toggle", "modal");
      link.setAttribute("data-bs-target", "#imageModal");
      link.setAttribute("data-bs-img-src", imageSrc);
      link.setAttribute("data-bs-index", index);

      const img = document.createElement("img");
      img.classList.add("img-thumbnail", "rounded-lg");
      img.src = imageSrc;
      img.alt = "";

      link.appendChild(img);
      col.appendChild(link);
      gallery.appendChild(col);
    }
  });
}

// Generate gallery dynamically

// Modal image update and navigation logic
let currentIndex = 0; // Track the current image index

// Update modal image when clicked
const imageLinks = document.querySelectorAll('[data-bs-toggle="modal"]');
imageLinks.forEach((link) => {
  link.addEventListener("click", function () {
    currentIndex = parseInt(this.getAttribute("data-bs-index")); // Get the index of clicked image
    document.getElementById("modalImage").src = images[currentIndex];
  });
});

// Function to show the next image
function showNextImage() {
  currentIndex = (currentIndex + 1) % images.length; // Wrap around if we go past the last image
  document.getElementById("modalImage").src = images[currentIndex];
}

// Function to show the previous image
function showPrevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length; // Wrap around if we go before the first image
  document.getElementById("modalImage").src = images[currentIndex];
}

// Event listeners for the next/prev buttons
document.getElementById("nextBtn").addEventListener("click", showNextImage);
document.getElementById("prevBtn").addEventListener("click", showPrevImage);

// Swipe functionality for mobile
let startX = 0;
let endX = 0;
let isSwiping = false;

function handleSwipe(event) {
  if (event.type === "touchstart") {
    startX = event.touches[0].clientX;
    isSwiping = true; // Start swipe
  } else if (event.type === "touchmove" && isSwiping) {
    endX = event.touches[0].clientX;
    const offsetX = startX - endX;

    if (Math.abs(offsetX) > 50) {
      if (offsetX > 0) {
        showNextImage(); // Swipe left -> Next image
      } else {
        showPrevImage(); // Swipe right -> Previous image
      }
      isSwiping = false; // End swipe
    }
  } else if (event.type === "touchend") {
    isSwiping = false; // End swipe on touchend
  }
}

// Attach swipe events to the modal image
const modalImage = document.getElementById("modalImage");
modalImage.addEventListener("touchstart", handleSwipe);
modalImage.addEventListener("touchmove", handleSwipe);
modalImage.addEventListener("touchend", handleSwipe);
