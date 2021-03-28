let testDevices = false;
// let roomID = 0;
let connection = new RTCMultiConnection();
let remoteContainers = document.querySelectorAll(".remote-container");

connection.socketURL = "https://rtcmulticonnection.herokuapp.com:443/";
connection.session = {
    audio: false, // enabling the local microphone
    video: false, // enabling the local web-camera
    data: true,
};

connection.dontCaptureUserMedia = true;

// document.querySelector("#settings").onclick = function (e) {
//   $(".modal").modal("show");
// };

const connect = (roomID, btn) => {
    // check connection status
    if (btn.innerHTML == "Connect") {
        // if disconnect

        connection.sdpConstraints.mandatory = {
          OfferToReceiveAudio: true, // offer for receiving data from remote microphone
          OfferToReceiveVideo: true, // offer for receiving data from remote web-camera or screen
        };

        // join to room
        connection.join(roomID, function (isRoomJoined, roomid, error) {
          console.log(isRoomJoined);
          if (error) {
            // change button status connect/disconnect to connect
            if (error === "Room not available") {
                alert(
                    "This room does not exist. Please either create it or wait for moderator to enter in the room."
              );
              return;
            }

            // output error
            alert(error);
            return;
          }
        });


      let allConnectBtn = document.querySelectorAll(".connect");
    
        for (let i = 0; i < allConnectBtn.length; i++) {
            allConnectBtn[i].removeAttribute("disabled");
            allConnectBtn[i].classList.add("btn-primary");
            allConnectBtn[i].innerHTML = "Connect";
            allConnectBtn[i].classList.remove("btn-danger");
        }

      btn.removeAttribute("disabled");
      btn.classList.remove("btn-primary");
      btn.innerHTML = "Diconnect";
      btn.classList.add("btn-danger");

    } else {

      for (let i = 0; i < remoteContainers.length; i++) {
        let element = remoteContainers[i];        
        element.innerHTML = "";
      }
      
      for (let i = 0; i < connection.getAllParticipants().length; i++) {
        connection.disconnectWith(connection.getAllParticipants()[i]);
      }
  
      let streams = connection.streamEvents,
        streamsID = Object.keys(streams),
        streamsLength = streamsID.length;
  
      for (let i = 0; i < streamsLength; i++) {
        if (streams[streamsID[i]].type == "local") {
          streams[streamsID[i]].stream.stop();
        }
      }

      connection.closeSocket();

      btn.removeAttribute("disabled");
      btn.classList.add("btn-primary");
      btn.innerHTML = "Connect";
      btn.classList.remove("btn-danger");

    }

}


connection.onstream = function (event) {
      console.log(124);
      switch (event.type) {
        case "remote": {

          for (let i = 0; i < 5; i++) {
            if (remoteContainers[i].children.length == 0) {
              remoteContainers[i].appendChild(
                event.mediaElement
              );

              break;
            }
          }
          break;
        }
      }
    };

