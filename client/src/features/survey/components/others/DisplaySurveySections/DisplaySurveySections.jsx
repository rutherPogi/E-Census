import React from "react";
import { Box, Typography, Divider, useTheme, useMediaQuery } from '@mui/material';
import { Edit } from "@mui/icons-material";

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

  // Helper function to render section headers with conditional edit button
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
      {/* SURVEY INFORMATION SECTION */}
      <Box>
        {renderSectionHeader('Survey Information', 1)}
        <Divider sx={{ mb: 2 }} />
        {SurveyDataSection(formData?.surveyData)}
      </Box>

      {/* FAMILY PROFILE SECTION */}
      <Box>
        {renderSectionHeader('Family Profile', 3)}
        <Divider sx={{ mb: 2 }} />
        {FamilyProfileSection(formData?.familyMembers)}
      </Box>

      {/* EXPENSES SECTION */}
      <Box>
        {renderSectionHeader('Food Expenses', 4)}
        <Divider sx={{ mb: 2 }} />
        {renderExpensesTable(formData, 'foodExpenses')}
        {renderSectionHeader('Education Expenses', 5)}
        <Divider sx={{ mb: 2 }} />
        {renderExpensesTable(formData, 'educationExpenses')}
        {renderSectionHeader('Family Expenses', 6)}
        <Divider sx={{ mb: 2 }} />
        {renderExpensesTable(formData, 'familyExpenses')}
        {renderSectionHeader('Monthly Expenses', 7)}
        <Divider sx={{ mb: 2 }} />
        {renderExpensesTable(formData, 'monthlyExpenses')}
      </Box>

      {/* HOUSE INFORMATION SECTION */}
      <Box>
        {renderSectionHeader('House Information', 8)}
        <Divider sx={{ mb: 2 }} />
        {HouseInfoSection(formData?.houseInfo)}
      </Box>

      {/* HOUSE LOCATION SECTION */}
      <Box>
        {renderSectionHeader('House Location', 9)}
        <Divider sx={{ mb: 2 }} />
        {HouseLocationSection(formData?.houseLocation)}
      </Box>

      {/* WATER INFORMATION SECTION */}
      <Box>
        {renderSectionHeader('Water Information', 10)}
        <Divider sx={{ mb: 2 }} />
        {WaterInfoSection(formData?.waterInfo)}
      </Box>

      {/* LIVESTOCK SECTION */}
      <Box>
        {renderSectionHeader('Livestock / Animals', 11)}
        <Divider sx={{ mb: 2 }} />
        {renderLivestockTable(formData?.livestock)}
      </Box>

      {/* FARMLOTS SECTION */}
      <Box>
        {renderSectionHeader('No. of Farmlots', 12)}
        <Divider sx={{ mb: 2 }} />
        {FarmlotsSection(formData?.farmlots)}
      </Box>

      {/* CROPS PLANTED SECTION */}
      <Box>
        {renderSectionHeader('Crops Planted (sq. meter)', 13)}
        <Divider sx={{ mb: 2 }} />
        {CropsPlantedSection(formData?.cropsPlanted)}
      </Box>

      {/* FRUIT BEARING TREE SECTION */}
      <Box>
        {renderSectionHeader('Fruit Bearing Tree (trees planted)', 14)}
        <Divider sx={{ mb: 2 }} />
        {FruitBearingTreeSection(formData?.fruitBearingTree)}
      </Box>

      {/* FAMILY RESOURCES SECTION */}
      <Box>
        {renderSectionHeader('Family Resources', 15)}
        <Divider sx={{ mb: 2 }} />
        {FamilyResourcesSection(formData?.familyResources)}
      </Box>

      {/* APPLIANCES OWN SECTION */}
      <Box>
        {renderSectionHeader('Appliances Own', 16)}
        <Divider sx={{ mb: 2 }} />
        {AppliancesSection(formData?.appliancesOwn)}
      </Box>

      {/* AMENITIES SECTION */}
      <Box>
        {renderSectionHeader('Amenities', 17)}
        <Divider sx={{ mb: 2 }} />
        {AmenitiesSection(formData?.amenitiesOwn)}
      </Box>

      {/* COMMUNITY ISSUES SECTION */}
      <Box>
        {renderSectionHeader('Community Issues', 18)}
        <Divider sx={{ mb: 2 }} />
        {formData?.communityIssues?.communityIssues || formData?.communityIssues?.issues || ''}
      </Box>

      {/* SERVICE AVAILED SECTION */}
      <Box>
        {renderSectionHeader('Services Availed', 20)}
        <Divider sx={{ mb: 2 }} />
        {renderServiceAvailed(formData?.serviceAvailed)}
      </Box>
    </>
  );
};

export default DisplaySurveySections;