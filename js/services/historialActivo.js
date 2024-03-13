
// Buscar y mostrar un  de Telefono HistorialActivo
async function buscarHistorialActivo() {
    const codigo = document.getElementById('buscarHistorialActivo').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/historialActivo?codigo=${codigo}`);
            const HistorialActivo = await response.json();

            const resultadoBusqueda = document.getElementById('resultadoBuscarHistorialActivo');
            resultadoBusqueda.innerHTML = '';

            if (HistorialActivo.length > 0) {
                const HistorialActivoEncontrado = HistorialActivo[0];
                resultadoBusqueda.innerHTML = `
                <p> HistorialActivo encontrado:</p>
                <p>ID: ${HistorialActivoEncontrado.codigo}</p>
                <p>Numero: ${HistorialActivoEncontrado.numero}</p>
                <p>Ubicacion: ${HistorialActivoEncontrado.ubicacion}</p>
                <p>Responsable: ${HistorialActivoEncontrado.persona}</p>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontraron Telefono Historial Activo con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar Historial Activo:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Manejar el evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function () {
    const HistorialActivoForm = document.getElementById('HistorialActivoForm');

    // Manejar el envío del formulario
    HistorialActivoForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Detener el envío del formulario

        // Obtener valores del formulario
        const codigo = document.getElementById('codigoHistorialActivo').value.trim();
        const numero = document.getElementById('numeroHistorialActivo').value.trim();
        const ubicacion = document.getElementById('ubicacionHistorialActivo').value.trim();
        const idPersona = document.getElementById('responsableHistorialActivo').value.trim();
        const persona = document.getElementById('responsableHistorialActivo').selectedOptions[0].textContent.trim();

        // Verificar si todos los campos están llenos
        if (codigo && numero && ubicacion && idPersona && persona) {
            const HistorialActivo = {
                codigo: codigo,
                numero: numero,
                ubicacion: ubicacion,
                idPersona: idPersona,
                persona: persona
            };

            // Agregar nuevo  de HistorialActivo
            addHistorialActivo(HistorialActivo)
                .then(response => {
                    console.log('Historial Activo agregado:', response);
                    HistorialActivoForm.reset(); // Limpiar el formulario después de agregar
                })
                .catch(error => console.error('Error al agregar Historial Activo:', error));
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});

// Función para agregar un nuevo  de HistorialActivo
async function addHistorialActivo(HistorialActivo) {
    try {
        const response = await fetch('http://localhost:3000/historialActivo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(HistorialActivo),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error al agregar  de Historial Activo.');
        }
    } catch (error) {
        console.error('Error al agregar  de Historial Activo:', error);
        throw error;
    }
}

// Buscar y cargar los datos de un HistorialActivo para editar
async function editarHistorialActivo() {
    const codigo = document.getElementById('buscarEditarHistorialActivo').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/historialActivo?codigo=${codigo}`);
            const HistorialActivo = await response.json();

            if (HistorialActivo.length > 0) {
                const HistorialActivoEncontrado = HistorialActivo[0];
                document.getElementById('idEditarHistorialActivo').value = HistorialActivoEncontrado.id;
                document.getElementById('codigoEditarHistorialActivo').value = HistorialActivoEncontrado.codigo;
                document.getElementById('numeroEditarHistorialActivo').value = HistorialActivoEncontrado.numero;
                document.getElementById('ubicacionEditarHistorialActivo').value = HistorialActivoEncontrado.ubicacion;
                const valor = (HistorialActivoEncontrado.idPersona);
                document.getElementById('editarResponsableHistorialActivo').value = valor.toString();
            } else {
                // Limpiar el formulario si no se encontraron resultados
                document.getElementById('idEditarHistorialActivo').value = '';
                document.getElementById('codigoEditarHistorialActivo').value = '';
                document.getElementById('numeroEditarHistorialActivo').value = '';
                document.getElementById('ubicacionEditarHistorialActivo').value = '';
                document.getElementById('editarResponsableHistorialActivo').value = '';
                alert('No se encontró un Historial Activo con ese código.');
            }
        } catch (error) {
            console.error('Error al buscar y cargar Historial Activo para editar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Guardar la edición de un HistorialActivo
async function guardarEdicionHistorialActivo() {
    const id = document.getElementById('idEditarHistorialActivo').value.trim();
    const codigo = document.getElementById('codigoEditarHistorialActivo').value.trim();
    const numero = document.getElementById('numeroEditarHistorialActivo').value.trim();
    const ubicacion = document.getElementById('ubicacionEditarHistorialActivo').value.trim();
    const idPersona = document.getElementById('editarResponsableHistorialActivo').value.trim();
    const persona = document.getElementById('editarResponsableHistorialActivo').selectedOptions[0].textContent.trim();

    if (codigo && numero && ubicacion && idPersona && persona) {
        const data = { codigo, numero, ubicacion, idPersona, persona }; // Solo actualizamos nombre y email, el ID no se actualiza

        try {
            const response = await fetch(`http://localhost:3000/historialActivo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Historial Activo actualizado correctamente.');
            } else {
                throw new Error('Error al actualizar el HistorialActivo.');
            }
        } catch (error) {
            console.error('Error al guardar la edición del HistorialActivo:', error);
        }
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Buscar un HistorialActivo para eliminar
async function buscadorEliminarHistorialActivo() {
    const codigo = document.getElementById('buscadorEliminarHistorialActivo').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/historialActivo?codigo=${codigo}`);
            const HistorialActivo = await response.json();

            const resultadoBusqueda = document.getElementById('resultado-busqueda-eliminar');
            resultadoBusqueda.innerHTML = '';

            if (HistorialActivo.length > 0) {
                const HistorialActivoEncontrado = HistorialActivo[0];
                resultadoBusqueda.innerHTML = `
                <p> HistorialActivo encontrado:</p>
                <p>ID: ${HistorialActivoEncontrado.codigo}</p>
                <p>Nombre: ${HistorialActivoEncontrado.nombre}</p>
                <p>Email: ${HistorialActivoEncontrado.email}</p>
                <p>Tipo HistorialActivo: ${HistorialActivoEncontrado.tipoHistorialActivo}</p>
                <button type="button" class="btn btn-danger" onclick="eliminarHistorialActivo('${HistorialActivoEncontrado.id}')">Eliminar</button>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontró un  Historial Activo con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar Historial Activo para eliminar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Eliminar un HistorialActivo
async function eliminarHistorialActivo(id) {
    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/historialActivo/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Historial Activo eliminado correctamente.');
            } else {
                throw new Error('Error al eliminar el Historial Activo.');
            }
        } catch (error) {
            console.error('Error al eliminar Historial Activo:', error);
        }
    } else {
        alert('No se proporcionó un ID válido para eliminar.');
    }
}