const MapOptions: any = {
  disableDefaultUI: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#FFA25C" }],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#75CFF0" }],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry.fill",
      stylers: [{ color: "#B6E59E" }],
    },
  ],
};

const handleClick = (event: any, setMarker: any, setLocationName: any) => {
  const newMarker = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  };
  setMarker(newMarker);

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: newMarker }, (results: any, status) => {
    if (status === "OK") {
      if (results[0]) {
        setLocationName(results[0].formatted_address);
      } else {
        console.log("No results found");
      }
    } else {
      console.log(`Geocoder failed due to: ${status}`);
    }
  });
};

export { MapOptions, handleClick };
