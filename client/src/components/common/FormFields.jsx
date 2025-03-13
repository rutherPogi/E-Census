import { useState } from "react";
import { Box, Typography, Button, useMediaQuery, TextField, Autocomplete, InputAdornment } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";


export const TextInput = ({ 
  label, 
  value, 
  onChange, 
  error, 
  helperText, 
  placeholder, 
  multiline,
  autofocus,
  required,
  ...props 
}) => {

  const isMobile = useMediaQuery('(max-width:425px)');

  return (
    <TextField
      label = {label}
      variant = 'outlined'
      value = {value || ''}
      onChange = {onChange}
      error = {Boolean(error)}
      helperText = {error || helperText}
      placeholder = {placeholder}
      size = {isMobile ? 'small' : 'medium'}
      multiline = {multiline}
      fullWidth
      autoFocus = {autofocus}
      required = {required}
      {...props}
    />
  );
};

export const UsernameInput = ({ label, value, onChange, error, helperText, placeholder, required, autoFocus }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="body2" color="#E0E0E0">
        {label} {required && <span style={{ color: '#FF5733' }}>*</span>}
      </Typography>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        style={{
          padding: '12px 16px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: '#333',
          border: error ? '1px solid #f44336' : '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '16px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      />
      {error && (
        <Typography variant="caption" color="#f44336">
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export const PasswordInput = ({ value, onChange, error, helperText }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="body2" color="#E0E0E0">
        Password <span style={{ color: '#FF5733' }}>*</span>
      </Typography>
      <Box sx={{ position: 'relative', width: '100%' }}>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="Enter password"
          style={{
            padding: '12px 16px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#333',
            border: error ? '1px solid #f44336' : '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            width: '100%',
            boxSizing: 'border-box'

          }}
        />
        <Button
          onClick={() => setShowPassword(!showPassword)}
          sx={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            minWidth: 'auto',
            padding: '4px',
            color: '#555'
          }}
        >
          {showPassword ? "Hide" : "Show"}
        </Button>
      </Box>
      {error && (
        <Typography variant="caption" color="#f44336">
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export const CurrencyInput = ({ 
  label, 
  value, 
  onChange, 
  error, 
  helperText,  
  placeholder,
  variant,
  ...props 
}) => {

  const isMobile = useMediaQuery('(max-width:425px)');

  return (
    <TextField
      label = {label}
      value = {value || ''}
      onChange = {onChange}
      error = {Boolean(error)}
      helperText = {error || helperText}
      placeholder = {placeholder}
      variant = {variant}
      InputProps = {{
        startAdornment: <InputAdornment position="start">₱</InputAdornment>,
      }}
      size = {isMobile ? 'small' : 'medium'}
      {...props}
    />
  );
};

export const SizeInput = ({ 
  label, 
  value, 
  onChange, 
  error, 
  helperText,  
  placeholder,
  variant,
  ...props 
}) => {

  const isMobile = useMediaQuery('(max-width:425px)');

  return (
    <TextField
      label = {label}
      value = {value || ''}
      onChange = {onChange}
      error = {Boolean(error)}
      helperText = {error || helperText}
      placeholder = {placeholder}
      variant = {variant}
      InputProps = {{
        endAdornment: <InputAdornment position="end">m<sup>2</sup></InputAdornment>,
      }}
      size = {isMobile ? 'small' : 'medium'}
      {...props}
    />
  );
};

export const DropdownInput = ({ 
  label, 
  options, 
  value, 
  onChange, 
  error, 
  helperText, 
  placeholder, 
  required,
  freeSolo,
  ...props 
}) => {

  const isMobile = useMediaQuery('(max-width:425px)');
  
  return (
    <Autocomplete
      freeSolo = {freeSolo}
      options = {options}
      value = {options.find(option => option.value === value) || null}
      onChange = {(e, newValue) => onChange(e, newValue)}
      renderInput = {(params) => (
        <TextField 
          {...params} 
          label = {label} 
          error = {Boolean(error)}
          helperText = {error || helperText}
          placeholder = {placeholder}
          required = {required}
        />
      )}
      size = {isMobile ? 'small' : 'medium'}
      {...props}
    />
  );
};

export const DateInput = ({ 
  label, 
  value, 
  onChange, 
  error, 
  helperText, 
  required, 
  ...props 
}) => {

  const isMobile = useMediaQuery('(max-width:425px)');
  const dateError = error || (value && dayjs(value).isAfter(dayjs()) ? "Invalid date: Cannot be a future date" : "");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            size: isMobile ? 'small' : 'medium',
            error: Boolean(dateError),
            helperText: dateError || helperText,
            required: {required}
          }
        }}
        {...props}
      />
    </LocalizationProvider>
  );
};

export const NumberInput = ({ 
  label, 
  value, 
  onChange, 
  error, 
  helperText, 
  placeholder,
  min = 0,
  max, 
  ...props 
}) => {

  const isMobile = useMediaQuery('(max-width:425px)');

  return (
    <TextField
      label={label}
      variant="outlined"
      value={value || ''}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error || helperText}
      placeholder={placeholder}
      size={isMobile ? 'small' : 'medium'}
      type="text" // Using text type with regex validation for better control
      inputProps={{ 
        inputMode: 'numeric',
        pattern: '[0-9]*',
        min: min,
        max: max
      }}
      {...props}
    />
  );
};

export const GenderInput = ({ 
  label, 
  value, 
  onChange, 
  error, 
  helperText,  
  placeholder,
  variant,
  ...props 
}) => {

  const isMobile = useMediaQuery('(max-width:425px)');

  return (
    <TextField
      value = {value || ''}
      onChange = {onChange}
      error = {Boolean(error)}
      helperText = {error || helperText}
      placeholder = {placeholder}
      variant = {variant}
      InputProps = {{
        startAdornment: <InputAdornment position="start">{label}</InputAdornment>,
      }}
      size = {isMobile ? 'small' : 'medium'}
      {...props}
    />
  );
};

export const ContactNumberInput = ({ 
  label, 
  value, 
  onChange, 
  error, 
  helperText,  
  placeholder,
  variant,
  code,
  ...props 
}) => {

  const isMobile = useMediaQuery('(max-width:425px)');

  return (
    <TextField
      label = {label}
      value = {value || ''}
      onChange = {onChange}
      error = {Boolean(error)}
      helperText = {error || helperText}
      placeholder = {placeholder}
      variant = {variant}
      InputProps = {{
        startAdornment: <InputAdornment position="start">{code}</InputAdornment>,
      }}
      size = {isMobile ? 'small' : 'medium'}
      {...props}
    />
  );
};