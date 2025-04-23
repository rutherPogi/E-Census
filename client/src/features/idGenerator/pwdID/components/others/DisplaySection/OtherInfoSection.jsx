import { Box, Typography, Grid } from "@mui/material";


export const OtherInfoSection = (otherInfo) => {

  if (!otherInfo) return null;
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
        <Box sx = {{ display: 'flex', flexDirection: 'column'}}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Accomplished by {otherInfo.abRole}
            </Typography>
            <Typography variant="body2">
              {`${otherInfo.abFirstName === 'N/A' ? '' : otherInfo.abFirstName || ''} 
                ${otherInfo.abMiddleName === 'N/A' ? '' : otherInfo.abMiddleName || ''} 
                ${otherInfo.abLastName === 'N/A' ? '' : otherInfo.abLastName || ''} 
                ${otherInfo.abSuffix === 'N/A' ? '' : otherInfo.abSuffix || ''}`.trim()}
            </Typography>
          </Box>
        </Box>
  
        <Box sx = {{ display: 'flex', gap: 4 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
            Certified Physician
            </Typography>
            <Typography variant="body2">
              {`${otherInfo.cpFirstName === 'N/A' ? '' : otherInfo.cpFirstName || ''} 
                ${otherInfo.cpMiddleName === 'N/A' ? '' : otherInfo.cpMiddleName || ''} 
                ${otherInfo.cpLastName === 'N/A' ? '' : otherInfo.cpLastName || ''} 
                ${otherInfo.cpSuffix === 'N/A' ? '' : otherInfo.cpSuffix || ''}`
                .trim()}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Physician License
            </Typography>
            <Typography variant="body2">
              {otherInfo.licenseNumber}
            </Typography>
          </Box>
        </Box>
        

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
           Processing Officer
          </Typography>
          <Typography variant="body2">
            {`${otherInfo.poFirstName === 'N/A' ? '' : otherInfo.poFirstName || ''} 
              ${otherInfo.poMiddleName === 'N/A' ? '' : otherInfo.poMiddleName || ''} 
              ${otherInfo.poLastName === 'N/A' ? '' : otherInfo.poLastName || ''} 
              ${otherInfo.poSuffix === 'N/A' ? '' : otherInfo.poSuffix || ''}`
              .trim()}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Approving Officer
          </Typography>
          <Typography variant="body2">
            {`${otherInfo.aoFirstName === 'N/A' ? '' : otherInfo.aoFirstName || ''} 
              ${otherInfo.aoMiddleName === 'N/A' ? '' : otherInfo.aoMiddleName || ''} 
              ${otherInfo.aoLastName === 'N/A' ? '' : otherInfo.aoLastName || ''} 
              ${otherInfo.aoSuffix === 'N/A' ? '' : otherInfo.aoSuffix || ''}`
              .trim()}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
           Encoder
          </Typography>
          <Typography variant="body2">
            {`${otherInfo.eFirstName === 'N/A' ? '' : otherInfo.eFirstName || ''} 
              ${otherInfo.eMiddleName === 'N/A' ? '' : otherInfo.eMiddleName || ''} 
              ${otherInfo.eLastName === 'N/A' ? '' : otherInfo.eLastName || ''} 
              ${otherInfo.eSuffix === 'N/A' ? '' : otherInfo.eSuffix || ''}`
              .trim()}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Reporting Unit (Office/Section)
          </Typography>
          <Typography variant="body2">
            {otherInfo.reportingUnit}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Control Number 
          </Typography>
          <Typography variant="body2">
            {otherInfo.controlNumber}
          </Typography>
        </Box>
      </Box>
  );
};