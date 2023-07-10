import bodyParser from 'body-parser';
import express from 'express';
import auth from './middleware/auth.js'

import signIn from './handlers/signIn.js';
import signUp from './handlers/signUp.js';

const server = express();
server.use(express.json());
server.get('/', () => { console.log(1); });

server.use(express.urlencoded({extended : true}));
server.get('/signIn', signIn);

server.get('/signUp', signUp);

server.get('/welcome', auth, (req, res) => {
  res.status(200).json({ Welcome: "Welcome!" })
})

server.listen(3000, () => {
  console.log(3);
});
