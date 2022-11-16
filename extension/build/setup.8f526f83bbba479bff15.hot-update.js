"use strict";
self["webpackHotUpdatefix_your_netflix_experiment_extension"]("setup",{

/***/ "./src/utils/classes/ChromeStorage.ts":
/*!********************************************!*\
  !*** ./src/utils/classes/ChromeStorage.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_storage_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/storage.config */ "./src/config/storage.config.ts");
/* harmony import */ var _CustomLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomLogger */ "./src/utils/classes/CustomLogger.ts");


abclass;
ChromeStorage;
{
    logger: _CustomLogger__WEBPACK_IMPORTED_MODULE_1__.CustomLogger = new _CustomLogger__WEBPACK_IMPORTED_MODULE_1__.CustomLogger("ChromeStorage");
    initialize_default = async () => {
        ChromeStorage.logger.log("Initializing default storage");
        await chrome.storage.local.set(_config_storage_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_DEFAULT);
    };
    set_single = async (key, data) => {
        await chrome.storage.local.set({
            [key]: data
        });
    };
    get_single = async (key) => {
        const res = await chrome.storage.local.get([key]);
        return res[key];
    };
    get_multiple = async (...keys) => {
        return await chrome.storage.local.get([...keys]);
    };
    get_experiment_variables = async () => {
        const experiment_variables = await ChromeStorage.get_single("experiment_variables");
        return experiment_variables;
    };
    get_experiment_settings = async () => {
        const experiment_settings = await ChromeStorage.get_single("experiment_settings");
        return experiment_settings;
    };
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2f2a754a355d094a7c78")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=setup.8f526f83bbba479bff15.hot-update.js.map