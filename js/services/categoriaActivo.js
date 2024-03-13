
// Buscar y mostrar una categoria activo
async function buscarCategoriaActivos() {
    const codigo = document.getElementById('buscarCategoriaActivos').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/categoriaActivo?codigo=${codigo}`);
            const CategoriaActivos = await response.json();

            const resultadoBusqueda = document.getElementById('resultadoBuscarCategoriaActivos');
            resultadoBusqueda.innerHTML = '';

            if (CategoriaActivos.length > 0) {
                const CategoriaActivosEncontrado = CategoriaActivos[0];
                resultadoBusqueda.innerHTML = `
                <p> CategoriaActivos encontrado:</p>
                <p>ID: ${CategoriaActivosEncontrado.codigo}</p>
                <p>Nombre: ${CategoriaActivosEncontrado.nombre}</p>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontraron categoria activos con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar de categoria activos:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Manejar el evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function () {
    const categoriaActivosForm = document.getElementById('categoriaActivosForm');

    // Manejar el envío del formulario
    categoriaActivosForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Detener el envío del formulario

        // Obtener valores del formulario
        const codigo = document.getElementById('codigoCategoriaActivos').value.trim();
        const nombre = document.getElementById('nombreCategoriaActivos').value.trim();

        // Verificar si todos los campos están llenos
        if (codigo && nombre) {
            const categoriaActivos = {
                codigo: codigo,
                nombre: nombre
            };

            // Agregar nuevo  de categoriaActivos
            addCategoriaActivos(categoriaActivos)
                .then(response => {
                    console.log('Categoria Activos agregado:', response);
                    categoriaActivosForm.reset(); // Limpiar el formulario después de agregar
                })
                .catch(error => console.error('Error al agregar  de Categoria Activos:', error));
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});

// Función para agregar una categoria activo
async function addCategoriaActivos(categoriaActivo) {
    try {
        const response = await fetch('http://localhost:3000/categoriaActivo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoriaActivo),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error al agregar de Categoria Activos.');
        }
    } catch (error) {
        console.error('Error al agregar de Categoria Activos:', error);
        throw error;
    }
}

// Buscar y cargar los datos de una categoria activo para editar
async function editarCategoriaActivos() {
    const codigo = document.getElementById('buscarEditarCategoriaActivos').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/categoriaActivo?codigo=${codigo}`);
            const categoriaActivos = await response.json();

            if (categoriaActivos.length > 0) {
                const categoriaActivosEncontrado = categoriaActivos[0];
                document.getElementById('idEditarCategoriaActivos').value = categoriaActivosEncontrado.id;
                document.getElementById('codigoEditarCategoriaActivos').value = categoriaActivosEncontrado.codigo;
                document.getElementById('nombreEditarCategoriaActivos').value = categoriaActivosEncontrado.nombre;
            } else {
                // Limpiar el formulario si no se encontraron resultados
                document.getElementById('idEditarCategoriaActivos').value = '';
                document.getElementById('codigoEditarCategoriaActivos').value = '';
                document.getElementById('nombreEditarCategoriaActivos').value = '';
                alert('No se encontró un  de categoriaActivos con ese código.');
            }
        } catch (error) {
            console.error('Error al buscar y cargar de una categoria activos para editar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Guardar la edición de un de una categoria activo
async function guardarEdicionCategoriaActivos() {
    const id = document.getElementById('idEditarCategoriaActivos').value.trim();
    const codigo = document.getElementById('codigoEditarCategoriaActivos').value.trim();
    const nombre = document.getElementById('nombreEditarCategoriaActivos').value.trim();

    if (codigo && nombre) {
        const data = { codigo, nombre}; // Solo actualizamos nombre y email, el ID no se actualiza

        try {
            const response = await fetch(`http://localhost:3000/categoriaActivo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Categoria Activos actualizado correctamente.');
            } else {
                throw new Error('Error al actualizar la Categoria Activos.');
            }
        } catch (error) {
            console.error('Error al guardar la edición de la Categoria Activos:', error);
        }
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Buscar una Categoria Activos para eliminar
async function buscadorEliminarCategoriaActivos() {
    const codigo = document.getElementById('buscadorEliminarCategoriaActivos').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/categoriaActivo?codigo=${codigo}`);
            const CategoriaActivos = await response.json();

            const resultadoBusqueda = document.getElementById('resultado-busqueda-eliminar');
            resultadoBusqueda.innerHTML = '';

            if (CategoriaActivos.length > 0) {
                const CategoriaActivosEncontrado = CategoriaActivos[0];
                resultadoBusqueda.innerHTML = `
                <p> Categoria Activo encontrado:</p>
                <p>ID: ${CategoriaActivosEncontrado.codigo}</p>
                <p>Nombre: ${CategoriaActivosEncontrado.nombre}</p>
                <button type="button" class="btn btn-danger" onclick="eliminarCategoriaActivo('${CategoriaActivosEncontrado.id}')">Eliminar</button>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontró una Categoria Activo con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar una Categoria Activo para eliminar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Eliminar una Categoria Activo
async function eliminarCategoriaActivo(id) {
    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/categoriaActivo/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Categoria Activo eliminado correctamente.');
            } else {
                throw new Error('Error al eliminar la Categoria Activo.');
            }
        } catch (error) {
            console.error('Error al eliminar la Categoria Activo:', error);
        }
    } else {
        alert('No se proporcionó un ID válido para eliminar.');
    }
}