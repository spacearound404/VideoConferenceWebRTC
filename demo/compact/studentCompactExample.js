window.onload = function () {
  let student = new GuestVC(); // GuestVC instance

  // handler for button settings
  document.querySelector("#settings").onclick = function (e) {
    $(".modal").modal("show");

    let cameraDevices = student.getCameraDevicesList(),
      soundDevices = student.getSoundDevicesList(),
      microDevices = student.getMicroDevicesList(),
      currentCameraDevice = student.getCurrentCameraDevice(),
      currentSoundDevice = student.getCurrentSoundDevice(),
      currentMicroDevice = student.getCurrentMicroDevice(),
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

    // fill dropdown
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

    // fill dropdown
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

    // fill dropdown
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
        deviceID = student.getCameraDevicesList()[deviceIndexParam].deviceId;
        deviceName = student.getCameraDevicesList()[deviceIndexParam].label;

        student.setCameraDevice(deviceID);

        cameraDDButtonElemHTML.innerHTML = deviceName.substr(0, 10);

        break;
      }
      case 1: {
        // sound
        deviceID = student.getSoundDevicesList()[deviceIndexParam].deviceId;
        deviceName = student.getSoundDevicesList()[deviceIndexParam].label;

        student.setSoundDevice(deviceID);

        soundDDButtonElemHTML.innerHTML = deviceName.substr(0, 10);
        break;
      }
      case 2: {
        // micro
        deviceID = student.getMicroDevicesList()[deviceIndexParam].deviceId;
        deviceName = student.getMicroDevicesList()[deviceIndexParam].label;

        student.setMicroDevice(deviceID);

        microDDButtonElemHTML.innerHTML = deviceName.substr(0, 10);
        break;
      }
    }
  };

  let testDevices = false;

  // handler for button test-devices
  document.querySelector("#test-devices").onclick = () => {
    if (!testDevices) {
      // enable
      document.querySelector("#test-devices").classList.remove("btn-primary");
      document.querySelector("#test-devices").classList.add("btn-danger");
      document.querySelector("#test-devices").innerHTML = "Stop test";

      student.setVideoContainerForTestCamera(
        document.querySelector(".video-test")
      );
      student.startTest();
    } else {
      // disable
      document.querySelector("#test-devices").classList.remove("btn-danger");
      document.querySelector("#test-devices").classList.add("btn-primary");
      document.querySelector("#test-devices").innerHTML = "Start test";

      student.stopTest();
    }

    testDevices = !testDevices;
  };

  let config = {
    instance: student,
    roomIDInput: document.getElementById("validationTooltip01"),
    stream: {
      remote: {
        camera: document.getElementById("teacher-video"),
        screen: document.querySelector("#ssb"),
      },
      local: {
        camera: document.getElementById("student-video"),
      },
    },
    connect: {
      UI: {
        conn: () => {
          document.getElementById("connect").removeAttribute("disabled");
          document.getElementById("connect").classList.add("btn-primary");
          document.getElementById("connect").innerHTML = "Connect";
          document.getElementById("connect").classList.remove("btn-danger");
        },
        disconn: () => {
          document.getElementById("connect").removeAttribute("disabled");
          document.getElementById("connect").classList.remove("btn-primary");
          document.getElementById("connect").innerHTML = "Diconnect";
          document.getElementById("connect").classList.add("btn-danger");
        },
      },
      btn: document.getElementById("connect"),
    },
    msg: {
      modal: document.querySelector(".messages"),
      cssClass: {
        own: "own-message",
        fromGuestToMe: "guest-to-me-message",
        fromOwnerToMe: "owner-to-guest-message",
        fromMeToGuest: "from-me-to-guest-message",
        guests: "guest-to-all-message",
        roomOwner: "owner-to-all-message",
      },
      sendBtn: document.querySelector(".custom-input > svg"),
      input: document.querySelector(".custom-input > input"),
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

        document.querySelector(".overlay-chat").style.display = "none";

        document.querySelector(".chat > svg:nth-child(2)").style.display =
          "block";
        document.querySelector(".chat > svg:nth-child(1)").style.display =
          "none";

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
          ).style.display = "none";
          document.querySelector(
            ".content-view > svg:nth-child(1)"
          ).style.display = "block";

          document.querySelector(".overlay-content-view").style.display =
            "block";
        },
        disable: () => {
          document.querySelector(
            ".content-view > svg:nth-child(2)"
          ).style.display = "block";
          document.querySelector(
            ".content-view > svg:nth-child(1)"
          ).style.display = "none";
          document.querySelector(".overlay-content-view").style.display =
            "none";
        },
      },
    },
    handleCustomEvent: (eventParam) => {
      switch (eventParam.head) {
        case "create_button": {
          document.querySelector(".overlay-content-view").innerHTML =
            eventParam.content;

          break;
        }
      }
    },
  };

  const init = (config) => {
    // define default button control state as variable
    let micro = false,
      camera = false,
      chat = true,
      dashboard = true,
      contentView = false;

    config.controllers.defaultState();

    student.setElementHTMLVideoContainerRemote(
      config.stream.remote.screen, //screen
      config.stream.remote.camera //camera
    );

    // set HTML elems where the own camera will be displayed
    student.setElementHTMLVideoContainerLocal(config.stream.local.camera);

    // set button status when connecting and diconnection
    student.setConnectBtnUI(
      config.connect.UI.conn,
      config.connect.UI.disconn
    );

    config.connect.btn.onclick = function () {
      // check connection status
      if (!student.getUserStatusConnection()) {
        // if disconnect
        let roomID = config.roomIDInput.value;
        student.setRoomID(roomID);
        student.connect();
        student.setUserStatusConnection(true);
      } else {
        // if connect
        student.disconnect();
        student.setUserStatusConnection(false);
      }
    };

    student.setElementHTMLMessages(config.msg.modal);
    student.setClassStyleMsg(config.msg.cssClass);

    student.onMessage((eventParam) => {
      config.handleCustomEvent(eventParam);
    });

    config.controllers.micro.btn.onclick = function () {
      micro = !micro;

      if (micro) {
        // disable
        config.controllers.micro.disable();

        student.microOff();
      } else {
        // enable
        config.controllers.micro.enable();

        student.microOn();
      }
    };

    config.controllers.camera.btn.onclick = function () {
      camera = !camera;
      if (camera) {
        // disable
        config.controllers.camera.disable();

        student.localCameraOff();
      } else {
        // enable
        config.controllers.camera.enable();

        student.localCameraOn();
      }
    };

    config.controllers.chat.btn.onclick = function () {
      if (chat) {
        // disable
        config.controllers.chat.disable();
      } else {
        // enable
        config.controllers.chat.enable();
      }

      chat = !chat;
    };

    config.controllers.dashboard.btn.onclick = function () {
      if (dashboard) {
        // disable
        config.controllers.dashboard.disable();
      } else {
        // enable
        config.controllers.dashboard.enable();
      }
      dashboard = !dashboard;
    };

    config.controllers.contentView.btn.onclick = function () {
      if (contentView) {
        // disable
        config.controllers.contentView.disable();
      } else {
        // enable
        config.controllers.contentView.enable();
      }
      contentView = !contentView;
    };

    config.msg.sendBtn.onclick = function () {
      let input = config.msg.input,
        message = input.value;
      input.value = "";

      if (message.length > 0) {
        if (message.indexOf("@") == -1) {
          student.sendMsg(message);
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

          student.sendMsg(messageWithoutUserID, userTo);
        }
      }
    };

    student.onOpen();
    student.detect2g();
    student.onUserStatusChanged();
    student.onRoomFull();
    student.onStream();
    student.onMediaError();
  };

  init(config);
};
