var mongoose = require('mongoose');
var Cancha = mongoose.model('Cancha');
var logger = require('../logger');

//GET - Return all canchas in the DB
exports.findAllCanchas = function(req, res) {
	Cancha.find(function(err, canchas) {
    if(err) res.send(500, err.message);

    console.log('GET /cancha')
		res.status(200).jsonp(canchas);
	});
};

//GET - Return an cancha with specified ID
exports.findById = function(req, res) {
	Cancha.findById(req.params.id, function(err, cancha) {
    if(err) return res.send(500, err.message);
    if(!cancha) return res.send(404, "Cancha not found");
    console.log('GET /cancha/' + req.params.id);
		res.status(200).jsonp(cancha);
	});
};

//POST - Insert a new cancha in the DB
exports.addCancha = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var cancha = new Cancha({
		nombre:    		req.body.nombre
	});
	cancha.save(function(err, cancha) {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(cancha);
	});
};

//PUT - Update a register already exists
exports.updateCancha = function(req, res) {
	Cancha.findById(req.params.id, function(err, cancha) {

		if(err) return res.send(500, err.message);
		if (!cancha) {return res.send(404, "Cancha not found");}
		
			cancha.nombre 				= req.body.nombre

			cancha.save(function(err) {
				if(err) return res.send(500, err.message);
				res.status(200).jsonp(cancha);
			});
	})
};

//DELETE - Delete an cancha with specified ID
// exports.deleteCancha = function(req, res) {
// 	Cancha.findById(req.params.id, function(err, cancha) {

// 		var torneoDeLaCancha = cancha.torneo;
		
// 		Torneo.findById(torneoDeLaCancha, function(err, torneo_de_la_cancha) {
// 			torneo_de_la_cancha.canchas.pop(cancha);
// 			torneo_de_la_cancha.save(function(err, torneo_de_la_cancha) {
// 				if(err) return res.send(500, err.message);
// 				logger.info("El torneo "+torneoDeLaCancha+" ha quitado a la cancha "+cancha.nombre);
// 			});
// 		});

// 		if(err) return res.send(500, err.message);
// 		if (!cancha) {return res.send(404, "Cancha not found");}
// 		cancha.remove(function(err) {
// 			if(err) return res.send(500, err.message);
// 			logger.info(req.user+" ha borrado la cancha "+cancha.nombre);
//       		res.status(200).jsonp("Successfully deleted");
// 		})
// 	});
// };

// EXAMPLE POST:
// {
//   "nombre": "San Martin",
//   "torneo_actual": "id_del_torneo"
// }
