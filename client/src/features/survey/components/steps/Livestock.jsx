import React from "react";
import LivestockTable from "../others/LivestockSections/LivestockTable";
import { LIVESTOCK_TYPES } from "../../utils/initialValues";
import { FormButtons } from "../../../../components/common";
import { useFormContext } from "../../pages/FormContext";
import { useLivestockForm } from "../../hooks/useLivestock";
import { Snackbar, Alert } from '@mui/material';

export default function Livestock({ handleBack, handleNext }) {
  const { formData, updateFormData } = useFormContext();

  const initialValues = Object.fromEntries(
    LIVESTOCK_TYPES.map(type => [
      type, 
      {
        number: formData.livestock?.[type]?.number || '',
        own: formData.livestock?.[type]?.own || '',
        dispersal: formData.livestock?.[type]?.dispersal || ''
      }
    ])
  );

  const { 
    values, 
    errors, 
    areAllFieldsEmpty,
    handleChange, 
    handleSubmit,
    snackbarOpen,
    snackbarMessage,
    handleCloseSnackbar
  } = useLivestockForm(
    initialValues,
    formData,
    updateFormData
  );

  const onSubmit = (e) => {
    const result = handleSubmit(e);
    if (result !== null) {
      handleNext();
    }
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>LIVESTOCK/ANIMALS</div>
      <div className='responsive-table'>
        <LivestockTable 
          types={LIVESTOCK_TYPES}
          values={values}
          errors={errors}
          handleChange={handleChange}
        />
      </div>
      <FormButtons 
        onBack={handleBack}
        onNext={onSubmit}
        backLabel="Back"
        nextLabel={areAllFieldsEmpty() ? "SKIP" : "Next"}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}