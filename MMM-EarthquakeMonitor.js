Module.register("MMM-EarthquakeMonitor", {
    defaults: {
        updateInterval: 600000, // 10 minutes
        maxNumberOfQuakes: 5,
        apiUrl: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson"
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        this.earthquakes = [];
        this.getData();
        this.scheduleUpdate();
    },

    getData: function() {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", this.config.apiUrl, true);
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                self.processData(JSON.parse(this.responseText));
            }
        };
        xhr.send();
    },

    processData: function(data) {
        this.earthquakes = data.features.slice(0, this.config.maxNumberOfQuakes);
        this.updateDom();
    },

    getDom: function() {
        var wrapper = document.createElement("div");

        // Module title
        var title = document.createElement("h2");
        title.innerHTML = "Earthquake Monitor";
        title.style.fontWeight = "bold";
        wrapper.appendChild(title);

        // Current date
        var date = document.createElement("div");
        var currentDate = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        date.innerHTML = currentDate;
        date.className = "small-date";
        wrapper.appendChild(date);

        // Separator
        var separator = document.createElement("hr");
        wrapper.appendChild(separator);

        if (this.earthquakes.length > 0) {
            this.earthquakes.forEach(quake => {
                var quakeWrapper = document.createElement("div");
                quakeWrapper.className = "quake-info";

                // Magnitude and Location
                var detailsDiv = document.createElement("div");
                detailsDiv.innerHTML = `<strong>Magnitude:</strong> ${quake.properties.mag}, <strong>Location:</strong> ${quake.properties.place}`;
                quakeWrapper.appendChild(detailsDiv);

                // Time
                var timeDiv = document.createElement("div");
                var quakeTime = new Date(quake.properties.time);
                timeDiv.innerHTML = `<strong>Time:</strong> ${quakeTime.toLocaleTimeString()}`;
                quakeWrapper.appendChild(timeDiv);

                wrapper.appendChild(quakeWrapper);
            });
        } else {
            var noDataDiv = document.createElement("div");
            noDataDiv.innerHTML = "No earthquakes to display";
            wrapper.appendChild(noDataDiv);
        }

        return wrapper;
    },

    scheduleUpdate: function() {
        var self = this;
        setTimeout(function() {
            self.getData();
        }, this.config.updateInterval);
    },

    getStyles: function() {
        return ["MMM-EarthquakeMonitor.css"];
    }
});
