const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

mongoose.connect('mongodb+srv://devradar:devradar@cluster-aprenda-8hiin.mongodb.net/tindev?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

const app = express();

app.use(cors({ origin: 'http://localhost:8080' }))
app.use(express.json());
app.use(routes);

app.listen(3001);