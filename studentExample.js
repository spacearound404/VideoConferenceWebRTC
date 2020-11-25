let student = new GuestVC(), // GuestVC instance
    roomIDElem = document.getElementById('validationTooltip01'); // input with room ID

// ussing default button control state (definition below)
defaultControlState();

// set HTML elems where the admin camera and screen will be displayed
student.setElementHTMLVideoContainerRemote(document.querySelector("#ssb"), //screen
                                           document.getElementById('teacher-video')); //camera

// set HTML elems where the own camera will be displayed
student.setElementHTMLVideoContainerLocal(document.getElementById('student-video'));

// set button status when connecting and diconnection
student.setConnectBtnUI(function() {
    // connection
    document.getElementById('connect').removeAttribute("disabled");
    document.getElementById('connect').classList.add("btn-primary");
    document.getElementById('connect').innerHTML = "Подключиться";
    document.getElementById('connect').classList.remove("btn-danger");
},
function() {
    // disconnection
    document.getElementById('connect').removeAttribute("disabled");
    document.getElementById('connect').classList.remove("btn-primary");
    document.getElementById('connect').innerHTML = "Отключиться";
    document.getElementById('connect').classList.add("btn-danger");
});

// handler button click for connection/diconnectiong
document.getElementById('connect').onclick = function() {
    // check connection status
    if(!student.getUserStatusConnection()) {
        // if disconnect
        let roomID = roomIDElem.value;
        student.setRoomID(roomID);
        student.connect();
    } else {
        // if connect
        student.disconnect();
    }

}

// set default handler for webrtc class
student.onUserStatusChanged();
student.onRoomFull();
student.onStream();
student.onMediaError();

// define default button control state
function defaultControlState() {
    document.querySelector('.micro > svg:nth-child(1)').style.display = "block";
    document.querySelector('.micro > svg:nth-child(2)').style.display = "none";

    document.querySelector('.camera > svg:nth-child(1)').style.display = "block";
    document.querySelector('.camera > svg:nth-child(2)').style.display = "none";

    document.querySelector('.overlay-chat').style.display = "none";

    document.querySelector('.chat > svg:nth-child(2)').style.display = "block";
    document.querySelector('.chat > svg:nth-child(1)').style.display = "none";
}

// define default button control state as variable
let micro = false,
    camera = false,
    chat = true;

// handler button for micro
document.querySelector('.micro').onclick = function(e){
    micro = !micro;
    if (micro) {

        // disable
        document.querySelector('.micro > svg:nth-child(2)').style.display = "block";
        document.querySelector('.micro > svg:nth-child(1)').style.display = "none";

        student.microOff();
    } else {

        // enable
        document.querySelector('.micro > svg:nth-child(2)').style.display = "none";
        document.querySelector('.micro > svg:nth-child(1)').style.display = "block";

        student.microOn();
    }

}

// handler button for camera
document.querySelector('.camera').onclick = function(e){
    camera = !camera;
    if (camera) {

        // disable
        document.querySelector('.camera > svg:nth-child(2)').style.display = "block";
        document.querySelector('.camera > svg:nth-child(1)').style.display = "none";

        student.localCameraOff();

    } else {

        // enable
        document.querySelector('.camera > svg:nth-child(2)').style.display = "none";
        document.querySelector('.camera > svg:nth-child(1)').style.display = "block";

        student.localCameraOn();

    }

}

// handler button for chat
document.querySelector('.chat').onclick = function(e){
    if (chat) {

        // disable
        document.querySelector('.chat > svg:nth-child(1)').style.display = "block";
        document.querySelector('.chat > svg:nth-child(2)').style.display = "none";

        document.querySelector('.overlay-chat').style.display = "block";
    } else {

        // enable
        document.querySelector('.chat > svg:nth-child(1)').style.display = "none";
        document.querySelector('.chat > svg:nth-child(2)').style.display = "block";

        document.querySelector('.overlay-chat').style.display = "none";
    }

    chat = !chat;
}