var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var exphbs=require('express-handlebars');
var flash=require('connect-flash');
var session=require('express-session');
var MySQLStore= require('express-mysql-session')(session);
var passport=require('passport');

var{database}=require('./keys');
//
//Creamos variables para el index

var routesRouter = require('./routes/routes');

//Inicializaciones
var app = express();
require('./controllers/Loggin');

// view engine setup
app.set('views', path.join(__dirname, 'views'));


//Configuracion de Handelbars
app.engine('.hbs',exphbs({
defaultLayout:'main',
layoutsDir: path.join(app.get('views'),'layouts'),
partialsDir: path.join(app.get('views'),'partials'),
extname:'.hbs',
helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'bssmysqlsession',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//dice donde esta la carpeta publica
app.use(express.static(path.join(__dirname, 'public')));

//Variables
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.error;
  app.locals.correcto;
  app.locals.user = req.user;                 //esta variable guarda los datos del usuario 
  if (app.locals.user) {
    app.locals.encargado = req.user.username;
    app.locals.idUsuario = req.user.idUsuario;
    app.locals.administrador = req.user.user;
  }else{
    app.locals.encargado = null;
    app.locals.administrador = null;
    app.locals.idUsuario=null;
  }
  
  next();
});

//Rutas
app.use('/', routesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
