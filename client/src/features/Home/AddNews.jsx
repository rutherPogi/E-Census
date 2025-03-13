import { useState } from "react";
import { Box, Button } from "@mui/material";
import { TextInput } from "../../components/common/FormFields"


export default function AddNews() {

  const [description, setDescription] = useState();
  const [error, setError] = useState();

  return (
    <Box>
      <Button>Create P</Button>
      <Box>
        <Button>Add Image</Button>
        <TextInput
          label = 'Description'
          value = {description} 
          error = {error}
          helperText =  {'This field is required!'}
          placeholder =  'Write the description of the post...'
          multiline = {true}
          required = {true}
        />
        <Button>Post +</Button>
      </Box>
    </Box>
  );
}