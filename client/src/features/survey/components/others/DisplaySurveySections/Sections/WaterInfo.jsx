import { Box, Typography, Chip, Grid, Divider, useMediaQuery, useTheme, Tooltip, Button } from "@mui/material";
import { Edit, Person, Work, People, WaterDrop } from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";




export const WaterInfoSection = ({ formData, handleEdit, isViewing = false }) => {

  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));

  const waterInfo = formData.waterInfo;
  
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
                onClick={() => handleEdit(10)}
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
              <WaterDrop color="primary"/>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
                WATER ACCESS
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Access to water (Level III)
                </Typography>
                <Typography variant="body2">
                  {waterInfo.waterAccess}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Is your water potable?
                </Typography>
                <Typography variant="body2">
                  {waterInfo.potableWater}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Sources of water
                </Typography>
                <Typography variant="body2">
                  {waterInfo.waterSources}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
    </Box>
  );
};