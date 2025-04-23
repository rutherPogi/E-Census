import { Box, Typography, Grid } from "@mui/material";


export const ProblemNeedsSection = (member) => {

  if (!member) return null;
  
  return (
    <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          Classification/Circumtances of being a solo parent (Dahilan bakit naging solo parent)
        </Typography>
        <Typography variant="body2">{member.causeSoloParent}</Typography>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          Needs/Problem of being a solo parent (Kinakailangan/Problema ng isa ng solo parent)
        </Typography>
        <Typography variant="body2">{member.needsSoloParent}</Typography>
      </Box>
  </Box>
  );
};