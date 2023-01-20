// leandro rapan
//PARTE 1
let baseDatosPass="lala";
// // Login usando sweet alert
// async function menuLogin() {

//     const { value: password } = await Swal.fire({
//       title: 'Hola Lala, ingresá tu contraseña',
//       input: 'password',
//       inputLabel: 'Password',
//       inputPlaceholder: 'Enter your password',
//       inputAttributes: {
//         maxlength: 10,
//         autocapitalize: 'off',
//         autocorrect: 'off'
//       }
//     })
    
//     // if (password) {
//     //   Swal.fire(`Entered password: ${password}`)
//     // }else{Menu()}
    
//     if ( password !=="Lala") {
//         Swal.fire("Contraseña incorrecta");
//         menuLogin();
//       }
//     };
// menuLogin()
//Array con supuestos datos previos, en este caso el unicornio

//PARTE 2
let arrListado=[{img: `imagenes\\MacetaProducto1.jpeg`, nombre: "unicornio", precio:"200"}];
//funciones para crear objetos de los productos, hice dos creadorObjetos y creadorProductos, el cual refiere al primero; quizas sea redundante y con uno era suficiente

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

//funcion escritora de productos sobre el html
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
          
    productosStorage2.splice(detector, 1);
       
    localStorage.setItem("productoStorage", JSON.stringify(productosStorage2));
          
    arrListado = productosStorage2;

          
    escritorHtml();
    })
        

    return arrListado
  }     
 )
        
};


escritorHtml(arrListado);


//PARTE 3
//Ofertas listado de ofertas utilizando fetch
let arrayOfertas =[];
let contenedorOfertas = document.getElementById("ofertas");
fetch("Js/data.json")
	.then((response) => response.json())
	.then((data) => {
  arrayOfertas = data;
    
		
	})
.catch((error) => console.log(error));
 
const crearId = () => Math.ceil(Math.random() * 100000);
//funcion creadora de objetos
function objetoOferta (imgO, fechaLimite) { 
  this.id = crearId();
     
  this.img = imgO;
  this.fechaLimite = fechaLimite;
  
}
let formOfertas = document.getElementById("formOfertas")
//formulario para crear ofertas
function nuevasOfertas(){
  
 formOfertas.addEventListener("submit", (e)=>{
   e.preventDefault();
  let imgO = document.getElementById("imgOferta").value;
  let fechaLimite= document.getElementById("fechaLimite").value;
    
  // nuevo objeto ofertas llamando a la funcion creadora de objetos
 let prod = new objetoOferta (imgO, fechaLimite);

 arrayOfertas.push(prod);
 localStorage.setItem("ofertasEstorage", JSON.stringify(arrayOfertas))

 escritorOfertas()
  }
  )

}
nuevasOfertas();
let ofertasAEscribir = JSON.parse(localStorage.getItem("ofertasEstorage"));
let cajaOfertas = document.getElementById("cajaOfertas");

//funcion escritora de ofertas al html
function escritorOfertas() {
  cajaOfertas.innerHTML="";
  ofertasAEscribir.forEach(obj =>{
    let contenedorOfertas = document.createElement("div")
    contenedorOfertas.innerHTML =`
    <img src="${obj.img}">
    <button id="boton${obj.id}">Eliminar</button>
    `
   contenedorOfertas.className="contenedor";
   cajaOfertas.appendChild(contenedorOfertas);
   let botonOfertas = document.getElementById(`boton${obj.id}`);
    botonOfertas.addEventListener("click" , ()=> {
      let detectorOfertas = ofertasAEscribir.findIndex(obj => obj.id);

      ofertasAEscribir.splice(detectorOfertas, 1);
       
      localStorage.setItem("ofertasEstorage", JSON.stringify(ofertasAEscribir));
                 
     escritorOfertas();
    })
})
}
escritorOfertas();
  
let botonCarrucel = document.getElementById("vistaPrevia")

//boton que habilita la vista previa de las ofertas en un carrucel homologo al del shop.
botonCarrucel.addEventListener("click", ()=>{
 contenedorOfertas.innerHTML="";
 ofertasAEscribir.forEach((oferta, index) => {
		contenedorOfertas.innerHTML += `
		<div class="carousel-item ${index === 0 ? "active" : ""}">
		<img src="${oferta.img}" class="d-block w-100" alt="imagen de la oferta">
		</div>
		`;
})})

  

//ideas ideas. del fetch puede armarse un array que se guarde en local storage, ese mismo array puede ser alimentado con
//el form, de ahi se transforma en un local storage y de ahi, se pasa al caraoucel
// la otra seria que el foreach dentro del fetch agrege los elementos del local storage y arme el carrucel.
//luego con el form agregar elementos nuevos y poner un boton que borre el primero y deje el segundo
//en este caso si quiero eliminar elementos tengo que hacer un boton de eliminacion en el botstrap,porv lo tanto
//tengo que leer como se agregan botones al botstrap y como se vinculan y se les da un sentido.
//osea, primero voy a corroborar eso, si se puede hacer lo intento, sino voy a la primera opcion mentada.

//la idea de usar un temporizador para las ofertas todavia no es posible. cuanto mucho podria agregarles una fecha limite que sea visible para nosotros

//por ultimo habria que recoger los arrays de productos y ofertas y mandarlos en un localstorega a travez de un
//boton que diga "enviar cambios" o "subir cambios a la pagina"