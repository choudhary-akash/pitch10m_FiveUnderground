const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const route = require('./api/route');
const mongoose = require('mongoose');
const app = express();

// Load env variables
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
app.options('*', cors());

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const mongoURL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`; 
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.log(err));

app.use('/api', route);
  
 
app.listen(process.env.PORT || 8000, function () {
  console.log('Express app running on port ' + (process.env.PORT || 8000));
});
