import { Card, Box, Typography } from "@mui/material";
import { useFormContext } from "../FormContext";
import { formatters } from "../../../utils/formatter";
import itbayatLogo from '../../../../../../assets/itbayatLogo.png'

const IDFront = () => {

  const { formData } = useFormContext();
  const personalInfo = formData?.personalInfo;

  const datetoday = new Date().toLocaleDateString('en-PH', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <Card sx={{ border: "1px solid #ccc", width: 324, height: 204 }}>
      <Box sx={{ position: 'relative', padding: '.3em .6em', display: "flex", justifyContent: 'center' }}>
        <img 
          src={itbayatLogo} 
          alt="Itbayat Logo" 
          style={{ 
            position: 'absolute',
            left: '1.5em',
            top: '.5em',
            width: "35px", 
            height: "35px", 
            objectFit: "cover" 
          }}  
        />
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: '8px'}}>Republic of the Philippines</Typography>
          <Typography sx={{ fontSize: '8px'}}>Province of Batanes</Typography>
          <Typography sx={{ fontSize: '8px'}}>Municipality of Itbayat</Typography>
          <Typography sx={{ fontSize: '10px'}}>OFFICE OF THE SENIOR CITIZEN AFFAIRS</Typography>
        </Box>
      </Box>

      <Box sx={{ textAlign: "center", fontWeight: "bold", bgcolor: "#F6402D", height: '18px' }}/>

      <Box sx={{ display: "flex", gap: 1.5, mt: 1, p: 0.5, width: '100%', boxSizing: 'border-box'}}>
        <Box sx={{width: '100%'}}>
          <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5 }}>
            <Typography sx={{ fontSize: '9px' }}>Name: </Typography>
            <Typography sx={{ borderBottom: '1px solid black', width: '100%', fontWeight: '500', fontSize: '9px' }}>
              {`${personalInfo.firstName}
                ${personalInfo.middleName === 'N/A' ? '' : personalInfo.middleName}
                ${personalInfo.lastName}
                ${personalInfo.suffix === 'N/A' ? '' : personalInfo.suffix}` || ''}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5 }}>
            <Typography sx={{ fontSize: '9px' }}>Address: </Typography>
            <Typography sx={{ borderBottom: '1px solid black', width: '100%', fontWeight: '500', fontSize: '9px' }}>
              {`${personalInfo.street}
                ${personalInfo.barangay}
                ${personalInfo.municipality}
                ${personalInfo.province}` || ''}
            </Typography>
          </Box>

          {/* DATE, SEX, ISSUE DATE */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={{ display: 'flex', flex: 2, flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
              <Typography sx={{ textAlign: 'center', fontSize: '8px' }}>
                {formatters.date(personalInfo.birthdate) || ''}
              </Typography>
              <Typography sx={{ width: '100%', borderTop: '1px solid black', textAlign: 'center', fontSize: '8px' }}>
                Date of Birth
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
              <Typography sx={{ textAlign: 'center', fontSize: '8px' }}>
                {personalInfo.sex || ''}
              </Typography>
              <Typography sx={{ width: '100%', borderTop: '1px solid black', textAlign: 'center', fontSize: '8px' }}>
                Sex
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flex: 2, flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
              <Typography sx={{ textAlign: 'center', fontSize: '8px' }}>
                {datetoday}
              </Typography>
              <Typography sx={{ width: '100%', borderTop: '1px solid black', textAlign: 'center', fontSize: '8px' }}>
                Date Issue
              </Typography>
            </Box>
          </Box>
        </Box>
      
        {/* PHOTO ID */}
        <Box
          sx={{
            width: '90px',
            height: '75px',
            border: "1px solid #ddd",
            mr: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: '8px'
          }}
        >
          {formData?.scMedia?.photoIDPreview ? (
            <img 
              src={formData.scMedia.photoIDPreview} 
              alt="ID Photo" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            "Photo ID"
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', padding: '0 0.6em', justifyContent: 'space-between', mt: 0.5 }}>
        <Box>
          <Typography sx={{ fontSize: '8px'}}>
            THIS CARD IS NON-TRANSFERABLE
          </Typography>
          <Typography sx={{ fontSize: '8px'}}>
            AND VALID UNTIL {formData?.validUntil}
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", }}>
          <Box sx={{ width: '80px', height: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {formData?.scMedia.signature ? (
              <img 
                src={formData.scMedia.signature} 
                alt="Signature" 
                style={{ maxWidth: "100%", maxHeight: "100%" }} />
            ) : null }
          </Box>
          <Typography sx={{ fontSize: '7px'}} color="textSecondary">
            Signature or Thumbmark
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default IDFront;