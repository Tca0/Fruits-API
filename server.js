const express = require('express')
const app = express()
let cors = require("cors")
app.use(cors());

// // define mutler to use uploading images to the backend

// let multer = require('multer');
// // images will be uploaded to puplic/uploads
// // let storage = multer.diskStorage({
// //     destination: function (req, file, cb) {
// //         cb(null, './public/uplaods')
// //     },
// //     filename: function (req, file, cb) {
// //         cb(null, Date.now()+file.originalname)
// //     }
// // })

// const upload = multer({
//     dest: 'images'
//     })

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = require('./controllers/routes')

app.get('/', (req, res) => {
    res.status(200).send('API -Fruits')
})

app.use('/fruits', router)
app.post('/upload', upload.single('./public/uploads'), (req, res) => {
    res.send()
})


module.exports = app
