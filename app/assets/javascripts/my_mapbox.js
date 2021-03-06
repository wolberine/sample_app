$(function() {

var map = L.mapbox.map('map', 'examples.map-20v6611k')
    .setView([42.338249, -83.054153], 11);


// Generate a GeoJSON line: you can load GeoJSON via AJAX, or
// generate it some other way
var geojson = { type: 'LineString', coordinates: [] },
    start = [10, 20],
    momentum = [3, 3];
for (var i = 0; i < 300; i++) {
    start[0] += momentum[0];
    start[1] += momentum[1];
    if (start[1] > 60 || start[1] < -60) momentum[1] *= -1;
    if (start[0] > 170 || start[0] < -170) momentum[0] *= -1;
    geojson.coordinates.push(start.slice());
}

var geojsonLayer = L.geoJson(geojson).addTo(map),
    marker = L.marker([42.338249, -83.054153], {
        icon: L.mapbox.marker.icon()
    }).addTo(map),
    j = 0;

tick();
function tick() {
    // set the marker to be at the same point as one of the segments
    // of the line
    marker.setLatLng(L.latLng(
        geojson.coordinates[j][1],
        geojson.coordinates[j][0]));

    // move to the next point in the line or loop to the first point if
    // j runs off the end of the array
    if (++j < geojson.coordinates.length) setTimeout(tick, 100);
}
});