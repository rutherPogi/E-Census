import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Divider,
  useTheme,
  Paper
} from "@mui/material";
import {
  Help,
  Info,
  ErrorOutline
} from "@mui/icons-material";

export const ProblemNeedsSection = (member) => {
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
    <Grid container spacing={3}>
      {/* CIRCUMSTANCES SECTION */}
      <Grid item xs={12} md={6}>
        <Card 
          variant="outlined" 
          sx={{ 
            borderRadius: 2,
            height: '100%',
            transition: 'all 0.3s',
            '&:hover': {
              borderColor: theme.palette.primary.main,
              boxShadow: `0 0 8px ${theme.palette.primary.light}`
            }
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <Info color="primary" sx={{ mr: 1.5, mt: 0.5 }} />
              <Typography variant="h6" color="primary">
                Circumstances
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 1 }}>
              Classification/Circumstances of being a solo parent
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 1, fontStyle: 'italic' }}>
              (Dahilan bakit naging solo parent)
            </Typography>
            
            <Paper 
              elevation={0} 
              variant="outlined" 
              sx={{ 
                p: 2, 
                mt: 2, 
                borderRadius: 2,
                bgcolor: theme.palette.grey[50]
              }}
            >
              <Typography variant="body1">
                {member.causeSoloParent || 'No information provided'}
              </Typography>
            </Paper>
          </CardContent>
        </Card>
      </Grid>
      
      {/* NEEDS/PROBLEMS SECTION */}
      <Grid item xs={12} md={6}>
        <Card 
          variant="outlined" 
          sx={{ 
            borderRadius: 2,
            height: '100%',
            transition: 'all 0.3s',
            '&:hover': {
              borderColor: theme.palette.warning.main,
              boxShadow: `0 0 8px ${theme.palette.warning.light}`
            }
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <Help color="warning" sx={{ mr: 1.5, mt: 0.5 }} />
              <Typography variant="h6" color="warning.main">
                Needs and Problems
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 1 }}>
              Needs/Problem of being a solo parent
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 1, fontStyle: 'italic' }}>
              (Kinakailangan/Problema ng isa ng solo parent)
            </Typography>
            
            <Paper 
              elevation={0} 
              variant="outlined" 
              sx={{ 
                p: 2, 
                mt: 2, 
                borderRadius: 2,
                bgcolor: theme.palette.grey[50]
              }}
            >
              <Typography variant="body1">
                {member.needsSoloParent || 'No information provided'}
              </Typography>
            </Paper>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};