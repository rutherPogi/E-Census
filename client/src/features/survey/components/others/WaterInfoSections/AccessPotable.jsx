import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from "@mui/material";



export default function AccessPotable({ values, handleChange, errors }) {
  return (
    <>
      <FormControl 
        component="fieldset" 
        error={errors.waterAccess} 
        fullWidth 
        margin="normal"
      >
        <FormLabel component="legend">Access to water (Level III)?</FormLabel>
        <RadioGroup name="waterAccess" value={values.waterAccess} onChange={handleChange('waterAccess')}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup> 
        {errors.waterAccess && (<FormHelperText>Please select an answer</FormHelperText>)}
      </FormControl>

      <FormControl 
        component="fieldset" 
        error={errors.potableWater} 
        fullWidth 
        margin="normal"
      >
        <FormLabel component="legend">Is your water potable?</FormLabel>
        <RadioGroup name="potableWater" value={values.potableWater} onChange={handleChange('potableWater')}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
        {errors.potableWater && (<FormHelperText>Please select an answer</FormHelperText>)}
      </FormControl>
    </>
  );
}