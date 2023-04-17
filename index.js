/*map = new OpenLayers.Map("demoMap");
map.addLayer(new OpenLayers.Layer.OSM());
map.zoomToMaxExtent();
*//*
//g.maps 41.374786 2.1659162
let lon = 41.374786;
let lat = 2.1659162;
//map.center.lon = 236687.25805214 ;
//map.center.lat = 5066551.9821494;
let poiBounds = objMap.getExtent();
map.setCenter ({"lon":1,"lat":lon}, 4);

*/

let lon = 2.167571;
let lat = 41.371684;
map = new OpenLayers.Map("demoMap");
let mapnik = new OpenLayers.Layer.OSM();
let fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
let toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
let position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
let zoom = 10;

map.addLayer(mapnik);
map.setCenter(position, zoom);




function addMarker() {
    //Agafa el text
    let lon = document.getElementById("inputlon").value;
    let lat = document.getElementById("inputlat").value;
    let name = document.getElementById("inputname").value;
    //let lon = 2.1;
    //let lat = 40;
    let position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
    let markers = new OpenLayers.Layer.Markers(name);
    map.addLayer(markers);
    markers.addMarker(new OpenLayers.Marker(position));
    markers.events.register("mousedown", markers, function () {
        alert(`Name: ${markers.name}`)
        consoe.log("clicado", markers);
    });
}
