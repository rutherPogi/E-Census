import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PersonAdd, ArrowBack } from '@mui/icons-material'
import { Box, Button } from "@mui/material";

import { post, get } from "../../../utils/api/apiService";
import { DropdownInput, TextInput } from "../../../components/common/FormFields";
import { BARANGAY_OPTIONS, INITIAL_ERROR_STATE, INITIAL_FORM_DATA, POSITION_OPTIONS } from "../utils/constants";
import { Notification } from "../../../components/common/Notification";

import { useNotification } from '../hooks/useNotification';

import PageHeader from "../components/PageHeader";




const AddAccount = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState(INITIAL_ERROR_STATE); 

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();

  const handleInputChange = (field) => (e, newValue) => {
    const value = newValue?.value || e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(INITIAL_FORM_DATA).forEach(key => {
      const value = formData[key];
        if (!value) {
          newErrors[key] = 'This field is required';
          isValid = false;
          console.log(`Field "${key}" is empty. Value:`, value);
        }
    });

    setErrors(newErrors);
    return isValid;
  };
  

  const handleSubmit = async () => {

    if(!validateForm()) {
      return showNotification('Please fill in all required fields', 'error');
    }

    try {
      const today = new Date();
      const dateFormatted = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}`;

      const res = await get(`/auth/last-sequence?dateFormat=${dateFormatted}`);

      const lastSequence = res.lastSequence || 0;
      const nextSequence = lastSequence + 1;
      const sequenceFormatted = String(nextSequence).padStart(4, '0');

      console.log('DATE FORMATTED:', dateFormatted);
      console.log('SEQUENCE FORMATTED:', sequenceFormatted);
      
      const newAccount = {
        userID: `USER${dateFormatted}${sequenceFormatted}`,
        accountName: formData.accountName,
        username: formData.username,
        password: formData.password,
        position: formData.position,
        barangay: formData.barangay
      };

      console.log('NEW ACCOUNT', newAccount);
      const response = await post("/auth/add-account", newAccount);
      showNotification(response.data?.message || "Account registered successfully", 'success');
      setFormData(INITIAL_FORM_DATA);
    } catch (err) {
      console.error(err);
      showNotification(err.response?.data?.error || "Error registering account", 'error');
    }
  };

  const goBack = () => navigate(-1);

  return (
    <Box className="responsive-container">
      <PageHeader 
        title="ADD ACCOUNT" 
        onBack={goBack}
        icon={<ArrowBack />}
      />
      <Box className='responsive-form details'>  
        <TextInput
          label="Full Name"
          name="accountName"
          value={formData.accountName}
          onChange={handleInputChange('accountName')}
          error={errors.accountName}
          helperText={errors.accountName || 'e.g., Juan Dela Cruz'}
          required
        />
        <TextInput
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange('username')}
          error={errors.username}
          helperText={errors.username || 'e.g., juanDelaCruz01'}
          required
        />
        <TextInput
          label="Password"
          name="password"
          type="password" // Added for security
          value={formData.password}
          onChange={handleInputChange('password')}
          error={errors.password}
          helperText={errors.password || 'Password must be at least 8 characters.'}
          required
        />
        <DropdownInput
          label="Position"
          name="position"
          options={POSITION_OPTIONS}
          value={formData.position}
          onChange={(e, newValue) => handleInputChange('position')(e, newValue)}
          error={errors.position}
          helperText={errors.position || 'e.g., MSWDO Officer, Barangay Official'}
          required
        />
        <DropdownInput
          label="Barangay"
          name="barangay"
          options={BARANGAY_OPTIONS}
          value={formData.barangay}
          onChange={(e, newValue) => handleInputChange('barangay')(e, newValue)}
          error={errors.barangay}
          helperText={errors.barangay}
          required
        />

        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAdd />}
          onClick={handleSubmit}
          sx={{ mt: 1, py: 1.5 }}
        >
          Add Account
        </Button>
      </Box>
      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </Box>
  );
};

export default AddAccount;