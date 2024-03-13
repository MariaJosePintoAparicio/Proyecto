// Manejar el evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function () {
    const AsignacionForm = document.getElementById('AsignacionForm');

    // Manejar el envío del formulario
    AsignacionForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Detener el envío del formulario

        // Obtener valores del formulario
        const codigo = document.getElementById('codigoCrearAsignacion').value.trim();
        const fecha = document.getElementById('fechaCrearAsignacion').value.trim();
        const idPersona = document.getElementById('responsableAsignacion').value.trim();
        const persona = document.getElementById('responsableAsignacion').selectedOptions[0].textContent.trim();



        // Verificar si todos los campos están llenos
        if (codigo && fecha && idPersona && persona) {
            const Activo = {
                codigo: codigo,
                fecha: fecha,
                idPersona: idPersona,
                persona: persona
            };

            // Agregar una nueva asignacion
            addAsignacion(Activo)
                .then(response => {
                    console.log('Asignacion agregado:', response);
                    AsignacionForm.reset(); // Limpiar el formulario después de agregar
                })
                .catch(error => console.error('Error al agregar la asignacion:', error));
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});

// Función para agregar una nueva asignacion
async function addAsignacion(Activo) {
    try {
        const response = await fetch('http://localhost:3000/asignacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Activo),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error al agregar la asignacion.');
        }
    } catch (error) {
        console.error('Error al agregar la asignacion:', error);
        throw error;
    }
}

// Buscar y mostrar una asignacion
async function buscarAsignarActivo() {
    const codigoResponsable = document.getElementById('buscarAsignarActivo').value.trim();
    const resultadoBusqueda = document.getElementById('resultadoBuscarAsignarActivo');
    resultadoBusqueda.innerHTML = '';

    if (codigoResponsable) {
        fetch('http://localhost:3000/personas')
            .then(response => response.json())
            .then(personasData => {
                // Verificar si el codigoResponsable está presente en los datos de personas
                const responsableEnPersonas = personasData.find(persona => persona.codigo === codigoResponsable);
                if (responsableEnPersonas) {
                    // Si el código del responsable está en las personas, hacer una solicitud a /asignacion
                    fetch('http://localhost:3000/asignacion')
                        .then(response => response.json())
                        .then(asignacionData => {
                            // Verificar si el código del responsable está presente en los datos de asignación
                            const responsableEnAsignacion = asignacionData.find(asignacion => asignacion.idPersona === responsableEnPersonas.id);
                            if (responsableEnAsignacion) {
                                resultadoBusqueda.textContent = `El código ${codigoResponsable} coincide con un registro en personas y asignacion.`;
                                formularioAsignarActivo.classList.remove('d-none');
                                document.getElementById('idAsignarActivo').value = responsableEnAsignacion.id;
                                const valor = (responsableEnAsignacion.idPersona);
                                document.getElementById('personaAsignarActivo').value = valor.toString();
                            } else {
                                resultadoBusqueda.textContent = `El código ${codigoResponsable} coincide con un registro en personas, pero no en asignacion.`;
                                document.getElementById('idAsignarActivo').value  = '';
                                document.getElementById('personaAsignarActivo').value  = '';
                            }
                        })
                        .catch(error => console.error('Error al obtener datos de asignacion:', error));
                } else {
                    resultadoBusqueda.textContent = `El código ${codigoResponsable} no coincide con ningún registro en personas.`;
                }
            })
            .catch(error => console.error('Error al obtener datos de personas:', error));
        // try {
        //     const response = await fetch(`http://localhost:3000/asignacion?codigo=${codigoResponsable}`);
        //     const Activos = await response.json();


        //     if (Activos.length > 0) {
        //         const ActivosEncontrado = Activos[0];
        //         resultadoBusqueda.innerHTML = `
        //         <p> Activos encontrado:</p>
        //         <p>ID: ${ActivosEncontrado.codigo}</p>
        //         <p>Numero: ${ActivosEncontrado.numero}</p>
        //         <p>Ubicacion: ${ActivosEncontrado.ubicacion}</p>
        //         <p>Responsable: ${ActivosEncontrado.persona}</p>`;
        //     } else {
        //         resultadoBusqueda.textContent = 'No se encontraron Activos con ese ID.';
        //     }
        // } catch (error) {
        //     console.error('Error al buscar el activo:', error);
        // }
    } else {
        alert('Por favor, ingrese un código para buscar.');
    }
}
