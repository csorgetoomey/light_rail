
mapboxgl.accessToken = 'pk.eyJ1IjoiY3NvcmdlIiwiYSI6ImNqb3A2cGMwMzAxbTkzcW9meDIzMDE0ZHMifQ.R5gWO0aBEldQdqU0Nlir-Q';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/csorge/cjvhhz99w0jnm1cq3per2445t',
    center: [-122.433881, 47.241519],
    zoom: 12,
    minZoom: 10,
});

map.addControl(new mapboxgl.NavigationControl());

//load geojsons
map.on('load', function() {
    map.addSource('2010', {
        'type': 'geojson',
        'data': 'GEOJSONS/tac_2010_data.geojson'
    });
    map.addLayer({
        "id":"2010Data",
        "type":"fill",
        "source":"2010"
    });
});

map.on('click', '2010Data', function (e) {
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML("hello")
        .addTo(map);
});

map.on('mouseleave', '2010Data', function() {
    map.getCanvas().style.cursor = '';
    popup.remove();
});

var toggleableLayerIds = [ '2010 Data', ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}


// map.on('click', function (e) {
//     console.log(e);
// });
