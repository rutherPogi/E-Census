import React from "react";
import { TextField } from '@mui/material';

const NumberField = ({ value, onChange, error }) => {
  const textFieldStyle = {
    width: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    '& .MuiOutlinedInput-input': {
      padding: '8px',
      textAlign: 'center'
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #d32f2f'
    }
  };

  return (
    <TextField
      variant="outlined"
      size="small"
      value={value}
      onChange={onChange}
      sx={textFieldStyle}
      error={Boolean(error)}
    />
  );
};

export default NumberField;