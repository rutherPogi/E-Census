import { Card, Box, Typography, Divider } from "@mui/material";

import { useFormContext } from "../FormContext";
import pwdLogo from '../../../../../../assets/pwdLogo.png'
import itbayatLogo from '../../../../../../assets/itbayatLogo.png'
import phFlag from '../../../../../../assets/phFlag.png'

const IDFront = () => {

  const { formData } = useFormContext();


  return (
      <Card sx={{ border: "1px solid #ccc", width: 324, height: 204 }}>
        {/* HEADER */}
        <Box 
          sx={{ 
            position: 'relative', 
            padding: '.3em .6em', 
            display: "flex", 
            justifyContent: 'center',
            mb: 1
          }}
        >
          {/* PH FLAG */}
          <Box sx={{ position: 'absolute', left: '1.5em', top: '.5em' }}>
            <img 
              src={phFlag} 
              alt="Itbayat Logo" 
              style={{ 
                height: "25px", 
                objectFit: "cover" 
              }} 
            />
          </Box>
          
          {/* TEXT HEADER */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" sx={{ fontSize: '10px' }}>Republic of the Philippines</Typography>
            <Typography variant="body2" sx={{ fontSize: '10px' }}>Province of Batanes</Typography>
            <Typography variant="body2" sx={{ fontSize: '10px' }}>Municipality of Itbayat</Typography>
          </Box>

          {/* ITBAYAT/PWD LOGO */}
          <Box 
            sx={{
              position: 'absolute',
              right: '1em',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <img 
              src={itbayatLogo} 
              alt="Itbayat Logo" 
              style={{ 
                width: "35px", 
                height: "35px", 
                objectFit: "cover" 
              }} 
            />
            <img 
              src={pwdLogo} 
              alt="Itbayat Logo" 
              style={{ 
                width: "25px", 
                height: "25px", 
                objectFit: "cover", 
                borderRadius: '15px'
              }} 
            />
          </Box>
        </Box>

        {/* CONTENT */}
        <Box sx={{ display: "flex", padding: '0 .5em', width: '100%', gap: 1, boxSizing: 'border-box'}}>
          {/* NAME */}
          <Box sx={{width: '100%'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 0.5 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: "bold" }}>
                { (formData.personalInfo.firstName || '...') + 
                  (formData.personalInfo.middleName === 'N/A' ? ' ' : ' ' + (formData.personalInfo.middleName || '') + ' ') + 
                  (formData.personalInfo.lastName || '') }
              </Typography>
              <Typography 
                sx={{ width: '100%', borderTop: '1px solid black', fontSize: '8px', textAlign: 'center' }}
              >
                Name
              </Typography>
            </Box>

            {/* TYPE OF DISABILITY */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 0.5 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: "bold" }}>
                {formData.personalInfo.disabilityType || '...'}
              </Typography>
              <Typography sx={{ width: '100%', borderTop: '1px solid black', fontSize: '8px', textAlign: 'center' }}>
                Type of Disability
              </Typography>
            </Box>

            {/* SIGNATURE */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 0.5 }}>
              {formData?.pwdMedia?.signature ? (
                <Box sx={{ width: '100px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={formData.pwdMedia.signature} 
                    alt="Signature" 
                    style={{ maxWidth: "100%", maxHeight: "25px", objectFit: "contain" }} 
                  />
                </Box>
              ) : null}
              <Typography sx={{ width: '80%', borderTop: '1px solid black', fontSize: '8px', textAlign: 'center' }}>
                Signature
              </Typography>
            </Box>
            
          </Box>

          <Box>
            {/* PHOTO ID */}
            <Box
              sx={{
                width: '100px',
                height: '80px',
                border: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: '10px'
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 0.5 }}>
              <Typography sx={{ fontSize: '9px', fontWeight: "bold" }}>
                {formData.personalInfo.pwdID || '...'}
              </Typography>
              <Typography sx={{ width: '100%', borderTop: '1px solid black', fontSize: '8px', textAlign: 'center' }}>
                  ID No.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', padding: '0 .5em', justifyContent: 'center'}}>
          <Typography sx={{ fontSize: '8px', fontStyle: "italic", mt: 1.5}}>
            VALID ANYWHERE IN THE PHILIPPINES
          </Typography>
        </Box>
      </Card>
  );
};

export default IDFront;