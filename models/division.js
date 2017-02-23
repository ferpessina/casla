var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var divisionSchema = new Schema({  
  nombre: 				{ type: String},
  torneo:         {type: Schema.Types.ObjectId, ref: 'Torneo'},
  equipos: [
      {type: Schema.Types.ObjectId, ref: 'Equipo'}
  ],
  partidos: [
      {type: Schema.Types.ObjectId, ref: 'Partido'}
  ]
  //tabla_de_posiciones,
  //sanciones,
  //acumulacion_de_amarillas,
  //goleadores,
  //fixture
});

module.exports = mongoose.model('Division', divisionSchema);
