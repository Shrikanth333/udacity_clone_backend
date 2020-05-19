const mongoose = require('mongoose');
require('dotenv').config();
const uri = `mongodb+srv://udacity-thor:${process.env.DBPASS}@udacity-thor-ltuh0.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
module.exports = mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
