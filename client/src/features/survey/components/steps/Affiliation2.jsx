import { useState } from "react";
import { Edit, Delete } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, IconButton, Button } from '@mui/material';
import dayjs from 'dayjs';

import { useFormContext } from "../../pages/FormContext";
import { Notification } from '../../../../components/common/Notification'




export default function Affiliation2({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  const { affiliation } = formData;

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
    const updatedAffiliation = [...affiliation];
    updatedAffiliation.splice(index, 1);
    
    updateFormData('affiliation', updatedAffiliation);

    showNotification("Deleted Successfully!", 'info');
  };
    
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>AFFILIATION IN GOVERNMENT/NGO ORGANIZATION </div>
      <div className='responsive-table'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>As Officer</TableCell>
                <TableCell>As Member</TableCell>
                <TableCell>Name of Organization</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {affiliation.map((aff, index) => (
                <TableRow key={index}>
                  <TableCell>{aff.nameAffiliated || 'N/A'}</TableCell>
                  <TableCell>
                    {aff.asOfficer && dayjs(aff.asOfficer).isValid() 
                      ? dayjs(aff.asOfficer).format('MM/DD/YYYY') 
                      : 'N/A'}
                  </TableCell>
                  <TableCell>{aff.asMember ? dayjs(aff.asMember).format('MM/DD/YYYY') : 'N/A'}</TableCell>
                  <TableCell>{aff.organizationAffiliated || 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEdit(index)}
                      aria-label="edit affiliation"
                    >
                      <Edit/>
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDelete(index)}
                      aria-label="delete affiliation"
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
