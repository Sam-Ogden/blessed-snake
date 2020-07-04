#!/usr/bin/env node
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireWildcard(require("react"));

var _blessed = _interopRequireDefault(require("blessed"));

var _reactBlessed = require("react-blessed");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ARROWS = {
  left: "left",
  down: "down",
  up: "up",
  right: "right",
  a: "left",
  s: "down",
  w: "up",
  d: "right"
};
var DIFFICULTY = {
  easy: 1000,
  normal: 500,
  hard: 250,
  insane: 100,
  imacrazyperson: 50,
  catreflex: 25
};
var initialSnake = [{
  x: 1,
  y: 1
}, {
  x: 1,
  y: 2
}, {
  x: 1,
  y: 3
}];

var nextHead = function nextHead(_ref, direction) {
  var x = _ref.x,
      y = _ref.y;

  switch (direction) {
    case ARROWS.left:
      return {
        x: x - 1,
        y: y
      };

    case ARROWS.right:
      return {
        x: x + 1,
        y: y
      };

    case ARROWS.up:
      return {
        x: x,
        y: y - 1
      };

    case ARROWS.down:
      return {
        x: x,
        y: y + 1
      };

    default:
      return head;
  }
};

var randomLocation = function randomLocation() {
  var x = Math.floor(Math.random() * 10);
  var y = Math.floor(Math.random() * 10);
  return {
    x: x,
    y: y
  };
};

var die = function die(snake) {
  var head = snake[snake.length - 1];
  var ateSelf = snake.some(function (_ref2, i) {
    var x = _ref2.x,
        y = _ref2.y;
    if (i === snake.length - 1) return false;
    return head.x === x && head.y === y;
  });
  ateSelf && process.exit(0);
  head.x >= 10 && process.exit(0);
  head.x < 0 && process.exit(0);
  head.y >= 10 && process.exit(0);
  head.y < 0 && process.exit(0);
};

var App = function App(_ref3) {
  var _ref3$difficulty = _ref3.difficulty,
      difficulty = _ref3$difficulty === void 0 ? "hard" : _ref3$difficulty;

  var _useState = (0, _react.useState)(ARROWS.down),
      _useState2 = _slicedToArray(_useState, 2),
      direction = _useState2[0],
      setDirection = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      score = _useState4[0],
      setScore = _useState4[1];

  var _useState5 = (0, _react.useState)(randomLocation()),
      _useState6 = _slicedToArray(_useState5, 2),
      fruit = _useState6[0],
      setFruit = _useState6[1];

  var _useState7 = (0, _react.useState)(initialSnake),
      _useState8 = _slicedToArray(_useState7, 2),
      snake = _useState8[0],
      setSnake = _useState8[1];

  var gameClock = (0, _react.useRef)(null);

  var tick = function tick() {
    // snake state variable never seems to change, so use the
    // value passed in. Bug in react-blessed renderer?
    setSnake(function (s) {
      die(s);

      var newSnake = _toConsumableArray(s);

      var head = _objectSpread({}, s[s.length - 1]);

      var newHead = nextHead(head, direction);
      var ateFruit = newHead.x === fruit.x && newHead.y === fruit.y;

      if (ateFruit) {
        setFruit(function () {
          return randomLocation();
        });
        setScore(function (s) {
          return s + 1;
        });
      } else {
        newSnake.shift();
      }

      newSnake.push(newHead);
      return newSnake;
    });
  };

  (0, _react.useEffect)(function () {
    clearInterval(gameClock.current);
    gameClock.current = setInterval(tick, DIFFICULTY[difficulty] || DIFFICULTY["hard"]);
    return function () {
      return clearInterval(gameClock.current);
    };
  }, [direction]);

  var handleKeyPress = function handleKeyPress(_, _ref4) {
    var name = _ref4.name;
    return setDirection(function (direction) {
      return ARROWS[name] || direction;
    });
  };

  return /*#__PURE__*/_react["default"].createElement("element", {
    keyable: true,
    focused: true,
    input: true,
    width: "100%",
    height: "100%",
    onKeypress: handleKeyPress,
    style: {
      bg: "#2A223A",
      fg: "#2A223A"
    }
  }, /*#__PURE__*/_react["default"].createElement("box", {
    width: "80%",
    top: "0",
    left: "0"
  }, "~~~ Snake Game | Sam Ogden ~~~"), /*#__PURE__*/_react["default"].createElement("box", {
    width: "20%",
    top: "0",
    right: "0"
  }, /*#__PURE__*/_react["default"].createElement("box", {
    width: "50%",
    top: "0",
    right: "15"
  }, "Score"), /*#__PURE__*/_react["default"].createElement("box", {
    width: "50%",
    top: "0",
    right: "5"
  }, score)), /*#__PURE__*/_react["default"].createElement("box", {
    top: "center",
    left: "center",
    width: "90%",
    height: "90%",
    border: {
      type: "line"
    },
    style: {
      border: {
        fg: "red"
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(Fruit, fruit), snake.map(function (part, i) {
    return /*#__PURE__*/_react["default"].createElement(BodyPart, _extends({}, part, {
      isHead: i === snake.length - 1,
      key: i
    }));
  })));
};

var BodyPart = function BodyPart(_ref5) {
  var x = _ref5.x,
      y = _ref5.y,
      isHead = _ref5.isHead;
  return /*#__PURE__*/_react["default"].createElement("box", {
    top: "".concat(y * 10, "%"),
    left: "".concat(x * 10, "%"),
    width: "10%",
    height: "10%",
    border: "line",
    style: {
      bg: isHead ? "#19EBFF" : "#F3EEE3",
      border: isHead ? {
        fg: "red"
      } : {
        fg: "#F3EEE3"
      }
    }
  });
};

var Fruit = function Fruit(_ref6) {
  var x = _ref6.x,
      y = _ref6.y;
  return /*#__PURE__*/_react["default"].createElement("box", {
    top: "".concat(y * 10, "%"),
    left: "".concat(x * 10, "%"),
    width: "10%",
    height: "10%",
    border: "line",
    style: {
      bg: "green",
      border: {
        fg: "green"
      }
    }
  });
};

var screen = _blessed["default"].screen({
  autoPadding: true,
  fastCSR: true,
  title: "Snake Game!"
});

screen.key(["escape", "q", "C-c"], function () {
  return process.exit(0);
});
var difficulty;

try {
  difficulty = process.argv[2].split("--")[1];
} catch (e) {
  difficulty = "hard";
} finally {
  (0, _reactBlessed.render)( /*#__PURE__*/_react["default"].createElement(App, {
    difficulty: difficulty
  }), screen);
}