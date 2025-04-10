import { useCallback } from 'react';
import { useFormContext } from "../components/others/FormContext";
import { useNotification } from "./useNotification";
import { get } from '../../../../utils/api/apiService';


export const useTransformData = (populationID) => {
  
  const { setEntireFormData } = useFormContext();
  const { showNotification } = useNotification();

  const fetchPersonData = useCallback(async () => {

    if (!populationID) return;
    
    try {
      const response = await get(`/pwdID/get-personDetails/${populationID}`, {
        params: { populationID },
      });
  
      if (response) {
        console.log('RAW DATA:', response);
      }
      
  
    } catch (err) {
      console.error('Error fetching data', err);
      showNotification('Failed to load survey data. Please try again later.', 'error');
    }
  }, [populationID, setEntireFormData, showNotification]);

  return { fetchPersonData };
};