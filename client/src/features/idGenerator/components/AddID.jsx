import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Container, Paper, Typography } from '@mui/material';
import { Edit, Add } from '@mui/icons-material';
import '../../../styles/components/style'


export default function AddID({ idType, onClick, id, idImage, title }) {

  const navigate = useNavigate();


  return(
    <Container 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        padding: 2
      }}
    >
      <Box 
        display={'flex'} 
        flexDirection={'column'} 
        alignItems={'center'}
        backgroundColor={'#fff'} 
        p={3}
        gap={2} >
        <Typography variant='h6'>{title} ID</Typography>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 5
          }}
        >
          <Card component="img" elevation={2} src={idImage}
            sx={{
              height: '300px',
              width: '100%',
              backgroundColor: '#ccc',
              border: '1px solid #ccc',
              borderRadius: 3
            }}
          />
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1, 
            width: '100%', 
            backgroundColor: '#fff',
            padding: 1,
            borderRadius: 2,
            boxSizing: 'border-box' }}>
            <Button
              variant="contained"
              onClick={onClick}
              startIcon={<Add />}
              sx={{ width: '100%' }}
            >
              ADD {idType} ID
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(`/main/manage-${id}ID`)}
              startIcon={<Edit />}
              sx={{ width: '100%' }}
            >
              MANAGE {idType} ID's
            </Button>
          </Box>
        </Box>
      </Box>     
    </Container>
  
  )
}