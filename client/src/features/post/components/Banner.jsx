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
        height: { xs: '300px', sm: '300px', md: '300px' },
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
          backgroundColor: 'rgba(42, 42, 58, 0.9)',
        }}
      />

      {/* Header with Logo and Login */}
      <Box sx={{ width: '100%', position: "absolute", top: 0, zIndex: 2 }}>
        <Toolbar sx={{ 
          display: "flex", 
          justifyContent: "space-between",
          px: { xs: 1, sm: 2, md: 3 }
        }}>
          {/* App Logo and Name */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={mswdoLogo}
              alt="eCensus Logo"
              sx={{
                height: { xs: '20px', sm: '30px' },
                marginRight: { xs: '5px', sm: '10px' },
              }}
            />
            <Typography 
              variant={isMobile ? "body1" : "h6"}
              sx={{
                color: '#fff',
                fontFamily: 'Prosto One',
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}
            >
              <span style={{ color: '#FF5733' }}>e</span>-tbayat MSWDO
            </Typography>
          </Box>
          
          {/* Login Button */}
          <Tooltip title="Login">
            <Button
              startIcon={!isMobile ? <PersonIcon /> : null}
              variant="outlined"
              onClick={onLogin}
              sx={{
                color: '#fff',
                borderColor: '#FF5733',
                '&:hover': {
                  borderColor: '#fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' },
                py: { xs: 0.5, sm: 0.75 },
                px: { xs: 1, sm: 1.5 }
              }}
            >
              Login
            </Button>
          </Tooltip>
        </Toolbar>
      </Box>

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
            {/* Municipality Logo */}
            <Box
              component="img"
              src={itbayatLogo}
              alt="Itbayat Logo"
              sx={{
                height: { xs: '70px', sm: '80px', md: '150px' },
                marginRight: { xs: 0, md: 2 },
                marginBottom: { xs: 1, md: 0 },
              }}
            />
            <Box>
              <Typography
                variant={isMobile ? "h4" : isTablet ? "h3" : "h2"}
                sx={{
                  color: '#FF5733',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  textAlign: 'left'
                }}
              >
                Municipal Social Welfare and Development Office
              </Typography>
              <Typography
                variant={isMobile ? "h6" : isTablet ? "h5" : "h4"}
                sx={{
                  color: '#fff',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                  textAlign: 'left'
                }}
              >
                Local Government of Itbayat
              </Typography>
            </Box>
            {/* Municipality Name */}
            
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;