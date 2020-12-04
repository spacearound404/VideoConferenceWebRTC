---
description: Lib for quickly creating a web video chat with using RTCMultiConnection lib.
---

# Video Conference WebRTC

## [![Generic badge](https://img.shields.io/badge/release-v1.0.0-blue.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/size-58.9kB-green.svg)](https://shields.io/)

### Latest update

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

### Installation

1. Before using the library, you must include [RTCMultiConnection](https://github.com/muaz-khan/RTCMultiConnection). Now \(25.11.2020\) you need to add:

   ```text
   <script src="https://rtcmulticonnection.herokuapp.com/dist/RTCMultiConnection.min.js"></script>
   <script src="https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js"></script>
   ```

2. Clone a repository
3. Start web-server \(for example, XAMPP or Nginx\)

### File description

* webrtc.js - class description
* student.html - guest interface
* teacher.html - admin/owner interface
* studentExample.js - example using a class for a guest
* teacherExample.js - example using a class for a admin/owner

