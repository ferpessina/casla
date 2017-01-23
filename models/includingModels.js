module.exports = function(app, mongoose) {
	var jugador   = require('./jugador')(app, mongoose);
	var equipo   = require('./equipo')(app, mongoose);
	var torneo   = require('./torneo')(app, mongoose);
}