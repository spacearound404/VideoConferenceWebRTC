# Documentation

## Class GuestVC

### **`connect`**

**Desc:** Join to room

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - |  - |

### **`disconnect`**

**Desc:** Leave the room \(it can be called anywhere in the code, but after defining an instance of this class\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`microOff`**

**Desc:** Disable micro \(it can be called anywhere in the code, but after defining an instance of this class\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`microOn`**

**Desc:** Enable micro \(it can be called anywhere in the code, but after defining an instance of this class\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`localCameraOff`**

**Desc:** Disable local camera \(it can be called anywhere in the code, but after defining an instance of this class\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`localCameraOn`**

**Desc:** Enable local camera \(it can be called anywhere in the code, but after defining an instance of this class\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`setUserName`**

**Desc:** Set user name

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **string** | - |

### **`setUserID`**

**Desc:** Set user ID

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **string** | - |

### **`setRoomID`**

**Desc:** Set room ID for connection

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **string** | - |

### **`setUserSatusConnection`**

**Desc:** Set user connection status

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **bool** | - |

### **`getUserStatusConnection`**

**Desc:** Get current user connection status

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **bool** |

### **`setElementHTMLVideoContainerRemote`**

**Desc:** Set HTML elems for display remote video streams \(must call before connect\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | HTML elem for display remote screen | - |
|  | HTML elem for display remote camera |  |

### **`setElementHTMLVideoContainerLocal`**

**Desc:** Set HTML elem for display local camera \(must call before connect\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | HTML elems for display local camera | - |

### **`setConnectBtnUI`**

**Desc:** Set callbacks for changing button state \(must call before connect\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | Callback for displaying the connection | - |
|  | Callback for displaying the disconnection |  |

### **`getInstance`**

**Desc:** Get instance of class GuestVC

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | GuestVC |

### **`setGuestAudibility`**

**Desc:** Set whether a guest to hear the other guests in room

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **bool** | - |

### **`getGuestAudibility`**

**Desc:** Set whether a guest to hear the other guests in room

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **bool** |

### **`onUserStatusChanged`**

**Desc:** Event that is triggered when the status of the room owner changes. \(be sure to add at the end of the code\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`onRoomFull`**

**Desc:** Event that is called when connecting if the room is full \(be sure to add at the end of the code\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

### **`onStream`**

**Desc:** Event that handle stream \(be sure to add at the end of the code\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

### **`onMediaError`**

**Desc:** Event that handle stream error \(be sure to add at the end of the code\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

## Class AdminVC

### **`setMaxGuestCount`**

**Desc:** Set max guest count in room

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **int** | - |

### **`setElementsHTMLVideoContainerRemote`**

**Desc:** Set HTML elems for display remote video streams \(must call before connect\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | HTML elems for display remote camera \(the number of elements must be exactly max guest count\) | - |

### **`setElementsHTMLVideoContainerLocal`**

**Desc:** Set HTML elems for display local camera and screen \(must call before connect\)

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
        <p></p>
        <p>HTML elem for display local camera</p>
      </td>
      <td style="text-align:left">-</td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left">
        <p></p>
        <p>HTML elem for display screen</p>
      </td>
      <td style="text-align:left"></td>
    </tr>
  </tbody>
</table>

### **`setConnectBtnUI`**

**Desc:** Set callbacks for changing button state \(must call before connect\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | Callback for displaying the connection | - |
|  | Callback for displaying the disconnection |  |

### **`setUserSatusConnection`**

**Desc:** Set user connection status

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **bool** | - |

### **`getUserStatusConnection`**

**Desc:** Get current user connection status

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | **bool** |

### **`setRoomID`**

**Desc:** Set room ID for connection

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **string** | - |

### **`setUserID`**

**Desc:** Set user ID

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **string** | - |

### **`setUserName`**

**Desc:** Set user name

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | **string** | - |

### **`microOff`**

**Desc:** Disable micro \(it can be called anywhere in the code, but after defining an instance of this class\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`microOn`**

**Desc:** Enable micro \(it can be called anywhere in the code, but after defining an instance of this class\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`screenShareOn`**

**Desc:** Enable screen sharing \(it can be called anywhere in the code, but after defining an instance of this class\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`screenShareOff`**

**Desc:** Disable screen sharing \(it can be called anywhere in the code, but after defining an instance of this class\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`localCameraOff`**

**Desc:** Disable local camera \(it can be called anywhere in the code, but after defining an instance of this class\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`localCameraOn`**

**Desc:** Enable local camera \(it can be called anywhere in the code, but after defining an instance of this class\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`disconnect`**

**Desc:** Disabling and deleting a room \(it can be called anywhere in the code, but after defining an instance of this class\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`connect`**

**Desc:** Create room

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** | - | - |

### **`getInstance`**

**Desc:** Get instance of class AdminVC

| Type | Param | Return |
| :--- | :--- | :--- |
| **method** |  | AdminVC |

### **`onUserStatusChanged`**

**Desc:** Event that is triggered when the status of the room owner changes. \(be sure to add at the end of the code\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

### **`onStream`**

**Desc:** Event that handle stream \(be sure to add at the end of the code\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

### **`onMediaError`**

**Desc:** Event that handle stream error \(be sure to add at the end of the code\)

| Type | Param | Return |
| :--- | :--- | :--- |
| **event** | - | - |

