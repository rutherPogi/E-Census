import { Box, Typography, Grid } from "@mui/material";


export const EmergencyContactSection = (member) => {

  if (!member) return null;
  
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              Contact Name
            </Typography>
            <Typography variant="body2">{member.contactName}</Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              Relationship
            </Typography>
            <Typography variant="body2">{member.relationship}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              Address
            </Typography>
            <Typography variant="body2">
              {member.street}
              {member.barangay}
              {member.municipality}
              {member.province}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              Contact Number
            </Typography>
            <Typography variant="body2">
              {member.mobileNumber}
            </Typography>
          </Grid>
        </Grid>
      </Box>
  </Box>
  );
};