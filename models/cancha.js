var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var canchaSchema = new Schema({  
  nombre:             {type:String},
  torneo_actual: 	  {type:String}
  //imagen             {type: Schema.Types.ObjectId, ref: 'Jugador'}
});

module.exports = mongoose.model('Cancha', canchaSchema);