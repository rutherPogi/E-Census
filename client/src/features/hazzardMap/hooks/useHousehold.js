import { useState, useEffect } from 'react';
import { get } from '../../../utils/api/apiService';

export function useHousehold() {
  
  const [household, setHousehold] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHousehold = async () => {
      try {
        setIsLoading(true);
        const response = await get('/hazzardMap/household');
        setHousehold(response);
      } catch (err) {
        setError('Failed to fetch household');
        console.error('Error fetching household:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHousehold();
  }, []);

  const getHouseholdBySurveyId = (surveyID) => {
    if (!surveyID || !household.length) return console.log('Empty');
    return household.filter(person => person.surveyID === surveyID);
  };

  return {
    household,
    getHouseholdBySurveyId,
    isLoading,
    error
  };
}