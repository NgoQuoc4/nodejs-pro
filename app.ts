const express = require("express")

const app = express()
const PORT = 8080

app.get("/" , (req, res) => {
    res.send("HEllO")
})

app.listen(8080, () => {
    console.log(`My app is running on port: ${PORT}`)
})