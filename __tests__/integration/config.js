const mongoose  = require('mongoose');
const DB_uri = 'mongodb://127.0.0.1:27017';

function dbconnect() {
    mongoose.connect(DB_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
    return mongoose.connection
  }

  function dbclose() {
    return mongoose.disconnect();
  }

module.exports = {dbconnect, dbclose};
