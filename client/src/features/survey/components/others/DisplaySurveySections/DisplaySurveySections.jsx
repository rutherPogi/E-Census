import { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery,  Tabs, Tab, Button } from '@mui/material';
import { Edit, Info } from "@mui/icons-material";

import { 
  SurveyDataSection, 
  FamilyProfileSection, 
  renderExpensesTable, 
  renderLivestockTable,
  renderServiceAvailed,
  WaterInfoSection,
  HouseInfoSection,
  FarmlotsSection,
  CropsPlantedSection,
  FruitBearingTreeSection,
  FamilyResourcesSection,
  AppliancesSection,
  AmenitiesSection,
  HouseLocationSection
} from "./Sections";

const DisplaySurveySections = ({ formData, handleEdit, isViewing }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Helper function to render section headers with conditional edit button
  const renderSectionHeader = (title, sectionIndex) => (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      mb: 2,
      pb: 1,
      borderBottom: '1px solid',
      borderColor: 'divider'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
          {/* Show the parent section name */}
          {getTabName(tabValue)}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
          &gt;
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main' }}>
          {title}
        </Typography>
      </Box>
      {!isViewing && (
        <Button 
          startIcon={<Edit />}
          size="small"
          onClick={() => handleEdit(sectionIndex)}
          variant="outlined"
          color="primary"
        >
          Edit
        </Button>
      )}
    </Box>
  );
  
  // Function to get the current tab name
  const getTabName = (tabIndex) => {
    const tabNames = [
      "Survey Information",
      "Family Profile",
      "Expenses",
      "House Details",
      "Farm & Livestock",
      "Family Resources",
      "Community & Services"
    ];
    return tabNames[tabIndex] || "";
  };

  // New function to render simple sections without repetitive titles (Option 4)
  const renderSimpleSection = (sectionIndex, content) => (
    <Box>
      {!isViewing && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button 
            startIcon={<Edit />}
            size="small"
            onClick={() => handleEdit(sectionIndex)}
            variant="outlined"
            color="primary"
          >
            Edit
          </Button>
        </Box>
      )}
      {content || (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography color="text.secondary">No data available</Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="scrollable" 
            scrollButtons="auto"
            indicatorColor="primary"
            aria-label="section tabs"
          >
            <Tab label="Survey Information" />
            <Tab label="Family Profile" />
            <Tab label="Expenses" />
            <Tab label="House Details" />
            <Tab label="Farm & Livestock" />
            <Tab label="Family Resources" />
            <Tab label="Community & Services" />
          </Tabs>
        </Box>

        {/* Survey Information Tab - Using Option 4 */}
        {tabValue === 0 && (
          <Box>
            {renderSimpleSection(1, SurveyDataSection(formData?.surveyData))}
          </Box>
        )}

        {/* Family Profile Tab */}
        {tabValue === 1 && (
          <Box>
          {renderSectionHeader('Family Profile', 3)}
          <FamilyProfileSection members={formData.familyMembers}/>
        </Box>
        )}

        {/* Expenses Tab */}
        {tabValue === 2 && (
          <Box>
            {renderSectionHeader('Food Expenses', 4)}
            {renderExpensesTable(formData, 'foodExpenses')}
            
            {renderSectionHeader('Education Expenses', 5)}
            {renderExpensesTable(formData, 'educationExpenses')}
            
            {renderSectionHeader('Family Expenses', 6)}
            {renderExpensesTable(formData, 'familyExpenses')}
            
            {renderSectionHeader('Monthly Expenses', 7)}
            {renderExpensesTable(formData, 'monthlyExpenses')}
          </Box>
        )}
        
        {/* House Details Tab */}
        {tabValue === 3 && (
          <Box>
            {renderSectionHeader('House Information', 8)}
            {HouseInfoSection(formData?.houseInfo)}
            
            {renderSectionHeader('House Location', 9)}
            {HouseLocationSection(formData?.houseLocation)}

            {renderSectionHeader('Water Information', 10)}
            {WaterInfoSection(formData?.waterInfo)}
          </Box>
        )}
        

        {/* Farm & Livestock Tab */}
        {tabValue === 4 && (
          <Box>
            {renderSectionHeader('Livestock / Animals', 11)}
            {renderLivestockTable(formData?.livestock)}
            
            {renderSectionHeader('No. of Farmlots', 12)}
            {FarmlotsSection(formData?.farmlots)}
            
            {renderSectionHeader('Crops Planted (sq. meter)', 13)}
            {CropsPlantedSection(formData?.cropsPlanted)}
            
            {renderSectionHeader('Fruit Bearing Tree (trees planted)', 14)}
            {FruitBearingTreeSection(formData?.fruitBearingTree)}
          </Box>
        )}

        {/* Family Resources Tab */}
        {tabValue === 5 && (
          <Box>
            {renderSectionHeader('Family Resources', 15)}
            {FamilyResourcesSection(formData?.familyResources)}
            
            {renderSectionHeader('Appliances Own', 16)}
            {AppliancesSection(formData?.appliancesOwn)}
            
            {renderSectionHeader('Amenities', 17)}
            {AmenitiesSection(formData?.amenitiesOwn)}
          </Box>
        )}
        
        {/* Community & Services Tab */}
        {tabValue === 6 && (
          <Box>
          {renderSectionHeader('Community Issues', 18)}
          {formData.issues ? formData.issues : (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography color="text.secondary">No Community Issues added.</Typography>
            </Box>
          )}

          {renderSectionHeader('Services Availed', 20)}
          {renderServiceAvailed(formData?.serviceAvailed)}
        </Box>
        )}
    </Box>
  );
};

export default DisplaySurveySections;