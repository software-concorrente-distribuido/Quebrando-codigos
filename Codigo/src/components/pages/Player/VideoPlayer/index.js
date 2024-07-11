import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const { id } = useParams();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleLoadedMetadata = () => {
      console.log("Metadata loaded");
    };

    const handleProgress = () => {
      const buffered = video.buffered;
      const bufferedTimeRanges = [];

      for (let i = 0; i < buffered.length; i++) {
        bufferedTimeRanges.push([buffered.start(i), buffered.end(i)]);
      }

      console.log("Buffered Time Ranges: ", bufferedTimeRanges);
    };

    const handlePlaying = () => {
      console.log("Video is playing");
    };

    const handlePause = () => {
      console.log("Video is paused");
    };

    const handleWaiting = () => {
      console.log("Video is waiting for more data");
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("progress", handleProgress);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleWaiting);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleWaiting);
    };
  }, []);

  // URL pública de exemplo para o vídeo
  const videoUrl = "https://skillforgesoftware.s3.us-east-2.amazonaws.com/bucket/FALLEN+PASSANDO+DICAS+de+SITUA%C3%87%C3%95ES+que+TODOS+PLAYERS+DE+CS%EF%BC%9AGO+DEVERIAM+SABER!!.mp4";

  return (
    <div>
      <h1>Video Player for Video ID: {id}</h1>
      <video ref={videoRef} width="100%" height="720px" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;