//initlize project
const map = new ol.Map({
    target: 'map',
    view: new ol.View({
        projection: utility.projection,
        center: utility.center,
        zoom: utility.zoom
    })
});

//add stamen basemap on map
var OSMBasemap = new ol.layer.Tile({
    type: 'basemap',
    name:'OSMBasemap',
    visible: true,
    source: new ol.source.OSM()
});
map.addLayer(OSMBasemap);
//add stamen basemap on map
var stamenBasemap = new ol.layer.Tile({
    visible: false,
    name:'stamenBasemap',
    type: 'basemap',
    source: new ol.source.Stamen({
        layer: 'watercolor'
    })
});
map.addLayer(stamenBasemap);
//layer add on map
function addLayersonMap(layers) {
    for (let i = 0; i < layers.length; i++) {
        var tileLayer = new ol.layer.Tile({
            title: layers[i].title,
            name: layers[i].name,
            zIndex: layers[i].zIndex,
            visible: layers[i].visible,
            source: new ol.source.TileWMS({
                url: utility.geoserverUrl,
                projection: layers[i].projection,
                params: {
                    'LAYERS': layers[0].workspace + ':' + layers[i].layerName,
                    'TILED': true
                },
                servertype: 'geoserver'
            })
        });
        // Get the legend URL for the layer from GeoServer
        var legendUrl = utility.geoserverUrl + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=" + layers[i].workspace + ':' + layers[i].layerName;
        tileLayer.legendUrl = legendUrl;
        map.addLayer(tileLayer);
    }
};
addLayersonMap(utility.layers);
var toolSButtons = {
    queryModule: true,
    layerSwitcher: true
};
var queryModuleDiv = document.getElementById('queryModuleDiv');
var layerSwitcherDiv = document.getElementById('layerSwitcherDiv');
var mapEl = document.getElementById('map');
var toolSButtons = {
    queryModule: true,
    layerSwitcher: true
};
function showHideDiv(element) {
    if (element.id == 'queryModule') {
        if (toolSButtons.queryModule) {
            queryModuleDiv.classList.remove('hide');
            element.classList.add('highlghtButton');
            mapEl.classList.add('map2');
            toolSButtons.queryModule = false;

            if (!toolSButtons.layerSwitcher) {
                layerSwitcherDiv.classList.add('hide');
                document.getElementById('layerSwitcher').classList.remove('highlghtButton');
                toolSButtons.layerSwitcher = true;
            }
        } else {
            queryModuleDiv.classList.add('hide');
            element.classList.remove('highlghtButton');
            mapEl.classList.remove('map2');
            toolSButtons.queryModule = true;
        }
    } else if (element.id == 'layerSwitcher') {
        if (toolSButtons.layerSwitcher) {
            layerSwitcherDiv.classList.remove('hide');
            element.classList.add('highlghtButton');
            mapEl.classList.add('map2');
            toolSButtons.layerSwitcher = false;

            if (!toolSButtons.queryModule) {
                queryModuleDiv.classList.add('hide');
                document.getElementById('queryModule').classList.remove('highlghtButton');
                toolSButtons.queryModule = true;
            }
        } else {
            layerSwitcherDiv.classList.add('hide');
            element.classList.remove('highlghtButton');
            mapEl.classList.remove('map2');
            toolSButtons.layerSwitcher = true;
        }
    }
}
//create checkbx
// Get the reference to the form element
var form = document.getElementById('checkboxForm');
// Loop through the layers array and create a checkbox for each layer
for (var i = 0; i < utility.layers.length; i++) {
    var layer = utility.layers[i];
    if (layer.type === 'layers') {
        // Create a div element to wrap the checkbox and label
        var checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('form-check');

        // Create the checkbox input element
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = layer.name;
        checkbox.id = layer.name;
        checkbox.value = layer.name;
        checkbox.checked = layer.visible;
        checkbox.classList.add('form-check-input');

        // Create the label element
        var label = document.createElement('label');
        label.htmlFor = layer.name;
        label.textContent = layer.title;
        label.classList.add('form-check-label');

        // Append the checkbox and label to the div element
        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);

        // Append the div element to the form
        form.appendChild(checkboxDiv);
    }
}
// Get all the checkboxes with type 'layer'
var checkboxes = document.querySelectorAll('input[type=checkbox]');
// Add an event listener to each checkbox
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        debugger
        toggleLayerVisibility(this.name, this.checked);
        var layerName = this.name; // Replace with the actual layer name
        toggleLegend(layerName);

    });
});
function toggleLayerVisibility(layerName, visibility) {
    var layers = map.getLayers();
    layers.forEach(function (layer) {
        if (layer.get('name') === layerName) {
            layer.setVisible(visibility);
        }
    });
}
function toggleLegend(layerName) {
    debugger
    var legendDiv = document.getElementById('legendDiv');
    var legendImg = document.getElementById('legendImg');
    if (legendDiv.classList.contains('hidden')) {
        // Legend is currently hidden, so show it
        legendImg.src = getLayerByName(layerName).legendUrl;
        legendDiv.classList.remove('hidden');
    } else {
        // Legend is currently visible, so hide it
        legendDiv.classList.add('hidden');
    }
}
// Define the base layers
var baseLayers = [    { layer: OSMBasemap, name: 'OSM' },    { layer: stamenBasemap, name: 'Stamen Watercolor' }];
// Create the radio buttons
var radios = [];
for (var i = 0; i < baseLayers.length; i++) {
    var layer = baseLayers[i].layer;
    var name = baseLayers[i].name;
    var radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'basemap';
    radio.value = name;
    radio.checked = layer.getVisible();
    radios.push(radio);

    var label = document.createElement('label');
    label.textContent = name;

    var container = document.createElement('div');
    container.appendChild(radio);
    container.appendChild(label);
    document.getElementById('basemapForm').appendChild(container);
    radio.addEventListener('change', function () {
        var value = this.value;
        for (var j = 0; j < baseLayers.length; j++) {
            var layer = baseLayers[j].layer;
            if (baseLayers[j].name === value) {
                layer.setVisible(true);
            } else {
                layer.setVisible(false);
            }
        }
    });
}