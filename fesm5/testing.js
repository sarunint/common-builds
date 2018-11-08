/**
 * @license Angular v7.1.0-beta.2-da59206995
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */
import { EventEmitter, Injectable } from '@angular/core';
import { __extends } from 'tslib';
import { LocationStrategy } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A spy for {\@link Location} that allows tests to fire simulated location events.
 *
 * \@publicApi
 */
var SpyLocation = /** @class */ (function () {
    function SpyLocation() {
        this.urlChanges = [];
        this._history = [new LocationState('', '', null)];
        this._historyIndex = 0;
        /**
         * \@internal
         */
        this._subject = new EventEmitter();
        /**
         * \@internal
         */
        this._baseHref = '';
        /**
         * \@internal
         */
        this._platformStrategy = /** @type {?} */ ((null));
    }
    /**
     * @param {?} url
     * @return {?}
     */
    SpyLocation.prototype.setInitialPath = /**
     * @param {?} url
     * @return {?}
     */
    function (url) { this._history[this._historyIndex].path = url; };
    /**
     * @param {?} url
     * @return {?}
     */
    SpyLocation.prototype.setBaseHref = /**
     * @param {?} url
     * @return {?}
     */
    function (url) { this._baseHref = url; };
    /**
     * @return {?}
     */
    SpyLocation.prototype.path = /**
     * @return {?}
     */
    function () { return this._history[this._historyIndex].path; };
    /**
     * @return {?}
     */
    SpyLocation.prototype.state = /**
     * @return {?}
     */
    function () { return this._history[this._historyIndex].state; };
    /**
     * @param {?} path
     * @param {?=} query
     * @return {?}
     */
    SpyLocation.prototype.isCurrentPathEqualTo = /**
     * @param {?} path
     * @param {?=} query
     * @return {?}
     */
    function (path, query) {
        if (query === void 0) { query = ''; }
        /** @type {?} */
        var givenPath = path.endsWith('/') ? path.substring(0, path.length - 1) : path;
        /** @type {?} */
        var currPath = this.path().endsWith('/') ? this.path().substring(0, this.path().length - 1) : this.path();
        return currPath == givenPath + (query.length > 0 ? ('?' + query) : '');
    };
    /**
     * @param {?} pathname
     * @return {?}
     */
    SpyLocation.prototype.simulateUrlPop = /**
     * @param {?} pathname
     * @return {?}
     */
    function (pathname) {
        this._subject.emit({ 'url': pathname, 'pop': true, 'type': 'popstate' });
    };
    /**
     * @param {?} pathname
     * @return {?}
     */
    SpyLocation.prototype.simulateHashChange = /**
     * @param {?} pathname
     * @return {?}
     */
    function (pathname) {
        // Because we don't prevent the native event, the browser will independently update the path
        this.setInitialPath(pathname);
        this.urlChanges.push('hash: ' + pathname);
        this._subject.emit({ 'url': pathname, 'pop': true, 'type': 'hashchange' });
    };
    /**
     * @param {?} url
     * @return {?}
     */
    SpyLocation.prototype.prepareExternalUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        if (url.length > 0 && !url.startsWith('/')) {
            url = '/' + url;
        }
        return this._baseHref + url;
    };
    /**
     * @param {?} path
     * @param {?=} query
     * @param {?=} state
     * @return {?}
     */
    SpyLocation.prototype.go = /**
     * @param {?} path
     * @param {?=} query
     * @param {?=} state
     * @return {?}
     */
    function (path, query, state) {
        if (query === void 0) { query = ''; }
        if (state === void 0) { state = null; }
        path = this.prepareExternalUrl(path);
        if (this._historyIndex > 0) {
            this._history.splice(this._historyIndex + 1);
        }
        this._history.push(new LocationState(path, query, state));
        this._historyIndex = this._history.length - 1;
        /** @type {?} */
        var locationState = this._history[this._historyIndex - 1];
        if (locationState.path == path && locationState.query == query) {
            return;
        }
        /** @type {?} */
        var url = path + (query.length > 0 ? ('?' + query) : '');
        this.urlChanges.push(url);
        this._subject.emit({ 'url': url, 'pop': false });
    };
    /**
     * @param {?} path
     * @param {?=} query
     * @param {?=} state
     * @return {?}
     */
    SpyLocation.prototype.replaceState = /**
     * @param {?} path
     * @param {?=} query
     * @param {?=} state
     * @return {?}
     */
    function (path, query, state) {
        if (query === void 0) { query = ''; }
        if (state === void 0) { state = null; }
        path = this.prepareExternalUrl(path);
        /** @type {?} */
        var history = this._history[this._historyIndex];
        if (history.path == path && history.query == query) {
            return;
        }
        history.path = path;
        history.query = query;
        history.state = state;
        /** @type {?} */
        var url = path + (query.length > 0 ? ('?' + query) : '');
        this.urlChanges.push('replace: ' + url);
    };
    /**
     * @return {?}
     */
    SpyLocation.prototype.forward = /**
     * @return {?}
     */
    function () {
        if (this._historyIndex < (this._history.length - 1)) {
            this._historyIndex++;
            this._subject.emit({ 'url': this.path(), 'state': this.state(), 'pop': true });
        }
    };
    /**
     * @return {?}
     */
    SpyLocation.prototype.back = /**
     * @return {?}
     */
    function () {
        if (this._historyIndex > 0) {
            this._historyIndex--;
            this._subject.emit({ 'url': this.path(), 'state': this.state(), 'pop': true });
        }
    };
    /**
     * @param {?} onNext
     * @param {?=} onThrow
     * @param {?=} onReturn
     * @return {?}
     */
    SpyLocation.prototype.subscribe = /**
     * @param {?} onNext
     * @param {?=} onThrow
     * @param {?=} onReturn
     * @return {?}
     */
    function (onNext, onThrow, onReturn) {
        return this._subject.subscribe({ next: onNext, error: onThrow, complete: onReturn });
    };
    /**
     * @param {?} url
     * @return {?}
     */
    SpyLocation.prototype.normalize = /**
     * @param {?} url
     * @return {?}
     */
    function (url) { return /** @type {?} */ ((null)); };
    SpyLocation.decorators = [
        { type: Injectable },
    ];
    return SpyLocation;
}());
var LocationState = /** @class */ (function () {
    function LocationState(path, query, state) {
        this.path = path;
        this.query = query;
        this.state = state;
    }
    return LocationState;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A mock implementation of {\@link LocationStrategy} that allows tests to fire simulated
 * location events.
 *
 * \@publicApi
 */
var MockLocationStrategy = /** @class */ (function (_super) {
    __extends(MockLocationStrategy, _super);
    function MockLocationStrategy() {
        var _this = _super.call(this) || this;
        _this.internalBaseHref = '/';
        _this.internalPath = '/';
        _this.internalTitle = '';
        _this.urlChanges = [];
        /**
         * \@internal
         */
        _this._subject = new EventEmitter();
        return _this;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    MockLocationStrategy.prototype.simulatePopState = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        this.internalPath = url;
        this._subject.emit(new _MockPopStateEvent(this.path()));
    };
    /**
     * @param {?=} includeHash
     * @return {?}
     */
    MockLocationStrategy.prototype.path = /**
     * @param {?=} includeHash
     * @return {?}
     */
    function (includeHash) {
        if (includeHash === void 0) { includeHash = false; }
        return this.internalPath;
    };
    /**
     * @param {?} internal
     * @return {?}
     */
    MockLocationStrategy.prototype.prepareExternalUrl = /**
     * @param {?} internal
     * @return {?}
     */
    function (internal) {
        if (internal.startsWith('/') && this.internalBaseHref.endsWith('/')) {
            return this.internalBaseHref + internal.substring(1);
        }
        return this.internalBaseHref + internal;
    };
    /**
     * @param {?} ctx
     * @param {?} title
     * @param {?} path
     * @param {?} query
     * @return {?}
     */
    MockLocationStrategy.prototype.pushState = /**
     * @param {?} ctx
     * @param {?} title
     * @param {?} path
     * @param {?} query
     * @return {?}
     */
    function (ctx, title, path, query) {
        this.internalTitle = title;
        /** @type {?} */
        var url = path + (query.length > 0 ? ('?' + query) : '');
        this.internalPath = url;
        /** @type {?} */
        var externalUrl = this.prepareExternalUrl(url);
        this.urlChanges.push(externalUrl);
    };
    /**
     * @param {?} ctx
     * @param {?} title
     * @param {?} path
     * @param {?} query
     * @return {?}
     */
    MockLocationStrategy.prototype.replaceState = /**
     * @param {?} ctx
     * @param {?} title
     * @param {?} path
     * @param {?} query
     * @return {?}
     */
    function (ctx, title, path, query) {
        this.internalTitle = title;
        /** @type {?} */
        var url = path + (query.length > 0 ? ('?' + query) : '');
        this.internalPath = url;
        /** @type {?} */
        var externalUrl = this.prepareExternalUrl(url);
        this.urlChanges.push('replace: ' + externalUrl);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MockLocationStrategy.prototype.onPopState = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._subject.subscribe({ next: fn }); };
    /**
     * @return {?}
     */
    MockLocationStrategy.prototype.getBaseHref = /**
     * @return {?}
     */
    function () { return this.internalBaseHref; };
    /**
     * @return {?}
     */
    MockLocationStrategy.prototype.back = /**
     * @return {?}
     */
    function () {
        if (this.urlChanges.length > 0) {
            this.urlChanges.pop();
            /** @type {?} */
            var nextUrl = this.urlChanges.length > 0 ? this.urlChanges[this.urlChanges.length - 1] : '';
            this.simulatePopState(nextUrl);
        }
    };
    /**
     * @return {?}
     */
    MockLocationStrategy.prototype.forward = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    MockLocationStrategy.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MockLocationStrategy.ctorParameters = function () { return []; };
    return MockLocationStrategy;
}(LocationStrategy));
var _MockPopStateEvent = /** @class */ (function () {
    function _MockPopStateEvent(newUrl) {
        this.newUrl = newUrl;
        this.pop = true;
        this.type = 'popstate';
    }
    return _MockPopStateEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of this package.
 */

// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { SpyLocation, MockLocationStrategy };
//# sourceMappingURL=testing.js.map
