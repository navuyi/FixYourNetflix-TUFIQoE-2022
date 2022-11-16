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
            await _utils_classes_NetflixBitrateMenu__WEBPACK_IMPORTED_MODULE_1__.NetflixBitrateMenu.invoke();
            const bitrates = _utils_classes_NetflixBitrateMenu__WEBPACK_IMPORTED_MODULE_1__.NetflixBitrateMenu.get;
        };
        this.logger = new _utils_classes_CustomLogger__WEBPACK_IMPORTED_MODULE_0__.CustomLogger("[QualityEnhancer]");
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("781eccdc6de7edc78d07")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=content.c633ca3e6a197c81b4c4.hot-update.js.map