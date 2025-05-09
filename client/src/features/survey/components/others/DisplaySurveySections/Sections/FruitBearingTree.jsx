import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell,TableBody, Tooltip, Button,
        useMediaQuery, useTheme, IconButton } from "@mui/material";
import { Edit, Park, Pets } from "@mui/icons-material";


export const FruitBearingTreeSection = ({ formData, handleEdit, isViewing = false }) => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const fruitBearingTree = formData.fruitBearingTree;
  
  if (!fruitBearingTree) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="text.secondary">No Fruit Bearing Tree added.</Typography>
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
            <Park/>
            <Typography variant={isSmallScreen ? 'h7' : 'h5'} sx={{ fontWeight: 'bold' }}>
              Fruit Bearing Trees
            </Typography> 
          </Box>
        </Box>
          {!isViewing && (
            <Tooltip title="Edit section">
              {isSmallScreen ? (
                <IconButton onClick={() => handleEdit(14)} color="primary">
                  <Edit />
                </IconButton>
              ) : (
                <Button
                  onClick={() => handleEdit(14)}
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


