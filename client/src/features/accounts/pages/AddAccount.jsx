import { useState } from "react";
import { Delete, PersonAdd, Save, Autorenew } from '@mui/icons-material'
import { Box, Button, CardContent, IconButton, Paper, Stack,
         Tab, Tabs, Table, TableBody, TableCell, TableContainer,
         TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";

import { post } from "../../../utils/api/apiService";
import { DropdownInput, NumberInput, TextInput } from "../../../components/common/FormFields";
import { INITIAL_BULK_STATE, INITIAL_ERROR_STATE, INITIAL_FORM_DATA, POSITION_OPTIONS } from "../utils/constants";
import { Notification } from "../../../components/common/Notification";

const AddAccount = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tempAccounts, setTempAccounts] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [bulkGeneration, setBulkGeneration] = useState(INITIAL_BULK_STATE);
  const [errors, setErrors] = useState(INITIAL_ERROR_STATE); 

  const showNotification = (message, type) => {
    setSnackbarMessage(message);
    setSeverity(type);
    setSnackbarOpen(true);
  };

  const handleInputChange = (field) => (e, newValue) => {
    const value = newValue?.value || e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  // Handle input changes for bulk generation form
  const handleBulkInputChange = (field) => (e, newValue) => {
    const value = newValue?.value || e.target.value;
    setBulkGeneration((prev) => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  // Validate form fields
  const validateForm = ({ data }) => {
    const newErrors = {};
    let isValid = true;

    Object.keys(data).forEach(field => {
      if (!data[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };


  const handleAddAccount = async () => {
    // Validate form
    if (!validateForm({data: formData})) {
      showNotification('All fields are required!', 'error');
      return;
    }
  
    // Check for duplicate username in temp accounts
    if (tempAccounts.some(account => account.username === formData.username)) {
      showNotification('Username already added to the list', 'error');
      return;
    }
  
    try {
      // Get the current date in YYYYMM format
      const today = new Date();
      const dateFormatted = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}`;
      
      // Check the database for the last sequence
      const response = await axios.get(`http://localhost:3000/api/auth/last-sequence`, {
        params: {
          dateFormat: dateFormatted
        }
      });
      
      // Get the last sequence from response or default to 0
      const lastSequence = response.data.lastSequence || 0;
      const nextSequence = lastSequence + 1;
      const sequenceFormatted = String(nextSequence).padStart(4, '0');
      
      // Create account with generated userID but keep user's input for other fields
      const newAccount = {
        userID: `USER${dateFormatted}${sequenceFormatted}`,
        // Keep the user's provided values
        accountName: formData.accountName,
        username: formData.username,
        password: formData.password,
        position: formData.position,
        id: Date.now() // This is just for list manipulation, not saved to DB
      };
      
      // Add to temporary accounts 
      setTempAccounts([...tempAccounts, newAccount]);
      
      // Clear form
      setFormData(INITIAL_FORM_DATA);
      showNotification('Account added to list', 'success');
    } catch (err) {
      console.error('Error in handleAddAccount:', err);
      showNotification(err.response?.data?.error || "Error checking last sequence", 'error');
    }
  };

  const handleGenerateAccounts = async () => {

    const { position, count } = bulkGeneration;
    
    if (!validateForm({data: bulkGeneration})) {
      showNotification('All fields are required!', 'error');
      return;
    }
  
    try {

      const today = new Date();
      const dateFormatted = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}`;
      
      const response = await axios.get(`http://localhost:3000/api/auth/last-sequence`, {
        params: {
          dateFormat: dateFormatted
        }
      });
      
      // Get the last sequence from response or default to 0
      const lastSequence = response.data.lastSequence || 0;
      
      const generatedAccounts = [];
      
      // Generate the requested number of accounts
      for (let i = 0; i < count; i++) {
        // Calculate the next sequence number with proper padding
        const sequenceNum = lastSequence + i + 1;
        const sequenceFormatted = String(sequenceNum).padStart(4, '0');
        
        // Create account with auto-generated fields using EXACT format
        const account = {
          userID: `USER${dateFormatted}${sequenceFormatted}`,
          accountName: `NAME${sequenceFormatted}`,
          username: `${position}${dateFormatted}${sequenceFormatted}`,
          password: `PASS${sequenceFormatted}`,
          position: position,
          id: Date.now() + i // Unique ID for the temporary list
        };
        
        generatedAccounts.push(account);
      }
      
      // Add generated accounts to temporary list
      if (generatedAccounts.length > 0) {
        setTempAccounts(prev => [...prev, ...generatedAccounts]);
        showNotification(`Generated ${generatedAccounts.length} accounts`, 'success');
      }
    } catch (err) {
      console.error(err);
      showNotification(err.response?.data?.error || "Error checking last sequence", 'error');
    }
  };

  // Remove an account from the temporary list
  const handleRemoveAccount = (id) => {
    setTempAccounts(tempAccounts.filter(account => account.id !== id));
    showNotification('Account removed from list', 'info');
  };

  // Save all accounts to the database
  const handleSaveAllAccounts = async () => {
    if (tempAccounts.length === 0) {
      showNotification('No accounts to save', 'warning');
      return;
    }

    try {
      const res = await post("/auth/register-batch", { accounts: tempAccounts });
      showNotification(res.message || "Accounts registered successfully", 'success');
      setTempAccounts([]);
    } catch (err) {
      console.error(err);
      showNotification(err.response?.data?.error || "Error registering accounts", 'error');
    }
  };

  // Clear all accounts from temporary list
  const handleClearAll = () => {
    if (tempAccounts.length === 0) return;
    
    setTempAccounts([]);
    showNotification("All accounts cleared from list", 'info');
  };

  return (
    <Box className="responsive-container">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Add Single Account" />
            <Tab label="Generate Multiple Accounts" />
          </Tabs>
        </Box>
        
        <CardContent>
          {activeTab === 0 ? (
            <Box component="form" noValidate 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1em',
                mt: 1 
              }}>    
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

              <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAdd />}
                onClick={handleAddAccount}
                sx={{ mt: 1, py: 1.5 }}
              >
                Add to List
              </Button>
            </Box>
          ) : (
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1em',
                mt: 1 
              }}>
              <DropdownInput
                label="Position"
                name="position"
                options={POSITION_OPTIONS}
                value={bulkGeneration.position}
                onChange={(e, newValue) => handleBulkInputChange('position')(e, newValue)}
                error={errors.position2}
                helperText={errors.position2 || 'e.g., MSWDO Officer, Barangay Official'}
                required
              />
              <NumberInput
                label="Number of Accounts"
                name="count"
                value={bulkGeneration.count} 
                onChange={handleBulkInputChange('count')}
                max={20}
                required
              />
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={<Autorenew />}
                onClick={handleGenerateAccounts}
                sx={{ py: 1.5 }}
              >
                Generate Accounts
              </Button>
            </Box>
          )}
        </CardContent>
      </Box>
      
      <Box padding={2}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="h2">
            Accounts to Register ({tempAccounts.length})
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClearAll}
              disabled={tempAccounts.length === 0}
            >
              Clear All
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<Save />}
              onClick={handleSaveAllAccounts}
              disabled={tempAccounts.length === 0}
            >
              Save All Accounts
            </Button>
          </Stack>
        </Box>

        {tempAccounts.length > 0 ? (
          <TableContainer component={Paper} sx={{ boxShadow: 2, maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>User ID</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Username</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Password</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Position</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tempAccounts.map((account) => (
                  <TableRow key={account.id} hover>
                    <TableCell>{account.userID}</TableCell>
                    <TableCell>{account.accountName}</TableCell>
                    <TableCell>{account.username}</TableCell>
                    <TableCell>{account.password}</TableCell>
                    <TableCell>{account.position}</TableCell>
                    <TableCell align="center">
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveAccount(account.id)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.100' }}>
            <Typography color="text.secondary">
              No accounts added yet. Use the form above to add or generate accounts.
            </Typography>
          </Paper>
        )}
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