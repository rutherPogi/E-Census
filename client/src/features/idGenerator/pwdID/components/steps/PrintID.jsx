import { useReactToPrint } from "react-to-print";
import { useRef, useState } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";

import IDFront from "../others/IDCardSection/IDFront";
import IDBack from "../others/IDCardSection/IDBack";


export default function PrintID({ handleBack }) {

  const [mayor, setMayor] = useState("MAYOR");

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="responsive-container">
      <div className="responsive-form details">
        <Box sx={{ mb: 3, display: 'flex', gap: 2, flexDirection: 'column', width: '100%', maxWidth: '400px' }}>
          <Typography variant="h6">Additional Information</Typography>
          {/* Mayor Text Input */}
          <TextField
            label="Mayor"
            value={mayor}
            onChange={(e) => setMayor(e.target.value)}
            placeholder="Enter mayor's name"
            fullWidth
          />
        </Box>
      </div>
      
      <div ref={contentRef}>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '2em', alignItems: 'center'}}>
          <IDFront />
          <IDBack mayor={mayor} />
        </Box>
      </div>
      
      <div className='form-buttons'>
        <div className='form-buttons-right'>
          <Button variant='outlined' onClick={handleBack} sx={{ width: '100%' }}>Cancel</Button>
          <Button variant='contained' onClick={() => reactToPrintFn()} sx={{ width: '100%' }}>Print</Button>
        </div> 
      </div>
    </div>
  );
}