import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const { id } = useParams();
  const [videoSource, setVideoSource] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/video/${id}`, {
          headers: {
            Range: 'bytes=0-'
          }
        });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoSource(url);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    if (id) {
      fetchVideo();
    }
  }, [id]);

  return (
    <div>
      <h1>Video Player for Video ID: {id}</h1>
      <video
        src={videoSource}
        width="100%"
        height="720px"
        controls
      >
        Your browser does not support the video tag.
      </video>
      {!videoSource && (
        <div>
          <p>Buffering...</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
