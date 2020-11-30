class GuestVC {

    // class constructor
    constructor() {
        this.connection = new RTCMultiConnection(); // instance of RTCMultiConnection lib
        this.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
        this.connection.session = {
            audio: true, // enabling the local microphone
            video: true // enabling the local web-camera
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
            id: "", // user ID
            roleName: "guest",
            roleID: 0
        };

        this.connectBtn = {
            connectCallback: function() {}, // callback to change the status of the connect/disconnect button to connect
            disconnectCallback: function(){} // callback to change the status of the connect/disconnect button to disconnect
        };
        this.guestAudibility = false;
    }

    // ---METHODS---

    // connecting to room
    connect() {


        this.connection.session = {
            audio: true, // enabling the local microphone
            video: true // enabling the local web-camera
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

    // disable/mute microphone
    microOff() {
        this.connection.streamEvents[this.connection.attachStreams[0].streamid].stream.mute("audio");
    }

    // enable/unmute microphone
    microOn() {
        this.connection.streamEvents[this.connection.attachStreams[0].streamid].stream.unmute("audio");
    }

    // disable/mute web-camera
    localCameraOff() {
        this.connection.streamEvents[this.connection.attachStreams[0].streamid].stream.mute("video");
    }

    // enable/unmute web-camera
    localCameraOn() {
        this.connection.streamEvents[this.connection.attachStreams[0].streamid].stream.unmute("video");
    }

    // set user name
    setUserName(nameParam) {
        this.user.name = nameParam;
    }

    // set user ID
    setUserID(idParam) {
        this.user.id = idParam;
    }

    // set room ID
    setRoomID(roomIDParam) {
        this.roomID = roomIDParam;
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

    // set callbacks for changing button state
    setConnectBtnUI(connectCallbackParam, disconnectCallbackParam) {
        this.connectBtn.connectCallback = connectCallbackParam;
        this.connectBtn.disconnectCallback = disconnectCallbackParam;
    }

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
            if(status.status == "offline"){
                thisGuestVC.connectBtn.connectCallback();
                thisGuestVC.user.statusConnection = false;
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

            console.log(event);

            switch(event.type) {
                case "local": {
                    // set a video stream in an HTML container
                    thisGuestVC.videoContainerLocal.elementHTML.appendChild(event.mediaElement);

                    break;
                }
                case "remote": {
                    // Object.keys(event.extra).indexOf("Admin") == -1
                    console.log(event.extra);
                    if(event.extra.user2 == undefined) {
                        if(!thisGuestVC.guestAudibility) {
                            event.mediaElement.muted = true;
                        }
                        delete event.mediaElement;
                        var video = document.createElement('video');
                        if(!thisGuestVC.guestAudibility) {
                            video.muted = true;
                        }
                        video.src = URL.createObjectURL(event.stream);
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
            // alert( 'onMediaError:\n' + JSON.stringify(error) );
            console.log(error);
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
            video: true // enabling the local web-camera
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
            id: "", // user ID
            roleName: "admin",
            roleID: 1
        }; // not used yet
        this.guests = []; // not used yet
        this.connectBtn = {
            connectCallback: function() {}, // callback to change the status of the connect/disconnect button to connect
            disconnectCallback: function(){} // callback to change the status of the connect/disconnect button to disconnect
        };
        this.guestMaxCount = 4; // maximum number of guests per room
        this.connection.maxParticipantsAllowed = this.guestMaxCount;
    }

    // ---Methods---

    // set maximum number of guests per room
    setMaxGuestCount(guestCountParam) {
        this.guestMaxCount = guestCountParam;
        this.connection.maxParticipantsAllowed = this.guestMaxCount;
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

    // set room ID
    setRoomID(roomIDParam) {
        this.roomID = roomIDParam;
    }

    // set user ID
    setUserID(idParam) {
        this.user.id = idParam;
    }

    // set user name
    setUserName(nameParam) {
        this.user.name = nameParam;
    }

    // disable/mute microphone
    microOff() {
        this.connection.streamEvents[this.connection.attachStreams[0].streamid].stream.mute("audio");
    }

    // enable/unmute microphone
    microOn() {
        this.connection.streamEvents[this.connection.attachStreams[0].streamid].stream.unmute("audio");
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
            this.connection.disconnectWith(pid);
        });

        // stop all local cameras
        this.connection.attachStreams.forEach(function(localStream) {
            localStream.stop();
        });

        // close socket.io connection
        this.connection.closeSocket();

        // clear connection.attachStreams array and close stream
        // this.connection.attachStreams.forEach(function(stream) {
        //     stream.getTracks().forEach(track => track.stop());
        //     stream.getTracks().forEach(track => stream.removeTrack(track));
        // });

        // close socket
        // this.connection.closeSocket();
    }

    // create room
    connect() {
        // change button status connect/disconnect to disconnect

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
            // alert( 'onMediaError:\n' + JSON.stringify(error) );
            console.log(error);
        };
    }
}
