const fs = require("fs")
const axios = require("axios")
const path = require("path")

const LOCAL_PATH = path.join(__dirname, "../config/servers.json")
const REMOTE_URL = "https://yourdomain.com/servers.json" // заміни на свій URL

module.exports = {
    async loadServers() {
        let localData = {}

        // 1. Читаємо локальний файл
        try {
            const raw = fs.readFileSync(LOCAL_PATH, "utf8")
            localData = JSON.parse(raw)
        } catch (err) {
            console.log("Локального servers.json нема або він битий.")
        }

        // 2. Пробуємо скачати онлайн версію
        try {
            const res = await axios.get(REMOTE_URL)

            // 3. Зберігаємо онлайн-версію локально
            fs.writeFileSync(LOCAL_PATH, JSON.stringify(res.data, null, 4))

            console.log("servers.json оновлено з інтернету!")
            return res.data

        } catch (err) {
            console.log("Не вдалося отримати servers.json з інтернету. Використовуємо локальний.")
            return localData
        }
    }
}