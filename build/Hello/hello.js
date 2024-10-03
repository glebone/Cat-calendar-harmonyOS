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
    year: '',
    formattedDate: '',
    displayDay: '',
    filenameDate: '',
    sunrise: '',
    sunset: '',
    moonPhase: '',
    moonEmoji: '🌑',
    note: '',
    confirmation: '',
    notes: []
  },
  onInit() {
    try {
      console.log('App initializing...');
      this.setDate();
      this.fetchSunriseSunset();
      this.calculateMoonPhase();
      this.loadNotes();
      this.$page.setTitleBar({
        text: 'menu',
        textColor: '#ffffff',
        backgroundColor: '#007DFF',
        backgroundOpacity: 0.5,
        menu: true
      });
      console.log('App initialized.');
    } catch (error) {
      console.error('Error during onInit:', error);
      this.confirmation = 'An unexpected error occurred.';
    }
  },
  setDate() {
    const today = new Date();
    this.year = today.getFullYear();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const month = months[today.getMonth()];
    const dayOfWeek = daysOfWeek[today.getDay()];
    this.formattedDate = `${month}, ${dayOfWeek}`;
    this.displayDay = today.getDate();
    const year = today.getFullYear();
    const monthNum = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.filenameDate = `${year}-${monthNum}-${day}`;
    console.log(`Date set to ${this.filenameDate}`);
  },
  fetchSunriseSunset() {
    const lat = 49.4444;
    const lng = 32.0598;
    fetch.fetch({
      url: `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`,
      method: 'GET',
      success: data => {
        try {
          const result = JSON.parse(data.data).results;
          const sunriseUTC = new Date(result.sunrise);
          const sunsetUTC = new Date(result.sunset);
          this.sunrise = this.formatTime(sunriseUTC);
          this.sunset = this.formatTime(sunsetUTC);
          console.log(`Sunrise: ${this.sunrise}, Sunset: ${this.sunset}`);
        } catch (error) {
          console.error('Error parsing sunrise/sunset data:', error);
          this.confirmation = 'Error fetching sunrise/sunset data.';
        }
      },
      fail: (data, code) => {
        console.error('Failed to fetch sunrise/sunset data', code);
        this.confirmation = 'Failed to fetch sunrise/sunset data.';
      }
    });
  },
  formatTime(date) {
    const localHours = date.getHours().toString().padStart(2, '0');
    const localMinutes = date.getMinutes().toString().padStart(2, '0');
    return `${localHours}:${localMinutes}`;
  },
  calculateMoonPhase() {
    const today = new Date();
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
    console.log(`Moon Phase: ${this.moonPhase}`);
  },
  onNoteInput(event) {
    console.log('Note input changed:', event.value);
    this.note = event.value;
  },
  addNote() {
    if (this.note.trim() === '') {
      this.confirmation = 'Note is empty. Please enter a note.';
      return;
    }
    const storageKey = `note_${this.filenameDate}`;
    const newNote = this.note.trim();
    try {
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
          console.log(`Adding note: "${newNote}" to key: "${storageKey}"`);
          storage.set({
            key: storageKey,
            value: JSON.stringify(existingNotes),
            success: () => {
              this.confirmation = 'Note added successfully!';
              this.note = '';
              this.notes = existingNotes;
              console.log('Note saved successfully.');
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
            console.log(`Creating new notes array with note: "${newNote}"`);
            storage.set({
              key: storageKey,
              value: JSON.stringify(existingNotes),
              success: () => {
                this.confirmation = 'Note added successfully!';
                this.note = '';
                this.notes = existingNotes;
                console.log('New note array created and note saved successfully.');
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
    } catch (error) {
      console.error('Error during addNote:', error);
      this.confirmation = 'An unexpected error occurred while adding the note.';
    }
  },
  loadNotes() {
    const storageKey = `note_${this.filenameDate}`;
    console.log(`Loading notes for key: "${storageKey}"`);
    storage.get({
      key: storageKey,
      success: data => {
        if (data.value) {
          try {
            this.notes = JSON.parse(data.value);
            console.log(`Loaded notes: ${this.notes}`);
          } catch (error) {
            console.error('Error parsing stored notes:', error);
            this.notes = [];
          }
        }
      },
      fail: (data, code) => {
        if (code === -1) {
          this.notes = [];
          console.log('No existing notes found.');
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
    "justifyContent": "space-between",
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
  ".month-day": {
    "fontSize": "30px",
    "textAlign": "center",
    "marginBottom": "10px",
    "color": "#4B3621"
  },
  ".date": {
    "fontSize": "80px",
    "fontWeight": "bold",
    "marginTop": "20px",
    "marginRight": "20px",
    "marginBottom": "20px",
    "marginLeft": "20px",
    "textAlign": "center",
    "color": "#4B3621"
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
  ".confirmation": {
    "fontSize": "20px",
    "color": "#008000",
    "marginTop": "10px"
  },
  ".notes-container": {
    "width": "80%",
    "marginTop": "20px"
  },
  ".notes-title": {
    "fontSize": "25px",
    "color": "#4B3621",
    "marginBottom": "10px"
  },
  ".note": {
    "fontSize": "20px",
    "color": "#4B3621",
    "marginBottom": "5px"
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
      "type": "text",
      "attr": {
        "value": function () {return (this.formattedDate)}
      },
      "classList": [
        "month-day"
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
        "change": "onNoteInput"
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
      "type": "text",
      "attr": {
        "vIf": "confirmation",
        "value": function () {return (this.confirmation)}
      },
      "classList": [
        "confirmation"
      ]
    },
    {
      "type": "div",
      "attr": {
        "vIf": "notes.length > 0"
      },
      "classList": [
        "notes-container"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "Notes:"
          },
          "classList": [
            "notes-title"
          ]
        },
        {
          "type": "text",
          "attr": {
            "vFor": "(note, index) in notes",
            "key": "index",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQvSGVsbG8vaGVsbG8uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUtBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBSUE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzVKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL0hlbGxvL1VzZXJzL2dsZWJvbmUvQVlOL2ZyZWVfcHJvZ3MvY2F0LmNhbGVuZGFyL3NyYy9IZWxsby9oZWxsby51eCIsIndlYnBhY2s6Ly8vLi9zcmMvSGVsbG8vaGVsbG8udXg/ZjBlZCIsIndlYnBhY2s6Ly8vLi9zcmMvSGVsbG8vaGVsbG8udXg/Mzk5MCIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0hlbGxvL2hlbGxvLnV4Il0sInNvdXJjZXNDb250ZW50IjpbIjwhLS0gXG5cbl4uLl4gQ0FUKEMpIFNvZnQgfHwgQ0FUQ2FsZW5kYXIgQXBwIGZvciBIdWF3ZWkgSGFybW9ueU9TIFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuMDMgT2N0b2JlciAyMDI0ICB8fCBnbGVib25lQGdtYWlsLmNvbSBpTWFjIE0xXG4gLS0+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDwhLS0gWWVhciBhdCB0aGUgdG9wIC0tPlxuICAgIDx0ZXh0IGNsYXNzPVwieWVhclwiPnt7eWVhcn19PC90ZXh0PlxuICAgIFxuICAgIDwhLS0gTW9udGggYW5kIGRheSBvZiB0aGUgd2VlayAtLT5cbiAgICA8dGV4dCBjbGFzcz1cIm1vbnRoLWRheVwiPnt7Zm9ybWF0dGVkRGF0ZX19PC90ZXh0PlxuICAgIFxuICAgIDwhLS0gQm9sZCBkYXkgb2YgdGhlIG1vbnRoIC0tPlxuICAgIDx0ZXh0IGNsYXNzPVwiZGF0ZVwiPnt7ZGlzcGxheURheX19PC90ZXh0PlxuXG4gICAgPCEtLSBTdW5yaXNlIGFuZCBTdW5zZXQgdGltZXMgLS0+XG4gICAgPGRpdiBjbGFzcz1cInN1bi1jb250YWluZXJcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwic3VuLXRpbWVcIj7wn4yFIFN1bnJpc2U6IHt7c3VucmlzZX19PC90ZXh0PlxuICAgICAgPHRleHQgY2xhc3M9XCJzdW4tdGltZVwiPvCfjIcgU3Vuc2V0OiB7e3N1bnNldH19PC90ZXh0PlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDwhLS0gTW9vbiBwaGFzZSBpbWFnZSBhbmQgbmFtZSAtLT5cbiAgICA8ZGl2IGNsYXNzPVwibW9vbi1jb250YWluZXJcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwibW9vbi1pbWFnZVwiPnt7bW9vbkVtb2ppfX08L3RleHQ+IDwhLS0gRHluYW1pYyBtb29uIHBoYXNlIGVtb2ppIC0tPlxuICAgICAgPHRleHQgY2xhc3M9XCJtb29uLXBoYXNlXCI+e3ttb29uUGhhc2V9fTwvdGV4dD5cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8IS0tIElucHV0IGZvciBhZGRpbmcgYSBub3RlIC0tPlxuICAgIDxpbnB1dCBjbGFzcz1cImlucHV0XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkFkZCBub3RlXCIgdmFsdWU9XCJ7e25vdGV9fVwiIEBjaGFuZ2U9XCJvbk5vdGVJbnB1dFwiLz5cbiAgICBcbiAgICA8IS0tIEFkZCBidXR0b24gLS0+XG4gICAgPHRleHQgY2xhc3M9XCJhZGQtYnV0dG9uXCIgQGNsaWNrPVwiYWRkTm90ZVwiPkFkZDwvdGV4dD5cbiAgICBcbiAgICA8IS0tIENvbmZpcm1hdGlvbiBtZXNzYWdlIC0tPlxuICAgIDx0ZXh0IGNsYXNzPVwiY29uZmlybWF0aW9uXCIgdi1pZj1cImNvbmZpcm1hdGlvblwiPnt7Y29uZmlybWF0aW9ufX08L3RleHQ+XG4gICAgXG4gICAgPCEtLSBEaXNwbGF5IGV4aXN0aW5nIG5vdGVzIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJub3Rlcy1jb250YWluZXJcIiB2LWlmPVwibm90ZXMubGVuZ3RoID4gMFwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJub3Rlcy10aXRsZVwiPk5vdGVzOjwvdGV4dD5cbiAgICAgIDx0ZXh0IGNsYXNzPVwibm90ZVwiIHYtZm9yPVwiKG5vdGUsIGluZGV4KSBpbiBub3Rlc1wiIDprZXk9XCJpbmRleFwiPnt7bm90ZX19PC90ZXh0PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbiAgLmNvbnRhaW5lciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Y1RTZEMzsgLyogU2VwaWEgYmFja2dyb3VuZCAqL1xuICAgIHBhZGRpbmc6IDIwcHg7XG4gIH1cblxuICAueWVhciB7XG4gICAgZm9udC1zaXplOiA0MHB4O1xuICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiAjNEIzNjIxOyAvKiBEYXJrIGJyb3duIGZvbnQgKi9cbiAgfVxuXG4gIC5tb250aC1kYXkge1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICBjb2xvcjogIzRCMzYyMTsgLyogRGFyayBicm93biBmb250ICovXG4gIH1cblxuICAuZGF0ZSB7XG4gICAgZm9udC1zaXplOiA4MHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIG1hcmdpbjogMjBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6ICM0QjM2MjE7IC8qIERhcmsgYnJvd24gZm9udCAqL1xuICB9XG5cbiAgLnN1bi1jb250YWluZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgd2lkdGg6IDgwJTtcbiAgICBtYXJnaW46IDIwcHg7XG4gIH1cblxuICAuc3VuLXRpbWUge1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICB3aWR0aDogNDAlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBjb2xvcjogIzRCMzYyMTsgLyogRGFyayBicm93biBmb250ICovXG4gIH1cblxuICAubW9vbi1jb250YWluZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICB9XG5cbiAgLm1vb24taW1hZ2Uge1xuICAgIGZvbnQtc2l6ZTogNTBweDtcbiAgICBjb2xvcjogIzRCMzYyMTsgLyogRGFyayBicm93biBmb250ICovXG4gIH1cblxuICAubW9vbi1waGFzZSB7XG4gICAgZm9udC1zaXplOiAzMHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBjb2xvcjogIzRCMzYyMTsgLyogRGFyayBicm93biBmb250ICovXG4gIH1cblxuICAuaW5wdXQge1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICB3aWR0aDogNDAwcHg7XG4gICAgaGVpZ2h0OiA2MHB4O1xuICAgIGJvcmRlci13aWR0aDogMnB4O1xuICAgIGJvcmRlci1jb2xvcjogIzRCMzYyMTsgLyogRGFyayBicm93biBib3JkZXIgKi9cbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICBtYXJnaW46IDIwcHg7XG4gICAgY29sb3I6ICM0QjM2MjE7IC8qIERhcmsgYnJvd24gZm9udCAqL1xuICB9XG5cbiAgLmFkZC1idXR0b24ge1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRCMzYyMTsgLyogRGFyayBicm93biBiYWNrZ3JvdW5kICovXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICB3aWR0aDogMTUwcHg7XG4gICAgaGVpZ2h0OiA2MHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBsaW5lLWhlaWdodDogNjBweDsgLyogQ2VudGVyIHRleHQgdmVydGljYWxseSAqL1xuICAgIC8qIGN1cnNvcjogcG9pbnRlcjsgKi8gLyogUmVtb3ZlZCB1bnN1cHBvcnRlZCAnY3Vyc29yJyBzdHlsZSAqL1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIH1cblxuICAuY29uZmlybWF0aW9uIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgY29sb3I6IGdyZWVuO1xuICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gIH1cblxuICAubm90ZXMtY29udGFpbmVyIHtcbiAgICB3aWR0aDogODAlO1xuICAgIG1hcmdpbi10b3A6IDIwcHg7XG4gIH1cblxuICAubm90ZXMtdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMjVweDtcbiAgICBjb2xvcjogIzRCMzYyMTtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICB9XG5cbiAgLm5vdGUge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICBjb2xvcjogIzRCMzYyMTtcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gIH1cbjwvc3R5bGU+XG5cbjxzY3JpcHQ+XG4gIGNvbnN0IGZldGNoID0gcmVxdWlyZSgnQHN5c3RlbS5mZXRjaCcpO1xuICBjb25zdCBzdG9yYWdlID0gcmVxdWlyZSgnQHN5c3RlbS5zdG9yYWdlJyk7XG5cbiAgZXhwb3J0IGRlZmF1bHQge1xuICAgIGRhdGE6IHtcbiAgICAgIHllYXI6ICcnLFxuICAgICAgZm9ybWF0dGVkRGF0ZTogJycsXG4gICAgICBkaXNwbGF5RGF5OiAnJyxcbiAgICAgIGZpbGVuYW1lRGF0ZTogJycsXG4gICAgICBzdW5yaXNlOiAnJyxcbiAgICAgIHN1bnNldDogJycsXG4gICAgICBtb29uUGhhc2U6ICcnLFxuICAgICAgbW9vbkVtb2ppOiAn8J+MkScsIC8vIEluaXRpYWwgbW9vbiBlbW9qaSAoTmV3IE1vb24pXG4gICAgICBub3RlOiAnJyxcbiAgICAgIGNvbmZpcm1hdGlvbjogJycsXG4gICAgICBub3RlczogW10sXG4gICAgfSxcbiAgICBvbkluaXQoKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zb2xlLmxvZygnQXBwIGluaXRpYWxpemluZy4uLicpO1xuICAgICAgICB0aGlzLnNldERhdGUoKTtcbiAgICAgICAgdGhpcy5mZXRjaFN1bnJpc2VTdW5zZXQoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVNb29uUGhhc2UoKTtcbiAgICAgICAgdGhpcy5sb2FkTm90ZXMoKTtcbiAgICAgICAgdGhpcy4kcGFnZS5zZXRUaXRsZUJhcih7XG4gICAgICAgICAgdGV4dDogJ21lbnUnLFxuICAgICAgICAgIHRleHRDb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDdERkYnLFxuICAgICAgICAgIGJhY2tncm91bmRPcGFjaXR5OiAwLjUsXG4gICAgICAgICAgbWVudTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ0FwcCBpbml0aWFsaXplZC4nKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGR1cmluZyBvbkluaXQ6JywgZXJyb3IpO1xuICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbiA9ICdBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkLic7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXREYXRlKCkge1xuICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgdGhpcy55ZWFyID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcbiAgICAgIFxuICAgICAgY29uc3QgbW9udGhzID0gW1xuICAgICAgICAnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsXG4gICAgICAgICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlcidcbiAgICAgIF07XG4gICAgICBjb25zdCBkYXlzT2ZXZWVrID0gW1xuICAgICAgICAnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsXG4gICAgICAgICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXG4gICAgICBdO1xuXG4gICAgICBjb25zdCBtb250aCA9IG1vbnRoc1t0b2RheS5nZXRNb250aCgpXTtcbiAgICAgIGNvbnN0IGRheU9mV2VlayA9IGRheXNPZldlZWtbdG9kYXkuZ2V0RGF5KCldO1xuICAgICAgdGhpcy5mb3JtYXR0ZWREYXRlID0gYCR7bW9udGh9LCAke2RheU9mV2Vla31gO1xuICAgICAgdGhpcy5kaXNwbGF5RGF5ID0gdG9kYXkuZ2V0RGF0ZSgpO1xuXG4gICAgICAvLyBGb3JtYXQgZGF0ZSBhcyBcIjIwMjQtMTAtMDNcIiBmb3Igc3RvcmFnZSBrZXlcbiAgICAgIGNvbnN0IHllYXIgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xuICAgICAgY29uc3QgbW9udGhOdW0gPSAodG9kYXkuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICAgIGNvbnN0IGRheSA9IHRvZGF5LmdldERhdGUoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgICB0aGlzLmZpbGVuYW1lRGF0ZSA9IGAke3llYXJ9LSR7bW9udGhOdW19LSR7ZGF5fWA7XG4gICAgICBjb25zb2xlLmxvZyhgRGF0ZSBzZXQgdG8gJHt0aGlzLmZpbGVuYW1lRGF0ZX1gKTtcbiAgICB9LFxuICAgIGZldGNoU3VucmlzZVN1bnNldCgpIHtcbiAgICAgIGNvbnN0IGxhdCA9IDQ5LjQ0NDQ7ICAvLyBMYXRpdHVkZSBmb3IgQ2hlcmthc3ksIFVrcmFpbmVcbiAgICAgIGNvbnN0IGxuZyA9IDMyLjA1OTg7ICAvLyBMb25naXR1ZGUgZm9yIENoZXJrYXN5LCBVa3JhaW5lXG5cbiAgICAgIGZldGNoLmZldGNoKHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9hcGkuc3VucmlzZS1zdW5zZXQub3JnL2pzb24/bGF0PSR7bGF0fSZsbmc9JHtsbmd9JmZvcm1hdHRlZD0wYCxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gSlNPTi5wYXJzZShkYXRhLmRhdGEpLnJlc3VsdHM7XG4gICAgICAgICAgICBjb25zdCBzdW5yaXNlVVRDID0gbmV3IERhdGUocmVzdWx0LnN1bnJpc2UpO1xuICAgICAgICAgICAgY29uc3Qgc3Vuc2V0VVRDID0gbmV3IERhdGUocmVzdWx0LnN1bnNldCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIENvbnZlcnQgVVRDIHRvIGxvY2FsIHRpbWVcbiAgICAgICAgICAgIHRoaXMuc3VucmlzZSA9IHRoaXMuZm9ybWF0VGltZShzdW5yaXNlVVRDKTtcbiAgICAgICAgICAgIHRoaXMuc3Vuc2V0ID0gdGhpcy5mb3JtYXRUaW1lKHN1bnNldFVUQyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgU3VucmlzZTogJHt0aGlzLnN1bnJpc2V9LCBTdW5zZXQ6ICR7dGhpcy5zdW5zZXR9YCk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHBhcnNpbmcgc3VucmlzZS9zdW5zZXQgZGF0YTonLCBlcnJvcik7XG4gICAgICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbiA9ICdFcnJvciBmZXRjaGluZyBzdW5yaXNlL3N1bnNldCBkYXRhLic7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiAoZGF0YSwgY29kZSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBzdW5yaXNlL3N1bnNldCBkYXRhJywgY29kZSk7XG4gICAgICAgICAgdGhpcy5jb25maXJtYXRpb24gPSAnRmFpbGVkIHRvIGZldGNoIHN1bnJpc2Uvc3Vuc2V0IGRhdGEuJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBmb3JtYXRUaW1lKGRhdGUpIHtcbiAgICAgIC8vIENvbnZlcnQgVVRDIHRpbWUgdG8gbG9jYWwgdGltZSBhbmQgZm9ybWF0IGFzIEhIOk1NXG4gICAgICBjb25zdCBsb2NhbEhvdXJzID0gZGF0ZS5nZXRIb3VycygpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICAgIGNvbnN0IGxvY2FsTWludXRlcyA9IGRhdGUuZ2V0TWludXRlcygpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICAgIHJldHVybiBgJHtsb2NhbEhvdXJzfToke2xvY2FsTWludXRlc31gO1xuICAgIH0sXG4gICAgY2FsY3VsYXRlTW9vblBoYXNlKCkge1xuICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgeWVhciA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XG4gICAgICBjb25zdCBtb250aCA9IHRvZGF5LmdldE1vbnRoKCkgKyAxO1xuICAgICAgY29uc3QgZGF5ID0gdG9kYXkuZ2V0RGF0ZSgpO1xuXG4gICAgICBsZXQgciA9IHllYXIgJSAxMDA7XG4gICAgICByICU9IDE5O1xuICAgICAgaWYgKHIgPiA5KSB7XG4gICAgICAgIHIgLT0gMTk7XG4gICAgICB9XG4gICAgICByID0gKChyICogMTEpICUgMzApICsgbW9udGggKyBkYXk7XG5cbiAgICAgIGlmIChtb250aCA8IDMpIHtcbiAgICAgICAgciArPSAyO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwaGFzZSA9IHIgJSAzMDtcblxuICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBtb29uIHBoYXNlIGJhc2VkIG9uIHRoZSBjYWxjdWxhdGVkIHZhbHVlXG4gICAgICBpZiAocGhhc2UgPCAxKSB7XG4gICAgICAgIHRoaXMubW9vblBoYXNlID0gJ05ldyBNb29uJztcbiAgICAgICAgdGhpcy5tb29uRW1vamkgPSAn8J+MkSc7IC8vIE5ldyBNb29uXG4gICAgICB9IGVsc2UgaWYgKHBoYXNlIDwgNykge1xuICAgICAgICB0aGlzLm1vb25QaGFzZSA9ICdXYXhpbmcgQ3Jlc2NlbnQnO1xuICAgICAgICB0aGlzLm1vb25FbW9qaSA9ICfwn4ySJzsgLy8gV2F4aW5nIENyZXNjZW50XG4gICAgICB9IGVsc2UgaWYgKHBoYXNlIDwgMTQpIHtcbiAgICAgICAgdGhpcy5tb29uUGhhc2UgPSAnRmlyc3QgUXVhcnRlcic7XG4gICAgICAgIHRoaXMubW9vbkVtb2ppID0gJ/CfjJMnOyAvLyBGaXJzdCBRdWFydGVyXG4gICAgICB9IGVsc2UgaWYgKHBoYXNlIDwgMjEpIHtcbiAgICAgICAgdGhpcy5tb29uUGhhc2UgPSAnRnVsbCBNb29uJztcbiAgICAgICAgdGhpcy5tb29uRW1vamkgPSAn8J+MlSc7IC8vIEZ1bGwgTW9vblxuICAgICAgfSBlbHNlIGlmIChwaGFzZSA8IDI4KSB7XG4gICAgICAgIHRoaXMubW9vblBoYXNlID0gJ1dhbmluZyBDcmVzY2VudCc7XG4gICAgICAgIHRoaXMubW9vbkVtb2ppID0gJ/CfjJgnOyAvLyBXYW5pbmcgQ3Jlc2NlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubW9vblBoYXNlID0gJ05ldyBNb29uJztcbiAgICAgICAgdGhpcy5tb29uRW1vamkgPSAn8J+MkSc7IC8vIE5ldyBNb29uXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhgTW9vbiBQaGFzZTogJHt0aGlzLm1vb25QaGFzZX1gKTtcbiAgICB9LFxuICAgIG9uTm90ZUlucHV0KGV2ZW50KSB7XG4gICAgICBjb25zb2xlLmxvZygnTm90ZSBpbnB1dCBjaGFuZ2VkOicsIGV2ZW50LnZhbHVlKTtcbiAgICAgIHRoaXMubm90ZSA9IGV2ZW50LnZhbHVlO1xuICAgIH0sXG4gICAgYWRkTm90ZSgpIHtcbiAgICAgIGlmICh0aGlzLm5vdGUudHJpbSgpID09PSAnJykge1xuICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbiA9ICdOb3RlIGlzIGVtcHR5LiBQbGVhc2UgZW50ZXIgYSBub3RlLic7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RvcmFnZUtleSA9IGBub3RlXyR7dGhpcy5maWxlbmFtZURhdGV9YDtcbiAgICAgIGNvbnN0IG5ld05vdGUgPSB0aGlzLm5vdGUudHJpbSgpO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBHZXQgZXhpc3Rpbmcgbm90ZXNcbiAgICAgICAgc3RvcmFnZS5nZXQoe1xuICAgICAgICAgIGtleTogc3RvcmFnZUtleSxcbiAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgbGV0IGV4aXN0aW5nTm90ZXMgPSBbXTtcbiAgICAgICAgICAgIGlmIChkYXRhLnZhbHVlKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdOb3RlcyA9IEpTT04ucGFyc2UoZGF0YS52YWx1ZSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcGFyc2luZyBzdG9yZWQgbm90ZXM6JywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nTm90ZXMgPSBbXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhpc3RpbmdOb3Rlcy5wdXNoKG5ld05vdGUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEFkZGluZyBub3RlOiBcIiR7bmV3Tm90ZX1cIiB0byBrZXk6IFwiJHtzdG9yYWdlS2V5fVwiYCk7XG5cbiAgICAgICAgICAgIC8vIFNhdmUgdXBkYXRlZCBub3Rlc1xuICAgICAgICAgICAgc3RvcmFnZS5zZXQoe1xuICAgICAgICAgICAgICBrZXk6IHN0b3JhZ2VLZXksXG4gICAgICAgICAgICAgIHZhbHVlOiBKU09OLnN0cmluZ2lmeShleGlzdGluZ05vdGVzKSxcbiAgICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybWF0aW9uID0gJ05vdGUgYWRkZWQgc3VjY2Vzc2Z1bGx5ISc7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlID0gJyc7IC8vIENsZWFyIGlucHV0XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlcyA9IGV4aXN0aW5nTm90ZXM7IC8vIFVwZGF0ZSBub3RlcyBkaXNwbGF5XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vdGUgc2F2ZWQgc3VjY2Vzc2Z1bGx5LicpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBmYWlsOiAoZGF0YSwgY29kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzYXZlIG5vdGUnLCBjb2RlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbiA9ICdGYWlsZWQgdG8gYWRkIG5vdGUuJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiAoZGF0YSwgY29kZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNvZGUgPT09IC0xKSB7IC8vIEtleSBub3QgZm91bmQsIGluaXRpYWxpemUgbmV3IG5vdGVzIGFycmF5XG4gICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nTm90ZXMgPSBbbmV3Tm90ZV07XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBDcmVhdGluZyBuZXcgbm90ZXMgYXJyYXkgd2l0aCBub3RlOiBcIiR7bmV3Tm90ZX1cImApO1xuXG4gICAgICAgICAgICAgIHN0b3JhZ2Uuc2V0KHtcbiAgICAgICAgICAgICAgICBrZXk6IHN0b3JhZ2VLZXksXG4gICAgICAgICAgICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KGV4aXN0aW5nTm90ZXMpLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybWF0aW9uID0gJ05vdGUgYWRkZWQgc3VjY2Vzc2Z1bGx5ISc7XG4gICAgICAgICAgICAgICAgICB0aGlzLm5vdGUgPSAnJzsgLy8gQ2xlYXIgaW5wdXRcbiAgICAgICAgICAgICAgICAgIHRoaXMubm90ZXMgPSBleGlzdGluZ05vdGVzOyAvLyBVcGRhdGUgbm90ZXMgZGlzcGxheVxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05ldyBub3RlIGFycmF5IGNyZWF0ZWQgYW5kIG5vdGUgc2F2ZWQgc3VjY2Vzc2Z1bGx5LicpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogKGRhdGEsIGNvZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzYXZlIG5vdGUnLCBjb2RlKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybWF0aW9uID0gJ0ZhaWxlZCB0byBhZGQgbm90ZS4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZ2V0IGV4aXN0aW5nIG5vdGVzJywgY29kZSk7XG4gICAgICAgICAgICAgIHRoaXMuY29uZmlybWF0aW9uID0gJ0ZhaWxlZCB0byBhZGQgbm90ZS4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkdXJpbmcgYWRkTm90ZTonLCBlcnJvcik7XG4gICAgICAgIHRoaXMuY29uZmlybWF0aW9uID0gJ0FuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWQgd2hpbGUgYWRkaW5nIHRoZSBub3RlLic7XG4gICAgICB9XG4gICAgfSxcbiAgICBsb2FkTm90ZXMoKSB7XG4gICAgICBjb25zdCBzdG9yYWdlS2V5ID0gYG5vdGVfJHt0aGlzLmZpbGVuYW1lRGF0ZX1gO1xuICAgICAgY29uc29sZS5sb2coYExvYWRpbmcgbm90ZXMgZm9yIGtleTogXCIke3N0b3JhZ2VLZXl9XCJgKTtcblxuICAgICAgc3RvcmFnZS5nZXQoe1xuICAgICAgICBrZXk6IHN0b3JhZ2VLZXksXG4gICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEudmFsdWUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHRoaXMubm90ZXMgPSBKU09OLnBhcnNlKGRhdGEudmFsdWUpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9hZGVkIG5vdGVzOiAke3RoaXMubm90ZXN9YCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBwYXJzaW5nIHN0b3JlZCBub3RlczonLCBlcnJvcik7XG4gICAgICAgICAgICAgIHRoaXMubm90ZXMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IChkYXRhLCBjb2RlKSA9PiB7XG4gICAgICAgICAgaWYgKGNvZGUgPT09IC0xKSB7IC8vIEtleSBub3QgZm91bmQsIG5vIG5vdGVzIHlldFxuICAgICAgICAgICAgdGhpcy5ub3RlcyA9IFtdO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIGV4aXN0aW5nIG5vdGVzIGZvdW5kLicpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gbG9hZCBub3RlcycsIGNvZGUpO1xuICAgICAgICAgICAgdGhpcy5ub3RlcyA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG48L3NjcmlwdD4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLmNvbnRhaW5lclwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNGNUU2RDNcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIueWVhclwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjQwcHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjEwcHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiY29sb3JcIjogXCIjNEIzNjIxXCJcbiAgfSxcbiAgXCIubW9udGgtZGF5XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMzBweFwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIxMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiM0QjM2MjFcIlxuICB9LFxuICBcIi5kYXRlXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiODBweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpblJpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luTGVmdFwiOiBcIjIwcHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiY29sb3JcIjogXCIjNEIzNjIxXCJcbiAgfSxcbiAgXCIuc3VuLWNvbnRhaW5lclwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwicm93XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcIndpZHRoXCI6IFwiODAlXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIyMHB4XCIsXG4gICAgXCJtYXJnaW5SaWdodFwiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpbkxlZnRcIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIuc3VuLXRpbWVcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIzMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjQwJVwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJjb2xvclwiOiBcIiM0QjM2MjFcIlxuICB9LFxuICBcIi5tb29uLWNvbnRhaW5lclwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiXG4gIH0sXG4gIFwiLm1vb24taW1hZ2VcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCI1MHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiM0QjM2MjFcIlxuICB9LFxuICBcIi5tb29uLXBoYXNlXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMzBweFwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJjb2xvclwiOiBcIiM0QjM2MjFcIlxuICB9LFxuICBcIi5pbnB1dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjMwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiNDAwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjYwcHhcIixcbiAgICBcImJvcmRlclRvcFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJSaWdodFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyTGVmdFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiM0QjM2MjFcIixcbiAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjNEIzNjIxXCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiM0QjM2MjFcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiM0QjM2MjFcIixcbiAgICBcImJvcmRlclN0eWxlXCI6IFwic29saWRcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMHB4XCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIyMHB4XCIsXG4gICAgXCJtYXJnaW5SaWdodFwiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpbkxlZnRcIjogXCIyMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiM0QjM2MjFcIlxuICB9LFxuICBcIi5hZGQtYnV0dG9uXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMzBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjRkZGRkZGXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjNEIzNjIxXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIxMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjE1MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI2MHB4XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImxpbmVIZWlnaHRcIjogXCI2MHB4XCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIuY29uZmlybWF0aW9uXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjMDA4MDAwXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIxMHB4XCJcbiAgfSxcbiAgXCIubm90ZXMtY29udGFpbmVyXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiODAlXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIubm90ZXMtdGl0bGVcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyNXB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiM0QjM2MjFcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjEwcHhcIlxuICB9LFxuICBcIi5ub3RlXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjNEIzNjIxXCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCI1cHhcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJjb250YWluZXJcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMueWVhcil9XG4gICAgICB9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInllYXJcIlxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmZvcm1hdHRlZERhdGUpfVxuICAgICAgfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJtb250aC1kYXlcIlxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRpc3BsYXlEYXkpfVxuICAgICAgfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJkYXRlXCJcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInN1bi1jb250YWluZXJcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ/CfjIUgU3VucmlzZTogJysoKHRoaXMuc3VucmlzZSkpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJzdW4tdGltZVwiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ/CfjIcgU3Vuc2V0OiAnKygodGhpcy5zdW5zZXQpKX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwic3VuLXRpbWVcIlxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwibW9vbi1jb250YWluZXJcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubW9vbkVtb2ppKX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwibW9vbi1pbWFnZVwiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubW9vblBoYXNlKX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwibW9vbi1waGFzZVwiXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICBcInBsYWNlaG9sZGVyXCI6IFwiQWRkIG5vdGVcIixcbiAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5vdGUpfVxuICAgICAgfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJpbnB1dFwiXG4gICAgICBdLFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNoYW5nZVwiOiBcIm9uTm90ZUlucHV0XCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwidmFsdWVcIjogXCJBZGRcIlxuICAgICAgfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJhZGQtYnV0dG9uXCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJhZGROb3RlXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwidklmXCI6IFwiY29uZmlybWF0aW9uXCIsXG4gICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5jb25maXJtYXRpb24pfVxuICAgICAgfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJjb25maXJtYXRpb25cIlxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInZJZlwiOiBcIm5vdGVzLmxlbmd0aCA+IDBcIlxuICAgICAgfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJub3Rlcy1jb250YWluZXJcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwiTm90ZXM6XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwibm90ZXMtdGl0bGVcIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2Rm9yXCI6IFwiKG5vdGUsIGluZGV4KSBpbiBub3Rlc1wiLFxuICAgICAgICAgICAgXCJrZXlcIjogXCJpbmRleFwiLFxuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5vdGUpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJub3RlXCJcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vQXBwbGljYXRpb25zL0h1YXdlaSBRdWlja0FwcCBJREUuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi8uLi8uLi9BcHBsaWNhdGlvbnMvSHVhd2VpIFF1aWNrQXBwIElERS5hcHAvQ29udGVudHMvUmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9oZWxsby51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vQXBwbGljYXRpb25zL0h1YXdlaSBRdWlja0FwcCBJREUuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD0vVXNlcnMvZ2xlYm9uZS9BWU4vZnJlZV9wcm9ncy9jYXQuY2FsZW5kYXIvc3JjL0hlbGxvL2hlbGxvLnV4IS4uLy4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9IdWF3ZWkgUXVpY2tBcHAgSURFLmFwcC9Db250ZW50cy9SZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9L1VzZXJzL2dsZWJvbmUvQVlOL2ZyZWVfcHJvZ3MvY2F0LmNhbGVuZGFyL3NyYy9IZWxsby9oZWxsby51eCEuL2hlbGxvLnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vQXBwbGljYXRpb25zL0h1YXdlaSBRdWlja0FwcCBJREUuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLi4vLi4vQXBwbGljYXRpb25zL0h1YXdlaSBRdWlja0FwcCBJREUuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLi4vLi4vQXBwbGljYXRpb25zL0h1YXdlaSBRdWlja0FwcCBJREUuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109L0FwcGxpY2F0aW9ucy9IdWF3ZWkgUXVpY2tBcHAgSURFLmFwcC9Db250ZW50cy9SZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9AYmFiZWwvcHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109L0FwcGxpY2F0aW9ucy9IdWF3ZWkgUXVpY2tBcHAgSURFLmFwcC9Db250ZW50cy9SZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9AYmFiZWwvcGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT0vQXBwbGljYXRpb25zL0h1YXdlaSBRdWlja0FwcCBJREUuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2pzeC1sb2FkZXIuanMmcGx1Z2luc1tdPS9BcHBsaWNhdGlvbnMvSHVhd2VpIFF1aWNrQXBwIElERS5hcHAvQ29udGVudHMvUmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvQGJhYmVsL3BsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT0vQXBwbGljYXRpb25zL0h1YXdlaSBRdWlja0FwcCBJREUuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL0BiYWJlbC9wbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9IdWF3ZWkgUXVpY2tBcHAgSURFLmFwcC9Db250ZW50cy9SZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9oZWxsby51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L2hlbGxvJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcblxuJGFwcF9ib290c3RyYXAkKCdAYXBwLWNvbXBvbmVudC9oZWxsbycseyBwYWNrYWdlck5hbWU6J2ZhLXRvb2xraXQnLCBwYWNrYWdlclZlcnNpb246ICcxMy4zLjEtU3RhYmxlLjMwMCd9KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==