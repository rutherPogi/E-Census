import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Divider,
  useTheme,
  Paper,
  Button,
  Tooltip,
  useMediaQuery
} from "@mui/material";
import {
  Help,
  Info,
  Edit,
  EscalatorWarning
} from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";



export const Issues = ({ formData, handleEdit, isViewing = false }) => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const issues = formData.issues;
  
  return (
    <Box
      sx={{ 
        backgroundColor: 'white',
        padding: { xs: '1em', md: '2em' }
      }}
    >
      <Box 
        sx={{
          display: 'flex', 
          justifyContent: 'end', 
          alignItems: 'center', 
          mb: 2,
          pb: 1
        }}
      >
        {!isViewing && (
          <Tooltip title="Edit section">
            <Button
              onClick={() => handleEdit(1)}
              variant="outlined"
              color="primary"
              startIcon={<Edit/>}
            >
              EDIT
            </Button>
          </Tooltip>
        )}
      </Box>

      

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* PROBLEM/NEEDS SECTION */}
        <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
          <Box sx={{ display: 'flex', gap: 2}}>
            <Help color="warning"/>
            <Typography variant={isSmallScreen ? "subtitle2" : 'subtitle1'} color="warning" sx={{ mb: 1, fontWeight: 'medium' }}>
              COMMUNITY ISSUES
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 2 }} />

          <Typography variant="body2">{issues || 'N/A'}</Typography>
        </Box>
      </Box>  
    </Box>
  );
};