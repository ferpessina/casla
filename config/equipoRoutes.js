var EquipoCtrl = require('../controllers/equipoController');

module.exports = function(express,app) {

	var equipos = express.Router();

	equipos.route('/')
	  .get(EquipoCtrl.findAllEquipos)
	  .post(EquipoCtrl.addEquipo);

	equipos.route('/:id')
	  .get(EquipoCtrl.findById)
	  .put(EquipoCtrl.updateEquipo)
	  .delete(EquipoCtrl.deleteEquipo);

	app.use('/equipo', equipos);

};