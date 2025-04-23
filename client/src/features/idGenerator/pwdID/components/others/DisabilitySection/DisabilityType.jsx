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



const DisabilityTypeSelection = ({ value, handleChange, error }) => {

  const handleClear = () => {
    // This directly calls the handleChange function with the field name and empty value
    handleChange('disabilityType')('', null);
  };

  const options = [
    "Deaf / Hard of Hearing",
    "Intellectual Disability",
    "Learning Disability",
    "Physical Disability (Orthopedic)",
    "Psychological Disability",
    "Speech and Language Impairment",
    "Visual Disability",
    "Cancer (RA 11215)",
    "Rare Disease (RA 10747)"
  ];

  return (
    <FormControl component="fieldset" error={!!error} sx={{ width: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <FormLabel component="legend">Type of Disability</FormLabel>
      </Box>

      <RadioGroup
        name="disabilityType"
        value={value}
        onChange={handleChange('disabilityType')}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>

      {error && (
        <FormHelperText>Please select a type of disability</FormHelperText>
      )}

      {value && (
        <Button variant="outlined" color="secondary" onClick={handleClear} size="small">
          Clear Selection
        </Button>
      )}
    </FormControl>
  );
};

export default DisabilityTypeSelection;
