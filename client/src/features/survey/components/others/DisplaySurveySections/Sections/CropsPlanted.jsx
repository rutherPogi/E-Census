import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell,TableBody, Tooltip, Button,
  useMediaQuery, useTheme, IconButton } from "@mui/material";
import { Edit, Grass, Pets } from "@mui/icons-material";



export const CropsPlantedSection = ({ formData, handleEdit, isViewing = false }) => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const cropsPlanted = formData.cropsPlanted;

  if (!cropsPlanted) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="text.secondary">No Crops added.</Typography>
      </Box>
    );
  }
  
  return (
    <Box
      sx={{ 
        backgroundColor: 'white',
        padding: { xs: '1em', md: '2em' }
        }}
      >
        <Box sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          pb: 1
        }}>
          <Box sx={{ alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center'}}>
              <Grass/>
              <Typography variant={isSmallScreen ? 'h7' : 'h5'} sx={{ fontWeight: 'bold' }}>
                Crops Planted
              </Typography> 
            </Box>
          </Box>
            {!isViewing && (
              <Tooltip title="Edit section">
                {isSmallScreen ? (
                  <IconButton onClick={() => handleEdit(13)} color="primary">
                    <Edit />
                  </IconButton>
                ) : (
                  <Button
                    onClick={() => handleEdit(13)}
                    variant="outlined"
                    color="primary"
                    startIcon={<Edit />}
                  >
                    EDIT
                  </Button>
                )}
              </Tooltip>
            )}
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Crop</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Area (Hectares)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(cropsPlanted.crops || cropsPlanted).map(([crop, area]) => (
                <TableRow key={crop} hover>
                  <TableCell component="th" scope="row">{crop}</TableCell>
                  <TableCell align="right">{area || '0'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </Box>
  );
};


