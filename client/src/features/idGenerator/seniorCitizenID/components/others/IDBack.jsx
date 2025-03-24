import { Card, Box, Typography } from "@mui/material";
import { useFormContext } from "./FormContext";

const IDBack = () => {
  const { formData } = useFormContext();

  // CR80 standard size in pixels (assuming 96 DPI)
  // 3.375 inches × 2.125 inches = 324px × 204px

  return (
    <Card sx={{ border: "1px solid #ccc", width: 324, height: 204, p: 1, boxSizing: 'border-box' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography sx={{fontWeight: '500', textAlign: 'center', fontSize: '7px'}}>
          Benefits and Privileges Under Republic Act No. 9994
        </Typography>

        <Box>
          <Typography fontSize={6}>-Free medical and dental, diagnostic and laboratory services in all government facilities;</Typography>
          <Typography fontSize={6}>-20% discount for medicines;</Typography>
          <Typography fontSize={6}>-20% discount in hotels, restaurants, recreation centers etc;</Typography>
          <Typography fontSize={6}>-20% discount theaters, cinema houses and concert halls;</Typography>
          <Typography fontSize={6}>-20% discount in medical/dental services, diagnostic laboratory fees in private facilities;</Typography>
          <Typography fontSize={6}>-20% discount on burial services;</Typography>
          <Typography fontSize={6}>-20% discount in fares for domestic air, sea and public land transportation services;</Typography>
          <Typography fontSize={6}>-5% discount for monthly utilization of water and electricity;</Typography>
          <Typography fontSize={6}>-5% discount on basic necessities & prime commodities;</Typography>
          <Typography fontSize={6}>-12% VAT - exemption on the purchase of goods and services.</Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '5px', fontWeight: '500', textAlign: 'center'}}>
            Persons and Corporations violating RA 9994 shall be penalized;
          </Typography>
          <Typography sx={{ fontSize: '5px', fontWeight: '500', textAlign: 'center'}}>
            For exculsive use of Senior Citizens; abus of Privilieges is punishable by law.
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 0.5 }}>
            <Typography sx={{ textAlign: 'center', fontWeight: '500', fontSize: '6px' }}>ONESIMO G. MANZO</Typography>
            <Typography sx={{ borderTop: '1px solid black', width: '70%', textAlign: 'center', fontSize: '5px' }}>OSCA Head</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 0.5 }}>
            <Typography sx={{ textAlign: 'center', fontWeight: '500', fontSize: '6px' }}>SABAS C. DE SAGON</Typography>
            <Typography sx={{ borderTop: '1px solid black', width: '70%', textAlign: 'center', fontSize: '5px' }}>Municipal Mayor</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default IDBack;