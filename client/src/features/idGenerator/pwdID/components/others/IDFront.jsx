import { Card, Box, Typography, Divider } from "@mui/material";

import { useFormContext } from "./FormContext";
import pwdLogo from '../../../../../assets/pwdLogo.png'
import itbayatLogo from '../../../../../assets/itbayatLogo.png'
import phFlag from '../../../../../assets/phFlag.png'

const IDFront = () => {

  const { formData } = useFormContext();


  return (
      <Card sx={{ border: "1px solid #ccc", width: 520, height: 350 }}>
        <Box 
          sx={{ 
            position: 'relative', 
            padding: '.5em 1em', 
            display: "flex", 
            justifyContent: 'center',
            mb: 2
          }}
        >

          <Box sx={{ position: 'absolute', left: '3.5em', top: '1em' }}>
            <img 
              src={phFlag} 
              alt="Itbayat Logo" 
              style={{ 
                height: "45px", 
                objectFit: "cover" 
              }} 
            />
          </Box>
          
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2">Republic of the Philippines</Typography>
            <Typography variant="body2">Province of Batanes</Typography>
            <Typography variant="body2">Municipality of Itbayat</Typography>
          </Box>

          <Box 
            sx={{
              position: 'absolute',
              right: '2em',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <img 
              src={itbayatLogo} 
              alt="Itbayat Logo" 
              style={{ 
                width: "60px", 
                height: "60px", 
                objectFit: "cover" 
              }} 
            />
            <img 
              src={pwdLogo} 
              alt="Itbayat Logo" 
              style={{ 
                width: "45px", 
                height: "45px", 
                objectFit: "cover", 
                borderRadius: '25px'
              }} 
            />
          </Box>
          
        </Box>


        <Box sx={{ display: "flex", padding: 1, width: '100%', boxSizing: 'border-box'}}>

          <Box sx={{width: '100%'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1 }}>
              <Typography variant="body1" fontWeight="bold">
                { formData.personalInfo.firstName + 
                 (formData.personalInfo.middleName === 'N/A' ? ' ' : ' ' + formData.personalInfo.middleName + ' ') + 
                  formData.personalInfo.lastName }
              </Typography>
              <Typography 
                variant="body2" textAlign={'center'}
                sx={{ width: '100%', borderTop: '1px solid black' }}
              >
                Name
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1 }}>
              <Typography variant="body1" fontWeight="bold">
                {formData.disabilityInfo.disabilityType}
              </Typography>
              <Typography 
                variant="body2" textAlign={'center'}
                sx={{ width: '100%', borderTop: '1px solid black' }}
              >
                Type of Disability
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1 }}>
              <Typography 
                variant="body2" textAlign={'center'}
                sx={{ width: '80%', borderTop: '1px solid black', mt: 3 }}
              >
                  Signature
              </Typography>
            </Box>
            
          </Box>

          <Box>
            {/* PHOTO ID */}
            <Box
              sx={{
                width: '170px',
                height: '130px',
                border: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {formData?.pwdMedia?.photoIDPreview ? (
                <img 
                  src={formData.pwdMedia.photoIDPreview} 
                  alt="ID Photo" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              ) : (
                "Photo ID"
              )}
            </Box>

            {/* ID NUMBER */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1 }}>
              <Typography fontWeight="bold"
                sx={{
                  fontSize: '14px'
                }}
              >
                {formData?.name || "02-0902-000-0000041"}
              </Typography>
              <Typography 
                variant="body2" textAlign={'center'}
                sx={{ width: '100%', borderTop: '1px solid black' }}
              >
                  ID No.
              </Typography>
            </Box>
          </Box>

         

          
        </Box>

        <Box sx={{ display: 'flex', padding: '0 1em', justifyContent: 'center'}}>
          <Typography sx={{ fontSize: '12px', fontStyle: "italic", mt: 3}}>
            VALID ANYWHERE IN THE PHILIPPINES
          </Typography>
        </Box>
      </Card>
  );
};

export default IDFront;
