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


// DB_HOST=mongodb+srv://Vladyslav:mPmkcV43UXi12vn4@cluster0.qg5tp.mongodb.net/db-contacts?retryWrites=true&w=majority
app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 })); // обмеження об'єму
app.use(boolParser()); // обов'зково після express.json
app.use('/api/', rateLimit(limiterApi))
app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);


app.use((req, res) => {
  console.log(req.body);
  res.status(404).json({ status: 'error', code: 404, message: 'Not found1' })
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ status: 'fail', code: 500, message: err.message })
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason); // треба ставити обов'язково
});

module.exports = app;
