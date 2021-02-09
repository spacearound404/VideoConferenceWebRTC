window.onload = function () {
  let teacher = new AdminVC(); // AdminVC instance

  let config = {
    instance: teacher,
    stream: {
      local: {
        camera: document.getElementById("video-1"),
        screen: document.querySelector(".screen-share-block"),
      },
      remote: {
        camera: [
          document.getElementById("video-2"),
          document.getElementById("video-3"),
          document.getElementById("video-4"),
        ],
      },
    },
    roomIDInput: document.getElementById("validationTooltip01"),
    maxGuestCount: 5,
    connect: {
      btn: document.getElementById("connect"),
      UI: {
        conn: () => {
          // connection
          document.getElementById("connect").removeAttribute("disabled");
          document.getElementById("connect").classList.add("btn-primary");
          document.getElementById("connect").innerHTML = "Connect";
          document.getElementById("connect").classList.remove("btn-danger");
        },
        diconn: () => {
          // disconnection
          document.getElementById("connect").removeAttribute("disabled");
          document.getElementById("connect").classList.remove("btn-primary");
          document.getElementById("connect").innerHTML = "Disconnect";
          document.getElementById("connect").classList.add("btn-danger");
        },
      },
    },
    msg: {
      modal: document.querySelector(".overlay-chat"),
      sendBtn: document.querySelector(".custom-input > svg"),
      input: document.querySelector(".custom-input > input"),
      css: {
        own: "own-message",
        fromGuestToMe: "guest-to-me-owner-message",
        fromMeToGuest: "me-owner-to-guest-message",
        fromGuestToGuest: "guest-to-guest-message-owner",
        guests: "guest-to-all-message",
      },
      handler: (event) => {},
    },
    contentView: {
      sendBtn: document.querySelector("#example-send-data-btn"),
      handler: () => {
        let eventHead = "create_button",
          data = {
            head: eventHead,
            content:
              '<button id="example-send-data-btn" class="btn btn-primary w-25" type="button" aria-disabled="false" autocomplete="off">Send</button>',
          };
        // send some content to guests
        teacher.sendDataToContentView(data);
      },
    },
    controllers: {
      defaultState: () => {
        document.querySelector(".micro > svg:nth-child(1)").style.display =
          "block";
        document.querySelector(".micro > svg:nth-child(2)").style.display =
          "none";

        document.querySelector(".camera > svg:nth-child(1)").style.display =
          "block";
        document.querySelector(".camera > svg:nth-child(2)").style.display =
          "none";

        document.querySelector(
          ".screen-share > svg:nth-child(2)"
        ).style.display = "block";
        document.querySelector(
          ".screen-share > svg:nth-child(1)"
        ).style.display = "none";

        document.querySelector(".overlay-chat").style.display = "none";

        document.querySelector(".chat > svg:nth-child(2)").style.display =
          "block";
        document.querySelector(".chat > svg:nth-child(1)").style.display =
          "none";

        document.querySelector(
          ".screen-recording > svg:nth-child(2)"
        ).style.display = "block";
        document.querySelector(
          ".screen-recording > svg:nth-child(1)"
        ).style.display = "none";

        document.querySelector(".dashboard > svg:nth-child(1)").style.display =
          "block";
        document.querySelector(".dashboard > svg:nth-child(2)").style.display =
          "none";

        document.querySelector(
          ".content-view > svg:nth-child(1)"
        ).style.display = "block";
        document.querySelector(
          ".content-view > svg:nth-child(2)"
        ).style.display = "none";

        setTimeout(() => {
          document.querySelector(".dashboard").click();
        }, 1000);
      },
      micro: {
        btn: document.querySelector(".micro"),
        enable: () => {
          document.querySelector(".micro > svg:nth-child(2)").style.display =
            "none";
          document.querySelector(".micro > svg:nth-child(1)").style.display =
            "block";
        },
        disable: () => {
          document.querySelector(".micro > svg:nth-child(2)").style.display =
            "block";
          document.querySelector(".micro > svg:nth-child(1)").style.display =
            "none";
        },
      },
      camera: {
        btn: document.querySelector(".camera"),
        enable: () => {
          document.querySelector(".camera > svg:nth-child(2)").style.display =
            "none";
          document.querySelector(".camera > svg:nth-child(1)").style.display =
            "block";
        },
        disable: () => {
          document.querySelector(".camera > svg:nth-child(2)").style.display =
            "block";
          document.querySelector(".camera > svg:nth-child(1)").style.display =
            "none";
        },
      },
      chat: {
        btn: document.querySelector(".chat"),
        enable: () => {
          document.querySelector(".chat > svg:nth-child(1)").style.display =
            "none";
          document.querySelector(".chat > svg:nth-child(2)").style.display =
            "block";

          document.querySelector(".overlay-chat").style.display = "none";
        },
        disable: () => {
          document.querySelector(".chat > svg:nth-child(1)").style.display =
            "block";
          document.querySelector(".chat > svg:nth-child(2)").style.display =
            "none";

          document.querySelector(".overlay-chat").style.display = "block";
        },
      },
      screenShare: {
        btn: document.querySelector(".screen-share"),
        enable: () => {
          document.querySelector(
            ".screen-share > svg:nth-child(2)"
          ).style.display = "none";
          document.querySelector(
            ".screen-share > svg:nth-child(1)"
          ).style.display = "block";
        },
        disable: () => {
          document.querySelector(
            ".screen-share > svg:nth-child(2)"
          ).style.display = "block";
          document.querySelector(
            ".screen-share > svg:nth-child(1)"
          ).style.display = "none";
        },
      },
      screenRecord: {
        btn: document.querySelector(".screen-recording"),
        enable: () => {
          document.querySelector(
            ".screen-recording > svg:nth-child(2)"
          ).style.display = "none";
          document.querySelector(
            ".screen-recording > svg:nth-child(1)"
          ).style.display = "block";
        },
        disable: () => {
          document.querySelector(
            ".screen-recording > svg:nth-child(2)"
          ).style.display = "block";
          document.querySelector(
            ".screen-recording > svg:nth-child(1)"
          ).style.display = "none";
        },
      },
      dashboard: {
        btn: document.querySelector(".dashboard"),
        enable: () => {
          document.querySelector(
            ".dashboard > svg:nth-child(2)"
          ).style.display = "none";
          document.querySelector(
            ".dashboard > svg:nth-child(1)"
          ).style.display = "block";

          document.querySelector(".overlay-dashboard").style.display = "block";
        },
        disable: () => {
          document.querySelector(
            ".dashboard > svg:nth-child(2)"
          ).style.display = "block";
          document.querySelector(
            ".dashboard > svg:nth-child(1)"
          ).style.display = "none";
          document.querySelector(".overlay-dashboard").style.display = "none";
        },
      },
      contentView: {
        btn: document.querySelector(".content-view"),
        enable: () => {
          document.querySelector(
            ".content-view > svg:nth-child(2)"
          ).style.display = "block";
          document.querySelector(
            ".content-view > svg:nth-child(1)"
          ).style.display = "none";

          document.querySelector(".overlay-content-view").style.display =
            "block";
        },
        disable: () => {
          document.querySelector(
            ".content-view > svg:nth-child(2)"
          ).style.display = "none";
          document.querySelector(
            ".content-view > svg:nth-child(1)"
          ).style.display = "block";

          document.querySelector(".overlay-content-view").style.display =
            "none";
        },
      },
    },
  };

  const init = (config) => {
    // define default button control state as variable
    let micro = false,
      camera = false,
      chat = true,
      screen_share = false,
      screen_record = false,
      dashboard = true,
      contentView = false;
  
    // set HTML elems where the own camera and screen will be displayed
    teacher.setElementsHTMLVideoContainerLocal(
      config.stream.local.camera, // camera
      config.stream.local.screen
    ); //screen
  
    // set HTML elems where the guest camera will be displayed
    teacher.setElementsHTMLVideoContainerRemote(config.stream.remote.camera);

    config.controllers.defaultState();
  
    // set button status when connecting and diconnection
    teacher.setConnectBtnUI(config.connect.UI.conn, config.connect.UI.diconn);
  
    // handler button click for connection/diconnectiong
    config.connect.btn.onclick = function() {
      // check connection status
      if (!teacher.getUserStatusConnection()) {
        // if disconnect
        let roomID = config.roomIDInput.value;
        teacher.setRoomID(roomID);
        teacher.setMaxGuestCount(config.maxGuestCount);
        teacher.connect();
        teacher.setUserStatusConnection(true);
      } else {
        // if connect
        teacher.setUserStatusConnection(false);
        teacher.disconnect();
      }
    };
  
    teacher.setElementHTMLMessages(config.msg.modal);
  
    teacher.setClassStyleMsg(config.msg.css);
  
    config.contentView.sendBtn.onclick = config.contentView.handler;
  
    // handler button for micro
    config.controllers.micro.btn.onclick = function() {
      micro = !micro;
      if (micro) {
        // disable
        config.controllers.micro.disable();
  
        teacher.microOff();
      } else {
        // enable
        config.controllers.micro.enable();
  
        teacher.microOn();
      }
    };
  
    // handler button for camera
    config.controllers.camera.btn.onclick = function() {
      camera = !camera;
      if (camera) {
        // disable
        config.controllers.camera.disable();
  
        teacher.localCameraOff();
      } else {
        // enabale
        config.controllers.camera.enable();
  
        teacher.localCameraOn();
      }
    };
  
    // handler button for chat
    config.controllers.chat.btn.onclick = function() {
      if (chat) {
        // disable
        config.controllers.chat.disable();
      } else {
        // enable
        config.controllers.chat.enable();
      }
  
      chat = !chat;
    };
  
    // handler button for screen sharing
    config.controllers.screenShare.btn.onclick = function() {
      if (screen_share) {
        // disable
        config.controllers.screenShare.disable();
  
        teacher.screenShareOff();
      } else {
        // enbale
        config.controllers.screenShare.enable();
  
        teacher.screenShareOn();
      }
  
      screen_share = !screen_share;
    };
  
    // handler button for screen recording
    config.controllers.screenRecord.btn.onclick = function() {
      if (screen_record) {
        // disable
        let result = teacher.screenRecordingOff(function (blobParam) {
          zip.workerScriptsPath = "../libs/";
  
          function zipBlob(filename, blob, callback) {
            // use a zip.BlobWriter object to write zipped data into a Blob object
            zip.createWriter(
              new zip.BlobWriter("application/zip"),
              function (zipWriter) {
                // use a BlobReader object to read the data stored into blob variable
                zipWriter.add(filename, new zip.BlobReader(blob), function () {
                  // close the writer and calls callback function
                  zipWriter.close(callback);
                });
              },
              onerror
            );
          }
          // create zip file
          zipBlob("video.webm", blobParam, (zippedBlob) => {
            // download zip for test
            let link = document.createElement("a");
            link.download = "archive.zip";
            link.href = URL.createObjectURL(zippedBlob);
            link.click();
            URL.revokeObjectURL(link.href);
          });
        });
  
        if (result != false) {
          config.controllers.screenRecord.disable();
          screen_record = !screen_record;
        }
      } else {
        // enable
        let result = teacher.screenRecordingOn();
        if (result != false) {
          config.controllers.screenRecord.enable();
          screen_record = !screen_record;
        }
      }
    };
  
    // handler button for dashboard
    config.controllers.dashboard.onclick = function() {
      if (dashboard) {
        // disable
        config.controllers.dashboard.disable();
  
        // teacher.screenRecordingOff();
      } else {
        // enable
        config.controllers.dashboard.enable();
  
        // teacher.screenRecordingOn();
      }
      dashboard = !dashboard;
    };
  
    // handler button for content view
    config.controllers.contentView.onclick = function() {
      if (contentView) {
        // disable
        config.controllers.contentView.disable();
      } else {
        // enable
        config.controllers.contentView.enable();
      }
      contentView = !contentView;
    };
  
    // handler button for chat
    config.msg.sendBtn.onclick = function() {
      let input = config.msg.input,
        message = input.value;
      input.value = "";
  
      if (message.length > 0) {
        if (message.indexOf("@") == -1) {
          teacher.sendMsg(message);
        } else {
          let startIndex = message.indexOf("@"),
            userToArray = [],
            userTo = "",
            messageWithoutUserID = "";
  
          for (let i = startIndex, j = 0; i < message.length; i++) {
            if (message[i] == " ") {
              break;
            } else {
              userToArray[j] = message[i];
              j++;
            }
          }
  
          userTo = userToArray.join("").replace("@", "");
          messageWithoutUserID = message
            .replace(userTo, "")
            .trim()
            .replace("@", "");
  
          teacher.sendMsg(messageWithoutUserID, userTo);
        }
      }
    };
  
    // handler for all messages
    teacher.onMessage((eventParam) => {});
    teacher.onOpen();
    teacher.detect2g();
    teacher.onUserStatusChanged();
    teacher.onStream();
    teacher.onMediaError();
  };

  init(config);

  document.querySelector("#settings").onclick = function (e) {
    $(".modal").modal("show");

    let cameraDevices = teacher.getCameraDevicesList(),
      soundDevices = teacher.getSoundDevicesList(),
      microDevices = teacher.getMicroDevicesList(),
      currentCameraDevice = teacher.getCurrentCameraDevice(),
      currentSoundDevice = teacher.getCurrentSoundDevice(),
      currentMicroDevice = teacher.getCurrentMicroDevice(),
      cameraDropDownElemHTML = document.querySelector(".dm-1"),
      soundDropDownElemHTML = document.querySelector(".dm-2"),
      microDropDownElemHTML = document.querySelector(".dm-3"),
      cameraDDButtonElemHTML = document.querySelector("#dropdownMenu2"),
      soundDDButtonElemHTML = document.querySelector("#dropdownMenu3"),
      microDDButtonElemHTML = document.querySelector("#dropdownMenu4"),
      button = "";

    cameraDropDownElemHTML.innerHTML = "";
    soundDropDownElemHTML.innerHTML = "";
    microDropDownElemHTML.innerHTML = "";

    for (let i = 0; i < cameraDevices.length; i++) {
      button =
        '<button class="dropdown-item" type="button" onclick="setDevice(' +
        0 +
        "," +
        i +
        ')">' +
        cameraDevices[i].label +
        "</button>";
      cameraDropDownElemHTML.innerHTML += button;
    }

    for (let i = 0; i < soundDevices.length; i++) {
      button =
        '<button class="dropdown-item" type="button" onclick="setDevice(' +
        1 +
        "," +
        i +
        ')">' +
        soundDevices[i].label +
        "</button>";
      soundDropDownElemHTML.innerHTML += button;
    }

    for (let i = 0; i < microDevices.length; i++) {
      button =
        '<button class="dropdown-item" type="button" onclick="setDevice(' +
        2 +
        "," +
        i +
        ')">' +
        microDevices[i].label +
        "</button>";
      microDropDownElemHTML.innerHTML += button;
    }

    cameraDDButtonElemHTML.innerHTML = currentCameraDevice.label.substr(0, 10);
    soundDDButtonElemHTML.innerHTML = currentSoundDevice.label.substr(0, 10);
    microDDButtonElemHTML.innerHTML = currentMicroDevice.label.substr(0, 10);
    // console.log(teacher.devices);
  };

  window.setDevice = (deviceType, deviceIndexParam) => {
    let deviceID = "",
      deviceName = "",
      cameraDDButtonElemHTML = document.querySelector("#dropdownMenu2"),
      soundDDButtonElemHTML = document.querySelector("#dropdownMenu3"),
      microDDButtonElemHTML = document.querySelector("#dropdownMenu4");

    switch (deviceType) {
      case 0: {
        // camera
        deviceID = teacher.getCameraDevicesList()[deviceIndexParam].deviceId;
        deviceName = teacher.getCameraDevicesList()[deviceIndexParam].label;

        teacher.setCameraDevice(deviceID);

        cameraDDButtonElemHTML.innerHTML = deviceName.substr(0, 10);

        break;
      }
      case 1: {
        // sound
        deviceID = teacher.getSoundDevicesList()[deviceIndexParam].deviceId;
        deviceName = teacher.getSoundDevicesList()[deviceIndexParam].label;

        teacher.setSoundDevice(deviceID);

        soundDDButtonElemHTML.innerHTML = deviceName.substr(0, 10);
        break;
      }
      case 2: {
        // micro
        deviceID = teacher.getMicroDevicesList()[deviceIndexParam].deviceId;
        deviceName = teacher.getMicroDevicesList()[deviceIndexParam].label;

        teacher.setMicroDevice(deviceID);

        microDDButtonElemHTML.innerHTML = deviceName.substr(0, 10);
        break;
      }
    }
  };

  let testDevices = false;

  document.querySelector("#test-devices").onclick = () => {
    if (!testDevices) {
      document.querySelector("#test-devices").classList.remove("btn-primary");
      document.querySelector("#test-devices").classList.add("btn-danger");
      document.querySelector("#test-devices").innerHTML = "Stop test";

      teacher.setVideoContainerForTestCamera(
        document.querySelector(".video-test")
      );
      teacher.startTest();
    } else {
      document.querySelector("#test-devices").classList.remove("btn-danger");
      document.querySelector("#test-devices").classList.add("btn-primary");
      document.querySelector("#test-devices").innerHTML = "Start test";

      teacher.stopTest();
    }

    testDevices = !testDevices;
  };

  document.querySelector("#formControlRange").onchange = () => {
    let elem = document.querySelector("#formControlRange"),
      value = elem.value;

    if (value <= 25) {
      elem.value = 0;
      teacher.changeVideoConstraints(100, 100, 10);
    }

    if (value > 25 && value <= 75) {
      elem.value = 50;
      teacher.changeVideoConstraints(640, 480, 15);
    }

    if (value > 70 && value <= 100) {
      elem.value = 100;
      teacher.changeVideoConstraints(1280, 720, 30);
    }
  };

  document.querySelector(".apply-resolution").onclick = () => {
    let widthElem = document.querySelector("#remoteVideoWidth"),
      heightElem = document.querySelector("#remoteVideoHeight"),
      frameRateElem = document.querySelector("#remoteVideoFramerate"),
      widthValue = widthElem.value,
      heightValue = heightElem.value,
      frameRateValue = frameRateElem.value;

    teacher.changeVideoConstraints(widthValue, heightValue, frameRateValue);
  };

};
