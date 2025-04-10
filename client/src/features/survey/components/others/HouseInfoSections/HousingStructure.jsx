import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormHelperText } from "@mui/material";




export default function HousingStructure({ value, onChange, error }) {
  return (
    <FormControl
      component="fieldset"
      error={error}
      fullWidth
      margin="normal"
    >
      <FormLabel component="legend">Housing Structure</FormLabel>
      <RadioGroup
        name="houseStructure"
        value={value}
        onChange={onChange('houseStructure')}
      >
        <FormControlLabel value="Concrete" control={<Radio />} label="Concrete" />
        <FormControlLabel value="Semi Concrete" control={<Radio />} label="Semi Concrete" />
        <FormControlLabel value="Light Materials (GI Sheet/Pipes)" control={<Radio />} label="Light Materials (GI Sheet/Pipes)" />
        <FormControlLabel value="Light Materials (Traditional Cogon House)" control={<Radio />} label="Light Materials (Traditional Cogon House)" />
        <FormControlLabel value="Make Shift" control={<Radio />} label="Make Shift" />
      </RadioGroup>
      {error && (
        <FormHelperText>Please select a housing structure</FormHelperText>
      )}
    </FormControl>
  );
}