// components/dialogs/HouseDetailsDialog.jsx
import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  IconButton, 
  Grid, 
  Typography, 
  Box, 
  Button, 
  CircularProgress, 
  Tabs, 
  Tab,
  Paper,
  Card,
  CardContent,
  Divider,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import ImageIcon from '@mui/icons-material/Image';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import { useHouseImages } from '../../hooks/useHouseImages';
import { useHousehold } from '../../hooks/useHousehold';

const HouseDetailsDialog = ({ open, onClose, selectedHouse }) => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tabValue, setTabValue] = useState(0);

  const { getHouseImagesBySurveyId, isLoading: imagesLoading } = useHouseImages();
  const { getHouseholdBySurveyId, isLoading: householdLoading } = useHousehold();
  
  if (!selectedHouse) return null;

  const houseImages = getHouseImagesBySurveyId(selectedHouse.surveyID);
  const household = getHouseholdBySurveyId(selectedHouse.surveyID);

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
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: 'primary.main', 
        color: 'primary.contrastText',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 3,
        py: 2
      }}>
        <HomeIcon />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          House Information
        </Typography>
        <Chip 
          label={`SURVEY ID: ${selectedHouse.surveyID}`}
          size="small"
          sx={{ 
            bgcolor: 'rgba(255,255,255,0.2)', 
            color: 'white',
            mr: 2
          }}
        />
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.2)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Tabs 
        value={tabValue} 
        onChange={handleTabChange} 
        variant="fullWidth"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          '& .MuiTab-root': {
            py: 1.5,
            fontWeight: 'medium',
          }
        }}
      >
        <Tab 
          label="House Info" 
          icon={<BusinessIcon />} 
          iconPosition="start"
          sx={{ 
            minHeight: 'unset',
            textTransform: 'none',
            fontSize: '1rem'
          }}
        />
        <Tab 
          label="House Images" 
          icon={<ImageIcon />} 
          iconPosition="start"
          sx={{ 
            minHeight: 'unset',
            textTransform: 'none',
            fontSize: '1rem'
          }}
        />
        <Tab 
          label="Household" 
          icon={<PeopleIcon />} 
          iconPosition="start"
          sx={{ 
            minHeight: 'unset',
            textTransform: 'none',
            fontSize: '1rem'
          }}
        />
      </Tabs>

      <DialogContent sx={{ p: { xs: 2, md: 3 }, bgcolor: 'background.default' }}>
        {/* House Info Tab */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            {/* House Details Section */}
            <Grid item xs={12} md={6}>
              <Card elevation={1} sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BusinessIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6">House Details</Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        House Condition
                      </Typography>
                      <Typography variant="body1" fontWeight="medium" mb={1}>
                        {selectedHouse.houseCondition || "N/A"}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        House Structure
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {selectedHouse.houseStructure || "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Location Section */}
            <Grid item xs={12} md={6}>
              <Card elevation={1} sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6">Location</Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Address
                      </Typography>
                      <Typography variant="body1" fontWeight="medium" mb={1}>
                        {selectedHouse.houseStreet ? `${selectedHouse.houseStreet}, ` : ""}
                        {selectedHouse.barangay ? `Brgy. ${selectedHouse.barangay}, ` : ""}
                        {selectedHouse.municipality || "N/A"}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MapIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                        <Typography variant="subtitle2" color="text.secondary">
                          Coordinates
                        </Typography>
                      </Box>
                      <Typography variant="body1" fontWeight="medium">
                        {selectedHouse.latitude}, {selectedHouse.longitude}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* House Images Tab */}
        {tabValue === 1 && (
          <Box sx={{ position: 'relative', minHeight: '300px' }}>
            {imagesLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <CircularProgress />
              </Box>
            ) : houseImages.length > 0 ? (
              <Paper elevation={1} sx={{ p: 2, position: 'relative' }}>
                <Box sx={{ position: 'relative', borderRadius: 1, overflow: 'hidden', backgroundColor: 'black' }}>
                  <Box 
                    component="img" 
                    src={houseImages[currentImageIndex]?.houseImage}
                    alt={houseImages[currentImageIndex]?.houseTitle || "House Image"}
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
                  
                  {houseImages.length > 1 && (
                    <>
                      <IconButton 
                        onClick={handlePrevImage}
                        sx={{ 
                          position: 'absolute', 
                          left: 10, 
                          top: '50%', 
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          '&:hover': { 
                            backgroundColor: 'rgba(0, 0, 0, 0.7)' 
                          }
                        }}
                      >
                        <ArrowBackIosNewIcon />
                      </IconButton>
                      <IconButton 
                        onClick={handleNextImage}
                        sx={{ 
                          position: 'absolute', 
                          right: 10, 
                          top: '50%', 
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          '&:hover': { 
                            backgroundColor: 'rgba(0, 0, 0, 0.7)' 
                          }
                        }}
                      >
                        <ArrowForwardIosIcon />
                      </IconButton>
                    </>
                  )}
                </Box>
                
                <Box sx={{ 
                  mt: 2, 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {houseImages[currentImageIndex]?.houseTitle || "House Image"}
                  </Typography>
                  <Chip 
                    label={`${currentImageIndex + 1} of ${houseImages.length}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              </Paper>
            ) : (
              <Paper elevation={1} sx={{ 
                p: 4, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
                bgcolor: 'background.paper'
              }}>
                <ImageIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No images available
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  There are no images available for this house.
                </Typography>
              </Paper>
            )}
          </Box>
        )}

        {/* Household Tab */}
        {tabValue === 2 && (
          <Box sx={{ position: 'relative', minHeight: '300px' }}>
            {householdLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <CircularProgress />
              </Box>
            ) : household.length > 0 ? (
              <Box>
                {household.map((member, index) => (
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                      }}>
                        <Avatar sx={{ 
                          bgcolor: 'primary.main', 
                          width: 36, 
                          height: 36, 
                          mr: 1.5 
                        }}>
                          {member.firstName ? member.firstName.charAt(0) : <PersonIcon />}
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight="medium" noWrap>
                          {`${member.firstName}
                            ${member.middleName ? member.middleName : ''}
                            ${member.lastName}
                            ${member.suffix ? member.suffix : ''}`}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              <Paper elevation={1} sx={{ 
                p: 4, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
                bgcolor: 'background.paper'
              }}>
                <PeopleIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No household members
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  There are no household members recorded for this house.
                </Typography>
              </Paper>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ 
        px: 3, 
        py: 2,
        borderTop: '1px solid',
        borderColor: 'divider'
      }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{ 
            px: 3,
            py: 1,
            textTransform: 'none',
            borderRadius: 1.5,
            fontSize: '0.95rem'
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HouseDetailsDialog;