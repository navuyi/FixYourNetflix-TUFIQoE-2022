"use strict";
self["webpackHotUpdatefix_your_netflix_experiment_extension"]("content",{

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
            console.
                this.logger.log(`Setting bitrate to: ${bitrate}`);
            this.select.value = bitrate.toString();
            this.logger.log(`SELECTED BITRATE VALUE: ${this.select.value}`);
            this.override_button.click();
        }
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b0f71e67172f9e180d2f")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=content.a7c9c20a221b4e387464.hot-update.js.map