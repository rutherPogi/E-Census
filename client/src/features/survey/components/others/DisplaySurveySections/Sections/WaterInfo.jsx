import { Box, Typography, Paper, Grid, Divider } from "@mui/material";


export const WaterInfoSection = (waterInfo) => {

  if (!waterInfo) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="text.secondary">No Water Information added.</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">
            Access to water (Level III)
          </Typography>
          <Typography variant="body2">
            {waterInfo.waterAccess}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">
            Is your water potable?
          </Typography>
          <Typography variant="body2">
            {waterInfo.potableWater}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">
            Sources of water
          </Typography>
          <Typography variant="body2">
            {waterInfo.waterSources}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};