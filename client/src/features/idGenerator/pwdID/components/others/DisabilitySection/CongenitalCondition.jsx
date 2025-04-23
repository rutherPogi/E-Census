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




const CongenitalConditionSelection = ({ value, handleChange, error }) => {

  const handleClear = () => {
    // This directly calls the handleChange function with the field name and empty value
    handleChange('disabilitySpecific')('', null);
  };

  return (
    <FormControl component="fieldset" error={!!error} sx={{ width: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <FormLabel component="legend">Specific Congenital Condition</FormLabel>
      </Box>

      <RadioGroup
        name="disabilitySpecific"
        value={value}
        onChange={handleChange('disabilitySpecific')}
      >
        {["Autism", "ADHD", "Cerebral Palsy", "Down Syndrome"].map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>

      {error && <FormHelperText>Please select a specific condition</FormHelperText>}
      {value && (
        <Button variant="outlined" color="secondary" onClick={handleClear} size="small">
          Clear Selection
        </Button>
      )}
    </FormControl>
  );
};

export default CongenitalConditionSelection;
