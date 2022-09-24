const express = require('express')
const app = express()
let cors = require("cors")
app.use(cors());

// app.use('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:8888");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Credentials', true);
//     next(); 
//     });
// app.options('*', cors());

// let whitelist = ['http://localhost:5500', 'http://127.0.0.1:5500',"http://localhost:8888", 'http://127.0.0.1:8888' ];
// let corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }
// app.use(cors(corsOptions));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = require('./controllers/routes')

app.get('/', (req, res) => {
    res.status(200).send('API -Fruits')
})

app.use('/fruits', router)


module.exports = app
