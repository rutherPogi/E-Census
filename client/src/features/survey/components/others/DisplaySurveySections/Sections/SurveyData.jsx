import { Box, Typography, Paper, Chip, Grid, Divider, Tooltip, Button, Container} from "@mui/material";
import { Call, Edit, Person, Work } from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";




export const SurveyDataSection = ({ surveyData, handleEdit, isViewing = false }) => {

  if (!surveyData || Object.keys(surveyData).length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="text.secondary">No survey data available.</Typography>
      </Box>
    );
  }
  
  return (
    <Box 
      sx={{ 
        backgroundColor: 'white',
        padding: { xs: '1em', md: '2em' }
      }}
    >
      <Box sx={{
        display: 'flex', 
        justifyContent: 'end', 
        alignItems: 'center', 
        mb: 2,
        pb: 1
      }}>
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

      <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
        <Box sx={{ display: 'flex', gap: 2}}>
          <Person color="primary"/>
          <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
            {surveyData.respondent} (Respondent)
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3}}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Interviewer</Typography>
              <Typography variant="body2">{surveyData.interviewer}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Family Class</Typography>
              <Typography variant="body2">{surveyData.familyClass}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Barangay</Typography>
              <Typography variant="body2">{surveyData.barangay}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Municipality</Typography>
              <Typography variant="body2">{surveyData.municipality}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Monthly Income</Typography>
              <Typography variant="body2">{`₱${formatters.currency(surveyData.monthlyIncome)}`}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Irregular Income</Typography>
              <Typography variant="body2">{`₱${formatters.currency(surveyData.irregularIncome)}`}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Family Income</Typography>
              <Typography variant="body2">{`₱${formatters.currency(surveyData.familyIncome)}`}</Typography>
            </Grid>
          </Grid>
        </Box>

        
      </Box>

        
      
    </Box>
  );
};