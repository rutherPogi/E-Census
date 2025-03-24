import { Card, Box, Typography, Divider } from "@mui/material";
import { useFormContext } from "./FormContext";
import itbayatLogo from '../../../../../assets/itbayatLogo.png'

const IDFront = () => {
  const { formData } = useFormContext();

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

        <Box sx={{ padding: 0.5, textAlign: "center", fontWeight: "bold", bgcolor: "#ccc" }}>
          <Typography sx={{ fontSize: '9px' }}>SOLO PARENT IDENTIFICATION CARD</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
          <Typography sx={{ textAlign: 'center', fontWeight: '500', fontSize: '8px', mr: 0.5 }}>ID No.</Typography>
          <Typography sx={{ borderBottom: '1px solid black', textAlign: 'center', fontSize: '8px', mr: 1, minWidth: '40px' }}>
            {formData?.idNumber || "..."}
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
            {formData?.photo ? (
              <img src={formData.photo} alt="ID Photo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <Typography variant="caption">Photo ID</Typography>
            )}
          </Box>

          {/* DETAILS */}
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <Typography sx={{ fontSize: '8px', fontWeight: 500, borderBottom: '1px solid black', width: '100%', textAlign: 'center' }}>
                {formData?.name || "..."}
              </Typography>
              <Typography sx={{ fontSize: '8px', fontWeight: 500 }}>NAME</Typography>
            </Box>

            {/* Date and Place of Birth in one line */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '7px', whiteSpace: 'nowrap', mr: 0.5 }}>Date and Place of Birth:</Typography>
              <Typography sx={{ fontSize: '7px', borderBottom: '1px solid black', width: '100%' }}>
                {formData?.personalInfo?.birthdate || '...'}
              </Typography>
            </Box>
            
            {/* Address on its own line */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '7px', whiteSpace: 'nowrap', mr: 0.5 }}>Address:</Typography>
              <Typography sx={{ fontSize: '7px', borderBottom: '1px solid black', width: '100%' }}>
                {formData?.personalInfo?.address || '...'}
              </Typography>
            </Box>
            
            {/* Solo Parent Category on its own line */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '7px', whiteSpace: 'nowrap', mr: 0.5 }}>Solo Parent Category:</Typography>
              <Typography sx={{ fontSize: '7px', borderBottom: '1px solid black', width: '100%' }}>
                {formData?.category || '...'}
              </Typography>
            </Box>
            
            {/* Benefit Qualification Code on its own line */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '7px', whiteSpace: 'nowrap', mr: 0.5 }}>Benefit Qualification Code:</Typography>
              <Typography sx={{ fontSize: '7px', borderBottom: '1px solid black', width: '100%' }}>
                {formData?.benefitCode || '...'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', padding: '0 0.5em', justifyContent: 'space-between', mt: 2 }}>
          <Box>
            <Typography sx={{ fontSize: '7px'}}>
              THIS CARD IS NON-TRANSFERABLE
            </Typography>
            <Typography sx={{ fontSize: '7px'}}>
              AND VALID UNTIL {formData?.validUntil || '...'}
            </Typography>
          </Box>

          <Typography sx={{ fontSize: '8px', borderTop: '1px solid black' }}>Signature or Thumbmark</Typography>
        </Box>
      </Card>
  );
};

export default IDFront;