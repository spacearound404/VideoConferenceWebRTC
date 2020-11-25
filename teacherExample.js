let teacher = new AdminVC(),
    roomIDElem = document.getElementById('validationTooltip01'),
    maxGuestCount = 4;

defaultControlState();

teacher.setElementsHTMLVideoContainerLocal(document.getElementById('video-1'),
                                           document.querySelector('.screen-share-block'));

teacher.setElementsHTMLVideoContainerRemote(document.getElementById('video-2'),
                                            document.getElementById('video-3'),
                                            document.getElementById('video-4'));
teacher.setConnectBtnUI(function() {
    document.getElementById('connect').removeAttribute("disabled");
    document.getElementById('connect').classList.add("btn-primary");
    document.getElementById('connect').innerHTML = "Подключиться";
    document.getElementById('connect').classList.remove("btn-danger");
}, function() {
    document.getElementById('connect').removeAttribute("disabled");
    document.getElementById('connect').classList.remove("btn-primary");
    document.getElementById('connect').innerHTML = "Отключиться";
    document.getElementById('connect').classList.add("btn-danger");
});

document.getElementById('connect').onclick = function() {

    if(!teacher.getUserStatusConnection()) {
        let roomID = roomIDElem.value;
        teacher.setRoomID(roomID);
        // teacher.setMaxGuestCount(maxGuestCount);
        teacher.connect();
    } else {
        teacher.disconnect();
    }

}

teacher.onUserStatusChanged();
teacher.onStream();
teacher.onMediaError();

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

let micro = false,
    camera = false,
    chat = true,
    screen_share = false;

document.querySelector('.micro').onclick = function(e){
    micro = !micro;
    if (micro) {
        document.querySelector('.micro > svg:nth-child(2)').style.display = "block";
        document.querySelector('.micro > svg:nth-child(1)').style.display = "none";

        teacher.microOff();
    } else {
        document.querySelector('.micro > svg:nth-child(2)').style.display = "none";
        document.querySelector('.micro > svg:nth-child(1)').style.display = "block";

        teacher.microOn();
    }

}

document.querySelector('.camera').onclick = function(e){
    camera = !camera;
    if (camera) {
        document.querySelector('.camera > svg:nth-child(2)').style.display = "block";
        document.querySelector('.camera > svg:nth-child(1)').style.display = "none";

        teacher.localCameraOff();
    } else {
        document.querySelector('.camera > svg:nth-child(2)').style.display = "none";
        document.querySelector('.camera > svg:nth-child(1)').style.display = "block";

        teacher.localCameraOn();
    }

}

document.querySelector('.chat').onclick = function(e){
    if (chat) {
        document.querySelector('.chat > svg:nth-child(1)').style.display = "block";
        document.querySelector('.chat > svg:nth-child(2)').style.display = "none";

        document.querySelector('.overlay-chat').style.display = "block";
    } else {
        document.querySelector('.chat > svg:nth-child(1)').style.display = "none";
        document.querySelector('.chat > svg:nth-child(2)').style.display = "block";

        document.querySelector('.overlay-chat').style.display = "none";
    }

    chat = !chat;
}

document.querySelector('.screen-share').onclick = function(e){
    if (screen_share) {
        document.querySelector('.screen-share > svg:nth-child(2)').style.display = "block";
        document.querySelector('.screen-share > svg:nth-child(1)').style.display = "none";


        teacher.screenShareOff();

    } else {
        document.querySelector('.screen-share > svg:nth-child(2)').style.display = "none";
        document.querySelector('.screen-share > svg:nth-child(1)').style.display = "block";

        teacher.screenShareOn();
    }

    screen_share = !screen_share;
}
