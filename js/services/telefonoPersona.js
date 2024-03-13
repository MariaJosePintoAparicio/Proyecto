
// Buscar y mostrar un  de Telefono TelefonoPersona
async function buscarTelefonoPersona() {
    const codigo = document.getElementById('buscarTelefonoPersona').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/telefonoPersona?codigo=${codigo}`);
            const TelefonoPersona = await response.json();

            const resultadoBusqueda = document.getElementById('resultadoBuscarTelefonoPersona');
            resultadoBusqueda.innerHTML = '';

            if (TelefonoPersona.length > 0) {
                const TelefonoPersonaEncontrado = TelefonoPersona[0];
                resultadoBusqueda.innerHTML = `
                <p> TelefonoPersona encontrado:</p>
                <p>ID: ${TelefonoPersonaEncontrado.codigo}</p>
                <p>Numero: ${TelefonoPersonaEncontrado.numero}</p>
                <p>Ubicacion: ${TelefonoPersonaEncontrado.ubicacion}</p>
                <p>Responsable: ${TelefonoPersonaEncontrado.persona}</p>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontraron Telefono Telefono Persona con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar Telefono Persona:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Manejar el evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function () {
    const TelefonoPersonaForm = document.getElementById('TelefonoPersonaForm');

    // Manejar el envío del formulario
    TelefonoPersonaForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Detener el envío del formulario

        // Obtener valores del formulario
        const codigo = document.getElementById('codigoTelefonoPersona').value.trim();
        const numero = document.getElementById('numeroTelefonoPersona').value.trim();
        const ubicacion = document.getElementById('ubicacionTelefonoPersona').value.trim();
        const idPersona = document.getElementById('responsableTelefonoPersona').value.trim();
        const persona = document.getElementById('responsableTelefonoPersona').selectedOptions[0].textContent.trim();

        // Verificar si todos los campos están llenos
        if (codigo && numero && ubicacion && idPersona && persona) {
            const TelefonoPersona = {
                codigo: codigo,
                numero: numero,
                ubicacion: ubicacion,
                idPersona: idPersona,
                persona: persona
            };

            // Agregar nuevo  de TelefonoPersona
            addTelefonoPersona(TelefonoPersona)
                .then(response => {
                    console.log('Telefono Persona agregado:', response);
                    TelefonoPersonaForm.reset(); // Limpiar el formulario después de agregar
                })
                .catch(error => console.error('Error al agregar Telefono Persona:', error));
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});

// Función para agregar un nuevo  de TelefonoPersona
async function addTelefonoPersona(TelefonoPersona) {
    try {
        const response = await fetch('http://localhost:3000/telefonoPersona', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(TelefonoPersona),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error al agregar  de Telefono Persona.');
        }
    } catch (error) {
        console.error('Error al agregar  de Telefono Persona:', error);
        throw error;
    }
}

// Buscar y cargar los datos de un TelefonoPersona para editar
async function editarTelefonoPersona() {
    const codigo = document.getElementById('buscarEditarTelefonoPersona').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/telefonoPersona?codigo=${codigo}`);
            const TelefonoPersona = await response.json();

            if (TelefonoPersona.length > 0) {
                const TelefonoPersonaEncontrado = TelefonoPersona[0];
                document.getElementById('idEditarTelefonoPersona').value = TelefonoPersonaEncontrado.id;
                document.getElementById('codigoEditarTelefonoPersona').value = TelefonoPersonaEncontrado.codigo;
                document.getElementById('numeroEditarTelefonoPersona').value = TelefonoPersonaEncontrado.numero;
                document.getElementById('ubicacionEditarTelefonoPersona').value = TelefonoPersonaEncontrado.ubicacion;
                const valor = (TelefonoPersonaEncontrado.idPersona);
                document.getElementById('editarResponsableTelefonoPersona').value = valor.toString();
            } else {
                // Limpiar el formulario si no se encontraron resultados
                document.getElementById('idEditarTelefonoPersona').value = '';
                document.getElementById('codigoEditarTelefonoPersona').value = '';
                document.getElementById('numeroEditarTelefonoPersona').value = '';
                document.getElementById('ubicacionEditarTelefonoPersona').value = '';
                document.getElementById('editarResponsableTelefonoPersona').value = '';
                alert('No se encontró un Telefono Persona con ese código.');
            }
        } catch (error) {
            console.error('Error al buscar y cargar Telefono Persona para editar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Guardar la edición de un TelefonoPersona
async function guardarEdicionTelefonoPersona() {
    const id = document.getElementById('idEditarTelefonoPersona').value.trim();
    const codigo = document.getElementById('codigoEditarTelefonoPersona').value.trim();
    const numero = document.getElementById('numeroEditarTelefonoPersona').value.trim();
    const ubicacion = document.getElementById('ubicacionEditarTelefonoPersona').value.trim();
    const idPersona = document.getElementById('editarResponsableTelefonoPersona').value.trim();
    const persona = document.getElementById('editarResponsableTelefonoPersona').selectedOptions[0].textContent.trim();

    if (codigo && numero && ubicacion && idPersona && persona) {
        const data = { codigo, numero, ubicacion, idPersona, persona }; // Solo actualizamos nombre y email, el ID no se actualiza

        try {
            const response = await fetch(`http://localhost:3000/telefonoPersona/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Telefono Persona actualizado correctamente.');
            } else {
                throw new Error('Error al actualizar el TelefonoPersona.');
            }
        } catch (error) {
            console.error('Error al guardar la edición del TelefonoPersona:', error);
        }
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Buscar un TelefonoPersona para eliminar
async function buscadorEliminarTelefonoPersona() {
    const codigo = document.getElementById('buscadorEliminarTelefonoPersona').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/telefonoPersona?codigo=${codigo}`);
            const TelefonoPersona = await response.json();

            const resultadoBusqueda = document.getElementById('resultado-busqueda-eliminar');
            resultadoBusqueda.innerHTML = '';

            if (TelefonoPersona.length > 0) {
                const TelefonoPersonaEncontrado = TelefonoPersona[0];
                resultadoBusqueda.innerHTML = `
                <p> TelefonoPersona encontrado:</p>
                <p>ID: ${TelefonoPersonaEncontrado.codigo}</p>
                <p>Nombre: ${TelefonoPersonaEncontrado.nombre}</p>
                <p>Email: ${TelefonoPersonaEncontrado.email}</p>
                <p>Tipo TelefonoPersona: ${TelefonoPersonaEncontrado.tipoTelefonoPersona}</p>
                <button type="button" class="btn btn-danger" onclick="eliminarTelefonoPersona('${TelefonoPersonaEncontrado.id}')">Eliminar</button>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontró un  Telefono Persona con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar Telefono Persona para eliminar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Eliminar un TelefonoPersona
async function eliminarTelefonoPersona(id) {
    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/telefonoPersona/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Telefono Persona eliminado correctamente.');
            } else {
                throw new Error('Error al eliminar el Telefono Persona.');
            }
        } catch (error) {
            console.error('Error al eliminar Telefono Persona:', error);
        }
    } else {
        alert('No se proporcionó un ID válido para eliminar.');
    }
}