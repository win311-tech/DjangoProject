// ==================== SIGN-UP PAGE SCRIPT ====================
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector(".signup-form");

    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            const name = signupForm.querySelector('input[placeholder="Full Name"]').value.trim();
            const email = signupForm.querySelector('input[type="email"]').value.trim();
            const password = signupForm.querySelector('input[placeholder="Password"]').value.trim();
            const confirmPassword = signupForm.querySelector('input[placeholder="Confirm Password"]').value.trim();

            if (!name || !email || !password || !confirmPassword) {
                e.preventDefault();
                alert("Please fill in all fields.");
                return;
            }

            if (password !== confirmPassword) {
                e.preventDefault();
                alert("Passwords do not match. Please try again.");
                return;
            }

            // If validation passes, let the form submit to Django backend
            // Django will handle user creation and redirect
        });
    }
});