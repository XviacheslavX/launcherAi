const fs = require("fs")
const path = require("path")

module.exports = {
    loadManifest(profilePath) {
        const fullPath = path.join(__dirname, "../", profilePath)

        if (!fs.existsSync(fullPath)) {
            throw new Error("Манифест не знайдено: " + fullPath)
        }

        const data = fs.readFileSync(fullPath, "utf8")
        return JSON.parse(data)
    }
}