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
              backgroundColor: tabValue === 0 ? "#fff" : "#f5f5f5",
              padding: "10px 20px",
              marginRight: 1,
              boxShadow: tabValue === 0 ? "2px 2px 5px rgba(0,0,0,0.2)" : "none",
            }}
          />
          <Tab
            label="Household"
            sx={{
              borderRadius: "8px 8px 0 0",
              backgroundColor: tabValue === 1 ? "#fff" : "#f5f5f5",
              padding: "10px 20px",
              marginRight: 1,
              boxShadow: tabValue === 1 ? "2px 2px 5px rgba(0,0,0,0.2)" : "none",
            }}
          />
          <Tab
            label="Problems/Needs"
            sx={{
              borderRadius: "8px 8px 0 0",
              backgroundColor: tabValue === 2 ? "#fff" : "#f5f5f5",
              padding: "10px 20px",
              marginRight: 1,
              boxShadow: tabValue === 2 ? "2px 2px 5px rgba(0,0,0,0.2)" : "none",
            }}
          />
          <Tab
            label="Emergency Contact"
            sx={{
              borderRadius: "8px 8px 0 0",
              backgroundColor: tabValue === 3 ? "#fff" : "#f5f5f5",
              padding: "10px 20px",
              marginRight: 1,
              boxShadow: tabValue === 3 ? "2px 2px 5px rgba(0,0,0,0.2)" : "none",
            }}
          />
          <Tab
            label="ID & SIGNATURE"
            sx={{
              borderRadius: "8px 8px 0 0",
              backgroundColor: tabValue === 4 ? "#fff" : "#f5f5f5",
              padding: "10px 20px",
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
        <HouseholdCompositionSection members={formData?.householdComposition} handleEdit={handleEdit} isViewing={isViewing}/>
      }

      {/* PROBLEMS AND NEEDS SECTION */}
      {tabValue === 2 &&
        <ProblemNeedsSection member={formData?.householdComposition} handleEdit={handleEdit} isViewing={isViewing}/>
      }

      {/* EMERGENCY CONTACT SECTION */}
      {tabValue === 3 &&
        <EmergencyContactSection member={formData?.emergencyContact} handleEdit={handleEdit} isViewing={isViewing}/>
      }

      {/* PHOTO ID AND SIGNATURE SECTION */}
      {tabValue === 4 &&
        <SPMediaSection media={formData?.spMedia} handleEdit={handleEdit} isViewing={isViewing}/>
      }
    </Box>
  );
};

export default DisplayInfoSections;