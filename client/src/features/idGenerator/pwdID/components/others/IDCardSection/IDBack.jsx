import { Card, Box, Typography } from "@mui/material";
import { useFormContext } from "../FormContext";
import dayjs from "dayjs";



const IDBack = ({ mayor, mayorSignature }) => {

  const { formData } = useFormContext();

  return (
    <Card sx={{ border: "1px solid #ccc", width: 324, height: 204, p: 1.2, boxSizing: 'border-box' }}>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Typography sx={{ fontSize: '8px' }}>ADDRESS: </Typography>
        <Typography sx={{ borderBottom: '1px solid black', flex: 1, fontSize: '8px' }}>
          {`${formData.personalInfo.street || ''} 
           ${formData.personalInfo.barangay || ''} 
           ${formData.personalInfo.municipality || ''} 
           ${formData.personalInfo.region || ''}`}
        </Typography>
      </Box>
    
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '70%' }}>
          <Typography sx={{ whiteSpace: "nowrap", mr: 0.5, fontSize: '8px' }}>DATE OF BIRTH:</Typography>
          <Typography sx={{ borderBottom: '1px solid black', flex: 1, fontSize: '8px' }}>
            {formData.personalInfo.birthdate 
              ? dayjs(formData.personalInfo.birthdate).format('MMMM D, YYYY') 
              : '...'}
          </Typography>
        </Box>
    
        <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
          <Typography sx={{ whiteSpace: "nowrap", mr: 0.5, fontSize: '8px' }}>SEX:</Typography>
          <Typography sx={{ borderBottom: '1px solid black', flex: 1, textAlign: "center", fontSize: '8px' }}>
            {formData.personalInfo.sex || '...'}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '70%' }}>
          <Typography sx={{ whiteSpace: "nowrap", mr: 0.5, fontSize: '8px' }}>DATE ISSUED:</Typography>
          <Typography sx={{ borderBottom: '1px solid black', flex: 1, fontSize: '8px' }}>
            {new Date().toLocaleDateString('en-PH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'Asia/Manila',
            })}
          </Typography>
        </Box>
    
        <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
          <Typography sx={{ whiteSpace: "nowrap", mr: 0.5, fontSize: '8px' }}>BLOOD TYPE:</Typography>
          <Typography sx={{ borderBottom: '1px solid black', flex: 1, textAlign: "center", fontSize: '8px' }}>
            {formData.personalInfo.bloodType || 'N/A'}
          </Typography>
        </Box>
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 'bold', textAlign: 'center', mt: 1.5, fontSize: '8px' }}>
          IN CASE OF EMERGENCY
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Typography sx={{ fontSize: '8px' }}>ADDRESS: </Typography>
        <Typography sx={{ borderBottom: '1px solid black', flex: 1, fontSize: '7px' }}>
          {`${formData.personalInfo.street ? formData.personalInfo.street : ''}
            ${formData.personalInfo.barangay ? formData.personalInfo.barangay : ''}
            ${formData.personalInfo.municipality ? formData.personalInfo.municipality : ''}
            ${formData.personalInfo.province ? formData.personalInfo.province : ''}
            ${formData.personalInfo.region ? formData.personalInfo.region : ''}`}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Typography sx={{ fontSize: '8px' }}>CONTACT NO.: </Typography>
        <Typography sx={{ borderBottom: '1px solid black', flex: 1, fontSize: '8px' }}>
          {formData.personalInfo.mobileNumber || 'N/A'}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 1 }}>
        {mayorSignature && (
          <Box sx={{ 
            height: "10px", 
            width: "100%", 
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
        <Typography sx={{ textAlign: 'center', fontWeight: '500', fontSize: '8px' }}>
          {mayor || ''}
        </Typography>
        <Typography sx={{ borderTop: '1px solid black', width: '70%', textAlign: 'center', fontSize: '7px' }}>
          MAYOR
        </Typography>
      </Box>

      <Box>
        <Typography sx={{fontSize: '5px', textAlign: 'center', p: '0 1em', mt: 0.5}}>
          THE HOLDER OF THIS CARD IS A PERSON WITH DISABILITY AND IS ENTITLED TO DISCOUNT ON MEDICAL AND
          DENTAL SERVICES, PURCHASE OF MEDICINES, TRANSPORTATION, ADMISSION FEES, IN ALL ESTABLISHMENTS
          AND EDUCATIONAL ASSISTANCE AS AUTHORIZED BY R.A. 9442 AND ITS IMPLEMENTING RULES AND
          REGULATIONS. <br/>
          ANY VIOLATION THEREOF IS PUNISHABLE BY LAW. <br/>
          THIS CARD IS NON-TRANSFERRABLE.
        </Typography>
      </Box>

      <Typography sx={{fontStyle: 'italic', fontWeight: '500', fontSize: '8px', textAlign: 'center', mt: 0.5}}>
        Valid for 5 years.
      </Typography>
    </Card>
  );
};

export default IDBack;