const express = require('express')
const logger = require('morgan')
const cors = require('cors');
require('dotenv').config();
const contactsRouter = require('./routes/api/contacts/contacts');
const usersRouter = require('./routes/api/users')
const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { limiterApi } = require('./helpers/constatnts');
const boolParser = require('express-query-boolean');
const AVATARS_DIR = process.env.AVATARS_DIR;
require('dotenv').config();
const path = require('path');

app.use(helmet());
app.use(express.static(path.join(__dirname, AVATARS_DIR)));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 })); // обмеження об'єму
app.use(boolParser()); // обов'зково після express.json
app.use('/api/', rateLimit(limiterApi))
app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found app' })
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
    res.status(500).json({ status: status === 500 ?'fail': 'error', code: 500, message: err })
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason); // треба ставити обов'язково
});

module.exports = app;
