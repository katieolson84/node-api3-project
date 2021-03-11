const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const userRouter = require('./users/users-router')
const mw = require('./middleware/middleware')

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
// global middlewares and the user's router need to be connected here
server.use('/api/users', mw.logger, userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: "Something is terribly wrong"
  })
})
module.exports = server;
