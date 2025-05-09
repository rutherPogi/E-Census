import { Box, Typography, Grid, Divider, Tooltip, Button } from "@mui/material";
import { Edit, Person, People, LocalHospital } from "@mui/icons-material";



export const OtherInfoSection = ({ members, handleEdit, isViewing = false }) => {

  if (!members) return null;
  
  return (
    <Box
      sx={{ 
        backgroundColor: 'white',
        padding: '2em'
        }}
      >
        <Box sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          pb: 1
        }}>
          <Box sx={{ alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center'}}>
              <People/>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                OTHER INFORMATION
              </Typography> 
            </Box>
          </Box>
          {!isViewing && (
            <Tooltip title="Edit section">
              <Button
                onClick={() => handleEdit(3)}
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
          {/* ACCOMPLISHED BY SECTION */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
            <Box sx={{ display: 'flex', gap: 2}}>
              <Person color="primary"/>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
                ACCOMPLSIHED BY {members.abRole}
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
  
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">{members.abRole}'s Name</Typography>
                <Typography variant="body2">
                {`${members.abFirstName ? members.abFirstName : '' } 
                  ${members.abMiddleName ? members.abMiddleName : '' } 
                  ${members.abLastName ? members.abLastName : '' } 
                  ${members.abSuffix ? members.abSuffix : '' }`.trim()}
                </Typography>
              </Grid>
            </Grid>
          </Box>
  
          {/* CERTIFIED PHYSICIAN SECTION */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
            <Box sx={{ display: 'flex', gap: 2}}>
              <LocalHospital color="primary"/>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
                CERTIFIED PHYSICIAN
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">Certified Physician</Typography>
                <Typography variant="body2">
                  {`${members.cpFirstName ? members.cpFirstName : '' } 
                    ${members.cpMiddleName ? members.cpMiddleName : '' } 
                    ${members.cpLastName ? members.cpLastName : '' } 
                    ${members.cpSuffix ? members.cpSuffix : '' }`
                    .trim()}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">License Number</Typography>
                <Typography variant="body2">{members.licenseNumber}</Typography>
              </Grid>
            </Grid>
          </Box>
  
          {/* PROCESSING OFFICER SECTION */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
            <Box sx={{ display: 'flex', gap: 2}}>
              <Person color="primary"/>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
                PROCESSING OFFICER
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">Officer's Name</Typography>
                <Typography variant="body2">
                  {`${members.poFirstName ? members.poFirstName : '' } 
                    ${members.poMiddleName ? members.poMiddleName : '' } 
                    ${members.poLastName ? members.poLastName : '' } 
                    ${members.poSuffix ? members.poSuffix : '' }`
                    .trim()}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* APPROVING OFFICER SECTION */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
            <Box sx={{ display: 'flex', gap: 2}}>
              <Person color="primary"/>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
                APPROVING OFFICER
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">Officer's Name</Typography>
                <Typography variant="body2">
                  {`${members.aoFirstName ? members.aoFirstName : '' } 
                    ${members.aoMiddleName ? members.aoMiddleName : '' } 
                    ${members.aoLastName ? members.aoLastName : '' } 
                    ${members.aoSuffix ? members.aoSuffix : '' }`
                    .trim()}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* ENCODER SECTION */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
            <Box sx={{ display: 'flex', gap: 2}}>
              <Person color="primary"/>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
                ENCODER
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">Encoder's Name</Typography>
                <Typography variant="body2">
                  {`${members.eFirstName ? members.eFirstName : '' } 
                    ${members.eMiddleName ? members.eMiddleName : '' } 
                    ${members.eLastName ? members.eLastName : '' } 
                    ${members.eSuffix ? members.eSuffix : '' }`
                    .trim()}
                </Typography>
              </Grid>
            </Grid>
          </Box>


          {/* REPORTING UNIT SECTION */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
            <Box sx={{ display: 'flex', gap: 2}}>
              <Person color="primary"/>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
                REPORTING UNIT
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={5}>
                <Typography variant="subtitle2" color="text.secondary">REPORTING UNIT (Office/Section)</Typography>
                <Typography variant="body2">{members.reportingUnit || 'N/A'}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={5}>
                <Typography variant="subtitle2" color="text.secondary">Control Number</Typography>
                <Typography variant="body2">{members.controlNumber || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
  );
};