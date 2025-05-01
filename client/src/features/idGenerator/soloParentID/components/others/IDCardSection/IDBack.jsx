import { Card, Box, Typography } from "@mui/material";
import { useFormContext } from "../FormContext";

const IDBack = ({mayor, mswdoOfficer, mayorSignature, mswdoSignature}) => {
  const { formData } = useFormContext();

  const personalInfo = formData?.personalInfo;
  const householdComposition = formData?.householdComposition;
  const emergencyContact = formData?.emergencyContact;

  return (
      <Card sx={{ border: "1px solid #ccc", width: 324, height: 204, padding: 1, boxSizing: 'border-box' }}>
        <Typography sx={{ fontSize: '11px', fontWeight: '500' }}>CHILD/REN/DEPENDENT/S:</Typography>

        <Box
          sx={{
            border: "1px solid #ddd",
            margin: "0 0.5em",
            height: "60px",
            fontSize: "8px",
            overflow: "auto", // in case there's more than can fit
            padding: "0.5em"
          }}
        >
          {householdComposition.map((member, index) => (
            <div key={index}>
              {`${member.firstName || ''} 
              ${member.middleName || ''} 
              ${member.lastName || ''}
              ${member.suffix ? ', ' + member.suffix : ''}`}
            </div>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1}}>
          <Typography sx={{ fontSize: '11px', fontWeight: '500' }}>
            IN CASE OF EMERGENCY:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ display:'flex', gap: 1 }}>
              <Typography sx={{ fontSize: '10px' }}>NAME:</Typography>
              <Typography sx={{ fontSize: '10px' }}>
                {emergencyContact.contactName || ''}
              </Typography>
            </Box>
            <Box sx={{ display:'flex', gap: 1 }}>
              <Typography sx={{ fontSize: '10px' }}>CONTACT NUMBER:</Typography>
              <Typography sx={{ fontSize: '10px' }}>
                {emergencyContact.mobileNumber || ''}
              </Typography>
            </Box>
          </Box> 
          <Box sx={{ display:'flex', gap: 1 }}>
            <Typography sx={{ fontSize: '10px' }}>ADDRESS:</Typography>
            <Typography sx={{ fontSize: '10px' }}>
              {`${personalInfo.street}
                ${personalInfo.barangay}
                ${personalInfo.municipality}
                ${personalInfo.province}` || ''}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          padding: "0.5em", 
          marginTop: "0.5em" 
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {mayorSignature && (
              <Box sx={{ 
                height: "10px", 
                width: "100px", 
                mb: 0.5, 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img 
                  src={mayorSignature} 
                  alt="Mayor's signature" 
                  style={{ 
                    maxHeight: '100%', 
                    maxWidth: '100%', 
                    objectFit: 'contain'
                  }} 
                />
              </Box>
            )}
            <Typography sx={{ textAlign: 'center', fontWeight: '500', fontSize: '9px' }}>
              {mayor || '?'}
            </Typography>
            <Typography sx={{ borderTop: '1px solid black', width: '70%', textAlign: 'center', fontSize: '8px' }}>
              Municipal Mayor
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {mswdoSignature && (
              <Box sx={{ 
                height: "25px", 
                width: "70%", 
                mb: 0.5, 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img 
                  src={mswdoSignature} 
                  alt="MSWDO Officer's signature" 
                  style={{ 
                    maxHeight: '100%', 
                    maxWidth: '100%', 
                    objectFit: 'contain'
                  }} 
                />
              </Box>
            )}
            <Typography sx={{ textAlign: 'center', fontWeight: '500', fontSize: '9px' }}>
              {mswdoOfficer || '?'}
            </Typography>
            <Typography sx={{ borderTop: '1px solid black', width: '70%', textAlign: 'center', fontSize: '8px' }}>
              MSWDO Officer
            </Typography>
          </Box>
        </Box>
      </Card>
  );
};

export default IDBack;