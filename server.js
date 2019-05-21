let app = require('./config/express')()
let models = require('./config/database')

let init = async function () {
	await models()

	app.listen(3000, () => {
		console.log('Servidor iniciado');
	});
}

init()


