import { useFormContext } from "../../pages/FormContext";
import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, IconButton, Snackbar, Alert } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import dayjs from 'dayjs';

export default function Affiliation2({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  const { affiliation } = formData;
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
    const updatedAffiliation = [...affiliation];
    updatedAffiliation.splice(index, 1);
    
    updateFormData('affiliation', updatedAffiliation);

    setSnackbarMessage("Deleted Successfully!");
    setSnackbarOpen(true);
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
                  <TableCell>{aff.nameAffiliated}</TableCell>
                  <TableCell>
                    {aff.asOfficer && dayjs(aff.asOfficer).isValid() 
                      ? dayjs(aff.asOfficer).format('MM/DD/YYYY') 
                      : 'N/A'}
                  </TableCell>
                  <TableCell>{aff.asMember ? dayjs(aff.asMember).format('MM/DD/YYYY') : 'N/A'}</TableCell>
                  <TableCell>{aff.organizationAffiliated}</TableCell>
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
          <button type='button' className="btn" onClick={handleAdd}>Add Person</button>
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
