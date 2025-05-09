import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell,TableBody, Tooltip, Button,
        useMediaQuery, useTheme, IconButton } from "@mui/material";
import { Edit, Pets } from "@mui/icons-material";



export const RenderLivestockTable = ({ formData, handleEdit, isViewing = false }) => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const livestock = formData.livestock;

  if (!livestock) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="text.secondary">No Animals/Livestock added.</Typography>
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
              <Pets/>
              <Typography variant={isSmallScreen ? 'h7' : 'h5'} sx={{ fontWeight: 'bold' }}>
                Livestock/Animals
              </Typography> 
            </Box>
          </Box>
            {!isViewing && (
              <Tooltip title="Edit section">
                {isSmallScreen ? (
                  <IconButton onClick={() => handleEdit(11)} color="primary">
                    <Edit />
                  </IconButton>
                ) : (
                  <Button
                    onClick={() => handleEdit(11)}
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