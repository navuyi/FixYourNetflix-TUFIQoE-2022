"use strict";
self["webpackHotUpdatefix_your_netflix_experiment_extension"]("mainContentScript",{

/***/ "./src/pages/Content/main/modules/CustomPlayer.ts":
/*!********************************************************!*\
  !*** ./src/pages/Content/main/modules/CustomPlayer.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomPlayer": () => (/* binding */ CustomPlayer)
/* harmony export */ });
/* harmony import */ var _utils_wait_for_video_to_load__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/wait_for_video_to_load */ "./src/pages/Content/utils/wait_for_video_to_load.js");
/* harmony import */ var _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/CustomLogger */ "./src/utils/CustomLogger.ts");


class CustomPlayer {
    constructor() {
        this.elements_to_remove = ["control-play-pause-pause", "control-play-pause-play", "control-back10",
            "control-forward10", "control-speed", "control-fullscreen-enter",
            "control-fullscreen-exit", "control-episodes", "control-next", "timeline-bar"];
        this.elements_to_leave = [
            "control-volume-off",
            "control-volume-low",
            "control-volume-medium",
            "control-volume-high",
            "control-audio-subtitle"
        ];
        this.init = async () => {
            await (0,_utils_wait_for_video_to_load__WEBPACK_IMPORTED_MODULE_0__.wait_for_video_to_load)();
            await this.create_shutter();
            const video_canvas = document.querySelectorAll("[data-uia='video-canvas']")[0];
            video_canvas.addEventListener("mousemove", () => {
                let controls_container = document.getElementsByClassName("watch-video--bottom-controls-container")[0];
                this.elements_to_remove.forEach(element_data_uia => {
                    const element = this.get_element(controls_container, element_data_uia);
                    if (element)
                        element.remove();
                });
                this.elements_to_leave.forEach(element_data_uia => {
                    const element = this.get_element(controls_container, element_data_uia);
                    if (element)
                        this.modify_element(element);
                });
            });
        };
        this.get_element = (container, element_data_uia) => {
            const selector = `[data-uia='${element_data_uia}']`;
            return container.querySelectorAll(selector)[0];
        };
        this.logger = new _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_1__.CustomLogger("[CustomPlayer]");
    }
    modify_element(element) {
        if (element && element.parentNode) {
            const element = element, parent_node = element.parentNode;
            element.style.zIndex = "10100";
            parent_node.style.zIndex = "10100";
        }
    }
    async create_shutter() {
        const video_canvas = document.querySelectorAll("[data-uia='video-canvas']")[0];
        const shutter = document.createElement("div");
        shutter.id = "transparent_panel";
        shutter.style.width = "100vw";
        shutter.style.height = "100vh";
        shutter.style.position = "absolute";
        shutter.style.left = "0";
        shutter.style.top = "0";
        shutter.style.backgroundColor = "lightblue";
        shutter.style.display = "flex";
        shutter.style.justifyContent = "center";
        shutter.style.alignItems = "center";
        shutter.style.flexDirection = "column";
        shutter.style.zIndex = "10000";
        shutter.style.opacity = "0";
        shutter.onclick = (e) => {
            e.stopPropagation();
        };
        video_canvas.appendChild(shutter);
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("42f68c7b36f84ff83b85")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=mainContentScript.dc83b061090e198ec977.hot-update.js.map