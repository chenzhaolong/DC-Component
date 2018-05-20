/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 257);
/******/ })
/************************************************************************/
/******/ ({

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

module.exports = {
    entry: {
        page1: './Demo/Test/app.js',
        dcAnt: './Lib/index.js'
    },
    output: {
        filename: "[name].bound.js",
        path: __dirname + '/bound/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg|svg|gif|ttf|woff|woff2)$/,
            loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
        }]
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        compress: true,
        port: 8099,
        inline: true,
        publicPath: '/'
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWNhNzk1MTQwYzY3MjIyMjAxOTIiLCJ3ZWJwYWNrOi8vLy4vd2VicGFjay5jb25maWcuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImVudHJ5IiwicGFnZTEiLCJkY0FudCIsIm91dHB1dCIsImZpbGVuYW1lIiwicGF0aCIsIl9fZGlybmFtZSIsImxvYWRlcnMiLCJ0ZXN0IiwibG9hZGVyIiwicXVlcnkiLCJwcmVzZXRzIiwiZGV2dG9vbCIsImRldlNlcnZlciIsImhvdCIsImNvbXByZXNzIiwicG9ydCIsImlubGluZSIsInB1YmxpY1BhdGgiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUM3REFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDYkMsV0FBTztBQUNIQyxlQUFPLG9CQURKO0FBRUhDLGVBQU87QUFGSixLQURNO0FBS2JDLFlBQVE7QUFDSkMsa0JBQVUsaUJBRE47QUFFSkMsY0FBTUMsWUFBWTtBQUZkLEtBTEs7QUFTYlIsWUFBUTtBQUNKUyxpQkFBUyxDQUNMO0FBQ0lDLGtCQUFNLE9BRFY7QUFFSUMsb0JBQVEsY0FGWjtBQUdJQyxtQkFBTztBQUNIQyx5QkFBUyxDQUFDLFFBQUQsRUFBVyxPQUFYO0FBRE47QUFIWCxTQURLLEVBUUw7QUFDSUgsa0JBQU0sUUFEVjtBQUVJQyxvQkFBUTtBQUZaLFNBUkssRUFZTDtBQUNJRCxrQkFBTSxxQ0FEVjtBQUVJQyxvQkFBUTtBQUZaLFNBWks7QUFETCxLQVRLO0FBNEJiRyxhQUFTLG1CQTVCSTtBQTZCYkMsZUFBVztBQUNQQyxhQUFLLElBREU7QUFFUEMsa0JBQVUsSUFGSDtBQUdQQyxjQUFNLElBSEM7QUFJUEMsZ0JBQVEsSUFKRDtBQUtQQyxvQkFBWTtBQUxMO0FBN0JFLENBQWpCLEMiLCJmaWxlIjoibWFpbi5ib3VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI1Nyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWNhNzk1MTQwYzY3MjIyMjAxOTIiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBlbnRyeToge1xuICAgICAgICBwYWdlMTogJy4vRGVtby9UZXN0L2FwcC5qcycsXG4gICAgICAgIGRjQW50OiAnLi9MaWIvaW5kZXguanMnXG4gICAgfSxcbiAgICBvdXRwdXQ6IHtcbiAgICAgICAgZmlsZW5hbWU6IFwiW25hbWVdLmJvdW5kLmpzXCIsXG4gICAgICAgIHBhdGg6IF9fZGlybmFtZSArICcvYm91bmQvJyxcbiAgICB9LFxuICAgIG1vZHVsZToge1xuICAgICAgICBsb2FkZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGVzdDogL1xcLmpzJC8sXG4gICAgICAgICAgICAgICAgbG9hZGVyOiAnYmFiZWwtbG9hZGVyJyxcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBwcmVzZXRzOiBbJ2VzMjAxNScsICdyZWFjdCddXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXN0OiAvXFwuY3NzJC8sXG4gICAgICAgICAgICAgICAgbG9hZGVyOiAnc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRlc3Q6IC9cXC4ocG5nfGpwZ3xzdmd8Z2lmfHR0Znx3b2ZmfHdvZmYyKSQvLFxuICAgICAgICAgICAgICAgIGxvYWRlcjogJ3VybC1sb2FkZXI/bGltaXQ9ODE5MiZuYW1lPWltYWdlcy9baGFzaDo4XS5bbmFtZV0uW2V4dF0nXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIGRldnRvb2w6ICdpbmxpbmUtc291cmNlLW1hcCcsXG4gICAgZGV2U2VydmVyOiB7XG4gICAgICAgIGhvdDogdHJ1ZSxcbiAgICAgICAgY29tcHJlc3M6IHRydWUsXG4gICAgICAgIHBvcnQ6IDgwOTksXG4gICAgICAgIGlubGluZTogdHJ1ZSxcbiAgICAgICAgcHVibGljUGF0aDogJy8nLFxuICAgIH0sXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2VicGFjay5jb25maWcuanMiXSwic291cmNlUm9vdCI6IiJ9