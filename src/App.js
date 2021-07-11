import "./styles.css";
import React, { useState, useRef, useEffect, useMemo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

import ReactAudioPlayer from "react-audio-player";

import { data } from "./data";
import { VideoPlayer } from "./VideoPlayer";

import { UserContext } from "./useContext";

library.add(fab, faVolumeMute, faVolumeUp);

var currentLocation = null;

export default function App() {
  return <Video />;
}

function Video() {
  const [currentData, setData] = useState(currentLocation);

  const [video, setVideo] = useState();
  const [audio, setAudio] = useState(true);
  const [volume, setVolume] = useState(0);
  const [radio, setRadio] = useState();

  var radioName = useRef();

  useEffect(() => {
    if (currentData != null) {
      setVideo(currentData.contents[0].url);
      setRadio(currentData.contents[1]);
      radioName.current.innerText = currentData.contents[1].radioName;
    } else {
      setVideo("7HaJArMDKgI");
    }
  }, [currentData, video]);

  const providerValue = useMemo(() => ({ video, setVideo }), [video, setVideo]);

  return (
    <>
      <UserContext.Provider value={providerValue}>
        <VideoPlayer youtubeId={video} audio={audio} />
      </UserContext.Provider>

      <AudioPlayer radio={radio} volume={volume} />

      <div className="interface">
        <div className="layout">
          <div className="listContainer">
            <ul className="CountryList">
              {data.map((data, index) => (
                <li
                  className="listItem"
                  key={index}
                  onClick={() => {
                    setData(data);
                  }}
                >
                  {data.location}
                </li>
              ))}
            </ul>
          </div>

          <button className="muteBtn" onClick={(e) => setAudio(!audio)}>
            {!audio ? (
              <FontAwesomeIcon icon={faVolumeUp} style={{ color: "white" }} />
            ) : (
              <FontAwesomeIcon icon={faVolumeMute} style={{ color: "white" }} />
            )}
          </button>
          <div className="slidecontainer">
            <p ref={radioName}>Click a region above to join a stream</p>

            <p>Radio Volume</p>

            <input
              type="range"
              min="0"
              max="50"
              defaultValue={volume}
              onChange={(e) => setVolume(parseInt(e.target.value, 10))}
            />
          </div>
          <div className="buttons">
            <button className="Btn" onClick={(e) => setVideo("aVMkvCTT_yg")}>
              Change Video
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

//
const AudioPlayer = ({ audio, volume, radio }) => {
  var radioUrl = radio
    ? radio.radioUrl[0]
    : "https://stream-mz.planetradio.co.uk/magic1054.mp3";
  console.log(radioUrl);
  return (
    <ReactAudioPlayer
      src={radioUrl}
      onPlay={() => {}}
      volume={volume / 100}
      controls={false}
      autoPlay
    />
  );
};
