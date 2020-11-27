# VideoConferenceWebRTC
Lib for quickly creating a web video chat with using [RTCMultiConnection](https://github.com/muaz-khan/RTCMultiConnection "RTCMultiConnection") lib.

[![Generic badge](https://img.shields.io/badge/release-v1.0.0-blue.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/size-58.9kB-green.svg)](https://shields.io/)

## Latest update
27.11.2020
- Fixed bug with callback button status UI
- Add mobile version UI
- Added a setting to change the audibility of other participants in the room
- Fixed a bug with visual container overflow
- Added the ability to change the audibility of room guests for the guests themselves (whether the guest will hear other guests)


## Installation
1. Before using the library, you must include [RTCMultiConnection](https://github.com/muaz-khan/RTCMultiConnection "RTCMultiConnection").
Now (25.11.2020) you need to add:
```javascript
    <script src="https://rtcmulticonnection.herokuapp.com/dist/RTCMultiConnection.min.js"></script>
    <script src="https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js"></script>
```

2. Clone a repository
3. Start web-server (for example, XAMPP or Nginx)

## File description
- webrtc.js - class description
- student.html - guest interface
- teacher.html - admin/owner interface
- studentExample.js - example using a class for a guest
- teacherExample.js - example using a class for a admin/owner

## Documentation

### Class GuestVC
#### `connect`
Type: **function**

Desc: Join to room.
#### `disconnect`
Type: **function**

Desc: Leave the room (it can be called anywhere in the code, but after defining an instance of this class).
#### `microOff`
Type: **function**

Desc: Disable micro (it can be called anywhere in the code, but after defining an instance of this class).
#### `microOn`
Type: **function**

Desc: Enable micro (it can be called anywhere in the code, but after defining an instance of this class).
#### `localCameraOff`
Type: **function**

Desc: Disable local camera (it can be called anywhere in the code, but after defining an instance of this class).
#### `localCameraOn`
Type: **function**

Desc: Enable local camera (it can be called anywhere in the code, but after defining an instance of this class).
#### `setUserName`
Type: **function**

Param: **string**

Desc: Set user name.
#### `setUserID`
Type: **function**

Param: **string** | **int**

Desc: Set user ID.
#### `setRoomID`
Type: **function**

Param: **string** | **int**

Desc: Set room ID for connection.
#### `setUserSatusConnection`
Type: **function**

Param: **bool**

Variable value:
**True** - connected
**False** - disconnected

Desc: Set user connection status.
#### `getUserStatusConnection`
Type: **function**

Return: **bool**

Variable value:
**True** - connected
**False** - disconnected

Desc: Get current user connection status.
#### `setElementHTMLVideoContainerRemote`
Type: **function**

Param:
1. HTML elem for display remote screen
2. HTML elem for display remote camera

Desc: set HTML elems for display remote video streams (must call before connect).
#### `setElementHTMLVideoContainerLocal`
Type: **function**

Param: HTML elems for display local camera

Desc: set HTML elem for display local camera (must call before connect).
#### `setConnectBtnUI`
Type: **function**

Param:
1. Type: **function**
    Сallback for displaying the connection
2. Type: **function**
    Сallback for displaying the disconnection

Desc: set callbacks for changing button state (must call before connect).
#### `getInstance`
Type: **function**

Return type: **GuestVC**

Desc: get instance of class GuestVC.
#### `setGuestAudibility`
Type: **function**

Param: **bool**

Variable value:
**True** - guest will be hear other guests
**False** - guest will not hear other guests

Desc: set whether a guest to hear the other guests in room
#### `getGuestAudibility`
Type: **function**

Return type: **bool**

Variable value:
**True** - guest will be hear other guests
**False** - guest will not hear other guests

Desc: set whether a guest to hear the other guests in room
#### `onUserStatusChanged`
Type: **event**

Desc: event that is triggered when the status of the room owner changes. (be sure to add at the end of the code).
#### `onRoomFull`
Type: **event**

Desc: event that is called when connecting if the room is full (be sure to add at the end of the code).
#### `onStream`
Type: **event**

Desc: event that handle stream (be sure to add at the end of the code).
#### `onMediaError`
Type: **event**

Desc: event that handle stream error (be sure to add at the end of the code).

### Class AdminVC
#### `setMaxGuestCount`
Type: **function**

Param: **int**

Desc: set max guest count in room.
#### `setElementsHTMLVideoContainerRemote`
Type: **function**

Param: HTML elems for display remote camera (the number of elements must be exactly max guest count)

Desc: set HTML elems for display remote video streams (must call before connect).
#### `setElementsHTMLVideoContainerLocal`
Type: **function**

Param:
1. HTML elem for display local camera
2. HTML elem for display screen

Desc: set HTML elems for display local camera and screen (must call before connect).
#### `setConnectBtnUI`
Type: **function**

Param:
1. Type: **function**
    Сallback for displaying the connection
2. Type: **function**
    Сallback for displaying the disconnection

Desc: set callbacks for changing button state (must call before connect).
#### `setUserSatusConnection`
Type: **function**

Param: **bool**

Variable value:
**True** - connected
**False** - disconnected

Desc: Set user connection status.
#### `getUserStatusConnection`
Type: **function**

Return: **bool**

Variable value:
**True** - connected
**False** - disconnected

Desc: Get current user connection status.
#### `setRoomID`
Type: **function**

Param: **string** | **int**

Desc: Set room ID for connection.
#### `setUserID`
Type: **function**

Param: **string** | **int**

Desc: Set user ID.
#### `setUserName`
Type: **function**

Param: **string**

Desc: Set user name.
#### `microOff`
Type: **function**

Desc: Disable micro (it can be called anywhere in the code, but after defining an instance of this class).
#### `microOn`
Type: **function**

Desc: Enable micro (it can be called anywhere in the code, but after defining an instance of this class).
#### `screenShareOn`
Type: **function**

Desc: Enable screen sharing (it can be called anywhere in the code, but after defining an instance of this class).
#### `screenShareOff`
Type: **function**

Desc: Disable screen sharing (it can be called anywhere in the code, but after defining an instance of this class).
#### `localCameraOff`
Type: **function**

Desc: Disable local camera (it can be called anywhere in the code, but after defining an instance of this class).
#### `localCameraOn`
Type: **function**

Desc: Enable local camera (it can be called anywhere in the code, but after defining an instance of this class).
#### `disconnect`
Type: **function**

Desc: Disabling and deleting a room (it can be called anywhere in the code, but after defining an instance of this class).
#### `connect`
Type: **function**

Desc: Create room.
#### `getInstance`
Type: **function**

Return type: **AdminVC**

Desc: get instance of class AdminVC.
#### `onUserStatusChanged`
Type: **event**

Desc: event that is triggered when the status of the room owner changes. (be sure to add at the end of the code).
#### `onStream`
Type: **event**

Desc: event that handle stream (be sure to add at the end of the code).
#### `onMediaError`
Type: **event**

Desc: event that handle stream error (be sure to add at the end of the code).
