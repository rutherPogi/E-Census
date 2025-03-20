import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert
} from "@mui/material";
import { Delete, PersonAdd, Save, Autorenew } from '@mui/icons-material'


const Register = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    position: ""
  });

  // Bulk generation state
  const [bulkGeneration, setBulkGeneration] = useState({
    prefix: "",
    position: "",
    count: 5,
    startNumber: ''
  });

  // Active tab state (0 = Manual, 1 = Generate)
  const [activeTab, setActiveTab] = useState(0);

  // List of temporary accounts to be registered
  const [tempAccounts, setTempAccounts] = useState([]);
  
  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBulkInputChange = (e) => {
    const { name, value } = e.target;
    setBulkGeneration((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (e, newValue) => {
    setBulkGeneration((prev) => ({
      ...prev,
      count: newValue
    }));
  };

  const handleAddAccount = () => {
    // Validate form
    if (!formData.name || !formData.username || !formData.password || !formData.position) {
      setNotification({
        open: true,
        message: "All fields are required",
        severity: "error"
      });
      return;
    }

    // Check for duplicate username in temp accounts
    if (tempAccounts.some(account => account.username === formData.username)) {
      setNotification({
        open: true,
        message: "Username already added to the list",
        severity: "error"
      });
      return;
    }

    // Add to temporary accounts
    setTempAccounts([...tempAccounts, { ...formData, id: Date.now() }]);
    
    // Clear form
    setFormData({
      name: "",
      username: "",
      password: "",
      position: ""
    });

    setNotification({
      open: true,
      message: "Account added to list",
      severity: "success"
    });
  };

  const handleRemoveAccount = (id) => {
    setTempAccounts(tempAccounts.filter(account => account.id !== id));
    setNotification({
      open: true,
      message: "Account removed from list",
      severity: "info"
    });
  };

  const handleGenerateAccounts = () => {
    const { prefix, position, count, startNumber } = bulkGeneration;
    
    if (!prefix || !position || count <= 0) {
      setNotification({
        open: true,
        message: "Invalid generation parameters",
        severity: "error"
      });
      return;
    }
    
    const generatedAccounts = [];
    const start = parseInt(startNumber);
    
    for (let i = 0; i < count; i++) {
      const number = start + i;
      const account = {
        id: Date.now() + i,
        name: `${prefix}${number}`,
        username: `${prefix}${number}`,
        password: `password${number}`,
        position: position
      };
      
      // Check for duplicate username
      if (tempAccounts.some(acc => acc.username === account.username)) {
        setNotification({
          open: true,
          message: `Skipped duplicate username: ${account.username}`,
          severity: "warning"
        });
        continue;
      }
      
      generatedAccounts.push(account);
    }
    
    if (generatedAccounts.length > 0) {
      setTempAccounts(prev => [...prev, ...generatedAccounts]);
      
      setNotification({
        open: true,
        message: `Generated ${generatedAccounts.length} accounts`,
        severity: "success"
      });
      
      // Update start number for next generation
      setBulkGeneration(prev => ({
        ...prev,
        startNumber: start + count
      }));
    }
  };

  const handleSaveAllAccounts = async () => {
    if (tempAccounts.length === 0) {
      setNotification({
        open: true,
        message: "No accounts to save",
        severity: "warning"
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/auth/register-batch", {
        accounts: tempAccounts
      });
      
      setNotification({
        open: true,
        message: res.data.message || "Accounts registered successfully",
        severity: "success"
      });
      
      // Clear temp accounts after successful save
      setTempAccounts([]);
    } catch (err) {
      console.error(err);
      
      setNotification({
        open: true,
        message: err.response?.data?.error || "Error registering accounts",
        severity: "error"
      });
    }
  };

  const handleClearAll = () => {
    if (tempAccounts.length === 0) return;
    
    setTempAccounts([]);
    setNotification({
      open: true,
      message: "All accounts cleared from list",
      severity: "info"
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold">
        Admin Registration Portal
      </Typography>
      
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Add Single Account" />
            <Tab label="Generate Multiple Accounts" />
          </Tabs>
        </Box>
        
        <CardContent>
          {activeTab === 0 ? (
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Create Single Account
              </Typography>
              
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Stack>
                
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Stack>
                
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PersonAdd />}
                  onClick={handleAddAccount}
                  sx={{ mt: 2, py: 1.5 }}
                >
                  Add to List
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box sx={{ mt: 1 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Generate Multiple Accounts
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name/Username Prefix"
                    name="prefix"
                    value={bulkGeneration.prefix}
                    onChange={handleBulkInputChange}
                    helperText="e.g., 'user' will generate user1, user2, etc."
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    value={bulkGeneration.position}
                    onChange={handleBulkInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Start Number"
                    name="startNumber"
                    type="number"
                    value={bulkGeneration.startNumber}
                    onChange={handleBulkInputChange}
                    variant="outlined"
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Number of Accounts to Generate: {bulkGeneration.count}
                  </Typography>
                  <Slider
                    value={bulkGeneration.count}
                    onChange={handleSliderChange}
                    min={1}
                    max={20}
                    step={1}
                    marks
                    valueLabelDisplay="auto"
                  />
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>
      
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
                  <TableCell>{account.name}</TableCell>
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
      
      <Snackbar 
        open={notification.open} 
        autoHideDuration={5000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;