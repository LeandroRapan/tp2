// leandro rapan
//PARTE 1
let baseDatosPass="lala";
// Login usando sweet alert
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
    
  
    
    if ( password !=="Lala") {
        Swal.fire({
          title: "Contraseña incorrecta",
        timer:1500,
        showConfirmButton: false,
      })
      setTimeout(menuLogin,2000)
      
    }};
menuLogin()
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
        <button id="${producto.nombre}">Eliminar</button>   
        `
  contenedor.className="contenedor";
    
    caja.appendChild(contenedor);
    let boton = document.getElementById(`${producto.nombre}`);
    boton.addEventListener("click" , (e)=> {
    let detector = productosStorage2.findIndex(obj => obj.nombre=== e.target.id);
          console.log(arrListado)
    console.log(detector)
    console.log(productosStorage2.findIndex(obj => obj.nombre ))
    productosStorage2.splice(detector, 1);
       
    localStorage.setItem("productoStorage", JSON.stringify(productosStorage2));
          
    arrListado = productosStorage2;

          
    escritorHtml();
    })
        

    return arrListado
  }     
 )
        
};

localStorage.clear()
escritorHtml(arrListado);


//PARTE 3
//Ofertas listado de ofertas utilizando fetch
let arrayOfertas =[];
let contenedorOfertas = document.getElementById("ofertas");
fetch("Js/data.json")
	.then((response) => response.json())
	.then((data) => {
  arrayOfertas = data;
  escritorOfertas()
		
	})
.catch((error) => console.log(error));
 //funcion creadora de id
const crearId = () => Math.ceil(Math.random() * 100000);
//funcion creadora de objetos
function objetoOferta (imgO) { 
  this.id = crearId();
  this.img = imgO;
 
  
} 

let formOfertas = document.getElementById("formOfertas")
//formulario para crear ofertas
function nuevasOfertas(){
  
 formOfertas.addEventListener("submit", (e)=>{
  e.preventDefault();
  let imgO = document.getElementById("imgOferta").value;
  
    
  // nuevo objeto ofertas llamando a la funcion creadora de objetos
 let prod = new objetoOferta (imgO);

 arrayOfertas.push(prod);
 localStorage.setItem("ofertasEstorage", JSON.stringify(arrayOfertas))
 console.log(arrayOfertas);
 escritorOfertas()
  }
  )

}
nuevasOfertas();
 

 let cajaOfertas = document.getElementById("cajaOfertas");

//funcion escritora de ofertas al html
function escritorOfertas() {
  cajaOfertas.innerHTML="";
  // ofertasAEscribir.forEach(obj =>{
    arrayOfertas.forEach(obj =>{
    let contenedorOfertas = document.createElement("div")
    contenedorOfertas.innerHTML =`
    <img src="${obj.img}">
    <button id="${obj.id}">Eliminar</button>
    `
   contenedorOfertas.className="contenedor";
   cajaOfertas.appendChild(contenedorOfertas);
  
  //boton de eliminacion de ofertas
   let botonOfertas = document.getElementById(`${obj.id}`);
   botonOfertas.addEventListener("click" , (e) => {
   
    
    console.log(e.target.id);
    let detectorOfertas = arrayOfertas.findIndex(obj => obj.id === parseInt(e.target.id));
    console.log(detectorOfertas);
    
   
   arrayOfertas.splice(detectorOfertas, 1);
       
   localStorage.setItem("ofertasEstorage", JSON.stringify(arrayOfertas));
                 
    escritorOfertas();
  })
})
}

  escritorOfertas(arrayOfertas);
let botonCarrucel = document.getElementById("vistaPrevia")

//boton que habilita la vista previa de las ofertas en un carrucel homologo al del shop.
function carrucel() {
botonCarrucel.addEventListener("click", ()=>{
 contenedorOfertas.innerHTML="";
 arrayOfertas.forEach((oferta, index) => {
		contenedorOfertas.innerHTML += `
		<div class="carousel-item ${index === 0 ? "active" : ""}">
		<img src="${oferta.img}" class="d-block w-100" alt="imagen de la oferta">
		</div>
		`;
})})
}
carrucel()
let botonSubmit = document.getElementById("submitCambios");
let arraySubmit = [];
botonSubmit.addEventListener("click", ()=> {
arraySubmit = [[JSON.parse(localStorage.getItem("productoStorage"))], [JSON.parse(localStorage.getItem("ofertasEstorage"))]];
Toastify({
  text: "cambios enviados",
  className: "info",
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  }
}).showToast();
console.log(Toastify)
return console.log(JSON.stringify(arraySubmit))

})

  

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