const express = require('express');
const cors = require('cors');
const app = express();
const { jwtVerify } = require('./authorization/jwtVerify.js');
const port = process.env.PORT || 5050;

app.use(express.json());

app.use(cors());
app.use('/login', require('./routes/logInRoute'));
app.use('/signup', require('./routes/signUpRoute'));

app.use(jwtVerify);
app.use('/payment', require('./routes/payment'));
app.use('/users', require('./routes/userRoutes'));
app.use('/admins', require('./routes/adminRoutes'));
app.use('/programs', require('./routes/program.js'));

app.use(function (err, req, res, next) {
	console.log(err.message);
	res.status(500).send('Bad Request');
});
app.listen(port, () => console.log(`Listening on port ${port}...`));
