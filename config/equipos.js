module.exports = function(app,isAdmin) {
	app.get('/equipos', isAdmin, function(req, res) {
        client.get("http://localhost:3000/equipo", function (equipos, response) {
            client.get("http://localhost:3000/torneo", function (torneos, response) {
                var torneosMap =  {};
                for (var i = 0; i < torneos.length; i++) {
                    torneosMap[torneos[i]._id] = torneos[i].nombre;
                };
                res.render('./ejs/equipos/equipos.ejs', { message: req.flash('signupMessage'), equipos: equipos, torneosMap:torneosMap, torneos:torneos, user: req.user, resultado: req.session.statusDelete});
            }); 
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
        client.post("http://localhost:3000/equipo/", args, function (data, response) {
            console.log("POST /equipo");
            res.redirect('/equipos');
        });  
    });

    app.post('/updateEquipo', isAdmin, function(req, res) {
        var args = {
            data:  req.body ,
            headers: { "Content-Type": "application/json" }
        };
        console.log("Por pegarle a http://localhost:3000/equipo/"+req.body.equipoid);
        client.put("http://localhost:3000/equipo/"+req.body.equipoid, args, function (data, response) {
            console.log("PUT /equipo");
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
}