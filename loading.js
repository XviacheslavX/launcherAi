async function start() {
    const log = (msg) => document.getElementById("log").innerText += msg + "\n"

    const server = JSON.parse(localStorage.getItem("selectedServer"))
    const user = JSON.parse(localStorage.getItem("user"))

    log("Читаємо манифест...")
    const manifest = await window.launcherAPI.loadManifest(server.manifest)

    log("Завантажуємо файли...")
    await window.launcherAPI.prepareMinecraft(manifest)

    log("Запускаємо гру...")
    await window.launcherAPI.launchMinecraft(manifest, user)
}

start()