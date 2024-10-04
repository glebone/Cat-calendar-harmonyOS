(function(){
                        
                        var createPageHandler = function() {
                            return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/preset-env,targets=node 8&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-transform-modules-commonjs&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/jsx-loader.js&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-proposal-class-properties&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-proposal-object-rest-spread&comments=false!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Hello/hello.ux":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/preset-env,targets=node 8&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-transform-modules-commonjs&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/jsx-loader.js&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-proposal-class-properties&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-proposal-object-rest-spread&comments=false!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Hello/hello.ux ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const fetch = $app_require$('@app-module/system.fetch');
const storage = $app_require$('@app-module/system.storage');
var _default = {
  data: {
    today: new Date(),
    currentDate: new Date(),
    year: '',
    formattedDate: '',
    displayDay: '',
    sunrise: '',
    sunset: '',
    moonPhase: '',
    moonEmoji: '🌑',
    note: '',
    notes: [],
    confirmation: '',
    dateColor: 'today',
    inputFocused: false
  },
  onInit() {
    this.updateDateInfo();
  },
  updateDateInfo() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.year = this.currentDate.getFullYear();
    const month = months[this.currentDate.getMonth()];
    const dayOfWeek = daysOfWeek[this.currentDate.getDay()];
    this.formattedDate = `${month}, ${dayOfWeek}`;
    this.displayDay = this.currentDate.getDate();
    const todayString = this.today.toDateString();
    const currentString = this.currentDate.toDateString();
    if (todayString === currentString) {
      this.dateColor = 'today';
    } else if (this.currentDate > this.today) {
      this.dateColor = 'future';
    } else {
      this.dateColor = 'past';
    }
    this.fetchSunriseSunset();
    this.calculateMoonPhase();
    this.loadNotes();
  },
  previousDay() {
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    this.updateDateInfo();
  },
  nextDay() {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.updateDateInfo();
  },
  fetchSunriseSunset() {
    const lat = 49.4444;
    const lng = 32.0598;
    fetch.fetch({
      url: `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${this.currentDate.toISOString().split('T')[0]}&formatted=0`,
      method: 'GET',
      success: data => {
        const result = JSON.parse(data.data).results;
        const sunriseUTC = new Date(result.sunrise);
        const sunsetUTC = new Date(result.sunset);
        this.sunrise = this.formatTime(sunriseUTC);
        this.sunset = this.formatTime(sunsetUTC);
      },
      fail: (data, code) => {
        console.error('Failed to fetch sunrise/sunset data', code);
      }
    });
  },
  formatTime(date) {
    const localHours = date.getHours().toString().padStart(2, '0');
    const localMinutes = date.getMinutes().toString().padStart(2, '0');
    return `${localHours}:${localMinutes}`;
  },
  calculateMoonPhase() {
    const today = this.currentDate;
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    let r = year % 100;
    r %= 19;
    if (r > 9) {
      r -= 19;
    }
    r = r * 11 % 30 + month + day;
    if (month < 3) {
      r += 2;
    }
    const phase = r % 30;
    if (phase < 1) {
      this.moonPhase = 'New Moon';
      this.moonEmoji = '🌑';
    } else if (phase < 7) {
      this.moonPhase = 'Waxing Crescent';
      this.moonEmoji = '🌒';
    } else if (phase < 14) {
      this.moonPhase = 'First Quarter';
      this.moonEmoji = '🌓';
    } else if (phase < 21) {
      this.moonPhase = 'Full Moon';
      this.moonEmoji = '🌕';
    } else if (phase < 28) {
      this.moonPhase = 'Waning Crescent';
      this.moonEmoji = '🌘';
    } else {
      this.moonPhase = 'New Moon';
      this.moonEmoji = '🌑';
    }
  },
  onNoteInput(event) {
    this.note = event.value;
  },
  onBlur() {
    this.inputFocused = false;
  },
  addNote() {
    if (this.note.trim() === '') {
      this.confirmation = 'Note is empty. Please enter a note.';
      return;
    }
    const storageKey = `note_${this.currentDate.toISOString().split('T')[0]}`;
    const newNote = this.note.trim();
    storage.get({
      key: storageKey,
      success: data => {
        let existingNotes = [];
        if (data.value) {
          try {
            existingNotes = JSON.parse(data.value);
          } catch (error) {
            console.error('Error parsing stored notes:', error);
            existingNotes = [];
          }
        }
        existingNotes.push(newNote);
        storage.set({
          key: storageKey,
          value: JSON.stringify(existingNotes),
          success: () => {
            this.confirmation = 'Note added successfully!';
            this.note = '';
            this.notes = existingNotes;
            this.inputFocused = false;
          },
          fail: (data, code) => {
            console.error('Failed to save note', code);
            this.confirmation = 'Failed to add note.';
          }
        });
      },
      fail: (data, code) => {
        if (code === -1) {
          const existingNotes = [newNote];
          storage.set({
            key: storageKey,
            value: JSON.stringify(existingNotes),
            success: () => {
              this.confirmation = 'Note added successfully!';
              this.note = '';
              this.notes = existingNotes;
              this.inputFocused = false;
            },
            fail: (data, code) => {
              console.error('Failed to save note', code);
              this.confirmation = 'Failed to add note.';
            }
          });
        } else {
          console.error('Failed to get existing notes', code);
          this.confirmation = 'Failed to add note.';
        }
      }
    });
  },
  loadNotes() {
    const storageKey = `note_${this.currentDate.toISOString().split('T')[0]}`;
    storage.get({
      key: storageKey,
      success: data => {
        if (data.value) {
          try {
            this.notes = JSON.parse(data.value);
          } catch (error) {
            console.error('Error parsing stored notes:', error);
            this.notes = [];
          }
        } else {
          this.notes = [];
        }
      },
      fail: (data, code) => {
        if (code === -1) {
          this.notes = [];
        } else {
          console.error('Failed to load notes', code);
          this.notes = [];
        }
      }
    });
  }
};
exports.default = _default;
var accessors = ['public', 'protected', 'private'];
var moduleOwn = exports.default || module.exports;
var accessor = accessors.some(function (acc) {
    return moduleOwn[acc];
});
if (moduleOwn.data && accessor) {
    throw new Error(
        'For VM objects, attribute data must not coexist with public, protected, or private. Please replace data with public.'
    );
} else if (!moduleOwn.data) {
    moduleOwn._descriptor = {};
    moduleOwn.data = {};
    accessors.forEach(function (acc) {
        var accessType = typeof moduleOwn[acc];
        if (accessType === 'object') {
            moduleOwn.data = Object.assign(moduleOwn.data, moduleOwn[acc]);
            for (var name in moduleOwn[acc]) {
                moduleOwn._descriptor[name] = { access: acc };
            }
        } else if (accessType === 'function') {
            console.warn(
                'For VM objects, attribute ' + acc + ' value must not be a function. Change the value to an object.'
            );
        }
    });
}
}

/***/ }),

/***/ "../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=/Users/glebone/AYN/free_progs/cat.calendar/src/Hello/hello.ux!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=/Users/glebone/AYN/free_progs/cat.calendar/src/Hello/hello.ux!./src/Hello/hello.ux":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=/Users/glebone/AYN/free_progs/cat.calendar/src/Hello/hello.ux!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=/Users/glebone/AYN/free_progs/cat.calendar/src/Hello/hello.ux!./src/Hello/hello.ux ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".container": {
    "flexDirection": "column",
    "justifyContent": "space-around",
    "alignItems": "center",
    "height": "100%",
    "backgroundColor": "#F5E6D3",
    "paddingTop": "20px",
    "paddingRight": "20px",
    "paddingBottom": "20px",
    "paddingLeft": "20px"
  },
  ".year": {
    "fontSize": "40px",
    "marginTop": "10px",
    "textAlign": "center",
    "color": "#4B3621"
  },
  ".month-day-container": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "width": "100%",
    "marginBottom": "10px"
  },
  ".month-day": {
    "fontSize": "30px",
    "textAlign": "center"
  },
  ".date": {
    "fontSize": "80px",
    "fontWeight": "bold",
    "marginTop": "20px",
    "marginRight": "20px",
    "marginBottom": "20px",
    "marginLeft": "20px",
    "textAlign": "center"
  },
  ".sun-container": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "width": "80%",
    "marginTop": "20px",
    "marginRight": "20px",
    "marginBottom": "20px",
    "marginLeft": "20px"
  },
  ".sun-time": {
    "fontSize": "30px",
    "width": "40%",
    "textAlign": "center",
    "color": "#4B3621"
  },
  ".moon-container": {
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center",
    "marginBottom": "20px"
  },
  ".moon-image": {
    "fontSize": "50px",
    "color": "#4B3621"
  },
  ".moon-phase": {
    "fontSize": "30px",
    "textAlign": "center",
    "color": "#4B3621"
  },
  ".input": {
    "fontSize": "30px",
    "width": "400px",
    "height": "60px",
    "borderTopWidth": "2px",
    "borderRightWidth": "2px",
    "borderBottomWidth": "2px",
    "borderLeftWidth": "2px",
    "borderTopColor": "#4B3621",
    "borderRightColor": "#4B3621",
    "borderBottomColor": "#4B3621",
    "borderLeftColor": "#4B3621",
    "borderStyle": "solid",
    "borderRadius": "10px",
    "paddingTop": "10px",
    "paddingRight": "10px",
    "paddingBottom": "10px",
    "paddingLeft": "10px",
    "marginTop": "20px",
    "marginRight": "20px",
    "marginBottom": "20px",
    "marginLeft": "20px",
    "color": "#4B3621"
  },
  ".add-button": {
    "fontSize": "30px",
    "color": "#FFFFFF",
    "backgroundColor": "#4B3621",
    "borderRadius": "10px",
    "width": "150px",
    "height": "60px",
    "textAlign": "center",
    "lineHeight": "60px",
    "marginBottom": "20px"
  },
  ".notes-container": {
    "flexDirection": "column",
    "alignItems": "center",
    "width": "100%",
    "maxHeight": "150px"
  },
  ".notes-list": {
    "width": "100%"
  },
  ".note": {
    "fontSize": "20px",
    "color": "#4B3621",
    "paddingTop": "5px",
    "paddingRight": "0px",
    "paddingBottom": "5px",
    "paddingLeft": "0px"
  },
  ".nav-button": {
    "fontSize": "40px",
    "color": "#4B3621",
    "marginTop": "0px",
    "marginRight": "20px",
    "marginBottom": "0px",
    "marginLeft": "20px"
  },
  ".today": {
    "color": "#000000"
  },
  ".future": {
    "color": "#0000FF"
  },
  ".past": {
    "color": "#008000"
  }
}

/***/ }),

/***/ "../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Hello/hello.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Hello/hello.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "container"
  ],
  "children": [
    {
      "type": "text",
      "attr": {
        "value": function () {return (this.year)}
      },
      "classList": [
        "year"
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "month-day-container"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "<"
          },
          "classList": [
            "nav-button"
          ],
          "events": {
            "click": "previousDay"
          }
        },
        {
          "type": "text",
          "attr": {
            "value": function () {return (this.formattedDate)}
          },
          "classList": [
            "['month-day',",
            "dateColor]"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": ">"
          },
          "classList": [
            "nav-button"
          ],
          "events": {
            "click": "nextDay"
          }
        }
      ]
    },
    {
      "type": "text",
      "attr": {
        "value": function () {return (this.displayDay)}
      },
      "classList": [
        "date"
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "sun-container"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": function () {return '🌅 Sunrise: '+((this.sunrise))}
          },
          "classList": [
            "sun-time"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": function () {return '🌇 Sunset: '+((this.sunset))}
          },
          "classList": [
            "sun-time"
          ]
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "moon-container"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": function () {return (this.moonEmoji)}
          },
          "classList": [
            "moon-image"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": function () {return (this.moonPhase)}
          },
          "classList": [
            "moon-phase"
          ]
        }
      ]
    },
    {
      "type": "input",
      "attr": {
        "type": "text",
        "placeholder": "Add note",
        "value": function () {return (this.note)}
      },
      "classList": [
        "input"
      ],
      "events": {
        "change": "onNoteInput",
        "blur": "onBlur"
      }
    },
    {
      "type": "text",
      "attr": {
        "value": "Add"
      },
      "classList": [
        "add-button"
      ],
      "events": {
        "click": "addNote"
      }
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "notes-container"
      ],
      "children": [
        {
          "type": "list",
          "attr": {},
          "classList": [
            "notes-list"
          ],
          "children": [
            {
              "type": "list-item",
              "attr": {
                "type": "text",
                "key": "index"
              },
              "repeat": {
                "exp": function () {return (this.notes)},
                "key": "note",
                "value": "index"
              },
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return (this.note)}
                  },
                  "classList": [
                    "note"
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/Hello/hello.ux ***!
  \****************************/
var $app_template$ = __webpack_require__(/*! !!../../../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./hello.ux */ "../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Hello/hello.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=/Users/glebone/AYN/free_progs/cat.calendar/src/Hello/hello.ux!../../../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=/Users/glebone/AYN/free_progs/cat.calendar/src/Hello/hello.ux!./hello.ux */ "../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=/Users/glebone/AYN/free_progs/cat.calendar/src/Hello/hello.ux!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=/Users/glebone/AYN/free_progs/cat.calendar/src/Hello/hello.ux!./src/Hello/hello.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/preset-env,targets=node 8&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-transform-modules-commonjs&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/jsx-loader.js&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-proposal-class-properties&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-proposal-object-rest-spread&comments=false!../../../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./hello.ux */ "../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/preset-env,targets=node 8&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-transform-modules-commonjs&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/jsx-loader.js&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-proposal-class-properties&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-proposal-object-rest-spread&comments=false!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Hello/hello.ux")

$app_define$('@app-component/hello', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})

$app_bootstrap$('@app-component/hello',{ packagerName:'fa-toolkit', packagerVersion: '13.3.1-Stable.300'})
})();

/******/ })()
;   };
                        if (typeof window === "undefined") {
                            return createPageHandler();
                        }
                        else {
                            window.createPageHandler = createPageHandler
                        }
                    })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQvSGVsbG8vaGVsbG8uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUxBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDblpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDL0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvSGVsbG8vVXNlcnMvZ2xlYm9uZS9BWU4vZnJlZV9wcm9ncy9jYXQuY2FsZW5kYXIvc3JjL0hlbGxvL2hlbGxvLnV4Iiwid2VicGFjazovLy8uL3NyYy9IZWxsby9oZWxsby51eD9mMGVkIiwid2VicGFjazovLy8uL3NyYy9IZWxsby9oZWxsby51eD8zOTkwIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvSGVsbG8vaGVsbG8udXgiXSwic291cmNlc0NvbnRlbnQiOlsiPCEtLSBcblxuXi4uXiBDQVQoQykgU29mdCB8fCBDQVRDYWxlbmRhciBBcHAgZm9yIEh1YXdlaSBIYXJtb255T1MgXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4wMyBPY3RvYmVyIDIwMjQgIHx8IGdsZWJvbmVAZ21haWwuY29tIGlNYWMgTTFcbiAtLT5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPCEtLSBZZWFyIGF0IHRoZSB0b3AgLS0+XG4gICAgPHRleHQgY2xhc3M9XCJ5ZWFyXCI+e3t5ZWFyfX08L3RleHQ+XG4gICAgXG4gICAgPCEtLSBNb250aCBhbmQgZGF5IG9mIHRoZSB3ZWVrIHdpdGggbmF2aWdhdGlvbiBidXR0b25zIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJtb250aC1kYXktY29udGFpbmVyXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cIm5hdi1idXR0b25cIiBAY2xpY2s9XCJwcmV2aW91c0RheVwiPiZsdDs8L3RleHQ+XG4gICAgICA8dGV4dCA6Y2xhc3M9XCJbJ21vbnRoLWRheScsIGRhdGVDb2xvcl1cIj57e2Zvcm1hdHRlZERhdGV9fTwvdGV4dD5cbiAgICAgIDx0ZXh0IGNsYXNzPVwibmF2LWJ1dHRvblwiIEBjbGljaz1cIm5leHREYXlcIj4mZ3Q7PC90ZXh0PlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDwhLS0gQm9sZCBkYXkgb2YgdGhlIG1vbnRoIC0tPlxuICAgIDx0ZXh0IGNsYXNzPVwiZGF0ZVwiPnt7ZGlzcGxheURheX19PC90ZXh0PlxuXG4gICAgPCEtLSBTdW5yaXNlIGFuZCBTdW5zZXQgdGltZXMgLS0+XG4gICAgPGRpdiBjbGFzcz1cInN1bi1jb250YWluZXJcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwic3VuLXRpbWVcIj7wn4yFIFN1bnJpc2U6IHt7c3VucmlzZX19PC90ZXh0PlxuICAgICAgPHRleHQgY2xhc3M9XCJzdW4tdGltZVwiPvCfjIcgU3Vuc2V0OiB7e3N1bnNldH19PC90ZXh0PlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDwhLS0gTW9vbiBwaGFzZSBpbWFnZSBhbmQgbmFtZSAtLT5cbiAgICA8ZGl2IGNsYXNzPVwibW9vbi1jb250YWluZXJcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwibW9vbi1pbWFnZVwiPnt7bW9vbkVtb2ppfX08L3RleHQ+XG4gICAgICA8dGV4dCBjbGFzcz1cIm1vb24tcGhhc2VcIj57e21vb25QaGFzZX19PC90ZXh0PlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDwhLS0gSW5wdXQgZm9yIGFkZGluZyBhIG5vdGUgLS0+XG4gICAgPGlucHV0IGNsYXNzPVwiaW5wdXRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiQWRkIG5vdGVcIiB2YWx1ZT1cInt7bm90ZX19XCIgQGNoYW5nZT1cIm9uTm90ZUlucHV0XCIgQGJsdXI9XCJvbkJsdXJcIi8+XG4gICAgXG4gICAgPCEtLSBBZGQgYnV0dG9uIC0tPlxuICAgIDx0ZXh0IGNsYXNzPVwiYWRkLWJ1dHRvblwiIEBjbGljaz1cImFkZE5vdGVcIj5BZGQ8L3RleHQ+XG4gICAgXG4gICAgPCEtLSBTY3JvbGxhYmxlIG5vdGVzIGFyZWEgLS0+XG4gICAgPGRpdiBjbGFzcz1cIm5vdGVzLWNvbnRhaW5lclwiPlxuICAgICAgPGxpc3QgY2xhc3M9XCJub3Rlcy1saXN0XCI+XG4gICAgICAgIDxsaXN0LWl0ZW0gdHlwZT1cInRleHRcIiBmb3I9XCIobm90ZSwgaW5kZXgpIGluIG5vdGVzXCIgOmtleT1cImluZGV4XCI+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJub3RlXCI+e3tub3RlfX08L3RleHQ+XG4gICAgICAgIDwvbGlzdC1pdGVtPlxuICAgICAgPC9saXN0PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cblxuPHN0eWxlPlxuICAuY29udGFpbmVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNGNUU2RDM7XG4gICAgcGFkZGluZzogMjBweDtcbiAgfVxuXG4gIC55ZWFyIHtcbiAgICBmb250LXNpemU6IDQwcHg7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6ICM0QjM2MjE7XG4gIH1cblxuICAubW9udGgtZGF5LWNvbnRhaW5lciB7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICB9XG5cbiAgLm1vbnRoLWRheSB7XG4gICAgZm9udC1zaXplOiAzMHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG4gIC5kYXRlIHtcbiAgICBmb250LXNpemU6IDgwcHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgbWFyZ2luOiAyMHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG4gIC5zdW4tY29udGFpbmVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHdpZHRoOiA4MCU7XG4gICAgbWFyZ2luOiAyMHB4O1xuICB9XG5cbiAgLnN1bi10aW1lIHtcbiAgICBmb250LXNpemU6IDMwcHg7XG4gICAgd2lkdGg6IDQwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6ICM0QjM2MjE7XG4gIH1cblxuICAubW9vbi1jb250YWluZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICB9XG5cbiAgLm1vb24taW1hZ2Uge1xuICAgIGZvbnQtc2l6ZTogNTBweDtcbiAgICBjb2xvcjogIzRCMzYyMTtcbiAgfVxuXG4gIC5tb29uLXBoYXNlIHtcbiAgICBmb250LXNpemU6IDMwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiAjNEIzNjIxO1xuICB9XG5cbiAgLmlucHV0IHtcbiAgICBmb250LXNpemU6IDMwcHg7XG4gICAgd2lkdGg6IDQwMHB4O1xuICAgIGhlaWdodDogNjBweDtcbiAgICBib3JkZXItd2lkdGg6IDJweDtcbiAgICBib3JkZXItY29sb3I6ICM0QjM2MjE7XG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgbWFyZ2luOiAyMHB4O1xuICAgIGNvbG9yOiAjNEIzNjIxO1xuICB9XG5cbiAgLmFkZC1idXR0b24ge1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRCMzYyMTtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIHdpZHRoOiAxNTBweDtcbiAgICBoZWlnaHQ6IDYwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGxpbmUtaGVpZ2h0OiA2MHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIH1cblxuICAubm90ZXMtY29udGFpbmVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LWhlaWdodDogMTUwcHg7XG4gIH1cblxuICAubm90ZXMtbGlzdCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAubm90ZSB7XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICAgIGNvbG9yOiAjNEIzNjIxO1xuICAgIHBhZGRpbmc6IDVweCAwO1xuICB9XG5cbiAgLm5hdi1idXR0b24ge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgICBjb2xvcjogIzRCMzYyMTtcbiAgICBtYXJnaW46IDAgMjBweDtcbiAgfVxuXG4gIC8qIER5bmFtaWMgY29sb3JzIGZvciBkYXRlIGRpc3BsYXkgKi9cbiAgLnRvZGF5IHtcbiAgICBjb2xvcjogYmxhY2s7XG4gIH1cblxuICAuZnV0dXJlIHtcbiAgICBjb2xvcjogYmx1ZTtcbiAgfVxuXG4gIC5wYXN0IHtcbiAgICBjb2xvcjogZ3JlZW47XG4gIH1cbjwvc3R5bGU+XG5cbjxzY3JpcHQ+XG4gIGNvbnN0IGZldGNoID0gcmVxdWlyZSgnQHN5c3RlbS5mZXRjaCcpO1xuICBjb25zdCBzdG9yYWdlID0gcmVxdWlyZSgnQHN5c3RlbS5zdG9yYWdlJyk7XG5cbiAgZXhwb3J0IGRlZmF1bHQge1xuICAgIGRhdGE6IHtcbiAgICAgIHRvZGF5OiBuZXcgRGF0ZSgpLFxuICAgICAgY3VycmVudERhdGU6IG5ldyBEYXRlKCksXG4gICAgICB5ZWFyOiAnJyxcbiAgICAgIGZvcm1hdHRlZERhdGU6ICcnLFxuICAgICAgZGlzcGxheURheTogJycsXG4gICAgICBzdW5yaXNlOiAnJyxcbiAgICAgIHN1bnNldDogJycsXG4gICAgICBtb29uUGhhc2U6ICcnLFxuICAgICAgbW9vbkVtb2ppOiAn8J+MkScsIC8vIEluaXRpYWwgbW9vbiBlbW9qaSAoTmV3IE1vb24pXG4gICAgICBub3RlOiAnJyxcbiAgICAgIG5vdGVzOiBbXSxcbiAgICAgIGNvbmZpcm1hdGlvbjogJycsXG4gICAgICBkYXRlQ29sb3I6ICd0b2RheScsIC8vIERlZmF1bHQgY29sb3IgZm9yIHRvZGF5XG4gICAgICBpbnB1dEZvY3VzZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBvbkluaXQoKSB7XG4gICAgICB0aGlzLnVwZGF0ZURhdGVJbmZvKCk7XG4gICAgfSxcbiAgICB1cGRhdGVEYXRlSW5mbygpIHtcbiAgICAgIGNvbnN0IG1vbnRocyA9IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddO1xuICAgICAgY29uc3QgZGF5c09mV2VlayA9IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXTtcblxuICAgICAgdGhpcy55ZWFyID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgY29uc3QgbW9udGggPSBtb250aHNbdGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpXTtcbiAgICAgIGNvbnN0IGRheU9mV2VlayA9IGRheXNPZldlZWtbdGhpcy5jdXJyZW50RGF0ZS5nZXREYXkoKV07XG4gICAgICB0aGlzLmZvcm1hdHRlZERhdGUgPSBgJHttb250aH0sICR7ZGF5T2ZXZWVrfWA7XG4gICAgICB0aGlzLmRpc3BsYXlEYXkgPSB0aGlzLmN1cnJlbnREYXRlLmdldERhdGUoKTtcblxuICAgICAgY29uc3QgdG9kYXlTdHJpbmcgPSB0aGlzLnRvZGF5LnRvRGF0ZVN0cmluZygpO1xuICAgICAgY29uc3QgY3VycmVudFN0cmluZyA9IHRoaXMuY3VycmVudERhdGUudG9EYXRlU3RyaW5nKCk7XG5cbiAgICAgIGlmICh0b2RheVN0cmluZyA9PT0gY3VycmVudFN0cmluZykge1xuICAgICAgICB0aGlzLmRhdGVDb2xvciA9ICd0b2RheSc7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudERhdGUgPiB0aGlzLnRvZGF5KSB7XG4gICAgICAgIHRoaXMuZGF0ZUNvbG9yID0gJ2Z1dHVyZSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRhdGVDb2xvciA9ICdwYXN0JztcbiAgICAgIH1cblxuICAgICAgdGhpcy5mZXRjaFN1bnJpc2VTdW5zZXQoKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlTW9vblBoYXNlKCk7XG4gICAgICB0aGlzLmxvYWROb3RlcygpO1xuICAgIH0sXG4gICAgcHJldmlvdXNEYXkoKSB7XG4gICAgICB0aGlzLmN1cnJlbnREYXRlLnNldERhdGUodGhpcy5jdXJyZW50RGF0ZS5nZXREYXRlKCkgLSAxKTtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZUluZm8oKTtcbiAgICB9LFxuICAgIG5leHREYXkoKSB7XG4gICAgICB0aGlzLmN1cnJlbnREYXRlLnNldERhdGUodGhpcy5jdXJyZW50RGF0ZS5nZXREYXRlKCkgKyAxKTtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZUluZm8oKTtcbiAgICB9LFxuICAgIGZldGNoU3VucmlzZVN1bnNldCgpIHtcbiAgICAgIGNvbnN0IGxhdCA9IDQ5LjQ0NDQ7ICAvLyBMYXRpdHVkZSBmb3IgQ2hlcmthc3ksIFVrcmFpbmVcbiAgICAgIGNvbnN0IGxuZyA9IDMyLjA1OTg7ICAvLyBMb25naXR1ZGUgZm9yIENoZXJrYXN5LCBVa3JhaW5lXG5cbiAgICAgIGZldGNoLmZldGNoKHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9hcGkuc3VucmlzZS1zdW5zZXQub3JnL2pzb24/bGF0PSR7bGF0fSZsbmc9JHtsbmd9JmRhdGU9JHt0aGlzLmN1cnJlbnREYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX0mZm9ybWF0dGVkPTBgLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YS5kYXRhKS5yZXN1bHRzO1xuICAgICAgICAgIGNvbnN0IHN1bnJpc2VVVEMgPSBuZXcgRGF0ZShyZXN1bHQuc3VucmlzZSk7XG4gICAgICAgICAgY29uc3Qgc3Vuc2V0VVRDID0gbmV3IERhdGUocmVzdWx0LnN1bnNldCk7XG5cbiAgICAgICAgICB0aGlzLnN1bnJpc2UgPSB0aGlzLmZvcm1hdFRpbWUoc3VucmlzZVVUQyk7XG4gICAgICAgICAgdGhpcy5zdW5zZXQgPSB0aGlzLmZvcm1hdFRpbWUoc3Vuc2V0VVRDKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogKGRhdGEsIGNvZGUpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggc3VucmlzZS9zdW5zZXQgZGF0YScsIGNvZGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGZvcm1hdFRpbWUoZGF0ZSkge1xuICAgICAgY29uc3QgbG9jYWxIb3VycyA9IGRhdGUuZ2V0SG91cnMoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgICBjb25zdCBsb2NhbE1pbnV0ZXMgPSBkYXRlLmdldE1pbnV0ZXMoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgICByZXR1cm4gYCR7bG9jYWxIb3Vyc306JHtsb2NhbE1pbnV0ZXN9YDtcbiAgICB9LFxuICAgIGNhbGN1bGF0ZU1vb25QaGFzZSgpIHtcbiAgICAgIGNvbnN0IHRvZGF5ID0gdGhpcy5jdXJyZW50RGF0ZTtcbiAgICAgIGNvbnN0IHllYXIgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xuICAgICAgY29uc3QgbW9udGggPSB0b2RheS5nZXRNb250aCgpICsgMTtcbiAgICAgIGNvbnN0IGRheSA9IHRvZGF5LmdldERhdGUoKTtcblxuICAgICAgbGV0IHIgPSB5ZWFyICUgMTAwO1xuICAgICAgciAlPSAxOTtcbiAgICAgIGlmIChyID4gOSkge1xuICAgICAgICByIC09IDE5O1xuICAgICAgfVxuICAgICAgciA9ICgociAqIDExKSAlIDMwKSArIG1vbnRoICsgZGF5O1xuXG4gICAgICBpZiAobW9udGggPCAzKSB7XG4gICAgICAgIHIgKz0gMjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGhhc2UgPSByICUgMzA7XG5cbiAgICAgIGlmIChwaGFzZSA8IDEpIHtcbiAgICAgICAgdGhpcy5tb29uUGhhc2UgPSAnTmV3IE1vb24nO1xuICAgICAgICB0aGlzLm1vb25FbW9qaSA9ICfwn4yRJztcbiAgICAgIH0gZWxzZSBpZiAocGhhc2UgPCA3KSB7XG4gICAgICAgIHRoaXMubW9vblBoYXNlID0gJ1dheGluZyBDcmVzY2VudCc7XG4gICAgICAgIHRoaXMubW9vbkVtb2ppID0gJ/CfjJInO1xuICAgICAgfSBlbHNlIGlmIChwaGFzZSA8IDE0KSB7XG4gICAgICAgIHRoaXMubW9vblBoYXNlID0gJ0ZpcnN0IFF1YXJ0ZXInO1xuICAgICAgICB0aGlzLm1vb25FbW9qaSA9ICfwn4yTJztcbiAgICAgIH0gZWxzZSBpZiAocGhhc2UgPCAyMSkge1xuICAgICAgICB0aGlzLm1vb25QaGFzZSA9ICdGdWxsIE1vb24nO1xuICAgICAgICB0aGlzLm1vb25FbW9qaSA9ICfwn4yVJztcbiAgICAgIH0gZWxzZSBpZiAocGhhc2UgPCAyOCkge1xuICAgICAgICB0aGlzLm1vb25QaGFzZSA9ICdXYW5pbmcgQ3Jlc2NlbnQnO1xuICAgICAgICB0aGlzLm1vb25FbW9qaSA9ICfwn4yYJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubW9vblBoYXNlID0gJ05ldyBNb29uJztcbiAgICAgICAgdGhpcy5tb29uRW1vamkgPSAn8J+MkSc7XG4gICAgICB9XG4gICAgfSxcbiAgICBvbk5vdGVJbnB1dChldmVudCkge1xuICAgICAgdGhpcy5ub3RlID0gZXZlbnQudmFsdWU7XG4gICAgfSxcbiAgICBvbkJsdXIoKSB7XG4gICAgICB0aGlzLmlucHV0Rm9jdXNlZCA9IGZhbHNlO1xuICAgIH0sXG4gICAgYWRkTm90ZSgpIHtcbiAgICAgIGlmICh0aGlzLm5vdGUudHJpbSgpID09PSAnJykge1xuICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbiA9ICdOb3RlIGlzIGVtcHR5LiBQbGVhc2UgZW50ZXIgYSBub3RlLic7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RvcmFnZUtleSA9IGBub3RlXyR7dGhpcy5jdXJyZW50RGF0ZS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19YDtcbiAgICAgIGNvbnN0IG5ld05vdGUgPSB0aGlzLm5vdGUudHJpbSgpO1xuXG4gICAgICBzdG9yYWdlLmdldCh7XG4gICAgICAgIGtleTogc3RvcmFnZUtleSxcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICBsZXQgZXhpc3RpbmdOb3RlcyA9IFtdO1xuICAgICAgICAgIGlmIChkYXRhLnZhbHVlKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBleGlzdGluZ05vdGVzID0gSlNPTi5wYXJzZShkYXRhLnZhbHVlKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHBhcnNpbmcgc3RvcmVkIG5vdGVzOicsIGVycm9yKTtcbiAgICAgICAgICAgICAgZXhpc3RpbmdOb3RlcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBleGlzdGluZ05vdGVzLnB1c2gobmV3Tm90ZSk7XG5cbiAgICAgICAgICBzdG9yYWdlLnNldCh7XG4gICAgICAgICAgICBrZXk6IHN0b3JhZ2VLZXksXG4gICAgICAgICAgICB2YWx1ZTogSlNPTi5zdHJpbmdpZnkoZXhpc3RpbmdOb3RlcyksXG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuY29uZmlybWF0aW9uID0gJ05vdGUgYWRkZWQgc3VjY2Vzc2Z1bGx5ISc7XG4gICAgICAgICAgICAgIHRoaXMubm90ZSA9ICcnOyAvLyBDbGVhciBpbnB1dFxuICAgICAgICAgICAgICB0aGlzLm5vdGVzID0gZXhpc3RpbmdOb3RlczsgLy8gVXBkYXRlIG5vdGVzIGRpc3BsYXlcbiAgICAgICAgICAgICAgLy8gQXR0ZW1wdCB0byBibHVyIGlucHV0IHRvIGRpc21pc3MgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAgIHRoaXMuaW5wdXRGb2N1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogKGRhdGEsIGNvZGUpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHNhdmUgbm90ZScsIGNvZGUpO1xuICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbiA9ICdGYWlsZWQgdG8gYWRkIG5vdGUuJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogKGRhdGEsIGNvZGUpID0+IHtcbiAgICAgICAgICBpZiAoY29kZSA9PT0gLTEpIHsgLy8gS2V5IG5vdCBmb3VuZCwgaW5pdGlhbGl6ZSBuZXcgbm90ZXMgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nTm90ZXMgPSBbbmV3Tm90ZV07XG5cbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0KHtcbiAgICAgICAgICAgICAga2V5OiBzdG9yYWdlS2V5LFxuICAgICAgICAgICAgICB2YWx1ZTogSlNPTi5zdHJpbmdpZnkoZXhpc3RpbmdOb3RlcyksXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbiA9ICdOb3RlIGFkZGVkIHN1Y2Nlc3NmdWxseSEnO1xuICAgICAgICAgICAgICAgIHRoaXMubm90ZSA9ICcnOyAvLyBDbGVhciBpbnB1dFxuICAgICAgICAgICAgICAgIHRoaXMubm90ZXMgPSBleGlzdGluZ05vdGVzOyAvLyBVcGRhdGUgbm90ZXMgZGlzcGxheVxuICAgICAgICAgICAgICAgIC8vIEF0dGVtcHQgdG8gYmx1ciBpbnB1dCB0byBkaXNtaXNzIHRoZSBrZXlib2FyZFxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRGb2N1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGZhaWw6IChkYXRhLCBjb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHNhdmUgbm90ZScsIGNvZGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybWF0aW9uID0gJ0ZhaWxlZCB0byBhZGQgbm90ZS4nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGdldCBleGlzdGluZyBub3RlcycsIGNvZGUpO1xuICAgICAgICAgICAgdGhpcy5jb25maXJtYXRpb24gPSAnRmFpbGVkIHRvIGFkZCBub3RlLic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGxvYWROb3RlcygpIHtcbiAgICAgIGNvbnN0IHN0b3JhZ2VLZXkgPSBgbm90ZV8ke3RoaXMuY3VycmVudERhdGUudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfWA7XG5cbiAgICAgIHN0b3JhZ2UuZ2V0KHtcbiAgICAgICAga2V5OiBzdG9yYWdlS2V5LFxuICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhLnZhbHVlKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB0aGlzLm5vdGVzID0gSlNPTi5wYXJzZShkYXRhLnZhbHVlKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcGFyc2luZyBzdG9yZWQgbm90ZXM6JywgZXJyb3IpO1xuICAgICAgICAgICAgICB0aGlzLm5vdGVzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm90ZXMgPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IChkYXRhLCBjb2RlKSA9PiB7XG4gICAgICAgICAgaWYgKGNvZGUgPT09IC0xKSB7IC8vIEtleSBub3QgZm91bmQsIG5vIG5vdGVzIHlldFxuICAgICAgICAgICAgdGhpcy5ub3RlcyA9IFtdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gbG9hZCBub3RlcycsIGNvZGUpO1xuICAgICAgICAgICAgdGhpcy5ub3RlcyA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG48L3NjcmlwdD4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLmNvbnRhaW5lclwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWFyb3VuZFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI0Y1RTZEM1wiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjIwcHhcIlxuICB9LFxuICBcIi55ZWFyXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiNDBweFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiMTBweFwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJjb2xvclwiOiBcIiM0QjM2MjFcIlxuICB9LFxuICBcIi5tb250aC1kYXktY29udGFpbmVyXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJyb3dcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIxMHB4XCJcbiAgfSxcbiAgXCIubW9udGgtZGF5XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMzBweFwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuZGF0ZVwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjgwcHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIyMHB4XCIsXG4gICAgXCJtYXJnaW5SaWdodFwiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpbkxlZnRcIjogXCIyMHB4XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5zdW4tY29udGFpbmVyXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJyb3dcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwid2lkdGhcIjogXCI4MCVcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpblJpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luTGVmdFwiOiBcIjIwcHhcIlxuICB9LFxuICBcIi5zdW4tdGltZVwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjMwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiNDAlXCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImNvbG9yXCI6IFwiIzRCMzYyMVwiXG4gIH0sXG4gIFwiLm1vb24tY29udGFpbmVyXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIubW9vbi1pbWFnZVwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjUwcHhcIixcbiAgICBcImNvbG9yXCI6IFwiIzRCMzYyMVwiXG4gIH0sXG4gIFwiLm1vb24tcGhhc2VcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIzMHB4XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImNvbG9yXCI6IFwiIzRCMzYyMVwiXG4gIH0sXG4gIFwiLmlucHV0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMzBweFwiLFxuICAgIFwid2lkdGhcIjogXCI0MDBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNjBweFwiLFxuICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlclJpZ2h0V2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiIzRCMzYyMVwiLFxuICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiM0QjM2MjFcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiIzRCMzYyMVwiLFxuICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiIzRCMzYyMVwiLFxuICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpblJpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luTGVmdFwiOiBcIjIwcHhcIixcbiAgICBcImNvbG9yXCI6IFwiIzRCMzYyMVwiXG4gIH0sXG4gIFwiLmFkZC1idXR0b25cIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIzMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNGRkZGRkZcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiM0QjM2MjFcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjEwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiMTUwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjYwcHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwibGluZUhlaWdodFwiOiBcIjYwcHhcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjIwcHhcIlxuICB9LFxuICBcIi5ub3Rlcy1jb250YWluZXJcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJtYXhIZWlnaHRcIjogXCIxNTBweFwiXG4gIH0sXG4gIFwiLm5vdGVzLWxpc3RcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCJcbiAgfSxcbiAgXCIubm90ZVwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjIwcHhcIixcbiAgICBcImNvbG9yXCI6IFwiIzRCMzYyMVwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjVweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiNXB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjBweFwiXG4gIH0sXG4gIFwiLm5hdi1idXR0b25cIjoge1xuICAgIFwiZm9udFNpemVcIjogXCI0MHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiM0QjM2MjFcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjBweFwiLFxuICAgIFwibWFyZ2luUmlnaHRcIjogXCIyMHB4XCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIwcHhcIixcbiAgICBcIm1hcmdpbkxlZnRcIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIudG9kYXlcIjoge1xuICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCJcbiAgfSxcbiAgXCIuZnV0dXJlXCI6IHtcbiAgICBcImNvbG9yXCI6IFwiIzAwMDBGRlwiXG4gIH0sXG4gIFwiLnBhc3RcIjoge1xuICAgIFwiY29sb3JcIjogXCIjMDA4MDAwXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiY29udGFpbmVyXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnllYXIpfVxuICAgICAgfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJ5ZWFyXCJcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcIm1vbnRoLWRheS1jb250YWluZXJcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwiPFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcIm5hdi1idXR0b25cIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcInByZXZpb3VzRGF5XCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5mb3JtYXR0ZWREYXRlKX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiWydtb250aC1kYXknLFwiLFxuICAgICAgICAgICAgXCJkYXRlQ29sb3JdXCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogXCI+XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwibmF2LWJ1dHRvblwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImNsaWNrXCI6IFwibmV4dERheVwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlzcGxheURheSl9XG4gICAgICB9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImRhdGVcIlxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwic3VuLWNvbnRhaW5lclwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAn8J+MhSBTdW5yaXNlOiAnKygodGhpcy5zdW5yaXNlKSl9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInN1bi10aW1lXCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAn8J+MhyBTdW5zZXQ6ICcrKCh0aGlzLnN1bnNldCkpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJzdW4tdGltZVwiXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJtb29uLWNvbnRhaW5lclwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5tb29uRW1vamkpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJtb29uLWltYWdlXCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5tb29uUGhhc2UpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJtb29uLXBoYXNlXCJcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImlucHV0XCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgIFwicGxhY2Vob2xkZXJcIjogXCJBZGQgbm90ZVwiLFxuICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubm90ZSl9XG4gICAgICB9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImlucHV0XCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2hhbmdlXCI6IFwib25Ob3RlSW5wdXRcIixcbiAgICAgICAgXCJibHVyXCI6IFwib25CbHVyXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwidmFsdWVcIjogXCJBZGRcIlxuICAgICAgfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJhZGQtYnV0dG9uXCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJhZGROb3RlXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcIm5vdGVzLWNvbnRhaW5lclwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJsaXN0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwibm90ZXMtbGlzdFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdC1pdGVtXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIFwia2V5XCI6IFwiaW5kZXhcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInJlcGVhdFwiOiB7XG4gICAgICAgICAgICAgICAgXCJleHBcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5ub3Rlcyl9LFxuICAgICAgICAgICAgICAgIFwia2V5XCI6IFwibm90ZVwiLFxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJpbmRleFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5ub3RlKX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwibm90ZVwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9IdWF3ZWkgUXVpY2tBcHAgSURFLmFwcC9Db250ZW50cy9SZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLi4vLi4vQXBwbGljYXRpb25zL0h1YXdlaSBRdWlja0FwcCBJREUuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vaGVsbG8udXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9IdWF3ZWkgUXVpY2tBcHAgSURFLmFwcC9Db250ZW50cy9SZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9L1VzZXJzL2dsZWJvbmUvQVlOL2ZyZWVfcHJvZ3MvY2F0LmNhbGVuZGFyL3NyYy9IZWxsby9oZWxsby51eCEuLi8uLi8uLi8uLi8uLi8uLi8uLi9BcHBsaWNhdGlvbnMvSHVhd2VpIFF1aWNrQXBwIElERS5hcHAvQ29udGVudHMvUmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPS9Vc2Vycy9nbGVib25lL0FZTi9mcmVlX3Byb2dzL2NhdC5jYWxlbmRhci9zcmMvSGVsbG8vaGVsbG8udXghLi9oZWxsby51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9IdWF3ZWkgUXVpY2tBcHAgSURFLmFwcC9Db250ZW50cy9SZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9IdWF3ZWkgUXVpY2tBcHAgSURFLmFwcC9Db250ZW50cy9SZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9IdWF3ZWkgUXVpY2tBcHAgSURFLmFwcC9Db250ZW50cy9SZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPS9BcHBsaWNhdGlvbnMvSHVhd2VpIFF1aWNrQXBwIElERS5hcHAvQ29udGVudHMvUmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvQGJhYmVsL3ByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPS9BcHBsaWNhdGlvbnMvSHVhd2VpIFF1aWNrQXBwIElERS5hcHAvQ29udGVudHMvUmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvQGJhYmVsL3BsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109L0FwcGxpY2F0aW9ucy9IdWF3ZWkgUXVpY2tBcHAgSURFLmFwcC9Db250ZW50cy9SZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9qc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT0vQXBwbGljYXRpb25zL0h1YXdlaSBRdWlja0FwcCBJREUuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL0BiYWJlbC9wbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109L0FwcGxpY2F0aW9ucy9IdWF3ZWkgUXVpY2tBcHAgSURFLmFwcC9Db250ZW50cy9SZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9AYmFiZWwvcGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi8uLi8uLi8uLi9BcHBsaWNhdGlvbnMvSHVhd2VpIFF1aWNrQXBwIElERS5hcHAvQ29udGVudHMvUmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaGVsbG8udXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9oZWxsbycsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG5cbiRhcHBfYm9vdHN0cmFwJCgnQGFwcC1jb21wb25lbnQvaGVsbG8nLHsgcGFja2FnZXJOYW1lOidmYS10b29sa2l0JywgcGFja2FnZXJWZXJzaW9uOiAnMTMuMy4xLVN0YWJsZS4zMDAnfSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=