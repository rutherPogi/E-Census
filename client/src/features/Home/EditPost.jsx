import { Box, Container, Button, Paper } from "@mui/material";
import PostLists from "./PostLists";
import { Edit, Add } from "@mui/icons-material";

export default function EditPost() {

  return (
      <Container component={Paper}
        sx = {{
          borderRadius: 2,
          backgroundColor: '#fff',
          padding: 5
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="outlined" startIcon={<Edit/>}>EDIT POST</Button>
          <Button variant="contained" startIcon={<Add/>}>ADD POST</Button>
        </Box>
        <PostLists/>
      </Container>
  );
}