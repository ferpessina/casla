
var JugadorCtrl = require('../controllers/jugadorController');

module.exports = function(express,app) {

	var jugadores = express.Router();

	jugadores.route('/')
	  .get(JugadorCtrl.findAllJugadores)
	  .post(JugadorCtrl.addJugador);

	jugadores.route('/:id')
	  .get(JugadorCtrl.findById)
	  .put(JugadorCtrl.updateJugador)
	  .delete(JugadorCtrl.deleteJugador);

	app.use('/jugador', jugadores);

};