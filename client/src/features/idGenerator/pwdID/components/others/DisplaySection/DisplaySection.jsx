import { useTheme, useMediaQuery, Box, Typography, Divider} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { OtherInfoSection } from "./OtherInfoSection";
import { PWDMediaSection } from "./PWDMediaSection";
import { FamilyBackgroundSection } from "./FamilyBackgroundSection";




export const DisplayInfoSections = ({ formData, handleEdit, isViewing }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // Determine responsive variant based on screen size
  const getTitleVariant = () => {
    if (isMobile) return "h7";
    if (isTablet) return "h6";
    return "h5";
  };
  
  const titleVariant = getTitleVariant();
  
  // Common style for all section headers
  const titleStyle = { 
    fontWeight: 'bold', 
    color: '#1976d2' 
  };

  const renderSectionHeader = (title, sectionIndex) => (
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
  );

  return (

    
    <>
      {/* PERSONAL INFORMATION SECTION */}
      <Box>
        {renderSectionHeader('Personal Information', 1)}
        <Divider sx={{ mb: 2 }} />
        {PersonalInfoSection(formData?.personalInfo)}
      </Box>

      <Box>
        {renderSectionHeader('Family Background', 2)}
        <Divider sx={{ mb: 2 }} />
        {FamilyBackgroundSection(formData?.familyBackground)}
      </Box>

      <Box>
        {renderSectionHeader('Other Info', 3)}
        <Divider sx={{ mb: 2 }} />
        {OtherInfoSection(formData?.otherInfo)}
      </Box>

      <Box>
        {renderSectionHeader('PhotoID and Signature', 4)}
        <Divider sx={{ mb: 2 }} />
        {PWDMediaSection(formData?.pwdMedia)}
      </Box>
    </>
  );
};

export default DisplayInfoSections;

