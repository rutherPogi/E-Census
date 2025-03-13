import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../../../utils/api/apiService';
import '../../../styles/components/style'


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
    <div className='card survey'>
      <div className='random-box'>
      {/* Picture Here */}
      </div>
      <button 
        type='button' 
        className="btn submit-btn"
        onClick={generateNewSurveyId}
      >
        Add Survey +
      </button>
      <button 
        type='button' 
        className="btn cancel-btn" 
        onClick={() => navigate('/main/manage-survey')}
      >
        Manage Survey
      </button>   
    </div>
  )
}