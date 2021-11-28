const passport = require('passport');
const pool = require('../database');
const helpers = require('./helpers');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local.loggin', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, user, password, done) => {
  const administrador = await pool.query('SELECT * FROM administrador WHERE user = ?', [user]);
//-----------VALIDANDO SI ES ADMINISTRADOR-----------------------
    if(administrador.length>0){
      var admin = administrador[0];
      console.log(req.body);
      var validPassword = await helpers.matchPassword(password, admin.pass);
      if(validPassword){
        done(null, admin, req.flash('success','Bienvenido ' + admin.user));
      }
      else{
        done(null, false, req.flash('message','Contraseña invalida'));
      }
    }
    else{
      return done(null, false, req.flash('message','No existe ese administrador'));
    }
  })); 

  //---------Datos del administrador
passport.serializeUser((admin, done) => {
  done(null, admin.user);
})
passport.deserializeUser(async (admin, done) =>{
  const rows = await pool.query('SELECT * FROM administrador WHERE user = ?', [admin]);
  done(null, rows[0]);
})


  passport.use('local.logginUsuario', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
  //const contraseña = await helpers.encryptPassword('andy');
  //console.log(contraseña);
  const usuario = await pool.query('SELECT * FROM usuario WHERE username = ?', [username]);
//-----------VALIDANDO SI ES USUARIO-----------------------
    if(usuario.length>0){
      var encargado = usuario[0];
      console.log(req.body);
      var validPassword = await helpers.matchPassword(password, encargado.password);
      if(validPassword){
        done(null, encargado, req.flash('success','Bienvenido ' + encargado.username));
      }
      else{
        done(null, false, req.flash('message','Contraseña de usuario invalida'));
      }
    }
    else{
      return done(null, false, req.flash('message','No existe ese usuario'));
    }
  })); 


//----------DATOS DE ALGUN USUARIO
passport.serializeUser((encargado, done) => {
  done(null, encargado.username);
})
passport.deserializeUser(async (username, done) =>{
  const rows = await pool.query('SELECT * FROM usuario WHERE username = ?', [username]);
  done(null, rows[0]);
})