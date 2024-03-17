import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiServices } from "../../service/api.service";
import { Box, Container, Typography, colors } from "@mui/material";
import { Videos } from "..";

function Search() {
  const { id } = useParams();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiServices.fetching(`search?part=snippet&q=${id}`);
        setVideos(data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  return (
    <Box p={2} sx={{ height: "90vh" }}>
      <Container maxWidth="90%">
        <Typography variant="h4" fontWeight={"bold"} mb={2}>
          Search results for <span style={{ color: "#76323f" }}>{id}</span>{" "}
          videos
        </Typography>
        <Videos video={videos} />
      </Container>
    </Box>
  );
}

export default Search;
