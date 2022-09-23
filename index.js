const app = require('./server')
const port = 8888
app.listen(port, () => {
    console.log(`Backend running on port : ${port}`)
})