// leandro rapan
//Array con supuestos datos previos, en este caso el unicornio
let arrListado=[{img: `imagenes\\MacetaProducto1.jpeg`, nombre: "unicornio", precio:"200"}];
//funciones para crear objetos, hice dos creadorObjetos y creadorProductos, el cual refiere al primero; quizas sea redundante y con uno era suficiente
function creadorObjetos (img, nombre, precio,  stock){
    this.img = img;
    this.nombre = nombre;
    this.precio = precio;
    
    this.stock = stock;
}
function creadorProductos () {
    let img = prompt("ingrese link de la imagen");
    let nombre = prompt("ingrese nombre");
    let precio = prompt("ingrese precio");
    let stock = prompt("ingrese stock");
    let producto = new creadorObjetos (img, nombre, precio, stock);
    arrListado.push(producto);
};

// la funcion borradora de objetos, para eliminar productos que ya no estan en venta, para esto uso un filter

function destructorObjetos (){
    //    let productoPorDestruir= 
     let productoPordestruir =   prompt("ingrese el nombre del producto a borrar");  
     const nuevaArr = arrListado.filter((obj) => obj.nombre !== productoPordestruir);
   
       console.log(nuevaArr)
       return nuevaArr
       
    }
creadorProductos();
// por ultimo la funcion que lleva esto al html con un for of para recorrer el array y las funciones createElement, innerHtml y append para transcribir
function escritorHtml(){
for (const obj of destructorObjetos()){
    let contenedor = document.createElement("div");
    contenedor.innerHTML= `<img src="${obj.img}">
    <h2> ${obj.nombre}</h2>
    <h2> $${obj.precio}      
    `
    contenedor.className="contenedor"
    console.log(obj.img)
    document.body.appendChild(contenedor);
}
}
escritorHtml()
console.log(arrListado)
