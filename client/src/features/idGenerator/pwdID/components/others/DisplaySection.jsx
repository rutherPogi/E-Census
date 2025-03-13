import { useTheme, useMediaQuery, Box, Typography } from "@mui/material";
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
      Sex: {data.personalInfo.sex}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Civil Status: {data.personalInfo.civilStatus}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Person's with Disability Number: {data.personalInfo.pwdNumber}
    </Typography>
  </Section>
);

export const DisabilityInfoSection = ({ data, handleEdit }) => (
  <Section title="Disability Information" handleEdit={handleEdit} pageNumber={2}>
    <Typography sx={{ marginLeft: '1em'}}>
      Type of Disability: {data.disabilityInfo.disabilityType}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Cause of Disability: {data.disabilityInfo.disabilityCause}
    </Typography>
  </Section>
);

export const ContactInfoSection = ({ data, handleEdit }) => (
  <Section title="Contact Information" handleEdit={handleEdit} pageNumber={3}>
    <Typography sx={{ marginLeft: '1em'}}>
      Residence Address: {`
      ${data.contactInfo.street}
      ${data.contactInfo.barangay}
      ${data.contactInfo.municipality},
      ${data.contactInfo.province},
      ${data.contactInfo.region}
      `}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Landline No: {data.contactInfo.landlineNumber}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Mobile No: {data.contactInfo.mobileNumber}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Email Address: {data.contactInfo.emailAddress}
    </Typography>
  </Section>
);

export const ProfessionalInfoSection = ({ data, handleEdit }) => (
  <Section title="Professional Information" handleEdit={handleEdit} pageNumber={4}>
    <Typography sx={{ marginLeft: '1em'}}>
      Educational Attainment: {data.professionalInfo.educationalAttainment}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Status of Employment: {data.professionalInfo.employmentStatus}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Category of Employment: {data.professionalInfo.employmentCategory}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Types of Employment: {data.professionalInfo.employmentType}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Occupation: {data.professionalInfo.occupation}
    </Typography>
  </Section>
);

export const OrganizationalInfoSection = ({ data, handleEdit }) => (
  <Section title="Organization Information" handleEdit={handleEdit} pageNumber={5}>
    <Typography sx={{ marginLeft: '1em'}}>
      Organization Affiliated: {data.organizationInfo.organizationAffiliated}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Contact Person: {data.organizationInfo.contactPerson}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Office Address: {data.organizationInfo.officeAddress}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Telephone Number: {data.organizationInfo.telephoneNumber}
    </Typography>
  </Section>
);

export const IDReferenceSection = ({ data, handleEdit }) => (
  <Section title="ID Reference No." handleEdit={handleEdit} pageNumber={6}>
    <Typography sx={{ marginLeft: '1em'}}>
      SSS No.: {data.idReferenceInfo.sssNumber}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      GSIS No.: {data.idReferenceInfo.gsisNumber}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      PAG-IBIG No.: {data.idReferenceInfo.pagibigNumber}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      PSN No.: {data.idReferenceInfo.psnNumber}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Philheath No.: {data.idReferenceInfo.philhealthNumber}
    </Typography>
  </Section>
);

export const FamilyBackgroundSection = ({ data, handleEdit }) => (
  <Section title="Family Background" handleEdit={handleEdit} pageNumber={7}>
    <Typography sx={{ marginLeft: '1em'}}>
      Father's Name: 
      {` ${data.familyBackground.fatherFirstName} 
        ${data.familyBackground.fatherMiddleName === 'N/A' ? '' : data.familyBackground.fatherMiddleName}
        ${data.familyBackground.fatherLastName}
        ${data.familyBackground.fatherSuffix === 'N/A' ? '' : data.familyBackground.fatherSuffix}`}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Mother's Name: 
      {` ${data.familyBackground.motherFirstName} 
        ${data.familyBackground.motherMiddleName === 'N/A' ? '' : data.familyBackground.motherMiddleName}
        ${data.familyBackground.motherLastName}`}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Guardian's Name: 
      {` ${data.familyBackground.guardianFirstName} 
        ${data.familyBackground.guardianMiddleName === 'N/A' ? '' : data.familyBackground.guardianMiddleName}
        ${data.familyBackground.guardianLastName}
        ${data.familyBackground.guardianSuffix === 'N/A' ? '' : data.familyBackground.guardianSuffix}`}
    </Typography>
  </Section>
);

export const AccomplishedBySection = ({ data, handleEdit }) => (
  <Section title="Accomplished By" handleEdit={handleEdit} pageNumber={8}>
    <Typography sx={{ marginLeft: '1em'}}>
      Applicant: 
      {` ${data.accomplishedBy.applicantFirstName} 
        ${data.accomplishedBy.applicantMiddleName === 'N/A' ? '' : data.accomplishedBy.guardianMiddleName}
        ${data.accomplishedBy.applicantLastName}
        ${data.accomplishedBy.applicantSuffix === 'N/A' ? '' : data.accomplishedBy.applicantSuffix}`}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Guardian: 
      {` ${data.accomplishedBy.guardianFirstName} 
        ${data.accomplishedBy.guardianMiddleName === 'N/A' ? '' : data.accomplishedBy.guardianMiddleName}
        ${data.accomplishedBy.guardianLastName}
        ${data.accomplishedBy.guardianSuffix === 'N/A' ? '' : data.accomplishedBy.guardianSuffix}`}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Representative: 
      {` ${data.accomplishedBy.repFirstName} 
        ${data.accomplishedBy.repMiddleName === 'N/A' ? '' : data.accomplishedBy.repMiddleName}
        ${data.accomplishedBy.repLastName}
        ${data.accomplishedBy.repSuffix === 'N/A' ? '' : data.accomplishedBy.repSuffix}`}
    </Typography>
  </Section>
);

export const OtherInfoSection = ({ data, handleEdit }) => (
  <Section title="Other Information" handleEdit={handleEdit} pageNumber={9}>
    <Typography sx={{ marginLeft: '1em'}}>
      Certifying Physician: 
      {`${data.otherInfo.cpFirstName} 
        ${data.otherInfo.cpMiddleName === 'N/A' ? '' : data.otherInfo.cpMiddleName}
        ${data.otherInfo.cpLastName}
        ${data.otherInfo.cpSuffix === 'N/A' ? '' : data.otherInfo.cpSuffix}`}
    </Typography>
    <Typography sx={{ marginLeft: '1em', mb: 2}}>
      License: {data.otherInfo.license}
    </Typography>

    <Typography sx={{ marginLeft: '1em'}}>
      Processing Officer: 
      {`${data.otherInfo.poFirstName} 
        ${data.otherInfo.poMiddleName === 'N/A' ? '' : data.otherInfo.poMiddleName}
        ${data.otherInfo.poLastName}
        ${data.otherInfo.poSuffix === 'N/A' ? '' : data.otherInfo.poSuffix}`}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Approving Officer: 
      {`${data.otherInfo.aoFirstName} 
        ${data.otherInfo.aoMiddleName === 'N/A' ? '' : data.otherInfo.aoMiddleName}
        ${data.otherInfo.aoLastName}
        ${data.otherInfo.aoSuffix === 'N/A' ? '' : data.otherInfo.aoSuffix}`}
    </Typography>
    <Typography sx={{ marginLeft: '1em'}}>
      Encoder: 
      {` ${data.otherInfo.eFirstName} 
        ${data.otherInfo.eMiddleName === 'N/A' ? '' : data.otherInfo.eMiddleName}
        ${data.otherInfo.eLastName}
        ${data.otherInfo.eSuffix === 'N/A' ? '' : data.otherInfo.eSuffix}`}
    </Typography>
  </Section>
);

export const ReportingUnitSection = ({ data, handleEdit }) => (
  <Section title="Reporting Unit" handleEdit={handleEdit} pageNumber={10}>
    <Typography sx={{ marginLeft: '1em'}}>
      Name of Reporting Unit (Office/Section): {`
      ${data.reportingUnit.office}
      ${data.reportingUnit.controlNumber}`}
    </Typography>
  </Section>
);

export const PhotoIDSection = ({ data, handleEdit }) => (
  <Section title="Photo ID" handleEdit={handleEdit} pageNumber={11}>
    {data.photoID && data.photoID.image ? (
      <img 
        src={data.photoID.image.preview} 
        alt="Photo ID" 
        style={{ maxWidth: '300px', maxHeight: '300px', borderRadius: '8px', marginLeft: '1em' }} 
      />
    ) : (
      <p>No photo ID uploaded</p>
    )}
  </Section>
);