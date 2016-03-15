self.port.on("show", function() {   
    getButtonState();
});

self.port.on("message", function(message) {
   initializeButton(message); 
});

function setButtonState(state) {
    self.postMessage({ cmd: "SetButtonState", data: { value: state } });
}

function getButtonState() {
    self.postMessage({ cmd: "GetButtonState" });
}

function initializeButton(value) {
    document.getElementById("myonoffswitch").checked = value;
}

function handleButtonChange(e) {
    setButtonState(e.target.checked)
}

window.addEventListener('DOMContentLoaded', function () {
    console.log("starting popup, adding change listner to popup");
      document.getElementById("myonoffswitch").addEventListener('change', handleButtonChange);
});

window.addEventListener('DOMContentLoaded', function () {
    console.log("starting popup, adding change listner to popup");
      getButtonState();
      document.getElementById("onoffswitchlabel").className = "onoffswitch-label";
});