import { useCallback } from 'react';
import { useFormContext } from "../components/others/FormContext";
import { useNotification } from "./useNotification";
import { get } from '../../../../utils/api/apiService';


export const useTransformData = (seniorCitizenIDNumber, populationID, renewal = false) => {
  
  const { setEntireFormData } = useFormContext();
  const { showNotification } = useNotification();

  const fetchPersonData = useCallback(async () => {

    if (populationID) {
      console.log('REGISTER');
      try {
        const response = await get(`/seniorCitizenID/get-personal-info/${populationID}`, {
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
    } else if (seniorCitizenIDNumber && renewal) {
      console.log('RENEWAL');
      try {
        const response = await get(`/seniorCitizenID/view/${seniorCitizenIDNumber}`, {
          params: { seniorCitizenIDNumber },
        });
    
        if (response) {

          console.log('RAW DATA:', response);

          const scMedia = response.scMedia[0];
  
          const transformedData = {
            personalInfo: response.personalInfo[0] || {},
            familyComposition: response.familyComposition || {},
            scMedia: {
              ...scMedia,
              photoIDPreview: scMedia.photoID || null
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