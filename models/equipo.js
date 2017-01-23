var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var equipoSchema = new Schema({  
  logo: 		{ data: Buffer, contentType: String},
  nombre: 		{ type: String},
  torneo_actual:{type: String},
  jugadores: [
      {type: Schema.Types.ObjectId, ref: 'Jugador'}
  ]
});

module.exports = mongoose.model('Equipo', equipoSchema);