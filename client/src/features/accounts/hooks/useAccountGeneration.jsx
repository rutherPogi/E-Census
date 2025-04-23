// pages/admin/hooks/useAccountGeneration.js
import { useState } from 'react';
import { INITIAL_BULK_ERROR_STATE, INITIAL_BULK_STATE } from '../utils/constants';
import { get, post } from '../../../utils/api/apiService';



export const useAccountGeneration = (showNotificationProp) => {
  
  const [tempAccounts, setTempAccounts] = useState([]);
  const [bulkGeneration, setBulkGeneration] = useState(INITIAL_BULK_STATE);
  const [errors, setErrors] = useState(INITIAL_BULK_ERROR_STATE);
  
  const showNotification = showNotificationProp;

  const handleBulkInputChange = (field) => (e, newValue) => {
    const value = newValue?.value || e.target.value;
    setBulkGeneration((prev) => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(INITIAL_BULK_STATE).forEach(key => {
      const value = bulkGeneration[key];
        if (!value) {
          newErrors[key] = 'This field is required';
          isValid = false;
          console.log(`Field "${key}" is empty. Value:`, value);
        }
    });

    setErrors(newErrors);
    console.log('New errors after validation:', newErrors);
    return isValid;
  };

  const handleGenerateAccounts = async () => {
    
    const { position, count, barangay } = bulkGeneration;
    
    if (!validateForm()) {
      return showNotification('All fields are required!', 'error');
    }
  
    try {
      const today = new Date();
      const dateFormatted = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}`;
      const dateFormatted2 = `${String(today.getFullYear()).slice(-2)}${String(today.getMonth() + 1).padStart(2, '0')}`;

      const response = await get(`/auth/last-sequence?dateFormat=${dateFormatted}`);
      const lastSequence = response.lastSequence || 0;
      const generatedAccounts = [];
      
      for (let i = 0; i < count; i++) {
        const sequenceNum = lastSequence + i + 1;
        const sequenceFormatted = String(sequenceNum).padStart(4, '0');
        
        const account = {
          userID: `USER${dateFormatted}${sequenceFormatted}`,
          accountName: `N${sequenceFormatted}`,
          username: `UN${dateFormatted2}${sequenceFormatted}`,
          password: `PASS${sequenceFormatted}`,
          position,
          barangay,
          id: Date.now() + i // Unique ID for the temporary list
        };
        
        generatedAccounts.push(account);
      }
      
      if (generatedAccounts.length > 0) {
        setTempAccounts(prev => [...prev, ...generatedAccounts]);
        showNotification(`Generated ${generatedAccounts.length} accounts`, 'success');
      }
    } catch (err) {
      console.error(err);
      showNotification(err.response?.data?.error || "Error checking last sequence", 'error');
    }
  };

  const handleRemoveAccount = (id) => {
    setTempAccounts(tempAccounts.filter(account => account.id !== id));
    showNotification('Account removed from list', 'info');
  };

  const handleSaveAllAccounts = async () => {
    if (tempAccounts.length === 0) {
      showNotification('No accounts to save', 'warning');
      return;
    }

    try {
      console.log('TEMP ACCOUNTS:', tempAccounts);
      const res = await post("/auth/register-batch", tempAccounts);
      console.log('MESSAGE:', res.message);
      setTempAccounts([]);
      setBulkGeneration(INITIAL_BULK_STATE);
      showNotification(res.message || "Accounts registered successfully", 'success');
    } catch (err) {
      console.error(err);
      showNotification(err.response?.data?.error || "Error registering accounts", 'error');
    }
  };

  const handleClearAll = () => {
    if (tempAccounts.length === 0) return;
    
    setTempAccounts([]);
    showNotification("All accounts cleared from list", 'info');
  };

  return {
    tempAccounts,
    bulkGeneration,
    errors,
    handleBulkInputChange,
    handleGenerateAccounts,
    handleRemoveAccount,
    handleSaveAllAccounts,
    handleClearAll
  };
};