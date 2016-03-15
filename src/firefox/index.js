var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var state = true;

var button = ToggleButton({
  id: "my-button",
  label: "my button",
  icon: {
    "16": "./images/icon-16.png",
    "32": "./images/icon-32.png",
    "64": "./images/icon-64.png"
  },
  onChange: handleChange
});

var panel = panels.Panel({
  contentURL: self.data.url("./html/popup.html"),
  onHide: handleHide,
  onMessage: handleMessage
});

function handleMessage(message) {
    console.log("message received in addon")
    if(message.cmd == 'GetButtonState') {
        panel.PostMessage(state)
    }
    else if(message.cmd == 'SetButtonState') {
        state = message.value;
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
  self.on(self postmessage, )
}