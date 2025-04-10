import { useTheme, useMediaQuery, Box, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";

export const SectionHeader = ({ title, handleEdit, pageNumber }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      margin: '1em',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      mb: 2 }}>
      <Typography variant={isMobile ? "subtitle1" : "h6"} component="h2" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Edit 
        onClick={() => handleEdit(pageNumber)}
        sx={{ fontSize: isMobile ? 16 : 20, color: 'primary.main', cursor: 'pointer' }} 
      />
    </Box>
  );
};
