import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell,TableBody, Tooltip, Button,
        useMediaQuery, useTheme, IconButton } from "@mui/material";
import { Blender, Edit, Pets } from "@mui/icons-material";


export const AppliancesSection = ({ formData, handleEdit, isViewing = false }) => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const appliancesOwn = formData.appliancesOwn;
  
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
            <Blender/>
            <Typography variant={isSmallScreen ? 'h7' : 'h5'} sx={{ fontWeight: 'bold' }}>
              Appliances
            </Typography> 
          </Box>
        </Box>
          {!isViewing && (
            <Tooltip title="Edit section">
              {isSmallScreen ? (
                <IconButton onClick={() => handleEdit(16)} color="primary">
                  <Edit />
                </IconButton>
              ) : (
                <Button
                  onClick={() => handleEdit(16)}
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


