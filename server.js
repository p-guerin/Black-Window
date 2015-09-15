var express      = require('express');
var path         = require('path');
var fs           = require('fs');
var bodyParser   = require('body-parser');
var nodemailer   = require('nodemailer');
var mongoose     = require('mongoose');

var app          = express();
var transporter  = nodemailer.createTransport();
var port         = 3000;


// Settings
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});
var Devis = mongoose.model('Devis')


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
      nom                  : req.body.nom,
      prenom               : req.body.prenom,
      email                : req.body.email
    },
    infos_projet: {
      project_type        : req.body.project_type,
      project_description : req.body.project_description,
      deadline            : req.body.deadline,
      budget              : req.body.budget
    }
  }).save(function(err){
    if(err) {
        console.log(err);
        res.redirect('/nouveau-projet');
    }
  });
  console.log('Save devis');
  transporter.sendMail({
    from: req.body.email,
    to: 'guerin.pierre26@gmail.com, ' + req.body.email,
    subject: 'Devis projet.',
    text: req.body.nom + ' ' + req.body.prenom,
    html: '<h1>Infos Personnelles</h1><br><b>Nom:</b> ' + req.body.nom + '<br>' + '<b>Prénom:</b> ' + req.body.prenom + '<br>' + '<b>Email:</b> ' + req.body.email + '<br><br>' + '<h1>Infos Projet</h1><br><b>Projet:</b> ' + req.body.project_type + '<br>' + '<b>Description:</b> ' + req.body.project_description + '<br>' + '<b>Date limite:</b> ' + req.body.deadline + '<br>' + '<b>Budget:</b> ' + req.body.budget
  });
  console.log('Send devis');
  res.redirect('/');
});

app.get('/projet/:id', function(req, res){
  Devis.findById(req.params.id, function(err,devis){
    res.render( 'projet', {
      id                  : devis.id,
      nom                 : devis.infos_perso.nom,
      prenom              : devis.infos_perso.prenom,
      email               : devis.infos_perso.email,
      project_type        : devis.infos_projet.project_type,
      project_description : devis.infos_projet.project_description,
      deadline            : devis.infos_projet.deadline,
      budget              : devis.infos_projet.budget
    });
  });
});

app.get('/admin', function(req, res){
  Devis.find(function(err, devis) {
    res.render('admin', {devis : devis});
    console.log('Admin');
  });
});


// Server
app.listen(port);
console.log("Serveur lancé à l'adresse http://local.dev:" + port);
