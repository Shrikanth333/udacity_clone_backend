const mongoose = require('mongoose');
const uri =
	'mongodb+srv://udacity-thor:avengers$23@udacity-thor-ltuh0.mongodb.net/thor-staging-db-server?retryWrites=true&w=majority';

module.exports = mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: true
});
