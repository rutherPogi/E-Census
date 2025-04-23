import { Box, Typography, Grid } from "@mui/material";


export const FamilyBackgroundSection = (familyBackground) => {

  if (!familyBackground) return null;
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Father's Name
          </Typography>
          <Typography variant="body2">
            {`${familyBackground.fatherFirstName === 'N/A' ? '' : familyBackground.fatherFirstName || ''} 
              ${familyBackground.fatherMiddleName === 'N/A' ? '' : familyBackground.fatherMiddleName || ''} 
              ${familyBackground.fatherLastName === 'N/A' ? '' : familyBackground.fatherLastName || ''} 
              ${familyBackground.fatherSuffix === 'N/A' ? '' : familyBackground.fatherSuffix || ''}`
              .trim()}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Mother's Name
          </Typography>
          <Typography variant="body2">
            {`${familyBackground.motherFirstName === 'N/A' ? '' : familyBackground.motherFirstName || ''} 
              ${familyBackground.motherMiddleName === 'N/A' ? '' : familyBackground.motherMiddleName || ''} 
              ${familyBackground.motherLastName === 'N/A' ? '' : familyBackground.motherLastName || ''}`
              .trim()}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Guardian's Name
          </Typography>
          <Typography variant="body2">
            {`${familyBackground.guardianFirstName === 'N/A' ? '' : familyBackground.guardianFirstName || ''} 
              ${familyBackground.guardianMiddleName === 'N/A' ? '' : familyBackground.guardianMiddleName || ''} 
              ${familyBackground.guardianLastName === 'N/A' ? '' : familyBackground.guardianLastName || ''} 
              ${familyBackground.guardianSuffix === 'N/A' ? '' : familyBackground.guardianSuffix || ''}`
              .trim()}
          </Typography>
        </Box>
      </Box>
  );
};