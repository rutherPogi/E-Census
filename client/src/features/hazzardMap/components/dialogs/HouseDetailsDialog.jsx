import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, 
         Grid, Typography, Box, Button } from '@mui/material';
import { getImageSource } from '../../hooks/getImageSource';




const HouseDetailsDialog = ({ open, onClose, selectedHouse }) => {

  if (!selectedHouse) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        House Information
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
        <Grid container spacing={2}>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HouseDetailsDialog;