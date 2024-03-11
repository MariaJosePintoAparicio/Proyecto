// CRUD Tipos de Activo

// Manejar el evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function () {
    const tipoActivoForm = document.getElementById('tipoActivoForm');

    // Manejar el envío del formulario
    tipoActivoForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Detener el envío del formulario

        // Obtener valores del formulario
        const codigo = document.getElementById('codigo').value.trim();
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();

        // Verificar si todos los campos están llenos
        if (codigo && nombre && email) {
            const tipoActivo = {
                codigo: codigo,
                nombre: nombre,
                email: email
            };

            // Agregar nuevo tipo de activo
            addTipoActivo(tipoActivo)
                .then(response => {
                    console.log('Tipo de activo agregado:', response);
                    tipoActivoForm.reset(); // Limpiar el formulario después de agregar
                })
                .catch(error => console.error('Error al agregar tipo de activo:', error));
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});

// Buscar y mostrar un tipo de activo
async function buscarTipoActivo() {
    const codigo = document.getElementById('buscarTipoActivo').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/tipoActivo?codigo=${codigo}`);
            const tipoActivo = await response.json();

            const resultadoBusqueda = document.getElementById('resultado-busqueda');
            resultadoBusqueda.innerHTML = '';

            if (tipoActivo.length > 0) {
                const tipoActivoEncontrado = tipoActivo[0];
                resultadoBusqueda.innerHTML = `
                <p>Tipo Activo encontrado:</p>
                <p>ID: ${tipoActivoEncontrado.codigo}</p>
                <p>Nombre: ${tipoActivoEncontrado.nombre}</p>
                <p>Email: ${tipoActivoEncontrado.email}</p>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontraron Tipo Activo con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar tipo de activo:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Función para agregar un nuevo tipo de activo
async function addTipoActivo(tipoActivo) {
    try {
        const response = await fetch('http://localhost:3000/tipoActivo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tipoActivo),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error al agregar tipo de activo.');
        }
    } catch (error) {
        console.error('Error al agregar tipo de activo:', error);
        throw error;
    }
}

// Buscar y cargar los datos de un tipo de activo para editar
async function editarTipoActivo() {
    const codigo = document.getElementById('buscarEditarTipoActivo').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/tipoActivo?codigo=${codigo}`);
            const tipoActivo = await response.json();

            if (tipoActivo.length > 0) {
                const tipoActivoEncontrado = tipoActivo[0];
                document.getElementById('idEditarTipoActivo').value = tipoActivoEncontrado.id;
                document.getElementById('codigoEditarTipoActivo').value = tipoActivoEncontrado.codigo;
                document.getElementById('nombreEditarTipoActivo').value = tipoActivoEncontrado.nombre;
                document.getElementById('emailEditarTipoActivo').value = tipoActivoEncontrado.email;
            } else {
                // Limpiar el formulario si no se encontraron resultados
                document.getElementById('idEditarTipoActivo').value = '';
                document.getElementById('codigoEditarTipoActivo').value = '';
                document.getElementById('nombreEditarTipoActivo').value = '';
                document.getElementById('emailEditarTipoActivo').value = '';
                alert('No se encontró un Tipo de Activo con ese código.');
            }
        } catch (error) {
            console.error('Error al buscar y cargar tipo de activo para editar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Guardar la edición de un tipo de activo
async function guardarEdicionTipoActivo() {
    const id = document.getElementById('idEditarTipoActivo').value.trim();
    const codigo = document.getElementById('codigoEditarTipoActivo').value.trim();
    const nombre = document.getElementById('nombreEditarTipoActivo').value.trim();
    const email = document.getElementById('emailEditarTipoActivo').value.trim();

    if (id && codigo && nombre && email) {
        const data = { codigo, nombre, email }; // Solo actualizamos nombre y email, el ID no se actualiza

        try {
            const response = await fetch(`http://localhost:3000/tipoActivo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Tipo de Activo actualizado correctamente.');
            } else {
                throw new Error('Error al actualizar el Tipo de Activo.');
            }
        } catch (error) {
            console.error('Error al guardar la edición del tipo de activo:', error);
        }
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Buscar un tipo de activo para eliminar
async function buscadorEliminarTipoActivo() {
    const codigo = document.getElementById('buscadorEliminarTipoActivo').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/tipoActivo?codigo=${codigo}`);
            const tipoActivo = await response.json();

            const resultadoBusqueda = document.getElementById('resultado-busqueda-eliminar');
            resultadoBusqueda.innerHTML = '';

            if (tipoActivo.length > 0) {
                const tipoActivoEncontrado = tipoActivo[0];
                resultadoBusqueda.innerHTML = `
                <p>Tipo Activo encontrado:</p>
                <p>ID: ${tipoActivoEncontrado.codigo}</p>
                <p>Nombre: ${tipoActivoEncontrado.nombre}</p>
                <p>Email: ${tipoActivoEncontrado.email}</p>
                <button type="button" class="btn btn-danger" onclick="eliminarTipoActivo('${tipoActivoEncontrado.id}')">Eliminar</button>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontró un Tipo Activo con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar tipo de activo para eliminar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Eliminar un tipo de activo
async function eliminarTipoActivo(id) {
    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/tipoActivo/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Tipo de Activo eliminado correctamente.');
            } else {
                throw new Error('Error al eliminar el Tipo de Activo.');
            }
        } catch (error) {
            console.error('Error al eliminar tipo de activo:', error);
        }
    } else {
        alert('No se proporcionó un ID válido para eliminar.');
    }
}
