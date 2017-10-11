import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let thaliaSchema = new Schema({
  nev: String
});

module.exports = mongoose.model('Thalia', thaliaSchema);
