const mongoose = require('mongoose');
const app = require('../app');
let uriDb = null;
if (process.env.NODE_ENV === 'test') {
    uriDb = process.env.DB_HOST_TEST
} else {
    uriDb = process.env.DB_HOST
};
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const TMP_DIR = process.env.TMP_DIR;
require('dotenv').config();
const createFolderIsNotExist = require('../helpers/createFolder');

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
});
    db.then(() => {
    app.listen(PORT, async () => {
        await createFolderIsNotExist(TMP_DIR);
  console.log(`Server running. Use our API on port: ${PORT}`);
});
}).catch((e) => {
  console.log(`Error: ${e.message}`);
//   process.exit(1);
})

mongoose.connection.on('connected', () => {
    // console.log("Connection open");
});

mongoose.connection.on('error', (e) => {
    // console.log(`Error ${e.message}`);
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