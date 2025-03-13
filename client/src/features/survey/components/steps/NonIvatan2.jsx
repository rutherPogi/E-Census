import { useFormContext } from "../../pages/FormContext";
import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, IconButton, Snackbar, Alert } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import dayjs from 'dayjs';
  

export default function NonIvatan2({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  const { nonIvatan } = formData;
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
    const updatedIpula = [...nonIvatan];
    updatedIpula.splice(index, 1);
    
    updateFormData('nonIvatan', updatedIpula);

    setSnackbarMessage("Deleted Successfully!");
    setSnackbarOpen(true);
  };
    
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>NON-IVATAN AND TRANSIENTS </div>
      <div className='responsive-table'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Details of Settlement</TableCell>
                <TableCell>Ethnicity</TableCell>
                <TableCell>Place Origin</TableCell>
                <TableCell>Transient?</TableCell>
                <TableCell>Name of House Owner</TableCell>
                <TableCell>Registered?</TableCell>
                <TableCell>Date Registered</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nonIvatan.map((person, index) => (
                <TableRow key={index}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.settlement}</TableCell>
                  <TableCell>{person.ethnicity}</TableCell>
                  <TableCell>{person.origin}</TableCell>
                  <TableCell>{person.transient}</TableCell>
                  <TableCell>{person.houseOwner}</TableCell>
                  <TableCell>{person.transientRegistered}</TableCell>
                  <TableCell>
                    {person.transientDateRegistered && dayjs(person.transientDateRegistered).isValid() 
                      ? dayjs(person.transientDateRegistered).format('MM/DD/YYYY') 
                      : 'N/A'}
                  </TableCell>
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
            <button type='button' className="btn" onClick={handleAdd}>Add Person</button>
            <button type='button' className="btn submit-btn" onClick={handleNext}>Next</button>
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
