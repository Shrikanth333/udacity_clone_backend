const express = require('express');
const cors = require('cors');
const app = express();
const {jwtVerify}=require("./authorization/jwtVerify.js")
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(cors())

app.use('/api/users', require('./routes/userRoutes'));
app.use(jwtVerify)
app.use('/api/admins', require('./routes/adminRoutes'));
app.use('/programs', require('./routes/program.js'));

app.use(function (err, req, res, next) {
	res.status(500).send('Bad Request');
});
app.listen(port, () => console.log(`Listening on port ${port}...`));
