import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Box, Typography, TextField, Divider } from "@mui/material";
import { Print } from "@mui/icons-material";

import IDFront from "../others/IDCardSection/IDFront";
import IDBack from "../others/IDCardSection/IDBack";




export default function PrintID({ handleBack }) {

  const [mayor, setMayor] = useState('');
  const [mswdoOfficer, setMswdoOfficer] = useState('');

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

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
          <Typography variant="h6">Additional Information</Typography>
          <Divider/>
          <TextField
            label="Municipal Mayor"
            value={mayor}
            onChange={(e) => setMayor(e.target.value)}
            placeholder="Enter mayor's name"
            fullWidth
          />
          <TextField
            label="MSWDO Officer"
            value={mswdoOfficer}
            onChange={(e) => setMswdoOfficer(e.target.value)}
            placeholder="Enter MSWDO Officer's name"
            fullWidth
          />
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
              <IDBack mayor={mayor} mswdoOfficer={mswdoOfficer}/>
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
