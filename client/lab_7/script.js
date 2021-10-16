const mymap = L.map('mapid').setView([51.505, -0.09], 13);

function mapInit() {
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwbGVibHVlcyIsImEiOiJja3VzZnlpM3k1ZTZnMzBtYTE1NGJrbzM1In0.IzwgHQe4-vsiNfU8vcKpuQ'
  }).addTo(mymap);
}

async function dataHandler() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const searchInput = document.getElementById('searchbar');
  const suggestions = document.querySelector('.suggestions');

  const request = await fetch(endpoint);
  const restaurants = await request.json();

  function findMatches(wordToMatch, restaurants) {
    return restaurants.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, restaurants);
    const html = matchArray.map((place) => {
      const regex = new RegExp(this.value, 'gi');
      const zipCode = place.zip.replace(regex, `<span class="hl">${this.value}</span>`);

      return `
                <li>
                    <b><span class = 'name'>${place.name}</span></b><br>
                    <span class = 'name'>${place.address_line_1}</span><br>
                </li>
            `;
    }).join('');

    newArray = matchArray.slice(0, 5);
    newPlace = newArray[0].geocoded_column_1.coordinates.reverse();
    mymap.setView(newPlace, 13);

    const fiveMarkers = newArray.map((restaurant) => {
      const marker = L.marker(restaurant.geocoded_column_1.coordinates.reverse()).addTo(mymap);
    });

    suggestions.innerHTML = html;
  }

  searchInput.addEventListener('input', displayMatches);

  searchInput.addEventListener('input', function() {
    if (this.value === '') {
      suggestions.innerHTML = '';
    }
  });
}

mapInit();
window.onload = dataHandler();