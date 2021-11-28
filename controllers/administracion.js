const pool = require('../database');
const bcrypt = require('bcrypt');
const { body } = require('express-validator');

module.exports={
   /* getConsultarAdm : async function(req,res,next){ 
        const rol = await pool.query('SELECT * FROM rol' );
        const area = await pool.query('SELECT * FROM area');
        //res.render('administracion/',{rol,area});
    },*/
    getAdministrarBD :function(req,res,vext){
        return res.render('administracion/administrarBD');
    }, 
    getAdministrarCatalogo:function(req,res,vext){
       return  res.render('administracion/administrarCatalogo');
    },
    
    //---------------Conceptos------------------------
    getAdministrarConceptos:function(req,res,vext){
       return  res.render('administracion/administrarConceptos');
    },
    getAgregarConcepto:function(req,res,vext){
       const{idSubServicio}=req.params;
      return  res.render('administracion/agregarConcepto',{idSubServicio});
   },
   getEditarConcepto:function(req,res,vext){ 

      const {idConceptoCatalogo} = req.params;
      const cadena = pool.query('SELECT * FROM conceptocatalogo WHERE idConceptoCatalogo = ?', [idConceptoCatalogo]);

        cadena.then(function(result) {
            res.render('administracion/editarConcepto', {info: result[0]} );
            console.log(result[0]);
        })
       //return  res.render('administracion/editarConcepto');
    },
    postAgregarConcepto:async function(req,res,vext){
      const{concepto,cantidad,unidadMedida,montoXUnidad,idSubServicio}=req.body
      let montoTotal=cantidad*montoXUnidad;
      const newConcepto={
         concepto,
         unidadMedida,
         cantidad,
         montoXUnidad,
         montoTotal,
         idSubServicio
      }
      console.log(newConcepto);
      await pool.query('insert into conceptocatalogo set ?',[newConcepto]);
      res.redirect('/editarSubservicios/'+idSubServicio);
    },
    postEditarConcepto : async function (req,res,next){ 
      const { idConceptoCatalogo } = req.params; 
      const { concepto, unidadMedida, montoXUnidad, montoTotal } = req.body;
      const modificado = { 
         concepto, 
         unidadMedida, 
         montoXUnidad, 
         montoTotal
      };
      console.log(modificado);
      await pool.query('UPDATE conceptocatalogo set ? WHERE idConceptoCatalogo = ? ', [modificado, idConceptoCatalogo]);
      
      res.redirect('/tablaConceptos');
   },
   getTablaConceptos:function(req,res,vext){
      return  res.render('administracion/tablaConceptos');
   },
   getTablaConceptosE:async function(req,res,vext){
      const conceptoE= await pool.query('SELECT * FROM conceptogasto')
      return  res.render('administracion/tablaConceptosE',{conceptoE});
   },
   getTablaConceptosI:async function(req,res,vext){
      const conceptoI= await pool.query('SELECT * FROM conceptoingreso')
      return  res.render('administracion/tablaConceptosI',{conceptoI});
   },
   getEditarConcepto:function(req,res,vext){ 

      const {idConceptoCatalogo} = req.params;
      const cadena = pool.query('SELECT * FROM conceptocatalogo WHERE idConceptoCatalogo = ?', [idConceptoCatalogo]);

        cadena.then(function(result) {
            res.render('administracion/editarConcepto', {info: result[0]} );
            console.log(result[0]);
        })
       //return  res.render('administracion/editarConcepto');
    },
    postEditarConcepto : async function (req,res,next){ 
      const { idConceptoCatalogo } = req.params;
      const { concepto, unidadMedida, montoXUnidad, montoTotal } = req.body;
      const modificado = { 
         concepto, 
         unidadMedida, 
         montoXUnidad, 
         montoTotal
      };
      console.log(modificado);
      await pool.query('UPDATE conceptocatalogo set ? WHERE idConceptoCatalogo = ? ', [modificado, idConceptoCatalogo]);
      
      res.redirect('/tablaConceptos');
   },  
   getEditarConceptoI:function(req,res,vext){
      const {idConceptoIngreso} = req.params;
      const cadena = pool.query('SELECT * FROM conceptoingreso WHERE idConceptoIngreso = ?', [idConceptoIngreso]);

        cadena.then(function(result) {
         res.render('administracion/editarConceptoI',{info: result[0]}); 
            console.log(result[0]);
        })
      
   },
   postEditarConceptoI : async function (req,res,next){ 
      const { idConceptoIngreso } = req.params; 
      const { conceptoIngreso } = req.body;
      const modificado = { conceptoIngreso };
      await pool.query('UPDATE conceptoingreso set ? WHERE idConceptoIngreso = ? ', [modificado, idConceptoIngreso]);
      res.redirect('/tablaConceptosI');
   },
   getEditarConceptoE : function(req,res,vext){ 
      const {idConceptoGasto} = req.params;
      const {conceptoGasto} = req.body;
      const modificado = {conceptoGasto};
      const cadena = pool.query('SELECT * FROM conceptogasto WHERE idConceptoGasto = ?', [idConceptoGasto]);
      cadena.then(function(result) {
         res.render('administracion/editarConceptoE', {info: result[0]} );
         console.log(result[0]);
     })
      //conceptogasto
   },
   postEditarConceptoE : async function (req,res,next){ 
      const { idConceptoGasto } = req.params;
      const { conceptoGasto } = req.body;
      const modificado = {conceptoGasto};
      await pool.query('UPDATE conceptogasto set ? WHERE idConceptoGasto = ? ', [modificado, idConceptoGasto]);
      res.redirect('/tablaConceptosE');
   },

    //-----------------Roles--------------------
    getAgregarRol:function(req,res,vext){
       return  res.render('administracion/agregarRol');
    },
    postAgregarRol:async function(req,res,next){ 
      const { tipoRol} = req.body;
      const newRol = {
         tipoRol
      };
      console.log(tipoRol);
      await pool.query('INSERT INTO rol set ?',[newRol]);
       res.redirect('/tablaRoles');
    },
   getTablaRoles:async function(req,res,vext){
      const rol= await pool.query('SELECT * FROM rol')
      return  res.render('administracion/tablaRoles',{rol});
   },
   getEditarRol:function(req,res,vext){
      const {idRol} = req.params; 
      const cadena = pool.query('SELECT * FROM rol WHERE idRol = ?', [idRol] );

        cadena.then(function(result) {
            res.render('administracion/editarRol', {info: result[0]} );
            console.log(result[0]);
        })
       //return  res.render('administracion/editarRol');
    },
    postEditarRol : async function (req,res,next){ 
      const { idRol } = req.params;
      const { tipoRol } = req.body;
      
      const modificado = {  tipoRol };
      console.log(req.params);
      await pool.query('UPDATE rol set ? WHERE idRol = ?', [modificado, idRol]);
      
      res.redirect('/tablaRoles');
  },

    //---------------Areas-------------------------
    getAgregarArea:function(req,res,vext){
      return  res.render('administracion/agregarArea');
   },
   postAgregarArea : async function(req,res,next){ 
      const  { nombreArea} = req.body;
      const newArea = { nombreArea};
      await pool.query('INSERT INTO area set ?',[newArea]);
      res.redirect('/tablaAreas');
  },
    getTablaAreas: async function(req,res,vext){
      const area= await pool.query('SELECT * FROM area')
      return  res.render('administracion/tablaAreas',{area});
   },
   getEditarArea:function(req,res,vext){

      const {idArea} = req.params;
      const cadena = pool.query('SELECT * FROM area WHERE idArea = ?', idArea );

        cadena.then(function(result) {
            res.render('administracion/editarArea', {info: result[0]} ); 
            console.log(result[0]);
        })  

       //return  res.render('administracion/editarArea');
    }, 
    postEditarArea : async function (req,res,next){ 
      const { idArea } = req.params;
      const { nombreArea } = req.body;
      const modificado = { 
         nombreArea
      };
      console.log(nombreArea);
      await pool.query('UPDATE area set ? WHERE idArea = ?', [modificado, idArea]);
      
      res.redirect('/tablaAreas');
  },
    
    //---------------Servicios--------------------
   getAgregarServicio: async function(req,res,vext){
      const checklist = await pool.query('SELECT * FROM checklist' );
        res.render('administracion/agregarServicio', {checklist});
    },
    postAgregarServicio : async function(req,res,next){ 
     /* const  { nombre,idChecklist} = req.body;      
      const newServicio = { nombre,idChecklist};
      await pool.query('INSERT INTO checklist set ?',[newServicio]);
      res.render('administracion/tablaServicios');*/
  },
   getAgregarSubservicio:function(req,res,vext){
       return  res.render('administracion/agregarSubservicio');
    },
   getEditarServicio:function(req,res,vext){
      return  res.render('administracion/editarServicio');
   },
   getEditarSubservicio:function(req,res,vext){
      return  res.render('administracion/editarSubservicio');
   },
   getTablaServicios:function(req,res,vext){
      return  res.render('administracion/tablaServicios');
   },
   getTablaSubservicios:function(req,res,vext){
      return  res.render('administracion/tablaSubservicios');
   },
   getEditarServicio:function(req,res,vext){

      const {idServicio} = req.params; 
      const cadena = pool.query('SELECT * FROM catalogoservicio WHERE idServicio = 1' );

        cadena.then(function(result) {
            res.render('administracion/editarServicio', {info: result[0]} );
            console.log(result[0]);
        })
       //return  res.render('administracion/editarServicio');
    },
    postEditarServicio : async function (req,res,next){ 
      const { idServicio } = req.params;
      const { nombre } = req.body;
      const modificado = { 
         nombre
      };
      console.log(nombre);
      await pool.query('UPDATE catalogoservicio set ? WHERE idServicio = ?', [modificado, idServicio]);
      
      res.redirect('/tablaServicios');
  },
    getEditarSubservicio:function(req,res,vext){

      const {idSubServicio} = req.params; 
      const cadena = pool.query('SELECT * FROM subserivicio WHERE idSubServicio = ?', idSubServicio );

        cadena.then(function(result) {
            res.render('administracion/editarSubservicio', {info: result[0]} );
            console.log(result[0]);
        })
       //return  res.render('administracion/editarSubservicio');
    },
    postEditarSubservicio : async function (req,res,next){ 
      const { idSubServicio } = req.params;
      const { nombre } = req.body;
      const modificado = { 
         nombre
      };
      console.log(nombre);
      await pool.query('UPDATE subserivicio set ? WHERE idSubServicio = ?', [modificado, idSubServicio]);
      
      res.redirect('/tablaSubservicios');
  },
   
   //-----------------Egresos---------------

    getAgregarConceptoE:async function(req,res,vext){
      res.render('administracion/agregarConceptoE');
   },
   postAgregarConceptoE : async function(req,res,next){
      const  { conceptoGasto} = req.body;
      const newConceptoGasto = { conceptoGasto};
      await pool.query('INSERT INTO conceptogasto set ?',[newConceptoGasto]);
      
      res.redirect('/tablaConceptosE');
  },
   
   getEditarEgreso:function(req,res,vext){
      const {idGasto} = req.params;
      const cadena = pool.query('SELECT * FROM gasto WHERE idGasto = ?', idGasto);
        cadena.then(function(gasto) {
            const user = pool.query('SELECT * FROM empleado ');
            user.then(function(result2){
               const user2 = pool.query('SELECT * FROM empleado WHERE idEmpleado = ?', [gasto[0].idUsuario]);   
               user2.then(function(result3){
                  const metodo = pool.query('SELECT * FROM metododepago');
                  metodo.then(function(result4){
                     const metodo1 = pool.query('SELECT * FROM metododepago WHERE idMetodoDePago = ?', [gasto[0].idMetodoDePago]);
                     metodo1.then(function(result5){
                        const concepto = pool.query('SELECT * FROM conceptogasto WHERE idConceptoGasto = ?', [gasto[0].idConceptoGasto]);
                        concepto.then(function(result6){
                           const gastos = pool.query('SELECT * FROM conceptogasto');
                           gastos.then(function(concepto){
                              res.render('administracion/editarEgreso', {concepto,info: gasto[0], result2, info2: result3[0], result4, info3: result5[0], info4: result6[0]} );
                           })
                        })
                     })
                     
                  })
                  
               }) 
            })
           
        })
    },
    postEditarEgreso : async function(req, res, next){
      const {idGasto} = req.params;
      const {monto, fechaGasto, facturado, idUsuario, idConceptoGasto, idMetodoDePago} = req.body;
      const egreso = {monto, fechaGasto, facturado, idUsuario, idConceptoGasto, idMetodoDePago}

      console.log(egreso);
      await pool.query('UPDATE gasto SET ? WHERE idGasto = ?', [egreso,idGasto]);
      res.redirect('/menuFinanzas');
    },

    getEliminarGasto : async function (req,res,next){
      const{idGasto} = req.params;
      await pool.query('DELETE FROM gasto WHERE idGasto = ?', [idGasto]);
      res.redirect('/menuFinanzas'); 
  },

    //---------------------Ingresos------------------------
    
   getAgregarConceptoI: function(req,res,vext){
        res.render('administracion/agregarConceptoI');
   },
   postAgregarConceptoI : async function(req,res,next){
      const  { conceptoIngreso} = req.body;
      const newConceptoIngreso = { conceptoIngreso};
      await pool.query('INSERT INTO conceptoingreso set ?',[newConceptoIngreso]);
      
      res.redirect('/tablaConceptosI');
  },
    getEditarIngreso : function(req,res,next){
      const {idIngreso} = req.params;
      const cadena = pool.query('SELECT * FROM ingreso WHERE idIngreso = ?', [idIngreso] );
        cadena.then(function(ingreso) {
               const cadena3 = pool.query('SELECT * FROM proyecto WHERE idProyecto = ?', ingreso[0].idProyecto);
               cadena3.then(function(proyecto){
                  const proye = pool.query('SELECT * FROM proyecto');
                  proye.then(function(proyectos){
                     const cadena4 = pool.query('SELECT * FROM conceptoingreso WHERE idConceptoIngreso = ?', ingreso[0].idConceptoIngreso);
                     cadena4.then(function(concepto){
                        const cadena5 = pool.query('SELECT * FROM conceptoingreso');
                        cadena5.then(function(conceptos){
                           res.render('administracion/editarIngreso', {conceptos, concepto: concepto[0], proyectos, proyecto: proyecto[0], ingreso: ingreso[0]} );
                            
                        })
                     })
                  })
               })
        })
       
    },
    postEditarIngreso : async function (req,res,next){ 
      const { idIngreso } = req.params;
      const { monto, fechaGasto, facturado, idProyecto, idConceptoIngreso } = req.body;
      
      const modificado = {  monto, fechaGasto, facturado, idProyecto, idConceptoIngreso};
      await pool.query('UPDATE ingreso set ? WHERE idIngreso = ?', [modificado, idIngreso]);
      
      res.redirect('/menuFinanzas');
  },

  getEliminarIngreso : async function (req,res,next){
   const{idIngreso} = req.params;
   await pool.query('DELETE FROM ingreso WHERE idIngreso = ?', [idIngreso]);
   res.redirect('/menuFinanzas'); 
   },
   
};