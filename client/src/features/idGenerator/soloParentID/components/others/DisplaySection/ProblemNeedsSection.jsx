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
  Tooltip
} from "@mui/material";
import {
  Help,
  Info,
  Edit,
  EscalatorWarning
} from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";



export const ProblemNeedsSection = ({member, handleEdit, isViewing = false}) => {

  const theme = useTheme();

  if (!member) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 5,
        borderRadius: 2,
        backgroundColor: theme.palette.grey[50],
        border: `1px dashed ${theme.palette.grey[300]}`
      }}>
        <Typography color="text.secondary" variant="h6">No problem/needs information added</Typography>
      </Box>
    );
  }
  
  return (
    <Box
      sx={{ 
        backgroundColor: 'white',
        padding: '2em'
      }}
    >
      <Box 
        sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          pb: 1
        }}
      >
        <Box sx={{ alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center'}}>
            <EscalatorWarning/>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Solo Parent Circumstances, Problems, and Needs
            </Typography> 
          </Box>
        </Box>
        {!isViewing && (
          <Tooltip title="Edit section">
            <Button
              onClick={() => handleEdit(4)}
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
        {/* CIRCUMSTANCES SECTION */}
        <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
          <Box sx={{ display: 'flex', gap: 2}}>
            <Info color="primary"/>
            <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
              CIRCUMSTANCES
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 2 }} />

          <Box>
            <Box sx={{ display: 'flex', gap: 1}}>
              <Typography variant="subtitle2" color="text.secondary">
                  Classification/Circumstances of being a solo parent 
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 1, fontStyle: 'italic' }}>
                (Dahilan kung bakit naging solo parent)
              </Typography>
            </Box>
            
            <Typography variant="body2">{member.causeSoloParent || 'N/A'}</Typography>
          </Box>
        </Box>

        {/* PROBLEM/NEEDS SECTION */}
        <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
          <Box sx={{ display: 'flex', gap: 2}}>
            <Help color="warning"/>
            <Typography variant="subtitle1" color="warning" sx={{ mb: 1, fontWeight: 'medium' }}>
              NEEDS AND PROBLEMS
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 2 }} />

          <Box>
            <Box sx={{ display: 'flex', gap: 1}}>
              <Typography variant="subtitle2" color="text.secondary">
                Needs/Problem of being a solo parent
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 1, fontStyle: 'italic' }}>
                (Kinakailangan/Problema ng isa ng solo parent)
              </Typography>
            </Box>
            
            <Typography variant="body2">{member.needsSoloParent || 'N/A'}</Typography>
          </Box>
        </Box>
      </Box>  
    </Box>
  );
};