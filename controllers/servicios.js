const pool = require('../database');
const bcrypt = require('bcrypt');

module.exports={
    
    getConceptos : function(req,res,next){ 
        res.render('servicios/tablaConceptos');
    },
    getTablaConceptos:function(req,res,vext){
        res.render('servicios/tablaConceptos');
    },
    getAgregarRol : function(req,res,next){ 
        res.render('rol/agregarRol');
    },
    postAgregarRol :  async(req,res,next)=>{ 
        console (tipoRol);
        const  { tipoRol} = req.body;      
        const newRol = { tipoRol};
        await pool.query('INSERT INTO rol set ?',[newRol]);

        res.render('rol/agregarRol');
    },
    getTablaRoles:function(req,res,vext){
        res.render('rol/tablaRoles');
    }

};