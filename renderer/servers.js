async function loadServers() {
    const res = await fetch("../config/servers.json")
    const data = await res.json()

    const serversList = document.getElementById("servers")

    data.servers.forEach(server => {
        const block = document.createElement("div")

        block.innerHTML = `
            <h3>${server.name}</h3>
            <p>Версія: ${server.version}</p>
            <button onclick="play('${server.id}')">Грати</button>
            <hr>
        `

        serversList.appendChild(block)
    })
}

loadServers()

async function play(serverId) {
    console.log("CLICK PLAY:", serverId)

    const res = await fetch("../config/servers.json")
    const data = await res.json()

    const server = data.servers.find(s => s.id === serverId)

    if (!server) {
        alert("Сервер не знайдено у servers.json")
        return
    }

    localStorage.setItem("selectedServer", JSON.stringify(server))

    // ПЕРЕХІД НА loading.html
    window.location = "loading.html"
}
function play(serverId) {
    console.log("Натиснуто Грати:", serverId)
}