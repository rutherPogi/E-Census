import { NameFields } from "../Namefield";
import { TextInput } from "../../../../../../components/common/FormFields";
import { Box, Container, Card, CardContent, Typography, Grid } from "@mui/material";

export const CertifiedPhysician = ({ values, handleChange, errors }) => {
  return (
    <>
      <div className="section-title field-full">Certified Physician</div>
      <NameFields 
        values={values} 
        handleChange={handleChange} 
        fieldPrefix="cp" 
        errors={errors}
      />
      <TextInput
        label='License No.'
        value={values.licenseNumber}
        onChange={handleChange(`licenseNumber`)}
        helperText='e.g. --'
        errors={errors}
      />

      <div className="section-title field-full">Processing Officer</div>
      <NameFields 
        values={values} 
        handleChange={handleChange} 
        fieldPrefix="po" 
        errors={errors}
      />

      <div className="section-title field-full">Approving Officer</div>
      <NameFields  
        values={values} 
        handleChange={handleChange} 
        fieldPrefix="ao" 
        errors={errors}
      />

      <div className="section-title field-full">Encoder</div>
      <NameFields  
        values={values} 
        handleChange={handleChange} 
        fieldPrefix="e" 
        errors={errors}
      />

      <div className="section-title field-full">Reporting Unit</div>
      <TextInput
        label='Name of Reporting Unit'
        value={values.reportingUnit}
        onChange={handleChange('reportingUnit')}
        error={errors.reportingUnit}
        helperText={errors.reportingUnit || 'Office/Section'}
        required
        fullWidth
      />

      <TextInput
        label='Control No.'
        value={values.controlNumber}
        onChange={handleChange('controlNumber')}
        error={errors.controlNumber}
        helperText={errors.controlNumber || 'Office/Section'}
        required
        fullWidth
      />
    </>
  );
};

export default CertifiedPhysician;