var mongoose = require('mongoose');
var Jugador  = mongoose.model('Jugador');

//GET - Return all jugadores in the DB
exports.findAllJugadores = function(req, res) {
	Jugador.find(function(err, jugadores) {
    if(err) res.send(500, err.message);

    console.log('GET /jugador')
		res.status(200).jsonp(jugadores);
	});
};

//GET - Return a Jugador with specified ID
exports.findById = function(req, res) {
	Jugador.findById(req.params.id, function(err, jugador) {
    if(err) return res.send(500, err.message);
    if(!jugador) return res.send(404, "Jugador not found");
    console.log('GET /jugador/' + req.params.id);
		res.status(200).jsonp(jugador);
	});
};

//POST - Insert a new Jugador in the DB
exports.addJugador = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var jugador = new Jugador({
		nombre:    req.body.nombre,
		apellido: 	  req.body.apellido,
		apodo:  req.body.apodo,
		fecha_de_nacimiento:   req.body.fecha_de_nacimiento,
		dni:  req.body.dni,
		posicion:    req.body.posicion,
		numero:  req.body.numero,
		email:  req.body.email
	});

	jugador.save(function(err, jugador) {
		if(err) return res.send(500, err.message);
    	res.status(200).jsonp(jugador);
	});
};

//PUT - Update a register already exists
exports.updateJugador = function(req, res) {
	Jugador.findById(req.params.id, function(err, jugador) {

		if(err) return res.send(500, err.message);
		if (!jugador) {return res.send(404, "Jugador not found");}

		jugador.nombre 				= req.body.nombre,
		jugador.apellido			= req.body.apellido,
		jugador.apodo			 	= req.body.apodo,
		jugador.fecha_de_nacimiento = req.body.fecha_de_nacimiento,
		jugador.dni 				= req.body.dni,
		jugador.posicion			= req.body.posicion,
		jugador.numero				= req.body.numero,
		jugador.email				= req.body.email

		jugador.save(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200).jsonp(jugador);
		});
	});
};

//DELETE - Delete a jUGADOR with specified ID
exports.deleteJugador = function(req, res) {
	Jugador.findById(req.params.id, function(err, jugador) {
		if(err) return res.send(500, err.message);
		if (!jugador) {return res.send(404, "Jugador not found");}
		jugador.remove(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200).jsonp("Successfully deleted");
		})
	});
};

// EXAMPLE POST:
// {
//   "nombre": "ilan",
//   "apellido": "pincha",
//   "apodo": "lancha",
//   "fecha_de_nacimiento": "06/06/1990",
//   "dni": 36678976,
//   "posicion": "Volante",
//   "numero": 7,
//   "email":"ilan@gmail.com"
// }