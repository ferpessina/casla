var CanchaCtrl = require('../controllers/canchaController');

module.exports = function(express,app) {

	var canchas = express.Router();

	canchas.route('/')
	  .get(CanchaCtrl.findAllCanchas)
	  .post(CanchaCtrl.addCancha);

	canchas.route('/:id')
	  .get(CanchaCtrl.findById)
	  .put(CanchaCtrl.updateCancha)
	  .delete(CanchaCtrl.deleteCancha);

	app.use('/cancha', canchas);

};
