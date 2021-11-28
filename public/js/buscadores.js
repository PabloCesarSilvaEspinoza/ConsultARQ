var clientes = [], proveedores = [], usuarios = [], usrs = [];
const elemeto = document.querySelectorAll('h5');
console.log(elemeto);
for (let index = 0; index < elemeto.length; index++) {
    if (elemeto[index].id === 'nombreCliente') {                             //---VALIDANDO SI ES CLIENTE
        clientes.push({nombre: elemeto[index].innerText, id: elemeto[index].title, num: elemeto[index].nextElementSibling.firstChild.innerText});
    }
    if (elemeto[index].id === 'nombreProveedor') {                          //---VALIDANDO SI ES PROVEEDOR
        proveedores.push({nombre: elemeto[index].innerText, id: elemeto[index].title, num: elemeto[index].nextElementSibling.firstChild.innerText});
    }
    if (elemeto[index].id === 'nombreUsuario') {                            //---VALIDANDO SI ES USUARIO
        usuarios.push({nombre: elemeto[index].innerText, id: elemeto[index].title, num: elemeto[index].nextElementSibling.firstChild.innerText});
    }
    if (elemeto[index].id === 'nombreUsr') {                                  //---VALIDANDO SI ES USR
        usrs.push({nombre: elemeto[index].firstChild.data, completo: elemeto[index].lastElementChild.firstChild.textContent, id: elemeto[index].title});
    }
}

console.log(clientes);
console.log(proveedores);
console.log(usuarios);
console.log(usrs);
//------------------------------------- BUSCADOR DE CLIENTE ----------------
const formulario_cliente = document.querySelector('#formulario_cliente');
const resultado_cliente = document.querySelector('#resultado_cliente');

const buscar_cliente = () => {
    resultado_cliente.innerHTML = '';
    const texto = formulario_cliente.value.toLowerCase();
    console.log(texto);

    for(let cliente of clientes){
        let nombre = cliente.nombre.toLowerCase();
        if(nombre.indexOf(texto) !== -1){
            resultado_cliente.innerHTML += `
            <div class="card">
                <div align="center"><img class="mt-3" src="/images/avatar/avatar.png" width="80" height="80" alt=""></div>
                <h5 class="card-title text-center mt-3" id="nombreCliente" name="nombreCliente">${cliente.nombre}</h5>
                <h5 class="text-center md-5"><small >${cliente.num}</small></h5>
                <p></p>
                <a href="consultarClientes/${cliente.id}" class="stretched-link"></a>
            </div>
            `
        }
    }
    if(resultado_cliente.innerHTML === ''){
        resultado_cliente.innerHTML += `
            <li>Cliente no encontrado</li>
        `
    }
    if (texto.length === 0) {
        resultado_cliente.innerHTML = '';
    }
}

formulario_cliente.addEventListener('keyup', buscar_cliente);

//--------------------------------FIN DE BUSCADOR DE CLIENTE----------------
//------------------------------------- BUSCADOR DE PROVEEDOR---------------

const formulario_proveedor = document.querySelector('#formulario_proveedor');
const resultado_proveedor = document.querySelector('#resultado_proveedor');

const buscar_proveedor = () => {
    resultado_proveedor.innerHTML = '';
    const texto = formulario_proveedor.value.toLowerCase();
    console.log(texto);

    for(let proveedor of proveedores){
        let nombre = proveedor.nombre.toLowerCase();
        if(nombre.indexOf(texto) !== -1){
            resultado_proveedor.innerHTML += `
            <div class="card">
                <div align="center"><img class="mt-3" src="/images/avatar/avatar.png" width="80" height="80" alt=""></div>
                <h5 class="card-title text-center mt-3" id="nombreProveedor" name="nombreProveedor">${proveedor.nombre}</h5>
                <h5 class="text-center md-5"><small>${proveedor.num}</small></h5>
                <p></p>
                <a href="/consultarProveedor/${proveedor.id}" class="stretched-link"></a>
            </div>
            `
        }
    }
    if(resultado_proveedor.innerHTML === ''){
        resultado_proveedor.innerHTML += `
            <li>Proveedor no encontrado</li>
        `
    }
    if (texto.length === 0) {
        resultado_proveedor.innerHTML = '';
    }
}

formulario_proveedor.addEventListener('keyup', buscar_proveedor);

//------------------------------------- FIN DE BUSCADOR DE PROVEEDOR--------

//------------------------------------- BUSCADOR DE EMPLEADO---------------
const formulario_empleado = document.querySelector('#formulario_empleado');
const resultado_empleado = document.querySelector('#resultado_empleado');

const buscar_empleado = () => {
    resultado_empleado.innerHTML = '';
    const texto = formulario_empleado.value.toLowerCase();
    console.log(texto);

    for(let empleado of usuarios){
        let nombre = empleado.nombre.toLowerCase();
        if(nombre.indexOf(texto) !== -1){
            resultado_empleado.innerHTML += `
            <div class="card">
                <div align="center"><img class="mt-3" src="/images/avatar/avatar.png" width="80" height="80" alt=""></div>
                <h5 class="card-title text-center mt-3" id="nombreUsuario" name="nombreUsuario">${empleado.nombre}</h5>
                <h5 class="text-center md-5"><small>${empleado.num}</small></h5>
                <p></p>
                <a href="/consultarEmpleado/${empleado.id}" class="stretched-link"></a> 
            </div>
            `
        }
    }
    if(resultado_empleado.innerHTML === ''){
        resultado_empleado.innerHTML += `
            <li>Empleado no encontrado</li>
        `
    }
    if (texto.length === 0) {
        resultado_empleado.innerHTML = '';
    }
}

formulario_empleado.addEventListener('keyup', buscar_empleado);

//------------------------------------- FIN DE BUSCADOR DE EMPLEADO--------
//----------------------------------- BUSCAR USUARIO ------------------------

const formulario_usuario = document.querySelector('#formulario_usuario');
const resultado_usuario = document.querySelector('#resultado_usuario');

const buscar_usuario = () => {
    resultado_usuario.innerHTML = '';
    const texto = formulario_usuario.value.toLowerCase();
    console.log(texto);

    for(let usuario of usrs){
        let nombre = usuario.nombre.toLowerCase();
        if(nombre.indexOf(texto) !== -1){
            resultado_usuario.innerHTML += `
            <div class="card">
                <div align="center"><img class="mt-3" src="/images/avatar/avatar.png" width="80" height="80" alt=""></div>
                <h5 class="card-title text-center mt-3" id="nombreUsr" name="nombreUsr">${usuario.nombre} </br> <small>${usuario.completo}</small> </h5>
                <a href="/consultarUsuario/${usuario.id}" class="stretched-link"></a>
            </div> 
            `
        }
    }
    if(resultado_usuario.innerHTML === ''){
        resultado_usuario.innerHTML += `
            <li>Usuario no encontrado</li>
        `
    }
    if (texto.length === 0) {
        resultado_usuario.innerHTML = '';
    }
}

formulario_usuario.addEventListener('keyup', buscar_usuario);
//--------------------FIN DE BUSCAR USUARIO-----------------------------------