# MMM-EarthquakeMonitor

Add the following to your config.js to add MMM-EarthquakeMonitor to your layout.

Here's the USGS api (specifically the Real-time GeoJSON Feeds) I used.

https://earthquake.usgs.gov/fdsnws/event/1/

```
Usage
GeoJSON is intended to be used as a programatic interface for applications.

Output
{
  type: "Feature",
  properties: {
    mag: Decimal,
    place: String,
    time: Long Integer,
    updated: Long Integer,
    tz: Integer,
    url: String,
    felt:Integer,
    cdi: Decimal,
    mmi: Decimal,
    alert: String,
    status: String,
    tsunami: Integer,
    sig:Integer,
    net: String,
    code: String,
    ids: String,
    sources: String,
    types: String,
    nst: Integer,
    dmin: Decimal,
    rms: Decimal,
    gap: Decimal,
    magType: String,
    type: String,
    products: {
      <productType>: [
        {
          id: String,
          type: String,
          code: String,
          source: String,
          updateTime: Integer,
          status: String,
          properties: {
            <key>: String,
            …
          },
          preferredWeight: Integer,
          contents: {
            <path>: {
              contentType: String,
              lastModified: Long Integer,
              length: Integer,
              url: String
            },
            …
          }
        },
        …
      ],
      …
    }
  },
  geometry: {
    type: "Point",
    coordinates: [
      longitude,
      latitude,
      depth
    ]
  },
  id: String
}
```


Share and enjoy. 


```
{
            module: "MMM-EarthquakeMonitor",
            position: "top_left",
            config: {
                updateInterval: 600000,
                maxNumberOfQuakes: 5,
                apiUrl: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson"
            }
        },

```
