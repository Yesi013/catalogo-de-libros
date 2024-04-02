// Datos de ejemplo
var libros = [
    { titulo: "El señor de los anillos", autor: "J.R.R. Tolkien", descripcion: "Fantasía épica", archivo_pdf: "el_senor_de_los_anillos.pdf" },
    { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", descripcion: "Realismo mágico", archivo_pdf: "cien_anios_de_soledad.pdf" }
];

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

    var nuevoLibro = { titulo: titulo, autor: autor, descripcion: descripcion, archivo_pdf: archivoPDF.name };
    libros.push(nuevoLibro);

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


