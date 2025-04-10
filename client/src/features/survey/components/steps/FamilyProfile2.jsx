import FamilyMemberTable from "../others/FamilyProfile2Sections/FPTable";

import { Notification, FormButtons } from "../../../../components/common";
import { useNotification } from '../../hooks/useNotification';
import { useFormContext } from "../../pages/FormContext";



export default function FamilyProfile2({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  const { familyMembers } = formData;

  const { 
      snackbarOpen, 
      snackbarMessage, 
      severity, 
      showNotification, 
      setSnackbarOpen 
    } = useNotification();

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

    showNotification('Deleted Successfully!', 'info')
  };

  const handleNextWithValidation = () => {
    // Check if at least one family member is designated as FAMILY HEAD
    const hasFamilyHead = familyMembers.some(
      member => member.relationToFamilyHead === "Family Head"
    );
    
    if (!hasFamilyHead) {
      showNotification('Please designate one family member as FAMILY HEAD', 'error');
      return;
    }
    
    // If validation passes, proceed to next step
    handleNext();
  };

  console.log('PF 2', formData);
 
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>FAMILY MEMBERS</div>
      <div className='responsive-table'>
        <FamilyMemberTable
          familyMembers={familyMembers}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
      <FormButtons
        onBack={handleAdd}
        onNext={handleNextWithValidation}
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