import { Circle, Popup } from 'react-leaflet';
import { Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { HAZARD_TYPES } from '../../../utils/constant';




const HazardAreasLayer = ({ 
  hazardAreas, 
  filteredHazardTypes, 
  isHazardModeActive, 
  onEditHazard 
}) => {

  if (!hazardAreas || hazardAreas.length === 0) return null;

  return (
    <>
      {hazardAreas
        .filter(hazard => filteredHazardTypes.includes(hazard.type))
        .map((hazard, index) => {
          // Find the actual index in the original array for edit operations
          const originalIndex = hazardAreas.findIndex(h => h.id === hazard.id);
          
          return (
            <Circle
              key={`hazard-${hazard.id || index}`}
              center={hazard.position}
              radius={hazard.radius}
              pathOptions={{
                fillColor: hazard.color,
                fillOpacity: 0.5,
                color: hazard.color,
                weight: 2
              }}
              eventHandlers={{
                click: () => {
                  if (isHazardModeActive) {
                    onEditHazard(originalIndex);
                  }
                }
              }}
            >
              <Popup>
                <Typography variant="subtitle2">{hazard.description}</Typography>
                <Typography variant="body2">
                  {HAZARD_TYPES.find(h => h.id === hazard.type).label}
                </Typography>
                <Typography variant="body2">
                  Radius: {hazard.radius} meters
                </Typography>
                {isHazardModeActive && (
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => onEditHazard(originalIndex)}
                    sx={{ mt: 1 }}
                  >
                    Edit
                  </Button>
                )}
              </Popup>
            </Circle>
          );
        })}
    </>
  );
};

export default HazardAreasLayer;