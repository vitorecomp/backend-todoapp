const jwt = require('jsonwebtoken');
let Basic = {}
const secret = 'MUITOS_SEGREDOS'
Basic.login = (req, res) => {
	var body = req.body;
	if (body.username == 'usuario' && body.password == '123456') {
		var token = jwt.sign(
			{
				username: 'usuario',
				role: 'admin'
			},
			secret,
			{
				expiresIn: '1h'
			}
		);
		res.send({ auth: true, token });
	} else {
		res.status(401).send({ auth: false, message: 'Error in username or password' });
	}
}

Basic.home = (req, res) => {
	res.send({
		message: 'ok'
	});
}

module.exports = Basic


