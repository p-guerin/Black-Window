var express      = require('express');
var path         = require('path');
var fs           = require('fs');
var bodyParser   = require('body-parser');
var nodemailer   = require('nodemailer');
var mongoose     = require('mongoose');

var app          = express();
var transporter  = nodemailer.createTransport();
var port         = process.env.PORT || 3000;


// Settings
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});


// Database
mongoose.connect('mongodb://localhost:27017/devis');

mongoose.connection.on("error", function(){
  console.log("Erreur de connection à la base de données.")
});
mongoose.connection.on("open", function(){
  console.log("Connection réussie à la base de données.")
});


// Routing
app.get('/', function(req,res){
  console.log('Index');
  res.render('index');
});

app.get('/contact', function(req,res){
  console.log('Contact');
  res.render('contact');
});
app.post('/contact', function(req,res){
  transporter.sendMail({
    from: req.body.email,
    to: 'guerin.pierre26@gmail.com',
    subject: 'Contact depuis le site Pierre GUERIN.',
    text: req.body.message
  });
  console.log('Send contact');
  res.redirect('/');
});

app.get('/nouveau-projet', function(req,res){
  console.log('Nouveau-projet');
  res.render('nouveau-projet');
});
app.post('/nouveau-projet', function(req,res){
  new Devis({
    infos_perso: { 
      nom                  : req.body.nom_enfant,
      prenom               : req.body.prenom_enfant,
      email                : req.body.age
    },
    infos_projet: {
      project_type        : req.body.nom_representant,
      project_description : req.body.prenom_representant,
      deadline            : req.body.mail,
      budget              : req.body.telephone
    }
  }).save(function(err){
      if(!err) {
          res.redirect('/ateliers');
      } else {
          console.log(err);
          return response.send('ERROR');
      }
  });
  transporter.sendMail({
    from: req.body.email,
    to: 'guerin.pierre26@gmail.com, ' + req.body.email,
    subject: 'Devis projet.',
    text: req.body.message
  });
  console.log('Send contact');
  res.redirect('/');
});

app.get('/admin', function(req, res){
  Devis.find(function(err, devis) {
    res.render('admin', {devis : devis});
    console.log(devis);
  });
});


// Server
app.listen(port);
console.log("Serveur lancé à l'adresse http://local.dev:" + port);