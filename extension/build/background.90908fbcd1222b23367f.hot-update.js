"use strict";
self["webpackHotUpdatefix_your_netflix_experiment_extension"]("background",{

/***/ "./src/pages/Background/Controller.ts":
/*!********************************************!*\
  !*** ./src/pages/Background/Controller.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Controller": () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var _config_storage_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/storage.config */ "./src/config/storage.config.ts");
/* harmony import */ var _utils_classes_ChromeStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/classes/ChromeStorage */ "./src/utils/classes/ChromeStorage.ts");
/* harmony import */ var _utils_classes_CustomLogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/classes/CustomLogger */ "./src/utils/classes/CustomLogger.ts");



class Controller {
    constructor() {
        this.NETFLIX_WATCH_URL = "https://www.netflix.com/watch";
        this.init = async () => {
            this.logger.log("Initializing...");
            this.listenForVideoStart();
        };
        /**
         *  Method that keeps track of videos order and limit.
         *  For the first video in queue the count will be 1 but its index in an array is 0.
         *  Video count is increased just before injecting the ContentScript.
         *  It means that n-th video in row has the count of n for the enterity of playback. The index is n-1
        */
        this.increaseVideoCount = async () => {
            const experiment_variables = await _utils_classes_ChromeStorage__WEBPACK_IMPORTED_MODULE_1__.ChromeStorage.get_experiment_variables();
            experiment_variables.video_count += 1;
            this.logger.log(`Increasing video count to ${experiment_variables.video_count}`);
            await _utils_classes_ChromeStorage__WEBPACK_IMPORTED_MODULE_1__.ChromeStorage.set_single("experiment_variables", experiment_variables);
        };
        this.listenForVideoStart = () => {
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
                if (details.frameId === 0 && details.url.includes(this.NETFLIX_WATCH_URL)) {
                    chrome.tabs.get(details.tabId, async (tab) => {
                        if (tab.url === details.url) {
                            this.logger.log("Entered Netflix Video Player");
                            await this.injectScript(details.tabId);
                        }
                    });
                }
            });
        };
        this.logger = new _utils_classes_CustomLogger__WEBPACK_IMPORTED_MODULE_2__.CustomLogger("[Controller]");
    }
    async injectScript(tabId) {
        const settings = (await chrome.storage.local.get([_config_storage_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEYS.EXPERIMENT_VARIABLES]))[_config_storage_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEYS.EXPERIMENT_VARIABLES];
        const experiment_variables = await CHRO;
        if (settings.experiment_running === false) {
            this.logger.log("Extension is not running.");
            return;
        }
        await this.increaseVideoCount();
        await chrome.scripting.executeScript({
            target: {
                tabId: tabId
            },
            files: ["content.bundle.js"] // ContentScript filename has to match names in webpack.config.js
        });
        this.logger.log("ContentScript has been injected");
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("caad17132c346ed81d9e")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=background.90908fbcd1222b23367f.hot-update.js.map