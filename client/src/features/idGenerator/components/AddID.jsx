import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Paper } from '@mui/material';
import { Edit, Add } from '@mui/icons-material';
import '../../../styles/components/style'


export default function AddID({ idType, onClick, id }) {

  const navigate = useNavigate();


  return(
    <Container component={Paper}
      sx={{
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        backgroundColor: '#fff',
        padding: 2
      }}
    >
      <Box
        sx={{
          width: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Box
          sx={{
            height: '300px',
            width: '100%',
            backgroundColor: '#ccc',
            borderRadius: 1
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
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
            MANAGE {idType} IDs
          </Button>
        </Box>
      </Box>
    </Container>
  
  )
}