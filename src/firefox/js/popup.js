function setButtonState(state) {
    browser.runtime.sendMessage({ cmd: "SetButtonState", data: { value: state } });
}

function getButtonState() {
    browser.runtime.sendMessage({ cmd: "GetButtonState" }, function (response) {
        initializeButton(response);
    });
}

function initializeButton(value) {
    document.getElementById("myonoffswitch").checked = value;
}

function handleButtonChange(e) {
    setButtonState(e.target.checked)
}

document.addEventListener('DOMContentLoaded', function () {
      document.getElementById("myonoffswitch").addEventListener('change', handleButtonChange);
});

document.addEventListener('DOMContentLoaded', function () {
      getButtonState();
      document.getElementById("onoffswitchlabel").className = "onoffswitch-label";
});