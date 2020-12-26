---
description: Documentation for the two classes GuestVC and AdminVC with method descriptions
---

# Documentation

## Class GuestVC

Class for creating a connection from the guest side

### **`connect`**

**Desc:** Join to room

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - |  - |

### **`disconnect`**

**Desc:** Leave the room

{% hint style="info" %}
It can be called anywhere in the code, but after defining an instance of this class
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`setVideoContainerForTestCamera`**

**Desc:** Set video container for testing to display camera

{% hint style="info" %}
Use before testing starts
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`elem HTML`** | - |

### **`setCameraDevice`**

**Desc:** Set camera device

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`string`** - device ID | - |

### **`setMicroDevice`**

**Desc:** Set micro device

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`string`** - device ID | - |

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

### **`setSoundDevice`**

**Desc:** Set sound device

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`string`** - device ID | - |

### **`getMicroDevicesList`**

**Desc:** Get micro devices list

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

<table>
  <thead>
    <tr>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Param</th>
      <th style="text-align:left">Return</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><b>method</b>
      </td>
      <td style="text-align:left">-</td>
      <td style="text-align:left"><b><code>objects array</code></b>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"></td>
      <td style="text-align:left">
        <p><code>{</code>
        </p>
        <p><code>    deviceId: &quot;&quot;,</code>
        </p>
        <p><code>    label: &quot;&quot;</code>
        </p>
        <p><code>}</code>
        </p>
      </td>
    </tr>
  </tbody>
</table>

### **`getCameraDevicesList`**

**Desc:** Get camera devices list

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

<table>
  <thead>
    <tr>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Param</th>
      <th style="text-align:left">Return</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><b>method</b>
      </td>
      <td style="text-align:left">-</td>
      <td style="text-align:left"><b><code>objects array</code></b>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"></td>
      <td style="text-align:left">
        <p><code>{</code>
        </p>
        <p><code>    deviceId: &quot;&quot;,</code>
        </p>
        <p><code>    label: &quot;&quot;</code>
        </p>
        <p><code>}</code>
        </p>
      </td>
    </tr>
  </tbody>
</table>

### **`getSoundDevicesList`**

**Desc:** Get sound devices list

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

<table>
  <thead>
    <tr>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Param</th>
      <th style="text-align:left">Return</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><b>method</b>
      </td>
      <td style="text-align:left">-</td>
      <td style="text-align:left"><b><code>objects array</code></b>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"></td>
      <td style="text-align:left">
        <p><code>{</code>
        </p>
        <p><code>    deviceId: &quot;&quot;,</code>
        </p>
        <p><code>    label: &quot;&quot;</code>
        </p>
        <p><code>}</code>
        </p>
      </td>
    </tr>
  </tbody>
</table>

### **`getCurrentCameraDevice`**

**Desc:** get current camera device ID

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`string`** |

### **`getCurrentSoundDevice`**

**Desc:** get current sound device ID

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`string`** |

### **`getCurrentMicroDevice`**

**Desc:** get current micro device ID

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`string`** |

### **`startTest`**

**`Desc:`** Start testing devices

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`stopTest`**

**`Desc:`** Stop testing devices

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`setElementHTMLMessages`**

**Desc:** Set elem HTML for display chat

{% hint style="info" %}
It can be called anywhere in the code, but after defining an instance of this class
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`elem HTML`** | - |

### **`sendMsg`**

**Desc:** Send message for chat

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`string`** - message for send | - |
|  | **`string`** - user ID for direct message \(example, **`@student1234 Hello!`**\) |  |

### **`setClassStyleMsg`**

**Desc:** Set classes for styling messages for chat

<table>
  <thead>
    <tr>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Param</th>
      <th style="text-align:left">Return</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><b>method</b>
      </td>
      <td style="text-align:left">
        <p><code>{ </code>
        </p>
        <p><code>    own: &quot;className&quot;, </code>
        </p>
        <p><code>    fromGuestToMe: &quot;className&quot;,</code>
        </p>
        <p><code>    fromOwnerToMe: &quot;className&quot;,</code>
        </p>
        <p><code>    fromMeToGuest: &quot;className&quot;,</code>
        </p>
        <p><code>    guests: &quot;className&quot;,</code>
        </p>
        <p><code>    roomOwner: &quot;className&quot; </code>
        </p>
        <p><code>}</code>
        </p>
      </td>
      <td style="text-align:left">-</td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"><b><code>own</code></b> - for display own messages</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"><b><code>fromGuestToMe</code></b> - messages from guest to guest as direct
        message (other guests doesn&apos;t see this message)</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"><b><code>fromOwnerToMe</code></b> - message from room owner to guest as
        direct message (other guests doesn&apos;t see this message)</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"><b><code>fromMeToGuest</code></b> - message as direct message from me to
        guest</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"><b><code>guests</code></b> - message for all users in room from guests</td>
      <td
      style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"><b><code>roomOwner</code></b> - message from room owner for all users in
        room</td>
      <td style="text-align:left"></td>
    </tr>
  </tbody>
</table>

### **`setChatMode`**

**Desc:** Set chat config for guests

<table>
  <thead>
    <tr>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Param</th>
      <th style="text-align:left">Return</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><b>method</b>
      </td>
      <td style="text-align:left">
        <p><code>{ </code>
        </p>
        <p><code>    isDirect: true/false,</code>
        </p>
        <p><code>    isVisibleForAll: true/false</code>
        </p>
        <p><code>}</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left">
        <p><b><code>isDirect</code></b> - can the guest use the direct messaging feature</p>
        <ul>
          <li><b><code>true</code> </b>- can</li>
          <li><b><code>false</code> </b>- can&apos;t</li>
        </ul>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left">
        <p><b><code>isVisibleForAll</code></b> - can a guest see other guests messages
          for all</p>
        <ul>
          <li><b><code>true</code></b> - can</li>
          <li><b><code>false</code></b> - can&apos;t</li>
        </ul>
      </td>
      <td style="text-align:left"></td>
    </tr>
  </tbody>
</table>

{% hint style="info" %}
Be sure to set values for all parameters when using this method, or you can choose not to use this method, then the default parameters will be used
{% endhint %}

### **`microOff`**

**Desc:** Disable micro

{% hint style="info" %}
It can be called anywhere in the code, but after defining an instance of this class
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`microOn`**

**Desc:** Enable micro

{% hint style="info" %}
It can be called anywhere in the code, but after defining an instance of this class
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`localCameraOff`**

**Desc:** Disable local camera

{% hint style="info" %}
It can be called anywhere in the code, but after defining an instance of this class
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`localCameraOn`**

**Desc:** Enable local camera

{% hint style="info" %}
It can be called anywhere in the code, but after defining an instance of this class
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`setUserName`**

**Desc:** Set user name

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`string`** | - |
|  | **`int`** |  |

### **`setUserID`**

**Desc:** Set user ID

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`string`** | - |

### **`getUserID`**

**Desc:** Get user ID

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`string`** |

### **`getUsersList`**

**Desc:** Get users ID in room

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`string array`** |

### **`setRoomID`**

**Desc:** Set room ID for connection

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`string`** | - |
|  | **`int`** |  |

### **`setUserSatusConnection`**

**Desc:** Set user connection status

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`bool`** | - |

### **`getUserStatusConnection`**

**Desc:** Get current user connection status

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`bool`** |
|  |  | **`true`** - connected |
|  |  | **`false`** - disconnected |

### **`setElementHTMLVideoContainerRemote`**

**Desc:** Set HTML elems for display remote video streams

{% hint style="info" %}
Must call before connect
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **HTML elem** for display remote screen | - |
|  | **HTML elem** for display remote camera |  |

### **`setElementHTMLVideoContainerLocal`**

**Desc:** Set HTML elem for display local camera

{% hint style="info" %}
Must call before connect
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **HTML elem** for display local camera | - |

### **`setConnectBtnUI`**

**Desc:** Set callbacks for changing button state

{% hint style="info" %}
Must call before connect
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`callback`** for displaying the connection | - |
|  | **`callback`** for displaying the disconnection |  |

### **`getInstance`**

**Desc:** Get instance of class **`GuestVC`**

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`GuestVC`** |

### `detect2g`

**Desc:** Detect 2G network and alert the user

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### `sendDataToContentView`

**Desc:** Send some data to room owner for display it in content view

<table>
  <thead>
    <tr>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Param</th>
      <th style="text-align:left">Return</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><b>method</b>
      </td>
      <td style="text-align:left"><b><code>structure</code></b>
      </td>
      <td style="text-align:left">-</td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left">
        <p><code>{</code>
        </p>
        <p><code>    head: &quot;title of custom event&quot;</code>
        </p>
        <p><code>    content: &quot;hello world!&quot;</code>
        </p>
        <p><code>}</code>
        </p>
      </td>
      <td style="text-align:left">-</td>
    </tr>
  </tbody>
</table>

### **`setGuestAudibility`**

**Desc:** Set whether a guest to hear the other guests in room

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`bool`** | - |
|  | **`true`**- guest will be hear other guests |  |
|  | **`false`** - guest will not hear other guests |  |

### **`getGuestAudibility`**

**Desc:** Set whether a guest to hear the other guests in room

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`bool`** |
|  |  | **`true`** - guest will be hear other guests |
|  |  | **`false`** - guest will not hear other guests |

### **`onUserStatusChanged`**

**Desc:** Event that is triggered when the status of the room owner changes

{% hint style="info" %}
Be sure to add at the end of the code
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`onRoomFull`**

**Desc:** Event handler that is called when connecting if the room is full

{% hint style="info" %}
Be sure to add at the end of the code
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

### **`onStream`**

**Desc:** Event handler that handle stream

{% hint style="info" %}
Be sure to add at the end of the code
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

### **`onMediaError`**

**Desc:** Event handler that handle stream error

{% hint style="info" %}
Be sure to add at the end of the code
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

### `onMessage`

**Desc:** Event handler for messgae from other peers

| Type | Param | Return |
| :--- | :--- | :--- |
| event | **`callback`** | - |

## Class AdminVC

Class for creating a link on the owner's side

### **`setVideoContainerForTestCamera`**

**Desc:** Set video container for testing to display camera

{% hint style="info" %}
Use before testing starts
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`elem HTML`** | - |

### **`setCameraDevice`**

**Desc:** Set camera device

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`string`** - device ID | - |

### **`setMicroDevice`**

**Desc:** Set micro device

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`string`** - device ID | - |

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

### **`setSoundDevice`**

**Desc:** Set sound device

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`string`** - device ID | - |

### **`getMicroDevicesList`**

**Desc:** Get micro devices list

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`string array`** |

### **`getCameraDevicesList`**

**Desc:** Get camera devices list

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`string array`** |

### **`getSoundDevicesList`**

**Desc:** Get sound devices list

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`string array`** |

### **`getCurrentCameraDevice`**

**Desc:** get current camera device ID

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`string`** |

### **`getCurrentSoundDevice`**

**Desc:** get current sound device ID

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`string`** |

### **`getCurrentMicroDevice`**

**Desc:** get current micro device ID

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`string`** |

### **`startTest`**

**`Desc:`** Start testing devices

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`stopTest`**

**`Desc:`** Stop testing devices

{% hint style="info" %}
Use before connecting to the session
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`setMaxGuestCount`**

**Desc:** Set max guest count in room

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`int`** | - |

### **`setElementsHTMLVideoContainerRemote`**

**Desc:** Set HTML elems for display remote video streams

{% hint style="info" %}
Must call before connect
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`HTML elems`** for display remote camera \(the number of elements must be exactly max guest count\) | - |

### **`setElementsHTMLVideoContainerLocal`**

**Desc:** Set HTML elems for display local camera and screen

{% hint style="info" %}
Must call before connect
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`HTML elem`** for display local camera | - |
|  | **`HTML elem`** for display screen |  |

### **`setContentViewContainer`**

**Desc:** Set HTML elems for copy children

{% hint style="info" %}
Must call before connect
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`HTML elem`**  | - |

### **`setElementHTMLMessages`**

**Desc:** Set elem HTML for display chat

{% hint style="info" %}
Must call before connect
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`elem HTML`** | - |

### **`sendMsg`**

**Desc:** Send message for chat

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`string`** - message for send | - |
|  | **`string`** - user ID for direct message \(example, **`@student1234 Привет!`**\) |  |

### **`setClassStyleMsg`**

**Desc:** Set classes for styling messages for chat

<table>
  <thead>
    <tr>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Param</th>
      <th style="text-align:left">Return</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><b>&#x43C;&#x435;&#x442;&#x43E;&#x434;</b>
      </td>
      <td style="text-align:left">
        <p><code>{ </code>
        </p>
        <p><code>    own: &quot;className&quot;, </code>
        </p>
        <p><code>    fromGuestToMe: &quot;className&quot;,</code>
        </p>
        <p><code>    fromMeToGuest: &quot;className&quot;,</code>
        </p>
        <p><code>    fromGuestToGuest: &quot;className&quot;,</code>
        </p>
        <p><code>    guests: &quot;className&quot;,</code>
        </p>
        <p><code>}</code>
        </p>
      </td>
      <td style="text-align:left">-</td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"><b><code>own</code></b> - for display own message</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"><b><code>fromGuestToMe</code></b> - message form guest to me as direct
        message</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"><b><code>fromMeToGuest</code></b> - message from me to guest as direct
        message</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"><b><code>fromGuestToGuest</code></b> - message from guest to guest as direct
        message</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"><b><code>guests</code></b> - message from guest for all</td>
      <td style="text-align:left"></td>
    </tr>
  </tbody>
</table>

### **`setChatMode`**

**Desc:** Set chat config for room owner

<table>
  <thead>
    <tr>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Param</th>
      <th style="text-align:left">Return</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><b>method</b>
      </td>
      <td style="text-align:left">
        <p><code>{ </code>
        </p>
        <p><code>    isDirect: true/false,</code>
        </p>
        <p><code>    isVisibleGuestForOwner: true/false</code>
        </p>
        <p><code>}</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left">
        <p><b><code>isDirect</code></b> - can the owner of the room use the direct
          message feature</p>
        <ul>
          <li><b><code>true</code> </b>- can</li>
          <li><b><code>false</code> </b>- can&apos;t</li>
        </ul>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left">
        <p><b><code>isVisibleGuestForOwner</code></b> - can room owner see message
          from guest to guest as direct message</p>
        <ul>
          <li><b><code>true</code></b> - can</li>
          <li><b><code>false</code></b> - can&apos;t</li>
        </ul>
      </td>
      <td style="text-align:left"></td>
    </tr>
  </tbody>
</table>

{% hint style="info" %}
Be sure to set values for all parameters when using this method, or you can choose not to use this method, then the default parameters will be used
{% endhint %}

### **`setConnectBtnUI`**

**Desc:** Set callbacks for changing button state

{% hint style="info" %}
Must call before connect
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`сallback`** for displaying the connection | - |
|  | **`сallback`** for displaying the disconnection |  |

### **`setVideoRecordingConfig`**

**Desc:** Set config for screen recorder

<table>
  <thead>
    <tr>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Param</th>
      <th style="text-align:left">Return</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><b>method</b>
      </td>
      <td style="text-align:left">
        <p><code>{</code>
        </p>
        <p><code>    type: &quot;video&quot;,</code>
        </p>
        <p><code>    mimeType: &quot;video/webm&quot;,</code>
        </p>
        <p><code>    resolution: { </code>
        </p>
        <p><code>        width: 1280,</code>
        </p>
        <p><code>        height: 720 </code>
        </p>
        <p><code>    },</code>
        </p>
        <p><code>    frameRate: 30,</code>
        </p>
        <p><code>    bitrate: 128000,</code>
        </p>
        <p><code>}</code>
        </p>
      </td>
      <td style="text-align:left">-</td>
    </tr>
  </tbody>
</table>

### **`setUserSatusConnection`**

**Desc:** Set user connection status

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`bool`** | - |
|  | **`true`** - connected |  |
|  | **`false`** - disconnected |  |

### **`getUserStatusConnection`**

**Desc:** Get current user connection status

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`bool`** |
|  |  | **`true`** - connected |
|  |  | **`false`**- disconnected |

### **`setRoomID`**

**Desc:** Set room ID for connection

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`string`** | - |
|  | **`int`** |  |

### **`getUserID`**

**Desc:** Get user ID

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`string`** |

### **`setUserID`**

**Desc:** Set user ID

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`string`** | - |

### **`getUsersList`**

**Desc:** Get users ID in room

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`string array`** |

### **`setUserName`**

**Desc:** Set user name

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`string`** | - |
|  | **`int`** |  |

### **`screenRecordingOn`**

**Desc:** turn on screen recorder

{% hint style="info" %}
It can be called anywhere in the code, but after defining an instance of this class
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`bool`** |
|  |  | **`true`** - if success start |
|  |  | **`false`** - if error |

### **`screenRecordingOff`**

**Desc:** turn on screen recorder

{% hint style="info" %}
It can be called anywhere in the code, but after defining an instance of this class
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`callback(blob)`** | **`bool`** |
|  |  | **`true`** - if success end |
|  |  | **`false`** - if error |

### **`microOff`**

**Desc:** Disable micro

{% hint style="info" %}
It can be called anywhere in the code, but after defining an instance of this class
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`microOn`**

**Desc:** Enable micro

{% hint style="info" %}
It can be called anywhere in the code, but after defining an instance of this class
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`screenShareOn`**

**Desc:** Enable screen sharing

{% hint style="info" %}
It can be called anywhere in the code, but after defining an instance of this class
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`screenShareOff`**

**Desc:** Disable screen sharing

{% hint style="info" %}
It can be called anywhere in the code, but after defining an instance of this class
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`localCameraOff`**

**Desc:** Disable local camera

{% hint style="info" %}
It can be called anywhere in the code, but after defining an instance of this class
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`localCameraOn`**

**Desc:** Enable local camera

{% hint style="info" %}
It can be called anywhere in the code, but after defining an instance of this class
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`detect2g`**

**Desc:** Detect 2G network and alert the user

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### `sendDataToContentView`

**Desc:** Send some data to guests for display it in content view

<table>
  <thead>
    <tr>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Param</th>
      <th style="text-align:left">Return</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><b>method</b>
      </td>
      <td style="text-align:left"><b><code>structure</code></b>
      </td>
      <td style="text-align:left">-</td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left">
        <p><code>{</code>
        </p>
        <p><code>    head: &quot;title of custom event&quot;</code>
        </p>
        <p><code>    content: &quot;hello world!&quot;</code>
        </p>
        <p><code>}</code>
        </p>
      </td>
      <td style="text-align:left">-</td>
    </tr>
  </tbody>
</table>

### **`disconnect`**

**Desc:** Disabling and deleting a room

{% hint style="info" %}
It can be called anywhere in the code, but after defining an instance of this class
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`connect`**

**Desc:** Create room

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`getInstance`**

**Desc:** Get instance of class **`AdminVC`**

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **`AdminVC`** |

### **`onUserStatusChanged`**

**Desc:** Event handler that is triggered when the status of the room owner changes

{% hint style="info" %}
Be sure to add at the end of the code
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

### **`onStream`**

**Desc:** Event handler that handle stream

{% hint style="info" %}
Be sure to add at the end of the code
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

### **`onMediaError`**

**Desc:** Event handler that handle stream error

{% hint style="info" %}
Be sure to add at the end of the code
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

### `onMessage`

**Desc:** Event handler for massage from guests

{% hint style="info" %}
Be sure to add at the end of the code
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | **`callback`** | - |

