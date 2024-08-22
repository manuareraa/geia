import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  Marker,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

function MapComponent({ lat, lon, label }) {
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const apiKey = import.meta.env.VITE_GMAPS_API_KEY;

  return (
    <div style={{ height: "500px", width: "100%" }}>
      {/* Explicitly set the height */}
      <APIProvider apiKey={apiKey}>
        <Map
          mapId={"cdf16f74bab35986"}
          mapTypeId="roadmap"
          zoom={9}
          center={{ lat: lat, lng: lon }}
          gestureHandling="greedy"
          disableDefaultUI={false}
          style={{ height: "100%", width: "100%" }} // Set the Map size explicitly
        >
          <AdvancedMarker
            ref={markerRef}
            onClick={() => setInfowindowOpen(true)}
            position={{ lat: lat, lng: lon }}
            title={"AdvancedMarker that opens an Infowindow when clicked."}
          />
          {infowindowOpen && (
            <InfoWindow
              anchor={marker}
              maxWidth={200}
              onCloseClick={() => setInfowindowOpen(false)}
            >
              {label}
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}

export default MapComponent;
