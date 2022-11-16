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
/* harmony import */ var _utils_classes_BitrateMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/classes/BitrateMenu */ "./src/utils/classes/BitrateMenu.ts");
/* harmony import */ var _utils_classes_CustomLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/classes/CustomLogger */ "./src/utils/classes/CustomLogger.ts");


class QualityEnhancer {
    constructor() {
        this.init = async () => {
            window.document.onkeydown = asy(e);
            {
                console.log(e);
                this.reset_video_quality();
            }
        };
        this.reset_video_quality = async () => {
        };
        this.logger = new _utils_classes_CustomLogger__WEBPACK_IMPORTED_MODULE_1__.CustomLogger("[QualityEnhancer]");
        this.bitrate_menu = new _utils_classes_BitrateMenu__WEBPACK_IMPORTED_MODULE_0__.BitrateMenu();
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1288d51e83aa8589d8b0")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=content.054d99fb662abc69b153.hot-update.js.map