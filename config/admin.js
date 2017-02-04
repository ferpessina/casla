module.exports = function(app) {

    //------------------------------USUARIOS----------------------------------------//

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

    //------------------------------TORNEOS----------------------------------------//
    app.get('/torneos', isAdmin, function(req, res) {
        client.get("http://localhost:3000/torneo", function (data, response) {
            res.render('./ejs/torneos/torneos.ejs', { message: req.flash('signupMessage'), torneos: data, user: req.user, resultado: req.session.statusDelete});
        });  
    });

    app.get('/agregarTorneos', isAdmin, function(req, res) {
         res.render('./ejs/torneos/agregarTorneos.ejs', {user: req.user, message: req.flash('loginMessage')}); 
    });

    app.post('/agregarTorneo', isAdmin, function(req, res) {
        var args = {
            data:  req.body ,
            headers: { "Content-Type": "application/json" }
        };
        client.post("http://localhost:3000/torneo", args, function (data, response) {
            console.log("POST /torneo");
            res.redirect('/torneos');
        });  
    });

    app.post('/deleteTorneo', isAdmin, function(req, res) {
        client.delete("http://localhost:3000/torneo/"+req.body.torneoid, function (data, response) {
            console.log("DELETE /torneo/"+req.body.torneoid);
            req.session.statusDelete = response.statusCode;
            res.redirect('/torneos');
        });  
    });

    //------------------------------EQUIPOS----------------------------------------//
    app.get('/equipos', isAdmin, function(req, res) {
        client.get("http://localhost:3000/equipo", function (data, response) {
            res.render('./ejs/equipos/equipos.ejs', { message: req.flash('signupMessage'), equipos: data, user: req.user, resultado: req.session.statusDelete});
        });  
    });

    app.get('/agregarEquipos', isAdmin, function(req, res) {
         res.render('./ejs/equipos/agregarEquipos.ejs', {user: req.user, message: req.flash('loginMessage')}); 
    });

    app.post('/agregarEquipo', isAdmin, function(req, res) {
        var args = {
            data:  req.body ,
            headers: { "Content-Type": "application/json" }
        };
        client.post("http://localhost:3000/equipo", args, function (data, response) {
            console.log("POST /equipo");
            res.redirect('/equipos');
        });  
    });

    app.post('/deleteEquipo', isAdmin, function(req, res) {
        client.delete("http://localhost:3000/equipo/"+req.body.equipoid, function (data, response) {
            console.log("DELETE /equipo/"+req.body.equipoid);
            req.session.statusDelete = response.statusCode;
            res.redirect('/equipos');
        });  
    });


    //------------------------------PARTIDOS----------------------------------------//
    app.get('/partidos', isAdmin, function(req, res) {
        client.get("http://localhost:3000/partido", function (data, response) {
            res.render('./ejs/partidos/partidos.ejs', { message: req.flash('signupMessage'), partidos: data, user: req.user, resultado: req.session.statusDelete});
        });  
    });

    app.get('/agregarPartidos', isAdmin, function(req, res) {
        client.get("http://localhost:3000/torneo", function (data, response) {
         res.render('./ejs/partidos/agregarPartidos.ejs', {user: req.user, torneos: data, message: req.flash('loginMessage')}); 
        }); 
    });

    //TO IMPLEMENT
    // app.post('/agregarPartido', isAdmin, function(req, res) {
    //     client.post("http://localhost:3000/partido", function (data, response) {
    //         console.log("ADD /partido/"+req.body.userid);
    //         req.session.statusDelete = response.statusCode;
    //         res.redirect('/partidos');
    //     });  
    // });

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

