const express = require('express')
const app = express()
let cors = require("cors")
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const appRouts = require('./controllers/routes')

app.get('/', (req, res) => {
    res.status(200).send('Hello Gustaf!')
})

app.use('/fruits', appRouts)


module.exports = app