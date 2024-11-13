let images = []; // Global array to store image URLs

// Fetch images from the API and populate the images array
async function fetchImages() {
  try {
    const gallery = document.getElementById("imgGallery");
    gallery.innerHTML = ""; // Clear existing content
    displayLoading(); // Show loading message

    const response = await fetch(
      "https://backend-undangan-pernikahan-opang.vercel.app/getGallery",
      {
        headers: {
          "Cache-Control": "no-cache", // Prevent caching
        },
      }
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    console.log("Fetched data:", data); // Log the entire fetched data to verify the structure

    images.length = 0; // Clear the images array before adding new images

    // Inspect the structure of data and ensure imageBase64 is the correct key
    data.forEach((item, index) => {
      console.log(`Item at index ${index}:`, item); // Log each item to verify the structure
      if (item.imageBase64) {
        console.log(`Base64 image at index ${index}:`, item.imageBase64); // Log the base64 value
        images.push(item.imageBase64); // Push the base64 string to the images array
      } else {
        console.log(`No imageBase64 found at index ${index}`); // Log if the key doesn't exist
      }
    });

    console.log("Images array after fetch:", images); // Log the images array to ensure it's populated

    generateGallery(); // Generate the gallery after fetching images
  } catch (error) {
    console.error("Error fetching images:", error);
    displayNoImagesMessage();
  }
}

// Function to display loading message
function displayLoading() {
  const gallery = document.getElementById("imgGallery");
  const loadingMessage = document.createElement("p");
  loadingMessage.textContent = "Loading images...";
  gallery.appendChild(loadingMessage);
}

// Function to display "No images available" message
function displayNoImagesMessage() {
  const gallery = document.getElementById("imgGallery");
  const message = document.createElement("p");
  message.textContent = "No images available";
  message.classList.add("text-center", "mt-3");
  gallery.appendChild(message);
}

// Function to generate gallery dynamically
function generateGallery() {
  const gallery = document.getElementById("imgGallery");

  if (!gallery) {
    console.error("Gallery element not found");
    return;
  }

  gallery.innerHTML = ""; // Clear existing gallery content

  // If images array is empty, show no images message
  if (images.length === 0) {
    console.log("No images found in the array"); // Log if the images array is empty
    displayNoImagesMessage();
  } else {
    console.log("Generating gallery with images:", images); // Log when images are being added to the gallery
    images.forEach((imageBase64, index) => {
      if (imageBase64) {
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
        link.setAttribute("data-bs-img-src", imageBase64); // Use base64 as the source
        link.setAttribute("data-bs-index", index);

        const img = document.createElement("img");
        img.classList.add("img-thumbnail", "rounded-lg");
        img.src = `data:image/jpeg;base64,${imageBase64}`; // Display the base64 image
        img.alt = "";

        img.onerror = () => {
          console.error(`Failed to load image: ${imageBase64}`);
          img.src = "path/to/placeholder-image.jpg"; // Fallback image
        };

        link.appendChild(img);
        col.appendChild(link);
        gallery.appendChild(col);
      }
    });

    attachModalEvents(); // Attach event listeners to modal links
  }
}

// Modal image update and navigation logic
let currentIndex = 0; // Track the current image index

function attachModalEvents() {
  const imageLinks = document.querySelectorAll('[data-bs-toggle="modal"]');
  imageLinks.forEach((link) => {
    link.addEventListener("click", function () {
      currentIndex = parseInt(this.getAttribute("data-bs-index")); // Get the index of clicked image
      document.getElementById(
        "modalImage"
      ).src = `data:image/jpeg;base64,${images[currentIndex]}`; // Set base64 as source
    });
  });
}

// Function to show the next image
function showNextImage() {
  if (images.length > 0) {
    currentIndex = (currentIndex + 1) % images.length; // Wrap around if we go past the last image
    document.getElementById(
      "modalImage"
    ).src = `data:image/jpeg;base64,${images[currentIndex]}`; // Set base64 as source
  }
}

// Function to show the previous image
function showPrevImage() {
  if (images.length > 0) {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Wrap around if we go before the first image
    document.getElementById(
      "modalImage"
    ).src = `data:image/jpeg;base64,${images[currentIndex]}`; // Set base64 as source
  }
}

// Event listeners for the next/prev buttons
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", showNextImage);
  prevBtn.addEventListener("click", showPrevImage);
}

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
if (modalImage) {
  modalImage.addEventListener("touchstart", handleSwipe);
  modalImage.addEventListener("touchmove", handleSwipe);
  modalImage.addEventListener("touchend", handleSwipe);
}

// Initialize the gallery by fetching images
fetchImages();
