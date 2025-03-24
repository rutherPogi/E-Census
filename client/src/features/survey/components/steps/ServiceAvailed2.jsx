import { useState } from "react";
import { Edit, Delete } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, IconButton, Button } from '@mui/material';
import dayjs from 'dayjs';

import { useFormContext } from "../../pages/FormContext";
import { Notification } from '../../../../components/common/Notification'




export default function ServiceAvailed2({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  const { serviceAvailed } = formData;
  
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
    const updatedService = [...serviceAvailed];
    updatedService.splice(index, 1);
    
    updateFormData('serviceAvailed', updatedService);

    showNotification("Deleted Successfully!", 'info');
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
                  <TableCell>{service.ngo || 'N/A'}</TableCell>
                  <TableCell>{service.assistance || 'N/A'}</TableCell>
                  <TableCell>{service.male}</TableCell>
                  <TableCell>{service.female}</TableCell>
                  <TableCell>{service.total}</TableCell>
                  <TableCell>{service.howServiceHelp || 'N/A'}</TableCell>
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
            <Button variant='outlined' onClick={handleAdd} sx={{ width: '100%' }}>Add +</Button>
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
 