async function tempel() {
    document.getElementById('input').value = "";
    const text = await navigator.clipboard.readText();
    document.getElementById('input').value = text;
}

function clipboard() {
    /* Get the text field */
    var copyText = document.getElementById("cord2");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    // alert("Copied the text: " + copyText.value);
}

var map;
var defaultMarker;
var markers = [];

function initialize()
{
    map = new google.maps.Map(document.getElementById('google'), {
    center: new google.maps.LatLng(-7.3344454, 112.7898796),//Setting Initial Position
    zoom: 18
    });
    defaultMarker = new google.maps.Marker({
    map: map,
    draggable: true,
    position: map.getCenter()
    });

    google.maps.event.addListener(map, 'click', function(event) {
            document.getElementById("cord").value = event.latLng.lat() + ',' + event.latLng.lng();
            document.getElementById("temp2").value = event.latLng.lat() + ',' + event.latLng.lng();
            defaultMarker.setPosition(event.latLng);
            peta_awal()
            });

    google.maps.event.addListener(defaultMarker, 'click', function(event) {
            document.getElementById("cord").value = event.latLng.lat() + ',' + event.latLng.lng();
            document.getElementById("temp2").value = event.latLng.lat() + ',' + event.latLng.lng();
            });
            // peta_awal();

    google.maps.event.addListener(defaultMarker, 'dragend', function(event) {
            document.getElementById("cord").value = event.latLng.lat() + ',' + event.latLng.lng();
            document.getElementById("temp2").value = event.latLng.lat() + ',' + event.latLng.lng();
                peta_awal();
            });
        //   document.getElementById("cord").value = "-7.3344454, 112.7898796";
        //   document.getElementById("cord2").value = "-7.3344454, 112.7898796";
            // peta_awal()
}

function newLocation(newLat,newLng)
{
    map.setCenter({
        lat : newLat,
        lng : newLng
    });
}


function addNewMarkers(location) {
    var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
    });
    markers.push(marker);

    // google.maps.event.addListener(marker, 'click', function(event) {
    //         document.getElementById("cord").value = event.latLng.lat() + ',' + event.latLng.lng();
    //         // document.getElementById("temp").value = event.latLng.lat() + ',' + event.latLng.lng();
    //       });
    //       peta_awal();
    // google.maps.event.addListener(marker, 'dragend', function(event) {
    //         document.getElementById("cord").value = event.latLng.lat() + ',' + event.latLng.lng();
    //         document.getElementById("temp").value = event.latLng.lat() + ',' + event.latLng.lng();
    //       });
            // peta_awal();
}

function deleteMarker() {
    for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
    }
    markers = [];
}

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function ()
{
    $("#button").on('click', function ()
    {   
        var input = document.getElementById("input").value;
        var inputCord = input.split(",");
        var splitLat = parseFloat(inputCord[0]);
        var splitLng = parseFloat(inputCord[1]);
        newLocation(splitLat,splitLng);
        deleteMarker();
        addNewMarkers({lat:splitLat,lng:splitLng});
    });
});

/* var mymap = L.map('osm').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap); */

function peta_awal() {
    var container = L.DomUtil.get('osm');

        if(container != null){
        
        container._leaflet_id = null;
    
    }
    document.getElementById('container-osm').innerHTML = "<div id='osm'></div>";
    

        var osmLatLng = document.getElementById('temp2').value;
        
        document.getElementById('temp').value = osmLatLng;

        var cordOSM = osmLatLng.split(",");

        var mymap = new L.map('osm').setView([cordOSM[0],cordOSM[1]], 18)
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 20,
        }).addTo(mymap);

        var markerku = L.marker([cordOSM[0],cordOSM[1]],{
            draggable: true
        }).addTo(mymap);
    
        mymap.invalidateSize();

        markerku.on('dragend', function (e) {
            document.getElementById("cord2").value = markerku.getLatLng().lat + "," + markerku.getLatLng().lng;
            
        });
        markerku.on('click', function (e) {
            document.getElementById("cord2").value = markerku.getLatLng().lat + "," + markerku.getLatLng().lng;
            
        });
    // });
    var popup = L.popup();
    }

    window.onload = peta_awal