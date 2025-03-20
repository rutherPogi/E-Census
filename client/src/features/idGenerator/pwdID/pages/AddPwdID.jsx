import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../../../../utils/api/apiService';

import AddID from '../../components/AddID';
import pwdID from '../../../../assets/pwdID-image.svg'
import '../../../../styles/components/style';



export default function AddPwdID() {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const generateNewSurveyId = async () => {
    try {
      setIsLoading(true);
      const response = await get('/pwdID/generate-pwdID');
      const newApplicantID = response.pwdID;
      
      navigate(`/main/generate-id/pwd/${newApplicantID}`, { 
        state: { applicantNumber: newApplicantID } 
      });
    } catch (err) {
      console.error('Error fetching PWD ID:', err);
      setError(err.response?.data?.message || err.message || 'Error getting PWD ID');
      alert('Failed to generate PWD ID. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return(
    <AddID
      idType = 'PWD'
      onClick = {generateNewSurveyId}
      id = 'pwd'
      idImage = {pwdID}
      title = {`Person with Disability`}
    />
  )
}