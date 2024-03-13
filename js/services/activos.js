
// Buscar y mostrar un Activos
async function buscarActivos() {
    const codigo = document.getElementById('buscarActivos').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/activos?codigo=${codigo}`);
            const Activos = await response.json();

            const resultadoBusqueda = document.getElementById('resultadoBuscarActivos');
            resultadoBusqueda.innerHTML = '';

            if (Activos.length > 0) {
                const ActivosEncontrado = Activos[0];
                resultadoBusqueda.innerHTML = `
                <p> Activos encontrado:</p>
                <p>ID: ${ActivosEncontrado.codigo}</p>
                <p>Codigo de transaccion: ${ActivosEncontrado.codigoTransaccion}</p>
                <p>Numero de formulario: ${ActivosEncontrado.numeroFormulario}</p>
                <p>Marca : ${ActivosEncontrado.marca}</p>
                <p>Categoria : ${ActivosEncontrado.categoria}</p>
                <p>Tipo : ${ActivosEncontrado.tipo}</p>
                <p>Valor Unitario : ${ActivosEncontrado.valorUnitarioActivos}</p>
                <p>Proveedor : ${ActivosEncontrado.preveedor}</p>
                <p>Numero Serial : ${ActivosEncontrado.numeroSerialActivos}</p>
                <p>Empresa Responsable : ${ActivosEncontrado.responsable}</p>
                <p>Estado : ${ActivosEncontrado.estado}</p>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontraron Activos con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar el activo:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Manejar el evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function () {
    const ActivosForm = document.getElementById('ActivosForm');

    // Manejar el envío del formulario
    ActivosForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Detener el envío del formulario

        // Obtener valores del formulario
        const codigo = document.getElementById('codigoActivos').value.trim();
        const codigoTransaccion = document.getElementById('codTransaccionActivos').value.trim();
        const numeroFormulario = document.getElementById('numeroFormularioActivos').value.trim();
        const idMarca = document.getElementById('marcaActivos').value.trim();
        const marca = document.getElementById('marcaActivos').selectedOptions[0].textContent.trim();
        const idCategoria = document.getElementById('selectCategoriaActivos').value.trim();
        const categoria = document.getElementById('selectCategoriaActivos').selectedOptions[0].textContent.trim();
        const idTipo = document.getElementById('tipoActivos').value.trim();
        const tipo = document.getElementById('tipoActivos').selectedOptions[0].textContent.trim();
        const valorUnitarioActivos = document.getElementById('valorUnitarioActivos').value.trim();
        const idPreveedor = document.getElementById('proveedorActivos').value.trim();
        const preveedor = document.getElementById('proveedorActivos').selectedOptions[0].textContent.trim();
        const numeroSerialActivos = document.getElementById('numeroSerialActivos').value.trim();
        const idResponsable = document.getElementById('responsableActivos').value.trim();
        const responsable = document.getElementById('responsableActivos').selectedOptions[0].textContent.trim();
        const idEstado = document.getElementById('estadoActivo').value.trim();
        const estado = document.getElementById('estadoActivo').selectedOptions[0].textContent.trim();



        // Verificar si todos los campos están llenos
        if (codigo && codigoTransaccion && numeroFormulario && idMarca && marca && idCategoria && categoria && idTipo && tipo
            && valorUnitarioActivos && idPreveedor && preveedor && numeroSerialActivos && idResponsable && responsable && idEstado && estado
        ) {
            const Activo = {
                codigo: codigo,
                codigoTransaccion: codigoTransaccion,
                numeroFormulario: numeroFormulario,
                idMarca: idMarca,
                marca: marca,
                idCategoria: idCategoria,
                categoria: categoria,
                idTipo: idTipo,
                tipo: tipo,
                valorUnitarioActivos: valorUnitarioActivos,
                idPreveedor: idPreveedor,
                preveedor: preveedor,
                numeroSerialActivos: numeroSerialActivos,
                idResponsable: idResponsable,
                responsable: responsable,
                idEstado: idEstado,
                estado: estado
            };

            // Agregar nuevo  de Activos
            addActivos(Activo)
                .then(response => {
                    console.log('Activos agregado:', response);
                    ActivosForm.reset(); // Limpiar el formulario después de agregar
                })
                .catch(error => console.error('Error al agregar Activos:', error));
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});

// Función para agregar un nuevo  de Activos
async function addActivos(Activo) {
    try {
        const response = await fetch('http://localhost:3000/activos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Activo),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error al agregar  de Activos.');
        }
    } catch (error) {
        console.error('Error al agregar  de Activos:', error);
        throw error;
    }
}

// Buscar y cargar los datos de un Activos para editar
async function editarActivos() {
    const codigo = document.getElementById('buscarEditarActivos').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/activos?codigo=${codigo}`);
            const Activos = await response.json();

            if (Activos.length > 0) {
                const ActivosEncontrado = Activos[0];
                document.getElementById('idEditarActivos').value = ActivosEncontrado.id;
                document.getElementById('codigoEditarActivos').value = ActivosEncontrado.codigo;
                document.getElementById('codTransaccionEditarActivos').value = ActivosEncontrado.codigoTransaccion;
                document.getElementById('numeroFormularioEditarActivos').value = ActivosEncontrado.numeroFormulario;
                const valor = (ActivosEncontrado.idMarca);
                document.getElementById('marcaEditarActivos').value = valor.toString();
                const valor2 = (ActivosEncontrado.idCategoria);
                document.getElementById('selectCategoriaEditarActivos').value = valor2.toString();
                const valor3 = (ActivosEncontrado.idTipo);
                document.getElementById('tipoEditarActivos').value = valor3.toString();
                document.getElementById('valorUnitarioEditarActivos').value = ActivosEncontrado.valorUnitarioActivos;
                const valor4 = (ActivosEncontrado.idPreveedor);
                document.getElementById('proveedorEditarActivos').value = valor4.toString();
                document.getElementById('numeroSerialEditarActivos').value = ActivosEncontrado.numeroSerialActivos;
                const valor5 = (ActivosEncontrado.idResponsable);
                document.getElementById('responsableEditarActivos').value = valor5.toString();
                const valor6 = (ActivosEncontrado.idEstado);
                document.getElementById('estadoEditarActivo').value = valor6.toString();

            } else {
                // Limpiar el formulario si no se encontraron resultados
                document.getElementById('idEditarActivos').value = '';
                document.getElementById('codigoEditarActivos').value = '';
                document.getElementById('codTransaccionEditarActivos').value = '';
                document.getElementById('numeroFormularioEditarActivos').value = '';
                document.getElementById('marcaEditarActivos').value = '';
                document.getElementById('selectCategoriaEditarActivos').value = '';
                document.getElementById('tipoEditarActivos').value = '';
                document.getElementById('valorUnitarioEditarActivos').value = '';
                document.getElementById('proveedorEditarActivos').value = '';
                document.getElementById('numeroSerialEditarActivos').value = '';
                document.getElementById('responsableEditarActivos').value = '';
                document.getElementById('estadoEditarActivo').value = '';
                alert('No se encontró un Activos con ese código.');
            }
        } catch (error) {
            console.error('Error al buscar y cargar Activos para editar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Guardar la edición de un Activos
async function guardarEdicionActivos() {
    const id = document.getElementById('idEditarActivos').value.trim();
    const codigo = document.getElementById('codigoEditarActivos').value.trim();
    const codigoTransaccion = document.getElementById('codTransaccionEditarActivos').value.trim();
    const numeroFormulario = document.getElementById('numeroFormularioEditarActivos').value.trim();
    const idMarca = document.getElementById('marcaEditarActivos').value.trim();
    const marca = document.getElementById('marcaEditarActivos').selectedOptions[0].textContent.trim();
    const idCategoria = document.getElementById('selectCategoriaEditarActivos').value.trim();
    const categoria = document.getElementById('selectCategoriaEditarActivos').selectedOptions[0].textContent.trim();
    const idTipo = document.getElementById('tipoEditarActivos').value.trim();
    const tipo = document.getElementById('tipoEditarActivos').selectedOptions[0].textContent.trim();
    const valorUnitarioEditarActivos = document.getElementById('valorUnitarioEditarActivos').value.trim();
    const idPreveedor = document.getElementById('proveedorEditarActivos').value.trim();
    const preveedor = document.getElementById('proveedorEditarActivos').selectedOptions[0].textContent.trim();
    const numeroSerialEditarActivos = document.getElementById('numeroSerialEditarActivos').value.trim();
    const idResponsable = document.getElementById('responsableEditarActivos').value.trim();
    const responsable = document.getElementById('responsableEditarActivos').selectedOptions[0].textContent.trim();
    const idEstado = document.getElementById('estadoEditarActivo').value.trim();
    const estado = document.getElementById('estadoEditarActivo').selectedOptions[0].textContent.trim();

    if (codigo && codigo && codigoTransaccion && numeroFormulario && idMarca && marca && idCategoria && categoria && idTipo && tipo && valorUnitarioEditarActivos && idPreveedor && preveedor && numeroSerialEditarActivos && idResponsable && responsable
        && idEstado && estado) {
        const data = {
            codigo, codigo, codigoTransaccion, numeroFormulario, idMarca, marca, idCategoria, categoria, idTipo, tipo, valorUnitarioEditarActivos,
            idPreveedor, preveedor, numeroSerialEditarActivos, idResponsable, responsable, idEstado, estado
        }; // Solo actualizamos nombre y email, el ID no se actualiza

        try {
            const response = await fetch(`http://localhost:3000/activos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Activos actualizado correctamente.');
            } else {
                throw new Error('Error al actualizar el Activos.');
            }
        } catch (error) {
            console.error('Error al guardar la edición del Activos:', error);
        }
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Buscar un Activos para eliminar
async function buscadorEliminarActivos() {
    const codigo = document.getElementById('buscadorEliminarActivos').value.trim();

    if (codigo) {
        try {
            const response = await fetch(`http://localhost:3000/activos?codigo=${codigo}`);
            const Activos = await response.json();

            const resultadoBusqueda = document.getElementById('resultado-busqueda-eliminar');
            resultadoBusqueda.innerHTML = '';

            if (Activos.length > 0) {
                const ActivosEncontrado = Activos[0];
                resultadoBusqueda.innerHTML = `
                <p> Activos encontrado:</p>
                <p>ID: ${ActivosEncontrado.codigo}</p>
                <p>Codigo de transaccion: ${ActivosEncontrado.codigoTransaccion}</p>
                <p>Numero de formulario: ${ActivosEncontrado.numeroFormulario}</p>
                <p>Marca : ${ActivosEncontrado.marca}</p>
                <p>Categoria : ${ActivosEncontrado.categoria}</p>
                <p>Tipo : ${ActivosEncontrado.tipo}</p>
                <p>Valor Unitario : ${ActivosEncontrado.valorUnitarioActivos}</p>
                <p>Proveedor : ${ActivosEncontrado.preveedor}</p>
                <p>Numero Serial : ${ActivosEncontrado.numeroSerialActivos}</p>
                <p>Empresa Responsable : ${ActivosEncontrado.responsable}</p>
                <p>Estado : ${ActivosEncontrado.estado}</p>
                <button type="button" class="btn btn-danger" onclick="eliminarActivos('${ActivosEncontrado.id}')">Eliminar</button>`;
            } else {
                resultadoBusqueda.textContent = 'No se encontró un Activo con ese ID.';
            }
        } catch (error) {
            console.error('Error al buscar Activo para eliminar:', error);
        }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}

// Eliminar un Activos
async function eliminarActivos(id) {
    fetch('http://localhost:3000/estados')
        .then(response => response.json())
        .then(estadosData => {
            // Encontrar el estado con código 0 (No asignado)
            const estadoDadoDeBaja = estadosData.find(estado => estado.codigo === "2");

            // Si se encontró el estado No asignado, hacer una solicitud a /activos
            if (estadoDadoDeBaja) {
                fetch(`http://localhost:3000/activos?id=${id}`)
                    .then(response => response.json())
                    .then(async activosData => {
                        // Filtrar los activos que tienen el estado No asignado
                        const activo = activosData.filter(activo => activo.idEstado === estadoDadoDeBaja.id);

                        if (activo && activo.length > 0) {
                            try {
                                const response = await fetch(`http://localhost:3000/activos/${activo[0].id}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                });
                    
                                if (response.ok) {
                                    alert('Activo eliminado correctamente.');
                                } else {
                                    throw new Error('Error al eliminar el Activo.');
                                }
                            } catch (error) {
                                console.error('Error al eliminar Activo:', error);
                            }
                        } else {
                            alert('No es posible eliminar este activo.');
                        }
                    })
                    .catch(error => console.error('Error al obtener datos de activo:', error));
            } else {
                console.log("No se encontró el estado 'No asignado'.");
            }
        })
        .catch(error => console.error('Error al obtener datos de estados:', error));
}