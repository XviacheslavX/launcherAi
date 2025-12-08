const axios = require("axios")
const fs = require("fs")
const path = require("path")
const unzipper = require("unzipper")  // потрібно: npm install unzipper

async function downloadFile(url, dest) {
  const writer = fs.createWriteStream(dest)
  const resp = await axios.get(url, { responseType: "stream" })
  resp.data.pipe(writer)
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

async function ensureForgeManifest(manifest) {
  const baseDir = path.join(__dirname, "../game/", manifest.version)

  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true })

  // minecraft.jar
  const mcJar = path.join(baseDir, "minecraft.jar")
  if (!fs.existsSync(mcJar)) {
    await downloadFile(manifest.minecraftJar, mcJar)
  }

  // libraries.zip → розпаковка
  const libsZip = path.join(baseDir, "libraries.zip")
  await downloadFile(manifest.librariesZip, libsZip)

  await fs.createReadStream(libsZip)
    .pipe(unzipper.Extract({ path: path.join(baseDir, "libraries") }))
    .promise()

  // forge.jar
  const forgeJar = path.join(baseDir, "forge.jar")
  await downloadFile(manifest.forgeJar, forgeJar)

  return baseDir
}

module.exports = { downloadFile, ensureForgeManifest }