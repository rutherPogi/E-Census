import { Box, Typography, Chip, Grid, Divider, Card, CardContent, Tooltip, Button } from "@mui/material";
import { Edit, Person, Work, People, LocationOn } from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";




export const HouseLocationSection = ({ formData, handleEdit, isViewing = false }) => {

  const houseLocation = formData.houseLocation;

  
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
                onClick={() => handleEdit(9)}
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
            <Box sx={{ display: 'flex', gap: 2}}>
              <LocationOn color="primary"/>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
                HOUSE LOCATION
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  House Address
                </Typography>
                <Typography variant="body2">
                  {`${houseLocation.houseStreet} Brgy. ${houseLocation.barangay}, ${houseLocation.municipality}, Batanes`}
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
            </Box>
          </Box>
        </Box>
    </Box>
  );
};