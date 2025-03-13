import { useFormContext } from "../../pages/FormContext";
import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, IconButton, Snackbar, Alert } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import dayjs from 'dayjs';
 

export default function ServiceAvailed2({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  const { serviceAvailed } = formData;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const handleAdd = () => {
    sessionStorage.removeItem('editingMemberIndex');
    handleBack();
  };

  const handleEdit = (index) => {
    sessionStorage.setItem('editingMemberIndex', index);
    handleBack();
  };

  const handleDelete = (index) => {
    const updatedService = [...serviceAvailed];
    updatedService.splice(index, 1);
    
    updateFormData('serviceAvailed', updatedService);

    setSnackbarMessage("Deleted Successfully!");
    setSnackbarOpen(true);
  };
    
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>ASSISTANCE/SERVICE ALREADY AVAILED </div>
      <div className='responsive-table'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>NGO</TableCell>
                <TableCell>Service/Assistance</TableCell>
                <TableCell>Male Served</TableCell>
                <TableCell>Female Served</TableCell>
                <TableCell>Total Served</TableCell>
                <TableCell>How the service help</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceAvailed.map((service, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {service.date && dayjs(service.date).isValid() 
                      ? dayjs(service.date).format('MM/DD/YYYY') 
                      : 'N/A'}
                  </TableCell>
                  <TableCell>{service.ngo}</TableCell>
                  <TableCell>{service.assistance}</TableCell>
                  <TableCell>{service.male}</TableCell>
                  <TableCell>{service.female}</TableCell>
                  <TableCell>{service.total}</TableCell>
                  <TableCell>{service.howServiceHelp}</TableCell>
                  <TableCell>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEdit(index)}
                      aria-label="edit service"
                    >
                      <Edit/>
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDelete(index)}
                      aria-label="delete service"
                    >
                      <Delete/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className='form-buttons'>
          <div className='form-buttons-right'>
            <button type='button' className="btn" onClick={handleAdd}>Add Service</button>
            <button type='button' className="btn submit-btn" onClick={handleNext}>
              Next
            </button>
          </div>     
      </div>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
 