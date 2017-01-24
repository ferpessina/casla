var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var torneoSchema = new Schema({  
  nombre: 				{ type: String},
  jugadores_por_equipo: { type: Number},
  activo: 				{type: Boolean},
  equipos:[
      {type: Schema.Types.ObjectId, ref: 'Equipo'}
  ],
  canchas:[
      {type: Schema.Types.ObjectId, ref: 'Cancha'}
  ]
});

module.exports = mongoose.model('Torneo', torneoSchema);
