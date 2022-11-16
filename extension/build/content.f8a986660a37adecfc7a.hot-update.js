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
            window.document.onkeydown = (e) => {
                console.log(e);
            };
        };
        this.reset_video_quality = () => {
        };
        this.logger = new _utils_classes_CustomLogger__WEBPACK_IMPORTED_MODULE_0__.CustomLogger("[QualityEnhancer]");
        this.bitrate_menu = new BitraMe;
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("670992c3ab0ec342a7e4")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=content.f8a986660a37adecfc7a.hot-update.js.map