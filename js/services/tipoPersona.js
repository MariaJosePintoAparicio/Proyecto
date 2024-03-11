
// Buscar y mostrar un tipo de persona
async function buscarTipoPersona() {
    const codigo = document.getElementById('buscarTipoPersona').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/tipoPersona?codigo=${codigo}`);
            const tipoPersona = await response.json();

            const resultadoBusqueda = document.getElementById('resultadoBuscarTipoPersona');
            resultadoBusqueda.innerHTML = '';

            if (tipoPersona.length > 0) {
                const tipoPersonaEncontrado = tipoPersona[0];
                resultadoBusqueda.innerHTML = `
                <p>Tipo Persona encontrado:</p>
                <p>ID: ${tipoPersonaEncontrado.codigo}</p>
                <p>Nombre: ${tipoPersonaEncontrado.nombre}</p>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontraron Tipo Persona con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar tipo de persona:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Manejar el evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function () {
    const tipoPersonaForm = document.getElementById('tipoPersonaForm');

    // Manejar el envío del formulario
    tipoPersonaForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Detener el envío del formulario

        // Obtener valores del formulario
        const codigo = document.getElementById('codigoPersona').value.trim();
        const nombre = document.getElementById('nombrePersona').value.trim();

        // Verificar si todos los campos están llenos
        if (codigo && nombrel) {
            const tipoPersona = {
                codigo: codigo,
                nombre: nombre
            };

            // Agregar nuevo tipo de Persona
            addTipoPersona(tipoPersona)
                .then(response => {
                    console.log('Tipo de Persona agregado:', response);
                    tipoPersonaForm.reset(); // Limpiar el formulario después de agregar
                })
                .catch(error => console.error('Error al agregar tipo de Persona:', error));
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});

// Función para agregar un nuevo tipo de persona
async function addTipoPersona(tipoPersona) {
    try {
        const response = await fetch('http://localhost:3000/tipoPersona', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tipoPersona),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error al agregar tipo de persona.');
        }
    } catch (error) {
        console.error('Error al agregar tipo de persona:', error);
        throw error;
    }
}

// Buscar y cargar los datos de un tipo de persona para editar
async function editarTipoPersona() {
    const codigo = document.getElementById('buscarEditarTipoPersona').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/tipoPersona?codigo=${codigo}`);
            const tipoPersona = await response.json();

            if (tipoPersona.length > 0) {
                const tipoPersonaEncontrado = tipoPersona[0];
                document.getElementById('idEditarTipoPersona').value = tipoPersonaEncontrado.id;
                document.getElementById('codigoEditarTipoPersona').value = tipoPersonaEncontrado.codigo;
                document.getElementById('nombreEditarTipoPersona').value = tipoPersonaEncontrado.nombre;
            } else {
                // Limpiar el formulario si no se encontraron resultados
                document.getElementById('idEditarTipoPersona').value = '';
                document.getElementById('codigoEditarTipoPersona').value = '';
                document.getElementById('nombreEditarTipoPersona').value = '';
                alert('No se encontró un Tipo de persona con ese código.');
            }
        } catch (error) {
            console.error('Error al buscar y cargar tipo de persona para editar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Guardar la edición de un tipo de persona
async function guardarEdicionTipoPersona() {
    const id = document.getElementById('idEditarTipoPersona').value.trim();
    const codigo = document.getElementById('codigoEditarTipoPersona').value.trim();
    const nombre = document.getElementById('nombreEditarTipoPersona').value.trim();

    if (id && codigo && nombre) {
        const data = { codigo, nombre }; // Solo actualizamos nombre y email, el ID no se actualiza

        try {
            const response = await fetch(`http://localhost:3000/tipoPersona/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Tipo de persona actualizado correctamente.');
            } else {
                throw new Error('Error al actualizar el Tipo de persona.');
            }
        } catch (error) {
            console.error('Error al guardar la edición del tipo de persona:', error);
        }
    } else {
        alert('Por favor, complete todos los campos.');
    }
}



// Buscar un tipo de persona para eliminar
async function buscadorEliminarTipoPersona() {
    const codigo = document.getElementById('buscadorEliminarTipoPersona').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/tipoPersona?codigo=${codigo}`);
            const tipoPersona = await response.json();

            const resultadoBusqueda = document.getElementById('resultado-busqueda-eliminar');
            resultadoBusqueda.innerHTML = '';

            if (tipoPersona.length > 0) {
                const tipoPersonaEncontrado = tipoPersona[0];
                resultadoBusqueda.innerHTML = `
                <p>Tipo Persona encontrado:</p>
                <p>ID: ${tipoPersonaEncontrado.codigo}</p>
                <p>Nombre: ${tipoPersonaEncontrado.nombre}</p>
                <button type="button" class="btn btn-danger" onclick="eliminarTipoPersona('${tipoPersonaEncontrado.id}')">Eliminar</button>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontró un Tipo persona con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar tipo de persona para eliminar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Eliminar un tipo de persona
async function eliminarTipoPersona(id) {
    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/tipoPersona/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Tipo de persona eliminado correctamente.');
            } else {
                throw new Error('Error al eliminar el Tipo de persona.');
            }
        } catch (error) {
            console.error('Error al eliminar tipo de persona:', error);
        }
    } else {
        alert('No se proporcionó un ID válido para eliminar.');
    }
}