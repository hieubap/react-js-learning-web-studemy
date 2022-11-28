import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { headers } from "../Common/CommonModal";

const VideoCall = (props) => {
  useEffect(() => {
    const form = document.querySelector("#video-form");
    const videoDiv = document.querySelector("#video-player");
    const videoScreen = document.querySelector("#video-screen");

    const queryParams = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );

    fetch("http://localhost:8800/video/all", {
      headers: headers,
    })
      .then((result) => result.json())
      .then((result) => {
        const myVids = document.querySelector("#your-videos");
        if (result.length > 0) {
          for (let vid of result) {
            const li = document.createElement("LI");
            const link = document.createElement("A");
            link.innerText = vid;
            link.href =
              window.location.origin +
              window.location.pathname +
              "?video=" +
              vid;
            li.appendChild(link);
            myVids.appendChild(li);
          }
        } else {
          myVids.innerHTML = "No videos found";
        }
      });

    if (queryParams.video) {
      videoScreen.src = `http://localhost:8800/video/${queryParams.video}`;
      videoDiv.style.display = "block";
      document.querySelector("#now-playing").innerText =
        "Now playing " + queryParams.video;
    }

    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      let data = new FormData(form);
      fetch("http://localhost:8800/video", {
        method: "POST",
        body: data,
        headers: { Authorization: headers.Authorization },
      })
        .then((result) => result.text())
        .then((_) => {
          //   window.location.reload();
        });
    });
  }, []);
  return (
    <div>
      <div id="video-list">
        <header>
          <h3>Your videos</h3>
        </header>
        <ul id="your-videos"></ul>
      </div>
      <div id="video-player">
        <header>
          <h3 id="now-playing"></h3>
        </header>
        <video id="video-screen" width="720px" height="480px" controls></video>
      </div>

      <form id="video-form">
        <fieldset>
          <legend>Upload a video</legend>
          <label for="file">Video File</label>
          <input id="file" name="file" type="file" accept="application/mp4" />
          <label for="name">Video Name</label>
          <input id="name" name="name" type="text" />
          <button type="submit">Save</button>
        </fieldset>
      </form>
    </div>
  );
};

export default VideoCall;
