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
            awa;
        };
        this.logger = new _utils_classes_CustomLogger__WEBPACK_IMPORTED_MODULE_0__.CustomLogger("[QualityEnhancer]");
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("65375a019de2c3df67bd")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=content.ad1920d20d555900c3db.hot-update.js.map