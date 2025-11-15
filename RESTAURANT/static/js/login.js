document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            const email = loginForm.querySelector('input[type="email"]').value.trim();
            const password = loginForm.querySelector('input[type="password"]').value.trim();

            if (!email || !password) {
                e.preventDefault();
                alert("Please enter both email and password.");
            }
            // otherwise, let the form submit naturally to Django
        });
    }
});
