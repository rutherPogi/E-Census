import { Card, Box, Typography } from "@mui/material";



const IDBack = ({ formData }) => {
  return (
      <Card sx={{ border: "1px solid #ccc", width: 600, height: 350 }}>
        <Box>
          <Typography>CHILD/REN/DEPENDENT/S:</Typography>
        </Box>

        {/* Table */}

        <Box>
          <Typography>IN CASE OF EMERGENCY:</Typography>
          <Typography>NAME: </Typography>
          <Typography>CONTACT NUMBER: </Typography>
          <Typography>ADDRESS: </Typography>
        </Box>

        <Box>
          <Box>
            <Typography sx={{borderBottom: '1px solid black'}}>SABAS C. DE SAGON</Typography>
            <Typography>Municipal Mayor</Typography>
          </Box>
          <Box>
            <Typography>GLAIZA G. MALUPA RSW</Typography>
            <Typography>MSWDO Officer</Typography>
          </Box>
        </Box>

      </Card>
  );
};

export default IDBack;
