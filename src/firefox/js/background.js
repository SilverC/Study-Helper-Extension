var isExtensionOn = true;
var urls = ["facebook.com", "twitter.com", "instagram.com", "pinterest.com"];

/*
 * Intercepts browser request and redirects them to local page if they are blocked
 */
function interceptRequest(request)
{
    if(request && request.url && isExtensionOn)
    {
        if(request.type == "main_frame") // new page/site is loading in main window
        {
            for(var url of urls) {
                if(request.url.indexOf(url) > -1)
                {
                    //Bug does not allow for redirection to local resource
                    //var blockedPage = browser.extension.getURL("html/blocked.html");
                    return { redirectUrl: "https://google.com" };
                }  
            }
            
        }
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
browser.webRequest.onBeforeRequest.addListener(interceptRequest, {urls: ["<all_urls>"]}, ['blocking']);