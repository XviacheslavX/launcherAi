async function login() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const status = document.getElementById("status")

    status.innerText = "Авторизація..."

    let result = await window.launcherAPI.login(email, password)

    if (result.status === "pending" && result.reason === "2fa") {
        const code = prompt("Введіть 2FA код:")
        result = await window.launcherAPI.login(email, password, code)
    }

    if (result.status !== "success") {
        status.innerText = "Помилка: " + JSON.stringify(result)
        return
    }

    status.innerText = "Успішний логін! Вітаємо, " + result.user.username

    // 👉 ЗБЕРЕГАЄМО КОРИСТУВАЧА
    localStorage.setItem("user", JSON.stringify(result.user))

    // 👉 ПЕРЕХОДИМО ДО ГОЛОВНОГО ЕКРАНУ
    window.location = "main.html"
}
