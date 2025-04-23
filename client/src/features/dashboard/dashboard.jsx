import { useState, useEffect } from 'react';
import { Typography, Container, Grid, Paper, Avatar, Box } from '@mui/material';
import { Assignment, FamilyRestroom, Accessible, EscalatorWarning, Elderly, House, EmojiPeople } from '@mui/icons-material'
import { get } from '../../utils/api/apiService';
import { useAuth } from '../../utils/auth/authContext'
import { BarChart } from '@mui/x-charts/BarChart';


export default function Dashboard() {

  const { userData } = useAuth();
  const [barangayData, setBarangayData] = useState([]);
  const [values, setValues] = useState({
    surveys: '',
    families: '',
    population: '',
    pwdApplications: '',
    soloParentApplications: '',
    seniorCitizenApplications: '',
    registeredHouse: ''
  })

  const stats = [
    { title: 'Total Surveys', value: values.surveys, icon: <Assignment />, color: '#3f51b5' },
    { title: 'Total Families', value: values.families, icon: <FamilyRestroom />, color: '#f44336' },
    { title: 'Total Population', value: values.population, icon: <EmojiPeople />, color: '#0277bd' },
    { title: 'Registered House', value: values.registeredHouse, icon: <House />, color: '#ec407a' }  ];

    

  useEffect(() => {
    const fetchBarangayStats = async () => {
      try {
        const response = await get('/dashboard/barangayStats');
        setBarangayData(response);
      } catch (error) {
        console.error('Failed to fetch barangay data:', error);
      }
    };

    fetchBarangayStats();
  }, []);


  useEffect(() => {
    const getTotalNumber = async () => {
      try {
        const response = await get('/dashboard/getTotal');
        setValues({
          surveys: response.TotalSurvey,
          population: response.TotalPopulation
        });
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    getTotalNumber();
  }, []);

  return (
    <Container component={Paper}
      sx={{ borderRadius: 2, backgroundColor: "#fff", p: 5, display: 'flex', flexDirection: 'column', gap: 3 }}
    > 
      {/* Header */}
         
      {/* Stats Cards */}
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={5} key={index}>
            <Paper elevation={3} style={{ height: '100%', display:'flex'}}>
              <Box p={3} display="flex" alignItems="center">
                <Avatar style={{ backgroundColor: stat.color, marginRight: 16 }}>
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6">{stat.value}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {stat.title}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {barangayData.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" mb={2}>Surveys and Population per Barangay</Typography>
          <BarChart
            xAxis={[{ 
              scaleType: 'band', 
              data: barangayData.map(row => row.barangay) 
            }]}
            series={[
              {
                data: barangayData.map(row => row.totalSurveys),
                label: 'Surveys',
                color: '#3f51b5'
              },
              {
                data: barangayData.map(row => row.totalPopulation),
                label: 'Population',
                color: '#f44336'
              }
            ]}
            width={600}
            height={400}
          />
        </Box>
      )}
    </Container>
  );
}