// helllosdfsdf
// var mymap;
// $(document).ready( () => {

//     mymap = L.map('mapid').setView([32.731360699999996, -97.10507969999999], 25);
//     console.log('document is ready');


//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

//     }).addTo(mymap);
//     // mymap = L.latLng(53.2734, -7.77832031);

// });
// var mymap = L.map('mapid').setView([51.505, -0.09], 13);

const http = new XMLHttpRequest();

var base_url = 'https://event-maps-api.herokuapp.com/events/';
// var data;

document.getElementById( 'get_events').addEventListener( 'click', event => {
    $.get( base_url , (data, status) => {
        console.log( data );
    });

});
