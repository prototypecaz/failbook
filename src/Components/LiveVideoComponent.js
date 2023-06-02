import React, { useState, useRef } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyCpXKR9IwekybNznE70WDLk4Nrcjv5pBNo",

  authDomain: "facebook-d93cf.firebaseapp.com",

  projectId: "facebook-d93cf",

  storageBucket: "facebook-d93cf.appspot.com",

  messagingSenderId: "948147827609",

  appId: "1:948147827609:web:9c076f7503450d4f2c1908",
};

firebase.initializeApp(firebaseConfig);

const Streamer = () => {
  const [streaming, setStreaming] = useState(false);
  const videoRef = useRef(null);
  const databaseRef = firebase.database().ref();

  const startStreaming = async () => {
    setStreaming(true);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });
    videoRef.current.srcObject = stream;

    const recorder = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp8",
    });
    recorder.ondataavailable = async (event) => {
      if (event.data.size > 0) {
        const fileRef = databaseRef.child(Date.now().toString());
        await fileRef.put(event.data);
        const url = await fileRef.getDownloadURL();
        databaseRef.child(fileRef.key).set(url);
      }
    };
    recorder.start(1000);
  };

  const stopStreaming = () => {
    setStreaming(false);
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted></video>
      {streaming ? (
        <button onClick={stopStreaming}>Stop Streaming</button>
      ) : (
        <button onClick={startStreaming}>Start Streaming</button>
      )}
    </div>
  );
};

const Viewer = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const videoRef = useRef(null);
  const databaseRef = firebase.database().ref();

  databaseRef.on("child_added", (snapshot) => {
    setVideoUrl(window.URL.createObjectURL(snapshot.val()));
  });

  return (
    <div>
      <video ref={videoRef} autoPlay src={videoUrl}></video>
    </div>
  );
};

const LiveVideoComponent = () => {
  const [isStreamer, setIsStreamer] = useState(false);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isStreamer}
          onChange={(event) => setIsStreamer(event.target.checked)}
        />
        Je suis le streamer
      </label>
      {isStreamer ? <Streamer /> : <Viewer />}
    </div>
  );
};

export default LiveVideoComponent;
