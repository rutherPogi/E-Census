import { useState } from "react";
import { Box, Tabs, Tab, Skeleton } from "@mui/material";

import { PersonalInfoSection } from "./PersonalInfoSection";
import { OtherInfoSection } from "./OtherInfoSection";
import { PWDMediaSection } from "./PWDMediaSection";
import { FamilyBackgroundSection } from "./FamilyBackgroundSection";




export const DisplayInfoSections = ({ formData, handleEdit, isViewing, isLoading }) => {

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabLabels = [
    "Personal Info",
    "Family Background",
    "Other Info",
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

          {/* FAMILY BACKGROUND SECTION */}
          {tabValue === 1 && 
            <FamilyBackgroundSection members={formData?.familyBackground} handleEdit={handleEdit} isViewing={isViewing}/>
          }

          {/* OTHER INFO SECTION */}
          {tabValue === 2 && 
            <OtherInfoSection members={formData?.otherInfo} handleEdit={handleEdit} isViewing={isViewing}/>
          }

          {/* PHOTO ID AND SIGNATURE SECTION */}
          {tabValue === 3 &&
            <PWDMediaSection media={formData?.pwdMedia} handleEdit={handleEdit} isViewing={isViewing}/>
          }
        </>
      )}

    </Box>
  );
};

export default DisplayInfoSections;

