import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, IconButton, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import dayjs from 'dayjs';

import { useFormContext } from "../../pages/FormContext";
import { Notification } from '../../../../components/common/Notification'

  

export default function NonIvatan2({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  const { nonIvatan } = formData;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const showNotification = (message, type) => {
    setSnackbarMessage(message);
    setSeverity(type);
    setSnackbarOpen(true);
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

    showNotification("Deleted Successfully!", 'info');
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
                  <TableCell>{person.name || 'N/A'}</TableCell>
                  <TableCell>{person.settlement || 'N/A'}</TableCell>
                  <TableCell>{person.ethnicity || 'N/A'}</TableCell>
                  <TableCell>{person.origin || 'N/A'}</TableCell>
                  <TableCell>{person.transient || 'N/A'}</TableCell>
                  <TableCell>{person.houseOwner || 'N/A'}</TableCell>
                  <TableCell>{person.transientRegistered || 'N/A'}</TableCell>
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
            <Button variant='outlined' onClick={handleAdd} sx={{ width: '100%' }}>Cancel</Button>
            <Button variant='contained' onClick={handleNext} sx={{ width: '100%' }}>Next</Button>
          </div>     
      </div>
      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </div>
  );
}
