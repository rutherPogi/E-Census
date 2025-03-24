import { Card, Box, Typography } from "@mui/material";
import { useFormContext } from "./FormContext";




const IDBack = () => {

  const { formData } = useFormContext();



  return (
      <Card sx={{ border: "1px solid #ccc", width: 324, height: 204, padding: 1, boxSizing: 'border-box' }}>

        <Typography sx={{ fontSize: '11px', fontWeight: '500' }}>CHILD/REN/DEPENDENT/S:</Typography>


        {/* Table - simplified for smaller card size */}
        <Box sx={{ 
          border: "1px solid #ddd", 
          margin: "0 0.5em", 
          height: "60px",
          fontSize: "8px"
        }}>
          {/* Table content will go here */}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1}}>
          <Typography sx={{ fontSize: '11px', fontWeight: '500' }}>IN CASE OF EMERGENCY:</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ fontSize: '10px' }}>NAME: {formData.emergencyContact.name || "..."}</Typography>
            <Typography sx={{ fontSize: '10px' }}>CONTACT NUMBER: {formData.emergencyContact.number || "..."}</Typography>
          </Box> 
          <Typography sx={{ fontSize: '10px' }}>ADDRESS: {formData.emergencyContact.address || "..."}</Typography>
        </Box>

        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          padding: "0.5em", 
          marginTop: "0.5em" 
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ textAlign: 'center', fontWeight: '500', fontSize: '9px' }}>SABAS C. DE SAGON</Typography>
            <Typography sx={{ borderTop: '1px solid black', width: '70%', textAlign: 'center', fontSize: '8px' }}>Municipal Mayor</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ textAlign: 'center', fontWeight: '500', fontSize: '9px' }}>GLAIZA G. MALUPA RSW</Typography>
            <Typography sx={{ borderTop: '1px solid black', width: '70%', textAlign: 'center', fontSize: '8px' }}>MSWDO Officer</Typography>
          </Box>
        </Box>
      </Card>
  );
};

export default IDBack;