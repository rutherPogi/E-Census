import { useState } from "react";
import { Box, Typography, Tabs, Tab, Skeleton, Alert } from '@mui/material';
import { Info } from "@mui/icons-material";

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




const DisplaySurveySections = ({ formData, handleEdit, isViewing, isLoading, error }) => {

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

  // Loading skeleton for sections
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

  // Handle error state
  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ mt: 2, mb: 2 }}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Info sx={{ mr: 1 }} />
            <Typography variant="caption">
              Error code: {error.code || 'FETCH_ERROR'}
            </Typography>
          </Box>
        }
      >
        Failed to load survey data: {error}
      </Alert>
    );
  }

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
          disabled={isLoading}
        >
          {tabLabels.map((label, index) => (
            <Tab
              key={label}
              label={label}
              disabled={isLoading}
              sx={{
                borderRadius: "8px 8px 0 0",
                backgroundColor: tabValue === index ? "#fff" : "#f5f5f5",
                padding: "10px 20px",
                marginRight: index < tabLabels.length - 1 ? 1 : 0,
                boxShadow: tabValue === index ? "2px 2px 5px rgba(0,0,0,0.2)" : "none",
                opacity: isLoading ? 0.7 : 1,
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Show skeletons when loading */}
      {isLoading && (<SectionSkeleton />)}

      {/* Render content only when not loading */}
      {!isLoading && (
        <>
          {/* Survey Information Tab */}
          {tabValue === 0 && <SurveyDataSection surveyData={formData?.surveyData} handleEdit={handleEdit} isViewing={isViewing} />}

          {/* Family Profile Tab */}
          {tabValue === 1 && <FamilyProfileSection members={formData?.familyMembers} handleEdit={handleEdit} isViewing={isViewing} />}

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
              <HouseInfoSection formData={formData} handleEdit={handleEdit} isViewing={isViewing} />
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
        </>
      )}
    </Box>
  );
};

export default DisplaySurveySections;