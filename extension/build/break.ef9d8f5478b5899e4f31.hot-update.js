"use strict";
self["webpackHotUpdatefix_your_netflix_experiment_extension"]("break",{

/***/ "./src/config/storage.config.ts":
/*!**************************************!*\
  !*** ./src/config/storage.config.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STORAGE_DEFAULT": () => (/* binding */ STORAGE_DEFAULT),
/* harmony export */   "STORAGE_KEYS": () => (/* binding */ STORAGE_KEYS)
/* harmony export */ });
// The rest...
const STORAGE_KEYS = {
    EXPERIMENT_SETTINGS: "experiment_settings",
    EXPERIMENT_VARIABLES: "experiment_variables"
};
const STORAGE_DEFAULT = {
    experiment_settings: {
        stats_record_interval_ms: 1000,
        bitrate_change_interval_ms: 2.5 * 60 * 1000,
        video_url: [
            https
        ],
        subject_id: "default_subject_id"
    },
    experiment_variables: {
        database_experiment_id: 0,
        database_video_id: 0,
        video_count: 0,
        experiment_running: false
    }
};


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1223e3c956b5185c6d89")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=break.ef9d8f5478b5899e4f31.hot-update.js.map