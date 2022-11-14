"use strict";
self["webpackHotUpdatefix_your_netflix_experiment_extension"]("background",{

/***/ "./src/config/default_experiment_config.js":
/*!*************************************************!*\
  !*** ./src/config/default_experiment_config.js ***!
  \*************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_EXPERIMENT_CONFIGURATION": () => (/* binding */ DEFAULT_EXPERIMENT_CONFIGURATION)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const DEFAULT_EXPERIMENT_CONFIGURATION = {
  "assessment_interval": 150,
  "bitrate_interval": 150,
  "description": "can be left as empty string",
  "videos": [{
    "bitrate_vmaf_map": [{
      "bitrate": 80,
      "vmaf": "37"
    }, {
      "bitrate": 100,
      "vmaf": "43"
    }, {
      "bitrate": 141,
      "vmaf": "52"
    }, {
      "bitrate": 218,
      "vmaf": "63"
    }, {
      "bitrate": 338,
      "vmaf": "71"
    }, {
      "bitrate": 601,
      "vmaf": "79"
    }, {
      "bitrate": 1149,
      "vmaf": "85"
    }, {
      "bitrate": 2472,
      "vmaf": "88"
    }, {
      "bitrate": 3439,
      "vmaf": "89"
    }, {
      "bitrate": 5147,
      "vmaf": "90"
    }],
    "description": "Lorem ipsum",
    "name": "Narcos_s01_e04",
    "scenario": [{
      "bitrate": 80,
      "vmaf": 37,
      "vmaf_diff": 17,
      "vmaf_template": 20
    }, {
      "bitrate": 141,
      "vmaf": 52,
      "vmaf_diff": 2,
      "vmaf_template": 50
    }, {
      "bitrate": 80,
      "vmaf": 37,
      "vmaf_diff": 17,
      "vmaf_template": 20
    }, {
      "bitrate": 5147,
      "vmaf": 90,
      "vmaf_diff": 0,
      "vmaf_template": 90
    }, {
      "bitrate": 100,
      "vmaf": 43,
      "vmaf_diff": 2,
      "vmaf_template": 45
    }, {
      "bitrate": 141,
      "vmaf": 52,
      "vmaf_diff": 1,
      "vmaf_template": 51
    }],
    "url": "https://www.netflix.com/watch/70196252?trackId=14170286",
    "vmaf_template_scenario": [20, 50, 20, 90, 45, 51]
  }, {
    "bitrate_vmaf_map": [{
      "bitrate": 86,
      "vmaf": "40"
    }, {
      "bitrate": 106,
      "vmaf": "46"
    }, {
      "bitrate": 146,
      "vmaf": "55"
    }, {
      "bitrate": 233,
      "vmaf": "67"
    }, {
      "bitrate": 369,
      "vmaf": "76"
    }, {
      "bitrate": 623,
      "vmaf": "84"
    }, {
      "bitrate": 976,
      "vmaf": "89"
    }, {
      "bitrate": 1571,
      "vmaf": "92"
    }, {
      "bitrate": 3083,
      "vmaf": "95"
    }],
    "description": "Lorem ipsum",
    "name": "Narcos_s02_e02",
    "scenario": [{
      "bitrate": 86,
      "vmaf": 40,
      "vmaf_diff": 20,
      "vmaf_template": 20
    }, {
      "bitrate": 106,
      "vmaf": 46,
      "vmaf_diff": 4,
      "vmaf_template": 50
    }, {
      "bitrate": 86,
      "vmaf": 40,
      "vmaf_diff": 20,
      "vmaf_template": 20
    }, {
      "bitrate": 976,
      "vmaf": 89,
      "vmaf_diff": 1,
      "vmaf_template": 90
    }, {
      "bitrate": 106,
      "vmaf": 46,
      "vmaf_diff": 1,
      "vmaf_template": 45
    }, {
      "bitrate": 146,
      "vmaf": 55,
      "vmaf_diff": 4,
      "vmaf_template": 51
    }],
    "url": "https://www.netflix.com/watch/80101274?trackId=14170286",
    "vmaf_template_scenario": [20, 50, 20, 90, 45, 51]
  }],
  "title": "This is my config for development purposes"
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(DEFAULT_EXPERIMENT_CONFIGURATION, "DEFAULT_EXPERIMENT_CONFIGURATION", "/Users/navuyi/Desktop/tufiqoe/FixYourNetflix-TUFIQoE-2022/extension/src/config/default_experiment_config.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/utils/CustomLogger.js":
/*!***********************************!*\
  !*** ./src/utils/CustomLogger.js ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomLogger": () => (/* binding */ CustomLogger)
/* harmony export */ });
/* harmony import */ var _time_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./time_utils */ "./src/utils/time_utils.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


class CustomLogger {
  constructor(prefix) {
    this.prefix = prefix;
    this.original_logger = console.log;
  }

  log = content => {
    const prefix_date = `${this.prefix} | ${(0,_time_utils__WEBPACK_IMPORTED_MODULE_0__.get_local_datetime)(new Date())} |`;
    this.original_logger(prefix_date, content);
  };

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CustomLogger, "CustomLogger", "/Users/navuyi/Desktop/tufiqoe/FixYourNetflix-TUFIQoE-2022/extension/src/utils/CustomLogger.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/config/config.ts":
/*!******************************!*\
  !*** ./src/config/config.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ARCHIVE_DEFAULT": () => (/* binding */ ARCHIVE_DEFAULT),
/* harmony export */   "ARCHIVE_KEYS": () => (/* binding */ ARCHIVE_KEYS),
/* harmony export */   "ASSESSMENTS_DEFAULT": () => (/* binding */ ASSESSMENTS_DEFAULT),
/* harmony export */   "ASSESSMENTS_KEYS": () => (/* binding */ ASSESSMENTS_KEYS),
/* harmony export */   "ASSESSMENT_INTERVAL": () => (/* binding */ ASSESSMENT_INTERVAL),
/* harmony export */   "BITRATE_INTERVAL": () => (/* binding */ BITRATE_INTERVAL),
/* harmony export */   "CONFIGURATION_KEYS": () => (/* binding */ CONFIGURATION_KEYS),
/* harmony export */   "DATABASE_KEYS": () => (/* binding */ DATABASE_KEYS),
/* harmony export */   "EXTENSION_MODE_AVAILABLE": () => (/* binding */ EXTENSION_MODE_AVAILABLE),
/* harmony export */   "MESSAGE_HEADERS": () => (/* binding */ MESSAGE_HEADERS),
/* harmony export */   "MESSAGE_TEMPLATE": () => (/* binding */ MESSAGE_TEMPLATE),
/* harmony export */   "STATS_INVISIBLE": () => (/* binding */ STATS_INVISIBLE),
/* harmony export */   "STATS_NONCLICKABLE": () => (/* binding */ STATS_NONCLICKABLE),
/* harmony export */   "STATS_RECORD_INTERVAL_MS": () => (/* binding */ STATS_RECORD_INTERVAL_MS),
/* harmony export */   "STORAGE_DEFAULT": () => (/* binding */ STORAGE_DEFAULT),
/* harmony export */   "STORAGE_KEYS": () => (/* binding */ STORAGE_KEYS)
/* harmony export */ });
/* harmony import */ var _default_experiment_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default_experiment_config */ "./src/config/default_experiment_config.js");

const STATS_RECORD_INTERVAL_MS = 1000; //1000 <---
const STATS_NONCLICKABLE = true;
const STATS_INVISIBLE = false;
const BITRATE_INTERVAL = 5 * 60 * 1000; // <--- 5 minutes = 5*60*1000
const ASSESSMENT_INTERVAL = 2.5 * 60 * 1000; // <--- 2.5*60*1000
const DATABASE_KEYS = {
    POSITION: 'position',
    DURATION: 'duration',
    VOLUME: 'volume',
    SEGMENT_POSITION: 'segment_position',
    PLAYER_STATE: 'player_state',
    BUFFERING_STATE: 'buffering_state',
    RENDERING_STATE: 'rendering_state',
    PLAYING_BITRATE_AUDIO: 'playing_bitrate_audio',
    PLAYING_BITRATE_VIDEO: 'playing_bitrate_video',
    RESOLUTION: 'resolution',
    PLAYING_VMAF: 'playing_vmaf',
    BUFFERING_VMAF: 'buffering_vmaf',
    BUFFERING_BITRATE_AUDIO: 'buffering_bitrate_audio',
    BUFFERING_BITRATE_VIDEO: 'buffering_bitrate_video',
    TOTAL_FRAMES: 'total_frames',
    TOTAL_DROPPED_FRAMES: 'total_dropped_frames',
    TOTAL_CORRUPTED_FRAMES: 'total_corrupted_frames',
    FRAMERATE: 'framerate',
    TIMESTAMP: 'timestamp',
};
const ARCHIVE_KEYS = {
    DATA: 'data',
    TIMESTAMP: 'timestamp',
};
const ARCHIVE_DEFAULT = {
    [ARCHIVE_KEYS.DATA]: [],
    [ARCHIVE_KEYS.TIMESTAMP]: [],
};
const ASSESSMENTS_KEYS = {
    VALUE: 'value',
    DESCRIPTION: 'description',
    TIMESTAMP: 'timestamp',
    STARTED: 'started',
    DURATION: 'duration',
};
const ASSESSMENTS_DEFAULT = {
    [ASSESSMENTS_KEYS.VALUE]: [],
    [ASSESSMENTS_KEYS.DESCRIPTION]: [],
    [ASSESSMENTS_KEYS.TIMESTAMP]: [],
    [ASSESSMENTS_KEYS.STARTED]: [],
    [ASSESSMENTS_KEYS.DURATION]: [],
};
const STORAGE_KEYS = {
    DATA_TO_SAVE: 'data_to_save',
    ARCHIVE_TO_SAVE: 'archive_to_save',
    ASSESSMENTS_TO_SAVE: 'assessments_to_save',
    DATABASE_EXPERIMENT_ID: 'database_experiment_index',
    DATABASE_VIDEO_ID: 'database_video_index',
    CURRENT_BITRATE: 'current_bitrate',
    DEVICE_ID: 'device_id',
    TESTER_ID: 'tester_id',
    PAIR_ID: 'pair_id',
    EXPERIMENT_TYPE: 'experiment_type',
    VIDEO_COUNT: 'video_count',
    VIDEO_LIMIT: 'video_limit',
    //VIDEO_URLS: 'video_urls', // TO BE DELETED
    RUNNING: 'running',
    //BITRATE_MODE: 'bitrate_mode',
    EXTENSION_MODE: "extension_mode",
    CONFIGURATION: "configuration"
};
const CONFIGURATION_KEYS = {
    TITLE: "title",
    DESCRIPTION: "description",
    BITRATE_INTERVAL: "bitrate_interval",
    ASSESSMENT_INTERVAL: "assessment_interval",
    VIDEOS: "videos",
    VIDEO_KEYS: {
        NAME: "name",
        DESCRIPTION: "description",
        URL: "url",
        VMAF_TEMPLATE_SCENARIO: "vmaf_template_scenario",
        BITRATE_VMAF_MAP: "bitrate_vmaf_map",
        SCENARIO: "scenario",
    }
};
const STORAGE_DEFAULT = {
    [STORAGE_KEYS.DATABASE_EXPERIMENT_ID]: null,
    [STORAGE_KEYS.DATABASE_VIDEO_ID]: null,
    [STORAGE_KEYS.CURRENT_BITRATE]: null,
    [STORAGE_KEYS.VIDEO_COUNT]: 0,
    [STORAGE_KEYS.DEVICE_ID]: 106,
    [STORAGE_KEYS.TESTER_ID]: 'dev_tester',
    [STORAGE_KEYS.EXPERIMENT_TYPE]: 'alone',
    [STORAGE_KEYS.VIDEO_LIMIT]: 1,
    [STORAGE_KEYS.RUNNING]: false,
    [STORAGE_KEYS.EXTENSION_MODE]: "experiment",
    [STORAGE_KEYS.CONFIGURATION]: _default_experiment_config__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_EXPERIMENT_CONFIGURATION
};
const EXTENSION_MODE_AVAILABLE = {
    EXPERIMENT: "experiment",
    MAPPING: "mapping"
};
const MESSAGE_TEMPLATE = {
    HEADER: 'header',
    DATA: 'data',
    ARCHIVE: 'archive',
};
const MESSAGE_HEADERS = {
    START_ANALYZING: 'start_analyzing',
    NERD_STATISTICS: 'nerdstats',
    ASSESSMENT: 'assessment',
    FINISHED: 'finished',
    CREDITS: 'credits',
    REDIRECT: 'redirect'
};


/***/ }),

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
    if (ta)
        await chrome.tabs.update(t.id, {
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


/***/ }),

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
/* harmony import */ var _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/CustomLogger */ "./src/utils/CustomLogger.js");


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

/***/ "./src/utils/time_utils.ts":
/*!*********************************!*\
  !*** ./src/utils/time_utils.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get_local_datetime": () => (/* binding */ get_local_datetime),
/* harmony export */   "get_local_datetime_and_timezone": () => (/* binding */ get_local_datetime_and_timezone)
/* harmony export */ });
const get_local_datetime = (object) => {
    const year = object.getFullYear();
    const month = (object.getMonth() + 1).toString().padStart(2, "0");
    const day = object.getDate().toString().padStart(2, "0");
    const hours = object.getHours().toString().padStart(2, "0");
    const minutes = object.getMinutes().toString().padStart(2, "0");
    const seconds = object.getSeconds().toString().padStart(2, "0");
    const milliseconds = object.getMilliseconds().toString().padStart(3, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`; // <-- Local datetime in extended ISO format ''YYYY-MM-DDTHH:MM:SS:XXX''
};
const get_local_datetime_and_timezone = (object) => {
    // Get the datetime
    const year = object.getFullYear();
    const month = (object.getMonth() + 1).toString().padStart(2, "0");
    const day = object.getDate().toString().padStart(2, "0");
    const hours = object.getHours().toString().padStart(2, "0");
    const minutes = object.getMinutes().toString().padStart(2, "0");
    const seconds = object.getSeconds().toString().padStart(2, "0");
    const milliseconds = object.getMilliseconds().toString().padStart(3, "0");
    const datetime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    // Get timezone offset in +/- HH:MM format
    const timezone_offset_min = object.getTimezoneOffset();
    const offset_hrs = Math.abs(timezone_offset_min / 60);
    const offset_min = Math.abs(timezone_offset_min % 60);
    if (timezone_offset_min <= 0) {
        const timezone_standard = "+" + offset_hrs.toString().padStart(2, "0") + ":" + offset_min.toString().padStart(2, "0");
        return datetime + timezone_standard;
    }
    else {
        const timezone_standard = "-" + offset_hrs.toString().padStart(2, "0") + ":" + offset_min.toString().padStart(2, "0");
        return datetime + timezone_standard;
    }
};


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9c573daa8d4d3adbad45")
/******/ })();
/******/ 
/******/ /* webpack/runtime/harmony module decorator */
/******/ (() => {
/******/ 	__webpack_require__.hmd = (module) => {
/******/ 		module = Object.create(module);
/******/ 		if (!module.children) module.children = [];
/******/ 		Object.defineProperty(module, 'exports', {
/******/ 			enumerable: true,
/******/ 			set: () => {
/******/ 				throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 			}
/******/ 		});
/******/ 		return module;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=background.57e023e4e58e74f03d5d.hot-update.js.map