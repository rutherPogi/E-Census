// components/dialogs/HouseDetailsDialog.jsx
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, 
         Grid, Typography, Box, Button, CircularProgress, Tabs, Tab } from '@mui/material';
import { useHouseImages } from '../../hooks/useHouseImages';
import { useHousehold } from '../../hooks/useHousehold';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HouseDetailsDialog = ({ open, onClose, selectedHouse }) => {
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  
  const { getHouseImagesBySurveyId, isLoading: imagesLoading } = useHouseImages();
  const { getHouseholdBySurveyId, isLoading: householdLoading } = useHousehold();
  
  if (!selectedHouse) return null;

  const houseImages = getHouseImagesBySurveyId(selectedHouse.surveyID);
  const household = getHouseholdBySurveyId(selectedHouse.surveyID);

  console.log('HOUSEHOLD:', household);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Reset image index when switching to images tab
    if (newValue === 1) setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === houseImages.length - 1 ? 0 : prev + 1);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? houseImages.length - 1 : prev - 1);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
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

      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="House Info" />
        <Tab label="House Images" />
        <Tab label="Household" />
      </Tabs>

      <DialogContent dividers>
        {tabValue === 0 && (
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
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Street:</strong> {selectedHouse.houseStreet || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Barangay:</strong> {selectedHouse.barangay || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Municipality:</strong> {selectedHouse.municipality || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Location: {selectedHouse.latitude}, {selectedHouse.longitude}
              </Typography>
            </Grid>
          </Grid>
        )}

        {tabValue === 1 && (
          <Box sx={{ position: 'relative', minHeight: '300px' }}>
            {imagesLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <CircularProgress />
              </Box>
            ) : houseImages.length > 0 ? (
              <Box sx={{ position: 'relative' }}>
                <Box 
                  component="img" 
                  src={houseImages[currentImageIndex]?.houseImage}
                  alt={houseImages[currentImageIndex]?.hosueTitle || "House Image"}
                  sx={{ 
                    width: '100%', 
                    height: '400px',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto'
                  }}
                  onError={(e) => {
                    console.error('Image failed to load');
                    e.target.onerror = null; 
                    e.target.src = 'path/to/fallback/image.jpg';
                  }}
                />
                <Typography 
                  variant="subtitle1" 
                  align="center" 
                  sx={{ mt: 1 }}
                >
                  {houseImages[currentImageIndex]?.hosueTitle || "House Image"} ({currentImageIndex + 1}/{houseImages.length})
                </Typography>
                
                {houseImages.length > 1 && (
                  <>
                    <IconButton 
                      onClick={handlePrevImage}
                      sx={{ 
                        position: 'absolute', 
                        left: 0, 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                      }}
                    >
                      <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton 
                      onClick={handleNextImage}
                      sx={{ 
                        position: 'absolute', 
                        right: 0, 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                      }}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </>
                )}
              </Box>
            ) : (
              <Typography variant="body1" align="center" sx={{ py: 5 }}>
                No images available for this house.
              </Typography>
            )}
          </Box>
        )}

        {tabValue === 2 && (
          <Box sx={{ position: 'relative', minHeight: '300px' }}>
            {householdLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <CircularProgress />
              </Box>
            ) : household.length > 0 ? (
              <Grid container spacing={2}>
                {household.map((member, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
                      <Typography variant="subtitle1">
                        {member.firstName} {member.middleName} {member.LastName} {member.suffix !== 'N/A' ? member.suffix : ''}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" align="center" sx={{ py: 5 }}>
                No household available for this house.
              </Typography>
            )}
          </Box>
        )}

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HouseDetailsDialog;