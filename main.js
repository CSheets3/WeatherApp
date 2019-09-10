window.addEventListener("load", ()=>{
    let long;
    let lat;
    let description = document.querySelector('.description');
    let timezone = document.querySelector('.timezone');
    let degree = document.querySelector('.degree');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/792cd541479fc467bdb93abcd2136340/${lat},${long}`;

            fetch(api)
            .then(data => {
                return data.json();
            })
            .then (data => {
                const {temperature, summary, icon} = data.currently;
                degree.textContent = temperature;
                description.textContent = summary;
                timezone.textContent = data.timezone;
                setIcons(icon, document.querySelector('.icon'));
            });
        });
    }else{
        h1.textContent = "Make sure to enable your location!"
    };

    function setIcons(icon, iconID){
        const skycons = new Skycons({ color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
