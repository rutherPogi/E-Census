import { useState } from "react";
import { Edit, Delete } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, IconButton } from '@mui/material';
import dayjs from 'dayjs';

import { useFormContext } from "../../pages/FormContext";
import { Notification, FormButtons } from '../../../../components/common'




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
                    {service.dateServiceAvailed && dayjs(service.dateServiceAvailed).isValid() 
                      ? dayjs(service.dateServiceAvailed).format('MM/DD/YYYY') 
                      : 'N/A'}
                  </TableCell>
                  <TableCell>{service.ngo || service.ngoName || 'N/A'}</TableCell>
                  <TableCell>{service.assistance || service.serviceAvailed || 'N/A'}</TableCell>
                  <TableCell>{service.maleServed}</TableCell>
                  <TableCell>{service.femaleServed}</TableCell>
                  <TableCell>{service.total || service.totalServed}</TableCell>
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
      <FormButtons 
        onBack={handleBack}
        onNext={handleNext}
        backLabel="Add +"
        nextLabel="Next"
      />
      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </div>
  );
}
 