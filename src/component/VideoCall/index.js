import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { headers } from "../Common/CommonModal";
import { storeFirebase } from "../../firebase";

var name;
var connectedUser;

var yourConn;
var stream;
var conn;

const VideoCall = (props) => {
  useEffect(() => {
    //our username

    //connecting to our signaling server
    conn = new WebSocket("wss://" + storeFirebase.videoCallApi);

    conn.onopen = function () {
      console.log("Connected to the signaling server");
    };

    //when we got a message from a signaling server
    conn.onmessage = function (msg) {
      console.log("Got message", msg.data);

      var data = JSON.parse(msg.data);

      switch (data.type) {
        case "login":
          handleLogin(data.success);
          break;
        //when somebody wants to call us
        case "offer":
          handleOffer(data.offer, data.name);
          break;
        case "answer":
          handleAnswer(data.answer);
          break;
        //when a remote peer sends an ice candidate to us
        case "candidate":
          handleCandidate(data.candidate);
          break;
        case "leave":
          handleLeave();
          break;
        default:
          break;
      }
    };

    conn.onerror = function (err) {
      console.log("Got error", err);
    };

    //alias for sending JSON encoded messages
    function send(message) {
      //attach the other peer username to our messages
      if (connectedUser) {
        message.name = connectedUser;
      }

      conn.send(JSON.stringify(message));
    }

    var loginPage = document.querySelector("#loginPage");
    var usernameInput = document.querySelector("#usernameInput");
    var loginBtn = document.querySelector("#loginBtn");

    var callPage = document.querySelector("#callPage");
    var callToUsernameInput = document.querySelector("#callToUsernameInput");
    var callBtn = document.querySelector("#callBtn");

    var hangUpBtn = document.querySelector("#hangUpBtn");

    //hide call page
    callPage.style.display = "none";

    // Login when the user clicks the button
    loginBtn.addEventListener("click", function (event) {
      name = usernameInput.value;

      if (name.length > 0) {
        send({
          type: "login",
          name: name,
        });
      }
    });

    function handleLogin(success) {
      if (success === false) {
        alert("Ooops...try a different username");
      } else {
        loginPage.style.display = "none";
        callPage.style.display = "block";

        //**********************
        //Starting a peer connection
        //**********************

        //getting local video stream
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(
          function (myStream) {
            stream = myStream;

            //displaying local video stream on the page
            localVideo.srcObject = stream;

            //using Google public stun server
            var configuration = {
              iceServers: [{ url: "stun:stun2.1.google.com:19302" }],
            };

            yourConn = new RTCPeerConnection(configuration);

            // setup stream listening
            yourConn.addStream(stream);

            //when a remote user adds stream to the peer connection, we display it
            yourConn.onaddstream = function (e) {
              remoteVideo.srcObject = e.stream;
            };

            // Setup ice handling
            yourConn.onicecandidate = function (event) {
              if (event.candidate) {
                send({
                  type: "candidate",
                  candidate: event.candidate,
                });
              }
            };
          },
          function (error) {
            console.log(error);
          }
        );
      }
    }

    var localVideo = document.querySelector("#localVideo");
    var remoteVideo = document.querySelector("#remoteVideo");

    callBtn.addEventListener("click", function () {
      var callToUsername = callToUsernameInput.value;

      if (callToUsername.length > 0) {
        connectedUser = callToUsername;

        // create an offer
        yourConn.createOffer(
          function (offer) {
            send({
              type: "offer",
              offer: offer,
            });

            yourConn.setLocalDescription(offer);
          },
          function (error) {
            alert("Error when creating an offer");
          }
        );
      }
    });

    //when somebody sends us an offer
    function handleOffer(offer, name) {
      connectedUser = name;
      yourConn.setRemoteDescription(new RTCSessionDescription(offer));

      //create an answer to an offer
      yourConn.createAnswer(
        function (answer) {
          yourConn.setLocalDescription(answer);

          send({
            type: "answer",
            answer: answer,
          });
        },
        function (error) {
          alert("Error when creating an answer");
        }
      );
    }

    //when we got an answer from a remote user
    function handleAnswer(answer) {
      yourConn.setRemoteDescription(new RTCSessionDescription(answer));
    }

    //when we got an ice candidate from a remote user
    function handleCandidate(candidate) {
      yourConn.addIceCandidate(new RTCIceCandidate(candidate));
    }
    hangUpBtn.addEventListener("click", function () {
      send({
        type: "leave",
      });

      handleLeave();
    });

    function handleLeave() {
      connectedUser = null;
      remoteVideo.srcObject = null;

      yourConn.close();
      yourConn.onicecandidate = null;
      yourConn.onaddstream = null;
    }
  }, []);

  return (
    <div>
      <div id="loginPage" className="container text-center">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <h2>WebRTC Video Demo. Please sign in</h2>
            <label htmlFor="usernameInput" className="sr-only">
              Login
            </label>
            <input
              type="email"
              id="usernameInput"
              className="form-control formgroup"
              placeholder="Login"
              required=""
              autoFocus=""
            />
            <button id="loginBtn" className="btn btn-lg btn-primary btnblock">
              Sign in
            </button>
          </div>
        </div>
      </div>

      <div id="callPage" className="call-page">
        <video
          width="600px"
          height="400px"
          id="localVideo"
          autoPlay
          playsInline
        ></video>
        <video
          id="remoteVideo"
          width="600px"
          height="400px"
          autoPlay
          playsInline
        ></video>

        <div className="row text-center">
          <div className="col-md-12">
            <input
              id="callToUsernameInput"
              type="text"
              placeholder="username to call"
            />
            <button id="callBtn" className="btn-success btn">
              Call
            </button>
            <button id="hangUpBtn" className="btn-danger btn">
              Hang Up
            </button>
            <button
              id="hangUpBtn"
              className="btn-danger btn"
              onClick={() => {
                conn.send(
                  JSON.stringify({
                    type: "clear",
                  })
                );
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
