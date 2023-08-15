//Selecciono el header
const header = document.querySelector("header")

//Creo la section titulo
const titulo = document.createElement("section")
titulo.classList = "titulo"
header.appendChild(titulo)

//Agrego el h1 a la section titulo
const h1 = document.createElement("h1")
h1.innerText = "Lista de Compras"
titulo.appendChild(h1)

//Selecciono el main
const main = document.querySelector("main")

//Agrego la section para agregar items a la lista
const seccionLista = document.createElement("section")
seccionLista.classList = "agregarItem"
main.appendChild(seccionLista)

//Agrego un label, un input y un button a la section para agregar items
const label1 = document.createElement("label")
label1.innerText = "Agregar item: "
seccionLista.appendChild(label1)

const input1 = document.createElement("input")
input1.type = "text"
seccionLista.appendChild(input1)

const button1 = document.createElement("button")
button1.innerText = "Agregar"
seccionLista.appendChild(button1)

//Agrego la section items al main, donde aparecen todos los items de la lista
const seccionItems = document.createElement("section")
seccionItems.classList = "items"
main.appendChild(seccionItems)

//Agrego la section para eliminar todo
const seccionEliminar = document.createElement("section")
seccionEliminar.classList = "eliminar"
main.appendChild(seccionEliminar)

//Agrego un label y un button
const label2 = document.createElement("label")
label2.innerText = "Eliminar todos los items: "
seccionEliminar.appendChild(label2)

const button2 = document.createElement("button")
button2.innerText = "Eliminar todo"
seccionEliminar.appendChild(button2)

// Selecciono el botón "Agregar"
const presionarAgregar = document.querySelector(".agregarItem button")

// Selecciono el botón "Eliminar"
const presionarEliminar = document.querySelector(".eliminar button")

//=============================Funcion para agregar elementos al Storage y al DOM===========================

// Función para agregar un nuevo elemento al almacenamiento local
function agregarElementoAlLocalStorage(texto, completado = false) {
    const newItem = {
        texto: texto,
        completado: completado
    }

    let listaItems = JSON.parse(localStorage.getItem("listaItems")) || []

    let valor = listaItems.some(obj => obj.texto.toLowerCase() == newItem.texto.toLowerCase())

    if (!valor) {
        listaItems.push(newItem)
        listaItems.sort((a, b) => (a.texto.toLowerCase() > b.texto.toLowerCase()) ? 1 : (a.texto.toLowerCase() < b.texto.toLowerCase()) ? -1 : 0)
        localStorage.setItem("listaItems", JSON.stringify(listaItems))
    }
}

// Función para cargar la lista de elementos desde el almacenamiento local
function cargarListaDesdeLocalStorage() {
    const listaItems = JSON.parse(localStorage.getItem("listaItems")) || []

    listaItems.forEach(function (item, index) {
        // Crear el contenedor para el tick y el item
        const itemContainer = document.createElement("div")
        itemContainer.classList.add("item-container")

        //Primero creo el tick a la izquierda del item
        const tick = document.createElement("input")
        tick.type = "checkbox"
        tick.checked = item.completado

        // Guardo el estado del tick en el almacenamiento local
        tick.addEventListener("change", function () {
            item.completado = tick.checked
            localStorage.setItem("listaItems", JSON.stringify(listaItems))
        })

        // Actualizo el estado del tick según el almacenamiento local
        tick.checked = item.completado

        //Luego creo el item a la derecha del tick
        const listItem = document.createElement("p")
        listItem.innerText = item.texto

        // Creo el botón de eliminar
        const botonEliminarItem = document.createElement("button")
        botonEliminarItem.innerText = "Eliminar"
        botonEliminarItem.classList.add("eliminar-item")
        botonEliminarItem.setAttribute("data-index", index)

        // Agrego el tick, el item y el boton eliminar de cada item a un contenedor
        itemContainer.appendChild(tick)
        itemContainer.appendChild(listItem)
        itemContainer.appendChild(botonEliminarItem)

        // Agrego el contenedor a la sección de items
        seccionItems.appendChild(itemContainer)
    })
}

// Evento de click para eliminar un elemento individual
seccionItems.addEventListener("click", function (event) {
    if (event.target.classList.contains("eliminar-item")) {
        const index = parseInt(event.target.getAttribute("data-index"))
        eliminarElemento(index)
    }
})

// Evento de click para agregar elementos
presionarAgregar.addEventListener("click", function () {
    //capturo el texto ingresado en el input
    const textoItem = input1.value

    //Verificación del input con algún texto
    if (textoItem !== "") {
        agregarElementoAlLocalStorage(textoItem)

        // Limpio el input y enfoco nuevamente en el input para seguir escribiendo
        input1.value = ""
        input1.focus()

        // Recargo la lista desde el almacenamiento local
        seccionItems.innerHTML = ""
        cargarListaDesdeLocalStorage()
    }
})

//Función eliminar un solo item
function eliminarElemento(index) {
    let listaItems = JSON.parse(localStorage.getItem("listaItems")) || []
    // Elimino el elemento del arreglo, según su índice
    listaItems.splice(index, 1)
    localStorage.setItem("listaItems", JSON.stringify(listaItems))

    // Limpio y recargo la lista desde el almacenamiento local
    seccionItems.innerHTML = ""
    cargarListaDesdeLocalStorage()
}

//Evento click para eliminar todos los elementos
presionarEliminar.addEventListener("click", function () {
    localStorage.clear()
    seccionItems.innerHTML = ""
})

// Cargo la lista al cargar la página
window.addEventListener("load", cargarListaDesdeLocalStorage)