
const mongoose = require('mongoose');
const uriDb = process.env.DB_HOST;

const db = mongoose.connect(uriDb, {
    promiseLibrary: global.Promise,
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
    console.log("Connection open");
});

mongoose.connection.on('error', (e) => {
    console.log(`Error ${e.message}`);
});

mongoose.connection.on('disconnected', (e) => {
    console.log("Error mongoose connection");
});


process.on('SINGIN', async () => {
    mongoose.connection.close(() => {
       console.log("Connection to DB terminated");
       process.exit(1);
   })
    
});

module.exports = db;