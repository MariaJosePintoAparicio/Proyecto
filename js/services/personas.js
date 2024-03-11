
// Buscar y mostrar un  de persona
async function buscarPersona() {
    const codigo = document.getElementById('buscarPersona').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/personas?codigo=${codigo}`);
            const Persona = await response.json();

            const resultadoBusqueda = document.getElementById('resultadoBuscarPersona');
            resultadoBusqueda.innerHTML = '';

            if (Persona.length > 0) {
                const PersonaEncontrado = Persona[0];
                resultadoBusqueda.innerHTML = `
                <p> Persona encontrado:</p>
                <p>ID: ${PersonaEncontrado.codigo}</p>
                <p>Nombre: ${PersonaEncontrado.nombre}</p>
                <p>Email: ${PersonaEncontrado.email}</p>
                <p>Tipo Persona: ${PersonaEncontrado.tipoPersona}</p>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontraron  Persona con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar  de persona:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Manejar el evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function () {
    const PersonaForm = document.getElementById('PersonaForm');

    // Manejar el envío del formulario
    PersonaForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Detener el envío del formulario

        // Obtener valores del formulario
        const codigo = document.getElementById('codigoPersona').value.trim();
        const nombre = document.getElementById('nombrePersona').value.trim();
        const email = document.getElementById('emailPersona').value.trim();
        const idTipoPersona = document.getElementById('tipoPersonaPersona').value.trim();
        const tipoPersona = document.getElementById('tipoPersonaPersona').selectedOptions[0].textContent.trim();

        // Verificar si todos los campos están llenos
        if (codigo && nombre && email && idTipoPersona && tipoPersona) {
            const Persona = {
                codigo: codigo,
                nombre: nombre,
                email: email,
                idTipoPersona: idTipoPersona,
                tipoPersona: tipoPersona
            };

            // Agregar nuevo  de Persona
            addPersona(Persona)
                .then(response => {
                    console.log(' de Persona agregado:', response);
                    PersonaForm.reset(); // Limpiar el formulario después de agregar
                })
                .catch(error => console.error('Error al agregar  de Persona:', error));
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});

// Función para agregar un nuevo  de persona
async function addPersona(Persona) {
    try {
        const response = await fetch('http://localhost:3000/personas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Persona),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error al agregar  de persona.');
        }
    } catch (error) {
        console.error('Error al agregar  de persona:', error);
        throw error;
    }
}

// Buscar y cargar los datos de un  de persona para editar
async function editarPersona() {
    const codigo = document.getElementById('buscarEditarPersona').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/personas?codigo=${codigo}`);
            const Persona = await response.json();

            if (Persona.length > 0) {
                const PersonaEncontrado = Persona[0];
                document.getElementById('idEditarPersona').value = PersonaEncontrado.id;
                document.getElementById('codigoEditarPersona').value = PersonaEncontrado.codigo;
                document.getElementById('nombreEditarPersona').value = PersonaEncontrado.nombre;
                document.getElementById('emailEditarPersona').value = PersonaEncontrado.email;
                const valorDeseado = parseInt(PersonaEncontrado.idTipoPersona);
                document.getElementById('tipoPersonaEditarPersona').value = valorDeseado.toString();
            } else {
                // Limpiar el formulario si no se encontraron resultados
                document.getElementById('idEditarPersona').value = '';
                document.getElementById('codigoEditarPersona').value = '';
                document.getElementById('nombreEditarPersona').value = '';
                alert('No se encontró un  de persona con ese código.');
            }
        } catch (error) {
            console.error('Error al buscar y cargar  de persona para editar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Guardar la edición de un  de persona
async function guardarEdicionPersona() {
    const id = document.getElementById('idEditarPersona').value.trim();
    const codigo = document.getElementById('codigoEditarPersona').value.trim();
    const nombre = document.getElementById('nombreEditarPersona').value.trim();
    const email = document.getElementById('emailEditarPersona').value.trim();
    const idTipoPersona = document.getElementById('tipoPersonaEditarPersona').value.trim();
    const tipoPersona = document.getElementById('tipoPersonaEditarPersona').selectedOptions[0].textContent.trim();

    if (codigo && nombre && email && idTipoPersona && tipoPersona) {
        const data = { codigo, nombre, email, idTipoPersona, tipoPersona }; // Solo actualizamos nombre y email, el ID no se actualiza

        try {
            const response = await fetch(`http://localhost:3000/personas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert(' de persona actualizado correctamente.');
            } else {
                throw new Error('Error al actualizar el  de persona.');
            }
        } catch (error) {
            console.error('Error al guardar la edición del  de persona:', error);
        }
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Buscar un  de persona para eliminar
async function buscadorEliminarPersona() {
    const codigo = document.getElementById('buscadorEliminarPersona').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/personas?codigo=${codigo}`);
            const Persona = await response.json();

            const resultadoBusqueda = document.getElementById('resultado-busqueda-eliminar');
            resultadoBusqueda.innerHTML = '';

            if (Persona.length > 0) {
                const PersonaEncontrado = Persona[0];
                resultadoBusqueda.innerHTML = `
                <p> Persona encontrado:</p>
                <p>ID: ${PersonaEncontrado.codigo}</p>
                <p>Nombre: ${PersonaEncontrado.nombre}</p>
                <p>Email: ${PersonaEncontrado.email}</p>
                <p>Tipo Persona: ${PersonaEncontrado.tipoPersona}</p>
                <button type="button" class="btn btn-danger" onclick="eliminarPersona('${PersonaEncontrado.id}')">Eliminar</button>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontró un  persona con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar  de persona para eliminar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Eliminar un  de persona
async function eliminarPersona(id) {
    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/personas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert(' de persona eliminado correctamente.');
            } else {
                throw new Error('Error al eliminar el  de persona.');
            }
        } catch (error) {
            console.error('Error al eliminar  de persona:', error);
        }
    } else {
        alert('No se proporcionó un ID válido para eliminar.');
    }
}