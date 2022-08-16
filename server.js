const express = require("express")
const favicon = require("express-favicon")
const path = require("path")
const {PORT=3000, LOCAL_ADDRESS="0.0.0.0"} = process.env

const app = express()
app.use(favicon(__dirname + "/build/favicon.png"))

app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, "build")))

app.get("/ping", (req, res) => {
    return res.json("pong")
})

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.listen(PORT, LOCAL_ADDRESS)