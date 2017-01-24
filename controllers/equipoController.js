var mongoose = require('mongoose');
var Equipo  = mongoose.model('Equipo');
var Torneo  = mongoose.model('Torneo');

//GET - Return all equipos in the DB
exports.findAllEquipos = function(req, res) {
	Equipo.find(function(err, equipos) {
    if(err) res.send(500, err.message);

    console.log('GET /equipo')
		res.status(200).jsonp(equipos);
	});
};

//GET - Return an equipo with specified ID
exports.findById = function(req, res) {
	Equipo.findById(req.params.id, function(err, equipo) {
    if(err) return res.send(500, err.message);
    if(!equipo) return res.send(404, "Equipo not found");
    console.log('GET /equipo/' + req.params.id);
		res.status(200).jsonp(equipo);
	});
};

//POST - Insert a new Equipo in the DB
exports.addEquipo = function(req, res) {
	console.log('POST');
	console.log(req.body);

	Torneo.findById(req.body.torneo_actual, function(err, torneo) {
		if(err) return res.send(500, err.message);
		if (!torneo) {return res.send(404, "Torneo id not found");}
		var equipo = new Equipo({
			nombre:    		req.body.nombre,
			torneo_actual: 	req.body.torneo_actual
		});
		equipo.save(function(err, equipo) {
			if(err) return res.send(500, err.message);
			torneo.equipos.push(equipo);
			torneo.save(function(err) {
				if(err) return res.send(500, err.message);
		      	res.status(200).jsonp(equipo);
			});
		});
	});
	
};

//PUT - Update a register already exists
exports.updateEquipo = function(req, res) {
	Equipo.findById(req.params.id, function(err, equipo) {

		if(err) return res.send(500, err.message);
		if (!equipo) {return res.send(404, "Equipo not found");}

		Torneo.findById(req.body.torneo_actual, function(err, torneo) {
			if(err) return res.send(500, err.message);
			if (!torneo) {return res.send(404, "Torneo id not found");}

			var antiguoTorneo = equipo.torneo_actual;		//guardo antiguo torneo
			var isNuevoTorneo = antiguoTorneo != req.body.torneo_actual;
			
			equipo.nombre 				= req.body.nombre,
			equipo.torneo_actual		= req.body.torneo_actual

			equipo.save(function(err) {
				if(err) return res.send(500, err.message);
				if(isNuevoTorneo){  //si cambio el equipo, debo sacarlo de anterior y agregarlo al nuevo
					torneo.equipos.push(equipo);
					torneo.save(function(err) {
						if(err) return res.send(500, err.message);
					});
					Torneo.findById(antiguoTorneo, function(err, torneo_antiguo) {
						torneo_antiguo.equipos.pop(equipo);
						torneo_antiguo.save(function(err, torneo_antiguo) {
							if(err) return res.send(500, err.message);
						});
					});
				}
				res.status(200).jsonp(equipo);
			});
		});
	});
};

//DELETE - Delete an equipo with specified ID
exports.deleteEquipo = function(req, res) {
	Equipo.findById(req.params.id, function(err, equipo) {
		if(err) return res.send(500, err.message);
		if (!equipo) {return res.send(404, "Equipo not found");}
		equipo.remove(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200).jsonp("Successfully deleted");
		})
	});
};

// EXAMPLE POST:
// {
//   "nombre": "Estudiandes",
//   "torneo_actual": "id_del_torneo"
// }