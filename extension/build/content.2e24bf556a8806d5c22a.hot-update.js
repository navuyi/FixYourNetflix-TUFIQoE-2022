"use strict";
self["webpackHotUpdatefix_your_netflix_experiment_extension"]("content",{

/***/ "./src/utils/keyboard_hotkeys/simulate_bitrate_menu_hotkeys.js":
/*!*********************************************************************!*\
  !*** ./src/utils/keyboard_hotkeys/simulate_bitrate_menu_hotkeys.js ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "simulate_bitrate_menu_hotkey": () => (/* binding */ simulate_bitrate_menu_hotkey)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const simulate_bitrate_menu_hotkey = () => {
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
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(simulate_bitrate_menu_hotkey, "simulate_bitrate_menu_hotkey", "/Users/navuyi/Desktop/tufiqoe/FixYourNetflix-TUFIQoE-2022/extension/src/utils/keyboard_hotkeys/simulate_bitrate_menu_hotkeys.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/pages/Content/QualityEnhancer.ts":
/*!**********************************************!*\
  !*** ./src/pages/Content/QualityEnhancer.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QualityEnhancer": () => (/* binding */ QualityEnhancer)
/* harmony export */ });
/* harmony import */ var _utils_classes_BitrateMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/classes/BitrateMenu */ "./src/utils/classes/BitrateMenu.ts");
/* harmony import */ var _utils_classes_CustomLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/classes/CustomLogger */ "./src/utils/classes/CustomLogger.ts");


class QualityEnhancer {
    constructor() {
        this.init = async () => {
            this.bitrate_menu.init();
            window.document.onkeydown = async (e) => {
                if (e.key === "G") {
                    console.log("Resetting");
                    await this.reset_video_quality();
                }
            };
        };
        this.reset_video_quality = async () => {
            const available_bitrates = this.bi;
            const best = await this.bitrate_menu.get_available_bitrates()[0];
            await this.bitrate_menu.set_bitrate(best);
        };
        this.logger = new _utils_classes_CustomLogger__WEBPACK_IMPORTED_MODULE_1__.CustomLogger("[QualityEnhancer]");
        this.bitrate_menu = new _utils_classes_BitrateMenu__WEBPACK_IMPORTED_MODULE_0__.BitrateMenu();
    }
}


/***/ }),

/***/ "./src/utils/classes/BitrateMenu.ts":
/*!******************************************!*\
  !*** ./src/utils/classes/BitrateMenu.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BitrateMenu": () => (/* binding */ BitrateMenu)
/* harmony export */ });
/* harmony import */ var _CustomLogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomLogger */ "./src/utils/classes/CustomLogger.ts");
/* harmony import */ var _html_element_extractors_get_bitrate_menu_elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html_element_extractors/get_bitrate_menu_elements */ "./src/utils/html_element_extractors/get_bitrate_menu_elements.ts");
/* harmony import */ var _keyboard_hotkeys_simulate_bitrate_menu_hotkeys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../keyboard_hotkeys/simulate_bitrate_menu_hotkeys */ "./src/utils/keyboard_hotkeys/simulate_bitrate_menu_hotkeys.js");



class BitrateMenu {
    constructor() {
        /**
         *  Invokes bitrate menu and assings bitrate menu's HTML elements
         *  to instance attributes.
         *  Closes bitrate menu by simulating click event on Reset button.
        */
        this.init = async () => {
            await this.invoke_bitrate_menu();
            //this.reset_button.click()   <-- alternative way of closing the menu but it also resets the bitrates
            (0,_keyboard_hotkeys_simulate_bitrate_menu_hotkeys__WEBPACK_IMPORTED_MODULE_2__.simulate_bitrate_menu_hotkey)(); // Close bitrate menu after initialization is finished
        };
        /**
         *  Invokes bitrate_menu and reassigns HTML elements
         *  Reassigning elements is important because bitrate menu is removed from DOM tree
         *  after overriding bitrate value or reseting
        */
        this.invoke_bitrate_menu = async () => {
            this.logger.log("Invoking bitrate menu...");
            // Invoke bitrate menu and get html elements
            this.bitrate_menu_elements = await (0,_html_element_extractors_get_bitrate_menu_elements__WEBPACK_IMPORTED_MODULE_1__.invoke_bitrate_menu_and_get_html_elements)();
            this.available_bitrates = this.bitrate_menu_elements.bitrate_values;
            this.override_button = this.bitrate_menu_elements.override_button;
            this.reset_button = this.bitrate_menu_elements.reset_button;
            this.select = this.bitrate_menu_elements.select;
            this.logger.log("Bitrate menu invoked.");
        };
        /**
         * Returns array of available bitrate values
         * @returns {Array<number>} Available bitrate values
        */
        this.get_available_bitrates = () => {
            return this.available_bitrates;
        };
        /**
         * Returns HTML elements of bitrate menu
         * @returns {T_BITRATE_MENU_ELEMENTS}
        */
        this.get_bitrate_menu_elements = () => {
            if (this.bitrate_menu_elements) {
                return this.bitrate_menu_elements;
            }
        };
        /**
         * Method checks if provided bitrate is available in bitrate menu.
         * If it is then the same value is returned.
         * If not - the closest value is found and returned.
         * @param {number} bitrate
         * @returns {number} Returns closest available bitrate to provided value
        */
        this.check_bitrate_availability = (bitrate) => {
            if (this.available_bitrates.includes(bitrate)) {
                return bitrate;
            }
            else {
                this.logger.log("Provided bitrate is not available. Finding closest value...");
                const closest_bitrate = this.available_bitrates.reduce((prev, curr) => {
                    return (Math.abs(curr - bitrate) < Math.abs(prev - bitrate) ? curr : prev);
                });
                this.logger.log(`Closest bitrate to ${bitrate} is ${closest_bitrate}`);
                return closest_bitrate;
            }
        };
        this.available_bitrates = [];
        this.logger = new _CustomLogger__WEBPACK_IMPORTED_MODULE_0__.CustomLogger("[BitrateMenu]");
    }
    /**
     * Overrides current bitrate with new bitrate value
     * provided as a parameter
     * @param {number} bitrate
    */
    async set_bitrate(bitrate) {
        if (this.select && this.override_button) {
            this.logger.log(`Setting bitrate to: ${bitrate}`);
            this.select.value = bitrate.toString();
            this.logger.log(`SELECTED BITRATE VALUE: ${this.select.value}`);
            this.override_button.click();
        }
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

/***/ "./src/utils/html_element_extractors/get_bitrate_menu_elements.ts":
/*!************************************************************************!*\
  !*** ./src/utils/html_element_extractors/get_bitrate_menu_elements.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "invoke_bitrate_menu_and_get_html_elements": () => (/* binding */ invoke_bitrate_menu_and_get_html_elements)
/* harmony export */ });
/* harmony import */ var _keyboard_hotkeys_simulate_bitrate_menu_hotkeys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../keyboard_hotkeys/simulate_bitrate_menu_hotkeys.js */ "./src/utils/keyboard_hotkeys/simulate_bitrate_menu_hotkeys.js");

/**
 * Function executes subfunction in intervals until bitrate menu elements are retrieved
 * and HTML elements are extracted using extract_html_elements method
*/
const invoke_bitrate_menu_and_get_html_elements = async () => {
    return new Promise((resolve) => {
        let timer;
        timer = setInterval(() => {
            // Simulate bitrate menu hotkey
            (0,_keyboard_hotkeys_simulate_bitrate_menu_hotkeys_js__WEBPACK_IMPORTED_MODULE_0__.simulate_bitrate_menu_hotkey)();
            try {
                const bitrate_menu_elements = extract_html_elements();
                const bitrate_values = bitrate_menu_elements.bitrate_values;
                const override_button = bitrate_menu_elements.override_button;
                const reset_button = bitrate_menu_elements.reset_button;
                // Set opacity of the element to required value
                if (bitrate_values.length > 0 && override_button != null && reset_button != null) {
                    clearInterval(timer);
                    resolve(bitrate_menu_elements);
                }
            }
            catch (err) {
                console.log(err);
            }
        }, 500);
    });
};
/**
 * Helper method used to extract HTML elemnets from DOM tree
 * @returns{object} Object of key:values where values are HTML elements, possible to unpack
*/
const extract_html_elements = () => {
    // Get outter menu container
    const container = [...document.querySelectorAll("div")].filter(item => item.innerText.match("Video Bitrate"))[1];
    const override_button = [...document.querySelectorAll("button")].filter(button => button.innerText.match("Override"))[0];
    const reset_button = [...document.querySelectorAll("button")].filter(button => button.innerText.match("Reset"))[0];
    // Get bitrate menu container
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
/******/ 	__webpack_require__.h = () => ("c0d9157afcc9d5707782")
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
/******/ }
);
//# sourceMappingURL=content.2e24bf556a8806d5c22a.hot-update.js.map