// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkA-g2xDMKxIjFAKm0rx7He0USiLI1Noc",
  authDomain: "web-undangan-42f23.firebaseapp.com",
  projectId: "web-undangan-42f23",
  storageBucket: "web-undangan-42f23.appspot.com",
  messagingSenderId: "17080874518",
  appId: "1:17080874518:web:2d777ba3f7003e1b432737",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Utility function to calculate relative time
function timeAgo(date) {
  const now = new Date();
  const secondsAgo = Math.floor((now - date) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(secondsAgo / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
}

// Function to save form data with validation
async function saveFormData(event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const status = document.getElementById("status").value.trim();
  const pesan = document.getElementById("pesan").value.trim();

  // Check if any field is empty
  if (!nama || !status || !pesan) {
    Swal.fire({
      title: "Warning!",
      text: "Tolong isi semua data.",
      icon: "warning",
      confirmButtonText: "OK",
    });
    return;
  }

  try {
    await addDoc(collection(db, "invitations"), {
      nama: nama,
      status: status,
      pesan: pesan,
      timestamp: new Date(),
    });

    Swal.fire({
      title: "Success!",
      text: "Data berhasil terkirim.",
      icon: "success",
      confirmButtonText: "OK",
    });

    document.getElementById("formSubmit").reset();
    fetchData(); // Refresh carousel data
  } catch (error) {
    console.error("Error adding document: ", error);
    Swal.fire({
      title: "Error!",
      text: "Failed to save data, please try again.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}

// Function to fetch and display data from Firestore in Owl Carousel
async function fetchData() {
  const dataCarousel = document.getElementById("dataCarousel");
  dataCarousel.innerHTML = ""; // Clear previous data

  try {
    // Create a query to fetch the data ordered by timestamp in descending order
    const invitationsQuery = query(
      collection(db, "invitations"),
      orderBy("timestamp", "desc")
    );

    // Execute the query
    const querySnapshot = await getDocs(invitationsQuery);

    // Check if the carousel is already initialized and destroy it
    if ($(".owl-carousel").data("owl.carousel")) {
      $(".owl-carousel").trigger("destroy.owl.carousel");
      $(".owl-carousel").html(""); // Clear existing Owl Carousel content
    }

    // Loop through each document and add data to carousel
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const timestamp = data.timestamp.toDate(); // Convert Firebase Timestamp to Date
      const timeAgoText = timeAgo(timestamp); // Get relative time

      dataCarousel.innerHTML += `
        <div class="card p-3 mt-5">
            <p><strong>${data.nama}</strong> 
              <span> 
                ${
                  data.status === "1"
                    ? '<i class="fa-solid fa-square-check text-success fa-xl"></i>'
                    : '<i class="fa-solid fa-square-xmark text-danger fa-xl"></i>'
                } 
              </span> 
            </p>
            <p> "${data.pesan}"</p>
            <p> ${timeAgoText}</p>
        </div>
      `;
    });

    // Reinitialize Owl Carousel after adding new content
    $(".owl-carousel").owlCarousel({
      loop: false,
      margin: 30,
      dots: false,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 },
      },
    });
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
}

// Add event listener to the form
document.getElementById("formSubmit").addEventListener("submit", saveFormData);

// Fetch data when the page loads
fetchData();
