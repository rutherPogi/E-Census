import { Box, Button, CircularProgress, } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const FormButtons = ({ 
  onBack, 
  onNext, 
  backLabel = 'Cancel', 
  nextLabel = 'Next', 
  nextDisabled = false,
  loading = false
}) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'flex-end',
      gap: 2,
      mt: 2
    }}>
      <Button 
        variant='outlined' 
        onClick={onBack}
        disabled={loading}
      >
        {backLabel}
      </Button>
      <Button 
        variant='contained' 
        onClick={onNext}
        disabled={nextDisabled || loading}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
      >
        {nextLabel}
      </Button>
    </Box>
  );
};

export default FormButtons;