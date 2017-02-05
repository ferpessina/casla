 module.exports = function(app,isAdmin) {
    app.get('/usuarios', isAdmin, function(req, res) {
        client.get("http://localhost:3000/user/notAdmins", function (data, response) {
            res.render('./ejs/usuarios/usuarios.ejs', { message: req.flash('signupMessage'), users: data, user: req.user, resultado: req.session.statusDelete});
        });  
    });

	app.get('/agregarUsuarios', isAdmin, function(req, res) {
         res.render('./ejs/usuarios/agregarUsuarios.ejs', {user: req.user, message: req.flash('loginMessage')}); 
    });

    app.post('/deleteUser', isAdmin, function(req, res) {
        client.delete("http://localhost:3000/user/"+req.body.userid, function (data, response) {
            console.log("DELETE /user/"+req.body.userid);
            req.session.statusDelete = response.statusCode;
            res.redirect('/usuarios');
        });  
    });
}
