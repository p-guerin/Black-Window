var express      = require('express');
var path         = require('path');
var bodyParser   = require('body-parser');

var app          = express();


// Settings
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Routing
app.get('/', function(req,res){
  res.render('index')
});


// Server
app.listen(3000);