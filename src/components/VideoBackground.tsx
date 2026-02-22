import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

interface VideoBackground {
  movieId: string;
}

const VideoBackground: React.FC<VideoBackground> = ({ movieId }) => {
  const tailerVideo = useSelector((store: any) => store?.movie?.trialerVideo);
  useMovieTrailer({ movieId });
  return (
    <div className="w-screen aspect-video absolute z-0">
      <iframe
        className="w-full h-full"
        // src={`https://www.youtube.com/embed/${tailerVideo?.key}`}
        src={`https://www.youtube.com/embed/JUADqWkJiiE?autoplay=1&mute=1&playlist=JUADqWkJiiE&loop=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
