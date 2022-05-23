const express = require('express')
const { default: mongoose } = require('mongoose')
      mongoose = require('mongoose')
      path = require('path')
      config = require('config')

const app = express()
app.use(express.json())

//Used in production for client files

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

//Connecting to MongoDB and running on express server port 4000

const dbURI = config.get('dbURI')
const port = process.env.PORT || 4000
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then((result) => app.listen(port))
.catch((err) => console.log(err))
