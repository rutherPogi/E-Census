import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormHelperText,
  Box
} from '@mui/material';




const DisabilityCauseSelection = ({ value, handleChange, error }) => {

  const handleClear = () => {
    // This directly calls the handleChange function with the field name and empty value
    handleChange('disabilityCause')('', null);
  };

  return (
    <FormControl component="fieldset" error={!!error} sx={{ width: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <FormLabel component="legend">Cause of Disability</FormLabel>
      </Box>

      <RadioGroup
        name="disabilityCause"
        value={value}
        onChange={handleChange('disabilityCause')}
      >
        {["Congenital / Inborn", "Acquired"].map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>

      {error && <FormHelperText>Please select a cause of disability</FormHelperText>}
      {value && (
          <Button variant="outlined" color="secondary" onClick={handleClear} size="small">
            Clear Selection
          </Button>
        )}
    </FormControl>
  );
};

export default DisabilityCauseSelection;
