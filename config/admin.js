module.exports = function(app) {

	app.get('/agregarUsuarios', isAdmin, function(req, res) {
         res.render('./ejs/agregarUsuarios.ejs', {user: req.user, message: req.flash('loginMessage')}); 
    });

    app.get('/usuarios', isAdmin, function(req, res) {
        client.get("http://localhost:3000/user/notAdmins", function (data, response) {
            res.render('./ejs/usuarios.ejs', { message: req.flash('signupMessage'), users: data, user: req.user, resultado: req.session.statusDelete});
        });  
    });

    app.get('/partidos', isAdmin, function(req, res) {
        client.get("http://localhost:3000/partidos", function (data, response) {
            res.render('./ejs/partidos.ejs', { message: req.flash('signupMessage'), partidos: data, user: req.user, resultado: req.session.statusDelete});
        });  
    });

}