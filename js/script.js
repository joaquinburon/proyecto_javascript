const header = document.querySelector("header")

const titulo = document.createElement("section")
titulo.classList = "titulo"
header.appendChild(titulo)

const h1 = document.createElement("h1")
h1.innerText = "Lista de Compras"
titulo.appendChild(h1)

const main = document.querySelector("main")

const seccionLista = document.createElement("section")
seccionLista.classList = "agregarItem"
main.appendChild(seccionLista)

const label1 = document.createElement("label")
label1.innerText = "Agregar item: "
seccionLista.appendChild(label1)

const input1 = document.createElement("input")
input1.type = "text"
seccionLista.appendChild(input1)

const button1 = document.createElement("button")
button1.innerText = "Agregar"
seccionLista.appendChild(button1)

const seccionItems = document.createElement("section")
seccionItems.classList = "items"
main.appendChild(seccionItems)

const seccionEliminar = document.createElement("section")
seccionEliminar.classList = "eliminar"
main.appendChild(seccionEliminar)

const label2 = document.createElement("label")
label2.innerText = "Eliminar todos los items: "
seccionEliminar.appendChild(label2)

const button2 = document.createElement("button")
button2.innerText = "Eliminar todo"
seccionEliminar.appendChild(button2)

const presionarAgregar = document.querySelector(".agregarItem button")

const presionarEliminar = document.querySelector(".eliminar button")

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

seccionItems.addEventListener("click", function (event) {
    if (event.target.classList.contains("eliminar-item")) {
        const index = parseInt(event.target.getAttribute("data-index"))
        eliminarElemento(index)
    }
})

presionarAgregar.addEventListener("click", function () {
    const textoItem = input1.value

    if (textoItem !== "") {
        agregarElementoAlLocalStorage(textoItem)

        input1.value = ""
        input1.focus()

        seccionItems.innerHTML = ""
        cargarListaDesdeLocalStorage()
    }
})

function eliminarElemento(index) {
    let listaItems = JSON.parse(localStorage.getItem("listaItems")) || []
    listaItems.splice(index, 1)
    localStorage.setItem("listaItems", JSON.stringify(listaItems))

    seccionItems.innerHTML = ""
    cargarListaDesdeLocalStorage()
}

presionarEliminar.addEventListener("click", function () {
    localStorage.clear()
    seccionItems.innerHTML = ""
})

window.addEventListener("load", cargarListaDesdeLocalStorage)