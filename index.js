map = new OpenLayers.Map("demoMap");
let objMap = new OpenLayers.Layer.OSM();
map.addLayer(objMap);
map.zoomToMaxExtent();

//g.maps 41.374786 2.1659162
let lon = 41.374786;
let lat = 2.1659162;
//map.center.lon = 236687.25805214 ;
//map.center.lat = 5066551.9821494;
var poiBounds = objMap.getExtent();
map.setCenter ({"lon":1,"lat":lon}, 4);