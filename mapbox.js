
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
// map.on('load', function() {
//     map.addLayer({
//         "id":"reduced_risk",
//         "type":"fill",
//         "source":{
//             type: 'vector',
//             url: 'mapbox://csorge.4wdg47x6'
//         },
//         'source-layer': 'reduced_flood_risk-2i9a97',
//         "paint": {
//             "fill-color": "#EFF3FF",
//             "fill-opacity": .9
//         }
//     });
//     map.addLayer({
//         "id":"coastal",
//         "type":"fill",
//         "source":{
//             type: 'vector',
//             url: 'mapbox://csorge.5wqgvyhn'
//         },
//         'source-layer': 'coastal_flood_zone-1jktwd',
//         "paint": {
//             "fill-color": "#6BAED6",
//             "fill-opacity": .9
//         }
//     });
//     map.addLayer({
//         "id":"base_zone",
//         "type":"fill",
//         "source":{
//             type: 'vector',
//             url: 'mapbox://csorge.bd6ekzso'
//         },
//         'source-layer': 'base_flood_zone-6fnvbr',
//         "paint": {
//             "fill-color": "#2171B5",
//             "fill-opacity": .9
//         }
//     });
//     map.addLayer({
//         "id":"02_pct",
//         "type":"fill",
//         "source":{
//             type: 'vector',
//             url: 'mapbox://csorge.9m2ir9yn'
//         },
//         'source-layer': '02_pct_flood_chance-0u8ckl',
//         "paint": {
//             "fill-color": "#BDD7E7",
//             "fill-opacity": .9
//         }
//     });
//     map.addSource('pop', {
//         'type': 'geojson',
//         'data': 'GEOJSONS/block_group_points.geojson'
//     });
//     map.addLayer({
//         "id":"Population",
//         "type":"circle",
//         "source":"pop",
//         "paint": {
//             'circle-radius': [
//                 'interpolate', ['linear'], ['zoom'],
//                 10, ['/', ['get', 'total_int'], 250],
//                 16, ['/', ['get', 'total_int'], 100],
//             ],
//             "circle-color": "#ff0000",
//             "circle-opacity": .7,
//             "circle-stroke-color": "black",
//             "circle-stroke-width": 1
//         }
//     });
//     map.addSource('evac', {
//         'type': 'geojson',
//         'data': 'GEOJSONS/evacuation_spots.geojson'
//     });
//     map.addLayer({
//         "id":"Evacuation Spots",
//         "type":"circle",
//         "source":"evac",
//         "paint": {
//             "circle-radius": 10,
//             "circle-color": "#008000",
//             "circle-opacity": .7
//         }
//     });
// });

// var toggleableLayerIds = [ 'Evacuation Spots', 'Population' ];
//
// for (var i = 0; i < toggleableLayerIds.length; i++) {
//     var id = toggleableLayerIds[i];
//
//     var link = document.createElement('a');
//     link.href = '#';
//     link.className = 'active';
//     link.textContent = id;
//
//     link.onclick = function (e) {
//         var clickedLayer = this.textContent;
//         e.preventDefault();
//         e.stopPropagation();
//
//         var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
//
//         if (visibility === 'visible') {
//             map.setLayoutProperty(clickedLayer, 'visibility', 'none');
//             this.className = '';
//         } else {
//             this.className = 'active';
//             map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
//         }
//     };
//
//     var layers = document.getElementById('menu');
//     layers.appendChild(link);
// }


map.on('click', function (e) {
    console.log(e);
});
