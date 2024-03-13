
// Buscar y mostrar una marca
async function buscarMarca() {
    const codigo = document.getElementById('buscarMarca').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/marcas?codigo=${codigo}`);
            const Marca = await response.json();

            const resultadoBusqueda = document.getElementById('resultadoBuscarMarca');
            resultadoBusqueda.innerHTML = '';

            if (Marca.length > 0) {
                const MarcaEncontrado = Marca[0];
                resultadoBusqueda.innerHTML = `
                <p> Marca encontrado:</p>
                <p>ID: ${MarcaEncontrado.codigo}</p>
                <p>Nombre: ${MarcaEncontrado.nombre}</p>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontraron marcas con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar la marca:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Manejar el evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function () {
    const MarcaForm = document.getElementById('MarcaForm');

    // Manejar el envío del formulario
    MarcaForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Detener el envío del formulario

        // Obtener valores del formulario
        const codigo = document.getElementById('codigoMarca').value.trim();
        const nombre = document.getElementById('nombreMarca').value.trim();

        // Verificar si todos los campos están llenos
        if (codigo && nombre) {
            const Marca = {
                codigo: codigo,
                nombre: nombre
            };

            // Agregar nuevo  de Marca
            addMarca(Marca)
                .then(response => {
                    console.log('marca agregado:', response);
                    MarcaForm.reset(); // Limpiar el formulario después de agregar
                })
                .catch(error => console.error('Error al agregar la marca:', error));
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});

// Función para agregar una marca
async function addMarca(marcas) {
    try {
        const response = await fetch('http://localhost:3000/marcas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(marcas),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error al agregar la marca.');
        }
    } catch (error) {
        console.error('Error al agregar la marca:', error);
        throw error;
    }
}

// Buscar y cargar los datos de una marca para editar
async function editarMarca() {
    const codigo = document.getElementById('buscarEditarMarca').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/marcas?codigo=${codigo}`);
            const Marca = await response.json();

            if (Marca.length > 0) {
                const MarcaEncontrado = Marca[0];
                document.getElementById('idEditarMarca').value = MarcaEncontrado.id;
                document.getElementById('codigoEditarMarca').value = MarcaEncontrado.codigo;
                document.getElementById('nombreEditarMarca').value = MarcaEncontrado.nombre;
            } else {
                // Limpiar el formulario si no se encontraron resultados
                document.getElementById('idEditarMarca').value = '';
                document.getElementById('codigoEditarMarca').value = '';
                document.getElementById('nombreEditarMarca').value = '';
                alert('No se encontró un  de Marca con ese código.');
            }
        } catch (error) {
            console.error('Error al buscar y cargar una marca para editar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Guardar la edición de un de una marca
async function guardarEdicionMarca() {
    const id = document.getElementById('idEditarMarca').value.trim();
    const codigo = document.getElementById('codigoEditarMarca').value.trim();
    const nombre = document.getElementById('nombreEditarMarca').value.trim();

    if (codigo && nombre) {
        const data = { codigo, nombre}; // Solo actualizamos nombre y email, el ID no se actualiza

        try {
            const response = await fetch(`http://localhost:3000/marcas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('marca actualizada correctamente.');
            } else {
                throw new Error('Error al actualizar la marca.');
            }
        } catch (error) {
            console.error('Error al guardar la edición de la marca:', error);
        }
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Buscar una marcas para eliminar
async function buscadorEliminarMarca() {
    const codigo = document.getElementById('buscadorEliminarMarca').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/marcas?codigo=${codigo}`);
            const Marca = await response.json();

            const resultadoBusqueda = document.getElementById('resultado-busqueda-eliminar');
            resultadoBusqueda.innerHTML = '';

            if (Marca.length > 0) {
                const MarcaEncontrado = Marca[0];
                resultadoBusqueda.innerHTML = `
                <p> marca encontrado:</p>
                <p>ID: ${MarcaEncontrado.codigo}</p>
                <p>Nombre: ${MarcaEncontrado.nombre}</p>
                <button type="button" class="btn btn-danger" onclick="eliminarmarcas('${MarcaEncontrado.id}')">Eliminar</button>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontró una marca con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar una marca para eliminar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Eliminar una marca
async function eliminarmarcas(id) {
    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/marcas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('marca eliminado correctamente.');
            } else {
                throw new Error('Error al eliminar la marca.');
            }
        } catch (error) {
            console.error('Error al eliminar la marca:', error);
        }
    } else {
        alert('No se proporcionó un ID válido para eliminar.');
    }
}