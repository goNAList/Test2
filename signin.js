document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('signin-username'); // Исправлено под твой HTML
    const emailInput = document.getElementById('signin-email');
    const passwordInput = document.getElementById('signin-password');
    const loginBtn = document.getElementById('signin-btn');

    if (!loginBtn) {
        console.error("Critical Error: Login button not found");
        return;
    }

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Считываем данные
        const enteredUsername = usernameInput ? usernameInput.value.trim() : '';
        const enteredEmail = emailInput.value.trim();
        const enteredPassword = passwordInput.value;

        const storedUserJSON = localStorage.getItem('currentUser');

        if (!storedUserJSON) {
            alert("User not found. Please register first.");
            return;
        }

        const userData = JSON.parse(storedUserJSON);
        console.log("Stored:", userData); // Для отладки
        console.log("Entered:", { enteredUsername, enteredEmail, enteredPassword }); // Для отладки

        // Сравниваем
        // Важно: userData.nickname должно существовать (см. signup.js)
        const isUsernameCorrect = enteredUsername === userData.username;
        const isEmailCorrect = enteredEmail === userData.email;
        const isPasswordCorrect = enteredPassword === userData.password;

        if (isUsernameCorrect && isEmailCorrect && isPasswordCorrect) {
            console.log("Login success, redirecting...");
            window.location.href = 'user.html';
        } else {
            alert("Incorrect credentials.");
        }
    });
});
