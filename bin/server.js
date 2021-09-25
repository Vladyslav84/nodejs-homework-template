const mongoose = require('mongoose');
const app = require('../app');
const uriDb = process.env.DB_HOST;
// require('dotenv').config();
const PORT = process.env.PORT || 3000;

mongoose.connect(uriDb, {
    // promiseLibrary: global.Promise,
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
}).then(() => {
    app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
}).catch((e) => {
  console.log(`Error: ${e.message}`);
  process.exit(1);
})

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
