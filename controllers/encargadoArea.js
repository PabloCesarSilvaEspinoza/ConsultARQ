const pool = require('../database');
const bcrypt = require('bcrypt');
const { body } = require('express-validator');

require

module.exports={
    //Inicio aqui me quede
    getPerfilUsuario:function (req, res, next){
        const idUsuario=req.app.locals.idUsuario;
        const usuario=pool.query('select empleado.nombres as Empleado, empleado.primerApellido as pA from usuario inner join empleado on empleado.idEmpleado=usuario.idEmpleado where usuario.idUsuario=?', idUsuario);
        usuario.then(function(result) {
            res.render("auth/usuario", {usuario: result[0]});
        })
      },
   //agenda
    getConsultarAgenda:async function(req,res,next){
        const idUsuario=req.app.locals.idUsuario;
        const proveedores = await pool.query('select usuario.idUsuario as idUsuario, empleado.idEmpleado as idEmpleado, empleadoarea.idArea as idArea, proveedor.* from usuario join empleado on empleado.idEmpleado=usuario.idEmpleado join empleadoarea on empleadoarea.idEmpleado=empleado.idEmpleado join area on empleadoarea.idArea=area.idArea join proveedorarea on proveedorarea.idArea=area.idArea join proveedor on proveedor.idProveedor=proveedorarea.idProveedor where usuario.idUsuario = ?', idUsuario);
        const clientes= await pool.query('select usuario.idUsuario as idUsuario, empleado.idEmpleado as idEmpleado,cliente.* from usuario join empleado on empleado.idEmpleado=usuario.idEmpleado join proyectoempleado on proyectoempleado.idEmpleado=empleado.idEmpleado join proyecto on proyectoempleado.idProyecto=proyecto.idProyecto join cliente on proyecto.idCliente=cliente.idCliente where usuario.idUsuario = ? ', idUsuario);
        return  res.render('encargadoArea/agenda/consultarAgenda',{proveedores,clientes});
    },
    getConsultarCliente:function(req,res,next){
        const {idCliente} = req.params;     
        const usuario = pool.query('SELECT * FROM cliente WHERE idCliente = ?',idCliente );
        usuario.then(function(result) {
            res.render('encargadoArea/agenda/consultarCliente', {link: result[0]} );
        })
    },
    getConsultarEmpleados:function(req,res,next){
        return  res.render('encargadoArea/agenda/consultarEmpleados');
    },
    getConsultarProveedores:function(req,res,next){
        const {idProveedor} = req.params;
        const proveedor = pool.query('SELECT * FROM proveedor WHERE idProveedor = ?', idProveedor );
        console.log(proveedor);
        proveedor.then(function(result) {
            res.render('encargadoArea/agenda/consultarProveedores',{link:result[0]});
           
        })
    },
    
    //proyectos > checklist
    getChecklist:function(req,res,next){
        const {idProyecto}=req.params;
        let va= 'select catalogoservicio.estatus estatus, proyecto.idProyecto as idProyecto, checklist.idChecklist as idChecklist,catalogoservicio.idServicio as idServicio, catalogoservicio.nombre as servicio,count(catalogoservicio.nombre) total from proyecto inner join checklist on proyecto.idProyecto=checklist.idProyecto inner join catalogoservicio on checklist.idChecklist=catalogoservicio.idChecklist inner join subserivicio on catalogoservicio.idServicio=subserivicio.idServicio where proyecto.idProyecto= '+idProyecto; 
        let va2=' group by catalogoservicio.nombre';
        let query1=va.concat(va2);
        const checkL=pool.query(query1);
     checkL.then(function(result){ 
        res.render('encargadoArea/proyectos/checklist/checklist',{result,idProyecto});
      })
    },
    getConsultarServicio:function(req,res,next){
        const {idProyecto,servicio}=req.params;
        let va='select proyecto.idProyecto as idProyecto, checklist.idChecklist as idChecklist, catalogoservicio.idServicio as idServicio, catalogoservicio.nombre as servicio,subserivicio.idSubServicio,subserivicio.nombreSub from proyecto inner join checklist on proyecto.idProyecto=checklist.idProyecto inner join catalogoservicio on checklist.idChecklist=catalogoservicio.idChecklist inner join subserivicio on catalogoservicio.idServicio=subserivicio.idServicio where catalogoservicio.nombre= ';
        let va1= "'"+ servicio +"'" ;
        let va2=' and proyecto.idProyecto='+idProyecto;
        let query1=va.concat(va1,va2);
        const subservicio=pool.query(query1);
        subservicio.then(function(result){
           return  res.render('encargadoArea/proyectos/checklist/consultarServicio',{result,area:result[0].servicio});
        })
     },
    getConsultarSubservicios:function(req,res,next){
        const{idSubServicio}=req.params;
        const conceptoC=pool.query('select subserivicio.idSubServicio, subserivicio.nombreSub,conceptocatalogo.idConceptoCatalogo, conceptocatalogo.concepto,conceptocatalogo.unidadMedida,conceptocatalogo.cantidad, conceptocatalogo.montoXUnidad,conceptocatalogo.montoTotal from subserivicio inner join conceptocatalogo on subserivicio.idSubServicio=conceptocatalogo.idSubServicio where subserivicio.idSubServicio = ?',idSubServicio);
        conceptoC.then(function(result){
           return  res.render('encargadoArea/proyectos/checklist/consultarSubservicios',{result:result[0],info:result,idSubServicio});
        })
    },

    //proyectos > inicio
    getConsultarProyectos:async function(req,res,next){
        const idUsuario=req.app.locals.idUsuario;

        let proyect= 'select usuario.idUsuario as idUsuario, empleado.idEmpleado as idEmpleado, proyecto.idProyecto as idProyecto,proyecto.nombre as nProyecto,proyecto.calle as calle,proyecto.colonia as colonia,proyecto.estatus as estatus,proyecto.fechaFin as fechaFin,cliente.nombres as nCliente,cliente.RFC as RFC,checklist.nombreChecklist as nTipo,empleado.nombres as emplead, empleado.primerApellido as pE, empleado.segundoApellido as sE from usuario join empleado on empleado.idEmpleado=usuario.idEmpleado join proyectoempleado on proyectoempleado.idEmpleado=empleado.idEmpleado join proyecto on proyectoempleado.idProyecto=proyecto.idProyecto inner join cliente on proyecto.idCliente=cliente.idCliente inner join checklist on checklist.idProyecto=proyecto.idProyecto where usuario.idUsuario = '+idUsuario;
        let ord= ' order by proyecto.fechaFin asc';
        let proy=proyect.concat(ord);
        const proyectos= await pool.query(proy);
        const tipo=await pool.query('SELECT idChecklist,checklist.nombreChecklist FROM checklist inner join proyecto on checklist.idProyecto=proyecto.idProyecto');
        return  res.render('encargadoArea/proyectos/inicio/consultarProyectos',{proyectos,tipo});
    },
    getMenuOpciones:function(req,res,next){
        const {idProyecto}=req.params;
        const proyectos= pool.query('select proyecto.idProyecto as idProyecto,proyecto.nombre as nProyecto,proyecto.calle as calle,proyecto.colonia as colonia,proyecto.estatus as estatus,proyecto.fechaFin as fechaFin,cliente.nombres as nCliente,cliente.RFC as RFC,checklist.nombreChecklist as nTipo,empleado.nombres as emplead, empleado.primerApellido as pE, empleado.segundoApellido as sE from proyectoempleado inner join proyecto on proyectoempleado.idProyecto=proyecto.idProyecto inner join empleado on proyectoempleado.idEmpleado=empleado.idEmpleado inner join cliente on proyecto.idCliente=cliente.idCliente inner join checklist on checklist.idProyecto=proyecto.idProyecto where proyecto.idProyecto=?',idProyecto);
        proyectos.then(function(result){
        return  res.render('encargadoArea/proyectos/inicio/menuOpciones',{proyecto:result[0]});
    }) 
    },

    //proyectos > tareas
    getTareas:async function(req,res,next){
        const idUsuario=req.app.locals.idUsuario;
        const {idProyecto} = req.params;
        
        let a='select  usuario.idUsuario as idUsuario, empleado.nombres as empleado, proyecto.nombre as proyecto, proyecto.fechaFin as fechaFin, tarea.idTarea as idTarea, tarea.descripcion as descripcion, tarea.estatus as estatus from usuario inner join empleado on usuario.idEmpleado=empleado.idEmpleado inner join tareaempleado on empleado.idEmpleado=tareaempleado.idEmpleado inner join tarea on tarea.idTarea=tareaempleado.idTarea inner join proyecto on proyecto.idProyecto=tarea.idProyecto where usuario.idUsuario = '+ idUsuario;
        let b=' and proyecto.idProyecto = '+idProyecto;
        let c=a.concat(b);
        const info=await pool.query(c);
        res.render('encargadoArea/proyectos/tareas/tareas',{info});
    },
    getTareasUsuarios:async function(req,res,next){
        const idUsuario=req.app.locals.idUsuario;
        

        let tarea = 'select  usuario.idUsuario as idUsuario, empleado.nombres as empleado, proyecto.idProyecto as idProyecto,proyecto.nombre as proyecto, proyecto.fechaFin as fechaFin, tarea.idTarea as idTarea, tarea.descripcion as descripcion, tarea.estatus as estatus from usuario inner join empleado on usuario.idEmpleado=empleado.idEmpleado inner join tareaempleado on empleado.idEmpleado=tareaempleado.idEmpleado inner join tarea on tarea.idTarea=tareaempleado.idTarea inner join proyecto on proyecto.idProyecto=tarea.idProyecto where usuario.idUsuario = '+ idUsuario;
        let agroup=' group by proyecto.nombre';
        let query1=tarea.concat(agroup);
        const usuarioTarea=pool.query(query1);
        usuarioTarea.then(function(result){ 
            res.render('encargadoArea/proyectos/tareas/tareasUsuarios',{result});
        })
    },
    getConsultarTareasUsuarios:async function(req,res,next){
        const idUsuario=req.app.locals.idUsuario;
        const{idProyecto}=req.params;
        let a='select usuario.idUsuario as idUsuario, empleado.nombres as empleado, proyecto.nombre as proyecto, proyecto.fechaFin as fechaFin, tarea.idTarea as idTarea, tarea.descripcion as descripcion, tarea.estatus as estatus, proyecto.idProyecto as idProyecto from usuario inner join empleado on usuario.idEmpleado=empleado.idEmpleado inner join tareaempleado on empleado.idEmpleado=tareaempleado.idEmpleado inner join tarea on tarea.idTarea=tareaempleado.idTarea inner join proyecto on proyecto.idProyecto=tarea.idProyecto where usuario.idUsuario = '+ idUsuario;
        let b=' and proyecto.idProyecto = '+idProyecto;
        let c=a.concat(b);
        const info=await pool.query(c);
        res.render('encargadoArea/proyectos/tareas/consultarTareaUsr',{info});
    },
    postEliminarTarea: async function(req,res,next){
        const{idTarea}=req.params;
        const{idProyecto}=req.body;
        await pool.query("DELETE FROM tareaempleado WHERE idTarea = ?",[idTarea]);
        res.redirect('/Usr/consultarTareas/'+idProyecto);

        console.log(idTarea);
        console.log(idProyecto);
        

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

