document
  .getElementById("uploadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", document.getElementById("imageUrl").files[0]);

    try {
      const response = await fetch("http://localhost:5000/uploadGallery", {
        method: "POST",
        body: formData,
        headers: {
          // Add any necessary headers here, like authorization if needed
          // "Authorization": "Bearer <your-token>"
        },
      });

      // Check if the response is a JSON or HTML response
      const contentType = response.headers.get("Content-Type");

      if (!contentType || !contentType.includes("application/json")) {
        // If it's not JSON, assume it's an error page or non-JSON response
        throw new Error("Unexpected response format: " + contentType);
      }

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
