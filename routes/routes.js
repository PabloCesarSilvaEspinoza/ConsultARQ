var express = require('express');
var router = express.Router();
var controllers = require('.././controllers');
var passport = require('passport');

const {protegerRuta} = require('../lib/proteger'); // esto se utiliza despues de la ruta
        // ejemplo: router.get('ruta', protegerRuta, controllers,lodemas);

//Inicio
router.get("/", controllers.Loggin.getloggin);
router.post("/loggin", controllers.Loggin.postloggin);
router.post("/logginUsuario", controllers.Loggin.postlogginUsuario);
router.get('/configuracionSistema', controllers.Loggin.getConfiguracionSistema);

//router.post('/inicio',controllers.Loggin.postLoggin);
router.get('/perfil',protegerRuta, controllers.Loggin.getPerfil);
router.get('/perfilUsuario',protegerRuta, controllers.encargadoArea.getPerfilUsuario);
router.get('/logout', controllers.Loggin.getlogout);

//agenda principal
router.get('/consultarAll', protegerRuta, controllers.agenda.getConsultarAll);
//----------------------------empleado-----------------------------------------
router.get('/agregarUsuarios',protegerRuta, controllers.agenda.getAgregarUsuarios);
router.post('/agregarEmpleado',protegerRuta, controllers.agenda.postAgregarUsuarios);
router.get('/consultarEmpleado/:idEmpleado',controllers.agenda.getconsultarEmpleado);
router.get('/editarEmpleado/:idEmpleado', protegerRuta, controllers.agenda.getEditarEmpleado);
router.post('/editarEmpleado/:idEmpleado', controllers.agenda.postEditarEmpleado);
//-----------------------------Usuario agregar/ingUsr----------------------------
router.get('/agregarUsr', protegerRuta, controllers.agenda.getAgregarUsr);
router.post('/ingUsr',controllers.agenda.postIngUsr);
router.get('/consultarUsuario/:idUsuario',protegerRuta,controllers.agenda.getconsultarUsuario);
router.get('/editarUsuario/:idUsuario',protegerRuta,controllers.agenda.getEditarUsuario);
router.post('/editarUsuario/:idUsuario',controllers.agenda.postEditarUsuario);
router.get('/eliminarUsuario/:idUsuario',protegerRuta,controllers.agenda.getEliminarUsuario); 
//-----------------------------Clientes-------------------------------------------
router.get('/consultarClientes/:idCliente',protegerRuta, controllers.agenda.getConsultarClientes);
router.get('/agregarClientes',protegerRuta, controllers.agenda.getAgregarClientes);
router.post('/agregar/clienteNuevo', controllers.agenda.postAgregarClientes);
router.get('/editarClientes/:idCliente',protegerRuta, controllers.agenda.getEditarClientes);
router.post('/editarClientes/:idCliente',protegerRuta, controllers.agenda.postEditarClientes);
//---------------------------Proveedor----------------------------------------------------
router.get('/agregarProveedor', protegerRuta, controllers.agenda.getAgregarProveedor);
router.get('/editarProveedor/:idProveedor', protegerRuta, controllers.agenda.getEditarProveedor); 
router.post('/editarProveedor/:idProveedor', controllers.agenda.postEditarProveedor);
router.post('/agregar/proveedorNuevo', controllers.agenda.postAgregarProveedor);
router.get('/consultarProveedor/:idProveedor',protegerRuta, controllers.agenda.getConsultarProveedor);
router.get('/eliminarProveedor/:idProveedor',protegerRuta,controllers.agenda.getEliminarProveedor);
//administrar
router.get('/administrarBaseDatos', protegerRuta,controllers.administracion.getAdministrarBD);
router.get('/administrarCatalogo',protegerRuta, controllers.administracion.getAdministrarCatalogo);
router.get('/administrarConceptos',protegerRuta, controllers.administracion.getAdministrarConceptos);
router.get('/agregarArea',protegerRuta, controllers.administracion.getAgregarArea);
router.post('/agregar/nuevaArea', controllers.administracion.postAgregarArea);
//Conceptos
router.get('/agregarConcepto/:idSubServicio',protegerRuta, controllers.administracion.getAgregarConcepto);
router.post('/agregarConcepto',protegerRuta,controllers.administracion.postAgregarConcepto)
router.get('/agregarConceptoE', protegerRuta,controllers.administracion.getAgregarConceptoE);
router.post('/agregar/nuevoConceptoE', controllers.administracion.postAgregarConceptoE);
router.get('/agregarConceptoI', protegerRuta,controllers.administracion.getAgregarConceptoI);
router.post('/agregar/nuevoConceptoI', controllers.administracion.postAgregarConceptoI);
//<<<<<<< HEAD


//=======
//>>>>>>> origin/prueba

router.get('/agregarRol',protegerRuta, controllers.administracion.getAgregarRol);
router.post('/agregarRol', controllers.administracion.postAgregarRol);
router.get('/agregarServicio', protegerRuta,controllers.administracion.getAgregarServicio);
router.get('/agregarSubservicio',protegerRuta, controllers.administracion.getAgregarSubservicio);
router.get('/editarArea/:idArea', protegerRuta, controllers.administracion.getEditarArea);
router.post('/editarArea/:idArea', controllers.administracion.postEditarArea);
router.get('/editarConcepto/:idConceptoCatalogo', protegerRuta, controllers.administracion.getEditarConcepto);
router.post('/editarConcepto/:idConceptoCatalogo', controllers.administracion.postEditarConcepto);
router.get('/editarConceptoI/:idConceptoIngreso', controllers.administracion.getEditarConceptoI);
router.post('/editarConceptoI/:idConceptoIngreso', controllers.administracion.postEditarConceptoI);
router.get('/editarConceptoE/:idConceptoGasto', controllers.administracion.getEditarConceptoE); 
router.post('/editarConceptoE/:idConceptoGasto', controllers.administracion.postEditarConceptoE); 
 
router.get('/editarRol/:idRol', protegerRuta, controllers.administracion.getEditarRol);
router.post('/editarRol/:idRol', controllers.administracion.postEditarRol);
router.get('/editarServicio', protegerRuta, controllers.administracion.getEditarServicio);  
router.post('/editarServicio', controllers.administracion.postEditarServicio);  
router.get('/editarSubservicio', protegerRuta, controllers.administracion.getEditarSubservicio);
router.post('/editarSubservicio', controllers.administracion.postEditarSubservicio);
router.get('/tablaAreas',protegerRuta, controllers.administracion.getTablaAreas);
router.get('/tablaConceptos', protegerRuta,controllers.administracion.getTablaConceptos);
router.get('/tablaConceptosE', protegerRuta,controllers.administracion.getTablaConceptosE);
router.get('/tablaConceptosI', protegerRuta,controllers.administracion.getTablaConceptosI);
router.get('/tablaRoles', protegerRuta,controllers.administracion.getTablaRoles);
router.get('/tablaServicios', protegerRuta,controllers.administracion.getTablaServicios);
router.get('/tablaSubservicios', protegerRuta,controllers.administracion.getTablaSubservicios);

//Proyectos > inicio
router.get('/proyectos',protegerRuta, controllers.proyectos.getProyectos);
router.get('/menuOpciones/:idProyecto',protegerRuta, controllers.proyectos.getMenuOpciones);
router.get('/agregarProyecto',protegerRuta, controllers.proyectos.getAgregarProyecto);
router.post('/agregarProyecto', controllers.proyectos.postAgregarProyecto);
router.get('/editarProyecto/:idProyecto',protegerRuta, controllers.proyectos.getEditarProyectos);
router.post('/editarProyecto/:idProyecto', controllers.proyectos.postEditarProyectos);

//Proyectos > bitacora
router.get('/bitacora/:idProyecto',protegerRuta, controllers.proyectos.getBitacora);
 
//Proyectos > checklist
router.get('/checklist/:idProyecto', controllers.proyectos.getChecklist);
router.get('/agregarServicios/:idProyecto', controllers.proyectos.getAgregarServicios);
router.get('/consultarServicio/:idProyecto/:servicio', controllers.proyectos.getConsultarServicio);
router.get('/TerminarServicio/:idProyecto/:servicio', controllers.proyectos.getTerminarServicio);
//router.get('/agregarSubservicios', controllers.proyectos.getAgregarSubservicios);
router.post('/agregarSubservicios/:idProyecto', controllers.proyectos.postAgregarSubservicios);
//router.post('/agregarSubservicio',controllers.proyectos.postAgregarSubservicio)
router.get('/editarNombreSubservicios',protegerRuta, controllers.proyectos.getEditarNombreSubservicios);
router.get('/editarServicios', protegerRuta, controllers.proyectos.getEditarServicios);
router.get('/editarSubservicios/:idSubServicio', protegerRuta, controllers.proyectos.getEditarSubservicios);

//Proyectos > finanzas
router.get('/menuFinanzas', protegerRuta,controllers.proyectos.getMenuFinanzas);
router.get('/ingresos/:idProyecto',protegerRuta, controllers.proyectos.getIngresos);
router.get('/egresos', protegerRuta,controllers.proyectos.getEgresos);


router.get('/agregarEgreso', protegerRuta,controllers.proyectos.getAgregarEgreso);
router.post('/agregar/egresoNuevo', controllers.proyectos.postAgregarEgreso);
router.get('/editarEgreso/:idGasto', protegerRuta, controllers.administracion.getEditarEgreso);
router.post('/editarEgreso/:idGasto', controllers.administracion.postEditarEgreso); 
router.get('/eliminarGasto/:idGasto', controllers.administracion.getEliminarGasto);
 
router.get('/agregarIngreso', protegerRuta,controllers.proyectos.getAgregarIngreso);
router.post('/agregar/ingresoNuevo', controllers.proyectos.postAgregarIngresos);
router.get('/editarIngreso/:idIngreso', protegerRuta, controllers.administracion.getEditarIngreso);
router.post('/editarIngreso/:idIngreso',  controllers.administracion.postEditarIngreso);
router.get('/eliminarIngreso/:idIngreso', controllers.administracion.getEliminarIngreso); 

router.get('/agregarIngresoProyecto/:idProyecto', controllers.proyectos.getAgregarIngresoP);
router.post('/nuevoIngresoP', controllers.proyectos.postAgregarIngresoP);

//Proyectos > tareas
router.get('/tareas/:idProyecto',protegerRuta, controllers.proyectos.getTareas);
router.get('/agregarTareas/:idProyecto',protegerRuta, controllers.proyectos.getAgregarTareas);
router.post('/agregarTareas', controllers.proyectos.postAgregarTareas);
router.get('/tareasUsuarios',protegerRuta, controllers.proyectos.getTareasUsuarios);
router.get('/consultarTareas/:idProyecto/:idEmpleado',protegerRuta, controllers.proyectos.getConsultarTareas);
router.post('/eliminarTarea/:idTarea',controllers.proyectos.postEliminarTarea);

//---------------------Aqui van las vistas de Usuarios osea ENCARGADO de Area-------------------------------

//Agenda
router.get('/Usr/consultarAgenda', protegerRuta, controllers.encargadoArea.getConsultarAgenda);
router.get('/Usr/consultarCliente/:idCliente', protegerRuta, controllers.encargadoArea.getConsultarCliente);
router.get('/Usr/consultarProveedores/:idProveedor', protegerRuta, controllers.encargadoArea.getConsultarProveedores);

//Proyectos > Checklist
router.get('/Usr/checklist/:idProyecto', controllers.encargadoArea.getChecklist);
router.get('/Usr/consultarServicio/:idProyecto/:servicio', controllers.encargadoArea.getConsultarServicio);
router.get('/Usr/consultarSubservicios/:idSubServicio', controllers.encargadoArea.getConsultarSubservicios);
router.get('/UsrTerminarServicio/:idProyecto/:servicio', controllers.encargadoArea.getTerminarServicio);


//Proyectos > Inicio
router.get('/Usr/consultarProyectos', controllers.encargadoArea.getConsultarProyectos);
router.get('/Usr/menuOpciones/:idProyecto', controllers.encargadoArea.getMenuOpciones);

//Proyectos > Tareas
router.get('/Usr/tareas/:idProyecto', controllers.encargadoArea.getTareas);
router.get('/Usr/tareasUsuarios', controllers.encargadoArea.getTareasUsuarios);
router.get('/Usr/consultarTareas/:idProyecto',controllers.encargadoArea.getConsultarTareasUsuarios)
router.post('/Usr/eliminarTarea/:idTarea',controllers.encargadoArea.postEliminarTarea);

module.exports = router;
