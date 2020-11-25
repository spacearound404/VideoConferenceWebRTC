let student = new GuestVC();

defaultControlState();

student.setElementHTMLVideoContainerRemote(document.querySelector("#ssb"), document.getElementById('teacher-video'));

student.setElementHTMLVideoContainerLocal(document.getElementById('student-video'));

student.setConnectBtnUI(function() {
    document.getElementById('connect').removeAttribute("disabled");
    document.getElementById('connect').classList.add("btn-primary");
    document.getElementById('connect').innerHTML = "Подключиться";
    document.getElementById('connect').classList.remove("btn-danger");
},
function() {
    document.getElementById('connect').removeAttribute("disabled");
    document.getElementById('connect').classList.remove("btn-primary");
    document.getElementById('connect').innerHTML = "Отключиться";
    document.getElementById('connect').classList.add("btn-danger");
});

document.getElementById('connect').onclick = function() {

    if(!student.getUserStatusConnection()) {
        let roomID = document.getElementById('validationTooltip01').value;
        student.setRoomID(roomID);
        student.connect();
    } else {
        student.disconnect();
    }

}

student.onUserStatusChanged();
student.onRoomFull();
student.onStream();
student.onMediaError();

function defaultControlState() {
    document.querySelector('.micro > svg:nth-child(1)').style.display = "block";
    document.querySelector('.micro > svg:nth-child(2)').style.display = "none";

    document.querySelector('.camera > svg:nth-child(1)').style.display = "block";
    document.querySelector('.camera > svg:nth-child(2)').style.display = "none";

    document.querySelector('.overlay-chat').style.display = "none";

    document.querySelector('.chat > svg:nth-child(2)').style.display = "block";
    document.querySelector('.chat > svg:nth-child(1)').style.display = "none";
}

// let micro = false,
//     camera = false,
//     chat = true;
//
// document.querySelector('.micro').onclick = function(e){
//     micro = !micro;
//     if (micro) {
//         document.querySelector('.micro > svg:nth-child(2)').style.display = "block";
//         document.querySelector('.micro > svg:nth-child(1)').style.display = "none";
//
//         connection.streamEvents[connection.attachStreams[0].streamid].stream.mute("audio");
//     } else {
//         document.querySelector('.micro > svg:nth-child(2)').style.display = "none";
//         document.querySelector('.micro > svg:nth-child(1)').style.display = "block";
//
//         connection.streamEvents[connection.attachStreams[0].streamid].stream.unmute("audio");
//     }
//
// }
//
// document.querySelector('.camera').onclick = function(e){
//     camera = !camera;
//     if (camera) {
//         document.querySelector('.camera > svg:nth-child(2)').style.display = "block";
//         document.querySelector('.camera > svg:nth-child(1)').style.display = "none";
//
//         connection.streamEvents[connection.attachStreams[0].streamid].stream.mute("video");
//
//         console.log("mute");
//     } else {
//         document.querySelector('.camera > svg:nth-child(2)').style.display = "none";
//         document.querySelector('.camera > svg:nth-child(1)').style.display = "block";
//
//         connection.streamEvents[connection.attachStreams[0].streamid].stream.unmute("video");
//
//         console.log("unmute");
//     }
//
// }
//
// document.querySelector('.chat').onclick = function(e){
//     if (chat) {
//         document.querySelector('.chat > svg:nth-child(1)').style.display = "block";
//         document.querySelector('.chat > svg:nth-child(2)').style.display = "none";
//
//         document.querySelector('.overlay-chat').style.display = "block";
//     } else {
//         document.querySelector('.chat > svg:nth-child(1)').style.display = "none";
//         document.querySelector('.chat > svg:nth-child(2)').style.display = "block";
//
//         document.querySelector('.overlay-chat').style.display = "none";
//     }
//
//     chat = !chat;
// }
