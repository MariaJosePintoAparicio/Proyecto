
// Buscar y mostrar un de un proveedor
async function buscarProveedor() {
    const codigo = document.getElementById('buscarProveedor').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/proveedor?codigo=${codigo}`);
            const Proveedor = await response.json();

            const resultadoBusqueda = document.getElementById('resultadoBuscarProveedor');
            resultadoBusqueda.innerHTML = '';

            if (Proveedor.length > 0) {
                const ProveedorEncontrado = Proveedor[0];
                resultadoBusqueda.innerHTML = `
                <p> Proveedor encontrado:</p>
                <p>ID: ${ProveedorEncontrado.codigo}</p>
                <p>Nombre: ${ProveedorEncontrado.nombre}</p>
                <p>Email: ${ProveedorEncontrado.email}</p>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontraron un Proveedor con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar un proveedor:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Manejar el evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function () {
    const ProveedorForm = document.getElementById('ProveedorForm');

    // Manejar el envío del formulario
    ProveedorForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Detener el envío del formulario

        // Obtener valores del formulario
        const codigo = document.getElementById('codigoProveedor').value.trim();
        const nombre = document.getElementById('nombreProveedor').value.trim();
        const email = document.getElementById('emailProveedor').value.trim();

        // Verificar si todos los campos están llenos
        if (codigo && nombre && email) {
            const Proveedor = {
                codigo: codigo,
                nombre: nombre,
                email: email
            };

            // Agregar nuevo  de Proveedor
            addProveedor(Proveedor)
                .then(response => {
                    console.log('Proveedor agregado:', response);
                    ProveedorForm.reset(); // Limpiar el formulario después de agregar
                })
                .catch(error => console.error('Error al agregar el proveedor:', error));
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});

// Función para agregar un nuevo  de proveedor
async function addProveedor(Proveedor) {
    try {
        const response = await fetch('http://localhost:3000/proveedor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Proveedor),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error al agregar  de proveedor.');
        }
    } catch (error) {
        console.error('Error al agregar  de proveedor:', error);
        throw error;
    }
}

// Buscar y cargar los datos de un  de proveedor para editar
async function editarProveedor() {
    const codigo = document.getElementById('buscarEditarProveedor').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/proveedor?codigo=${codigo}`);
            const Proveedor = await response.json();

            if (Proveedor.length > 0) {
                const ProveedorEncontrado = Proveedor[0];
                document.getElementById('idEditarProveedor').value = ProveedorEncontrado.id;
                document.getElementById('codigoEditarProveedor').value = ProveedorEncontrado.codigo;
                document.getElementById('nombreEditarProveedor').value = ProveedorEncontrado.nombre;
                document.getElementById('emailEditarProveedor').value = ProveedorEncontrado.email;
            } else {
                // Limpiar el formulario si no se encontraron resultados
                document.getElementById('idEditarProveedor').value = '';
                document.getElementById('codigoEditarProveedor').value = '';
                document.getElementById('nombreEditarProveedor').value = '';
                alert('No se encontró un  de proveedor con ese código.');
            }
        } catch (error) {
            console.error('Error al buscar y cargar  de proveedor para editar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Guardar la edición de un  de proveedor
async function guardarEdicionProveedor() {
    const id = document.getElementById('idEditarProveedor').value.trim();
    const codigo = document.getElementById('codigoEditarProveedor').value.trim();
    const nombre = document.getElementById('nombreEditarProveedor').value.trim();
    const email = document.getElementById('emailEditarProveedor').value.trim();

    if (codigo && nombre && email ) {
        const data = { codigo, nombre, email }; // Solo actualizamos nombre y email, el ID no se actualiza

        try {
            const response = await fetch(`http://localhost:3000/proveedor/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Proveedor actualizado correctamente.');
            } else {
                throw new Error('Error al actualizar el proveedor.');
            }
        } catch (error) {
            console.error('Error al guardar la edición del proveedor:', error);
        }
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Buscar un  de proveedor para eliminar
async function buscadorEliminarProveedor() {
    const codigo = document.getElementById('buscadorEliminarProveedor').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/proveedor?codigo=${codigo}`);
            const Proveedor = await response.json();

            const resultadoBusqueda = document.getElementById('resultado-busqueda-eliminar');
            resultadoBusqueda.innerHTML = '';

            if (Proveedor.length > 0) {
                const ProveedorEncontrado = Proveedor[0];
                resultadoBusqueda.innerHTML = `
                <p> Proveedor encontrado:</p>
                <p>ID: ${ProveedorEncontrado.codigo}</p>
                <p>Nombre: ${ProveedorEncontrado.nombre}</p>
                <p>Email: ${ProveedorEncontrado.email}</p>
                <button type="button" class="btn btn-danger" onclick="eliminarProveedor('${ProveedorEncontrado.id}')">Eliminar</button>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontró un proveedor con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar el proveedor para eliminar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Eliminar un  de proveedor
async function eliminarProveedor(id) {
    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/proveedor/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Proveedor eliminado correctamente.');
            } else {
                throw new Error('Error al eliminar el proveedor.');
            }
        } catch (error) {
            console.error('Error al eliminar el proveedor:', error);
        }
    } else {
        alert('No se proporcionó un ID válido para eliminar.');
    }
}