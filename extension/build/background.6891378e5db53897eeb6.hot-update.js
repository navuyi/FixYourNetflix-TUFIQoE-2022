"use strict";
self["webpackHotUpdatefix_your_netflix_experiment_extension"]("background",{

/***/ "./src/pages/Background/index.ts":
/*!***************************************!*\
  !*** ./src/pages/Background/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module './modules/Controller'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _utils_time_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/time_utils */ "./src/utils/time_utils.ts");
/* harmony import */ var _config_messages_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/messages.config */ "./src/config/messages.config.ts");
/* harmony import */ var _utils_classes_ChromeStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/classes/ChromeStorage */ "./src/utils/classes/ChromeStorage.ts");




const chrome_storage = new _utils_classes_ChromeStorage__WEBPACK_IMPORTED_MODULE_3__.ChromeStorage();
/**
 * Detect extension reloads and perform actions.
 * This listener callback executes only when extension is installed or reloaded.
*/
chrome.runtime.onInstalled.addListener(async () => {
    console.log(`[BackgroundScript] | ${(0,_utils_time_utils__WEBPACK_IMPORTED_MODULE_1__.get_local_datetime)(new Date())} | Installing...`);
    // Initialize local storage || WARNING --> THIS RESETS ALL chrome.storage KEYS TO DEFAULT VALUES
    await chrome_storage.initialize_default(); // same as --> chrome.storage.local.set(STORAGE_DEFAULT)
});
chrome.action.onClicked.addListener(async (tab) => {
    if (tab && tab.id) {
        await chrome.tabs.update(tab.id, {
            url: "setup.html"
        });
    }
});
/** Message listeners
 * DO NOT USE await inside onMessage listener callback's body.
 * REMEMBER to return true at the end of the onMessage listener callback's body.
 *
 * Returning true at the end tells the other side of connection to wait for response
 * that will asynchronously, that is why sendResponse is mandatory.
 * Using await inside callback's body would result in errors.
*/
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // do not use async/await within listener callback
    /*no await!!!*/ receive_finished_signal(message, sender, sendResponse);
    /*no await!!!*/ receive_redirect_signal(message, sender, sendResponse);
    return true; // return true is essential to indicate that response will be sent asynchronously
});
// Initialize Controller instance
const controller = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './modules/Controller'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
controller.init();
/**
 * Function checks if received message is signal indicating end of video
 * Redirects the tab that the message came from to the custom web page
 * REMEMBER to use sendResponse !!!
*/
const receive_finished_signal = async (message, sender, sendResponse) => {
    if (message.header === _config_messages_config__WEBPACK_IMPORTED_MODULE_2__.MESSAGE_HEADERS.FINISHED) {
        // Redirect to custom webpage
        if (sender.tab) {
            const tabId = sender.tab.id;
            await chrome.tabs.update(tabId, {
                url: "break.html"
            });
            sendResponse({ msg: "Finish signal received" }); // Essential sendResponse
        }
    }
};
const receive_redirect_signal = async (message, sender, sendResponse) => {
    if (message.header === _config_messages_config__WEBPACK_IMPORTED_MODULE_2__.MESSAGE_HEADERS.REDIRECT) {
        if (sender.tab) {
            const tabId = sender.tab.id;
            await chrome.tabs.update(tabId, {
                url: message.data.url
            });
            sendResponse({ msg: "Redirect signal received" });
        }
    }
};


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7864cd6898b952a7e1ea")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=background.6891378e5db53897eeb6.hot-update.js.map