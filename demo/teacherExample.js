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

// handler for all messages
teacher.onMessage((eventParam) => {});
teacher.onOpen();
teacher.detect2g();
teacher.onUserStatusChanged();
teacher.onStream();
teacher.onMediaError();
// teacher.onMute();
// teacher.onUnmute();

//example how to send some data to guests
document.querySelector('#example-send-data-btn').onclick = function(e){

    let eventHead = "create_button",
        data = {
            head: eventHead,
            content: '<button id="example-send-data-btn" class="btn btn-primary w-25" type="button" aria-disabled="false" autocomplete="off">Send</button>'
        };
    // send some content to guests
    teacher.sendDataToContentView(data);
}

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

    document.querySelector('.screen-recording > svg:nth-child(2)').style.display = "block";
    document.querySelector('.screen-recording > svg:nth-child(1)').style.display = "none";

    document.querySelector('.dashboard > svg:nth-child(1)').style.display = "block";
    document.querySelector('.dashboard > svg:nth-child(2)').style.display = "none";

    document.querySelector('.content-view > svg:nth-child(1)').style.display = "block";
    document.querySelector('.content-view > svg:nth-child(2)').style.display = "none";

    setTimeout(() => {
        document.querySelector('.dashboard').click();
    }, 1000);
}

// define default button control state as variable
let micro = false,
    camera = false,
    chat = true,
    screen_share = false,
    screen_record = false,
    dashboard = true,
    contentView = false;

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

// handler button for screen recording
document.querySelector('.screen-recording').onclick = function(e){
    if (screen_record) {
        // disable
        let result = teacher.screenRecordingOff(function(blobParam) {
            zip.workerScriptsPath = "../libs/";

            function zipBlob(filename, blob, callback) {
                // use a zip.BlobWriter object to write zipped data into a Blob object
                zip.createWriter(new zip.BlobWriter("application/zip"), function(zipWriter) {
                    // use a BlobReader object to read the data stored into blob variable
                    zipWriter.add(filename, new zip.BlobReader(blob), function() {
                        // close the writer and calls callback function
                        zipWriter.close(callback);
                    });
                }, onerror);
            }
            // create zip file
            zipBlob('video.webm', blobParam, (zippedBlob) => {

                // download zip for test
                let link = document.createElement('a');
                link.download = 'archive.zip';
                link.href = URL.createObjectURL(zippedBlob);
                link.click();
                URL.revokeObjectURL(link.href);
            });
        });

        if(result != false) {
            document.querySelector('.screen-recording > svg:nth-child(2)').style.display = "block";
            document.querySelector('.screen-recording > svg:nth-child(1)').style.display = "none";
            screen_record = !screen_record;
        }
    } else {
        // enable
        let result = teacher.screenRecordingOn();
        if (result != false) {
            document.querySelector('.screen-recording > svg:nth-child(2)').style.display = "none";
            document.querySelector('.screen-recording > svg:nth-child(1)').style.display = "block";
            screen_record = !screen_record;
        }
    }
}

// handler button for dashboard
document.querySelector('.dashboard').onclick = function(e){
    if (dashboard) {
        // disable
        document.querySelector('.dashboard > svg:nth-child(2)').style.display = "block";
        document.querySelector('.dashboard > svg:nth-child(1)').style.display = "none";
        document.querySelector('.overlay-dashboard').style.display = "none";

        // teacher.screenRecordingOff();
    } else {
        // enable
        document.querySelector('.dashboard > svg:nth-child(2)').style.display = "none";
        document.querySelector('.dashboard > svg:nth-child(1)').style.display = "block";

        document.querySelector('.overlay-dashboard').style.display = "block";

        // teacher.screenRecordingOn();
    }
    dashboard = !dashboard;
}

// handler button for content view
document.querySelector('.content-view').onclick = function(e){
    if (contentView) {
        // disable
        document.querySelector('.content-view > svg:nth-child(2)').style.display = "none";
        document.querySelector('.content-view > svg:nth-child(1)').style.display = "block";

        document.querySelector('.overlay-content-view').style.display = "none";

    } else {
        // enable
        document.querySelector('.content-view > svg:nth-child(2)').style.display = "block";
        document.querySelector('.content-view > svg:nth-child(1)').style.display = "none";

        document.querySelector('.overlay-content-view').style.display = "block";
    }
    contentView = !contentView;
}
