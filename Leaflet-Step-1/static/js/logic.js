// Create a map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
  });
  
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: API_KEY
  }).addTo(myMap);
  
  var URL="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
  
  // Define a markerSize function that will give radias based off magnitudes*10
  function markerSize(mag) {
    return mag*50000;
  }
  
 d3.json(URL,function(response){
    // var markeroptions={
    //   fillOpacity: 0.75,
    //   color: "blue",
    //   fillColor: "blue",
    //   radius: markerSize(function(feature,layer){return feature.properties.mag})
    // };
    L.geoJson(response,{
      pointToLayer:function(feature,latlng){
        return L.circle(latlng,{
          fillOpacity: feature.properties.mag/10,
          color:"transparent",          
          fillColor: "blue",
          radius: markerSize(feature.properties.mag)
        })
      }
    }).addTo(myMap)
    function onEachFeature (feature, layer) {
      layer.bindPopup("<h1>" + feature.properties.title + "</h1> <hr> <h3>Time: " + feature.properties.time + "</h3>")
        }
    L.geoJSON(response, {
      onEachFeature: onEachFeature}).addTo(myMap);

 });

  
