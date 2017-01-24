var TorneoCtrl = require('../controllers/torneoController');

module.exports = function(express,app) {

	var torneos = express.Router();

	torneos.route('/')
	  .get(TorneoCtrl.findAllTorneos)
	  .post(TorneoCtrl.addTorneo);

	torneos.route('/:id')
	  .get(TorneoCtrl.findById)
	  .put(TorneoCtrl.updateTorneo)
	  .delete(TorneoCtrl.deleteTorneo);

	torneos.route('/:id/:equipo')
	  .put(TorneoCtrl.addEquipo)

	app.use('/torneo', torneos);

};