// hooks/useHazardAreas.js
import { useState, useEffect } from 'react';
import { get, post, put, del } from '../../../utils/api/apiService';
import { HAZARD_TYPES } from '../utils/constant';

export function useHazardAreas() {
  
  const [hazardAreas, setHazardAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHazard, setSelectedHazard] = useState(null);
  const [editingHazardIndex, setEditingHazardIndex] = useState(null);

  useEffect(() => {
    const fetchHazardAreas = async () => {
      try {
        setIsLoading(true);
        const response = await get('/hazzardMap/hazardAreas');
        
        // Transform database response to match local state format
        const formattedHazardAreas = response.map(area => ({
          id: area.hazardAreaID,
          position: [parseFloat(area.latitude), parseFloat(area.longitude)],
          radius: area.radius,
          type: area.hazardType,
          color: HAZARD_TYPES.find(h => h.id === area.hazardType).color,
          description: area.description
        }));
        
        setHazardAreas(formattedHazardAreas);
      } catch (err) {
        console.error('Error fetching hazard areas:', err);
        setError('Failed to fetch hazard areas');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchHazardAreas();
  }, []);

  const addHazardArea = async (hazardCircle, hazardType) => {
    const newHazard = {
      position: hazardCircle.position,
      radius: hazardCircle.radius,
      type: hazardType,
      color: HAZARD_TYPES.find(h => h.id === hazardType).color,
      description: `${HAZARD_TYPES.find(h => h.id === hazardType).label} Area`
    };
    
    try {
      const hazardData = {
        latitude: newHazard.position[0],
        longitude: newHazard.position[1],
        radius: newHazard.radius,
        hazardType: newHazard.type,
        description: newHazard.description
      };
      
      const response = await post('/hazzardMap/hazardAreas', hazardData);
      
      if (response.hazardAreaID) {
        setHazardAreas(prev => [...prev, { ...newHazard, id: response.hazardAreaID }]);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error saving hazard area:', err);
      return false;
    }
  };

  const updateHazardArea = async (updatedHazard) => {
    try {
      const hazardData = {
        hazardAreaID: updatedHazard.id,
        latitude: updatedHazard.position[0],
        longitude: updatedHazard.position[1],
        radius: updatedHazard.radius,
        hazardType: updatedHazard.type,
        description: updatedHazard.description
      };
      
      await put(`/hazzardMap/hazardAreas/${updatedHazard.id}`, hazardData);
      
      setHazardAreas(prev => 
        prev.map(hazard => 
          hazard.id === updatedHazard.id ? updatedHazard : hazard
        )
      );
      
      return true;
    } catch (err) {
      console.error('Error updating hazard area:', err);
      return false;
    }
  };

  const deleteHazardArea = async (hazardId) => {
    try {
      await del(`/hazzardMap/hazardAreas/${hazardId}`);
      setHazardAreas(prev => prev.filter(hazard => hazard.id !== hazardId));
      return true;
    } catch (err) {
      console.error('Error deleting hazard area:', err);
      return false;
    }
  };

  const selectHazardForEditing = (index) => {
    setEditingHazardIndex(index);
    setSelectedHazard(hazardAreas[index]);
  };

  const clearSelectedHazard = () => {
    setSelectedHazard(null);
    setEditingHazardIndex(null);
  };

  return {
    hazardAreas,
    isLoading,
    error,
    selectedHazard,
    editingHazardIndex,
    addHazardArea,
    updateHazardArea,
    deleteHazardArea,
    selectHazardForEditing,
    setSelectedHazard,
    clearSelectedHazard
  };
}