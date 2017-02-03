module.exports = function(app) {

	app.get('/agregarUsuarios', isAdmin, function(req, res) {
         res.render('./ejs/agregarUsuarios.ejs', {user: req.user, message: req.flash('loginMessage')}); 
    });

    app.get('/usuarios', isAdmin, function(req, res) {
        console.log("ENTREEEE");
        client.get("http://localhost:3000/user/notAdmins", function (data, response) {
            res.render('./ejs/usuarios.ejs', { message: req.flash('signupMessage'), users: data, user: req.user, resultado: req.session.statusDelete});
        });  
    });

    app.get('/partidos', isAdmin, function(req, res) {
        client.get("http://localhost:3000/partido", function (data, response) {
            res.render('./ejs/partidos.ejs', { message: req.flash('signupMessage'), partidos: data, user: req.user, resultado: req.session.statusDelete});
        });  
    });

    app.post('/deleteUser', isAdmin, function(req, res) {
        console.log(req.body.userid);
        client.delete("http://localhost:3000/user/"+req.body.userid, function (data, response) {
            console.log("DELETE /user/"+req.body.userid);
            req.session.statusDelete = response.statusCode;
            res.redirect('/usuarios');
        });  
    });

    app.post('/deletePartido', isAdmin, function(req, res) {
        console.log(req.body.userid);
        client.delete("http://localhost:3000/partido/"+req.body.userid, function (data, response) {
            console.log("DELETE /partido/"+req.body.userid);
            req.session.statusDelete = response.statusCode;
            res.redirect('/partidos');
        });  
    });

}

// route middleware to make sure a user is ADMIN
function isAdmin(req, res, next) {
    console.log("ENTRE AL ISADMIN")
    // if user is authenticated in the session, carry on 
    if ( (req.isAuthenticated()) && ( (req.user.role == "ADMIN") || (req.user.role == "SUPER_ADMIN"))) // SUPER_ADMIN can access everything
        return next();
    console.log("DIO QUE NO ES ADMINNN")
    // if they aren't redirect them to the home page
    res.redirect('/');
}

