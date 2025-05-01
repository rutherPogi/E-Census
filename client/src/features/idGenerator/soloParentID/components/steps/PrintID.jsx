import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import { Button, Box, Typography, TextField, Divider } from "@mui/material";
import { Print, FileUpload } from "@mui/icons-material";

import { useFormContext } from '../others/FormContext';

import IDFront from "../others/IDCardSection/IDFront";
import IDBack from "../others/IDCardSection/IDBack";




export default function PrintID({ handleBack }) {

  const navigate = useNavigate();
  const { clearFormData } = useFormContext();

  const [mayor, setMayor] = useState('');
  const [mswdoOfficer, setMswdoOfficer] = useState('');
  const [mayorSignature, setMayorSignature] = useState(null);
  const [mswdoSignature, setMswdoSignature] = useState(null);

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const mayorFileInputRef = useRef(null);
  const mswdoFileInputRef = useRef(null);

  const handleFinish = () => {  
    clearFormData();
    navigate('/main/generate-id/solo-parent')
  };
  
  const handleMayorSignatureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMayorSignature(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMswdoSignatureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMswdoSignature(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };



  
  return (
    <div className="responsive-container">
      <div className="responsive-form details">
        <Box 
          sx={{ 
            mb: 3, 
            display: 'flex', 
            gap: 2, 
            flexDirection: 'column', 
            width: '100%', 
            boxSizing: 'border-box' 
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Additional Information</Typography>
            <Button 
              variant="contained" 
              color="success"
              onClick={handleFinish}
              sx={{ fontSize: '0.75rem' }}
            >
              FINISH
            </Button>
          </Box>
          
          <Divider/>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              label="Municipal Mayor"
              value={mayor}
              onChange={(e) => setMayor(e.target.value)}
              placeholder="Enter mayor's name"
              fullWidth
            />
            <input 
              type="file" 
              accept="image/*" 
              style={{ display: 'none' }} 
              ref={mayorFileInputRef}
              onChange={handleMayorSignatureUpload}
            />
            <Button
              variant="outlined"
              startIcon={<FileUpload />}
              onClick={() => mayorFileInputRef.current.click()}
              sx={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
            >
              Add Signature
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              label="MSWDO Officer"
              value={mswdoOfficer}
              onChange={(e) => setMswdoOfficer(e.target.value)}
              placeholder="Enter MSWDO Officer's name"
              fullWidth
            />
            <input 
              type="file" 
              accept="image/*" 
              style={{ display: 'none' }} 
              ref={mswdoFileInputRef}
              onChange={handleMswdoSignatureUpload}
            />
            <Button
              variant="outlined"
              startIcon={<FileUpload />}
              onClick={() => mswdoFileInputRef.current.click()}
              sx={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
            >
              Add Signature
            </Button>
          </Box>
        </Box>

        <Box 
          sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 1 }}
        >
          <div ref={contentRef}>
            <Box 
              sx={{
                display: 'flex', 
                flexDirection: 'column', 
                gap: '2em', 
                alignItems: 'center', 
                padding: 2
              }}
            >  
              <IDFront/>
              <IDBack 
                mayor={mayor} 
                mswdoOfficer={mswdoOfficer} 
                mayorSignature={mayorSignature}
                mswdoSignature={mswdoSignature}
              />
            </Box>
          </div>
        </Box>
      </div>
      <div className='form-buttons'>
        <div className='form-buttons-right'>
          <Button variant='outlined' onClick={handleBack} sx={{ width: '100%' }}>Cancel</Button>
          <Button 
            variant='contained' 
            onClick={() => reactToPrintFn()} 
            sx={{ width: '100%' }}
            startIcon={<Print/>}
          >
            Print
          </Button>
        </div> 
      </div>
    </div>
  );
}