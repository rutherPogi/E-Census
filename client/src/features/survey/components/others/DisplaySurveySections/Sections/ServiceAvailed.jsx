import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell,TableBody, Tooltip, Button, Paper,
        useMediaQuery, useTheme, IconButton } from "@mui/material";
import { Edit, MedicalServices, Pets } from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";

export const RenderServiceAvailed = ({ formData, handleEdit, isViewing = false }) => {
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const services = formData.serviceAvailed;

  const headerStyle = {
    height: "70px", // Fixed height for header cells
    whiteSpace: "normal",
    overflow: "auto",
    padding: "8px",

  };

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
              <MedicalServices/>
              <Typography variant={isSmallScreen ? 'h7' : 'h5'} sx={{ fontWeight: 'bold' }}>
                Assistance/Services Availed
              </Typography> 
            </Box>
          </Box>
            {!isViewing && (
              <Tooltip title="Edit section">
                {isSmallScreen ? (
                  <IconButton onClick={() => handleEdit(20)} color="primary">
                    <Edit />
                  </IconButton>
                ) : (
                  <Button
                    onClick={() => handleEdit(20)}
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
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table aria-label="services availed table" size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.light' }}>
              <TableCell sx={headerStyle}>Date Availed</TableCell>
              <TableCell sx={headerStyle}>Name of NGO</TableCell>
              <TableCell sx={headerStyle}>Kind of Assistance Extended</TableCell>
              <TableCell align="center" sx={headerStyle}>Male Served</TableCell>
              <TableCell align="center" sx={headerStyle}>Female Served</TableCell>
              <TableCell align="center" sx={headerStyle}>Total Served</TableCell>
              <TableCell sx={headerStyle}>How the service help the family</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service, index) => (
              <TableRow key={index}>
                <TableCell>{formatters.date(service.dateServiceAvailed)}</TableCell>
                <TableCell>{service.ngoName || 'N/A'}</TableCell>
                <TableCell>{service.assistance || service.serviceAvailed || 'N/A'}</TableCell>
                <TableCell align="center">{service.maleServed || '0'}</TableCell>
                <TableCell align="center">{service.femaleServed || '0'}</TableCell>
                <TableCell align="center">{service.totalServed || '0'}</TableCell>
                <TableCell>{service.howServiceHelp || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};