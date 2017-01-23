var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var jugadorSchema = new Schema({  
  // imagen: 				{ data: Buffer, contentType: String},
  nombre:    			{ type: String },
  apellido:     		{ type: String },
  apodo:     			{ type: String },
  fecha_de_nacimiento: 	{ type: Date, default: Date.now },
  dni: 					{type:Number},
  posicion: 			{type:String},
  numero: 				{type:Number},
  // apto_medico:  		{},
  email: 				{type:String}
});

module.exports = mongoose.model('Jugador', jugadorSchema);