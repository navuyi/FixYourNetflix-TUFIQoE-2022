"use strict";
self["webpackHotUpdatefix_your_netflix_experiment_extension"]("mainContentScript",{

/***/ "./src/pages/Content/main/modules/BitrateController.js":
/*!*************************************************************!*\
  !*** ./src/pages/Content/main/modules/BitrateController.js ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_BitrateMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/BitrateMenu */ "./src/pages/Content/utils/BitrateMenu.ts");
/* harmony import */ var _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/CustomLogger */ "./src/utils/CustomLogger.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../config/config */ "./src/config/config.ts");
/* harmony import */ var _utils_time_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/time_utils */ "./src/utils/time_utils.ts");
/* harmony import */ var _utils_http_requests_send_bitrate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../utils/http_requests/send_bitrate */ "./src/utils/http_requests/send_bitrate.js");
/* harmony import */ var _BufferResetter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BufferResetter */ "./src/pages/Content/main/modules/BufferResetter.js");
/* harmony import */ var _utils_wait_for_video_to_load__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/wait_for_video_to_load */ "./src/pages/Content/utils/wait_for_video_to_load.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};









class BitrateController {
  scenario;
  interval;
  iterator;
  bitrate_menu;
  logger;
  buffer_resetter;

  constructor(scenario, interval, bitrate_menu, iterator) {
    this.scenario = scenario;
    this.interval = interval;
    this.iterator = iterator;
    this.bitrate_menu = bitrate_menu;
    this.logger = new _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_1__.CustomLogger("[BitrateController]");
    this.buffer_resetter = new _BufferResetter__WEBPACK_IMPORTED_MODULE_5__["default"]();
  }

  async init() {
    await (0,_utils_wait_for_video_to_load__WEBPACK_IMPORTED_MODULE_6__.wait_for_video_to_load)();
    await this.set_bitrate(); // First bitrate set after video is loaded

    await this.buffer_resetter.reset(); // Navigating to the start and resetting buffer

    await this.set_bitrate(); // Second bitrate set after buffer is reset

    this.start_bitrate_change_interval(); // Scheduling the rest of bitrate changes using setInterval
  }
  /**
   * Universal method for setting the next bitrate value in order.
   * Order of bitrates is defined by video's scenario.
   * @returns {Promise<void>}
  */


  async set_bitrate() {
    const settings = this.iterator.next().value;
    this.logger.log(`Setting bitrate to ${settings.bitrate}kbps which corresponds to VMAF ${settings.vmaf}`);
    this.logger.log(`VMAF template was ${settings.vmaf_template}. Difference: ${settings.vmaf_diff}`);
    await this.execute_bitrate_change(settings.bitrate);
  }
  /**
   * Executes bitrate change by invoking actual bitrate menu,
   * validating selected bitrate and overriding the settings
   * @param bitrate<number>
   * @returns {Promise<void>}
  */


  async execute_bitrate_change(bitrate) {
    // Invoke bitrate menu
    await this.bitrate_menu.invoke_bitrate_menu(); // ESSENTIAL --> bitrate menu has to be invoked before simulating clicks and changing bitrate
    // Validate selected bitrate

    const bitrate_validated = this.bitrate_menu.check_bitrate_availability(bitrate); // Set bitrate

    await this.bitrate_menu.set_bitrate(bitrate_validated); // Send bitrate change update to backend server

    await this.send_bitrate_change_update(bitrate_validated);
  }
  /**
   * Prepares data and sends post request to REST API
   * with information on new bitrate change.
   * Also updates chrome.storage with current bitrate
   * @param {Number} bitrate
  */


  async send_bitrate_change_update(bitrate) {
    // Get previous bitrate and send update
    const res = await chrome.storage.local.get([_config_config__WEBPACK_IMPORTED_MODULE_2__.STORAGE_KEYS.CURRENT_BITRATE, _config_config__WEBPACK_IMPORTED_MODULE_2__.STORAGE_KEYS.DATABASE_VIDEO_ID]);
    const bitrate_data = {
      video_id: res[_config_config__WEBPACK_IMPORTED_MODULE_2__.STORAGE_KEYS.DATABASE_VIDEO_ID],
      previous: res[_config_config__WEBPACK_IMPORTED_MODULE_2__.STORAGE_KEYS.CURRENT_BITRATE],
      timestamp: (0,_utils_time_utils__WEBPACK_IMPORTED_MODULE_3__.get_local_datetime)(new Date()),
      value: bitrate
    };
    /*await */

    (0,_utils_http_requests_send_bitrate__WEBPACK_IMPORTED_MODULE_4__.send_bitrate)(bitrate_data); // <-- not waiting for response
    // Save new current bitrate value to chrome.storage

    await chrome.storage.local.set({
      [_config_config__WEBPACK_IMPORTED_MODULE_2__.STORAGE_KEYS.CURRENT_BITRATE]: bitrate
    });
  }
  /**
   * Starts bitrate change interval
  */


  start_bitrate_change_interval() {
    setInterval(async () => {
      await this.set_bitrate();
    }, this.interval);
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}

const _default = BitrateController;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(BitrateController, "BitrateController", "/Users/navuyi/Desktop/tufiqoe/FixYourNetflix-TUFIQoE-2022/extension/src/pages/Content/main/modules/BitrateController.js");
  reactHotLoader.register(_default, "default", "/Users/navuyi/Desktop/tufiqoe/FixYourNetflix-TUFIQoE-2022/extension/src/pages/Content/main/modules/BitrateController.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/pages/Content/main/modules/BufferResetter.js":
/*!**********************************************************!*\
  !*** ./src/pages/Content/main/modules/BufferResetter.js ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../utils/CustomLogger */ "./src/utils/CustomLogger.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



class BufferResetter {
  constructor() {
    this.logger = new _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_0__.CustomLogger("[BufferResetter]");
    this.inject_code();
  }

  async reset() {
    let interval = undefined;
    const delay = 333;
    return new Promise(resolve => {
      interval = setInterval(async () => {
        const seek_element = document.getElementById("seek_element");
        const video = document.getElementsByTagName("video")[0];

        if (seek_element != null && video != null) {
          clearInterval(interval); // Clear interval immediately !!!
          // Pause, mute and hide video as soon as possible

          video.style.opacity = "0";
          video.pause();
          video.muted = true; // Proceed with resetting

          await new Promise(resolve => {
            setTimeout(() => {
              this.logger.log("Navigating to 1000th second of video");
              seek_element.setAttribute("timestamp", String(1000));
              seek_element.click();
              resolve();
            }, delay);
          });
          await new Promise(resolve => {
            setTimeout(() => {
              this.logger.log("Navigating to the very beginning of the video");
              seek_element.setAttribute("timestamp", String(0));
              seek_element.click();
              resolve();
            }, delay);
          });
          await new Promise(resolve => {
            setTimeout(() => {
              this.logger.log("Resuming normal playback");
              video.muted = false;
              video.style.opacity = "1";
              video.play();
              resolve();
            }, delay);
          });
          resolve();
        } else {// nothing, try again
        }
      }, 10);
    });
  }

  inject_code() {
    this.logger.log("Injecting netflixControls.bundle.js script into the page");
    const s = document.createElement('script');
    s.src = chrome.runtime.getURL("netflixControls.bundle.js");
    (document.head || document.documentElement).appendChild(s);
    s.remove();
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}

const _default = BufferResetter;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(BufferResetter, "BufferResetter", "/Users/navuyi/Desktop/tufiqoe/FixYourNetflix-TUFIQoE-2022/extension/src/pages/Content/main/modules/BufferResetter.js");
  reactHotLoader.register(_default, "default", "/Users/navuyi/Desktop/tufiqoe/FixYourNetflix-TUFIQoE-2022/extension/src/pages/Content/main/modules/BufferResetter.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/pages/Content/main/modules/CustomPlayer.js":
/*!********************************************************!*\
  !*** ./src/pages/Content/main/modules/CustomPlayer.js ***!
  \********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomPlayer": () => (/* binding */ CustomPlayer)
/* harmony export */ });
/* harmony import */ var _utils_wait_for_video_to_load__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/wait_for_video_to_load */ "./src/pages/Content/utils/wait_for_video_to_load.js");
/* harmony import */ var _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/CustomLogger */ "./src/utils/CustomLogger.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



class CustomPlayer {
  constructor() {
    this.logger = new _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_1__.CustomLogger("[CustomPlayer]");
    this.elements_to_remove = ["control-play-pause-pause", "control-play-pause-play", "control-back10", "control-forward10", "control-speed", "control-fullscreen-enter", "control-fullscreen-exit", "control-episodes", "control-next", "timeline-bar"];
    this.elements_to_leave = ["control-volume-off", "control-volume-low", "control-volume-medium", "control-volume-high", "control-audio-subtitle"];
  }

  async init() {
    await (0,_utils_wait_for_video_to_load__WEBPACK_IMPORTED_MODULE_0__.wait_for_video_to_load)();
    await this.create_shutter();
    const video_canvas = document.querySelectorAll("[data-uia='video-canvas']")[0];
    video_canvas.addEventListener("mousemove", () => {
      let controls_container = document.getElementsByClassName("watch-video--bottom-controls-container")[0];
      this.elements_to_remove.forEach(element_data_uia => {
        const element = this.get_element(controls_container, element_data_uia);
        if (element) element.remove();
      });
      this.elements_to_leave.forEach(element_data_uia => {
        const element = this.get_element(controls_container, element_data_uia);
        if (element) this.modify_element(element);
      });
    });
  }

  modify_element(element) {
    element.style.zIndex = "10100";
    element.parentNode.style.zIndex = "10100";
  }

  get_element(container, element_data_uia) {
    const selector = `[data-uia='${element_data_uia}']`;
    return container.querySelectorAll(selector)[0];
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

    shutter.onclick = e => {
      e.stopPropagation();
    };

    video_canvas.appendChild(shutter);
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CustomPlayer, "CustomPlayer", "/Users/navuyi/Desktop/tufiqoe/FixYourNetflix-TUFIQoE-2022/extension/src/pages/Content/main/modules/CustomPlayer.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/pages/Content/main/modules/QualityScenarioManager.js":
/*!******************************************************************!*\
  !*** ./src/pages/Content/main/modules/QualityScenarioManager.js ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QualityScenarioManager": () => (/* binding */ QualityScenarioManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../config/config */ "./src/config/config.ts");
/* harmony import */ var _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/CustomLogger */ "./src/utils/CustomLogger.ts");
/* harmony import */ var _BitrateController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BitrateController */ "./src/pages/Content/main/modules/BitrateController.js");
/* harmony import */ var _utils_BitrateMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/BitrateMenu */ "./src/pages/Content/utils/BitrateMenu.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






class QualityScenarioManager {
  scenario;
  bitrate_interval;
  logger;
  bitrate_menu;
  iterator;
  bitrate_controller;

  async init() {
    this.bitrate_menu = new _utils_BitrateMenu__WEBPACK_IMPORTED_MODULE_3__.BitrateMenu();
    await this.bitrate_menu.init();
    this.logger = new _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_1__.CustomLogger("[QualityScenarioManager]");
    this.scenario = await this.prepare_video_scenario();
    this.bitrate_interval = await this.prepare_bitrate_interval();
    this.iterator = this.scenario_iterator(); // Start bitrate changes

    this.bitrate_controller = new _BitrateController__WEBPACK_IMPORTED_MODULE_2__["default"](this.scenario, this.bitrate_interval, this.bitrate_menu, this.iterator);
    await this.bitrate_controller.init();
  }
  /**
   *  Method reads bitrate changes interval from config file. Provided in seconds has to be converted to ms.
   */


  async prepare_bitrate_interval() {
    const configuration = (await chrome.storage.local.get([_config_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEYS.CONFIGURATION]))[_config_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEYS.CONFIGURATION];
    const interval_s = configuration[_config_config__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION_KEYS.BITRATE_INTERVAL];

    if (interval_s != null && typeof interval_s == 'number') {
      this.logger.log(`Configuration's bitrate change interval - OK, ${interval_s}s = ${this.bitrate_interval}ms`);
      return 1000 * interval_s;
    } else {
      this.logger.log(`Configuration's bitrate change interval missing or incorrect. Using default interval`);
      return _config_config__WEBPACK_IMPORTED_MODULE_0__.BITRATE_INTERVAL;
    }
  }
  /**
   *  Method prepares scenario for current video.
   *  Fetches configuration from chrome.storage.
   */


  async prepare_video_scenario() {
    const storage = await chrome.storage.local.get([_config_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEYS.CONFIGURATION, _config_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEYS.VIDEO_COUNT]);
    const configuration = storage[_config_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEYS.CONFIGURATION];
    const video_count = storage[_config_config__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEYS.VIDEO_COUNT];
    const video_index = video_count - 1;
    return configuration[_config_config__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION_KEYS.VIDEOS][video_index][_config_config__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION_KEYS.VIDEO_KEYS.SCENARIO];
  }
  /**
   * Yields scenario's items in loop
   */


  *scenario_iterator() {
    let index = 0;

    while (true) {
      this.logger.log("Yielding...");
      this.logger.log(this.scenario[index]);
      yield this.scenario[index];

      if (index >= this.scenario.length - 1) {
        index = 0;
      } else {
        index += 1;
      }
    }
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}
const _default = QualityScenarioManager;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(QualityScenarioManager, "QualityScenarioManager", "/Users/navuyi/Desktop/tufiqoe/FixYourNetflix-TUFIQoE-2022/extension/src/pages/Content/main/modules/QualityScenarioManager.js");
  reactHotLoader.register(_default, "default", "/Users/navuyi/Desktop/tufiqoe/FixYourNetflix-TUFIQoE-2022/extension/src/pages/Content/main/modules/QualityScenarioManager.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./src/pages/Content/main/modules/StatsAnalyzer.ts":
/*!*********************************************************!*\
  !*** ./src/pages/Content/main/modules/StatsAnalyzer.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatsAnalyzer": () => (/* binding */ StatsAnalyzer)
/* harmony export */ });
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../config/config */ "./src/config/config.ts");
/* harmony import */ var _utils_time_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/time_utils */ "./src/utils/time_utils.ts");
/* harmony import */ var _utils_http_requests_send_playback_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils/http_requests/send_playback_data */ "./src/utils/http_requests/send_playback_data.js");
/* harmony import */ var _utils_StatisticsMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/StatisticsMenu */ "./src/pages/Content/utils/StatisticsMenu.ts");
/* harmony import */ var _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../utils/CustomLogger */ "./src/utils/CustomLogger.ts");






class StatsAnalyzer {
    constructor() {
        this.init = async () => {
            this.logger.log(`Initializing...`);
            // Create StatisticsMenu class instance
            this.stats_menu = new _utils_StatisticsMenu__WEBPACK_IMPORTED_MODULE_3__.StatisticsMenu();
            await this.stats_menu.init();
            // Start recording playback statistics
            await this.start_recording();
        };
        this.start_recording = async () => {
            this.interval = setInterval(async () => {
                if (this.stats_menu == null) {
                    return;
                }
                const timestamp = (0,_utils_time_utils__WEBPACK_IMPORTED_MODULE_1__.get_local_datetime)(new Date());
                const data = this.stats_menu.analyze_statistics_text();
                data.timestamp = timestamp;
                const archive = this.compile_archive(this.stats_menu.get_statistics_text(), timestamp);
                // Send playback data to backend
                // NOT USING await --> not waiting for response
                /*await*/ (0,_utils_http_requests_send_playback_data__WEBPACK_IMPORTED_MODULE_2__.send_playback_data)(data, archive);
                // Check if credits are available and remove container
                await this.are_credits_available();
            }, _config_config__WEBPACK_IMPORTED_MODULE_0__.STATS_RECORD_INTERVAL_MS);
        };
        this.compile_archive = (data, timestamp) => {
            return {
                [_config_config__WEBPACK_IMPORTED_MODULE_0__.ARCHIVE_KEYS.DATA]: data,
                [_config_config__WEBPACK_IMPORTED_MODULE_0__.ARCHIVE_KEYS.TIMESTAMP]: timestamp
            };
        };
        this.logger = new _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_4__.CustomLogger("[StatsAnalyzer]");
    }
    /**
     * This method checks if certain HTML elements are available in DOM tree.
     * Their availability indicates that serie's video is about to end and credits are present.
     * If elements are detected video playback ends and subject is redirected to custom extension's web page
    */
    async are_credits_available() {
        const outer_container = document.getElementsByClassName("nfa-pos-abs nfa-bot-6-em nfa-right-5-em nfa-d-flex")[0];
        // data-uia = "watch-credits-seamless-button"   // Leave this for reference purpose
        // data-uia="next-episode-seamless-button"      // Leave this for reference purpose
        // Checking PlayerSpace class element in case of last episode of the last season
        const player_space = document.getElementsByClassName("PlayerSpace")[0];
        // This element is displayed when last video of last season is played or a standalone movie
        const back_to_browse = document.getElementsByClassName("BackToBrowse")[0];
        if (back_to_browse) {
            clearInterval(this.interval);
            // Pause the video
            document.getElementsByTagName("video")[0].pause();
            // Send FINISHED signal to the BackgroundScript
            await chrome.runtime.sendMessage({
                [_config_config__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_TEMPLATE.HEADER]: _config_config__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_HEADERS.FINISHED,
                [_config_config__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_TEMPLATE.DATA]: true
            });
        }
        else if (player_space) {
            // Stop analyzing
            clearInterval(this.interval);
            // Pause the video
            document.getElementsByTagName("video")[0].pause();
            // Send FINISHED signal to the BackgroundScript
            await chrome.runtime.sendMessage({
                [_config_config__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_TEMPLATE.HEADER]: _config_config__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_HEADERS.FINISHED,
                [_config_config__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_TEMPLATE.DATA]: true
            });
        }
        else if (outer_container) {
            // Click watch credits button
            const credits_button = document.querySelectorAll('[data-uia="watch-credits-seamless-button"]')[0];
            credits_button.click();
            outer_container.remove(); // remove container
            // Stop analyzing
            clearInterval(this.interval);
            // Pause the video
            document.getElementsByTagName("video")[0].pause();
            // Send FINISHED signal to the BackgroundScript
            await chrome.runtime.sendMessage({
                [_config_config__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_TEMPLATE.HEADER]: _config_config__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_HEADERS.FINISHED,
                [_config_config__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_TEMPLATE.DATA]: true
            });
        }
    }
}


/***/ }),

/***/ "./src/pages/Content/utils/BitrateMenu.ts":
/*!************************************************!*\
  !*** ./src/pages/Content/utils/BitrateMenu.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BitrateMenu": () => (/* binding */ BitrateMenu)
/* harmony export */ });
/* harmony import */ var _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/CustomLogger */ "./src/utils/CustomLogger.ts");
/* harmony import */ var _get_bitrate_menu_elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get_bitrate_menu_elements */ "./src/pages/Content/utils/get_bitrate_menu_elements.ts");
/* harmony import */ var _keyboard_hotkeys_simulate_bitrate_menu_hotkeys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keyboard_hotkeys/simulate_bitrate_menu_hotkeys */ "./src/pages/Content/utils/keyboard_hotkeys/simulate_bitrate_menu_hotkeys.js");



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
            this.bitrate_menu_elements = await (0,_get_bitrate_menu_elements__WEBPACK_IMPORTED_MODULE_1__.invoke_bitrate_menu_and_get_html_elements)();
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
        this.logger = new _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_0__.CustomLogger("[BitrateMenu]");
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

/***/ "./src/pages/Content/utils/StatisticsMenu.ts":
/*!***************************************************!*\
  !*** ./src/pages/Content/utils/StatisticsMenu.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatisticsMenu": () => (/* binding */ StatisticsMenu)
/* harmony export */ });
/* harmony import */ var _get_statistics_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get_statistics_element */ "./src/pages/Content/utils/get_statistics_element.ts");
/* harmony import */ var _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/CustomLogger */ "./src/utils/CustomLogger.ts");


class StatisticsMenu {
    constructor() {
        /**
         *  Prepares for further actions
        */
        this.init = async () => {
            await this.invoke_statistics_menu();
        };
        /**
         *  Invokes statistics menu to the screen
         *  and assigns statistics element to the instance's attribute
        */
        this.invoke_statistics_menu = async () => {
            this.stats_element = await (0,_get_statistics_element__WEBPACK_IMPORTED_MODULE_0__.get_statistics_element)();
        };
        /**
         * Returns statistics element's value parsed to string.
         * It can be further analyzed using regular expressions.
         * @returns {string}
        */
        this.get_statistics_text = () => {
            if (this.stats_element)
                return this.stats_element.value.toString();
        };
        /**
         * Creates object with information retrieved from nerd statistics string value.
         * @returns {object} Object with key - parameter name, values - parameter's value
         * eg.
         * {    ...
         *      buffering_vmaf: 90,
         *      buffering_bitrate_video: 2550
         *      ...
         * }
        */
        this.analyze_statistics_text = () => {
            if (this.stats_element == null) {
                return;
            }
            const text = this.stats_element.value.toString();
            const data = {
                position: this.get_value("(Position:) ([0-9]+.[0-9]+)", 2, text),
                volume: this.get_value("(Volume:) ([0-9]+)%", 2, text),
                segment_position: this.get_value("(Segment Position:) ([0-9]+.[0-9]+)", 2, text),
                player_state: this.get_value("(Player state: )([a-zA-Z]+)", 2, text),
                buffering_state: this.get_value("(Buffering state:) (.+)", 2, text),
                rendering_state: this.get_value("(Rendering state:) (.+)", 2, text),
                playing_bitrate_audio: this.get_value("Playing bitrate \\(a\\/v\\):\\s*([0-9]+)\\s*\\/\\s*([0-9]+)", 1, text),
                playing_bitrate_video: this.get_value("Playing bitrate \\(a\\/v\\):\\s*([0-9]+)\\s*\\/\\s*([0-9]+)", 2, text),
                resolution: this.get_value("([0-9]+x[0-9]+)", 1, text),
                playing_vmaf: this.get_value("Playing\/Buffering vmaf: ([0-9]+)\s*\/\s*([0-9]+)", 1, text),
                buffering_vmaf: this.get_value("Playing\/Buffering vmaf: ([0-9]+)\s*\/\s*([0-9]+)", 2, text),
                buffering_bitrate_audio: this.get_value("Buffering bitrate \\(a\\/v\\):\\s*([0-9]+)\\s*\\/\\s*([0-9]+)", 1, text),
                buffering_bitrate_video: this.get_value("Buffering bitrate \\(a\\/v\\):\\s*([0-9]+)\\s*\\/\\s*([0-9]+)", 2, text),
                total_frames: this.get_value("Total Frames:\\s*([0-9]+)", 1, text),
                total_dropped_frames: this.get_value("Total Dropped Frames:\\s*([0-9]+)", 1, text),
                total_corrupted_frames: this.get_value("Total Corrupted Frames:\\s*([0-9]+)", 1, text),
                framerate: this.get_value("Framerate: ([0-9]+.[0-9]+)", 1, text),
                duration: this.get_value("(Duration:) ([0-9]+.[0-9]+)", 2, text),
                timestamp: null
            };
            return data;
        };
        /**
         * Utility method --> extracts useful data from nerds stats (long) string
         * @param {string} regex
         * @param {number} group
         * @param {string} data
         * @returns {object|null}
         */
        this.get_value = (regex, group, data) => {
            try {
                let value = data.match(regex) ?? null;
                if (value != null) {
                    return value[group];
                }
                else {
                    return null;
                }
            }
            catch (e) {
                this.logger.log(e);
                return null;
            }
        };
        this.logger = new _utils_CustomLogger__WEBPACK_IMPORTED_MODULE_1__.CustomLogger("[StatisticsMenu]");
    }
}


/***/ }),

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
    constructor(prefix) {
        this.log = (content) => {
            const prefix_date = `${this.prefix} | ${(0,_time_utils__WEBPACK_IMPORTED_MODULE_0__.get_local_datetime)(new Date())} |`;
            this.original_logger(prefix_date, content);
        };
        this.prefix = prefix;
        this.original_logger = console.log;
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("370632cd0774a17088c5")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=mainContentScript.fd0de6de920bf437e534.hot-update.js.map