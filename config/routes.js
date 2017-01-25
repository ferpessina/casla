module.exports = function(express,app, passport, client) {

    require('./jugadorRoutes')(express,app);
    require('./torneoRoutes')(express,app);
    require('./equipoRoutes')(express,app);
    require('./userRoutes')(express,app);
	// =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('./ejs/index.ejs', {user: req.user}); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('./ejs/login/login.ejs', { message: req.flash('loginMessage') }); 
    });

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('./ejs/login/profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/admin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/signupadmin', passport.authenticate('local-signup-admin', {
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/admin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

       // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    //VIEWS
    app.get('/goleadores', function(req, res) {
        res.render('./ejs/goleadores.ejs'); // load the index.ejs file
    });

    app.get('/sanciones', function(req, res) {
        res.render('./ejs/sanciones.ejs'); // load the index.ejs file
    });

    app.get('/fairplay', function(req, res) {
        res.render('./ejs/fairplay.ejs'); // load the index.ejs file
    });

    app.get('/delegado', isDelegado, function(req, res) {
        res.render('./ejs/delegado.ejs'); // load the index.ejs file
    });

    app.get('/admin', isAdmin, function(req, res) {
        client.get("http://localhost:3000/user", function (data, response) {
            console.log("GET /user");
            res.render('./ejs/admin.ejs', { message: req.flash('signupMessage'), users: data });
        });  
    });

    app.post('/deleteUser', isAdmin, function(req, res) {
        console.log(req.body.userid);
        client.delete("http://localhost:3000/user/"+req.body.userid, function (data, response) {
            console.log("DELETE /user/"+req.body.userid);
            var mensaje = "El usuario no se pudo eliminar";
            if(response.statusCode == 200) mensaje="El usuario ha sido eliminado con exito";
            res.render('./ejs/resultadoEliminarUser.ejs', {resultado: mensaje});
        });  
    });

    app.get('/superadmin', isSuperAdmin, function(req, res) {
        res.render('./ejs/superadmin.ejs'); // load the index.ejs file
    });
    

}

// route middleware to make sure a user is logged in (DELEGADO)
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// route middleware to make sure a user is logged in (DELEGADO)
function isDelegado(req, res, next) {

    // if user is authenticated in the session, carry on 
    if ((req.isAuthenticated()) && ( (req.user.role == "DELEGADO") || (req.user.role == "SUPER_ADMIN"))) 
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// route middleware to make sure a user is ADMIN
function isAdmin(req, res, next) {

    // if user is authenticated in the session, carry on 
    if ( (req.isAuthenticated()) && ( (req.user.role == "ADMIN") || (req.user.role == "SUPER_ADMIN"))) // SUPER_ADMIN can access everything
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// route middleware to make sure a user is SUPER_ADMIN
function isSuperAdmin(req, res, next) {

    // if user is authenticated in the session, carry on 
    if ( (req.isAuthenticated()) && (req.user.role == "SUPER_ADMIN"))
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
