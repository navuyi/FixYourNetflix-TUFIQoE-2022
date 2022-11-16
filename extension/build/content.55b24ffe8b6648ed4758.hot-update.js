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
/* harmony import */ var _utils_classes_NetflixBitrateMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/classes/NetflixBitrateMenu */ "./src/utils/classes/NetflixBitrateMenu.ts");


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
            await _utils_classes_NetflixBitrateMenu__WEBPACK_IMPORTED_MODULE_1__.NetflixBitrateMenu.inv;
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

/***/ "./src/utils/classes/NetflixBitrateMenu.ts":
/*!*************************************************!*\
  !*** ./src/utils/classes/NetflixBitrateMenu.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NetflixBitrateMenu": () => (/* binding */ NetflixBitrateMenu)
/* harmony export */ });
/* harmony import */ var _CustomLogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomLogger */ "./src/utils/classes/CustomLogger.ts");
var _a;

class NetflixBitrateMenu {
}
_a = NetflixBitrateMenu;
NetflixBitrateMenu.logger = new _CustomLogger__WEBPACK_IMPORTED_MODULE_0__.CustomLogger("[NetflixBitrateMenu]");
/**
 * Blocking method!
 * Invokes Netflix's bitrate menu by calling repeatedly keybord event dispatch method
 * Method blocks execution untill menu is invoked
 * @returns {void}
*/
NetflixBitrateMenu.invoke = async () => {
    let interval;
    let attempt = 1;
    return new Promise(resolve => {
        interval = setInterval(() => {
            NetflixBitrateMenu.logger.log(`Invoking bitrate menu by dispatching keyboard event. Attempt: ${attempt}`);
            NetflixBitrateMenu.dispatch_invoker_event();
            if (NetflixBitrateMenu.is_invoked() === true) {
                clearInterval(interval);
                resolve();
            }
            attempt += 1;
        });
    });
};
NetflixBitrateMenu.dispatch_invoker_event = () => {
    NetflixBitrateMenu.logger.log("Dispatching keyboard event");
    document.dispatchEvent(new KeyboardEvent("keydown", {
        key: "S",
        altKey: true,
        ctrlKey: true,
        shiftKey: true,
        bubbles: true,
        code: "KeyS",
        which: 83,
        cancelable: true,
        composed: true,
        keyCode: 83
    }));
};
NetflixBitrateMenu.is_invoked = () => {
    const container = [...document.querySelectorAll("div")].filter(item => item.innerText.match("Video Bitrate"))[1];
    const override_button = [...document.querySelectorAll("button")].filter(button => button.innerText.match("Override"))[0];
    const reset_button = [...document.querySelectorAll("button")].filter(button => button.innerText.match("Reset"))[0];
    if ([container, override_button, reset_button].some(elem => elem == null)) {
        NetflixBitrateMenu.logger.log("Not invoked!");
        return false;
    }
    else {
        NetflixBitrateMenu.logger.log("Invoked");
        return true;
    }
};
NetflixBitrateMenu.get_html_elements = () => {
    const container = [...document.querySelectorAll("div")].filter(item => item.innerText.match("Video Bitrate"))[1];
    const override_button = [...document.querySelectorAll("button")].filter(button => button.innerText.match("Override"))[0];
    const reset_button = [...document.querySelectorAll("button")].filter(button => button.innerText.match("Reset"))[0];
    if (NetflixBitrateMenu.is_invoked() === false) {
        NetflixBitrateMenu.logger.log("BitrateMenu has to be invoked first! Elements not available.");
        return;
    }
    // Get BitrateMenu container content
    const bitrate_menu_div = container.childNodes[1];
    const select = bitrate_menu_div.childNodes[1];
    const options = Array.from(bitrate_menu_div.childNodes[1].childNodes);
    const bitrate_values = Array.from(bitrate_menu_div.childNodes[1].childNodes).map(option => {
        const o = option;
        return parseInt(o.value);
    });
    return {
        container: container,
        override_button: override_button,
        reset_button: reset_button,
        select: select,
        options: options,
        bitrate_values: bitrate_values
    };
};
NetflixBitrateMenu.get_available_bitrates = () => {
    const { bitrate_values } = NetflixBitrateMenu.get_html_elements();
    return bitrate_values;
};
NetflixBitrateMenu.set_bitrate = async (value) => {
    const { select, override_button } = NetflixBitrateMenu.get_html_elements();
    select.value = value.toString();
    override_button.click();
};


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
/******/ 	__webpack_require__.h = () => ("770a80fcc689fb2c67fb")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=content.55b24ffe8b6648ed4758.hot-update.js.map