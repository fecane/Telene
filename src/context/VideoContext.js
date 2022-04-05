import React, { createContext, useState, useEffect } from "react";
import VideoFacade from "./VideoFacade";

const VideoContext = createContext();

function useVideoCategory(id) {
  const context = React.useContext(VideoContext);
  if (!context) {
    return undefined;
  }
  return context.getCategory(id);
}

function useVideo(id) {
  const context = React.useContext(VideoContext);
  if (!context) {
    return undefined;
  }
  return context.getVideo(id);
}

function useVideoCategories() {
  const context = React.useContext(VideoContext);
  if (!context) {
    return [];
  }
  return context.getCategories();
}

function useVideosByCategory(id) {
  const context = React.useContext(VideoContext);
  if (!context) {
    return [];
  }
  return context.getVideosByCategory(id);
}

function useVideoSpotlight() {
  const context = React.useContext(VideoContext);
  if (!context) {
    return [];
  }
  return context.getSpotlight();
}

function VideoContextProvider({ children }) {
  const [videoFacade, setVideoFacade] = useState(undefined);

  const render = () => ({ ...children });

  useEffect(() => {
    const url = fetch(`/data/videos.json?ts=${new Date().getTime()}`);
    url
      .then((req) => req.json())
      .then((data) => {
        setVideoFacade(new VideoFacade(data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <VideoContext.Provider value={videoFacade}>
      {render()}
    </VideoContext.Provider>
  );
}

export {
  VideoContextProvider,
  useVideo,
  useVideoCategory,
  useVideoCategories,
  useVideosByCategory,
  useVideoSpotlight,
};
