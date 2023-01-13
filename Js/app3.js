// leandro rapan

let baseDatosPass="lala";
//Login usando sweet alert
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
      
       localStorage.setItem("productoStorage", JSON.stringify(arrListado));
       escritorHtml();
  })}  
  
  
   creadorProductos()

   let caja = document.getElementById("caja");

//funcion escritora sobre el html
  function escritorHtml(producto){
    
    let productosStorage2 = JSON.parse(localStorage.getItem("productoStorage"));
      if (productosStorage2){arrListado = productosStorage2 } else {productosStorage2 = []}
      caja.innerHTML="";
      productosStorage2.forEach( (producto)=> {
        let contenedor = document.createElement("div");
        contenedor.innerHTML= `<img src="${producto.img}">
        <h2> ${producto.nombre}</h2>
        <h2> $${producto.precio}  
        <button id="boton${producto.nombre}">Eliminar</button>   
        `
        contenedor.className="contenedor";
    
        caja.appendChild(contenedor);
        let boton = document.getElementById(`boton${producto.nombre}`);
        boton.addEventListener("click" , ()=> {
          let detector = productosStorage2.findIndex(obj => obj.nombre);
          console.log(producto.nombre)
          // console.log(productosStorage2);
          console.log(detector);
          productosStorage2.splice(detector, 1);
          console.log(productosStorage2)
          localStorage.setItem("productoStorage", JSON.stringify(productosStorage2));
          
          arrListado = productosStorage2;

          console.log(arrListado)
          escritorHtml();
        })
        

    return arrListado
    }     
        )
        
    };


escritorHtml(arrListado);


//Ofertas utilizando fetch 
let contenedorOfertas = document.getElementById("ofertas");
fetch("./Js/data.json")
.then(response => response.json())
.then(data=>{
  let contenedorCarrucel = document.createElement("div")
  contenedorCarrucel.classList.add("carousel-item active")
  contenedorCarrucel.addClass
  data.forEach(oferta =>{
    contenedorCarrucel.innerHTML= `
    <div class="carousel-item active">
    <img src="${oferta.img}" class="d-block w-100" alt="imagen de la oferta">
    </div>
    `;
    contenedorOfertas.append(contenedorCarrucel)

  })
})
localStorage.clear();
