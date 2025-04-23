import { Box, Typography, Button, Divider } from "@mui/material";
import { Download } from "@mui/icons-material";

const DatabankHeader = ({ title, onExport, Icon }) => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left side: icon + title */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {Icon && <Icon />} {/* Only show if Icon is passed */}
          <Typography variant="h5" fontWeight="bold">
            {title || 'MASTERLIST'}
          </Typography>
        </Box>

        {/* Right side: Export button */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            endIcon={<Download />}
            color="success"
            onClick={onExport}
            sx={{ fontSize: '0.75rem' }}
          >
            EXPORT EXCEL
          </Button>
        </Box>
      </Box>

      <Divider />
    </>
  );
};

export default DatabankHeader;
