document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("signup-btn")
    .addEventListener("click", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        document.getElementById("message").innerText =
          "Passwords is not matching";
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/signup", {
          email,
          firstName,
          lastName,
          password,
        });

        if (response.status === 200) {
          window.location.href = "login.html";
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.msg || "Please fill the fields";
        document.getElementById("message").innerText = errorMessage;
      }
    });
});
