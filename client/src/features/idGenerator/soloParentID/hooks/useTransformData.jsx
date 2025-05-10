import { useCallback } from 'react';
import { useFormContext } from "../components/others/FormContext";
import { useNotification } from "./useNotification";
import { get } from '../../../../utils/api/apiService';


export const useTransformData = (soloParentIDNumber, populationID, renewal = false) => {
  
  const { setEntireFormData } = useFormContext();
  const { showNotification } = useNotification();

  console.log('SOLO parent:', soloParentIDNumber);
  console.log('popu :', populationID);
  console.log('renewa:', renewal);

  const fetchPersonData = useCallback(async () => {
    if (soloParentIDNumber && renewal) {
      console.log('RENEWAL');
      try {
        const response = await get(`/soloParentID/view/${soloParentIDNumber}`, {
          params: { soloParentIDNumber },
        });
    
        if (response) {

          console.log('RAW DATA:', response);

          const spMedia = response.spMedia[0];
  
          const transformedData = {
            personalInfo: response.personalInfo[0] || {},
            householdComposition: response.householdComposition || {},
            problemNeeds: response.problemNeeds[0] || {},
            emergencyContact: response.emergencyContact[0] || {},
            spMedia: {
              ...spMedia,
              photoIDPreview: spMedia.photoID || null
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
    } else if (populationID) {
      console.log('REGISTER');
      try {
        const response = await get(`/soloParentID/get-personal-info/${populationID}`, {
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
    } 
    
    
  }, [populationID, setEntireFormData, showNotification]);

  return { fetchPersonData };
};