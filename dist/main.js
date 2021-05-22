!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? exports.ReactSortableTreeThemeFileExplorer = factory() : root.ReactSortableTreeThemeFileExplorer = factory();
}("undefined" != typeof self ? self : this, function() {
    /******/
    return function(modules) {
        /******/
        /******/
        // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/
            // Check if module is in cache
            /******/
            if (installedModules[moduleId]) /******/
            return installedModules[moduleId].exports;
            /******/
            // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                i: moduleId,
                /******/
                l: !1,
                /******/
                exports: {}
            };
            /******/
            /******/
            // Return the exports of the module
            /******/
            /******/
            /******/
            // Execute the module function
            /******/
            /******/
            /******/
            // Flag the module as loaded
            /******/
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.l = !0, module.exports;
        }
        // webpackBootstrap
        /******/
        // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/
        // Load entry module and return exports
        /******/
        /******/
        /******/
        /******/
        // expose the modules object (__webpack_modules__)
        /******/
        /******/
        /******/
        // expose the module cache
        /******/
        /******/
        /******/
        // define getter function for harmony exports
        /******/
        /******/
        /******/
        // getDefaultExport function for compatibility with non-harmony modules
        /******/
        /******/
        /******/
        // Object.prototype.hasOwnProperty.call
        /******/
        /******/
        /******/
        // __webpack_public_path__
        /******/
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.d = function(exports, name, getter) {
            /******/
            __webpack_require__.o(exports, name) || /******/
            Object.defineProperty(exports, name, {
                /******/
                configurable: !1,
                /******/
                enumerable: !0,
                /******/
                get: getter
            });
        }, __webpack_require__.n = function(module) {
            /******/
            var getter = module && module.__esModule ? /******/
            function() {
                return module.default;
            } : /******/
            function() {
                return module;
            };
            /******/
            /******/
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 3);
    }([ /* 0 */
    /***/
    function(module, exports) {
        module.exports = require("react");
    }, /* 1 */
    /***/
    function(module, exports) {
        module.exports = require("prop-types");
    }, /* 2 */
    /***/
    function(module, exports, __webpack_require__) {
        function addStylesToDom(styles, options) {
            for (var i = 0; i < styles.length; i++) {
                var item = styles[i], domStyle = stylesInDom[item.id];
                if (domStyle) {
                    domStyle.refs++;
                    for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j](item.parts[j]);
                    for (;j < item.parts.length; j++) domStyle.parts.push(addStyle(item.parts[j], options));
                } else {
                    for (var parts = [], j = 0; j < item.parts.length; j++) parts.push(addStyle(item.parts[j], options));
                    stylesInDom[item.id] = {
                        id: item.id,
                        refs: 1,
                        parts: parts
                    };
                }
            }
        }
        function listToStyles(list, options) {
            for (var styles = [], newStyles = {}, i = 0; i < list.length; i++) {
                var item = list[i], id = options.base ? item[0] + options.base : item[0], css = item[1], media = item[2], sourceMap = item[3], part = {
                    css: css,
                    media: media,
                    sourceMap: sourceMap
                };
                newStyles[id] ? newStyles[id].parts.push(part) : styles.push(newStyles[id] = {
                    id: id,
                    parts: [ part ]
                });
            }
            return styles;
        }
        function insertStyleElement(options, style) {
            var target = getElement(options.insertInto);
            if (!target) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];
            if ("top" === options.insertAt) lastStyleElementInsertedAtTop ? lastStyleElementInsertedAtTop.nextSibling ? target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling) : target.appendChild(style) : target.insertBefore(style, target.firstChild), 
            stylesInsertedAtTop.push(style); else if ("bottom" === options.insertAt) target.appendChild(style); else {
                if ("object" != typeof options.insertAt || !options.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
                var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
                target.insertBefore(style, nextSibling);
            }
        }
        function removeStyleElement(style) {
            if (null === style.parentNode) return !1;
            style.parentNode.removeChild(style);
            var idx = stylesInsertedAtTop.indexOf(style);
            idx >= 0 && stylesInsertedAtTop.splice(idx, 1);
        }
        function createStyleElement(options) {
            var style = document.createElement("style");
            return options.attrs.type = "text/css", addAttrs(style, options.attrs), insertStyleElement(options, style), 
            style;
        }
        function createLinkElement(options) {
            var link = document.createElement("link");
            return options.attrs.type = "text/css", options.attrs.rel = "stylesheet", addAttrs(link, options.attrs), 
            insertStyleElement(options, link), link;
        }
        function addAttrs(el, attrs) {
            Object.keys(attrs).forEach(function(key) {
                el.setAttribute(key, attrs[key]);
            });
        }
        function addStyle(obj, options) {
            var style, update, remove, result;
            // If a transform function was defined, run it on the css
            if (options.transform && obj.css) {
                if (!(result = options.transform(obj.css))) // If the transform function returns a falsy value, don't add this css.
                // This allows conditional loading of css
                return function() {};
                // If transform returns a value, use that instead of the original css.
                // This allows running runtime transformations on the css.
                obj.css = result;
            }
            if (options.singleton) {
                var styleIndex = singletonCounter++;
                style = singleton || (singleton = createStyleElement(options)), update = applyToSingletonTag.bind(null, style, styleIndex, !1), 
                remove = applyToSingletonTag.bind(null, style, styleIndex, !0);
            } else obj.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (style = createLinkElement(options), 
            update = updateLink.bind(null, style, options), remove = function() {
                removeStyleElement(style), style.href && URL.revokeObjectURL(style.href);
            }) : (style = createStyleElement(options), update = applyToTag.bind(null, style), 
            remove = function() {
                removeStyleElement(style);
            });
            return update(obj), function(newObj) {
                if (newObj) {
                    if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) return;
                    update(obj = newObj);
                } else remove();
            };
        }
        function applyToSingletonTag(style, index, remove, obj) {
            var css = remove ? "" : obj.css;
            if (style.styleSheet) style.styleSheet.cssText = replaceText(index, css); else {
                var cssNode = document.createTextNode(css), childNodes = style.childNodes;
                childNodes[index] && style.removeChild(childNodes[index]), childNodes.length ? style.insertBefore(cssNode, childNodes[index]) : style.appendChild(cssNode);
            }
        }
        function applyToTag(style, obj) {
            var css = obj.css, media = obj.media;
            if (media && style.setAttribute("media", media), style.styleSheet) style.styleSheet.cssText = css; else {
                for (;style.firstChild; ) style.removeChild(style.firstChild);
                style.appendChild(document.createTextNode(css));
            }
        }
        function updateLink(link, options, obj) {
            var css = obj.css, sourceMap = obj.sourceMap, autoFixUrls = void 0 === options.convertToAbsoluteUrls && sourceMap;
            (options.convertToAbsoluteUrls || autoFixUrls) && (css = fixUrls(css)), sourceMap && (// http://stackoverflow.com/a/26603875
            css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */");
            var blob = new Blob([ css ], {
                type: "text/css"
            }), oldSrc = link.href;
            link.href = URL.createObjectURL(blob), oldSrc && URL.revokeObjectURL(oldSrc);
        }
        /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
        var stylesInDom = {}, isOldIE = function(fn) {
            var memo;
            return function() {
                return void 0 === memo && (memo = fn.apply(this, arguments)), memo;
            };
        }(function() {
            // Test for IE <= 9 as proposed by Browserhacks
            // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
            // Tests for existence of standard globals is to allow style-loader
            // to operate correctly into non-standard environments
            // @see https://github.com/webpack-contrib/style-loader/issues/177
            return window && document && document.all && !window.atob;
        }), getElement = function(fn) {
            var memo = {};
            return function(selector) {
                if (void 0 === memo[selector]) {
                    var styleTarget = fn.call(this, selector);
                    // Special case to return head of iframe instead of iframe itself
                    if (styleTarget instanceof window.HTMLIFrameElement) try {
                        // This will throw an exception if access to iframe is blocked
                        // due to cross-origin restrictions
                        styleTarget = styleTarget.contentDocument.head;
                    } catch (e) {
                        styleTarget = null;
                    }
                    memo[selector] = styleTarget;
                }
                return memo[selector];
            };
        }(function(target) {
            return document.querySelector(target);
        }), singleton = null, singletonCounter = 0, stylesInsertedAtTop = [], fixUrls = __webpack_require__(7);
        module.exports = function(list, options) {
            if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
            options = options || {}, options.attrs = "object" == typeof options.attrs ? options.attrs : {}, 
            // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
            // tags it will allow on a page
            options.singleton || (options.singleton = isOldIE()), // By default, add <style> tags to the <head> element
            options.insertInto || (options.insertInto = "head"), // By default, add <style> tags to the bottom of the target
            options.insertAt || (options.insertAt = "bottom");
            var styles = listToStyles(list, options);
            return addStylesToDom(styles, options), function(newList) {
                for (var mayRemove = [], i = 0; i < styles.length; i++) {
                    var item = styles[i], domStyle = stylesInDom[item.id];
                    domStyle.refs--, mayRemove.push(domStyle);
                }
                if (newList) {
                    addStylesToDom(listToStyles(newList, options), options);
                }
                for (var i = 0; i < mayRemove.length; i++) {
                    var domStyle = mayRemove[i];
                    if (0 === domStyle.refs) {
                        for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
                        delete stylesInDom[domStyle.id];
                    }
                }
            };
        };
        var replaceText = function() {
            var textStore = [];
            return function(index, replacement) {
                return textStore[index] = replacement, textStore.filter(Boolean).join("\n");
            };
        }();
    }, /* 3 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var _nodeContentRenderer = __webpack_require__(4), _nodeContentRenderer2 = _interopRequireDefault(_nodeContentRenderer), _treeNodeRenderer = __webpack_require__(8), _treeNodeRenderer2 = _interopRequireDefault(_treeNodeRenderer);
        // Can override the following:
        //
        // style: PropTypes.shape({}),
        // innerStyle: PropTypes.shape({}),
        // reactVirtualizedListProps: PropTypes.shape({}),
        // scaffoldBlockPxWidth: PropTypes.number,
        // slideRegionSize: PropTypes.number,
        // rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        // treeNodeRenderer: PropTypes.func,
        // nodeContentRenderer: PropTypes.func,
        // placeholderRenderer: PropTypes.func,
        module.exports = {
            nodeContentRenderer: _nodeContentRenderer2.default,
            treeNodeRenderer: _treeNodeRenderer2.default,
            scaffoldBlockPxWidth: 25,
            rowHeight: 25,
            slideRegionSize: 50
        };
    }, /* 4 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _objectWithoutProperties(obj, keys) {
            var target = {};
            for (var i in obj) keys.indexOf(i) >= 0 || Object.prototype.hasOwnProperty.call(obj, i) && (target[i] = obj[i]);
            return target;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        function isDescendant(older, younger) {
            return !!older.children && "function" != typeof older.children && older.children.some(function(child) {
                return child === younger || isDescendant(child, younger);
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _react = __webpack_require__(0), _react2 = _interopRequireDefault(_react), _propTypes = __webpack_require__(1), _propTypes2 = _interopRequireDefault(_propTypes), _nodeContentRenderer = __webpack_require__(5), _nodeContentRenderer2 = _interopRequireDefault(_nodeContentRenderer), FileThemeNodeContentRenderer = function(_Component) {
            function FileThemeNodeContentRenderer() {
                return _classCallCheck(this, FileThemeNodeContentRenderer), _possibleConstructorReturn(this, (FileThemeNodeContentRenderer.__proto__ || Object.getPrototypeOf(FileThemeNodeContentRenderer)).apply(this, arguments));
            }
            return _inherits(FileThemeNodeContentRenderer, _Component), _createClass(FileThemeNodeContentRenderer, [ {
                key: "render",
                value: function() {
                    var _props = this.props, scaffoldBlockPxWidth = _props.scaffoldBlockPxWidth, toggleChildrenVisibility = _props.toggleChildrenVisibility, connectDragPreview = _props.connectDragPreview, connectDragSource = _props.connectDragSource, isDragging = _props.isDragging, canDrop = _props.canDrop, canDrag = _props.canDrag, node = _props.node, title = _props.title, draggedNode = _props.draggedNode, path = _props.path, treeIndex = _props.treeIndex, isSearchMatch = _props.isSearchMatch, isSearchFocus = _props.isSearchFocus, icons = _props.icons, buttons = _props.buttons, className = _props.className, style = _props.style, didDrop = _props.didDrop, lowerSiblingCounts = _props.lowerSiblingCounts, listIndex = _props.listIndex, swapFrom = _props.swapFrom, swapLength = _props.swapLength, swapDepth = _props.swapDepth, otherProps = (_props.treeId, 
                    _props.isOver, _props.parentNode, _props.rowDirection, _objectWithoutProperties(_props, [ "scaffoldBlockPxWidth", "toggleChildrenVisibility", "connectDragPreview", "connectDragSource", "isDragging", "canDrop", "canDrag", "node", "title", "draggedNode", "path", "treeIndex", "isSearchMatch", "isSearchFocus", "icons", "buttons", "className", "style", "didDrop", "lowerSiblingCounts", "listIndex", "swapFrom", "swapLength", "swapDepth", "treeId", "isOver", "parentNode", "rowDirection" ])), nodeTitle = title || node.title, isDraggedDescendant = draggedNode && isDescendant(draggedNode, node), isLandingPadActive = !didDrop && isDragging, scaffold = [];
                    lowerSiblingCounts.forEach(function(lowerSiblingCount, i) {
                        if (scaffold.push(_react2.default.createElement("div", {
                            key: "pre_" + (1 + i),
                            style: {
                                width: scaffoldBlockPxWidth
                            },
                            className: _nodeContentRenderer2.default.lineBlock
                        })), treeIndex !== listIndex && i === swapDepth) {
                            // This row has been shifted, and is at the depth of
                            // the line pointing to the new destination
                            var highlightLineClass = "";
                            // This block is on the bottom (target) line
                            // This block points at the target block (where the row will go when released)
                            highlightLineClass = listIndex === swapFrom + swapLength - 1 ? _nodeContentRenderer2.default.highlightBottomLeftCorner : treeIndex === swapFrom ? _nodeContentRenderer2.default.highlightTopLeftCorner : _nodeContentRenderer2.default.highlightLineVertical, 
                            scaffold.push(_react2.default.createElement("div", {
                                key: "highlight_" + (1 + i),
                                style: {
                                    width: scaffoldBlockPxWidth,
                                    left: scaffoldBlockPxWidth * i
                                },
                                className: _nodeContentRenderer2.default.absoluteLineBlock + " " + highlightLineClass
                            }));
                        }
                    });
                    var nodeContent = _react2.default.createElement("div", _extends({
                        style: {
                            height: "100%"
                        }
                    }, otherProps), toggleChildrenVisibility && node.children && node.children.length > 0 && _react2.default.createElement("button", {
                        type: "button",
                        "aria-label": node.expanded ? "Collapse" : "Expand",
                        className: node.expanded ? _nodeContentRenderer2.default.collapseButton : _nodeContentRenderer2.default.expandButton,
                        style: {
                            left: (lowerSiblingCounts.length - .7) * scaffoldBlockPxWidth
                        },
                        onClick: function() {
                            return toggleChildrenVisibility({
                                node: node,
                                path: path,
                                treeIndex: treeIndex
                            });
                        }
                    }), _react2.default.createElement("div", {
                        className: _nodeContentRenderer2.default.rowWrapper + (canDrag ? "" : " " + _nodeContentRenderer2.default.rowWrapperDragDisabled)
                    }, connectDragPreview(_react2.default.createElement("div", {
                        style: {
                            display: "flex"
                        }
                    }, scaffold, _react2.default.createElement("div", {
                        className: _nodeContentRenderer2.default.row + (isLandingPadActive ? " " + _nodeContentRenderer2.default.rowLandingPad : "") + (isLandingPadActive && !canDrop ? " " + _nodeContentRenderer2.default.rowCancelPad : "") + (isSearchMatch ? " " + _nodeContentRenderer2.default.rowSearchMatch : "") + (isSearchFocus ? " " + _nodeContentRenderer2.default.rowSearchFocus : "") + (className ? " " + className : ""),
                        style: _extends({
                            opacity: isDraggedDescendant ? .5 : 1
                        }, style)
                    }, _react2.default.createElement("div", {
                        className: _nodeContentRenderer2.default.rowContents + (canDrag ? "" : " " + _nodeContentRenderer2.default.rowContentsDragDisabled)
                    }, _react2.default.createElement("div", {
                        className: _nodeContentRenderer2.default.rowToolbar
                    }, icons.map(function(icon, index) {
                        return _react2.default.createElement("div", {
                            key: index,
                            className: _nodeContentRenderer2.default.toolbarButton
                        }, icon);
                    })), _react2.default.createElement("div", {
                        className: _nodeContentRenderer2.default.rowLabel
                    }, _react2.default.createElement("span", {
                        className: _nodeContentRenderer2.default.rowTitle
                    }, "function" == typeof nodeTitle ? nodeTitle({
                        node: node,
                        path: path,
                        treeIndex: treeIndex
                    }) : nodeTitle)), _react2.default.createElement("div", {
                        className: _nodeContentRenderer2.default.rowToolbar
                    }, buttons.map(function(btn, index) {
                        return _react2.default.createElement("div", {
                            key: index,
                            className: _nodeContentRenderer2.default.toolbarButton
                        }, btn);
                    }))))))));
                    return canDrag ? connectDragSource(nodeContent, {
                        dropEffect: "copy"
                    }) : nodeContent;
                }
            } ]), FileThemeNodeContentRenderer;
        }(_react.Component);
        FileThemeNodeContentRenderer.defaultProps = {
            buttons: [],
            canDrag: !1,
            canDrop: !1,
            className: "",
            draggedNode: null,
            icons: [],
            isSearchFocus: !1,
            isSearchMatch: !1,
            parentNode: null,
            style: {},
            swapDepth: null,
            swapFrom: null,
            swapLength: null,
            title: null,
            toggleChildrenVisibility: null
        }, FileThemeNodeContentRenderer.propTypes = {
            buttons: _propTypes2.default.arrayOf(_propTypes2.default.node),
            canDrag: _propTypes2.default.bool,
            className: _propTypes2.default.string,
            icons: _propTypes2.default.arrayOf(_propTypes2.default.node),
            isSearchFocus: _propTypes2.default.bool,
            isSearchMatch: _propTypes2.default.bool,
            listIndex: _propTypes2.default.number.isRequired,
            lowerSiblingCounts: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
            node: _propTypes2.default.shape({}).isRequired,
            path: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([ _propTypes2.default.string, _propTypes2.default.number ])).isRequired,
            scaffoldBlockPxWidth: _propTypes2.default.number.isRequired,
            style: _propTypes2.default.shape({}),
            swapDepth: _propTypes2.default.number,
            swapFrom: _propTypes2.default.number,
            swapLength: _propTypes2.default.number,
            title: _propTypes2.default.oneOfType([ _propTypes2.default.func, _propTypes2.default.node ]),
            toggleChildrenVisibility: _propTypes2.default.func,
            treeIndex: _propTypes2.default.number.isRequired,
            treeId: _propTypes2.default.string.isRequired,
            rowDirection: _propTypes2.default.string.isRequired,
            // Drag and drop API functions
            // Drag source
            connectDragPreview: _propTypes2.default.func.isRequired,
            connectDragSource: _propTypes2.default.func.isRequired,
            didDrop: _propTypes2.default.bool.isRequired,
            draggedNode: _propTypes2.default.shape({}),
            isDragging: _propTypes2.default.bool.isRequired,
            parentNode: _propTypes2.default.shape({}),
            // Needed for dndManager
            // Drop target
            canDrop: _propTypes2.default.bool,
            isOver: _propTypes2.default.bool.isRequired
        }, exports.default = FileThemeNodeContentRenderer;
    }, /* 5 */
    /***/
    function(module, exports, __webpack_require__) {
        // style-loader: Adds some css to the DOM by adding a <style> tag
        // load the styles
        var content = __webpack_require__(6);
        "string" == typeof content && (content = [ [ module.i, content, "" ] ]);
        // Prepare cssTransformation
        var options = {
            insertAt: "top",
            hmr: !0
        };
        options.transform = void 0;
        // add the styles to the DOM
        __webpack_require__(2)(content, options);
        content.locals && (module.exports = content.locals);
    }, /* 6 */
    /***/
    function(module, exports) {
        throw new Error("Module build failed: Error: Cannot find module 'node-sass'\nRequire stack:\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\sass-loader\\lib\\loader.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\loadLoader.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\NormalModule.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\NormalModuleFactory.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\Compiler.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\webpack.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\webpack.config.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\bin\\convert-argv.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\bin\\webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:880:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:725:27)\n    at Module.require (internal/modules/cjs/loader.js:952:19)\n    at require (internal/modules/cjs/helpers.js:88:18)\n    at Object.<anonymous> (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\sass-loader\\lib\\loader.js:3:14)\n    at Module._compile (internal/modules/cjs/loader.js:1063:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)\n    at Module.load (internal/modules/cjs/loader.js:928:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:769:14)\n    at Module.require (internal/modules/cjs/loader.js:952:19)\n    at require (internal/modules/cjs/helpers.js:88:18)\n    at loadLoader (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\loadLoader.js:13:17)\n    at iteratePitchingLoaders (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js:165:10)\n    at C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js:173:18\n    at loadLoader (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\loadLoader.js:36:3)\n    at iteratePitchingLoaders (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js:165:10)\n    at C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js:173:18\n    at loadLoader (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\loadLoader.js:36:3)\n    at iteratePitchingLoaders (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js:362:2)\n    at NormalModule.doBuild (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\NormalModule.js:182:3)\n    at NormalModule.build (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\NormalModule.js:275:15)\n    at Compilation.buildModule (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\Compilation.js:157:10)\n    at factoryCallback (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\Compilation.js:348:12)\n    at C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\NormalModuleFactory.js:243:5\n    at C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\NormalModuleFactory.js:94:13\n    at C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\tapable\\lib\\Tapable.js:268:11\n    at NormalModuleFactory.<anonymous> (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\CompatibilityPlugin.js:52:5)");
    }, /* 7 */
    /***/
    function(module, exports) {
        /**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */
        module.exports = function(css) {
            // get current location
            var location = "undefined" != typeof window && window.location;
            if (!location) throw new Error("fixUrls requires window.location");
            // blank or null?
            if (!css || "string" != typeof css) return css;
            var baseUrl = location.protocol + "//" + location.host, currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");
            // send back the fixed css
            return css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
                // strip quotes (if they exist)
                var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function(o, $1) {
                    return $1;
                }).replace(/^'(.*)'$/, function(o, $1) {
                    return $1;
                });
                // already a full url? no change
                if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) return fullMatch;
                // convert the url to a full url
                var newUrl;
                // send back the fixed url(...)
                //TODO: should we add protocol?
                return newUrl = 0 === unquotedOrigUrl.indexOf("//") ? unquotedOrigUrl : 0 === unquotedOrigUrl.indexOf("/") ? baseUrl + unquotedOrigUrl : currentDir + unquotedOrigUrl.replace(/^\.\//, ""), 
                "url(" + JSON.stringify(newUrl) + ")";
            });
        };
    }, /* 8 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _objectWithoutProperties(obj, keys) {
            var target = {};
            for (var i in obj) keys.indexOf(i) >= 0 || Object.prototype.hasOwnProperty.call(obj, i) && (target[i] = obj[i]);
            return target;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _react = __webpack_require__(0), _react2 = _interopRequireDefault(_react), _propTypes = __webpack_require__(1), _propTypes2 = _interopRequireDefault(_propTypes), _treeNodeRenderer = __webpack_require__(9), _treeNodeRenderer2 = _interopRequireDefault(_treeNodeRenderer), FileThemeTreeNodeRenderer = function(_Component) {
            function FileThemeTreeNodeRenderer() {
                return _classCallCheck(this, FileThemeTreeNodeRenderer), _possibleConstructorReturn(this, (FileThemeTreeNodeRenderer.__proto__ || Object.getPrototypeOf(FileThemeTreeNodeRenderer)).apply(this, arguments));
            }
            return _inherits(FileThemeTreeNodeRenderer, _Component), _createClass(FileThemeTreeNodeRenderer, [ {
                key: "render",
                value: function() {
                    var _props = this.props, children = _props.children, listIndex = _props.listIndex, swapFrom = _props.swapFrom, swapLength = _props.swapLength, swapDepth = _props.swapDepth, lowerSiblingCounts = (_props.scaffoldBlockPxWidth, 
                    _props.lowerSiblingCounts), connectDropTarget = _props.connectDropTarget, isOver = _props.isOver, draggedNode = _props.draggedNode, canDrop = _props.canDrop, otherProps = (_props.treeIndex, 
                    _props.treeId, _props.getPrevRow, _props.node, _props.path, _props.rowDirection, 
                    _objectWithoutProperties(_props, [ "children", "listIndex", "swapFrom", "swapLength", "swapDepth", "scaffoldBlockPxWidth", "lowerSiblingCounts", "connectDropTarget", "isOver", "draggedNode", "canDrop", "treeIndex", "treeId", "getPrevRow", "node", "path", "rowDirection" ]));
                    return connectDropTarget(_react2.default.createElement("div", _extends({}, otherProps, {
                        className: _treeNodeRenderer2.default.node
                    }), _react.Children.map(children, function(child) {
                        return (0, _react.cloneElement)(child, {
                            isOver: isOver,
                            canDrop: canDrop,
                            draggedNode: draggedNode,
                            lowerSiblingCounts: lowerSiblingCounts,
                            listIndex: listIndex,
                            swapFrom: swapFrom,
                            swapLength: swapLength,
                            swapDepth: swapDepth
                        });
                    })));
                }
            } ]), FileThemeTreeNodeRenderer;
        }(_react.Component);
        FileThemeTreeNodeRenderer.defaultProps = {
            swapFrom: null,
            swapDepth: null,
            swapLength: null,
            canDrop: !1,
            draggedNode: null
        }, FileThemeTreeNodeRenderer.propTypes = {
            treeIndex: _propTypes2.default.number.isRequired,
            treeId: _propTypes2.default.string.isRequired,
            swapFrom: _propTypes2.default.number,
            swapDepth: _propTypes2.default.number,
            swapLength: _propTypes2.default.number,
            scaffoldBlockPxWidth: _propTypes2.default.number.isRequired,
            lowerSiblingCounts: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
            listIndex: _propTypes2.default.number.isRequired,
            children: _propTypes2.default.node.isRequired,
            // Drop target
            connectDropTarget: _propTypes2.default.func.isRequired,
            isOver: _propTypes2.default.bool.isRequired,
            canDrop: _propTypes2.default.bool,
            draggedNode: _propTypes2.default.shape({}),
            // used in dndManager
            getPrevRow: _propTypes2.default.func.isRequired,
            node: _propTypes2.default.shape({}).isRequired,
            path: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([ _propTypes2.default.string, _propTypes2.default.number ])).isRequired,
            rowDirection: _propTypes2.default.string.isRequired
        }, exports.default = FileThemeTreeNodeRenderer;
    }, /* 9 */
    /***/
    function(module, exports, __webpack_require__) {
        // style-loader: Adds some css to the DOM by adding a <style> tag
        // load the styles
        var content = __webpack_require__(10);
        "string" == typeof content && (content = [ [ module.i, content, "" ] ]);
        // Prepare cssTransformation
        var options = {
            insertAt: "top",
            hmr: !0
        };
        options.transform = void 0;
        // add the styles to the DOM
        __webpack_require__(2)(content, options);
        content.locals && (module.exports = content.locals);
    }, /* 10 */
    /***/
    function(module, exports) {
        throw new Error("Module build failed: Error: Cannot find module 'node-sass'\nRequire stack:\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\sass-loader\\lib\\loader.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\loadLoader.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\NormalModule.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\NormalModuleFactory.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\Compiler.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\webpack.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\webpack.config.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\bin\\convert-argv.js\n- C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\bin\\webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:880:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:725:27)\n    at Module.require (internal/modules/cjs/loader.js:952:19)\n    at require (internal/modules/cjs/helpers.js:88:18)\n    at Object.<anonymous> (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\sass-loader\\lib\\loader.js:3:14)\n    at Module._compile (internal/modules/cjs/loader.js:1063:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)\n    at Module.load (internal/modules/cjs/loader.js:928:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:769:14)\n    at Module.require (internal/modules/cjs/loader.js:952:19)\n    at require (internal/modules/cjs/helpers.js:88:18)\n    at loadLoader (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\loadLoader.js:13:17)\n    at iteratePitchingLoaders (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js:165:10)\n    at C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js:173:18\n    at loadLoader (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\loadLoader.js:36:3)\n    at iteratePitchingLoaders (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js:165:10)\n    at C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js:173:18\n    at loadLoader (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\loadLoader.js:36:3)\n    at iteratePitchingLoaders (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\loader-runner\\lib\\LoaderRunner.js:362:2)\n    at NormalModule.doBuild (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\NormalModule.js:182:3)\n    at NormalModule.build (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\NormalModule.js:275:15)\n    at Compilation.buildModule (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\Compilation.js:157:10)\n    at factoryCallback (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\Compilation.js:348:12)\n    at C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\NormalModuleFactory.js:243:5\n    at C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\NormalModuleFactory.js:94:13\n    at C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\tapable\\lib\\Tapable.js:268:11\n    at NormalModuleFactory.<anonymous> (C:\\Users\\Solo\\Desktop\\poroje\\test\\asdfasdfasdfasdfasdfasdfasdfreact-sortable-tree-theme-file-explorer\\node_modules\\webpack\\lib\\CompatibilityPlugin.js:52:5)");
    } ]);
});