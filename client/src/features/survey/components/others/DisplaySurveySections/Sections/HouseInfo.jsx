import { Box, Typography, Paper, Grid, Divider } from "@mui/material";


export const HouseInfoSection = (houseInfo) => {

  if (!houseInfo) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="text.secondary">No House Information added.</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
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
          <Grid container spacing={2} sx={{ px: 1 }}>
            {houseInfo.houseImages.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box 
                  sx={{ 
                    border: '1px solid #eee',
                    borderRadius: 1,
                    padding: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <img 
                    src={image.preview} 
                    alt={image.title || `House Image ${index + 1}`}
                    style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }} 
                  />
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mt: 1, 
                      textAlign: 'center', 
                      fontWeight: 'medium',
                      color: 'primary.main'
                    }}
                  >
                    {image.title || `Image ${index + 1}`}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : houseInfo.houseImagePreview ? (
        <div className="image-container">
          <p className="info-label">House Image:</p>
          <img 
            src={houseInfo.houseImagePreview} 
            alt="House" 
            style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px' }} 
          />
          {houseInfo.houseImageTitle && (
            <Typography 
              variant="subtitle2" 
              sx={{ mt: 1, textAlign: 'center', fontWeight: 'medium' }}
            >
              {houseInfo.houseImageTitle}
            </Typography>
          )}
        </div>
      ) : null}
      </Box>
  );
};