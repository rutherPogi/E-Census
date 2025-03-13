import { useNavigate } from 'react-router-dom';
import { Box, Button, Container } from '@mui/material';
import { Edit, Add } from '@mui/icons-material';
import '../../../styles/components/style'


export default function AddID({ idType, onClick, id }) {

  const navigate = useNavigate();


  return(
      <Container
        sx = {{
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          backgroundColor: '#fff',
          padding: 2
        }}
      >
        <Box 
          sx = {{  
            height: '300px',
            width: '600px',
            backgroundColor: 'red',
            borderRadius: 1
          }}
        >
        </Box>
        <Box sx= {{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={onClick}
            startIcon={<Add/>}
            sx = {{ width: '100%'}}
          >
            ADD {idType} ID
          </Button>
          <Button 
            variant="outlined"
            onClick={() => navigate(`/main/manage-${id}ID`)} 
            startIcon={<Edit/>}
            sx = {{ width: '100%'}}
          >
            MANAGE {idType} IDs
          </Button> 
        </Box>
      </Container>
  )
}