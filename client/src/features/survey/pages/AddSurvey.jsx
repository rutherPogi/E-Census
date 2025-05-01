import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../../../utils/api/apiService';
import '../../../styles/components/style'
import { Box, Button, Container, useTheme, useMediaQuery } from '@mui/material' 
import { Add, Edit } from '@mui/icons-material';



export default function AddSurvey() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  return(
    <Container
      maxWidth="lg"
      sx={{
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        backgroundColor: '#fff',
        padding: { xs: 2, sm: 3, md: 4 },
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <Box 
        sx={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <Box 
          sx={{  
            height: { xs: '200px', sm: '250px', md: '300px' },
            width: '100%',
            backgroundColor: '#f0f0f0',
            borderRadius: 2,
            backgroundImage: 'linear-gradient(120deg, #e0e0e0, #f5f5f5)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {/* Content for your preview/image area */}
        </Box>
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 2, 
            width: '100%' 
          }}
        >
          <Button 
            variant="outlined"
            onClick={() => navigate('/main/manage-survey')}
            startIcon={<Edit/>}
            fullWidth
            size={isMobile ? "medium" : "large"}
            sx={{ 
              borderRadius: 1.5,
              py: 1.5,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              flex: 1
            }}
          >
            SURVEY LIST
          </Button> 
          
          <Button 
            variant="contained" 
            onClick={() => navigate(`/main/survey/form`)}
            startIcon={<Add/>}
            fullWidth
            size={isMobile ? "medium" : "large"}
            sx={{ 
              borderRadius: 1.5,
              py: 1.5,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
              flex: 1
            }}
          >
            ADD SURVEY
          </Button>
          
          
        </Box>
      </Box>
    </Container>
  )
}