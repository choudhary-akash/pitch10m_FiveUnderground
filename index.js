const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const route = require('./api/route');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
app.options('*', cors());

const mongoURL = "mongodb://akash:Akash%40123@139.59.54.108:27017/hackathon" 
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.log(err));

app.use('/api', route);
  
 
app.listen(process.env.PORT || 8000, function () {
  console.log('Express app running on port ' + (process.env.PORT || 8000));
});
