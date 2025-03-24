import React, { useState } from 'react';
import { Paper, Box, Typography, Tooltip } from '@mui/material';
import { HOUSE_PIN_COLOR, HAZARD_TYPES } from '../../utils/constant';



const MapLegend = ({ setFilteredHazardTypes }) => {

  const [activeHazardTypes, setActiveHazardTypes] = useState(HAZARD_TYPES.map(type => type.id));
  const [showAllHazards, setShowAllHazards] = useState(true);
  
  const toggleHazardType = (typeId) => {
    let newActiveTypes;
    
    if (showAllHazards) {
      newActiveTypes = [typeId];
      setShowAllHazards(false);
    } else if (activeHazardTypes.includes(typeId)) {
      if (activeHazardTypes.length === 1) {
        // If this is the only active type, clicking it should show all again
        newActiveTypes = HAZARD_TYPES.map(type => type.id);
        setShowAllHazards(true);
      } else {
        // Otherwise remove this type from active filters
        newActiveTypes = activeHazardTypes.filter(id => id !== typeId);
      }
    } else {
      // Add this type to active filters
      newActiveTypes = [...activeHazardTypes, typeId];
      
      // If now all types are active, update the showAllHazards flag
      if (newActiveTypes.length === HAZARD_TYPES.length) {
        setShowAllHazards(true);
      }
    }
    
    setActiveHazardTypes(newActiveTypes);
    
    // Update parent component's filter state
    if (setFilteredHazardTypes) {
      setFilteredHazardTypes(newActiveTypes);
    }
  };
  
  const resetFilters = () => {
    const allTypes = HAZARD_TYPES.map(type => type.id);
    setActiveHazardTypes(allTypes);
    setShowAllHazards(true);
    
    if (setFilteredHazardTypes) {
      setFilteredHazardTypes(allTypes);
    }
  };

  return (
    <Paper sx={{ 
      position: 'absolute', 
      bottom: 20, 
      right: 20, 
      zIndex: 1000, 
      p: 2, 
      backgroundColor: 'rgba(255, 255, 255, 0.9)' 
    }}>
      <Typography variant="subtitle2" gutterBottom>
        Legend {!showAllHazards && '(Filtered)'}
      </Typography>
      
      {/* HOUSE PINS Legend */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box 
          sx={{ 
            width: 16, 
            height: 16, 
            borderRadius: '50%', 
            bgcolor: HOUSE_PIN_COLOR, 
            mr: 1 
          }} 
        />
        <Typography variant="body2">House Location</Typography>
      </Box>
      
      {/* HAZARD TYPES Legend - Clickable */}
      <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
        Hazard Areas:
      </Typography>
      
      {HAZARD_TYPES.map((hazard) => (
        <Tooltip 
          key={hazard.id} 
          title={activeHazardTypes.includes(hazard.id) 
            ? (activeHazardTypes.length === 1 ? "Click to show all types" : "Click to hide this type") 
            : "Click to show this type"}
          arrow
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 1,
              cursor: 'pointer',
              opacity: activeHazardTypes.includes(hazard.id) ? 1 : 0.5,
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.05)',
              },
              transition: 'opacity 0.2s, background-color 0.2s'
            }}
            onClick={() => toggleHazardType(hazard.id)}
          >
            <Box 
              sx={{ 
                width: 16, 
                height: 16, 
                borderRadius: '50%', 
                bgcolor: hazard.color, 
                mr: 1 
              }} 
            />
            <Typography variant="body2">{hazard.label}</Typography>
          </Box>
        </Tooltip>
      ))}
      
      {/* Show All link when filtered */}
      {!showAllHazards && (
        <Typography 
          variant="body2" 
          color="primary" 
          sx={{ 
            mt: 1, 
            cursor: 'pointer', 
            textDecoration: 'underline',
            '&:hover': { fontWeight: 'bold' }
          }}
          onClick={resetFilters}
        >
          Show All Hazards
        </Typography>
      )}
    </Paper>
  );
};

export default MapLegend;