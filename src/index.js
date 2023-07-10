import express from 'express'
import signIn from './handlers/signIn.js'
import bodyParser from 'body-parser'
import signUp from './handlers/signUp.js'

const server = express()
server.use(express.json())
server.get('/', () => { console.log(1) })

server.use(express.urlencoded( { extended: true } ))
server.get('/signIn', signIn)

server.get('/signUp', signUp)

server.listen(3000, () => { console.log(3) })
