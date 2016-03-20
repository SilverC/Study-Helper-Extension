var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var ss = require("sdk/simple-storage");
if(!ss.storage.state) {
    ss.storage.state = true;
}

var button = ToggleButton({
  id: "my-button",
  label: "my button",
  icon: {
    "16": "./images/icon-16.png",
    "32": "./images/icon-32.png",
    "64": "./images/icon-64.png"
  },
  onClick: handleChange,
  onChange: handleChange,
  onHide: handleHide,
  value: true
});

var panel = panels.Panel({
  contentURL: self.data.url("./html/popup.html"),
  contentScriptFile: self.data.url("./js/popup.js"),
  onHide: handleHide,
  onMessage: handleMessage
});

// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
panel.on("show", function() {
  panel.port.emit("show");
});

function handleMessage(message) {
    if(message.cmd == 'GetButtonState') {
        panel.postMessage(ss.storage.state)
    }
    else if(message.cmd == 'SetButtonState') {
        console.log(message.data.value);
        ss.storage.state = message.data.value;
    }
}

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}