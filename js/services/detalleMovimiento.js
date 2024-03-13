document.addEventListener('DOMContentLoaded', function () {
    const detalleMovimiento = document.getElementById('detalleMovimiento');

    // Manejar el envío del formulario
    detalleMovimiento.addEventListener('submit', async function (event) {
        event.preventDefault(); // Detener el envío del formulario

        // Obtener valores del formulario
        const codigo = document.getElementById('codigoAsignarActivo').value.trim();
        const fecha = document.getElementById('fechaAsignarActivo').value.trim();
        const idPersona = document.getElementById('personaAsignarActivo').value.trim();
        const persona = document.getElementById('personaAsignarActivo').selectedOptions[0].textContent.trim();
        const idActivo = document.getElementById('selectAsignarActivo').value.trim();
        const activo = document.getElementById('selectAsignarActivo').selectedOptions[0].textContent.trim();
        const comentario = document.getElementById('comentarioAsignarActivo').value.trim();

        // Verificar si todos los campos están llenos
        if (codigo && fecha && idPersona && persona && idActivo && activo && comentario) {
            const Activo = {
                codigo: codigo,
                fecha: fecha,
                idPersona: idPersona,
                persona: persona,
                idActivo: idActivo,
                activo: activo,
                comentario: comentario
            };

            try {
                // Agregar una nueva asignacion
                const response = await fetch('http://localhost:3000/detalleMovimiento', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(Activo),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Asignacion agregada:', responseData);
                    detalleMovimiento.reset(); // Limpiar el formulario después de agregar
                } else {
                    throw new Error('Error al agregar la asignacion.');
                }
            } catch (error) {
                console.error('Error al agregar la asignacion:', error);
                // Manejar el error como desees, por ejemplo, mostrar un mensaje al usuario
                alert('Error al agregar la asignacion. Por favor, inténtalo de nuevo.');
            }
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});


async function actualizarActivo(id) {
    fetch('http://localhost:3000/estados')
        .then(response => response.json())
        .then(async estadosData => {
            // Encontrar el estado con código 0 (No asignado)
            const estadoAsignado = estadosData.find(estado => estado.codigo === "1");

            // Si se encontró el estado No asignado, hacer una solicitud a /activos
            if (estadoAsignado) {
                const response = await fetch(`http://localhost:3000/activos?id=${id}`);
                const activo = await response.json();
                activo[0].idEstado = estadoAsignado.id
                try {
                    const response = await fetch(`http://localhost:3000/activos/${activo[0].id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(activo[0]),
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
                console.log("No se encontró el estado 'No asignado'.");
            }
        })
        .catch(error => console.error('Error al obtener datos de estados:', error));
}