import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Box, Typography } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { get, post, put, del } from '../../utils/api/apiService'
import { ITBAYAT_CENTER, DEFAULT_ZOOM, HAZARD_TYPES } from './utils/constant';

import HazardAreaEditor from './components/hazard/HazardAreaEditor'


////////////////////////////////////////////////////////

import MapView from './components/map/MapView';
import MapLegend from './components/map/MapLegend';
import MapControls from './components/map/MapControls';

import BarangayLayer from './components/map/MapLayers/BarangayLayer'
import HousePinsLayer from './components/map/MapLayers/HousePinsLayer'
import HazardAreasLayer from './components/map/MapLayers/HazardAreasLayer'

import HouseDetailsDialog from './components/dialogs/HouseDetailsDialog';
import HazardEditorDialog from './components/dialogs/HazardEditorDialog';

import { useHouseData } from './hooks/useHouseData';
import { useHazardAreas } from './hooks/useHazardAreas';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


function App() {
  // Fetch house data with custom hook
  const { 
    houseData, 
    selectedHouse, 
    setSelectedHouse,
    isLoading: isHouseDataLoading, 
    error: houseDataError 
  } = useHouseData();

  // Fetch and manage hazard areas with custom hook
  const {
    hazardAreas,
    selectedHazard,
    editingHazardIndex,
    addHazardArea,
    updateHazardArea,
    deleteHazardArea,
    selectHazardForEditing,
    setSelectedHazard,
    clearSelectedHazard
  } = useHazardAreas();

  // UI State
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBarangay, setSelectedBarangay] = useState(null);
  const [isHazardModeActive, setIsHazardModeActive] = useState(false);
  const [hazardDialogOpen, setHazardDialogOpen] = useState(false);
  const [showHousePins, setShowHousePins] = useState(true);
  const [showBarangayBoundaries, setShowBarangayBoundaries] = useState(true);
  const [showHazardAreas, setShowHazardAreas] = useState(true);
  const [selectedHazardType, setSelectedHazardType] = useState(HAZARD_TYPES[0].id);
  const [filteredHazardTypes, setFilteredHazardTypes] = useState(HAZARD_TYPES.map(type => type.id));

  // Event handlers
  const handleHouseClick = (house) => {
    if (!isHazardModeActive) {
      setSelectedHouse(house);
      setDialogOpen(true);
    }
  };

  const toggleHazardMode = () => {
    setIsHazardModeActive(!isHazardModeActive);
  };

  const handleHazardTypeChange = (event) => {
    setSelectedHazardType(event.target.value);
  };

  const handleEditHazard = (index) => {
    selectHazardForEditing(index);
    setHazardDialogOpen(true);
  };

  const handleAddHazard = async (hazardCircle) => {
    await addHazardArea(hazardCircle, selectedHazardType);
  };

  const handleHazardUpdate = async () => {
    const success = await updateHazardArea(selectedHazard);
    if (success) {
      setHazardDialogOpen(false);
      clearSelectedHazard();
    } else {
      alert('Failed to update hazard area. Please try again.');
    }
  };

  const handleDeleteHazard = async () => {
    if (selectedHazard && selectedHazard.id) {
      const success = await deleteHazardArea(selectedHazard.id);
      if (success) {
        setHazardDialogOpen(false);
        clearSelectedHazard();
      } else {
        alert('Failed to delete hazard area. Please try again.');
      }
    }
  };

  if (isHouseDataLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h4">Loading house data...</Typography>
      </Box>
    );
  }

  if (houseDataError) {
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
      {/* Map Controls */}   
      <MapControls
        isHazardModeActive = {isHazardModeActive}
        toggleHazardMode = {toggleHazardMode}
        selectedHazardType = {selectedHazardType}
        handleHazardTypeChange = {handleHazardTypeChange}
        showBarangayBoundaries = {showBarangayBoundaries}
        setShowBarangayBoundaries = {setShowBarangayBoundaries}
        showHazardAreas = {showHazardAreas}
        setShowHazardAreas = {setShowHazardAreas}
        showHousePins = {showHousePins}
        setShowHousePins = {setShowHousePins}
      />

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
          
          <MapView selectedBarangay={selectedBarangay} />

          {/* Map Layers */}
          
         {/* Real Barangay Boundaries - Now with visibility toggle */}
          {showBarangayBoundaries && (
            <BarangayLayer selectedBarangay={selectedBarangay} />
          )}
          
          {/* House Information Markers - Now with visibility toggle */}
          {showHousePins && (
            <HousePinsLayer 
              houseData={houseData} 
              onHouseClick={handleHouseClick}
              isHazardModeActive={isHazardModeActive}
            />
          )}
          
          {/* Hazard Area Circles - Now with visibility toggle */}
          {showHazardAreas && (
            <HazardAreasLayer 
              hazardAreas={hazardAreas}
              filteredHazardTypes={filteredHazardTypes}
              isHazardModeActive={isHazardModeActive}
              onEditHazard={handleEditHazard}
            />
          )}
          
          {/* Hazard Editor Component */}
          <HazardAreaEditor 
            isActive={isHazardModeActive}
            onAddHazard={handleAddHazard}
          />

          {/* Map Legend - use extended version that includes hazard types */}
          <MapLegend setFilteredHazardTypes={setFilteredHazardTypes}/>
        </MapContainer>
      </Box>

      {/* Dialogs */}
      <HouseDetailsDialog 
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        selectedHouse={selectedHouse}
      />

      <HazardEditorDialog
        open={hazardDialogOpen}
        onClose={() => setHazardDialogOpen(false)}
        selectedHazard={selectedHazard}
        setSelectedHazard={setSelectedHazard}
        onUpdate={handleHazardUpdate}
        onDelete={handleDeleteHazard}
      />
    </Box>
  );
}

export default App;