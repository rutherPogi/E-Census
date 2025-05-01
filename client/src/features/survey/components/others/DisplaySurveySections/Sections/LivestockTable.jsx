import { Box, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export const renderLivestockTable = (livestock) => {

  if (!livestock) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="text.secondary">No Animals/Livestock added.</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ mb: 4 }}>
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Animal</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Number</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Own</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Dispersal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(livestock).map(([animal, details]) => (
              <TableRow key={animal} hover>
                <TableCell component="th" scope="row">
                  {animal.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </TableCell>
                <TableCell align="right">{details.number || '0'}</TableCell>
                <TableCell align="right">{details.own || '0'}</TableCell>
                <TableCell align="right">{details.dispersal || '0'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};