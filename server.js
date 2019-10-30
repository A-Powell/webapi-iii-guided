const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');
const dateLogger = require('./api/dateLogger-middleware.js');
const gateKeeper = require('./api/gateKeeper-middleware.js');
const server = express();


const doubler = (req, res, next) => {
  //everything coming from the url is a string
  const number = Number(req.query.number || 0);

req.doubled = number * 2;

next();
}


server.use(helmet());
server.use(gateKeeper);
server.use(express.json());
server.use(dateLogger);
server.use(morgan('dev'));


server.use('/api/hubs', hubsRouter);


server.get('/', doubler, (req, res) => {
  res.status(200).json({number: req.doubled});
});

module.exports = server;
