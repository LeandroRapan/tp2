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

function creadorProductos (){
   let formulario = document.getElementById("formulario");
   
    
  formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    
    let inputs = e.target.children;
     let img = document.getElementById("imgSrc").value;
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let stock = document.getElementById("stock").value;

    let producto = new creadorObjetos (img, nombre, precio, stock);
      arrListado.push(producto);
      localStorage.clear();
       localStorage.setItem("productoStorange", JSON.stringify(arrListado));
       escritorHtml(JSON.parse(localStorage.getItem("productoStorage")));
  })}  
  
  
   creadorProductos()


  function escritorHtml(producto){
    
    // let productosStorange2 = JSON.parse(localStorage.getItem("productoStorange"));
    //   if (productosStorange2){arrListado = productosStorange2 } else {productosStorange2 = []}
      producto.forEach( (producto)=> {
        let contenedor = document.createElement("div");
        contenedor.innerHTML= `<img src="${producto.img}">
        <h2> ${producto.nombre}</h2>
        <h2> $${producto.precio}      
        `
        contenedor.className="contenedor"
     
        document.body.appendChild(contenedor)
    return arrListado
    }     
        )
        
    };
escritorHtml(arrListado)