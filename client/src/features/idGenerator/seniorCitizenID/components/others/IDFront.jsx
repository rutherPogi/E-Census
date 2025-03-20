import { Card, Box, Typography, Divider } from "@mui/material";

import pwdLogo from '../../../../../assets/pwdLogo.png'
import itbayatLogo from '../../../../../assets/itbayatLogo.png'
import phFlag from '../../../../../assets/phFlag.png'

const IDFront = ({ formData }) => {
  return (
    <Card sx={{ border: "1px solid #ccc", width: 600, height: 350 }}>
      <Box sx={{ position: 'relative', padding: '.5em 1em', display: "flex", justifyContent: 'center' }}>
        <img 
          src={itbayatLogo} 
          alt="Itbayat Logo" 
          style={{ 
            position: 'absolute',
            left: '3em',
            top: '1em',
            width: "60px", 
            height: "60px", 
            objectFit: "cover" 
          }} 
        />
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: '12px'}}>Republic of the Philippines</Typography>
          <Typography sx={{ fontSize: '12px'}}>Province of Batanes</Typography>
          <Typography sx={{ fontSize: '12px'}}>Municipality of Itbayat</Typography>
          <Typography sx={{ fontSize: '14px'}}>OFFICE OF THE SENIOR CITIZEN AFFAIRS</Typography>
        </Box>
      </Box>

      <Box sx={{ textAlign: "center", fontWeight: "bold", bgcolor: "#ccc", height: '30px' }}/>

      <Box sx={{ display: "flex", gap: 3, mt: 2, p: 1, width: '100%', boxSizing: 'border-box'}}>
        <Box sx={{width: '100%'}}>
          <Box sx={{ display: 'flex', gap: 1, mb: 1  }}>
            <Typography>Name: </Typography>
            <Typography sx={{ borderBottom: '1px solid black', width: '100%', fontWeight: '500' }}>{formData?.name || "Juan Dela Cruz"}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 1  }}>
            <Typography>Address: </Typography>
            <Typography sx={{ borderBottom: '1px solid black', width: '100%', fontWeight: '500' }}>{formData?.name || "Juan Dela Cruz"}</Typography>
          </Box>

          {/* DATE, SEX, ISSUE DATE */}
          <Box sx={{ display: 'flex', gap: 2,  }}>
            <Box sx={{ display: 'flex', flex: 2, flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
              <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>
                {formData?.name || "September 12, 1940"}
              </Typography>
              <Typography sx={{ width: '100%', borderTop: '1px solid black', textAlign: 'center' }}
              >
                  Date of Birth
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
              <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>
                {formData?.name || "Male"}
              </Typography>
              <Typography sx={{ width: '100%', borderTop: '1px solid black', textAlign: 'center' }}
              >
                  Sex
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flex: 2, flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
              <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>
                {formData?.name || "January 1, 2025"}
              </Typography>
              <Typography sx={{ width: '100%', borderTop: '1px solid black', textAlign: 'center' }}
              >
                  Date Issue
              </Typography>
            </Box>
          </Box>
        </Box>
      
        {/* PHOTO ID */}
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
