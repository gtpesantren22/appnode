const express = require('express')
const mysql = require('mysql')
const BodyParser = require('body-parser')

const app = express()
app.use(BodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", "views")

const db = mysql.createConnection({
    host: "localhost",
    database: "db_sentral",
    user: "root",
    password: ""
})

db.connect((err) => {
    if (err) throw err
    console.log("Database terkoneksi..")
    
    app.get('/', (req, res) => {
        const sql = "SELECT * FROM pembayaran"
        db.query(sql, (err, result) => {
            const dataSantri = JSON.parse(JSON.stringify(result))
            res.render("index", {datas: dataSantri, title: "Data santri semuanya"})
        })
    })
})

app.listen(3000, () => console.log("server is OK"))