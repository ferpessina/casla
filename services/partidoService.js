var mongoose = require('mongoose');
var Partido = mongoose.model('Partido');
var Equipo = mongoose.model('Equipo');
var Torneo = mongoose.model('Torneo');
var logger = require('../logger');

//GET - Return all partidos in the DB
exports.findAllPartidos = function(req, res) {
	Partido.find(function(err, partidos) {
    if(err) res.send(500, err.message);

    console.log('GET /partido')
		res.status(200).jsonp(partidos);
	});
};

//GET - Return a partido with specified ID
exports.findById = function(req, res) {
	Partido.findById(req.params.id, function(err, partido) {
    if(err) return res.send(500, err.message);
    if(!partido) return res.send(404, "Partido not found");
    console.log('GET /partido/' + req.params.id);
		res.status(200).jsonp(cancha);
	});
};

//POST - Insert a new partido in the DB
exports.addPartido = function(req, res) {
	console.log('POST');
	console.log(req.body);

	Torneo.findById(req.body.torneo, function(err, torneo) {
		if(err) return res.send(500, err.message);
		if (!torneo) {return res.send(404, "Torneo id not found");}

		Equipo.findById(req.body.equipo1, function(err, equipo1) {
			if(err) return res.send(500, err.message);
			if (!equipo1) {return res.send(404, "Equipo 1 id not found");}
			if(!(equipo1.torneo_actual.equals(torneo._id))) {return res.send(400, "El Equipo 1 no pertenece al torneo "+torneo.nombre);}

			Equipo.findById(req.body.equipo2, function(err, equipo2) {
				if(err) return res.send(500, err.message);
				if (!equipo2) {return res.send(404, "Equipo 2 id not found");}
				if(!(equipo2.torneo_actual.equals(torneo._id))) {return res.send(400, "El Equipo 2 no pertenece al torneo "+torneo.nombre);}

				var partido = new Partido({
					equipo1:    		req.body.equipo1,
					equipo2:    		req.body.equipo2,
					fecha: 				req.body.fecha,
					fecha_numero: 		req.body.fecha_numero,
					torneo: 			req.body.torneo,
					marcador_equipo_1: 	req.body.marcador_equipo_1,
					marcador_equipo_2: 	req.body.marcador_equipo_2,
					amonestados: 		req.body.amonestados,
					expulsados: 		req.body.expulsados,
					goles: 				req.body.goles,
					cambios: 			req.body.cambios
				});
				partido.save(function(err, partido) {
					if(err) return res.send(500, err.message);
					logger.info(req.user+" ha agregado al partido "+partido._id+": "+partido.equipo1.nombre+" VS "+partido.equipo2.nombre+", fecha "+partido.fecha_numero+", el "+partido.fecha);
					equipo1.partidos.push(partido);
					equipo1.save(function(err, equipo1) {
						if(err) return res.send(500, err.message);
						logger.info("El equipo "+equipo1.nombre+" ha agregado al partido "+partido._id+": "+partido.equipo1.nombre+" VS "+partido.equipo2.nombre);
			    		equipo2.partidos.push(partido);
						equipo2.save(function(err, equipo2) {
							if(err) return res.send(500, err.message);
							logger.info("El equipo "+equipo2.nombre+" ha agregado al partido "+partido._id+": "+partido.equipo1.nombre+" VS "+partido.equipo2.nombre);
				    		torneo.partidos.push(partido);
							torneo.save(function(err, torneo) {
								if(err) return res.send(500, err.message);
								logger.info("El torneo "+torneo.nombre+" ha agregado al partido "+partido._id+": "+partido.equipo1.nombre+" VS "+partido.equipo2.nombre);
					    		res.status(200).jsonp(partido);
					    	});
				    	});
			    	});
				});
			});
		});
	});
};

//PUT - Update a register already exists
exports.updatePartido = function(req, res) {
	// Cancha.findById(req.params.id, function(err, cancha) {

	// 	if(err) return res.send(500, err.message);
	// 	if (!cancha) {return res.send(404, "Cancha not found");}

	// 	Torneo.findById(req.body.torneo_actual, function(err, torneo) {
	// 		if(err) return res.send(500, err.message);
	// 		if (!torneo) {return res.send(404, "Torneo id not found");}
			
	// 		cancha.nombre 				= req.body.nombre,
	// 		cancha.torneo_actual		= req.body.torneo_actual

	// 		cancha.save(function(err) {
	// 			if(err) return res.send(500, err.message);
	// 			torneo.canchas.push(cancha);
	// 			torneo.save(function(err) {
	// 				if(err) return res.send(500, err.message);
	// 				res.status(200).jsonp(cancha);
	// 			});
	// 		});
	// 	});
	// })
};

//DELETE - Delete a partido with specified ID
exports.deletePartido = function(req, res) {
	Partido.findById(req.params.id, function(err, partido) {

		var equipo1DelPartido = partido.equipo1;
		var equipo2DelPartido = partido.equipo2;
		var torneoDelPartido = partido.torneo;

		Equipo.findById(equipo1DelPartido, function(err, equipo1DelPartido) {
			if(err) return res.send(500, err.message);
			if (!equipo1DelPartido) {return res.send(404, "Equipo 1 id not found");}
			equipo1DelPartido.partidos.pop(partido);
			equipo1DelPartido.save(function(err, equipo1DelPartido) {
				if(err) return res.send(500, err.message);
				logger.info("El equipo "+equipo1DelPartido.nombre+" ha quitado al partido "+partido.equipo1+" VS "+partido.equipo2+", fecha "+partido.fecha_numero);
			});
		});

		Equipo.findById(equipo2DelPartido, function(err, equipo2DelPartido) {
			if(err) return res.send(500, err.message);
			if (!equipo2DelPartido) {return res.send(404, "Equipo 2 id not found");}
			equipo2DelPartido.partidos.pop(partido);
			equipo2DelPartido.save(function(err, equipo2DelPartido) {
				if(err) return res.send(500, err.message);
				logger.info("El equipo "+equipo2DelPartido.nombre+" ha quitado al partido "+partido.equipo1+" VS "+partido.equipo2+", fecha "+partido.fecha_numero);
			});
		});

		Torneo.findById(partido.torneo, function(err, torneo) {
			if(err) return res.send(500, err.message);
			if (!torneo) {return res.send(404, "Torneo id not found");}
			torneo.partidos.pop(partido);
			torneo.save(function(err, torneo) {
				if(err) return res.send(500, err.message);
				logger.info("El torneo "+torneo.nombre+" ha quitado al partido "+partido.equipo1+" VS "+partido.equipo2+", fecha "+partido.fecha_numero);
			});
		});

		partido.remove(function(err) {
				if(err) return res.send(500, err.message);
				logger.info(req.user+" ha borrado el partido "+partido.nombre);
	      		res.status(200).jsonp("Successfully deleted");
		})
	});
};


//EXAMPLE POST
// {
//   "equipo1": "58865fe1c6058e592e000003",
//   "equipo2": "58865fe1c6058e592e000003",
//   "fecha_numero": 0,
//   "fecha": "2016-10-10",
//   "marcador_equipo_1": 0,
//   "marcador_equipo_2": 0,
//   "torneo": "58865fd4c6058e592e000002"
// }