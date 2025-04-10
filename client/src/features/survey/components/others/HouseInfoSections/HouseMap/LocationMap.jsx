// LocationMap.jsx
import { useState } from "react";
import { Box, Button } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useEffect } from "react";

// Constants
const ITBAYAT_COORDINATES = [20.7758, 121.8491];
const DEFAULT_ZOOM = 14;

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// A component to handle map click events
function MapWithPin({ position, setPosition }) {
  useMapEvents({
    click: (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    }
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
}

// A component to handle map center control
function MapController({ position }) {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.flyTo(position, DEFAULT_ZOOM);
    }
  }, [position, map]);
  
  return null;
}

// Main LocationMap component
export default function LocationMap({ position, setPosition, showNotification }) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleGetCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      showNotification("Geolocation is not supported by your browser", "error");
      setIsGettingLocation(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
        setIsGettingLocation(false);
        showNotification("Current location detected successfully", "success");
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "You denied the request for Geolocation";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get your location timed out";
            break;
        }
        
        showNotification(errorMessage, "error");
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  return (
    <Box sx={{ position: 'relative', height: 400, width: '100%', mb: 3 }}>
      <MapContainer 
        center={position || ITBAYAT_COORDINATES} 
        zoom={DEFAULT_ZOOM} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapWithPin position={position} setPosition={setPosition} />
        <MapController position={position} />
      </MapContainer>
      
      <Button
        variant="contained"
        color="primary"
        startIcon={<MyLocationIcon />}
        onClick={handleGetCurrentLocation}
        disabled={isGettingLocation}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1000,
          backgroundColor: 'white',
          color: 'primary.main',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
          boxShadow: 2
        }}
      >
        {isGettingLocation ? 'Locating...' : 'Use My Location'}
      </Button>
    </Box>
  );
}