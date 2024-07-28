import React, { useState } from "react";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const { id } = useParams();
  const [videoSource, setVideoSource] = useState(null);

  return (
    <div>
      <video
        src={`http://localhost:5000/video/${id}`}
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
