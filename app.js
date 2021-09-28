const express = require('express')
const logger = require('morgan')
const cors = require('cors');
require('dotenv').config();
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users')
const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'


// DB_HOST=mongodb+srv://Vladyslav:mPmkcV43UXi12vn4@cluster0.qg5tp.mongodb.net/db-contacts?retryWrites=true&w=majority

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);


app.use((req, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found111' })
});

app.use((err, req, res, next) => {
  res.status(500).json({ status: 'fail', code: 500, message: err.message })
});

module.exports = app;
