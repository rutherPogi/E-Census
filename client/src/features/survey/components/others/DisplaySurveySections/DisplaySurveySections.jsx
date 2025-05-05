import { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery,  Tabs, Tab, Button } from '@mui/material';
import { Edit, Info } from "@mui/icons-material";

import { 
  SurveyDataSection, 
  FamilyProfileSection, 
  RenderExpensesTable, 
  RenderLivestockTable,
  RenderServiceAvailed,
  WaterInfoSection,
  HouseInfoSection,
  FarmlotsSection,
  CropsPlantedSection,
  FruitBearingTreeSection,
  FamilyResourcesSection,
  AppliancesSection,
  AmenitiesSection,
  HouseLocationSection,
  Issues
} from "./Sections";

const DisplaySurveySections = ({ formData, handleEdit, isViewing }) => {

  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabLabels = [
    "Survey Information",
    "Family Profile",
    "Expenses",
    "House Details",
    "Farmlots",
    "Farm & Livestock",
    "Family Resources",
    "Issues",
    "Service Availed"
  ];

  return (
    <Box>
        <Box>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="scrollable" 
            scrollButtons="auto"
            indicatorColor="none"
            aria-label="section tabs"
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

        {/* Survey Information Tab - Using Option 4 */}
        {tabValue === 0 && <SurveyDataSection surveyData={formData?.surveyData} handleEdit={handleEdit} isViewing={isViewing} />}

        {/* Family Profile Tab */}
        {tabValue === 1 && <FamilyProfileSection members={formData.familyMembers} handleEdit={handleEdit} isViewing={isViewing} />}

        {/* Expenses Tab */}
        {tabValue === 2 && (
          <>
            <RenderExpensesTable formData={formData} expenseType={'foodExpenses'} handleEdit={handleEdit} isViewing={isViewing}/>
            <RenderExpensesTable formData={formData} expenseType={'educationExpenses'} handleEdit={handleEdit} isViewing={isViewing}/>
            <RenderExpensesTable formData={formData} expenseType={'familyExpenses'} handleEdit={handleEdit} isViewing={isViewing}/>
            <RenderExpensesTable formData={formData} expenseType={'monthlyExpenses'} handleEdit={handleEdit} isViewing={isViewing}/>
          </>
        )}
        
        {/* House Details Tab */}
        {tabValue === 3 && (
          <>
            <HouseInfoSection formData={formData} handleEdit={handleEdit} isViewing={isViewing}  />
            <HouseLocationSection formData={formData} handleEdit={handleEdit} isViewing={isViewing} />
            <WaterInfoSection formData={formData} handleEdit={handleEdit} isViewing={isViewing} />
          </>
        )}

        {tabValue === 4 && 
          <FarmlotsSection formData={formData} handleEdit={handleEdit} isViewing={isViewing} />
        }
        

        {/* Farm & Livestock Tab */}
        {tabValue === 5 && (
          <Box>
            <RenderLivestockTable formData={formData} handleEdit={handleEdit} isViewing={isViewing} />
            <CropsPlantedSection formData={formData} handleEdit={handleEdit} isViewing={isViewing} />
            <FruitBearingTreeSection formData={formData} handleEdit={handleEdit} isViewing={isViewing} />
          </Box>
        )}

        {/* Family Resources Tab */}
        {tabValue === 6 && (
          <Box>
            <FamilyResourcesSection formData={formData} handleEdit={handleEdit} isViewing={isViewing} />
            <AppliancesSection formData={formData} handleEdit={handleEdit} isViewing={isViewing} />
            <AmenitiesSection formData={formData} handleEdit={handleEdit} isViewing={isViewing} />
          </Box>
        )}
        
        {/* Community & Services Tab */}
        {tabValue === 7 && <Issues formData={formData} handleEdit={handleEdit} isViewing={isViewing} />}

        {tabValue === 8 && <RenderServiceAvailed formData={formData} handleEdit={handleEdit} isViewing={isViewing} />}
    </Box>
  );
};

export default DisplaySurveySections;