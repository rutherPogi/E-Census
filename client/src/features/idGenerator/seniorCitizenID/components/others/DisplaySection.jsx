import { useTheme, useMediaQuery, Box, Typography, Container, Table, 
         TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, IconButton, Tooltip } from "@mui/material";
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
  </Section>
);

export const ProfessionalInfoSection = ({ data, handleEdit }) => (
  <Section title="Professional Information" handleEdit={handleEdit} pageNumber={3}>
    <Typography sx={{ marginLeft: '1em'}}>
      Occupation: {data.professionalInfo.occupation}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Educational Attainment: {data.professionalInfo.educationalAttainment}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Annual Income: {data.professionalInfo.annualIncome}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Other Skills: {data.professionalInfo.otherSkills}
    </Typography>
  </Section>
);

export const mapFamilyMembers = (members) => 
  members.map(member => [
    `${member.firstName} ${member.middleName} ${member.lastName} 
     ${member.suffix === 'N/A' ? '' : member.suffix}`,
    member.age,
    member.relationship,
    member.civilStatus,
    member.occupation,
    `₱${member.income}`
  ]
);

export const FamilyCompositionSection = ({ headers, data, title, handleEdit }) => (

    <TableContainer component={Paper}
    sx={{ 
      borderRadius: '5px',
      '& .MuiTable-root': {
        borderRadius: '5px',
        overflow: 'hidden'
      }
    }}>
      <SectionHeader title={title} handleEdit={handleEdit} pageNumber={5} />
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

export const OscaSection = ({ data, handleEdit }) => (
  <Section title="OSCA" handleEdit={handleEdit} pageNumber={6}>
    <Typography sx={{ marginLeft: '1em'}}>
      Name of Association: {data.oscaMembership.associationName}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Date Elected as Officer: {formatters.date(data.oscaMembership.asOfficer)}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Position: {data.oscaMembership.position}
    </Typography>
  </Section>
);

export const PhotoSignatureSection = ({ data, handleEdit }) => (
  <Section title="Photo and Signature" handleEdit={handleEdit} pageNumber={11}>
    {data.scMedia?.photoIDPreview && (
      <div className="image-container">
        <p className="info-label">PhotoID:</p>
        <img 
          src={data.scMedia.photoIDPreview} 
          alt="House" 
          style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px' }} 
        />
      </div>
    )}
    {data.scMedia?.signaturePreview && (
      <div className="image-container">
        <p className="info-label">Signature:</p>
        <img 
          src={data.scMedia.signaturePreview} 
          alt="House" 
          style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px' }} 
        />
      </div>
    )}
  </Section>
);


