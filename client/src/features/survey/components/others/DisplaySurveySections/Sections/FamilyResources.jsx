import { Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";


export const FamilyResourcesSection = (familyResources) => {

  if (!familyResources) return null;
  
  return (
    <Box sx={{ mb: 4 }}>
      <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Source</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Average Income</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(familyResources.resources || familyResources).map(([source, income]) => (
              <TableRow key={source} hover>
                <TableCell component="th" scope="row">{source}</TableCell>
                <TableCell align="right">{income || '0'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};


