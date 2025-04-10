import { Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";


export const CropsPlantedSection = (cropsPlanted) => {

  if (!cropsPlanted) return null;
  
  return (
    <Box sx={{ mb: 4 }}>
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


