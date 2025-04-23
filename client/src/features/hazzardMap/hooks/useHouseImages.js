// hooks/useHouseImages.js
import { useState, useEffect } from 'react';
import { get } from '../../../utils/api/apiService';

export function useHouseImages() {
  
  const [allHouseImages, setAllHouseImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouseImages = async () => {
      try {
        setIsLoading(true);
        const response = await get('/hazzardMap/images');
        setAllHouseImages(response);
      } catch (err) {
        setError('Failed to fetch house images');
        console.error('Error fetching house images:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHouseImages();
  }, []);

  const getHouseImagesBySurveyId = (surveyID) => {
    if (!surveyID || !allHouseImages.length) return [];
    return allHouseImages.filter(image => image.surveyID === surveyID);
  };

  return {
    allHouseImages,
    getHouseImagesBySurveyId,
    isLoading,
    error
  };
}