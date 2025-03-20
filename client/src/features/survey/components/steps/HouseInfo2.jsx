import { useState, useEffect } from "react";
import { Box, Button, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useFormContext } from "../../pages/FormContext";
import { Notification } from '../../../../components/common/Notification'

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});


const ITBAYAT_COORDINATES = [20.7758, 121.8491];
const DEFAULT_ZOOM = 14;

// Map component with pin functionality
function MapWithPin({ position, setPosition }) {
  useMapEvents({
    click: (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    }
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
}

export default function HouseLocation({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  
  const [position, setPosition] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('error');

  useEffect(() => {
    if (formData.houseInfo && formData.houseInfo.latitude && formData.houseInfo.longitude) {
      setPosition([formData.houseInfo.latitude, formData.houseInfo.longitude]);
    }
  }, [formData.houseInfo]);


  const showNotification = (message, type) => {
    setSnackbarMessage(message);
    setSeverity(type);
    setSnackbarOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position) {
      showNotification("Please add a pin to mark your house location", "error");
      return;
    }

    const latitude = position[0];
    const longitude = position[1];

    updateFormData('houseInfo', { 
      ...formData.houseInfo, 
      latitude: latitude, 
      longitude: longitude 
    });

    handleNext();
  };

  return (
    <div className='responsive-container'>
      <div className='responsive-header'>HOUSE LOCATION</div>
      <form id="survey-form" className="responsive-details" onSubmit={handleSubmit}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Please mark your house location in Itbayat Municipality by clicking on the map.
        </Typography>
        
        <Box sx={{ height: 400, width: '100%', mb: 3 }}>
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
          </MapContainer>
        </Box>
        
        {position && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            Selected coordinates: {position[0].toFixed(6)}, {position[1].toFixed(6)}
          </Typography>
        )}
      </form>
      <div className='form-buttons'>
        <div className='form-buttons-right'>
          <Button variant='outlined' onClick={handleBack} sx={{ width: '100%' }}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit} sx={{ width: '100%' }}>Next</Button>
        </div>     
      </div>
      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </div>
  );
}