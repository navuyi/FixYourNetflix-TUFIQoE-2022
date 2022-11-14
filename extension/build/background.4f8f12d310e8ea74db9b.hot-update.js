"use strict";
self["webpackHotUpdatefix_your_netflix_experiment_extension"]("background",{

/***/ "./src/utils/CustomLogger.ts":
/*!***********************************!*\
  !*** ./src/utils/CustomLogger.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomLogger": () => (/* binding */ CustomLogger)
/* harmony export */ });
/* harmony import */ var _time_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./time_utils */ "./src/utils/time_utils.ts");

class CustomLogger {
}
{
    undefined.prefix = prefix;
    undefined.original_logger = console.log;
}
log = (content) => {
    const prefix_date = `${undefined.prefix} | ${(0,_time_utils__WEBPACK_IMPORTED_MODULE_0__.get_local_datetime)(new Date())} |`;
    undefined.original_logger(prefix_date, content);
};


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e01c5c4099be5c12be47")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=background.4f8f12d310e8ea74db9b.hot-update.js.map