import { Box, Typography, Paper, Grid } from "@mui/material";
import { formatters } from "../../../../utils/formatter";

export const renderServiceAvailed = (services) => {

  if (!services || services.length === 0) return null;
  
  return (
    <Box sx={{ mb: 4 }}>
      {services.map((service, index) => (
        <Paper key={index} elevation={1} sx={{ p: 2, mb: 2, borderRadius: '4px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">Date Availed</Typography>
              <Typography variant="body1">{formatters.date(service.dateServiceAvailed)}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">Name of NGO</Typography>
              <Typography variant="body1">{service.ngoName || 'N/A'}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">Kind of Assistance Extended</Typography>
              <Typography variant="body1">{service.assistance || service.serviceAvailed || 'N/A'}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={4} md={2}>
              <Typography variant="subtitle2" color="text.secondary">Male Served</Typography>
              <Typography variant="body1">{service.maleServed || '0'}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={4} md={2}>
              <Typography variant="subtitle2" color="text.secondary">Female Served</Typography>
              <Typography variant="body1">{service.femaleServed || '0'}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={4} md={2}>
              <Typography variant="subtitle2" color="text.secondary">Total Served</Typography>
              <Typography variant="body1">{service.totalServed || '0'}</Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">How the service help the family</Typography>
              <Typography variant="body1">{service.howServiceHelp || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};