import React from 'react';
import { Button } from '@mui/material';


export const FormButtons = ({ 
  onBack, 
  onNext, 
  backLabel = 'Cancel', 
  nextLabel = 'Next', 
  disabled = false
}) => {
  return (
    <div className='form-buttons'>
      <div className='form-buttons-right'>
        <Button 
          variant='outlined' 
          onClick={onBack} 
          sx={{ width: '100%' }}
          disabled={disabled}
        >
          {backLabel}
        </Button>
        <Button 
          variant='contained' 
          onClick={onNext} 
          sx={{ width: '100%' }}
          disabled={disabled}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
};

export default FormButtons;