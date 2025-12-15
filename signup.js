document.addEventListener('DOMContentLoaded', () => {
    // Получаем элементы
    const usernameInput = document.getElementById('signup-username'); // Исправлено под твой HTML
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const submitBtn = document.getElementById('signup-btn');
    const rulesPanel = document.getElementById('password-rules-panel');
    
    const ruleLength = document.getElementById('rule-length');
    const ruleCase = document.getElementById('rule-case');
    const ruleDigit = document.getElementById('rule-digit');

    // Проверка наличия элементов, чтобы не крашилось
    if (!usernameInput || !submitBtn) {
        console.error("Critical Error: Elements not found in signup.html");
        return;
    }

    // Показываем панель
    passwordInput.addEventListener('focus', () => {
        if (rulesPanel) rulesPanel.style.display = 'block';
    });

    // Живая проверка пароля
    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        updateRuleStyle(ruleLength, val.length >= 8);
        updateRuleStyle(ruleCase, /[a-z]/.test(val) && /[A-Z]/.test(val));
        updateRuleStyle(ruleDigit, /\d/.test(val));
    });

    function updateRuleStyle(element, isValid) {
        if (!element) return;
        if (isValid) element.classList.add('valid');
        else element.classList.remove('valid');
    }

    // Клик по кнопке регистрации
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Проверка пароля
        const isPasswordValid = 
            password.length >= 8 &&
            /[a-z]/.test(password) && /[A-Z]/.test(password) &&
            /\d/.test(password);

        if (!username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (!isPasswordValid) {
            alert("Password does not meet requirements.");
            return;
        }

        // Сохранение (ключ nickname, чтобы совпадал с signin.js)
        const userData = {
            username: username, 
            email: email,
            password: password
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        console.log("Saved:", userData);

        alert("Registration successful!");
        window.location.href = 'index.html';
    });
});
