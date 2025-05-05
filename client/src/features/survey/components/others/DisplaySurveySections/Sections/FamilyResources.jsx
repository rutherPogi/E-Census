import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell,TableBody, Tooltip, Button,
         useMediaQuery, useTheme, IconButton } from "@mui/material";
import { Edit, FamilyRestroom, Pets } from "@mui/icons-material";



export const FamilyResourcesSection = ({ formData, handleEdit, isViewing = false }) => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const familyResources = formData.familyResources;
  
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
            <FamilyRestroom/>
            <Typography variant={isSmallScreen ? 'h7' : 'h5'} sx={{ fontWeight: 'bold' }}>
              Family Resources
            </Typography> 
          </Box>
        </Box>
          {!isViewing && (
            <Tooltip title="Edit section">
              {isSmallScreen ? (
                <IconButton onClick={() => handleEdit(10)} color="primary">
                  <Edit />
                </IconButton>
              ) : (
                <Button
                  onClick={() => handleEdit(10)}
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


