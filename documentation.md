# Documentation

## Class GuestVC

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
|  | **`int`** |  |

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

**Desc:** Event that is called when connecting if the room is full

{% hint style="info" %}
Be sure to add at the end of the code
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

### **`onStream`**

**Desc:** Event that handle stream

{% hint style="info" %}
Be sure to add at the end of the code
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

### **`onMediaError`**

**Desc:** Event that handle stream error

{% hint style="info" %}
Be sure to add at the end of the code
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

### `onMessage`

**Desc:** Handler for messgae from other peers

| Type | Param | Return |
| :--- | :--- | :--- |
| event | **`callback`** | - |

## Class AdminVC

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

### **`setConnectBtnUI`**

**Desc:** Set callbacks for changing button state

{% hint style="info" %}
Must call before connect
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`сallback`** for displaying the connection | - |
|  | **`сallback`** for displaying the disconnection |  |

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

### **`setUserID`**

**Desc:** Set user ID

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`string`** | - |
|  | **`int`** |  |

### **`setUserName`**

**Desc:** Set user name

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **`string`** | - |
|  | **`int`** |  |

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

**Desc:** Event that is triggered when the status of the room owner changes

{% hint style="info" %}
Be sure to add at the end of the code
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

### **`onStream`**

**Desc:** Event that handle stream

{% hint style="info" %}
Be sure to add at the end of the code
{% endhint %}

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

### **`onMediaError`**

**Desc:** Event that handle stream error

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

