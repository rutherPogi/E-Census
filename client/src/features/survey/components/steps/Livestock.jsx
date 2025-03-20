import { useState, useEffect } from "react";
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, 
         TableRow, Paper, Button } from '@mui/material';

import { useFormContext } from "../../pages/FormContext";
import { LIVESTOCK_TYPES } from "../../utils/constants";



export default function Livestock({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();

  const [values, setValues] = useState(() => {
    const existingData = formData.livestock || {};
    return Object.fromEntries(
      LIVESTOCK_TYPES.map(type => [
        type, 
        {
          number: existingData[type]?.number || '',
          own: existingData[type]?.own || '',
          dispersal: existingData[type]?.dispersal || ''
        }
      ])
    );
  });

  const [errors, setErrors] = useState(
    Object.fromEntries(
      LIVESTOCK_TYPES.map(type => [
        type,
        { number: false, own: false, dispersal: false }
      ])
    )
  );

  useEffect(() => {
    if (formData.livestock) {
      setValues(prev => ({ ...prev, ...formData.livestock }));
    }
  }, [formData.livestock]);


  const handleChange = (livestockType, field) => (e) => {
    let value = e.target.value;
    
    if (!/^\d*$/.test(value)) {
      setErrors(prev => ({
        ...prev,
        [livestockType]: {
          ...prev[livestockType],
          [field]: 'Please enter numbers only'
        }
      }));
      return;
    }
    
    if (Number(value) > 999) {
      setErrors(prev => ({
        ...prev,
        [livestockType]: {
          ...prev[livestockType],
          [field]: 'cannot exceed 999'
        }
      }));
      return;
    }

    setErrors(prev => ({ 
      ...prev,
      [livestockType]: { ...prev[livestockType], [field]: false }
    }));
    
    setValues(prev => ({
      ...prev,
      [livestockType]: { ...prev[livestockType], [field]: value}
    }));
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();

    const processedValues = { ...values };

    Object.keys(processedValues).forEach((livestockType) => {
      Object.keys(processedValues[livestockType]).forEach((field) => {
        if (!processedValues[livestockType][field]) {
          processedValues[livestockType][field] = '0';
        }
      });
    });

    updateFormData('livestock', processedValues);
    console.log("Current Livestock Values:", processedValues);

    handleNext();
  };

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

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>LIVESTOCK/ANIMALS</div>
      <div className='responsive-table'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Livestock/Animals</TableCell>
                <TableCell align="center">Number</TableCell>
                <TableCell align="center">Own</TableCell>
                <TableCell align="center">Dispersal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {LIVESTOCK_TYPES.map((type) => (
                <TableRow key={type}>
                  <TableCell component="th" scope="row" style={{ textTransform: 'capitalize' }}>
                    {type}
                  </TableCell>
                  {['number', 'own', 'dispersal'].map((field) => (
                    <TableCell key={`${type}-${field}`} align="center" sx={{padding:0}}>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={values[type][field]}
                        onChange={handleChange(type, field)}
                        sx={textFieldStyle}
                        error={Boolean(errors[type]?.[field])}
                        helperText={errors[type]?.[field]}
                        FormHelperTextProps={{
                          sx: {
                            position: 'absolute',
                            bottom: '-20px',
                            margin: 0,
                            fontSize: '0.7rem'
                          }
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className='form-buttons'>
        <div className='form-buttons-right'>
          <Button variant='outlined' onClick={handleBack} sx={{ width: '100%' }}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit} sx={{ width: '100%' }}>Next</Button>
        </div>    
      </div>  
    </div>
  );
}