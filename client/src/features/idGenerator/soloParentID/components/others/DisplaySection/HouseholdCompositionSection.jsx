import { 
  Box, 
  Typography, 
  Paper, 
  Chip, 
  Grid, 
  Divider, 
  Card, 
  CardContent,
  Avatar,
  useTheme
} from "@mui/material";
import { 
  Person,
  School,
  Work,
  AttachMoney
} from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";

export const HouseholdCompositionSection = (members) => {
  const theme = useTheme();
  
  if (!members || members.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 5,
        borderRadius: 2,
        backgroundColor: theme.palette.grey[50],
        border: `1px dashed ${theme.palette.grey[300]}`
      }}>
        <Typography color="text.secondary" variant="h6">No household members added</Typography>
      </Box>
    );
  }

  // Helper function to render info items
  const renderInfoItem = (icon, title, value) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Box sx={{ mr: 1, color: theme.palette.primary.main }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" display="block">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: value === 'N/A' ? 400 : 500 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
  
  return (
    <Box>
      <Grid container spacing={3}>
        {members.map((member, index) => (
          <Grid item xs={12} key={index}>
            <Card 
              elevation={2} 
              sx={{ 
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8]
                }
              }}
            >
              <CardContent>
                {/* HEADER WITH NAME AND RELATIONSHIP */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  mb: 2 
                }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.secondary.main, 
                      mr: { xs: 0, sm: 2 },
                      mb: { xs: 1, sm: 0 },
                      width: 48,
                      height: 48
                    }}
                  >
                    {member.firstName ? member.firstName.charAt(0) : "?"}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {`${member.firstName || ''} 
                        ${member.middleName === 'N/A' ? '' : member.middleName || ''} 
                        ${member.lastName || ''} 
                        ${member.suffix === 'N/A' ? '' : member.suffix || ''}`.trim()}
                    </Typography>
                    {member.relationship && (
                      <Chip 
                        size="small" 
                        label={member.relationship} 
                        color="primary" 
                        sx={{ mt: 0.5 }} 
                      />
                    )}
                  </Box>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={3}>
                  {/* PERSONAL DETAILS */}
                  <Grid item xs={12} md={4}>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: theme.palette.grey[50], 
                      borderRadius: 2, 
                      height: '100%'
                    }}>
                      <Typography variant="subtitle1" color="primary" sx={{ mb: 2, fontWeight: 'medium', display: 'flex', alignItems: 'center' }}>
                        <Person fontSize="small" sx={{ mr: 1 }} /> Personal Details
                      </Typography>
                      
                      {renderInfoItem(<Person fontSize="small" />, "Age", member.age)}
                      {renderInfoItem(<Person fontSize="small" />, "Sex", member.sex)}
                      {renderInfoItem(<Person fontSize="small" />, "Birthdate", formatters.date(member.birthdate))}
                      {renderInfoItem(<Person fontSize="small" />, "Civil Status", member.civilStatus || 'N/A')}
                    </Box>
                  </Grid>
                  
                  {/* EDUCATION AND OCCUPATION */}
                  <Grid item xs={12} md={4}>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: theme.palette.grey[50], 
                      borderRadius: 2,
                      height: '100%'
                    }}>
                      <Typography variant="subtitle1" color="primary" sx={{ mb: 2, fontWeight: 'medium', display: 'flex', alignItems: 'center' }}>
                        <School fontSize="small" sx={{ mr: 1 }} /> Education
                      </Typography>
                      
                      {renderInfoItem(<School fontSize="small" />, "Education Level", member.educationalAttainment || 'N/A')}
                    </Box>
                  </Grid>
                  
                  {/* WORK AND INCOME */}
                  <Grid item xs={12} md={4}>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: theme.palette.grey[50], 
                      borderRadius: 2,
                      height: '100%'
                    }}>
                      <Typography variant="subtitle1" color="primary" sx={{ mb: 2, fontWeight: 'medium', display: 'flex', alignItems: 'center' }}>
                        <Work fontSize="small" sx={{ mr: 1 }} /> Occupation & Income
                      </Typography>
                      
                      {renderInfoItem(<Work fontSize="small" />, "Occupation", member.occupation || 'N/A')}
                      {renderInfoItem(
                        <AttachMoney fontSize="small" />, 
                        "Monthly Income", 
                        member.monthlyIncome ? 
                          (formatters.currency ? formatters.currency(member.monthlyIncome) : member.monthlyIncome) : 
                          'N/A'
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};