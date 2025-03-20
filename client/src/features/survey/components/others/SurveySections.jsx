import { Box, Typography } from "@mui/material";
import { SectionHeader } from "../others/SectionHeader"

const Section = ({ title, children, handleEdit, pageNumber }) => (
  <Box>
    <SectionHeader title={title} handleEdit={handleEdit} pageNumber={pageNumber} />
    {children}
  </Box>
);

export const SurveyDetailsSection = ({ data, handleEdit }) => (
  <Section title="Survey Details" handleEdit={handleEdit} pageNumber={1}>
    <Typography sx={{ marginLeft: '1em'}}>
      Respondent: {data.surveyData.respondent}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Interviewer: {data.surveyData.interviewer}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Barangay: {data.surveyData.barangay}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Municipality: {data.surveyData.municipality}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Total Monthly Income: {data.surveyData.totalMonthlyIncome}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Irregular Income: {data.surveyData.irregularIncome}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Family Income: {data.surveyData.familyIncome}
    </Typography>
  </Section>
);

export const HouseInfoSection = ({ data, handleEdit }) => (
  <Section title="House Information" handleEdit={handleEdit} pageNumber={8}>
    <Typography sx={{ marginLeft: '1em'}}>
      House Condition: {data.houseInfo.houseCondition}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      House Structure: {data.houseInfo.houseStructure}
    </Typography>
    {/* House Image Display */}
    {data.houseInfo?.houseImagePreview && (
      <div className="image-container">
        <p className="info-label">House Image:</p>
        <img 
          src={data.houseInfo.houseImagePreview} 
          alt="House" 
          style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px' }} 
        />
      </div>
    )}
  </Section>
);

export const WaterInfoSection = ({ data, handleEdit }) => (
  <Section title="Water Information" handleEdit={handleEdit} pageNumber={9}>
    <Typography sx={{ marginLeft: '1em'}}>
      Access to water (Level III): {data.waterInfo.accessWater}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Is your water potable?: {data.waterInfo.potableWater}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Sources of Water: {data.waterInfo.sourceWater}
    </Typography>
  </Section>
);

export const FarmLotsSection = ({ data, handleEdit }) => (
  <Section title="Farm Lots" handleEdit={handleEdit} pageNumber={11}>
    <Typography sx={{ marginLeft: '1em'}}>
      Cultivation Lots: {data.farmlots.cultivation}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Pastureland: {data.farmlots.pastureland}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Forestland: {data.farmlots.forestland}
    </Typography>
  </Section>
);

export const CommunityIssueSection = ({ data, handleEdit }) => (
  <Section title="Community Issues" handleEdit={handleEdit} pageNumber={17}>
    <Typography sx={{ marginLeft: '1em'}}>
      Community Issues: {data.communityIssues.issue}
    </Typography>
  </Section>
);
