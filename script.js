const btn = document.getElementById('getLocationBtn')
const map = document.getElementById('mapDisplay')

const country = document.getElementById('country')
const state = document.getElementById('state')
const postal = document.getElementById('postal')
const district = document.getElementById('district')
const local = document.getElementById('local')

// API Position Stack
// API used geocode

function getCordinates(){
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(function (position){
            // console.log(position);
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            // console.log(lat+" "+lng);
            map.innerHTML = `<iframe
            src="https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed"
            width="700"
            height="300"
            frameborder="0"
            style="border:0;margin: 20px;"
            allowfullscreen
          ></iframe>
          `
          locationDetails(lat,lng)
        })
    }
}
const locationDetails = async (lat, lng)=>{
     try {
        const response = await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`);
        const data = await response.json();
        country.innerText = data.address.country
        state.innerText = data.address.state
        postal.innerText = data.address.postcode
        district.innerText = data.address.state_district
        local.innerText = data.address.county

     } catch (error) {
        console.log(error);
     }
}
// getCordinates()
btn.addEventListener('click', function(e){
    e.preventDefault();
    getCordinates();
})