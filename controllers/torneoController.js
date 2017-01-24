var mongoose = require('mongoose');
var Torneo  = mongoose.model('Torneo');
var Equipo = mongoose.model('Equipo');

//GET - Return all torneos in the DB
exports.findAllTorneos = function(req, res) {
	Torneo.find(function(err, torneos) {
    if(err) res.send(500, err.message);

    console.log('GET /torneo')
		res.status(200).jsonp(torneos);
	});
};

//GET - Return a Torneo with specified ID
exports.findById = function(req, res) {
	Torneo.findById(req.params.id, function(err, torneo) {
    if(err) return res.send(500, err.message);
    if(!torneo) return res.send(404, "Torneo not found");
    console.log('GET /torneo/' + req.params.id);
		res.status(200).jsonp(torneo);
	});
};

//POST - Insert a new Torneo in the DB
exports.addTorneo = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var torneo = new Torneo({
		nombre:    				req.body.nombre,
		jugadores_por_equipo: 	req.body.jugadores_por_equipo,
		activo: 				true //por defecto sera activo
	});

	torneo.save(function(err, torneo) {
		if(err) return res.send(500, err.message);
    	res.status(200).jsonp(torneo);
	});
};

//PUT - Update a register already exists
exports.updateTorneo = function(req, res) {
	Torneo.findById(req.params.id, function(err, torneo) {

		if(err) return res.send(500, err.message);
		if (!torneo) {return res.send(404, "Torneo not found");}

		torneo.nombre 				= req.body.nombre,
		torneo.jugadores_por_equipo	= req.body.jugadores_por_equipo,
		torneo.activo				= req.body.activo

		torneo.save(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200).jsonp(torneo);
		});
	});
};


//PUT - Agrega un equipo al torneo
exports.addEquipo = function(req, res) {
	Torneo.findById(req.params.id, function(err, torneo) {
		if(err) return res.send(500, err.message);
		if (!torneo) {return res.send(404, "Torneo not found");}

		Equipo.findById(req.params.equipo, function(err, equipo) {
			if(err) return res.send(500, err.message);
			if (!equipo) {return res.send(404, "Equipo not found");}

			torneo.equipos.push(equipo);
			torneo.save(function(err) {
				if(err) return res.send(500, err.message);
	      		res.status(200).jsonp(torneo);
			});
		});
	});
};

//DELETE - Delete a torneo with specified ID
exports.deleteTorneo = function(req, res) {
	Torneo.findById(req.params.id, function(err, torneo) {
		if(err) return res.send(500, err.message);
		if (!torneo) {return res.send(404, "Torneo not found");}
		torneo.remove(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200).jsonp("Successfully deleted");
		})
	});
};

// EXAMPLE POST:
// {
//   "nombre": "Mi torneo",
//   "jugadores_por_equipo": 7
// }