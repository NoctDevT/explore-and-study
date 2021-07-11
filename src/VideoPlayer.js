import YoutubePlayer from "react-player";
import React, { useContext, useEffect, useState, useMemo } from "react";

import { UserContext } from "./useContext";

export const VideoPlayer = ({ audio }) => {
  const { video, setVideo } = useContext(UserContext);
  // setVideo(shufflePlaylist(video));
  // useMemo(() => {setVideo(shufflePlaylist(video))}, {video})
  setVideo(
    useMemo(() => {
      return shufflePlaylist(video);
    }, [video])
  );

  return (
    <div className="wrapper">
      <div className="video">
        <YoutubePlayer
          playing={true}
          url={"https://www.youtube.com/embed/" + video + "&t=" + 19}
          width="100%"
          height="100%"
          controls={true}
          volume={0.2}
          muted={audio}
          onEnded={() => {
            // if (typeof video !== "string") {
            //   setVideo(video.shift());
            // }
            typeof video !== "string"
              ? setVideo(video.shift())
              : alert("select a location");
          }}
          playsinline={true}
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
                showinfo: 0,
                controls: 0,
                playsinline: 1
              }
            }
          }}
        />
      </div>
    </div>
  );
};

function shufflePlaylist(arr) {
  if (typeof arr !== "string" && arr !== undefined) {
    console.log(typeof arr);
    var currentIndex = arr.length,
      tempValue,
      newIndex;

    while (0 !== currentIndex) {
      newIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempValue = arr[currentIndex];
      arr[currentIndex] = arr[newIndex];
      arr[newIndex] = tempValue;
    }
  }
  return arr;
}
