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
mongoose.connection.on("connected", function(){
  console.log("Connection en cours à la base de données.")
});
mongoose.connection.on("open", function(){
  console.log("Connection réussie à la base de données.")
});

console.log(mongoose.connection.readyState);


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
  transporter.sendMail({
    from: req.body.email,
    to: 'guerin.pierre26@gmail.com, ' + req.body.email,
    subject: 'Devis projet.',
    text: req.body.message
  });
  console.log('Send contact');
  res.redirect('/');
});


// Server
app.listen(port);
console.log("Serveur lancé à l'adresse http://local.dev:" + port);