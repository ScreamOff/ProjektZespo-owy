document.addEventListener("DOMContentLoaded", function () {
    const datetime = document.getElementById("datetime");
    const temp = document.getElementById("temp");
    const humidity = document.getElementById("humidity");
    const pressure = document.getElementById("pressure");
    const nameDay = document.getElementById("nameDay");
    const weatherIcon = document.getElementById("weatherIcon");

    const location = document.getElementById("location");
    const wind = document.getElementById("wind");
    const visibility = document.getElementById("visibility");
    const sunrise = document.getElementById("sunrise");
    const sunset = document.getElementById("sunset");

    let timezoneOffset = 0;

    function updateClock() {
        const nowUTC = new Date(Date.now() + new Date().getTimezoneOffset() * 60000);
        const cityTime = new Date(nowUTC.getTime() + timezoneOffset * 1000);
        datetime.textContent = cityTime.toLocaleString('pl-PL');
    }

    setInterval(updateClock, 1000);

    async function getWeather(lat = null, lon = null, city = null) {
        let url = "/weather/data";
        if (lat && lon) {
            url += `?lat=${lat}&lon=${lon}`;
        } else if (city) {
            url += `?city=${encodeURIComponent(city)}`;
        } else {
            url += "?city=Warsaw";
        }

        try {
            const res = await fetch(url);
            const data = await res.json();

            temp.textContent = data.temperature || "-";
            humidity.textContent = data.humidity || "-";
            pressure.textContent = data.pressure || "-";
            wind.textContent = data.wind || "-";
            visibility.textContent = data.visibility || "-";
            sunrise.textContent = data.sunrise || "-";
            sunset.textContent = data.sunset || "-";
            location.textContent = "Lokalizacja: " + (data.location || "-");

            const nameList = (data.name_day || "").split(",").map(name => name.trim());
            nameDay.innerHTML = nameList.join(" • ");

            if (data.icon) {
                weatherIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
                weatherIcon.style.display = "inline-block";
            }

            timezoneOffset = data.timezone_offset || 0;
            updateClock();

        } catch (err) {
            console.error("Błąd przy pobieraniu danych pogodowych", err);
        }
    }

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeather(latitude, longitude);
            },
            () => {
                getWeather();
            }
        );
    } else {
        getWeather();
    }

    window.getWeatherByCity = function () {
        const city = document.getElementById("cityInput").value.trim();
        if (city) {
            getWeather(null, null, city);
        }
    }
});
