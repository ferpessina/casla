var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var torneoSchema = new Schema({  
  nombre: 				{ type: String},
  jugadores_por_equipo:  	{ type: Number},
  equipos:[
      {type: Schema.Types.ObjectId, ref: 'Equipo'}
  ]
});

module.exports = mongoose.model('Torneo', torneoSchema);