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
import { Pipe } from '@angular/core';
import { NgLocalization, getPluralCategory } from '../i18n/localization';
import { invalidPipeArgumentError } from './invalid_pipe_argument_error';
/** @type {?} */
var _INTERPOLATION_REGEXP = /#/g;
/**
 * \@ngModule CommonModule
 * \@description
 *
 * Maps a value to a string that pluralizes the value according to locale rules.
 *
 * \@usageNotes
 *
 * ### Example
 *
 * {\@example common/pipes/ts/i18n_pipe.ts region='I18nPluralPipeComponent'}
 *
 * \@publicApi
 */
var I18nPluralPipe = /** @class */ (function () {
    function I18nPluralPipe(_localization) {
        this._localization = _localization;
    }
    /**
     * @param value the number to be formatted
     * @param pluralMap an object that mimics the ICU format, see
     * http://userguide.icu-project.org/formatparse/messages.
     * @param locale a `string` defining the locale to use (uses the current {@link LOCALE_ID} by
     * default).
     */
    /**
     * @param {?} value the number to be formatted
     * @param {?} pluralMap an object that mimics the ICU format, see
     * http://userguide.icu-project.org/formatparse/messages.
     * @param {?=} locale a `string` defining the locale to use (uses the current {\@link LOCALE_ID} by
     * default).
     * @return {?}
     */
    I18nPluralPipe.prototype.transform = /**
     * @param {?} value the number to be formatted
     * @param {?} pluralMap an object that mimics the ICU format, see
     * http://userguide.icu-project.org/formatparse/messages.
     * @param {?=} locale a `string` defining the locale to use (uses the current {\@link LOCALE_ID} by
     * default).
     * @return {?}
     */
    function (value, pluralMap, locale) {
        if (value == null)
            return '';
        if (typeof pluralMap !== 'object' || pluralMap === null) {
            throw invalidPipeArgumentError(I18nPluralPipe, pluralMap);
        }
        /** @type {?} */
        var key = getPluralCategory(value, Object.keys(pluralMap), this._localization, locale);
        return pluralMap[key].replace(_INTERPOLATION_REGEXP, value.toString());
    };
    I18nPluralPipe.decorators = [
        { type: Pipe, args: [{ name: 'i18nPlural', pure: true },] },
    ];
    /** @nocollapse */
    I18nPluralPipe.ctorParameters = function () { return [
        { type: NgLocalization }
    ]; };
    return I18nPluralPipe;
}());
export { I18nPluralPipe };
if (false) {
    /** @type {?} */
    I18nPluralPipe.prototype._localization;
}
//# sourceMappingURL=i18n_plural_pipe.js.map