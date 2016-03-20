self.on("message", function(message) {
   initializeButton(message); 
});

function setButtonState(state) {
    self.postMessage({ cmd: "SetButtonState", data: { value: state } });
}

function getButtonState() {
    console.log("getButtonState");
    self.postMessage({ cmd: "GetButtonState" });
}

function initializeButton(value) {
    document.getElementById("myonoffswitch").checked = value;
}

function handleButtonChange(e) {
    console.log("Handle button change, set button value")
    setButtonState(e.target.checked)
}

self.port.on('show', function () {
      document.getElementById("myonoffswitch").addEventListener('change', handleButtonChange);
});

self.port.on('show', function () {
      getButtonState();
      document.getElementById("onoffswitchlabel").className = "onoffswitch-label";
});