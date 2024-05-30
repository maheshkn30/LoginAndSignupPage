document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("login-btn")
    .addEventListener("click", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      try {
        const response = await axios.post("http://localhost:3000/login", {
          email,
          password,
        });

        if (response.status === 200) {
          window.location.href = "home.html"; // Redirect to home page after successful login
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.msg || "Invalid email or Password";
        document.getElementById("message").innerText = errorMessage;
      }
    });
});
