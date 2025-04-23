import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Button, Box } from "@mui/material";


import { useFormContext } from "../others/FormContext";
import IDFront from "../others/IDCardSection/IDFront";
import IDBack from "../others/IDCardSection/IDBack";



export default function PrintID({ handleBack }) {

  const { formData } = useFormContext();

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="responsive-container">
      <div className="responsive-details"></div>
      <div ref={contentRef}>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '2em', alignItems: 'center'}}>
         <IDFront/>
         <IDBack/>
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
