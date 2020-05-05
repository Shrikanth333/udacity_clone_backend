const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/program', require('./routes/program.js'));

const port = process.env.PORT || 8000;
app.use(function (err, req, res, next) {
  res.status(500).send('Bad Request');
});

app.listen(port);
