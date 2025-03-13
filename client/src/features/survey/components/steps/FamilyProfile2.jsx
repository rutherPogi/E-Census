import { useFormContext } from "../../pages/FormContext";
import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, IconButton, Snackbar, Alert } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import dayjs from 'dayjs';

 
export default function FamilyProfile2({ handleBack, handleNext }) {
  const { formData, updateFormData } = useFormContext();
  const { familyMembers } = formData;
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
    const updatedMembers = [...familyMembers];
    updatedMembers.splice(index, 1);
    
    updateFormData('familyMembers', updatedMembers);

    setSnackbarMessage("Deleted Successfully!");
    setSnackbarOpen(true);
  };
 
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>FAMILY MEMBERS</div>
      <div className='responsive-table'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Birthdate</TableCell>
                <TableCell>Civil Status</TableCell>
                <TableCell>Relation</TableCell>
                <TableCell>Occupation</TableCell>
                <TableCell>Skills Training Attended</TableCell>
                <TableCell>Employment Type</TableCell>
                <TableCell>Philhealth Number</TableCell>
                <TableCell>Monthly Income</TableCell>
                <TableCell>Health Status</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {familyMembers.map((member, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {`${member.firstName} ${member.middleName} ${member.lastName} 
                      ${member.suffix === 'N/A' ? '' : member.suffix}`}
                  </TableCell>
                  <TableCell>{member.age}</TableCell>
                  <TableCell>
                    {member.birthdate ? dayjs(member.birthdate).format('MM/DD/YYYY') : 'N/A'}
                  </TableCell>
                  <TableCell>{member.civilStatus}</TableCell>
                  <TableCell>{member.relationFamilyHead}</TableCell>
                  <TableCell>{member.occupation}</TableCell>
                  <TableCell>{member.skillsTraining}</TableCell>
                  <TableCell>{member.employmentType}</TableCell>
                  <TableCell>{member.philhealthNumber}</TableCell>
                  <TableCell>{`₱${member.monthlyIncome}`}</TableCell>
                  <TableCell>{member.healthStatus}</TableCell>
                  <TableCell>{member.remarks}</TableCell>
                  <TableCell>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEdit(index)}
                      aria-label="edit family member"
                    >
                      <Edit/>
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDelete(index)}
                      aria-label="delete family member"
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
          <button type='button' className="btn" onClick={handleAdd}>Add Member</button>
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