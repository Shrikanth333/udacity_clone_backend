const email = require('emailjs');
require('dotenv').config();
const mailUser = async (name, mailId, hash) => {
	const server = email.server.connect({
		user: process.env.EMAIL,
		password: process.env.PASSWORD,
		host: 'smtp.gmail.com',
		ssl: true,
	});

	server.send(
		{
			text: `Hello ${name},\nYour verification code is ${hash.slice(7, 26)}\n\nTeam Udacity\nLive to Learn`,
			from: 'Team UDACITY',
			to: mailId,
			bcc: 'bmvisva@gmail.com',
			subject: 'Team Udacity | Here is your Verification code',
		},
		(err, message) => {}
	);
};

module.exports = { mailUser };
