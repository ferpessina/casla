var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var equipoSchema = new Schema({  
  logo: 				{ data: Buffer, contentType: String},
  nombre: 				{ type: String},
  torneo_actual:        {type: Schema.Types.ObjectId, ref: 'Torneo'},
  division:     		{type: Schema.Types.ObjectId, ref: 'Division'},
  jugadores: 		[
      					{type: Schema.Types.ObjectId, ref: 'Jugador'}
  ],
  partidos: [
      {type: Schema.Types.ObjectId, ref: 'Partido'}
  ]
  //delegado
  //capitan
  //subcapitan
});

module.exports = mongoose.model('Equipo', equipoSchema);
