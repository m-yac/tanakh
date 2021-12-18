/*! @hebcal/core v3.30.0 */
var hebcal = (function (exports) {
'use strict';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

/*
    Hebcal - A Jewish Calendar Generator
    Copyright (c) 1994-2020 Danny Sadinoff
    Portions copyright Eyal Schachter and Michael J. Radwin

    https://github.com/hebcal/hebcal-es6

    This program is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
var monthLengths = [[0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];
/**
 * @private
 * @param {number} x
 * @param {number} y
 * @return {number}
 */

function mod(x, y) {
  return x - y * Math.floor(x / y);
}
/**
 * @private
 * @param {number} x
 * @param {number} y
 * @return {number}
 */

function quotient(x, y) {
  return Math.floor(x / y);
}
/**
 * Gregorian date helper functions.
 * @namespace
 */


var greg = {
  /**
   * Long names of the Gregorian months (1='January', 12='December')
   * @readonly
   * @type {string[]}
   */
  monthNames: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  /**
   * Returns true if the Gregorian year is a leap year
   * @param {number} year Gregorian year
   * @return {boolean}
   */
  isLeapYear: function isLeapYear(year) {
    return !(year % 4) && (!!(year % 100) || !(year % 400));
  },

  /**
   * Number of days in the Gregorian month for given year
   * @param {number} month Gregorian month (1=January, 12=December)
   * @param {number} year Gregorian year
   * @return {number}
   */
  daysInMonth: function daysInMonth(month, year) {
    // 1 based months
    return monthLengths[+this.isLeapYear(year)][month];
  },

  /**
   * Returns true if the object is a Javascript Date
   * @param {Object} obj
   * @return {boolean}
   */
  isDate: function isDate(obj) {
    return _typeof(obj) === 'object' && Date.prototype === obj.__proto__;
  },

  /**
   * Returns number of days since January 1 of that year
   * @param {Date} date Gregorian date
   * @return {number}
   */
  dayOfYear: function dayOfYear(date) {
    if (!this.isDate(date)) {
      throw new TypeError('Argument to greg.dayOfYear not a Date');
    }

    var doy = date.getDate() + 31 * date.getMonth();

    if (date.getMonth() > 1) {
      // FEB
      doy -= Math.floor((4 * (date.getMonth() + 1) + 23) / 10);

      if (this.isLeapYear(date.getFullYear())) {
        doy++;
      }
    }

    return doy;
  },

  /**
   * Converts Gregorian date to absolute R.D. (Rata Die) days
   * @param {Date} date Gregorian date
   * @return {number}
   */
  greg2abs: function greg2abs(date) {
    if (!this.isDate(date)) {
      throw new TypeError('Argument to greg.greg2abs not a Date');
    }

    var year = date.getFullYear() - 1;
    return this.dayOfYear(date) + // days this year
    365 * year + ( // + days in prior years
    Math.floor(year / 4) - // + Julian Leap years
    Math.floor(year / 100) + // - century years
    Math.floor(year / 400)); // + Gregorian leap years
  },

  /**
   * @private
   * @param {number} theDate - R.D. number of days
   * @return {number}
   */
  yearFromFixed: function yearFromFixed(theDate) {
    var l0 = theDate - 1;
    var n400 = quotient(l0, 146097);
    var d1 = mod(l0, 146097);
    var n100 = quotient(d1, 36524);
    var d2 = mod(d1, 36524);
    var n4 = quotient(d2, 1461);
    var d3 = mod(d2, 1461);
    var n1 = quotient(d3, 365);
    var year = 400 * n400 + 100 * n100 + 4 * n4 + n1;
    return n100 != 4 && n1 != 4 ? year + 1 : year;
  },

  /**
   * @private
   * @param {number} year
   * @param {number} month
   * @param {number} day
   * @return {number}
   */
  toFixed: function toFixed(year, month, day) {
    var py = year - 1;
    return 0 + 365 * py + quotient(py, 4) - quotient(py, 100) + quotient(py, 400) + quotient(367 * month - 362, 12) + Math.floor(month <= 2 ? 0 : this.isLeapYear(year) ? -1 : -2) + day;
  },

  /**
   * Converts from Rata Die (R.D. number) to Gregorian date.
   * See the footnote on page 384 of ``Calendrical Calculations, Part II:
   * Three Historical Calendars'' by E. M. Reingold,  N. Dershowitz, and S. M.
   * Clamen, Software--Practice and Experience, Volume 23, Number 4
   * (April, 1993), pages 383-404 for an explanation.
   * @param {number} theDate - R.D. number of days
   * @return {Date}
   */
  abs2greg: function abs2greg(theDate) {
    if (typeof theDate !== 'number') {
      throw new TypeError('Argument to greg.abs2greg not a Number');
    }

    theDate = Math.trunc(theDate);
    var year = this.yearFromFixed(theDate);
    var priorDays = theDate - this.toFixed(year, 1, 1);
    var correction = theDate < this.toFixed(year, 3, 1) ? 0 : this.isLeapYear(year) ? 1 : 2;
    var month = quotient(12 * (priorDays + correction) + 373, 367);
    var day = theDate - this.toFixed(year, month, 1) + 1;
    var dt = new Date(year, month - 1, day);

    if (year < 100 && year >= 0) {
      dt.setFullYear(year);
    }

    return dt;
  }
};

var GERESH = '׳';
var GERSHAYIM = '״';
/**
 * @private
 * @param {number} num
 * @return {string}
 */

function num2heb(num) {
  switch (num) {
    case 1:
      return 'א';

    case 2:
      return 'ב';

    case 3:
      return 'ג';

    case 4:
      return 'ד';

    case 5:
      return 'ה';

    case 6:
      return 'ו';

    case 7:
      return 'ז';

    case 8:
      return 'ח';

    case 9:
      return 'ט';

    case 10:
      return 'י';

    case 20:
      return 'כ';

    case 30:
      return 'ל';

    case 40:
      return 'מ';

    case 50:
      return 'נ';

    case 60:
      return 'ס';

    case 70:
      return 'ע';

    case 80:
      return 'פ';

    case 90:
      return 'צ';

    case 100:
      return 'ק';

    case 200:
      return 'ר';

    case 300:
      return 'ש';

    case 400:
      return 'ת';

    default:
      return '*INVALID*';
  }
}
/**
 * Converts a numerical value to a string of Hebrew letters
 * @example
 * gematriya(5774) // תשע״ד - cropped to 774
 * @param {number} number
 * @return {string}
 */


function gematriya(number) {
  var num = parseInt(number, 10);

  if (!num) {
    throw new TypeError("invalid parameter to gematriya ".concat(number));
  }

  var digits = [];
  num = num % 1000;

  while (num > 0) {
    if (num === 15 || num === 16) {
      digits.push(9);
      digits.push(num - 9);
      break;
    }

    var incr = 100;
    var i = void 0;

    for (i = 400; i > num; i -= incr) {
      if (i === incr) {
        incr = incr / 10;
      }
    }

    digits.push(i);
    num -= i;
  }

  if (digits.length == 1) {
    return num2heb(digits[0]) + GERESH;
  }

  var str = '';

  for (var _i = 0; _i < digits.length; _i++) {
    if (_i + 1 === digits.length) {
      str += GERSHAYIM;
    }

    str += num2heb(digits[_i]);
  }

  return str;
}

var noopLocale = {
  headers: {
    'plural-forms': 'nplurals=2; plural=(n!=1);'
  },
  contexts: {
    '': {}
  }
};
var alias = {
  'h': 'he',
  'a': 'ashkenazi',
  's': 'en',
  '': 'en'
};
/**
 * A locale in Hebcal is used for translations/transliterations of
 * holidays. `@hebcal/core` supports four locales by default
 * * `en` - default, Sephardic transliterations (e.g. "Shabbat")
 * * `ashkenazi` - Ashkenazi transliterations (e.g. "Shabbos")
 * * `he` - Hebrew (e.g. "שַׁבָּת")
 * * `he-x-NoNikud` - Hebrew without nikud (e.g. "שבת")
 * @namespace
 */

var Locale = {
  /** @private */
  locales: Object.create(null),

  /** @private */
  activeLocale: null,

  /** @private */
  activeName: null,

  /**
   * Returns translation only if `locale` offers a non-empty translation for `id`.
   * Otherwise, returns `undefined`.
   * @param {string} id Message ID to translate
   * @param {string} [locale] Optional locale name (i.e: `'he'`, `'fr'`). Defaults to active locale.
   * @return {string}
   */
  lookupTranslation: function lookupTranslation(id, locale) {
    var locale0 = locale && locale.toLowerCase();
    var loc = typeof locale == 'string' && this.locales[locale0] || this.activeLocale;
    var array = loc[id];

    if (array && array.length && array[0].length) {
      return array[0];
    }

    return undefined;
  },

  /**
   * By default, if no translation was found, returns `id`.
   * @param {string} id Message ID to translate
   * @param {string} [locale] Optional locale name (i.e: `'he'`, `'fr'`). Defaults to active locale.
   * @return {string}
   */
  gettext: function gettext(id, locale) {
    var text = this.lookupTranslation(id, locale);

    if (typeof text == 'undefined') {
      return id;
    }

    return text;
  },

  /**
   * Register locale translations.
   * @param {string} locale Locale name (i.e.: `'he'`, `'fr'`)
   * @param {LocaleDate} data parsed data from a `.po` file.
   */
  addLocale: function addLocale(locale, data) {
    if (_typeof(data.contexts) !== 'object' || _typeof(data.contexts['']) !== 'object') {
      throw new TypeError("Locale '".concat(locale, "' invalid compact format"));
    }

    this.locales[locale.toLowerCase()] = data.contexts[''];
  },

  /**
   * Activates a locale. Throws an error if the locale has not been previously added.
   * After setting the locale to be used, all strings marked for translations
   * will be represented by the corresponding translation in the specified locale.
   * @param {string} locale Locale name (i.e: `'he'`, `'fr'`)
   * @return {LocaleData}
   */
  useLocale: function useLocale(locale) {
    var locale0 = locale.toLowerCase();
    var obj = this.locales[locale0];

    if (!obj) {
      throw new RangeError("Locale '".concat(locale, "' not found"));
    }

    this.activeName = alias[locale0] || locale0;
    this.activeLocale = obj;
    return this.activeLocale;
  },

  /**
   * Returns the name of the active locale (i.e. 'he', 'ashkenazi', 'fr')
   * @return {string}
   */
  getLocaleName: function getLocaleName() {
    return this.activeName;
  },

  /**
   * @param {number} n
   * @param {string} [locale] Optional locale name (i.e: `'he'`, `'fr'`). Defaults to active locale.
   * @return {string}
   */
  ordinal: function ordinal(n, locale) {
    var locale1 = locale && locale.toLowerCase();
    var locale0 = locale1 || this.activeName;

    if (!locale0) {
      return this.getEnOrdinal(n);
    }

    switch (locale0) {
      case 'en':
      case 's':
      case 'a':
      case 'ashkenazi':
      case 'ashkenazi_litvish':
      case 'ashkenazi_poylish':
      case 'ashkenazi_standard':
        return this.getEnOrdinal(n);

      case 'es':
        return n + 'º';

      case 'h':
      case 'he':
      case 'he-x-nonikud':
        return String(n);

      default:
        return n + '.';
    }
  },

  /**
   * @private
   * @param {number} n
   * @return {string}
   */
  getEnOrdinal: function getEnOrdinal(n) {
    var s = ['th', 'st', 'nd', 'rd'];
    var v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  },

  /**
   * Removes nekudot from Hebrew string
   * @param {string} str
   * @return {string}
   */
  hebrewStripNikkud: function hebrewStripNikkud(str) {
    return str.replace(/[\u0590-\u05bd]/g, '').replace(/[\u05bf-\u05c7]/g, '');
  }
};
Locale.addLocale('en', noopLocale);
Locale.addLocale('s', noopLocale);
Locale.addLocale('', noopLocale);
Locale.useLocale('en');

var NISAN$2 = 1;
var IYYAR$1 = 2;
var SIVAN$2 = 3;
var TAMUZ$1 = 4;
var AV$1 = 5;
var ELUL$2 = 6;
var TISHREI$2 = 7;
var CHESHVAN$2 = 8;
var KISLEV$2 = 9;
var TEVET$2 = 10;
var SHVAT$2 = 11;
var ADAR_I$2 = 12;
var ADAR_II$2 = 13;
/**
 * Hebrew months of the year (NISAN=1, TISHREI=7)
 * @readonly
 * @enum {number}
 */

var months = {
  /** Nissan / ניסן */
  NISAN: 1,

  /** Iyyar / אייר */
  IYYAR: 2,

  /** Sivan / סיון */
  SIVAN: 3,

  /** Tamuz (sometimes Tammuz) / תמוז */
  TAMUZ: 4,

  /** Av / אב */
  AV: 5,

  /** Elul / אלול */
  ELUL: 6,

  /** Tishrei / תִשְׁרֵי */
  TISHREI: 7,

  /** Cheshvan / חשון */
  CHESHVAN: 8,

  /** Kislev / כסלו */
  KISLEV: 9,

  /** Tevet / טבת */
  TEVET: 10,

  /** Sh'vat / שבט */
  SHVAT: 11,

  /** Adar or Adar Rishon / אדר */
  ADAR_I: 12,

  /** Adar Sheini (only on leap years) / אדר ב׳ */
  ADAR_II: 13
};
var monthNames0 = ['', 'Nisan', 'Iyyar', 'Sivan', 'Tamuz', 'Av', 'Elul', 'Tishrei', 'Cheshvan', 'Kislev', 'Tevet', 'Sh\'vat'];
/**
 * Transliterations of Hebrew month names.
 * Regular years are index 0 and leap years are index 1.
 * @private
 */

var monthNames = [monthNames0.concat(['Adar', 'Nisan']), monthNames0.concat(['Adar I', 'Adar II', 'Nisan'])]; // eslint-disable-next-line require-jsdoc

function throwTypeError$2(msg) {
  throw new TypeError(msg);
}

var edCache = Object.create(null);
var EPOCH = -1373428; // Avg year length in the cycle (19 solar years with 235 lunar months)

var AVG_HEBYEAR_DAYS = 365.24682220597794;
var UNITS_DAY = 'day';
var UNITS_WEEK = 'week';
var UNITS_MONTH = 'month';
var UNITS_YEAR = 'year';
var UNITS_SINGLE = {
  d: UNITS_DAY,
  w: UNITS_WEEK,
  M: UNITS_MONTH,
  y: UNITS_YEAR
};
var UNITS_VALID = {
  day: UNITS_DAY,
  week: UNITS_WEEK,
  month: UNITS_MONTH,
  year: UNITS_YEAR
};
/**
 * A simple Hebrew date object with numeric fields `yy`, `mm`, and `dd`
 * @typedef {Object} SimpleHebrewDate
 * @property {number} yy Hebrew year
 * @property {number} mm Hebrew month of year (1=NISAN, 7=TISHREI)
 * @property {number} dd Day of month (1-30)
 * @private
 */

/** Represents a Hebrew date */

var HDate$1 = /*#__PURE__*/function () {
  /**
   * Create a Hebrew date. There are 3 basic forms for the `HDate()` constructor.
   *
   * 1. No parameters - represents the current Hebrew date at time of instantiation
   * 2. One parameter
   *    * `Date` - represents the Hebrew date corresponding to the Gregorian date using
   *       local time. Hours, minutes, seconds and milliseconds are ignored.
   *    * `HDate` - clones a copy of the given Hebrew date
   *    * `number` - Converts absolute R.D. days to Hebrew date.
   *       R.D. 1 == the imaginary date January 1, 1 (Gregorian)
   * 3. Three parameters: Hebrew day, Hebrew month, Hebrew year. Hebrew day should
   *    be a number between 1-30, Hebrew month can be a number or string, and
   *    Hebrew year is always a number.
   * @example
   * import {HDate, months} from '@hebcal/core';
   *
   * const hd1 = new HDate();
   * const hd2 = new HDate(new Date(2008, 10, 13));
   * const hd3 = new HDate(15, 'Cheshvan', 5769);
   * const hd4 = new HDate(15, months.CHESHVAN, 5769);
   * const hd5 = new HDate(733359); // ==> 15 Cheshvan 5769
   * const monthName = 'אייר';
   * const hd6 = new HDate(5, monthName, 5773);
   * @param {number|Date|HDate} [day] - Day of month (1-30) if a `number`.
   *   If a `Date` is specified, represents the Hebrew date corresponding to the
   *   Gregorian date using local time.
   *   If an `HDate` is specified, clones a copy of the given Hebrew date.
   * @param {number|string} [month] - Hebrew month of year (1=NISAN, 7=TISHREI)
   * @param {number} [year] - Hebrew year
   */
  function HDate(day, month, year) {
    _classCallCheck(this, HDate);

    if (arguments.length == 2 || arguments.length > 3) {
      throw new TypeError('HDate constructor requires 0, 1 or 3 arguments');
    }

    if (arguments.length == 3) {
      // Hebrew day, Hebrew month, Hebrew year

      /**
       * @private
       * @type {number}
       */
      this.day = this.month = 1;
      /**
       * @private
       * @type {number}
       */

      this.year = +year;

      if (isNaN(this.year)) {
        throw new TypeError("HDate called with bad year argument: ".concat(year));
      }

      this.setMonth(month); // will throw if we can't parse

      this.setDate(+day);

      if (isNaN(this.day)) {
        throw new TypeError("HDate called with bad day argument: ".concat(day));
      }
    } else {
      // 0 arguments
      if (typeof day === 'undefined') {
        day = new Date();
      } // 1 argument


      var abs0 = typeof day === 'number' && !isNaN(day) ? day : greg.isDate(day) ? greg.greg2abs(day) : HDate.isHDate(day) ? {
        dd: day.day,
        mm: day.month,
        yy: day.year
      } : throwTypeError$2("HDate called with bad argument: ".concat(day));
      var isNumber = typeof abs0 === 'number';
      var d = isNumber ? HDate.abs2hebrew(abs0) : abs0;
      /**
       * @private
       * @type {number}
       */

      this.day = d.dd;
      /**
       * @private
       * @type {number}
       */

      this.month = d.mm;
      /**
       * @private
       * @type {number}
       */

      this.year = d.yy;

      if (isNumber) {
        /**
         * @private
         * @type {number}
         */
        this.abs0 = abs0;
      }
    }
  }
  /**
   * Gets the Hebrew year of this Hebrew date
   * @return {number}
   */


  _createClass(HDate, [{
    key: "getFullYear",
    value: function getFullYear() {
      return this.year;
    }
    /**
     * Tests if this date occurs during a leap year
     * @return {boolean}
     */

  }, {
    key: "isLeapYear",
    value: function isLeapYear() {
      return HDate.isLeapYear(this.year);
    }
    /**
     * Gets the Hebrew month (1=NISAN, 7=TISHREI) of this Hebrew date
     * @return {number}
     */

  }, {
    key: "getMonth",
    value: function getMonth() {
      return this.month;
    }
    /**
     * The Tishrei-based month of the date. 1 is Tishrei, 7 is Nisan, 13 is Elul in a leap year
     * @return {number}
     */

  }, {
    key: "getTishreiMonth",
    value: function getTishreiMonth() {
      var nummonths = HDate.monthsInYear(this.getFullYear());
      return (this.getMonth() + nummonths - 6) % nummonths || nummonths;
    }
    /**
     * Number of days in the month of this Hebrew date
     * @return {number}
     */

  }, {
    key: "daysInMonth",
    value: function daysInMonth() {
      return HDate.daysInMonth(this.getMonth(), this.getFullYear());
    }
    /**
     * Gets the day within the month (1-30)
     * @return {number}
     */

  }, {
    key: "getDate",
    value: function getDate() {
      return this.day;
    }
    /**
     * Gets the day of the week. 0=Sunday, 6=Saturday
     * @return {number}
     */

  }, {
    key: "getDay",
    value: function getDay() {
      return mod(this.abs(), 7);
    }
    /**
     * Sets the year of the date. Returns the object it was called upon.
     * @private
     * @deprecated
     * @param {number} year
     * @return {HDate}
     */

  }, {
    key: "setFullYear",
    value: function setFullYear(year) {
      this.year = year;
      fix(this);
      return this;
    }
    /**
     * Sets the day of the month of the date. Returns the object it was called upon
     * @private
     * @param {number} month
     * @return {HDate}
     */

  }, {
    key: "setMonth",
    value: function setMonth(month) {
      this.month = HDate.monthNum(month);
      fix(this);
      return this;
    }
    /**
     * @private
     * @param {number} date
     * @return {HDate}
     */

  }, {
    key: "setDate",
    value: function setDate(date) {
      this.day = date;
      fix(this);
      return this;
    }
    /**
     * Converts to Gregorian date
     * @return {Date}
     */

  }, {
    key: "greg",
    value: function greg$1() {
      return greg.abs2greg(this.abs());
    }
    /**
     * Returns R.D. (Rata Die) fixed days.
     * R.D. 1 == Monday, January 1, 1 (Gregorian)
     * Note also that R.D. = Julian Date − 1,721,424.5
     * https://en.wikipedia.org/wiki/Rata_Die#Dershowitz_and_Reingold
     * @return {number}
     */

  }, {
    key: "abs",
    value: function abs() {
      if (typeof this.abs0 !== 'number') {
        this.abs0 = HDate.hebrew2abs(this.year, this.month, this.day);
      }

      return this.abs0;
    }
    /**
     * Converts Hebrew date to R.D. (Rata Die) fixed days.
     * R.D. 1 is the imaginary date Monday, January 1, 1 on the Gregorian
     * Calendar.
     * @param {number} year Hebrew year
     * @param {number} month Hebrew month
     * @param {number} day Hebrew date (1-30)
     * @return {number}
     */

  }, {
    key: "getMonthName",
    value:
    /**
     * Returns a transliterated Hebrew month name, e.g. `'Elul'` or `'Cheshvan'`.
     * @return {string}
     */
    function getMonthName() {
      return HDate.getMonthName(this.getMonth(), this.getFullYear());
    }
    /**
     * Renders this Hebrew date as a translated or transliterated string,
     * including ordinal e.g. `'15th of Cheshvan, 5769'`.
     * @example
     * import {HDate, months} from '@hebcal/core';
     *
     * const hd = new HDate(15, months.CHESHVAN, 5769);
     * console.log(hd.render()); // '15th of Cheshvan, 5769'
     * console.log(hd.render('he')); // '15 חֶשְׁוָן, 5769'
     * @param {string} [locale] Optional locale name (defaults to active locale).
     * @param {boolean} [showYear=true] Display year (defaults to true).
     * @return {string}
     */

  }, {
    key: "render",
    value: function render() {
      var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var showYear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var locale0 = locale || Locale.getLocaleName();
      var day = this.getDate();
      var monthName = Locale.gettext(this.getMonthName(), locale0);
      var nth = Locale.ordinal(day, locale0);
      var dayOf = HDate.getDayOfTranslation(locale0);
      var dateStr = "".concat(nth).concat(dayOf, " ").concat(monthName);

      if (showYear) {
        var fullYear = this.getFullYear();
        return "".concat(dateStr, ", ").concat(fullYear);
      } else {
        return dateStr;
      }
    }
    /**
     * @private
     * @param {string} locale
     * @return {string}
     */

  }, {
    key: "renderGematriya",
    value:
    /**
     * Renders this Hebrew date in Hebrew gematriya, regardless of locale.
     * @example
     * import {HDate, months} from '@hebcal/core';
     * const hd = new HDate(15, months.CHESHVAN, 5769);
     * console.log(ev.renderGematriya()); // 'ט״ו חֶשְׁוָן תשס״ט'
     * @return {string}
     */
    function renderGematriya() {
      var d = this.getDate();
      var m = Locale.gettext(this.getMonthName(), 'he');
      var y = this.getFullYear();
      return gematriya(d) + ' ' + m + ' ' + gematriya(y);
    }
    /**
     * Returns an `HDate` representing the a dayNumber before the current date.
     * Sunday=0, Saturday=6
     * @example
     * new HDate(new Date('Wednesday February 19, 2014')).before(6).greg() // Sat Feb 15 2014
     * @param {number} day day of week
     * @return {HDate}
     */

  }, {
    key: "before",
    value: function before(day) {
      return _onOrBefore(day, this, -1);
    }
    /**
     * Returns an `HDate` representing the a dayNumber on or before the current date.
     * Sunday=0, Saturday=6
     * @example
     * new HDate(new Date('Wednesday February 19, 2014')).onOrBefore(6).greg() // Sat Feb 15 2014
     * new HDate(new Date('Saturday February 22, 2014')).onOrBefore(6).greg() // Sat Feb 22 2014
     * new HDate(new Date('Sunday February 23, 2014')).onOrBefore(6).greg() // Sat Feb 22 2014
     * @param {number} dow day of week
     * @return {HDate}
     */

  }, {
    key: "onOrBefore",
    value: function onOrBefore(dow) {
      return _onOrBefore(dow, this, 0);
    }
    /**
     * Returns an `HDate` representing the nearest dayNumber to the current date
     * Sunday=0, Saturday=6
     * @example
     * new HDate(new Date('Wednesday February 19, 2014')).nearest(6).greg() // Sat Feb 22 2014
     * new HDate(new Date('Tuesday February 18, 2014')).nearest(6).greg() // Sat Feb 15 2014
     * @param {number} dow day of week
     * @return {HDate}
     */

  }, {
    key: "nearest",
    value: function nearest(dow) {
      return _onOrBefore(dow, this, 3);
    }
    /**
     * Returns an `HDate` representing the a dayNumber on or after the current date.
     * Sunday=0, Saturday=6
     * @example
     * new HDate(new Date('Wednesday February 19, 2014')).onOrAfter(6).greg() // Sat Feb 22 2014
     * new HDate(new Date('Saturday February 22, 2014')).onOrAfter(6).greg() // Sat Feb 22 2014
     * new HDate(new Date('Sunday February 23, 2014')).onOrAfter(6).greg() // Sat Mar 01 2014
     * @param {number} dow day of week
     * @return {HDate}
     */

  }, {
    key: "onOrAfter",
    value: function onOrAfter(dow) {
      return _onOrBefore(dow, this, 6);
    }
    /**
     * Returns an `HDate` representing the a dayNumber after the current date.
     * Sunday=0, Saturday=6
     * @example
     * new HDate(new Date('Wednesday February 19, 2014')).after(6).greg() // Sat Feb 22 2014
     * new HDate(new Date('Saturday February 22, 2014')).after(6).greg() // Sat Mar 01 2014
     * new HDate(new Date('Sunday February 23, 2014')).after(6).greg() // Sat Mar 01 2014
     * @param {number} day day of week
     * @return {HDate}
     */

  }, {
    key: "after",
    value: function after(day) {
      return _onOrBefore(day, this, 7);
    }
    /**
     * Returns the next Hebrew date
     * @return {HDate}
     */

  }, {
    key: "next",
    value: function next() {
      return new HDate(this.abs() + 1);
    }
    /**
     * Returns the previous Hebrew date
     * @return {HDate}
     */

  }, {
    key: "prev",
    value: function prev() {
      return new HDate(this.abs() - 1);
    }
    /**
     * Returns a cloned `HDate` object with a specified amount of time added
     *
     * Units are case insensitive, and support plural and short forms.
     * Note, short forms are case sensitive.
     *
     * | Unit | Shorthand | Description
     * | --- | --- | --- |
     * | `day` | `d` | days |
     * | `week` | `w` | weeks |
     * | `month` | `M` | months |
     * | `year` | `y` | years |
     * @param {number} number
     * @param {string} [units]
     * @return {HDate}
     */

  }, {
    key: "add",
    value: function add(number) {
      var units = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'd';
      number = parseInt(number, 10);

      if (!number) {
        return new HDate(this);
      }

      units = HDate.standardizeUnits(units);

      if (units === UNITS_DAY) {
        return new HDate(this.abs() + number);
      } else if (units === UNITS_WEEK) {
        return new HDate(this.abs() + 7 * number);
      } else if (units === UNITS_YEAR) {
        return new HDate(this.getDate(), this.getMonth(), this.getFullYear() + number);
      } else if (units === UNITS_MONTH) {
        var hd = new HDate(this);
        var sign = number > 0 ? 1 : -1;
        number = Math.abs(number);

        for (var i = 0; i < number; i++) {
          hd = new HDate(hd.abs() + sign * hd.daysInMonth());
        }

        return hd;
      }
    }
    /**
     * @private
     * @param {string} units
     * @return {string}
     */

  }, {
    key: "subtract",
    value:
    /**
     * Returns a cloned `HDate` object with a specified amount of time subracted
     *
     * Units are case insensitive, and support plural and short forms.
     * Note, short forms are case sensitive.
     *
     * | Unit | Shorthand | Description
     * | --- | --- | --- |
     * | `day` | `d` | days |
     * | `week` | `w` | weeks |
     * | `month` | `M` | months |
     * | `year` | `y` | years |
     * @example
     * import {HDate, months} from '@hebcal/core';
     *
     * const hd1 = new HDate(15, months.CHESHVAN, 5769);
     * const hd2 = hd1.add(1, 'weeks'); // 7 Kislev 5769
     * const hd3 = hd1.add(-3, 'M'); // 30 Av 5768
     * @param {number} number
     * @param {string} [units]
     * @return {HDate}
     */
    function subtract(number) {
      var units = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'd';
      return this.add(number * -1, units);
    }
    /**
     * Returns the difference in days between the two given HDates.
     *
     * The result is positive if `this` date is comes chronologically
     * after the `other` date, and negative
     * if the order of the two dates is reversed.
     *
     * The result is zero if the two dates are identical.
     * @example
     * import {HDate, months} from '@hebcal/core';
     *
     * const hd1 = new HDate(25, months.KISLEV, 5770);
     * const hd2 = new HDate(15, months.CHESHVAN, 5769);
     * const days = hd1.deltaDays(hd2); // 394
     * @param {HDate} other Hebrew date to compare
     * @return {number}
     */

  }, {
    key: "deltaDays",
    value: function deltaDays(other) {
      if (!HDate.isHDate(other)) {
        throw new TypeError("Bad argument: ".concat(other));
      }

      return this.abs() - other.abs();
    }
    /**
     * Compares this date to another date, returning `true` if the dates match.
     * @param {HDate} other Hebrew date to compare
     * @return {boolean}
     */

  }, {
    key: "isSameDate",
    value: function isSameDate(other) {
      if (HDate.isHDate(other)) {
        return this.year == other.year && this.month == other.month && this.day == other.day;
      }

      return false;
    }
    /** @return {string} */

  }, {
    key: "toString",
    value: function toString() {
      var day = this.getDate();
      var fullYear = this.getFullYear();
      var monthName = this.getMonthName();
      return "".concat(day, " ").concat(monthName, " ").concat(fullYear);
    }
    /**
     * Returns true if Hebrew year is a leap year
     * @param {number} year Hebrew year
     * @return {boolean}
     */

  }], [{
    key: "hebrew2abs",
    value: function hebrew2abs(year, month, day) {
      var tempabs = day;

      if (month < TISHREI$2) {
        for (var m = TISHREI$2; m <= HDate.monthsInYear(year); m++) {
          tempabs += HDate.daysInMonth(m, year);
        }

        for (var _m = NISAN$2; _m < month; _m++) {
          tempabs += HDate.daysInMonth(_m, year);
        }
      } else {
        for (var _m2 = TISHREI$2; _m2 < month; _m2++) {
          tempabs += HDate.daysInMonth(_m2, year);
        }
      }

      return EPOCH + HDate.elapsedDays(year) + tempabs - 1;
    }
    /**
     * @private
     * @param {number} year
     * @return {number}
     */

  }, {
    key: "newYear",
    value: function newYear(year) {
      return EPOCH + HDate.elapsedDays(year) + HDate.newYearDelay(year);
    }
    /**
     * @private
     * @param {number} year
     * @return {number}
     */

  }, {
    key: "newYearDelay",
    value: function newYearDelay(year) {
      var ny1 = HDate.elapsedDays(year);
      var ny2 = HDate.elapsedDays(year + 1);

      if (ny2 - ny1 === 356) {
        return 2;
      } else {
        var ny0 = HDate.elapsedDays(year - 1);
        return ny1 - ny0 === 382 ? 1 : 0;
      }
    }
    /**
     * Converts absolute R.D. days to Hebrew date
     * @private
     * @param {number} abs absolute R.D. days
     * @return {SimpleHebrewDate}
     */

  }, {
    key: "abs2hebrew",
    value: function abs2hebrew(abs) {
      if (typeof abs !== 'number' || isNaN(abs)) {
        throw new TypeError("invalid parameter to abs2hebrew ".concat(abs));
      }

      abs = Math.trunc(abs); // first, quickly approximate year

      var year = Math.floor((abs - EPOCH) / AVG_HEBYEAR_DAYS);

      while (HDate.newYear(year) <= abs) {
        ++year;
      }

      --year;
      var month = abs < HDate.hebrew2abs(year, 1, 1) ? 7 : 1;

      while (abs > HDate.hebrew2abs(year, month, HDate.daysInMonth(month, year))) {
        ++month;
      }

      var day = 1 + abs - HDate.hebrew2abs(year, month, 1);
      return {
        yy: year,
        mm: month,
        dd: day
      };
    }
  }, {
    key: "getDayOfTranslation",
    value: function getDayOfTranslation(locale) {
      switch (locale) {
        case 'en':
        case 's':
        case 'a':
        case 'ashkenazi':
          return ' of';
      }

      var ofStr = Locale.lookupTranslation('of', locale);

      if (ofStr) {
        return ' ' + ofStr;
      }

      if ('ashkenazi' === locale.substring(0, 9)) {
        return ' of';
      }

      return '';
    }
  }, {
    key: "standardizeUnits",
    value: function standardizeUnits(units) {
      var full = UNITS_SINGLE[units] || String(units || '').toLowerCase().replace(/s$/, '');
      return UNITS_VALID[full] || throwTypeError$2("Invalid units '".concat(units, "'"));
    }
  }, {
    key: "isLeapYear",
    value: function isLeapYear(year) {
      return (1 + year * 7) % 19 < 7;
    }
    /**
     * Number of months in this Hebrew year (either 12 or 13 depending on leap year)
     * @param {number} year Hebrew year
     * @return {number}
     */

  }, {
    key: "monthsInYear",
    value: function monthsInYear(year) {
      return 12 + HDate.isLeapYear(year); // boolean is cast to 1 or 0
    }
    /**
     * Number of days in Hebrew month in a given year (29 or 30)
     * @param {number} month Hebrew month (e.g. months.TISHREI)
     * @param {number} year Hebrew year
     * @return {number}
     */

  }, {
    key: "daysInMonth",
    value: function daysInMonth(month, year) {
      if (month == IYYAR$1 || month == TAMUZ$1 || month == ELUL$2 || month == TEVET$2 || month == ADAR_II$2 || month == ADAR_I$2 && !HDate.isLeapYear(year) || month == CHESHVAN$2 && !HDate.longCheshvan(year) || month == KISLEV$2 && HDate.shortKislev(year)) {
        return 29;
      } else {
        return 30;
      }
    }
    /**
     * Returns a transliterated string name of Hebrew month in year,
     * for example 'Elul' or 'Cheshvan'.
     * @param {number} month Hebrew month (e.g. months.TISHREI)
     * @param {number} year Hebrew year
     * @return {string}
     */

  }, {
    key: "getMonthName",
    value: function getMonthName(month, year) {
      if (typeof month !== 'number' || month < 1 || month > 14) {
        throw new TypeError("bad month argument ".concat(month));
      }

      return monthNames[+HDate.isLeapYear(year)][month];
    }
    /**
     * Returns the Hebrew month number (NISAN=1, TISHREI=7)
     * @param {number|string} month A number, or Hebrew month name string
     * @return {number}
     */

  }, {
    key: "monthNum",
    value: function monthNum(month) {
      return typeof month === 'number' ? month : month.charCodeAt(0) >= 48 && month.charCodeAt(0) <= 57 ?
      /* number */
      parseInt(month, 10) : HDate.monthFromName(month);
    }
    /**
     * Days from sunday prior to start of Hebrew calendar to mean
     * conjunction of Tishrei in Hebrew YEAR
     * @param {number} year Hebrew year
     * @return {number}
     */

  }, {
    key: "elapsedDays",
    value: function elapsedDays(year) {
      var elapsed = edCache[year] = edCache[year] || HDate.elapsedDays0(year);
      return elapsed;
    }
    /**
     * Days from sunday prior to start of Hebrew calendar to mean
     * conjunction of Tishrei in Hebrew YEAR
     * @private
     * @param {number} year Hebrew year
     * @return {number}
     */

  }, {
    key: "elapsedDays0",
    value: function elapsedDays0(year) {
      var prevYear = year - 1;
      var mElapsed = 235 * Math.floor(prevYear / 19) + // Months in complete 19 year lunar (Metonic) cycles so far
      12 * (prevYear % 19) + // Regular months in this cycle
      Math.floor((prevYear % 19 * 7 + 1) / 19); // Leap months this cycle

      var pElapsed = 204 + 793 * (mElapsed % 1080);
      var hElapsed = 5 + 12 * mElapsed + 793 * Math.floor(mElapsed / 1080) + Math.floor(pElapsed / 1080);
      var parts = pElapsed % 1080 + 1080 * (hElapsed % 24);
      var day = 1 + 29 * mElapsed + Math.floor(hElapsed / 24);
      var altDay = day + (parts >= 19440 || 2 == day % 7 && parts >= 9924 && !HDate.isLeapYear(year) || 1 == day % 7 && parts >= 16789 && HDate.isLeapYear(prevYear));
      return altDay + (altDay % 7 === 0 || altDay % 7 == 3 || altDay % 7 == 5);
    }
    /**
     * Number of days in the hebrew YEAR
     * @param {number} year Hebrew year
     * @return {number}
     */

  }, {
    key: "daysInYear",
    value: function daysInYear(year) {
      return HDate.elapsedDays(year + 1) - HDate.elapsedDays(year);
    }
    /**
     * true if Cheshvan is long in Hebrew year
     * @param {number} year Hebrew year
     * @return {boolean}
     */

  }, {
    key: "longCheshvan",
    value: function longCheshvan(year) {
      return HDate.daysInYear(year) % 10 == 5;
    }
    /**
     * true if Kislev is short in Hebrew year
     * @param {number} year Hebrew year
     * @return {boolean}
     */

  }, {
    key: "shortKislev",
    value: function shortKislev(year) {
      return HDate.daysInYear(year) % 10 == 3;
    }
    /**
     * Converts Hebrew month string name to numeric
     * @param {string} monthName monthName
     * @return {number}
     */

  }, {
    key: "monthFromName",
    value: function monthFromName(monthName) {
      if (typeof monthName === 'number') return monthName;
      var c = monthName.toLowerCase();
      /*
      the Hebrew months are unique to their second letter
      N         Nisan  (November?)
      I         Iyyar
      E        Elul
      C        Cheshvan
      K        Kislev
      1        1Adar
      2        2Adar
      Si Sh     Sivan, Shvat
      Ta Ti Te Tamuz, Tishrei, Tevet
      Av Ad    Av, Adar
       אב אד אי אל   אב אדר אייר אלול
      ח            חשון
      ט            טבת
      כ            כסלו
      נ            ניסן
      ס            סיון
      ש            שבט
      תמ תש        תמוז תשרי
      */

      switch (c[0]) {
        case 'n':
        case 'נ':
          if (c[1] == 'o') {
            break;
            /* this catches "november" */
          }

          return NISAN$2;

        case 'i':
          return IYYAR$1;

        case 'e':
          return ELUL$2;

        case 'c':
        case 'ח':
          return CHESHVAN$2;

        case 'k':
        case 'כ':
          return KISLEV$2;

        case 's':
          switch (c[1]) {
            case 'i':
              return SIVAN$2;

            case 'h':
              return SHVAT$2;
          }

        case 't':
          switch (c[1]) {
            case 'a':
              return TAMUZ$1;

            case 'i':
              return TISHREI$2;

            case 'e':
              return TEVET$2;
          }

          break;

        case 'a':
          switch (c[1]) {
            case 'v':
              return AV$1;

            case 'd':
              if (/(1|[^i]i|a|א)$/i.test(monthName)) {
                return ADAR_I$2;
              }

              return ADAR_II$2;
            // else assume sheini
          }

          break;

        case 'ס':
          return SIVAN$2;

        case 'ט':
          return TEVET$2;

        case 'ש':
          return SHVAT$2;

        case 'א':
          switch (c[1]) {
            case 'ב':
              return AV$1;

            case 'ד':
              if (/(1|[^i]i|a|א)$/i.test(monthName)) {
                return ADAR_I$2;
              }

              return ADAR_II$2;
            // else assume sheini

            case 'י':
              return IYYAR$1;

            case 'ל':
              return ELUL$2;
          }

          break;

        case 'ת':
          switch (c[1]) {
            case 'מ':
              return TAMUZ$1;

            case 'ש':
              return TISHREI$2;
          }

          break;
      }

      throw new RangeError("Unable to parse month name: ".concat(monthName));
    }
    /**
     * Note: Applying this function to d+6 gives us the DAYNAME on or after an
     * absolute day d. Similarly, applying it to d+3 gives the DAYNAME nearest to
     * absolute date d, applying it to d-1 gives the DAYNAME previous to absolute
     * date d, and applying it to d+7 gives the DAYNAME following absolute date d.
     * @param {number} dayOfWeek
     * @param {number} absdate
     * @return {number}
     */

  }, {
    key: "dayOnOrBefore",
    value: function dayOnOrBefore(dayOfWeek, absdate) {
      return absdate - (absdate - dayOfWeek) % 7;
    }
    /**
     * Tests if the object is an instance of `HDate`
     * @param {any} obj
     * @return {boolean}
     */

  }, {
    key: "isHDate",
    value: function isHDate(obj) {
      return obj !== null && _typeof(obj) === 'object' && typeof obj.year === 'number' && typeof obj.month === 'number' && typeof obj.day === 'number' && typeof obj.greg === 'function' && typeof obj.abs === 'function';
    }
  }]);

  return HDate;
}();
/**
 * @private
 * @param {HDate} date
 */

function fix(date) {
  fixMonth(date);
  fixDate(date);
}
/**
 * @private
 * @param {HDate} date
 */


function fixDate(date) {
  if (date.day < 1) {
    if (date.month == TISHREI$2) {
      date.year -= 1;
    }

    date.day += HDate$1.daysInMonth(date.month, date.year);
    date.month -= 1;
    fix(date);
  }

  if (date.day > HDate$1.daysInMonth(date.month, date.year)) {
    if (date.month == ELUL$2) {
      date.year += 1;
    }

    date.day -= HDate$1.daysInMonth(date.month, date.year);
    date.month += 1;
    fix(date);
  }

  fixMonth(date);
}
/**
 * @private
 * @param {HDate} date
 */


function fixMonth(date) {
  if (date.month == ADAR_II$2 && !date.isLeapYear()) {
    date.month -= 1; // to Adar I

    fix(date);
  } else if (date.month < 1) {
    date.month += HDate$1.monthsInYear(date.year);
    date.year -= 1;
    fix(date);
  } else if (date.month > HDate$1.monthsInYear(date.year)) {
    date.month -= HDate$1.monthsInYear(date.year);
    date.year += 1;
    fix(date);
  }

  delete date.abs0;
}
/**
 * @private
 * @param {number} day
 * @param {HDate} t
 * @param {number} offset
 * @return {HDate}
 */


function _onOrBefore(day, t, offset) {
  return new HDate$1(HDate$1.dayOnOrBefore(day, t.abs() + offset));
}

var CHAG$1 = 0x000001;
var LIGHT_CANDLES$2 = 0x000002;
var YOM_TOV_ENDS$2 = 0x000004;
var CHUL_ONLY$2 = 0x000008; // chutz l'aretz (Diaspora)

var IL_ONLY$2 = 0x000010; // b'aretz (Israel)

var LIGHT_CANDLES_TZEIS$2 = 0x000020;
var CHANUKAH_CANDLES$2 = 0x000040;
var ROSH_CHODESH$1 = 0x000080;
var MINOR_FAST$2 = 0x000100;
var SPECIAL_SHABBAT$2 = 0x000200;
var PARSHA_HASHAVUA$1 = 0x000400;
var DAF_YOMI$1 = 0x000800;
var OMER_COUNT$1 = 0x001000;
var MODERN_HOLIDAY$2 = 0x002000;
var MAJOR_FAST$2 = 0x004000;
var SHABBAT_MEVARCHIM$1 = 0x008000;
var MOLAD = 0x010000;
var USER_EVENT = 0x020000;
var HEBREW_DATE = 0x040000;
var MINOR_HOLIDAY$2 = 0x080000;
var EREV$2 = 0x100000;
var CHOL_HAMOED$2 = 0x200000;
/**
 * Holiday flags for Event
 * @readonly
 * @enum {number}
 */

var flags = {
  /** Chag, yontiff, yom tov */
  CHAG: CHAG$1,

  /** Light candles 18 minutes before sundown */
  LIGHT_CANDLES: LIGHT_CANDLES$2,

  /** End of holiday (end of Yom Tov)  */
  YOM_TOV_ENDS: YOM_TOV_ENDS$2,

  /** Observed only in the Diaspora (chutz l'aretz)  */
  CHUL_ONLY: CHUL_ONLY$2,

  /** Observed only in Israel */
  IL_ONLY: IL_ONLY$2,

  /** Light candles in the evening at Tzeit time (3 small stars) */
  LIGHT_CANDLES_TZEIS: LIGHT_CANDLES_TZEIS$2,

  /** Candle-lighting for Chanukah */
  CHANUKAH_CANDLES: CHANUKAH_CANDLES$2,

  /** Rosh Chodesh, beginning of a new Hebrew month */
  ROSH_CHODESH: ROSH_CHODESH$1,

  /** Minor fasts like Tzom Tammuz, Ta'anit Esther, ... */
  MINOR_FAST: MINOR_FAST$2,

  /** Shabbat Shekalim, Zachor, ... */
  SPECIAL_SHABBAT: SPECIAL_SHABBAT$2,

  /** Weekly sedrot on Saturdays */
  PARSHA_HASHAVUA: PARSHA_HASHAVUA$1,

  /** Daily page of Talmud */
  DAF_YOMI: DAF_YOMI$1,

  /** Days of the Omer */
  OMER_COUNT: OMER_COUNT$1,

  /** Yom HaShoah, Yom HaAtzma'ut, ... */
  MODERN_HOLIDAY: MODERN_HOLIDAY$2,

  /** Yom Kippur and Tish'a B'Av */
  MAJOR_FAST: MAJOR_FAST$2,

  /** On the Saturday before Rosh Chodesh */
  SHABBAT_MEVARCHIM: SHABBAT_MEVARCHIM$1,

  /** Molad */
  MOLAD: MOLAD,

  /** Yahrzeit or Hebrew Anniversary */
  USER_EVENT: USER_EVENT,

  /** Daily Hebrew date ("11th of Sivan, 5780") */
  HEBREW_DATE: HEBREW_DATE,

  /** A holiday that's not major, modern, rosh chodesh, or a fast day */
  MINOR_HOLIDAY: MINOR_HOLIDAY$2,

  /** Evening before a major or minor holiday */
  EREV: EREV$2,

  /** Chol haMoed, intermediate days of Pesach or Sukkot */
  CHOL_HAMOED: CHOL_HAMOED$2
};
/** Represents an Event with a title, date, and flags */

var Event = /*#__PURE__*/function () {
  /**
   * Constructs Event
   * @param {HDate} date Hebrew date event occurs
   * @param {string} desc Description (not translated)
   * @param {number} [mask=0] optional bitmask of holiday flags (see {@link flags})
   * @param {Object} [attrs={}] optional additional attributes (e.g. `eventTimeStr`, `cholHaMoedDay`)
   */
  function Event(date, desc, mask, attrs) {
    var _this = this;

    _classCallCheck(this, Event);

    this.date = date;
    this.desc = desc;
    this.mask = +mask;

    if (_typeof(attrs) === 'object' && attrs !== null) {
      Object.keys(attrs).forEach(function (k) {
        return _this[k] = attrs[k];
      });
    }
  }
  /**
   * Hebrew date of this event
   * @return {HDate}
   */


  _createClass(Event, [{
    key: "getDate",
    value: function getDate() {
      return this.date;
    }
    /**
     * Untranslated description of this event
     * @return {string}
     */

  }, {
    key: "getDesc",
    value: function getDesc() {
      return this.desc;
    }
    /**
     * Bitmask of optional event flags. See {@link flags}
     * @return {number}
     */

  }, {
    key: "getFlags",
    value: function getFlags() {
      return this.mask;
    }
    /**
     * Returns (translated) description of this event
     * @example
     * const ev = new Event(new HDate(6, 'Sivan', 5749), 'Shavuot', flags.CHAG);
     * ev.render(); // 'Shavuot'
     * ev.render('he'); // 'שָׁבוּעוֹת'
     * ev.render('ashkenazi'); // 'Shavuos'
     * @param {string} [locale] Optional locale name (defaults to active locale).
     * @return {string}
     */

  }, {
    key: "render",
    value: function render(locale) {
      return Locale.gettext(this.desc, locale);
    }
    /**
     * Returns a brief (translated) description of this event.
     * For most events, this is the same as render(). For some events, it procudes
     * a shorter text (e.g. without a time or added description).
     * @param {string} [locale] Optional locale name (defaults to active locale).
     * @return {string}
     */

  }, {
    key: "renderBrief",
    value: function renderBrief(locale) {
      return this.render(locale);
    }
    /**
     * Optional holiday-specific Emoji or `null`.
     * @return {string}
     */

  }, {
    key: "getEmoji",
    value: function getEmoji() {
      return this.emoji || null;
    }
    /**
     * Returns a simplified (untranslated) description for this event. For example,
     * the {@link HolidayEvent} class supports
     * "Erev Pesach" => "Pesach", and "Sukkot III (CH''M)" => "Sukkot".
     * For many holidays the basename and the event description are the same.
     * @return {string}
     */

  }, {
    key: "basename",
    value: function basename() {
      return this.getDesc();
    }
    /**
     * Returns a URL to hebcal.com or sefaria.org for more detail on the event.
     * Returns `undefined` for events with no detail page.
     * @return {string}
     */

  }, {
    key: "url",
    value: function url() {
      return undefined;
    }
    /**
     * Is this event observed in Israel?
     * @example
     * const ev1 = new Event(new HDate(7, 'Sivan', 5749), 'Shavuot II', flags.CHAG | flags.CHUL_ONLY);
     * ev1.observedInIsrael(); // false
     * const ev2 = new Event(new HDate(26, 'Kislev', 5749), 'Chanukah: 3 Candles', 0);
     * ev2.observedInIsrael(); // true
     * @return {boolean}
     */

  }, {
    key: "observedInIsrael",
    value: function observedInIsrael() {
      return !(this.mask & CHUL_ONLY$2);
    }
    /**
     * Is this event observed in the Diaspora?
     * @example
     * const ev1 = new Event(new HDate(7, 'Sivan', 5749), 'Shavuot II', flags.CHAG | flags.CHUL_ONLY);
     * ev1.observedInDiaspora(); // true
     * const ev2 = new Event(new HDate(26, 'Kislev', 5749), 'Chanukah: 3 Candles', 0);
     * ev2.observedInDiaspora(); // true
     * @return {boolean}
     */

  }, {
    key: "observedInDiaspora",
    value: function observedInDiaspora() {
      return !(this.mask & IL_ONLY$2);
    }
    /**
     * @deprecated
     * Optional additional event attributes (e.g. `eventTimeStr`, `cholHaMoedDay`)
     * @return {Object}
     */

  }, {
    key: "getAttrs",
    value: function getAttrs() {
      return this;
    }
    /**
     * Makes a clone of this Event object
     * @return {Event}
     */

  }, {
    key: "clone",
    value: function clone() {
      var ev = new this.constructor();

      for (var property in this) {
        if (this.hasOwnProperty(property)) {
          ev[property] = this[property];
        }
      }

      return ev;
    }
  }]);

  return Event;
}();
var KEYCAP_DIGITS = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

/** Daily Hebrew date ("11th of Sivan, 5780") */

var HebrewDateEvent = /*#__PURE__*/function (_Event) {
  _inherits(HebrewDateEvent, _Event);

  var _super = _createSuper(HebrewDateEvent);

  /**
   * @param {HDate} date
   */
  function HebrewDateEvent(date) {
    _classCallCheck(this, HebrewDateEvent);

    return _super.call(this, date, date.toString(), flags.HEBREW_DATE);
  }
  /**
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @example
   * import {HDate, HebrewDateEvent, months} from '@hebcal/core';
   *
   * const hd = new HDate(15, months.CHESHVAN, 5769);
   * const ev = new HebrewDateEvent(hd);
   * console.log(ev.render()); // '15th of Cheshvan, 5769'
   * console.log(ev.render('he')); // 'ט״ו חֶשְׁוָן תשס״ט'
   * @return {string}
   */


  _createClass(HebrewDateEvent, [{
    key: "render",
    value: function render(locale) {
      var locale1 = locale && locale.toLowerCase();
      var locale0 = locale1 || Locale.getLocaleName();
      var hd = this.getDate();

      switch (locale0) {
        case 'h':
        case 'he':
        case 'he-x-nonikud':
          var dd = hd.getDate();
          var mm = Locale.gettext(hd.getMonthName(), locale0);
          var yy = hd.getFullYear();
          return gematriya(dd) + ' ' + mm + ' ' + gematriya(yy);

        default:
          return hd.render(locale0, true);
      }
    }
    /**
     * @param {string} [locale] Optional locale name (defaults to active locale).
     * @example
     * import {HDate, HebrewDateEvent, months} from '@hebcal/core';
     *
     * const hd = new HDate(15, months.CHESHVAN, 5769);
     * const ev = new HebrewDateEvent(hd);
     * console.log(ev.renderBrief()); // '15th of Cheshvan'
     * console.log(ev.renderBrief('he')); // 'ט״ו חֶשְׁוָן'
     * @return {string}
     */

  }, {
    key: "renderBrief",
    value: function renderBrief(locale) {
      var locale1 = locale && locale.toLowerCase();
      var locale0 = locale1 || Locale.getLocaleName();
      var hd = this.getDate();

      if (hd.getMonth() === months.TISHREI && hd.getDate() === 1) {
        return this.render(locale0);
      }

      switch (locale0) {
        case 'h':
        case 'he':
        case 'he-x-nonikud':
          var dd = hd.getDate();
          var mm = Locale.gettext(hd.getMonthName(), locale0);
          return gematriya(dd) + ' ' + mm;

        default:
          return hd.render(locale0, false);
      }
    }
    /**
     * Helper function to render a Hebrew date
     * @deprecated
     * @param {number} day
     * @param {string} monthName
     * @param {number} fullYear
     * @return {string}
     */

  }], [{
    key: "renderHebrew",
    value: function renderHebrew(day, monthName, fullYear) {
      return gematriya(day) + ' ' + monthName + ' ' + gematriya(fullYear);
    }
  }]);

  return HebrewDateEvent;
}(Event);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var sun = {};

Object.defineProperty(sun, "__esModule", {
  value: true
});
var Sun_1 = sun.Sun = void 0;

var Sun = /*#__PURE__*/function () {
  function Sun(date, latitude, longitude) {
    _classCallCheck(this, Sun);

    this.date = date;
    this.latitude = latitude;
    this.longitude = longitude;
    this.julianDate = getJD(date);
  }

  _createClass(Sun, [{
    key: "solarNoon",
    get: function get() {
      return calcSolNoon(this.julianDate, this.longitude, this.date);
    }
  }, {
    key: "timeAtAngle",
    value: function timeAtAngle(angle, rising) {
      return calcSunriseSet(rising, angle, this.julianDate, this.date, this.latitude, this.longitude);
    }
  }]);

  return Sun;
}();

Sun_1 = sun.Sun = Sun;

function formatDate(date, minutes) {
  var seconds = (minutes - Math.floor(minutes)) * 60;
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, minutes, seconds));
}

function calcTimeJulianCent(jd) {
  var T = (jd - 2451545.0) / 36525.0;
  return T;
}

function radToDeg(angleRad) {
  return 180.0 * angleRad / Math.PI;
}

function degToRad(angleDeg) {
  return Math.PI * angleDeg / 180.0;
}

function calcGeomMeanLongSun(t) {
  var L0 = 280.46646 + t * (36000.76983 + t * 0.0003032);

  while (L0 > 360.0) {
    L0 -= 360.0;
  }

  while (L0 < 0.0) {
    L0 += 360.0;
  }

  return L0; // in degrees
}

function calcGeomMeanAnomalySun(t) {
  var M = 357.52911 + t * (35999.05029 - 0.0001537 * t);
  return M; // in degrees
}

function calcEccentricityEarthOrbit(t) {
  var e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
  return e; // unitless
}

function calcSunEqOfCenter(t) {
  var m = calcGeomMeanAnomalySun(t);
  var mrad = degToRad(m);
  var sinm = Math.sin(mrad);
  var sin2m = Math.sin(mrad + mrad);
  var sin3m = Math.sin(mrad + mrad + mrad);
  var C = sinm * (1.914602 - t * (0.004817 + 0.000014 * t)) + sin2m * (0.019993 - 0.000101 * t) + sin3m * 0.000289;
  return C; // in degrees
}

function calcSunTrueLong(t) {
  var l0 = calcGeomMeanLongSun(t);
  var c = calcSunEqOfCenter(t);
  var O = l0 + c;
  return O; // in degrees
}

function calcSunApparentLong(t) {
  var o = calcSunTrueLong(t);
  var omega = 125.04 - 1934.136 * t;
  var lambda = o - 0.00569 - 0.00478 * Math.sin(degToRad(omega));
  return lambda; // in degrees
}

function calcMeanObliquityOfEcliptic(t) {
  var seconds = 21.448 - t * (46.8150 + t * (0.00059 - t * 0.001813));
  var e0 = 23.0 + (26.0 + seconds / 60.0) / 60.0;
  return e0; // in degrees
}

function calcObliquityCorrection(t) {
  var e0 = calcMeanObliquityOfEcliptic(t);
  var omega = 125.04 - 1934.136 * t;
  var e = e0 + 0.00256 * Math.cos(degToRad(omega));
  return e; // in degrees
}

function calcSunDeclination(t) {
  var e = calcObliquityCorrection(t);
  var lambda = calcSunApparentLong(t);
  var sint = Math.sin(degToRad(e)) * Math.sin(degToRad(lambda));
  var theta = radToDeg(Math.asin(sint));
  return theta; // in degrees
}

function calcEquationOfTime(t) {
  var epsilon = calcObliquityCorrection(t);
  var l0 = calcGeomMeanLongSun(t);
  var e = calcEccentricityEarthOrbit(t);
  var m = calcGeomMeanAnomalySun(t);
  var y = Math.tan(degToRad(epsilon) / 2.0);
  y *= y;
  var sin2l0 = Math.sin(2.0 * degToRad(l0));
  var sinm = Math.sin(degToRad(m));
  var cos2l0 = Math.cos(2.0 * degToRad(l0));
  var sin4l0 = Math.sin(4.0 * degToRad(l0));
  var sin2m = Math.sin(2.0 * degToRad(m));
  var Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0 - 0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;
  return radToDeg(Etime) * 4.0; // in minutes of time
}

function calcHourAngle(angle, lat, solarDec) {
  var latRad = degToRad(lat);
  var sdRad = degToRad(solarDec);
  var HAarg = Math.cos(degToRad(90 + angle)) / (Math.cos(latRad) * Math.cos(sdRad)) - Math.tan(latRad) * Math.tan(sdRad);
  var HA = Math.acos(HAarg);
  return HA; // in radians (for sunset, use -HA)
}

function isNumber(inputVal) {
  var oneDecimal = false;
  var inputStr = "".concat(inputVal);

  for (var i = 0; i < inputStr.length; i++) {
    var oneChar = inputStr.charAt(i);

    if (i === 0 && (oneChar === '-' || oneChar === '+')) {
      continue;
    }

    if (oneChar === '.' && !oneDecimal) {
      oneDecimal = true;
      continue;
    }

    if (oneChar < '0' || oneChar > '9') {
      return false;
    }
  }

  return true;
}

function getJD(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  if (month < 3) {
    year--;
    month += 12;
  }

  var A = Math.floor(year / 100);
  var B = 2 - A + Math.floor(A / 4);
  var JD = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
  return JD;
}

function calcSolNoon(jd, longitude, date) {
  var tnoon = calcTimeJulianCent(jd - longitude / 360.0);
  var eqTime = calcEquationOfTime(tnoon);
  var solNoonOffset = 720.0 - longitude * 4 - eqTime; // in minutes

  var newt = calcTimeJulianCent(jd + solNoonOffset / 1440.0);
  eqTime = calcEquationOfTime(newt);
  var solNoonLocal = 720 - longitude * 4 - eqTime; // in minutes

  while (solNoonLocal < 0.0) {
    solNoonLocal += 1440.0;
  }

  while (solNoonLocal >= 1440.0) {
    solNoonLocal -= 1440.0;
  }

  return formatDate(date, solNoonLocal); // return timeString(solNoonLocal, 3);
}

function calcSunriseSetUTC(rise, angle, JD, latitude, longitude) {
  var t = calcTimeJulianCent(JD);
  var eqTime = calcEquationOfTime(t);
  var solarDec = calcSunDeclination(t);
  var hourAngle = calcHourAngle(angle, latitude, solarDec); //alert("HA = " + radToDeg(hourAngle));

  if (!rise) hourAngle = -hourAngle;
  var delta = longitude + radToDeg(hourAngle);
  var timeUTC = 720 - 4.0 * delta - eqTime; // in minutes

  return timeUTC;
}

function calcSunriseSet(rise, angle, JD, date, latitude, longitude) // rise = 1 for sunrise, 0 for sunset
{
  var timeUTC = calcSunriseSetUTC(rise, angle, JD, latitude, longitude);
  var newTimeUTC = calcSunriseSetUTC(rise, angle, JD + timeUTC / 1440.0, latitude, longitude);

  if (isNumber(newTimeUTC)) {
    return formatDate(date, newTimeUTC);
  } else {
    // no sunrise/set found
    return new Date(NaN);
  }
}

var _formatters = {};
/**
 * @private
 * @param {string} tzid
 * @return {Intl.DateTimeFormat}
 */

function getFormatter$1(tzid) {
  var fmt = _formatters[tzid];
  if (fmt) return fmt;
  var f = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: tzid
  });
  _formatters[tzid] = f;
  return f;
}

var dateFormatRegex = /^(\d+).(\d+).(\d+),?\s+(\d+).(\d+).(\d+)/;
/**
 * @private
 * @param {string} tzid
 * @param {Date} date
 * @return {string}
 */

function getPseudoISO(tzid, date) {
  var str = getFormatter$1(tzid).format(date);
  var m = dateFormatRegex.exec(str);
  var hour = m[4];
  if (hour == '24') hour = '00';
  m[3] = pad4(m[3]);
  return "".concat(m[3], "-").concat(m[1], "-").concat(m[2], "T").concat(hour, ":").concat(m[5], ":").concat(m[6], "Z");
}
/**
 * @private
 * @param {string} tzid
 * @param {Date} date
 * @return {number}
 */

function getTimezoneOffset(tzid, date) {
  var utcStr = getPseudoISO('UTC', date);
  var localStr = getPseudoISO(tzid, date);
  var diffMs = new Date(utcStr).getTime() - new Date(localStr).getTime();
  return Math.ceil(diffMs / 1000 / 60);
}
/**
 * @private
 * @param {number} number
 * @return {string}
 */

function pad4(number) {
  if (number < 0) {
    return '-00' + pad4(-number);
  } else if (number < 10) {
    return '000' + number;
  } else if (number < 100) {
    return '00' + number;
  } else if (number < 1000) {
    return '0' + number;
  }

  return String(number);
}

function throwTypeError$1(error) {
  throw new TypeError(error);
}
/**
 * @private
 * @param {number} number
 * @return {string}
 */


function pad2(number) {
  if (number < 10) {
    return '0' + number;
  }

  return String(number);
}
/**
 * @typedef {Object} ZmanimTimesResult
 * @property {Date} dawn
 * @property {Date} dusk
 * @property {Date} goldenHour
 * @property {Date} goldenHourEnd
 * @property {Date} nauticalDawn
 * @property {Date} nauticalDusk
 * @property {Date} night
 * @property {Date} nightEnd
 * @property {Date} solarNoon
 * @property {Date} sunrise
 * @property {Date} sunriseEnd
 * @property {Date} sunset
 * @property {Date} sunsetStart
 * @property {Date} alotHaShachar
 * @property {Date} misheyakir
 * @property {Date} misheyakirMachmir
 * @property {Date} tzeit
*/

/** Class representing halachic times */


var Zmanim = /*#__PURE__*/function () {
  /**
     * Initialize a Zmanim instance.
     * @param {Date|HDate} date Regular or Hebrew Date. If `date` is a regular `Date`,
     *    hours, minutes, seconds and milliseconds are ignored.
     * @param {number} latitude
     * @param {number} longitude
     */
  function Zmanim(date, latitude, longitude) {
    _classCallCheck(this, Zmanim);

    if (typeof latitude !== 'number') throw new TypeError('Invalid latitude');
    if (typeof longitude !== 'number') throw new TypeError('Invalid longitude');

    if (latitude < -90 || latitude > 90) {
      throw new RangeError("Latitude ".concat(latitude, " out of range [-90,90]"));
    }

    if (longitude < -180 || longitude > 180) {
      throw new RangeError("Longitude ".concat(longitude, " out of range [-180,180]"));
    }

    var dt = greg.isDate(date) ? date : HDate$1.isHDate(date) ? date.greg() : throwTypeError$1("invalid date: ".concat(date));
    this.date = dt;
    this.sun = new Sun_1(this.date, latitude, longitude);
    this.latitude = latitude;
    this.longitude = longitude;
  }
  /**
   * @deprecated
   * @return {ZmanimTimesResult}
   */


  _createClass(Zmanim, [{
    key: "suntime",
    value: function suntime() {
      return {
        solarNoon: this.sun.solarNoon,
        sunrise: this.sunrise(),
        sunset: this.sunset(),
        sunriseEnd: this.sun.timeAtAngle(0.3, true),
        sunsetStart: this.sun.timeAtAngle(0.3, false),
        dawn: this.dawn(),
        dusk: this.dusk(),
        nauticalDawn: this.sun.timeAtAngle(12, true),
        nauticalDusk: this.sun.timeAtAngle(12, false),
        nightEnd: this.sun.timeAtAngle(18, true),
        night: this.sun.timeAtAngle(18, false),
        goldenHourEnd: this.sun.timeAtAngle(-6, true),
        goldenHour: this.sun.timeAtAngle(-6, false),
        alotHaShachar: this.alotHaShachar(),
        misheyakir: this.misheyakir(),
        misheyakirMachmir: this.misheyakirMachmir(),
        tzeit: this.tzeit()
      };
    }
    /** @return {Date} */

  }, {
    key: "sunrise",
    value: function sunrise() {
      return this.sun.timeAtAngle(0.833333, true);
    }
    /** @return {Date} */

  }, {
    key: "sunset",
    value: function sunset() {
      return this.sun.timeAtAngle(0.833333, false);
    }
    /** @return {Date} */

  }, {
    key: "dawn",
    value: function dawn() {
      return this.sun.timeAtAngle(6, true);
    }
    /** @return {Date} */

  }, {
    key: "dusk",
    value: function dusk() {
      return this.sun.timeAtAngle(6, false);
    }
    /** @return {number} */

  }, {
    key: "hour",
    value: function hour() {
      return (this.sunset() - this.sunrise()) / 12; // ms in hour
    }
    /** @return {number} */

  }, {
    key: "hourMins",
    value: function hourMins() {
      // hour in ms / (1000 ms in s * 60 s in m) = mins in halachic hour
      return this.hour() / (1000 * 60);
    }
    /** @return {Date} */

  }, {
    key: "gregEve",
    value: function gregEve() {
      var prev = new Date(this.date);
      prev.setDate(prev.getDate() - 1);
      var zman = new Zmanim(prev, this.latitude, this.longitude);
      return zman.sunset();
    }
    /** @return {number} */

  }, {
    key: "nightHour",
    value: function nightHour() {
      return (this.sunrise() - this.gregEve()) / 12; // ms in hour
    }
    /** @return {number} */

  }, {
    key: "nightHourMins",
    value: function nightHourMins() {
      // hour in ms / (1000 ms in s * 60 s in m) = mins in halachic hour
      return this.nightHour() / (1000 * 60);
    }
    /**
       * @param {number} hours
       * @return {Date}
       */

  }, {
    key: "hourOffset",
    value: function hourOffset(hours) {
      return new Date(this.sunrise().getTime() + this.hour() * hours);
    }
    /** @return {Date} */

  }, {
    key: "chatzot",
    value: function chatzot() {
      return this.hourOffset(6);
    }
    /** @return {Date} */

  }, {
    key: "chatzotNight",
    value: function chatzotNight() {
      return new Date(this.sunrise().getTime() - this.nightHour() * 6);
    }
    /** @return {Date} */

  }, {
    key: "alotHaShachar",
    value: function alotHaShachar() {
      return this.sun.timeAtAngle(16.1, true);
    }
    /** @return {Date} */

  }, {
    key: "misheyakir",
    value: function misheyakir() {
      return this.sun.timeAtAngle(11.5, true);
    }
    /** @return {Date} */

  }, {
    key: "misheyakirMachmir",
    value: function misheyakirMachmir() {
      return this.sun.timeAtAngle(10.2, true);
    }
    /** @return {Date} */

  }, {
    key: "sofZmanShma",
    value: function sofZmanShma() {
      // Gra
      return this.hourOffset(3);
    }
    /** @return {Date} */

  }, {
    key: "sofZmanTfilla",
    value: function sofZmanTfilla() {
      // Gra
      return this.hourOffset(4);
    }
    /** @return {Date} */

  }, {
    key: "minchaGedola",
    value: function minchaGedola() {
      return this.hourOffset(6.5);
    }
    /** @return {Date} */

  }, {
    key: "minchaKetana",
    value: function minchaKetana() {
      return this.hourOffset(9.5);
    }
    /** @return {Date} */

  }, {
    key: "plagHaMincha",
    value: function plagHaMincha() {
      return this.hourOffset(10.75);
    }
    /**
     * @param {number} [angle=8.5] optional time for solar depression.
     *   Default is 8.5 degrees for 3 small stars, use 7.083 degress for 3 medium-sized stars.
     * @return {Date}
     */

  }, {
    key: "tzeit",
    value: function tzeit() {
      var angle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8.5;
      return this.sun.timeAtAngle(angle, false);
    }
    /** @return {Date} */

  }, {
    key: "neitzHaChama",
    value: function neitzHaChama() {
      return this.sunrise();
    }
    /** @return {Date} */

  }, {
    key: "shkiah",
    value: function shkiah() {
      return this.sunset();
    }
    /**
     * Uses timeFormat to return a date like '20:34'
     * @param {Date} dt
     * @param {Intl.DateTimeFormat} timeFormat
     * @return {string}
     */

  }, {
    key: "sunsetOffset",
    value:
    /**
     * Returns sunset + offset (either positive or negative).
     * @param {number} offset
     * @return {Date}
     */
    function sunsetOffset(offset) {
      var sunset = this.sunset();

      if (isNaN(sunset.getTime())) {
        return sunset;
      } // For Havdalah only, round up to next minute if needed


      if (offset > 0 && sunset.getSeconds() >= 30) {
        offset++;
      }

      sunset.setSeconds(0);
      return new Date(sunset.getTime() + offset * 60 * 1000);
    }
    /**
     * Returns an array with sunset + offset Date object, and a 24-hour string formatted time.
     * @deprecated
     * @param {number} offset
     * @param {Intl.DateTimeFormat} timeFormat
     * @return {Object[]}
     */

  }, {
    key: "sunsetOffsetTime",
    value: function sunsetOffsetTime(offset, timeFormat) {
      var dt = this.sunsetOffset(offset);

      if (isNaN(dt.getTime())) {
        // `No sunset for ${location} on ${hd}`
        return [undefined, undefined];
      }

      var time = Zmanim.formatTime(dt, timeFormat);
      return [dt, time];
    }
    /**
     * Returns an array with tzeit Date object and a 24-hour string formatted time.
     * @deprecated
     * @param {number} angle degrees for solar depression.
     *   Default is 8.5 degrees for 3 small stars, use 7.083 degress for 3 medium-sized stars.
     * @param {Intl.DateTimeFormat} timeFormat
     * @return {Object[]}
     */

  }, {
    key: "tzeitTime",
    value: function tzeitTime(angle, timeFormat) {
      var dt = this.tzeit(angle);

      if (isNaN(dt.getTime())) {
        return [undefined, undefined];
      }

      var time = Zmanim.roundTime(dt);
      var timeStr = Zmanim.formatTime(time, timeFormat);
      return [time, timeStr];
    }
  }], [{
    key: "formatTime",
    value: function formatTime(dt, timeFormat) {
      var time = timeFormat.format(dt);
      var hm = time.split(':');

      if (hm[0] === '24') {
        return '00:' + hm[1];
      }

      return time;
    }
    /**
     * Discards seconds, rounding to nearest minute.
     * @param {Date} dt
     * @return {Date}
     */

  }, {
    key: "roundTime",
    value: function roundTime(dt) {
      var millis = dt.getTime();

      if (isNaN(millis)) {
        return dt;
      } // Round up to next minute if needed


      var millisOnly = dt.getMilliseconds();
      var seconds = dt.getSeconds();

      if (seconds === 0 && millisOnly === 0) {
        return dt;
      }

      var secAndMillis = seconds * 1000 + millisOnly;
      var delta = secAndMillis >= 30000 ? 60000 - secAndMillis : -1 * secAndMillis;
      return new Date(millis + delta);
    }
    /**
     * Get offset string (like "+05:00" or "-08:00") from tzid (like "Europe/Moscow")
     * @param {string} tzid
     * @param {Date} date
     * @return {string}
     */

  }, {
    key: "timeZoneOffset",
    value: function timeZoneOffset(tzid, date) {
      var offset = getTimezoneOffset(tzid, date);
      var offsetAbs = Math.abs(offset);
      var hours = Math.floor(offsetAbs / 60);
      var minutes = offsetAbs % 60;
      return (offset < 0 ? '+' : '-') + pad2(hours) + ':' + pad2(minutes);
    }
    /**
     * Returns a string like "2022-04-01T13:06:00-11:00"
     * @param {string} tzid
     * @param {Date} date
     * @return {string}
     */

  }, {
    key: "formatISOWithTimeZone",
    value: function formatISOWithTimeZone(tzid, date) {
      if (isNaN(date.getTime())) {
        return null;
      }

      return getPseudoISO(tzid, date).substring(0, 19) + Zmanim.timeZoneOffset(tzid, date);
    }
  }]);

  return Zmanim;
}();

var classicCities0 = [['Ashdod', 'IL', 31.79213, 34.64966, 'Asia/Jerusalem'], ['Atlanta', 'US', 33.749, -84.38798, 'America/New_York'], ['Austin', 'US', 30.26715, -97.74306, 'America/Chicago'], ['Baghdad', 'IQ', 33.34058, 44.40088, 'Asia/Baghdad'], ['Beer Sheva', 'IL', 31.25181, 34.7913, 'Asia/Jerusalem'], ['Berlin', 'DE', 52.52437, 13.41053, 'Europe/Berlin'], ['Baltimore', 'US', 39.29038, -76.61219, 'America/New_York'], ['Bogota', 'CO', 4.60971, -74.08175, 'America/Bogota'], ['Boston', 'US', 42.35843, -71.05977, 'America/New_York'], ['Budapest', 'HU', 47.49801, 19.03991, 'Europe/Budapest'], ['Buenos Aires', 'AR', -34.61315, -58.37723, 'America/Argentina/Buenos_Aires'], ['Buffalo', 'US', 42.88645, -78.87837, 'America/New_York'], ['Chicago', 'US', 41.85003, -87.65005, 'America/Chicago'], ['Cincinnati', 'US', 39.162, -84.45689, 'America/New_York'], ['Cleveland', 'US', 41.4995, -81.69541, 'America/New_York'], ['Dallas', 'US', 32.78306, -96.80667, 'America/Chicago'], ['Denver', 'US', 39.73915, -104.9847, 'America/Denver'], ['Detroit', 'US', 42.33143, -83.04575, 'America/Detroit'], ['Eilat', 'IL', 29.55805, 34.94821, 'Asia/Jerusalem'], ['Gibraltar', 'GI', 36.14474, -5.35257, 'Europe/Gibraltar'], ['Haifa', 'IL', 32.81841, 34.9885, 'Asia/Jerusalem'], ['Hawaii', 'US', 21.30694, -157.85833, 'Pacific/Honolulu'], ['Helsinki', 'FI', 60.16952, 24.93545, 'Europe/Helsinki'], ['Houston', 'US', 29.76328, -95.36327, 'America/Chicago'], ['Jerusalem', 'IL', 31.76904, 35.21633, 'Asia/Jerusalem'], ['Johannesburg', 'ZA', -26.20227, 28.04363, 'Africa/Johannesburg'], ['Kiev', 'UA', 50.45466, 30.5238, 'Europe/Kiev'], ['La Paz', 'BO', -16.5, -68.15, 'America/La_Paz'], ['Livingston', 'US', 40.79593, -74.31487, 'America/New_York'], ['Las Vegas', 'US', 36.17497, -115.13722, 'America/Los_Angeles'], ['London', 'GB', 51.50853, -0.12574, 'Europe/London'], ['Los Angeles', 'US', 34.05223, -118.24368, 'America/Los_Angeles'], ['Marseilles', 'FR', 43.29695, 5.38107, 'Europe/Paris'], ['Miami', 'US', 25.77427, -80.19366, 'America/New_York'], ['Minneapolis', 'US', 44.97997, -93.26384, 'America/Chicago'], ['Melbourne', 'AU', -37.814, 144.96332, 'Australia/Melbourne'], ['Mexico City', 'MX', 19.42847, -99.12766, 'America/Mexico_City'], ['Montreal', 'CA', 45.50884, -73.58781, 'America/Toronto'], ['Moscow', 'RU', 55.75222, 37.61556, 'Europe/Moscow'], ['New York', 'US', 40.71427, -74.00597, 'America/New_York'], ['Omaha', 'US', 41.25861, -95.93779, 'America/Chicago'], ['Ottawa', 'CA', 45.41117, -75.69812, 'America/Toronto'], ['Panama City', 'PA', 8.9936, -79.51973, 'America/Panama'], ['Paris', 'FR', 48.85341, 2.3488, 'Europe/Paris'], ['Pawtucket', 'US', 41.87871, -71.38256, 'America/New_York'], ['Petach Tikvah', 'IL', 32.08707, 34.88747, 'Asia/Jerusalem'], ['Philadelphia', 'US', 39.95233, -75.16379, 'America/New_York'], ['Phoenix', 'US', 33.44838, -112.07404, 'America/Phoenix'], ['Pittsburgh', 'US', 40.44062, -79.99589, 'America/New_York'], ['Providence', 'US', 41.82399, -71.41283, 'America/New_York'], ['Portland', 'US', 45.52345, -122.67621, 'America/Los_Angeles'], ['Saint Louis', 'US', 38.62727, -90.19789, 'America/Chicago'], ['Saint Petersburg', 'RU', 59.93863, 30.31413, 'Europe/Moscow'], ['San Diego', 'US', 32.71533, -117.15726, 'America/Los_Angeles'], ['San Francisco', 'US', 37.77493, -122.41942, 'America/Los_Angeles'], ['Sao Paulo', 'BR', -23.5475, -46.63611, 'America/Sao_Paulo'], ['Seattle', 'US', 47.60621, -122.33207, 'America/Los_Angeles'], ['Sydney', 'AU', -33.86785, 151.20732, 'Australia/Sydney'], ['Tel Aviv', 'IL', 32.08088, 34.78057, 'Asia/Jerusalem'], ['Tiberias', 'IL', 32.79221, 35.53124, 'Asia/Jerusalem'], ['Toronto', 'CA', 43.70011, -79.4163, 'America/Toronto'], ['Vancouver', 'CA', 49.24966, -123.11934, 'America/Vancouver'], ['White Plains', 'US', 41.03399, -73.76291, 'America/New_York'], ['Washington DC', 'US', 38.89511, -77.03637, 'America/New_York'], ['Worcester', 'US', 42.26259, -71.80229, 'America/New_York']];
var classicCities = Object.create(null); // Zip-Codes.com TimeZone IDs

var ZIPCODES_TZ_MAP = {
  '0': 'UTC',
  '4': 'America/Puerto_Rico',
  // Atlantic (GMT -04:00)
  '5': 'America/New_York',
  //    Eastern  (GMT -05:00)
  '6': 'America/Chicago',
  //     Central  (GMT -06:00)
  '7': 'America/Denver',
  //      Mountain (GMT -07:00)
  '8': 'America/Los_Angeles',
  // Pacific  (GMT -08:00)
  '9': 'America/Anchorage',
  //   Alaska   (GMT -09:00)
  '10': 'Pacific/Honolulu',
  //   Hawaii-Aleutian Islands (GMT -10:00)
  '11': 'Pacific/Pago_Pago',
  //  American Samoa (GMT -11:00)
  '13': 'Pacific/Funafuti',
  //   Marshall Islands (GMT +12:00)
  '14': 'Pacific/Guam',
  //       Guam     (GMT +10:00)
  '15': 'Pacific/Palau',
  //      Palau    (GMT +9:00)
  '16': 'Pacific/Chuuk' //      Micronesia (GMT +11:00)

};
/** @private */

var timeFormatCache = Object.create(null);
/**
 * Gets a 24-hour time formatter (e.g. 07:41 or 20:03) from cache
 * or makes a new one if needed
 * @private
 * @param {string} tzid
 * @return {Intl.DateTimeFormat}
 */

function getFormatter(tzid) {
  var fmt = timeFormatCache[tzid];
  if (fmt) return fmt;
  var f = new Intl.DateTimeFormat('en-US', {
    timeZone: tzid,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  timeFormatCache[tzid] = f;
  return f;
}
/** Class representing Location */


var Location = /*#__PURE__*/function () {
  /**
   * Initialize a Location instance
   * @param {number} latitude - Latitude as a decimal, valid range -90 thru +90 (e.g. 41.85003)
   * @param {number} longitude - Longitude as a decimal, valid range -180 thru +180 (e.g. -87.65005)
   * @param {boolean} il - in Israel (true) or Diaspora (false)
   * @param {string} tzid - Olson timezone ID, e.g. "America/Chicago"
   * @param {string} cityName - optional descriptive city name
   * @param {string} countryCode - ISO 3166 alpha-2 country code (e.g. "FR")
   * @param {string} geoid - optional string or numeric geographic ID
   */
  function Location(latitude, longitude, il, tzid, cityName, countryCode, geoid) {
    _classCallCheck(this, Location);

    this.latitude = +latitude;

    if (this.latitude < -90 || this.latitude > 90) {
      throw new RangeError("Latitude ".concat(this.latitude, " out of range [-90,90]"));
    }

    this.longitude = +longitude;

    if (this.longitude < -180 || this.longitude > 180) {
      throw new RangeError("Longitude ".concat(this.longitude, " out of range [-180,180]"));
    }

    this.il = Boolean(il);
    this.tzid = tzid;
    this.name = cityName;
    this.cc = countryCode;
    this.geoid = geoid;
  }
  /** @return {number} */


  _createClass(Location, [{
    key: "getLatitude",
    value: function getLatitude() {
      return this.latitude;
    }
    /** @return {number} */

  }, {
    key: "getLongitude",
    value: function getLongitude() {
      return this.longitude;
    }
    /** @return {boolean} */

  }, {
    key: "getIsrael",
    value: function getIsrael() {
      return this.il;
    }
    /** @return {string} */

  }, {
    key: "getName",
    value: function getName() {
      return this.name;
    }
    /**
     * Returns the location name, up to the first comma
     * @return {string}
     */

  }, {
    key: "getShortName",
    value: function getShortName() {
      if (!this.name) return this.name;
      var comma = this.name.indexOf(',');
      return comma == -1 ? this.name : this.name.substring(0, comma);
    }
    /** @return {string} */

  }, {
    key: "getCountryCode",
    value: function getCountryCode() {
      return this.cc;
    }
    /** @return {string} */

  }, {
    key: "getTzid",
    value: function getTzid() {
      return this.tzid;
    }
    /**
     * Gets a 24-hour time formatter (e.g. 07:41 or 20:03) for this location
     * @return {Intl.DateTimeFormat}
     */

  }, {
    key: "getTimeFormatter",
    value: function getTimeFormatter() {
      return getFormatter(this.tzid);
    }
    /** @return {string} */

  }, {
    key: "getGeoId",
    value: function getGeoId() {
      return this.geoid;
    }
    /**
     * Creates a location object from one of 60 "classic" Hebcal city names.
     * The following city names are supported:
     * 'Ashdod', 'Atlanta', 'Austin', 'Baghdad', 'Beer Sheva',
     * 'Berlin', 'Baltimore', 'Bogota', 'Boston', 'Budapest',
     * 'Buenos Aires', 'Buffalo', 'Chicago', 'Cincinnati', 'Cleveland',
     * 'Dallas', 'Denver', 'Detroit', 'Eilat', 'Gibraltar', 'Haifa',
     * 'Hawaii', 'Helsinki', 'Houston', 'Jerusalem', 'Johannesburg',
     * 'Kiev', 'La Paz', 'Livingston', 'Las Vegas', 'London', 'Los Angeles',
     * 'Marseilles', 'Miami', 'Minneapolis', 'Melbourne', 'Mexico City',
     * 'Montreal', 'Moscow', 'New York', 'Omaha', 'Ottawa', 'Panama City',
     * 'Paris', 'Pawtucket', 'Petach Tikvah', 'Philadelphia', 'Phoenix',
     * 'Pittsburgh', 'Providence', 'Portland', 'Saint Louis', 'Saint Petersburg',
     * 'San Diego', 'San Francisco', 'Sao Paulo', 'Seattle', 'Sydney',
     * 'Tel Aviv', 'Tiberias', 'Toronto', 'Vancouver', 'White Plains',
     * 'Washington DC', 'Worcester'
     * @param {string} name
     * @return {Location}
     */

  }, {
    key: "sunset",
    value:
    /**
     * @deprecated
     * @param {Date|HDate} hdate
     * @return {Date}
     */
    function sunset(hdate) {
      return new Zmanim(hdate, this.getLatitude(), this.getLongitude()).sunset();
    }
    /**
     * @deprecated
     * @param {Date|HDate} hdate
     * @param {number} [angle]
     * @return {Date}
     */

  }, {
    key: "tzeit",
    value: function tzeit(hdate, angle) {
      return new Zmanim(hdate, this.getLatitude(), this.getLongitude()).tzeit(angle);
    }
    /** @return {string} */

  }, {
    key: "toString",
    value: function toString() {
      return JSON.stringify(this);
    }
    /**
     * Converts legacy Hebcal timezone to a standard Olson tzid.
     * @param {number} tz integer, GMT offset in hours
     * @param {string} dst 'none', 'eu', 'usa', or 'israel'
     * @return {string}
     */

  }], [{
    key: "lookup",
    value: function lookup(name) {
      return classicCities[name.toLowerCase()];
    }
  }, {
    key: "legacyTzToTzid",
    value: function legacyTzToTzid(tz, dst) {
      tz = +tz;

      if (dst == 'none') {
        if (tz == 0) {
          return 'UTC';
        } else {
          var plus = tz > 0 ? '+' : '';
          return "Etc/GMT".concat(plus).concat(tz);
        }
      } else if (tz == 2 && dst == 'israel') {
        return 'Asia/Jerusalem';
      } else if (dst == 'eu') {
        switch (tz) {
          case -2:
            return 'Atlantic/Cape_Verde';

          case -1:
            return 'Atlantic/Azores';

          case 0:
            return 'Europe/London';

          case 1:
            return 'Europe/Paris';

          case 2:
            return 'Europe/Athens';
        }
      } else if (dst == 'usa') {
        return ZIPCODES_TZ_MAP[String(tz * -1)];
      }

      return undefined;
    }
    /**
     * Converts timezone info from Zip-Codes.com to a standard Olson tzid.
     * @example
     * Location.getUsaTzid('AZ', 7, 'Y') // 'America/Denver'
     * @param {string} state two-letter all-caps US state abbreviation like 'CA'
     * @param {number} tz positive number, 5=America/New_York, 8=America/Los_Angeles
     * @param {string} dst single char 'Y' or 'N'
     * @return {string}
     */

  }, {
    key: "getUsaTzid",
    value: function getUsaTzid(state, tz, dst) {
      if (tz == 10 && state == 'AK') {
        return 'America/Adak';
      } else if (tz == 7 && state == 'AZ') {
        return dst == 'Y' ? 'America/Denver' : 'America/Phoenix';
      } else {
        return ZIPCODES_TZ_MAP[tz];
      }
    }
    /**
     * Builds a city description from geonameid string components
     * @param {string} cityName e.g. 'Tel Aviv' or 'Chicago'
     * @param {string} admin1 e.g. 'England' or 'Massachusetts'
     * @param {string} countryName full country name, e.g. 'Israel' or 'United States'
     * @return {string}
     */

  }, {
    key: "geonameCityDescr",
    value: function geonameCityDescr(cityName, admin1, countryName) {
      if (countryName == 'United States') countryName = 'USA';
      if (countryName == 'United Kingdom') countryName = 'UK';
      var cityDescr = cityName;

      if (countryName != 'Israel' && admin1 && admin1.indexOf(cityName) != 0) {
        cityDescr += ', ' + admin1;
      }

      if (countryName) {
        cityDescr += ', ' + countryName;
      }

      return cityDescr;
    }
    /**
     * Adds a location name for `Location.lookup()` only if the name isn't
     * already being used. Returns `false` if the name is already taken
     * and `true` if successfully added.
     * @param {string} cityName
     * @param {Location} location
     * @return {boolean}
     */

  }, {
    key: "addLocation",
    value: function addLocation(cityName, location) {
      var name = cityName.toLowerCase();

      if (classicCities[name]) {
        return false;
      }

      classicCities[name] = location;
      return true;
    }
  }]);

  return Location;
}();
classicCities0.forEach(function (city) {
  var location = new Location(city[2], city[3], city[1] == 'IL', city[4], city[0], city[1]);
  Location.addLocation(location.getName(), location);
});

var days = {
  FRI: 5,
  SAT: 6
};
/**
 * @private
 * This method returns the tzais (nightfall) based on the opinion of the
 * Geonim calculated as 30 minutes after sunset during the equinox
 * (on March 16, about 4 days before the astronomical equinox, the day that
 * a solar hour is 60 minutes) in Yerushalayim.
 * @see {https://kosherjava.com/zmanim/docs/api/com/kosherjava/zmanim/ComplexZmanimCalendar.html#getTzaisGeonim7Point083Degrees()}
 */

var TZEIT_3MEDIUM_STARS = 7.083;
/**
 * @private
 * @param {Event} e
 * @param {HDate} hd
 * @param {number} dow
 * @param {Location} location
 * @param {HebrewCalendar.Options} options
 * @return {Event}
 */

function makeCandleEvent(e, hd, dow, location, options) {
  var havdalahTitle = false;
  var useHavdalahOffset = dow == days.SAT;
  var mask = e ? e.getFlags() : flags.LIGHT_CANDLES;

  if (typeof e !== 'undefined') {
    // if linked event && dow == FRI, use Candle lighting time & title
    if (dow != days.FRI) {
      if (mask & (flags.LIGHT_CANDLES_TZEIS | flags.CHANUKAH_CANDLES)) {
        useHavdalahOffset = true;
      } else if (mask & flags.YOM_TOV_ENDS) {
        havdalahTitle = true;
        useHavdalahOffset = true;
      }
    }
  } else if (dow == days.SAT) {
    havdalahTitle = true;
    mask = flags.LIGHT_CANDLES_TZEIS;
  } // if offset is 0 or undefined, we'll use tzeit time


  var offset = useHavdalahOffset ? options.havdalahMins : options.candleLightingMins;
  var zmanim = new Zmanim(hd, location.getLatitude(), location.getLongitude());
  var time = offset ? zmanim.sunsetOffset(offset) : zmanim.tzeit(options.havdalahDeg);

  if (isNaN(time.getTime())) {
    return null; // no sunset
  }

  if (havdalahTitle) {
    return new HavdalahEvent(hd, mask, time, location, options.havdalahMins, e);
  } else {
    return new CandleLightingEvent(hd, mask, time, location, e);
  }
}
/** An event that has an `eventTime` and `eventTimeStr` */

var TimedEvent = /*#__PURE__*/function (_Event) {
  _inherits(TimedEvent, _Event);

  var _super = _createSuper(TimedEvent);

  /**
   * @param {HDate} date
   * @param {string} desc Description (not translated)
   * @param {number} mask
   * @param {Date} eventTime
   * @param {Location} location
   * @param {Event} linkedEvent
   */
  function TimedEvent(date, desc, mask, eventTime, location, linkedEvent) {
    var _this;

    _classCallCheck(this, TimedEvent);

    _this = _super.call(this, date, desc, mask);
    _this.eventTime = Zmanim.roundTime(eventTime);
    _this.location = location;
    var timeFormat = location.getTimeFormatter();
    _this.eventTimeStr = Zmanim.formatTime(_this.eventTime, timeFormat);

    if (typeof linkedEvent !== 'undefined') {
      _this.linkedEvent = linkedEvent;
    }

    return _this;
  }
  /**
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  _createClass(TimedEvent, [{
    key: "render",
    value: function render(locale) {
      return Locale.gettext(this.getDesc(), locale) + ': ' + this.eventTimeStr;
    }
    /**
     * Returns translation of "Candle lighting" without the time.
     * @param {string} [locale] Optional locale name (defaults to active locale).
     * @return {string}
     */

  }, {
    key: "renderBrief",
    value: function renderBrief(locale) {
      return Locale.gettext(this.getDesc(), locale);
    }
  }]);

  return TimedEvent;
}(Event);
/** Havdalah after Shabbat or holiday */

var HavdalahEvent = /*#__PURE__*/function (_TimedEvent) {
  _inherits(HavdalahEvent, _TimedEvent);

  var _super2 = _createSuper(HavdalahEvent);

  /**
   * @param {HDate} date
   * @param {number} mask
   * @param {Date} eventTime
   * @param {Location} location
   * @param {number} havdalahMins
   * @param {Event} linkedEvent
   */
  function HavdalahEvent(date, mask, eventTime, location, havdalahMins, linkedEvent) {
    var _this2;

    _classCallCheck(this, HavdalahEvent);

    _this2 = _super2.call(this, date, 'Havdalah', mask, eventTime, location, linkedEvent);

    if (havdalahMins) {
      _this2.havdalahMins = havdalahMins;
    }

    return _this2;
  }
  /**
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  _createClass(HavdalahEvent, [{
    key: "render",
    value: function render(locale) {
      return this.renderBrief(locale) + ': ' + this.eventTimeStr;
    }
    /**
     * Returns translation of "Havdalah" without the time.
     * @param {string} [locale] Optional locale name (defaults to active locale).
     * @return {string}
     */

  }, {
    key: "renderBrief",
    value: function renderBrief(locale) {
      var str = Locale.gettext(this.getDesc(), locale);

      if (this.havdalahMins) {
        var min = Locale.gettext('min', locale);
        str += " (".concat(this.havdalahMins, " ").concat(min, ")");
      }

      return str;
    }
    /** @return {string} */

  }, {
    key: "getEmoji",
    value: function getEmoji() {
      return '✨';
    }
  }]);

  return HavdalahEvent;
}(TimedEvent);
/** Candle lighting before Shabbat or holiday */

var CandleLightingEvent = /*#__PURE__*/function (_TimedEvent2) {
  _inherits(CandleLightingEvent, _TimedEvent2);

  var _super3 = _createSuper(CandleLightingEvent);

  /**
   * @param {HDate} date
   * @param {number} mask
   * @param {Date} eventTime
   * @param {Location} location
   * @param {Event} linkedEvent
   */
  function CandleLightingEvent(date, mask, eventTime, location, linkedEvent) {
    _classCallCheck(this, CandleLightingEvent);

    return _super3.call(this, date, 'Candle lighting', mask, eventTime, location, linkedEvent);
  }
  /** @return {string} */


  _createClass(CandleLightingEvent, [{
    key: "getEmoji",
    value: function getEmoji() {
      return '🕯️';
    }
  }]);

  return CandleLightingEvent;
}(TimedEvent);
/**
 * Makes a pair of events representing fast start and end times
 * @private
 * @param {Event} ev
 * @param {Location} location
 * @return {Event}
 */

function makeFastStartEnd(ev, location) {
  var desc = ev.getDesc();

  if (desc === 'Yom Kippur') {
    return ev;
  }

  ev = ev.clone();
  var hd = ev.getDate();
  var dt = hd.greg();
  var zmanim = new Zmanim(dt, location.getLatitude(), location.getLongitude());

  if (desc === 'Erev Tish\'a B\'Av') {
    var sunset = zmanim.sunset();
    ev.startEvent = makeTimedEvent(hd, sunset, 'Fast begins', ev, location);
  } else if (desc.substring(0, 11) === 'Tish\'a B\'Av') {
    ev.endEvent = makeTimedEvent(hd, zmanim.tzeit(TZEIT_3MEDIUM_STARS), 'Fast ends', ev, location);
  } else {
    var dawn = zmanim.alotHaShachar();
    ev.startEvent = makeTimedEvent(hd, dawn, 'Fast begins', ev, location);

    if (dt.getDay() !== 5 && !(hd.getDate() === 14 && hd.getMonth() === months.NISAN)) {
      ev.endEvent = makeTimedEvent(hd, zmanim.tzeit(TZEIT_3MEDIUM_STARS), 'Fast ends', ev, location);
    }
  }

  return ev;
}
/**
 * @private
 * @param {HDate} hd
 * @param {Date} time
 * @param {string} desc
 * @param {Event} ev
 * @param {Location} location
 * @return {TimedEvent}
 */

function makeTimedEvent(hd, time, desc, ev, location) {
  if (isNaN(time.getTime())) {
    return null;
  }

  return new TimedEvent(hd, desc, ev.getFlags(), time, location, ev);
}
/**
 * Makes a candle-lighting event for Chankah (not on Friday/Saturday)
 * @private
 * @param {Event} ev
 * @param {HDate} hd
 * @param {Location} location
 * @return {TimedEvent}
 */


function makeWeekdayChanukahCandleLighting(ev, hd, location) {
  var zmanim = new Zmanim(hd.greg(), location.getLatitude(), location.getLongitude());
  var candleLightingTime = zmanim.dusk(); // const candleLightingTime = zmanim.tzeit(4.6667);

  return makeTimedEvent(hd, candleLightingTime, ev.getDesc(), ev, location);
}

var shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
/**
 * Represents a molad, the moment when the new moon is "born"
 */

var Molad = /*#__PURE__*/function () {
  /**
   * Calculates the molad for a Hebrew month
   * @param {number} year
   * @param {number} month
   */
  function Molad(year, month) {
    _classCallCheck(this, Molad);

    var m_adj = month - 7;

    if (m_adj < 0) {
      m_adj += HDate$1.monthsInYear(year);
    }

    var m_elapsed = 235 * Math.floor((year - 1) / 19) + // Months in complete 19 year lunar (Metonic) cycles so far
    12 * ((year - 1) % 19) + // Regular months in this cycle
    Math.floor((7 * ((year - 1) % 19) + 1) / 19) + // Leap months this cycle
    m_adj; // add elapsed months till the start of the molad of the month

    var p_elapsed = 204 + Math.floor(793 * (m_elapsed % 1080));
    var h_elapsed = 5 + 12 * m_elapsed + 793 * Math.floor(m_elapsed / 1080) + Math.floor(p_elapsed / 1080) - 6;
    var parts = p_elapsed % 1080 + 1080 * (h_elapsed % 24);
    var chalakim = parts % 1080;
    var day = 1 + 29 * m_elapsed + Math.floor(h_elapsed / 24);
    var dow = day % 7;
    this.year = year;
    this.month = month;
    this.dow = dow;
    this.hour = h_elapsed % 24;
    this.minutes = Math.floor(chalakim / 18);
    this.chalakim = chalakim % 18;
  }
  /**
   * @return {number}
   */


  _createClass(Molad, [{
    key: "getYear",
    value: function getYear() {
      return this.year;
    }
    /**
     * @return {number}
     */

  }, {
    key: "getMonth",
    value: function getMonth() {
      return this.month;
    }
    /**
     * @return {string}
     */

  }, {
    key: "getMonthName",
    value: function getMonthName() {
      return HDate$1.getMonthName(this.month, this.year);
    }
    /**
     * @return {number} Day of Week (0=Sunday, 6=Saturday)
     */

  }, {
    key: "getDow",
    value: function getDow() {
      return this.dow;
    }
    /**
     * @return {number} hour of day (0-23)
     */

  }, {
    key: "getHour",
    value: function getHour() {
      return this.hour;
    }
    /**
     * @return {number} minutes past hour (0-59)
     */

  }, {
    key: "getMinutes",
    value: function getMinutes() {
      return this.minutes;
    }
    /**
     * @return {number} parts of a minute (0-17)
     */

  }, {
    key: "getChalakim",
    value: function getChalakim() {
      return this.chalakim;
    }
  }]);

  return Molad;
}();
/** Represents a Molad announcement on Shabbat Mevarchim */

var MoladEvent = /*#__PURE__*/function (_Event) {
  _inherits(MoladEvent, _Event);

  var _super = _createSuper(MoladEvent);

  /**
   * @param {HDate} date Hebrew date event occurs
   * @param {number} hyear molad year
   * @param {number} hmonth molad month
   */
  function MoladEvent(date, hyear, hmonth) {
    var _this;

    _classCallCheck(this, MoladEvent);

    var m = new Molad(hyear, hmonth);
    var monthName = m.getMonthName();
    _this = _super.call(this, date, "Molad ".concat(monthName, " ").concat(hyear), flags.MOLAD);
    _this.molad = m;
    return _this;
  }
  /**
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  _createClass(MoladEvent, [{
    key: "render",
    value: function render(locale) {
      var m = this.molad;
      var monthName = m.getMonthName();
      var dow = shortDayNames[m.getDow()];
      var minutes = m.getMinutes();
      var hour = m.getHour();
      var chalakim = m.getChalakim();
      return "Molad ".concat(monthName, ": ").concat(dow, ", ").concat(minutes, " minutes and ").concat(chalakim, " chalakim after ").concat(hour, ":00");
    }
  }]);

  return MoladEvent;
}(Event);

var sefirot = [null, 'Lovingkindness', 'Might', 'Beauty', 'Eternity', 'Splendor', 'Foundation', 'Majesty'];
/*
const sefirotTranslit = {
  Lovingkindness: 'Chesed',
  Might: 'Gevurah',
  Beauty: 'Tiferet',
  Eternity: 'Netzach',
  Splendor: 'Hod',
  Foundation: 'Yesod',
  Majesty: 'Malkhut',
};
*/

/** Represents a day 1-49 of counting the Omer from Pesach to Shavuot */

var OmerEvent = /*#__PURE__*/function (_Event) {
  _inherits(OmerEvent, _Event);

  var _super = _createSuper(OmerEvent);

  /**
   * @param {HDate} date
   * @param {number} omerDay
   */
  function OmerEvent(date, omerDay) {
    var _this;

    _classCallCheck(this, OmerEvent);

    _this = _super.call(this, date, "Omer ".concat(omerDay), flags.OMER_COUNT, {
      omer: omerDay
    });
    _this.weekNumber = Math.floor((omerDay - 1) / 7) + 1;
    _this.daysWithinWeeks = omerDay % 7 || 7;
    var week = sefirot[_this.weekNumber];
    var dayWithinWeek = sefirot[_this.daysWithinWeeks];
    var heWeek = Locale.gettext(week, 'he');
    var heDayWithinWeek = Locale.gettext(dayWithinWeek, 'he');
    var hePrefix = 'שֶׁבַּ';
    _this.memo = "".concat(dayWithinWeek, " that is in ").concat(week, " / ").concat(heDayWithinWeek, " ").concat(hePrefix).concat(heWeek).normalize();
    return _this;
  }
  /**
   * @todo use gettext()
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  _createClass(OmerEvent, [{
    key: "render",
    value: function render(locale) {
      var omer = this.omer;
      var nth = locale == 'he' ? gematriya(omer) : Locale.ordinal(omer, locale);
      return nth + ' ' + Locale.gettext('day of the Omer', locale);
    }
    /**
     * Returns translation of "Omer 22" without ordinal numbers.
     * @param {string} [locale] Optional locale name (defaults to active locale).
     * @return {string}
     */

  }, {
    key: "renderBrief",
    value: function renderBrief(locale) {
      return Locale.gettext('Omer', locale) + ' ' + this.omer;
    }
    /** @return {string} */

  }, {
    key: "getEmoji",
    value: function getEmoji() {
      if (this.emoji) return this.emoji;
      var number = this.omer;
      var ones = number % 10;
      var tens = Math.floor(number / 10);
      return KEYCAP_DIGITS[tens] + KEYCAP_DIGITS[ones];
    }
    /** @return {number} */

  }, {
    key: "getWeeks",
    value: function getWeeks() {
      return this.weekNumber;
    }
    /** @return {number} */

  }, {
    key: "getDaysWithinWeeks",
    value: function getDaysWithinWeeks() {
      return this.daysWithinWeeks;
    }
    /**
     * @param {string} locale
     * @return {string}
     */

  }, {
    key: "getTodayIs",
    value: function getTodayIs(locale) {
      var totalDaysStr = this.omer === 1 ? 'day' : 'days';
      var str = "Today is ".concat(this.omer, " ").concat(totalDaysStr);

      if (this.weekNumber > 1 || this.omer === 7) {
        var day7 = this.daysWithinWeeks === 7;
        var numWeeks = day7 ? this.weekNumber : this.weekNumber - 1;
        var weeksStr = numWeeks === 1 ? 'week' : 'weeks';
        str += ", which is ".concat(numWeeks, " ").concat(weeksStr);

        if (!day7) {
          var daysStr = this.daysWithinWeeks === 1 ? 'day' : 'days';
          str += " and ".concat(this.daysWithinWeeks, " ").concat(daysStr);
        }
      }

      return str + ' of the Omer';
    }
  }]);

  return OmerEvent;
}(Event);

var osdate = new Date(1923, 8, 11);
var osday = greg.greg2abs(osdate);
var nsday = greg.greg2abs(new Date(1975, 5, 24));
var shas = [['Berachot', 64], ['Shabbat', 157], ['Eruvin', 105], ['Pesachim', 121], ['Shekalim', 22], ['Yoma', 88], ['Sukkah', 56], ['Beitzah', 40], ['Rosh Hashana', 35], ['Taanit', 31], ['Megillah', 32], ['Moed Katan', 29], ['Chagigah', 27], ['Yevamot', 122], ['Ketubot', 112], ['Nedarim', 91], ['Nazir', 66], ['Sotah', 49], ['Gitin', 90], ['Kiddushin', 82], ['Baba Kamma', 119], ['Baba Metzia', 119], ['Baba Batra', 176], ['Sanhedrin', 113], ['Makkot', 24], ['Shevuot', 49], ['Avodah Zarah', 76], ['Horayot', 14], ['Zevachim', 120], ['Menachot', 110], ['Chullin', 142], ['Bechorot', 61], ['Arachin', 34], ['Temurah', 34], ['Keritot', 28], ['Meilah', 22], ['Kinnim', 4], ['Tamid', 10], ['Midot', 4], ['Niddah', 73]].map(function (m) {
  return {
    name: m[0],
    blatt: m[1]
  };
});
/**
 * Returns the Daf Yomi for given date
 */

var DafYomi = /*#__PURE__*/function () {
  /**
   * Initializes a daf yomi instance
   * @param {Date} gregdate Gregorian date
   */
  function DafYomi(gregdate) {
    _classCallCheck(this, DafYomi);

    var cday = typeof gregdate === 'number' && !isNaN(gregdate) ? gregdate : greg.isDate(gregdate) ? greg.greg2abs(gregdate) : HDate.isHDate(gregdate) ? gregdate.abs() : throwTypeError("non-date given to dafyomi: ".concat(gregdate));

    if (cday < osday) {
      throw new RangeError("Date ".concat(gregdate, " too early; Daf Yomi cycle began on ").concat(osdate));
    }

    var cno;
    var dno;

    if (cday >= nsday) {
      // "new" cycle
      cno = 8 + (cday - nsday) / 2711;
      dno = (cday - nsday) % 2711;
    } else {
      // old cycle
      cno = 1 + (cday - osday) / 2702;
      dno = (cday - osday) % 2702;
    } // Find the daf taking note that the cycle changed slightly after cycle 7.


    var total = 0;
    var blatt = 0;
    var count = -1; // Fix Shekalim for old cycles

    if (cno <= 7) {
      shas[4].blatt = 13;
    } else {
      shas[4].blatt = 22;
    } // Find the daf


    var j = 0;
    var dafcnt = 40;

    while (j < dafcnt) {
      count++;
      total = total + shas[j].blatt - 1;

      if (dno < total) {
        blatt = shas[j].blatt + 1 - (total - dno); // fiddle with the weird ones near the end

        switch (count) {
          case 36:
            blatt = blatt + 21;
            break;

          case 37:
            blatt = blatt + 24;
            break;

          case 38:
            blatt = blatt + 33;
            break;
        } // Bailout


        j = 1 + dafcnt;
      }

      j++;
    }

    this.name = shas[count].name;
    this.blatt = blatt;
  }
  /**
   * @return {number}
   */


  _createClass(DafYomi, [{
    key: "getBlatt",
    value: function getBlatt() {
      return this.blatt;
    }
    /**
     * @return {string}
     */

  }, {
    key: "getName",
    value: function getName() {
      return this.name;
    }
    /**
     * Formats (with translation) the dafyomi result as a string like "Pesachim 34"
     * @param {string} [locale] Optional locale name (defaults to active locale).
     * @return {string}
     */

  }, {
    key: "render",
    value: function render(locale) {
      return Locale.gettext(this.name, locale) + ' ' + this.blatt;
    }
  }]);

  return DafYomi;
}();
var dafYomiSefaria = {
  'Berachot': 'Berakhot',
  'Rosh Hashana': 'Rosh Hashanah',
  'Gitin': 'Gittin',
  'Baba Kamma': 'Bava Kamma',
  'Baba Metzia': 'Bava Metzia',
  'Baba Batra': 'Bava Batra',
  'Bechorot': 'Bekhorot',
  'Arachin': 'Arakhin',
  'Midot': 'Middot',
  'Shekalim': 'Jerusalem_Talmud_Shekalim'
};
/**
 * Event wrapper around a DafYomi instance
 */

var DafYomiEvent = /*#__PURE__*/function (_Event) {
  _inherits(DafYomiEvent, _Event);

  var _super = _createSuper(DafYomiEvent);

  /**
   * @param {HDate} date
   */
  function DafYomiEvent(date) {
    _classCallCheck(this, DafYomiEvent);

    var daf = new DafYomi(date.greg());
    return _super.call(this, date, daf.render(), flags.DAF_YOMI, {
      daf: daf
    });
  }
  /**
   * Returns Daf Yomi name including the 'Daf Yomi: ' prefix (e.g. "Daf Yomi: Pesachim 107").
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  _createClass(DafYomiEvent, [{
    key: "render",
    value: function render(locale) {
      return Locale.gettext('Daf Yomi', locale) + ': ' + this.daf.render(locale);
    }
    /**
     * Returns Daf Yomi name without the 'Daf Yomi: ' prefix (e.g. "Pesachim 107").
     * @param {string} [locale] Optional locale name (defaults to active locale).
     * @return {string}
     */

  }, {
    key: "renderBrief",
    value: function renderBrief(locale) {
      return this.daf.render(locale);
    }
    /**
     * Returns a link to sefaria.org or dafyomi.org
     * @return {string}
     */

  }, {
    key: "url",
    value: function url() {
      var daf = this.daf;
      var tractate = daf.getName();
      var blatt = daf.getBlatt();

      if (tractate == 'Kinnim' || tractate == 'Midot') {
        return "https://www.dafyomi.org/index.php?masechta=meilah&daf=".concat(blatt, "a");
      } else {
        var name0 = dafYomiSefaria[tractate] || tractate;
        var name = name0.replace(/ /g, '_');
        return "https://www.sefaria.org/".concat(name, ".").concat(blatt, "a?lang=bi");
      }
    }
  }]);

  return DafYomiEvent;
}(Event);

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$o =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$6 = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$5 = fails$6;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$5(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var call$7 = Function.prototype.call;

var functionCall = call$7.bind ? call$7.bind(call$7) : function () {
  return call$7.apply(call$7, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$3 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var FunctionPrototype$1 = Function.prototype;
var bind$2 = FunctionPrototype$1.bind;
var call$6 = FunctionPrototype$1.call;
var callBind = bind$2 && bind$2.bind(call$6);

var functionUncurryThis = bind$2 ? function (fn) {
  return fn && callBind(call$6, fn);
} : function (fn) {
  return fn && function () {
    return call$6.apply(fn, arguments);
  };
};

var uncurryThis$a = functionUncurryThis;

var toString$1 = uncurryThis$a({}.toString);
var stringSlice = uncurryThis$a(''.slice);

var classofRaw$1 = function (it) {
  return stringSlice(toString$1(it), 8, -1);
};

var global$n = global$o;
var uncurryThis$9 = functionUncurryThis;
var fails$4 = fails$6;
var classof$3 = classofRaw$1;

var Object$4 = global$n.Object;
var split = uncurryThis$9(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$4(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$4('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$3(it) == 'String' ? split(it, '') : Object$4(it);
} : Object$4;

var global$m = global$o;

var TypeError$8 = global$m.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$2 = function (it) {
  if (it == undefined) throw TypeError$8("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = indexedObject;
var requireObjectCoercible$1 = requireObjectCoercible$2;

var toIndexedObject$3 = function (it) {
  return IndexedObject(requireObjectCoercible$1(it));
};

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$b = function (argument) {
  return typeof argument == 'function';
};

var isCallable$a = isCallable$b;

var isObject$5 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$a(it);
};

var global$l = global$o;
var isCallable$9 = isCallable$b;

var aFunction = function (argument) {
  return isCallable$9(argument) ? argument : undefined;
};

var getBuiltIn$4 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$l[namespace]) : global$l[namespace] && global$l[namespace][method];
};

var uncurryThis$8 = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$8({}.isPrototypeOf);

var getBuiltIn$3 = getBuiltIn$4;

var engineUserAgent = getBuiltIn$3('navigator', 'userAgent') || '';

var global$k = global$o;
var userAgent = engineUserAgent;

var process = global$k.process;
var Deno = global$k.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version$1;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version$1 = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version$1 && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version$1 = +match[1];
  }
}

var engineV8Version = version$1;

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION = engineV8Version;
var fails$3 = fails$6;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$3(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = nativeSymbol;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var global$j = global$o;
var getBuiltIn$2 = getBuiltIn$4;
var isCallable$8 = isCallable$b;
var isPrototypeOf = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var Object$3 = global$j.Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$2('Symbol');
  return isCallable$8($Symbol) && isPrototypeOf($Symbol.prototype, Object$3(it));
};

var global$i = global$o;

var String$2 = global$i.String;

var tryToString$2 = function (argument) {
  try {
    return String$2(argument);
  } catch (error) {
    return 'Object';
  }
};

var global$h = global$o;
var isCallable$7 = isCallable$b;
var tryToString$1 = tryToString$2;

var TypeError$7 = global$h.TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$3 = function (argument) {
  if (isCallable$7(argument)) return argument;
  throw TypeError$7(tryToString$1(argument) + ' is not a function');
};

var aCallable$2 = aCallable$3;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$3 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable$2(func);
};

var global$g = global$o;
var call$5 = functionCall;
var isCallable$6 = isCallable$b;
var isObject$4 = isObject$5;

var TypeError$6 = global$g.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$6(fn = input.toString) && !isObject$4(val = call$5(fn, input))) return val;
  if (isCallable$6(fn = input.valueOf) && !isObject$4(val = call$5(fn, input))) return val;
  if (pref !== 'string' && isCallable$6(fn = input.toString) && !isObject$4(val = call$5(fn, input))) return val;
  throw TypeError$6("Can't convert object to primitive value");
};

var shared$3 = {exports: {}};

var global$f = global$o;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

var setGlobal$3 = function (key, value) {
  try {
    defineProperty(global$f, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$f[key] = value;
  } return value;
};

var global$e = global$o;
var setGlobal$2 = setGlobal$3;

var SHARED = '__core-js_shared__';
var store$3 = global$e[SHARED] || setGlobal$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$3.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.19.2',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

var global$d = global$o;
var requireObjectCoercible = requireObjectCoercible$2;

var Object$2 = global$d.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$2 = function (argument) {
  return Object$2(requireObjectCoercible(argument));
};

var uncurryThis$7 = functionUncurryThis;
var toObject$1 = toObject$2;

var hasOwnProperty = uncurryThis$7({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$1(it), key);
};

var uncurryThis$6 = functionUncurryThis;

var id$1 = 0;
var postfix = Math.random();
var toString = uncurryThis$6(1.0.toString);

var uid$2 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id$1 + postfix, 36);
};

var global$c = global$o;
var shared$2 = shared$3.exports;
var hasOwn$6 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared$2('wks');
var Symbol$1 = global$c.Symbol;
var symbolFor = Symbol$1 && Symbol$1['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$6 = function (name) {
  if (!hasOwn$6(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};

var global$b = global$o;
var call$4 = functionCall;
var isObject$3 = isObject$5;
var isSymbol$1 = isSymbol$2;
var getMethod$2 = getMethod$3;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$5 = wellKnownSymbol$6;

var TypeError$5 = global$b.TypeError;
var TO_PRIMITIVE = wellKnownSymbol$5('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$3(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$4(exoticToPrim, input, pref);
    if (!isObject$3(result) || isSymbol$1(result)) return result;
    throw TypeError$5("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$3 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

var global$a = global$o;
var isObject$2 = isObject$5;

var document = global$a.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$2(document) && isObject$2(document.createElement);

var documentCreateElement = function (it) {
  return EXISTS$1 ? document.createElement(it) : {};
};

var DESCRIPTORS$4 = descriptors;
var fails$2 = fails$6;
var createElement = documentCreateElement;

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !DESCRIPTORS$4 && !fails$2(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$3 = descriptors;
var call$3 = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$2 = createPropertyDescriptor$3;
var toIndexedObject$2 = toIndexedObject$3;
var toPropertyKey$2 = toPropertyKey$3;
var hasOwn$5 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$3 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$2(O);
  P = toPropertyKey$2(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$5(O, P)) return createPropertyDescriptor$2(!call$3(propertyIsEnumerableModule.f, O, P), O[P]);
};

var objectDefineProperty = {};

var global$9 = global$o;
var isObject$1 = isObject$5;

var String$1 = global$9.String;
var TypeError$4 = global$9.TypeError;

// `Assert: Type(argument) is Object`
var anObject$5 = function (argument) {
  if (isObject$1(argument)) return argument;
  throw TypeError$4(String$1(argument) + ' is not an object');
};

var global$8 = global$o;
var DESCRIPTORS$2 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var anObject$4 = anObject$5;
var toPropertyKey$1 = toPropertyKey$3;

var TypeError$3 = global$8.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$2 ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$4(O);
  P = toPropertyKey$1(P);
  anObject$4(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError$3('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$1 = descriptors;
var definePropertyModule$2 = objectDefineProperty;
var createPropertyDescriptor$1 = createPropertyDescriptor$3;

var createNonEnumerableProperty$3 = DESCRIPTORS$1 ? function (object, key, value) {
  return definePropertyModule$2.f(object, key, createPropertyDescriptor$1(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var redefine$1 = {exports: {}};

var uncurryThis$5 = functionUncurryThis;
var isCallable$5 = isCallable$b;
var store$1 = sharedStore;

var functionToString = uncurryThis$5(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$5(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$3 = store$1.inspectSource;

var global$7 = global$o;
var isCallable$4 = isCallable$b;
var inspectSource$2 = inspectSource$3;

var WeakMap$1 = global$7.WeakMap;

var nativeWeakMap = isCallable$4(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1));

var shared$1 = shared$3.exports;
var uid = uid$2;

var keys = shared$1('keys');

var sharedKey$1 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$3 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$6 = global$o;
var uncurryThis$4 = functionUncurryThis;
var isObject = isObject$5;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;
var hasOwn$4 = hasOwnProperty_1;
var shared = sharedStore;
var sharedKey = sharedKey$1;
var hiddenKeys$2 = hiddenKeys$3;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$2 = global$6.TypeError;
var WeakMap = global$6.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$2('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis$4(store.get);
  var wmhas = uncurryThis$4(store.has);
  var wmset = uncurryThis$4(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys$2[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn$4(it, STATE)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$2(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$4(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$4(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var DESCRIPTORS = descriptors;
var hasOwn$3 = hasOwnProperty_1;

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$3(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var global$5 = global$o;
var isCallable$3 = isCallable$b;
var hasOwn$2 = hasOwnProperty_1;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;
var setGlobal$1 = setGlobal$3;
var inspectSource$1 = inspectSource$3;
var InternalStateModule = internalState;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(redefine$1.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable$3(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn$2(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      createNonEnumerableProperty$1(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global$5) {
    if (simple) O[key] = value;
    else setGlobal$1(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty$1(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable$3(this) && getInternalState(this).source || inspectSource$1(this);
});

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$2 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};

var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$1(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

var toIntegerOrInfinity = toIntegerOrInfinity$2;

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$1 = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength = toLength$1;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$2 = function (obj) {
  return toLength(obj.length);
};

var toIndexedObject$1 = toIndexedObject$3;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike$1 = lengthOfArrayLike$2;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$1($this);
    var length = lengthOfArrayLike$1(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var uncurryThis$3 = functionUncurryThis;
var hasOwn$1 = hasOwnProperty_1;
var toIndexedObject = toIndexedObject$3;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$1 = hiddenKeys$3;

var push = uncurryThis$3([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$1(hiddenKeys$1, key) && hasOwn$1(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$1 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys = objectKeysInternal;
var enumBugKeys = enumBugKeys$1;

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$1 = getBuiltIn$4;
var uncurryThis$2 = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$3 = anObject$5;

var concat = uncurryThis$2([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$1('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$3(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$1 = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$1.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var fails$1 = fails$6;
var isCallable$2 = isCallable$b;

var replacement = /#|\.prototype\./;

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable$2(detection) ? fails$1(detection)
    : !!detection;
};

var normalize = isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = 'N';
var POLYFILL = isForced$1.POLYFILL = 'P';

var isForced_1 = isForced$1;

var global$4 = global$o;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty = createNonEnumerableProperty$3;
var redefine = redefine$1.exports;
var setGlobal = setGlobal$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced = isForced_1;

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$4;
  } else if (STATIC) {
    target = global$4[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global$4[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

var uncurryThis$1 = functionUncurryThis;
var aCallable$1 = aCallable$3;

var bind$1 = uncurryThis$1(uncurryThis$1.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$1(fn);
  return that === undefined ? fn : bind$1 ? bind$1(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var call$2 = functionCall;
var anObject$2 = anObject$5;
var getMethod$1 = getMethod$3;

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$2(iterator);
  try {
    innerResult = getMethod$1(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call$2(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject$2(innerResult);
  return value;
};

var anObject$1 = anObject$5;
var iteratorClose = iteratorClose$1;

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject$1(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};

var iterators = {};

var wellKnownSymbol$4 = wellKnownSymbol$6;
var Iterators$1 = iterators;

var ITERATOR$2 = wellKnownSymbol$4('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$1 = function (it) {
  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it);
};

var wellKnownSymbol$3 = wellKnownSymbol$6;

var TO_STRING_TAG$1 = wellKnownSymbol$3('toStringTag');
var test = {};

test[TO_STRING_TAG$1] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var global$3 = global$o;
var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$1 = isCallable$b;
var classofRaw = classofRaw$1;
var wellKnownSymbol$2 = wellKnownSymbol$6;

var TO_STRING_TAG = wellKnownSymbol$2('toStringTag');
var Object$1 = global$3.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$2 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object$1(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$1(O.callee) ? 'Arguments' : result;
};

var uncurryThis = functionUncurryThis;
var fails = fails$6;
var isCallable = isCallable$b;
var classof$1 = classof$2;
var getBuiltIn = getBuiltIn$4;
var inspectSource = inspectSource$3;

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function (argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function (argument) {
  if (!isCallable(argument)) return false;
  switch (classof$1(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
    // we can't check .prototype since constructors produced by .bind haven't it
  } return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
};

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$1 = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

var toPropertyKey = toPropertyKey$3;
var definePropertyModule = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$3;

var createProperty$1 = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

var classof = classof$2;
var getMethod = getMethod$3;
var Iterators = iterators;
var wellKnownSymbol$1 = wellKnownSymbol$6;

var ITERATOR$1 = wellKnownSymbol$1('iterator');

var getIteratorMethod$2 = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR$1)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};

var global$2 = global$o;
var call$1 = functionCall;
var aCallable = aCallable$3;
var anObject = anObject$5;
var tryToString = tryToString$2;
var getIteratorMethod$1 = getIteratorMethod$2;

var TypeError$1 = global$2.TypeError;

var getIterator$1 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call$1(iteratorMethod, argument));
  throw TypeError$1(tryToString(argument) + ' is not iterable');
};

var global$1 = global$o;
var bind = functionBindContext;
var call = functionCall;
var toObject = toObject$2;
var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var isConstructor = isConstructor$1;
var lengthOfArrayLike = lengthOfArrayLike$2;
var createProperty = createProperty$1;
var getIterator = getIterator$1;
var getIteratorMethod = getIteratorMethod$2;

var Array$1 = global$1.Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this == Array$1 && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : Array$1(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

var wellKnownSymbol = wellKnownSymbol$6;

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var $ = _export;
var from = arrayFrom;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});

var INCOMPLETE = 0;
var REGULAR = 1;
var COMPLETE = 2; // eslint-disable-next-line require-jsdoc

function throwError(errorMessage) {
  throw new TypeError(errorMessage);
}
/**
 * Result of Sedra.lookup
 * @typedef {Object} SedraResult
 * @property {string[]} parsha Name of the parsha (or parshiyot) read on
 *     Hebrew date, e.g. `['Noach']` or `['Matot', 'Masei']`
 * @property {boolean} chag True if this is a regular parasha HaShavua
 *     Torah reading, false if it's a special holiday reading
 */

/**
 * Represents Parashah HaShavua for an entire Hebrew year
 */


var Sedra = /*#__PURE__*/function () {
  /**
   * Caculates the Parashah HaShavua for an entire Hebrew year
   * @param {number} hebYr - Hebrew year (e.g. 5749)
   * @param {boolean} il - Use Israel sedra schedule (false for Diaspora)
   */
  function Sedra(hebYr, il) {
    _classCallCheck(this, Sedra);

    // the Hebrew year
    hebYr = +hebYr;
    var longC = HDate$1.longCheshvan(hebYr);
    var shortK = HDate$1.shortKislev(hebYr);
    var type = this.type = longC && !shortK ? COMPLETE : !longC && shortK ? INCOMPLETE : REGULAR;
    this.year = hebYr;
    var rh0 = new HDate$1(1, months.TISHREI, hebYr);
    var rh = rh0.abs();
    var rhDay = this.roshHashanaDay = rh0.getDay() + 1; // find the first Saturday on or after Rosh Hashana

    this.firstSaturday = HDate$1.dayOnOrBefore(6, rh + 6);
    var leap = this.leap = +HDate$1.isLeapYear(hebYr);
    this.il = Boolean(il);
    var key = "".concat(leap).concat(rhDay).concat(type);

    if (types[key]) {
      this.key = key;
      this.theSedraArray = types[key];
    } else {
      var key2 = this.key = key + +this.il; // cast to num, then concat

      this.theSedraArray = types[key2];
    }

    if (!this.theSedraArray) {
      throw new Error("improper sedra year type ".concat(this.key, " calculated for ").concat(hebYr));
    }
  }
  /**
   * Returns the parsha (or parshiyot) read on Hebrew date
   * @param {HDate|number} hDate Hebrew date or R.D. days
   * @return {string[]}
   */


  _createClass(Sedra, [{
    key: "get",
    value: function get(hDate) {
      return this.lookup(hDate).parsha;
    }
    /**
     * Looks up parsha for the date, then returns a translated or transliterated string
     * @param {HDate|number} hDate Hebrew date or R.D. days
     * @param {string} [locale] Optional locale name (i.e: `'he'`, `'fr'`). Defaults to active locale
     * @return {string}
     */

  }, {
    key: "getString",
    value: function getString(hDate, locale) {
      var parsha = this.get(hDate);
      var locale0 = locale || Locale.getLocaleName();
      var name = Locale.gettext(parsha[0], locale0);

      if (parsha.length == 2) {
        var hyphen = locale0 == 'he' ? '־' : '-';
        name += hyphen + Locale.gettext(parsha[1], locale0);
      }

      return Locale.gettext('Parashat', locale0) + ' ' + name;
    }
    /**
     * Checks to see if this day would be a regular parasha HaShavua
     * Torah reading or special holiday reading
     * @param {HDate|number} hDate Hebrew date or R.D. days
     * @return {boolean}
     */

  }, {
    key: "isParsha",
    value: function isParsha(hDate) {
      return !this.lookup(hDate).chag;
    }
    /**
     * Returns the date that a parsha occurs
     * @param {number|string|string[]} parsha
     * @return {HDate}
     */

  }, {
    key: "find",
    value: function find(parsha) {
      if (typeof parsha === 'number') {
        if (parsha > 53 || parsha < 0 && !isValidDouble(parsha)) {
          throw new RangeError("Invalid parsha number: ".concat(parsha));
        }

        var idx = this.theSedraArray.indexOf(parsha);

        if (idx === -1) {
          return null; // doesn't occur this year
        }

        return new HDate$1(this.firstSaturday + idx * 7);
      } else if (typeof parsha === 'string') {
        var num = parsha2id[parsha];

        if (typeof num === 'number') {
          return this.find(num);
        } else if (parsha.indexOf('-') !== -1) {
          return this.find(parsha.split('-'));
        } else {
          // try to find Saturday holiday like 'Yom Kippur'
          var _idx = this.theSedraArray.indexOf(parsha);

          if (_idx === -1) {
            return null; // doesn't occur this year
          }

          return new HDate$1(this.firstSaturday + _idx * 7);
        }
      } else if (Array.isArray(parsha) && parsha.length === 1 && typeof parsha[0] === 'string') {
        return this.find(parsha[0]);
      } else if (Array.isArray(parsha) && parsha.length === 2 && typeof parsha[0] === 'string' && typeof parsha[1] === 'string') {
        var p1 = parsha[0];
        var p2 = parsha[1];
        var num1 = parsha2id[p1];
        var num2 = parsha2id[p2];

        if (num2 === num1 + 1) {
          return this.find(-num1);
        } else {
          throw new RangeError("Unrecognized parsha name: ".concat(p1, "-").concat(p2));
        }
      } else {
        throw new TypeError("Invalid parsha argument: ".concat(parsha));
      }
    }
    /**
     * @private
     * @return {Object[]}
     */

  }, {
    key: "getSedraArray",
    value: function getSedraArray() {
      return this.theSedraArray;
    }
    /**
     * R.D. date of the first Saturday on or after Rosh Hashana
     * @return {number}
     */

  }, {
    key: "getFirstSaturday",
    value: function getFirstSaturday() {
      return this.firstSaturday;
    }
    /** @return {number} */

  }, {
    key: "getYear",
    value: function getYear() {
      return this.year;
    }
    /**
     * Returns an object describing the parsha on the first Saturday on or after absdate
     * @param {HDate|number} hDate Hebrew date or R.D. days
     * @return {SedraResult}
     */

  }, {
    key: "lookup",
    value: function lookup(hDate) {
      var absDate = typeof hDate === 'number' ? hDate : HDate$1.isHDate(hDate) ? hDate.abs() : throwError("Bad date argument: ".concat(hDate)); // find the first saturday on or after today's date

      var saturday = HDate$1.dayOnOrBefore(6, absDate + 6);
      var weekNum = (saturday - this.firstSaturday) / 7;
      var index = this.theSedraArray[weekNum];

      if (typeof index === 'undefined') {
        var sedra = new Sedra(this.year + 1, this.il);
        return sedra.lookup(saturday); // must be next year
      }

      if (typeof index === 'string') {
        // Shabbat has a chag. Return a description
        return {
          parsha: [index],
          chag: true
        };
      }

      if (index >= 0) {
        return {
          parsha: [parshiot[index]],
          chag: false
        };
      }

      var p1 = D(index); // undouble the parsha

      return {
        parsha: [parshiot[p1], parshiot[p1 + 1]],
        chag: false
      };
    }
  }]);

  return Sedra;
}();
/**
 * The 54 parshiyot of the Torah as transilterated strings
 * parshiot[0] == 'Bereshit', parshiot[1] == 'Noach', parshiot[53] == "Ha'Azinu".
 * @readonly
 * @type {string[]}
 */

var parshiot = ['Bereshit', 'Noach', 'Lech-Lecha', 'Vayera', 'Chayei Sara', 'Toldot', 'Vayetzei', 'Vayishlach', 'Vayeshev', 'Miketz', 'Vayigash', 'Vayechi', 'Shemot', 'Vaera', 'Bo', 'Beshalach', 'Yitro', 'Mishpatim', 'Terumah', 'Tetzaveh', 'Ki Tisa', 'Vayakhel', 'Pekudei', 'Vayikra', 'Tzav', 'Shmini', 'Tazria', 'Metzora', 'Achrei Mot', 'Kedoshim', 'Emor', 'Behar', 'Bechukotai', 'Bamidbar', 'Nasso', 'Beha\'alotcha', 'Sh\'lach', 'Korach', 'Chukat', 'Balak', 'Pinchas', 'Matot', 'Masei', 'Devarim', 'Vaetchanan', 'Eikev', 'Re\'eh', 'Shoftim', 'Ki Teitzei', 'Ki Tavo', 'Nitzavim', 'Vayeilech', 'Ha\'Azinu'];
var parsha2id = {};

for (var id = 0; id < parshiot.length; id++) {
  var name = parshiot[id];
  parsha2id[name] = id;
}
/**
 * @private
 * @param {number} id
 * @return {boolean}
 */


function isValidDouble(id) {
  switch (id) {
    case -21: // Vayakhel-Pekudei

    case -26: // Tazria-Metzora

    case -28: // Achrei Mot-Kedoshim

    case -31: // Behar-Bechukotai

    case -38: // Chukat-Balak

    case -41: // Matot-Masei

    case -50:
      // Nitzavim-Vayeilech
      return true;
  }

  return false;
}
/**
 * @private
 * @param {number} p
 * @return {number}
 */


function D(p) {
  // parsha doubler/undoubler
  return -p;
}

var RH = 'Rosh Hashana'; // 0

var YK = 'Yom Kippur'; // 1

var SUKKOT = 'Sukkot'; // 0

var CHMSUKOT = 'Sukkot Shabbat Chol ha-Moed'; // 0

var SHMINI = 'Shmini Atzeret'; // 0

var EOY = CHMSUKOT; // always Sukkot day 3, 5 or 6

var PESACH = 'Pesach'; // 25

var PESACH1 = 'Pesach I';
var CHMPESACH = 'Pesach Shabbat Chol ha-Moed'; // 25

var PESACH7 = 'Pesach VII'; // 25

var PESACH8 = 'Pesach VIII';
var SHAVUOT = 'Shavuot'; // 33

/**
 * Returns an array from start to end
 * @private
 * @param {number} start beginning number, inclusive
 * @param {number} stop ending number, inclusive
 * @return {number[]}
 */

function range(start, stop) {
  return Array.from({
    length: stop - start + 1
  }, function (v, k) {
    return k + start;
  });
}
/**
 * The ordinary year types (keviot)
 * names are leap/nonleap - day - incomplete/regular/complete - diaspora/Israel
 * @private
 * @readonly
 * @type {Object.<string, Object[]>}
 */


var types = {
  /* Hebrew year that starts on Monday, is `incomplete' (Heshvan and
     * Kislev each have 29 days), and has Passover start on Tuesday. */
  // e.g. 5753
  '020': [51, 52].concat(EOY, range(0, 20), D(21), 23, 24, PESACH, 25, D(26), D(28), 30, D(31), range(33, 40), D(41), range(43, 49), D(50)),

  /* Hebrew year that starts on Monday, is `complete' (Heshvan and
     * Kislev each have 30 days), and has Passover start on Thursday. */
  // e.g. 5756
  '0220': [51, 52].concat(EOY, range(0, 20), D(21), 23, 24, PESACH, 25, D(26), D(28), 30, D(31), 33, SHAVUOT, range(34, 37), D(38), 40, D(41), range(43, 49), D(50)),

  /* Hebrew year that starts on Thursday, is `regular' (Heshvan has 29
     * days and Kislev has 30 days), and has Passover start on Saturday. */
  // e.g. 5701
  '0510': [52].concat(YK, EOY, range(0, 20), D(21), 23, 24, PESACH1, PESACH8, 25, D(26), D(28), 30, D(31), range(33, 40), D(41), range(43, 50)),

  /* Hebrew year that starts on Thursday, is `regular' (Heshvan has 29
     * days and Kislev has 30 days), and has Passover start on Saturday. */
  // e.g. 5745
  '0511': [52].concat(YK, EOY, range(0, 20), D(21), 23, 24, PESACH, 25, D(26), D(28), range(30, 40), D(41), range(43, 50)),

  /* Hebrew year that starts on Thursday, is `complete' (Heshvan and
     * Kislev each have 30 days), and has Passover start on Sunday. */
  // e.g. 5754
  '052': [52].concat(YK, CHMSUKOT, range(0, 24), PESACH7, 25, D(26), D(28), 30, D(31), range(33, 40), D(41), range(43, 50)),

  /* Hebrew year that starts on Saturday, is `incomplete' (Heshvan and Kislev
     * each have 29 days), and has Passover start on Sunday. */
  // e.g. 5761
  '070': [].concat(RH, 52, SUKKOT, SHMINI, range(0, 20), D(21), 23, 24, PESACH7, 25, D(26), D(28), 30, D(31), range(33, 40), D(41), range(43, 50)),

  /* Hebrew year that starts on Saturday, is `complete' (Heshvan and
     * Kislev each have 30 days), and has Passover start on Tuesday. */
  // e.g. 5716
  '072': [].concat(RH, 52, SUKKOT, SHMINI, range(0, 20), D(21), 23, 24, CHMPESACH, 25, D(26), D(28), 30, D(31), range(33, 40), D(41), range(43, 49), D(50)),

  /* --  The leap year types (keviot) -- */

  /* Hebrew year that starts on Monday, is `incomplete' (Heshvan and
     * Kislev each have 29 days), and has Passover start on Thursday. */
  // e.g. 5746
  '1200': [51, 52].concat(CHMSUKOT, range(0, 27), CHMPESACH, range(28, 33), SHAVUOT, range(34, 37), D(38), 40, D(41), range(43, 49), D(50)),

  /* Hebrew year that starts on Monday, is `incomplete' (Heshvan and
     * Kislev each have 29 days), and has Passover start on Thursday. */
  // e.g. 5746
  '1201': [51, 52].concat(CHMSUKOT, range(0, 27), CHMPESACH, range(28, 40), D(41), range(43, 49), D(50)),

  /* Hebrew year that starts on Monday, is `complete' (Heshvan and
     * Kislev each have 30 days), and has Passover start on Saturday. */
  // e.g.5752
  '1220': [51, 52].concat(CHMSUKOT, range(0, 27), PESACH1, PESACH8, range(28, 40), D(41), range(43, 50)),

  /* Hebrew year that starts on Monday, is `complete' (Heshvan and
     * Kislev each have 30 days), and has Passover start on Saturday. */
  // e.g.5752
  '1221': [51, 52].concat(CHMSUKOT, range(0, 27), PESACH, range(28, 50)),

  /* Hebrew year that starts on Thursday, is `incomplete' (Heshvan and
     * Kislev both have 29 days), and has Passover start on Sunday. */
  // e.g. 5768
  '150': [52].concat(YK, CHMSUKOT, range(0, 28), PESACH7, range(29, 50)),

  /* Hebrew year that starts on Thursday, is `complete' (Heshvan and
     * Kislev both have 30 days), and has Passover start on Tuesday. */
  // eg. 5771
  '152': [52].concat(YK, CHMSUKOT, range(0, 28), CHMPESACH, range(29, 49), D(50)),

  /* Hebrew year that starts on Saturday, is `incomplete' (Heshvan and
     * Kislev each have 29 days), and has Passover start on Tuesday. */
  // e.g.5757
  '170': [].concat(RH, 52, SUKKOT, SHMINI, range(0, 27), CHMPESACH, range(28, 40), D(41), range(43, 49), D(50)),

  /* Hebrew year that starts on Saturday, is `complete' (Heshvan and
     * Kislev each have 30 days), and has Passover start on Thursday. */
  '1720': [].concat(RH, 52, SUKKOT, SHMINI, range(0, 27), CHMPESACH, range(28, 33), SHAVUOT, range(34, 37), D(38), 40, D(41), range(43, 49), D(50))
};
/* Hebrew year that starts on Monday, is `complete' (Heshvan and
 * Kislev each have 30 days), and has Passover start on Thursday. */

types['0221'] = types['020'];
/* Hebrew year that starts on Tuesday, is `regular' (Heshvan has 29
 * days and Kislev has 30 days), and has Passover start on Thursday. */
// e.g. 5715

types['0310'] = types['0220'];
/* Hebrew year that starts on Tuesday, is `regular' (Heshvan has 29
 * days and Kislev has 30 days), and has Passover start on Thursday. */

types['0311'] = types['020'];
/* Hebrew year that starts on Tuesday, is `regular' (Heshvan has 29
 * days and Kislev has 30 days), and has Passover start on Saturday. */
// e.g. 5715

types['1310'] = types['1220'];
/* Hebrew year that starts on Tuesday, is `regular' (Heshvan has 29
 * days and Kislev has 30 days), and has Passover start on Saturday. */

types['1311'] = types['1221'];
/* Hebrew year that starts on Saturday, is `complete' (Heshvan and
 * Kislev each have 30 days), and has Passover start on Thursday. */

types['1721'] = types['170'];

/**
 * Represents one of 54 weekly Torah portions, always on a Saturday
 */

var ParshaEvent = /*#__PURE__*/function (_Event) {
  _inherits(ParshaEvent, _Event);

  var _super = _createSuper(ParshaEvent);

  /**
   * @param {HDate} date
   * @param {string[]} parsha - untranslated name of single or double parsha,
   *   such as ['Bereshit'] or ['Achrei Mot', 'Kedoshim']
   * @param {boolean} il
   */
  function ParshaEvent(date, parsha, il) {
    var _this;

    _classCallCheck(this, ParshaEvent);

    if (!Array.isArray(parsha) || parsha.length === 0 || parsha.length > 2) {
      throw new TypeError('Bad parsha argument');
    }

    var desc = 'Parashat ' + parsha.join('-');
    _this = _super.call(this, date, desc, flags.PARSHA_HASHAVUA);
    _this.parsha = parsha;
    _this.il = Boolean(il);
    return _this;
  }
  /**
   * @param {string} [locale] Optional locale name (i.e: `'he'`, `'fr'`). Defaults to active locale.
   * @return {string}
   */


  _createClass(ParshaEvent, [{
    key: "render",
    value: function render(locale) {
      var locale0 = locale || Locale.getLocaleName();
      var parsha = this.parsha;
      var name = Locale.gettext(parsha[0], locale);

      if (parsha.length == 2) {
        var hyphen = locale0 == 'he' ? '־' : '-';
        name += hyphen + Locale.gettext(parsha[1], locale);
      }

      var str = Locale.gettext('Parashat', locale) + ' ' + name;
      return str.normalize();
    }
    /** @return {string} */

  }, {
    key: "basename",
    value: function basename() {
      return this.parsha.join('-');
    }
    /** @return {string} */

  }, {
    key: "url",
    value: function url() {
      var year = this.getDate().greg().getFullYear();

      if (year < 100) {
        return undefined;
      }

      var dt = this.urlDateSuffix();
      var url = 'https://www.hebcal.com/sedrot/' + this.basename().toLowerCase().replace(/'/g, '').replace(/ /g, '-') + '-' + dt;
      return this.il ? url + '?i=on' : url;
    }
    /** @return {string} */

  }, {
    key: "urlDateSuffix",
    value: function urlDateSuffix() {
      var isoDateTime = this.getDate().greg().toISOString();
      var isoDate = isoDateTime.substring(0, isoDateTime.indexOf('T'));
      return isoDate.replace(/-/g, '');
    }
  }]);

  return ParshaEvent;
}(Event);

/** Represents a built-in holiday like Pesach, Purim or Tu BiShvat */

var HolidayEvent = /*#__PURE__*/function (_Event) {
  _inherits(HolidayEvent, _Event);

  var _super = _createSuper(HolidayEvent);

  /**
   * Constructs Holiday event
   * @param {HDate} date Hebrew date event occurs
   * @param {string} desc Description (not translated)
   * @param {number} [mask=0] optional holiday flags
   * @param {Object} [attrs={}]
   */
  function HolidayEvent(date, desc, mask, attrs) {
    _classCallCheck(this, HolidayEvent);

    return _super.call(this, date, desc, mask, attrs);
  }
  /** @return {string} */


  _createClass(HolidayEvent, [{
    key: "basename",
    value: function basename() {
      return this.getDesc().replace(/ \d{4}$/, '').replace(/ \(CH''M\)$/, '').replace(/ \(observed\)$/, '').replace(/ \(Hoshana Raba\)$/, '').replace(/ [IV]+$/, '').replace(/: \d Candles?$/, '').replace(/: 8th Day$/, '').replace(/^Erev /, '');
    }
    /** @return {string} */

  }, {
    key: "url",
    value: function url() {
      var year = this.getDate().greg().getFullYear();

      if (year < 100) {
        return undefined;
      }

      var url = 'https://www.hebcal.com/holidays/' + this.basename().toLowerCase().replace(/'/g, '').replace(/ /g, '-') + '-' + this.urlDateSuffix();
      return this.getFlags() & flags.IL_ONLY ? url + '?i=on' : url;
    }
    /** @return {string} */

  }, {
    key: "urlDateSuffix",
    value: function urlDateSuffix() {
      var year = this.getDate().greg().getFullYear();
      return year;
    }
    /** @return {string} */

  }, {
    key: "getEmoji",
    value: function getEmoji() {
      if (this.emoji) {
        return this.emoji;
      } else if (this.getFlags() & flags.SPECIAL_SHABBAT) {
        return '🕍';
      } else {
        return '✡️';
      }
    }
  }]);

  return HolidayEvent;
}(Event);
var roshChodeshStr = 'Rosh Chodesh';
/** Represents Rosh Chodesh, the beginning of a new month */

var RoshChodeshEvent = /*#__PURE__*/function (_HolidayEvent) {
  _inherits(RoshChodeshEvent, _HolidayEvent);

  var _super2 = _createSuper(RoshChodeshEvent);

  /**
   * Constructs Rosh Chodesh event
   * @param {HDate} date Hebrew date event occurs
   * @param {string} monthName Hebrew month name (not translated)
   */
  function RoshChodeshEvent(date, monthName) {
    _classCallCheck(this, RoshChodeshEvent);

    return _super2.call(this, date, "".concat(roshChodeshStr, " ").concat(monthName), flags.ROSH_CHODESH);
  }
  /**
   * Returns (translated) description of this event
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  _createClass(RoshChodeshEvent, [{
    key: "render",
    value: function render(locale) {
      var monthName = this.getDesc().substring(roshChodeshStr.length + 1);
      return Locale.gettext(roshChodeshStr, locale) + ' ' + Locale.gettext(monthName, locale);
    }
    /** @return {string} */

  }, {
    key: "basename",
    value: function basename() {
      return this.getDesc();
    }
    /** @return {string} */

  }, {
    key: "getEmoji",
    value: function getEmoji() {
      return this.emoji || '🌒';
    }
  }]);

  return RoshChodeshEvent;
}(HolidayEvent);
/**
 * Because Asara B'Tevet often occurs twice in the same Gregorian year,
 * we subclass HolidayEvent to override the `url()` method.
 */

var AsaraBTevetEvent = /*#__PURE__*/function (_HolidayEvent2) {
  _inherits(AsaraBTevetEvent, _HolidayEvent2);

  var _super3 = _createSuper(AsaraBTevetEvent);

  /**
   * Constructs AsaraBTevetEvent
   * @param {HDate} date Hebrew date event occurs
   * @param {string} desc Description (not translated)
   * @param {number} [mask=0] optional holiday flags
   * @param {Object} [attrs={}]
   */
  function AsaraBTevetEvent(date, desc, mask, attrs) {
    _classCallCheck(this, AsaraBTevetEvent);

    return _super3.call(this, date, desc, mask, attrs);
  }
  /** @return {string} */


  _createClass(AsaraBTevetEvent, [{
    key: "urlDateSuffix",
    value: function urlDateSuffix() {
      var isoDateTime = this.getDate().greg().toISOString();
      var isoDate = isoDateTime.substring(0, isoDateTime.indexOf('T'));
      return isoDate.replace(/-/g, '');
    }
  }]);

  return AsaraBTevetEvent;
}(HolidayEvent);
var mevarchimChodeshStr = 'Shabbat Mevarchim Chodesh';
/** Represents Mevarchim haChodesh, the announcement of the new month */

var MevarchimChodeshEvent = /*#__PURE__*/function (_Event2) {
  _inherits(MevarchimChodeshEvent, _Event2);

  var _super4 = _createSuper(MevarchimChodeshEvent);

  /**
   * Constructs Mevarchim haChodesh event
   * @param {HDate} date Hebrew date event occurs
   * @param {string} monthName Hebrew month name (not translated)
   */
  function MevarchimChodeshEvent(date, monthName) {
    var _this;

    _classCallCheck(this, MevarchimChodeshEvent);

    _this = _super4.call(this, date, "".concat(mevarchimChodeshStr, " ").concat(monthName), flags.SHABBAT_MEVARCHIM);
    _this.monthName = monthName;
    var hyear = date.getFullYear();
    var hmonth = date.getMonth();
    var monNext = hmonth == HDate$1.monthsInYear(hyear) ? months.NISAN : hmonth + 1;
    var molad = new MoladEvent(date, hyear, monNext);
    _this.memo = molad.render();
    return _this;
  }
  /**
   * Returns (translated) description of this event
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  _createClass(MevarchimChodeshEvent, [{
    key: "render",
    value: function render(locale) {
      return Locale.gettext(mevarchimChodeshStr, locale) + ' ' + Locale.gettext(this.monthName, locale);
    }
  }]);

  return MevarchimChodeshEvent;
}(Event);
/**
 * @private
 */

var RoshHashanaEvent = /*#__PURE__*/function (_HolidayEvent3) {
  _inherits(RoshHashanaEvent, _HolidayEvent3);

  var _super5 = _createSuper(RoshHashanaEvent);

  /**
   * @private
   * @param {HDate} date Hebrew date event occurs
   * @param {number} hyear Hebrew year
   * @param {number} mask optional holiday flags
   */
  function RoshHashanaEvent(date, hyear, mask) {
    var _this2;

    _classCallCheck(this, RoshHashanaEvent);

    _this2 = _super5.call(this, date, "Rosh Hashana ".concat(hyear), mask, {
      emoji: '🍏🍯'
    });
    _this2.hyear = hyear;
    return _this2;
  }
  /**
   * Returns (translated) description of this event
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  _createClass(RoshHashanaEvent, [{
    key: "render",
    value: function render(locale) {
      return Locale.gettext('Rosh Hashana', locale) + ' ' + this.hyear;
    }
  }]);

  return RoshHashanaEvent;
}(HolidayEvent);
var SUN = 0; // const MON = 1;

var TUE = 2; // const WED = 3;

var THU = 4;
var FRI$1 = 5;
var SAT$1 = 6;
var NISAN$1 = months.NISAN;
var IYYAR = months.IYYAR;
var SIVAN$1 = months.SIVAN;
var TAMUZ = months.TAMUZ;
var AV = months.AV;
var ELUL$1 = months.ELUL;
var TISHREI$1 = months.TISHREI;
var CHESHVAN$1 = months.CHESHVAN;
var KISLEV$1 = months.KISLEV;
var TEVET$1 = months.TEVET;
var SHVAT$1 = months.SHVAT;
var ADAR_I$1 = months.ADAR_I;
var ADAR_II$1 = months.ADAR_II;
var CHAG = flags.CHAG;
var LIGHT_CANDLES$1 = flags.LIGHT_CANDLES;
var YOM_TOV_ENDS$1 = flags.YOM_TOV_ENDS;
var CHUL_ONLY$1 = flags.CHUL_ONLY;
var IL_ONLY$1 = flags.IL_ONLY;
var LIGHT_CANDLES_TZEIS$1 = flags.LIGHT_CANDLES_TZEIS;
var CHANUKAH_CANDLES$1 = flags.CHANUKAH_CANDLES;
var MINOR_FAST$1 = flags.MINOR_FAST;
var SPECIAL_SHABBAT$1 = flags.SPECIAL_SHABBAT;
var MODERN_HOLIDAY$1 = flags.MODERN_HOLIDAY;
var MAJOR_FAST$1 = flags.MAJOR_FAST;
var MINOR_HOLIDAY$1 = flags.MINOR_HOLIDAY;
var EREV$1 = flags.EREV;
var CHOL_HAMOED$1 = flags.CHOL_HAMOED;
/** @private */

var SimpleMap = /*#__PURE__*/function () {
  function SimpleMap() {
    _classCallCheck(this, SimpleMap);
  }

  _createClass(SimpleMap, [{
    key: "has",
    value:
    /**
     * @param {string} key
     * @return {boolean}
     */
    function has(key) {
      return typeof this[key] !== 'undefined';
    }
    /**
     * @param {string} key
     * @return {any}
     */

  }, {
    key: "get",
    value: function get(key) {
      return this[key];
    }
    /**
     * @param {string} key
     * @param {any} val
     */

  }, {
    key: "set",
    value: function set(key, val) {
      this[key] = val;
    }
    /**
     * @return {string[]}
     */

  }, {
    key: "keys",
    value: function keys() {
      return Object.keys(this);
    }
  }]);

  return SimpleMap;
}();

var sedraCache = new SimpleMap();
/**
 * @private
 * @param {number} hyear
 * @param {boolean} il
 * @return {Sedra}
 */

function getSedra(hyear, il) {
  var cacheKey = "".concat(hyear, "-").concat(il ? 1 : 0);
  var sedra = sedraCache.get(cacheKey);

  if (!sedra) {
    sedra = new Sedra(hyear, il);
    sedraCache.set(cacheKey, sedra);
  }

  return sedra;
}
var emojiIsraelFlag = {
  emoji: '🇮🇱'
};
var chanukahEmoji = '🕎';
var yearCache = Object.create(null);
/**
 * Lower-level holidays interface, which returns a `Map` of `Event`s indexed by
 * `HDate.toString()`. These events must filtered especially for `flags.IL_ONLY`
 * or `flags.CHUL_ONLY` depending on Israel vs. Diaspora holiday scheme.
 * @private
 * @param {number} year Hebrew year
 * @return {Map<string,Event[]>}
 */

function getHolidaysForYear(year) {
  if (typeof year !== 'number') {
    throw new TypeError("bad Hebrew year: ".concat(year));
  } else if (year < 1 || year > 32658) {
    throw new RangeError("Hebrew year ".concat(year, " out of range 1-32658"));
  }

  var cached = yearCache[year];

  if (cached) {
    return cached;
  }

  var RH = new HDate$1(1, TISHREI$1, year);
  var pesach = new HDate$1(15, NISAN$1, year);
  var h = new SimpleMap(); // eslint-disable-next-line require-jsdoc

  function add() {
    for (var _len = arguments.length, events = new Array(_len), _key = 0; _key < _len; _key++) {
      events[_key] = arguments[_key];
    }

    // for (const ev of events) {
    events.forEach(function (ev) {
      var key = ev.date.toString();

      if (h.has(key)) {
        h.get(key).push(ev);
      } else {
        h.set(key, [ev]);
      }
    });
  }
  /**
   * @private
   * @param {number} year
   * @param {Object[]} arr
   */


  function addEvents(year, arr) {
    arr.forEach(function (a) {
      add(new HolidayEvent(new HDate$1(a[0], a[1], year), a[2], a[3], a[4]));
    });
  } // standard holidays that don't shift based on year


  add(new RoshHashanaEvent(RH, year, CHAG | LIGHT_CANDLES_TZEIS$1));
  addEvents(year, [[2, TISHREI$1, 'Rosh Hashana II', CHAG | YOM_TOV_ENDS$1, {
    emoji: '🍏🍯'
  }], [3 + (RH.getDay() == THU), TISHREI$1, 'Tzom Gedaliah', MINOR_FAST$1], [9, TISHREI$1, 'Erev Yom Kippur', EREV$1 | LIGHT_CANDLES$1, {
    emoji: '📖✍️'
  }]]); // first SAT after RH

  add(new HolidayEvent(new HDate$1(HDate$1.dayOnOrBefore(SAT$1, 7 + RH.abs())), 'Shabbat Shuva', SPECIAL_SHABBAT$1));
  addEvents(year, [[10, TISHREI$1, 'Yom Kippur', CHAG | YOM_TOV_ENDS$1 | MAJOR_FAST$1, {
    emoji: '📖✍️'
  }], [14, TISHREI$1, 'Erev Sukkot', EREV$1 | LIGHT_CANDLES$1], // Attributes for Israel and Diaspora are different
  [15, TISHREI$1, 'Sukkot I', CHAG | LIGHT_CANDLES_TZEIS$1 | CHUL_ONLY$1], [16, TISHREI$1, 'Sukkot II', CHAG | YOM_TOV_ENDS$1 | CHUL_ONLY$1], [17, TISHREI$1, 'Sukkot III (CH\'\'M)', CHUL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 1
  }], [18, TISHREI$1, 'Sukkot IV (CH\'\'M)', CHUL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 2
  }], [19, TISHREI$1, 'Sukkot V (CH\'\'M)', CHUL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 3
  }], [20, TISHREI$1, 'Sukkot VI (CH\'\'M)', CHUL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 4
  }], [15, TISHREI$1, 'Sukkot I', CHAG | YOM_TOV_ENDS$1 | IL_ONLY$1], [16, TISHREI$1, 'Sukkot II (CH\'\'M)', IL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 1
  }], [17, TISHREI$1, 'Sukkot III (CH\'\'M)', IL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 2
  }], [18, TISHREI$1, 'Sukkot IV (CH\'\'M)', IL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 3
  }], [19, TISHREI$1, 'Sukkot V (CH\'\'M)', IL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 4
  }], [20, TISHREI$1, 'Sukkot VI (CH\'\'M)', IL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 5
  }], [21, TISHREI$1, 'Sukkot VII (Hoshana Raba)', LIGHT_CANDLES$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: -1
  }], [22, TISHREI$1, 'Shmini Atzeret', CHAG | LIGHT_CANDLES_TZEIS$1 | CHUL_ONLY$1], //    [22,  TISHREI,    "Shmini Atzeret / Simchat Torah", YOM_TOV_ENDS | IL_ONLY],
  [22, TISHREI$1, 'Shmini Atzeret', CHAG | YOM_TOV_ENDS$1 | IL_ONLY$1], [23, TISHREI$1, 'Simchat Torah', CHAG | YOM_TOV_ENDS$1 | CHUL_ONLY$1]]);
  add(new HolidayEvent(new HDate$1(24, KISLEV$1, year), 'Chanukah: 1 Candle', EREV$1 | MINOR_HOLIDAY$1 | CHANUKAH_CANDLES$1, {
    emoji: chanukahEmoji + KEYCAP_DIGITS[1]
  })); // yes, we know Kislev 30-32 are wrong
  // HDate() corrects the month automatically

  for (var candles = 2; candles <= 8; candles++) {
    var hd = new HDate$1(23 + candles, KISLEV$1, year);
    add(new HolidayEvent(hd, "Chanukah: ".concat(candles, " Candles"), MINOR_HOLIDAY$1 | CHANUKAH_CANDLES$1, {
      chanukahDay: candles - 1,
      emoji: chanukahEmoji + KEYCAP_DIGITS[candles]
    }));
  }

  add(new HolidayEvent(new HDate$1(32, KISLEV$1, year), 'Chanukah: 8th Day', MINOR_HOLIDAY$1, {
    chanukahDay: 8,
    emoji: chanukahEmoji
  }));
  add(new AsaraBTevetEvent(new HDate$1(10, TEVET$1, year), 'Asara B\'Tevet', MINOR_FAST$1), new HolidayEvent(new HDate$1(15, SHVAT$1, year), 'Tu BiShvat', MINOR_HOLIDAY$1, {
    emoji: '🌳'
  }));
  var pesachAbs = pesach.abs();
  add(new HolidayEvent(new HDate$1(HDate$1.dayOnOrBefore(SAT$1, pesachAbs - 43)), 'Shabbat Shekalim', SPECIAL_SHABBAT$1), new HolidayEvent(new HDate$1(HDate$1.dayOnOrBefore(SAT$1, pesachAbs - 30)), 'Shabbat Zachor', SPECIAL_SHABBAT$1), new HolidayEvent(new HDate$1(pesachAbs - (pesach.getDay() == TUE ? 33 : 31)), 'Ta\'anit Esther', MINOR_FAST$1));
  addEvents(year, [[13, ADAR_II$1, 'Erev Purim', EREV$1 | MINOR_HOLIDAY$1, {
    emoji: '🎭️📜'
  }], [14, ADAR_II$1, 'Purim', MINOR_HOLIDAY$1, {
    emoji: '🎭️📜'
  }]]);
  add(new HolidayEvent(new HDate$1(pesachAbs - (pesach.getDay() == SUN ? 28 : 29)), 'Shushan Purim', MINOR_HOLIDAY$1, {
    emoji: '🎭️📜'
  }), new HolidayEvent(new HDate$1(HDate$1.dayOnOrBefore(SAT$1, pesachAbs - 14) - 7), 'Shabbat Parah', SPECIAL_SHABBAT$1), new HolidayEvent(new HDate$1(HDate$1.dayOnOrBefore(SAT$1, pesachAbs - 14)), 'Shabbat HaChodesh', SPECIAL_SHABBAT$1), new HolidayEvent(new HDate$1(HDate$1.dayOnOrBefore(SAT$1, pesachAbs - 1)), 'Shabbat HaGadol', SPECIAL_SHABBAT$1), new HolidayEvent( // if the fast falls on Shabbat, move to Thursday
  pesach.prev().getDay() == SAT$1 ? pesach.onOrBefore(THU) : new HDate$1(14, NISAN$1, year), 'Ta\'anit Bechorot', MINOR_FAST$1));
  addEvents(year, [[14, NISAN$1, 'Erev Pesach', EREV$1 | LIGHT_CANDLES$1], // Attributes for Israel and Diaspora are different
  [15, NISAN$1, 'Pesach I', CHAG | YOM_TOV_ENDS$1 | IL_ONLY$1], [16, NISAN$1, 'Pesach II (CH\'\'M)', IL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 1
  }], [17, NISAN$1, 'Pesach III (CH\'\'M)', IL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 2
  }], [18, NISAN$1, 'Pesach IV (CH\'\'M)', IL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 3
  }], [19, NISAN$1, 'Pesach V (CH\'\'M)', IL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 4
  }], [20, NISAN$1, 'Pesach VI (CH\'\'M)', LIGHT_CANDLES$1 | IL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 5
  }], [21, NISAN$1, 'Pesach VII', CHAG | YOM_TOV_ENDS$1 | IL_ONLY$1], [15, NISAN$1, 'Pesach I', CHAG | LIGHT_CANDLES_TZEIS$1 | CHUL_ONLY$1], [16, NISAN$1, 'Pesach II', CHAG | YOM_TOV_ENDS$1 | CHUL_ONLY$1], [17, NISAN$1, 'Pesach III (CH\'\'M)', CHUL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 1
  }], [18, NISAN$1, 'Pesach IV (CH\'\'M)', CHUL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 2
  }], [19, NISAN$1, 'Pesach V (CH\'\'M)', CHUL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 3
  }], [20, NISAN$1, 'Pesach VI (CH\'\'M)', LIGHT_CANDLES$1 | CHUL_ONLY$1 | CHOL_HAMOED$1, {
    cholHaMoedDay: 4
  }], [21, NISAN$1, 'Pesach VII', CHAG | LIGHT_CANDLES_TZEIS$1 | CHUL_ONLY$1], [22, NISAN$1, 'Pesach VIII', CHAG | YOM_TOV_ENDS$1 | CHUL_ONLY$1], [14, IYYAR, 'Pesach Sheni', MINOR_HOLIDAY$1], [18, IYYAR, 'Lag BaOmer', MINOR_HOLIDAY$1, {
    emoji: '🔥'
  }], [5, SIVAN$1, 'Erev Shavuot', EREV$1 | LIGHT_CANDLES$1, {
    emoji: '⛰️🌸'
  }], [6, SIVAN$1, 'Shavuot', CHAG | YOM_TOV_ENDS$1 | IL_ONLY$1, {
    emoji: '⛰️🌸'
  }], [6, SIVAN$1, 'Shavuot I', CHAG | LIGHT_CANDLES_TZEIS$1 | CHUL_ONLY$1, {
    emoji: '⛰️🌸'
  }], [7, SIVAN$1, 'Shavuot II', CHAG | YOM_TOV_ENDS$1 | CHUL_ONLY$1, {
    emoji: '⛰️🌸'
  }], [15, AV, 'Tu B\'Av', MINOR_HOLIDAY$1, {
    emoji: '❤️'
  }], [1, ELUL$1, 'Rosh Hashana LaBehemot', MINOR_HOLIDAY$1, {
    emoji: '🐑'
  }]]);
  add(new HolidayEvent(new HDate$1(HDate$1.dayOnOrBefore(SAT$1, new HDate$1(1, TISHREI$1, year + 1).abs() - 4)), 'Leil Selichot', MINOR_HOLIDAY$1, {
    emoji: '🕍'
  }));
  add(new HolidayEvent(new HDate$1(29, ELUL$1, year), 'Erev Rosh Hashana', EREV$1 | LIGHT_CANDLES$1, {
    emoji: '🍏🍯'
  }));

  if (HDate$1.isLeapYear(year)) {
    add(new HolidayEvent(new HDate$1(14, ADAR_I$1, year), 'Purim Katan', MINOR_HOLIDAY$1, {
      emoji: '🎭️'
    }));
  }

  if (year >= 5711) {
    // Yom HaShoah first observed in 1951
    var nisan27dt = new HDate$1(27, NISAN$1, year);
    /* When the actual date of Yom Hashoah falls on a Friday, the
       * state of Israel observes Yom Hashoah on the preceding
       * Thursday. When it falls on a Sunday, Yom Hashoah is observed
       * on the following Monday.
       * http://www.ushmm.org/remembrance/dor/calendar/
       */

    if (nisan27dt.getDay() == FRI$1) {
      nisan27dt = new HDate$1(26, NISAN$1, year);
    } else if (nisan27dt.getDay() == SUN) {
      nisan27dt = new HDate$1(28, NISAN$1, year);
    }

    add(new HolidayEvent(nisan27dt, 'Yom HaShoah', MODERN_HOLIDAY$1));
  }

  if (year >= 5708) {
    // Yom HaAtzma'ut only celebrated after 1948
    var day;

    if (pesach.getDay() == SUN) {
      day = 2;
    } else if (pesach.getDay() == SAT$1) {
      day = 3;
    } else if (year < 5764) {
      day = 4;
    } else if (pesach.getDay() == TUE) {
      day = 5;
    } else {
      day = 4;
    }

    add(new HolidayEvent(new HDate$1(day, IYYAR, year), 'Yom HaZikaron', MODERN_HOLIDAY$1, emojiIsraelFlag), new HolidayEvent(new HDate$1(day + 1, IYYAR, year), 'Yom HaAtzma\'ut', MODERN_HOLIDAY$1, emojiIsraelFlag));
  }

  if (year >= 5727) {
    // Yom Yerushalayim only celebrated after 1967
    add(new HolidayEvent(new HDate$1(28, IYYAR, year), 'Yom Yerushalayim', MODERN_HOLIDAY$1, emojiIsraelFlag));
  }

  if (year >= 5769) {
    add(new HolidayEvent(new HDate$1(29, CHESHVAN$1, year), 'Sigd', MODERN_HOLIDAY$1));
  }

  if (year >= 5777) {
    add(new HolidayEvent(new HDate$1(7, CHESHVAN$1, year), 'Yom HaAliyah School Observance', MODERN_HOLIDAY$1, emojiIsraelFlag), new HolidayEvent(new HDate$1(10, NISAN$1, year), 'Yom HaAliyah', MODERN_HOLIDAY$1, emojiIsraelFlag));
  }

  var tamuz17 = new HDate$1(17, TAMUZ, year);
  var tamuz17attrs;

  if (tamuz17.getDay() == SAT$1) {
    tamuz17 = new HDate$1(18, TAMUZ, year);
    tamuz17attrs = {
      observed: true
    };
  }

  add(new HolidayEvent(tamuz17, 'Tzom Tammuz', MINOR_FAST$1, tamuz17attrs));
  var av9dt = new HDate$1(9, AV, year);
  var av9title = 'Tish\'a B\'Av';
  var av9attrs;

  if (av9dt.getDay() == SAT$1) {
    av9dt = av9dt.next();
    av9attrs = {
      observed: true
    };
    av9title += ' (observed)';
  }

  var av9abs = av9dt.abs();
  add(new HolidayEvent(new HDate$1(HDate$1.dayOnOrBefore(SAT$1, av9abs)), 'Shabbat Chazon', SPECIAL_SHABBAT$1), new HolidayEvent(av9dt.prev(), 'Erev Tish\'a B\'Av', EREV$1 | MAJOR_FAST$1, av9attrs), new HolidayEvent(av9dt, av9title, MAJOR_FAST$1, av9attrs), new HolidayEvent(new HDate$1(HDate$1.dayOnOrBefore(SAT$1, av9abs + 7)), 'Shabbat Nachamu', SPECIAL_SHABBAT$1));
  var monthsInYear = HDate$1.monthsInYear(year);

  for (var month = 1; month <= monthsInYear; month++) {
    var monthName = HDate$1.getMonthName(month, year);

    if ((month == NISAN$1 ? HDate$1.daysInMonth(HDate$1.monthsInYear(year - 1), year - 1) : HDate$1.daysInMonth(month - 1, year)) == 30) {
      add(new RoshChodeshEvent(new HDate$1(1, month, year), monthName));
      add(new RoshChodeshEvent(new HDate$1(30, month - 1, year), monthName));
    } else if (month !== TISHREI$1) {
      add(new RoshChodeshEvent(new HDate$1(1, month, year), monthName));
    }

    if (month == ELUL$1) {
      continue;
    } // Don't worry about month overrun; will get "Nisan" for month=14


    var nextMonthName = HDate$1.getMonthName(month + 1, year);
    add(new MevarchimChodeshEvent(new HDate$1(29, month, year).onOrBefore(SAT$1), nextMonthName));
  }

  var sedra = getSedra(year, false);
  var beshalachHd = sedra.find(15);
  add(new HolidayEvent(beshalachHd, 'Shabbat Shirah', SPECIAL_SHABBAT$1));
  yearCache[year] = h;
  return h;
}

var version="3.30.0";

var headers$1={"plural-forms":"nplurals=2; plural=(n > 1);",language:"en_CA@ashkenazi"};var contexts$1={"":{Berachot:["Berachos"],Shabbat:["Shabbos"],Taanit:["Taanis"],Yevamot:["Yevamos"],Ketubot:["Kesubos"],"Baba Batra":["Baba Basra"],Makkot:["Makkos"],Shevuot:["Shevuos"],Horayot:["Horayos"],Menachot:["Menachos"],Bechorot:["Bechoros"],Keritot:["Kerisos"],Midot:["Midos"],"Achrei Mot":["Achrei Mos"],Bechukotai:["Bechukosai"],"Beha'alotcha":["Beha'aloscha"],Bereshit:["Bereshis"],Chukat:["Chukas"],"Erev Shavuot":["Erev Shavuos"],"Erev Sukkot":["Erev Sukkos"],"Ki Tavo":["Ki Savo"],"Ki Teitzei":["Ki Seitzei"],"Ki Tisa":["Ki Sisa"],Matot:["Matos"],"Purim Katan":["Purim Koton"],Tazria:["Sazria"],"Shabbat Chazon":["Shabbos Chazon"],"Shabbat HaChodesh":["Shabbos HaChodesh"],"Shabbat HaGadol":["Shabbos HaGadol"],"Shabbat Nachamu":["Shabbos Nachamu"],"Shabbat Parah":["Shabbos Parah"],"Shabbat Shekalim":["Shabbos Shekalim"],"Shabbat Shuva":["Shabbos Shuvah"],"Shabbat Zachor":["Shabbos Zachor"],Shavuot:["Shavuos"],"Shavuot I":["Shavuos I"],"Shavuot II":["Shavuos II"],Shemot:["Shemos"],"Shmini Atzeret":["Shmini Atzeres"],"Simchat Torah":["Simchas Torah"],Sukkot:["Sukkos"],"Sukkot I":["Sukkos I"],"Sukkot II":["Sukkos II"],"Sukkot II (CH''M)":["Sukkos II (CH''M)"],"Sukkot III (CH''M)":["Sukkos III (CH''M)"],"Sukkot IV (CH''M)":["Sukkos IV (CH''M)"],"Sukkot V (CH''M)":["Sukkos V (CH''M)"],"Sukkot VI (CH''M)":["Sukkos VI (CH''M)"],"Sukkot VII (Hoshana Raba)":["Sukkos VII (Hoshana Raba)"],"Ta'anit Bechorot":["Ta'anis Bechoros"],"Ta'anit Esther":["Ta'anis Esther"],Toldot:["Toldos"],Vaetchanan:["Vaeschanan"],Yitro:["Yisro"],"Vezot Haberakhah":["Vezos Haberakhah"],Parashat:["Parshas"],"Leil Selichot":["Leil Selichos"],"Shabbat Mevarchim Chodesh":["Shabbos Mevorchim Chodesh"],"Shabbat Shirah":["Shabbos Shirah"],Tevet:["Teves"],"Asara B'Tevet":["Asara B'Teves"]}};var poAshkenazi = {headers:headers$1,contexts:contexts$1};

Locale.addLocale('ashkenazi', poAshkenazi);
Locale.addLocale('a', poAshkenazi);

var headers={"plural-forms":"nplurals=2; plural=(n > 1);",language:"he_IL"};var contexts={"":{Berachot:["ברכות"],Shabbat:["שַׁבָּת"],Eruvin:["עירובין"],Pesachim:["פסחים"],Shekalim:["שקלים"],Yoma:["יומא"],Sukkah:["סוכה"],Beitzah:["ביצה"],Taanit:["תענית"],Megillah:["מגילה"],"Moed Katan":["מועד קטן"],Chagigah:["חגיגה"],Yevamot:["יבמות"],Ketubot:["כתובות"],Nedarim:["נדרים"],Nazir:["נזיר"],Sotah:["סוטה"],Gitin:["גיטין"],Kiddushin:["קידושין"],"Baba Kamma":["בבא קמא"],"Baba Metzia":["בבא מציעא"],"Baba Batra":["בבא בתרא"],Sanhedrin:["סנהדרין"],Makkot:["מכות"],Shevuot:["שבועות"],"Avodah Zarah":["עבודה זרה"],Horayot:["הוריות"],Zevachim:["זבחים"],Menachot:["מנחות"],Chullin:["חולין"],Bechorot:["בכורות"],Arachin:["ערכין"],Temurah:["תמורה"],Keritot:["כריתות"],Meilah:["מעילה"],Kinnim:["קינים"],Tamid:["תמיד"],Midot:["מדות"],Niddah:["נדה"],"Daf Yomi: %s %d":["דף יומי: %s %d"],"Daf Yomi":["דף יומי"],Parashat:["פָּרָשַׁת"],"Achrei Mot":["אַחֲרֵי מוֹת"],Balak:["בָּלָק"],Bamidbar:["בְּמִדְבַּר"],Bechukotai:["בְּחֻקֹּתַי"],"Beha'alotcha":["בְּהַעֲלֹתְךָ"],Behar:["בְּהַר"],Bereshit:["בְּרֵאשִׁית"],Beshalach:["בְּשַׁלַּח"],Bo:["בֹּא"],"Chayei Sara":["חַיֵּי שָֹרָה"],Chukat:["חֻקַּת"],Devarim:["דְּבָרִים"],Eikev:["עֵקֶב"],Emor:["אֱמוֹר"],"Ha'Azinu":["הַאֲזִינוּ"],Kedoshim:["קְדשִׁים"],"Ki Tavo":["כִּי־תָבוֹא"],"Ki Teitzei":["כִּי־תֵצֵא"],"Ki Tisa":["כִּי תִשָּׂא"],Korach:["קוֹרַח"],"Lech-Lecha":["לֶךְ־לְךָ"],Masei:["מַסְעֵי"],Matot:["מַּטּוֹת"],Metzora:["מְּצֹרָע"],Miketz:["מִקֵּץ"],Mishpatim:["מִּשְׁפָּטִים"],Nasso:["נָשׂא"],Nitzavim:["נִצָּבִים"],Noach:["נֹחַ"],Pekudei:["פְקוּדֵי"],Pinchas:["פִּינְחָס"],"Re'eh":["רְאֵה"],"Sh'lach":["שְׁלַח־לְךָ"],Shemot:["שְׁמוֹת"],Shmini:["שְּׁמִינִי"],Shoftim:["שׁוֹפְטִים"],Tazria:["תַזְרִיעַ"],Terumah:["תְּרוּמָה"],Tetzaveh:["תְּצַוֶּה"],Toldot:["תּוֹלְדוֹת"],Tzav:["צַו"],Vaera:["וָאֵרָא"],Vaetchanan:["וָאֶתְחַנַּן"],Vayakhel:["וַיַּקְהֵל"],Vayechi:["וַיְחִי"],Vayeilech:["וַיֵּלֶךְ"],Vayera:["וַיֵּרָא"],Vayeshev:["וַיֵּשֶׁב"],Vayetzei:["וַיֵּצֵא"],Vayigash:["וַיִּגַּשׁ"],Vayikra:["וַיִּקְרָא"],Vayishlach:["וַיִּשְׁלַח"],"Vezot Haberakhah":["וְזֹאת הַבְּרָכָה"],Yitro:["יִתְרוֹ"],"Asara B'Tevet":["עֲשָׂרָה בְּטֵבֵת"],"Candle lighting":["הַדלָקָת נֵרוֹת"],Chanukah:["חֲנוּכָּה"],"Chanukah: 1 Candle":["חֲנוּכָּה: א׳ נֵר"],"Chanukah: 2 Candles":["חֲנוּכָּה: ב׳ נֵרוֹת"],"Chanukah: 3 Candles":["חֲנוּכָּה: ג׳ נֵרוֹת"],"Chanukah: 4 Candles":["חֲנוּכָּה: ד׳ נֵרוֹת"],"Chanukah: 5 Candles":["חֲנוּכָּה: ה׳ נֵרוֹת"],"Chanukah: 6 Candles":["חֲנוּכָּה: ו׳ נֵרוֹת"],"Chanukah: 7 Candles":["חֲנוּכָּה: ז׳ נֵרוֹת"],"Chanukah: 8 Candles":["חֲנוּכָּה: ח׳ נֵרוֹת"],"Chanukah: 8th Day":["חֲנוּכָּה: יוֹם ח׳"],"Days of the Omer":["עוֹמֶר"],Omer:["עוֹמֶר"],"day of the Omer":["בָּעוֹמֶר"],"Erev Pesach":["עֶרֶב פֶּסַח"],"Erev Purim":["עֶרֶב פּוּרִים"],"Erev Rosh Hashana":["עֶרֶב רֹאשׁ הַשָּׁנָה"],"Erev Shavuot":["עֶרֶב שָׁבוּעוֹת"],"Erev Simchat Torah":["עֶרֶב שִׂמְחַת תּוֹרָה"],"Erev Sukkot":["עֶרֶב סוּכּוֹת"],"Erev Tish'a B'Av":["עֶרֶב תִּשְׁעָה בְּאָב"],"Erev Yom Kippur":["עֶרֶב יוֹם כִּפּוּר"],Havdalah:["הַבדָלָה"],"Lag BaOmer":["ל״ג בָּעוֹמֶר"],"Leil Selichot":["סליחות"],Pesach:["פֶּסַח"],"Pesach I":["פֶּסַח א׳"],"Pesach II":["פֶּסַח ב׳"],"Pesach II (CH''M)":["פֶּסַח ב׳ (חוה״מ)"],"Pesach III (CH''M)":["פֶּסַח ג׳ (חוה״מ)"],"Pesach IV (CH''M)":["פֶּסַח ד׳ (חוה״מ)"],"Pesach Sheni":["פֶּסַח שני"],"Pesach V (CH''M)":["פֶּסַח ה׳ (חוה״מ)"],"Pesach VI (CH''M)":["פֶּסַח ו׳ (חוה״מ)"],"Pesach VII":["פֶּסַח ז׳"],"Pesach VIII":["פֶּסַח ח׳"],Purim:["פּוּרִים"],"Purim Katan":["פּוּרִים קָטָן"],"Rosh Chodesh %s":["רֹאשׁ חוֹדֶשׁ %s"],"Rosh Chodesh":["רֹאשׁ חוֹדֶשׁ"],Adar:["אַדָר"],"Adar I":["אַדָר א׳"],"Adar II":["אַדָר ב׳"],Av:["אָב"],Cheshvan:["חֶשְׁוָן"],Elul:["אֱלוּל"],Iyyar:["אִיָיר"],Kislev:["כִּסְלֵו"],Nisan:["נִיסָן"],"Sh'vat":["שְׁבָט"],Sivan:["סִיוָן"],Tamuz:["תַּמּוּז"],Tevet:["טֵבֵת"],Tishrei:["תִשְׁרֵי"],"Rosh Hashana":["רֹאשׁ הַשָּׁנָה"],"Rosh Hashana I":["רֹאשׁ הַשָּׁנָה א׳"],"Rosh Hashana II":["רֹאשׁ הַשָּׁנָה ב׳"],"Shabbat Chazon":["שַׁבָּת חֲזוֹן"],"Shabbat HaChodesh":["שַׁבָּת הַחֹדֶשׁ"],"Shabbat HaGadol":["שַׁבָּת הַגָּדוֹל"],"Shabbat Machar Chodesh":["שַׁבָּת מָחָר חוֹדֶשׁ"],"Shabbat Nachamu":["שַׁבָּת נַחֲמוּ"],"Shabbat Parah":["שַׁבָּת פּרה"],"Shabbat Rosh Chodesh":["שַׁבָּת רֹאשׁ חוֹדֶשׁ"],"Shabbat Shekalim":["שַׁבָּת שְׁקָלִים"],"Shabbat Shuva":["שַׁבָּת שׁוּבָה"],"Shabbat Zachor":["שַׁבָּת זָכוֹר"],Shavuot:["שָׁבוּעוֹת"],"Shavuot I":["שָׁבוּעוֹת א׳"],"Shavuot II":["שָׁבוּעוֹת ב׳"],"Shmini Atzeret":["שְׁמִינִי עֲצֶרֶת"],"Shushan Purim":["שׁוּשָׁן פּוּרִים"],Sigd:["סיגד"],"Simchat Torah":["שִׂמְחַת תּוֹרָה"],Sukkot:["סוּכּוֹת"],"Sukkot I":["סוּכּוֹת א׳"],"Sukkot II":["סוּכּוֹת ב׳"],"Sukkot II (CH''M)":["סוּכּוֹת ב׳ (חוה״מ)"],"Sukkot III (CH''M)":["סוּכּוֹת ג׳ (חוה״מ)"],"Sukkot IV (CH''M)":["סוּכּוֹת ד׳ (חוה״מ)"],"Sukkot V (CH''M)":["סוּכּוֹת ה׳ (חוה״מ)"],"Sukkot VI (CH''M)":["סוּכּוֹת ו׳ (חוה״מ)"],"Sukkot VII (Hoshana Raba)":["סוּכּוֹת ז׳ (הוֹשַׁעְנָא רַבָּה)"],"Ta'anit Bechorot":["תַּעֲנִית בְּכוֹרוֹת"],"Ta'anit Esther":["תַּעֲנִית אֶסְתֵּר"],"Tish'a B'Av":["תִּשְׁעָה בְּאָב"],"Tu B'Av":["טוּ בְּאָב"],"Tu BiShvat":["טוּ בִּשְׁבָט"],"Tu B'Shvat":["טוּ בִּשְׁבָט"],"Tzom Gedaliah":["צוֹם גְּדַלְיָה"],"Tzom Tammuz":["צוֹם תָּמוּז"],"Yom HaAtzma'ut":["יוֹם הָעַצְמָאוּת"],"Yom HaShoah":["יוֹם הַשּׁוֹאָה"],"Yom HaZikaron":["יוֹם הַזִּכָּרוֹן"],"Yom Kippur":["יוֹם כִּפּוּר"],"Yom Yerushalayim":["יוֹם יְרוּשָׁלַיִם"],"Yom HaAliyah":["יוֹם העלייה"],"Yom HaAliyah School Observance":["שמירת בית הספר ליום העלייה"],"Pesach I (on Shabbat)":["פֶּסַח יוֹם א׳ (בְּשַׁבָּת)"],"Pesach Chol ha-Moed Day 1":["פֶּסַח חוֹל הַמּוֹעֵד יוֹם א׳"],"Pesach Chol ha-Moed Day 2":["פֶּסַח חוֹל הַמּוֹעֵד יוֹם ב׳"],"Pesach Chol ha-Moed Day 3":["פֶּסַח חוֹל הַמּוֹעֵד יוֹם ג׳"],"Pesach Chol ha-Moed Day 4":["פֶּסַח חוֹל הַמּוֹעֵד יוֹם ד׳"],"Pesach Chol ha-Moed Day 5":["פֶּסַח חוֹל הַמּוֹעֵד יוֹם ה׳"],"Pesach Shabbat Chol ha-Moed":["פֶּסַח שַׁבָּת חוֹל הַמּוֹעֵד"],"Shavuot II (on Shabbat)":["שָׁבוּעוֹת יוֹם ב׳ (בְּשַׁבָּת)"],"Rosh Hashana I (on Shabbat)":["רֹאשׁ הַשָּׁנָה יוֹם א׳ (בְּשַׁבָּת)"],"Yom Kippur (on Shabbat)":["יוֹם כִּפּוּר (בְּשַׁבָּת)"],"Yom Kippur (Mincha, Traditional)":["יוֹם כִּפּוּר מנחה"],"Yom Kippur (Mincha, Alternate)":["יוֹם כִּפּוּר מנחה"],"Sukkot I (on Shabbat)":["סוּכּוֹת יוֹם א׳ (בְּשַׁבָּת)"],"Sukkot Chol ha-Moed Day 1":["סוּכּוֹת יוֹם ג׳ (חוֹל הַמּוֹעֵד)"],"Sukkot Chol ha-Moed Day 2":["סוּכּוֹת יוֹם ד׳ (חוֹל הַמּוֹעֵד)"],"Sukkot Chol ha-Moed Day 3":["סוּכּוֹת יוֹם ה׳ (חוֹל הַמּוֹעֵד)"],"Sukkot Chol ha-Moed Day 4":["סוּכּוֹת יוֹם ו׳ (חוֹל הַמּוֹעֵד)"],"Sukkot Shabbat Chol ha-Moed":["סוּכּוֹת שַׁבָּת חוֹל הַמּוֹעֵד"],"Sukkot Final Day (Hoshana Raba)":["סוּכּוֹת ז׳ (הוֹשַׁעְנָא רַבָּה)"],"Rosh Chodesh Adar":["רֹאשׁ חוֹדֶשׁ אַדָר"],"Rosh Chodesh Adar I":["רֹאשׁ חוֹדֶשׁ אַדָר א׳"],"Rosh Chodesh Adar II":["רֹאשׁ חוֹדֶשׁ אַדָר ב׳"],"Rosh Chodesh Av":["רֹאשׁ חוֹדֶשׁ אָב"],"Rosh Chodesh Cheshvan":["רֹאשׁ חוֹדֶשׁ חֶשְׁוָן"],"Rosh Chodesh Elul":["רֹאשׁ חוֹדֶשׁ אֱלוּל"],"Rosh Chodesh Iyyar":["רֹאשׁ חוֹדֶשׁ אִיָיר"],"Rosh Chodesh Kislev":["רֹאשׁ חוֹדֶשׁ כִּסְלֵו"],"Rosh Chodesh Nisan":["רֹאשׁ חוֹדֶשׁ נִיסָן"],"Rosh Chodesh Sh'vat":["רֹאשׁ חוֹדֶשׁ שְׁבָט"],"Rosh Chodesh Sivan":["רֹאשׁ חוֹדֶשׁ סִיוָן"],"Rosh Chodesh Tamuz":["רֹאשׁ חוֹדֶשׁ תָּמוּז"],"Rosh Chodesh Tevet":["רֹאשׁ חוֹדֶשׁ טֵבֵת"],min:["דקות"],"Fast begins":["תחילת הַצוֹם"],"Fast ends":["סִיּוּם הַצוֹם"],"Rosh Hashana LaBehemot":["רֹאשׁ הַשָּׁנָה לְמַעְשַׂר בְּהֵמָה"],"Tish'a B'Av (observed)":["תִּשְׁעָה בְּאָב נִדחֶה"],"Shabbat Mevarchim Chodesh":["שַׁבָּת מברכים חוֹדֶשׁ"],"Shabbat Shirah":["שַׁבָּת שִׁירָה"],chatzotNight:["חֲצוֹת הַלַיְלָה"],alotHaShachar:["עֲלוֹת הַשַּׁחַר"],misheyakir:["משיכיר - זמן ציצית ותפילין"],misheyakirMachmir:["משיכיר - זמן ציצית ותפילין"],neitzHaChama:["הַנֵץ הַחַמָּה"],sofZmanShma:["סוֹף זְמַן קְרִיאַת שְׁמַע גר״א"],sofZmanTfilla:["סוֹף זְמַן תְּפִלָּה גר״א"],chatzot:["חֲצוֹת הַיּוֹם"],minchaGedola:["מִנְחָה גְּדוֹלָה"],minchaKetana:["מִנְחָה קְטַנָּה"],plagHaMincha:["פְּלַג הַמִּנְחָה"],shkiah:["שְׁקִיעָה"],tzeit:["צֵאת כוכבים"],Lovingkindness:["חֶֽסֶד"],Might:["גְבוּרָה"],Beauty:["תִּפאֶרֶת"],Eternity:["נֶּֽצַח"],Splendor:["הוֹד"],Foundation:["יְּסוֹד"],Majesty:["מַּלְכוּת"],day:["יוֹם"],"Chanukah Day 1":["חֲנוּכָּה יוֹם א׳"],"Chanukah Day 2":["חֲנוּכָּה יוֹם ב׳"],"Chanukah Day 3":["חֲנוּכָּה יוֹם ג׳"],"Chanukah Day 4":["חֲנוּכָּה יוֹם ד׳"],"Chanukah Day 5":["חֲנוּכָּה יוֹם ה׳"],"Chanukah Day 6":["חֲנוּכָּה יוֹם ו׳"],"Chanukah Day 7":["חֲנוּכָּה יוֹם ז׳"],"Chanukah Day 8":["חֲנוּכָּה יוֹם ח׳"]}};var poHe = {headers:headers,contexts:contexts};

Locale.addLocale('he', poHe);
Locale.addLocale('h', poHe);
var heStrs = poHe.contexts[''];
var heNoNikud = {};
Object.keys(heStrs).forEach(function (key) {
  heNoNikud[key] = [Locale.hebrewStripNikkud(heStrs[key][0])];
});
var localeName = 'he-x-NoNikud';
var poHeNoNikud = {
  headers: {
    'plural-forms': 'nplurals=2; plural=(n!=1);',
    'language': localeName
  },
  contexts: {
    '': heNoNikud
  }
};
Locale.addLocale(localeName, poHeNoNikud);

/*
    Hebcal - A Jewish Calendar Generator
    Copyright (c) 1994-2020 Danny Sadinoff
    Portions copyright Eyal Schachter and Michael J. Radwin

    https://github.com/hebcal/hebcal-es6

    This program is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
var FRI = 5;
var SAT = 6;
var NISAN = months.NISAN; // const IYYAR = months.IYYAR;

var SIVAN = months.SIVAN; // const TAMUZ = months.TAMUZ;
// const AV = months.AV;

var ELUL = months.ELUL;
var TISHREI = months.TISHREI;
var CHESHVAN = months.CHESHVAN;
var KISLEV = months.KISLEV;
var TEVET = months.TEVET;
var SHVAT = months.SHVAT;
var ADAR_I = months.ADAR_I;
var ADAR_II = months.ADAR_II;
var LIGHT_CANDLES = flags.LIGHT_CANDLES;
var YOM_TOV_ENDS = flags.YOM_TOV_ENDS;
var CHUL_ONLY = flags.CHUL_ONLY;
var IL_ONLY = flags.IL_ONLY;
var LIGHT_CANDLES_TZEIS = flags.LIGHT_CANDLES_TZEIS;
var CHANUKAH_CANDLES = flags.CHANUKAH_CANDLES;
var MINOR_FAST = flags.MINOR_FAST;
var SPECIAL_SHABBAT = flags.SPECIAL_SHABBAT;
var MODERN_HOLIDAY = flags.MODERN_HOLIDAY;
var MAJOR_FAST = flags.MAJOR_FAST;
var ROSH_CHODESH = flags.ROSH_CHODESH;
var PARSHA_HASHAVUA = flags.PARSHA_HASHAVUA;
var DAF_YOMI = flags.DAF_YOMI;
var OMER_COUNT = flags.OMER_COUNT;
var SHABBAT_MEVARCHIM = flags.SHABBAT_MEVARCHIM;
var MINOR_HOLIDAY = flags.MINOR_HOLIDAY;
var EREV = flags.EREV;
var CHOL_HAMOED = flags.CHOL_HAMOED;
var unrecognizedAlreadyWarned = Object.create(null);
var RECOGNIZED_OPTIONS = {
  location: 1,
  year: 1,
  isHebrewYear: 1,
  month: 1,
  numYears: 1,
  start: 1,
  end: 1,
  candlelighting: 1,
  candleLightingMins: 1,
  havdalahMins: 1,
  havdalahDeg: 1,
  sedrot: 1,
  il: 1,
  noMinorFast: 1,
  noModern: 1,
  shabbatMevarchim: 1,
  noRoshChodesh: 1,
  noSpecialShabbat: 1,
  noHolidays: 1,
  dafyomi: 1,
  omer: 1,
  molad: 1,
  ashkenazi: 1,
  locale: 1,
  addHebrewDates: 1,
  addHebrewDatesForEvents: 1,
  appendHebrewToSubject: 1,
  mask: 1,
  userMask: 1
};
/**
 * @private
 * @param {HebrewCalendar.Options} options
 */

function warnUnrecognizedOptions(options) {
  Object.keys(options).forEach(function (k) {
    if (typeof RECOGNIZED_OPTIONS[k] === 'undefined' && !unrecognizedAlreadyWarned[k]) {
      console.warn("Ignoring unrecognized HebrewCalendar option: ".concat(k));
      unrecognizedAlreadyWarned[k] = true;
    }
  });
}
/**
 * A bit like Object.assign(), but just a shallow copy
 * @private
 * @param {any} target
 * @param {any} source
 * @return {any}
 */


function shallowCopy(target, source) {
  Object.keys(source).forEach(function (k) {
    return target[k] = source[k];
  });
  return target;
}
/**
 * Modifies options in-place
 * @private
 * @param {HebrewCalendar.Options} options
 */


function checkCandleOptions(options) {
  if (!options.candlelighting) {
    return;
  }

  if (typeof options.location === 'undefined' || !options.location instanceof Location) {
    throw new TypeError('options.candlelighting requires valid options.location');
  }

  if (typeof options.havdalahMins === 'number' && typeof options.havdalahDeg === 'number') {
    throw new TypeError('options.havdalahMins and options.havdalahDeg are mutually exclusive');
  }

  var min = parseInt(options.candleLightingMins, 10) || 18;

  if (options.location && options.location.getIsrael() && options.location.getShortName() === 'Jerusalem' && Math.abs(min) === 18) {
    min = 40;
  }

  options.candleLightingMins = -1 * Math.abs(min);

  if (typeof options.havdalahMins === 'number') {
    options.havdalahMins = Math.abs(options.havdalahMins);
  } else if (typeof options.havdalahDeg === 'number') {
    options.havdalahDeg = Math.abs(options.havdalahDeg);
  } else {
    options.havdalahDeg = 8.5;
  }
}
/**
 * Options to configure which events are returned
 * @typedef {Object} HebrewCalendar.Options
 * @property {Location} location - latitude/longitude/tzid used for candle-lighting
 * @property {number} year - Gregorian or Hebrew year
 * @property {boolean} isHebrewYear - to interpret year as Hebrew year
 * @property {number} month - Gregorian or Hebrew month (to filter results to a single month)
 * @property {number} numYears - generate calendar for multiple years (default 1)
 * @property {Date|HDate|number} start - use specific start date (requires end date)
 * @property {Date|HDate|number} end - use specific end date (requires start date)
 * @property {boolean} candlelighting - calculate candle-lighting and havdalah times
 * @property {number} candleLightingMins - minutes before sundown to light candles (default 18)
 * @property {number} havdalahMins - minutes after sundown for Havdalah (typical values are 42, 50, or 72).
 *      If `undefined` (the default), calculate Havdalah according to Tzeit Hakochavim -
 *      Nightfall (the point when 3 small stars are observable in the night time sky with
 *      the naked eye). If `0`, Havdalah times are supressed.
 * @property {number} havdalahDeg - degrees for solar depression for Havdalah.
 *      Default is 8.5 degrees for 3 small stars. use 7.083 degress for 3 medium-sized stars.
 *      If `0`, Havdalah times are supressed.
 * @property {boolean} sedrot - calculate parashah hashavua on Saturdays
 * @property {boolean} il - Israeli holiday and sedra schedule
 * @property {boolean} noMinorFast - suppress minor fasts
 * @property {boolean} noModern - suppress modern holidays
 * @property {boolean} noRoshChodesh - suppress Rosh Chodesh
 * @property {boolean} shabbatMevarchim - add Shabbat Mevarchim
 * @property {boolean} noSpecialShabbat - suppress Special Shabbat
 * @property {boolean} noHolidays - suppress regular holidays
 * @property {boolean} dafyomi - include Daf Yomi
 * @property {boolean} omer - include Days of the Omer
 * @property {boolean} molad - include event announcing the molad
 * @property {boolean} ashkenazi - use Ashkenazi transliterations for event titles (default Sephardi transliterations)
 * @property {string} locale - translate event titles according to a locale
 *      Default value is `en`, also built-in are `he` and `ashkenazi`.
 *      Additional locales (such as `ru` or `fr`) are provided by the
 *      {@link https://github.com/hebcal/hebcal-locales @hebcal/locales} package
 * @property {boolean} addHebrewDates - print the Hebrew date for the entire date range
 * @property {boolean} addHebrewDatesForEvents - print the Hebrew date for dates with some events
 * @property {number} mask - use bitmask from `flags` to filter events
 */

/**
 * Gets the R.D. days for a number, Date, or HDate
 * @private
 * @param {Date|HDate|number} d
 * @return {number}
 */


function getAbs(d) {
  if (typeof d == 'number') return d;
  if (greg.isDate(d)) return greg.greg2abs(d);
  if (HDate$1.isHDate(d)) return d.abs();
  throw new TypeError("Invalid date type: ".concat(d));
}
/**
 * Parse options object to determine start & end days
 * @private
 * @param {HebrewCalendar.Options} options
 * @return {number[]}
 */


function getStartAndEnd(options) {
  if (options.start && !options.end || options.end && !options.start) {
    throw new TypeError('Both options.start and options.end are required');
  } else if (options.start && options.end) {
    return [getAbs(options.start), getAbs(options.end)];
  }

  var isHebrewYear = Boolean(options.isHebrewYear);
  var theYear = typeof options.year !== 'undefined' ? parseInt(options.year, 10) : isHebrewYear ? new HDate$1().getFullYear() : new Date().getFullYear();

  if (isNaN(theYear)) {
    throw new RangeError("Invalid year ".concat(options.year));
  } else if (isHebrewYear && theYear < 1) {
    throw new RangeError("Invalid Hebrew year ".concat(theYear));
  } else if (theYear == 0) {
    throw new RangeError("Invalid Gregorian year ".concat(theYear));
  }

  var theMonth = NaN;

  if (options.month) {
    if (isHebrewYear) {
      theMonth = HDate$1.monthNum(options.month);
    } else {
      theMonth = options.month;
    }
  }

  var numYears = parseInt(options.numYears, 10) || 1;

  if (isHebrewYear) {
    var startDate = new HDate$1(1, theMonth || TISHREI, theYear);
    var startAbs = startDate.abs();
    var endAbs = options.month ? startAbs + startDate.daysInMonth() : new HDate$1(1, TISHREI, theYear + numYears).abs() - 1; // for full Hebrew year, start on Erev Rosh Hashana which
    // is technically in the previous Hebrew year
    // (but conveniently lets us get candle-lighting time for Erev)

    if (!theMonth) {
      startAbs--;
    }

    return [startAbs, endAbs];
  } else {
    var gregMonth = options.month ? theMonth - 1 : 0;
    var startGreg = new Date(theYear, gregMonth, 1);

    if (theYear < 100) {
      startGreg.setFullYear(theYear);
    }

    var _startAbs = greg.greg2abs(startGreg);

    var _endAbs;

    if (options.month) {
      _endAbs = _startAbs + greg.daysInMonth(theMonth, theYear) - 1;
    } else {
      var endYear = theYear + numYears;
      var endGreg = new Date(endYear, 0, 1);

      if (endYear < 100) {
        endGreg.setFullYear(endYear);
      }

      _endAbs = greg.greg2abs(endGreg) - 1;
    }

    return [_startAbs, _endAbs];
  }
}
/**
 * Mask to filter Holiday array
 * @private
 * @param {HebrewCalendar.Options} options
 * @return {number}
 */

function getMaskFromOptions(options) {
  if (typeof options.mask === 'number') {
    var m = options.mask;
    if (m & ROSH_CHODESH) delete options.noRoshChodesh;
    if (m & MODERN_HOLIDAY) delete options.noModern;
    if (m & MINOR_FAST) delete options.noMinorFast;
    if (m & SPECIAL_SHABBAT) delete options.noSpecialShabbat;
    if (m & PARSHA_HASHAVUA) options.sedrot = true;
    if (m & DAF_YOMI) options.dafyomi = true;
    if (m & OMER_COUNT) options.omer = true;
    if (m & SHABBAT_MEVARCHIM) options.shabbatMevarchim = true;
    options.userMask = true;
    return m;
  }

  var il = options.il || options.location && options.location.il || false;
  var mask = 0; // default options

  if (!options.noHolidays) {
    mask |= ROSH_CHODESH | YOM_TOV_ENDS | MINOR_FAST | SPECIAL_SHABBAT | MODERN_HOLIDAY | MAJOR_FAST | MINOR_HOLIDAY | EREV | CHOL_HAMOED | LIGHT_CANDLES | LIGHT_CANDLES_TZEIS | CHANUKAH_CANDLES;
  }

  if (options.candlelighting) {
    mask |= LIGHT_CANDLES | LIGHT_CANDLES_TZEIS;
  } // suppression of defaults


  if (options.noRoshChodesh) {
    mask &= ~ROSH_CHODESH;
  }

  if (options.noModern) {
    mask &= ~MODERN_HOLIDAY;
  }

  if (options.noMinorFast) {
    mask &= ~MINOR_FAST;
  }

  if (options.noSpecialShabbat) {
    mask &= ~SPECIAL_SHABBAT;
    mask &= ~SHABBAT_MEVARCHIM;
  }

  if (il) {
    mask |= IL_ONLY;
  } else {
    mask |= CHUL_ONLY;
  } // non-default options


  if (options.sedrot) {
    mask |= PARSHA_HASHAVUA;
  }

  if (options.dafyomi) {
    mask |= DAF_YOMI;
  }

  if (options.omer) {
    mask |= OMER_COUNT;
  }

  if (options.shabbatMevarchim) {
    mask |= SHABBAT_MEVARCHIM;
  }

  return mask;
}

var MASK_LIGHT_CANDLES = LIGHT_CANDLES | LIGHT_CANDLES_TZEIS | CHANUKAH_CANDLES | YOM_TOV_ENDS;
/**
 * HebrewCalendar is the main interface to the `@hebcal/core` library.
 * This namespace is used to calculate holidays, rosh chodesh, candle lighting & havdalah times,
 * Parashat HaShavua, Daf Yomi, days of the omer, and the molad.
 * Event names can be rendered in several languges using the `locale` option.
 */

var HebrewCalendar = {
  /** @private */
  defaultLocation: new Location(0, 0, false, 'UTC'),

  /**
   * Calculates holidays and other Hebrew calendar events based on {@link HebrewCalendar.Options}.
   *
   * Each holiday is represented by an {@link Event} object which includes a date,
   * a description, flags and optional attributes.
   * If given no options, returns holidays for the Diaspora for the current Gregorian year.
   *
   * The date range returned by this function can be controlled by:
   * * `options.year` - Gregorian (e.g. 1993) or Hebrew year (e.g. 5749)
   * * `options.isHebrewYear` - to interpret `year` as Hebrew year
   * * `options.numYears` - generate calendar for multiple years (default 1)
   * * `options.month` - Gregorian or Hebrew month (to filter results to a single month)
   *
   * Alternatively, specify start and end days with `Date` or {@link HDate} instances:
   * * `options.start` - use specific start date (requires `end` date)
   * * `options.end` - use specific end date (requires `start` date)
   *
   * Unless `options.noHolidays == true`, default holidays include:
   * * Major holidays - Rosh Hashana, Yom Kippur, Pesach, Sukkot, etc.
   * * Minor holidays - Purim, Chanukah, Tu BiShvat, Lag BaOmer, etc.
   * * Minor fasts - Ta'anit Esther, Tzom Gedaliah, etc. (unless `options.noMinorFast`)
   * * Special Shabbatot - Shabbat Shekalim, Zachor, etc. (unless `options.noSpecialShabbat`)
   * * Modern Holidays - Yom HaShoah, Yom HaAtzma'ut, etc. (unless `options.noModern`)
   * * Rosh Chodesh (unless `options.noRoshChodesh`)
   *
   * Holiday and Torah reading schedules differ between Israel and the Disapora.
   * Set `options.il=true` to use the Israeli schedule.
   *
   * Additional non-default event types can be specified:
   * * Parashat HaShavua - weekly Torah Reading on Saturdays (`options.sedrot`)
   * * Counting of the Omer (`options.omer`)
   * * Daf Yomi (`options.dafyomi`)
   * * Shabbat Mevarchim HaChodesh on Saturday before Rosh Chodesh (`options.shabbatMevarchim`)
   * * Molad announcement on Saturday before Rosh Chodesh (`options.molad`)
   *
   * Candle-lighting and Havdalah times are approximated using latitude and longitude
   * specified by the {@link Location} class. The `Location` class contains a small
   * database of cities with their associated geographic information and time-zone information.
   * If you ever have any doubts about Hebcal's times, consult your local halachic authority.
   * If you enter geographic coordinates above the arctic circle or antarctic circle,
   * the times are guaranteed to be wrong.
   *
   * To add candle-lighting options, set `options.candlelighting=true` and set
   * `options.location` to an instance of `Location`. By default, candle lighting
   * time is 18 minutes before sundown (40 minutes for Jerusalem) and Havdalah is
   * calculated according to Tzeit Hakochavim - Nightfall (the point when 3 small stars
   * are observable in the night time sky with the naked eye). The default Havdalah
   * option (Tzeit Hakochavim) is calculated when the sun is 8.5° below the horizon.
   * These defaults can be changed using these options:
   * * `options.candleLightingMins` - minutes before sundown to light candles
   * * `options.havdalahMins` - minutes after sundown for Havdalah (typical values are 42, 50, or 72).
   *    Havdalah times are supressed when `options.havdalahMins=0`.
   * * `options.havdalahDeg` - degrees for solar depression for Havdalah.
   *    Default is 8.5 degrees for 3 small stars. Use 7.083 degress for 3 medium-sized stars.
   *    Havdalah times are supressed when `options.havdalahDeg=0`.
   *
   * If both `options.candlelighting=true` and `options.location` is specified,
   * Chanukah candle-lighting times and minor fast start/end times will also be generated.
   * Chanukah candle-lighting is at dusk (when the sun is 6.0° below the horizon in the evening)
   * on weekdays, at regular candle-lighting time on Fridays, and at regular Havdalah time on
   * Saturday night (see above).
   *
   * Minor fasts begin at Alot HaShachar (sun is 16.1° below the horizon in the morning) and
   * end when 3 medium-sized stars are observable in the night sky (sun is 7.083° below the horizon
   * in the evening).
   *
   * Two options also exist for generating an Event with the Hebrew date:
   * * `options.addHebrewDates` - print the Hebrew date for the entire date range
   * * `options.addHebrewDatesForEvents` - print the Hebrew date for dates with some events
   *
   * Lastly, translation and transliteration of event titles is controlled by
   * `options.locale` and the {@link Locale} API.
   * `@hebcal/core` supports three locales by default:
   * * `en` - default, Sephardic transliterations (e.g. "Shabbat")
   * * `ashkenazi` - Ashkenazi transliterations (e.g. "Shabbos")
   * * `he` - Hebrew (e.g. "שַׁבָּת")
   *
   * Additional locales (such as `ru` or `fr`) are supported by the
   * {@link https://github.com/hebcal/hebcal-locales @hebcal/locales} package
   *
   * @example
   * import {HebrewCalendar, HDate, Location, Event} from '@hebcal/core';
   * const options = {
   *   year: 1981,
   *   isHebrewYear: false,
   *   candlelighting: true,
   *   location: Location.lookup('San Francisco'),
   *   sedrot: true,
   *   omer: true,
   * };
   * const events = HebrewCalendar.calendar(options);
   * for (const ev of events) {
   *   const hd = ev.getDate();
   *   const date = hd.greg();
   *   console.log(date.toLocaleDateString(), ev.render(), hd.toString());
   * }
   * @param {HebrewCalendar.Options} [options={}]
   * @return {Event[]}
   */
  calendar: function calendar() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    options = shallowCopy({}, options); // so we can modify freely

    checkCandleOptions(options);
    var location = options.location = options.location || this.defaultLocation;
    var il = options.il = options.il || location.il || false;
    options.mask = getMaskFromOptions(options);

    if (options.ashkenazi || options.locale) {
      if (options.locale && typeof options.locale !== 'string') {
        throw new TypeError("Invalid options.locale: ".concat(options.locale));
      }

      var locale = options.ashkenazi ? 'ashkenazi' : options.locale;
      var translationObj = Locale.useLocale(locale);

      if (!translationObj) {
        throw new TypeError("Locale '".concat(locale, "' not found; did you forget to import @hebcal/locales?"));
      }
    } else {
      Locale.useLocale('en');
    }

    var evts = [];
    var sedra;
    var holidaysYear;
    var beginOmer;
    var endOmer;
    var currentYear = -1;
    var startAndEnd = getStartAndEnd(options);
    warnUnrecognizedOptions(options);
    var startAbs = startAndEnd[0];
    var endAbs = startAndEnd[1];
    var startGreg = greg.abs2greg(startAbs);

    if (startGreg.getFullYear() < 100) {
      options.candlelighting = false;
    }

    var _loop = function _loop(abs) {
      var hd = new HDate$1(abs);
      var hyear = hd.getFullYear();

      if (hyear != currentYear) {
        currentYear = hyear;
        holidaysYear = HebrewCalendar.getHolidaysForYear(currentYear);

        if (options.sedrot && currentYear >= 3762) {
          sedra = getSedra(currentYear, il);
        }

        if (options.omer) {
          beginOmer = HDate$1.hebrew2abs(currentYear, NISAN, 16);
          endOmer = HDate$1.hebrew2abs(currentYear, SIVAN, 5);
        }
      }

      var prevEventsLength = evts.length;
      var dow = hd.getDay();
      var candlesEv = undefined;
      var ev = holidaysYear.get(hd.toString()) || [];
      ev.forEach(function (e) {
        candlesEv = appendHolidayAndRelated(evts, e, options, candlesEv, dow);
      });

      if (options.sedrot && dow == SAT && hyear >= 3762) {
        var parsha0 = sedra.lookup(abs);

        if (!parsha0.chag) {
          evts.push(new ParshaEvent(hd, parsha0.parsha, il));
        }
      }

      if (options.dafyomi && hyear >= 5684) {
        evts.push(new DafYomiEvent(hd));
      }

      if (options.omer && abs >= beginOmer && abs <= endOmer) {
        var omer = abs - beginOmer + 1;
        evts.push(new OmerEvent(hd, omer));
      }

      var hmonth = hd.getMonth();

      if (options.molad && dow == SAT && hmonth != ELUL && hd.getDate() >= 23 && hd.getDate() <= 29) {
        var monNext = hmonth == HDate$1.monthsInYear(hyear) ? NISAN : hmonth + 1;
        evts.push(new MoladEvent(hd, hyear, monNext));
      }

      if (!candlesEv && options.candlelighting && (dow == FRI || dow == SAT)) {
        candlesEv = makeCandleEvent(undefined, hd, dow, location, options);

        if (dow == FRI && sedra) {
          candlesEv.memo = sedra.getString(abs);
        }
      } // suppress Havdalah when options.havdalahMins=0 or options.havdalahDeg=0


      if (candlesEv instanceof HavdalahEvent && (options.havdalahMins === 0 || options.havdalahDeg === 0)) {
        candlesEv = null;
      }

      if (candlesEv) {
        evts.push(candlesEv);
      }

      if (options.addHebrewDates || options.addHebrewDatesForEvents && prevEventsLength != evts.length) {
        var e2 = new HebrewDateEvent(hd);

        if (prevEventsLength == evts.length) {
          evts.push(e2);
        } else {
          evts.splice(prevEventsLength, 0, e2);
        }
      }
    };

    for (var abs = startAbs; abs <= endAbs; abs++) {
      _loop(abs);
    }

    return evts;
  },

  /**
   * Calculates a birthday or anniversary (non-yahrzeit).
   * `hyear` must be after original `gdate` of anniversary.
   * Returns `undefined` when requested year preceeds or is same as original year.
   *
   * Hebcal uses the algorithm defined in "Calendrical Calculations"
   * by Edward M. Reingold and Nachum Dershowitz.
   *
   * The birthday of someone born in Adar of an ordinary year or Adar II of
   * a leap year is also always in the last month of the year, be that Adar
   * or Adar II. The birthday in an ordinary year of someone born during the
   * first 29 days of Adar I in a leap year is on the corresponding day of Adar;
   * in a leap year, the birthday occurs in Adar I, as expected.
   *
   * Someone born on the thirtieth day of Marcheshvan, Kislev, or Adar I
   * has his birthday postponed until the first of the following month in
   * years where that day does not occur. [Calendrical Calculations p. 111]
   * @example
   * import {HebrewCalendar} from '@hebcal/core';
   * const dt = new Date(2014, 2, 2); // '2014-03-02' == '30 Adar I 5774'
   * const hd = HebrewCalendar.getBirthdayOrAnniversary(5780, dt); // '1 Nisan 5780'
   * console.log(hd.greg().toLocaleDateString('en-US')); // '3/26/2020'
   * @param {number} hyear Hebrew year
   * @param {Date|HDate} gdate Gregorian or Hebrew date of event
   * @return {HDate} anniversary occurring in `hyear`
   */
  getBirthdayOrAnniversary: function getBirthdayOrAnniversary(hyear, gdate) {
    var orig = HDate$1.isHDate(gdate) ? gdate : new HDate$1(gdate);
    var origYear = orig.getFullYear();

    if (hyear <= origYear) {
      // `Hebrew year ${hyear} occurs on or before original date in ${origYear}`
      return undefined;
    }

    var isOrigLeap = HDate$1.isLeapYear(origYear);
    var month = orig.getMonth();
    var day = orig.getDate();

    if (month == ADAR_I && !isOrigLeap || month == ADAR_II && isOrigLeap) {
      month = HDate$1.monthsInYear(hyear);
    } else if (month == CHESHVAN && day == 30 && !HDate$1.longCheshvan(hyear)) {
      month = KISLEV;
      day = 1;
    } else if (month == KISLEV && day == 30 && HDate$1.shortKislev(hyear)) {
      month = TEVET;
      day = 1;
    } else if (month == ADAR_I && day == 30 && isOrigLeap && !HDate$1.isLeapYear(hyear)) {
      month = NISAN;
      day = 1;
    }

    return new HDate$1(day, month, hyear);
  },

  /**
   * Calculates yahrzeit.
   * `hyear` must be after original `gdate` of death.
   * Returns `undefined` when requested year preceeds or is same as original year.
   *
   * Hebcal uses the algorithm defined in "Calendrical Calculations"
   * by Edward M. Reingold and Nachum Dershowitz.
   *
   * The customary anniversary date of a death is more complicated and depends
   * also on the character of the year in which the first anniversary occurs.
   * There are several cases:
   *
   * * If the date of death is Marcheshvan 30, the anniversary in general depends
   *   on the first anniversary; if that first anniversary was not Marcheshvan 30,
   *   use the day before Kislev 1.
   * * If the date of death is Kislev 30, the anniversary in general again depends
   *   on the first anniversary — if that was not Kislev 30, use the day before
   *   Tevet 1.
   * * If the date of death is Adar II, the anniversary is the same day in the
   *   last month of the Hebrew year (Adar or Adar II).
   * * If the date of death is Adar I 30, the anniversary in a Hebrew year that
   *   is not a leap year (in which Adar only has 29 days) is the last day in
   *   Shevat.
   * * In all other cases, use the normal (that is, same month number) anniversary
   *   of the date of death. [Calendrical Calculations p. 113]
   * @example
   * import {HebrewCalendar} from '@hebcal/core';
   * const dt = new Date(2014, 2, 2); // '2014-03-02' == '30 Adar I 5774'
   * const hd = HebrewCalendar.getYahrzeit(5780, dt); // '30 Sh\'vat 5780'
   * console.log(hd.greg().toLocaleDateString('en-US')); // '2/25/2020'
   * @param {number} hyear Hebrew year
   * @param {Date|HDate} gdate Gregorian or Hebrew date of death
   * @return {HDate} anniversary occurring in hyear
   */
  getYahrzeit: function getYahrzeit(hyear, gdate) {
    var orig = HDate$1.isHDate(gdate) ? gdate : new HDate$1(gdate);
    var hDeath = {
      yy: orig.getFullYear(),
      mm: orig.getMonth(),
      dd: orig.getDate()
    };

    if (hyear <= hDeath.yy) {
      // `Hebrew year ${hyear} occurs on or before original date in ${hDeath.yy}`
      return undefined;
    }

    if (hDeath.mm == CHESHVAN && hDeath.dd == 30 && !HDate$1.longCheshvan(hDeath.yy + 1)) {
      // If it's Heshvan 30 it depends on the first anniversary;
      // if that was not Heshvan 30, use the day before Kislev 1.
      hDeath = HDate$1.abs2hebrew(HDate$1.hebrew2abs(hyear, KISLEV, 1) - 1);
    } else if (hDeath.mm == KISLEV && hDeath.dd == 30 && HDate$1.shortKislev(hDeath.yy + 1)) {
      // If it's Kislev 30 it depends on the first anniversary;
      // if that was not Kislev 30, use the day before Teveth 1.
      hDeath = HDate$1.abs2hebrew(HDate$1.hebrew2abs(hyear, TEVET, 1) - 1);
    } else if (hDeath.mm == ADAR_II) {
      // If it's Adar II, use the same day in last month of year (Adar or Adar II).
      hDeath.mm = HDate$1.monthsInYear(hyear);
    } else if (hDeath.mm == ADAR_I && hDeath.dd == 30 && !HDate$1.isLeapYear(hyear)) {
      // If it's the 30th in Adar I and year is not a leap year
      // (so Adar has only 29 days), use the last day in Shevat.
      hDeath.dd = 30;
      hDeath.mm = SHVAT;
    } // In all other cases, use the normal anniversary of the date of death.
    // advance day to rosh chodesh if needed


    if (hDeath.mm == CHESHVAN && hDeath.dd == 30 && !HDate$1.longCheshvan(hyear)) {
      hDeath.mm = KISLEV;
      hDeath.dd = 1;
    } else if (hDeath.mm == KISLEV && hDeath.dd == 30 && HDate$1.shortKislev(hyear)) {
      hDeath.mm = TEVET;
      hDeath.dd = 1;
    }

    return new HDate$1(hDeath.dd, hDeath.mm, hyear);
  },

  /**
   * Lower-level holidays interface, which returns a `Map` of `Event`s indexed by
   * `HDate.toString()`. These events must filtered especially for `flags.IL_ONLY`
   * or `flags.CHUL_ONLY` depending on Israel vs. Diaspora holiday scheme.
   * @function
   * @param {number} year Hebrew year
   * @return {Map<string,Event[]>}
   */
  getHolidaysForYear: getHolidaysForYear,

  /**
   * Returns an array of holidays for the year
   * @param {number} year Hebrew year
   * @param {boolean} il use the Israeli schedule for holidays
   * @return {Event[]}
   */
  getHolidaysForYearArray: function getHolidaysForYearArray(year, il) {
    var yearMap = HebrewCalendar.getHolidaysForYear(year);
    var startAbs = HDate$1.hebrew2abs(year, TISHREI, 1);
    var endAbs = HDate$1.hebrew2abs(year + 1, TISHREI, 1) - 1;
    var events = [];

    for (var absDt = startAbs; absDt <= endAbs; absDt++) {
      var hd = new HDate$1(absDt);
      var holidays = yearMap.get(hd.toString());

      if (holidays) {
        var filtered = holidays.filter(function (ev) {
          return il && ev.observedInIsrael() || !il && ev.observedInDiaspora();
        });
        filtered.forEach(function (ev) {
          return events.push(ev);
        });
      }
    }

    return events;
  },

  /**
   * Returns an array of Events on this date (or undefined if no events)
   * @param {HDate|Date|number} date Hebrew Date, Gregorian date, or absolute R.D. day number
   * @param {boolean} [il] use the Israeli schedule for holidays
   * @return {Event[]}
   */
  getHolidaysOnDate: function getHolidaysOnDate(date, il) {
    var hd = HDate$1.isHDate(date) ? date : new HDate$1(date);
    var yearMap = HebrewCalendar.getHolidaysForYear(hd.getFullYear());
    var events = yearMap.get(hd.toString());

    if (typeof il === 'undefined' || typeof events === 'undefined') {
      return events;
    }

    return events.filter(function (ev) {
      return il && ev.observedInIsrael() || !il && ev.observedInDiaspora();
    });
  },
  hour12cc: {
    US: 1,
    CA: 1,
    BR: 1,
    AU: 1,
    NZ: 1,
    DO: 1,
    PR: 1,
    GR: 1,
    IN: 1,
    KR: 1,
    NP: 1,
    ZA: 1
  },

  /**
   * Helper function to format a 23-hour (00:00-23:59) time in US format ("8:13pm") or
   * keep as "20:13" for any other locale/country. Uses `HebrewCalendar.Options` to determine
   * locale.
   * @param {string} timeStr - original time like "20:30"
   * @param {string} suffix - "p" or "pm" or " P.M.". Add leading space if you want it
   * @param {HebrewCalendar.Options} options
   * @return {string}
   */
  reformatTimeStr: function reformatTimeStr(timeStr, suffix, options) {
    if (typeof timeStr !== 'string') throw new TypeError("Bad timeStr: ".concat(timeStr));
    var cc = options.location && options.location.cc || (options.il ? 'IL' : 'US');

    if (typeof this.hour12cc[cc] === 'undefined') {
      return timeStr;
    }

    var hm = timeStr.split(':');
    var hour = parseInt(hm[0], 10);

    if (hour < 12 && suffix) {
      suffix = suffix.replace('p', 'a').replace('P', 'A');
    } else if (hour > 12) {
      hour = hour % 12;
    }

    return "".concat(hour, ":").concat(hm[1]).concat(suffix);
  },

  /** @return {string} */
  version: function version$1() {
    return version;
  },

  /**
   * Convenience function to create an instance of `Sedra` or reuse a previously
   * created and cached instance.
   * @function
   * @param {number} hyear
   * @param {boolean} il
   * @return {Sedra}
   */
  getSedra: getSedra
};
/**
 * Appends the Event `ev` to the `events` array. Also may add related
 * timed events like candle-lighting or fast start/end
 * @private
 * @param {Event[]} events
 * @param {Event} ev
 * @param {HebrewCalendar.Options} options
 * @param {Event} candlesEv
 * @param {number} dow
 * @return {Event}
 */

function appendHolidayAndRelated(events, ev, options, candlesEv, dow) {
  var eFlags = ev.getFlags();
  var il = options.il;
  var observed = il && ev.observedInIsrael() || !il && ev.observedInDiaspora();
  var mask = options.mask;

  if (observed && (eFlags & mask || !eFlags && !options.userMask)) {
    var location = options.location;

    if (options.candlelighting && eFlags & MASK_LIGHT_CANDLES) {
      var hd = ev.getDate();
      candlesEv = makeCandleEvent(ev, hd, dow, location, options);

      if (eFlags & CHANUKAH_CANDLES && candlesEv && !options.noHolidays) {
        var chanukahEv = dow === FRI || dow === SAT ? candlesEv : makeWeekdayChanukahCandleLighting(ev, hd, location);
        var attrs = {
          eventTime: chanukahEv.eventTime,
          eventTimeStr: chanukahEv.eventTimeStr,
          location: location
        };
        if (ev.chanukahDay) attrs.chanukahDay = ev.chanukahDay;
        if (ev.emoji) attrs.emoji = ev.emoji; // Replace Chanukah event with a clone that includes candle lighting time.
        // For clarity, allow a "duplicate" candle lighting event to remain for Shabbat

        ev = new HolidayEvent(ev.getDate(), ev.getDesc(), eFlags, attrs);
        candlesEv = undefined;
      }
    }

    if (!options.noHolidays) {
      if (options.candlelighting && eFlags & (MINOR_FAST | MAJOR_FAST)) {
        ev = makeFastStartEnd(ev, location);
      }

      if (ev.startEvent) {
        events.push(ev.startEvent);
      }

      events.push(ev); // the original event itself

      if (ev.endEvent) {
        events.push(ev.endEvent);
      }
    }
  }

  return candlesEv;
}

exports.AsaraBTevetEvent = AsaraBTevetEvent;
exports.CandleLightingEvent = CandleLightingEvent;
exports.DafYomi = DafYomi;
exports.DafYomiEvent = DafYomiEvent;
exports.Event = Event;
exports.HDate = HDate$1;
exports.HavdalahEvent = HavdalahEvent;
exports.HebrewCalendar = HebrewCalendar;
exports.HebrewDateEvent = HebrewDateEvent;
exports.HolidayEvent = HolidayEvent;
exports.Locale = Locale;
exports.Location = Location;
exports.MevarchimChodeshEvent = MevarchimChodeshEvent;
exports.Molad = Molad;
exports.MoladEvent = MoladEvent;
exports.OmerEvent = OmerEvent;
exports.ParshaEvent = ParshaEvent;
exports.RoshChodeshEvent = RoshChodeshEvent;
exports.RoshHashanaEvent = RoshHashanaEvent;
exports.Sedra = Sedra;
exports.TimedEvent = TimedEvent;
exports.Zmanim = Zmanim;
exports.flags = flags;
exports.gematriya = gematriya;
exports.greg = greg;
exports.months = months;
exports.parshiot = parshiot;
exports.version = version;

Object.defineProperty(exports, '__esModule', { value: true });

return exports;

})({});
