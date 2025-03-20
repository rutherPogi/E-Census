import { Card, Box, Typography } from "@mui/material";



const IDBack = ({ formData }) => {
  return (
    <Card sx={{ border: "1px solid #ccc", width: 520, height: 350, p: 2, boxSizing: 'border-box' }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Typography fontSize={'14px'}>ADDRESS: </Typography>
        <Typography  sx={{ borderBottom: '1px solid black', flex: 1, fontSize: '14px' }}>Hello</Typography>
      </Box>
    
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* DATE OF BIRTH (70%) */}
        <Box sx={{ display: 'flex', alignItems: 'center', width: '70%' }}>
          <Typography sx={{ whiteSpace: "nowrap", mr: 1, fontSize: '14px' }}>DATE OF BIRTH:</Typography>
          <Typography sx={{ borderBottom: '1px solid black', flex: 1, fontSize: '14px' }}>October 5, 2023</Typography>
        </Box>
    
        {/* SEX (30%) */}
        <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
          <Typography sx={{ whiteSpace: "nowrap", mr: 1, fontSize: '14px' }}>SEX:</Typography>
          <Typography sx={{ borderBottom: '1px solid black', flex: 1, textAlign: "center", fontSize: '14px' }}>M</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* DATE OF BIRTH (70%) */}
        <Box sx={{ display: 'flex', alignItems: 'center', width: '70%' }}>
          <Typography sx={{ whiteSpace: "nowrap", mr: 1, fontSize: '14px' }}>DATE ISSUED:</Typography>
          <Typography sx={{ borderBottom: '1px solid black', flex: 1, fontSize: '14px' }}>October 5, 2023</Typography>
        </Box>
    
        {/* SEX (30%) */}
        <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
          <Typography sx={{ whiteSpace: "nowrap", mr: 1, fontSize: '14px' }}>BLOOD TYPE:</Typography>
          <Typography sx={{ borderBottom: '1px solid black', flex: 1, textAlign: "center", fontSize: '14px' }}>M</Typography>
        </Box>
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 'bold', textAlign: 'center', mt: 2}}>IN CASE OF EMERGENCY</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Typography fontSize={'14px'}>ADDRESS: </Typography>
        <Typography sx={{ borderBottom: '1px solid black', flex: 1, fontSize: '14px' }}>Hello</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Typography fontSize={'14px'}>CONTACT NO.: </Typography>
        <Typography sx={{ borderBottom: '1px solid black', flex: 1, fontSize: '14px' }}>Hello</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 3 }}>
        <Typography sx={{ textAlign: 'center', fontWeight: '500' }}>SABAS C. DE SAGON</Typography>
        <Typography sx={{ borderTop: '1px solid black', width: '70%', textAlign: 'center', fontSize: '12px' }}>MAYOR</Typography>
      </Box>

      <Box>
        <Typography sx={{fontSize: '8px', textAlign: 'center', p: '0 2em', mt: 1}}>
          THE HOLDER OF THIS CARD IS A PERSON WITH DISABILITY AND IS ENTITLED TO DISCOUNT ON MEDICAL AND
          DENTAL SERVICES, PURCHASE OF MEDICINES, TRANSPORTATION, ADMISSION FEES, IN ALL ESTABLISHMENTS
          AND EDUCATIONAL ASSISTANCE AS AUTHORIZED BY R.A. 9442 AND ITS IMPLEMENTING RULES AND
          REGULATIONS. <br/>
          ANY VIOLATION THEREOF IS PUNISHABLE BY LAW. <br/>
          THIS CARD IS NON-TRANSFERRABLE.
        </Typography>
      </Box>

      <Typography sx={{fontStyle: 'italic', fontWeight: '500', fontSize: '12px', textAlign: 'center', mt: 2}}>Valid for 5 years.</Typography>
    </Card>
  
  );
};

export default IDBack;
