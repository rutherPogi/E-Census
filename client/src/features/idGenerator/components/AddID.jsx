import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Container, useTheme, useMediaQuery, Typography } from '@mui/material';
import { Edit, Add } from '@mui/icons-material';
import '../../../styles/components/style'


export default function AddID({ idType, onClick, id, idImage, title }) {

  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const cr80AspectRatio = 1.59;

  return(
    <Container 
      maxWidth="lg"
      sx={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 2, sm: 2, md: 3 },
        backgroundColor: '#fff',
        padding: { xs: 1.5, sm: 2.5, md: 4 },
        borderRadius: { xs: 1, sm: 1.5, md: 2 },
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        margin: '0 auto',
      }}
    >
      <Box 
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        backgroundColor="#fff"
        p={{ xs: 1.5, sm: 2, md: 3 }}
        gap={{ xs: 1.5, sm: 1.5, md: 2 }}
      >
        <Typography 
          variant={isMobile ? 'subtitle1' : 'h6'} 
          align="center"
          sx={{ fontWeight: 'bold' }}
        >
          {title} ID
        </Typography>
        
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 3, sm: 4, md: 5 },
            width: '100%',
            maxWidth: { sm: '450px', md: '550px' },
            margin: '0 auto'
          }}
        >
          {/* Card container with fixed aspect ratio */}
          <Box
            sx={{
              width: '100%',
              position: 'relative',
              paddingTop: `${100 / cr80AspectRatio}%`, // Creates the CR80 aspect ratio
              backgroundColor: '#ccc',
              borderRadius: { xs: 2, sm: 2.5, md: 3 },
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              border: '1px solid #ccc',
            }}
          >
            <Card 
              component="img" 
              src={idImage}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                backgroundColor: '#f0f0f0',
              }}
            />
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: { xs: 1, sm: 1.5, md: 2 }, 
            width: '100%', 
            backgroundColor: '#fff',
            padding: { xs: 0.5, sm: 0.75, md: 1 },
            borderRadius: { xs: 1, sm: 1.5, md: 2 },
            boxSizing: 'border-box'
          }}>
            <Button
              variant="outlined"
              onClick={() => navigate(`/main/manage-${id}ID`)}
              startIcon={<Edit />}
              size={isMobile ? "small" : "medium"}
              sx={{ 
                width: '100%',
                py: { xs: 1, sm: 1.25, md: 1.5 }
              }}
            >
              LIST {idType} ID's
            </Button>
            <Button
              variant="contained"
              onClick={onClick}
              startIcon={<Add />}
              size={isMobile ? "small" : "medium"}
              sx={{ 
                width: '100%',
                py: { xs: 1, sm: 1.25, md: 1.5 }
              }}
            >
              ADD {idType} ID
            </Button>
            
            
          </Box>
        </Box>
      </Box>     
    </Container>
  
  )
}