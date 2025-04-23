import { useState } from "react";
import { Edit, Delete } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, IconButton, Button, 
         Tooltip} from '@mui/material';

import { useFormContext } from "../others/FormContext";
import { Notification } from "../../../components/Notification";
import { formatters } from "../../../utils/formatter";
 
export default function HouseholdComposition2({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  const { householdComposition } = formData;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');


  const handleAdd = () => {
    sessionStorage.removeItem('editingMemberIndex');
    handleBack();
  };

  const handleEdit = (index) => {
    sessionStorage.setItem('editingMemberIndex', index);
    handleBack();
  };

  const handleDelete = (index) => {
    const updatedMembers = [...householdComposition];
    updatedMembers.splice(index, 1);
    
    updateFormData('householdComposition', updatedMembers);

    setSnackbarMessage("Deleted Successfully!");
    setSeverity('success');
    setSnackbarOpen(true);
  };
 
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>HOUSEHOLD COMPOSITION</div>
      <div className='responsive-form table'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Sex</TableCell>
                <TableCell>Relationship</TableCell>
                <TableCell>Birthdate</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Civil Status</TableCell>
                <TableCell>Educational Attainment</TableCell>
                <TableCell>Occupation</TableCell>
                <TableCell>Monthly Income</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {householdComposition.map((member, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {`${member.firstName} 
                      ${member.middleName ? member.middleName : ''} 
                      ${member.lastName} 
                      ${member.suffix ? member.suffix : ''}`}
                  </TableCell>
                  <TableCell>{member.sex}</TableCell>
                  <TableCell>{member.relationship}</TableCell>
                  <TableCell>{formatters.date(member.birthdate)}</TableCell>
                  <TableCell>{member.age}</TableCell>
                  <TableCell>{member.civilStatus}</TableCell>
                  <TableCell>{member.educationalAttainment}</TableCell>
                  <TableCell>{member.occupation || 'N/A'}</TableCell>
                  <TableCell>{`₱${member.monthlyIncome === 'N/A' ? '0.00' : member.monthlyIncome}`}</TableCell>
                  <TableCell>
                    <Tooltip title='Edit'>
                      <IconButton color="primary" onClick={() => handleEdit(index)}>
                        <Edit/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                      <IconButton color="error" onClick={() => handleDelete(index)}>
                        <Delete/>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className='form-buttons'>
        <div className='form-buttons-right'>
          <Button variant='outlined' onClick={handleAdd} sx={{ width: '100%' }}>Add</Button>
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