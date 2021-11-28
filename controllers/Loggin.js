const passport = require('passport');
const pool = require('../database');
const helpers = require('./helpers');
const LocalStrategy = require('passport-local').Strategy;

require('../lib/passport');

/*passport.use('local.loggin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    var rows = await pool.query('SELECT * FROM usuario WHERE username = ?',[username]);
    if(rows.length>0){
      var user=rows[0];
      console.log(req.body);
      var validPassword= await helpers.matchPassword(password,user.password);
      if(validPassword){
        done(null,user,req.flash('success','Bienvenido '+user.username));
      }
      else{
        done(null,false,req.flash('message','Contraseña invalida'));
      }
    }
    else{
      return done(null,false,req.flash('message','No existe ese usuario'));
    }
  }));*/

exports.getloggin = (req, res) => {
    res.render("auth/signin");
}
exports.getConfiguracionSistema = (req, res) => {
  res.render("auth/configuracionSistema");
}
exports.getlogout = (req, res) => {
    req.logOut();
    res.redirect('/');
}
exports.postloggin = (req, res, next) => {
    passport.authenticate('local.loggin', {
        successRedirect: '/perfil',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
}

exports.postlogginUsuario = (req, res, next) => {
  passport.authenticate('local.logginUsuario', {
      successRedirect: '/perfilUsuario',
      failureRedirect: '/',
      failureFlash: true
  })(req, res, next);
}
exports.getlogginUsuario = (req, res) => {
  res.render("auth/signin");
}

exports.getPerfil= async function (req, res, next){
    const admi= await pool.query('select proyecto.idProyecto as idProyecto,proyecto.nombre as proyecto, cliente.nombres as nombre, proyecto.calle as calle, proyecto.colonia as colonia,proyecto.fechaFin as fechaFin    from proyecto inner join cliente on proyecto.idCliente=cliente.idCliente where proyecto.estatus=1 order by fechaFin asc limit 3');
    const gasto= await pool.query('select  DATE_FORMAT(fechaRegistro, "%T") as hora, date(fechaRegistro) as fecha,monto,conceptoGasto from gasto  inner join conceptogasto on gasto.idConceptoGasto=conceptogasto.idConceptoGasto order by fechaRegistro asc limit 4 ');
    const ingreso=await pool.query('select  DATE_FORMAT(fechaRegistro, "%T") as hora, date(fechaRegistro) as fecha,nombre,monto from ingreso inner join conceptoingreso on ingreso.idConceptoIngreso=conceptoingreso.idConceptoIngreso inner join proyecto on proyecto.idProyecto=ingreso.idProyecto order by fechaRegistro asc limit 4');
    res.render("auth/inicio",{admi,ingreso,gasto});
}
