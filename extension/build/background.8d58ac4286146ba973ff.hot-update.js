"use strict";
self["webpackHotUpdatefix_your_netflix_experiment_extension"]("background",{

/***/ "./src/pages/Background/index.ts":
/*!***************************************!*\
  !*** ./src/pages/Background/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/config */ "./src/config/config.ts");
/* harmony import */ var _modules_Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Controller */ "./src/pages/Background/modules/Controller.ts");
/* harmony import */ var _utils_time_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/time_utils */ "./src/utils/time_utils.ts");




/**
 * Detect extension reloads and perform actions.
 * This listener callback executes only when extension is installed or reloaded.
*/
chrome.runtime.onInstalled.addListener(() => {
    console.log(`[BackgroundScript] | ${(0,_utils_time_utils__WEBPACK_IMPORTED_MODULE_2__.get_local_datetime)(new Date())} | Installing...`);
    // Initialize local storage || WARNING --> THIS RESETS ALL chrome.storage KEYS TO DEFAULT VALUES
    chrome.storage.local.set(_config_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_DEFAULT);
});
chrome.action.onClicked.addListener(async (tab) => {
    if (tab && tab.id)
        await chrome.tabs.update(ta.id, {
            url: "setup.html"
        });
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
const controller = new _modules_Controller__WEBPACK_IMPORTED_MODULE_1__.Controller();
controller.init();
/**
 * Function checks if received message is signal indicating end of video
 * Redirects the tab that the message came from to the custom web page
 * REMEMBER to use sendResponse !!!
*/
const receive_finished_signal = async (message, sender, sendResponse) => {
    if (message[_config_config__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_TEMPLATE.HEADER] === _config_config__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_HEADERS.FINISHED) {
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
    if (message[_config_config__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_TEMPLATE.HEADER] === _config_config__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_HEADERS.REDIRECT) {
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
/******/ 	__webpack_require__.h = () => ("c982a75f36eb52147de3")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=background.8d58ac4286146ba973ff.hot-update.js.map