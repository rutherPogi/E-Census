import { useCallback } from 'react';
import { useFormContext } from "../components/others/FormContext";
import { useNotification } from "./useNotification";
import { get } from '../../../../utils/api/apiService';


export const useTransformData = (pwdIDNumber, populationID, renewal = false) => {
  
  const { setEntireFormData } = useFormContext();
  const { showNotification } = useNotification();

  const fetchPersonData = useCallback(async () => {

    if (populationID) {
      console.log('REGISTER');
      try {
        const response = await get(`/pwdID/get-personal-info/${populationID}`, {
          params: { populationID },
        });
    
        if (response) {
          console.log('RAW DATA:', response);
  
          const transformedData = {
            personalInfo: response.personalInfo[0] || {},
            familyBackground: {},
            otherInfo: {},
            pwdMedia: {}
          };
          console.log('TRANSFORMED DATA:', transformedData); 
          setEntireFormData(transformedData);
          
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error('Error fetching data', err);
        showNotification('Failed to load data. Please try again later.', 'error');
      }
    } else if (pwdIDNumber && renewal) {
      console.log('RENEWAL');
      try {
        const response = await get(`/pwdID/view/${pwdIDNumber}`, {
          params: { pwdIDNumber },
        });
    
        if (response) {
          console.log('RAW DATA:', response);

          const pwdMedia = response.pwdMedia[0];
  
          const transformedData = {
            personalInfo: response.personalInfo[0] || {},
            familyBackground: response.familyBackground[0] || {},
            otherInfo: response.otherInfo[0] || {},
            pwdMedia: {
              ...pwdMedia,
              photoIDPreview: pwdMedia.photoID || null
            }
          };
          
          console.log('TRANSFORMED DATA:', transformedData);
          setEntireFormData(transformedData);
          
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error('Error fetching data', err);
        showNotification('Failed to load data. Please try again later.', 'error');
      }
    };
    
    
  }, [populationID, setEntireFormData, showNotification]);

  return { fetchPersonData };
};