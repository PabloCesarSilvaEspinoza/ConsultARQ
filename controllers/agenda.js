const pool = require('../database');
const bcrypt = require('bcrypt');
const helpers = require('../lib/helpers');

module.exports={
    //----------EDITAR-PROMESAS--------------
    getEditarClientes : function (req,res,next){ 

        const {idCliente} = req.params;
        const usuario = pool.query('SELECT * FROM cliente WHERE idCliente = ?', idCliente );

        usuario.then(function(result) { 
            res.render('agenda/editarClientes', {link: result[0]} );
         
        })
    },
    postEditarClientes : async function (req,res,next){ 
        const { idCliente } = req.params;
        const { nombres, primerApelllido, segundoApellido, RFC, telefono, correo, estatus } = req.body;
        const newUser = { 
            nombres,
            primerApelllido,
            segundoApellido,
            RFC,
            telefono,
            correo,
            estatus
        };
       
        await pool.query('UPDATE cliente set ? WHERE idCliente = ?', [newUser, idCliente]);
        
        res.redirect('/consultarClientes/'+idCliente);
    },

    //--------------------------- Empleado--------------------------------------------------
    getAgregarUsuarios : async function(req,res,next){
        const area = await pool.query('SELECT * FROM area' );
        const rol = await pool.query('SELECT * FROM rol' );
        res.render('agenda/agregarUsuarios', {area,rol});
    },

    getconsultarEmpleado : function(req,res,next){
        const {idEmpleado} = req.params;
        const empleado = pool.query('SELECT * FROM empleado WHERE idEmpleado = ?', [idEmpleado] );
        const proyecto = pool.query('SELECT * FROM proyectoempleado WHERE idEmpleado = ?',[idEmpleado]);
        proyecto.then(function(proyecto){
            if (proyecto[0]) {
                const proyectoEmpleado = pool.query('SELECT * FROM proyecto WHERE idProyecto = ?',[proyecto[0].idProyecto]);
                empleado.then(function(result) {
                    proyectoEmpleado.then(function(result2){
                        res.render('agenda/consultarEmpleado', {link: result[0], proyecto: result2[0]} );
                        console.log(result[0]);
                    })
                })   
            }else{
                empleado.then(function(result){
                    const cargo = pool.query('SELECT * FROM rol WHERE idRol = ?', [result[0].idRol]);
                    cargo.then(function(cargo){
                        res.render('agenda/consultarEmpleado', {link: result[0], cargo: cargo[0]} ); 
                        console.log(cargo[0]);
                    })
                })
            }
        })
    },

    postAgregarUsuarios : async(req,res,next)=>{ 
        const  { nombres,primerApellido,segundoApellido,telefono,correo,estatus,idRol,idArea} = req.body;      
        const newEmpleado = {
            nombres,primerApellido,segundoApellido,telefono,correo,estatus,idRol };
        await pool.query('INSERT INTO empleado set ?',[newEmpleado]);
        const idEmplea=await pool.query('select max(idEmpleado) idEmplea from empleado');
        const idEmpleado=idEmplea[0].idEmplea;
        const newEmpArea={idEmpleado,idArea};
        await pool.query('INSERT INTO empleadoarea set ?',[newEmpArea]);
        res.redirect('/consultarAll');
    }, 
     
    getEditarEmpleado : function(req,res,next){

        const {idEmpleado} = req.params;

            const usuario1 = pool.query('SELECT * FROM empleado WHERE idEmpleado = ?', [idEmpleado]);
            usuario1.then(function(result1){    
                console.log(result1[0]);
                const rol = pool.query('SELECT * FROM rol');
                rol.then(function(result2){
                    const roluser = pool.query('SELECT * FROM rol WHERE idRol = ?', [result1[0].idRol]);
                    roluser.then(function(result3){
                        const area = pool.query('SELECT * FROM area');
                        area.then(function(area){
                            res.render('agenda/editarEmpleado', { info2: result1[0], result2, rol: result3[0], area: area} );
                        })
                    })
                    
                })
                
            })

    },
    postEditarEmpleado : function(req,res,next){  
        const { idEmpleado } = req.params;
        const { nombres, primerApellido, segundoApellido, correo, telefono, idRol, estatus, idArea } = req.body;
        const newUser = { 
            nombres, primerApellido, segundoApellido, correo, telefono, idRol, estatus
        };
        const areaepleado = {idArea};
        console.log(areaepleado);
        pool.query('UPDATE empleado set ? WHERE idEmpleado = ?', [newUser, idEmpleado]);
        pool.query('UPDATE empleadoarea set ? WHERE idEmpleado = ?', [areaepleado, idEmpleado]);
        
        res.redirect('/consultarEmpleado/'+idEmpleado);
        
    },

    //------------------------------Agregar Usr -> Login-------------------------
    getconsultarUsuario : function(req,res,next){
        const {idUsuario} = req.params;
        const usuario = pool.query('select idUsuario, username, nombres, primerApellido, segundoApellido from usuario inner join empleado on usuario.idEmpleado=empleado.idEmpleado WHERE  idUsuario = ?', [idUsuario] );
        usuario.then(function(result) {
            res.render('agenda/consultarUsuario', {link: result[0]} );
            console.log(result[0]);
           
        })
    },

    getAgregarUsr: async function(req,res,next){
        const empleado = await pool.query('SELECT * FROM empleado' );
        res.render('agenda/agregarUsr', {empleado});
    },  

    postIngUsr:  async(req,res,next)=>{ 
        const { username, password,empleado } = req.body;
        const newUser = {
            username,
            password,
            empleado
        };
        const salt = 10;
        idEmpleado=newUser.empleado
        const newUser1 = {
            username,
            password,
            idEmpleado
        };
        newUser1.password =  await bcrypt.hash(password, salt); //encriptacion de la contraseña 
        pool.query('INSERT INTO usuario SET ?', [newUser1]);
        res.redirect('/consultarAll');
    },
    
    getEditarUsuario : async function(req,res,next){
        const {idUsuario} = req.params;
        const usuario = pool.query('SELECT * FROM usuario WHERE idUsuario = ?', idUsuario);
        //const contraseña = await helpers.encryptPassword('pass');
        //console.log(contraseña);

        usuario.then(function(result) {
            console.log(req.app.locals.error);
            res.render('agenda/editarUsr', {link: result[0]} );
            //console.log(result[0]);
        })
    },
    postEditarUsuario : function(req,res,next){
        const {idUsuario} = req.params;
        const { username, password1, password2, password } = req.body;  //
        const contraseña = pool.query('SELECT * FROM usuario WHERE idUsuario = ?', idUsuario);
        contraseña.then(async function(usuario){
            res.app.locals.error = null;
            res.app.locals.correcto = null;
            global.correcto = 0;
            if(password1 === password2){
                    var validPassword = helpers.matchPassword(password, usuario[0].password);
                    if (validPassword) {
                        const password = await helpers.encryptPassword(password1);
                        const newUser = { 
                            username, password 
                        };
                        console.log(newUser);
                        pool.query('UPDATE usuario set ? WHERE idUsuario = ?', [newUser, idUsuario]);
                        res.app.locals.correcto = 1;
                        res.redirect('/editarUsuario/'+idUsuario); //enviar la ruta
                    }else{
                        res.app.locals.error == 1;
                        res.redirect('/editarUsuario/'+idUsuario); //enviar la ruta
                    }
                }else{
                    res.app.locals.error = 1;
                    console.log(req.app.locals.error);
                        res.redirect('/editarUsuario/'+idUsuario); //enviar la ruta
                }
        })
    },
    getEliminarUsuario : async function(req, res, next){
        const {idUsuario} = req.params;
        await pool.query('DELETE FROM usuario WHERE idUsuario = ?',[idUsuario]);
        res.redirect('/consultarAll');
    },
    //--------------------------------Cliente---------------------------------------    
    getConsultarClientes : function(req,res,next){ 
        const {idCliente} = req.params;
        
        const usuario = pool.query('SELECT * FROM cliente WHERE idCliente = ?',idCliente );
        const proyecto = pool.query('SELECT * FROM proyecto WHERE idCliente = ?',idCliente);

        usuario.then(function(result) {
            proyecto.then(function(result2){
                res.render('agenda/consultarClientes', {link: result[0], proyecto: result2[0]} );
                console.log(result2[0]);
            })
        })

        //res.render('agenda/consultarClientes);
    },
    getAgregarClientes : function(req,res,next){ 
        res.render('agenda/agregarClientes');
    },
    postAgregarClientes : async function (req,res,next){ 
        const { nombres,primerApelllido,segundoApellido,RFC,correo,telefono,estatus} = req.body;
        const newCliente = {
            nombres,primerApelllido,segundoApellido,RFC,correo,telefono,estatus
        };
        await pool.query('INSERT INTO Cliente set ?',[newCliente]);
        res.redirect('/consultarAll');        
    },
    //---------------------------------------Proveedor--------------------------------------------
    getAgregarProveedor : async function(req,res,next){ 
        const area = await pool.query('SELECT * FROM area' );
        res.render('agenda/agregarProveedor',{area});
    },
    
    getConsultarProveedor : function(req,res,next){ 
        const {idProveedor} = req.params;
        const proveedor = pool.query('SELECT * FROM proveedor WHERE idProveedor = ?', idProveedor );
        proveedor.then(function(result) {
            res.render('agenda/consultarProveedor', {link: result[0]} );
           
        })
    },

    postAgregarProveedor : async function (req,res,next){ 
        const { nombre,dro,cedula,telefono,correo,numeroCuenta,estatus,idArea} = req.body;
        const newProveedor = {
            nombre,dro,cedula,telefono,correo,numeroCuenta,estatus
        };
        await pool.query('INSERT INTO proveedor set ?',[newProveedor]);
        const idProvee=await pool.query('select max(idProveedor) idProvee from proveedor');
        const idProveedor=idProvee[0].idProvee;
        const newProArea={idProveedor,idArea};
        await pool.query('INSERT INTO proveedorarea set ?',[newProArea]);
        res.redirect('/consultarAll');    
    },
    getEditarProveedor : function(req,res,next){ 
         
        const {idProveedor} = req.params;
        const proveedor = pool.query('SELECT * FROM proveedor WHERE idProveedor = ?', idProveedor );

        proveedor.then(function(result) {
            res.render('agenda/editarProveedor', {info: result[0]} );
           
        })
    },
    getEliminarProveedor : async function (req,res,next){
        const{idProveedor} = req.params;
        await pool.query('DELETE FROM proveedor WHERE idProveedor = ?', [idProveedor]);
        res.redirect('/consultarAll');
    },
    postEditarProveedor : function(req,res,next){ 
        const { idProveedor } = req.params;
        const { nombre, dro, cedula, telefono, correo, numeroCuenta, estatus } = req.body;
        const newUser = { 
            nombre, dro, cedula, telefono, correo, numeroCuenta, estatus
        };
        console.log(newUser);
        pool.query('UPDATE proveedor set ? WHERE idProveedor = ?', [newUser, idProveedor]);
        
        res.redirect('/consultarProveedor/'+idProveedor);
        
    },
    getConsultarAll : async function(req,res,next){ 
        const clientes = await pool.query('SELECT * FROM cliente order by nombres asc' );
        const proveedores = await pool.query('SELECT * FROM proveedor order by nombre asc');
        const emplead = await pool.query('SELECT * FROM empleado order by nombres asc' );
        const usuario = await pool.query('select idUsuario, username, nombres, primerApellido from usuario inner join empleado on usuario.idEmpleado=empleado.idEmpleado order by username asc');
        res.render('agenda/consultarAll',{clientes,proveedores,emplead,usuario});
    },
};
//res enviar mensaj rend renderizar vista