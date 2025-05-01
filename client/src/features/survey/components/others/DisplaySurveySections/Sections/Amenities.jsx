import { Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";


export const AmenitiesSection = (amenitiesOwn) => {
  
  if (!amenitiesOwn) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="text.secondary">No Amenities added.</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ mb: 4 }}>
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


