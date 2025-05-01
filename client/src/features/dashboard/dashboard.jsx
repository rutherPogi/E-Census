import { useState, useEffect } from 'react';
import { Typography, Container, Grid, Paper, Avatar, Box, Divider } from '@mui/material';
import { Assignment, Accessibility, Person, AccessibilityNew, Group, EmojiPeople, DashboardCustomize } from '@mui/icons-material'
import { get } from '../../utils/api/apiService';
import { useAuth } from '../../utils/auth/authContext'
import { BarChart } from '@mui/x-charts/BarChart';


export default function Dashboard() {

  const [barangayData, setBarangayData] = useState([]);
  const [values, setValues] = useState({
    surveys: '',
    population: '',
    male: '',
    female: '',
    pwd: '',
    soloParent: '',
    youth: ''
  });

  const philippineDate = new Date().toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const stats = [
    { title: 'Total Surveys', value: values.surveys, icon: <Assignment />, color: '#3f51b5' },
    { title: 'Total Population', value: values.population, icon: <EmojiPeople />, color: '#0277bd' },
    { title: 'Total Men', value: values.male, icon: <Person />, color: '#2196f3' },  // Men: Blue
    { title: 'Total Women', value: values.female, icon: <EmojiPeople />, color: '#e91e63' },  // Women: Pink
    { title: 'Total PWD', value: values.pwd, icon: <Accessibility />, color: '#ff9800' },  // PWD: Orange
    { title: 'Total Solo Parent', value: values.soloParent, icon: <AccessibilityNew />, color: '#9c27b0' },  // Solo Parent: Purple
    { title: 'Total Youth', value: values.youth, icon: <Group />, color: '#4caf50' }  // Youth: Green
  ];

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
          surveys: response.totalSurveys,
          population: response.totalPopulation,
          male: response.totalMale,
          female: response.totalFemale,
          pwd: response.totalPWD,
          soloParent: response.totalSoloParent,
          youth: response.totalYouth
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center'}}>
          <DashboardCustomize/>
          <Typography variant='h5' fontWeight={'bold'}>
            DASHBOARD
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography 
            variant="subtitle1"
            sx={{ 
              fontSize: { xs: '0.8rem', sm: '1rem' },
              fontWeight: 'bold'
            }}
          >
            Philippine Standard Time
          </Typography>
          <Typography 
            variant="subtitle1"
            sx={{ 
              fontSize: { xs: '0.8rem', sm: '1rem' }
            }}
          >
            {philippineDate}
          </Typography>
        </Box>
      </Box>

      <Divider/>
         
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

      {/* Barangay Data */}
      {barangayData.length > 0 && (
        <Box mt={4}>
          <BarChart
            xAxis={[{ 
              scaleType: 'band', 
              data: barangayData.map(row => row.barangay) 
            }]}
            series={[
              {
                data: barangayData.map(row => row.Surveys),
                label: 'Survey',
                color: '#2196f3' // Blue
              },
              {
                data: barangayData.map(row => row.Population),
                label: 'Population',
                color: '#f44336' // Red
              },
              {
                data: barangayData.map(row => row.Men),
                label: 'Men',
                color: '#4caf50' // Green
              },
              {
                data: barangayData.map(row => row.Women),
                label: 'Women',
                color: '#e91e63' // Pink
              },
              {
                data: barangayData.map(row => row.PWD),
                label: 'PWD',
                color: '#ff9800' // Orange
              },
              {
                data: barangayData.map(row => row.SoloParent),
                label: 'Solo Parent',
                color: '#9c27b0' // Purple
              },
              {
                data: barangayData.map(row => row.Youth),
                label: 'Youth',
                color: '#009688' // Teal
              },              

            ]}
            width={600}
            height={400}
          />
        </Box>
      )}


    </Container>
  );
}