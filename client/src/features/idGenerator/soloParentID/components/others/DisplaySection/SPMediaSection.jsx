import { Box, Typography, Grid } from "@mui/material";

export const SPMediaSection = (media) => {
  
  if (!media) return null;
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Picture ID
          </Typography>
          {media.photoID && (
            <Box sx={{ border: '1px solid #ddd', borderRadius: 1, p: 1, maxWidth: 300 }}>
              <img 
                src={media.photoIDPreview || media.photoID} 
                alt="Photo ID" 
                style={{ maxWidth: '100%', maxHeight: '200px' }} 
              />
            </Box>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Signature
          </Typography>
          {media.signature && (
            <Box sx={{ border: '1px solid #ddd', borderRadius: 1, p: 1, maxWidth: 300 }}>
              <img 
                src={media.signature} 
                alt="Signature" 
                style={{ maxWidth: '100%', maxHeight: '100px' }} 
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};