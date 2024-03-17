import { Box, Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ApiServices } from "../../service/api.service";
import { ChannelCard, Videos } from "../";

function Channel() {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const dataChannelDetail = await ApiServices.fetching(
          `channels?part=snippet&id=${id}`
        );
        setChannelDetail(dataChannelDetail.items[0]);
        const dataVideo = await ApiServices.fetching(
          `search?channelId=${id}&part=snippet%2Cid&order=date`
        );
        setVideos(dataVideo.items);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  console.log(channelDetail);

  return (
    <Box minHeight={"95vh00"} mt={"1vh"}>
      <Box>
        <Box
          width={"100%"}
          height={"200px"}
          zIndex={10}
          sx={{
            backgroundImage: `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Box>
        <ChannelCard video={channelDetail} marginTop={"-100px"} />
      </Box>
      <Container maxWidth={"90%"}>
        <Videos video={videos} />
      </Container>
    </Box>
  );
}

export default Channel;
