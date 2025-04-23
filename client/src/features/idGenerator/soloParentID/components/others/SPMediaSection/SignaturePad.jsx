import SignaturePad from 'react-signature-canvas';

import { useRef, useState, useEffect } from 'react';
import { Box, Button, FormHelperText } from '@mui/material';
import { DeleteOutline, Save } from '@mui/icons-material';



export default function SignatureCapture({ 
  onSignatureChange,
  error,
  initialSignature
}) {

  const sigPad = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);
  
  useEffect(() => {
    // Load saved signature if available
    if (initialSignature && sigPad.current) {
      sigPad.current.fromDataURL(initialSignature);
      setIsEmpty(false);
    }
  }, [initialSignature]);

  const handleClear = () => {
    sigPad.current.clear();
    setIsEmpty(true);
    onSignatureChange(null);
  };

  const handleSave = () => {
    if (sigPad.current.isEmpty()) {
      return;
    }
    
    const signatureDataURL = sigPad.current.toDataURL('image/png');
    onSignatureChange(signatureDataURL);
    setIsEmpty(false);
  };

  const handleSignatureEnd = () => {
    setIsEmpty(sigPad.current.isEmpty());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: 1,
        padding: 2,
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <SignaturePad
          ref={sigPad}
          canvasProps={{
            width: 500,       
            height: 200,      
            className: 'signature-canvas',
            style: { border: '1px solid black', borderRadius: '8px' }
          }}
          onEnd={handleSignatureEnd}
        />
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteOutline />}
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={handleSave}
          disabled={isEmpty}
        >
          Save Signature
        </Button>
      </Box>
      
      {error && (
        <FormHelperText error>Please provide a signature</FormHelperText>
      )}
    </Box>
  );
}