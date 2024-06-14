const express = require('express')
const dbConnection =require('./db');
var cors = require('cors')

const app = express()
const port = 5000

//Middleware to parse the data into json
app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

dbConnection();