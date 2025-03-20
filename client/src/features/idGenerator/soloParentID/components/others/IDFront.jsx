import { Card, Box, Typography, Divider } from "@mui/material";
import itbayatLogo from '../../../../../assets/itbayatLogo.png'

const IDFront = ({ formData }) => {
  return (
      <Card sx={{ border: "1px solid #ccc", width: 600, height: 350 }}>
        <Box sx={{ position: 'relative', padding: '1em 1em', display: "flex", justifyContent: 'center' }}>
          <img 
            src={itbayatLogo} 
            alt="Itbayat Logo" 
            style={{ 
              position: 'absolute',
              left: '2em',
              width: "60px", 
              height: "60px", 
              objectFit: "cover" 
            }} 
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2">Republic of the Philippines</Typography>
            <Typography variant="body2">Province of Batanes</Typography>
            <Typography variant="body2">Municipality of Itbayat</Typography>
          </Box>
        </Box>

        <Box sx={{ padding: 1, textAlign: "center", fontWeight: "bold", bgcolor: "#ccc" }}>
          <Typography variant="h7">SOLO PARENT IDENTIFICATION CARD</Typography>
        </Box>

        <Box sx={{display: 'flex', justifyContent: 'flex-end', p: '0 1em'}}>
          <Typography>ID No. {formData?.idNumber || "_______"}</Typography>
        </Box>

        <Box sx={{ display: "flex", padding: 1, width: '100%', boxSizing: 'border-box'}}>
          <Box
            sx={{
              width: '170px',
              height: '130px',
              border: "1px solid #ddd",
              mr: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {formData?.photo ? (
              <img src={formData.photo} alt="ID Photo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              "Photo ID"
            )}
          </Box>
          <Box sx={{width: '100%'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="body1" fontWeight="bold">{formData?.name || "Juan Dela Cruz"}</Typography>
              <Typography variant="body2" color="textSecondary">Name</Typography>
            </Box>
            
            <Typography variant="body2">Date and Place of Birth: {formData?.birthDetails}</Typography>
            <Typography variant="body2">Address: {formData?.address}</Typography>
            <Typography variant="body2">Solo Parent Category: {formData?.category}</Typography>
            <Typography variant="body2">Benefit Qualification Code: {formData?.benefitCode}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', padding: '0 1em', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ fontSize: '14px'}}>
              THIS CARD IS NON-TRANSFERABLE
            </Typography>
            <Typography sx={{ fontSize: '14px'}}>
              AND VALID UNTIL {formData?.validUntil}
            </Typography>
          </Box>
          
          <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <Box
              sx={{
                border: "1px solid #ddd",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {formData?.signature ? (
                <img src={formData.signature} alt="Signature" style={{ maxWidth: "100%", maxHeight: "100%" }} />
              ) : (
                "Signature Image"
              )}
            </Box>
            <Typography variant="body2" color="textSecondary">Signature or Thumbmark</Typography>
          </Box>
        </Box>
      </Card>
  );
};

export default IDFront;
