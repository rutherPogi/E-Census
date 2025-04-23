import { Edit } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";



export const renderSectionHeader = (title, sectionIndex) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const getTitleVariant = () => {
    if (isMobile) return "h7";
    if (isTablet) return "h6";
    return "h5";
  };

  const titleVariant = getTitleVariant();

  const titleStyle = { 
    fontWeight: 'bold', 
    color: '#1976d2' 
  };

  <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1}}>
    <Typography variant={titleVariant} sx={titleStyle}>
      {title}
    </Typography>
    {!isViewing && (
      <Edit 
        onClick={() => handleEdit(sectionIndex)}
        sx={{ fontSize: 18, color: 'primary.main', cursor: 'pointer' }} 
      />
    )}
  </Box>
};

export default renderSectionHeader;