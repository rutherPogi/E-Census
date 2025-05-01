import { useState } from "react";
import { 
  useTheme, 
  useMediaQuery, 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  Container,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Tooltip,
  Divider
} from "@mui/material";
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

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Determine responsive variant based on screen size
  const getTitleVariant = () => {
    if (isMobile) return "h6";
    if (isTablet) return "h5";
    return "h4";
  };
  
  const titleVariant = getTitleVariant();
  
  // Enhanced section header style
  const titleStyle = { 
    fontWeight: 'bold', 
    color: theme.palette.primary.main,
    fontFamily: "'Roboto', sans-serif",
    letterSpacing: '0.5px'
  };

  const renderSectionHeader = (title, sectionIndex) => (
    <Box sx={{
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      mb: 2,
      pb: 1
    }}>
      <Typography variant={titleVariant} sx={titleStyle}>
        {title}
      </Typography>
      {!isViewing && (
        <Tooltip title="Edit section">
          <Button
            onClick={() => handleEdit(sectionIndex)}
            variant="outlined"
            color="primary"
            startIcon={<Edit/>}
          >
            EDIT
          </Button>
        </Tooltip>
      )}
    </Box>
  );

  // Section container shared style
  const sectionStyle = {
    mb: 5,
    p: 3,
    borderRadius: 2,
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      boxShadow: theme.shadows[6],
      transition: 'box-shadow 0.3s ease-in-out'
    }
  };


  return (
    <Box>
      <Box>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable" 
          scrollButtons="auto"
          indicatorColor="none"
        >
          <Tab
            label="Personal Info"
            sx={{
              borderRadius: "8px 8px 0 0",
              backgroundColor: tabValue === 0 ? "#ddd" : "#f5f5f5",
              padding: "10px 20px",
              border: "1px solid #ccc",
              boxShadow: tabValue === 0 ? "2px 2px 5px rgba(0,0,0,0.2)" : "none",
            }}
          />
          <Tab
            label="Household"
            sx={{
              borderRadius: "8px 8px 0 0",
              backgroundColor: tabValue === 1 ? "#ddd" : "#f5f5f5",
              padding: "10px 20px",
              border: "1px solid #ccc",
              boxShadow: tabValue === 1 ? "2px 2px 5px rgba(0,0,0,0.2)" : "none",
            }}
          />
          <Tab
            label="Problems/Needs"
            sx={{
              borderRadius: "8px 8px 0 0",
              backgroundColor: tabValue === 2 ? "#ddd" : "#f5f5f5",
              padding: "10px 20px",
              border: "1px solid #ccc",
              boxShadow: tabValue === 2 ? "2px 2px 5px rgba(0,0,0,0.2)" : "none",
            }}
          />
          <Tab
            label="Emergency Contact"
            sx={{
              borderRadius: "8px 8px 0 0",
              backgroundColor: tabValue === 3 ? "#ddd" : "#f5f5f5",
              padding: "10px 20px",
              border: "1px solid #ccc",
              boxShadow: tabValue === 3 ? "2px 2px 5px rgba(0,0,0,0.2)" : "none",
            }}
          />
          <Tab
            label="ID & SIGNATURE"
            sx={{
              borderRadius: "8px 8px 0 0",
              backgroundColor: tabValue === 4 ? "#ddd" : "#f5f5f5",
              padding: "10px 20px",
              border: "1px solid #ccc",
              boxShadow: tabValue === 4 ? "2px 2px 5px rgba(0,0,0,0.2)" : "none",
            }}
          />
        </Tabs>
      </Box>

      {/* PERSONAL INFORMATION SECTION */}
      {tabValue === 0 && 
        <PersonalInfoSection member={formData?.personalInfo} handleEdit={handleEdit} isViewing={isViewing}/>
      }

      {/* HOUSEHOLD COMPOSITION SECTION */}
      {tabValue === 1 && 
        <Paper elevation={3} sx={sectionStyle}>
          {renderSectionHeader('Household Composition', 3)}
          {HouseholdCompositionSection(formData?.householdComposition)}
        </Paper>
      }

      {/* PROBLEMS AND NEEDS SECTION */}
      {tabValue === 2 &&
        <Paper elevation={3} sx={sectionStyle}>
          {renderSectionHeader('Solo Parent Circumstances, Problems, and Needs', 4)}
          {ProblemNeedsSection(formData?.problemNeeds)}
        </Paper>
      }

      {/* EMERGENCY CONTACT SECTION */}
      {tabValue === 3 &&
        <Paper elevation={3} sx={sectionStyle}>
          {renderSectionHeader('Emergency Contact', 5)}
          {EmergencyContactSection(formData?.emergencyContact)}
        </Paper>
      }

      {/* PHOTO ID AND SIGNATURE SECTION */}
      {tabValue === 4 &&
        <Paper elevation={3} sx={sectionStyle}>
          {renderSectionHeader('Photo ID and Signature', 6)}
          {SPMediaSection(formData?.spMedia)}
        </Paper>
      }
    </Box>
  );
};

export default DisplayInfoSections;