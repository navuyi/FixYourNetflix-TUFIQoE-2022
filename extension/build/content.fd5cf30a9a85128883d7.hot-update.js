"use strict";
self["webpackHotUpdatefix_your_netflix_experiment_extension"]("content",{

/***/ "./src/pages/Content/CustomPlayer.ts":
/*!*******************************************!*\
  !*** ./src/pages/Content/CustomPlayer.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomPlayer": () => (/* binding */ CustomPlayer)
/* harmony export */ });
/* harmony import */ var _utils_wait_for_video_to_load__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/wait_for_video_to_load */ "./src/utils/wait_for_video_to_load.ts");
/* harmony import */ var _utils_classes_CustomLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/classes/CustomLogger */ "./src/utils/classes/CustomLogger.ts");


class CustomPlayer {
    constructor() {
        this.elements_to_remove = ["control-play-pause-pause", "control-play-pause-play", "control-back10",
            "control-forward10", "control-speed", "control-fullscreen-enter",
            "control-fullscreen-exit", "control-episodes", "control-next", "timeline-bar"];
        this.elements_to_leave = [
            "control-volume-off",
            "control-volume-low",
            "control-volume-medium",
            "control-volume-high",
            "control-audio-subtitle"
        ];
        this.init = async () => {
            await (0,_utils_wait_for_video_to_load__WEBPACK_IMPORTED_MODULE_0__.wait_for_video_to_load)();
            await this.create_shutter();
            const video_canvas = document.querySelectorAll("[data-uia='video-canvas']")[0];
            video_canvas.addEventListener("mousemove", () => {
                let controls_container = document.getElementsByClassName("watch-video--bottom-controls-container")[0];
                this.elements_to_remove.forEach(element_data_uia => {
                    const element = this.get_element(controls_container, element_data_uia);
                    if (element)
                        element.remove();
                });
                this.elements_to_leave.forEach(element_data_uia => {
                    const element = this.get_element(controls_container, element_data_uia);
                    if (element)
                        this.modify_element(element);
                });
            });
        };
        this.get_element = (container, element_data_uia) => {
            const selector = `[data-uia='${element_data_uia}']`;
            return container.querySelectorAll(selector)[0];
        };
        this.logger = new _utils_classes_CustomLogger__WEBPACK_IMPORTED_MODULE_1__.CustomLogger("[CustomPlayer]");
    }
    modify_element(element) {
        if (element && element.parentNode) {
            const el = element;
            const parent_node = element.parentNode;
            el.style.zIndex = "10100";
            parent_node.style.zIndex = "10100";
        }
    }
    async create_shutter() {
        const video_canvas = document.querySelectorAll("[data-uia='video-canvas']")[0];
        const shutter = document.createElement("div");
        shutter.id = "transparent_panel";
        shutter.style.width = "100vw";
        shutter.style.height = "100vh";
        shutter.style.position = "absolute";
        shutter.style.left = "0";
        shutter.style.top = "0";
        shutter.style.backgroundColor = "lightblue";
        shutter.style.display = "flex";
        shutter.style.justifyContent = "center";
        shutter.style.alignItems = "center";
        shutter.style.flexDirection = "column";
        shutter.style.zIndex = "10000";
        shutter.style.opacity = "0";
        shutter.onclick = (e) => {
            e.stopPropagation();
        };
        video_canvas.appendChild(shutter);
    }
}


/***/ }),

/***/ "./src/pages/Content/index.ts":
/*!************************************!*\
  !*** ./src/pages/Content/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CustomPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomPlayer */ "./src/pages/Content/CustomPlayer.ts");

const init = async () => {
    //const statsAnalyzer = new StatsAnalyzer()
    await statsAnalyzer.init();
    const customPlayer = new _CustomPlayer__WEBPACK_IMPORTED_MODULE_0__.CustomPlayer();
    await customPlayer.init();
};
console.log("ASDASDASD");
init();


/***/ }),

/***/ "./src/utils/classes/CustomLogger.ts":
/*!*******************************************!*\
  !*** ./src/utils/classes/CustomLogger.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomLogger": () => (/* binding */ CustomLogger)
/* harmony export */ });
/* harmony import */ var _time_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../time_utils */ "./src/utils/time_utils.ts");

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


/***/ }),

/***/ "./src/utils/wait_for_video_to_load.ts":
/*!*********************************************!*\
  !*** ./src/utils/wait_for_video_to_load.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wait_for_video_to_load": () => (/* binding */ wait_for_video_to_load)
/* harmony export */ });
/**
 * Function waits for the essential html elements to be loaded and available for manipulation.
 * @returns {Promise<unknown>}
 */
const wait_for_video_to_load = async () => {
    return new Promise((resolve) => {
        let interval;
        interval = setInterval(async () => {
            try {
                const video = document.getElementsByTagName("video")[0];
                const video_canvas = document.querySelectorAll("[data-uia='video-canvas']")[0];
                if (video && video_canvas) {
                    clearInterval(interval); // stop the retrying process - must be first
                    console.log("HTML video element is loaded. Proceeding...");
                    resolve();
                }
                else {
                    console.log("Video element not found! Retrying...");
                }
            }
            catch (err) {
                console.log(err);
            }
        }, 50);
    });
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
/******/ 	__webpack_require__.h = () => ("f286c73159bd49399721")
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
//# sourceMappingURL=content.fd5cf30a9a85128883d7.hot-update.js.map