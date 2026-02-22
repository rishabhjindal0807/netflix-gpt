import React from "react";

interface VideoTitle {
  title: string;
  overview: string;
}

const VideoTitle: React.FC<VideoTitle> = ({
  title = "Mercy",
  overview = "In the near future, a detective stands on trial accused of murdering his wife. He has ninety minutes to prove his innocence to the advanced AI Judge he once championed, before it determines his fate.",
}) => {
  return (
    <div className="w-screen aspect-video absolute px-24 py-[20%] z-1 bg-gradient-to-r from-black ">
      <h1 className="text-6xl font-bold text-white">{title}</h1>
      <p className="py-4 text-lg w-1/3 text-white">{overview}</p>
      <div className="flex gap-4">
        <button className="bg-white text-black px-10 py-2 rounded-lg bg-white/50 hover:bg-white/80 cursor-pointer flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
          Play
        </button>
        <button className="bg-gray-500 text-white px-10 py-2 rounded-lg bg-gray-500/50 hover:bg-gray-500/80 cursor-pointer flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
