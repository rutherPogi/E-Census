import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../../../../utils/api/apiService';
import AddID from '../../components/AddID';
import '../../../../styles/components/style';

 
export default function AddSeniorCitizenID() {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const generateNewSeniorCitizenId = async () => {
    try {
      setIsLoading(true);
      const response = await get('/seniorCitizenID/generate-seniorCitizenID');
      const newSeniorCitizenID = response.seniorCitizenID;
      
      navigate(`/main/generate-id/senior-citizen/${newSeniorCitizenID}`, { 
        state: { seniorCitizenID: newSeniorCitizenID } 
      });
    } catch (err) {
      console.error('Error fetching Senior Citizen ID:', err);
      setError(err.response?.data?.message || err.message || 'Error getting Senior Citizen ID');
      alert('Failed to generate Senior Citizen ID. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return(
    <AddID
      idType = 'SENIOR CITIZEN'
      onClick = {generateNewSeniorCitizenId}
      id = 'seniorCitizen'
    />
  )
}