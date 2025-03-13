import { Container, Grid } from "@mui/material";
import Posts from "./components/Posts";

const PostLists = () => {

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
    <Container disableGutters>
      {newsData.map((news, index) => (
        <Grid item key={index} xs={12}>
          <Posts {...news} />
        </Grid>
      ))}
    </Container>
  );
};

export default PostLists;