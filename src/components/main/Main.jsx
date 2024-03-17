import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { colors } from "../../constants/colors";
import { Category, Videos } from "../";
import { ApiServices } from "../../service/api.service";

function Main() {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  const selectedCategoryHandler = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiServices.fetching(
          `search?part=snippet&q=${selectedCategory}`
        );
        setVideos(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [selectedCategory]);

  return (
    <Stack>
      <Category
        selectedCategoryHandler={selectedCategoryHandler}
        selectedCategory={selectedCategory}
      />
      <Box p={2} sx={{ height: "90vh" }}>
        <Container maxWidth={"90%"}>
          <Typography variant="h4" fontWeight={"bold"} mb={2}>
            {selectedCategory}{" "}
            <span style={{ color: colors.secondary }}>Videos</span>
          </Typography>
          <Videos video={videos.items} />
        </Container>
      </Box>
    </Stack>
  );
}

export default Main;
