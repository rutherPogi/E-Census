import { useState } from "react";
import { Box, Tabs, Tab, Skeleton } from "@mui/material";

import { PersonalInfoSection } from "./PersonalInfoSection";
import { EmergencyContactSection } from "./EmergencyContactSection";
import { ProblemNeedsSection } from "./ProblemNeedsSection";
import { HouseholdCompositionSection } from "./HouseholdCompositionSection";
import { SPMediaSection } from "./SPMediaSection";




export const DisplayInfoSections = ({ formData, handleEdit, isViewing, isLoading }) => {

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabLabels = [
    "Personal Info",
    "Household",
    "Problems/Needs",
    "Emergency Contact",
    "ID & SIGNATURE",
  ];

  const SectionSkeleton = () => (
    <Box sx={{ 
      backgroundColor: 'white',
      padding: { xs: '1em', md: '2em' }
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Skeleton variant="rectangular" width="40%" height={32} />
        <Skeleton variant="rectangular" width="10%" height={32} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Box>
    </Box>
  );
  

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
          {tabLabels.map((label, index) => (
            <Tab
              key={label}
              label={label}
              sx={{
                borderRadius: "8px 8px 0 0",
                backgroundColor: tabValue === index ? "#fff" : "#f5f5f5",
                padding: "10px 20px",
                marginRight: index < tabLabels.length - 1 ? 1 : 0,
                boxShadow: tabValue === index ? "2px 2px 5px rgba(0,0,0,0.2)" : "none",
              }}
            />
          ))}
        </Tabs>
      </Box>

      {isLoading && (<SectionSkeleton />)}

      {!isLoading && (
        <>
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
        </>
      )}
      
    </Box>
  );
};

export default DisplayInfoSections;