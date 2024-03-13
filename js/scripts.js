// Función para manejar el clic en el botón de alternar barra lateral
const sidebarToggle = document.querySelector("#sidebar-toggle");
sidebarToggle.addEventListener("click", function () {
    document.querySelector("#sidebar").classList.toggle("collapsed");
});

function cargarOpcionesDesdeServicio() {
    const selectForm = document.getElementById('tipoPersonaPersona');
    const selectForm2 = document.getElementById('tipoPersonaEditarPersona');


    fetch('http://localhost:3000/tipoPersona')
        .then(response => response.json())
        .then(data => {
            selectForm.innerHTML = '';
            selectForm2.innerHTML = '';
            // Agregar opción vacía
            const emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.textContent = 'Seleccione una opción';
            const emptyOption2 = document.createElement('option');
            emptyOption2.value = '';
            emptyOption2.textContent = 'Seleccione una opción';
            selectForm.appendChild(emptyOption);
            selectForm2.appendChild(emptyOption2);
            // Agregar opciones desde el servicio
            data.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.nombre;
                const optionElement2 = document.createElement('option');
                optionElement2.value = option.id;
                optionElement2.textContent = option.nombre;
                selectForm.appendChild(optionElement);
                selectForm2.appendChild(optionElement2);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            selectForm.innerHTML = '<option selected>Error al cargar opciones</option>';
            selectForm2.innerHTML = '<option selected>Error al cargar opciones</option>';
        });
}

function cargarOpcionesResponsables() {
    const selectForm = document.getElementById('responsableTelefonoPersona');
    const selectForm2 = document.getElementById('editarResponsableTelefonoPersona');
    const selectForm3 = document.getElementById('responsableHistorialActivo');
    const selectForm4 = document.getElementById('editarResponsableHistorialActivo');
    const selectForm5 = document.getElementById('responsableAsignacion');
    const selectForm6 = document.getElementById('personaAsignarActivo');


    fetch('http://localhost:3000/personas')
        .then(response => response.json())
        .then(data => {
            selectForm.innerHTML = '';
            selectForm2.innerHTML = '';
            selectForm3.innerHTML = '';
            selectForm4.innerHTML = '';
            selectForm5.innerHTML = '';
            selectForm6.innerHTML = '';
            // Agregar opción vacía
            const emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.textContent = 'Seleccione una opción';
            const emptyOption2 = document.createElement('option');
            emptyOption2.value = '';
            emptyOption2.textContent = 'Seleccione una opción';
            const emptyOption3 = document.createElement('option');
            emptyOption3.value = '';
            emptyOption3.textContent = 'Seleccione una opción';
            const emptyOption4 = document.createElement('option');
            emptyOption4.value = '';
            emptyOption4.textContent = 'Seleccione una opción';
            const emptyOption5 = document.createElement('option');
            emptyOption5.value = '';
            emptyOption5.textContent = 'Seleccione una opción';
            const emptyOption6 = document.createElement('option');
            emptyOption6.value = '';
            emptyOption6.textContent = 'Seleccione una opción';
            selectForm.appendChild(emptyOption);
            selectForm2.appendChild(emptyOption2);
            selectForm3.appendChild(emptyOption3);
            selectForm4.appendChild(emptyOption4);
            selectForm5.appendChild(emptyOption5);
            selectForm6.appendChild(emptyOption6);
            // Agregar opciones desde el servicio
            data.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.nombre;
                const optionElement2 = document.createElement('option');
                optionElement2.value = option.id;
                optionElement2.textContent = option.nombre;
                const optionElement3 = document.createElement('option');
                optionElement3.value = option.id;
                optionElement3.textContent = option.nombre;
                const optionElement4 = document.createElement('option');
                optionElement4.value = option.id;
                optionElement4.textContent = option.nombre;
                const optionElement5 = document.createElement('option');
                optionElement5.value = option.id;
                optionElement5.textContent = option.nombre;
                const optionElement6 = document.createElement('option');
                optionElement6.value = option.id;
                optionElement6.textContent = option.nombre;
                selectForm.appendChild(optionElement);
                selectForm2.appendChild(optionElement2);
                selectForm3.appendChild(optionElement3);
                selectForm4.appendChild(optionElement4);
                selectForm5.appendChild(optionElement5);
                selectForm6.appendChild(optionElement6);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            selectForm.innerHTML = '<option selected>Error al cargar opciones</option>';
            selectForm2.innerHTML = '<option selected>Error al cargar opciones</option>';
            selectForm3.innerHTML = '<option selected>Error al cargar opciones</option>';
            selectForm4.innerHTML = '<option selected>Error al cargar opciones</option>';
            selectForm5.innerHTML = '<option selected>Error al cargar opciones</option>';
            selectForm6.innerHTML = '<option selected>Error al cargar opciones</option>';
        });
}

function cargarOpcionesMarcas() {
    const selectForm = document.getElementById('marcaActivos');
    const selectForm2 = document.getElementById('marcaEditarActivos');

    fetch('http://localhost:3000/marcas')
        .then(response => response.json())
        .then(data => {
            selectForm.innerHTML = '';
            selectForm2.innerHTML = '';
            // Agregar opción vacía
            const emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.textContent = 'Seleccione una opción';
            selectForm.appendChild(emptyOption);
            const emptyOption2 = document.createElement('option');
            emptyOption2.value = '';
            emptyOption2.textContent = 'Seleccione una opción';
            selectForm2.appendChild(emptyOption2);
            // Agregar opciones desde el servicio
            data.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.nombre;
                selectForm.appendChild(optionElement);
                const optionElement2 = document.createElement('option');
                optionElement2.value = option.id;
                optionElement2.textContent = option.nombre;
                selectForm2.appendChild(optionElement2);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            selectForm.innerHTML = '<option selected>Error al cargar opciones</option>';
            selectForm2.innerHTML = '<option selected>Error al cargar opciones</option>';
        });
}

function cargarOpcionesCategoria() {
    const selectForm = document.getElementById('selectCategoriaActivos');
    const selectForm2 = document.getElementById('selectCategoriaEditarActivos');

    fetch('http://localhost:3000/categoriaActivo')
        .then(response => response.json())
        .then(data => {
            selectForm.innerHTML = '';
            selectForm2.innerHTML = '';
            // Agregar opción vacía
            const emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.textContent = 'Seleccione una opción';
            selectForm.appendChild(emptyOption);
            const emptyOption2 = document.createElement('option');
            emptyOption2.value = '';
            emptyOption2.textContent = 'Seleccione una opción';
            selectForm2.appendChild(emptyOption2);
            // Agregar opciones desde el servicio
            data.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.nombre;
                selectForm.appendChild(optionElement);
                const optionElement2 = document.createElement('option');
                optionElement2.value = option.id;
                optionElement2.textContent = option.nombre;
                selectForm2.appendChild(optionElement2);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            selectForm.innerHTML = '<option selected>Error al cargar opciones</option>';
            selectForm2.innerHTML = '<option selected>Error al cargar opciones</option>';
        });
}

function cargarOpcionestipoActivos() {
    const selectForm = document.getElementById('tipoActivos');
    const selectForm2 = document.getElementById('tipoEditarActivos');

    fetch('http://localhost:3000/tipoActivo')
        .then(response => response.json())
        .then(data => {
            selectForm.innerHTML = '';
            selectForm2.innerHTML = '';
            // Agregar opción vacía
            const emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.textContent = 'Seleccione una opción';
            selectForm.appendChild(emptyOption);
            const emptyOption2 = document.createElement('option');
            emptyOption2.value = '';
            emptyOption2.textContent = 'Seleccione una opción';
            selectForm2.appendChild(emptyOption2);
            // Agregar opciones desde el servicio
            data.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.nombre;
                selectForm.appendChild(optionElement);
                const optionElement2 = document.createElement('option');
                optionElement2.value = option.id;
                optionElement2.textContent = option.nombre;
                selectForm2.appendChild(optionElement2);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            selectForm.innerHTML = '<option selected>Error al cargar opciones</option>';
            selectForm2.innerHTML = '<option selected>Error al cargar opciones</option>';
        });
}

function cargarOpcionesProveedores() {
    const selectForm = document.getElementById('proveedorActivos');
    const selectForm2 = document.getElementById('proveedorEditarActivos');

    fetch('http://localhost:3000/proveedor')
        .then(response => response.json())
        .then(data => {
            selectForm.innerHTML = '';
            selectForm2.innerHTML = '';
            // Agregar opción vacía
            const emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.textContent = 'Seleccione una opción';
            selectForm.appendChild(emptyOption);
            const emptyOption2 = document.createElement('option');
            emptyOption2.value = '';
            emptyOption2.textContent = 'Seleccione una opción';
            selectForm2.appendChild(emptyOption2);
            // Agregar opciones desde el servicio
            data.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.nombre;
                selectForm.appendChild(optionElement);
                const optionElement2 = document.createElement('option');
                optionElement2.value = option.id;
                optionElement2.textContent = option.nombre;
                selectForm2.appendChild(optionElement2);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            selectForm.innerHTML = '<option selected>Error al cargar opciones</option>';
            selectForm2.innerHTML = '<option selected>Error al cargar opciones</option>';
        });
}

function cargarOpcionesEstados() {
    const selectForm = document.getElementById('estadoActivo');
    const selectForm2 = document.getElementById('buscarEditarActivos');

    fetch('http://localhost:3000/estados')
        .then(response => response.json())
        .then(data => {
            selectForm.innerHTML = '';
            selectForm2.innerHTML = '';
            // Agregar opción vacía
            const emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.textContent = 'Seleccione una opción';
            selectForm.appendChild(emptyOption);
            const emptyOption2 = document.createElement('option');
            emptyOption2.value = '';
            emptyOption2.textContent = 'Seleccione una opción';
            selectForm2.appendChild(emptyOption2);
            // Agregar opciones desde el servicio
            data.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.nombre;
                selectForm.appendChild(optionElement);
                const optionElement2 = document.createElement('option');
                optionElement2.value = option.id;
                optionElement2.textContent = option.nombre;
                selectForm2.appendChild(optionElement2);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            selectForm.innerHTML = '<option selected>Error al cargar opciones</option>';
            selectForm2.innerHTML = '<option selected>Error al cargar opciones</option>';
        });
}

function cargarOpcionesEmpresas() {
    const selectForm = document.getElementById('responsableActivos');
    const selectForm2 = document.getElementById('responsableEditarActivos');

    fetch('http://localhost:3000/empresas')
        .then(response => response.json())
        .then(data => {
            selectForm.innerHTML = '';
            selectForm2.innerHTML = '';
            // Agregar opción vacía
            const emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.textContent = 'Seleccione una opción';
            selectForm.appendChild(emptyOption);
            const emptyOption2 = document.createElement('option');
            emptyOption2.value = '';
            emptyOption2.textContent = 'Seleccione una opción';
            selectForm2.appendChild(emptyOption2);
            // Agregar opciones desde el servicio
            data.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.nombre;
                selectForm.appendChild(optionElement);
                const optionElement2 = document.createElement('option');
                optionElement2.value = option.id;
                optionElement2.textContent = option.nombre;
                selectForm2.appendChild(optionElement2);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            selectForm.innerHTML = '<option selected>Error al cargar opciones</option>';
            selectForm2.innerHTML = '<option selected>Error al cargar opciones</option>';
        });
}

function cargarActivosDisponibles() {
    const selectForm = document.getElementById('selectAsignarActivo');

    fetch('http://localhost:3000/estados')
        .then(response => response.json())
        .then(estadosData => {
            // Encontrar el estado con código 0 (No asignado)
            const estadoNoAsignado = estadosData.find(estado => estado.codigo === "0");

            // Si se encontró el estado No asignado, hacer una solicitud a /activos
            if (estadoNoAsignado) {
                fetch('http://localhost:3000/activos')
                    .then(response => response.json())
                    .then(activosData => {
                        // Filtrar los activos que tienen el estado No asignado
                        const activosDisponibles = activosData.filter(activo => activo.idEstado === estadoNoAsignado.id);
                        selectForm.innerHTML = '';
                        // Agregar opción vacía
                        const emptyOption = document.createElement('option');
                        emptyOption.value = '';
                        emptyOption.textContent = 'Seleccione una opción';
                        selectForm.appendChild(emptyOption);
                        // Agregar opciones desde el servicio
                        activosDisponibles.forEach(option => {
                            const optionElement = document.createElement('option');
                            optionElement.value = option.id;
                            optionElement.textContent = option.tipo + ' - ' + option.marca;
                            selectForm.appendChild(optionElement);
                        });
                        // Mostrar la lista de activos disponibles
                        // console.log("Activos disponibles:");
                        // activosDisponibles.forEach(activo => {
                        //     console.log(`ID: ${activo.id}, Código: ${activo.codigo}, Marca: ${activo.marca}, Tipo: ${activo.tipo}`);
                        // });

                    })
                    .catch(error => console.error('Error al obtener datos de activos:', error));
            } else {
                console.log("No se encontró el estado 'No asignado'.");
            }
        })
        .catch(error => console.error('Error al obtener datos de estados:', error));
}


// Ejecutar la función al cargar el archivo
window.addEventListener('load', cargarOpcionesDesdeServicio);
window.addEventListener('load', cargarOpcionesResponsables);
window.addEventListener('load', cargarOpcionesMarcas);
window.addEventListener('load', cargarOpcionesCategoria);
window.addEventListener('load', cargarOpcionestipoActivos);
window.addEventListener('load', cargarOpcionesProveedores);
window.addEventListener('load', cargarOpcionesEstados);
window.addEventListener('load', cargarOpcionesEmpresas);
window.addEventListener('load', cargarActivosDisponibles);

