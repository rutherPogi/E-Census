import { Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";


export const AppliancesSection = (appliancesOwn) => {

  if (!appliancesOwn) return null;
  
  return (
    <Box sx={{ mb: 4 }}>
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Appliance</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(appliancesOwn.appliances || appliancesOwn).map(([appliance, quantity]) => (
              <TableRow key={appliance} hover>
                <TableCell component="th" scope="row">{appliance}</TableCell>
                <TableCell align="right">{quantity || '0'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};


