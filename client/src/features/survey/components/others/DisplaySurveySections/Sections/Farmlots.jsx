import { Box, Typography, Paper, Grid, Divider } from "@mui/material";


export const FarmlotsSection = (farmlots) => {

  if (!farmlots || 
      !farmlots.cultivation ||
      !farmlots.pastureland || 
      !farmlots.forestland
    ) return null;
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">Cultivation</Typography>
          <Typography variant="body2">{farmlots.cultivation} lot(s)</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">Pastureland</Typography>
          <Typography variant="body2">{farmlots.pastureland} lot(s)</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">Forestland</Typography>
          <Typography variant="body2">{farmlots.forestland} lot(s)</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};