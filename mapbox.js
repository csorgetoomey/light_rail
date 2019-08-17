
mapboxgl.accessToken = 'pk.eyJ1IjoiY3NvcmdlIiwiYSI6ImNqb3A2cGMwMzAxbTkzcW9meDIzMDE0ZHMifQ.R5gWO0aBEldQdqU0Nlir-Q';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/csorge/cjvhhz99w0jnm1cq3per2445t',
    center: [-122.433881, 47.241519],
    zoom: 12,
    minZoom: 10,
});

map.addControl(new mapboxgl.NavigationControl());

var popup = new mapboxgl.Popup({
    closeButton: false
});

var veryHigh = "D7191C"
var high = "FDAE61"
var moderate = "FFFFBF"
var low = "ABDDA4"
var veryLow = "2B83BA"

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
                -0.478213, veryHigh,
                -0.167167, high,
                0.066339, moderate,
                0.473942, low,
                2.292498, veryLow,
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
            'circle-color': 'black'
        }
    });

    map.addSource('2022polygon', {
        'type': 'geojson',
        'data': 'GEOJSONS/tac_bg_2022.geojson'
    });
    map.addLayer({
        "id":"Polygon2022",
        "type":"fill",
        "source":"2022polygon",
        'layout': {
            'visibility': 'none'
        },
        "paint": {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'comp_z_score'],
                -0.543172, '#d7191c',
                -0.179957, '#fdae61',
                0.064798, '#ffffbf',
                0.416939, '#a6d96a',
                2.210599, '#1a9641'
            ]
        }
    });
    map.addSource('2022points', {
        'type': 'geojson',
        'data': 'GEOJSONS/tac_stations_2022.geojson'
    });
    map.addLayer({
        "id":"Points2022",
        "type":"circle",
        "source":"2022points",
        'layout': {
            'visibility': 'none'
        },
        "paint": {
            'circle-color': 'black'
        }
    });

    map.addSource('2030polygon', {
        'type': 'geojson',
        'data': 'GEOJSONS/tac_bg_2030.geojson'
    });
    map.addLayer({
        "id":"Polygon2030",
        "type":"fill",
        "source":"2030polygon",
        'layout': {
            'visibility': 'none'
        },
        "paint": {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'comp_z_score'],
                -0.532609, '#d7191c',
                -0.167353, '#fdae61',
                0.063728, '#ffffbf',
                0.415650, '#a6d96a',
                2.225400, '#1a9641'
            ]
        }
    });
    map.addSource('2030points', {
        'type': 'geojson',
        'data': 'GEOJSONS/tac_stations_2030.geojson'
    });
    map.addLayer({
        "id":"Points2030",
        "type":"circle",
        "source":"2030points",
        'layout': {
            'visibility': 'none'
        },
        "paint": {
            'circle-color': 'black'
        }
    });

    map.addSource('2039polygon', {
        'type': 'geojson',
        'data': 'GEOJSONS/tac_bg_2039.geojson'
    });
    map.addLayer({
        "id":"Polygon2039",
        "type":"fill",
        "source":"2039polygon",
        'layout': {
            'visibility': 'none'
        },
        "paint": {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'comp_z_score'],
                -0.490952, '#d7191c',
                -0.197604, '#fdae61',
                0.063232, '#ffffbf',
                0.464118, '#a6d96a',
                2.294784, '#1a9641'
            ]
        }
    });
    map.addSource('2039points', {
        'type': 'geojson',
        'data': 'GEOJSONS/tac_stations_2039.geojson'
    });
    map.addLayer({
        "id":"Points2039",
        "type":"circle",
        "source":"2039points",
        'layout': {
            'visibility': 'none'
        },
        "paint": {
            'circle-color': 'black'
        }
    });

});

hoverPopups("Points2017")
hoverPopups("Points2022")
hoverPopups("Points2030")
hoverPopups("Points2039")

function hoverPopups(id) {
    //from https://stackoverflow.com/questions/45841086/show-popup-on-hover-mapbox
    map.on('mousemove', id, function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        // Single out the first found feature.
        var feature = e.features[0];
        // Display a popup with the name of the county
        popup.setLngLat(e.lngLat)
            .setText(feature.properties.NAME)
            .addTo(map);
    });

    map.on('mouseleave', id, function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

}

//from https://gis.stackexchange.com/questions/198896/mapbox-gljs-group-layers
toggleLayer(['Points2017', 'Polygon2017'], '2017 Rail', 'active');
toggleLayer(['Points2022', 'Polygon2022'], '2022 Rail', '');
toggleLayer(['Points2030', 'Polygon2030'], '2030 Rail', '');
toggleLayer(['Points2039', 'Polygon2039'], '2039 Rail', '');

function toggleLayer(ids, name, initActive) {
    var link = document.createElement('a');
    link.href = '#';
    link.className = initActive;
    link.textContent = name;

    link.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        for (layers in ids) {
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
