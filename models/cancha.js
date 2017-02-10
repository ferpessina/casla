var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var canchaSchema = new Schema({  
  nombre:             {type:String}
  //imagen             {data: Buffer, contentType: String}
});

module.exports = mongoose.model('Cancha', canchaSchema);
