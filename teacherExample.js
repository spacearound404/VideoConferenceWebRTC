let teacher = new AdminVC(), // AdminVC instance
    roomIDElem = document.getElementById('validationTooltip01'), // input with room ID
    maxGuestCount = 5; // max guest count

// ussing default button control state (definition below)
defaultControlState();

// set HTML elems where the own camera and screen will be displayed
teacher.setElementsHTMLVideoContainerLocal(document.getElementById('video-1'), // camera
                                           document.querySelector('.screen-share-block')); //screen

// set HTML elems where the guest camera will be displayed
teacher.setElementsHTMLVideoContainerRemote(document.getElementById('video-2'),
                                            document.getElementById('video-3'),
                                            document.getElementById('video-4'));

// set button status when connecting and diconnection
teacher.setConnectBtnUI(function() {
    // connection
    document.getElementById('connect').removeAttribute("disabled");
    document.getElementById('connect').classList.add("btn-primary");
    document.getElementById('connect').innerHTML = "Подключиться";
    document.getElementById('connect').classList.remove("btn-danger");
}, function() {
    // disconnection
    document.getElementById('connect').removeAttribute("disabled");
    document.getElementById('connect').classList.remove("btn-primary");
    document.getElementById('connect').innerHTML = "Отключиться";
    document.getElementById('connect').classList.add("btn-danger");
});

// handler button click for connection/diconnectiong
document.getElementById('connect').onclick = function() {
    // check connection status
    if(!teacher.getUserStatusConnection()) {
        // if disconnect
        let roomID = roomIDElem.value;
        teacher.setRoomID(roomID);
        teacher.setMaxGuestCount(maxGuestCount);
        teacher.connect();
        teacher.setUserStatusConnection(true);
    } else {
        // if connect
        teacher.setUserStatusConnection(false);
        teacher.disconnect();
    }
}

// set default handler for webrtc class
teacher.detect2g();
teacher.onUserStatusChanged();
teacher.onStream();
teacher.onMediaError();

// define default button control state
function defaultControlState() {
    document.querySelector('.micro > svg:nth-child(1)').style.display = "block";
    document.querySelector('.micro > svg:nth-child(2)').style.display = "none";

    document.querySelector('.camera > svg:nth-child(1)').style.display = "block";
    document.querySelector('.camera > svg:nth-child(2)').style.display = "none";

    document.querySelector('.screen-share > svg:nth-child(2)').style.display = "block";
    document.querySelector('.screen-share > svg:nth-child(1)').style.display = "none";

    document.querySelector('.overlay-chat').style.display = "none";

    document.querySelector('.chat > svg:nth-child(2)').style.display = "block";
    document.querySelector('.chat > svg:nth-child(1)').style.display = "none";
}

// define default button control state as variable
let micro = false,
    camera = false,
    chat = true,
    screen_share = false;

// handler button for micro
document.querySelector('.micro').onclick = function(e){
    micro = !micro;
    if (micro) {
        // disable
        document.querySelector('.micro > svg:nth-child(2)').style.display = "block";
        document.querySelector('.micro > svg:nth-child(1)').style.display = "none";

        teacher.microOff();
    } else {
        // enable
        document.querySelector('.micro > svg:nth-child(2)').style.display = "none";
        document.querySelector('.micro > svg:nth-child(1)').style.display = "block";

        teacher.microOn();
    }

}

// handler button for camera
document.querySelector('.camera').onclick = function(e){
    camera = !camera;
    if (camera) {
        // disable
        document.querySelector('.camera > svg:nth-child(2)').style.display = "block";
        document.querySelector('.camera > svg:nth-child(1)').style.display = "none";

        teacher.localCameraOff();
    } else {
        // enabale
        document.querySelector('.camera > svg:nth-child(2)').style.display = "none";
        document.querySelector('.camera > svg:nth-child(1)').style.display = "block";

        teacher.localCameraOn();
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

// handler button for screen sharing
document.querySelector('.screen-share').onclick = function(e){
    if (screen_share) {
        // disable
        document.querySelector('.screen-share > svg:nth-child(2)').style.display = "block";
        document.querySelector('.screen-share > svg:nth-child(1)').style.display = "none";


        teacher.screenShareOff();

    } else {
        // enbale
        document.querySelector('.screen-share > svg:nth-child(2)').style.display = "none";
        document.querySelector('.screen-share > svg:nth-child(1)').style.display = "block";

        teacher.screenShareOn();
    }

    screen_share = !screen_share;
}
