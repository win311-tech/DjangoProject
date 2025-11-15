// ==================== LOGIN PAGE SCRIPT ====================
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = loginForm.querySelector('input[type="email"]').value.trim();
            const password = loginForm.querySelector('input[type="password"]').value.trim();

            if (!email || !password) {
                alert("Please enter both email and password.");
                return;
            }

            // Basic demo behavior – replace with real backend logic
            if (email === "demo@tastyfoods.com" && password === "1234") {
                alert("Login successful! Welcome back 🍔");
                window.location.href = "order.html"; // Redirect after login
            } else {
                alert("Invalid email or password. Please try again.");
            }
        });
    }
});
