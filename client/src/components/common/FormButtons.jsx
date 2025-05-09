import React from 'react';
import { Button } from '@mui/material';


export const FormButtons = ({ 
  onBack, 
  onNext, 
  backLabel = 'Cancel', 
  nextLabel = 'Next', 
  backDisabled = false,
  nextDisabled = false,
  isLoading = false
}) => {
  return (
    <div className='form-buttons'>
      <div className='form-buttons-right'>
        <Button 
          variant='outlined' 
          onClick={onBack} 
          sx={{ width: '100%' }}
          disabled={backDisabled}
        >
          {backLabel}
        </Button>
        <Button 
          variant='contained' 
          onClick={onNext} 
          sx={{ width: '100%' }}
          disabled={nextDisabled}
          loading={isLoading}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
};

export default FormButtons;