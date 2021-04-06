class GuestVC {
  // class constructor
  constructor() {
    this.connection = new RTCMultiConnection(); // instance of RTCMultiConnection lib
    this.connection.socketURL = "https://rtcmulticonnection.herokuapp.com:443/";
    this.connection.session = {
      audio: true, // enabling the local microphone
      video: true, // enabling the local web-camera
      data: true,
    };
    this.connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true, // offer for receiving data from remote microphone
      OfferToReceiveVideo: true, // offer for receiving data from remote web-camera or screen
    };
    this.videoContainerRemote = {
      screen: {
        streamID: "",
        elementHTML: 0,
      },
      camera: {
        streamID: "",
        elementHTML: 0,
      },
    }; // contaner of HTML elems for video streams
    this.videoContainerLocal = {
      // contaner of HTML elems for video streams
      streamID: "",
      elementHTML: 0,
    };
    this.roomID = ""; // room ID
    this.roomCallback = () => { };
    this.user = {
      statusConnection: false, // current user status connection
      name: "", // user name
      id: this.connection.userid, // user ID
      roleName: "guest",
      roleID: 0,
    };

    this.connectBtn = {
      connectCallback: function () { }, // callback to change the status of the connect/disconnect button to connect
      disconnectCallback: function () { }, // callback to change the status of the connect/disconnect button to disconnect
    };
    this.guestAudibility = false;
    this.chat = {
      elementHTML: 0,
      classStyle: {
        own: "",
        fromGuestToMe: "",
        fromOwnerToMe: "",
        fromMeToGuest: "",
        fromMeToOwner: "",
        guests: "",
        roomOwner: "",
      },
      mode: {
        isDirect: true, // can owner send msg to certain guest
        isVisibleForAll: true, // can the owner see the message addressed not to him
      },
    };
    this.devices = {
      micro: {
        id: "",
      },
      sound: {
        id: "",
      },
      camera: {
        id: "",
      },
      microList: "",
      soundList: "",
      cameraList: "",
      testVideoContaner: {
        // container for testing to display camera
        elementHTML: 0,
      },
      isTestingActive: false,
    };
    this.localVideoConstrains = {
      width: 1240,
      height: 720,
      frameRate: 30,
    };

    let tmp = this;

    // when connection will be loaded
    this.connection.DetectRTC.load(function () {
      tmp.devices.cameraList = DetectRTC.videoInputDevices; // get list of video input devices
      tmp.devices.microList = DetectRTC.audioInputDevices; // get list of audio input devices
      tmp.devices.soundList = DetectRTC.audioOutputDevices; // get list of audio output devices

      // if local storage is empty then set default device
      if (tmp.devices.camera.id.length == 0)
        tmp.devices.camera.id = DetectRTC.videoInputDevices[0];

      if (tmp.devices.micro.id.length == 0)
        tmp.devices.micro.id = DetectRTC.audioInputDevices[0];

      if (tmp.devices.sound.id.length == 0)
        tmp.devices.sound.id = DetectRTC.audioOutputDevices[0];
    });

    // if local storage is't empty then get last saved device
    if (
      localStorage.getItem("camera") != null ||
      localStorage.getItem("camera") != undefined
    ) {
      this.devices.camera.id = localStorage.getItem("camera");
    }

    if (
      localStorage.getItem("micro") != null ||
      localStorage.getItem("micro") != undefined
    ) {
      this.devices.micro.id = localStorage.getItem("micro");
    }

    if (
      localStorage.getItem("sound") != null ||
      localStorage.getItem("sound") != undefined
    ) {
      this.devices.sound.id = localStorage.getItem("sound");
    }
  }

  // ---METHODS---

  // set container for testing to display camera
  setVideoContainerForTestCamera(elemHTMLParam) {
    this.devices.testVideoContaner.elementHTML = elemHTMLParam;
  }

  // set camera device
  setCameraDevice(deviceID) {
    this.devices.camera.id = deviceID;

    localStorage.setItem("camera", deviceID);
  }

  // set micro device
  setMicroDevice(deviceID) {
    this.devices.camera.id = deviceID;

    localStorage.setItem("micro", deviceID);
  }

  // set sound device
  setSoundDevice(deviceID) {
    this.devices.sound.id = deviceID;

    localStorage.setItem("sound", deviceID);
  }

  // get micro devices list
  getMicroDevicesList() {
    return this.devices.microList;
  }

  // get camera devices list
  getCameraDevicesList() {
    return this.devices.cameraList;
  }

  // get sound devices list
  getSoundDevicesList() {
    return this.devices.soundList;
  }

  // get current set camera device
  getCurrentCameraDevice() {
    let devices = this.devices.cameraList,
      currentDeviceIDLS = localStorage.getItem("camera"),
      device = devices[0];

    if (currentDeviceIDLS != null || currentDeviceIDLS != undefined)
      for (let i = 0; i < devices.length; i++) {
        if (currentDeviceIDLS == devices[i].deviceId) device = devices[i];
      }

    return device;
  }

  // get current set sound device
  getCurrentSoundDevice() {
    let devices = this.devices.soundList,
      currentDeviceIDLS = localStorage.getItem("sound"),
      device = devices[0];

    if (currentDeviceIDLS != null || currentDeviceIDLS != undefined)
      for (let i = 0; i < devices.length; i++) {
        if (currentDeviceIDLS == devices[i].deviceId) device = devices[i];
      }

    return device;
  }

  // get current micro device
  getCurrentMicroDevice() {
    let devices = this.devices.microList,
      currentDeviceIDLS = localStorage.getItem("micro"),
      device = devices[0];

    if (currentDeviceIDLS != null || currentDeviceIDLS != undefined)
      for (let i = 0; i < devices.length; i++) {
        if (currentDeviceIDLS == devices[i].deviceId) device = devices[i];
      }

    return device;
  }

  // start testing devices
  startTest() {
    this.connection.mediaConstraints = {
      audio: {
        mandatory: {},
        optional: [
          {
            sourceId: this.devices.micro.id,
          },
        ],
      },
      video: {
        mandatory: {},
        optional: [
          {
            sourceId: this.devices.camera.id,
          },
        ],
      },
    };

    if (this.connection.DetectRTC.browser.name === "Firefox") {
      this.connection.mediaConstraints = {
        audio: {
          deviceId: this.devices.micro.id,
        },
        video: {
          deviceId: this.devices.camera.id,
        },
      };
    }

    let tmp = this;

    this.connection.enableScalableBroadcast = true;

    this.devices.isTestingActive = true;

    this.connection.addStream({
      audio: true,
      video: true,
      oneway: true,
      streamCallback: function (stream) { },
    });
  }

  // stop testing devices
  stopTest() {
    this.connection.getAllParticipants().forEach(function (pid) {
      thisAdminVC.connection.disconnectWith(pid);
    });

    // stop all local cameras
    this.connection.attachStreams.forEach(function (localStream) {
      localStream.stop();
    });
  }

  setRoomCallback(callback) {
    this.roomCallback = callback;
  }

  rejoin() {
    this.connection.rejoin(this.roomID);
  }

  // connecting to room
  connect() {
    this.connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true, // offer for receiving data from remote microphone
      OfferToReceiveVideo: true, // offer for receiving data from remote web-camera or screen
    };

    this.connection.mediaConstraints = {
      audio: {
        mandatory: {},
        optional: [
          {
            sourceId: this.devices.micro.id,
          },
        ],
      },
      video: {
        mandatory: {},
        optional: [
          {
            sourceId: this.devices.camera.id,
          },
        ],
      },
    };

    if (this.connection.DetectRTC.browser.name === "Firefox") {
      this.connection.mediaConstraints = {
        audio: {
          deviceId: this.devices.micro.id,
        },
        video: {
          deviceId: this.devices.camera.id,
        },
      };
    }

    let thisGuestVC = this.getInstance();
    thisGuestVC.connection.extra.guest = this.user;

    // join to room
    this.connection.join(this.roomID, function (isRoomJoined, roomid, error) {
      if (error) {
        // change button status connect/disconnect to connect
        thisGuestVC.connectBtn.connectCallback();
        thisGuestVC.user.statusConnection = false;

        if (error === "Room not available") {
          let timerId = setInterval(() => {
            this.rejoin();
          }, 1500);

          setTimeout(() => { clearInterval(timerId); }, 60000);

          this.roomCallback();
          alert(
            "This room does not exist. Please either create it or wait for moderator to enter in the room."
          );
          return;
        }

        // output error
        alert(error);
        return;
      }

      // change button status connect to disconnect
      thisGuestVC.connectBtn.disconnectCallback();

      thisGuestVC.user.statusConnection = true;
    });
  }

  // disconnect from room
  disconnect() {
    // change button status connect/disconnect to connect
    this.connectBtn.connectCallback();
    this.user.statusConnection = false;

    // check and clear contaner of HTML elem for remote web-camera
    if (this.videoContainerRemote.camera.elementHTML.children.length > 0) {
      this.videoContainerRemote.camera.elementHTML.innerHTML = "";
    }

    // check and clear contaner of HTML elem for remote screen
    if (this.videoContainerRemote.screen.elementHTML.children.length > 0) {
      this.videoContainerRemote.screen.elementHTML.innerHTML = "";
    }

    for (let i = 0; i < this.connection.getAllParticipants().length; i++) {
      this.connection.disconnectWith(this.connection.getAllParticipants()[i]);
    }

    let streams = this.connection.streamEvents,
      streamsID = Object.keys(streams),
      streamsLength = streamsID.length;

    for (let i = 0; i < streamsLength; i++) {
      if (streams[streamsID[i]].type == "local") {
        streams[streamsID[i]].stream.stop();
      }
    }

    // close socket.io connection
    this.connection.closeSocket();
  }

  // set elem HTML for display chat
  setElementHTMLMessages(elementHTMLParam) {
    this.chat.elementHTML = elementHTMLParam;
  }

  // set chat mode
  setChatMode(configParam) {
    this.chat.mode = configParam;
  }

  // send message for chat
  sendMsg(msgParam, userToParam = "") {
    let data = {
      userFrom: this.user.id,
      userTo: userToParam,
      role: "guest",
      head: "chat",
      content: msgParam,
    },
      message = "";

    if (msgParam.length > 0) {
      if (this.chat.mode.isDirect && userToParam.length > 0) {
        this.connection.send(data);

        message =
          `
                    <div class='` +
          this.chat.classStyle.fromMeToGuest +
          `'>
                        <div>
                            <span><span>from</span>` +
          this.user.id +
          `</span>
                            <span><span>to</span>` +
          userToParam +
          `</span>
                        </div>
                        <span>` +
          msgParam +
          `</span>
                    </div>
                    `;
        this.chat.elementHTML.innerHTML += message;
      } else {
        this.connection.send(data);

        message =
          `
                    <div class='` +
          this.chat.classStyle.own +
          `'>
                        <span>` +
          this.user.id +
          `</span>
                        <span>` +
          msgParam +
          `</span>
                    </div>
                    `;
        this.chat.elementHTML.innerHTML += message;
      }
    }
  }

  // set classes for styling messages in chat
  setClassStyleMsg(configParam) {
    this.chat.classStyle = configParam;
  }

  // disable/mute microphone
  microOff() {
    this.connection.streamEvents[
      this.connection.attachStreams[0].streamid
    ].stream.mute("audio");
  }

  // enable/unmute microphone
  microOn() {
    this.connection.streamEvents[
      this.connection.attachStreams[0].streamid
    ].stream.unmute("audio");
    this.videoContainerLocal.elementHTML.children[0].muted = true;
  }

  // disable/mute web-camera
  localCameraOff() {
    // this.connection.streamEvents[this.connection.attachStreams[0].streamid].stream.mute("video");
    let data = {
      action: "mute_video",
      streamID: this.connection.attachStreams[0].streamid,
    };
    this.connection.send(data);
    document.getElementById(
      this.connection.attachStreams[0].streamid
    ).style.display = "none";
  }

  // enable/unmute web-camera
  localCameraOn() {
    // this.connection.streamEvents[this.connection.attachStreams[0].streamid].stream.unmute("video");
    let data = {
      action: "unmute_video",
      streamID: this.connection.attachStreams[0].streamid,
    };
    this.connection.send(data);
    document.getElementById(
      this.connection.attachStreams[0].streamid
    ).style.display = "block";
  }

  // set user name
  setUserName(nameParam) {
    this.user.name = nameParam;
  }

  // set user ID
  setUserID(idParam) {
    this.user.id = idParam;
    this.connection.userid = this.user.id;
  }

  // get user ID
  getUserID() {
    return this.connection.userid;
  }

  // set room ID
  setRoomID(roomIDParam) {
    this.roomID = roomIDParam;
  }

  // get users list in room
  getUsersList() {
    let users = [],
      usersLength = Object.keys(this.connection.streamEvents).length,
      tmpUserID = "",
      tmpStreamID = "";

    for (let i = 0; i < usersLength; i++) {
      let tmpKey = Object.keys(this.connection.streamEvents)[i];

      if (
        tmpKey.indexOf("selectFirst") == -1 &&
        tmpKey.indexOf("selectAll") == -1
      ) {
        tmpUserID = this.connection.streamEvents[tmpKey].userid;
        users.push(tmpUserID);
      }
    }

    return users;
  }

  // set user status connection (value is true or false)
  setUserStatusConnection(statusConnectionParam) {
    this.user.statusConnection = statusConnectionParam;
  }

  // get user status connection (value is true or false)
  getUserStatusConnection() {
    return this.user.statusConnection;
  }

  // set video container for streams
  setElementHTMLVideoContainerRemote(
    remoteScreenContainerParam,
    remoteCameraContainerParam
  ) {
    this.videoContainerRemote.screen.elementHTML = remoteScreenContainerParam;
    this.videoContainerRemote.camera.elementHTML = remoteCameraContainerParam;
  }

  setElementHTMLVideoContainerLocal(localCameraContainerParam) {
    this.videoContainerLocal.elementHTML = localCameraContainerParam;
  }

  setContentViewContainer(elementHTML) {
    this.contentView.elementHTML = elementHTML;
  }

  // set callbacks for changing button state
  setConnectBtnUI(connectCallbackParam, disconnectCallbackParam) {
    this.connectBtn.connectCallback = connectCallbackParam;
    this.connectBtn.disconnectCallback = disconnectCallbackParam;
  }

  // get instance
  getInstance() {
    return this;
  }

  // detect 2G
  detect2g() {
    if (
      navigator.connection &&
      navigator.connection.type === "cellular" &&
      navigator.connection.downlinkMax <= 0.115
    ) {
      alert("2G is not supported. Please use a better internet service.");
    }
  }

  // set whether a guest to hear the other guests in room
  setGuestAudibility(boolParam) {
    this.guestAudibility = boolParam;
  }

  // get guest audibility value
  getGuestAudibility() {
    return this.guestAudibility;
  }

  // send some data to guests for display it in content view
  sendDataToContentView(dataParam) {
    let data = {
      head: "",
      content: "",
    };

    data = dataParam;

    this.connection.send(data);
  }

  // set lcaol video constarints
  setLocalVideoConstraints(widthParam, heightParam, frameRateParam) {
    this.localVideoConstrains.width = widthParam;
    this.localVideoConstrains.height = heightParam;
    this.localVideoConstrains.frameRate = frameRateParam;

    this.connection.applyConstraints({
      video: this.localVideoConstrains,
    });
  }

  // ---Events---

  // event changing the user connection status
  onUserStatusChanged() {
    let thisGuestVC = this.getInstance();
    this.connection.onUserStatusChanged = function (status) {
      // if the owner of the room is disconnected then
      console.log(status);
      if (status.status == "offline" && status.extra.user2 != undefined) {
        thisGuestVC.connectBtn.connectCallback();
        thisGuestVC.user.statusConnection = false;

        let streams = thisGuestVC.connection.streamEvents,
          streamsID = Object.keys(streams),
          streamsLength = streamsID.length;

        for (let i = 0; i < streamsLength; i++) {
          if (streams[streamsID[i]].type == "local") {
            streams[streamsID[i]].stream.stop();
          }
        }
      }
    };
  }

  // event for checking whether the room is full when connecting
  onRoomFull() {
    let thisGuestVC = this.getInstance();
    this.connection.onRoomFull = function (roomid) {
      alert("Room is full.");
      thisGuestVC.user.statusConnection = false;
    };
  }

  // stream event
  onStream() {
    let thisGuestVC = this.getInstance();

    this.connection.onstream = function (event) {
      switch (event.type) {
        case "local": {
          if (thisGuestVC.devices.isTestingActive) {
            thisGuestVC.devices.testVideoContaner.elementHTML.appendChild(
              event.mediaElement
            );
            thisGuestVC.devices.testVideoContaner.elementHTML.children[0].muted = false;
            thisGuestVC.devices.testVideoContaner.elementHTML.children[0].volume = 1.0;
          } else {
            // set a video stream in an HTML container
            thisGuestVC.videoContainerLocal.elementHTML.appendChild(
              event.mediaElement
            );
            thisGuestVC.videoContainerLocal.elementHTML.children[0].muted = true;
          }

          break;
        }
        case "remote": {

          if (event.extra.user2 == undefined) {
            if (!thisGuestVC.guestAudibility) {
              event.mediaElement.muted = true;
            }

            delete event.mediaElement;

            let video = document.createElement("video");

            if (!thisGuestVC.guestAudibility) {
              video.muted = true;
            }
            try {
              video.src = URL.createObjectURL(event.stream);
            } catch (err) { }

            break;
          }

          if (event.stream.id == event.extra.streamID) {
            thisGuestVC.videoContainerRemote.screen.elementHTML.innerHTML = "";

            // set a video stream in an HTML container
            thisGuestVC.videoContainerRemote.screen.elementHTML.appendChild(
              event.mediaElement
            );
          } else {
            thisGuestVC.videoContainerRemote.camera.elementHTML.innerHTML = "";

            // set a video stream in an HTML container
            thisGuestVC.videoContainerRemote.camera.elementHTML.appendChild(
              event.mediaElement
            );
          }

          break;
        }
      }
    };
  }

  // error event
  onMediaError() {
    this.connection.onMediaError = function (error) {
      console.log(error);
    };
  }

  // message handler
  onMessage(callback) {
    let thisGuestVC = this.getInstance();

    this.connection.onmessage = function (event) {
      switch (event.data.head) {
        case "chat": {
          if (event.data.role == "owner") {
            if (thisGuestVC.user.id == event.data.userTo) {
              let tmpHTML = thisGuestVC.chat.elementHTML.innerHTML,
                msgHTML =
                  `
                                        <div class='` +
                  thisGuestVC.chat.classStyle.fromOwnerToMe +
                  `'>
                                            <div>
                                                <span><span>from</span>` +
                  event.data.userFrom +
                  `</span>
                                                <span><span>to</span>` +
                  event.data.userTo +
                  `</span>
                                            </div>
                                            <span>` +
                  event.data.content +
                  `</span>
                                        </div>
                                    `;
              thisGuestVC.chat.elementHTML.innerHTML = tmpHTML + msgHTML;

              return;
            } else {
              let tmpHTML = thisGuestVC.chat.elementHTML.innerHTML,
                msgHTML =
                  `
                                        <div class='` +
                  thisGuestVC.chat.classStyle.roomOwner +
                  `'>
                                            <span>` +
                  event.data.userFrom +
                  `</span>
                                            <span>` +
                  event.data.content +
                  `</span>
                                        </div>
                                    `;
              thisGuestVC.chat.elementHTML.innerHTML = tmpHTML + msgHTML;
              return;
            }
          }

          // from guest to guest
          if (thisGuestVC.chat.mode.isDirect && event.data.userTo.length > 0) {
            if (thisGuestVC.user.id == event.data.userTo) {
              let tmpHTML = thisGuestVC.chat.elementHTML.innerHTML,
                msgHTML =
                  `
                                        <div class='` +
                  thisGuestVC.chat.classStyle.fromGuestToMe +
                  `'>
                                            <div>
                                                <span><span>from</span>` +
                  event.data.userFrom +
                  `</span>
                                                <span><span>to</span> ` +
                  event.data.userTo +
                  `</span>
                                            </div>
                                            <span>` +
                  event.data.content +
                  `</span>
                                        </div>
                                    `;
              thisGuestVC.chat.elementHTML.innerHTML = tmpHTML + msgHTML;
              return;
            }
          }

          // from guest to all
          if (thisGuestVC.chat.mode.isVisibleForAll) {
            console.log("tuta1");
            if (event.data.role == "guest") {
              console.log("tuta2");
              let tmpHTML = thisGuestVC.chat.elementHTML.innerHTML,
                msgHTML =
                  `
                                        <div class='` +
                  thisGuestVC.chat.classStyle.guests +
                  `'>
                                            <span>` +
                  event.data.userFrom +
                  `</span>
                                            <span>` +
                  event.data.content +
                  `</span>
                                        </div>
                                    `;
              thisGuestVC.chat.elementHTML.innerHTML = tmpHTML + msgHTML;
            } else {
            }
          }

          break;
        }
        case "change_constraints": {
          thisGuestVC.localVideoConstrains.width =
            event.data.videoConstraints.width;
          thisGuestVC.localVideoConstrains.height =
            event.data.videoConstraints.height;
          thisGuestVC.localVideoConstrains.frameRate =
            event.data.videoConstraints.frameRate;

          thisGuestVC.setLocalVideoConstraints(
            thisGuestVC.localVideoConstrains.width,
            thisGuestVC.localVideoConstrains.height,
            thisGuestVC.localVideoConstrains.frameRate
          );

          break;
        }
      }

      // callback for custom messages
      callback(event.data);
    };
  }

  // event that is triggered when a new member is connected
  onOpen() {
    let thisGuestVC = this.getInstance();

    this.connection.onopen = function (event) { };
  }
}

class AdminVC {
  // class constructor
  constructor() {
    this.connection = new RTCMultiConnection(); // instance of RTCMultiConnection lib
    this.connection.socketURL = "https://rtcmulticonnection.herokuapp.com:443/";
    this.connection.session = {
      audio: true, // enabling the local microphone
      video: true, // enabling the local web-camera
      data: true,
    };
    this.connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true, // offer for receiving data from remote microphone
      OfferToReceiveVideo: true, // offer for receiving data from remote web-camera or screen
    };
    this.videoContainerRemote = []; // array of objects of HTML elems for remote video streams
    this.videoContainerLocal = {
      // object of HTML elem and stream ID for locale video streams
      camera: {
        streamID: "",
        elementHTML: 0,
      },
      screen: {
        streamID: "",
        elementHTML: 0,
      },
    };
    this.roomID = ""; // room ID
    this.roomCallback = () => { };
    this.user = {
      statusConnection: false, // current user status connection
      name: "", // user name
      id: this.connection.userid, // user ID
      roleName: "admin",
      roleID: 1,
    }; // not used yet
    this.guests = []; // not used yet
    this.microIsActive = true;
    this.connectBtn = {
      connectCallback: function () { }, // callback to change the status of the connect/disconnect button to connect
      disconnectCallback: function () { }, // callback to change the status of the connect/disconnect button to disconnect
    };
    this.guestMaxCount = 4; // maximum number of guests per room
    this.connection.maxParticipantsAllowed = this.guestMaxCount;
    this.videoRecording = {
      elementHTML: document.createElement("video"),
      stream: {
        audio: 0,
        screen: 0,
      },
      isActive: false,
      config: {
        type: "video",
        mimeType: "video/webm",
        resolution: {
          width: 1280,
          height: 720,
        },
        frameRate: 30,
        bitrate: 128000,
      },
    };
    this.contentView = {
      elementHTML: 0,
    };
    // chat mode
    this.chat = {
      elementHTML: 0, // for display messages
      classStyle: {
        // class for one msg
        own: "",
        fromGuestToMe: "",
        fromMeToGuest: "",
        fromGuestToGuest: "",
        guests: "",
      },
      mode: {
        isDirect: true, // can guest send msg to certain guest or owner
        isVisibleGuestForOwner: true, // can a guest see other guests' messages
      },
    };

    this.devices = {
      micro: {
        id: "",
      },
      sound: {
        id: "",
      },
      camera: {
        id: "",
      },
      microList: "",
      soundList: "",
      cameraList: "",
      testVideoContaner: {
        // container for testing to display camera
        elementHTML: 0,
      },
      isTestingActive: false,
    };

    this.remoteVideoConstrains = {
      width: 1280,
      height: 720,
      frameRate: 30,
    };

    let tmp = this;

    // when connection will be loaded then
    this.connection.DetectRTC.load(function () {
      tmp.devices.cameraList = DetectRTC.videoInputDevices; // get video input devices
      tmp.devices.microList = DetectRTC.audioInputDevices; // get audio input devices
      tmp.devices.soundList = DetectRTC.audioOutputDevices; // get audio output devices

      // if local storage is empty then get default device
      if (tmp.devices.camera.id.length == 0)
        tmp.devices.camera.id = DetectRTC.videoInputDevices[0];

      if (tmp.devices.micro.id.length == 0)
        tmp.devices.micro.id = DetectRTC.audioInputDevices[0];

      if (tmp.devices.sound.id.length == 0)
        tmp.devices.sound.id = DetectRTC.audioOutputDevices[0];
    });

    // if local storage isn't empty then get device from local storage
    if (
      localStorage.getItem("camera") != null ||
      localStorage.getItem("camera") != undefined
    ) {
      this.devices.camera.id = localStorage.getItem("camera");
    }

    if (
      localStorage.getItem("micro") != null ||
      localStorage.getItem("micro") != undefined
    ) {
      this.devices.micro.id = localStorage.getItem("micro");
    }

    if (
      localStorage.getItem("sound") != null ||
      localStorage.getItem("sound") != undefined
    ) {
      this.devices.sound.id = localStorage.getItem("sound");
    }
  }

  // ---Methods---

  // change remote video constarints
  changeVideoConstraints(widthParam, heightParam, frameRateParam) {
    this.remoteVideoConstrains.width = Number(widthParam);
    this.remoteVideoConstrains.height = Number(heightParam);
    this.remoteVideoConstrains.frameRate = Number(frameRateParam);

    let data = {
      head: "change_constraints",
      videoConstraints: this.remoteVideoConstrains,
    };

    this.connection.send(data);
  }

  // set video container for testing to display camera
  setVideoContainerForTestCamera(elemHTMLParam) {
    this.devices.testVideoContaner.elementHTML = elemHTMLParam;
  }

  // set camera device
  setCameraDevice(deviceID) {
    this.devices.camera.id = deviceID;

    localStorage.setItem("camera", deviceID);
  }

  // set micro device
  setMicroDevice(deviceID) {
    this.devices.camera.id = deviceID;

    localStorage.setItem("micro", deviceID);
  }

  // set sound device
  setSoundDevice(deviceID) {
    this.devices.sound.id = deviceID;

    localStorage.setItem("sound", deviceID);
  }

  // get micro devices list
  getMicroDevicesList() {
    return this.devices.microList;
  }

  // get camera devices list
  getCameraDevicesList() {
    return this.devices.cameraList;
  }

  // get sound devices list
  getSoundDevicesList() {
    return this.devices.soundList;
  }

  // get current camera device
  getCurrentCameraDevice() {
    let devices = this.devices.cameraList,
      currentDeviceIDLS = localStorage.getItem("camera"),
      device = devices[0];

    if (currentDeviceIDLS != null || currentDeviceIDLS != undefined)
      for (let i = 0; i < devices.length; i++) {
        if (currentDeviceIDLS == devices[i].deviceId) device = devices[i];
      }

    return device;
  }

  // get current sound device
  getCurrentSoundDevice() {
    let devices = this.devices.soundList,
      currentDeviceIDLS = localStorage.getItem("sound"),
      device = devices[0];

    if (currentDeviceIDLS != null || currentDeviceIDLS != undefined)
      for (let i = 0; i < devices.length; i++) {
        if (currentDeviceIDLS == devices[i].deviceId) device = devices[i];
      }

    return device;
  }

  // get current micro device
  getCurrentMicroDevice() {
    let devices = this.devices.microList,
      currentDeviceIDLS = localStorage.getItem("micro"),
      device = devices[0];

    if (currentDeviceIDLS != null || currentDeviceIDLS != undefined)
      for (let i = 0; i < devices.length; i++) {
        if (currentDeviceIDLS == devices[i].deviceId) device = devices[i];
      }

    return device;
  }

  // start testing devices
  startTest() {
    this.connection.mediaConstraints = {
      audio: {
        mandatory: {},
        optional: [
          {
            sourceId: this.devices.micro.id,
          },
        ],
      },
      video: {
        mandatory: {},
        optional: [
          {
            sourceId: this.devices.camera.id,
          },
        ],
      },
    };

    if (this.connection.DetectRTC.browser.name === "Firefox") {
      this.connection.mediaConstraints = {
        audio: {
          deviceId: this.devices.micro.id,
        },
        video: {
          deviceId: this.devices.camera.id,
        },
      };
    }

    let tmp = this;

    this.connection.enableScalableBroadcast = true;

    this.devices.isTestingActive = true;

    this.connection.addStream({
      audio: true,
      video: true,
      oneway: true,
      streamCallback: function (stream) { },
    });
  }

  // stop testing devices
  stopTest() {
    this.connection.getAllParticipants().forEach(function (pid) {
      thisAdminVC.connection.disconnectWith(pid);
    });

    // stop all local cameras
    this.connection.attachStreams.forEach(function (localStream) {
      localStream.stop();
    });
  }

  // set chat mode
  setChatMode(configParam) {
    this.chat.mode = configParam;
  }

  // send message for chat
  sendMsg(msgParam, userToParam = "") {
    let data = {
      userFrom: this.user.id,
      userTo: userToParam,
      role: "owner",
      head: "chat",
      content: msgParam,
    },
      message = "";

    if (msgParam.length > 0) {
      if (this.chat.mode.isDirect && userToParam.length > 0) {
        this.connection.send(data);

        message =
          `
                    <div class='` +
          this.chat.classStyle.fromMeToGuest +
          `'>
                        <div>
                            <span><span>from</span>` +
          this.user.id +
          `</span>
                            <span><span>to</span>` +
          userToParam +
          `</span>
                        </div>
                        <span>` +
          msgParam +
          `</span>
                    </div>
                    `;
        this.chat.elementHTML.innerHTML += message;
      } else {
        this.connection.send(data);

        message =
          `
                    <div class='` +
          this.chat.classStyle.own +
          `'>
                        <span>` +
          this.user.id +
          `</span>
                        <span>` +
          msgParam +
          `</span>
                    </div>
                    `;
        this.chat.elementHTML.innerHTML += message;
      }
    }
  }

  // set classes for styling message in chat
  setClassStyleMsg(configParam) {
    this.chat.classStyle = configParam;
  }

  // set elem HTML for display messages
  setElementHTMLMessages(elementHTMLParam) {
    this.chat.elementHTML = elementHTMLParam;
  }

  // set maximum number of guests per room
  setMaxGuestCount(guestCountParam) {
    this.guestMaxCount = guestCountParam;
    this.connection.maxParticipantsAllowed = this.guestMaxCount + 1;
  }

  // set HTML elems for display remote video streams
  setElementsHTMLVideoContainerRemote() {
    if (arguments.length == 1) {
      for (let i = 0; i < arguments[0].length; i++) {
        this.videoContainerRemote.push({
          elementHTML: arguments[0][i],
          isEmpty: true,
        });
      }
    } else {
      for (let i = 0; i < arguments.length; i++) {
        this.videoContainerRemote.push({
          elementHTML: arguments[i],
          isEmpty: true,
        });
      }
    }
  }

  // set HTML elem for display local video stream
  setElementsHTMLVideoContainerLocal(
    localCameraElemHTMLParam,
    localScreenElemHTMLParam
  ) {
    this.videoContainerLocal.camera.elementHTML = localCameraElemHTMLParam;
    this.videoContainerLocal.screen.elementHTML = localScreenElemHTMLParam;
  }

  // set callbacks for changing button state
  setConnectBtnUI(connectCallbackParam, disconnectCallbackParam) {
    this.connectBtn.connectCallback = connectCallbackParam;
    this.connectBtn.disconnectCallback = disconnectCallbackParam;
  }

  // set user status connection (value is true or false)
  setUserStatusConnection(statusConnectionParam) {
    this.user.statusConnection = statusConnectionParam;
  }

  // get user status connection (value is true or false)
  getUserStatusConnection() {
    return this.user.statusConnection;
  }

  setVideoRecordingConfig(param) {
    this.videoRecording.config = param;
  }

  // set room ID
  setRoomID(roomIDParam) {
    this.roomID = roomIDParam;
  }

  // set user ID
  setUserID(idParam) {
    this.user.id = idParam;
    this.connection.userid = this.user.id;
  }

  // get user ID
  getUserID() {
    return this.connection.userid;
  }

  // get users list in room
  getUsersList() {
    let users = [],
      usersLength = Object.keys(this.connection.streamEvents).length,
      tmpUserID = "",
      tmpStreamID = "";

    for (let i = 0; i < usersLength; i++) {
      let tmpKey = Object.keys(this.connection.streamEvents)[i];

      if (
        tmpKey.indexOf("selectFirst") == -1 &&
        tmpKey.indexOf("selectAll") == -1
      ) {
        tmpUserID = this.connection.streamEvents[tmpKey].userid;
        users.push(tmpUserID);
      }
    }

    return users;
  }

  // set user name
  setUserName(nameParam) {
    this.user.name = nameParam;
  }

  // disable/mute microphone
  microOff() {
    // enable micro when connection is active
    try {
      this.connection.streamEvents[
        this.connection.attachStreams[0].streamid
      ].stream.mute("audio");
    } catch (err) { }

    // enable micro for screen recording
    try {
      this.videoRecording.stream.audio
        .getAudioTracks()
        .forEach(function (track) {
          track.enabled = false;
        });
    } catch (err) { }

    this.microIsActive = false;
  }

  // enable/unmute microphone
  microOn() {
    // disable micro when connection is active
    try {
      this.connection.streamEvents[
        this.connection.attachStreams[0].streamid
      ].stream.unmute("audio");
      this.videoContainerLocal.camera.elementHTML.children[0].muted = true;
    } catch (err) { }

    // disable micro for screen recording
    try {
      this.videoRecording.stream.audio
        .getAudioTracks()
        .forEach(function (track) {
          track.enabled = true;
        });
    } catch (err) { }

    this.microIsActive = true;
  }

  // enable screen sharing
  screenShareOn() {
    let thisAdminVC = this.getInstance();

    this.connection.addStream({
      screen: true,
      oneway: true,
      data: true,
      streamCallback: function (stream) {
        for (let i = 0; i < thisAdminVC.connection.attachStreams.length; i++) {
          if (
            thisAdminVC.connection.attachStreams[i].idInstance.indexOf(
              "isScreen"
            ) != -1
          ) {
            let tmpStreamID = thisAdminVC.connection.attachStreams[i].id,
              tmpStream =
                thisAdminVC.connection.streamEvents[tmpStreamID].stream;

            thisAdminVC.connection.addStream(tmpStream);

            thisAdminVC.connection.renegotiate();
          }
        }

        thisAdminVC.connection.extra.streamID = stream.id;

        thisAdminVC.connection.updateExtraData();
        thisAdminVC.videoContainerLocal.screen.elementHTML.appendChild(
          tmpStream
        );
      },
    });
    this.connection.renegotiate();
  }

  // disable screen sharing
  screenShareOff() {
    this.connection.attachStreams.forEach(function (stream) {
      if (stream.idInstance.indexOf("isScreen") != -1) {
        stream.getTracks().forEach((track) => track.stop());
        stream.getTracks().forEach((track) => stream.removeTrack(track));
      }
    });
  }

  // disable/mute web-camera
  localCameraOff() {
    this.connection.streamEvents[
      this.connection.attachStreams[0].streamid
    ].stream.mute("video");
  }

  // enable/unmute web-camera
  localCameraOn() {
    this.connection.streamEvents[
      this.connection.attachStreams[0].streamid
    ].stream.unmute("video");
  }

  // disconnect from room
  disconnect() {
    let thisAdminVC = this;
    // display connect btn status UI
    this.connectBtn.connectCallback();

    // clear all remote HTML elems
    if (this.videoContainerRemote.length == undefined) return;
    for (let i = 0; i < this.videoContainerRemote.length; i++) {
      if (
        this.videoContainerRemote[i].elementHTML.children != undefined &&
        this.videoContainerRemote[i].elementHTML.children.length != 0
      )
        this.videoContainerRemote[i].elementHTML.innerHTML = "";
    }

    // clear own local web-camera HTML elem
    if (this.videoContainerLocal.camera.elementHTML.children.length != 0)
      this.videoContainerLocal.camera.elementHTML.innerHTML = "";

    // clear own local screen HTML elem
    if (this.videoContainerLocal.screen.elementHTML != null)
      if (this.videoContainerLocal.screen.elementHTML.children.length != 0)
        this.videoContainerLocal.screen.elementHTML.innerHTML = "";

    this.connection.getAllParticipants().forEach(function (pid) {
      thisAdminVC.connection.disconnectWith(pid);
    });

    // stop all local cameras
    this.connection.attachStreams.forEach(function (localStream) {
      localStream.stop();
    });

    // close socket.io connection
    this.connection.closeSocket();
  }

  setRoomCallback(callback) {
    this.roomCallback = callback;
  }

  // create room
  connect() {
    this.connection.mediaConstraints = {
      audio: {
        mandatory: {},
        optional: [
          {
            sourceId: this.devices.micro.id,
          },
        ],
      },
      video: {
        mandatory: {},
        optional: [
          {
            sourceId: this.devices.camera.id,
          },
        ],
      },
    };

    if (this.connection.DetectRTC.browser.name === "Firefox") {
      this.connection.mediaConstraints = {
        audio: {
          deviceId: this.devices.micro.id,
        },
        video: {
          deviceId: this.devices.camera.id,
        },
      };
    }

    // save data to extra to send guest in order to could distinguish other guests from the owner/admin
    this.connection.extra = {
      user2: "Admin",
    };

    // create room with defined room id
    this.connection.open(this.roomID);

    // auto close room when admin leave
    this.connection.autoCloseEntireSession = true;

    // updte extra data
    this.connection.updateExtraData();

    // display disconnect status UI
    this.connectBtn.disconnectCallback();
  }

  // detect 2G
  detect2g() {
    if (
      navigator.connection &&
      navigator.connection.type === "cellular" &&
      navigator.connection.downlinkMax <= 0.115
    ) {
      alert("2G is not supported. Please use a better internet service.");
    }
  }

  // get instance
  getInstance() {
    return this;
  }

  invokeGetDisplayMedia(success, error) {
    let displaymediastreamconstraints = {
      video: {
        displaySurface: "monitor", // monitor, window, application, browser
        logicalSurface: true,
        cursor: "always", // never, always, motion
      },
    };

    // above constraints are NOT supported YET
    // that's why overriding them
    displaymediastreamconstraints = {
      video: true,
    };

    if (navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices
        .getDisplayMedia(displaymediastreamconstraints)
        .then(success)
        .catch(error);
    } else {
      navigator
        .getDisplayMedia(displaymediastreamconstraints)
        .then(success)
        .catch(error);
    }
  }

  addStreamStopListener(stream, callback) {
    stream.addEventListener(
      "ended",
      function () {
        callback();
        callback = function () { };
      },
      false
    );
    stream.addEventListener(
      "inactive",
      function () {
        callback();
        callback = function () { };
      },
      false
    );
    stream.getTracks().forEach(function (track) {
      track.addEventListener(
        "ended",
        function () {
          callback();
          callback = function () { };
        },
        false
      );
      track.addEventListener(
        "inactive",
        function () {
          callback();
          callback = function () { };
        },
        false
      );
    });
  }

  captureScreen(callback) {
    let thisAdminVC = this.getInstance();

    this.invokeGetDisplayMedia(
      function (screen) {
        thisAdminVC.addStreamStopListener(screen, function () { });
        callback(screen);
      },
      function (error) {
        console.error(error);
        alert(
          "Unable to capture your screen. Please check console logs.\n" + error
        );
      }
    );
  }

  // enable screen recording
  screenRecordingOn() {
    if (!navigator.getDisplayMedia && !navigator.mediaDevices.getDisplayMedia) {
      let error = "Your browser does NOT support the getDisplayMedia API.";
      alert(error);

      throw new Error(error);
    }

    if (this.microIsActive == false) {
      alert("When screen recorder starting, micro must be turn on");

      return false;
    }

    let thisAdminVC = this;

    this.captureScreen(function (screen) {
      thisAdminVC.videoRecording.elementHTML.srcObject = screen;

      thisAdminVC.videoRecording.isActive = true;

      navigator.mediaDevices
        .getUserMedia({
          video: false,
          audio: thisAdminVC.microIsActive,
        })
        .then((streamMicro) => {
          thisAdminVC.videoRecording.stream.screen = screen;
          thisAdminVC.videoRecording.stream.audio = streamMicro;

          var config = {
            type: thisAdminVC.videoRecording.config.type,
            mimeType: thisAdminVC.videoRecording.config.mimeType,
            frameRate: thisAdminVC.videoRecording.config.frameRate,
            bitrate: thisAdminVC.videoRecording.config.bitrate,
            video: thisAdminVC.videoRecording.config.resolution,
          };

          thisAdminVC.recorder = new MultiStreamRecorder(
            [streamMicro, screen],
            config
          );

          thisAdminVC.recorder.record();

          let streams = thisAdminVC.connection.streamEvents,
            streamsID = Object.keys(streams),
            streamsLength = streamsID.length;

          for (let i = 0; i < streamsLength; i++) {
            if (streams[streamsID[i]].type == "remote") {
              let mixer = thisAdminVC.recorder.getMixer();
              mixer.appendStreamsAudio([streams[streamsID[i]].stream]);
            }
          }

          // release screen on stopRecording
          thisAdminVC.recorder.screen = screen;
        });
    });
  }

  // disable and save screen recording
  screenRecordingOff(callback) {
    let thisAdminVC = this.getInstance();

    if (thisAdminVC.videoRecording.isActive == false) return false;

    thisAdminVC.videoRecording.isActive = false;

    this.recorder.stop(function (blob) {
      var blob = thisAdminVC.recorder.blob;

      callback(blob);

      thisAdminVC.videoRecording.stream.screen.stop(() => { });
    });
  }

  setContentViewContainer(elementHTML) {
    this.contentView.elementHTML = elementHTML;
  }

  // send some data to guests for display it in content view
  sendDataToContentView(dataParam) {
    let data = {
      head: "",
      content: "",
    };

    data = dataParam;

    this.connection.send(data);
  }

  // ---Events---

  // event changing the user connection status
  onUserStatusChanged() {
    let thisAdminVC = this.getInstance();

    this.connection.onUserStatusChanged = function (status) {
      if (status.status == "offline") {
        for (let i = 0; i < thisAdminVC.videoContainerRemote.length; i++) {
          if (thisAdminVC.videoContainerRemote[i].userID == status.userid) {
            thisAdminVC.videoContainerRemote[i].streamID = "";
            thisAdminVC.videoContainerRemote[i].userID = "";

            if (
              thisAdminVC.videoContainerRemote[i].elementHTML.children.length !=
              0
            )
              thisAdminVC.videoContainerRemote[i].elementHTML.innerHTML = "";

            thisAdminVC.videoContainerRemote[i].isEmpty = true;
          }
        }
      }
    };
  }

  // stream event
  onStream() {
    let thisAdminVC = this.getInstance();

    this.connection.onstream = function (event) {
      switch (event.type) {
        // this case for handling incoming remote connections
        case "remote": {        
          for (let i = 0; i < thisAdminVC.videoContainerRemote.length; i++) {
            if (thisAdminVC.videoContainerRemote[i].isEmpty) {
              let tmpBool = false;

              for (
                let j = 0;
                j < thisAdminVC.videoContainerRemote.length;
                j++
              ) {
                if (
                  thisAdminVC.videoContainerRemote[j].userID == event.userid
                ) {
                  tmpBool = true;
                  break;
                }
              }

              if (!tmpBool) {
                thisAdminVC.videoContainerRemote[i].streamID = event.stream.id;
                thisAdminVC.videoContainerRemote[i].userID = event.userid;

                thisAdminVC.videoContainerRemote[i].elementHTML.appendChild(
                  event.mediaElement
                );
                thisAdminVC.videoContainerRemote[i].isEmpty = false;
              }
            }
          }

          if (thisAdminVC.videoRecording.isActive == true) {
            let mixer = thisAdminVC.recorder.getMixer();
            mixer.appendStreamsAudio([event.stream]);
          }

          break;
        }

        // this case for handling local video stream
        case "local": {
          if (event.stream.idInstance.indexOf("isScreen") != -1) {
            thisAdminVC.videoContainerLocal.screen.streamID = event.stream.id;
            thisAdminVC.videoContainerLocal.screen.elementHTML.appendChild(
              event.mediaElement
            );
          } else {
            if (thisAdminVC.devices.isTestingActive) {
              thisAdminVC.devices.testVideoContaner.elementHTML.appendChild(
                event.mediaElement
              );
              thisAdminVC.devices.testVideoContaner.elementHTML.children[0].muted = false;
              thisAdminVC.devices.testVideoContaner.elementHTML.children[0].volume = 1.0;
            } else {
              thisAdminVC.videoContainerLocal.camera.streamID = event.stream.id;
              thisAdminVC.videoContainerLocal.camera.elementHTML.appendChild(
                event.mediaElement
              );
            }
          }

          break;
        }
      }
    };
  }

  // error event
  onMediaError() {
    this.connection.onMediaError = function (error) {
      console.log(error);
    };
  }

  // message event
  onMessage(callback) {
    let thisAdminVC = this.getInstance();

    this.connection.onmessage = function (event) {
      switch (event.data.action) {
        case "mute_video": {
          document.getElementById(event.data.streamID).style.display = "none";

          break;
        }
        case "unmute_video": {
          document.getElementById(event.data.streamID).style.display = "block";
          break;
        }
      }

      switch (event.data.head) {
        case "chat": {
          // from guest to owner
          if (thisAdminVC.user.id == event.data.userTo) {
            let tmpHTML = thisAdminVC.chat.elementHTML.innerHTML,
              msgHTML =
                `
                            <div class='` +
                thisAdminVC.chat.classStyle.fromGuestToMe +
                `'>
                                <div>
                                    <span><span>from</span>` +
                event.data.userFrom +
                `</span>
                                    <span><span>to</span>` +
                event.data.userTo +
                `</span>
                                </div>
                                <span>` +
                event.data.content +
                `</span>
                            </div>
                            `;
            thisAdminVC.chat.elementHTML.innerHTML = tmpHTML + msgHTML;

            return;
          }

          // from guest to all
          if (event.data.userTo.length == 0) {
            let tmpHTML = thisAdminVC.chat.elementHTML.innerHTML,
              msgHTML =
                `
                                    <div class='` +
                thisAdminVC.chat.classStyle.guests +
                `'>
                                        <span>` +
                event.data.userFrom +
                `</span>
                                        <span>` +
                event.data.content +
                `</span>
                                    </div>
                                `;
            thisAdminVC.chat.elementHTML.innerHTML = tmpHTML + msgHTML;
            return;
          }

          //from guest to guset
          if (thisAdminVC.chat.mode.isVisibleGuestForOwner) {
            let tmpHTML = thisAdminVC.chat.elementHTML.innerHTML,
              msgHTML =
                `
                            <div class='` +
                thisAdminVC.chat.classStyle.fromGuestToGuest +
                `'>
                                <div>
                                    <span><span>from</span>` +
                event.data.userFrom +
                `</span>
                                    <span><span>to</span> ` +
                event.data.userTo +
                `</span>
                                </div>
                                <span>` +
                event.data.content +
                `</span>
                            </div>
                            `;

            thisAdminVC.chat.elementHTML.innerHTML = tmpHTML + msgHTML;

            return;
          }
          break;
        }
      }

      callback(event.data);
    };
  }

  onOpen() {
    let thisAdminVC = this.getInstance();

    this.connection.onopen = function (event) {
      console.log(event);
    };
  }
}
