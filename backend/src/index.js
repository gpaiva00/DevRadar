const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.connect('mongodb+srv://tindev:tindev@cluster-aprenda-8hiin.mongodb.net/tindev?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);