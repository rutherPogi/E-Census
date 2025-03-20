import React, { useEffect } from 'react';
import { useMap, GeoJSON } from 'react-leaflet';
import { Box, Typography, Paper } from '@mui/material';
import L from 'leaflet';


import { HOUSE_PIN_COLOR } from '../utils/constant';

// Create a custom marker icon with specific color
export const createColoredIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

// Map controller to change view when barangay is selected
export function MapViewController({ selectedBarangay }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedBarangay) {
      map.flyTo(selectedBarangay.coordinates, selectedBarangay.zoom);
    }
  }, [selectedBarangay, map]);
  
  return null;
}

// Legend component for the map
export function MapLegend() {
  return (
    <Paper sx={{
      position: 'absolute',
      left: 10,
      bottom: 30,
      zIndex: 1000,
      p: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 1,
      boxShadow: 2,
      width: 200
    }}>
      <Typography variant="subtitle2" gutterBottom fontWeight="bold">Legend</Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ 
          width: 20, 
          height: 20, 
          bgcolor: 'transparent', 
          border: '2px solid blue',
          mr: 1 
        }}></Box>
        <Typography variant="body2">Barangay Boundary</Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ 
          width: 12, 
          height: 12, 
          bgcolor: HOUSE_PIN_COLOR, 
          borderRadius: '50%',
          mr: 1 
        }}></Box>
        <Typography variant="body2">House Location</Typography>
      </Box>
    </Paper>
  );
}

// Helper function to convert binary image data to base64 if needed
export const getImageSource = (imageData) => {
  if (!imageData) {
    console.log('No image data received');
    return null;
  }
  
  // The imageData should already be a complete data URL from the backend
  if (typeof imageData === 'string') {
    return imageData;
  }
  
  console.error('Invalid image data format');
  return null;
};