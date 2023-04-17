
let API_URL = "https://dades.eicub.net/api/1/museusexposicions-visitants";
// Crea un mapa centrat en aquesta ubicacio 'lon' i 'lat'
let lon = 2.167571;
let lat = 41.371684;
map = new OpenLayers.Map("demoMap");
let mapnik = new OpenLayers.Layer.OSM();
let fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
let toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
let position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
let zoom = 10;
map.addLayer(mapnik);
//Aqui se va a centrar
map.setCenter(position, zoom);


function addMarker() {
    //Agafa el text dels inputs
    let lon = document.getElementById("inputlon").value;
    let lat = document.getElementById("inputlat").value;
    let name = document.getElementById("inputname").value;
    let position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
    let markers = new OpenLayers.Layer.Markers(name);
    map.addLayer(markers);
    markers.addMarker(new OpenLayers.Marker(position));
    //Clica el marker
    markers.events.register("mousedown", markers, function () {
        alert(`Name: ${markers.name}`)
    });
}

//Marca amb longitud, latitud i nom en el mapa
function addMarkerParams(lon, lat, name) {
    let position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
    let markers = new OpenLayers.Layer.Markers(name);
    map.addLayer(markers);
    markers.addMarker(new OpenLayers.Marker(position));
    markers.events.register("mousedown", markers, function () {
        alert(`Name: ${markers.name}`)
        consoe.log("clicado", markers);
    });
}

function marcaMuseus(resultatOBJ) {
    // Per cada museu es crea un marcador
    for (let i = 0; i < resultatOBJ.length; i++) {
        const obj = resultatOBJ[i];
        console.log(obj.Longitud, obj.Latitud, obj.Equipament);
        addMarkerParams(obj.Longitud, obj.Latitud, obj.Equipament)
    }
    //Quan acaba treu la pantalla de carrega
    document.getElementById("carregaPagina").style.display = "none";

}


function callApi() {
    document.getElementById("carregaPagina").style.display = "block";
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            if (this.status === 200) {
                let resultatOBJ = JSON.parse(this.responseText);
                console.log(resultatOBJ);
                //Quan tingui la resposta, la array de solucions es pasa a la funcion marcaMuseus()
                marcaMuseus(resultatOBJ)
            }
        }
    });
    //Cridada a aquesta api
    xhr.open("GET", API_URL);
    xhr.send(null);
}
