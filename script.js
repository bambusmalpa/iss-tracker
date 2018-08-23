let marker;


mapboxgl.accessToken = 'pk.eyJ1IjoiYmFtYnVzbWFscGEiLCJhIjoiY2prenVpMTRoMHk1cDNybG0wd28yMzB5byJ9.E92rusozBqxMy9uEbZqS5w';


let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 1,
    animate: true,
    easing: 0.5
});

function clean() {
    let container = document.querySelector(".mapboxgl\\-canvas\\-container");
    let markerNode = document.querySelector(".mapboxgl\\-marker");
    if (container.childElementCount > 1) {
        while (container.childElementCount > 1) {
            container.removeChild(container.lastChild);

        }
    }

}


function issPosition() {



    fetch("http://api.open-notify.org/iss-now.json")
        .then(function (response) {
            if (response.status == 200) return response.json();
            else throw new Error('Błąd danych z serwera!');
        })
        .then(function (response) {

            lng = Number(response.iss_position.longitude);
            lat = Number(response.iss_position.latitude);



        })
        .catch(function (error) {
            console.error(error);
        });

};




function issPosZero() {



    if (typeof lng == "number" && typeof lat == "number") {

        marker = new mapboxgl.Marker()

            .setLngLat([lng, lat])
            .addTo(map)

        function stopLoading() {
            let loading = document.getElementById("loadingScreen");
            loading.style.display = "none";
        }
        stopLoading();


    }
}

function stopLoading() {
    let loading = document.getElementById("loadingScreen");
    loading.style.display = "none";
}



function monitor() {

    if (lat > 0) {
        document.getElementById("lat").innerHTML = lat + " Szerokości geograficznej północnej";
    } else {
        lat = lat * -1;
        document.getElementById("lat").innerHTML = lat + " Szerokości geograficznej południowej";
    }
    if (lng > 0) {
        document.getElementById("lng").innerHTML = lng + " Długośći gegoraficznej wschodniej";
    } else {
        lng = lng * -1;
        document.getElementById("lng").innerHTML = lng + " Długośći gegoraficznej zachodniej";

    }
}



function center() {
    map.setCenter([lng, lat]);



}





setInterval(function () {

    issPosition();
    center();
    clean();
    issPosZero();
    monitor();


}, 5000);
