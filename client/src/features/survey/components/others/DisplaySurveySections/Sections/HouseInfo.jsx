// Component imports with React hooks
import { Box, Typography, Chip, Grid, Divider, Card, CardContent, Tooltip, Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Edit, Person, Work, People, House, Home, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";
import { useState, useRef } from "react";

export const HouseInfoSection = ({ formData, handleEdit, isViewing = false }) => {
  const houseInfo = formData.houseInfo;
  const scrollContainerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };
  
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  
  const handleCloseImageView = () => {
    setSelectedImage(null);
  };

  return (
    <Box
      sx={{ 
        backgroundColor: 'white',
        padding: { xs: '1em', md: '2em' }
      }}
    >
      <Box sx={{
        display: 'flex', 
        justifyContent: 'end', 
        alignItems: 'center', 
        mb: 2,
        pb: 1
      }}>
        {!isViewing && (
          <Tooltip title="Edit section">
            <Button
              onClick={() => handleEdit(8)}
              variant="outlined"
              color="primary"
              startIcon={<Edit/>}
            >
              EDIT
            </Button>
          </Tooltip>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Home color="primary"/>
            <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
              HOUSE INFORMATION
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">
                House Condition
              </Typography>
              <Typography variant="body2">
                {houseInfo.houseCondition}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">
                House Structure
              </Typography>
              <Typography variant="body2">
                {houseInfo.houseStructure}
              </Typography>
            </Grid>
          </Grid>

          {/* House Images Display */}
          {houseInfo.houseImages && houseInfo.houseImages.length > 0 ? (
            <Box sx={{ mt: 2 }}>
              {/* Image gallery with overlaid navigation */}
              <Box sx={{ 
                position: 'relative',
                width: '100%',
                mb: 1
              }}>
                {/* Scrollable container */}
                <Box
                  sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    scrollBehavior: 'smooth',
                    width: '100%',
                    '&::-webkit-scrollbar': {
                      height: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: '#f1f1f1',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#bbb',
                      borderRadius: '10px',
                      '&:hover': {
                        backgroundColor: '#999',
                      },
                    },
                    px: 1,
                    py: 2,
                  }}
                  id="imageScrollContainer"
                  ref={scrollContainerRef}
                >
                  {houseInfo.houseImages.map((image, index) => (
                    <Box
                      key={index}
                      onClick={() => handleImageClick(image)}
                      sx={{
                        minWidth: { xs: '180px', sm: '220px', md: '250px' },
                        height: { xs: '180px', sm: '200px', md: '220px' },
                        mr: { xs: 1.5, md: 2 },
                        border: '1px solid #eee',
                        borderRadius: 1,
                        padding: { xs: 0.5, md: 1 },
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <img
                        src={image.preview}
                        alt={image.title || `House Image ${index + 1}`}
                        style={{ 
                          width: '100%', 
                          height: isMobile ? '140px' : '180px', 
                          objectFit: 'cover', 
                          borderRadius: '4px' 
                        }}
                      />
                      <Typography
                        variant={isMobile ? "caption" : "subtitle2"}
                        sx={{
                          mt: 1,
                          textAlign: 'center',
                          fontWeight: 'medium',
                          color: 'primary.main',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {image.title || `Image ${index + 1}`}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                
                {/* Overlaid navigation buttons */}
                {houseInfo.houseImages.length > 1 && (
                  <>
                    {/* Left button */}
                    <IconButton
                      onClick={scrollLeft}
                      sx={{
                        position: 'absolute',
                        left: { xs: 0, sm: 5 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        minWidth: { xs: '32px', md: '40px' },
                        width: { xs: '32px', md: '40px' },
                        height: { xs: '32px', md: '40px' },
                        backgroundColor: 'rgba(25, 118, 210, 0.7)',
                        color: 'white',
                        zIndex: 2,
                        '&:hover': {
                          backgroundColor: 'primary.main',
                        },
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                      }}
                      size="small"
                    >
                      <ChevronLeft fontSize={isMobile ? "small" : "medium"} />
                    </IconButton>
                    
                    {/* Right button */}
                    <IconButton
                      onClick={scrollRight}
                      sx={{
                        position: 'absolute',
                        right: { xs: 0, sm: 5 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        minWidth: { xs: '32px', md: '40px' },
                        width: { xs: '32px', md: '40px' },
                        height: { xs: '32px', md: '40px' },
                        backgroundColor: 'rgba(25, 118, 210, 0.7)',
                        color: 'white',
                        zIndex: 2,
                        '&:hover': {
                          backgroundColor: 'primary.main',
                        },
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                      }}
                      size="small"
                    >
                      <ChevronRight fontSize={isMobile ? "small" : "medium"} />
                    </IconButton>
                  </>
                )}
              </Box>
            </Box>
          ) : houseInfo.houseImagePreview ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                House Image:
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <img 
                  src={houseInfo.houseImagePreview} 
                  alt="House" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: isMobile ? '250px' : '300px', 
                    borderRadius: '4px', 
                    cursor: 'pointer' 
                  }}
                  onClick={() => handleImageClick({ preview: houseInfo.houseImagePreview, title: houseInfo.houseImageTitle })}
                />
                {houseInfo.houseImageTitle && (
                  <Typography 
                    variant={isMobile ? "caption" : "subtitle2"} 
                    sx={{ mt: 1, textAlign: 'center', fontWeight: 'medium' }}
                  >
                    {houseInfo.houseImageTitle}
                  </Typography>
                )}
              </Box>
            </Box>
          ) : null}
          
          {/* Full-size image viewer modal */}
          {selectedImage && (
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: 2
              }}
              onClick={handleCloseImageView}
            >
              <Box
                sx={{
                  position: 'relative',
                  maxWidth: '90%',
                  maxHeight: '90%',
                  overflow: 'auto',
                  backgroundColor: 'white',
                  borderRadius: 1,
                  p: { xs: 1, md: 2 }
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.preview}
                  alt={selectedImage.title || "House Image"}
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: 'calc(90vh - 6rem)',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
                {selectedImage.title && (
                  <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    sx={{
                      textAlign: 'center',
                      mt: 2,
                      color: 'primary.main'
                    }}
                  >
                    {selectedImage.title}
                  </Typography>
                )}
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.4)',
                    }
                  }}
                  onClick={handleCloseImageView}
                >
                  <Typography variant="h6">×</Typography>
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};