import { Box, Grid } from "@mui/material";
import Posts from "./components/Posts";

/**
 * Component that displays a list of news posts
 */
const PostLists = () => {
  // Sample news data
  const newsData = [
    {
      title: "Tech Innovation of 2025",
      description: "A groundbreaking discovery is set to revolutionize the tech industry...",
      date: "2025-03-04",
      image: "src/assets/image3.jpg"
    },
    {
      title: "Climate Change Impacts",
      description: "New research highlights the drastic effects of climate change...",
      date: "2025-03-03",
      image: "src/assets/image2.jpg",
    },
    {
      title: "Climate Change Impacts",
      description: "New research highlights the drastic effects of climate change...",
      date: "2025-03-03",
      image: "src/assets/image3.jpg",
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={3}>
        {newsData.map((news, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Posts {...news} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PostLists;