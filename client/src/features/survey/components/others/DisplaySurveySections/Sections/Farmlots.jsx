import { Box, Typography, Chip, Grid, Divider, useMediaQuery, useTheme, Tooltip, Button, IconButton } from "@mui/material";
import { Edit, Person, Work, People, WaterDrop, Agriculture } from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";



export const FarmlotsSection = ({ formData, handleEdit, isViewing = false }) => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const farmlots = formData.farmlots;

  
  
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
              onClick={() => handleEdit(12)}
              variant="outlined"
              color="primary"
              startIcon={<Edit />}
            >
              EDIT
            </Button>
          </Tooltip>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
          <Box sx={{ display: 'flex', gap: 2}}>
            <Agriculture color="primary"/>
            <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
              FARMLOTS
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />
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
    </Box>
    </Box>
  );
};