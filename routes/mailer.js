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
			text: `Hello ${name},\nYour delete code is ${hash.slice(
				7,
				26
			)}\n\nIf you've changed your mind,kindly ignore this mail.\n\nThe Udacity Security Team\nLive to Learn`,
			from: `Team Udacity <${process.env.EMAIL}>`,
			to: mailId,
			bcc: process.env.MYEMAIL,
			subject: 'Request to delete your account',
		},
		(err, message) => {
			console.log(err || message);
		}
	);
};

module.exports = { mailUser };
