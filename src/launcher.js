const { spawn } = require("child_process")
const fs = require("fs")
const path = require("path")

function launchGame(manifest, user) {
  const gameDir = path.join(__dirname, "../game/", manifest.version)

  // ПОКИ що вважаємо що Java вже є
  const javaPath = "java" // тимчасово

  // libraries/
  const libsDir = path.join(gameDir, "libraries")
  const libs = fs.readdirSync(libsDir).map(f => path.join(libsDir, f))

  const classpath = [
    path.join(gameDir, "forge.jar"),
    path.join(gameDir, "minecraft.jar"),
    ...libs
  ].join(path.delimiter)

  const args = [
    ...manifest.jvmArgs,
    "-cp", classpath,
    manifest.mainClass,
    "--username", user.username,
    "--version", manifest.version
  ]

  const game = spawn(javaPath, args, { cwd: gameDir })

  game.stdout.on("data", data => console.log("[MC]", data.toString()))
  game.stderr.on("data", data => console.log("[ERR]", data.toString()))

  game.on("close", code => console.log("Minecraft closed:", code))
}

module.exports = { launchGame }