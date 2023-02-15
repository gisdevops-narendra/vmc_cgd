//project setup
var utility = {
    //geoserverUrl: 'http://192.168.20.72:8080/geoserver/wms/',
    geoserverUrl: 'http://localhost:8080/geoserver/wms/',
    zoom: 12,
    center: [73.18314119972095, 22.29949881038027],
    projection: 'EPSG:4326',
    layers: [
        layers = {
            title: 'Vadodara Muncipal',
            name: 'vadodara_municipal',
            type: 'layers',
            workspace: 'vmc_cgd',
            layerName: 'vadodara_municipal_boundary',
            projection: 'EPSG:32643',
            visible: true,
            zIndex: 5
        }, {
            title: 'Zone Bounndary',
            name: 'vmc_zone',
            workspace: 'vmc_cgd',
            layerName: 'vmc_zone',
            type: 'layers',
            projection: 'EPSG:32643',
            visible: false,
            zIndex: 4
        },
        {
            title: 'CGD Pipe Network',
            name: 'gas_network',
            workspace: 'vmc_cgd',
            layerName: 'gas_network',
            projection: 'EPSG:32643',
            type: 'layers',
            visible: false,
            zIndex: 3
        },
        {
            title: 'VMC Gas Fitting Type',
            name: 'gas_fittings',
            workspace: 'vmc_cgd',
            layerName: 'gas_fittings',
            projection: 'EPSG:32643',
            type: 'layers',
            visible: false,
            zIndex: 2
        }
    ]
}