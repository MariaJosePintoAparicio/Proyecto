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

// Ejecutar la función al cargar el archivo
window.addEventListener('load', cargarOpcionesDesdeServicio);