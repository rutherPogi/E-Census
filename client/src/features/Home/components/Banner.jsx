import { Button, Box, Typography, Toolbar, Tooltip, 
         useMediaQuery, useTheme, Container } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import bannerImage from "../../../assets/etbayat-banner.png";
import itbayatLogo from "../../../assets/itbayatLogo.png";
import mswdoLogo from '../../../assets/MSWDO-Logo.png';



const Banner = ({ onLogin }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box 
      sx={{
        position: 'relative',
        height: { xs: '300px', sm: '400px', md: '500px' },
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Banner Background Image */}
      <Box
        component="img"
        src={bannerImage}
        alt="Banner"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      
      {/* Dark Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(42, 42, 58, 0.8)',
        }}
      />



      {/* Banner Content */}
      <Container
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            marginBottom: { xs: 2, md: 4 },
          }}
        >

          {/* Municipality Name */}
          <Box>
            <Box
              component="img"
              src={itbayatLogo}
              alt="Itbayat Logo"
              sx={{
                height: { xs: '70px', sm: '100px', md: '200px' },
                marginRight: { xs: 0, md: 2 },
                marginBottom: { xs: 1, md: 0 },
              }}
            />
            <Typography
              variant={isMobile ? "h4" : isTablet ? "h3" : "h2"}
              sx={{
                color: '#FF7448',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              Municipal Social Welfare and Development Office
            </Typography>
            <Typography
              variant={isMobile ? "h6" : isTablet ? "h5" : "h4"}
              sx={{
                color: '#fff',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' }
              }}
            >
              Local Government of Itbayat
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;