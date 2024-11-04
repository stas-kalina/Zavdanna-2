document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const userImage = document.getElementById('userImage');
    const userEmail = document.getElementById('userEmail');
    const userDetails = document.getElementById('userDetails');
    const logoutButton = document.getElementById('logoutButton');

    // Перевірка чи користувач вже залогінений
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
        displayUserInfo(savedUser);
    }

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            // Запит на авторизацію
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) throw new Error("Login failed");

            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data)); // Збереження користувача

            fetchUserData(data.id); // Завантаження даних користувача
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('user');
        location.reload(); // Перезавантажуємо сторінку для виходу
    });

    async function fetchUserData(userId) {
        try {
            const response = await fetch(`https://dummyjson.com/users/${userId}`);
            const userData = await response.json();

            localStorage.setItem('user', JSON.stringify(userData)); // Оновлюємо збережені дані
            displayUserInfo(userData);
        } catch (error) {
            alert('Failed to load user data: ' + error.message);
        }
    }

    function displayUserInfo(user) {
        loginForm.style.display = 'none';
        userInfo.style.display = 'block';
        userName.textContent = user.firstName + ' ' + user.lastName;
        userImage.src = user.image;
        userEmail.textContent = `Email: ${user.email}`;
        userDetails.textContent = `Age: ${user.age}, Gender: ${user.gender}`;
    }
});
