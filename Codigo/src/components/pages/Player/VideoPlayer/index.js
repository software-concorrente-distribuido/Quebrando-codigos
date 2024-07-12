import React, { useEffect, useState } from "react";

const VideoPlayer = ({ id }) => {
  const videoUrl =
    "exampleUrl";
  const [isBuffering, setIsBuffering] = useState(true);
  const [videoSource, setVideoSource] = useState();

  useEffect(() => {
    (async () => {
      let url = await fetchVideoSegments(videoUrl);
      setVideoSource(url);
    })();
  }, []);


  const fetchVideoSegments = async (url) => {
    try {
      const response = await fetch(url, {
        headers: {
          Range: `bytes=${108199936}-`,
        },
      });
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([new Uint8Array(arrayBuffer)]);
      const blobUrl = URL.createObjectURL(blob);
      console.log("Fetched array buffer:", arrayBuffer);
      return blobUrl;
    } catch (error) {
      console.error("Error fetching video segments:", error);
      return [];
    }
  };

  return (
    <div>
      <h1>Video Player for Video ID: {id}</h1>
      <video src={videoSource} width="100%" height="720px" controls>
        Your browser does not support the video tag.
      </video>
      {isBuffering && (
        <div>
          <p>Buffering...</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
