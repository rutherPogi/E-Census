import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../../../../utils/api/apiService';

import AddID from '../../components/AddID';
import soloParentID from '../../../../assets/soloParentID.png'
import '../../../../styles/components/style';


export default function AddSoloParentID() {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const generateNewSoloParentId = async () => {
    try {
      setIsLoading(true);
      const response = await get('/soloParentID/generate-soloParentID');
      const newSoloParentID = response.soloParentID;
      
      navigate(`/main/generate-id/solo-parent/${newSoloParentID}`, { 
        state: { soloParentID: newSoloParentID } 
      });
    } catch (err) {
      console.error('Error fetching Solo Parent ID:', err);
      setError(err.response?.data?.message || err.message || 'Error getting Solo Parent ID');
      alert('Failed to generate Solo Parent ID. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return(
    <AddID
      idType = 'SOLO PARENT'
      onClick = {generateNewSoloParentId}
      id = 'soloParent'
      idImage = {soloParentID}
      title = {`Solo Parent`}
    />
  )
}