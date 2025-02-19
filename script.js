document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const queryInput = document.getElementById('query');
    const resultadosContainer = document.getElementById('resultados');
    const alertaDiv = document.getElementById('alerta');

    // Limpia el mensaje de alerta al iniciar
    alertaDiv.textContent = '';

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = queryInput.value.trim();
        if (!query) return;

        alertaDiv.textContent = 'Buscando...';

        try {
            // Se asume que el endpoint de búsqueda es /search y recibe el parámetro "query"
            const response = await fetch(`https://sdnlist-production.up.railway.app/search?query=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Error en la consulta');
            }
            const data = await response.json();

            // Limpia resultados anteriores
            resultadosContainer.innerHTML = '';

            if (data && data.length > 0) {
                alertaDiv.textContent = `Se encontraron ${data.length} cantidad de similares`;
                data.forEach(individual => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'grid-item p-4 border border-gray-300 rounded shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400';
                    itemDiv.tabIndex = 0;

                    // Nombre del individuo
                    const name = document.createElement('h2');
                    name.className = 'text-xl font-bold mb-2';
                    name.textContent = individual.Nombre || '';

                    // Nacionalidad
                    const nationality = document.createElement('p');
                    nationality.className = 'mb-1';
                    nationality.innerHTML = `<span class="font-semibold">Nacionalidad:</span> ${individual.Nacionalidad || ''}`;

                    // Aliases
                    const aliases = document.createElement('p');
                    const aliasText = individual.Aliases ? individual.Aliases.join(', ') : '';
                    aliases.innerHTML = `<span class="font-semibold">Aliases:</span> ${aliasText}`;

                    itemDiv.appendChild(name);
                    itemDiv.appendChild(nationality);
                    itemDiv.appendChild(aliases);
                    resultadosContainer.appendChild(itemDiv);
                });
            } else {
                alertaDiv.textContent = 'No se encontraron individuos similares';
            }
        } catch (error) {
            console.error(error);
            alertaDiv.textContent = 'Error al conectar con la API';
        }
    });
});