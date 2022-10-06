mapboxgl.accessToken = 'pk.eyJ1Ijoia2lyaXphIiwiYSI6ImNrNTNseGc0ZDBhMHMzZm1jdjBoMWYweWEifQ.X3lZ_RB7KFuRgfgZB7fwMw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [146.359, -32.648],
zoom: 4
});
 
map.addControl(
new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
 
// limit results to Australia
countries: 'au',
 
// further limit results to the geographic bounds representing the region of
// New South Wales
bbox: [139.965, -38.03, 155.258, -27.839],
 
// apply a client side filter to further limit results to those strictly within
// the New South Wales region
filter: function(item) {
// returns true if item contains New South Wales region
return item.context
.map(function(i) {
// id is in the form {index}.{id} per https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
// this example attempts to find the `region` named `New South Wales`
return (
i.id.split('.').shift() === 'region' &&
i.text === 'New South Wales'
);
})
.reduce(function(acc, cur) {
return acc || cur;
});
},
mapboxgl: mapboxgl
})
);