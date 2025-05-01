import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from "@mui/material";
import { formatters } from "../../../../utils/formatter";

export const renderServiceAvailed = (services) => {
  
  if (!services || services.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="text.secondary">No Assistance/Services added.</Typography>
      </Box>
    );
  }

  const headerStyle = {
    height: "70px", // Fixed height for header cells
    whiteSpace: "normal",
    overflow: "auto",
    padding: "8px",

  };

  return (
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
  );
};