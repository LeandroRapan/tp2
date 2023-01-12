// leandro rapan
//Array con supuestos datos previos, en este caso el unicornio
let baseDatosPass="lala";

async function menuLogin() {

    const { value: password } = await Swal.fire({
      title: 'Hola Lala, ingresá tu contraseña',
      input: 'password',
      inputLabel: 'Password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        maxlength: 10,
        autocapitalize: 'off',
        autocorrect: 'off'
      }
    })
    
    // if (password) {
    //   Swal.fire(`Entered password: ${password}`)
    // }else{Menu()}
    
    if ( password !=="Lala") {
        Swal.fire("Contraseña incorrecta");
        menuLogin();
      }
    };
menuLogin()
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

   let caja = document.getElementById("caja");
  function escritorHtml(producto){
    
    let productosStorange2 = JSON.parse(localStorage.getItem("productoStorange"));
      if (productosStorange2){arrListado = productosStorange2 } else {productosStorange2 = []}
      caja.innerHTML="";
      productosStorange2.forEach( (producto)=> {
        let contenedor = document.createElement("div");
        contenedor.innerHTML= `<img src="${producto.img}">
        <h2> ${producto.nombre}</h2>
        <h2> $${producto.precio}  
        <button id="boton${producto.nombre}">Eliminar</button>   
        `
        contenedor.className="contenedor";
        let boton = document.getElementById(`boton${producto.nombre}`);
         boton.addEventListener("click" , ()=> {console.log("click")})

        caja.appendChild(contenedor);
    return arrListado
    }     
        )
        
    };
escritorHtml(arrListado)
