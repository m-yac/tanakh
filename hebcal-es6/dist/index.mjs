/*! @hebcal/core v3.30.0 */
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
const monthLengths = [[0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];
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


const greg = {
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
  isLeapYear: function (year) {
    return !(year % 4) && (!!(year % 100) || !(year % 400));
  },

  /**
   * Number of days in the Gregorian month for given year
   * @param {number} month Gregorian month (1=January, 12=December)
   * @param {number} year Gregorian year
   * @return {number}
   */
  daysInMonth: function (month, year) {
    // 1 based months
    return monthLengths[+this.isLeapYear(year)][month];
  },

  /**
   * Returns true if the object is a Javascript Date
   * @param {Object} obj
   * @return {boolean}
   */
  isDate: function (obj) {
    return typeof obj === 'object' && Date.prototype === obj.__proto__;
  },

  /**
   * Returns number of days since January 1 of that year
   * @param {Date} date Gregorian date
   * @return {number}
   */
  dayOfYear: function (date) {
    if (!this.isDate(date)) {
      throw new TypeError('Argument to greg.dayOfYear not a Date');
    }

    let doy = date.getDate() + 31 * date.getMonth();

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
  greg2abs: function (date) {
    if (!this.isDate(date)) {
      throw new TypeError('Argument to greg.greg2abs not a Date');
    }

    const year = date.getFullYear() - 1;
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
  yearFromFixed: function (theDate) {
    const l0 = theDate - 1;
    const n400 = quotient(l0, 146097);
    const d1 = mod(l0, 146097);
    const n100 = quotient(d1, 36524);
    const d2 = mod(d1, 36524);
    const n4 = quotient(d2, 1461);
    const d3 = mod(d2, 1461);
    const n1 = quotient(d3, 365);
    const year = 400 * n400 + 100 * n100 + 4 * n4 + n1;
    return n100 != 4 && n1 != 4 ? year + 1 : year;
  },

  /**
   * @private
   * @param {number} year
   * @param {number} month
   * @param {number} day
   * @return {number}
   */
  toFixed: function (year, month, day) {
    const py = year - 1;
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
  abs2greg: function (theDate) {
    if (typeof theDate !== 'number') {
      throw new TypeError('Argument to greg.abs2greg not a Number');
    }

    theDate = Math.trunc(theDate);
    const year = this.yearFromFixed(theDate);
    const priorDays = theDate - this.toFixed(year, 1, 1);
    const correction = theDate < this.toFixed(year, 3, 1) ? 0 : this.isLeapYear(year) ? 1 : 2;
    const month = quotient(12 * (priorDays + correction) + 373, 367);
    const day = theDate - this.toFixed(year, month, 1) + 1;
    const dt = new Date(year, month - 1, day);

    if (year < 100 && year >= 0) {
      dt.setFullYear(year);
    }

    return dt;
  }
};

const GERESH = '׳';
const GERSHAYIM = '״';
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
  let num = parseInt(number, 10);

  if (!num) {
    throw new TypeError(`invalid parameter to gematriya ${number}`);
  }

  const digits = [];
  num = num % 1000;

  while (num > 0) {
    if (num === 15 || num === 16) {
      digits.push(9);
      digits.push(num - 9);
      break;
    }

    let incr = 100;
    let i;

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

  let str = '';

  for (let i = 0; i < digits.length; i++) {
    if (i + 1 === digits.length) {
      str += GERSHAYIM;
    }

    str += num2heb(digits[i]);
  }

  return str;
}

const noopLocale = {
  headers: {
    'plural-forms': 'nplurals=2; plural=(n!=1);'
  },
  contexts: {
    '': {}
  }
};
const alias = {
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

const Locale = {
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
  lookupTranslation: function (id, locale) {
    const locale0 = locale && locale.toLowerCase();
    const loc = typeof locale == 'string' && this.locales[locale0] || this.activeLocale;
    const array = loc[id];

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
  gettext: function (id, locale) {
    const text = this.lookupTranslation(id, locale);

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
  addLocale: function (locale, data) {
    if (typeof data.contexts !== 'object' || typeof data.contexts[''] !== 'object') {
      throw new TypeError(`Locale '${locale}' invalid compact format`);
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
  useLocale: function (locale) {
    const locale0 = locale.toLowerCase();
    const obj = this.locales[locale0];

    if (!obj) {
      throw new RangeError(`Locale '${locale}' not found`);
    }

    this.activeName = alias[locale0] || locale0;
    this.activeLocale = obj;
    return this.activeLocale;
  },

  /**
   * Returns the name of the active locale (i.e. 'he', 'ashkenazi', 'fr')
   * @return {string}
   */
  getLocaleName: function () {
    return this.activeName;
  },

  /**
   * @param {number} n
   * @param {string} [locale] Optional locale name (i.e: `'he'`, `'fr'`). Defaults to active locale.
   * @return {string}
   */
  ordinal: function (n, locale) {
    const locale1 = locale && locale.toLowerCase();
    const locale0 = locale1 || this.activeName;

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
  getEnOrdinal: function (n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  },

  /**
   * Removes nekudot from Hebrew string
   * @param {string} str
   * @return {string}
   */
  hebrewStripNikkud: function (str) {
    return str.replace(/[\u0590-\u05bd]/g, '').replace(/[\u05bf-\u05c7]/g, '');
  }
};
Locale.addLocale('en', noopLocale);
Locale.addLocale('s', noopLocale);
Locale.addLocale('', noopLocale);
Locale.useLocale('en');

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
const NISAN$2 = 1;
const IYYAR$1 = 2;
const SIVAN$2 = 3;
const TAMUZ$1 = 4;
const AV$1 = 5;
const ELUL$2 = 6;
const TISHREI$2 = 7;
const CHESHVAN$2 = 8;
const KISLEV$2 = 9;
const TEVET$2 = 10;
const SHVAT$2 = 11;
const ADAR_I$2 = 12;
const ADAR_II$2 = 13;
/**
 * Hebrew months of the year (NISAN=1, TISHREI=7)
 * @readonly
 * @enum {number}
 */

const months = {
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
const monthNames0 = ['', 'Nisan', 'Iyyar', 'Sivan', 'Tamuz', 'Av', 'Elul', 'Tishrei', 'Cheshvan', 'Kislev', 'Tevet', 'Sh\'vat'];
/**
 * Transliterations of Hebrew month names.
 * Regular years are index 0 and leap years are index 1.
 * @private
 */

const monthNames = [monthNames0.concat(['Adar', 'Nisan']), monthNames0.concat(['Adar I', 'Adar II', 'Nisan'])]; // eslint-disable-next-line require-jsdoc

function throwTypeError$2(msg) {
  throw new TypeError(msg);
}

const edCache = Object.create(null);
const EPOCH = -1373428; // Avg year length in the cycle (19 solar years with 235 lunar months)

const AVG_HEBYEAR_DAYS = 365.24682220597794;
const UNITS_DAY = 'day';
const UNITS_WEEK = 'week';
const UNITS_MONTH = 'month';
const UNITS_YEAR = 'year';
const UNITS_SINGLE = {
  d: UNITS_DAY,
  w: UNITS_WEEK,
  M: UNITS_MONTH,
  y: UNITS_YEAR
};
const UNITS_VALID = {
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

class HDate$1 {
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
  constructor(day, month, year) {
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
        throw new TypeError(`HDate called with bad year argument: ${year}`);
      }

      this.setMonth(month); // will throw if we can't parse

      this.setDate(+day);

      if (isNaN(this.day)) {
        throw new TypeError(`HDate called with bad day argument: ${day}`);
      }
    } else {
      // 0 arguments
      if (typeof day === 'undefined') {
        day = new Date();
      } // 1 argument


      const abs0 = typeof day === 'number' && !isNaN(day) ? day : greg.isDate(day) ? greg.greg2abs(day) : HDate$1.isHDate(day) ? {
        dd: day.day,
        mm: day.month,
        yy: day.year
      } : throwTypeError$2(`HDate called with bad argument: ${day}`);
      const isNumber = typeof abs0 === 'number';
      const d = isNumber ? HDate$1.abs2hebrew(abs0) : abs0;
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


  getFullYear() {
    return this.year;
  }
  /**
   * Tests if this date occurs during a leap year
   * @return {boolean}
   */


  isLeapYear() {
    return HDate$1.isLeapYear(this.year);
  }
  /**
   * Gets the Hebrew month (1=NISAN, 7=TISHREI) of this Hebrew date
   * @return {number}
   */


  getMonth() {
    return this.month;
  }
  /**
   * The Tishrei-based month of the date. 1 is Tishrei, 7 is Nisan, 13 is Elul in a leap year
   * @return {number}
   */


  getTishreiMonth() {
    const nummonths = HDate$1.monthsInYear(this.getFullYear());
    return (this.getMonth() + nummonths - 6) % nummonths || nummonths;
  }
  /**
   * Number of days in the month of this Hebrew date
   * @return {number}
   */


  daysInMonth() {
    return HDate$1.daysInMonth(this.getMonth(), this.getFullYear());
  }
  /**
   * Gets the day within the month (1-30)
   * @return {number}
   */


  getDate() {
    return this.day;
  }
  /**
   * Gets the day of the week. 0=Sunday, 6=Saturday
   * @return {number}
   */


  getDay() {
    return mod(this.abs(), 7);
  }
  /**
   * Sets the year of the date. Returns the object it was called upon.
   * @private
   * @deprecated
   * @param {number} year
   * @return {HDate}
   */


  setFullYear(year) {
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


  setMonth(month) {
    this.month = HDate$1.monthNum(month);
    fix(this);
    return this;
  }
  /**
   * @private
   * @param {number} date
   * @return {HDate}
   */


  setDate(date) {
    this.day = date;
    fix(this);
    return this;
  }
  /**
   * Converts to Gregorian date
   * @return {Date}
   */


  greg() {
    return greg.abs2greg(this.abs());
  }
  /**
   * Returns R.D. (Rata Die) fixed days.
   * R.D. 1 == Monday, January 1, 1 (Gregorian)
   * Note also that R.D. = Julian Date − 1,721,424.5
   * https://en.wikipedia.org/wiki/Rata_Die#Dershowitz_and_Reingold
   * @return {number}
   */


  abs() {
    if (typeof this.abs0 !== 'number') {
      this.abs0 = HDate$1.hebrew2abs(this.year, this.month, this.day);
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


  static hebrew2abs(year, month, day) {
    let tempabs = day;

    if (month < TISHREI$2) {
      for (let m = TISHREI$2; m <= HDate$1.monthsInYear(year); m++) {
        tempabs += HDate$1.daysInMonth(m, year);
      }

      for (let m = NISAN$2; m < month; m++) {
        tempabs += HDate$1.daysInMonth(m, year);
      }
    } else {
      for (let m = TISHREI$2; m < month; m++) {
        tempabs += HDate$1.daysInMonth(m, year);
      }
    }

    return EPOCH + HDate$1.elapsedDays(year) + tempabs - 1;
  }
  /**
   * @private
   * @param {number} year
   * @return {number}
   */


  static newYear(year) {
    return EPOCH + HDate$1.elapsedDays(year) + HDate$1.newYearDelay(year);
  }
  /**
   * @private
   * @param {number} year
   * @return {number}
   */


  static newYearDelay(year) {
    const ny1 = HDate$1.elapsedDays(year);
    const ny2 = HDate$1.elapsedDays(year + 1);

    if (ny2 - ny1 === 356) {
      return 2;
    } else {
      const ny0 = HDate$1.elapsedDays(year - 1);
      return ny1 - ny0 === 382 ? 1 : 0;
    }
  }
  /**
   * Converts absolute R.D. days to Hebrew date
   * @private
   * @param {number} abs absolute R.D. days
   * @return {SimpleHebrewDate}
   */


  static abs2hebrew(abs) {
    if (typeof abs !== 'number' || isNaN(abs)) {
      throw new TypeError(`invalid parameter to abs2hebrew ${abs}`);
    }

    abs = Math.trunc(abs); // first, quickly approximate year

    let year = Math.floor((abs - EPOCH) / AVG_HEBYEAR_DAYS);

    while (HDate$1.newYear(year) <= abs) {
      ++year;
    }

    --year;
    let month = abs < HDate$1.hebrew2abs(year, 1, 1) ? 7 : 1;

    while (abs > HDate$1.hebrew2abs(year, month, HDate$1.daysInMonth(month, year))) {
      ++month;
    }

    const day = 1 + abs - HDate$1.hebrew2abs(year, month, 1);
    return {
      yy: year,
      mm: month,
      dd: day
    };
  }
  /**
   * Returns a transliterated Hebrew month name, e.g. `'Elul'` or `'Cheshvan'`.
   * @return {string}
   */


  getMonthName() {
    return HDate$1.getMonthName(this.getMonth(), this.getFullYear());
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


  render(locale = null, showYear = true) {
    const locale0 = locale || Locale.getLocaleName();
    const day = this.getDate();
    const monthName = Locale.gettext(this.getMonthName(), locale0);
    const nth = Locale.ordinal(day, locale0);
    const dayOf = HDate$1.getDayOfTranslation(locale0);
    const dateStr = `${nth}${dayOf} ${monthName}`;

    if (showYear) {
      const fullYear = this.getFullYear();
      return `${dateStr}, ${fullYear}`;
    } else {
      return dateStr;
    }
  }
  /**
   * @private
   * @param {string} locale
   * @return {string}
   */


  static getDayOfTranslation(locale) {
    switch (locale) {
      case 'en':
      case 's':
      case 'a':
      case 'ashkenazi':
        return ' of';
    }

    const ofStr = Locale.lookupTranslation('of', locale);

    if (ofStr) {
      return ' ' + ofStr;
    }

    if ('ashkenazi' === locale.substring(0, 9)) {
      return ' of';
    }

    return '';
  }
  /**
   * Renders this Hebrew date in Hebrew gematriya, regardless of locale.
   * @example
   * import {HDate, months} from '@hebcal/core';
   * const hd = new HDate(15, months.CHESHVAN, 5769);
   * console.log(ev.renderGematriya()); // 'ט״ו חֶשְׁוָן תשס״ט'
   * @return {string}
   */


  renderGematriya() {
    const d = this.getDate();
    const m = Locale.gettext(this.getMonthName(), 'he');
    const y = this.getFullYear();
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


  before(day) {
    return onOrBefore(day, this, -1);
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


  onOrBefore(dow) {
    return onOrBefore(dow, this, 0);
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


  nearest(dow) {
    return onOrBefore(dow, this, 3);
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


  onOrAfter(dow) {
    return onOrBefore(dow, this, 6);
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


  after(day) {
    return onOrBefore(day, this, 7);
  }
  /**
   * Returns the next Hebrew date
   * @return {HDate}
   */


  next() {
    return new HDate$1(this.abs() + 1);
  }
  /**
   * Returns the previous Hebrew date
   * @return {HDate}
   */


  prev() {
    return new HDate$1(this.abs() - 1);
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


  add(number, units = 'd') {
    number = parseInt(number, 10);

    if (!number) {
      return new HDate$1(this);
    }

    units = HDate$1.standardizeUnits(units);

    if (units === UNITS_DAY) {
      return new HDate$1(this.abs() + number);
    } else if (units === UNITS_WEEK) {
      return new HDate$1(this.abs() + 7 * number);
    } else if (units === UNITS_YEAR) {
      return new HDate$1(this.getDate(), this.getMonth(), this.getFullYear() + number);
    } else if (units === UNITS_MONTH) {
      let hd = new HDate$1(this);
      const sign = number > 0 ? 1 : -1;
      number = Math.abs(number);

      for (let i = 0; i < number; i++) {
        hd = new HDate$1(hd.abs() + sign * hd.daysInMonth());
      }

      return hd;
    }
  }
  /**
   * @private
   * @param {string} units
   * @return {string}
   */


  static standardizeUnits(units) {
    const full = UNITS_SINGLE[units] || String(units || '').toLowerCase().replace(/s$/, '');
    return UNITS_VALID[full] || throwTypeError$2(`Invalid units '${units}'`);
  }
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


  subtract(number, units = 'd') {
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


  deltaDays(other) {
    if (!HDate$1.isHDate(other)) {
      throw new TypeError(`Bad argument: ${other}`);
    }

    return this.abs() - other.abs();
  }
  /**
   * Compares this date to another date, returning `true` if the dates match.
   * @param {HDate} other Hebrew date to compare
   * @return {boolean}
   */


  isSameDate(other) {
    if (HDate$1.isHDate(other)) {
      return this.year == other.year && this.month == other.month && this.day == other.day;
    }

    return false;
  }
  /** @return {string} */


  toString() {
    const day = this.getDate();
    const fullYear = this.getFullYear();
    const monthName = this.getMonthName();
    return `${day} ${monthName} ${fullYear}`;
  }
  /**
   * Returns true if Hebrew year is a leap year
   * @param {number} year Hebrew year
   * @return {boolean}
   */


  static isLeapYear(year) {
    return (1 + year * 7) % 19 < 7;
  }
  /**
   * Number of months in this Hebrew year (either 12 or 13 depending on leap year)
   * @param {number} year Hebrew year
   * @return {number}
   */


  static monthsInYear(year) {
    return 12 + HDate$1.isLeapYear(year); // boolean is cast to 1 or 0
  }
  /**
   * Number of days in Hebrew month in a given year (29 or 30)
   * @param {number} month Hebrew month (e.g. months.TISHREI)
   * @param {number} year Hebrew year
   * @return {number}
   */


  static daysInMonth(month, year) {
    if (month == IYYAR$1 || month == TAMUZ$1 || month == ELUL$2 || month == TEVET$2 || month == ADAR_II$2 || month == ADAR_I$2 && !HDate$1.isLeapYear(year) || month == CHESHVAN$2 && !HDate$1.longCheshvan(year) || month == KISLEV$2 && HDate$1.shortKislev(year)) {
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


  static getMonthName(month, year) {
    if (typeof month !== 'number' || month < 1 || month > 14) {
      throw new TypeError(`bad month argument ${month}`);
    }

    return monthNames[+HDate$1.isLeapYear(year)][month];
  }
  /**
   * Returns the Hebrew month number (NISAN=1, TISHREI=7)
   * @param {number|string} month A number, or Hebrew month name string
   * @return {number}
   */


  static monthNum(month) {
    return typeof month === 'number' ? month : month.charCodeAt(0) >= 48 && month.charCodeAt(0) <= 57 ?
    /* number */
    parseInt(month, 10) : HDate$1.monthFromName(month);
  }
  /**
   * Days from sunday prior to start of Hebrew calendar to mean
   * conjunction of Tishrei in Hebrew YEAR
   * @param {number} year Hebrew year
   * @return {number}
   */


  static elapsedDays(year) {
    const elapsed = edCache[year] = edCache[year] || HDate$1.elapsedDays0(year);
    return elapsed;
  }
  /**
   * Days from sunday prior to start of Hebrew calendar to mean
   * conjunction of Tishrei in Hebrew YEAR
   * @private
   * @param {number} year Hebrew year
   * @return {number}
   */


  static elapsedDays0(year) {
    const prevYear = year - 1;
    const mElapsed = 235 * Math.floor(prevYear / 19) + // Months in complete 19 year lunar (Metonic) cycles so far
    12 * (prevYear % 19) + // Regular months in this cycle
    Math.floor((prevYear % 19 * 7 + 1) / 19); // Leap months this cycle

    const pElapsed = 204 + 793 * (mElapsed % 1080);
    const hElapsed = 5 + 12 * mElapsed + 793 * Math.floor(mElapsed / 1080) + Math.floor(pElapsed / 1080);
    const parts = pElapsed % 1080 + 1080 * (hElapsed % 24);
    const day = 1 + 29 * mElapsed + Math.floor(hElapsed / 24);
    const altDay = day + (parts >= 19440 || 2 == day % 7 && parts >= 9924 && !HDate$1.isLeapYear(year) || 1 == day % 7 && parts >= 16789 && HDate$1.isLeapYear(prevYear));
    return altDay + (altDay % 7 === 0 || altDay % 7 == 3 || altDay % 7 == 5);
  }
  /**
   * Number of days in the hebrew YEAR
   * @param {number} year Hebrew year
   * @return {number}
   */


  static daysInYear(year) {
    return HDate$1.elapsedDays(year + 1) - HDate$1.elapsedDays(year);
  }
  /**
   * true if Cheshvan is long in Hebrew year
   * @param {number} year Hebrew year
   * @return {boolean}
   */


  static longCheshvan(year) {
    return HDate$1.daysInYear(year) % 10 == 5;
  }
  /**
   * true if Kislev is short in Hebrew year
   * @param {number} year Hebrew year
   * @return {boolean}
   */


  static shortKislev(year) {
    return HDate$1.daysInYear(year) % 10 == 3;
  }
  /**
   * Converts Hebrew month string name to numeric
   * @param {string} monthName monthName
   * @return {number}
   */


  static monthFromName(monthName) {
    if (typeof monthName === 'number') return monthName;
    const c = monthName.toLowerCase();
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

    throw new RangeError(`Unable to parse month name: ${monthName}`);
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


  static dayOnOrBefore(dayOfWeek, absdate) {
    return absdate - (absdate - dayOfWeek) % 7;
  }
  /**
   * Tests if the object is an instance of `HDate`
   * @param {any} obj
   * @return {boolean}
   */


  static isHDate(obj) {
    return obj !== null && typeof obj === 'object' && typeof obj.year === 'number' && typeof obj.month === 'number' && typeof obj.day === 'number' && typeof obj.greg === 'function' && typeof obj.abs === 'function';
  }

}
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


function onOrBefore(day, t, offset) {
  return new HDate$1(HDate$1.dayOnOrBefore(day, t.abs() + offset));
}

const CHAG$1 = 0x000001;
const LIGHT_CANDLES$2 = 0x000002;
const YOM_TOV_ENDS$2 = 0x000004;
const CHUL_ONLY$2 = 0x000008; // chutz l'aretz (Diaspora)

const IL_ONLY$2 = 0x000010; // b'aretz (Israel)

const LIGHT_CANDLES_TZEIS$2 = 0x000020;
const CHANUKAH_CANDLES$2 = 0x000040;
const ROSH_CHODESH$1 = 0x000080;
const MINOR_FAST$2 = 0x000100;
const SPECIAL_SHABBAT$2 = 0x000200;
const PARSHA_HASHAVUA$1 = 0x000400;
const DAF_YOMI$1 = 0x000800;
const OMER_COUNT$1 = 0x001000;
const MODERN_HOLIDAY$2 = 0x002000;
const MAJOR_FAST$2 = 0x004000;
const SHABBAT_MEVARCHIM$1 = 0x008000;
const MOLAD = 0x010000;
const USER_EVENT = 0x020000;
const HEBREW_DATE = 0x040000;
const MINOR_HOLIDAY$2 = 0x080000;
const EREV$2 = 0x100000;
const CHOL_HAMOED$2 = 0x200000;
/**
 * Holiday flags for Event
 * @readonly
 * @enum {number}
 */

const flags = {
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
  MOLAD,

  /** Yahrzeit or Hebrew Anniversary */
  USER_EVENT,

  /** Daily Hebrew date ("11th of Sivan, 5780") */
  HEBREW_DATE,

  /** A holiday that's not major, modern, rosh chodesh, or a fast day */
  MINOR_HOLIDAY: MINOR_HOLIDAY$2,

  /** Evening before a major or minor holiday */
  EREV: EREV$2,

  /** Chol haMoed, intermediate days of Pesach or Sukkot */
  CHOL_HAMOED: CHOL_HAMOED$2
};
/** Represents an Event with a title, date, and flags */

class Event {
  /**
   * Constructs Event
   * @param {HDate} date Hebrew date event occurs
   * @param {string} desc Description (not translated)
   * @param {number} [mask=0] optional bitmask of holiday flags (see {@link flags})
   * @param {Object} [attrs={}] optional additional attributes (e.g. `eventTimeStr`, `cholHaMoedDay`)
   */
  constructor(date, desc, mask, attrs) {
    this.date = date;
    this.desc = desc;
    this.mask = +mask;

    if (typeof attrs === 'object' && attrs !== null) {
      Object.keys(attrs).forEach(k => this[k] = attrs[k]);
    }
  }
  /**
   * Hebrew date of this event
   * @return {HDate}
   */


  getDate() {
    return this.date;
  }
  /**
   * Untranslated description of this event
   * @return {string}
   */


  getDesc() {
    return this.desc;
  }
  /**
   * Bitmask of optional event flags. See {@link flags}
   * @return {number}
   */


  getFlags() {
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


  render(locale) {
    return Locale.gettext(this.desc, locale);
  }
  /**
   * Returns a brief (translated) description of this event.
   * For most events, this is the same as render(). For some events, it procudes
   * a shorter text (e.g. without a time or added description).
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  renderBrief(locale) {
    return this.render(locale);
  }
  /**
   * Optional holiday-specific Emoji or `null`.
   * @return {string}
   */


  getEmoji() {
    return this.emoji || null;
  }
  /**
   * Returns a simplified (untranslated) description for this event. For example,
   * the {@link HolidayEvent} class supports
   * "Erev Pesach" => "Pesach", and "Sukkot III (CH''M)" => "Sukkot".
   * For many holidays the basename and the event description are the same.
   * @return {string}
   */


  basename() {
    return this.getDesc();
  }
  /**
   * Returns a URL to hebcal.com or sefaria.org for more detail on the event.
   * Returns `undefined` for events with no detail page.
   * @return {string}
   */


  url() {
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


  observedInIsrael() {
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


  observedInDiaspora() {
    return !(this.mask & IL_ONLY$2);
  }
  /**
   * @deprecated
   * Optional additional event attributes (e.g. `eventTimeStr`, `cholHaMoedDay`)
   * @return {Object}
   */


  getAttrs() {
    return this;
  }
  /**
   * Makes a clone of this Event object
   * @return {Event}
   */


  clone() {
    const ev = new this.constructor();

    for (const property in this) {
      if (this.hasOwnProperty(property)) {
        ev[property] = this[property];
      }
    }

    return ev;
  }

}
const KEYCAP_DIGITS = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

/** Daily Hebrew date ("11th of Sivan, 5780") */

class HebrewDateEvent extends Event {
  /**
   * @param {HDate} date
   */
  constructor(date) {
    super(date, date.toString(), flags.HEBREW_DATE);
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


  render(locale) {
    const locale1 = locale && locale.toLowerCase();
    const locale0 = locale1 || Locale.getLocaleName();
    const hd = this.getDate();

    switch (locale0) {
      case 'h':
      case 'he':
      case 'he-x-nonikud':
        const dd = hd.getDate();
        const mm = Locale.gettext(hd.getMonthName(), locale0);
        const yy = hd.getFullYear();
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


  renderBrief(locale) {
    const locale1 = locale && locale.toLowerCase();
    const locale0 = locale1 || Locale.getLocaleName();
    const hd = this.getDate();

    if (hd.getMonth() === months.TISHREI && hd.getDate() === 1) {
      return this.render(locale0);
    }

    switch (locale0) {
      case 'h':
      case 'he':
      case 'he-x-nonikud':
        const dd = hd.getDate();
        const mm = Locale.gettext(hd.getMonthName(), locale0);
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


  static renderHebrew(day, monthName, fullYear) {
    return gematriya(day) + ' ' + monthName + ' ' + gematriya(fullYear);
  }

}

var sun = {};

Object.defineProperty(sun, "__esModule", {
  value: true
});
var Sun_1 = sun.Sun = void 0;

class Sun {
  constructor(date, latitude, longitude) {
    this.date = date;
    this.latitude = latitude;
    this.longitude = longitude;
    this.julianDate = getJD(date);
  }

  get solarNoon() {
    return calcSolNoon(this.julianDate, this.longitude, this.date);
  }

  timeAtAngle(angle, rising) {
    return calcSunriseSet(rising, angle, this.julianDate, this.date, this.latitude, this.longitude);
  }

}

Sun_1 = sun.Sun = Sun;

function formatDate(date, minutes) {
  const seconds = (minutes - Math.floor(minutes)) * 60;
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, minutes, seconds));
}

function calcTimeJulianCent(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  return T;
}

function radToDeg(angleRad) {
  return 180.0 * angleRad / Math.PI;
}

function degToRad(angleDeg) {
  return Math.PI * angleDeg / 180.0;
}

function calcGeomMeanLongSun(t) {
  let L0 = 280.46646 + t * (36000.76983 + t * 0.0003032);

  while (L0 > 360.0) {
    L0 -= 360.0;
  }

  while (L0 < 0.0) {
    L0 += 360.0;
  }

  return L0; // in degrees
}

function calcGeomMeanAnomalySun(t) {
  const M = 357.52911 + t * (35999.05029 - 0.0001537 * t);
  return M; // in degrees
}

function calcEccentricityEarthOrbit(t) {
  const e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
  return e; // unitless
}

function calcSunEqOfCenter(t) {
  const m = calcGeomMeanAnomalySun(t);
  const mrad = degToRad(m);
  const sinm = Math.sin(mrad);
  const sin2m = Math.sin(mrad + mrad);
  const sin3m = Math.sin(mrad + mrad + mrad);
  const C = sinm * (1.914602 - t * (0.004817 + 0.000014 * t)) + sin2m * (0.019993 - 0.000101 * t) + sin3m * 0.000289;
  return C; // in degrees
}

function calcSunTrueLong(t) {
  const l0 = calcGeomMeanLongSun(t);
  const c = calcSunEqOfCenter(t);
  const O = l0 + c;
  return O; // in degrees
}

function calcSunApparentLong(t) {
  const o = calcSunTrueLong(t);
  const omega = 125.04 - 1934.136 * t;
  const lambda = o - 0.00569 - 0.00478 * Math.sin(degToRad(omega));
  return lambda; // in degrees
}

function calcMeanObliquityOfEcliptic(t) {
  const seconds = 21.448 - t * (46.8150 + t * (0.00059 - t * 0.001813));
  const e0 = 23.0 + (26.0 + seconds / 60.0) / 60.0;
  return e0; // in degrees
}

function calcObliquityCorrection(t) {
  const e0 = calcMeanObliquityOfEcliptic(t);
  const omega = 125.04 - 1934.136 * t;
  const e = e0 + 0.00256 * Math.cos(degToRad(omega));
  return e; // in degrees
}

function calcSunDeclination(t) {
  const e = calcObliquityCorrection(t);
  const lambda = calcSunApparentLong(t);
  const sint = Math.sin(degToRad(e)) * Math.sin(degToRad(lambda));
  const theta = radToDeg(Math.asin(sint));
  return theta; // in degrees
}

function calcEquationOfTime(t) {
  const epsilon = calcObliquityCorrection(t);
  const l0 = calcGeomMeanLongSun(t);
  const e = calcEccentricityEarthOrbit(t);
  const m = calcGeomMeanAnomalySun(t);
  let y = Math.tan(degToRad(epsilon) / 2.0);
  y *= y;
  const sin2l0 = Math.sin(2.0 * degToRad(l0));
  const sinm = Math.sin(degToRad(m));
  const cos2l0 = Math.cos(2.0 * degToRad(l0));
  const sin4l0 = Math.sin(4.0 * degToRad(l0));
  const sin2m = Math.sin(2.0 * degToRad(m));
  const Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0 - 0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;
  return radToDeg(Etime) * 4.0; // in minutes of time
}

function calcHourAngle(angle, lat, solarDec) {
  const latRad = degToRad(lat);
  const sdRad = degToRad(solarDec);
  const HAarg = Math.cos(degToRad(90 + angle)) / (Math.cos(latRad) * Math.cos(sdRad)) - Math.tan(latRad) * Math.tan(sdRad);
  const HA = Math.acos(HAarg);
  return HA; // in radians (for sunset, use -HA)
}

function isNumber(inputVal) {
  let oneDecimal = false;
  const inputStr = `${inputVal}`;

  for (let i = 0; i < inputStr.length; i++) {
    const oneChar = inputStr.charAt(i);

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
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();

  if (month < 3) {
    year--;
    month += 12;
  }

  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JD = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
  return JD;
}

function calcSolNoon(jd, longitude, date) {
  const tnoon = calcTimeJulianCent(jd - longitude / 360.0);
  let eqTime = calcEquationOfTime(tnoon);
  const solNoonOffset = 720.0 - longitude * 4 - eqTime; // in minutes

  const newt = calcTimeJulianCent(jd + solNoonOffset / 1440.0);
  eqTime = calcEquationOfTime(newt);
  let solNoonLocal = 720 - longitude * 4 - eqTime; // in minutes

  while (solNoonLocal < 0.0) {
    solNoonLocal += 1440.0;
  }

  while (solNoonLocal >= 1440.0) {
    solNoonLocal -= 1440.0;
  }

  return formatDate(date, solNoonLocal); // return timeString(solNoonLocal, 3);
}

function calcSunriseSetUTC(rise, angle, JD, latitude, longitude) {
  const t = calcTimeJulianCent(JD);
  const eqTime = calcEquationOfTime(t);
  const solarDec = calcSunDeclination(t);
  let hourAngle = calcHourAngle(angle, latitude, solarDec); //alert("HA = " + radToDeg(hourAngle));

  if (!rise) hourAngle = -hourAngle;
  const delta = longitude + radToDeg(hourAngle);
  const timeUTC = 720 - 4.0 * delta - eqTime; // in minutes

  return timeUTC;
}

function calcSunriseSet(rise, angle, JD, date, latitude, longitude) // rise = 1 for sunrise, 0 for sunset
{
  const timeUTC = calcSunriseSetUTC(rise, angle, JD, latitude, longitude);
  const newTimeUTC = calcSunriseSetUTC(rise, angle, JD + timeUTC / 1440.0, latitude, longitude);

  if (isNumber(newTimeUTC)) {
    return formatDate(date, newTimeUTC);
  } else {
    // no sunrise/set found
    return new Date(NaN);
  }
}

const _formatters = {};
/**
 * @private
 * @param {string} tzid
 * @return {Intl.DateTimeFormat}
 */

function getFormatter$1(tzid) {
  const fmt = _formatters[tzid];
  if (fmt) return fmt;
  const f = new Intl.DateTimeFormat('en-US', {
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

const dateFormatRegex = /^(\d+).(\d+).(\d+),?\s+(\d+).(\d+).(\d+)/;
/**
 * @private
 * @param {string} tzid
 * @param {Date} date
 * @return {string}
 */

function getPseudoISO(tzid, date) {
  const str = getFormatter$1(tzid).format(date);
  const m = dateFormatRegex.exec(str);
  let hour = m[4];
  if (hour == '24') hour = '00';
  m[3] = pad4(m[3]);
  return `${m[3]}-${m[1]}-${m[2]}T${hour}:${m[5]}:${m[6]}Z`;
}
/**
 * @private
 * @param {string} tzid
 * @param {Date} date
 * @return {number}
 */

function getTimezoneOffset(tzid, date) {
  const utcStr = getPseudoISO('UTC', date);
  const localStr = getPseudoISO(tzid, date);
  const diffMs = new Date(utcStr).getTime() - new Date(localStr).getTime();
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


class Zmanim {
  /**
     * Initialize a Zmanim instance.
     * @param {Date|HDate} date Regular or Hebrew Date. If `date` is a regular `Date`,
     *    hours, minutes, seconds and milliseconds are ignored.
     * @param {number} latitude
     * @param {number} longitude
     */
  constructor(date, latitude, longitude) {
    if (typeof latitude !== 'number') throw new TypeError('Invalid latitude');
    if (typeof longitude !== 'number') throw new TypeError('Invalid longitude');

    if (latitude < -90 || latitude > 90) {
      throw new RangeError(`Latitude ${latitude} out of range [-90,90]`);
    }

    if (longitude < -180 || longitude > 180) {
      throw new RangeError(`Longitude ${longitude} out of range [-180,180]`);
    }

    const dt = greg.isDate(date) ? date : HDate$1.isHDate(date) ? date.greg() : throwTypeError$1(`invalid date: ${date}`);
    this.date = dt;
    this.sun = new Sun_1(this.date, latitude, longitude);
    this.latitude = latitude;
    this.longitude = longitude;
  }
  /**
   * @deprecated
   * @return {ZmanimTimesResult}
   */


  suntime() {
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


  sunrise() {
    return this.sun.timeAtAngle(0.833333, true);
  }
  /** @return {Date} */


  sunset() {
    return this.sun.timeAtAngle(0.833333, false);
  }
  /** @return {Date} */


  dawn() {
    return this.sun.timeAtAngle(6, true);
  }
  /** @return {Date} */


  dusk() {
    return this.sun.timeAtAngle(6, false);
  }
  /** @return {number} */


  hour() {
    return (this.sunset() - this.sunrise()) / 12; // ms in hour
  }
  /** @return {number} */


  hourMins() {
    // hour in ms / (1000 ms in s * 60 s in m) = mins in halachic hour
    return this.hour() / (1000 * 60);
  }
  /** @return {Date} */


  gregEve() {
    const prev = new Date(this.date);
    prev.setDate(prev.getDate() - 1);
    const zman = new Zmanim(prev, this.latitude, this.longitude);
    return zman.sunset();
  }
  /** @return {number} */


  nightHour() {
    return (this.sunrise() - this.gregEve()) / 12; // ms in hour
  }
  /** @return {number} */


  nightHourMins() {
    // hour in ms / (1000 ms in s * 60 s in m) = mins in halachic hour
    return this.nightHour() / (1000 * 60);
  }
  /**
     * @param {number} hours
     * @return {Date}
     */


  hourOffset(hours) {
    return new Date(this.sunrise().getTime() + this.hour() * hours);
  }
  /** @return {Date} */


  chatzot() {
    return this.hourOffset(6);
  }
  /** @return {Date} */


  chatzotNight() {
    return new Date(this.sunrise().getTime() - this.nightHour() * 6);
  }
  /** @return {Date} */


  alotHaShachar() {
    return this.sun.timeAtAngle(16.1, true);
  }
  /** @return {Date} */


  misheyakir() {
    return this.sun.timeAtAngle(11.5, true);
  }
  /** @return {Date} */


  misheyakirMachmir() {
    return this.sun.timeAtAngle(10.2, true);
  }
  /** @return {Date} */


  sofZmanShma() {
    // Gra
    return this.hourOffset(3);
  }
  /** @return {Date} */


  sofZmanTfilla() {
    // Gra
    return this.hourOffset(4);
  }
  /** @return {Date} */


  minchaGedola() {
    return this.hourOffset(6.5);
  }
  /** @return {Date} */


  minchaKetana() {
    return this.hourOffset(9.5);
  }
  /** @return {Date} */


  plagHaMincha() {
    return this.hourOffset(10.75);
  }
  /**
   * @param {number} [angle=8.5] optional time for solar depression.
   *   Default is 8.5 degrees for 3 small stars, use 7.083 degress for 3 medium-sized stars.
   * @return {Date}
   */


  tzeit(angle = 8.5) {
    return this.sun.timeAtAngle(angle, false);
  }
  /** @return {Date} */


  neitzHaChama() {
    return this.sunrise();
  }
  /** @return {Date} */


  shkiah() {
    return this.sunset();
  }
  /**
   * Uses timeFormat to return a date like '20:34'
   * @param {Date} dt
   * @param {Intl.DateTimeFormat} timeFormat
   * @return {string}
   */


  static formatTime(dt, timeFormat) {
    const time = timeFormat.format(dt);
    const hm = time.split(':');

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


  static roundTime(dt) {
    const millis = dt.getTime();

    if (isNaN(millis)) {
      return dt;
    } // Round up to next minute if needed


    const millisOnly = dt.getMilliseconds();
    const seconds = dt.getSeconds();

    if (seconds === 0 && millisOnly === 0) {
      return dt;
    }

    const secAndMillis = seconds * 1000 + millisOnly;
    const delta = secAndMillis >= 30000 ? 60000 - secAndMillis : -1 * secAndMillis;
    return new Date(millis + delta);
  }
  /**
   * Get offset string (like "+05:00" or "-08:00") from tzid (like "Europe/Moscow")
   * @param {string} tzid
   * @param {Date} date
   * @return {string}
   */


  static timeZoneOffset(tzid, date) {
    const offset = getTimezoneOffset(tzid, date);
    const offsetAbs = Math.abs(offset);
    const hours = Math.floor(offsetAbs / 60);
    const minutes = offsetAbs % 60;
    return (offset < 0 ? '+' : '-') + pad2(hours) + ':' + pad2(minutes);
  }
  /**
   * Returns a string like "2022-04-01T13:06:00-11:00"
   * @param {string} tzid
   * @param {Date} date
   * @return {string}
   */


  static formatISOWithTimeZone(tzid, date) {
    if (isNaN(date.getTime())) {
      return null;
    }

    return getPseudoISO(tzid, date).substring(0, 19) + Zmanim.timeZoneOffset(tzid, date);
  }
  /**
   * Returns sunset + offset (either positive or negative).
   * @param {number} offset
   * @return {Date}
   */


  sunsetOffset(offset) {
    const sunset = this.sunset();

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


  sunsetOffsetTime(offset, timeFormat) {
    const dt = this.sunsetOffset(offset);

    if (isNaN(dt.getTime())) {
      // `No sunset for ${location} on ${hd}`
      return [undefined, undefined];
    }

    const time = Zmanim.formatTime(dt, timeFormat);
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


  tzeitTime(angle, timeFormat) {
    const dt = this.tzeit(angle);

    if (isNaN(dt.getTime())) {
      return [undefined, undefined];
    }

    const time = Zmanim.roundTime(dt);
    const timeStr = Zmanim.formatTime(time, timeFormat);
    return [time, timeStr];
  }

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
const classicCities0 = [['Ashdod', 'IL', 31.79213, 34.64966, 'Asia/Jerusalem'], ['Atlanta', 'US', 33.749, -84.38798, 'America/New_York'], ['Austin', 'US', 30.26715, -97.74306, 'America/Chicago'], ['Baghdad', 'IQ', 33.34058, 44.40088, 'Asia/Baghdad'], ['Beer Sheva', 'IL', 31.25181, 34.7913, 'Asia/Jerusalem'], ['Berlin', 'DE', 52.52437, 13.41053, 'Europe/Berlin'], ['Baltimore', 'US', 39.29038, -76.61219, 'America/New_York'], ['Bogota', 'CO', 4.60971, -74.08175, 'America/Bogota'], ['Boston', 'US', 42.35843, -71.05977, 'America/New_York'], ['Budapest', 'HU', 47.49801, 19.03991, 'Europe/Budapest'], ['Buenos Aires', 'AR', -34.61315, -58.37723, 'America/Argentina/Buenos_Aires'], ['Buffalo', 'US', 42.88645, -78.87837, 'America/New_York'], ['Chicago', 'US', 41.85003, -87.65005, 'America/Chicago'], ['Cincinnati', 'US', 39.162, -84.45689, 'America/New_York'], ['Cleveland', 'US', 41.4995, -81.69541, 'America/New_York'], ['Dallas', 'US', 32.78306, -96.80667, 'America/Chicago'], ['Denver', 'US', 39.73915, -104.9847, 'America/Denver'], ['Detroit', 'US', 42.33143, -83.04575, 'America/Detroit'], ['Eilat', 'IL', 29.55805, 34.94821, 'Asia/Jerusalem'], ['Gibraltar', 'GI', 36.14474, -5.35257, 'Europe/Gibraltar'], ['Haifa', 'IL', 32.81841, 34.9885, 'Asia/Jerusalem'], ['Hawaii', 'US', 21.30694, -157.85833, 'Pacific/Honolulu'], ['Helsinki', 'FI', 60.16952, 24.93545, 'Europe/Helsinki'], ['Houston', 'US', 29.76328, -95.36327, 'America/Chicago'], ['Jerusalem', 'IL', 31.76904, 35.21633, 'Asia/Jerusalem'], ['Johannesburg', 'ZA', -26.20227, 28.04363, 'Africa/Johannesburg'], ['Kiev', 'UA', 50.45466, 30.5238, 'Europe/Kiev'], ['La Paz', 'BO', -16.5, -68.15, 'America/La_Paz'], ['Livingston', 'US', 40.79593, -74.31487, 'America/New_York'], ['Las Vegas', 'US', 36.17497, -115.13722, 'America/Los_Angeles'], ['London', 'GB', 51.50853, -0.12574, 'Europe/London'], ['Los Angeles', 'US', 34.05223, -118.24368, 'America/Los_Angeles'], ['Marseilles', 'FR', 43.29695, 5.38107, 'Europe/Paris'], ['Miami', 'US', 25.77427, -80.19366, 'America/New_York'], ['Minneapolis', 'US', 44.97997, -93.26384, 'America/Chicago'], ['Melbourne', 'AU', -37.814, 144.96332, 'Australia/Melbourne'], ['Mexico City', 'MX', 19.42847, -99.12766, 'America/Mexico_City'], ['Montreal', 'CA', 45.50884, -73.58781, 'America/Toronto'], ['Moscow', 'RU', 55.75222, 37.61556, 'Europe/Moscow'], ['New York', 'US', 40.71427, -74.00597, 'America/New_York'], ['Omaha', 'US', 41.25861, -95.93779, 'America/Chicago'], ['Ottawa', 'CA', 45.41117, -75.69812, 'America/Toronto'], ['Panama City', 'PA', 8.9936, -79.51973, 'America/Panama'], ['Paris', 'FR', 48.85341, 2.3488, 'Europe/Paris'], ['Pawtucket', 'US', 41.87871, -71.38256, 'America/New_York'], ['Petach Tikvah', 'IL', 32.08707, 34.88747, 'Asia/Jerusalem'], ['Philadelphia', 'US', 39.95233, -75.16379, 'America/New_York'], ['Phoenix', 'US', 33.44838, -112.07404, 'America/Phoenix'], ['Pittsburgh', 'US', 40.44062, -79.99589, 'America/New_York'], ['Providence', 'US', 41.82399, -71.41283, 'America/New_York'], ['Portland', 'US', 45.52345, -122.67621, 'America/Los_Angeles'], ['Saint Louis', 'US', 38.62727, -90.19789, 'America/Chicago'], ['Saint Petersburg', 'RU', 59.93863, 30.31413, 'Europe/Moscow'], ['San Diego', 'US', 32.71533, -117.15726, 'America/Los_Angeles'], ['San Francisco', 'US', 37.77493, -122.41942, 'America/Los_Angeles'], ['Sao Paulo', 'BR', -23.5475, -46.63611, 'America/Sao_Paulo'], ['Seattle', 'US', 47.60621, -122.33207, 'America/Los_Angeles'], ['Sydney', 'AU', -33.86785, 151.20732, 'Australia/Sydney'], ['Tel Aviv', 'IL', 32.08088, 34.78057, 'Asia/Jerusalem'], ['Tiberias', 'IL', 32.79221, 35.53124, 'Asia/Jerusalem'], ['Toronto', 'CA', 43.70011, -79.4163, 'America/Toronto'], ['Vancouver', 'CA', 49.24966, -123.11934, 'America/Vancouver'], ['White Plains', 'US', 41.03399, -73.76291, 'America/New_York'], ['Washington DC', 'US', 38.89511, -77.03637, 'America/New_York'], ['Worcester', 'US', 42.26259, -71.80229, 'America/New_York']];
const classicCities = Object.create(null); // Zip-Codes.com TimeZone IDs

const ZIPCODES_TZ_MAP = {
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

const timeFormatCache = Object.create(null);
/**
 * Gets a 24-hour time formatter (e.g. 07:41 or 20:03) from cache
 * or makes a new one if needed
 * @private
 * @param {string} tzid
 * @return {Intl.DateTimeFormat}
 */

function getFormatter(tzid) {
  const fmt = timeFormatCache[tzid];
  if (fmt) return fmt;
  const f = new Intl.DateTimeFormat('en-US', {
    timeZone: tzid,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  timeFormatCache[tzid] = f;
  return f;
}
/** Class representing Location */


class Location {
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
  constructor(latitude, longitude, il, tzid, cityName, countryCode, geoid) {
    this.latitude = +latitude;

    if (this.latitude < -90 || this.latitude > 90) {
      throw new RangeError(`Latitude ${this.latitude} out of range [-90,90]`);
    }

    this.longitude = +longitude;

    if (this.longitude < -180 || this.longitude > 180) {
      throw new RangeError(`Longitude ${this.longitude} out of range [-180,180]`);
    }

    this.il = Boolean(il);
    this.tzid = tzid;
    this.name = cityName;
    this.cc = countryCode;
    this.geoid = geoid;
  }
  /** @return {number} */


  getLatitude() {
    return this.latitude;
  }
  /** @return {number} */


  getLongitude() {
    return this.longitude;
  }
  /** @return {boolean} */


  getIsrael() {
    return this.il;
  }
  /** @return {string} */


  getName() {
    return this.name;
  }
  /**
   * Returns the location name, up to the first comma
   * @return {string}
   */


  getShortName() {
    if (!this.name) return this.name;
    const comma = this.name.indexOf(',');
    return comma == -1 ? this.name : this.name.substring(0, comma);
  }
  /** @return {string} */


  getCountryCode() {
    return this.cc;
  }
  /** @return {string} */


  getTzid() {
    return this.tzid;
  }
  /**
   * Gets a 24-hour time formatter (e.g. 07:41 or 20:03) for this location
   * @return {Intl.DateTimeFormat}
   */


  getTimeFormatter() {
    return getFormatter(this.tzid);
  }
  /** @return {string} */


  getGeoId() {
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


  static lookup(name) {
    return classicCities[name.toLowerCase()];
  }
  /**
   * @deprecated
   * @param {Date|HDate} hdate
   * @return {Date}
   */


  sunset(hdate) {
    return new Zmanim(hdate, this.getLatitude(), this.getLongitude()).sunset();
  }
  /**
   * @deprecated
   * @param {Date|HDate} hdate
   * @param {number} [angle]
   * @return {Date}
   */


  tzeit(hdate, angle) {
    return new Zmanim(hdate, this.getLatitude(), this.getLongitude()).tzeit(angle);
  }
  /** @return {string} */


  toString() {
    return JSON.stringify(this);
  }
  /**
   * Converts legacy Hebcal timezone to a standard Olson tzid.
   * @param {number} tz integer, GMT offset in hours
   * @param {string} dst 'none', 'eu', 'usa', or 'israel'
   * @return {string}
   */


  static legacyTzToTzid(tz, dst) {
    tz = +tz;

    if (dst == 'none') {
      if (tz == 0) {
        return 'UTC';
      } else {
        const plus = tz > 0 ? '+' : '';
        return `Etc/GMT${plus}${tz}`;
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


  static getUsaTzid(state, tz, dst) {
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


  static geonameCityDescr(cityName, admin1, countryName) {
    if (countryName == 'United States') countryName = 'USA';
    if (countryName == 'United Kingdom') countryName = 'UK';
    let cityDescr = cityName;

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


  static addLocation(cityName, location) {
    const name = cityName.toLowerCase();

    if (classicCities[name]) {
      return false;
    }

    classicCities[name] = location;
    return true;
  }

}
classicCities0.forEach(city => {
  const location = new Location(city[2], city[3], city[1] == 'IL', city[4], city[0], city[1]);
  Location.addLocation(location.getName(), location);
});

/* eslint-disable max-len */
const days = {
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

const TZEIT_3MEDIUM_STARS = 7.083;
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
  let havdalahTitle = false;
  let useHavdalahOffset = dow == days.SAT;
  let mask = e ? e.getFlags() : flags.LIGHT_CANDLES;

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


  const offset = useHavdalahOffset ? options.havdalahMins : options.candleLightingMins;
  const zmanim = new Zmanim(hd, location.getLatitude(), location.getLongitude());
  const time = offset ? zmanim.sunsetOffset(offset) : zmanim.tzeit(options.havdalahDeg);

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

class TimedEvent extends Event {
  /**
   * @param {HDate} date
   * @param {string} desc Description (not translated)
   * @param {number} mask
   * @param {Date} eventTime
   * @param {Location} location
   * @param {Event} linkedEvent
   */
  constructor(date, desc, mask, eventTime, location, linkedEvent) {
    super(date, desc, mask);
    this.eventTime = Zmanim.roundTime(eventTime);
    this.location = location;
    const timeFormat = location.getTimeFormatter();
    this.eventTimeStr = Zmanim.formatTime(this.eventTime, timeFormat);

    if (typeof linkedEvent !== 'undefined') {
      this.linkedEvent = linkedEvent;
    }
  }
  /**
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  render(locale) {
    return Locale.gettext(this.getDesc(), locale) + ': ' + this.eventTimeStr;
  }
  /**
   * Returns translation of "Candle lighting" without the time.
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  renderBrief(locale) {
    return Locale.gettext(this.getDesc(), locale);
  }

}
/** Havdalah after Shabbat or holiday */

class HavdalahEvent extends TimedEvent {
  /**
   * @param {HDate} date
   * @param {number} mask
   * @param {Date} eventTime
   * @param {Location} location
   * @param {number} havdalahMins
   * @param {Event} linkedEvent
   */
  constructor(date, mask, eventTime, location, havdalahMins, linkedEvent) {
    super(date, 'Havdalah', mask, eventTime, location, linkedEvent);

    if (havdalahMins) {
      this.havdalahMins = havdalahMins;
    }
  }
  /**
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  render(locale) {
    return this.renderBrief(locale) + ': ' + this.eventTimeStr;
  }
  /**
   * Returns translation of "Havdalah" without the time.
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  renderBrief(locale) {
    let str = Locale.gettext(this.getDesc(), locale);

    if (this.havdalahMins) {
      const min = Locale.gettext('min', locale);
      str += ` (${this.havdalahMins} ${min})`;
    }

    return str;
  }
  /** @return {string} */


  getEmoji() {
    return '✨';
  }

}
/** Candle lighting before Shabbat or holiday */

class CandleLightingEvent extends TimedEvent {
  /**
   * @param {HDate} date
   * @param {number} mask
   * @param {Date} eventTime
   * @param {Location} location
   * @param {Event} linkedEvent
   */
  constructor(date, mask, eventTime, location, linkedEvent) {
    super(date, 'Candle lighting', mask, eventTime, location, linkedEvent);
  }
  /** @return {string} */


  getEmoji() {
    return '🕯️';
  }

}
/**
 * Makes a pair of events representing fast start and end times
 * @private
 * @param {Event} ev
 * @param {Location} location
 * @return {Event}
 */

function makeFastStartEnd(ev, location) {
  const desc = ev.getDesc();

  if (desc === 'Yom Kippur') {
    return ev;
  }

  ev = ev.clone();
  const hd = ev.getDate();
  const dt = hd.greg();
  const zmanim = new Zmanim(dt, location.getLatitude(), location.getLongitude());

  if (desc === 'Erev Tish\'a B\'Av') {
    const sunset = zmanim.sunset();
    ev.startEvent = makeTimedEvent(hd, sunset, 'Fast begins', ev, location);
  } else if (desc.substring(0, 11) === 'Tish\'a B\'Av') {
    ev.endEvent = makeTimedEvent(hd, zmanim.tzeit(TZEIT_3MEDIUM_STARS), 'Fast ends', ev, location);
  } else {
    const dawn = zmanim.alotHaShachar();
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
  const zmanim = new Zmanim(hd.greg(), location.getLatitude(), location.getLongitude());
  const candleLightingTime = zmanim.dusk(); // const candleLightingTime = zmanim.tzeit(4.6667);

  return makeTimedEvent(hd, candleLightingTime, ev.getDesc(), ev, location);
}

/* eslint-disable camelcase */
const shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
/**
 * Represents a molad, the moment when the new moon is "born"
 */

class Molad {
  /**
   * Calculates the molad for a Hebrew month
   * @param {number} year
   * @param {number} month
   */
  constructor(year, month) {
    let m_adj = month - 7;

    if (m_adj < 0) {
      m_adj += HDate$1.monthsInYear(year);
    }

    const m_elapsed = 235 * Math.floor((year - 1) / 19) + // Months in complete 19 year lunar (Metonic) cycles so far
    12 * ((year - 1) % 19) + // Regular months in this cycle
    Math.floor((7 * ((year - 1) % 19) + 1) / 19) + // Leap months this cycle
    m_adj; // add elapsed months till the start of the molad of the month

    const p_elapsed = 204 + Math.floor(793 * (m_elapsed % 1080));
    const h_elapsed = 5 + 12 * m_elapsed + 793 * Math.floor(m_elapsed / 1080) + Math.floor(p_elapsed / 1080) - 6;
    const parts = p_elapsed % 1080 + 1080 * (h_elapsed % 24);
    const chalakim = parts % 1080;
    const day = 1 + 29 * m_elapsed + Math.floor(h_elapsed / 24);
    const dow = day % 7;
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


  getYear() {
    return this.year;
  }
  /**
   * @return {number}
   */


  getMonth() {
    return this.month;
  }
  /**
   * @return {string}
   */


  getMonthName() {
    return HDate$1.getMonthName(this.month, this.year);
  }
  /**
   * @return {number} Day of Week (0=Sunday, 6=Saturday)
   */


  getDow() {
    return this.dow;
  }
  /**
   * @return {number} hour of day (0-23)
   */


  getHour() {
    return this.hour;
  }
  /**
   * @return {number} minutes past hour (0-59)
   */


  getMinutes() {
    return this.minutes;
  }
  /**
   * @return {number} parts of a minute (0-17)
   */


  getChalakim() {
    return this.chalakim;
  }

}
/** Represents a Molad announcement on Shabbat Mevarchim */

class MoladEvent extends Event {
  /**
   * @param {HDate} date Hebrew date event occurs
   * @param {number} hyear molad year
   * @param {number} hmonth molad month
   */
  constructor(date, hyear, hmonth) {
    const m = new Molad(hyear, hmonth);
    const monthName = m.getMonthName();
    super(date, `Molad ${monthName} ${hyear}`, flags.MOLAD);
    this.molad = m;
  }
  /**
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  render(locale) {
    const m = this.molad;
    const monthName = m.getMonthName();
    const dow = shortDayNames[m.getDow()];
    const minutes = m.getMinutes();
    const hour = m.getHour();
    const chalakim = m.getChalakim();
    return `Molad ${monthName}: ${dow}, ${minutes} minutes and ${chalakim} chalakim after ${hour}:00`;
  }

}

const sefirot = [null, 'Lovingkindness', 'Might', 'Beauty', 'Eternity', 'Splendor', 'Foundation', 'Majesty'];
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

class OmerEvent extends Event {
  /**
   * @param {HDate} date
   * @param {number} omerDay
   */
  constructor(date, omerDay) {
    super(date, `Omer ${omerDay}`, flags.OMER_COUNT, {
      omer: omerDay
    });
    this.weekNumber = Math.floor((omerDay - 1) / 7) + 1;
    this.daysWithinWeeks = omerDay % 7 || 7;
    const week = sefirot[this.weekNumber];
    const dayWithinWeek = sefirot[this.daysWithinWeeks];
    const heWeek = Locale.gettext(week, 'he');
    const heDayWithinWeek = Locale.gettext(dayWithinWeek, 'he');
    const hePrefix = 'שֶׁבַּ';
    this.memo = `${dayWithinWeek} that is in ${week} / ${heDayWithinWeek} ${hePrefix}${heWeek}`.normalize();
  }
  /**
   * @todo use gettext()
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  render(locale) {
    const omer = this.omer;
    const nth = locale == 'he' ? gematriya(omer) : Locale.ordinal(omer, locale);
    return nth + ' ' + Locale.gettext('day of the Omer', locale);
  }
  /**
   * Returns translation of "Omer 22" without ordinal numbers.
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  renderBrief(locale) {
    return Locale.gettext('Omer', locale) + ' ' + this.omer;
  }
  /** @return {string} */


  getEmoji() {
    if (this.emoji) return this.emoji;
    const number = this.omer;
    const ones = number % 10;
    const tens = Math.floor(number / 10);
    return KEYCAP_DIGITS[tens] + KEYCAP_DIGITS[ones];
  }
  /** @return {number} */


  getWeeks() {
    return this.weekNumber;
  }
  /** @return {number} */


  getDaysWithinWeeks() {
    return this.daysWithinWeeks;
  }
  /**
   * @param {string} locale
   * @return {string}
   */


  getTodayIs(locale) {
    const totalDaysStr = this.omer === 1 ? 'day' : 'days';
    let str = `Today is ${this.omer} ${totalDaysStr}`;

    if (this.weekNumber > 1 || this.omer === 7) {
      const day7 = this.daysWithinWeeks === 7;
      const numWeeks = day7 ? this.weekNumber : this.weekNumber - 1;
      const weeksStr = numWeeks === 1 ? 'week' : 'weeks';
      str += `, which is ${numWeeks} ${weeksStr}`;

      if (!day7) {
        const daysStr = this.daysWithinWeeks === 1 ? 'day' : 'days';
        str += ` and ${this.daysWithinWeeks} ${daysStr}`;
      }
    }

    return str + ' of the Omer';
  }

}

/* eslint-disable no-multi-spaces */
const osdate = new Date(1923, 8, 11);
const osday = greg.greg2abs(osdate);
const nsday = greg.greg2abs(new Date(1975, 5, 24));
const shas = [['Berachot', 64], ['Shabbat', 157], ['Eruvin', 105], ['Pesachim', 121], ['Shekalim', 22], ['Yoma', 88], ['Sukkah', 56], ['Beitzah', 40], ['Rosh Hashana', 35], ['Taanit', 31], ['Megillah', 32], ['Moed Katan', 29], ['Chagigah', 27], ['Yevamot', 122], ['Ketubot', 112], ['Nedarim', 91], ['Nazir', 66], ['Sotah', 49], ['Gitin', 90], ['Kiddushin', 82], ['Baba Kamma', 119], ['Baba Metzia', 119], ['Baba Batra', 176], ['Sanhedrin', 113], ['Makkot', 24], ['Shevuot', 49], ['Avodah Zarah', 76], ['Horayot', 14], ['Zevachim', 120], ['Menachot', 110], ['Chullin', 142], ['Bechorot', 61], ['Arachin', 34], ['Temurah', 34], ['Keritot', 28], ['Meilah', 22], ['Kinnim', 4], ['Tamid', 10], ['Midot', 4], ['Niddah', 73]].map(m => {
  return {
    name: m[0],
    blatt: m[1]
  };
});
/**
 * Returns the Daf Yomi for given date
 */

class DafYomi {
  /**
   * Initializes a daf yomi instance
   * @param {Date} gregdate Gregorian date
   */
  constructor(gregdate) {
    const cday = typeof gregdate === 'number' && !isNaN(gregdate) ? gregdate : greg.isDate(gregdate) ? greg.greg2abs(gregdate) : HDate.isHDate(gregdate) ? gregdate.abs() : throwTypeError(`non-date given to dafyomi: ${gregdate}`);

    if (cday < osday) {
      throw new RangeError(`Date ${gregdate} too early; Daf Yomi cycle began on ${osdate}`);
    }

    let cno;
    let dno;

    if (cday >= nsday) {
      // "new" cycle
      cno = 8 + (cday - nsday) / 2711;
      dno = (cday - nsday) % 2711;
    } else {
      // old cycle
      cno = 1 + (cday - osday) / 2702;
      dno = (cday - osday) % 2702;
    } // Find the daf taking note that the cycle changed slightly after cycle 7.


    let total = 0;
    let blatt = 0;
    let count = -1; // Fix Shekalim for old cycles

    if (cno <= 7) {
      shas[4].blatt = 13;
    } else {
      shas[4].blatt = 22;
    } // Find the daf


    let j = 0;
    const dafcnt = 40;

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


  getBlatt() {
    return this.blatt;
  }
  /**
   * @return {string}
   */


  getName() {
    return this.name;
  }
  /**
   * Formats (with translation) the dafyomi result as a string like "Pesachim 34"
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  render(locale) {
    return Locale.gettext(this.name, locale) + ' ' + this.blatt;
  }

}
const dafYomiSefaria = {
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

class DafYomiEvent extends Event {
  /**
   * @param {HDate} date
   */
  constructor(date) {
    const daf = new DafYomi(date.greg());
    super(date, daf.render(), flags.DAF_YOMI, {
      daf: daf
    });
  }
  /**
   * Returns Daf Yomi name including the 'Daf Yomi: ' prefix (e.g. "Daf Yomi: Pesachim 107").
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  render(locale) {
    return Locale.gettext('Daf Yomi', locale) + ': ' + this.daf.render(locale);
  }
  /**
   * Returns Daf Yomi name without the 'Daf Yomi: ' prefix (e.g. "Pesachim 107").
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  renderBrief(locale) {
    return this.daf.render(locale);
  }
  /**
   * Returns a link to sefaria.org or dafyomi.org
   * @return {string}
   */


  url() {
    const daf = this.daf;
    const tractate = daf.getName();
    const blatt = daf.getBlatt();

    if (tractate == 'Kinnim' || tractate == 'Midot') {
      return `https://www.dafyomi.org/index.php?masechta=meilah&daf=${blatt}a`;
    } else {
      const name0 = dafYomiSefaria[tractate] || tractate;
      const name = name0.replace(/ /g, '_');
      return `https://www.sefaria.org/${name}.${blatt}a?lang=bi`;
    }
  }

}

/* eslint-disable new-cap */
const INCOMPLETE = 0;
const REGULAR = 1;
const COMPLETE = 2; // eslint-disable-next-line require-jsdoc

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


class Sedra {
  /**
   * Caculates the Parashah HaShavua for an entire Hebrew year
   * @param {number} hebYr - Hebrew year (e.g. 5749)
   * @param {boolean} il - Use Israel sedra schedule (false for Diaspora)
   */
  constructor(hebYr, il) {
    // the Hebrew year
    hebYr = +hebYr;
    const longC = HDate$1.longCheshvan(hebYr);
    const shortK = HDate$1.shortKislev(hebYr);
    const type = this.type = longC && !shortK ? COMPLETE : !longC && shortK ? INCOMPLETE : REGULAR;
    this.year = hebYr;
    const rh0 = new HDate$1(1, months.TISHREI, hebYr);
    const rh = rh0.abs();
    const rhDay = this.roshHashanaDay = rh0.getDay() + 1; // find the first Saturday on or after Rosh Hashana

    this.firstSaturday = HDate$1.dayOnOrBefore(6, rh + 6);
    const leap = this.leap = +HDate$1.isLeapYear(hebYr);
    this.il = Boolean(il);
    const key = `${leap}${rhDay}${type}`;

    if (types[key]) {
      this.key = key;
      this.theSedraArray = types[key];
    } else {
      const key2 = this.key = key + +this.il; // cast to num, then concat

      this.theSedraArray = types[key2];
    }

    if (!this.theSedraArray) {
      throw new Error(`improper sedra year type ${this.key} calculated for ${hebYr}`);
    }
  }
  /**
   * Returns the parsha (or parshiyot) read on Hebrew date
   * @param {HDate|number} hDate Hebrew date or R.D. days
   * @return {string[]}
   */


  get(hDate) {
    return this.lookup(hDate).parsha;
  }
  /**
   * Looks up parsha for the date, then returns a translated or transliterated string
   * @param {HDate|number} hDate Hebrew date or R.D. days
   * @param {string} [locale] Optional locale name (i.e: `'he'`, `'fr'`). Defaults to active locale
   * @return {string}
   */


  getString(hDate, locale) {
    const parsha = this.get(hDate);
    const locale0 = locale || Locale.getLocaleName();
    let name = Locale.gettext(parsha[0], locale0);

    if (parsha.length == 2) {
      const hyphen = locale0 == 'he' ? '־' : '-';
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


  isParsha(hDate) {
    return !this.lookup(hDate).chag;
  }
  /**
   * Returns the date that a parsha occurs
   * @param {number|string|string[]} parsha
   * @return {HDate}
   */


  find(parsha) {
    if (typeof parsha === 'number') {
      if (parsha > 53 || parsha < 0 && !isValidDouble(parsha)) {
        throw new RangeError(`Invalid parsha number: ${parsha}`);
      }

      const idx = this.theSedraArray.indexOf(parsha);

      if (idx === -1) {
        return null; // doesn't occur this year
      }

      return new HDate$1(this.firstSaturday + idx * 7);
    } else if (typeof parsha === 'string') {
      const num = parsha2id[parsha];

      if (typeof num === 'number') {
        return this.find(num);
      } else if (parsha.indexOf('-') !== -1) {
        return this.find(parsha.split('-'));
      } else {
        // try to find Saturday holiday like 'Yom Kippur'
        const idx = this.theSedraArray.indexOf(parsha);

        if (idx === -1) {
          return null; // doesn't occur this year
        }

        return new HDate$1(this.firstSaturday + idx * 7);
      }
    } else if (Array.isArray(parsha) && parsha.length === 1 && typeof parsha[0] === 'string') {
      return this.find(parsha[0]);
    } else if (Array.isArray(parsha) && parsha.length === 2 && typeof parsha[0] === 'string' && typeof parsha[1] === 'string') {
      const p1 = parsha[0];
      const p2 = parsha[1];
      const num1 = parsha2id[p1];
      const num2 = parsha2id[p2];

      if (num2 === num1 + 1) {
        return this.find(-num1);
      } else {
        throw new RangeError(`Unrecognized parsha name: ${p1}-${p2}`);
      }
    } else {
      throw new TypeError(`Invalid parsha argument: ${parsha}`);
    }
  }
  /**
   * @private
   * @return {Object[]}
   */


  getSedraArray() {
    return this.theSedraArray;
  }
  /**
   * R.D. date of the first Saturday on or after Rosh Hashana
   * @return {number}
   */


  getFirstSaturday() {
    return this.firstSaturday;
  }
  /** @return {number} */


  getYear() {
    return this.year;
  }
  /**
   * Returns an object describing the parsha on the first Saturday on or after absdate
   * @param {HDate|number} hDate Hebrew date or R.D. days
   * @return {SedraResult}
   */


  lookup(hDate) {
    const absDate = typeof hDate === 'number' ? hDate : HDate$1.isHDate(hDate) ? hDate.abs() : throwError(`Bad date argument: ${hDate}`); // find the first saturday on or after today's date

    const saturday = HDate$1.dayOnOrBefore(6, absDate + 6);
    const weekNum = (saturday - this.firstSaturday) / 7;
    const index = this.theSedraArray[weekNum];

    if (typeof index === 'undefined') {
      const sedra = new Sedra(this.year + 1, this.il);
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

    const p1 = D(index); // undouble the parsha

    return {
      parsha: [parshiot[p1], parshiot[p1 + 1]],
      chag: false
    };
  }

}
/**
 * The 54 parshiyot of the Torah as transilterated strings
 * parshiot[0] == 'Bereshit', parshiot[1] == 'Noach', parshiot[53] == "Ha'Azinu".
 * @readonly
 * @type {string[]}
 */

const parshiot = ['Bereshit', 'Noach', 'Lech-Lecha', 'Vayera', 'Chayei Sara', 'Toldot', 'Vayetzei', 'Vayishlach', 'Vayeshev', 'Miketz', 'Vayigash', 'Vayechi', 'Shemot', 'Vaera', 'Bo', 'Beshalach', 'Yitro', 'Mishpatim', 'Terumah', 'Tetzaveh', 'Ki Tisa', 'Vayakhel', 'Pekudei', 'Vayikra', 'Tzav', 'Shmini', 'Tazria', 'Metzora', 'Achrei Mot', 'Kedoshim', 'Emor', 'Behar', 'Bechukotai', 'Bamidbar', 'Nasso', 'Beha\'alotcha', 'Sh\'lach', 'Korach', 'Chukat', 'Balak', 'Pinchas', 'Matot', 'Masei', 'Devarim', 'Vaetchanan', 'Eikev', 'Re\'eh', 'Shoftim', 'Ki Teitzei', 'Ki Tavo', 'Nitzavim', 'Vayeilech', 'Ha\'Azinu'];
const parsha2id = {};

for (let id = 0; id < parshiot.length; id++) {
  const name = parshiot[id];
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

const RH = 'Rosh Hashana'; // 0

const YK = 'Yom Kippur'; // 1

const SUKKOT = 'Sukkot'; // 0

const CHMSUKOT = 'Sukkot Shabbat Chol ha-Moed'; // 0

const SHMINI = 'Shmini Atzeret'; // 0

const EOY = CHMSUKOT; // always Sukkot day 3, 5 or 6

const PESACH = 'Pesach'; // 25

const PESACH1 = 'Pesach I';
const CHMPESACH = 'Pesach Shabbat Chol ha-Moed'; // 25

const PESACH7 = 'Pesach VII'; // 25

const PESACH8 = 'Pesach VIII';
const SHAVUOT = 'Shavuot'; // 33

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
  }, (v, k) => k + start);
}
/**
 * The ordinary year types (keviot)
 * names are leap/nonleap - day - incomplete/regular/complete - diaspora/Israel
 * @private
 * @readonly
 * @type {Object.<string, Object[]>}
 */


const types = {
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

class ParshaEvent extends Event {
  /**
   * @param {HDate} date
   * @param {string[]} parsha - untranslated name of single or double parsha,
   *   such as ['Bereshit'] or ['Achrei Mot', 'Kedoshim']
   * @param {boolean} il
   */
  constructor(date, parsha, il) {
    if (!Array.isArray(parsha) || parsha.length === 0 || parsha.length > 2) {
      throw new TypeError('Bad parsha argument');
    }

    const desc = 'Parashat ' + parsha.join('-');
    super(date, desc, flags.PARSHA_HASHAVUA);
    this.parsha = parsha;
    this.il = Boolean(il);
  }
  /**
   * @param {string} [locale] Optional locale name (i.e: `'he'`, `'fr'`). Defaults to active locale.
   * @return {string}
   */


  render(locale) {
    const locale0 = locale || Locale.getLocaleName();
    const parsha = this.parsha;
    let name = Locale.gettext(parsha[0], locale);

    if (parsha.length == 2) {
      const hyphen = locale0 == 'he' ? '־' : '-';
      name += hyphen + Locale.gettext(parsha[1], locale);
    }

    const str = Locale.gettext('Parashat', locale) + ' ' + name;
    return str.normalize();
  }
  /** @return {string} */


  basename() {
    return this.parsha.join('-');
  }
  /** @return {string} */


  url() {
    const year = this.getDate().greg().getFullYear();

    if (year < 100) {
      return undefined;
    }

    const dt = this.urlDateSuffix();
    const url = 'https://www.hebcal.com/sedrot/' + this.basename().toLowerCase().replace(/'/g, '').replace(/ /g, '-') + '-' + dt;
    return this.il ? url + '?i=on' : url;
  }
  /** @return {string} */


  urlDateSuffix() {
    const isoDateTime = this.getDate().greg().toISOString();
    const isoDate = isoDateTime.substring(0, isoDateTime.indexOf('T'));
    return isoDate.replace(/-/g, '');
  }

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
/** Represents a built-in holiday like Pesach, Purim or Tu BiShvat */

class HolidayEvent extends Event {
  /**
   * Constructs Holiday event
   * @param {HDate} date Hebrew date event occurs
   * @param {string} desc Description (not translated)
   * @param {number} [mask=0] optional holiday flags
   * @param {Object} [attrs={}]
   */
  constructor(date, desc, mask, attrs) {
    super(date, desc, mask, attrs);
  }
  /** @return {string} */


  basename() {
    return this.getDesc().replace(/ \d{4}$/, '').replace(/ \(CH''M\)$/, '').replace(/ \(observed\)$/, '').replace(/ \(Hoshana Raba\)$/, '').replace(/ [IV]+$/, '').replace(/: \d Candles?$/, '').replace(/: 8th Day$/, '').replace(/^Erev /, '');
  }
  /** @return {string} */


  url() {
    const year = this.getDate().greg().getFullYear();

    if (year < 100) {
      return undefined;
    }

    const url = 'https://www.hebcal.com/holidays/' + this.basename().toLowerCase().replace(/'/g, '').replace(/ /g, '-') + '-' + this.urlDateSuffix();
    return this.getFlags() & flags.IL_ONLY ? url + '?i=on' : url;
  }
  /** @return {string} */


  urlDateSuffix() {
    const year = this.getDate().greg().getFullYear();
    return year;
  }
  /** @return {string} */


  getEmoji() {
    if (this.emoji) {
      return this.emoji;
    } else if (this.getFlags() & flags.SPECIAL_SHABBAT) {
      return '🕍';
    } else {
      return '✡️';
    }
  }

}
const roshChodeshStr = 'Rosh Chodesh';
/** Represents Rosh Chodesh, the beginning of a new month */

class RoshChodeshEvent extends HolidayEvent {
  /**
   * Constructs Rosh Chodesh event
   * @param {HDate} date Hebrew date event occurs
   * @param {string} monthName Hebrew month name (not translated)
   */
  constructor(date, monthName) {
    super(date, `${roshChodeshStr} ${monthName}`, flags.ROSH_CHODESH);
  }
  /**
   * Returns (translated) description of this event
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  render(locale) {
    const monthName = this.getDesc().substring(roshChodeshStr.length + 1);
    return Locale.gettext(roshChodeshStr, locale) + ' ' + Locale.gettext(monthName, locale);
  }
  /** @return {string} */


  basename() {
    return this.getDesc();
  }
  /** @return {string} */


  getEmoji() {
    return this.emoji || '🌒';
  }

}
/**
 * Because Asara B'Tevet often occurs twice in the same Gregorian year,
 * we subclass HolidayEvent to override the `url()` method.
 */

class AsaraBTevetEvent extends HolidayEvent {
  /**
   * Constructs AsaraBTevetEvent
   * @param {HDate} date Hebrew date event occurs
   * @param {string} desc Description (not translated)
   * @param {number} [mask=0] optional holiday flags
   * @param {Object} [attrs={}]
   */
  constructor(date, desc, mask, attrs) {
    super(date, desc, mask, attrs);
  }
  /** @return {string} */


  urlDateSuffix() {
    const isoDateTime = this.getDate().greg().toISOString();
    const isoDate = isoDateTime.substring(0, isoDateTime.indexOf('T'));
    return isoDate.replace(/-/g, '');
  }

}
const mevarchimChodeshStr = 'Shabbat Mevarchim Chodesh';
/** Represents Mevarchim haChodesh, the announcement of the new month */

class MevarchimChodeshEvent extends Event {
  /**
   * Constructs Mevarchim haChodesh event
   * @param {HDate} date Hebrew date event occurs
   * @param {string} monthName Hebrew month name (not translated)
   */
  constructor(date, monthName) {
    super(date, `${mevarchimChodeshStr} ${monthName}`, flags.SHABBAT_MEVARCHIM);
    this.monthName = monthName;
    const hyear = date.getFullYear();
    const hmonth = date.getMonth();
    const monNext = hmonth == HDate$1.monthsInYear(hyear) ? months.NISAN : hmonth + 1;
    const molad = new MoladEvent(date, hyear, monNext);
    this.memo = molad.render();
  }
  /**
   * Returns (translated) description of this event
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  render(locale) {
    return Locale.gettext(mevarchimChodeshStr, locale) + ' ' + Locale.gettext(this.monthName, locale);
  }

}
/**
 * @private
 */

class RoshHashanaEvent extends HolidayEvent {
  /**
   * @private
   * @param {HDate} date Hebrew date event occurs
   * @param {number} hyear Hebrew year
   * @param {number} mask optional holiday flags
   */
  constructor(date, hyear, mask) {
    super(date, `Rosh Hashana ${hyear}`, mask, {
      emoji: '🍏🍯'
    });
    this.hyear = hyear;
  }
  /**
   * Returns (translated) description of this event
   * @param {string} [locale] Optional locale name (defaults to active locale).
   * @return {string}
   */


  render(locale) {
    return Locale.gettext('Rosh Hashana', locale) + ' ' + this.hyear;
  }

}
const SUN = 0; // const MON = 1;

const TUE = 2; // const WED = 3;

const THU = 4;
const FRI$1 = 5;
const SAT$1 = 6;
const NISAN$1 = months.NISAN;
const IYYAR = months.IYYAR;
const SIVAN$1 = months.SIVAN;
const TAMUZ = months.TAMUZ;
const AV = months.AV;
const ELUL$1 = months.ELUL;
const TISHREI$1 = months.TISHREI;
const CHESHVAN$1 = months.CHESHVAN;
const KISLEV$1 = months.KISLEV;
const TEVET$1 = months.TEVET;
const SHVAT$1 = months.SHVAT;
const ADAR_I$1 = months.ADAR_I;
const ADAR_II$1 = months.ADAR_II;
const CHAG = flags.CHAG;
const LIGHT_CANDLES$1 = flags.LIGHT_CANDLES;
const YOM_TOV_ENDS$1 = flags.YOM_TOV_ENDS;
const CHUL_ONLY$1 = flags.CHUL_ONLY;
const IL_ONLY$1 = flags.IL_ONLY;
const LIGHT_CANDLES_TZEIS$1 = flags.LIGHT_CANDLES_TZEIS;
const CHANUKAH_CANDLES$1 = flags.CHANUKAH_CANDLES;
const MINOR_FAST$1 = flags.MINOR_FAST;
const SPECIAL_SHABBAT$1 = flags.SPECIAL_SHABBAT;
const MODERN_HOLIDAY$1 = flags.MODERN_HOLIDAY;
const MAJOR_FAST$1 = flags.MAJOR_FAST;
const MINOR_HOLIDAY$1 = flags.MINOR_HOLIDAY;
const EREV$1 = flags.EREV;
const CHOL_HAMOED$1 = flags.CHOL_HAMOED;
/** @private */

class SimpleMap {
  /**
   * @param {string} key
   * @return {boolean}
   */
  has(key) {
    return typeof this[key] !== 'undefined';
  }
  /**
   * @param {string} key
   * @return {any}
   */


  get(key) {
    return this[key];
  }
  /**
   * @param {string} key
   * @param {any} val
   */


  set(key, val) {
    this[key] = val;
  }
  /**
   * @return {string[]}
   */


  keys() {
    return Object.keys(this);
  }

}

const sedraCache = new SimpleMap();
/**
 * @private
 * @param {number} hyear
 * @param {boolean} il
 * @return {Sedra}
 */

function getSedra(hyear, il) {
  const cacheKey = `${hyear}-${il ? 1 : 0}`;
  let sedra = sedraCache.get(cacheKey);

  if (!sedra) {
    sedra = new Sedra(hyear, il);
    sedraCache.set(cacheKey, sedra);
  }

  return sedra;
}
const emojiIsraelFlag = {
  emoji: '🇮🇱'
};
const chanukahEmoji = '🕎';
const yearCache = Object.create(null);
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
    throw new TypeError(`bad Hebrew year: ${year}`);
  } else if (year < 1 || year > 32658) {
    throw new RangeError(`Hebrew year ${year} out of range 1-32658`);
  }

  const cached = yearCache[year];

  if (cached) {
    return cached;
  }

  const RH = new HDate$1(1, TISHREI$1, year);
  const pesach = new HDate$1(15, NISAN$1, year);
  const h = new SimpleMap(); // eslint-disable-next-line require-jsdoc

  function add(...events) {
    // for (const ev of events) {
    events.forEach(ev => {
      const key = ev.date.toString();

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
    arr.forEach(a => {
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

  for (let candles = 2; candles <= 8; candles++) {
    const hd = new HDate$1(23 + candles, KISLEV$1, year);
    add(new HolidayEvent(hd, `Chanukah: ${candles} Candles`, MINOR_HOLIDAY$1 | CHANUKAH_CANDLES$1, {
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
  const pesachAbs = pesach.abs();
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
    let nisan27dt = new HDate$1(27, NISAN$1, year);
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
    let day;

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

  let tamuz17 = new HDate$1(17, TAMUZ, year);
  let tamuz17attrs;

  if (tamuz17.getDay() == SAT$1) {
    tamuz17 = new HDate$1(18, TAMUZ, year);
    tamuz17attrs = {
      observed: true
    };
  }

  add(new HolidayEvent(tamuz17, 'Tzom Tammuz', MINOR_FAST$1, tamuz17attrs));
  let av9dt = new HDate$1(9, AV, year);
  let av9title = 'Tish\'a B\'Av';
  let av9attrs;

  if (av9dt.getDay() == SAT$1) {
    av9dt = av9dt.next();
    av9attrs = {
      observed: true
    };
    av9title += ' (observed)';
  }

  const av9abs = av9dt.abs();
  add(new HolidayEvent(new HDate$1(HDate$1.dayOnOrBefore(SAT$1, av9abs)), 'Shabbat Chazon', SPECIAL_SHABBAT$1), new HolidayEvent(av9dt.prev(), 'Erev Tish\'a B\'Av', EREV$1 | MAJOR_FAST$1, av9attrs), new HolidayEvent(av9dt, av9title, MAJOR_FAST$1, av9attrs), new HolidayEvent(new HDate$1(HDate$1.dayOnOrBefore(SAT$1, av9abs + 7)), 'Shabbat Nachamu', SPECIAL_SHABBAT$1));
  const monthsInYear = HDate$1.monthsInYear(year);

  for (let month = 1; month <= monthsInYear; month++) {
    const monthName = HDate$1.getMonthName(month, year);

    if ((month == NISAN$1 ? HDate$1.daysInMonth(HDate$1.monthsInYear(year - 1), year - 1) : HDate$1.daysInMonth(month - 1, year)) == 30) {
      add(new RoshChodeshEvent(new HDate$1(1, month, year), monthName));
      add(new RoshChodeshEvent(new HDate$1(30, month - 1, year), monthName));
    } else if (month !== TISHREI$1) {
      add(new RoshChodeshEvent(new HDate$1(1, month, year), monthName));
    }

    if (month == ELUL$1) {
      continue;
    } // Don't worry about month overrun; will get "Nisan" for month=14


    const nextMonthName = HDate$1.getMonthName(month + 1, year);
    add(new MevarchimChodeshEvent(new HDate$1(29, month, year).onOrBefore(SAT$1), nextMonthName));
  }

  const sedra = getSedra(year, false);
  const beshalachHd = sedra.find(15);
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
const heStrs = poHe.contexts[''];
const heNoNikud = {};
Object.keys(heStrs).forEach(key => {
  heNoNikud[key] = [Locale.hebrewStripNikkud(heStrs[key][0])];
});
const localeName = 'he-x-NoNikud';
const poHeNoNikud = {
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
const FRI = 5;
const SAT = 6;
const NISAN = months.NISAN; // const IYYAR = months.IYYAR;

const SIVAN = months.SIVAN; // const TAMUZ = months.TAMUZ;
// const AV = months.AV;

const ELUL = months.ELUL;
const TISHREI = months.TISHREI;
const CHESHVAN = months.CHESHVAN;
const KISLEV = months.KISLEV;
const TEVET = months.TEVET;
const SHVAT = months.SHVAT;
const ADAR_I = months.ADAR_I;
const ADAR_II = months.ADAR_II;
const LIGHT_CANDLES = flags.LIGHT_CANDLES;
const YOM_TOV_ENDS = flags.YOM_TOV_ENDS;
const CHUL_ONLY = flags.CHUL_ONLY;
const IL_ONLY = flags.IL_ONLY;
const LIGHT_CANDLES_TZEIS = flags.LIGHT_CANDLES_TZEIS;
const CHANUKAH_CANDLES = flags.CHANUKAH_CANDLES;
const MINOR_FAST = flags.MINOR_FAST;
const SPECIAL_SHABBAT = flags.SPECIAL_SHABBAT;
const MODERN_HOLIDAY = flags.MODERN_HOLIDAY;
const MAJOR_FAST = flags.MAJOR_FAST;
const ROSH_CHODESH = flags.ROSH_CHODESH;
const PARSHA_HASHAVUA = flags.PARSHA_HASHAVUA;
const DAF_YOMI = flags.DAF_YOMI;
const OMER_COUNT = flags.OMER_COUNT;
const SHABBAT_MEVARCHIM = flags.SHABBAT_MEVARCHIM;
const MINOR_HOLIDAY = flags.MINOR_HOLIDAY;
const EREV = flags.EREV;
const CHOL_HAMOED = flags.CHOL_HAMOED;
const unrecognizedAlreadyWarned = Object.create(null);
const RECOGNIZED_OPTIONS = {
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
  Object.keys(options).forEach(k => {
    if (typeof RECOGNIZED_OPTIONS[k] === 'undefined' && !unrecognizedAlreadyWarned[k]) {
      console.warn(`Ignoring unrecognized HebrewCalendar option: ${k}`);
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
  Object.keys(source).forEach(k => target[k] = source[k]);
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

  let min = parseInt(options.candleLightingMins, 10) || 18;

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
  throw new TypeError(`Invalid date type: ${d}`);
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

  const isHebrewYear = Boolean(options.isHebrewYear);
  const theYear = typeof options.year !== 'undefined' ? parseInt(options.year, 10) : isHebrewYear ? new HDate$1().getFullYear() : new Date().getFullYear();

  if (isNaN(theYear)) {
    throw new RangeError(`Invalid year ${options.year}`);
  } else if (isHebrewYear && theYear < 1) {
    throw new RangeError(`Invalid Hebrew year ${theYear}`);
  } else if (theYear == 0) {
    throw new RangeError(`Invalid Gregorian year ${theYear}`);
  }

  let theMonth = NaN;

  if (options.month) {
    if (isHebrewYear) {
      theMonth = HDate$1.monthNum(options.month);
    } else {
      theMonth = options.month;
    }
  }

  const numYears = parseInt(options.numYears, 10) || 1;

  if (isHebrewYear) {
    const startDate = new HDate$1(1, theMonth || TISHREI, theYear);
    let startAbs = startDate.abs();
    const endAbs = options.month ? startAbs + startDate.daysInMonth() : new HDate$1(1, TISHREI, theYear + numYears).abs() - 1; // for full Hebrew year, start on Erev Rosh Hashana which
    // is technically in the previous Hebrew year
    // (but conveniently lets us get candle-lighting time for Erev)

    if (!theMonth) {
      startAbs--;
    }

    return [startAbs, endAbs];
  } else {
    const gregMonth = options.month ? theMonth - 1 : 0;
    const startGreg = new Date(theYear, gregMonth, 1);

    if (theYear < 100) {
      startGreg.setFullYear(theYear);
    }

    const startAbs = greg.greg2abs(startGreg);
    let endAbs;

    if (options.month) {
      endAbs = startAbs + greg.daysInMonth(theMonth, theYear) - 1;
    } else {
      const endYear = theYear + numYears;
      const endGreg = new Date(endYear, 0, 1);

      if (endYear < 100) {
        endGreg.setFullYear(endYear);
      }

      endAbs = greg.greg2abs(endGreg) - 1;
    }

    return [startAbs, endAbs];
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
    const m = options.mask;
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

  const il = options.il || options.location && options.location.il || false;
  let mask = 0; // default options

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

const MASK_LIGHT_CANDLES = LIGHT_CANDLES | LIGHT_CANDLES_TZEIS | CHANUKAH_CANDLES | YOM_TOV_ENDS;
/**
 * HebrewCalendar is the main interface to the `@hebcal/core` library.
 * This namespace is used to calculate holidays, rosh chodesh, candle lighting & havdalah times,
 * Parashat HaShavua, Daf Yomi, days of the omer, and the molad.
 * Event names can be rendered in several languges using the `locale` option.
 */

const HebrewCalendar = {
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
  calendar: function (options = {}) {
    options = shallowCopy({}, options); // so we can modify freely

    checkCandleOptions(options);
    const location = options.location = options.location || this.defaultLocation;
    const il = options.il = options.il || location.il || false;
    options.mask = getMaskFromOptions(options);

    if (options.ashkenazi || options.locale) {
      if (options.locale && typeof options.locale !== 'string') {
        throw new TypeError(`Invalid options.locale: ${options.locale}`);
      }

      const locale = options.ashkenazi ? 'ashkenazi' : options.locale;
      const translationObj = Locale.useLocale(locale);

      if (!translationObj) {
        throw new TypeError(`Locale '${locale}' not found; did you forget to import @hebcal/locales?`);
      }
    } else {
      Locale.useLocale('en');
    }

    const evts = [];
    let sedra;
    let holidaysYear;
    let beginOmer;
    let endOmer;
    let currentYear = -1;
    const startAndEnd = getStartAndEnd(options);
    warnUnrecognizedOptions(options);
    const startAbs = startAndEnd[0];
    const endAbs = startAndEnd[1];
    const startGreg = greg.abs2greg(startAbs);

    if (startGreg.getFullYear() < 100) {
      options.candlelighting = false;
    }

    for (let abs = startAbs; abs <= endAbs; abs++) {
      const hd = new HDate$1(abs);
      const hyear = hd.getFullYear();

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

      const prevEventsLength = evts.length;
      const dow = hd.getDay();
      let candlesEv = undefined;
      const ev = holidaysYear.get(hd.toString()) || [];
      ev.forEach(e => {
        candlesEv = appendHolidayAndRelated(evts, e, options, candlesEv, dow);
      });

      if (options.sedrot && dow == SAT && hyear >= 3762) {
        const parsha0 = sedra.lookup(abs);

        if (!parsha0.chag) {
          evts.push(new ParshaEvent(hd, parsha0.parsha, il));
        }
      }

      if (options.dafyomi && hyear >= 5684) {
        evts.push(new DafYomiEvent(hd));
      }

      if (options.omer && abs >= beginOmer && abs <= endOmer) {
        const omer = abs - beginOmer + 1;
        evts.push(new OmerEvent(hd, omer));
      }

      const hmonth = hd.getMonth();

      if (options.molad && dow == SAT && hmonth != ELUL && hd.getDate() >= 23 && hd.getDate() <= 29) {
        const monNext = hmonth == HDate$1.monthsInYear(hyear) ? NISAN : hmonth + 1;
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
        const e2 = new HebrewDateEvent(hd);

        if (prevEventsLength == evts.length) {
          evts.push(e2);
        } else {
          evts.splice(prevEventsLength, 0, e2);
        }
      }
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
  getBirthdayOrAnniversary: function (hyear, gdate) {
    const orig = HDate$1.isHDate(gdate) ? gdate : new HDate$1(gdate);
    const origYear = orig.getFullYear();

    if (hyear <= origYear) {
      // `Hebrew year ${hyear} occurs on or before original date in ${origYear}`
      return undefined;
    }

    const isOrigLeap = HDate$1.isLeapYear(origYear);
    let month = orig.getMonth();
    let day = orig.getDate();

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
  getYahrzeit: function (hyear, gdate) {
    const orig = HDate$1.isHDate(gdate) ? gdate : new HDate$1(gdate);
    let hDeath = {
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
  getHolidaysForYearArray: function (year, il) {
    const yearMap = HebrewCalendar.getHolidaysForYear(year);
    const startAbs = HDate$1.hebrew2abs(year, TISHREI, 1);
    const endAbs = HDate$1.hebrew2abs(year + 1, TISHREI, 1) - 1;
    const events = [];

    for (let absDt = startAbs; absDt <= endAbs; absDt++) {
      const hd = new HDate$1(absDt);
      const holidays = yearMap.get(hd.toString());

      if (holidays) {
        const filtered = holidays.filter(ev => il && ev.observedInIsrael() || !il && ev.observedInDiaspora());
        filtered.forEach(ev => events.push(ev));
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
  getHolidaysOnDate: function (date, il) {
    const hd = HDate$1.isHDate(date) ? date : new HDate$1(date);
    const yearMap = HebrewCalendar.getHolidaysForYear(hd.getFullYear());
    const events = yearMap.get(hd.toString());

    if (typeof il === 'undefined' || typeof events === 'undefined') {
      return events;
    }

    return events.filter(ev => il && ev.observedInIsrael() || !il && ev.observedInDiaspora());
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
  reformatTimeStr: function (timeStr, suffix, options) {
    if (typeof timeStr !== 'string') throw new TypeError(`Bad timeStr: ${timeStr}`);
    const cc = options.location && options.location.cc || (options.il ? 'IL' : 'US');

    if (typeof this.hour12cc[cc] === 'undefined') {
      return timeStr;
    }

    const hm = timeStr.split(':');
    let hour = parseInt(hm[0], 10);

    if (hour < 12 && suffix) {
      suffix = suffix.replace('p', 'a').replace('P', 'A');
    } else if (hour > 12) {
      hour = hour % 12;
    }

    return `${hour}:${hm[1]}${suffix}`;
  },

  /** @return {string} */
  version: function () {
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
  const eFlags = ev.getFlags();
  const il = options.il;
  const observed = il && ev.observedInIsrael() || !il && ev.observedInDiaspora();
  const mask = options.mask;

  if (observed && (eFlags & mask || !eFlags && !options.userMask)) {
    const location = options.location;

    if (options.candlelighting && eFlags & MASK_LIGHT_CANDLES) {
      const hd = ev.getDate();
      candlesEv = makeCandleEvent(ev, hd, dow, location, options);

      if (eFlags & CHANUKAH_CANDLES && candlesEv && !options.noHolidays) {
        const chanukahEv = dow === FRI || dow === SAT ? candlesEv : makeWeekdayChanukahCandleLighting(ev, hd, location);
        const attrs = {
          eventTime: chanukahEv.eventTime,
          eventTimeStr: chanukahEv.eventTimeStr,
          location
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

export { AsaraBTevetEvent, CandleLightingEvent, DafYomi, DafYomiEvent, Event, HDate$1 as HDate, HavdalahEvent, HebrewCalendar, HebrewDateEvent, HolidayEvent, Locale, Location, MevarchimChodeshEvent, Molad, MoladEvent, OmerEvent, ParshaEvent, RoshChodeshEvent, RoshHashanaEvent, Sedra, TimedEvent, Zmanim, flags, gematriya, greg, months, parshiot, version };
