module.exports = function(app) {
	app.get('/delegado', isDelegado, function(req, res) {
		if (req.user.equipo){
			client.get("http://localhost:3000/equipo/"+req.user.equipo, function (equipo, response) {
				client.get("http://localhost:3000/jugador/equipo/"+req.user.equipo, function (jugadores, response) {
	         		res.render('./ejs/delegados/miEquipo.ejs', {user: req.user, equipo:equipo, message: req.flash('loginMessage'),
	         													jugadores:jugadores, resultado: req.session.statusDelete});
	        	}); 
	        }); 
		} else {
			res.render('./ejs/delegados/miEquipo.ejs', {user: req.user, message: req.flash('loginMessage'),equipo:null, 
														jugadores:null, resultado: req.session.statusDelete});
		}
		 
    });

	app.get('/addJugador', isDelegado, function(req, res) {
			client.get("http://localhost:3000/equipo/"+req.user.equipo, function (equipo, response) {
	         		res.render('./ejs/delegados/agregarJugador.ejs', {user: req.user, equipo:equipo, message: req.flash('loginMessage'),
	         													resultado: req.session.statusDelete});
	        }); 
		 
    });
    
}

// route middleware to make sure a user is logged in (DELEGADO)
function isDelegado(req, res, next) {

    // if user is authenticated in the session, carry on 
    if ((req.isAuthenticated()) && ( (req.user.role == "DELEGADO") || (req.user.role == "SUPER_ADMIN"))) 
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}