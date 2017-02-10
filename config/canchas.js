module.exports = function(app,isAdmin) {

    app.get('/canchasDelTorneo', isAdmin, function(req, res) {
        console.log('entre a canchasdeltorneo')
        client.get("http://localhost:3000/torneo/"+req.query.torneoid, function (torneo, response) {
            client.get("http://localhost:3000/cancha/torneo/"+req.query.torneoid, function (canchas, response) {
                res.render('./ejs/canchas/canchasDelTorneo.ejs', {user: req.user, canchas: canchas, 
                                                            torneo:torneo,  message: req.flash('loginMessage')}); 
            }); 
        }); 

    }); 

    app.post('/nuevaCancha', isAdmin, function(req, res) {
        console.log('entre a nuevacancha')
        client.get("http://localhost:3000/torneo/"+req.body.torneoid, function (torneo, response) {
         res.render('./ejs/canchas/agregarCancha.ejs', {user: req.user, torneo: torneo, message: req.flash('loginMessage')}); 
        }); 
    }); 

    app.post('/agregarCancha', isAdmin, function(req, res) {
        var args = {
            data:  req.body ,
            headers: { "Content-Type": "application/json" }
        };
        client.post("http://localhost:3000/cancha", args, function (data, response) {
            res.redirect('/canchasDelTorneo?torneoid='+data.torneo._id);
        }); 
    });
}