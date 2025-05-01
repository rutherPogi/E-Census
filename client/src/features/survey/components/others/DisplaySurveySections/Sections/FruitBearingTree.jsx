import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";


export const FruitBearingTreeSection = (fruitBearingTree) => {

  if (!fruitBearingTree) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="text.secondary">No Fruit Bearing Tree added.</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ mb: 4 }}>
      <TableContainer >
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Tree</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(fruitBearingTree.tree || fruitBearingTree).map(([tree, count]) => (
              <TableRow key={tree} hover>
                <TableCell component="th" scope="row">{tree}</TableCell>
                <TableCell align="right">{count || '0'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};


