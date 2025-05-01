import { Box, Typography, Grid } from "@mui/material";


export const HouseLocationSection = (houseLocation) => {

  if (!houseLocation) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="text.secondary">No House Location added.</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">
            House Address
          </Typography>
          <Typography variant="body2">
            {`${houseLocation.houseStreet} Brgy.${houseLocation.barangay}, ${houseLocation.municipality}`}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">
            House Coordinates
          </Typography>
          <Typography variant="body2">
            {houseLocation.latitude + ' ' + houseLocation.longitude}
          </Typography>
        </Grid>
      </Grid>
      </Box>
  );
};