import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../../../utils/api/apiService';
import '../../../styles/components/style'
import { Box, Button, Container } from '@mui/material' 
import { Add, Edit } from '@mui/icons-material';
export default function AddSurvey() {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const generateNewSurveyId = async () => {
    try {
      setIsLoading(true);
      const response = await get('/surveys/generate-surveyID');
      const newSurveyNumber = response.surveyId;
      
      navigate(`/main/survey/${newSurveyNumber}`, { 
        state: { surveyNumber: newSurveyNumber } 
      });
    } catch (err) {
      console.error('Error fetching survey ID:', err);
      setError(err.response?.data?.message || err.message || 'Error getting survey ID');
      alert('Failed to generate survey ID. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return(
    <Container
      sx = {{
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#fff',
        padding: 2,
        borderRadius: 1
      }}
    >
        <Box 
          sx={{
            width: '600px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
                  <Box 
          sx = {{  
            height: '300px',
            width: '600px',
            backgroundColor: '#ccc',
            borderRadius: 1
          }}
        >
        </Box>
        <Box sx= {{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Button 
            variant="contained" 
            onClick={generateNewSurveyId}
            startIcon={<Add/>}
            sx = {{ width: '100%'}}
          >
            ADD SURVEY
          </Button>
          <Button 
            variant="outlined"
            onClick={() => navigate('/main/manage-survey')}
            startIcon={<Edit/>}
            sx = {{ width: '100%'}}
          >
            MANAGE SURVEY
          </Button> 
        </Box>
      </Box>

    </Container>
  )
}