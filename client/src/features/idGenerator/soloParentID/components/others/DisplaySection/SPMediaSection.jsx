import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Divider,
  useTheme,
  Paper,
  Button
} from "@mui/material";
import {
  PhotoCamera,
  Create,
  ZoomIn
} from "@mui/icons-material";

export const SPMediaSection = (media) => {
  const theme = useTheme();
  
  if (!media) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 5,
        borderRadius: 2,
        backgroundColor: theme.palette.grey[50],
        border: `1px dashed ${theme.palette.grey[300]}`
      }}>
        <Typography color="text.secondary" variant="h6">No photo ID or signature added</Typography>
      </Box>
    );
  }
  
  return (
    <Grid container spacing={4}>
      {/* PHOTO ID SECTION */}
      <Grid item xs={12} md={6}>
        <Card 
          elevation={3} 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.02)'
            }
          }}
        >
          <Box sx={{ 
            bgcolor: theme.palette.primary.main, 
            color: theme.palette.primary.contrastText,
            py: 1.5,
            px: 2,
            display: 'flex',
            alignItems: 'center'
          }}>
            <PhotoCamera sx={{ mr: 1 }} />
            <Typography variant="subtitle1" fontWeight="medium">
              Picture ID
            </Typography>
          </Box>
          
          <CardContent>
            {media.photoID ? (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' 
              }}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 1, 
                    borderRadius: 1, 
                    mb: 2,
                    position: 'relative',
                    '&:hover .zoom-overlay': {
                      opacity: 1
                    }
                  }}
                >
                  <img 
                    src={media.photoIDPreview || media.photoID} 
                    alt="Photo ID" 
                    style={{ 
                      width: '100%', 
                      maxHeight: '300px',
                      objectFit: 'contain',
                      borderRadius: '4px'
                    }} 
                  />
                  <Box 
                    className="zoom-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s',
                      borderRadius: '4px'
                    }}
                  >
                    <Button 
                      variant="contained" 
                      startIcon={<ZoomIn />}
                      size="small"
                    >
                      View Full Size
                    </Button>
                  </Box>
                </Paper>
                <Typography variant="caption" color="text.secondary">
                  Government-issued ID
                </Typography>
              </Box>
            ) : (
              <Box sx={{ 
                height: 200, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: theme.palette.grey[100],
                borderRadius: 1,
                border: `1px dashed ${theme.palette.grey[400]}`
              }}>
                <Typography variant="body2" color="text.secondary">
                  No photo ID uploaded
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
      
      {/* SIGNATURE SECTION */}
      <Grid item xs={12} md={6}>
        <Card 
          elevation={3} 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.02)'
            }
          }}
        >
          <Box sx={{ 
            bgcolor: theme.palette.secondary.main, 
            color: theme.palette.secondary.contrastText,
            py: 1.5,
            px: 2,
            display: 'flex',
            alignItems: 'center'
          }}>
            <Create sx={{ mr: 1 }} />
            <Typography variant="subtitle1" fontWeight="medium">
              Signature
            </Typography>
          </Box>
          
          <CardContent>
            {media.signature ? (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' 
              }}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 2, 
                    borderRadius: 1, 
                    mb: 2,
                    backgroundColor: theme.palette.common.white,
                    position: 'relative',
                    '&:hover .zoom-overlay': {
                      opacity: 1
                    }
                  }}
                >
                  <img 
                    src={media.signature} 
                    alt="Signature" 
                    style={{ 
                      width: '100%', 
                      maxHeight: '150px',
                      objectFit: 'contain',
                    }} 
                  />
                  <Box 
                    className="zoom-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s',
                      borderRadius: '4px'
                    }}
                  >
                    <Button 
                      variant="contained" 
                      startIcon={<ZoomIn />}
                      size="small"
                      color="secondary"
                    >
                      View Full Size
                    </Button>
                  </Box>
                </Paper>
                <Typography variant="caption" color="text.secondary">
                  Applicant's signature
                </Typography>
              </Box>
            ) : (
              <Box sx={{ 
                height: 200, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: theme.palette.grey[100],
                borderRadius: 1,
                border: `1px dashed ${theme.palette.grey[400]}`
              }}>
                <Typography variant="body2" color="text.secondary">
                  No signature uploaded
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};