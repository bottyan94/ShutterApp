var express =  require('express')
var app = express()
const port = 8080

app.use('/', (req, res) => {
    res.status(200).send("Hello")
})

app.use(express.static('public'))

app.listen(port,()=>{
    console.log(`Server is listening on ${port}`)
})