// hooks/useHouseData.js
import { useState, useEffect } from 'react';
import { get } from '../../../utils/api/apiService';

export function useHouseData() {
  
  const [houseData, setHouseData] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        setIsLoading(true);
        const response = await get('/hazzardMap/coordinates');
        setHouseData(response);
      } catch (err) {
        setError('Failed to fetch house data');
        console.error('Error fetching house data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHouseData();
  }, []);

  return {
    houseData,
    selectedHouse,
    setSelectedHouse,
    isLoading,
    error
  };
}