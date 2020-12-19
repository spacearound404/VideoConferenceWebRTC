    class GuestVC {

        // class constructor
        constructor() {
            this.connection = new RTCMultiConnection(); // instance of RTCMultiConnection lib
            this.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
            this.connection.session = {
                audio: true, // enabling the local microphone
                video: true, // enabling the local web-camera
                data: true
            };
            this.connection.sdpConstraints.mandatory = {
                OfferToReceiveAudio: true, // offer for receiving data from remote microphone
                OfferToReceiveVideo: true // offer for receiving data from remote web-camera or screen
            };
            this.videoContainerRemote = {
                screen: {
                    streamID: "",
                    elementHTML: 0
                },
                camera: {
                    streamID: "",
                    elementHTML: 0
                }
            }; // contaner of HTML elems for video streams
            this.videoContainerLocal = { // contaner of HTML elems for video streams
                streamID: "",
                elementHTML: 0
            };
            this.roomID = ""; // room ID
            this.user = {
                statusConnection: false, // current user status connection
                name: "", // user name
                id: this.connection.userid, // user ID
                roleName: "guest",
                roleID: 0
            };

            this.connectBtn = {
                connectCallback: function() {}, // callback to change the status of the connect/disconnect button to connect
                disconnectCallback: function(){} // callback to change the status of the connect/disconnect button to disconnect
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
                    isVisibleForAll: true // can the owner see the message addressed not to him
                }
            };
        }

        // ---METHODS---

        // connecting to room
        connect() {


            this.connection.session = {
                audio: true, // enabling the local microphone
                video: true, // enabling the local web-camera
                data: true
            };

            this.connection.sdpConstraints.mandatory = {
                OfferToReceiveAudio: true, // offer for receiving data from remote microphone
                OfferToReceiveVideo: true // offer for receiving data from remote web-camera or screen
            };

            let thisGuestVC = this.getInstance();
            thisGuestVC.connection.extra.guest = this.user;

            // join to room
            this.connection.join(this.roomID, function(isRoomJoined, roomid, error) {
                if(error) {
                    // change button status connect/disconnect to connect
                    thisGuestVC.connectBtn.connectCallback();
                    thisGuestVC.user.statusConnection = false;

                    if(error === 'Room not available') {
                        alert('This room does not exist. Please either create it or wait for moderator to enter in the room.');
                        return;
                    }

                    // // disable all streams
                    // thisGuestVC.connection.attachStreams.forEach(function(stream) {
                    //     stream.getTracks().forEach(track => track.stop());
                    //     stream.getTracks().forEach(track => stream.removeTrack(track));
                    // });

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
            if(this.videoContainerRemote.camera.elementHTML.children.length > 0) {
                this.videoContainerRemote.camera.elementHTML.innerHTML = "";
            }


            // check and clear contaner of HTML elem for remote screen
            if(this.videoContainerRemote.screen.elementHTML.children.length > 0) {
                this.videoContainerRemote.screen.elementHTML.innerHTML = "";
            }

            // check and clear contaner of HTML elem for local web-camera
            // if(this.videoContainerLocal.elementHTML.children.length > 0) {
            //     this.videoContainerLocal.elementHTML.innerHTML = "";
            // }

            for (let i = 0; i < this.connection.getAllParticipants().length; i++) {
                this.connection.disconnectWith(this.connection.getAllParticipants()[i]);
            }

            let streams = this.connection.streamEvents,
                streamsID = Object.keys(streams),
                streamsLength = streamsID.length;

            for (let i = 0; i < streamsLength; i++) {
                if (streams[streamsID[i]].type == 'local') {
                    streams[streamsID[i]].stream.stop();
                }
            }

            // stop all local cameras
            // this.connection.attachStreams.forEach(function(localStream) {
            //     localStream.stop();
            // });

            // // disable all streamsq
            // this.connection.attachStreams.forEach(function(stream) {
            //     stream.getTracks().forEach(track => track.stop());
            //     stream.getTracks().forEach(track => stream.removeTrack(track));
            // });

            // close socket.io connection
            this.connection.closeSocket();
        }

        setElementHTMLMessages(elementHTMLParam) {
            this.chat.elementHTML = elementHTMLParam;
        }


        sendMsg(msgParam, userToParam = "") {
            let data = {
                    userFrom: this.user.id,
                    userTo: userToParam,
                    role: "guest",
                    head: "chat",
                    content: msgParam,
                },
                message = "";

            if(msgParam.length > 0) {
                if(this.chat.mode.isDirect && (userToParam.length > 0)) {
                    this.connection.send(data);

                    message = `
                    <div class='` + this.chat.classStyle.fromMeToGuest + `'>
                        <div>
                            <span><span>from</span>` + this.user.id + `</span>
                            <span><span>to</span>` + userToParam + `</span>
                        </div>
                        <span>` + msgParam + `</span>
                    </div>
                    `;
                    this.chat.elementHTML.innerHTML += message;
                } else {
                    this.connection.send(data);

                    message = `
                    <div class='` + this.chat.classStyle.own + `'>
                        <span>` + this.user.id + `</span>
                        <span>` + msgParam + `</span>
                    </div>
                    `;
                    this.chat.elementHTML.innerHTML += message;
                }
            }
        }

        setClassStyleMsg(configParam) {
            this.chat.classStyle = configParam;
        }

        // disable/mute microphone
        microOff() {
            this.connection.streamEvents[this.connection.attachStreams[0].streamid].stream.mute("audio");
        }

        // enable/unmute microphone
        microOn() {
            this.connection.streamEvents[this.connection.attachStreams[0].streamid].stream.unmute("audio");
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
            document.getElementById(this.connection.attachStreams[0].streamid).style.display = "none";

        }

        // enable/unmute web-camera
        localCameraOn() {
            // this.connection.streamEvents[this.connection.attachStreams[0].streamid].stream.unmute("video");
            let data = {
                action: "unmute_video",
                streamID: this.connection.attachStreams[0].streamid,
            };
            this.connection.send(data);
            document.getElementById(this.connection.attachStreams[0].streamid).style.display = "block";
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

                if ((tmpKey.indexOf("selectFirst") == -1) && (tmpKey.indexOf("selectAll") == -1)) {

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
        setElementHTMLVideoContainerRemote(remoteScreenContainerParam, remoteCameraContainerParam) {
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
            if(navigator.connection &&
                navigator.connection.type === 'cellular' &&
                navigator.connection.downlinkMax <= 0.115) {
                    alert('2G is not supported. Please use a better internet service.');
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


        // ---Events---

        // event changing the user connection status
        onUserStatusChanged() {
            let thisGuestVC = this.getInstance();
            this.connection.onUserStatusChanged = function(status) {
                // if the owner of the room is disconnected then
                console.log(status);
                if((status.status == "offline") && (status.extra.user2 != undefined)){
                    thisGuestVC.connectBtn.connectCallback();
                    thisGuestVC.user.statusConnection = false;

                    let streams = thisGuestVC.connection.streamEvents,
                        streamsID = Object.keys(streams),
                        streamsLength = streamsID.length;

                    for (let i = 0; i < streamsLength; i++) {
                        if (streams[streamsID[i]].type == 'local') {
                            streams[streamsID[i]].stream.stop();
                        }
                    }
                }
            }
        }

        // event for checking whether the room is full when connecting
        onRoomFull() {
            let thisGuestVC = this.getInstance();
            this.connection.onRoomFull = function(roomid) {
                alert('Room is full.');
                thisGuestVC.user.statusConnection = false;
            };
        }

        // stream event
        onStream() {
            let thisGuestVC = this.getInstance();

            this.connection.onstream = function(event) {

                switch(event.type) {
                    case "local": {
                        // set a video stream in an HTML container
                        thisGuestVC.videoContainerLocal.elementHTML.appendChild(event.mediaElement);
                        thisGuestVC.videoContainerLocal.elementHTML.children[0].muted = true;
                        break;
                    }
                    case "remote": {
                        if(event.extra.user2 == undefined) {
                            if(!thisGuestVC.guestAudibility) {
                                event.mediaElement.muted = true;
                            }

                            delete event.mediaElement;

                            let video = document.createElement('video');

                            if(!thisGuestVC.guestAudibility) {
                                video.muted = true;
                            }
                            try {
                                video.src = URL.createObjectURL(event.stream);
                            } catch(err) {

                            }

                            break;
                        }

                        if (event.stream.id == event.extra.streamID) {
                            thisGuestVC.videoContainerRemote.screen.elementHTML.innerHTML = "";

                            // set a video stream in an HTML container
                            thisGuestVC.videoContainerRemote.screen.elementHTML.appendChild(event.mediaElement);
                        } else {
                            thisGuestVC.videoContainerRemote.camera.elementHTML.innerHTML = "";

                            // set a video stream in an HTML container
                            thisGuestVC.videoContainerRemote.camera.elementHTML.appendChild(event.mediaElement);
                        }

                        break;
                    }
                }
            };
        }

        // error event
        onMediaError() {
            this.connection.onMediaError = function(error) {
                console.log(error);
            };
        }

        // message handler
        onMessage(callback) {
            let thisGuestVC = this.getInstance();

            this.connection.onmessage = function(event) {

                switch(event.data.head) {
                    case 'chat': {
                        // from owner to guest

                        // own: "",
                        // fromGuestToMe: "",
                        // fromOwnerToMe: "",
                        // fromMeToGuest: "",
                        // fromMeToOwner: "",
                        // guests: "",
                        // roomOwner: "",

                        console.log(event.data);

                        if(event.data.role == "owner"){
                            if (thisGuestVC.user.id == event.data.userTo) {
                                let tmpHTML = thisGuestVC.chat.elementHTML.innerHTML,
                                    msgHTML = `
                                        <div class='` + thisGuestVC.chat.classStyle.fromOwnerToMe + `'>
                                            <div>
                                                <span><span>from</span>` + event.data.userFrom + `</span>
                                                <span><span>to</span>` + event.data.userTo + `</span>
                                            </div>
                                            <span>` + event.data.content + `</span>
                                        </div>
                                    `;
                                thisGuestVC.chat.elementHTML.innerHTML = tmpHTML + msgHTML;

                                return;
                            } else {
                                let tmpHTML = thisGuestVC.chat.elementHTML.innerHTML,
                                    msgHTML = `
                                        <div class='` + thisGuestVC.chat.classStyle.roomOwner + `'>
                                            <span>` + event.data.userFrom + `</span>
                                            <span>` + event.data.content + `</span>
                                        </div>
                                    `;
                                thisGuestVC.chat.elementHTML.innerHTML = tmpHTML + msgHTML;
                                return;
                            }
                        }

                        // from guest to guest
                        if (thisGuestVC.chat.mode.isDirect && (event.data.userTo.length > 0)) {
                            if (thisGuestVC.user.id == event.data.userTo) {
                                let tmpHTML = thisGuestVC.chat.elementHTML.innerHTML,
                                    msgHTML = `
                                        <div class='` + thisGuestVC.chat.classStyle.fromGuestToMe + `'>
                                            <div>
                                                <span><span>from</span>` + event.data.userFrom + `</span>
                                                <span><span>to</span> ` + event.data.userTo + `</span>
                                            </div>
                                            <span>` + event.data.content + `</span>
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
                                    msgHTML = `
                                        <div class='` + thisGuestVC.chat.classStyle.guests + `'>
                                            <span>` + event.data.userFrom + `</span>
                                            <span>` + event.data.content + `</span>
                                        </div>
                                    `;
                                thisGuestVC.chat.elementHTML.innerHTML = tmpHTML + msgHTML;
                            } else {
                                // let tmpHTML = thisGuestVC.chat.elementHTML.innerHTML,
                                //     msgHTML = `
                                //         <div class='` + thisGuestVC.chat.classStyle.roomOwner + `'>
                                //             <div>
                                //                 <span>` + event.data.userFrom + `</span>
                                //             </div>
                                //             <span>` + event.data.content + `</span>
                                //         </div>
                                //     `;
                                // thisGuestVC.chat.elementHTML.innerHTML = tmpHTML + msgHTML;
                            }
                        }

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

            this.connection.onopen = function(event) {

            };
        }
    }

    class AdminVC {
        // class constructor
        constructor() {
            this.connection = new RTCMultiConnection(); // instance of RTCMultiConnection lib
            this.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
            this.connection.session = {
                audio: true, // enabling the local microphone
                video: true, // enabling the local web-camera
                data: true
            };
            this.connection.sdpConstraints.mandatory = {
                OfferToReceiveAudio: true, // offer for receiving data from remote microphone
                OfferToReceiveVideo: true // offer for receiving data from remote web-camera or screen
            };
            this.videoContainerRemote = []; // array of objects of HTML elems for remote video streams
            this.videoContainerLocal = {    // object of HTML elem and stream ID for locale video streams
                camera: {
                    streamID: "",
                    elementHTML: 0
                },
                screen: {
                    streamID: "",
                    elementHTML: 0
                }
            };
            this.roomID = ""; // room ID
            this.user = {
                statusConnection: false, // current user status connection
                name: "", // user name
                id: this.connection.userid, // user ID
                roleName: "admin",
                roleID: 1
            }; // not used yet
            this.guests = []; // not used yet
            this.microIsActive = true;
            this.connectBtn = {
                connectCallback: function() {}, // callback to change the status of the connect/disconnect button to connect
                disconnectCallback: function(){} // callback to change the status of the connect/disconnect button to disconnect
            };
            this.guestMaxCount = 4; // maximum number of guests per room
            this.connection.maxParticipantsAllowed = this.guestMaxCount;
            this.videoRecording = {
                elementHTML: document.createElement('video'),
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
                        height: 720
                    },
                    frameRate: 30,
                    bitrate: 128000,
                }
            };
            this.contentView = {
                elementHTML: 0
            };
            // chat mode
            this.chat = {
                elementHTML: 0, // for display messages
                classStyle: { // class for one msg
                    own: "",
                    fromGuestToMe: "",
                    fromMeToGuest: "",
                    fromGuestToGuest: "",
                    guests: "",
                },
                mode: {
                    isDirect: true, // can guest send msg to certain guest or owner
                    isVisibleGuestForOwner: true, // can a guest see other guests' messages
                }
            };
        }

        // ---Methods---

        // set chat mode
        setChatMode(configParam) {
            this.chat.mode = configParam;
        }

        sendMsg(msgParam, userToParam = "") {
            let data = {
                    userFrom: this.user.id,
                    userTo: userToParam,
                    role: "owner",
                    head: "chat",
                    content: msgParam,
                },
                message = "";

            if(msgParam.length > 0) {
                if(this.chat.mode.isDirect && (userToParam.length > 0)) {
                    this.connection.send(data);

                    message = `
                    <div class='` + this.chat.classStyle.fromMeToGuest + `'>
                        <div>
                            <span><span>from</span>` + this.user.id + `</span>
                            <span><span>to</span>` + userToParam + `</span>
                        </div>
                        <span>` + msgParam + `</span>
                    </div>
                    `;
                    this.chat.elementHTML.innerHTML += message;
                } else {
                    this.connection.send(data);

                    message = `
                    <div class='` + this.chat.classStyle.own + `'>
                        <span>` + this.user.id + `</span>
                        <span>` + msgParam + `</span>
                    </div>
                    `;
                    this.chat.elementHTML.innerHTML += message;
                }
            }
        }

        setClassStyleMsg(configParam) {
            this.chat.classStyle = configParam;
        }

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
            for(let i = 0; i < arguments.length; i++) {

                this.videoContainerRemote.push({
                    elementHTML: arguments[i],
                    isEmpty: true
                });
            }
        }

        // set HTML elem for display local video stream
        setElementsHTMLVideoContainerLocal(localCameraElemHTMLParam, localScreenElemHTMLParam) {
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

                if ((tmpKey.indexOf("selectFirst") == -1) && (tmpKey.indexOf("selectAll") == -1)) {

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
                this.connection.streamEvents[this.connection.attachStreams[0].streamid].stream.mute("audio");
            }
            catch (err) {

            }

            // enable micro for screen recording
            try {
                this.videoRecording.stream.audio.getAudioTracks().forEach(function(track) {
                    track.enabled = false;
                });
            }
            catch (err) {

            }

            this.microIsActive = false;
        }

        // enable/unmute microphone
        microOn() {
            // disable micro when connection is active
            try {
                this.connection.streamEvents[this.connection.attachStreams[0].streamid].stream.unmute("audio");
                this.videoContainerLocal.camera.elementHTML.children[0].muted = true;
            }
            catch (err) {

            }

            // disable micro for screen recording
            try {
                this.videoRecording.stream.audio.getAudioTracks().forEach(function(track) {
                    track.enabled = true;
                });
            }
            catch (err) {

            }

            this.microIsActive = true;
        }

        // enable screen sharing
        screenShareOn() {

            let thisAdminVC = this.getInstance();

            this.connection.addStream({
                screen: true,
                oneway: true,
                data: true,
                streamCallback: function(stream) {

                    for (let i = 0; i < thisAdminVC.connection.attachStreams.length; i++) {
                        if (thisAdminVC.connection.attachStreams[i].idInstance.indexOf("isScreen") != -1) {

                            let tmpStreamID = thisAdminVC.connection.attachStreams[i].id,
                            tmpStream = thisAdminVC.connection.streamEvents[tmpStreamID].stream;

                            thisAdminVC.connection.addStream(tmpStream);

                            thisAdminVC.connection.renegotiate();
                        }
                    }

                    thisAdminVC.connection.extra.streamID = stream.id;

                    thisAdminVC.connection.updateExtraData();
                    thisAdminVC.videoContainerLocal.screen.elementHTML.appendChild(tmpStream);
                }
            });
            this.connection.renegotiate();
        }

        // disable screen sharing
        screenShareOff() {
            this.connection.attachStreams.forEach(function(stream) {
                if (stream.idInstance.indexOf("isScreen") != -1) {
                    stream.getTracks().forEach(track => track.stop());
                    stream.getTracks().forEach(track => stream.removeTrack(track));
                }
            });
        }

        // disable/mute web-camera
        localCameraOff() {
            this.connection.streamEvents[this.connection.attachStreams[0].streamid].stream.mute("video");
        }

        // enable/unmute web-camera
        localCameraOn() {
            this.connection.streamEvents[this.connection.attachStreams[0].streamid].stream.unmute("video");
        }

        // disconnect from room
        disconnect() {
            let thisAdminVC = this;
            // display connect btn status UI
            this.connectBtn.connectCallback();

            // clear all remote HTML elems
            for(let i = 0; i < this.videoContainerRemote.length; i++) {
                if (this.videoContainerRemote[i].elementHTML.children.length != 0)
                    this.videoContainerRemote[i].elementHTML.innerHTML = "";
            }

            // clear own local web-camera HTML elem
            if (this.videoContainerLocal.camera.elementHTML.children.length != 0)
                this.videoContainerLocal.camera.elementHTML.innerHTML = "";

            // clear own local screen HTML elem
            if (this.videoContainerLocal.screen.elementHTML.children.length != 0)
                this.videoContainerLocal.screen.elementHTML.innerHTML = "";

            this.connection.getAllParticipants().forEach(function(pid) {
                thisAdminVC.connection.disconnectWith(pid);
            });

            // stop all local cameras
            this.connection.attachStreams.forEach(function(localStream) {
                localStream.stop();
            });

            // close socket.io connection
            this.connection.closeSocket();
        }

        // create room
        connect() {

            // save data to extra to send guest in order to could distinguish other guests from the owner/admin
            this.connection.extra = {
                user2: "Admin"
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
            if(navigator.connection &&
                navigator.connection.type === 'cellular' &&
                navigator.connection.downlinkMax <= 0.115) {
                    alert('2G is not supported. Please use a better internet service.');
                }
        }

        // get instance
        getInstance() {
            return this;
        }

        invokeGetDisplayMedia(success, error) {
            let displaymediastreamconstraints = {
                video: {
                    displaySurface: 'monitor', // monitor, window, application, browser
                    logicalSurface: true,
                    cursor: 'always' // never, always, motion
                }
            };

            // above constraints are NOT supported YET
            // that's why overriding them
            displaymediastreamconstraints = {
                video: true
            };

            if(navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
            }
            else {
                navigator.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
            }
        }

        addStreamStopListener(stream, callback) {
            stream.addEventListener('ended', function() {
                callback();
                callback = function() {};
            }, false);
            stream.addEventListener('inactive', function() {
                callback();
                callback = function() {};
            }, false);
            stream.getTracks().forEach(function(track) {
                track.addEventListener('ended', function() {
                    callback();
                    callback = function() {};
                }, false);
                track.addEventListener('inactive', function() {
                    callback();
                    callback = function() {};
                }, false);
            });
        }

        captureScreen(callback) {

            let thisAdminVC = this.getInstance();

            this.invokeGetDisplayMedia(function(screen) {
                thisAdminVC.addStreamStopListener(screen, function() {
                });
                callback(screen);
            }, function(error) {
                console.error(error);
                alert('Unable to capture your screen. Please check console logs.\n' + error);
            });
        }

        // enable screen recording
        screenRecordingOn() {

            if(!navigator.getDisplayMedia && !navigator.mediaDevices.getDisplayMedia) {
                let error = 'Your browser does NOT support the getDisplayMedia API.';
                alert(error);

                throw new Error(error);
            }

            if(this.microIsActive == false) {
                alert("When screen recorder starting, micro must be turn on");

                return false;
            }

            let thisAdminVC = this;

            this.captureScreen(function(screen) {

                thisAdminVC.videoRecording.elementHTML.srcObject = screen;

                thisAdminVC.videoRecording.isActive = true;

                navigator.mediaDevices.getUserMedia({
                    video: false,
                    audio: thisAdminVC.microIsActive
                })
                .then((streamMicro) => {
                    thisAdminVC.videoRecording.stream.screen = screen;
                    thisAdminVC.videoRecording.stream.audio = streamMicro;

                    var config = {
                        type: thisAdminVC.videoRecording.config.type,
                        mimeType: thisAdminVC.videoRecording.config.mimeType,
                        frameRate: thisAdminVC.videoRecording.config.frameRate,
                        bitrate: thisAdminVC.videoRecording.config.bitrate,
                        video: thisAdminVC.videoRecording.config.resolution
                    }

                    thisAdminVC.recorder = new MultiStreamRecorder([streamMicro, screen], config);

                    thisAdminVC.recorder.record();

                    let streams = thisAdminVC.connection.streamEvents,
                        streamsID = Object.keys(streams),
                        streamsLength = streamsID.length;

                    for (let i = 0; i < streamsLength; i++) {

                        if(streams[streamsID[i]].type == 'remote') {
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

            if (thisAdminVC.videoRecording.isActive == false)
                return false;

            thisAdminVC.videoRecording.isActive = false;

            this.recorder.stop(function(blob) {

                var blob = thisAdminVC.recorder.blob;

                callback(blob);

                thisAdminVC.videoRecording.stream.screen.stop(() => {});
            });

        }

        setContentViewContainer(elementHTML) {
            this.contentView.elementHTML = elementHTML;
        }

        // send some data to guests for display it in content view
        sendDataToContentView(dataParam) {

            let data = {
                head: "",
                content: ""
            };

            data = dataParam;

            this.connection.send(data);
        }

        // ---Events---

        // event changing the user connection status
        onUserStatusChanged() {

            let thisAdminVC = this.getInstance();

            this.connection.onUserStatusChanged = function(status) {
                if (status.status == "offline") {

                    for(let i = 0; i < thisAdminVC.videoContainerRemote.length; i++) {
                        if(thisAdminVC.videoContainerRemote[i].userID == status.userid) {

                            thisAdminVC.videoContainerRemote[i].streamID = "";
                            thisAdminVC.videoContainerRemote[i].userID = "";

                            if (thisAdminVC.videoContainerRemote[i].elementHTML.children.length != 0)
                                thisAdminVC.videoContainerRemote[i].elementHTML.innerHTML = "";

                            thisAdminVC.videoContainerRemote[i].isEmpty = true;

                        }

                    }

                }
            }

        }

        // stream event
        onStream() {
            let thisAdminVC = this.getInstance();

            this.connection.onstream = function(event) {

                switch(event.type) {
                    // this case for handling incoming remote connections
                    case "remote": {

                        for (let i = 0; i < thisAdminVC.videoContainerRemote.length; i++) {

                            if (thisAdminVC.videoContainerRemote[i].isEmpty) {

                                let tmpBool = false;

                                for (let j = 0; j < thisAdminVC.videoContainerRemote.length; j++) {
                                    if (thisAdminVC.videoContainerRemote[j].userID == event.userid) {
                                        tmpBool = true;
                                        break;
                                    }
                                }

                                if(!tmpBool) {
                                    thisAdminVC.videoContainerRemote[i].streamID = event.stream.id;
                                    thisAdminVC.videoContainerRemote[i].userID = event.userid;

                                    thisAdminVC.videoContainerRemote[i].elementHTML.appendChild(event.mediaElement);
                                    thisAdminVC.videoContainerRemote[i].isEmpty = false;
                                }

                            }

                        }

                        if(thisAdminVC.videoRecording.isActive == true) {
                            let mixer = thisAdminVC.recorder.getMixer();
                            mixer.appendStreamsAudio([event.stream]);
                        }

                        break;
                    }

                    // this case for handling local video stream
                    case "local": {
                        if(event.stream.idInstance.indexOf("isScreen") != -1) {
                            thisAdminVC.videoContainerLocal.screen.streamID = event.stream.id;
                            thisAdminVC.videoContainerLocal.screen.elementHTML.appendChild(event.mediaElement);
                        } else {
                            thisAdminVC.videoContainerLocal.camera.streamID = event.stream.id;
                            thisAdminVC.videoContainerLocal.camera.elementHTML.appendChild(event.mediaElement);
                        }

                        break;
                    }
                }
            }
        }

        // error event
        onMediaError() {
            this.connection.onMediaError = function(error) {
                console.log(error);
            };
        }


        // message event
        onMessage(callback) {
            let thisAdminVC = this.getInstance();

            this.connection.onmessage = function(event) {
                switch(event.data.action) {
                    case 'mute_video': {
                        document.getElementById(event.data.streamID).style.display = "none";

                        break;
                    }
                    case 'unmute_video': {
                        document.getElementById(event.data.streamID).style.display = "block";
                        break;
                    }
                }

                switch(event.data.head) {
                    case 'chat': {

                        // from guest to owner
                        if (thisAdminVC.user.id == event.data.userTo) {
                            let tmpHTML = thisAdminVC.chat.elementHTML.innerHTML,
                            msgHTML = `
                            <div class='` + thisAdminVC.chat.classStyle.fromGuestToMe + `'>
                                <div>
                                    <span><span>from</span>` + event.data.userFrom + `</span>
                                    <span><span>to</span>` + event.data.userTo + `</span>
                                </div>
                                <span>` + event.data.content + `</span>
                            </div>
                            `;
                            thisAdminVC.chat.elementHTML.innerHTML = tmpHTML + msgHTML;
                        }

                        // from guest to all
                        if (event.data.userTo.length == 0) {
                            let tmpHTML = thisAdminVC.chat.elementHTML.innerHTML,
                                msgHTML = `
                                    <div class='` + thisAdminVC.chat.classStyle.guests + `'>
                                        <span>` + event.data.userFrom + `</span>
                                        <span>` + event.data.content + `</span>
                                    </div>
                                `;
                            thisAdminVC.chat.elementHTML.innerHTML = tmpHTML + msgHTML;
                        }

                        //from guest to guset
                        if (thisAdminVC.chat.mode.isVisibleGuestForOwner) {
                            let tmpHTML = thisAdminVC.chat.elementHTML.innerHTML,
                            msgHTML = `
                            <div class='` + thisAdminVC.chat.classStyle.fromGuestToGuest + `'>
                                <div>
                                    <span><span>from</span>` + event.data.userFrom + `</span>
                                    <span><span>to</span> ` + event.data.userTo + `</span>
                                </div>
                                <span>` + event.data.content + `</span>
                            </div>
                            `;
                            thisAdminVC.chat.elementHTML.innerHTML = tmpHTML + msgHTML;
                        }
                        break;
                    }
                }



                callback(event.data);
            };
        }

        onOpen() {
            let thisAdminVC = this.getInstance();

            this.connection.onopen = function(event) {

            };
        }
    }
