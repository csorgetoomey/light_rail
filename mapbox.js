
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
    map.addSource('2017polygon', {
        'type': 'geojson',
        'data': 'GEOJSONS/tac_bg_2017.geojson'
    });
    map.addLayer({
        "id":"Polygon2017",
        "type":"fill",
        "source":"2017polygon",
        "paint": {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'comp_z_score'],
                -0.774240, '#d7191c',
                -0.234561, '#fdae61',
                0.233785, '#ffffbf',
                0.867497, '#a6d96a',
                2.292498, '#1a9641',
                ]
        }
    });
    map.addSource('2017points', {
        'type': 'geojson',
        'data': 'GEOJSONS/tac_stations_2017.geojson'
    });
    map.addLayer({
        "id":"Points2017",
        "type":"circle",
        "source":"2017points",
        "paint": {
            'circle-color': 'red'
        }
    });
});

map.on('click', 'Polygon2017', function (e) {
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML("hello")
        .addTo(map);
});

//from https://gis.stackexchange.com/questions/198896/mapbox-gljs-group-layers
//whatever layers you want to toggle go in to this function
toggleLayer(['Points2017', 'Polygon2017'], '2017 Rail');

function toggleLayer(ids, name) {
    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = name;

    link.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        for (layers in ids){
            var visibility = map.getLayoutProperty(ids[layers], 'visibility');
            if (visibility === 'visible') {
                map.setLayoutProperty(ids[layers], 'visibility', 'none');
                this.className = '';
            } else {
                this.className = 'active';
                map.setLayoutProperty(ids[layers], 'visibility', 'visible');
            }
         }
    };
    var layers = document.getElementById('menu');
    layers.appendChild(link);
}
