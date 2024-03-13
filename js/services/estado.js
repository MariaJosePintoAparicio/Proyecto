
// Buscar y mostrar una estado
async function buscarEstado() {
    const codigo = document.getElementById('buscarEstado').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/estados?codigo=${codigo}`);
            const Estado = await response.json();

            const resultadoBusqueda = document.getElementById('resultadoBuscarEstado');
            resultadoBusqueda.innerHTML = '';

            if (Estado.length > 0) {
                const EstadoEncontrado = Estado[0];
                resultadoBusqueda.innerHTML = `
                <p> Estado encontrado:</p>
                <p>ID: ${EstadoEncontrado.codigo}</p>
                <p>Nombre: ${EstadoEncontrado.nombre}</p>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontraron Estados con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar el Estado:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Manejar el evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function () {
    const EstadoForm = document.getElementById('EstadoForm');

    // Manejar el envío del formulario
    EstadoForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Detener el envío del formulario

        // Obtener valores del formulario
        const codigo = document.getElementById('codigoEstado').value.trim();
        const nombre = document.getElementById('nombreEstado').value.trim();

        // Verificar si todos los campos están llenos
        if (codigo && nombre) {
            const Estado = {
                codigo: codigo,
                nombre: nombre
            };

            // Agregar nuevo estado
            addEstado(Estado)
                .then(response => {
                    console.log('Estado agregado:', response);
                    EstadoForm.reset(); // Limpiar el formulario después de agregar
                })
                .catch(error => console.error('Error al agregar el estado:', error));
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});

// Función para agregar una estado
async function addEstado(Estados) {
    try {
        const response = await fetch('http://localhost:3000/estados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Estados),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error al agregar el Estado.');
        }
    } catch (error) {
        console.error('Error al agregar el Estado:', error);
        throw error;
    }
}

// Buscar y cargar los datos de una Estado para editar
async function editarEstado() {
    const codigo = document.getElementById('buscarEditarEstado').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/estados?codigo=${codigo}`);
            const Estado = await response.json();

            if (Estado.length > 0) {
                const EstadoEncontrado = Estado[0];
                document.getElementById('idEditarEstado').value = EstadoEncontrado.id;
                document.getElementById('codigoEditarEstado').value = EstadoEncontrado.codigo;
                document.getElementById('nombreEditarEstado').value = EstadoEncontrado.nombre;
            } else {
                // Limpiar el formulario si no se encontraron resultados
                document.getElementById('idEditarEstado').value = '';
                document.getElementById('codigoEditarEstado').value = '';
                document.getElementById('nombreEditarEstado').value = '';
                alert('No se encontró un  de Estado con ese código.');
            }
        } catch (error) {
            console.error('Error al buscar y cargar una Estado para editar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Guardar la edición de un de una Estado
async function guardarEdicionEstado() {
    const id = document.getElementById('idEditarEstado').value.trim();
    const codigo = document.getElementById('codigoEditarEstado').value.trim();
    const nombre = document.getElementById('nombreEditarEstado').value.trim();

    if (codigo && nombre) {
        const data = { codigo, nombre}; // Solo actualizamos nombre y email, el ID no se actualiza

        try {
            const response = await fetch(`http://localhost:3000/estados/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Estado actualizada correctamente.');
            } else {
                throw new Error('Error al actualizar el estado.');
            }
        } catch (error) {
            console.error('Error al guardar la edición del estado:', error);
        }
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Buscar una Estados para eliminar
async function buscadorEliminarEstado() {
    const codigo = document.getElementById('buscadorEliminarEstado').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/estados?codigo=${codigo}`);
            const Estado = await response.json();

            const resultadoBusqueda = document.getElementById('resultado-busqueda-eliminar');
            resultadoBusqueda.innerHTML = '';

            if (Estado.length > 0) {
                const EstadoEncontrado = Estado[0];
                resultadoBusqueda.innerHTML = `
                <p> Estado encontrado:</p>
                <p>ID: ${EstadoEncontrado.codigo}</p>
                <p>Nombre: ${EstadoEncontrado.nombre}</p>
                <button type="button" class="btn btn-danger" onclick="eliminarEstados('${EstadoEncontrado.id}')">Eliminar</button>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontró un estado con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar un estado para eliminar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Eliminar una Estado
async function eliminarEstados(id) {
    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/estados/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Estado eliminado correctamente.');
            } else {
                throw new Error('Error al eliminar el estado.');
            }
        } catch (error) {
            console.error('Error al eliminar el estado:', error);
        }
    } else {
        alert('No se proporcionó un ID válido para eliminar.');
    }
}