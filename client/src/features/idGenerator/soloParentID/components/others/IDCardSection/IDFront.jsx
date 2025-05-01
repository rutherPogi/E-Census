import { Card, Box, Typography, Divider } from "@mui/material";
import { useFormContext } from "../FormContext";
import { formatters } from "../../../utils/formatter";
import itbayatLogo from '../../../../../../assets/itbayatLogo.png'

const IDFront = () => {

  const { formData } = useFormContext();
  const personalInfo = formData?.personalInfo;

  return (
      <Card sx={{ border: "1px solid #ccc", width: 324, height: 204 }}>
        <Box sx={{ position: 'relative', padding: '0.5em 0.5em', display: "flex", justifyContent: 'center' }}>
          <img 
            src={itbayatLogo} 
            alt="Itbayat Logo" 
            style={{ 
              position: 'absolute',
              left: '1em',
              width: "36px", 
              height: "36px", 
              objectFit: "cover" 
            }} 
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: "center" }}>
            <Typography sx={{ fontSize: '7px' }}>Republic of the Philippines</Typography>
            <Typography sx={{ fontSize: '7px' }}>Province of Batanes</Typography>
            <Typography sx={{ fontSize: '7px' }}>Municipality of Itbayat</Typography>
          </Box>
        </Box>

        <Box sx={{ padding: 0.5, textAlign: "center", fontWeight: "bold", bgcolor: "#F6402D" }}>
          <Typography sx={{ fontSize: '10px', color: 'white' }}>SOLO PARENT IDENTIFICATION CARD</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
          <Typography sx={{ textAlign: 'center', fontWeight: '500', fontSize: '8px', mr: 0.5 }}>
            ID No.
          </Typography>
          <Typography sx={{ borderBottom: '1px solid black', textAlign: 'center', fontSize: '8px', mr: 1, minWidth: '40px' }}>
            {personalInfo.soloParentIDNumber || ''}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", padding: 0.5, width: '100%', boxSizing: 'border-box'}}>
          {/* PHOTO ID - Now a perfect square */}
          <Box
            sx={{
              width: '70px',
              height: '70px',
              border: "1px solid #ddd",
              mr: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              aspectRatio: "1/1"
            }}
          >
            {formData?.spMedia?.photoIDPreview ? (
              <img 
                src={formData.spMedia?.photoIDPreview} 
                alt="ID Photo" 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            ) : (
              <Typography variant="caption">Photo ID</Typography>
            )}
          </Box>

          {/* DETAILS */}
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <Typography sx={{ fontSize: '8px', fontWeight: 500, borderBottom: '1px solid black', width: '100%', textAlign: 'center' }}>
                {`${personalInfo.firstName}
                  ${personalInfo.middleName ? personalInfo.middleName : ''}
                  ${personalInfo.lastName}
                  ${personalInfo.suffix ? personalInfo.suffix : ''}` || ''}
              </Typography>
              <Typography sx={{ fontSize: '8px', fontWeight: 500 }}>
                NAME
              </Typography>
            </Box>

            {/* Date and Place of Birth in one line */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '7px', whiteSpace: 'nowrap', mr: 0.5 }}>
                Date and Place of Birth:
              </Typography>
              <Typography sx={{ fontSize: '7px', borderBottom: '1px solid black', width: '100%' }}>
                {`${formatters.date(personalInfo.birthdate) || ''} 
                  ${personalInfo.birthplace || ''}`}
              </Typography>
            </Box>
            
            {/* Address on its own line */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '7px', whiteSpace: 'nowrap', mr: 0.5 }}>Address:</Typography>
              <Typography sx={{ fontSize: '7px', borderBottom: '1px solid black', width: '100%' }}>
                {`${personalInfo?.street}
                  ${personalInfo?.barangay}
                  ${personalInfo?.municipality}
                  ${personalInfo?.province}` || ''}
              </Typography>
            </Box>
            
            {/* Solo Parent Category on its own line */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '7px', whiteSpace: 'nowrap', mr: 0.5 }}>
                Solo Parent Category:
              </Typography>
              <Typography sx={{ fontSize: '7px', borderBottom: '1px solid black', width: '100%' }}>
                {personalInfo.soloParentCategory || 'N/A'}
              </Typography>
            </Box>
            
            {/* Benefit Qualification Code on its own line */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '7px', whiteSpace: 'nowrap', mr: 0.5 }}>
                Benefit Qualification Code:
              </Typography>
              <Typography sx={{ fontSize: '7px', borderBottom: '1px solid black', width: '100%' }}>
                {personalInfo.beneficiaryCode || 'N/A'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', padding: '0 0.5em', justifyContent: 'space-between', mt: 1 }}>
          <Box mt={1}>
            <Typography sx={{ fontSize: '7px'}}>
              THIS CARD IS NON-TRANSFERRABLE
            </Typography>
            <Typography sx={{ fontSize: '7px'}}>
              AND VALID UNTIL {formData?.validUntil || ''}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {formData?.spMedia?.signature ? (
              <Box 
                sx = {{ 
                  width: '100px', 
                  height: '15px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}
              >
                <img 
                  src={formData.spMedia.signature} 
                  alt="Signature" 
                  style={{ maxWidth: "100%", maxHeight: "25px", objectFit: "contain" }} 
                />
              </Box>
            ) : null}
            <Typography sx={{ fontSize: '8px', borderTop: '1px solid black' }}>
              Signature or Thumbmark
            </Typography>
          </Box>
        </Box>
      </Card>
  );
};

export default IDFront;