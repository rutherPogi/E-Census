import { useState } from "react";
import { Edit, Delete } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, IconButton, Button, 
         Tooltip} from '@mui/material';

import { useFormContext } from "../../components/others/FormContext";
import { Notification, FormButtons } from "../../../../../components/common";
 
export default function FamilyComposition2({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  const { familyComposition } = formData;

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
    const updatedMembers = [...familyComposition];
    updatedMembers.splice(index, 1);
    
    updateFormData('familyComposition', updatedMembers);

    setSnackbarMessage("Deleted Successfully!");
    setSeverity('success');
    setSnackbarOpen(true);
  };
 
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>FAMILY COMPOSITION</div>
      <div className='responsive-form details'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Relationship</TableCell>
                <TableCell>Civil Status</TableCell>
                <TableCell>Occupation</TableCell>
                <TableCell>Income</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {familyComposition.map((member, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {`${member.firstName || ''} 
                      ${member.middleName || ''} 
                      ${member.lastName || ''} 
                      ${member.suffix || ''}`}
                  </TableCell>
                  <TableCell>{member.age}</TableCell>
                  <TableCell>{member.relationship}</TableCell>
                  <TableCell>{member.civilStatus}</TableCell>
                  <TableCell>{member.occupation || 'N/A'}</TableCell>
                  <TableCell>{`₱${member.annualIncome || '0.00'}`}</TableCell>
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
      <FormButtons
        onBack = {handleBack} 
        onNext = {handleNext} 
        backLabel = 'Add +' 
        nextLabel = 'Next' 
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