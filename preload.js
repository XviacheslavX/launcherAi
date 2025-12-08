const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("launcherAPI", {
    login: (email, password, code = null) =>
        ipcRenderer.invoke("auth:login", email, password, code),

    verify: (token) =>
        ipcRenderer.invoke("auth:verify", token),

    logout: (token) =>
        ipcRenderer.invoke("auth:logout", token),
    getServers: () => ipcRenderer.invoke("servers:get"),
    getServerById: (id) => ipcRenderer.invoke("servers:getOne", id),
    loadManifest: (path) => ipcRenderer.invoke("manifest:load", path),
prepareMinecraft: (manifest) => ipcRenderer.invoke("minecraft:prepare", manifest),
launchMinecraft: (manifest, user) => ipcRenderer.invoke("minecraft:launch", manifest, user)
})
