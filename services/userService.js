var mongoose = require('mongoose');
var User  = mongoose.model('User');
var logger = require('../logger');
var paginate = require('express-paginate');

//GET - Return all users in the DB
exports.findAllUsuarios = function(req, res, next) {
	User.find(function(err, users) {
    if(err) res.send(500, err.message);

    console.log('GET /user')
		res.status(200).jsonp(users);
	});

	// User.paginate({}, { page: req.query.page, limit: req.query.limit }, function(err, users, pageCount, itemCount) {
 //    	if (err) res.send(500, err.message);
	//     res.format({
	// 	      html: function() {
	// 	        res.render('users', {
	// 	          users: users,
	// 	          pageCount: pageCount,
	// 	          itemCount: itemCount,
	// 	          pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
	// 	        });
	// 	      },
	// 	      json: function() {
	// 	        // inspired by Stripe's API response for list objects
	// 	        res.json({
	// 	          object: 'list',
	// 	          has_more: paginate.hasNextPages(req)(pageCount),
	// 	          data: users
	// 	        });
	// 	      }
 //    	});
	// });
};

//POST - Insert a new Torneo in the DB
exports.addUser = function(req, res) { //TRATAR DE USAR EL DE PASSPORT.JS PREFERENTEMENTE
	console.log('POST');
	console.log(req.body);

	var role = req.body.role;

	if ( (role != "SUPER_ADMIN") && (role != "ADMIN") && (role != "DELEGADO") )
		return res.status(404).jsonp("User role must be SUPER_ADMIN, ADMIN or DELEGADO");

	var newUser            = new User();
    newUser.email    = req.body.email;
    newUser.password = newUser.generateHash(req.body.password);
    newUser.role 	 = req.body.role;

	newUser.save(function(err, newUser) {
		if(err) return res.send(500, err.message);
    	res.status(200).jsonp(newUser);
	});
};

//DELETE - Delete a user with specified ID
exports.deleteUser = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		if(err) return res.send(500, err.message);
		if (!user) {return res.send(404, "User not found");}
		// logger.info("El usuario "+req.user.email+" ha eliminado al usuario "+req.body.userid);
		logger.info("El usuario "+req.body.userid+" ha sido eliminado");
		user.remove(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200).jsonp("Successfully deleted");
		})
	});
};