"use strict";
self["webpackHotUpdatefix_your_netflix_experiment_extension"]("content",{

/***/ "./src/pages/Content/QualityEnhancer.ts":
/*!**********************************************!*\
  !*** ./src/pages/Content/QualityEnhancer.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QualityEnhancer": () => (/* binding */ QualityEnhancer)
/* harmony export */ });
/* harmony import */ var _utils_classes_CustomLogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/classes/CustomLogger */ "./src/utils/classes/CustomLogger.ts");

class QualityEnhancer {
    constructor() {
        this.init = async () => {
            window.document.onkeydown = async (e) => {
                if (e.key === "G") {
                    console.log("Resetting");
                    await this.reset_video_quality();
                }
            };
        };
        this.reset_video_quality = async () => {
            await NEt;
        };
        this.logger = new _utils_classes_CustomLogger__WEBPACK_IMPORTED_MODULE_0__.CustomLogger("[QualityEnhancer]");
    }
}


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
/******/ 	__webpack_require__.h = () => ("c36ed24616bfb11a6e42")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=content.192216b977e7eaae9bd0.hot-update.js.map