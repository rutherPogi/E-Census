import { useTheme, useMediaQuery, Box, Typography, Container, Table, 
         TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper } from "@mui/material";
import { Edit } from "@mui/icons-material";

import { formatters } from "../../../utils/formatter";

const Section = ({ title, children, handleEdit, pageNumber }) => (
  <Box>
    <SectionHeader title={title} handleEdit={handleEdit} pageNumber={pageNumber} />
    {children}
  </Box>
);

const SectionHeader = ({ title, handleEdit, pageNumber }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      margin: '1em',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      mb: 2 }}>
      <Typography variant={isMobile ? "subtitle1" : "h6"} component="h2" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Edit 
        onClick={() => handleEdit(pageNumber)}
        sx={{ fontSize: isMobile ? 16 : 20, color: 'primary.main', cursor: 'pointer' }} 
      />
    </Box>
  );
};


export const PersonalInfoSection = ({ data, handleEdit }) => (
  <Section title="Personal Information" handleEdit={handleEdit} pageNumber={1}>
    <Typography sx={{ marginLeft: '1em'}}>
      Applicant's Name: 
      {` ${data.personalInfo.firstName} 
        ${data.personalInfo.middleName}
        ${data.personalInfo.lastName}
        ${data.personalInfo.suffix === 'N/A' ? '' : data.personalInfo.suffix}`}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Birthdate: {formatters.date(data.personalInfo.birthdate)}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Age: {data.personalInfo.age}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Sex: {data.personalInfo.sex}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Civil Status: {data.personalInfo.civilStatus}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Birthplace: {data.personalInfo.birthplace}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Religion: {data.personalInfo.religion}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Phylsis Number: {data.personalInfo.phylsisNumber}
    </Typography>
  </Section>
);

export const ContactInfoSection = ({ data, handleEdit }) => (
  <Section title="Contact Information" handleEdit={handleEdit} pageNumber={2}>
    <Typography sx={{ marginLeft: '1em'}}>
      Street: {data.contactInfo.street}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Barangay: {data.contactInfo.barangay}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Municipality: {data.contactInfo.municipality}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Province: {data.contactInfo.province}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Mobile Number: {data.contactInfo.mobileNumber}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Email Address: {data.contactInfo.emailAddress}
    </Typography>
  </Section>
);

export const ProfessionalInfoSection = ({ data, handleEdit }) => (
  <Section title="Professional Information" handleEdit={handleEdit} pageNumber={3}>
    <Typography sx={{ marginLeft: '1em'}}>
      Occupation: {data.professionalInfo.occupation}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Company: {data.professionalInfo.company}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Educational Attainment: {data.professionalInfo.educationalAttainment}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Monthly Income: {data.professionalInfo.monthlyIncome}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Employment Status: {data.professionalInfo.employmentStatus}
    </Typography>
  </Section>
);

export const OtherInfoSection = ({ data, handleEdit }) => (
  <Section title="Other Information" handleEdit={handleEdit} pageNumber={4}>
    <Typography sx={{ marginLeft: '1em'}}>
      is Beneficiary?: {data.otherInfo.beneficiary}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      is Indigenous Person?: {data.otherInfo.indigenous}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      is LGBTQ+?: {data.otherInfo.lgbtq}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      is PWD?: {data.otherInfo.pwd}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Household ID: {data.otherInfo.householdID}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Name of Affiliation: {data.otherInfo.affiliationName}
    </Typography>
  </Section>
);

export const mapFamilyMembers = (members) => 
  members.map(member => [
    `${member.firstName} ${member.middleName} ${member.lastName} 
     ${member.suffix === 'N/A' ? '' : member.suffix}`,
    member.sex,
    member.relationship,
    formatters.date(member.birthdate),
    member.age,
    member.civilStatus,
    member.educationalAttainment,
    member.occupation,
    `₱${member.monthlyIncome}`
  ]
);

export const HouseholdCompositionSection = ({ headers, data, title, handleEdit }) => (

    <TableContainer component={Paper}
    sx={{ 
      borderRadius: '5px',
      '& .MuiTable-root': {
        borderRadius: '5px',
        overflow: 'hidden'
      }
    }}>
      <SectionHeader title={title} handleEdit={handleEdit} pageNumber={6} />
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
);

export const ProblemNeedsSection = ({ data, handleEdit }) => (
  <Section title="Solo Parent Circumtances, Problems, and Needs" handleEdit={handleEdit} pageNumber={7}>
    <Typography sx={{ marginLeft: '1em'}}>
      Classification/Circumtances of being a solo parent (Dahilan bakit naging solo parent): 
      {data.problemNeeds.causeSoloParent}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Needs/Problem of being a solo parent (Kinakailangan/Problema ng isa ng solo parent): 
      {data.problemNeeds.needsSoloParent}
    </Typography>
  </Section>
);

export const EmergencyContactSection = ({ data, handleEdit }) => (
  <Section title="Contact Information" handleEdit={handleEdit} pageNumber={8}>
    <Typography sx={{ marginLeft: '1em'}}>
      Name: {data.emergencyContact.name}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Relationship: {data.emergencyContact.relationship}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Street: {data.emergencyContact.street}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Barangay: {data.emergencyContact.barangay}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Municipality: {data.emergencyContact.municipality}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Province: {data.emergencyContact.province}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Mobile Number: {data.emergencyContact.mobileNumber}
    </Typography>
  </Section>
);

export const ApplicationDetailsSection = ({ data, handleEdit }) => (
  <Section title="Application Details" handleEdit={handleEdit} pageNumber={9}>
    <Typography sx={{ marginLeft: '1em'}}>
      Solo Parent ID Card Number : {data.applicationDetails.cardNumber}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Solo Parent Category : {data.applicationDetails.category}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Bneficiary Code: {data.applicationDetails.beneficiaryCode}
    </Typography>
  </Section>
);

export const PhotoIDSection = ({ data, handleEdit }) => (
  <Section title="Photo ID and Signature" handleEdit={handleEdit} pageNumber={11}>
    {data.spMedia?.photoIDPreview && (
      <div className="image-container">
        <p className="info-label">PhotoID:</p>
        <img 
          src={data.spMedia.photoIDPreview} 
          alt="House" 
          style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px' }} 
        />
      </div>
    )}
    {data.spMedia?.signaturePreview && (
      <div className="image-container">
        <p className="info-label">Signature:</p>
        <img 
          src={data.spMedia.signaturePreview} 
          alt="House" 
          style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px' }} 
        />
      </div>
    )}
  </Section>
);




