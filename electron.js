const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")
const AzuriomAuth = require("./src/auth/azuriomAuth")
const ServerManager = require("./src/serverManager")
const manifestLoader = require("./src/manifestLoader")
const downloader = require("./src/downloader")
const launcherGame = require("./src/launcher")

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    mainWindow.loadFile("renderer/main.html")
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
})

/* ------------------------ IPC AUTH ------------------------ */

ipcMain.handle("auth:login", async (event, email, password, code) => {
    return await AzuriomAuth.login(email, password, code)
})

ipcMain.handle("auth:verify", async (event, token) => {
    return await AzuriomAuth.verify(token)
})

ipcMain.handle("auth:logout", async (event, token) => {
    return await AzuriomAuth.logout(token)
})
ipcMain.handle("servers:get", async () => {
    return await ServerManager.loadServers()
})
ipcMain.handle("servers:getOne", async (event, id) => {
    const servers = JSON.parse(fs.readFileSync("./config/servers.json"))
    return servers.servers.find(s => s.id === id)
})
ipcMain.handle("manifest:load", (event, mPath) => {
    return manifestLoader.loadManifest(mPath)
})

ipcMain.handle("minecraft:prepare", async (event, manifest) => {
    return await downloader.ensureForgeManifest(manifest)
})

ipcMain.handle("minecraft:launch", (event, manifest, user) => {
    return launcherGame.launchGame(manifest, user)
})