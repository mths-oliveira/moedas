const fs = require("fs")
const { resolve } = require("path")

function readFile(path) {
  //const absolutePath = resolve(__dirname, path)
  const content = fs.readFileSync(path, "utf8")
  return content
}

console.log(readFile("./public"))
