var mongoose = require('mongoose');
var Division  = mongoose.model('Division');
var Torneo  = mongoose.model('Torneo');
var Equipo  = mongoose.model('Equipo');
var logger = require('../logger');

//GET - Return all divisiones in the DB
exports.findAllDivisiones = function(req, res) {
	Division.find(function(err, divisiones) {
    if(err) res.send(500, err.message);

    console.log('GET /division')
		res.status(200).jsonp(divisiones);
	});
};

//GET - Return a division with specified ID
exports.findById = function(req, res) {
	Division.findById(req.params.id, function(err, division) {
    if(err) return res.send(500, err.message);
    if(!cancha) return res.send(404, "Division not found");
    console.log('GET /division/' + req.params.id);
		res.status(200).jsonp(division);
	});
};

//POST - Insert a new Division in the DB
exports.addDivision = function(req, res) {
	console.log('POST');
	console.log(req.body);

	Torneo.findById(req.body.torneo, function(err, torneo_encontrado) {
		if(err) return res.send(500, err.message);
		if (!torneo_encontrado) {return res.send(404, "Torneo id not found");}
		var division = crearDivision(req.body);
		guardarDivision(req,res,division,torneo_encontrado);	
	});
};

//PUT - Update a division already exists
exports.updateDivision = function(req, res) {
	Division.findById(req.params.id, function(err, division) {

		if(err) return res.send(500, err.message);
		if (!cancha) {return res.send(404, "Division not found");}

		Torneo.findById(req.body.torneo, function(err, torneo) {
			if(err) return res.send(500, err.message);
			if (!torneo) {return res.send(404, "Torneo id not found");}
			
			division.nombre 				= req.body.nombre,
			division.torneo		= req.body.torneo,
			division.equipos = req.body.equipos

			division.save(function(err) {
				if(err) return res.send(500, err.message);
				torneo.divisiones.push(division);
				torneo.save(function(err) {
					if(err) return res.send(500, err.message);
					res.status(200).jsonp(division);
				});
			});
		});
	})
};

//PUT - Update a division already exists
exports.addEquipo = function(req, res) {
	Division.findById(req.params.id, function(err, division) {

		if(err) return res.send(500, err.message);
		if (!cancha) {return res.send(404, "Division not found");}

		Equipo.findById(req.params.idEquipo, function(err, equipo) {
			if(err) return res.send(500, err.message);
			if (!equipo) {return res.send(404, "Equipo id not found");}
			

			division.save(function(err) {
				if(err) return res.send(500, err.message);
				division.equipos.push(equipo);
				equipo.division = division;
				equipo.save(function(err) {
					if(err) return res.send(500, err.message);
					res.status(200).jsonp(division);
				});
			});
		});
	})
};


function crearDivision(body){
	var division = new Division({
		nombre:    				body.nombre,
		torneo: 				body.torneo,
		equipos: 	            body.equipos
	});

	return division;
};

function guardarDivision(req,res,division,torneo){
	division.save(function(err, division) {
			if(err) return res.status(500).send(err.message);
			torneo.divisiones.push(division);
			torneo.save(function(err) {
				if(err) return res.status(500).send(err.message);
				logger.info(req.user+" ha agregado al torneo "+torneo.nombre+" una nueva division: "+division.nombre);
		      	res.status(200).jsonp(division);
			});
		});
};

// EXAMPLE POST:
// {
//   "nombre": "San Martin",
//   "torneo_actual": "id_del_torneo"
// }
