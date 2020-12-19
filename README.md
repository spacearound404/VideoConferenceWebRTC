# Video Conference WebRTC

Lib for quickly creating a web video chat with using RTCMultiConnection lib.

[![Generic badge](https://img.shields.io/badge/release-v1.0.0-blue.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/size-58.9kB-green.svg)](https://shields.io/)

## Latest update

19.12.2020

* Added a chat with the ability to send private messages inside a shared chat \(example, **`@student1234 hello!`**\)
* Fixed UI

12.12.2020

* Fixed bugs with screen recording 
* Fixed bugs on the owner's side related to disconnection 
* Fixed bugs on the side of the guest associated with the disconnection
* Fixed bug related to determining the current status of guests

11.12.2020

* Fixed bugs with mute/unmute video
* Fixed bugs with echo 

2.12.2020

* Add screen recorder
* Add share content

01.12.2020

* Fixed bugs with count guest in room
* Add screen recording

30.11.2020

* Fixed bugs with reconnection on IOS and OS X
* Fixed bug with audibilaty guest
* Add error handler for guest function connect
* Add 2g detection

28.11.2020

* Fixed bug with restart screen sharing
* Added IOS/OS X UI \(prefix styles\)
* Fixed bug with the display of guests at the guest
* Fixed bug with disconnection
* Edit example code

28.11.2020

* Fixed bug with restart screen sharing
* Added IOS/OS X UI \(prefix styles\)
* Fixed bug with the display of guests at the guest
* Fixed bug with disconnection
* Edit example code

27.11.2020

* Fixed bug with callback button status UI
* Add mobile version UI
* Added a setting to change the audibility of other participants in the room
* Fixed a bug with visual container overflow
* Added the ability to change the audibility of room guests for the guests themselves \(whether the guest will hear other guests\)

## Installation

1. Before using the library, you must include [RTCMultiConnection](https://github.com/muaz-khan/RTCMultiConnection). Now \(25.11.2020\) you need to add:

   ```text
   <script src="https://rtcmulticonnection.herokuapp.com/dist/RTCMultiConnection.min.js"></script>
   <script src="https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js"></script>
   ```

2. Clone a repository
3. Start web-server \(for example, XAMPP or Nginx\)

## File description

* webrtc.js - class description
* student.html - guest interface
* teacher.html - admin/owner interface
* studentExample.js - example using a class for a guest
* teacherExample.js - example using a class for a admin/owner

