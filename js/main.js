// Iniciar la variable libros desde el almacenamiento local o como un arreglo vacío si no hay datos guardados
var libros = JSON.parse(localStorage.getItem('libros')) || [];

// Función para guardar los libros en el almacenamiento local
function guardarLibrosEnLocalStorage() {
    localStorage.setItem('libros', JSON.stringify(libros));
}

// Función para agregar un nuevo libro al catálogo
function agregarLibro(titulo, autor, descripcion, archivoPDF) {
    var nuevoLibro = { 
        titulo: titulo, 
        autor: autor, 
        descripcion: descripcion, 
        archivo_pdf: archivoPDF ? archivoPDF.name : "" 
    };
    libros.push(nuevoLibro);

    // Guardar los libros en el almacenamiento local
    guardarLibrosEnLocalStorage();
}


// Función para cargar los libros desde el almacenamiento local al iniciar la aplicación
function cargarLibrosDesdeLocalStorage() {
    var librosGuardados = localStorage.getItem('libros');
    if (librosGuardados) {
        libros = JSON.parse(librosGuardados);
        //mostrarLibros();
    }
}

// Función para guardar los libros en el almacenamiento local
function guardarLibrosEnLocalStorage() {
    localStorage.setItem('libros', JSON.stringify(libros));
}

// Función para buscar libros
function buscarLibro() {
    var input = document.getElementById("searchInput").value.toLowerCase();
    var resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";

    for (var i = 0; i < libros.length; i++) {
        var titulo = libros[i].titulo.toLowerCase();
        if (titulo.includes(input)) {
            var libroDiv = document.createElement("div");
            libroDiv.innerHTML = "<h3>" + libros[i].titulo + "</h3>" +
                                "<p>Autor: " + libros[i].autor + "</p>" +
                                "<p>Descripción: " + libros[i].descripcion + "</p>" +
                                "<button onclick='agregarFavorito(" + i + ")'>Agregar a favoritos</button>";
            resultadosDiv.appendChild(libroDiv);
        }
    }
}

// Función para agregar un nuevo libro al catálogo
document.getElementById("nuevoLibroForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var titulo = document.getElementById("titulo").value;
    var autor = document.getElementById("autor").value;
    var descripcion = document.getElementById("descripcion").value;
    var archivoPDF = document.getElementById("archivoPDF").files[0];

    var nuevoLibro = { titulo: titulo, autor: autor, descripcion: descripcion, archivo_pdf: archivoPDF ? archivoPDF.name : "" };
    libros.push(nuevoLibro);

    
    // Guardar los libros en el almacenamiento local
    guardarLibrosEnLocalStorage();

    // Actualizar catálogo
    mostrarLibros();

    // Subir archivo PDF
    subirPDF(archivoPDF);

    document.getElementById("nuevoLibroForm").reset();
});

// Función para mostrar los libros
function mostrarLibros() {
    var resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";

    for (var i = 0; i < libros.length; i++) {
        var libroDiv = document.createElement("div");
        libroDiv.innerHTML = "<h3>" + libros[i].titulo + "</h3>" +
                            "<p>Autor: " + libros[i].autor + "</p>" +
                            "<p>Descripción: " + libros[i].descripcion + "</p>" +
                            "<button onclick='agregarFavorito(" + i + ")'>Agregar a favoritos</button>";
        resultadosDiv.appendChild(libroDiv);
    }
}

// Función para agregar un libro a la lista de favoritos
function agregarFavorito(index) {
    var favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos.push(libros[index]);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    mostrarFavoritos();
}

// Función para subir el archivo PDF
function subirPDF(archivoPDF) {}

// Función para eliminar un libro de la lista de favoritos
function eliminarFavorito(index) {
    var favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos.splice(index, 1); // Elimina el libro en el índice dado
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    mostrarFavoritos();
}

// Función para mostrar los libros favoritos
function mostrarFavoritos() {
    var favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    var favoritosDiv = document.getElementById("favoritos");
    favoritosDiv.innerHTML = "";

    for (var i = 0; i < favoritos.length; i++) {
        var libroDiv = document.createElement("div");
        libroDiv.innerHTML = "<h3>" + favoritos[i].titulo + "</h3>" +
                            "<p>Autor: " + favoritos[i].autor + "</p>" +
                            "<p>Descripción: " + favoritos[i].descripcion + "</p>" +
                            "<button onclick='eliminarFavorito(" + i + ")'>Eliminar de favoritos</button>";
        favoritosDiv.appendChild(libroDiv);
    }
}

// Llamar a la función para cargar los libros desde el almacenamiento local al iniciar la aplicación
cargarLibrosDesdeLocalStorage();

// Llamar a la función para mostrar los libros favoritos
mostrarFavoritos();