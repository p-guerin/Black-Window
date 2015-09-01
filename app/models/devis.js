var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var devisSchema = new Schema({
  infos_perso: {
    nom:                 String,
    prenom:              String,
    email:               String
  },
  infos_projet: {
    project_type:        String,
    project_description: String,
    deadline:            Date,
    budget:              Number,
  },
  date: { type: Date, default: Date.now }
});

var Devis = mongoose.model('Devis', devisSchema);
module.exports = Devis;