import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Grid, Typography, 
         Box, Button, FormControl, InputLabel, Select, MenuItem, TextField, Slider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { HAZARD_TYPES } from "../../utils/constant";


const HazardEditorDialog = ({ 
  open, 
  onClose, 
  selectedHazard,
  setSelectedHazard,
  onUpdate,
  onDelete
}) => {

  const handleRadiusChange = (event, newValue) => {
    if (selectedHazard) {
      setSelectedHazard({...selectedHazard, radius: newValue});
    }
  };
  
  const handleDescriptionChange = (event) => {
    if (selectedHazard) {
      setSelectedHazard({ ...selectedHazard, description: event.target.value });
    }
  };

  const handleHazardTypeUpdate = (event) => {
      const newType = event.target.value;
      if (selectedHazard) {
        const typeInfo = HAZARD_TYPES.find(h => h.id === newType);
        setSelectedHazard({
          ...selectedHazard,
          type: newType,
          color: typeInfo.color
        });
      }
    };

  if(!selectedHazard) return null;

  return(
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Edit Hazard Area
          <IconButton
            aria-label="close"
            onClick={onClose}
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
          {selectedHazard && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="edit-hazard-type-label">Hazard Type</InputLabel>
                  <Select
                    labelId="edit-hazard-type-label"
                    value={selectedHazard.type}
                    label="Hazard Type"
                    onChange={handleHazardTypeUpdate}
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
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={selectedHazard.description}
                  onChange={handleDescriptionChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography gutterBottom>
                  Radius: {selectedHazard.radius} meters
                </Typography>
                <Slider
                  value={selectedHazard.radius}
                  min={50}
                  max={1000}
                  step={10}
                  onChange={handleRadiusChange}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}m`}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Position: {selectedHazard.position[0].toFixed(6)}, {selectedHazard.position[1].toFixed(6)}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onDelete} color="error">
            Delete
          </Button>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onUpdate} color="primary" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default HazardEditorDialog
