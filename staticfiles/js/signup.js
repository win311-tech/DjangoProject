// ==================== SIGN-UP PAGE SCRIPT ====================
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector(".signup-form");

    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = signupForm.querySelector('input[placeholder="Full Name"]').value.trim();
            const email = signupForm.querySelector('input[type="email"]').value.trim();
            const password = signupForm.querySelector('input[placeholder="Password"]').value.trim();
            const confirmPassword = signupForm.querySelector('input[placeholder="Confirm Password"]').value.trim();

            if (!name || !email || !password || !confirmPassword) {
                alert("Please fill in all fields.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                return;
            }

            // Demo simulation of account creation
            alert(`Welcome to Tasty Foods, ${name}! 🎉`);
            window.location.href = "login.html"; // Redirect to login page
        });
    }
});
