import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormHelperText } from "@mui/material";



export default function HousingCondition({ value, onChange, error }) {
  return (
    <FormControl
      component="fieldset"
      error={error}
      fullWidth
      margin="normal"
    >
      <FormLabel component="legend">Housing Conditioning</FormLabel>
      <RadioGroup
        name="houseCondition"
        value={value}
        onChange={onChange('houseCondition')}
      >
        <FormControlLabel value="Owned" control={<Radio />} label="Owned" />
        <FormControlLabel value="Rent" control={<Radio />} label="Rent" />
        <FormControlLabel value="Caretaker" control={<Radio />} label="Caretaker" />
        <FormControlLabel value="Share" control={<Radio />} label="Share" />
      </RadioGroup>
      {error && (
        <FormHelperText>Please select a housing condition</FormHelperText>
      )}
    </FormControl>
  );
}