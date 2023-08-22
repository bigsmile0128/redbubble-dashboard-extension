// This background script is used to initialize the connection
const messagesFromReactAppListener = async (
    msg: any,
    sender: any,
    sendResponse: (response: any) => void
) => {
    console.log("msg:", msg);
    console.log("sender:", sender);

    if (msg === "mess") {
        sendResponse({ name: "king", gender: "m" });
    } else if (msg.type === "ext") {
        await sendMessageToActiveTab({ data: msg.formData });
    }
};

const sendMessageToActiveTab = async (message: any) => {
    const [tab]: any = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
    });
    const response = chrome.tabs.sendMessage(tab.id, message);
    console.log(response);
    // TODO: Do something with the response.
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

export {};
