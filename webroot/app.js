var createUrl = function(extent) {
    var bbox = extentToBbox(extent);
    var path = 'api/0.6/';
    return path + "node[amenity=pub][bbox=" + bbox.left + "," +
        bbox.bottom + "," + bbox.right + "," + bbox.top + "]";
};

// transform from WGS 1984 to Spherical Mercator Projection
var extentToBbox = function(extent) {
    return extent.transform(
        new OpenLayers.Projection("EPSG:900913"),
        new OpenLayers.Projection("EPSG:4326")
    );
};


var createLayer = function(extent, name) {
    var layer = new OpenLayers.Layer.Vector(name, {
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
            url: createUrl(extent),
            format: new OpenLayers.Format.OSM()
        }),
        projection: new OpenLayers.Projection("EPSG:4326")
    });
    return layer;
}

var map;
function init(){

    map = new OpenLayers.Map("map",{
        controls:[
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.PanZoomBar(),
            new OpenLayers.Control.LayerSwitcher(),
            new OpenLayers.Control.Attribution()],
            maxExtent: new OpenLayers.Bounds(
                -20037508.34,
                -20037508.34,
                20037508.34,
                20037508.34
            ),
            maxResolution: 156543.0399,
            units: 'm'
    } );
    map.events.on({"moveend": function(event){
        var layer = map.getLayersByName("Kneipen")[0];
        if(layer) {
            map.removeLayer(layer);
            map.addLayer(createLayer(map.getExtent(),"Kneipen"));
        }
    } });
    // add maps
    var mapnik = new OpenLayers.Layer.OSM.Mapnik("Mapnik");
    map.addLayers([mapnik]);

    // set startpoint
    // transform from WGS 1984
    // to Spherical Mercator Projection
    var lonLat = new OpenLayers.LonLat(13.30,52.455)
    .transform(
        new OpenLayers.Projection("EPSG:4326"),
        new OpenLayers.Projection("EPSG:900913"));

        map.setCenter(lonLat,15);
        map.addLayer(createLayer(map.getExtent(),"Kneipen"));
}
