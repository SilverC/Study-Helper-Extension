var isExtensionOn = true;
var urls = ["*://*.facebook.com/*", "*://*.twitter.com/*", "*://*.instagram.com/*", "*://*.pinterest.com/*", "*://*.reddit.com/*", "*://*.buzzfeed.com/*", "*://*.tumblr.com/*", "*://*.imgur.com/*"];

/*
 * Intercepts browser request and redirects them to local page if they are blocked
 */
function interceptRequest(request)
{
    if(request && request.url && isExtensionOn)
    {
        //Bug does not allow for redirection to local resource
        //https://bugzilla.mozilla.org/show_bug.cgi?id=1256122
        //var blockedPage = browser.extension.getURL("html/blocked.html");
        return { redirectUrl: "https://google.com" };
    }
}

/*
 * Handles messages for button states
 */
function buttonStateHandler(request, sender, sendResponse) {
    if(request.cmd == "GetButtonState") {
        sendResponse(isExtensionOn);
    }
    else if(request.cmd == "SetButtonState") {
        isExtensionOn = request.data.value;
    }
}

browser.runtime.onMessage.addListener(buttonStateHandler);
browser.webRequest.onBeforeRequest.addListener(interceptRequest, {urls: urls, types: ["main_frame"]}, ['blocking']);