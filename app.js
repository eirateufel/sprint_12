const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();
const path = require('path');
const usersRouter = require('./routes/users.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);

app.listen(PORT, () => {
  console.log('Im running');
});
