import { Box, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { Close, AddCircle, Map, Warning, LocationOn } from '@mui/icons-material'

import { HAZARD_TYPES } from '../../utils/constant';




const MapControls = ({
  isHazardModeActive,
  toggleHazardMode,
  selectedHazardType,
  handleHazardTypeChange,
  showBarangayBoundaries,
  setShowBarangayBoundaries,
  showHazardAreas,
  setShowHazardAreas,
  showHousePins,
  setShowHousePins
}) => {
  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {/* Toggle Hazard Mode Button */}
      <Button 
        variant={isHazardModeActive ? "contained" : "outlined"} 
        color={isHazardModeActive ? "error" : "primary"}
        startIcon={isHazardModeActive ? <Close /> : <AddCircle />}
        onClick={toggleHazardMode}
      >
        {isHazardModeActive ? "Exit Hazard Mode" : "Add Hazard Areas"}
      </Button>

      {/* Select Hazard Type - Only show when in hazard mode */}
      {isHazardModeActive && (
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="hazard-type-select-label">Hazard Type</InputLabel>
          <Select
            labelId="hazard-type-select-label"
            id="hazard-type-select"
            value={selectedHazardType}
            onChange={handleHazardTypeChange}
            label="Hazard Type"
          >
            {HAZARD_TYPES.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box 
                    sx={{ 
                      width: 12, 
                      height: 12, 
                      borderRadius: '50%', 
                      bgcolor: type.color, 
                      mr: 1 
                    }} 
                  />
                  {type.label}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Layer Control Buttons */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Button
          variant={showBarangayBoundaries ? "contained" : "outlined"}
          color={showBarangayBoundaries ? "primary" : "inherit"}
          startIcon={<Map />}
          size="small"
          onClick={() => setShowBarangayBoundaries(!showBarangayBoundaries)}
          disabled={isHazardModeActive}
        >
          {showBarangayBoundaries ? "Hide Boundaries" : "Show Boundaries"}
        </Button>
        
        <Button
          variant={showHazardAreas ? "contained" : "outlined"}
          color={showHazardAreas ? "warning" : "inherit"}
          startIcon={<Warning />}
          size="small"
          onClick={() => setShowHazardAreas(!showHazardAreas)}
          disabled={isHazardModeActive}
        >
          {showHazardAreas ? "Hide Hazards" : "Show Hazards"}
        </Button>
        
        <Button
          variant={showHousePins ? "contained" : "outlined"}
          color={showHousePins ? "success" : "inherit"}
          startIcon={<LocationOn />}
          size="small"
          onClick={() => setShowHousePins(!showHousePins)}
          disabled={isHazardModeActive}
        >
          {showHousePins ? "Hide Pins" : "Show Pins"}
        </Button>
      </Box>

      {/* Hazard Mode Instruction Text */}
      {isHazardModeActive && (
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Typography variant="body2" color="error">
            Click on the map to add hazard areas. Click on a hazard area to edit it.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MapControls;