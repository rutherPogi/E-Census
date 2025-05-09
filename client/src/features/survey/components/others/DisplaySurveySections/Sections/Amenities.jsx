import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell,TableBody, Tooltip, Button,
        useMediaQuery, useTheme, IconButton } from "@mui/material";
import { Edit, Pets, TwoWheeler } from "@mui/icons-material";



export const AmenitiesSection = ({ formData, handleEdit, isViewing = false }) => {
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const amenitiesOwn = formData.amenitiesOwn;
  
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
            <TwoWheeler/>
            <Typography variant={isSmallScreen ? 'h7' : 'h5'} sx={{ fontWeight: 'bold' }}>
              Amenities
            </Typography> 
          </Box>
        </Box>
          {!isViewing && (
            <Tooltip title="Edit section">
              {isSmallScreen ? (
                <IconButton onClick={() => handleEdit(17)} color="primary">
                  <Edit />
                </IconButton>
              ) : (
                <Button
                  onClick={() => handleEdit(17)}
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
              <TableCell sx={{ fontWeight: 'bold' }}>Amenity</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(amenitiesOwn.amenities || amenitiesOwn).map(([amenity, quantity]) => (
              <TableRow key={amenity} hover>
                <TableCell component="th" scope="row">{amenity}</TableCell>
                <TableCell align="right">{quantity || '0'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};


