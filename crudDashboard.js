document
  .getElementById("uploadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", document.getElementById("image").files[0]);

    try {
      const response = await fetch(
        "https://backend-undangan-pernikahan-opang.vercel.app/uploadGallery",
        {
          method: "POST",
          body: formData,
          headers: {
            // Add any necessary headers here, like authorization if needed
            // "Authorization": "Bearer <your-token>"
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        document.getElementById(
          "responseMessage"
        ).innerHTML = `<div class="alert alert-success">${data.message}</div>`;
      } else {
        document.getElementById(
          "responseMessage"
        ).innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById(
        "responseMessage"
      ).innerHTML = `<div class="alert alert-danger">Something went wrong. Please try again later.</div>`;
    }
  });
