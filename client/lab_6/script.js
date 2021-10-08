async function windowActions()  {
        
    const endpoint ='https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
    const searchInput = document.getElementById('searchbar');
    const suggestions = document.querySelector('.suggestions');
    
        const request = await fetch(endpoint);
        const restaurants = await request.json()

        

        function findMatches(wordToMatch, restaurants){
            return restaurants.filter(place =>{
            const regex = new RegExp(wordToMatch, 'gi')
            return place.name.match(regex)
            })
        }
        
        function displayMatches(event) {
            const matchArray = findMatches(event.target.value, restaurants);
            const html = matchArray.map(place => {
                const regex = new RegExp(this.value,'gi');
                const restName = place.name.replace(regex, `<span class="hl">${this.value}</span>`)

                return `
                <li>
                    <span class = 'name'>${place.name}</span><br>
                    <span class = 'name'>${place.category}</span><br>
                    <span class = 'name'>${place.address_line_1}</span><br>
                    <span class = 'name'>${place.city}</span><br>
                    <span class = 'name'>${place.zip}</span>
                </li>
            `;
            }).join('');
            suggestions.innerHTML = html;
        }
        searchInput.addEventListener('change', displayMatches);
        searchInput.addEventListener('keyup', (evt => {displayMatches(evt)}));

        
}

window.onload = windowActions;