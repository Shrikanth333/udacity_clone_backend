const express = require('express');
const app = express();

const port = process.env.PORT || 5050;

app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admins', require('./routes/adminRoutes'));



app.use('/program', require('./routes/program.js'));

app.use(function (err, req, res, next) {
  res.status(500).send('Bad Request');
});
app.listen(port, () => console.log(`Listening on port ${port}...`));


