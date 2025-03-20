import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, GeoJSON } from 'react-leaflet';
import { Box, Card, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, 
         DialogActions, IconButton, Grid, FormControl, InputLabel, Select, MenuItem, Paper
       } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


import { get } from '../../utils/api/apiService'
import { BARANGAYS, HOUSE_PIN_COLOR, ITBAYAT_CENTER, DEFAULT_ZOOM, ITBAYAT_BARANGAYS } from './utils/constant';
import { 
  MapViewController, 
  MapLegend, 
  createColoredIcon, 
  getImageSource 
} from './components/MapComponents';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function App() {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBarangay, setSelectedBarangay] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [houseData, setHouseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch house data from database
  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        setIsLoading(true);
        
        const response = await get('/hazzardMap/coordinates')

        setHouseData(response);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch house data');
        setIsLoading(false);
        console.error('Error fetching house data:', err);
      }
    };

    fetchHouseData();
  }, []);

  const handleBarangayChange = (event) => {
    const barangayName = event.target.value;
    if (barangayName === "") {
      setSelectedBarangay(null);
    } else {
      const barangay = BARANGAYS.find(b => b.name === barangayName);
      setSelectedBarangay(barangay);
    }
  };

  const handleHouseClick = (house) => {
    setSelectedHouse(house);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Render a loading message while data is being fetched
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h4">Loading house data...</Typography>
      </Box>
    );
  }

  // Render an error message if there was an error fetching data
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h4" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        height: '100%', 
        display: 'flex',
        flexDirection: 'column',
        padding: 2, 
        backgroundColor: '#fff',
        borderRadius: 2,
        boxSizing: 'border-box'
      }}
    >   
      {/* Select Barangay */}   
      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel id="barangay-select-label">Select Barangay</InputLabel>
          <Select
            labelId="barangay-select-label"
            id="barangay-select"
            value={selectedBarangay ? selectedBarangay.name : ""}
            onChange={handleBarangayChange}
            label="Select Barangay"
          >
            <MenuItem value="">
              <em>Municipality Overview</em>
            </MenuItem>
            {BARANGAYS.map((barangay) => (
              <MenuItem key={barangay.name} value={barangay.name}>
                {barangay.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Map */}
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <MapContainer 
          center={ITBAYAT_CENTER} 
          zoom={DEFAULT_ZOOM} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapViewController selectedBarangay={selectedBarangay} />
          
         {/* Real Barangay Boundaries */}
         {ITBAYAT_BARANGAYS.features.map((feature) => (
            <GeoJSON 
              key={feature.properties.id}
              data={feature}
              style={() => ({
                color: 'blue',
                weight: 2,
                opacity: selectedBarangay && 
                  (selectedBarangay.name === feature.properties.name || 
                   selectedBarangay.name === feature.properties.alternative_name) ? 1 : 0.5,
                fillColor: selectedBarangay && 
                  (selectedBarangay.name === feature.properties.name || 
                   selectedBarangay.name === feature.properties.alternative_name) ? 
                    'rgba(0, 0, 255, 0.1)' : 'transparent'
              })}
            >
              <Popup>
                <Typography variant="subtitle1">{feature.properties.name}</Typography>
                {feature.properties.alternative_name && (
                  <Typography variant="body2">({feature.properties.alternative_name})</Typography>
                )}
                <Typography variant="body2">Barangay of Itbayat Municipality</Typography>
              </Popup>
            </GeoJSON>
          ))}
          
          {/* House Information Markers */}
          {houseData.map((house) => (
            <Marker 
              key={house.houseInfoID} 
              position={[parseFloat(house.latitude), parseFloat(house.longitude)]}
              icon={createColoredIcon(HOUSE_PIN_COLOR)}
              eventHandlers={{
                click: () => handleHouseClick(house)
              }}
            />
          ))}

          {/* Map Legend */}
          <MapLegend />
        </MapContainer>
      </Box>

      {/* Dialog for House Details */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          House Information
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedHouse && (
            <Grid container spacing={2}>
              {selectedHouse.houseImage && (
                <Grid item xs={12}>
                 <Box 
                    component="img" 
                    src={getImageSource(selectedHouse.houseImage)}
                    alt="House Image"
                    sx={{ width: '100%', maxHeight: 300, objectFit: 'cover' }}
                    onError={(e) => {
                      console.error('Image failed to load');
                      e.target.onerror = null; 
                      e.target.src = 'path/to/fallback/image.jpg'; // Optional fallback
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography variant="h6" component="h2">
                  Survey ID: {selectedHouse.surveyID}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>House Condition:</strong> {selectedHouse.houseCondition}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>House Structure:</strong> {selectedHouse.houseStructure}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Location: {selectedHouse.latitude}, {selectedHouse.longitude}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;