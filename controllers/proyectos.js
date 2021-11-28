const pool = require('../database');
const bcrypt = require('bcrypt');
const { body } = require('express-validator');

module.exports={
   //inicio
   getProyectos:async function(req,res,next){
      const tipo=await pool.query('SELECT idChecklist,checklist.nombreChecklist FROM checklist inner join proyecto on checklist.idProyecto=proyecto.idProyecto');
      const proyectos= await pool.query('select proyecto.idProyecto as idProyecto,proyecto.nombre as nProyecto,proyecto.calle as calle,proyecto.colonia as colonia,proyecto.estatus as estatus,proyecto.fechaFin as fechaFin,cliente.nombres as nCliente,cliente.RFC as RFC,checklist.nombreChecklist as nTipo,empleado.nombres as emplead, empleado.primerApellido as pE, empleado.segundoApellido as sE from proyectoempleado inner join proyecto on proyectoempleado.idProyecto=proyecto.idProyecto inner join empleado on proyectoempleado.idEmpleado=empleado.idEmpleado inner join cliente on proyecto.idCliente=cliente.idCliente inner join checklist on checklist.idProyecto=proyecto.idProyecto group by proyecto.nombre  order by idProyecto desc');

      return  res.render('proyectos/inicio/consultarProyectos',{tipo,proyectos});
   },
   getMenuOpciones:function(req,res,next){
      const {idProyecto}=req.params;
      const proyectos= pool.query('select proyecto.idProyecto as idProyecto,proyecto.nombre as nProyecto,proyecto.calle as calle,proyecto.colonia as colonia,proyecto.estatus as estatus,proyecto.fechaFin as fechaFin,cliente.nombres as nCliente,cliente.RFC as RFC,checklist.nombreChecklist as nTipo,empleado.nombres as emplead, empleado.primerApellido as pE, empleado.segundoApellido as sE,sum(ingreso.monto) as monto from proyectoempleado inner join proyecto on proyectoempleado.idProyecto=proyecto.idProyecto inner join empleado on proyectoempleado.idEmpleado=empleado.idEmpleado inner join cliente on proyecto.idCliente=cliente.idCliente inner join checklist on checklist.idProyecto=proyecto.idProyecto inner join ingreso on proyecto.idProyecto=ingreso.idProyecto where proyecto.idProyecto=?',idProyecto);
      const p= pool.query('select proyecto.idProyecto as idProyecto,proyecto.nombre as nProyecto,proyecto.calle as calle,proyecto.colonia as colonia,proyecto.estatus as estatus,proyecto.fechaFin as fechaFin,cliente.nombres as nCliente,cliente.RFC as RFC,checklist.nombreChecklist as nTipo,empleado.nombres as emplead, empleado.primerApellido as pE, empleado.segundoApellido as sE from proyectoempleado inner join proyecto on proyectoempleado.idProyecto=proyecto.idProyecto inner join empleado on proyectoempleado.idEmpleado=empleado.idEmpleado inner join cliente on proyecto.idCliente=cliente.idCliente inner join checklist on checklist.idProyecto=proyecto.idProyecto where proyecto.idProyecto=?',idProyecto);
      p.then(function(persona){
      proyectos.then(function(result){
         const total=pool.query('select proyecto.idProyecto as idProyecto,checklist.idChecklist as idChecklist, catalogoservicio.idServicio as idServicio, catalogoservicio.nombre as servicio, subserivicio.idSubServicio as idSubSerivicio, subserivicio.nombreSub as SubServicio,conceptocatalogo.concepto as concepto, sum(conceptocatalogo.montoTotal) as Total from proyecto inner join checklist on proyecto.idProyecto=checklist.idProyecto inner join catalogoservicio on catalogoservicio.idChecklist=checklist.idChecklist  inner join subserivicio on catalogoservicio.idServicio=subserivicio.idServicio inner join conceptocatalogo on conceptocatalogo.idSubServicio=subserivicio.idSubServicio where proyecto.idProyecto= ?' ,idProyecto);
         total.then(function(re){
             let t= pool.query('select count(catalogoservicio.estatus) as total from catalogoservicio inner join subserivicio on catalogoservicio.idServicio=subserivicio.idServicio where idchecklist= ? ',idProyecto)
              t.then(function(t){
               let Tt=t[0].total;
               let acept='select count(catalogoservicio.estatus) as completos from catalogoservicio inner join subserivicio on catalogoservicio.idServicio=subserivicio.idServicio where idchecklist = '+idProyecto;
               let ac= ' and catalogoservicio.estatus=1';
               let ace=acept.concat(ac);
               const acep=pool.query(ace);
               acep.then(function(acep){
                  let aceptados=acep[0].completos;
                  const porcentaje=(aceptados*100)/Tt;
                  res.render('proyectos/inicio/menuOpciones',{proyecto:result[0],montoTotal:re[0],porcentaje,emp:persona[0]});
               })

            })
         })
      })
   })
   },
   getAgregarProyecto:async function(req,res,next){
      const clientes= await pool.query('SELECT * FROM cliente')
      const empleados= await pool.query('SELECT * FROM empleado')
      return  res.render('proyectos/inicio/agregarProyecto',{clientes,empleados});
   },
   postAgregarProyecto:async function(req,res,next){
      const  { nombre, calle, colonia, fechaInicio, fechaFin,estatus, idCliente,idEmpleado,nombreChecklist} = req.body;    
      const newProyecto = { nombre, calle, colonia, fechaInicio, fechaFin, estatus, idCliente};
      await pool.query('INSERT INTO proyecto set ?',[newProyecto]);
      const idPr=await pool.query('select max(idProyecto) as id from proyecto');
      const idProyecto=idPr[0].id;
      const newPE={idProyecto,idEmpleado};
      const newTipo={nombreChecklist,idProyecto};
      await pool.query('INSERT INTO proyectoempleado set ?',[newPE]);
      await pool.query('INSERT INTO checklist set ?',[newTipo]);
      res.redirect('/proyectos')
   },
   getEditarProyectos : function(req,res,next){
         const{idProyecto}=req.params; 
         const proyecto = pool.query('select proyecto.idProyecto as idProyecto,proyecto.nombre as nProyecto,proyecto.calle as calle,proyecto.colonia as colonia,proyecto.estatus as estatus,proyecto.fechaFin as fechaFin, proyecto.fechaInicio as fechaInicio from proyectoempleado inner join proyecto on proyectoempleado.idProyecto=proyecto.idProyecto inner join empleado on proyectoempleado.idEmpleado=empleado.idEmpleado inner join cliente on proyecto.idCliente=cliente.idCliente inner join checklist on checklist.idProyecto=proyecto.idProyecto WHERE proyecto.idProyecto = ?',[idProyecto]);
         proyecto.then(function(result){
            res.render('proyectos/inicio/editarProyecto',{info: result[0]});
            console.log(result[0]);
         })
   },
   postEditarProyectos : async function(req, res, next){
      const {idProyecto} = req.params;
      console.log(idProyecto);
      const {nombre, calle, colonia, fechaInicio, fechaFin, estatus} = req.body;
      const modificar = {nombre, calle, colonia, fechaInicio, fechaFin, estatus};
      await pool.query('UPDATE proyecto set ? WHERE idProyecto = ?', [modificar,idProyecto]);
      res.redirect('/menuOpciones/'+idProyecto);
   },
   //bitacora
   getBitacora:function(req,res,next){
      return  res.render('proyectos/bitacora/bitacora');
   },

    //checklist
   getChecklist:function(req,res,next){
      const {idProyecto}=req.params;
         let va= 'select  catalogoservicio.estatus estatus,proyecto.idProyecto as idProyecto, checklist.idChecklist as idChecklist,catalogoservicio.idServicio as idServicio, catalogoservicio.nombre as servicio,count(catalogoservicio.nombre) total from proyecto inner join checklist on proyecto.idProyecto=checklist.idProyecto inner join catalogoservicio on checklist.idChecklist=catalogoservicio.idChecklist inner join subserivicio on catalogoservicio.idServicio=subserivicio.idServicio where proyecto.idProyecto= '+idProyecto; 
         let va2=' group by catalogoservicio.nombre';
         let query1=va.concat(va2);
         const checkL=pool.query(query1);
      checkL.then(function(result){ 
         res.render('proyectos/checklist/checklist',{result,idProyecto});
   })
   },
   getAgregarServicios:async function(req,res,next){
      const {idProyecto}=req.params;
      const servicio=await pool.query('Select * from area');
      return  res.render('proyectos/checklist/agregarServicios',{servicio,idProyecto});
   },
   getConsultarServicio:function(req,res,next){
      const {idProyecto,servicio}=req.params;
      let va='select proyecto.idProyecto as idProyecto, checklist.idChecklist as idChecklist, catalogoservicio.idServicio as idServicio, catalogoservicio.nombre as servicio,subserivicio.idSubServicio,subserivicio.nombreSub from proyecto inner join checklist on proyecto.idProyecto=checklist.idProyecto inner join catalogoservicio on checklist.idChecklist=catalogoservicio.idChecklist inner join subserivicio on catalogoservicio.idServicio=subserivicio.idServicio where catalogoservicio.nombre= ';
      let va1= "'"+ servicio +"'" ;
      let va2=' and proyecto.idProyecto='+idProyecto;
      let query1=va.concat(va1,va2);
      const subservicio=pool.query(query1);
      subservicio.then(function(result){
         return  res.render('proyectos/checklist/consultarServicio',{result,area:result[0].servicio});
      })
   },
   postAgregarSubservicios:async function(req,res,next){
      const {nombre,nombreServicio} = req.body;
      const {idProyecto}=req.params;
      let idChecklist=idProyecto
      const newServ={nombre,idChecklist};
      let a='select empleado.idEmpleado as idEmpleado from area inner join empleadoarea on area.idArea=empleadoarea.idArea inner join empleado on empleado.idEmpleado=empleadoarea.idEmpleado where area.nombreArea = ';
      let b="'"+ nombre +"'";
      let qu=a.concat(b);
      await pool.query('INSERT INTO catalogoservicio set ?',[newServ]);
      const idServ=await pool.query('select max(idServicio) as id from catalogoservicio');
      const idServicio=idServ[0].id;
      let nombreSub=nombreServicio;
      const newSubServ={nombreSub,idServicio};
      await pool.query('INSERT INTO subserivicio set ?',[newSubServ]);
      try{
         const anotherEmp=await pool.query(qu);
         const idEmpleado=anotherEmp[0].idEmpleado;
         const contribuyente={idProyecto,idEmpleado};
         await pool.query('INSERT INTO proyectoempleado set ?',[contribuyente]);
      }catch(error){
         return  res.redirect('/agregarServicios/'+idProyecto);
      }
      res.redirect('/agregarServicios/'+idProyecto);


   },

   getEditarNombreSubservicios:function(req,res,next){
      return  res.render('proyectos/checklist/editarNombreSubservicios');
   },
   getEditarServicios:function(req,res,next){
      return  res.render('proyectos/checklist/editarServicios');
   },
   getEditarSubservicios:function(req,res,next){
      const{idSubServicio}=req.params;
      const conceptoC=pool.query('select subserivicio.idSubServicio, subserivicio.nombreSub,conceptocatalogo.idConceptoCatalogo, conceptocatalogo.concepto,conceptocatalogo.unidadMedida,conceptocatalogo.cantidad, conceptocatalogo.montoXUnidad,conceptocatalogo.montoTotal from subserivicio inner join conceptocatalogo on subserivicio.idSubServicio=conceptocatalogo.idSubServicio where subserivicio.idSubServicio=?',idSubServicio);
      conceptoC.then(function(result){
         return  res.render('proyectos/checklist/editarSubservicios',{result:result[0],info:result,idSubServicio});
      })
   },
   
   //------------------------------------------finanzas--------------------------------------
   getMenuFinanzas:async function(req,res,next){
      const gasto = await pool.query('SELECT idGasto,conceptoGasto, monto,fechaGasto, fechaRegistro, facturado, nombres,metodo FROM gasto a INNER JOIN conceptogasto b ON a.idConceptoGasto = b.idConceptoGasto INNER JOIN empleado c  ON a.idUsuario=c.idEmpleado INNER JOIN metododepago d  ON a.idMetodoDePago=d.idMetodoDePago' );
      const ingreso = await pool.query('SELECT idIngreso,conceptoIngreso,monto,fechaGasto, fechaRegistro, facturado, nombre FROM ingreso a INNER JOIN conceptoingreso b ON a.idConceptoIngreso = b.idConceptoIngreso INNER JOIN proyecto c  ON a.idProyecto=c.idProyecto' );
      const ingr=await pool.query('select monto,fechaRegistro from ingreso');
      const egre=await pool.query('select monto,fechaRegistro from gasto');
      return  res.render('proyectos/finanzas/menuFinanzas',{gasto, ingreso,ingr,egre});
   },
   
   getAgregarIngreso:async function(req,res,next){
      const proyecto = await pool.query('SELECT * FROM proyecto' );
        const conceptoingreso = await pool.query('SELECT * FROM conceptoingreso' );
        res.render('proyectos/finanzas/agregarIngreso', {proyecto,conceptoingreso});
   },
   postAgregarIngresos : async function(req,res,next){
      const  { monto, fechaGasto, fechaRegistro= new Date(), facturado, idProyecto, idConceptoIngreso} = req.body;
      const newIngreso = { monto, fechaGasto, fechaRegistro, facturado, idProyecto, idConceptoIngreso};
      await pool.query('INSERT INTO ingreso set ?',[newIngreso]);
      
      res.redirect('/menuFinanzas');
  },
  // ----------------Ingresos de proyecto------------------
  getIngresos:async function(req,res,next){
   const {idProyecto}=req.params;
   const ingreso = await pool.query('SELECT a.idIngreso, c.conceptoIngreso, a.monto, b.nombre, a.fechaGasto FROM ingreso a INNER JOIN proyecto b ON a.idProyecto=b.idProyecto INNER JOIN conceptoingreso c ON a.idConceptoIngreso=c.idConceptoIngreso WHERE a.idProyecto=?', idProyecto);
      
   res.render('proyectos/finanzas/ingresos', {idProyecto,ingreso});
   },
  getAgregarIngresoP:async function(req,res,next){
   const {idProyecto}=req.params;
   const conceptoingreso = await pool.query('SELECT * FROM conceptoingreso' );
   const proyecto = await pool.query('SELECT * FROM proyecto WHERE idProyecto=?',idProyecto );
      res.render('proyectos/finanzas/agregarIngresoProyecto', {proyecto,conceptoingreso});

},
postAgregarIngresoP : async function(req,res,next){
   const  { monto, fechaGasto, fechaRegistro= new Date(), facturado,idProyecto,idConceptoIngreso} = req.body;
   const newIngreso = { monto, fechaGasto, fechaRegistro, facturado, idProyecto, idConceptoIngreso};
   await pool.query('INSERT INTO ingreso set ? ',[newIngreso]);
   
   res.redirect('/proyectos');
},
//-----------------------------------------------------------------
  getEgresos:async function(req,res,next){
   return  res.render('proyectos/finanzas/egresos');
},
   getAgregarEgreso:async function(req,res,next){
      const usuario = await pool.query('SELECT * FROM empleado' );
      const conceptoGasto = await pool.query('SELECT * FROM conceptoGasto' );
      const metododepago = await pool.query('SELECT * FROM metododepago' );
        res.render('proyectos/finanzas/agregarEgreso', {usuario,conceptoGasto,metododepago});
   },
   postAgregarEgreso : async function(req,res,next){
      const  { monto, fechaGasto, fechaRegistro= new Date(), facturado, idUsuario, idConceptoGasto, idMetodoDePago} = req.body;
      const newEgreso = { monto, fechaGasto, fechaRegistro, facturado, idUsuario, idConceptoGasto, idMetodoDePago};
      await pool.query('INSERT INTO gasto set ?',[newEgreso]);
      
      res.redirect('/menuFinanzas');
  },
  
   //tareas
   getTareas:async function(req,res,next){
      const {idProyecto}=req.params;
      const tareas1 = 'select proyecto.idProyecto as idProyecto,proyecto.nombre as nProyecto, tareaempleado.idEmpleado as idEmpleado, tarea.idTarea as idTarea, tarea.descripcion as descripcion, empleado.nombres as nombreEmpleado from tareaempleado inner join empleado on tareaempleado.idEmpleado=empleado.idEmpleado inner join tarea on tarea.idTarea=tareaempleado.idTarea inner join proyecto on tarea.idProyecto=proyecto.idProyecto where proyecto.idProyecto = '+idProyecto;
      const agroup = ' group by empleado.idEmpleado'; 
      const query2 = tareas1.concat(agroup);
      const tareas = pool.query(query2);
      tareas.then(function(tareas){   
         res.render('proyectos/tareas/tareas',{tareas:tareas,idProyecto});
      });
        
   },
   getAgregarTareas: async function(req,res,next){
      const {idProyecto}=req.params;
       
      const proyectos= pool.query('select proyecto.idProyecto as idProyecto,proyecto.nombre as nProyecto,proyecto.calle as calle,proyecto.colonia as colonia,proyecto.estatus as estatus,proyecto.fechaFin as fechaFin,cliente.nombres as nCliente,cliente.RFC as RFC,checklist.nombreChecklist as nTipo,empleado.nombres as emplead, empleado.primerApellido as pE, empleado.segundoApellido as sE from proyectoempleado inner join proyecto on proyectoempleado.idProyecto=proyecto.idProyecto inner join empleado on proyectoempleado.idEmpleado=empleado.idEmpleado inner join cliente on proyecto.idCliente=cliente.idCliente inner join checklist on checklist.idProyecto=proyecto.idProyecto where proyecto.idProyecto=?',idProyecto);
      const empleados= await pool.query('SELECT * FROM empleado')
      proyectos.then(function(result){
         res.render('proyectos/tareas/agregarTareas',{proyecto:result[0],empleados});
      })  
   },
   postAgregarTareas:async function(req,res,next){
      const  {idProyecto,descripcion,idEmpleado,estatus} = req.body;  
        
      const newTarea = {descripcion,estatus,idProyecto};
      await pool.query('INSERT INTO tarea set ?',[newTarea]);
      const idTar=await pool.query('select max(idTarea) as id from tarea');
       const idTarea=idTar[0].id;
      const newTe={idTarea,idEmpleado};
      await pool.query('INSERT INTO tareaempleado set ?',[newTe]);
      res.redirect('/tareas/'+idProyecto)
      
   },
   getTareasUsuarios:function(req,res,next){
      return  res.render('proyectos/tareas/tareasUsuarios');
      
   },
   getConsultarTareas:async function(req,res,next){
      const{idProyecto,idEmpleado}=req.params;
      let info='select proyecto.idProyecto as idProyecto,proyecto.nombre as nProyecto, tareaempleado.idEmpleado as idEmpleado, tarea.idTarea as idTarea, tarea.descripcion as descripcion, tarea.estatus as estatus from tareaempleado inner join empleado on tareaempleado.idEmpleado=empleado.idEmpleado inner join tarea on tarea.idTarea=tareaempleado.idTarea inner join proyecto on tarea.idProyecto=proyecto.idProyecto where proyecto.idProyecto = '+ idProyecto;
      let inf=' and tareaempleado.idEmpleado = '+idEmpleado;
      let infC=info.concat(inf);
      const informacion=await pool.query(infC);
      return  res.render('proyectos/tareas/consultarTareas',{informacion,idProyecto,idEmpleado}); 
      
   },
   postEliminarTarea:async function(req,res,next){
      const {idTarea} = req.params;
      const {idProyecto,idEmpleado}=req.body;
      
    await pool.query("DELETE FROM tareaempleado WHERE idTarea = ?",[idTarea]);
   res.redirect('/consultarTareas/'+idProyecto+'/'+idEmpleado);
     
   },
   getTerminarServicio:async function(req,res,next){
      const{idProyecto,servicio}=req.params
      let a='select catalogoservicio.idServicio as idServicio, catalogoservicio.nombre as servicio, catalogoservicio.estatus as estatus from proyecto inner join checklist on proyecto.idProyecto=checklist.idProyecto inner join catalogoservicio on checklist.idChecklist=catalogoservicio.idChecklist where catalogoservicio.nombre = '+"'"+servicio+"'";
      let c= ' and proyecto.idProyecto= '+idProyecto;
      let b=a.concat(c);
      const cambiar=await pool.query(b);
      let longi=cambiar.length;
      for (let i=0;i < longi;i++){
         let s='select catalogoservicio.idServicio as idServicio from proyecto inner join checklist on proyecto.idProyecto=checklist.idProyecto inner join catalogoservicio on checklist.idChecklist=catalogoservicio.idChecklist where catalogoservicio.nombre = '+"'"+servicio+"'";
         let x= ' and proyecto.idProyecto= '+idProyecto;
         let y=s.concat(x);
         const aux=await pool.query(y);
         const aux1=aux[i].idServicio;
         await pool.query('UPDATE catalogoservicio SET estatus = 1 WHERE idServicio = ? ',aux1);
      }
      res.redirect('/checklist/'+idProyecto);
   }
};

