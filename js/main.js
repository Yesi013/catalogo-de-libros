document.addEventListener("DOMContentLoaded", function () {
    var libros = JSON.parse(localStorage.getItem('libros')) || [];
    var favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    function guardarLibrosEnLocalStorage() {
        localStorage.setItem('libros', JSON.stringify(libros));
    }

    function agregarLibro(titulo, autor, descripcion, archivoPDF) {
        var nuevoLibro = {
            titulo: titulo,
            autor: autor,
            descripcion: descripcion,
            archivo_pdf: archivoPDF ? archivoPDF.name : ""
        };
        libros.push(nuevoLibro);
        guardarLibrosEnLocalStorage();
    }

    function cargarLibrosDesdeLocalStorage() {
        var librosGuardados = localStorage.getItem('libros');
        if (librosGuardados) {
            libros = JSON.parse(librosGuardados);
        }
    }

    function eliminarFavorito(index) {
        var favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        favoritos.splice(index, 1);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        mostrarFavoritos();
    }

    function buscarLibro() {
        var input = document.getElementById("searchInput").value.toLowerCase();
        var resultadosDiv = document.getElementById("resultados");
        resultadosDiv.innerHTML = "";

        var url = "https://openlibrary.org/search.json?q=" + encodeURIComponent(input);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                mostrarResultados(data);
            })
            .catch(error => {
                console.error('Error al buscar libros:', error);
            });
    }

    function mostrarResultados(data) {
        var resultadosDiv = document.getElementById("resultados");
        resultadosDiv.innerHTML = "";

        if (data.docs && data.docs.length > 0) {
            data.docs.forEach(doc => {
                var titulo = doc.title ? doc.title : "Título desconocido";
                var autor = doc.author_name ? doc.author_name.join(", ") : "Autor desconocido";
                var descripcion = doc.description ? doc.description : "Sin descripción disponible";

                var libro = { // Crear un objeto libro con los datos del documento
                    titulo: titulo,
                    autor: autor,
                    descripcion: descripcion
                };

                var libroDiv = document.createElement("div");
                libroDiv.classList.add("libro");
                libroDiv.innerHTML = "<h3>" + titulo + "</h3>" +
                    "<p>Autor: " + autor + "</p>" +
                    "<p>Descripción: " + descripcion + "</p>";

                var botonAgregarFavorito = document.createElement("button");
                botonAgregarFavorito.textContent = "Agregar a favoritos";
                botonAgregarFavorito.addEventListener("click", function () {
                    Swal.fire({
                        title: "¿Estás seguro que queres agregar a favoritos este libro?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Si, agregalo!",
                        cancelButtonText: "No, me equioqué."
                      }).then((result) => {
                        if (result.isConfirmed) {
                            agregarFavorito(libro);
                            Swal.fire({
                            title: "Perfecto, no fue agregado a favoritos.",
                            icon: "success"
                          });
                        }
                      });
                });
                libroDiv.appendChild(botonAgregarFavorito);

                resultadosDiv.appendChild(libroDiv);
            });
        } else {
            resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
        }
    }

    document.getElementById("searchButton").addEventListener("click", function () {
        buscarLibro();
    });

    document.getElementById("nuevoLibroForm").addEventListener("submit", function (event) {
        event.preventDefault();
        var titulo = document.getElementById("titulo").value;
        var autor = document.getElementById("autor").value;
        var descripcion = document.getElementById("descripcion").value;
        var archivoPDF = document.getElementById("archivoPDF").files[0];

        var nuevoLibro = { titulo: titulo, autor: autor, descripcion: descripcion, archivo_pdf: archivoPDF ? archivoPDF.name : "" };
        libros.push(nuevoLibro);
        guardarLibrosEnLocalStorage();
        mostrarLibros();
        subirPDF(archivoPDF);
        document.getElementById("nuevoLibroForm").reset();
    });

    function mostrarLibros() {
        var resultadosDiv = document.getElementById("resultados");
        resultadosDiv.innerHTML = "";

        libros.forEach((libro, index) => {
            var libroDiv = document.createElement("div");
            libroDiv.innerHTML = "<h3>" + libro.titulo + "</h3>" +
                "<p>Autor: " + libro.autor + "</p>" +
                "<p>Descripción: " + libro.descripcion + "</p>";

            var botonAgregarFavorito = document.createElement("button");
            botonAgregarFavorito.textContent = "Agregar a favoritos";
            botonAgregarFavorito.addEventListener("click", function () {
                
                agregarFavorito(libro);
            });
            libroDiv.appendChild(botonAgregarFavorito);

            resultadosDiv.appendChild(libroDiv);
        });
    }

    function agregarFavorito(libro) {
        var favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        favoritos.push(libro);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        mostrarFavoritos();
    }

    function subirPDF(archivoPDF) { }

    function mostrarFavoritos() {
        var favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        var favoritosDiv = document.getElementById("favoritos");
        favoritosDiv.innerHTML = "";

        favoritos.forEach((libro, index) => {
            if (libro) {
                var libroDiv = document.createElement("div");
                libroDiv.innerHTML = "<h3>" + libro.titulo + "</h3>" +
                    "<p>Autor: " + libro.autor + "</p>" +
                    "<p>Descripción: " + libro.descripcion + "</p>";

                var botonEliminar = document.createElement("button");
                botonEliminar.textContent = "Eliminar de favoritos";
                botonEliminar.addEventListener("click", function () {
                    Swal.fire({
                        title: "¿Estás seguro que queres eliminar este libro de tu lista de favoritos?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Si, eliminalo.",
                        cancelButtonText: "No, apreté sin querer."
                      }).then((result) => {
                        if (result.isConfirmed) {
                          eliminarFavorito(index);
                          Swal.fire({
                            title: "¡Libro eliminado!",
                            icon: "success"
                          });
                        }
                      });
                });

                libroDiv.appendChild(botonEliminar);
                favoritosDiv.appendChild(libroDiv);
            }
        });
    }

    cargarLibrosDesdeLocalStorage();
    mostrarFavoritos();
});