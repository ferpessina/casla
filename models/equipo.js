var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var equipoSchema = new Schema({  
  logo: 		{ data: Buffer, contentType: String},
  nombre: 		{ type: String},
  torneo_actual:{type: String}
});

module.exports = mongoose.model('Equipo', equipoSchema);