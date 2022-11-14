"use strict";
self["webpackHotUpdatefix_your_netflix_experiment_extension"]("background",{

/***/ "./src/pages/Background/modules/Controller.ts":
/*!****************************************************!*\
  !*** ./src/pages/Background/modules/Controller.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Controller": () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../config/config */ "./src/config/config.ts");
/* harmony import */ var _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/CustomLogger */ "./src/utils/CustomLogger.ts");


class Controller {
    constructor() {
        this.NETFLIX_WATCH_URL = "https://www.netflix.com/watch";
        this.logger = new _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_1__.CustomLogger("[Controller]");
    }
    async init() {
        this.logger.log("Initializing...");
        this.listenForVideoStart();
    }
    async injectScript(tabId) {
        const running = (await chrome.storage.local.get([_config_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEYS.RUNNING]))[_config_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEYS.RUNNING];
        const mode = (await chrome.storage.local.get([_config_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEYS.EXTENSION_MODE]))[_config_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEYS.EXTENSION_MODE];
        if (running === false) {
            this.logger.log("Extension is not running.");
            return;
        }
        // Increase video count
        /**
         *
        */
        await this.increaseVideoCount();
        // Define conent script file
        let content_script;
        if (mode === _config_config__WEBPACK_IMPORTED_MODULE_0__.EXTENSION_MODE_AVAILABLE.EXPERIMENT) {
            this.logger.log("Experiment mode detected. Switching to mainContentScript.bundle.js");
            content_script = "mainContentScript.bundle.js";
        }
        else if (mode === _config_config__WEBPACK_IMPORTED_MODULE_0__.EXTENSION_MODE_AVAILABLE.MAPPING) {
            this.logger.log("Mapping mode detected. Switching to mapperContentScript.bundle.js");
            content_script = "mapperContentScript.bundle.js";
        }
        else
            (this.logger.log("Content script is incorrect!!!"));
        await chrome.scripting.executeScript({
            target: {
                tabId: tabId
            },
            files: [content_script] // ContentScript filename has to match names in webpack.config.js
        });
        this.logger.log("ContentScript has been injected");
    }
    /**
     *  Method that keeps track of videos order and limit.
     *  For the first video in queue the count will be 1 but its index in an array is 0.
     *  Video count is increased just before injecting the ContentScript.
     *  It means that n-th video in row has the count of n for the enterity of playback. The index is n-1
    */
    async increaseVideoCount() {
        const count = (await chrome.storage.local.get([_config_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEYS.VIDEO_COUNT]))[_config_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEYS.VIDEO_COUNT];
        const new_count = count + 1;
        this.logger.log(`Increasing video count to ${new_count}`);
        await chrome.storage.local.set({
            [_config_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEYS.VIDEO_COUNT]: new_count
        });
    }
    listenForVideoStart() {
        // Code below seems to be the right solution //
        // onHistoryStateUpdated detects navigation within Netlifx player (next video button)
        /*
        chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
            this.logger.log(`ON HISTORY STATE UPDATED`)
            console.log(details)
            if(details.frameId === 0 && details.url.includes(this.NETFLIX_WATCH_URL)) {
                chrome.tabs.get(details.tabId, async (tab) => {
                    if(tab.url === details.url) {
                        this.logger.log("Entered Netflix Video Player")
                        await this.injectScript(details.tabId)
                    }
                });
            }
        });
        */
        // onCompleted detects navigation using chrome.tabs.update
        chrome.webNavigation.onCompleted.addListener(details => {
            this.logger.log(`ON COMPLETED`);
            this.logger.log(details);
            if (details.frameId === 0 && details.url.includes(this.NETFLIX_WATCH_URL)) {
                chrome.tabs.get(details.tabId, async (tab) => {
                    if (tab.url === details.url) {
                        this.logger.log("Entered Netflix Video Player");
                        await this.injectScript(details.tabId);
                    }
                });
            }
        });
    }
}


/***/ }),

/***/ "./src/utils/CustomLogger.ts":
/*!***********************************!*\
  !*** ./src/utils/CustomLogger.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomLogger": () => (/* binding */ CustomLogger)
/* harmony export */ });
/* harmony import */ var _time_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./time_utils */ "./src/utils/time_utils.ts");

class CustomLogger {
    constructor(prefix) {
        this.log = (content) => {
            const prefix_date = `${this.prefix} | ${(0,_time_utils__WEBPACK_IMPORTED_MODULE_0__.get_local_datetime)(new Date())} |`;
            this.original_logger(prefix_date, content);
        };
        this.prefix = prefix;
        this.original_logger = console.log;
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("370632cd0774a17088c5")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=background.fd0de6de920bf437e534.hot-update.js.map