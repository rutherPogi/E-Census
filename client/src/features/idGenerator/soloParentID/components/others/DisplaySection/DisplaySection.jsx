import { useTheme, useMediaQuery, Box, Typography, Divider} from "@mui/material";
import { Edit } from "@mui/icons-material";

import { PersonalInfoSection } from "./PersonalInfoSection";
import { EmergencyContactSection } from "./EmergencyContactSection";
import { ProblemNeedsSection } from "./ProblemNeedsSection";
import { HouseholdCompositionSection } from "./HouseholdCompositionSection";
import { SPMediaSection } from "./SPMediaSection";

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

  console.log('DISPLAY SECTION FORMDATA:', formData);

  return (

    
    <>
      {/* PERSONAL INFORMATION SECTION */}
      <Box>
        {renderSectionHeader('Personal Information', 1)}
        <Divider sx={{ mb: 2 }} />
        {PersonalInfoSection(formData?.personalInfo)}
      </Box>

      <Box>
        {renderSectionHeader('Household Composition', 3)}
        <Divider sx={{ mb: 2 }} />
        {HouseholdCompositionSection(formData?.householdComposition)}
      </Box>

      <Box>
        {renderSectionHeader('Solo Parent Circumtances, Problems, and Needs', 4)}
        <Divider sx={{ mb: 2 }} />
        {ProblemNeedsSection(formData?.problemNeeds)}
      </Box>

      <Box>
        {renderSectionHeader('Emergency Contact', 5)}
        <Divider sx={{ mb: 2 }} />
        {EmergencyContactSection(formData?.emergencyContact)}
      </Box>
      
      <Box>
        {renderSectionHeader('PhotoID and Signature', 6)}
        <Divider sx={{ mb: 2 }} />
        {SPMediaSection(formData?.spMedia)}
      </Box>
    </>
  );
};

export default DisplayInfoSections;

