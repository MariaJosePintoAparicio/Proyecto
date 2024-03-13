
// Buscar y mostrar una TipoMovimientoActivo
async function buscarTipoMovimientoActivo() {
    const codigo = document.getElementById('buscarTipoMovimientoActivo').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/tipoMovimientoActivos?codigo=${codigo}`);
            const TipoMovimientoActivo = await response.json();

            const resultadoBusqueda = document.getElementById('resultadoBuscarTipoMovimientoActivo');
            resultadoBusqueda.innerHTML = '';

            if (TipoMovimientoActivo.length > 0) {
                const TipoMovimientoActivoEncontrado = TipoMovimientoActivo[0];
                resultadoBusqueda.innerHTML = `
                <p> TipoMovimientoActivo encontrado:</p>
                <p>ID: ${TipoMovimientoActivoEncontrado.codigo}</p>
                <p>Nombre: ${TipoMovimientoActivoEncontrado.nombre}</p>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontraron Tipo Movimiento Activos con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar el Tipo Movimiento Activos:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Manejar el evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function () {
    const TipoMovimientoActivoForm = document.getElementById('TipoMovimientoActivoForm');

    // Manejar el envío del formulario
    TipoMovimientoActivoForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Detener el envío del formulario

        // Obtener valores del formulario
        const codigo = document.getElementById('codigoTipoMovimientoActivo').value.trim();
        const nombre = document.getElementById('nombreTipoMovimientoActivo').value.trim();

        // Verificar si todos los campos están llenos
        if (codigo && nombre) {
            const TipoMovimientoActivo = {
                codigo: codigo,
                nombre: nombre
            };

            // Agregar nuevo TipoMovimientoActivo
            addTipoMovimientoActivo(TipoMovimientoActivo)
                .then(response => {
                    console.log('Tipo Movimiento Activos agregado:', response);
                    TipoMovimientoActivoForm.reset(); // Limpiar el formulario después de agregar
                })
                .catch(error => console.error('Error al agregar el Tipo Movimiento Activos:', error));
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});

// Función para agregar una TipoMovimientoActivo
async function addTipoMovimientoActivo(TipoMovimientoActivos) {
    try {
        const response = await fetch('http://localhost:3000/tipoMovimientoActivos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(TipoMovimientoActivos),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error al agregar el Tipo Movimiento Activos.');
        }
    } catch (error) {
        console.error('Error al agregar el Tipo Movimiento Activos:', error);
        throw error;
    }
}

// Buscar y cargar los datos de una TipoMovimientoActivo para editar
async function editarTipoMovimientoActivo() {
    const codigo = document.getElementById('buscarEditarTipoMovimientoActivo').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/tipoMovimientoActivos?codigo=${codigo}`);
            const TipoMovimientoActivo = await response.json();

            if (TipoMovimientoActivo.length > 0) {
                const TipoMovimientoActivoEncontrado = TipoMovimientoActivo[0];
                document.getElementById('idEditarTipoMovimientoActivo').value = TipoMovimientoActivoEncontrado.id;
                document.getElementById('codigoEditarTipoMovimientoActivo').value = TipoMovimientoActivoEncontrado.codigo;
                document.getElementById('nombreEditarTipoMovimientoActivo').value = TipoMovimientoActivoEncontrado.nombre;
            } else {
                // Limpiar el formulario si no se encontraron resultados
                document.getElementById('idEditarTipoMovimientoActivo').value = '';
                document.getElementById('codigoEditarTipoMovimientoActivo').value = '';
                document.getElementById('nombreEditarTipoMovimientoActivo').value = '';
                alert('No se encontró un  de TipoMovimientoActivo con ese código.');
            }
        } catch (error) {
            console.error('Error al buscar y cargar una Tipo Movimiento Activos para editar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Guardar la edición de un de una TipoMovimientoActivo
async function guardarEdicionTipoMovimientoActivo() {
    const id = document.getElementById('idEditarTipoMovimientoActivo').value.trim();
    const codigo = document.getElementById('codigoEditarTipoMovimientoActivo').value.trim();
    const nombre = document.getElementById('nombreEditarTipoMovimientoActivo').value.trim();

    if (codigo && nombre) {
        const data = { codigo, nombre}; // Solo actualizamos nombre y email, el ID no se actualiza

        try {
            const response = await fetch(`http://localhost:3000/tipoMovimientoActivos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Tipo Movimiento Activos actualizada correctamente.');
            } else {
                throw new Error('Error al actualizar el Tipo Movimiento Activos.');
            }
        } catch (error) {
            console.error('Error al guardar la edición del Tipo Movimiento Activos:', error);
        }
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Buscar una TipoMovimientoActivos para eliminar
async function buscadorEliminarTipoMovimientoActivo() {
    const codigo = document.getElementById('buscadorEliminarTipoMovimientoActivo').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/tipoMovimientoActivos?codigo=${codigo}`);
            const TipoMovimientoActivo = await response.json();

            const resultadoBusqueda = document.getElementById('resultado-busqueda-eliminar');
            resultadoBusqueda.innerHTML = '';

            if (TipoMovimientoActivo.length > 0) {
                const TipoMovimientoActivoEncontrado = TipoMovimientoActivo[0];
                resultadoBusqueda.innerHTML = `
                <p> TipoMovimientoActivo encontrado:</p>
                <p>ID: ${TipoMovimientoActivoEncontrado.codigo}</p>
                <p>Nombre: ${TipoMovimientoActivoEncontrado.nombre}</p>
                <button type="button" class="btn btn-danger" onclick="eliminarTipoMovimientoActivos('${TipoMovimientoActivoEncontrado.id}')">Eliminar</button>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontró un Tipo Movimiento Activos con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar un Tipo Movimiento Activos para eliminar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Eliminar una TipoMovimientoActivo
async function eliminarTipoMovimientoActivos(id) {
    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/tipoMovimientoActivos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Tipo Movimiento Activos eliminado correctamente.');
            } else {
                throw new Error('Error al eliminar el Tipo Movimiento Activos.');
            }
        } catch (error) {
            console.error('Error al eliminar el Tipo Movimiento Activos:', error);
        }
    } else {
        alert('No se proporcionó un ID válido para eliminar.');
    }
}