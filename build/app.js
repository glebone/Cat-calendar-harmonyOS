(function(){
                        
                        var $app_define_wrap$ = $app_define_wrap$ || function() {}
                        var createAppHandler = function() {
                            return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-app-script-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/preset-env,targets=node 8&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-transform-modules-commonjs&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-proposal-class-properties&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-proposal-object-rest-spread&comments=false!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/app.ux":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-app-script-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/preset-env,targets=node 8&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-transform-modules-commonjs&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-proposal-class-properties&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-proposal-object-rest-spread&comments=false!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/app.ux ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

module.exports = {
  onCreate() {
    console.info('Application onCreate');
  },
  onDestroy() {
    console.info('Application onDestroy');
  },
  dataApp: {
    localeData: {}
  }
};
(exports.default || module.exports).manifest = __webpack_require__(/*! !!../../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-manifest-loader.js!./manifest.json */ "../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-manifest-loader.js!./src/manifest.json")
}

/***/ }),

/***/ "../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-manifest-loader.js!./src/manifest.json":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-manifest-loader.js!./src/manifest.json ***!
  \********************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"package":"cat.calendar","name":"CATCalendar","versionName":"1.0.0","versionCode":1,"icon":"/Common/logo.png","minPlatformVersion":1060,"features":[{"name":"system.storage"}],"config":{},"router":{"entry":"Hello","pages":{"Hello":{"component":"hello"}}},"display":{"pages":{"Hello":{"titleBarText":"CATCalendar"}}},"versionType":"debug"}');

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
/*!********************!*\
  !*** ./src/app.ux ***!
  \********************/
var $app_script$ = __webpack_require__(/*! !!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-app-script-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/preset-env,targets=node 8&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-transform-modules-commonjs&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-proposal-class-properties&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-proposal-object-rest-spread&comments=false!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/app.ux */ "../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-app-script-loader.js!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/preset-env,targets=node 8&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-transform-modules-commonjs&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-proposal-class-properties&plugins[]=/Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/@babel/plugin-proposal-object-rest-spread&comments=false!../../../../../Applications/Huawei QuickApp IDE.app/Contents/Resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/app.ux")

$app_define$('@app-application/app', [], function($app_require$, $app_exports$, $app_module$){

        $app_script$($app_module$, $app_exports$, $app_require$)
        if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default;
        }
})
$app_bootstrap$('@app-application/app',{packagerName:'fa-toolkit', packagerVersion: '13.3.1-Stable.300'})
})();

/******/ })()
;   };
                        if (typeof window === "undefined") {
                            return createAppHandler();
                        }
                        else {
                            window.createAppHandler = createAppHandler
                        }
                    })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQvYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9Vc2Vycy9nbGVib25lL0FZTi9mcmVlX3Byb2dzL2NhdC5jYWxlbmRhci9zcmMvYXBwLnV4Iiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLnV4Il0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gIG1vZHVsZS5leHBvcnRzID0ge1xuICAgIG9uQ3JlYXRlKCkge1xuICAgICAgY29uc29sZS5pbmZvKCdBcHBsaWNhdGlvbiBvbkNyZWF0ZScpO1xuICAgIH0sXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgY29uc29sZS5pbmZvKCdBcHBsaWNhdGlvbiBvbkRlc3Ryb3knKTtcbiAgICB9LFxuICAgIGRhdGFBcHA6IHtcbiAgICAgIGxvY2FsZURhdGE6IHt9XG4gICAgfVxuICB9XG48L3NjcmlwdD4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwidmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS9BcHBsaWNhdGlvbnMvSHVhd2VpIFF1aWNrQXBwIElERS5hcHAvQ29udGVudHMvUmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEvQXBwbGljYXRpb25zL0h1YXdlaSBRdWlja0FwcCBJREUuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFwcC1zY3JpcHQtbG9hZGVyLmpzIS9BcHBsaWNhdGlvbnMvSHVhd2VpIFF1aWNrQXBwIElERS5hcHAvQ29udGVudHMvUmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT0vQXBwbGljYXRpb25zL0h1YXdlaSBRdWlja0FwcCBJREUuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL0BiYWJlbC9wcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT0vQXBwbGljYXRpb25zL0h1YXdlaSBRdWlja0FwcCBJREUuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL0BiYWJlbC9wbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPS9BcHBsaWNhdGlvbnMvSHVhd2VpIFF1aWNrQXBwIElERS5hcHAvQ29udGVudHMvUmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvQGJhYmVsL3BsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT0vQXBwbGljYXRpb25zL0h1YXdlaSBRdWlja0FwcCBJREUuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL0BiYWJlbC9wbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS9BcHBsaWNhdGlvbnMvSHVhd2VpIFF1aWNrQXBwIElERS5hcHAvQ29udGVudHMvUmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS9Vc2Vycy9nbGVib25lL0FZTi9mcmVlX3Byb2dzL2NhdC5jYWxlbmRhci9zcmMvYXBwLnV4XCIpXG5cclxuJGFwcF9kZWZpbmUkKCdAYXBwLWFwcGxpY2F0aW9uL2FwcCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xyXG5cbiAgICAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0O1xuICAgICAgICB9XHJcbn0pXHJcbiRhcHBfYm9vdHN0cmFwJCgnQGFwcC1hcHBsaWNhdGlvbi9hcHAnLHtwYWNrYWdlck5hbWU6J2ZhLXRvb2xraXQnLCBwYWNrYWdlclZlcnNpb246ICcxMy4zLjEtU3RhYmxlLjMwMCd9KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==