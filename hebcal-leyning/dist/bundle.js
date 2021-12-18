/*! @hebcal/leyning v4.12.1 */
var hebcal__leyning = (function (exports, core) {
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

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$v =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$e = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$d = fails$e;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$d(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var call$5 = Function.prototype.call;

var functionCall = call$5.bind ? call$5.bind(call$5) : function () {
  return call$5.apply(call$5, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable$1;

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
var call$4 = FunctionPrototype$1.call;
var callBind = bind$2 && bind$2.bind(call$4);

var functionUncurryThis = bind$2 ? function (fn) {
  return fn && callBind(call$4, fn);
} : function (fn) {
  return fn && function () {
    return call$4.apply(fn, arguments);
  };
};

var uncurryThis$e = functionUncurryThis;

var toString$4 = uncurryThis$e({}.toString);
var stringSlice$1 = uncurryThis$e(''.slice);

var classofRaw$1 = function (it) {
  return stringSlice$1(toString$4(it), 8, -1);
};

var global$u = global$v;
var uncurryThis$d = functionUncurryThis;
var fails$c = fails$e;
var classof$6 = classofRaw$1;

var Object$4 = global$u.Object;
var split = uncurryThis$d(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$c(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$4('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$6(it) == 'String' ? split(it, '') : Object$4(it);
} : Object$4;

var global$t = global$v;

var TypeError$9 = global$t.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$2 = function (it) {
  if (it == undefined) throw TypeError$9("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$2 = indexedObject;
var requireObjectCoercible$1 = requireObjectCoercible$2;

var toIndexedObject$5 = function (it) {
  return IndexedObject$2(requireObjectCoercible$1(it));
};

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$b = function (argument) {
  return typeof argument == 'function';
};

var isCallable$a = isCallable$b;

var isObject$7 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$a(it);
};

var global$s = global$v;
var isCallable$9 = isCallable$b;

var aFunction = function (argument) {
  return isCallable$9(argument) ? argument : undefined;
};

var getBuiltIn$5 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$s[namespace]) : global$s[namespace] && global$s[namespace][method];
};

var uncurryThis$c = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$c({}.isPrototypeOf);

var getBuiltIn$4 = getBuiltIn$5;

var engineUserAgent = getBuiltIn$4('navigator', 'userAgent') || '';

var global$r = global$v;
var userAgent = engineUserAgent;

var process = global$r.process;
var Deno = global$r.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION$2 = engineV8Version;
var fails$b = fails$e;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$b(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = nativeSymbol;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var global$q = global$v;
var getBuiltIn$3 = getBuiltIn$5;
var isCallable$8 = isCallable$b;
var isPrototypeOf$1 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var Object$3 = global$q.Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$3('Symbol');
  return isCallable$8($Symbol) && isPrototypeOf$1($Symbol.prototype, Object$3(it));
};

var global$p = global$v;

var String$3 = global$p.String;

var tryToString$1 = function (argument) {
  try {
    return String$3(argument);
  } catch (error) {
    return 'Object';
  }
};

var global$o = global$v;
var isCallable$7 = isCallable$b;
var tryToString = tryToString$1;

var TypeError$8 = global$o.TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$3 = function (argument) {
  if (isCallable$7(argument)) return argument;
  throw TypeError$8(tryToString(argument) + ' is not a function');
};

var aCallable$2 = aCallable$3;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$1 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable$2(func);
};

var global$n = global$v;
var call$3 = functionCall;
var isCallable$6 = isCallable$b;
var isObject$6 = isObject$7;

var TypeError$7 = global$n.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$6(fn = input.toString) && !isObject$6(val = call$3(fn, input))) return val;
  if (isCallable$6(fn = input.valueOf) && !isObject$6(val = call$3(fn, input))) return val;
  if (pref !== 'string' && isCallable$6(fn = input.toString) && !isObject$6(val = call$3(fn, input))) return val;
  throw TypeError$7("Can't convert object to primitive value");
};

var shared$4 = {exports: {}};

var global$m = global$v;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

var setGlobal$3 = function (key, value) {
  try {
    defineProperty(global$m, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$m[key] = value;
  } return value;
};

var global$l = global$v;
var setGlobal$2 = setGlobal$3;

var SHARED = '__core-js_shared__';
var store$3 = global$l[SHARED] || setGlobal$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$4.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.19.3',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

var global$k = global$v;
var requireObjectCoercible = requireObjectCoercible$2;

var Object$2 = global$k.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$5 = function (argument) {
  return Object$2(requireObjectCoercible(argument));
};

var uncurryThis$b = functionUncurryThis;
var toObject$4 = toObject$5;

var hasOwnProperty = uncurryThis$b({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$4(it), key);
};

var uncurryThis$a = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$3 = uncurryThis$a(1.0.toString);

var uid$2 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$3(++id + postfix, 36);
};

var global$j = global$v;
var shared$3 = shared$4.exports;
var hasOwn$6 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared$3('wks');
var Symbol$1 = global$j.Symbol;
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

var global$i = global$v;
var call$2 = functionCall;
var isObject$5 = isObject$7;
var isSymbol$1 = isSymbol$2;
var getMethod = getMethod$1;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$5 = wellKnownSymbol$6;

var TypeError$6 = global$i.TypeError;
var TO_PRIMITIVE = wellKnownSymbol$5('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$5(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$2(exoticToPrim, input, pref);
    if (!isObject$5(result) || isSymbol$1(result)) return result;
    throw TypeError$6("Can't convert object to primitive value");
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

var global$h = global$v;
var isObject$4 = isObject$7;

var document$1 = global$h.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$4(document$1) && isObject$4(document$1.createElement);

var documentCreateElement$2 = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};

var DESCRIPTORS$6 = descriptors;
var fails$a = fails$e;
var createElement = documentCreateElement$2;

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !DESCRIPTORS$6 && !fails$a(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$5 = descriptors;
var call$1 = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$2 = createPropertyDescriptor$3;
var toIndexedObject$4 = toIndexedObject$5;
var toPropertyKey$2 = toPropertyKey$3;
var hasOwn$5 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$5 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$4(O);
  P = toPropertyKey$2(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$5(O, P)) return createPropertyDescriptor$2(!call$1(propertyIsEnumerableModule.f, O, P), O[P]);
};

var objectDefineProperty = {};

var global$g = global$v;
var isObject$3 = isObject$7;

var String$2 = global$g.String;
var TypeError$5 = global$g.TypeError;

// `Assert: Type(argument) is Object`
var anObject$6 = function (argument) {
  if (isObject$3(argument)) return argument;
  throw TypeError$5(String$2(argument) + ' is not an object');
};

var global$f = global$v;
var DESCRIPTORS$4 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var anObject$5 = anObject$6;
var toPropertyKey$1 = toPropertyKey$3;

var TypeError$4 = global$f.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$4 ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$5(O);
  P = toPropertyKey$1(P);
  anObject$5(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError$4('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$3 = descriptors;
var definePropertyModule$3 = objectDefineProperty;
var createPropertyDescriptor$1 = createPropertyDescriptor$3;

var createNonEnumerableProperty$4 = DESCRIPTORS$3 ? function (object, key, value) {
  return definePropertyModule$3.f(object, key, createPropertyDescriptor$1(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var redefine$3 = {exports: {}};

var uncurryThis$9 = functionUncurryThis;
var isCallable$5 = isCallable$b;
var store$1 = sharedStore;

var functionToString = uncurryThis$9(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$5(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$3 = store$1.inspectSource;

var global$e = global$v;
var isCallable$4 = isCallable$b;
var inspectSource$2 = inspectSource$3;

var WeakMap$1 = global$e.WeakMap;

var nativeWeakMap = isCallable$4(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1));

var shared$2 = shared$4.exports;
var uid = uid$2;

var keys = shared$2('keys');

var sharedKey$2 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$4 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$d = global$v;
var uncurryThis$8 = functionUncurryThis;
var isObject$2 = isObject$7;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$4;
var hasOwn$4 = hasOwnProperty_1;
var shared$1 = sharedStore;
var sharedKey$1 = sharedKey$2;
var hiddenKeys$3 = hiddenKeys$4;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$3 = global$d.TypeError;
var WeakMap = global$d.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$2(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$3('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap());
  var wmget = uncurryThis$8(store.get);
  var wmhas = uncurryThis$8(store.has);
  var wmset = uncurryThis$8(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED);
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
  var STATE = sharedKey$1('state');
  hiddenKeys$3[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn$4(it, STATE)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$3(it, STATE, metadata);
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

var DESCRIPTORS$2 = descriptors;
var hasOwn$3 = hasOwnProperty_1;

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$2 && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$3(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$2 || (DESCRIPTORS$2 && getDescriptor(FunctionPrototype, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var global$c = global$v;
var isCallable$3 = isCallable$b;
var hasOwn$2 = hasOwnProperty_1;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$4;
var setGlobal$1 = setGlobal$3;
var inspectSource$1 = inspectSource$3;
var InternalStateModule = internalState;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;

var getInternalState$1 = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(redefine$3.exports = function (O, key, value, options) {
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
      createNonEnumerableProperty$2(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global$c) {
    if (simple) O[key] = value;
    else setGlobal$1(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty$2(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable$3(this) && getInternalState$1(this).source || inspectSource$1(this);
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
var lengthOfArrayLike$4 = function (obj) {
  return toLength(obj.length);
};

var toIndexedObject$3 = toIndexedObject$5;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike$3 = lengthOfArrayLike$4;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$3 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$3($this);
    var length = lengthOfArrayLike$3(O);
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
  includes: createMethod$3(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$3(false)
};

var uncurryThis$7 = functionUncurryThis;
var hasOwn$1 = hasOwnProperty_1;
var toIndexedObject$2 = toIndexedObject$5;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;

var push$2 = uncurryThis$7([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$2(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$1(hiddenKeys$2, key) && hasOwn$1(O, key) && push$2(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
    ~indexOf$1(result, key) || push$2(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$1);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$2 = getBuiltIn$5;
var uncurryThis$6 = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$4 = anObject$6;

var concat = uncurryThis$6([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$4(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$2 = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$2.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var fails$9 = fails$e;
var isCallable$2 = isCallable$b;

var replacement = /#|\.prototype\./;

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable$2(detection) ? fails$9(detection)
    : !!detection;
};

var normalize = isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = 'N';
var POLYFILL = isForced$1.POLYFILL = 'P';

var isForced_1 = isForced$1;

var global$b = global$v;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$4;
var redefine$2 = redefine$3.exports;
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
    target = global$b;
  } else if (STATIC) {
    target = global$b[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global$b[TARGET] || {}).prototype;
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
      createNonEnumerableProperty$1(sourceProperty, 'sham', true);
    }
    // extend global
    redefine$2(target, key, sourceProperty, options);
  }
};

var classof$5 = classofRaw$1;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$2 = Array.isArray || function isArray(argument) {
  return classof$5(argument) == 'Array';
};

var toPropertyKey = toPropertyKey$3;
var definePropertyModule$1 = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$3;

var createProperty$1 = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

var wellKnownSymbol$4 = wellKnownSymbol$6;

var TO_STRING_TAG$1 = wellKnownSymbol$4('toStringTag');
var test = {};

test[TO_STRING_TAG$1] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var global$a = global$v;
var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var isCallable$1 = isCallable$b;
var classofRaw = classofRaw$1;
var wellKnownSymbol$3 = wellKnownSymbol$6;

var TO_STRING_TAG = wellKnownSymbol$3('toStringTag');
var Object$1 = global$a.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$4 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object$1(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$1(O.callee) ? 'Arguments' : result;
};

var uncurryThis$5 = functionUncurryThis;
var fails$8 = fails$e;
var isCallable = isCallable$b;
var classof$3 = classof$4;
var getBuiltIn$1 = getBuiltIn$5;
var inspectSource = inspectSource$3;

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn$1('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$1 = uncurryThis$5(constructorRegExp.exec);
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
  switch (classof$3(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
    // we can't check .prototype since constructors produced by .bind haven't it
  } return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource(argument));
};

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$1 = !construct || fails$8(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

var global$9 = global$v;
var isArray$1 = isArray$2;
var isConstructor = isConstructor$1;
var isObject$1 = isObject$7;
var wellKnownSymbol$2 = wellKnownSymbol$6;

var SPECIES$1 = wellKnownSymbol$2('species');
var Array$1 = global$9.Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesConstructor$1 = function (originalArray) {
  var C;
  if (isArray$1(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === Array$1 || isArray$1(C.prototype))) C = undefined;
    else if (isObject$1(C)) {
      C = C[SPECIES$1];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array$1 : C;
};

var arraySpeciesConstructor = arraySpeciesConstructor$1;

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate$2 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var fails$7 = fails$e;
var wellKnownSymbol$1 = wellKnownSymbol$6;
var V8_VERSION$1 = engineV8Version;

var SPECIES = wellKnownSymbol$1('species');

var arrayMethodHasSpeciesSupport$3 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION$1 >= 51 || !fails$7(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var $$6 = _export;
var global$8 = global$v;
var fails$6 = fails$e;
var isArray = isArray$2;
var isObject = isObject$7;
var toObject$3 = toObject$5;
var lengthOfArrayLike$2 = lengthOfArrayLike$4;
var createProperty = createProperty$1;
var arraySpeciesCreate$1 = arraySpeciesCreate$2;
var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$3;
var wellKnownSymbol = wellKnownSymbol$6;
var V8_VERSION = engineV8Version;

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
var TypeError$2 = global$8.TypeError;

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$6(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$2('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$$6({ target: 'Array', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject$3(this);
    var A = arraySpeciesCreate$1(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike$2(E);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError$2(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError$2(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

var uncurryThis$4 = functionUncurryThis;
var aCallable$1 = aCallable$3;

var bind$1 = uncurryThis$4(uncurryThis$4.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$1(fn);
  return that === undefined ? fn : bind$1 ? bind$1(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var bind = functionBindContext;
var uncurryThis$3 = functionUncurryThis;
var IndexedObject$1 = indexedObject;
var toObject$2 = toObject$5;
var lengthOfArrayLike$1 = lengthOfArrayLike$4;
var arraySpeciesCreate = arraySpeciesCreate$2;

var push$1 = uncurryThis$3([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod$2 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$2($this);
    var self = IndexedObject$1(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike$1(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push$1(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push$1(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$2(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$2(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$2(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$2(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$2(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$2(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$2(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod$2(7)
};

var $$5 = _export;
var $map = arrayIteration.map;
var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$3;

var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$$5({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var global$7 = global$v;
var classof$2 = classof$4;

var String$1 = global$7.String;

var toString$2 = function (argument) {
  if (classof$2(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String$1(argument);
};

var anObject$3 = anObject$6;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$3(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var fails$5 = fails$e;
var global$6 = global$v;

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp$2 = global$6.RegExp;

var UNSUPPORTED_Y$1 = fails$5(function () {
  var re = $RegExp$2('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$5(function () {
  return !$RegExp$2('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$5(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y$1
};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$2 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$1 = descriptors;
var definePropertyModule = objectDefineProperty;
var anObject$2 = anObject$6;
var toIndexedObject$1 = toIndexedObject$5;
var objectKeys$1 = objectKeys$2;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
var objectDefineProperties = DESCRIPTORS$1 ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$2(O);
  var props = toIndexedObject$1(Properties);
  var keys = objectKeys$1(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};

var getBuiltIn = getBuiltIn$5;

var html$1 = getBuiltIn('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */

var anObject$1 = anObject$6;
var defineProperties = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html = html$1;
var documentCreateElement$1 = documentCreateElement$2;
var sharedKey = sharedKey$2;

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement$1('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$1(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

var fails$4 = fails$e;
var global$5 = global$v;

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp$1 = global$5.RegExp;

var regexpUnsupportedDotAll = fails$4(function () {
  var re = $RegExp$1('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var fails$3 = fails$e;
var global$4 = global$v;

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global$4.RegExp;

var regexpUnsupportedNcg = fails$3(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = functionCall;
var uncurryThis$2 = functionUncurryThis;
var toString$1 = toString$2;
var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var shared = shared$4.exports;
var create = objectCreate;
var getInternalState = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis$2(''.charAt);
var indexOf = uncurryThis$2(''.indexOf);
var replace = uncurryThis$2(''.replace);
var stringSlice = uncurryThis$2(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString$1(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec = patchedExec;

var $$4 = _export;
var exec = regexpExec;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$$4({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

var $$3 = _export;
var toObject$1 = toObject$5;
var nativeKeys = objectKeys$2;
var fails$2 = fails$e;

var FAILS_ON_PRIMITIVES = fails$2(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$$3({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject$1(it));
  }
});

var global$3 = global$v;
var aCallable = aCallable$3;
var toObject = toObject$5;
var IndexedObject = indexedObject;
var lengthOfArrayLike = lengthOfArrayLike$4;

var TypeError$1 = global$3.TypeError;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod$1 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aCallable(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(O);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError$1('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod$1(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod$1(true)
};

var fails$1 = fails$e;

var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$1(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var classof$1 = classofRaw$1;
var global$2 = global$v;

var engineIsNode = classof$1(global$2.process) == 'process';

var $$2 = _export;
var $reduce = arrayReduce.left;
var arrayMethodIsStrict$1 = arrayMethodIsStrict$2;
var CHROME_VERSION = engineV8Version;
var IS_NODE = engineIsNode;

var STRICT_METHOD$1 = arrayMethodIsStrict$1('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$$2({ target: 'Array', proto: true, forced: !STRICT_METHOD$1 || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
  }
});

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof = classof$4;

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var redefine$1 = redefine$3.exports;
var toString = objectToString;

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine$1(Object.prototype, 'toString', toString, { unsafe: true });
}

var DESCRIPTORS = descriptors;
var uncurryThis$1 = functionUncurryThis;
var objectKeys = objectKeys$2;
var toIndexedObject = toIndexedObject$5;
var $propertyIsEnumerable = objectPropertyIsEnumerable.f;

var propertyIsEnumerable = uncurryThis$1($propertyIsEnumerable);
var push = uncurryThis$1([].push);

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

var objectToArray = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};

var $$1 = _export;
var $values = objectToArray.values;

// `Object.values` method
// https://tc39.es/ecma262/#sec-object.values
$$1({ target: 'Object', stat: true }, {
  values: function values(O) {
    return $values(O);
  }
});

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = documentCreateElement$2;

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

var $forEach = arrayIteration.forEach;
var arrayMethodIsStrict = arrayMethodIsStrict$2;

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;

var global$1 = global$v;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var forEach = arrayForEach;
var createNonEnumerableProperty = createNonEnumerableProperty$4;

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global$1[COLLECTION_NAME] && global$1[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);

var $ = _export;
var $filter = arrayIteration.filter;
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$3;

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var Genesis=[0,31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,54,33,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26];var Exodus=[0,22,25,22,31,23,30,29,28,35,29,10,51,22,31,27,36,16,27,25,26,37,30,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38];var Leviticus=[0,17,16,17,35,26,23,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34];var Numbers=[0,54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,35,28,32,22,29,35,41,30,25,19,65,23,31,39,17,54,42,56,29,34,13];var Deuteronomy=[0,46,37,29,49,33,25,26,20,29,22,32,31,19,29,23,22,20,22,21,20,23,29,26,22,19,19,26,69,28,20,30,52,29,12];var Joshua=[0,18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33];var Judges=[0,36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25];var Ruth=[0,22,23,18,22];var Isaiah=[0,31,22,26,6,30,13,25,23,20,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,11,25,24];var Jeremiah=[0,19,37,25,31,31,30,34,23,25,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34];var Lamentations=[0,22,22,66,22,22];var Baruch=[0,22,35,38,37,9,72];var Ezekiel=[0,28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,44,37,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35];var Daniel=[0,21,49,100,34,30,29,28,27,27,21,45,13,64,42];var Hosea=[0,9,25,5,19,15,11,16,14,17,15,11,15,15,10];var Joel=[0,20,27,5,21];var Amos=[0,15,16,15,13,27,14,17,14,15];var Obadiah=[0,21];var Jonah=[0,16,11,10,11];var Micah=[0,16,13,12,14,14,16,20];var Nahum=[0,14,14,19];var Habakkuk=[0,17,20,19];var Zephaniah=[0,18,15,20];var Haggai=[0,15,23];var Zechariah=[0,17,17,10,14,11,15,14,23,17,12,17,14,9,21];var Malachi=[0,14,17,24];var numverses = {Genesis:Genesis,Exodus:Exodus,Leviticus:Leviticus,Numbers:Numbers,Deuteronomy:Deuteronomy,Joshua:Joshua,Judges:Judges,Ruth:Ruth,"I Samuel":[0,28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,16,23,28,23,43,25,12,25,11,31,13],"II Samuel":[0,27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,32,44,26,22,51,39,25],"I Kings":[0,53,46,28,20,32,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,54],"II Kings":[0,18,25,27,44,27,33,20,29,37,36,20,22,25,29,38,20,41,37,37,21,26,20,37,20,30],Isaiah:Isaiah,Jeremiah:Jeremiah,Lamentations:Lamentations,Baruch:Baruch,Ezekiel:Ezekiel,Daniel:Daniel,Hosea:Hosea,Joel:Joel,Amos:Amos,Obadiah:Obadiah,Jonah:Jonah,Micah:Micah,Nahum:Nahum,Habakkuk:Habakkuk,Zephaniah:Zephaniah,Haggai:Haggai,Zechariah:Zechariah,Malachi:Malachi};

/**
 * Names of the books of the Torah. BOOK[1] === 'Genesis'
 */

var BOOK = ['', 'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'];
var doubled = [21, // Vayakhel-Pekudei
26, // Tazria-Metzora
28, // Achrei Mot-Kedoshim
31, // Behar-Bechukotai
38, // Chukat-Balak
41, // Matot-Masei
50 // Nitzavim-Vayeilech
];
/**
 * takes a 0-based (Bereshit=0) parsha ID
 * @private
 * @param {number} id
 * @return {string}
 */

function getDoubledName(id) {
  var p1 = core.parshiot[id];
  var p2 = core.parshiot[id + 1];
  var name = p1 + '-' + p2;
  return name;
}
/**
 * Represents an aliyah
 * @typedef {Object} Aliyah
 * @property {string} k - Book (e.g. "Numbers")
 * @property {string} b - beginning verse (e.g. "28:9")
 * @property {string} e - ending verse (e.g. "28:15")
 * @property {number} [v] - number of verses
 * @property {number} [p] - parsha number (1=Bereshit, 54=Vezot HaBracha)
 */

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
 * Makes a deep copy of the src object using JSON stringify and parse
 * @private
 * @param {any} src
 * @return {any}
 */

function clone(src) {
  return JSON.parse(JSON.stringify(src));
}
/**
 * Makes Sefaria links by adding `href`, `verses` and `num` attributes to each aliyah.
 * CAUTION: Modifies the `aliyot` parameter instead of making a copy.
 * @deprecated
 * @param {Object<string,Aliyah>} aliyot aliyah map to decorate
 * @param {boolean} showBook display the book name in the `verses` field (e.g. for special Maftir)
 */

function addSefariaLinksToLeyning(aliyot, showBook) {
  var book1 = aliyot['1'] && aliyot['1'].k;
  Object.keys(aliyot).forEach(function (num) {
    var aliyah = aliyot[num];
    aliyah.num = num == 'M' ? 'maf' : num;
    var begin = aliyah.b.split(':');
    var end = aliyah.e.split(':');
    var endChapVerse = begin[0] === end[0] ? end[1] : aliyah.e;
    var verses = "".concat(aliyah.b, "-").concat(endChapVerse);
    aliyah.verses = showBook || book1 != aliyah.k ? "".concat(aliyah.k, " ").concat(verses) : verses;
    var sefariaVerses = verses.replace(/:/g, '.');
    var sefAliyot = showBook ? '0' : '1';
    var url = "https://www.sefaria.org/".concat(aliyah.k, ".").concat(sefariaVerses, "?lang=bi&aliyot=").concat(sefAliyot);
    aliyah.href = url;
  });
}
/**
 * @private
 * @param {any} aliyah
 * @return {number}
 */

function calculateNumVerses(aliyah) {
  if (aliyah.v) {
    return aliyah.v;
  }

  var chapVerseBegin = aliyah.b.split(':');
  var chapVerseEnd = aliyah.e.split(':');
  var c1 = +chapVerseBegin[0];
  var c2 = +chapVerseEnd[0];
  var v1 = +chapVerseBegin[1];
  var v2 = +chapVerseEnd[1];

  if (c1 === c2) {
    aliyah.v = v2 - v1 + 1;
  } else if (typeof aliyah.k === 'string') {
    var numv = numverses[aliyah.k];

    if (_typeof(numv) !== 'object' || !numv.length) {
      throw new ReferenceError("Can't find numverses for ".concat(aliyah.k));
    }

    var total = numv[c1] - v1 + 1;

    for (var chap = c1 + 1; chap < c2; chap++) {
      total += numv[chap];
    }

    total += v2;
    aliyah.v = total;
  }

  return aliyah.v;
}
/**
 * @private
 * @param {string} haftara
 * @return {number}
 */

function calculateHaftarahNumVerses(haftara) {
  var sections = haftara.split(/[;,]/);
  var total = 0;
  var prevBook;
  sections.forEach(function (haft) {
    var matches = haft.trim().match(/^(([^\d]+)\s+)?(\d.+)$/);

    if (matches !== null) {
      var hbook = matches[2] ? matches[2].trim() : prevBook;
      var hverses = matches[3].trim();
      var cv = hverses.match(/^(\d+:\d+)\s*-\s*(\d+(:\d+)?)$/);

      if (cv) {
        if (cv[2].indexOf(':') === -1) {
          var chap = cv[1].substring(0, cv[1].indexOf(':'));
          cv[2] = "".concat(chap, ":").concat(cv[2]);
        }

        var _haft = {
          k: hbook,
          b: cv[1],
          e: cv[2]
        };
        total += calculateNumVerses(_haft);
      } else {
        total++; // Something like "Jeremiah 3:4" is 1 verse
      }

      prevBook = hbook;
    }
  });
  return total || undefined;
}

var Purim={fullkriyah:{"1":{p:16,k:"Exodus",b:"17:8",e:"17:10"},"2":{p:16,k:"Exodus",b:"17:11",e:"17:13"},"3":{p:16,k:"Exodus",b:"17:14",e:"17:16"}}};var festivals = {"Pesach I":{haft:{k:"Joshua",b:"5:2",e:"6:1"},fullkriyah:{"1":{p:15,k:"Exodus",b:"12:21",e:"12:24"},"2":{p:15,k:"Exodus",b:"12:25",e:"12:28"},"3":{p:15,k:"Exodus",b:"12:29",e:"12:36"},"4":{p:15,k:"Exodus",b:"12:37",e:"12:42"},"5":{p:15,k:"Exodus",b:"12:43",e:"12:51"},M:{p:41,k:"Numbers",b:"28:16",e:"28:25"}}},"Pesach I (on Shabbat)":{haft:{k:"Joshua",b:"5:2",e:"6:1"},fullkriyah:{"1":{p:15,k:"Exodus",b:"12:21",e:"12:24"},"2":{p:15,k:"Exodus",b:"12:25",e:"12:28"},"3":{p:15,k:"Exodus",b:"12:29",e:"12:32"},"4":{p:15,k:"Exodus",b:"12:33",e:"12:36"},"5":{p:15,k:"Exodus",b:"12:37",e:"12:42"},"6":{p:15,k:"Exodus",b:"12:43",e:"12:47"},"7":{p:15,k:"Exodus",b:"12:48",e:"12:51"},M:{p:41,k:"Numbers",b:"28:16",e:"28:25"}}},"Pesach II":{haft:[{k:"II Kings",b:"23:1",e:"23:9"},{k:"II Kings",b:"23:21",e:"23:25"}],fullkriyah:{"1":{p:31,k:"Leviticus",b:"22:26",e:"23:3"},"2":{p:31,k:"Leviticus",b:"23:4",e:"23:14"},"3":{p:31,k:"Leviticus",b:"23:15",e:"23:22"},"4":{p:31,k:"Leviticus",b:"23:23",e:"23:32"},"5":{p:31,k:"Leviticus",b:"23:33",e:"23:44"},M:{p:41,k:"Numbers",b:"28:16",e:"28:25"}}},"Pesach Chol ha-Moed Day 1":{fullkriyah:{"1":{p:15,k:"Exodus",b:"13:1",e:"13:4"},"2":{p:15,k:"Exodus",b:"13:5",e:"13:10"},"3":{p:15,k:"Exodus",b:"13:11",e:"13:16"},"4":{p:41,k:"Numbers",b:"28:19",e:"28:25"}}},"Pesach Chol ha-Moed Day 2":{fullkriyah:{"1":{p:18,k:"Exodus",b:"22:24",e:"22:26"},"2":{p:18,k:"Exodus",b:"22:27",e:"23:5"},"3":{p:18,k:"Exodus",b:"23:6",e:"23:19"},"4":{p:41,k:"Numbers",b:"28:19",e:"28:25"}}},"Pesach Chol ha-Moed Day 3":{fullkriyah:{"1":{p:21,k:"Exodus",b:"34:1",e:"34:10"},"2":{p:21,k:"Exodus",b:"34:11",e:"34:17"},"3":{p:21,k:"Exodus",b:"34:18",e:"34:26"},"4":{p:41,k:"Numbers",b:"28:19",e:"28:25"}}},"Pesach Chol ha-Moed Day 4":{fullkriyah:{"1":{p:36,k:"Numbers",b:"9:1",e:"9:5"},"2":{p:36,k:"Numbers",b:"9:6",e:"9:8"},"3":{p:36,k:"Numbers",b:"9:9",e:"9:14"},"4":{p:41,k:"Numbers",b:"28:19",e:"28:25"}}},"Pesach Shabbat Chol ha-Moed":{haft:{k:"Ezekiel",b:"37:1",e:"37:14"},fullkriyah:{"1":{p:21,k:"Exodus",b:"33:12",e:"33:16"},"2":{p:21,k:"Exodus",b:"33:17",e:"33:19"},"3":{p:21,k:"Exodus",b:"33:20",e:"33:23"},"4":{p:21,k:"Exodus",b:"34:1",e:"34:3"},"5":{p:21,k:"Exodus",b:"34:4",e:"34:10"},"6":{p:21,k:"Exodus",b:"34:11",e:"34:17"},"7":{p:21,k:"Exodus",b:"34:18",e:"34:26"},M:{p:41,k:"Numbers",b:"28:19",e:"28:25"}}},"Pesach VII":{haft:{k:"II Samuel",b:"22:1",e:"22:51"},fullkriyah:{"1":{p:16,k:"Exodus",b:"13:17",e:"13:22"},"2":{p:16,k:"Exodus",b:"14:1",e:"14:8"},"3":{p:16,k:"Exodus",b:"14:9",e:"14:14"},"4":{p:16,k:"Exodus",b:"14:15",e:"14:25"},"5":{p:16,k:"Exodus",b:"14:26",e:"15:26"},M:{p:41,k:"Numbers",b:"28:19",e:"28:25"}}},"Pesach VII (on Shabbat)":{haft:{k:"II Samuel",b:"22:1",e:"22:51"},fullkriyah:{"1":{p:16,k:"Exodus",b:"13:17",e:"13:19"},"2":{p:16,k:"Exodus",b:"13:20",e:"13:22"},"3":{p:16,k:"Exodus",b:"14:1",e:"14:4"},"4":{p:16,k:"Exodus",b:"14:5",e:"14:8"},"5":{p:16,k:"Exodus",b:"14:9",e:"14:14"},"6":{p:16,k:"Exodus",b:"14:15",e:"14:25"},"7":{p:16,k:"Exodus",b:"14:26",e:"15:26"},M:{p:41,k:"Numbers",b:"28:19",e:"28:25"}}},"Pesach VIII":{haft:{k:"Isaiah",b:"10:32",e:"12:6"},fullkriyah:{"1":{p:47,k:"Deuteronomy",b:"15:19",e:"15:23"},"2":{p:47,k:"Deuteronomy",b:"16:1",e:"16:3"},"3":{p:47,k:"Deuteronomy",b:"16:4",e:"16:8"},"4":{p:47,k:"Deuteronomy",b:"16:9",e:"16:12"},"5":{p:47,k:"Deuteronomy",b:"16:13",e:"16:17"},M:{p:41,k:"Numbers",b:"28:19",e:"28:25"}}},"Pesach VIII (on Shabbat)":{haft:{k:"Isaiah",b:"10:32",e:"12:6"},fullkriyah:{"1":{p:47,k:"Deuteronomy",b:"14:22",e:"14:29"},"2":{p:47,k:"Deuteronomy",b:"15:1",e:"15:18"},"3":{p:47,k:"Deuteronomy",b:"15:19",e:"15:23"},"4":{p:47,k:"Deuteronomy",b:"16:1",e:"16:3"},"5":{p:47,k:"Deuteronomy",b:"16:4",e:"16:8"},"6":{p:47,k:"Deuteronomy",b:"16:9",e:"16:12"},"7":{p:47,k:"Deuteronomy",b:"16:13",e:"16:17"},M:{p:41,k:"Numbers",b:"28:19",e:"28:25"}}},"Shavuot I":{haft:[{k:"Ezekiel",b:"1:1",e:"1:28"},{k:"Ezekiel",b:"3:12",e:"3:12"}],fullkriyah:{"1":{p:17,k:"Exodus",b:"19:1",e:"19:6"},"2":{p:17,k:"Exodus",b:"19:7",e:"19:13"},"3":{p:17,k:"Exodus",b:"19:14",e:"19:19"},"4":{p:17,k:"Exodus",b:"19:20",e:"20:14"},"5":{p:17,k:"Exodus",b:"20:15",e:"20:23"},M:{p:41,k:"Numbers",b:"28:26",e:"28:31"}}},"Shavuot II":{haft:{k:"Habakkuk",b:"3:1",e:"3:19"},fullkriyah:{"1":{p:47,k:"Deuteronomy",b:"15:19",e:"15:23"},"2":{p:47,k:"Deuteronomy",b:"16:1",e:"16:3"},"3":{p:47,k:"Deuteronomy",b:"16:4",e:"16:8"},"4":{p:47,k:"Deuteronomy",b:"16:9",e:"16:12"},"5":{p:47,k:"Deuteronomy",b:"16:13",e:"16:17"},M:{p:41,k:"Numbers",b:"28:26",e:"28:31"}}},"Shavuot II (on Shabbat)":{haft:{k:"Habakkuk",b:"3:1",e:"3:19"},fullkriyah:{"1":{p:47,k:"Deuteronomy",b:"14:22",e:"14:29"},"2":{p:47,k:"Deuteronomy",b:"15:1",e:"15:18"},"3":{p:47,k:"Deuteronomy",b:"15:19",e:"15:23"},"4":{p:47,k:"Deuteronomy",b:"16:1",e:"16:3"},"5":{p:47,k:"Deuteronomy",b:"16:4",e:"16:8"},"6":{p:47,k:"Deuteronomy",b:"16:9",e:"16:12"},"7":{p:47,k:"Deuteronomy",b:"16:13",e:"16:17"},M:{p:41,k:"Numbers",b:"28:26",e:"28:31"}}},"Asara B'Tevet":{fullkriyah:{"1":{p:21,k:"Exodus",b:"32:11",e:"32:14"},"2":{p:21,k:"Exodus",b:"34:1",e:"34:3"},"3":{p:21,k:"Exodus",b:"34:4",e:"34:10"}}},"Ta'anit Bechorot":{fullkriyah:{"1":{p:21,k:"Exodus",b:"32:11",e:"32:14"},"2":{p:21,k:"Exodus",b:"34:1",e:"34:3"},"3":{p:21,k:"Exodus",b:"34:4",e:"34:10"}}},"Ta'anit Esther":{fullkriyah:{"1":{p:21,k:"Exodus",b:"32:11",e:"32:14"},"2":{p:21,k:"Exodus",b:"34:1",e:"34:3"},"3":{p:21,k:"Exodus",b:"34:4",e:"34:10"}}},"Tzom Gedaliah":{fullkriyah:{"1":{p:21,k:"Exodus",b:"32:11",e:"32:14"},"2":{p:21,k:"Exodus",b:"34:1",e:"34:3"},"3":{p:21,k:"Exodus",b:"34:4",e:"34:10"}}},"Tzom Tammuz":{fullkriyah:{"1":{p:21,k:"Exodus",b:"32:11",e:"32:14"},"2":{p:21,k:"Exodus",b:"34:1",e:"34:3"},"3":{p:21,k:"Exodus",b:"34:4",e:"34:10"}}},"Tish'a B'Av":{haft:{k:"Jeremiah",b:"8:13",e:"9:23"},fullkriyah:{"1":{p:45,k:"Deuteronomy",b:"4:25",e:"4:29"},"2":{p:45,k:"Deuteronomy",b:"4:30",e:"4:35"},"3":{p:45,k:"Deuteronomy",b:"4:36",e:"4:40"}}},"Rosh Hashana I":{haft:{k:"I Samuel",b:"1:1",e:"2:10"},fullkriyah:{"1":{p:4,k:"Genesis",b:"21:1",e:"21:4"},"2":{p:4,k:"Genesis",b:"21:5",e:"21:12"},"3":{p:4,k:"Genesis",b:"21:13",e:"21:21"},"4":{p:4,k:"Genesis",b:"21:22",e:"21:27"},"5":{p:4,k:"Genesis",b:"21:28",e:"21:34"},M:{p:41,k:"Numbers",b:"29:1",e:"29:6"}}},"Rosh Hashana I (on Shabbat)":{haft:{k:"I Samuel",b:"1:1",e:"2:10"},fullkriyah:{"1":{p:4,k:"Genesis",b:"21:1",e:"21:4"},"2":{p:4,k:"Genesis",b:"21:5",e:"21:8"},"3":{p:4,k:"Genesis",b:"21:9",e:"21:12"},"4":{p:4,k:"Genesis",b:"21:13",e:"21:17"},"5":{p:4,k:"Genesis",b:"21:18",e:"21:21"},"6":{p:4,k:"Genesis",b:"21:22",e:"21:27"},"7":{p:4,k:"Genesis",b:"21:28",e:"21:34"},M:{p:41,k:"Numbers",b:"29:1",e:"29:6"}}},"Rosh Hashana II":{haft:{k:"Jeremiah",b:"31:1",e:"31:19"},fullkriyah:{"1":{p:4,k:"Genesis",b:"22:1",e:"22:3"},"2":{p:4,k:"Genesis",b:"22:4",e:"22:8"},"3":{p:4,k:"Genesis",b:"22:9",e:"22:14"},"4":{p:4,k:"Genesis",b:"22:15",e:"22:19"},"5":{p:4,k:"Genesis",b:"22:20",e:"22:24"},M:{p:41,k:"Numbers",b:"29:1",e:"29:6"}}},"Yom Kippur":{haft:{k:"Isaiah",b:"57:14",e:"58:14"},fullkriyah:{"1":{p:29,k:"Leviticus",b:"16:1",e:"16:6"},"2":{p:29,k:"Leviticus",b:"16:7",e:"16:11"},"3":{p:29,k:"Leviticus",b:"16:12",e:"16:17"},"4":{p:29,k:"Leviticus",b:"16:18",e:"16:24"},"5":{p:29,k:"Leviticus",b:"16:25",e:"16:30"},"6":{p:29,k:"Leviticus",b:"16:31",e:"16:34"},M:{p:41,k:"Numbers",b:"29:7",e:"29:11"}}},"Yom Kippur (on Shabbat)":{haft:{k:"Isaiah",b:"57:14",e:"58:14"},fullkriyah:{"1":{p:29,k:"Leviticus",b:"16:1",e:"16:3"},"2":{p:29,k:"Leviticus",b:"16:4",e:"16:6"},"3":{p:29,k:"Leviticus",b:"16:7",e:"16:11"},"4":{p:29,k:"Leviticus",b:"16:12",e:"16:17"},"5":{p:29,k:"Leviticus",b:"16:18",e:"16:24"},"6":{p:29,k:"Leviticus",b:"16:25",e:"16:30"},"7":{p:29,k:"Leviticus",b:"16:31",e:"16:34"},M:{p:41,k:"Numbers",b:"29:7",e:"29:11"}}},"Yom Kippur (Mincha, Traditional)":{haft:[{k:"Jonah",b:"1:1",e:"4:11"},{k:"Micah",b:"7:18",e:"7:20"}],fullkriyah:{"1":{p:29,k:"Leviticus",b:"18:1",e:"18:5"},"2":{p:29,k:"Leviticus",b:"18:6",e:"18:21"},"3":{p:29,k:"Leviticus",b:"18:22",e:"18:30"}}},"Yom Kippur (Mincha, Alternate)":{haft:[{k:"Jonah",b:"1:1",e:"4:11"},{k:"Micah",b:"7:18",e:"7:20"}],fullkriyah:{"1":{p:30,k:"Leviticus",b:"19:1",e:"19:4"},"2":{p:30,k:"Leviticus",b:"19:5",e:"19:10"},"3":{p:30,k:"Leviticus",b:"19:11",e:"19:18"}}},"Sukkot I":{haft:{k:"Zechariah",b:"14:1",e:"14:21"},fullkriyah:{"1":{p:31,k:"Leviticus",b:"22:26",e:"23:3"},"2":{p:31,k:"Leviticus",b:"23:4",e:"23:14"},"3":{p:31,k:"Leviticus",b:"23:15",e:"23:22"},"4":{p:31,k:"Leviticus",b:"23:23",e:"23:32"},"5":{p:31,k:"Leviticus",b:"23:33",e:"23:44"},M:{p:41,k:"Numbers",b:"29:12",e:"29:16"}}},"Sukkot I (on Shabbat)":{haft:{k:"Zechariah",b:"14:1",e:"14:21"},fullkriyah:{"1":{p:31,k:"Leviticus",b:"22:26",e:"22:33"},"2":{p:31,k:"Leviticus",b:"23:1",e:"23:3"},"3":{p:31,k:"Leviticus",b:"23:4",e:"23:8"},"4":{p:31,k:"Leviticus",b:"23:9",e:"23:14"},"5":{p:31,k:"Leviticus",b:"23:15",e:"23:22"},"6":{p:31,k:"Leviticus",b:"23:23",e:"23:32"},"7":{p:31,k:"Leviticus",b:"23:33",e:"23:44"},M:{p:41,k:"Numbers",b:"29:12",e:"29:16"}}},"Sukkot II":{haft:{k:"I Kings",b:"8:2",e:"8:21"},fullkriyah:{"1":{p:31,k:"Leviticus",b:"22:26",e:"23:3"},"2":{p:31,k:"Leviticus",b:"23:4",e:"23:14"},"3":{p:31,k:"Leviticus",b:"23:15",e:"23:22"},"4":{p:31,k:"Leviticus",b:"23:23",e:"23:32"},"5":{p:31,k:"Leviticus",b:"23:33",e:"23:44"},M:{p:41,k:"Numbers",b:"29:12",e:"29:16"}}},"Sukkot Chol ha-Moed Day 1":{fullkriyah:{"1":{p:41,k:"Numbers",b:"29:17",e:"29:19"},"2":{p:41,k:"Numbers",b:"29:20",e:"29:22"},"3":{p:41,k:"Numbers",b:"29:23",e:"29:25"},"4":{p:41,k:"Numbers",b:"29:17",e:"29:22"}}},"Sukkot Chol ha-Moed Day 2":{fullkriyah:{"1":{p:41,k:"Numbers",b:"29:20",e:"29:22"},"2":{p:41,k:"Numbers",b:"29:23",e:"29:25"},"3":{p:41,k:"Numbers",b:"29:26",e:"29:28"},"4":{p:41,k:"Numbers",b:"29:20",e:"29:25"}}},"Sukkot Chol ha-Moed Day 3":{fullkriyah:{"1":{p:41,k:"Numbers",b:"29:23",e:"29:25"},"2":{p:41,k:"Numbers",b:"29:26",e:"29:28"},"3":{p:41,k:"Numbers",b:"29:29",e:"29:31"},"4":{p:41,k:"Numbers",b:"29:23",e:"29:28"}}},"Sukkot Chol ha-Moed Day 4":{fullkriyah:{"1":{p:41,k:"Numbers",b:"29:26",e:"29:28"},"2":{p:41,k:"Numbers",b:"29:29",e:"29:31"},"3":{p:41,k:"Numbers",b:"29:32",e:"29:34"},"4":{p:41,k:"Numbers",b:"29:26",e:"29:31"}}},"Sukkot Chol ha-Moed Day 5":{fullkriyah:{"1":{p:41,k:"Numbers",b:"29:29",e:"29:31"},"2":{p:41,k:"Numbers",b:"29:32",e:"29:34"},"3":{p:41,k:"Numbers",b:"29:35",e:"29:37"},"4":{p:41,k:"Numbers",b:"29:29",e:"29:34"}}},"Sukkot Shabbat Chol ha-Moed":{haft:{k:"Ezekiel",b:"38:18",e:"39:16"},fullkriyah:{"1":{p:21,k:"Exodus",b:"33:12",e:"33:16"},"2":{p:21,k:"Exodus",b:"33:17",e:"33:19"},"3":{p:21,k:"Exodus",b:"33:20",e:"33:23"},"4":{p:21,k:"Exodus",b:"34:1",e:"34:3"},"5":{p:21,k:"Exodus",b:"34:4",e:"34:10"},"6":{p:21,k:"Exodus",b:"34:11",e:"34:17"},"7":{p:21,k:"Exodus",b:"34:18",e:"34:26"},"M-day1":{p:41,k:"Numbers",b:"29:17",e:"29:22"},"M-day2":{p:41,k:"Numbers",b:"29:20",e:"29:25"},"M-day3":{p:41,k:"Numbers",b:"29:23",e:"29:28"},"M-day4":{p:41,k:"Numbers",b:"29:26",e:"29:31"},"M-day5":{p:41,k:"Numbers",b:"29:29",e:"29:34"}}},"Sukkot Final Day (Hoshana Raba)":{fullkriyah:{"1":{p:41,k:"Numbers",b:"29:26",e:"29:28"},"2":{p:41,k:"Numbers",b:"29:29",e:"29:31"},"3":{p:41,k:"Numbers",b:"29:32",e:"29:34"},"4":{p:41,k:"Numbers",b:"29:29",e:"29:34"}}},"Shmini Atzeret":{haft:{k:"I Kings",b:"8:54",e:"8:66"},fullkriyah:{"1":{p:47,k:"Deuteronomy",b:"14:22",e:"14:29"},"2":{p:47,k:"Deuteronomy",b:"15:1",e:"15:18"},"3":{p:47,k:"Deuteronomy",b:"15:19",e:"16:3"},"4":{p:47,k:"Deuteronomy",b:"16:4",e:"16:8"},"5":{p:47,k:"Deuteronomy",b:"16:9",e:"16:17"},M:{p:41,k:"Numbers",b:"29:35",e:"30:1"}}},"Shmini Atzeret (on Shabbat)":{haft:{k:"I Kings",b:"8:54",e:"8:66"},fullkriyah:{"1":{p:47,k:"Deuteronomy",b:"14:22",e:"14:29"},"2":{p:47,k:"Deuteronomy",b:"15:1",e:"15:18"},"3":{p:47,k:"Deuteronomy",b:"15:19",e:"15:23"},"4":{p:47,k:"Deuteronomy",b:"16:1",e:"16:3"},"5":{p:47,k:"Deuteronomy",b:"16:4",e:"16:8"},"6":{p:47,k:"Deuteronomy",b:"16:9",e:"16:12"},"7":{p:47,k:"Deuteronomy",b:"16:13",e:"16:17"},M:{p:41,k:"Numbers",b:"29:35",e:"30:1"}}},"Erev Simchat Torah":{fullkriyah:{"1":{p:54,k:"Deuteronomy",b:"33:1",e:"33:7"},"2":{p:54,k:"Deuteronomy",b:"33:8",e:"33:12"},"3":{p:54,k:"Deuteronomy",b:"33:13",e:"33:17"},"4":{p:54,k:"Deuteronomy",b:"33:18",e:"33:21"},"5":{p:54,k:"Deuteronomy",b:"33:22",e:"33:26"}}},"Simchat Torah":{haft:{k:"Joshua",b:"1:1",e:"1:18"},fullkriyah:{"1":{p:54,k:"Deuteronomy",b:"33:1",e:"33:7"},"2":{p:54,k:"Deuteronomy",b:"33:8",e:"33:12"},"3":{p:54,k:"Deuteronomy",b:"33:13",e:"33:17"},"4":{p:54,k:"Deuteronomy",b:"33:18",e:"33:21"},"5":{p:54,k:"Deuteronomy",b:"33:22",e:"33:26"},"6":{p:54,k:"Deuteronomy",b:"33:27",e:"34:12"},"7":{p:1,k:"Genesis",b:"1:1",e:"2:3"},M:{p:41,k:"Numbers",b:"29:35",e:"30:1"}}},"Shabbat Chanukah":{haft:{k:"Zechariah",b:"2:14",e:"4:7"}},"Shabbat Chanukah II":{haft:{k:"I Kings",b:"7:40",e:"7:50"}},"Shabbat Rosh Chodesh Chanukah":{haft:{k:"Zechariah",b:"2:14",e:"4:7"},fullkriyah:{"7":{p:41,k:"Numbers",b:"28:9",e:"28:15"},M:{p:35,k:"Numbers",b:"7:42",e:"7:47"}}},"Chanukah Day 1":{fullkriyah:{"1":{p:35,k:"Numbers",b:"7:1",e:"7:11"},"2":{p:35,k:"Numbers",b:"7:12",e:"7:14"},"3":{p:35,k:"Numbers",b:"7:15",e:"7:17"}},alt:{"1":{p:35,k:"Numbers",b:"7:1",e:"7:3"},"2":{p:35,k:"Numbers",b:"7:4",e:"7:11"},"3":{p:35,k:"Numbers",b:"7:12",e:"7:17"}}},"Chanukah Day 2":{fullkriyah:{"1":{p:35,k:"Numbers",b:"7:18",e:"7:20"},"2":{p:35,k:"Numbers",b:"7:21",e:"7:23"},"3":{p:35,k:"Numbers",b:"7:24",e:"7:29"}},alt:{"1":{p:35,k:"Numbers",b:"7:18",e:"7:20"},"2":{p:35,k:"Numbers",b:"7:21",e:"7:23"},"3":{p:35,k:"Numbers",b:"7:18",e:"7:23"}}},"Chanukah Day 3":{fullkriyah:{"1":{p:35,k:"Numbers",b:"7:24",e:"7:26"},"2":{p:35,k:"Numbers",b:"7:27",e:"7:29"},"3":{p:35,k:"Numbers",b:"7:30",e:"7:35"}},alt:{"1":{p:35,k:"Numbers",b:"7:24",e:"7:26"},"2":{p:35,k:"Numbers",b:"7:27",e:"7:29"},"3":{p:35,k:"Numbers",b:"7:24",e:"7:29"}}},"Chanukah Day 4":{fullkriyah:{"1":{p:35,k:"Numbers",b:"7:30",e:"7:32"},"2":{p:35,k:"Numbers",b:"7:33",e:"7:35"},"3":{p:35,k:"Numbers",b:"7:36",e:"7:41"}},alt:{"1":{p:35,k:"Numbers",b:"7:30",e:"7:32"},"2":{p:35,k:"Numbers",b:"7:33",e:"7:35"},"3":{p:35,k:"Numbers",b:"7:30",e:"7:35"}}},"Chanukah Day 5":{fullkriyah:{"1":{p:35,k:"Numbers",b:"7:36",e:"7:38"},"2":{p:35,k:"Numbers",b:"7:39",e:"7:41"},"3":{p:35,k:"Numbers",b:"7:42",e:"7:47"}},alt:{"1":{p:35,k:"Numbers",b:"7:36",e:"7:38"},"2":{p:35,k:"Numbers",b:"7:39",e:"7:41"},"3":{p:35,k:"Numbers",b:"7:36",e:"7:41"}}},"Chanukah Day 6":{fullkriyah:{"1":{p:41,k:"Numbers",b:"28:1",e:"28:5"},"2":{p:41,k:"Numbers",b:"28:6",e:"28:10"},"3":{p:41,k:"Numbers",b:"28:11",e:"28:15"},"4":{p:35,k:"Numbers",b:"7:42",e:"7:47"}}},"Chanukah Day 7":{fullkriyah:{"1":{p:35,k:"Numbers",b:"7:48",e:"7:50"},"2":{p:35,k:"Numbers",b:"7:51",e:"7:53"},"3":{p:35,k:"Numbers",b:"7:54",e:"7:59"}},alt:{"1":{p:35,k:"Numbers",b:"7:48",e:"7:50"},"2":{p:35,k:"Numbers",b:"7:51",e:"7:53"},"3":{p:35,k:"Numbers",b:"7:48",e:"7:53"}}},"Chanukah Day 7 (on Rosh Chodesh)":{fullkriyah:{"1":{p:41,k:"Numbers",b:"28:1",e:"28:5"},"2":{p:41,k:"Numbers",b:"28:6",e:"28:10"},"3":{p:41,k:"Numbers",b:"28:11",e:"28:15"},"4":{p:35,k:"Numbers",b:"7:48",e:"7:53"}}},"Chanukah Day 8":{fullkriyah:{"1":{p:35,k:"Numbers",b:"7:54",e:"7:56"},"2":{p:35,k:"Numbers",b:"7:57",e:"7:59"},"3":{p:35,k:"Numbers",b:"7:60",e:"8:4"}}},Purim:Purim,"Shushan Purim":{fullkriyah:{"1":{p:16,k:"Exodus",b:"17:8",e:"17:10"},"2":{p:16,k:"Exodus",b:"17:11",e:"17:13"},"3":{p:16,k:"Exodus",b:"17:14",e:"17:16"}}},"Shabbat HaChodesh":{haft:{k:"Ezekiel",b:"45:16",e:"46:18"},fullkriyah:{M:{p:15,k:"Exodus",b:"12:1",e:"12:20"}}},"Shabbat HaChodesh (on Rosh Chodesh)":{haft:{k:"Ezekiel",b:"45:16",e:"46:18"},fullkriyah:{"7":{p:41,k:"Numbers",b:"28:9",e:"28:15"},M:{p:15,k:"Exodus",b:"12:1",e:"12:20"}}},"Shabbat HaGadol":{haft:{k:"Malachi",b:"3:4",e:"3:24"}},"Shabbat Nachamu":{haft:{k:"Isaiah",b:"40:1",e:"40:26"}},"Shabbat Parah":{haft:{k:"Ezekiel",b:"36:16",e:"36:38"},fullkriyah:{M:{p:39,k:"Numbers",b:"19:1",e:"19:22"}}},"Shabbat Shekalim":{haft:{k:"II Kings",b:"12:1",e:"12:17"},fullkriyah:{M:{p:21,k:"Exodus",b:"30:11",e:"30:16"}}},"Shabbat Shekalim (on Rosh Chodesh)":{haft:{k:"II Kings",b:"12:1",e:"12:17"},fullkriyah:{"7":{p:41,k:"Numbers",b:"28:9",e:"28:15"},M:{p:21,k:"Exodus",b:"30:11",e:"30:16"}}},"Shabbat Shuva":{haft:[{k:"Hosea",b:"14:2",e:"14:10"},{k:"Micah",b:"7:18",e:"7:20"},{k:"Joel",b:"2:15",e:"2:27"}]},"Shabbat Zachor":{haft:{k:"I Samuel",b:"15:2",e:"15:34"},fullkriyah:{M:{p:49,k:"Deuteronomy",b:"25:17",e:"25:19"}}},"Rosh Chodesh":{fullkriyah:{"1":{p:41,k:"Numbers",b:"28:1",e:"28:3"},"2":{p:41,k:"Numbers",b:"28:3",e:"28:5"},"3":{p:41,k:"Numbers",b:"28:6",e:"28:10"},"4":{p:41,k:"Numbers",b:"28:11",e:"28:15"}}},"Shabbat Rosh Chodesh":{haft:{k:"Isaiah",b:"66:1",e:"66:24"},fullkriyah:{M:{p:41,k:"Numbers",b:"28:9",e:"28:15"}}},"Shabbat Machar Chodesh":{haft:{k:"I Samuel",b:"20:18",e:"20:42"}}};

var Bereshit={num:1,hebrew:"בְּרֵאשִׁית",book:1,verses:"1:1-6:8",haft:{k:"Isaiah",b:"42:5",e:"43:10"},seph:{k:"Isaiah",b:"42:5",e:"42:21"},fullkriyah:{"1":{b:"1:1",e:"2:3"},"2":{b:"2:4",e:"2:19"},"3":{b:"2:20",e:"3:21"},"4":{b:"3:22",e:"4:18"},"5":{b:"4:19",e:"4:22"},"6":{b:"4:23",e:"5:24"},"7":{b:"5:25",e:"6:8"},M:{b:"6:5",e:"6:8"}},weekday:{"1":{b:"1:1",e:"1:5"},"2":{b:"1:6",e:"1:8"},"3":{b:"1:9",e:"1:13"}},triennial:{years:{"Y.1":{"1":{b:"1:1",e:"1:5"},"2":{b:"1:6",e:"1:8"},"3":{b:"1:9",e:"1:13"},"4":{b:"1:14",e:"1:19"},"5":{b:"1:20",e:"1:23"},"6":{b:"1:24",e:"1:31"},"7":{b:"2:1",e:"2:3"},M:{b:"2:1",e:"2:3"}},"Y.2":{"1":{b:"2:4",e:"2:9"},"2":{b:"2:10",e:"2:19"},"3":{b:"2:20",e:"2:25"},"4":{b:"3:1",e:"3:21"},"5":{b:"3:22",e:"3:24"},"6":{b:"4:1",e:"4:18"},"7":{b:"4:19",e:"4:26"},M:{b:"4:23",e:"4:26"}},"Y.3":{"1":{b:"5:1",e:"5:5"},"2":{b:"5:6",e:"5:8"},"3":{b:"5:9",e:"5:14"},"4":{b:"5:15",e:"5:20"},"5":{b:"5:21",e:"5:24"},"6":{b:"5:25",e:"5:31"},"7":{b:"5:32",e:"6:8"},M:{b:"6:5",e:"6:8"}}}}};var Noach={num:2,hebrew:"נֹחַ",book:1,verses:"6:9-11:32",haft:{k:"Isaiah",b:"54:1",e:"55:5"},seph:{k:"Isaiah",b:"54:1",e:"54:10"},fullkriyah:{"1":{b:"6:9",e:"6:22"},"2":{b:"7:1",e:"7:16"},"3":{b:"7:17",e:"8:14"},"4":{b:"8:15",e:"9:7"},"5":{b:"9:8",e:"9:17"},"6":{b:"9:18",e:"10:32"},"7":{b:"11:1",e:"11:32"},M:{b:"11:29",e:"11:32"}},weekday:{"1":{b:"6:9",e:"6:16"},"2":{b:"6:17",e:"6:19"},"3":{b:"6:20",e:"6:22"}},triennial:{years:{"Y.1":{"1":{b:"6:9",e:"6:16"},"2":{b:"6:17",e:"6:19"},"3":{b:"6:20",e:"6:22"},"4":{b:"7:1",e:"7:9"},"5":{b:"7:10",e:"7:16"},"6":{b:"7:17",e:"7:24"},"7":{b:"8:1",e:"8:14"},M:{b:"8:12",e:"8:14"}},"Y.2":{"1":{b:"8:15",e:"8:22"},"2":{b:"9:1",e:"9:7"},"3":{b:"9:8",e:"9:17"},"4":{b:"9:18",e:"9:29"},"5":{b:"10:1",e:"10:14"},"6":{b:"10:15",e:"10:20"},"7":{b:"10:21",e:"10:32"},M:{b:"10:26",e:"10:32"}},"Y.3":{"1":{b:"11:1",e:"11:4"},"2":{b:"11:5",e:"11:9"},"3":{b:"11:10",e:"11:13"},"4":{b:"11:14",e:"11:17"},"5":{b:"11:18",e:"11:21"},"6":{b:"11:22",e:"11:25"},"7":{b:"11:26",e:"11:32"},M:{b:"11:29",e:"11:32"}}}}};var Vayera={num:4,hebrew:"וַיֵּרָא",book:1,verses:"18:1-22:24",haft:{k:"II Kings",b:"4:1",e:"4:37"},seph:{k:"II Kings",b:"4:1",e:"4:23"},fullkriyah:{"1":{b:"18:1",e:"18:14"},"2":{b:"18:15",e:"18:33"},"3":{b:"19:1",e:"19:20"},"4":{b:"19:21",e:"21:4"},"5":{b:"21:5",e:"21:21"},"6":{b:"21:22",e:"21:34"},"7":{b:"22:1",e:"22:24"},M:{b:"22:20",e:"22:24"}},weekday:{"1":{b:"18:1",e:"18:5"},"2":{b:"18:6",e:"18:8"},"3":{b:"18:9",e:"18:14"}},triennial:{years:{"Y.1":{"1":{b:"18:1",e:"18:5"},"2":{b:"18:6",e:"18:8"},"3":{b:"18:9",e:"18:14"},"4":{b:"18:15",e:"18:21"},"5":{b:"18:22",e:"18:26"},"6":{b:"18:27",e:"18:30"},"7":{b:"18:31",e:"18:33"},M:{b:"18:31",e:"18:33"}},"Y.2":{"1":{b:"19:1",e:"19:11"},"2":{b:"19:12",e:"19:20"},"3":{b:"19:21",e:"19:29"},"4":{b:"19:30",e:"19:38"},"5":{b:"20:1",e:"20:8"},"6":{b:"20:9",e:"20:14"},"7":{b:"20:15",e:"20:18"},M:{b:"20:15",e:"20:18"}},"Y.3":{"1":{b:"21:1",e:"21:4"},"2":{b:"21:5",e:"21:13"},"3":{b:"21:14",e:"21:21"},"4":{b:"21:22",e:"21:34"},"5":{b:"22:1",e:"22:8"},"6":{b:"22:9",e:"22:19"},"7":{b:"22:20",e:"22:24"},M:{b:"22:20",e:"22:24"}}}}};var Toldot={num:6,hebrew:"תּוֹלְדוֹת",book:1,verses:"25:19-28:9",haft:{k:"Malachi",b:"1:1",e:"2:7"},fullkriyah:{"1":{b:"25:19",e:"26:5"},"2":{b:"26:6",e:"26:12"},"3":{b:"26:13",e:"26:22"},"4":{b:"26:23",e:"26:29"},"5":{b:"26:30",e:"27:27"},"6":{b:"27:28",e:"28:4"},"7":{b:"28:5",e:"28:9"},M:{b:"28:7",e:"28:9"}},weekday:{"1":{b:"25:19",e:"25:22"},"2":{b:"25:23",e:"25:26"},"3":{b:"25:27",e:"26:5"}},triennial:{years:{"Y.1":{"1":{b:"25:19",e:"25:22"},"2":{b:"25:23",e:"25:26"},"3":{b:"25:27",e:"25:34"},"4":{b:"26:1",e:"26:5"},"5":{b:"26:6",e:"26:12"},"6":{b:"26:13",e:"26:16"},"7":{b:"26:17",e:"26:22"},M:{b:"26:19",e:"26:22"}},"Y.2":{"1":{b:"26:23",e:"26:29"},"2":{b:"26:30",e:"26:33"},"3":{b:"26:34",e:"27:4"},"4":{b:"27:5",e:"27:13"},"5":{b:"27:14",e:"27:17"},"6":{b:"27:18",e:"27:23"},"7":{b:"27:24",e:"27:27"},M:{b:"27:24",e:"27:27"}},"Y.3":{"1":{b:"27:28",e:"27:30"},"2":{b:"27:31",e:"27:33"},"3":{b:"27:34",e:"27:37"},"4":{b:"27:38",e:"27:40"},"5":{b:"27:41",e:"27:46"},"6":{b:"28:1",e:"28:4"},"7":{b:"28:5",e:"28:9"},M:{b:"28:7",e:"28:9"}}}}};var Vayetzei={num:7,hebrew:"וַיֵּצֵא",book:1,verses:"28:10-32:3",haft:{k:"Hosea",b:"12:13",e:"14:10"},seph:{k:"Hosea",b:"11:7",e:"12:12"},fullkriyah:{"1":{b:"28:10",e:"28:22"},"2":{b:"29:1",e:"29:17"},"3":{b:"29:18",e:"30:13"},"4":{b:"30:14",e:"30:27"},"5":{b:"30:28",e:"31:16"},"6":{b:"31:17",e:"31:42"},"7":{b:"31:43",e:"32:3"},M:{b:"32:1",e:"32:3"}},weekday:{"1":{b:"28:10",e:"28:12"},"2":{b:"28:13",e:"28:17"},"3":{b:"28:18",e:"28:22"}},triennial:{years:{"Y.1":{"1":{b:"28:10",e:"28:12"},"2":{b:"28:13",e:"28:17"},"3":{b:"28:18",e:"28:22"},"4":{b:"29:1",e:"29:8"},"5":{b:"29:9",e:"29:17"},"6":{b:"29:18",e:"29:33"},"7":{b:"29:34",e:"30:13"},M:{b:"30:9",e:"30:13"}},"Y.2":{"1":{b:"30:14",e:"30:16"},"2":{b:"30:17",e:"30:21"},"3":{b:"30:22",e:"30:27"},"4":{b:"30:28",e:"30:36"},"5":{b:"30:37",e:"30:43"},"6":{b:"31:1",e:"31:9"},"7":{b:"31:10",e:"31:16"},M:{b:"31:14",e:"31:16"}},"Y.3":{"1":{b:"31:17",e:"31:21"},"2":{b:"31:22",e:"31:24"},"3":{b:"31:25",e:"31:35"},"4":{b:"31:36",e:"31:42"},"5":{b:"31:43",e:"31:45"},"6":{b:"31:46",e:"31:50"},"7":{b:"31:51",e:"32:3"},M:{b:"32:1",e:"32:3"}}}}};var Vayishlach={num:8,hebrew:"וַיִּשְׁלַח",book:1,verses:"32:4-36:43",haft:{k:"Obadiah",b:"1:1",e:"1:21"},fullkriyah:{"1":{b:"32:4",e:"32:13"},"2":{b:"32:14",e:"32:30"},"3":{b:"32:31",e:"33:5"},"4":{b:"33:6",e:"33:20"},"5":{b:"34:1",e:"35:11"},"6":{b:"35:12",e:"36:19"},"7":{b:"36:20",e:"36:43"},M:{b:"36:40",e:"36:43"}},weekday:{"1":{b:"32:4",e:"32:6"},"2":{b:"32:7",e:"32:9"},"3":{b:"32:10",e:"32:13"}},triennial:{years:{"Y.1":{"1":{b:"32:4",e:"32:6"},"2":{b:"32:7",e:"32:9"},"3":{b:"32:10",e:"32:13"},"4":{b:"32:14",e:"32:22"},"5":{b:"32:23",e:"32:30"},"6":{b:"32:31",e:"33:5"},"7":{b:"33:6",e:"33:20"},M:{b:"33:18",e:"33:20"}},"Y.2":{"1":{b:"34:1",e:"34:4"},"2":{b:"34:5",e:"34:12"},"3":{b:"34:13",e:"34:17"},"4":{b:"34:18",e:"34:23"},"5":{b:"34:24",e:"34:31"},"6":{b:"35:1",e:"35:11"},"7":{b:"35:12",e:"35:15"},M:{b:"35:12",e:"35:15"}},"Y.3":{"1":{b:"35:16",e:"35:26"},"2":{b:"35:27",e:"35:29"},"3":{b:"36:1",e:"36:8"},"4":{b:"36:9",e:"36:19"},"5":{b:"36:20",e:"36:30"},"6":{b:"36:31",e:"36:39"},"7":{b:"36:40",e:"36:43"},M:{b:"36:40",e:"36:43"}}}}};var Vayeshev={num:9,hebrew:"וַיֵּשֶׁב",book:1,verses:"37:1-40:23",haft:{k:"Amos",b:"2:6",e:"3:8"},fullkriyah:{"1":{b:"37:1",e:"37:11"},"2":{b:"37:12",e:"37:22"},"3":{b:"37:23",e:"37:36"},"4":{b:"38:1",e:"38:30"},"5":{b:"39:1",e:"39:6"},"6":{b:"39:7",e:"39:23"},"7":{b:"40:1",e:"40:23"},M:{b:"40:20",e:"40:23"}},weekday:{"1":{b:"37:1",e:"37:3"},"2":{b:"37:4",e:"37:7"},"3":{b:"37:8",e:"37:11"}},triennial:{years:{"Y.1":{"1":{b:"37:1",e:"37:3"},"2":{b:"37:4",e:"37:7"},"3":{b:"37:8",e:"37:11"},"4":{b:"37:12",e:"37:17"},"5":{b:"37:18",e:"37:22"},"6":{b:"37:23",e:"37:28"},"7":{b:"37:29",e:"37:36"},M:{b:"37:34",e:"37:36"}},"Y.2":{"1":{b:"38:1",e:"38:5"},"2":{b:"38:6",e:"38:11"},"3":{b:"38:12",e:"38:14"},"4":{b:"38:15",e:"38:19"},"5":{b:"38:20",e:"38:23"},"6":{b:"38:24",e:"38:26"},"7":{b:"38:27",e:"38:30"},M:{b:"38:27",e:"38:30"}},"Y.3":{"1":{b:"39:1",e:"39:6"},"2":{b:"39:7",e:"39:10"},"3":{b:"39:11",e:"39:18"},"4":{b:"39:19",e:"39:23"},"5":{b:"40:1",e:"40:8"},"6":{b:"40:9",e:"40:15"},"7":{b:"40:16",e:"40:23"},M:{b:"40:20",e:"40:23"}}}}};var Miketz={num:10,hebrew:"מִקֵּץ",book:1,verses:"41:1-44:17",haft:{k:"I Kings",b:"3:15",e:"4:1"},fullkriyah:{"1":{b:"41:1",e:"41:14"},"2":{b:"41:15",e:"41:38"},"3":{b:"41:39",e:"41:52"},"4":{b:"41:53",e:"42:18"},"5":{b:"42:19",e:"43:15"},"6":{b:"43:16",e:"43:29"},"7":{b:"43:30",e:"44:17"},M:{b:"44:14",e:"44:17"}},weekday:{"1":{b:"41:1",e:"41:4"},"2":{b:"41:5",e:"41:7"},"3":{b:"41:8",e:"41:14"}},triennial:{years:{"Y.1":{"1":{b:"41:1",e:"41:4"},"2":{b:"41:5",e:"41:7"},"3":{b:"41:8",e:"41:14"},"4":{b:"41:15",e:"41:24"},"5":{b:"41:25",e:"41:38"},"6":{b:"41:39",e:"41:43"},"7":{b:"41:44",e:"41:52"},M:{b:"41:50",e:"41:52"}},"Y.2":{"1":{b:"41:53",e:"41:57"},"2":{b:"42:1",e:"42:5"},"3":{b:"42:6",e:"42:18"},"4":{b:"42:19",e:"42:28"},"5":{b:"42:29",e:"42:38"},"6":{b:"43:1",e:"43:7"},"7":{b:"43:8",e:"43:15"},M:{b:"43:11",e:"43:15"}},"Y.3":{"1":{b:"43:16",e:"43:18"},"2":{b:"43:19",e:"43:25"},"3":{b:"43:26",e:"43:29"},"4":{b:"43:30",e:"43:34"},"5":{b:"44:1",e:"44:6"},"6":{b:"44:7",e:"44:10"},"7":{b:"44:11",e:"44:17"},M:{b:"44:14",e:"44:17"}}}}};var Vayigash={num:11,hebrew:"וַיִּגַּשׁ",book:1,verses:"44:18-47:27",haft:{k:"Ezekiel",b:"37:15",e:"37:28"},fullkriyah:{"1":{b:"44:18",e:"44:30"},"2":{b:"44:31",e:"45:7"},"3":{b:"45:8",e:"45:18"},"4":{b:"45:19",e:"45:27"},"5":{b:"45:28",e:"46:27"},"6":{b:"46:28",e:"47:10"},"7":{b:"47:11",e:"47:27"},M:{b:"47:25",e:"47:27"}},weekday:{"1":{b:"44:18",e:"44:20"},"2":{b:"44:21",e:"44:24"},"3":{b:"44:25",e:"44:30"}},triennial:{years:{"Y.1":{"1":{b:"44:18",e:"44:20"},"2":{b:"44:21",e:"44:24"},"3":{b:"44:25",e:"44:30"},"4":{b:"44:31",e:"44:34"},"5":{b:"45:1",e:"45:7"},"6":{b:"45:8",e:"45:18"},"7":{b:"45:19",e:"45:27"},M:{b:"45:25",e:"45:27"}},"Y.2":{"1":{b:"45:28",e:"46:4"},"2":{b:"46:5",e:"46:7"},"3":{b:"46:8",e:"46:11"},"4":{b:"46:12",e:"46:15"},"5":{b:"46:16",e:"46:18"},"6":{b:"46:19",e:"46:22"},"7":{b:"46:23",e:"46:27"},M:{b:"46:23",e:"46:27"}},"Y.3":{"1":{b:"46:28",e:"46:30"},"2":{b:"46:31",e:"46:34"},"3":{b:"47:1",e:"47:6"},"4":{b:"47:7",e:"47:10"},"5":{b:"47:11",e:"47:19"},"6":{b:"47:20",e:"47:22"},"7":{b:"47:23",e:"47:27"},M:{b:"47:25",e:"47:27"}}}}};var Vayechi={num:12,hebrew:"וַיְחִי",book:1,verses:"47:28-50:26",haft:{k:"I Kings",b:"2:1",e:"2:12"},fullkriyah:{"1":{b:"47:28",e:"48:9"},"2":{b:"48:10",e:"48:16"},"3":{b:"48:17",e:"48:22"},"4":{b:"49:1",e:"49:18"},"5":{b:"49:19",e:"49:26"},"6":{b:"49:27",e:"50:20"},"7":{b:"50:21",e:"50:26"},M:{b:"50:23",e:"50:26"}},weekday:{"1":{b:"47:28",e:"47:31"},"2":{b:"48:1",e:"48:3"},"3":{b:"48:4",e:"48:9"}},triennial:{years:{"Y.1":{"1":{b:"47:28",e:"47:31"},"2":{b:"48:1",e:"48:3"},"3":{b:"48:4",e:"48:9"},"4":{b:"48:10",e:"48:13"},"5":{b:"48:14",e:"48:16"},"6":{b:"48:17",e:"48:19"},"7":{b:"48:20",e:"48:22"},M:{b:"48:20",e:"48:22"}},"Y.2":{"1":{b:"49:1",e:"49:4"},"2":{b:"49:5",e:"49:7"},"3":{b:"49:8",e:"49:12"},"4":{b:"49:13",e:"49:15"},"5":{b:"49:16",e:"49:18"},"6":{b:"49:19",e:"49:21"},"7":{b:"49:22",e:"49:26"},M:{b:"49:22",e:"49:26"}},"Y.3":{"1":{b:"49:27",e:"49:30"},"2":{b:"49:31",e:"49:33"},"3":{b:"50:1",e:"50:6"},"4":{b:"50:7",e:"50:9"},"5":{b:"50:10",e:"50:14"},"6":{b:"50:15",e:"50:20"},"7":{b:"50:21",e:"50:26"},M:{b:"50:23",e:"50:26"}}}}};var Shemot={num:13,hebrew:"שְׁמוֹת",book:2,verses:"1:1-6:1",haft:[{k:"Isaiah",b:"27:6",e:"28:13"},{k:"Isaiah",b:"29:22",e:"29:23"}],seph:{k:"Jeremiah",b:"1:1",e:"2:3"},fullkriyah:{"1":{b:"1:1",e:"1:17"},"2":{b:"1:18",e:"2:10"},"3":{b:"2:11",e:"2:25"},"4":{b:"3:1",e:"3:15"},"5":{b:"3:16",e:"4:17"},"6":{b:"4:18",e:"4:31"},"7":{b:"5:1",e:"6:1"},M:{b:"5:22",e:"6:1"}},weekday:{"1":{b:"1:1",e:"1:7"},"2":{b:"1:8",e:"1:12"},"3":{b:"1:13",e:"1:17"}},triennial:{years:{"Y.1":{"1":{b:"1:1",e:"1:7"},"2":{b:"1:8",e:"1:12"},"3":{b:"1:13",e:"1:17"},"4":{b:"1:18",e:"1:22"},"5":{b:"2:1",e:"2:10"},"6":{b:"2:11",e:"2:15"},"7":{b:"2:16",e:"2:25"},M:{b:"2:23",e:"2:25"}},"Y.2":{"1":{b:"3:1",e:"3:6"},"2":{b:"3:7",e:"3:10"},"3":{b:"3:11",e:"3:15"},"4":{b:"3:16",e:"3:22"},"5":{b:"4:1",e:"4:5"},"6":{b:"4:6",e:"4:9"},"7":{b:"4:10",e:"4:17"},M:{b:"4:14",e:"4:17"}},"Y.3":{"1":{b:"4:18",e:"4:20"},"2":{b:"4:21",e:"4:26"},"3":{b:"4:27",e:"4:31"},"4":{b:"5:1",e:"5:5"},"5":{b:"5:6",e:"5:9"},"6":{b:"5:10",e:"5:14"},"7":{b:"5:15",e:"6:1"},M:{b:"5:22",e:"6:1"}}}}};var Vaera={num:14,hebrew:"וָאֵרָא",book:2,verses:"6:2-9:35",haft:{k:"Ezekiel",b:"28:25",e:"29:21"},fullkriyah:{"1":{b:"6:2",e:"6:13"},"2":{b:"6:14",e:"6:28"},"3":{b:"6:29",e:"7:7"},"4":{b:"7:8",e:"8:6"},"5":{b:"8:7",e:"8:18"},"6":{b:"8:19",e:"9:16"},"7":{b:"9:17",e:"9:35"},M:{b:"9:33",e:"9:35"}},weekday:{"1":{b:"6:2",e:"6:5"},"2":{b:"6:6",e:"6:9"},"3":{b:"6:10",e:"6:13"}},triennial:{years:{"Y.1":{"1":{b:"6:2",e:"6:5"},"2":{b:"6:6",e:"6:9"},"3":{b:"6:10",e:"6:13"},"4":{b:"6:14",e:"6:19"},"5":{b:"6:20",e:"6:25"},"6":{b:"6:26",e:"6:28"},"7":{b:"6:29",e:"7:7"},M:{b:"7:5",e:"7:7"}},"Y.2":{"1":{b:"7:8",e:"7:13"},"2":{b:"7:14",e:"7:18"},"3":{b:"7:19",e:"7:25"},"4":{b:"7:26",e:"7:29"},"5":{b:"8:1",e:"8:6"},"6":{b:"8:7",e:"8:11"},"7":{b:"8:12",e:"8:15"},M:{b:"8:12",e:"8:15"}},"Y.3":{"1":{b:"8:16",e:"8:23"},"2":{b:"8:24",e:"8:28"},"3":{b:"9:1",e:"9:7"},"4":{b:"9:8",e:"9:16"},"5":{b:"9:17",e:"9:21"},"6":{b:"9:22",e:"9:26"},"7":{b:"9:27",e:"9:35"},M:{b:"9:33",e:"9:35"}}}}};var Bo={num:15,hebrew:"בֹּא",book:2,verses:"10:1-13:16",haft:{k:"Jeremiah",b:"46:13",e:"46:28"},fullkriyah:{"1":{b:"10:1",e:"10:11"},"2":{b:"10:12",e:"10:23"},"3":{b:"10:24",e:"11:3"},"4":{b:"11:4",e:"12:20"},"5":{b:"12:21",e:"12:28"},"6":{b:"12:29",e:"12:51"},"7":{b:"13:1",e:"13:16"},M:{b:"13:14",e:"13:16"}},weekday:{"1":{b:"10:1",e:"10:3"},"2":{b:"10:4",e:"10:6"},"3":{b:"10:7",e:"10:11"}},triennial:{years:{"Y.1":{"1":{b:"10:1",e:"10:3"},"2":{b:"10:4",e:"10:6"},"3":{b:"10:7",e:"10:11"},"4":{b:"10:12",e:"10:15"},"5":{b:"10:16",e:"10:23"},"6":{b:"10:24",e:"10:29"},"7":{b:"11:1",e:"11:3"},M:{b:"11:1",e:"11:3"}},"Y.2":{"1":{b:"11:4",e:"11:10"},"2":{b:"12:1",e:"12:10"},"3":{b:"12:11",e:"12:13"},"4":{b:"12:14",e:"12:16"},"5":{b:"12:17",e:"12:20"},"6":{b:"12:21",e:"12:24"},"7":{b:"12:25",e:"12:28"},M:{b:"12:25",e:"12:28"}},"Y.3":{"1":{b:"12:29",e:"12:32"},"2":{b:"12:33",e:"12:36"},"3":{b:"12:37",e:"12:42"},"4":{b:"12:43",e:"12:51"},"5":{b:"13:1",e:"13:4"},"6":{b:"13:5",e:"13:10"},"7":{b:"13:11",e:"13:16"},M:{b:"13:14",e:"13:16"}}}}};var Beshalach={num:16,hebrew:"בְּשַׁלַּח",book:2,verses:"13:17-17:16",haft:{k:"Judges",b:"4:4",e:"5:31"},seph:{k:"Judges",b:"5:1",e:"5:31"},fullkriyah:{"1":{b:"13:17",e:"14:8"},"2":{b:"14:9",e:"14:14"},"3":{b:"14:15",e:"14:25"},"4":{b:"14:26",e:"15:26"},"5":{b:"15:27",e:"16:10"},"6":{b:"16:11",e:"16:36"},"7":{b:"17:1",e:"17:16"},M:{b:"17:14",e:"17:16"}},weekday:{"1":{b:"13:17",e:"13:22"},"2":{b:"14:1",e:"14:4"},"3":{b:"14:5",e:"14:8"}},triennial:{years:{"Y.1":{"1":{b:"13:17",e:"13:22"},"2":{b:"14:1",e:"14:4"},"3":{b:"14:5",e:"14:8"},"4":{b:"14:9",e:"14:14"},"5":{b:"14:15",e:"14:20"},"6":{b:"14:21",e:"14:25"},"7":{b:"14:26",e:"15:26"},M:{b:"15:22",e:"15:26"}},"Y.2":{"1":{b:"14:15",e:"14:20"},"2":{b:"14:21",e:"14:25"},"3":{b:"14:26",e:"15:21"},"4":{b:"15:22",e:"15:26"},"5":{b:"15:27",e:"16:3"},"6":{b:"16:4",e:"16:7"},"7":{b:"16:8",e:"16:10"},M:{b:"16:8",e:"16:10"}},"Y.3":{"1":{b:"14:26",e:"15:21"},"2":{b:"15:22",e:"15:26"},"3":{b:"15:27",e:"16:10"},"4":{b:"16:11",e:"16:27"},"5":{b:"16:28",e:"16:36"},"6":{b:"17:1",e:"17:7"},"7":{b:"17:8",e:"17:16"},M:{b:"17:14",e:"17:16"}}}}};var Yitro={num:17,hebrew:"יִתְרוֹ",book:2,verses:"18:1-20:23",haft:[{k:"Isaiah",b:"6:1",e:"7:6"},{k:"Isaiah",b:"9:5",e:"9:6"}],seph:{k:"Isaiah",b:"6:1",e:"6:13"},fullkriyah:{"1":{b:"18:1",e:"18:12"},"2":{b:"18:13",e:"18:23"},"3":{b:"18:24",e:"18:27"},"4":{b:"19:1",e:"19:6"},"5":{b:"19:7",e:"19:19"},"6":{b:"19:20",e:"20:14"},"7":{b:"20:15",e:"20:23"},M:{b:"20:19",e:"20:23"}},weekday:{"1":{b:"18:1",e:"18:4"},"2":{b:"18:5",e:"18:8"},"3":{b:"18:9",e:"18:12"}},triennial:{descr:"full parashah with Ten Commandments every year",variations:{"Y.1":{"1":{b:"18:1",e:"18:12"},"2":{b:"18:13",e:"18:23"},"3":{b:"18:24",e:"18:27"},"4":{b:"19:1",e:"19:6"},"5":{b:"19:7",e:"19:19"},"6":{b:"19:20",e:"20:14"},"7":{b:"20:15",e:"20:23"},M:{b:"20:19",e:"20:23"}},"Y.2":"Y.1","Y.3":"Y.1"},alt:{descr:"triennial divisions with Ten Commandments in years two and three",variations:{"Y.1":{"1":{b:"18:1",e:"18:4"},"2":{b:"18:5",e:"18:8"},"3":{b:"18:9",e:"18:12"},"4":{b:"18:13",e:"18:16"},"5":{b:"18:17",e:"18:19"},"6":{b:"18:20",e:"18:23"},"7":{b:"18:24",e:"18:27"},M:{b:"18:24",e:"18:27"}},"Y.2":{"1":{b:"19:1",e:"19:6"},"2":{b:"19:7",e:"19:9"},"3":{b:"19:10",e:"19:13"},"4":{b:"19:14",e:"19:19"},"5":{b:"19:20",e:"20:14"},"6":{b:"20:15",e:"20:18"},"7":{b:"20:19",e:"20:23"},M:{b:"20:21",e:"20:23"}},"Y.3":"Y.2"}}}};var Mishpatim={num:18,hebrew:"מִּשְׁפָּטִים",book:2,verses:"21:1-24:18",haft:[{k:"Jeremiah",b:"34:8",e:"34:22"},{k:"Jeremiah",b:"33:25",e:"33:26"}],fullkriyah:{"1":{b:"21:1",e:"21:19"},"2":{b:"21:20",e:"22:3"},"3":{b:"22:4",e:"22:26"},"4":{b:"22:27",e:"23:5"},"5":{b:"23:6",e:"23:19"},"6":{b:"23:20",e:"23:25"},"7":{b:"23:26",e:"24:18"},M:{b:"24:15",e:"24:18"}},weekday:{"1":{b:"21:1",e:"21:6"},"2":{b:"21:7",e:"21:11"},"3":{b:"21:12",e:"21:19"}},triennial:{years:{"Y.1":{"1":{b:"21:1",e:"21:6"},"2":{b:"21:7",e:"21:11"},"3":{b:"21:12",e:"21:19"},"4":{b:"21:20",e:"21:27"},"5":{b:"21:28",e:"21:32"},"6":{b:"21:33",e:"21:36"},"7":{b:"21:37",e:"22:3"},M:{b:"21:37",e:"22:3"}},"Y.2":{"1":{b:"22:4",e:"22:8"},"2":{b:"22:9",e:"22:12"},"3":{b:"22:13",e:"22:18"},"4":{b:"22:19",e:"22:26"},"5":{b:"22:27",e:"23:5"},"6":{b:"23:6",e:"23:13"},"7":{b:"23:14",e:"23:19"},M:{b:"23:14",e:"23:19"}},"Y.3":{"1":{b:"23:20",e:"23:25"},"2":{b:"23:26",e:"23:30"},"3":{b:"23:31",e:"23:33"},"4":{b:"24:1",e:"24:6"},"5":{b:"24:7",e:"24:11"},"6":{b:"24:12",e:"24:14"},"7":{b:"24:15",e:"24:18"},M:{b:"24:15",e:"24:18"}}}}};var Terumah={num:19,hebrew:"תְּרוּמָה",book:2,verses:"25:1-27:19",haft:{k:"I Kings",b:"5:26",e:"6:13"},fullkriyah:{"1":{b:"25:1",e:"25:16"},"2":{b:"25:17",e:"25:30"},"3":{b:"25:31",e:"26:14"},"4":{b:"26:15",e:"26:30"},"5":{b:"26:31",e:"26:37"},"6":{b:"27:1",e:"27:8"},"7":{b:"27:9",e:"27:19"},M:{b:"27:17",e:"27:19"}},weekday:{"1":{b:"25:1",e:"25:5"},"2":{b:"25:6",e:"25:9"},"3":{b:"25:10",e:"25:16"}},triennial:{years:{"Y.1":{"1":{b:"25:1",e:"25:5"},"2":{b:"25:6",e:"25:9"},"3":{b:"25:10",e:"25:16"},"4":{b:"25:17",e:"25:22"},"5":{b:"25:23",e:"25:30"},"6":{b:"25:31",e:"25:33"},"7":{b:"25:34",e:"25:40"},M:{b:"25:37",e:"25:40"}},"Y.2":{"1":{b:"26:1",e:"26:3"},"2":{b:"26:4",e:"26:6"},"3":{b:"26:7",e:"26:11"},"4":{b:"26:12",e:"26:14"},"5":{b:"26:15",e:"26:21"},"6":{b:"26:22",e:"26:25"},"7":{b:"26:26",e:"26:30"},M:{b:"26:26",e:"26:30"}},"Y.3":{"1":{b:"26:31",e:"26:33"},"2":{b:"26:34",e:"26:37"},"3":{b:"27:1",e:"27:3"},"4":{b:"27:4",e:"27:8"},"5":{b:"27:9",e:"27:12"},"6":{b:"27:13",e:"27:16"},"7":{b:"27:17",e:"27:19"},M:{b:"27:17",e:"27:19"}}}}};var Tetzaveh={num:20,hebrew:"תְּצַוֶּה",book:2,verses:"27:20-30:10",haft:{k:"Ezekiel",b:"43:10",e:"43:27"},fullkriyah:{"1":{b:"27:20",e:"28:12"},"2":{b:"28:13",e:"28:30"},"3":{b:"28:31",e:"28:43"},"4":{b:"29:1",e:"29:18"},"5":{b:"29:19",e:"29:37"},"6":{b:"29:38",e:"29:46"},"7":{b:"30:1",e:"30:10"},M:{b:"30:8",e:"30:10"}},weekday:{"1":{b:"27:20",e:"28:5"},"2":{b:"28:6",e:"28:9"},"3":{b:"28:10",e:"28:12"}},triennial:{years:{"Y.1":{"1":{b:"27:20",e:"28:5"},"2":{b:"28:6",e:"28:9"},"3":{b:"28:10",e:"28:12"},"4":{b:"28:13",e:"28:17"},"5":{b:"28:18",e:"28:21"},"6":{b:"28:22",e:"28:25"},"7":{b:"28:26",e:"28:30"},M:{b:"28:28",e:"28:30"}},"Y.2":{"1":{b:"28:31",e:"28:35"},"2":{b:"28:36",e:"28:38"},"3":{b:"28:39",e:"28:43"},"4":{b:"29:1",e:"29:4"},"5":{b:"29:5",e:"29:9"},"6":{b:"29:10",e:"29:14"},"7":{b:"29:15",e:"29:18"},M:{b:"29:15",e:"29:18"}},"Y.3":{"1":{b:"29:19",e:"29:21"},"2":{b:"29:22",e:"29:25"},"3":{b:"29:26",e:"29:30"},"4":{b:"29:31",e:"29:34"},"5":{b:"29:35",e:"29:37"},"6":{b:"29:38",e:"29:46"},"7":{b:"30:1",e:"30:10"},M:{b:"30:8",e:"30:10"}}}}};var Vayakhel={num:22,hebrew:"וַיַּקְהֵל",book:2,verses:"35:1-38:20",haft:{k:"I Kings",b:"7:40",e:"7:50"},seph:{k:"I Kings",b:"7:13",e:"7:26"},fullkriyah:{"1":{b:"35:1",e:"35:20"},"2":{b:"35:21",e:"35:29"},"3":{b:"35:30",e:"36:7"},"4":{b:"36:8",e:"36:19"},"5":{b:"36:20",e:"37:16"},"6":{b:"37:17",e:"37:29"},"7":{b:"38:1",e:"38:20"},M:{b:"38:18",e:"38:20"}},weekday:{"1":{b:"35:1",e:"35:3"},"2":{b:"35:4",e:"35:10"},"3":{b:"35:11",e:"35:20"}},triennial:{variations:{"C.2":{"1":{b:"35:1",e:"35:3"},"2":{b:"35:4",e:"35:10"},"3":{b:"35:11",e:"35:20"},"4":{b:"35:21",e:"35:29"},"5":{b:"35:30",e:"35:35"},"6":{b:"36:1",e:"36:7"},"7":{b:"36:8",e:"36:19"},M:{b:"36:17",e:"36:19"}},"B.2":{"1":{b:"37:17",e:"37:19"},"2":{b:"37:20",e:"37:24"},"3":{b:"37:25",e:"37:29"},"4":{b:"38:1",e:"38:3"},"5":{b:"38:4",e:"38:8"},"6":{b:"38:9",e:"38:15"},"7":{b:"38:16",e:"38:20"},M:{b:"38:18",e:"38:20"}},"C.3":{"1":{b:"36:20",e:"36:30"},"2":{b:"36:31",e:"36:38"},"3":{b:"37:1",e:"37:16"},"4":{b:"37:17",e:"37:24"},"5":{b:"37:25",e:"37:29"},"6":{b:"38:1",e:"38:8"},"7":{b:"38:9",e:"38:20"},M:{b:"38:18",e:"38:20"}},"A.3":"C.3","D.1":"C.2","D.2":"C.3","E.1":"C.2","E.3":"C.3","F.1":{"1":{b:"35:1",e:"35:10"},"2":{b:"35:11",e:"35:20"},"3":{b:"35:21",e:"35:29"},"4":{b:"35:30",e:"36:7"},"5":{b:"36:8",e:"36:19"},"6":{b:"36:20",e:"36:38"},"7":{b:"37:1",e:"37:16"},M:{b:"37:10",e:"37:16"}}}}};var Pekudei={num:23,hebrew:"פְקוּדֵי",book:2,verses:"38:21-40:38",haft:{k:"I Kings",b:"7:51",e:"8:21"},seph:{k:"I Kings",b:"7:40",e:"7:50"},fullkriyah:{"1":{b:"38:21",e:"39:1"},"2":{b:"39:2",e:"39:21"},"3":{b:"39:22",e:"39:32"},"4":{b:"39:33",e:"39:43"},"5":{b:"40:1",e:"40:16"},"6":{b:"40:17",e:"40:27"},"7":{b:"40:28",e:"40:38"},M:{b:"40:34",e:"40:38"}},weekday:{"1":{b:"38:21",e:"38:23"},"2":{b:"38:24",e:"38:27"},"3":{b:"38:28",e:"39:1"}},triennial:{variations:{"A.3":{"1":{b:"39:22",e:"39:26"},"2":{b:"39:27",e:"39:32"},"3":{b:"39:33",e:"39:43"},"4":{b:"40:1",e:"40:8"},"5":{b:"40:9",e:"40:16"},"6":{b:"40:17",e:"40:27"},"7":{b:"40:28",e:"40:38"},M:{b:"40:34",e:"40:38"}},"B.2":{"1":{b:"38:21",e:"38:23"},"2":{b:"38:24",e:"38:27"},"3":{b:"38:28",e:"39:1"},"4":{b:"39:2",e:"39:7"},"5":{b:"39:8",e:"39:14"},"6":{b:"39:15",e:"39:18"},"7":{b:"39:19",e:"39:21"},M:{b:"39:19",e:"39:21"}},"C.2":"B.2","C.3":"A.3","D.1":"B.2","D.2":"A.3","E.1":"B.2","E.3":"A.3","F.1":"B.2"}}};var Vayikra={num:24,hebrew:"וַיִּקְרָא",book:3,verses:"1:1-5:26",haft:{k:"Isaiah",b:"43:21",e:"44:23"},fullkriyah:{"1":{b:"1:1",e:"1:13"},"2":{b:"1:14",e:"2:6"},"3":{b:"2:7",e:"2:16"},"4":{b:"3:1",e:"3:17"},"5":{b:"4:1",e:"4:26"},"6":{b:"4:27",e:"5:10"},"7":{b:"5:11",e:"5:26"},M:{b:"5:24",e:"5:26"}},weekday:{"1":{b:"1:1",e:"1:4"},"2":{b:"1:5",e:"1:9"},"3":{b:"1:10",e:"1:13"}},triennial:{years:{"Y.1":{"1":{b:"1:1",e:"1:4"},"2":{b:"1:5",e:"1:9"},"3":{b:"1:10",e:"1:13"},"4":{b:"1:14",e:"1:17"},"5":{b:"2:1",e:"2:6"},"6":{b:"2:7",e:"2:13"},"7":{b:"2:14",e:"2:16"},M:{b:"2:14",e:"2:16"}},"Y.2":{"1":{b:"3:1",e:"3:5"},"2":{b:"3:6",e:"3:11"},"3":{b:"3:12",e:"3:17"},"4":{b:"4:1",e:"4:7"},"5":{b:"4:8",e:"4:12"},"6":{b:"4:13",e:"4:21"},"7":{b:"4:22",e:"4:26"},M:{b:"4:24",e:"4:26"}},"Y.3":{"1":{b:"4:27",e:"4:31"},"2":{b:"4:32",e:"4:35"},"3":{b:"5:1",e:"5:10"},"4":{b:"5:11",e:"5:13"},"5":{b:"5:14",e:"5:16"},"6":{b:"5:17",e:"5:19"},"7":{b:"5:20",e:"5:26"},M:{b:"5:24",e:"5:26"}}}}};var Tzav={num:25,hebrew:"צַו",book:3,verses:"6:1-8:36",haft:[{k:"Jeremiah",b:"7:21",e:"8:3"},{k:"Jeremiah",b:"9:22",e:"9:23"}],fullkriyah:{"1":{b:"6:1",e:"6:11"},"2":{b:"6:12",e:"7:10"},"3":{b:"7:11",e:"7:38"},"4":{b:"8:1",e:"8:13"},"5":{b:"8:14",e:"8:21"},"6":{b:"8:22",e:"8:29"},"7":{b:"8:30",e:"8:36"},M:{b:"8:33",e:"8:36"}},weekday:{"1":{b:"6:1",e:"6:3"},"2":{b:"6:4",e:"6:6"},"3":{b:"6:7",e:"6:11"}},triennial:{years:{"Y.1":{"1":{b:"6:1",e:"6:3"},"2":{b:"6:4",e:"6:6"},"3":{b:"6:7",e:"6:11"},"4":{b:"6:12",e:"6:16"},"5":{b:"6:17",e:"6:23"},"6":{b:"7:1",e:"7:6"},"7":{b:"7:7",e:"7:10"},M:{b:"7:7",e:"7:10"}},"Y.2":{"1":{b:"7:11",e:"7:15"},"2":{b:"7:16",e:"7:18"},"3":{b:"7:19",e:"7:21"},"4":{b:"7:22",e:"7:27"},"5":{b:"7:28",e:"7:31"},"6":{b:"7:32",e:"7:34"},"7":{b:"7:35",e:"7:38"},M:{b:"7:35",e:"7:38"}},"Y.3":{"1":{b:"8:1",e:"8:5"},"2":{b:"8:6",e:"8:9"},"3":{b:"8:10",e:"8:13"},"4":{b:"8:14",e:"8:17"},"5":{b:"8:18",e:"8:21"},"6":{b:"8:22",e:"8:29"},"7":{b:"8:30",e:"8:36"},M:{b:"8:33",e:"8:36"}}}}};var Shmini={num:26,hebrew:"שְּׁמִינִי",book:3,verses:"9:1-11:47",haft:{k:"II Samuel",b:"6:1",e:"7:17"},seph:{k:"II Samuel",b:"6:1",e:"6:19"},fullkriyah:{"1":{b:"9:1",e:"9:16"},"2":{b:"9:17",e:"9:23"},"3":{b:"9:24",e:"10:11"},"4":{b:"10:12",e:"10:15"},"5":{b:"10:16",e:"10:20"},"6":{b:"11:1",e:"11:32"},"7":{b:"11:33",e:"11:47"},M:{b:"11:45",e:"11:47"}},weekday:{"1":{b:"9:1",e:"9:6"},"2":{b:"9:7",e:"9:10"},"3":{b:"9:11",e:"9:16"}},triennial:{years:{"Y.1":{"1":{b:"9:1",e:"9:6"},"2":{b:"9:7",e:"9:10"},"3":{b:"9:11",e:"9:16"},"4":{b:"9:17",e:"9:23"},"5":{b:"9:24",e:"10:3"},"6":{b:"10:4",e:"10:7"},"7":{b:"10:8",e:"10:11"},M:{b:"10:8",e:"10:11"}},"Y.2":{"1":{b:"10:12",e:"10:15"},"2":{b:"10:16",e:"10:20"},"3":{b:"11:1",e:"11:8"},"4":{b:"11:9",e:"11:12"},"5":{b:"11:13",e:"11:19"},"6":{b:"11:20",e:"11:28"},"7":{b:"11:29",e:"11:32"},M:{b:"11:29",e:"11:32"}},"Y.3":{"1":{b:"11:1",e:"11:8"},"2":{b:"11:9",e:"11:12"},"3":{b:"11:13",e:"11:19"},"4":{b:"11:20",e:"11:28"},"5":{b:"11:29",e:"11:32"},"6":{b:"11:33",e:"11:38"},"7":{b:"11:39",e:"11:47"},M:{b:"11:45",e:"11:47"}}}}};var Tazria={num:27,hebrew:"תַזְרִיעַ",book:3,verses:"12:1-13:59",haft:{k:"II Kings",b:"4:42",e:"5:19"},fullkriyah:{"1":{b:"12:1",e:"13:5"},"2":{b:"13:6",e:"13:17"},"3":{b:"13:18",e:"13:23"},"4":{b:"13:24",e:"13:28"},"5":{b:"13:29",e:"13:39"},"6":{b:"13:40",e:"13:54"},"7":{b:"13:55",e:"13:59"},M:{b:"13:57",e:"13:59"}},weekday:{"1":{b:"12:1",e:"12:4"},"2":{b:"12:5",e:"12:8"},"3":{b:"13:1",e:"13:5"}},triennial:{variations:{"D.1":{"1":{b:"12:1",e:"12:4"},"2":{b:"12:5",e:"12:8"},"3":{b:"13:1",e:"13:5"},"4":{b:"13:6",e:"13:8"},"5":{b:"13:9",e:"13:17"},"6":{b:"13:18",e:"13:23"},"7":{b:"13:24",e:"13:28"},M:{b:"13:26",e:"13:28"}},"B.2":{"1":{b:"13:29",e:"13:34"},"2":{b:"13:35",e:"13:39"},"3":{b:"13:40",e:"13:42"},"4":{b:"13:43",e:"13:46"},"5":{b:"13:47",e:"13:50"},"6":{b:"13:51",e:"13:54"},"7":{b:"13:55",e:"13:59"},M:{b:"13:57",e:"13:59"}},"A.3":"B.2","C.1":{"1":{b:"12:1",e:"12:4"},"2":{b:"12:5",e:"12:8"},"3":{b:"13:1",e:"13:5"},"4":{b:"13:6",e:"13:17"},"5":{b:"13:18",e:"13:23"},"6":{b:"13:24",e:"13:28"},"7":{b:"13:29",e:"13:39"},M:{b:"13:37",e:"13:39"}},"D.3":"B.2"}}};var Metzora={num:28,hebrew:"מְּצֹרָע",book:3,verses:"14:1-15:33",haft:{k:"II Kings",b:"7:3",e:"7:20"},fullkriyah:{"1":{b:"14:1",e:"14:12"},"2":{b:"14:13",e:"14:20"},"3":{b:"14:21",e:"14:32"},"4":{b:"14:33",e:"14:53"},"5":{b:"14:54",e:"15:15"},"6":{b:"15:16",e:"15:28"},"7":{b:"15:29",e:"15:33"},M:{b:"15:31",e:"15:33"}},weekday:{"1":{b:"14:1",e:"14:5"},"2":{b:"14:6",e:"14:9"},"3":{b:"14:10",e:"14:12"}},triennial:{variations:{"A.3":{"1":{b:"14:33",e:"14:38"},"2":{b:"14:39",e:"14:47"},"3":{b:"14:48",e:"14:53"},"4":{b:"14:54",e:"15:7"},"5":{b:"15:8",e:"15:15"},"6":{b:"15:16",e:"15:28"},"7":{b:"15:29",e:"15:33"},M:{b:"15:31",e:"15:33"}},"B.2":{"1":{b:"14:1",e:"14:5"},"2":{b:"14:6",e:"14:9"},"3":{b:"14:10",e:"14:12"},"4":{b:"14:13",e:"14:15"},"5":{b:"14:16",e:"14:20"},"6":{b:"14:21",e:"14:25"},"7":{b:"14:26",e:"14:32"},M:{b:"14:30",e:"14:32"}},"C.1":"B.2","D.1":"B.2","D.3":"A.3"}}};var Kedoshim={num:30,hebrew:"קְדשִׁים",book:3,verses:"19:1-20:27",haft:{k:"Amos",b:"9:7",e:"9:15"},seph:{k:"Ezekiel",b:"20:2",e:"20:20"},fullkriyah:{"1":{b:"19:1",e:"19:14"},"2":{b:"19:15",e:"19:22"},"3":{b:"19:23",e:"19:32"},"4":{b:"19:33",e:"19:37"},"5":{b:"20:1",e:"20:7"},"6":{b:"20:8",e:"20:22"},"7":{b:"20:23",e:"20:27"},M:{b:"20:25",e:"20:27"}},weekday:{"1":{b:"19:1",e:"19:4"},"2":{b:"19:5",e:"19:10"},"3":{b:"19:11",e:"19:14"}},triennial:{variations:{"A.3":{"1":{b:"19:15",e:"19:18"},"2":{b:"19:19",e:"19:22"},"3":{b:"19:23",e:"19:32"},"4":{b:"19:33",e:"19:37"},"5":{b:"20:1",e:"20:7"},"6":{b:"20:8",e:"20:22"},"7":{b:"20:23",e:"20:27"},M:{b:"20:25",e:"20:27"}},"B.2":{"1":{b:"19:1",e:"19:4"},"2":{b:"19:5",e:"19:10"},"3":{b:"19:11",e:"19:14"},"4":{b:"19:15",e:"19:18"},"5":{b:"19:19",e:"19:22"},"6":{b:"19:23",e:"19:32"},"7":{b:"19:33",e:"19:37"},M:{b:"19:35",e:"19:37"}},"C.1":"B.2","D.1":"B.2","D.3":{"1":{b:"19:23",e:"19:25"},"2":{b:"19:26",e:"19:28"},"3":{b:"19:29",e:"19:32"},"4":{b:"19:33",e:"19:37"},"5":{b:"20:1",e:"20:7"},"6":{b:"20:8",e:"20:22"},"7":{b:"20:23",e:"20:27"},M:{b:"20:25",e:"20:27"}}}}};var Emor={num:31,hebrew:"אֱמוֹר",book:3,verses:"21:1-24:23",haft:{k:"Ezekiel",b:"44:15",e:"44:31"},fullkriyah:{"1":{b:"21:1",e:"21:15"},"2":{b:"21:16",e:"22:16"},"3":{b:"22:17",e:"22:33"},"4":{b:"23:1",e:"23:22"},"5":{b:"23:23",e:"23:32"},"6":{b:"23:33",e:"23:44"},"7":{b:"24:1",e:"24:23"},M:{b:"24:21",e:"24:23"}},weekday:{"1":{b:"21:1",e:"21:6"},"2":{b:"21:7",e:"21:12"},"3":{b:"21:13",e:"21:15"}},triennial:{years:{"Y.1":{"1":{b:"21:1",e:"21:6"},"2":{b:"21:7",e:"21:12"},"3":{b:"21:13",e:"21:15"},"4":{b:"21:16",e:"21:24"},"5":{b:"22:1",e:"22:9"},"6":{b:"22:10",e:"22:12"},"7":{b:"22:13",e:"22:16"},M:{b:"22:13",e:"22:16"}},"Y.2":{"1":{b:"22:17",e:"22:20"},"2":{b:"22:21",e:"22:25"},"3":{b:"22:26",e:"22:33"},"4":{b:"23:1",e:"23:3"},"5":{b:"23:4",e:"23:8"},"6":{b:"23:9",e:"23:14"},"7":{b:"23:15",e:"23:22"},M:{b:"23:19",e:"23:22"}},"Y.3":{"1":{b:"23:23",e:"23:25"},"2":{b:"23:26",e:"23:32"},"3":{b:"23:33",e:"23:44"},"4":{b:"24:1",e:"24:4"},"5":{b:"24:5",e:"24:9"},"6":{b:"24:10",e:"24:12"},"7":{b:"24:13",e:"24:23"},M:{b:"24:21",e:"24:23"}}}}};var Behar={num:32,hebrew:"בְּהַר",book:3,verses:"25:1-26:2",haft:{k:"Jeremiah",b:"32:6",e:"32:27"},fullkriyah:{"1":{b:"25:1",e:"25:13"},"2":{b:"25:14",e:"25:18"},"3":{b:"25:19",e:"25:24"},"4":{b:"25:25",e:"25:28"},"5":{b:"25:29",e:"25:38"},"6":{b:"25:39",e:"25:46"},"7":{b:"25:47",e:"26:2"},M:{b:"25:55",e:"26:2"}},weekday:{"1":{b:"25:1",e:"25:3"},"2":{b:"25:4",e:"25:7"},"3":{b:"25:8",e:"25:13"}},triennial:{variations:{"D.1":{"1":{b:"25:1",e:"25:3"},"2":{b:"25:4",e:"25:7"},"3":{b:"25:8",e:"25:10"},"4":{b:"25:11",e:"25:13"},"5":{b:"25:14",e:"25:18"},"6":{b:"25:19",e:"25:24"},"7":{b:"25:25",e:"25:28"},M:{b:"25:25",e:"25:28"}},"B.2":{"1":{b:"25:29",e:"25:34"},"2":{b:"25:35",e:"25:38"},"3":{b:"25:39",e:"25:43"},"4":{b:"25:44",e:"25:46"},"5":{b:"25:47",e:"25:50"},"6":{b:"25:51",e:"25:54"},"7":{b:"25:55",e:"26:2"},M:{b:"25:55",e:"26:2"}},"A.3":"B.2","C.1":{"1":{b:"25:1",e:"25:3"},"2":{b:"25:4",e:"25:7"},"3":{b:"25:8",e:"25:13"},"4":{b:"25:14",e:"25:18"},"5":{b:"25:19",e:"25:24"},"6":{b:"25:25",e:"25:28"},"7":{b:"25:29",e:"25:38"},M:{b:"25:35",e:"25:38"}},"D.3":"B.2"}}};var Bechukotai={num:33,hebrew:"בְּחֻקֹּתַי",book:3,verses:"26:3-27:34",haft:{k:"Jeremiah",b:"16:19",e:"17:14"},fullkriyah:{"1":{b:"26:3",e:"26:5"},"2":{b:"26:6",e:"26:9"},"3":{b:"26:10",e:"26:46"},"4":{b:"27:1",e:"27:15"},"5":{b:"27:16",e:"27:21"},"6":{b:"27:22",e:"27:28"},"7":{b:"27:29",e:"27:34"},M:{b:"27:32",e:"27:34"}},weekday:{"1":{b:"26:3",e:"26:5"},"2":{b:"26:6",e:"26:9"},"3":{b:"26:10",e:"26:13"}},triennial:{variations:{"A.3":{"1":{b:"27:1",e:"27:4"},"2":{b:"27:5",e:"27:8"},"3":{b:"27:9",e:"27:15"},"4":{b:"27:16",e:"27:21"},"5":{b:"27:22",e:"27:25"},"6":{b:"27:26",e:"27:28"},"7":{b:"27:29",e:"27:34"},M:{b:"27:32",e:"27:34"}},"B.2":{"1":{b:"26:3",e:"26:5"},"2":{b:"26:6",e:"26:9"},"3":{b:"26:10",e:"26:46"},"4":{b:"27:1",e:"27:4"},"5":{b:"27:5",e:"27:8"},"6":{b:"27:9",e:"27:11"},"7":{b:"27:12",e:"27:15"},M:{b:"27:12",e:"27:15"}},"C.1":"B.2","D.1":"B.2","D.3":"A.3"}}};var Bamidbar={num:34,hebrew:"בְּמִדְבַּר",book:4,verses:"1:1-4:20",haft:{k:"Hosea",b:"2:1",e:"2:22"},fullkriyah:{"1":{b:"1:1",e:"1:19"},"2":{b:"1:20",e:"1:54"},"3":{b:"2:1",e:"2:34"},"4":{b:"3:1",e:"3:13"},"5":{b:"3:14",e:"3:39"},"6":{b:"3:40",e:"3:51"},"7":{b:"4:1",e:"4:20"},M:{b:"4:17",e:"4:20"}},weekday:{"1":{b:"1:1",e:"1:4"},"2":{b:"1:5",e:"1:16"},"3":{b:"1:17",e:"1:19"}},triennial:{years:{"Y.1":{"1":{b:"1:1",e:"1:4"},"2":{b:"1:5",e:"1:16"},"3":{b:"1:17",e:"1:19"},"4":{b:"1:20",e:"1:27"},"5":{b:"1:28",e:"1:35"},"6":{b:"1:36",e:"1:43"},"7":{b:"1:44",e:"1:54"},M:{b:"1:52",e:"1:54"}},"Y.2":{"1":{b:"2:1",e:"2:9"},"2":{b:"2:10",e:"2:16"},"3":{b:"2:17",e:"2:24"},"4":{b:"2:25",e:"2:31"},"5":{b:"2:32",e:"2:34"},"6":{b:"3:1",e:"3:4"},"7":{b:"3:5",e:"3:13"},M:{b:"3:11",e:"3:13"}},"Y.3":{"1":{b:"3:14",e:"3:20"},"2":{b:"3:21",e:"3:26"},"3":{b:"3:27",e:"3:39"},"4":{b:"3:40",e:"3:43"},"5":{b:"3:44",e:"3:51"},"6":{b:"4:1",e:"4:10"},"7":{b:"4:11",e:"4:20"},M:{b:"4:17",e:"4:20"}}}}};var Nasso={num:35,hebrew:"נָשׂא",book:4,verses:"4:21-7:89",haft:{k:"Judges",b:"13:2",e:"13:25"},fullkriyah:{"1":{b:"4:21",e:"4:37"},"2":{b:"4:38",e:"4:49"},"3":{b:"5:1",e:"5:10"},"4":{b:"5:11",e:"6:27"},"5":{b:"7:1",e:"7:41"},"6":{b:"7:42",e:"7:71"},"7":{b:"7:72",e:"7:89"},M:{b:"7:87",e:"7:89"}},weekday:{"1":{b:"4:21",e:"4:24"},"2":{b:"4:25",e:"4:28"},"3":{b:"4:29",e:"4:33"}},triennial:{years:{"Y.1":{"1":{b:"4:21",e:"4:24"},"2":{b:"4:25",e:"4:28"},"3":{b:"4:29",e:"4:33"},"4":{b:"4:34",e:"4:37"},"5":{b:"4:38",e:"4:49"},"6":{b:"5:1",e:"5:4"},"7":{b:"5:5",e:"5:10"},M:{b:"5:8",e:"5:10"}},"Y.2":{"1":{b:"5:11",e:"5:15"},"2":{b:"5:16",e:"5:26"},"3":{b:"5:27",e:"6:4"},"4":{b:"6:5",e:"6:8"},"5":{b:"6:9",e:"6:15"},"6":{b:"6:16",e:"6:21"},"7":{b:"6:22",e:"6:27"},M:{b:"6:22",e:"6:27"}},"Y.3":{"1":{b:"7:1",e:"7:11"},"2":{b:"7:12",e:"7:23"},"3":{b:"7:24",e:"7:35"},"4":{b:"7:36",e:"7:47"},"5":{b:"7:48",e:"7:59"},"6":{b:"7:60",e:"7:71"},"7":{b:"7:72",e:"7:89"},M:{b:"7:87",e:"7:89"}}}}};var Korach={num:38,hebrew:"קוֹרַח",book:4,verses:"16:1-18:32",haft:{k:"I Samuel",b:"11:14",e:"12:22"},fullkriyah:{"1":{b:"16:1",e:"16:13"},"2":{b:"16:14",e:"16:19"},"3":{b:"16:20",e:"17:8"},"4":{b:"17:9",e:"17:15"},"5":{b:"17:16",e:"17:24"},"6":{b:"17:25",e:"18:20"},"7":{b:"18:21",e:"18:32"},M:{b:"18:30",e:"18:32"}},weekday:{"1":{b:"16:1",e:"16:3"},"2":{b:"16:4",e:"16:7"},"3":{b:"16:8",e:"16:13"}},triennial:{years:{"Y.1":{"1":{b:"16:1",e:"16:3"},"2":{b:"16:4",e:"16:7"},"3":{b:"16:8",e:"16:13"},"4":{b:"16:14",e:"16:19"},"5":{b:"16:20",e:"16:35"},"6":{b:"17:1",e:"17:8"},"7":{b:"17:9",e:"17:15"},M:{b:"17:9",e:"17:15"}},"Y.2":{"1":{b:"16:20",e:"16:27"},"2":{b:"16:28",e:"16:35"},"3":{b:"17:1",e:"17:5"},"4":{b:"17:6",e:"17:8"},"5":{b:"17:9",e:"17:15"},"6":{b:"17:16",e:"17:20"},"7":{b:"17:21",e:"17:24"},M:{b:"17:21",e:"17:24"}},"Y.3":{"1":{b:"17:25",e:"18:7"},"2":{b:"18:8",e:"18:10"},"3":{b:"18:11",e:"18:13"},"4":{b:"18:14",e:"18:20"},"5":{b:"18:21",e:"18:24"},"6":{b:"18:25",e:"18:29"},"7":{b:"18:30",e:"18:32"},M:{b:"18:30",e:"18:32"}}}}};var Chukat={num:39,hebrew:"חֻקַּת",book:4,verses:"19:1-22:1",haft:{k:"Judges",b:"11:1",e:"11:33"},fullkriyah:{"1":{b:"19:1",e:"19:17"},"2":{b:"19:18",e:"20:6"},"3":{b:"20:7",e:"20:13"},"4":{b:"20:14",e:"20:21"},"5":{b:"20:22",e:"21:9"},"6":{b:"21:10",e:"21:20"},"7":{b:"21:21",e:"22:1"},M:{b:"21:34",e:"22:1"}},weekday:{"1":{b:"19:1",e:"19:6"},"2":{b:"19:7",e:"19:9"},"3":{b:"19:10",e:"19:17"}},triennial:{variations:{"C.2":{"1":{b:"19:1",e:"19:6"},"2":{b:"19:7",e:"19:9"},"3":{b:"19:10",e:"19:17"},"4":{b:"19:18",e:"19:22"},"5":{b:"20:1",e:"20:6"},"6":{b:"20:7",e:"20:13"},"7":{b:"20:14",e:"20:21"},M:{b:"20:18",e:"20:21"}},"B.2":{"1":{b:"21:11",e:"21:13"},"2":{b:"21:14",e:"21:16"},"3":{b:"21:17",e:"21:20"},"4":{b:"21:21",e:"21:25"},"5":{b:"21:26",e:"21:28"},"6":{b:"21:29",e:"21:33"},"7":{b:"21:34",e:"22:1"},M:{b:"21:34",e:"22:1"}},"C.3":{"1":{b:"20:22",e:"21:3"},"2":{b:"21:4",e:"21:10"},"3":{b:"21:11",e:"21:16"},"4":{b:"21:17",e:"21:20"},"5":{b:"21:21",e:"21:25"},"6":{b:"21:25",e:"21:33"},"7":{b:"21:34",e:"22:1"},M:{b:"21:34",e:"22:1"}},"A.3":"C.3","D.1":"C.2","D.2":"C.3","E.1":"C.2","E.3":"C.3","F.1":{"1":{b:"19:1",e:"19:9"},"2":{b:"19:10",e:"19:17"},"3":{b:"19:18",e:"20:6"},"4":{b:"20:7",e:"20:13"},"5":{b:"20:14",e:"20:21"},"6":{b:"20:22",e:"21:9"},"7":{b:"21:10",e:"21:20"},M:{b:"21:16",e:"21:20"}},"G.1":{"1":{b:"19:1",e:"19:6"},"2":{b:"19:7",e:"19:9"},"3":{b:"19:10",e:"19:13"},"4":{b:"19:14",e:"19:17"},"5":{b:"19:18",e:"19:22"},"6":{b:"20:1",e:"20:6"},"7":{b:"20:7",e:"20:13"},M:{b:"20:7",e:"20:13"}},"G.2":{"1":{b:"20:1",e:"20:6"},"2":{b:"20:7",e:"20:13"},"3":{b:"20:14",e:"20:17"},"4":{b:"20:18",e:"20:21"},"5":{b:"20:22",e:"21:3"},"6":{b:"21:4",e:"21:7"},"7":{b:"21:8",e:"21:10"},M:{b:"21:8",e:"21:10"}},"G.3":"B.2"}}};var Balak={num:40,hebrew:"בָּלָק",book:4,verses:"22:2-25:9",haft:{k:"Micah",b:"5:6",e:"6:8"},fullkriyah:{"1":{b:"22:2",e:"22:12"},"2":{b:"22:13",e:"22:20"},"3":{b:"22:21",e:"22:38"},"4":{b:"22:39",e:"23:12"},"5":{b:"23:13",e:"23:26"},"6":{b:"23:27",e:"24:13"},"7":{b:"24:14",e:"25:9"},M:{b:"25:7",e:"25:9"}},weekday:{"1":{b:"22:2",e:"22:4"},"2":{b:"22:5",e:"22:7"},"3":{b:"22:8",e:"22:12"}},triennial:{variations:{"A.3":{"1":{b:"22:39",e:"23:5"},"2":{b:"23:6",e:"23:12"},"3":{b:"23:13",e:"23:26"},"4":{b:"23:27",e:"23:30"},"5":{b:"24:1",e:"24:13"},"6":{b:"24:14",e:"24:25"},"7":{b:"25:1",e:"25:9"},M:{b:"25:7",e:"25:9"}},"B.2":{"1":{b:"22:2",e:"22:4"},"2":{b:"22:5",e:"22:7"},"3":{b:"22:8",e:"22:12"},"4":{b:"22:13",e:"22:20"},"5":{b:"22:21",e:"22:27"},"6":{b:"22:28",e:"22:30"},"7":{b:"22:31",e:"22:38"},M:{b:"22:36",e:"22:38"}},"C.2":"B.2","C.3":"A.3","D.1":"B.2","D.2":"A.3","E.1":"B.2","E.3":"A.3","F.1":"B.2","G.1":"B.2","G.2":{"1":{b:"22:39",e:"22:41"},"2":{b:"23:1",e:"23:3"},"3":{b:"23:4",e:"23:6"},"4":{b:"23:7",e:"23:12"},"5":{b:"23:13",e:"23:15"},"6":{b:"23:16",e:"23:18"},"7":{b:"23:19",e:"23:26"},M:{b:"23:19",e:"23:26"}},"G.3":{"1":{b:"23:27",e:"23:30"},"2":{b:"24:1",e:"24:9"},"3":{b:"24:10",e:"24:13"},"4":{b:"24:14",e:"24:19"},"5":{b:"24:20",e:"24:25"},"6":{b:"25:1",e:"25:6"},"7":{b:"25:7",e:"25:9"},M:{b:"25:7",e:"25:9"}}}}};var Pinchas={num:41,hebrew:"פִּינְחָס",book:4,verses:"25:10-30:1",haft:{k:"I Kings",b:"18:46",e:"19:21"},fullkriyah:{"1":{b:"25:10",e:"26:4"},"2":{b:"26:5",e:"26:51"},"3":{b:"26:52",e:"27:5"},"4":{b:"27:6",e:"27:23"},"5":{b:"28:1",e:"28:15"},"6":{b:"28:16",e:"29:11"},"7":{b:"29:12",e:"30:1"},M:{b:"29:35",e:"30:1"}},weekday:{"1":{b:"25:10",e:"25:12"},"2":{b:"25:13",e:"25:15"},"3":{b:"25:16",e:"26:4"}},triennial:{years:{"Y.1":{"1":{b:"25:10",e:"25:12"},"2":{b:"25:13",e:"25:15"},"3":{b:"25:16",e:"26:4"},"4":{b:"26:5",e:"26:11"},"5":{b:"26:12",e:"26:22"},"6":{b:"26:23",e:"26:34"},"7":{b:"26:35",e:"26:51"},M:{b:"26:48",e:"26:51"}},"Y.2":{"1":{b:"26:52",e:"26:56"},"2":{b:"26:57",e:"26:62"},"3":{b:"26:63",e:"27:5"},"4":{b:"27:6",e:"27:14"},"5":{b:"27:15",e:"27:23"},"6":{b:"28:1",e:"28:10"},"7":{b:"28:11",e:"28:15"},M:{b:"28:11",e:"28:15"}},"Y.3":{"1":{b:"28:16",e:"28:25"},"2":{b:"28:26",e:"28:31"},"3":{b:"29:1",e:"29:6"},"4":{b:"29:7",e:"29:11"},"5":{b:"29:12",e:"29:16"},"6":{b:"29:17",e:"29:28"},"7":{b:"29:29",e:"30:1"},M:{b:"29:35",e:"30:1"}}}}};var Matot={num:42,hebrew:"מַּטּוֹת",book:4,verses:"30:2-32:42",haft:{k:"Jeremiah",b:"1:1",e:"2:3"},fullkriyah:{"1":{b:"30:2",e:"30:17"},"2":{b:"31:1",e:"31:12"},"3":{b:"31:13",e:"31:24"},"4":{b:"31:25",e:"31:41"},"5":{b:"31:42",e:"31:54"},"6":{b:"32:1",e:"32:19"},"7":{b:"32:20",e:"32:42"},M:{b:"32:39",e:"32:42"}},weekday:{"1":{b:"30:2",e:"30:9"},"2":{b:"30:10",e:"30:13"},"3":{b:"30:14",e:"30:17"}},triennial:{variations:{"B.2":{"1":{b:"31:1",e:"32:4"},"2":{b:"32:5",e:"32:19"},"3":{b:"32:20",e:"32:24"},"4":{b:"32:25",e:"32:27"},"5":{b:"32:28",e:"32:30"},"6":{b:"32:31",e:"32:38"},"7":{b:"32:39",e:"32:42"},M:{b:"32:39",e:"32:42"}},"A.3":"B.2","C.1":{"1":{b:"30:2",e:"30:9"},"2":{b:"30:10",e:"30:13"},"3":{b:"30:14",e:"30:17"},"4":{b:"31:1",e:"31:12"},"5":{b:"31:13",e:"31:24"},"6":{b:"31:25",e:"31:41"},"7":{b:"31:42",e:"31:54"},M:{b:"31:51",e:"31:54"}}}}};var Masei={num:43,hebrew:"מַסְעֵי",book:4,verses:"33:1-36:13",haft:[{k:"Jeremiah",b:"2:4",e:"2:28"},{k:"Jeremiah",b:"3:4",e:"3:4"}],seph:[{k:"Jeremiah",b:"2:4",e:"2:28"},{k:"Jeremiah",b:"4:1",e:"4:2"}],fullkriyah:{"1":{b:"33:1",e:"33:10"},"2":{b:"33:11",e:"33:49"},"3":{b:"33:50",e:"34:15"},"4":{b:"34:16",e:"34:29"},"5":{b:"35:1",e:"35:8"},"6":{b:"35:9",e:"35:34"},"7":{b:"36:1",e:"36:13"},M:{b:"36:11",e:"36:13"}},weekday:{"1":{b:"33:1",e:"33:3"},"2":{b:"33:4",e:"33:6"},"3":{b:"33:7",e:"33:10"}},triennial:{variations:{"A.3":{"1":{b:"33:50",e:"34:15"},"2":{b:"34:16",e:"34:29"},"3":{b:"35:1",e:"35:8"},"4":{b:"35:9",e:"35:15"},"5":{b:"35:16",e:"35:29"},"6":{b:"35:30",e:"35:34"},"7":{b:"36:1",e:"36:13"},M:{b:"36:10",e:"36:13"}},"B.2":{"1":{b:"33:1",e:"33:3"},"2":{b:"33:4",e:"33:6"},"3":{b:"33:7",e:"33:10"},"4":{b:"33:11",e:"33:23"},"5":{b:"33:24",e:"33:36"},"6":{b:"33:37",e:"33:43"},"7":{b:"33:44",e:"33:49"},M:{b:"33:47",e:"33:49"}},"C.1":"B.2"}}};var Devarim={num:44,hebrew:"דְּבָרִים",book:5,verses:"1:1-3:22",haft:{k:"Isaiah",b:"1:1",e:"1:27"},fullkriyah:{"1":{b:"1:1",e:"1:10"},"2":{b:"1:11",e:"1:21"},"3":{b:"1:22",e:"1:38"},"4":{b:"1:39",e:"2:1"},"5":{b:"2:2",e:"2:30"},"6":{b:"2:31",e:"3:14"},"7":{b:"3:15",e:"3:22"},M:{b:"3:20",e:"3:22"}},weekday:{"1":{b:"1:1",e:"1:3"},"2":{b:"1:4",e:"1:7"},"3":{b:"1:8",e:"1:11"}},triennial:{years:{"Y.1":{"1":{b:"1:1",e:"1:3"},"2":{b:"1:4",e:"1:7"},"3":{b:"1:8",e:"1:10"},"4":{b:"1:11",e:"1:21"},"5":{b:"1:22",e:"1:28"},"6":{b:"1:29",e:"1:38"},"7":{b:"1:39",e:"2:1"},M:{b:"1:39",e:"2:1"}},"Y.2":{"1":{b:"2:2",e:"2:5"},"2":{b:"2:6",e:"2:12"},"3":{b:"2:13",e:"2:16"},"4":{b:"2:17",e:"2:19"},"5":{b:"2:20",e:"2:22"},"6":{b:"2:23",e:"2:25"},"7":{b:"2:26",e:"2:30"},M:{b:"2:28",e:"2:30"}},"Y.3":{"1":{b:"2:31",e:"2:34"},"2":{b:"2:35",e:"2:37"},"3":{b:"3:1",e:"3:3"},"4":{b:"3:4",e:"3:7"},"5":{b:"3:8",e:"3:11"},"6":{b:"3:12",e:"3:14"},"7":{b:"3:15",e:"3:22"},M:{b:"3:20",e:"3:22"}}}}};var Vaetchanan={num:45,hebrew:"וָאֶתְחַנַּן",book:5,verses:"3:23-7:11",haft:{k:"Isaiah",b:"40:1",e:"40:26"},fullkriyah:{"1":{b:"3:23",e:"4:4"},"2":{b:"4:5",e:"4:40"},"3":{b:"4:41",e:"4:49"},"4":{b:"5:1",e:"5:18"},"5":{b:"5:19",e:"6:3"},"6":{b:"6:4",e:"6:25"},"7":{b:"7:1",e:"7:11"},M:{b:"7:9",e:"7:11"}},weekday:{"1":{b:"3:23",e:"3:25"},"2":{b:"3:26",e:"4:4"},"3":{b:"4:5",e:"4:8"}},triennial:{descr:"with the Ten Commandments every year and the Sh'ma in years two and three",years:{"Y.1":{"1":{b:"3:23",e:"3:25"},"2":{b:"3:26",e:"4:4"},"3":{b:"4:5",e:"4:14"},"4":{b:"4:15",e:"4:20"},"5":{b:"4:21",e:"4:40"},"6":{b:"4:41",e:"4:49"},"7":{b:"5:1",e:"5:18"},M:{b:"5:16",e:"5:18"}},"Y.2":{"1":{b:"5:1",e:"5:18"},"2":{b:"5:19",e:"5:24"},"3":{b:"5:25",e:"5:30"},"4":{b:"6:1",e:"6:3"},"5":{b:"6:4",e:"6:9"},"6":{b:"6:10",e:"6:19"},"7":{b:"6:20",e:"6:25"},M:{b:"6:23",e:"6:25"}},"Y.3":{"1":{b:"5:1",e:"5:18"},"2":{b:"5:19",e:"5:24"},"3":{b:"5:25",e:"6:3"},"4":{b:"6:4",e:"6:9"},"5":{b:"6:10",e:"6:19"},"6":{b:"6:20",e:"6:25"},"7":{b:"7:1",e:"7:11"},M:{b:"7:9",e:"7:11"}}},alt:{descr:"with the Ten Commandments in year two and the Sh'ma in year three",years:{"Y.1":{"1":{b:"3:23",e:"3:25"},"2":{b:"3:26",e:"3:29"},"3":{b:"4:1",e:"4:4"},"4":{b:"4:5",e:"4:14"},"5":{b:"4:15",e:"4:20"},"6":{b:"4:21",e:"4:29"},"7":{b:"4:30",e:"4:40"},M:{b:"4:36",e:"4:40"}},"Y.2":{"1":{b:"4:41",e:"4:43"},"2":{b:"4:44",e:"4:49"},"3":{b:"5:1",e:"5:18"},"4":{b:"5:19",e:"5:21"},"5":{b:"5:22",e:"5:24"},"6":{b:"5:25",e:"5:30"},"7":{b:"6:1",e:"6:3"},M:{b:"6:1",e:"6:3"}},"Y.3":{"1":{b:"6:4",e:"6:9"},"2":{b:"6:10",e:"6:19"},"3":{b:"6:20",e:"6:22"},"4":{b:"6:23",e:"6:25"},"5":{b:"7:1",e:"7:5"},"6":{b:"7:6",e:"7:8"},"7":{b:"7:9",e:"7:11"},M:{b:"7:9",e:"7:11"}}}}}};var Eikev={num:46,hebrew:"עֵקֶב",book:5,verses:"7:12-11:25",haft:{k:"Isaiah",b:"49:14",e:"51:3"},fullkriyah:{"1":{b:"7:12",e:"8:10"},"2":{b:"8:11",e:"9:3"},"3":{b:"9:4",e:"9:29"},"4":{b:"10:1",e:"10:11"},"5":{b:"10:12",e:"11:9"},"6":{b:"11:10",e:"11:21"},"7":{b:"11:22",e:"11:25"},M:{b:"11:22",e:"11:25"}},weekday:{"1":{b:"7:12",e:"7:21"},"2":{b:"7:22",e:"8:3"},"3":{b:"8:4",e:"8:10"}},triennial:{years:{"Y.1":{"1":{b:"7:12",e:"7:16"},"2":{b:"7:17",e:"7:21"},"3":{b:"7:22",e:"7:26"},"4":{b:"8:1",e:"8:3"},"5":{b:"8:4",e:"8:10"},"6":{b:"8:11",e:"8:18"},"7":{b:"8:19",e:"9:3"},M:{b:"9:1",e:"9:3"}},"Y.2":{"1":{b:"9:4",e:"9:10"},"2":{b:"9:11",e:"9:14"},"3":{b:"9:15",e:"9:21"},"4":{b:"9:22",e:"9:29"},"5":{b:"10:1",e:"10:5"},"6":{b:"10:6",e:"10:8"},"7":{b:"10:9",e:"10:11"},M:{b:"10:9",e:"10:11"}},"Y.3":{"1":{b:"10:12",e:"10:15"},"2":{b:"10:16",e:"10:22"},"3":{b:"11:1",e:"11:9"},"4":{b:"11:10",e:"11:12"},"5":{b:"11:13",e:"11:15"},"6":{b:"11:16",e:"11:21"},"7":{b:"11:22",e:"11:25"},M:{b:"11:22",e:"11:25"}}}}};var Shoftim={num:48,hebrew:"שׁוֹפְטִים",book:5,verses:"16:18-21:9",haft:{k:"Isaiah",b:"51:12",e:"52:12"},fullkriyah:{"1":{b:"16:18",e:"17:13"},"2":{b:"17:14",e:"17:20"},"3":{b:"18:1",e:"18:5"},"4":{b:"18:6",e:"18:13"},"5":{b:"18:14",e:"19:13"},"6":{b:"19:14",e:"20:9"},"7":{b:"20:10",e:"21:9"},M:{b:"21:7",e:"21:9"}},weekday:{"1":{b:"16:18",e:"16:20"},"2":{b:"16:21",e:"17:10"},"3":{b:"17:11",e:"17:13"}},triennial:{years:{"Y.1":{"1":{b:"16:18",e:"16:20"},"2":{b:"16:21",e:"17:7"},"3":{b:"17:8",e:"17:10"},"4":{b:"17:11",e:"17:13"},"5":{b:"17:14",e:"17:17"},"6":{b:"17:18",e:"17:20"},"7":{b:"18:1",e:"18:5"},M:{b:"18:3",e:"18:5"}},"Y.2":{"1":{b:"18:6",e:"18:8"},"2":{b:"18:9",e:"18:13"},"3":{b:"18:14",e:"18:17"},"4":{b:"18:18",e:"18:22"},"5":{b:"19:1",e:"19:7"},"6":{b:"19:8",e:"19:10"},"7":{b:"19:11",e:"19:13"},M:{b:"19:11",e:"19:13"}},"Y.3":{"1":{b:"19:14",e:"19:21"},"2":{b:"20:1",e:"20:4"},"3":{b:"20:5",e:"20:9"},"4":{b:"20:10",e:"20:14"},"5":{b:"20:15",e:"20:20"},"6":{b:"21:1",e:"21:6"},"7":{b:"21:7",e:"21:9"},M:{b:"21:7",e:"21:9"}}}}};var Nitzavim={num:51,hebrew:"נִצָּבִים",book:5,verses:"29:9-30:20",haft:{k:"Isaiah",b:"61:10",e:"63:9"},fullkriyah:{"1":{b:"29:9",e:"29:11"},"2":{b:"29:12",e:"29:14"},"3":{b:"29:15",e:"29:28"},"4":{b:"30:1",e:"30:6"},"5":{b:"30:7",e:"30:10"},"6":{b:"30:11",e:"30:14"},"7":{b:"30:15",e:"30:20"},M:{b:"30:15",e:"30:20"}},weekday:{"1":{b:"29:9",e:"29:11"},"2":{b:"29:12",e:"29:14"},"3":{b:"29:15",e:"29:28"}},triennial:{descr:"When these Sidrot are not combined, they should each be read in their entirety.",variations:{"Y.1":{"1":{b:"29:9",e:"29:11"},"2":{b:"29:12",e:"29:14"},"3":{b:"29:15",e:"29:28"},"4":{b:"30:1",e:"30:6"},"5":{b:"30:7",e:"30:10"},"6":{b:"30:11",e:"30:14"},"7":{b:"30:15",e:"30:20"},M:{b:"30:15",e:"30:20"}},"Y.2":"Y.1","Y.3":"Y.1"}}};var Vayeilech={num:52,hebrew:"וַיֵּלֶךְ",book:5,verses:"31:1-31:30",haft:{k:"Isaiah",b:"55:6",e:"56:8"},fullkriyah:{"1":{b:"31:1",e:"31:3"},"2":{b:"31:4",e:"31:6"},"3":{b:"31:7",e:"31:9"},"4":{b:"31:10",e:"31:13"},"5":{b:"31:14",e:"31:19"},"6":{b:"31:20",e:"31:24"},"7":{b:"31:25",e:"31:30"},M:{b:"31:28",e:"31:30"}},weekday:{"1":{b:"31:1",e:"31:3"},"2":{b:"31:4",e:"31:6"},"3":{b:"31:7",e:"31:13"}},triennial:{descr:"When these Sidrot are not combined, they should each be read in their entirety.",variations:{"Y.1":{"1":{b:"31:1",e:"31:3"},"2":{b:"31:4",e:"31:6"},"3":{b:"31:7",e:"31:9"},"4":{b:"31:10",e:"31:13"},"5":{b:"31:14",e:"31:19"},"6":{b:"31:20",e:"31:24"},"7":{b:"31:25",e:"31:30"},M:{b:"31:28",e:"31:30"}},"Y.2":"Y.1","Y.3":"Y.1"}}};var parshiyotObj = {Bereshit:Bereshit,Noach:Noach,"Lech-Lecha":{num:3,hebrew:"לֶךְ־לְךָ",book:1,verses:"12:1-17:27",haft:{k:"Isaiah",b:"40:27",e:"41:16"},fullkriyah:{"1":{b:"12:1",e:"12:13"},"2":{b:"12:14",e:"13:4"},"3":{b:"13:5",e:"13:18"},"4":{b:"14:1",e:"14:20"},"5":{b:"14:21",e:"15:6"},"6":{b:"15:7",e:"17:6"},"7":{b:"17:7",e:"17:27"},M:{b:"17:24",e:"17:27"}},weekday:{"1":{b:"12:1",e:"12:3"},"2":{b:"12:4",e:"12:9"},"3":{b:"12:10",e:"12:13"}},triennial:{years:{"Y.1":{"1":{b:"12:1",e:"12:3"},"2":{b:"12:4",e:"12:9"},"3":{b:"12:10",e:"12:13"},"4":{b:"12:14",e:"12:20"},"5":{b:"13:1",e:"13:4"},"6":{b:"13:5",e:"13:11"},"7":{b:"13:12",e:"13:18"},M:{b:"13:16",e:"13:18"}},"Y.2":{"1":{b:"14:1",e:"14:9"},"2":{b:"14:10",e:"14:16"},"3":{b:"14:17",e:"14:20"},"4":{b:"14:21",e:"14:24"},"5":{b:"15:1",e:"15:6"},"6":{b:"15:7",e:"15:16"},"7":{b:"15:17",e:"15:21"},M:{b:"15:17",e:"15:21"}},"Y.3":{"1":{b:"16:1",e:"16:6"},"2":{b:"16:7",e:"16:9"},"3":{b:"16:10",e:"16:16"},"4":{b:"17:1",e:"17:6"},"5":{b:"17:7",e:"17:17"},"6":{b:"17:18",e:"17:23"},"7":{b:"17:24",e:"17:27"},M:{b:"17:24",e:"17:27"}}}}},Vayera:Vayera,"Chayei Sara":{num:5,hebrew:"חַיֵּי שָֹרָה",book:1,verses:"23:1-25:18",haft:{k:"I Kings",b:"1:1",e:"1:31"},fullkriyah:{"1":{b:"23:1",e:"23:16"},"2":{b:"23:17",e:"24:9"},"3":{b:"24:10",e:"24:26"},"4":{b:"24:27",e:"24:52"},"5":{b:"24:53",e:"24:67"},"6":{b:"25:1",e:"25:11"},"7":{b:"25:12",e:"25:18"},M:{b:"25:16",e:"25:18"}},weekday:{"1":{b:"23:1",e:"23:7"},"2":{b:"23:8",e:"23:12"},"3":{b:"23:13",e:"23:16"}},triennial:{years:{"Y.1":{"1":{b:"23:1",e:"23:4"},"2":{b:"23:5",e:"23:7"},"3":{b:"23:8",e:"23:12"},"4":{b:"23:13",e:"23:16"},"5":{b:"23:17",e:"23:20"},"6":{b:"24:1",e:"24:4"},"7":{b:"24:5",e:"24:9"},M:{b:"24:5",e:"24:9"}},"Y.2":{"1":{b:"24:10",e:"24:14"},"2":{b:"24:15",e:"24:20"},"3":{b:"24:21",e:"24:26"},"4":{b:"24:27",e:"24:33"},"5":{b:"24:34",e:"24:41"},"6":{b:"24:42",e:"24:49"},"7":{b:"24:50",e:"24:52"},M:{b:"24:50",e:"24:52"}},"Y.3":{"1":{b:"24:53",e:"24:58"},"2":{b:"24:59",e:"24:61"},"3":{b:"24:62",e:"24:67"},"4":{b:"25:1",e:"25:6"},"5":{b:"25:7",e:"25:11"},"6":{b:"25:12",e:"25:15"},"7":{b:"25:16",e:"25:18"},M:{b:"25:16",e:"25:18"}}}}},Toldot:Toldot,Vayetzei:Vayetzei,Vayishlach:Vayishlach,Vayeshev:Vayeshev,Miketz:Miketz,Vayigash:Vayigash,Vayechi:Vayechi,Shemot:Shemot,Vaera:Vaera,Bo:Bo,Beshalach:Beshalach,Yitro:Yitro,Mishpatim:Mishpatim,Terumah:Terumah,Tetzaveh:Tetzaveh,"Ki Tisa":{num:21,hebrew:"כִּי תִשָּׂא",book:2,verses:"30:11-34:35",haft:{k:"I Kings",b:"18:1",e:"18:39"},seph:{k:"I Kings",b:"18:20",e:"18:39"},fullkriyah:{"1":{b:"30:11",e:"31:17"},"2":{b:"31:18",e:"33:11"},"3":{b:"33:12",e:"33:16"},"4":{b:"33:17",e:"33:23"},"5":{b:"34:1",e:"34:9"},"6":{b:"34:10",e:"34:26"},"7":{b:"34:27",e:"34:35"},M:{b:"34:33",e:"34:35"}},weekday:{"1":{b:"30:11",e:"30:13"},"2":{b:"30:14",e:"30:16"},"3":{b:"30:17",e:"30:21"}},triennial:{years:{"Y.1":{"1":{b:"30:11",e:"30:13"},"2":{b:"30:14",e:"30:16"},"3":{b:"30:17",e:"30:21"},"4":{b:"30:22",e:"30:33"},"5":{b:"30:34",e:"30:38"},"6":{b:"31:1",e:"31:11"},"7":{b:"31:12",e:"31:17"},M:{b:"31:15",e:"31:17"}},"Y.2":{"1":{b:"31:18",e:"32:6"},"2":{b:"32:7",e:"32:11"},"3":{b:"32:12",e:"32:14"},"4":{b:"32:15",e:"32:24"},"5":{b:"32:25",e:"32:29"},"6":{b:"32:30",e:"33:6"},"7":{b:"33:7",e:"33:11"},M:{b:"33:9",e:"33:11"}},"Y.3":{"1":{b:"33:12",e:"33:16"},"2":{b:"33:17",e:"33:23"},"3":{b:"34:1",e:"34:9"},"4":{b:"34:10",e:"34:17"},"5":{b:"34:18",e:"34:21"},"6":{b:"34:22",e:"34:26"},"7":{b:"34:27",e:"34:35"},M:{b:"34:33",e:"34:35"}}}}},Vayakhel:Vayakhel,Pekudei:Pekudei,Vayikra:Vayikra,Tzav:Tzav,Shmini:Shmini,Tazria:Tazria,Metzora:Metzora,"Achrei Mot":{num:29,hebrew:"אַחֲרֵי מוֹת",book:3,verses:"16:1-18:30",haft:{k:"Ezekiel",b:"22:1",e:"22:19"},seph:{k:"Ezekiel",b:"22:1",e:"22:16"},fullkriyah:{"1":{b:"16:1",e:"16:17"},"2":{b:"16:18",e:"16:24"},"3":{b:"16:25",e:"16:34"},"4":{b:"17:1",e:"17:7"},"5":{b:"17:8",e:"18:5"},"6":{b:"18:6",e:"18:21"},"7":{b:"18:22",e:"18:30"},M:{b:"18:28",e:"18:30"}},weekday:{"1":{b:"16:1",e:"16:6"},"2":{b:"16:7",e:"16:11"},"3":{b:"16:12",e:"16:17"}},triennial:{variations:{"D.1":{"1":{b:"16:1",e:"16:3"},"2":{b:"16:4",e:"16:6"},"3":{b:"16:7",e:"16:11"},"4":{b:"16:12",e:"16:17"},"5":{b:"16:18",e:"16:24"},"6":{b:"16:25",e:"16:30"},"7":{b:"16:31",e:"16:34"},M:{b:"16:31",e:"16:34"}},"B.2":{"1":{b:"17:1",e:"17:7"},"2":{b:"17:8",e:"17:12"},"3":{b:"17:13",e:"17:16"},"4":{b:"18:1",e:"18:5"},"5":{b:"18:6",e:"18:21"},"6":{b:"18:22",e:"18:25"},"7":{b:"18:26",e:"18:30"},M:{b:"18:26",e:"18:30"}},"A.3":"B.2","C.1":{"1":{b:"16:1",e:"16:6"},"2":{b:"16:7",e:"16:11"},"3":{b:"16:12",e:"16:17"},"4":{b:"16:18",e:"16:24"},"5":{b:"16:25",e:"16:30"},"6":{b:"16:31",e:"16:34"},"7":{b:"17:1",e:"17:7"},M:{b:"17:5",e:"17:7"}},"D.3":"B.2"}}},Kedoshim:Kedoshim,Emor:Emor,Behar:Behar,Bechukotai:Bechukotai,Bamidbar:Bamidbar,Nasso:Nasso,"Beha'alotcha":{num:36,hebrew:"בְּהַעֲלֹתְךָ",book:4,verses:"8:1-12:16",haft:{k:"Zechariah",b:"2:14",e:"4:7"},fullkriyah:{"1":{b:"8:1",e:"8:14"},"2":{b:"8:15",e:"8:26"},"3":{b:"9:1",e:"9:14"},"4":{b:"9:15",e:"10:10"},"5":{b:"10:11",e:"10:34"},"6":{b:"10:35",e:"11:29"},"7":{b:"11:30",e:"12:16"},M:{b:"12:14",e:"12:16"}},weekday:{"1":{b:"8:1",e:"8:4"},"2":{b:"8:5",e:"8:9"},"3":{b:"8:10",e:"8:14"}},triennial:{years:{"Y.1":{"1":{b:"8:1",e:"8:4"},"2":{b:"8:5",e:"8:9"},"3":{b:"8:10",e:"8:14"},"4":{b:"8:15",e:"8:22"},"5":{b:"8:23",e:"8:26"},"6":{b:"9:1",e:"9:8"},"7":{b:"9:9",e:"9:14"},M:{b:"9:12",e:"9:14"}},"Y.2":{"1":{b:"9:15",e:"9:18"},"2":{b:"9:19",e:"9:23"},"3":{b:"10:1",e:"10:7"},"4":{b:"10:8",e:"10:10"},"5":{b:"10:11",e:"10:20"},"6":{b:"10:21",e:"10:28"},"7":{b:"10:29",e:"10:34"},M:{b:"10:32",e:"10:34"}},"Y.3":{"1":{b:"10:35",e:"11:9"},"2":{b:"11:10",e:"11:18"},"3":{b:"11:19",e:"11:22"},"4":{b:"11:23",e:"11:29"},"5":{b:"11:30",e:"11:35"},"6":{b:"12:1",e:"12:13"},"7":{b:"12:14",e:"12:16"},M:{b:"12:14",e:"12:16"}}}}},"Sh'lach":{num:37,hebrew:"שְׁלַח־לְךָ",book:4,verses:"13:1-15:41",haft:{k:"Joshua",b:"2:1",e:"2:24"},fullkriyah:{"1":{b:"13:1",e:"13:20"},"2":{b:"13:21",e:"14:7"},"3":{b:"14:8",e:"14:25"},"4":{b:"14:26",e:"15:7"},"5":{b:"15:8",e:"15:16"},"6":{b:"15:17",e:"15:26"},"7":{b:"15:27",e:"15:41"},M:{b:"15:37",e:"15:41"}},weekday:{"1":{b:"13:1",e:"13:3"},"2":{b:"13:4",e:"13:16"},"3":{b:"13:17",e:"13:20"}},triennial:{years:{"Y.1":{"1":{b:"13:1",e:"13:3"},"2":{b:"13:4",e:"13:16"},"3":{b:"13:17",e:"13:20"},"4":{b:"13:21",e:"13:24"},"5":{b:"13:25",e:"13:30"},"6":{b:"13:31",e:"13:33"},"7":{b:"14:1",e:"14:7"},M:{b:"14:5",e:"14:7"}},"Y.2":{"1":{b:"14:8",e:"14:10"},"2":{b:"14:11",e:"14:20"},"3":{b:"14:21",e:"14:25"},"4":{b:"14:26",e:"14:38"},"5":{b:"14:39",e:"14:42"},"6":{b:"14:43",e:"15:3"},"7":{b:"15:4",e:"15:7"},M:{b:"15:4",e:"15:7"}},"Y.3":{"1":{b:"15:8",e:"15:10"},"2":{b:"15:11",e:"15:16"},"3":{b:"15:17",e:"15:21"},"4":{b:"15:22",e:"15:26"},"5":{b:"15:27",e:"15:31"},"6":{b:"15:32",e:"15:36"},"7":{b:"15:37",e:"15:41"},M:{b:"15:37",e:"15:41"}}}}},Korach:Korach,Chukat:Chukat,Balak:Balak,Pinchas:Pinchas,Matot:Matot,Masei:Masei,Devarim:Devarim,Vaetchanan:Vaetchanan,Eikev:Eikev,"Re'eh":{num:47,hebrew:"רְאֵה",book:5,verses:"11:26-16:17",haft:{k:"Isaiah",b:"54:11",e:"55:5"},fullkriyah:{"1":{b:"11:26",e:"12:10"},"2":{b:"12:11",e:"12:28"},"3":{b:"12:29",e:"13:19"},"4":{b:"14:1",e:"14:21"},"5":{b:"14:22",e:"14:29"},"6":{b:"15:1",e:"15:18"},"7":{b:"15:19",e:"16:17"},M:{b:"16:13",e:"16:17"}},weekday:{"1":{b:"11:26",e:"11:31"},"2":{b:"11:32",e:"12:5"},"3":{b:"12:6",e:"12:10"}},triennial:{years:{"Y.1":{"1":{b:"11:26",e:"11:31"},"2":{b:"11:32",e:"12:5"},"3":{b:"12:6",e:"12:10"},"4":{b:"12:11",e:"12:16"},"5":{b:"12:17",e:"12:19"},"6":{b:"12:20",e:"12:25"},"7":{b:"12:26",e:"12:28"},M:{b:"12:26",e:"12:28"}},"Y.2":{"1":{b:"12:29",e:"13:1"},"2":{b:"13:2",e:"13:6"},"3":{b:"13:7",e:"13:12"},"4":{b:"13:13",e:"13:19"},"5":{b:"14:1",e:"14:8"},"6":{b:"14:9",e:"14:21"},"7":{b:"14:22",e:"14:29"},M:{b:"14:22",e:"14:29"}},"Y.3":{"1":{b:"15:1",e:"15:6"},"2":{b:"15:7",e:"15:11"},"3":{b:"15:12",e:"15:18"},"4":{b:"15:19",e:"15:23"},"5":{b:"16:1",e:"16:8"},"6":{b:"16:9",e:"16:12"},"7":{b:"16:13",e:"16:17"},M:{b:"16:13",e:"16:17"}}}}},Shoftim:Shoftim,"Ki Teitzei":{num:49,hebrew:"כִּי־תֵצֵא",book:5,verses:"21:10-25:19",haft:{k:"Isaiah",b:"54:1",e:"54:10"},fullkriyah:{"1":{b:"21:10",e:"21:21"},"2":{b:"21:22",e:"22:7"},"3":{b:"22:8",e:"23:7"},"4":{b:"23:8",e:"23:24"},"5":{b:"23:25",e:"24:4"},"6":{b:"24:5",e:"24:13"},"7":{b:"24:14",e:"25:19"},M:{b:"25:17",e:"25:19"}},weekday:{"1":{b:"21:10",e:"21:14"},"2":{b:"21:15",e:"21:17"},"3":{b:"21:18",e:"21:21"}},triennial:{years:{"Y.1":{"1":{b:"21:10",e:"21:14"},"2":{b:"21:15",e:"21:17"},"3":{b:"21:18",e:"21:21"},"4":{b:"21:22",e:"22:7"},"5":{b:"22:8",e:"22:12"},"6":{b:"22:13",e:"22:29"},"7":{b:"23:1",e:"23:7"},M:{b:"23:4",e:"23:7"}},"Y.2":{"1":{b:"23:8",e:"23:12"},"2":{b:"23:13",e:"23:15"},"3":{b:"23:16",e:"23:19"},"4":{b:"23:20",e:"23:24"},"5":{b:"23:25",e:"24:4"},"6":{b:"24:5",e:"24:9"},"7":{b:"24:10",e:"24:13"},M:{b:"24:10",e:"24:13"}},"Y.3":{"1":{b:"24:14",e:"24:16"},"2":{b:"24:17",e:"24:19"},"3":{b:"24:20",e:"24:22"},"4":{b:"25:1",e:"25:4"},"5":{b:"25:5",e:"25:10"},"6":{b:"25:11",e:"25:16"},"7":{b:"25:17",e:"25:19"},M:{b:"25:17",e:"25:19"}}}}},"Ki Tavo":{num:50,hebrew:"כִּי־תָבוֹא",book:5,verses:"26:1-29:8",haft:{k:"Isaiah",b:"60:1",e:"60:22"},fullkriyah:{"1":{b:"26:1",e:"26:11"},"2":{b:"26:12",e:"26:15"},"3":{b:"26:16",e:"26:19"},"4":{b:"27:1",e:"27:10"},"5":{b:"27:11",e:"28:6"},"6":{b:"28:7",e:"28:69"},"7":{b:"29:1",e:"29:8"},M:{b:"29:6",e:"29:8"}},weekday:{"1":{b:"26:1",e:"26:3"},"2":{b:"26:4",e:"26:11"},"3":{b:"26:12",e:"26:15"}},triennial:{years:{"Y.1":{"1":{b:"26:1",e:"26:3"},"2":{b:"26:4",e:"26:8"},"3":{b:"26:9",e:"26:11"},"4":{b:"26:12",e:"26:15"},"5":{b:"26:16",e:"26:19"},"6":{b:"27:1",e:"27:4"},"7":{b:"27:5",e:"27:10"},M:{b:"27:7",e:"27:10"}},"Y.2":{"1":{b:"26:12",e:"26:15"},"2":{b:"26:16",e:"26:19"},"3":{b:"27:1",e:"27:3"},"4":{b:"27:4",e:"27:8"},"5":{b:"27:6",e:"27:10"},"6":{b:"27:11",e:"28:3"},"7":{b:"28:4",e:"28:6"},M:{b:"28:4",e:"28:6"}},"Y.3":{"1":{b:"27:11",e:"28:3"},"2":{b:"28:4",e:"28:6"},"3":{b:"28:7",e:"28:11"},"4":{b:"28:12",e:"28:14"},"5":{b:"28:15",e:"28:69"},"6":{b:"29:1",e:"29:5"},"7":{b:"29:6",e:"29:8"},M:{b:"29:6",e:"29:8"}}}}},Nitzavim:Nitzavim,Vayeilech:Vayeilech,"Ha'Azinu":{num:53,hebrew:"הַאֲזִינוּ",book:5,verses:"32:1-32:52",haft:{k:"II Samuel",b:"22:1",e:"22:51"},fullkriyah:{"1":{b:"32:1",e:"32:6"},"2":{b:"32:7",e:"32:12"},"3":{b:"32:13",e:"32:18"},"4":{b:"32:19",e:"32:28"},"5":{b:"32:29",e:"32:39"},"6":{b:"32:40",e:"32:43"},"7":{b:"32:44",e:"32:52"},M:{b:"32:48",e:"32:52"}},weekday:{"1":{b:"32:1",e:"32:3"},"2":{b:"32:4",e:"32:6"},"3":{b:"32:7",e:"32:12"}},triennial:{descr:"every year",variations:{"Y.1":{"1":{b:"32:1",e:"32:6"},"2":{b:"32:7",e:"32:12"},"3":{b:"32:13",e:"32:18"},"4":{b:"32:19",e:"32:28"},"5":{b:"32:29",e:"32:39"},"6":{b:"32:40",e:"32:43"},"7":{b:"32:44",e:"32:52"},M:{b:"32:48",e:"32:52"}},"Y.2":"Y.1","Y.3":"Y.1"}}},"Vezot Haberakhah":{num:54,hebrew:"וְזֹאת הַבְּרָכָה",book:5,verses:"33:1-34:12",haft:{k:"Joshua",b:"1:1",e:"1:18"},seph:{k:"Joshua",b:"1:1",e:"1:9"},fullkriyah:{"1":{b:"33:1",e:"33:7"},"2":{b:"33:8",e:"33:12"},"3":{b:"33:13",e:"33:17"},"4":{b:"33:18",e:"33:21"},"5":{b:"33:22",e:"33:26"},"6":{b:"33:27",e:"33:29"},"7":{b:"34:1",e:"34:12"}},weekday:{"1":{b:"33:1",e:"33:7"},"2":{b:"33:8",e:"33:12"},"3":{b:"33:13",e:"33:17"}},triennial:{descr:"האזינו-וזאת הברכה should both be read in their entirety due to their brief length",variations:{"Y.1":{"1":{b:"33:1",e:"33:7"},"2":{b:"33:8",e:"33:12"},"3":{b:"33:13",e:"33:17"},"4":{b:"33:18",e:"33:21"},"5":{b:"33:22",e:"33:26"},"6":{b:"33:27",e:"33:29"},"7":{b:"34:1",e:"34:12"}},"Y.2":"Y.1","Y.3":"Y.1"}}},"Vayakhel-Pekudei":{num:101,combined:true,p1:"Vayakhel",p2:"Pekudei",num1:22,num2:23,book:2,verses:"35:1-40:38",fullkriyah:{"1":{b:"35:1",e:"35:29"},"2":{b:"35:30",e:"37:16"},"3":{b:"37:17",e:"37:29"},"4":{b:"38:1",e:"39:1"},"5":{b:"39:2",e:"39:21"},"6":{b:"39:22",e:"39:43"},"7":{b:"40:1",e:"40:38"},M:{b:"40:34",e:"40:38"}},triennial:{descr:"Aliyot Divisions for Combined Sidrot",years:{"Y.1":{"1":{b:"35:1",e:"35:10"},"2":{b:"35:11",e:"35:20"},"3":{b:"35:21",e:"35:29"},"4":{b:"35:30",e:"36:7"},"5":{b:"36:8",e:"36:19"},"6":{b:"36:20",e:"36:38"},"7":{b:"37:1",e:"37:16"},M:{b:"37:10",e:"37:16"}},"Y.2":{"1":{b:"37:17",e:"37:24"},"2":{b:"37:25",e:"37:29"},"3":{b:"38:1",e:"38:8"},"4":{b:"38:9",e:"38:20"},"5":{b:"38:21",e:"39:1"},"6":{b:"39:2",e:"39:7"},"7":{b:"39:8",e:"39:21"},M:{b:"39:19",e:"39:21"}},"Y.3":{"1":{b:"39:22",e:"39:26"},"2":{b:"39:27",e:"39:32"},"3":{b:"39:33",e:"39:43"},"4":{b:"40:1",e:"40:8"},"5":{b:"40:9",e:"40:16"},"6":{b:"40:17",e:"40:27"},"7":{b:"40:28",e:"40:38"},M:{b:"40:34",e:"40:38"}}},patterns:{TTS:"A",TST:"B",TSS:"C",SST:"D",STS:"E",STT:"F"}}},"Tazria-Metzora":{num:102,combined:true,p1:"Tazria",p2:"Metzora",num1:27,num2:28,book:3,verses:"12:1-15:33",fullkriyah:{"1":{b:"12:1",e:"13:23"},"2":{b:"13:24",e:"13:39"},"3":{b:"13:40",e:"13:54"},"4":{b:"13:55",e:"14:20"},"5":{b:"14:21",e:"14:32"},"6":{b:"14:33",e:"15:15"},"7":{b:"15:16",e:"15:33"},M:{b:"15:31",e:"15:33"}},triennial:{descr:"Aliyot Divisions for Combined Sidrot",years:{"Y.1":{"1":{b:"12:1",e:"12:4"},"2":{b:"12:5",e:"12:8"},"3":{b:"13:1",e:"13:5"},"4":{b:"13:6",e:"13:17"},"5":{b:"13:18",e:"13:23"},"6":{b:"13:24",e:"13:28"},"7":{b:"13:29",e:"13:39"},M:{b:"13:37",e:"13:39"}},"Y.2":{"1":{b:"13:40",e:"13:46"},"2":{b:"13:47",e:"13:54"},"3":{b:"13:55",e:"13:59"},"4":{b:"14:1",e:"14:5"},"5":{b:"14:6",e:"14:12"},"6":{b:"14:13",e:"14:20"},"7":{b:"14:21",e:"14:32"},M:{b:"14:30",e:"14:32"}},"Y.3":{"1":{b:"14:33",e:"14:38"},"2":{b:"14:39",e:"14:47"},"3":{b:"14:48",e:"14:53"},"4":{b:"14:54",e:"15:7"},"5":{b:"15:8",e:"15:15"},"6":{b:"15:16",e:"15:28"},"7":{b:"15:29",e:"15:33"},M:{b:"15:31",e:"15:33"}}},patterns:{TTS:"A",TST:"B",STT:"C",STS:"D"}}},"Achrei Mot-Kedoshim":{num:103,combined:true,p1:"Achrei Mot",p2:"Kedoshim",num1:29,num2:30,book:3,verses:"16:1-20:27",fullkriyah:{"1":{b:"16:1",e:"16:24"},"2":{b:"16:25",e:"17:7"},"3":{b:"17:8",e:"18:21"},"4":{b:"18:22",e:"19:14"},"5":{b:"19:15",e:"19:32"},"6":{b:"19:33",e:"20:7"},"7":{b:"20:8",e:"20:27"},M:{b:"20:25",e:"20:27"}},triennial:{descr:"Aliyot Divisions for Combined Sidrot",years:{"Y.1":{"1":{b:"16:1",e:"16:6"},"2":{b:"16:7",e:"16:11"},"3":{b:"16:12",e:"16:17"},"4":{b:"16:18",e:"16:24"},"5":{b:"16:25",e:"16:30"},"6":{b:"16:31",e:"16:34"},"7":{b:"17:1",e:"17:7"},M:{b:"17:5",e:"17:7"}},"Y.2":{"1":{b:"17:8",e:"17:12"},"2":{b:"17:13",e:"17:16"},"3":{b:"18:1",e:"18:5"},"4":{b:"18:6",e:"18:21"},"5":{b:"18:22",e:"18:30"},"6":{b:"19:1",e:"19:4"},"7":{b:"19:5",e:"19:14"},M:{b:"19:11",e:"19:14"}},"Y.3":{"1":{b:"19:15",e:"19:18"},"2":{b:"19:19",e:"19:22"},"3":{b:"19:23",e:"19:32"},"4":{b:"19:33",e:"19:37"},"5":{b:"20:1",e:"20:7"},"6":{b:"20:8",e:"20:22"},"7":{b:"20:23",e:"20:27"},M:{b:"20:25",e:"20:27"}}},patterns:{TTS:"A",TST:"B",STT:"C",STS:"D"}}},"Behar-Bechukotai":{num:104,combined:true,p1:"Behar",p2:"Bechukotai",num1:32,num2:33,book:3,verses:"25:1-27:34",fullkriyah:{"1":{b:"25:1",e:"25:18"},"2":{b:"25:19",e:"25:28"},"3":{b:"25:29",e:"25:38"},"4":{b:"25:39",e:"26:9"},"5":{b:"26:10",e:"26:46"},"6":{b:"27:1",e:"27:15"},"7":{b:"27:16",e:"27:34"},M:{b:"27:32",e:"27:34"}},triennial:{descr:"Aliyot Divisions for Combined Sidrot",years:{"Y.1":{"1":{b:"25:1",e:"25:3"},"2":{b:"25:4",e:"25:7"},"3":{b:"25:8",e:"25:13"},"4":{b:"25:14",e:"25:18"},"5":{b:"25:19",e:"25:24"},"6":{b:"25:25",e:"25:28"},"7":{b:"25:29",e:"25:38"},M:{b:"25:35",e:"25:38"}},"Y.2":{"1":{b:"25:39",e:"25:43"},"2":{b:"25:44",e:"25:46"},"3":{b:"25:47",e:"25:54"},"4":{b:"25:55",e:"26:2"},"5":{b:"26:3",e:"26:5"},"6":{b:"26:6",e:"26:9"},"7":{b:"26:10",e:"26:46"},M:{b:"26:44",e:"26:46"}},"Y.3":{"1":{b:"27:1",e:"27:4"},"2":{b:"27:5",e:"27:8"},"3":{b:"27:9",e:"27:15"},"4":{b:"27:16",e:"27:21"},"5":{b:"27:22",e:"27:25"},"6":{b:"27:26",e:"27:28"},"7":{b:"27:29",e:"27:34"},M:{b:"27:32",e:"27:34"}}},patterns:{TTS:"A",TST:"B",STT:"C",STS:"D"}}},"Chukat-Balak":{num:105,combined:true,p1:"Chukat",p2:"Balak",num1:39,num2:40,book:4,verses:"19:1-25:9",fullkriyah:{"1":{b:"19:1",e:"20:6"},"2":{b:"20:7",e:"20:21"},"3":{b:"20:22",e:"21:20"},"4":{b:"21:21",e:"22:12"},"5":{b:"22:13",e:"22:38"},"6":{b:"22:39",e:"23:26"},"7":{b:"23:27",e:"25:9"},M:{b:"25:7",e:"25:9"}},triennial:{descr:"Aliyot Divisions for Combined Sidrot",years:{"Y.1":{"1":{b:"19:1",e:"19:9"},"2":{b:"19:10",e:"19:17"},"3":{b:"19:18",e:"20:6"},"4":{b:"20:7",e:"20:13"},"5":{b:"20:14",e:"20:21"},"6":{b:"20:22",e:"21:9"},"7":{b:"21:10",e:"21:20"},M:{b:"21:16",e:"21:20"}},"Y.2":{"1":{b:"21:21",e:"21:25"},"2":{b:"21:26",e:"22:1"},"3":{b:"22:2",e:"22:7"},"4":{b:"22:8",e:"22:12"},"5":{b:"22:13",e:"22:20"},"6":{b:"22:21",e:"22:30"},"7":{b:"22:31",e:"22:38"},M:{b:"22:36",e:"22:38"}},"Y.3":{"1":{b:"22:39",e:"23:5"},"2":{b:"23:6",e:"23:12"},"3":{b:"23:13",e:"23:26"},"4":{b:"23:27",e:"23:30"},"5":{b:"24:1",e:"24:13"},"6":{b:"24:14",e:"24:25"},"7":{b:"25:1",e:"25:9"},M:{b:"25:7",e:"25:9"}}},patterns:{TTS:"A",TST:"B",TSS:"C",SST:"D",STS:"E",STT:"F",SSS:"G"}}},"Matot-Masei":{num:106,combined:true,p1:"Matot",p2:"Masei",num1:42,num2:43,book:4,verses:"30:2-36:13",fullkriyah:{"1":{b:"30:2",e:"31:12"},"2":{b:"31:13",e:"31:54"},"3":{b:"32:1",e:"32:19"},"4":{b:"32:20",e:"33:49"},"5":{b:"33:50",e:"34:15"},"6":{b:"34:16",e:"35:8"},"7":{b:"35:9",e:"36:13"},M:{b:"36:11",e:"36:13"}},triennial:{descr:"Aliyot Divisions for Combined Sidrot",years:{"Y.1":{"1":{b:"30:2",e:"30:9"},"2":{b:"30:10",e:"30:13"},"3":{b:"30:14",e:"30:17"},"4":{b:"31:1",e:"31:12"},"5":{b:"31:13",e:"31:24"},"6":{b:"31:25",e:"31:41"},"7":{b:"31:42",e:"31:54"},M:{b:"31:51",e:"31:54"}},"Y.2":{"1":{b:"32:1",e:"32:4"},"2":{b:"32:5",e:"32:19"},"3":{b:"32:20",e:"32:27"},"4":{b:"32:28",e:"32:42"},"5":{b:"33:1",e:"33:6"},"6":{b:"33:7",e:"33:36"},"7":{b:"33:37",e:"33:49"},M:{b:"33:47",e:"33:49"}},"Y.3":{"1":{b:"33:50",e:"34:15"},"2":{b:"34:16",e:"34:29"},"3":{b:"35:1",e:"35:8"},"4":{b:"35:9",e:"35:15"},"5":{b:"35:16",e:"35:29"},"6":{b:"35:30",e:"35:34"},"7":{b:"36:1",e:"36:13"},M:{b:"36:10",e:"36:13"}}},patterns:{TTS:"A",TST:"B",STT:"C"}}},"Nitzavim-Vayeilech":{num:107,combined:true,p1:"Nitzavim",p2:"Vayeilech",num1:51,num2:52,book:5,verses:"29:9-31:30",fullkriyah:{"1":{b:"29:9",e:"29:28"},"2":{b:"30:1",e:"30:6"},"3":{b:"30:7",e:"30:14"},"4":{b:"30:15",e:"31:6"},"5":{b:"31:7",e:"31:13"},"6":{b:"31:14",e:"31:19"},"7":{b:"31:20",e:"31:30"},M:{b:"31:28",e:"31:30"}},triennial:{descr:"Aliyot Divisions for Combined Sidrot",years:{"Y.1":{"1":{b:"29:9",e:"29:11"},"2":{b:"29:12",e:"29:14"},"3":{b:"29:15",e:"29:28"},"4":{b:"30:1",e:"30:3"},"5":{b:"30:4",e:"30:6"},"6":{b:"30:7",e:"30:10"},"7":{b:"30:11",e:"30:14"},M:{b:"30:11",e:"30:14"}},"Y.2":{"1":{b:"30:1",e:"30:3"},"2":{b:"30:4",e:"30:6"},"3":{b:"30:7",e:"30:10"},"4":{b:"30:11",e:"30:14"},"5":{b:"30:15",e:"30:20"},"6":{b:"31:1",e:"31:3"},"7":{b:"31:4",e:"31:6"},M:{b:"31:4",e:"31:6"}},"Y.3":{"1":{b:"31:7",e:"31:9"},"2":{b:"31:10",e:"31:13"},"3":{b:"31:14",e:"31:19"},"4":{b:"31:20",e:"31:22"},"5":{b:"31:22",e:"31:24"},"6":{b:"31:25",e:"31:27"},"7":{b:"31:28",e:"31:30"},M:{b:"31:28",e:"31:30"}}},patterns:{TTS:"Y",TST:"Y",TSS:"Y",SST:"Y",STS:"Y",STT:"Y",SSS:"Y"}}}};

/**
 * Represents an aliyah
 * @private
 * @typedef {Object} Aliyah
 * @property {string} k - Book (e.g. "Numbers")
 * @property {string} b - beginning verse (e.g. "28:9")
 * @property {string} e - ending verse (e.g. "28:15")
 * @property {number} [v] - number of verses
 * @property {number} [p] - parsha number (1=Bereshit, 54=Vezot HaBracha)
 */

/**
 * Leyning for a parsha hashavua or holiday
 * @typedef {Object} Leyning
 * @property {string} summary
 * @property {Aliyah} haft - Haftarah
 * @property {string} haftara - Haftarah
 * @property {number} [haftaraNumV]
 * @property {Aliyah} [seph] - Haftarah for Sephardic
 * @property {string} [sephardic] - Haftarah for Sephardic
 * @property {number} [sephardicNumV]
 * @property {Object<string,Aliyah>} fullkriyah
 * @property {Object<string,Aliyah>} [weekday]
 * @property {Object} [reason]
 */

/**
 * Based on the event date, type and title, finds the relevant leyning key
 * @param {Event} e event
 * @param {boolean} [il] true if Israel holiday scheme
 * @return {string} key to look up in holiday-reading.json
 */

function getLeyningKeyForEvent(e) {
  var il = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (e.getFlags() & HOLIDAY_IGNORE_MASK) {
    return undefined;
  }

  var hd = e.getDate();
  var day = hd.getDate();
  var desc = e.getDesc();
  var dow = hd.abs() % 7;
  var month = hd.getMonth();
  var isShabbat = dow == 6;
  var isRoshChodesh = day == 1 || day == 30;

  if (day == 1 && month === core.months.TISHREI) {
    return isShabbat ? 'Rosh Hashana I (on Shabbat)' : 'Rosh Hashana I';
  } else if (e.cholHaMoedDay) {
    // Sukkot or Pesach
    var holiday = desc.substring(0, desc.indexOf(' '));

    if (isShabbat) {
      return holiday + ' Shabbat Chol ha-Moed';
    } else if (desc == 'Sukkot VII (Hoshana Raba)') {
      return 'Sukkot Final Day (Hoshana Raba)';
    } // If Shabbat falls on the third day of Chol ha-Moed Pesach,
    // the readings for the third, fourth, and fifth days are moved ahead


    var cholHaMoedDay = e.cholHaMoedDay;

    if (holiday == 'Pesach' && cholHaMoedDay >= 3) {
      if (dow == 0 && cholHaMoedDay == 4) {
        cholHaMoedDay = 3;
      } else if (dow == 1 && cholHaMoedDay == 5) {
        cholHaMoedDay = 4;
      }
    }

    return "".concat(holiday, " Chol ha-Moed Day ").concat(cholHaMoedDay);
  } else if (e.chanukahDay) {
    if (isShabbat && isRoshChodesh) {
      return 'Shabbat Rosh Chodesh Chanukah';
    } else if (isRoshChodesh && e.chanukahDay == 7) {
      return "Chanukah Day 7 (on Rosh Chodesh)";
    } else {
      return "Chanukah Day ".concat(e.chanukahDay);
    }
  }

  if (isRoshChodesh && (desc == 'Shabbat HaChodesh' || desc == 'Shabbat Shekalim')) {
    return desc + ' (on Rosh Chodesh)';
  }

  if (desc == 'Shavuot') {
    return 'Shavuot I';
  } else if (il && desc == 'Shmini Atzeret') {
    return 'Simchat Torah';
  }

  if (isShabbat && 'Shabbat' != desc.substring(0, 7)) {
    var desc2 = desc + ' (on Shabbat)';

    if (festivals[desc2]) {
      return desc2;
    }
  }

  if (festivals[desc]) {
    return desc;
  }

  if (isShabbat) {
    if (isRoshChodesh) {
      if (day === 30 && month === core.months.KISLEV || day === 1 && month === core.months.TEVET) {
        return 'Shabbat Rosh Chodesh Chanukah';
      }

      return 'Shabbat Rosh Chodesh';
    }

    var tommorow = hd.next().getDate();

    if (tommorow === 30 || tommorow === 1) {
      return 'Shabbat Machar Chodesh';
    }
  }

  if (desc === 'Rosh Hashana LaBehemot') {
    return undefined;
  }

  if (isRoshChodesh && desc !== 'Rosh Chodesh Tevet') {
    return desc;
  }

  if (desc === 'Tish\'a B\'Av (observed)') {
    return 'Tish\'a B\'Av';
  }

  return undefined;
}
var HOLIDAY_IGNORE_MASK = core.flags.DAF_YOMI | core.flags.OMER_COUNT | core.flags.SHABBAT_MEVARCHIM | core.flags.MOLAD | core.flags.USER_EVENT | core.flags.HEBREW_DATE;
/**
 * Looks up leyning for a given holiday. Returns some
 * of full kriyah aliyot, special Maftir, special Haftarah
 * @param {Event} e the Hebcal event associated with this leyning
 * @param {boolean} [il] true if Israel holiday scheme
 * @return {Leyning} map of aliyot
 */

function getLeyningForHoliday(e) {
  var il = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!e instanceof core.Event) {
    throw new TypeError("Bad event argument: ".concat(e));
  } else if (e.getFlags() & core.flags.PARSHA_HASHAVUA) {
    throw new TypeError("Event should be a holiday: ".concat(e.getDesc()));
  } else if (e.getFlags() & HOLIDAY_IGNORE_MASK) {
    return undefined;
  }

  var key = getLeyningKeyForEvent(e, il);
  var leyning = getLeyningForHolidayKey(key);

  if (key === 'Sukkot Shabbat Chol ha-Moed') {
    leyning.fullkriyah['M'] = leyning.fullkriyah["M-day".concat(e.cholHaMoedDay)];

    for (var day = 1; day <= 5; day++) {
      delete leyning.fullkriyah["M-day".concat(day)];
    }
  }

  return leyning;
}
/**
 * @private
 * @param {string} a
 * @param {string} b
 * @return {boolean}
 */

function isChapVerseBefore(a, b) {
  var cv1 = a.split(':').map(function (x) {
    return +x;
  });
  var cv2 = b.split(':').map(function (x) {
    return +x;
  });
  return cv1[0] * 100 + cv1[1] < cv2[0] * 100 + cv2[1];
}
/**
 * Makes a summary of the leyning, like "Genesis 6:9-11:32"
 * @param {Object<string,Aliyah>} aliyot
 * @return {string}
 */


function makeLeyningSummary(aliyot) {
  var parts = makeLeyningParts(aliyot);
  return makeSummaryFromParts(parts);
}
/**
 * @private
 * @param {Aliyah[]} parts
 * @return {string}
 */

function makeSummaryFromParts(parts) {
  var prev = parts[0];
  var summary = formatAliyahShort(prev, true);

  for (var i = 1; i < parts.length; i++) {
    var part = parts[i];

    if (part.k === prev.k) {
      summary += ', ';
    } else {
      summary += "; ".concat(part.k, " ");
    }

    summary += formatAliyahShort(part, false);
    prev = part;
  }

  return summary;
}
/**
 * @private
 * @param {Aliyah|Aliyah[]} haft
 * @return {string}
 */

function makeHaftaraSummary(haft) {
  if (!haft) {
    return haft;
  }

  var parts = Array.isArray(haft) ? haft : [haft];
  var str = makeSummaryFromParts(parts); // return str.replace(/-/g, ' - ');

  return str;
}
/**
 * @private
 * @param {Object<string,Aliyah>} aliyot
 * @return {Aliyah[]}
 */


function makeLeyningParts(aliyot) {
  var nums = Object.keys(aliyot);
  var start = aliyot[nums[0]];
  var end = start;
  var parts = [];

  for (var i = 0; i < nums.length; i++) {
    var num = nums[i];
    var aliyah = aliyot[num];

    if (i === nums.length - 1 && aliyah.k === end.k && aliyah.e === end.e) {
      // short-circuit when final aliyah is within the previous (e.g. M inside of 7)
      continue;
    }

    var prevEndChap = +end.e.split(':')[0];
    var curStartChap = +aliyah.b.split(':')[0];
    var sameOrNextChap = curStartChap === prevEndChap || curStartChap === prevEndChap + 1;

    if (i !== 0 && (aliyah.k !== start.k || isChapVerseBefore(aliyah.b, start.e) || !sameOrNextChap)) {
      parts.push({
        k: start.k,
        b: start.b,
        e: end.e
      });
      start = aliyah;
    }

    end = aliyah;
  }

  parts.push({
    k: start.k,
    b: start.b,
    e: end.e
  });
  return parts;
}
/**
 * @private
 * @param {Object.<string,string>} haft
 * @return {Object.<string,string>}
 */

function cloneHaftara(haft) {
  if (!haft) {
    return haft;
  }

  var dest = clone(haft);

  if (Array.isArray(dest)) {
    dest.map(calculateNumVerses);
  } else {
    calculateNumVerses(dest);
  }

  return dest;
}
/**
 * @private
 * @param {Aliyah|Aliyah[]} haft
 * @return {number}
 */


function calculateHaftaraNumV(haft) {
  return Array.isArray(haft) ? haft.reduce(function (prev, cur) {
    return prev + cur.v;
  }, 0) : haft.v;
}
/**
 * Looks up leyning for a given holiday key. Key should be an
 * (untranslated) string used in holiday-readings.json. Returns some
 * of full kriyah aliyot, special Maftir, special Haftarah
 * @param {string} key name from `holiday-readings.json` to find
 * @return {Leyning} map of aliyot
 */


function getLeyningForHolidayKey(key) {
  if (typeof key !== 'string') {
    return undefined;
  }

  if (key.length > 14 && key.substring(0, 13) === 'Rosh Chodesh ') {
    key = 'Rosh Chodesh';
  }

  var src = festivals[key];

  if (typeof src === 'undefined') {
    return undefined;
  }

  var leyning = Object.create(null);

  if (src.fullkriyah) {
    if (_typeof(src.fullkriyah['1']) === 'object') {
      var parts = makeLeyningParts(src.fullkriyah);
      leyning.summary = makeSummaryFromParts(parts);

      if (parts.length > 1) {
        leyning.summaryParts = parts;
      }
    }

    leyning.fullkriyah = clone(src.fullkriyah);
    Object.values(leyning.fullkriyah).map(function (aliyah) {
      return calculateNumVerses(aliyah);
    });
  }

  if (src.haft) {
    var haft = leyning.haft = cloneHaftara(src.haft);
    leyning.haftara = makeHaftaraSummary(haft);
    leyning.haftaraNumV = calculateHaftaraNumV(haft);
  }

  return leyning;
}
/**
 * Formats parsha as a string
 * @private
 * @param {string[]} parsha
 * @return {string}
 */

function parshaToString(parsha) {
  var s = parsha[0];

  if (parsha.length == 2) {
    s += '-' + parsha[1];
  }

  return s;
}
/**
 * on doubled parshiot, read only the second Haftarah
 * except for Nitzavim-Vayelech
 * @private
 * @param {string[]} parsha
 * @return {string}
 */

function getHaftaraKey(parsha) {
  if (parsha.length == 1 || parsha[0] == 'Nitzavim') {
    return parsha[0];
  } else {
    return parsha[1];
  }
}
/**
 * @private
 * @param {Object<string,Aliyah>} aliyot
 */


function aliyotCombine67(aliyot) {
  var a6 = clone(aliyot['6']);
  var a7 = aliyot['7'];

  if (a6.k !== a7.k) {
    throw new Error('Impossible to combine aliyot 6 & 7: ' + JSON.stringify(aliyot));
  }

  delete aliyot['7'];
  aliyot['6'] = {
    k: a6.k,
    b: a6.b,
    e: a7.e
  };

  if (a6.v && a7.v) {
    aliyot['6'].v = a6.v + a7.v;
  }
}
/**
 * @private
 * @param {Object<string,Aliyah>} aliyot
 * @param {Object<string,Aliyah>} special
 */


function mergeAliyotWithSpecial(aliyot, special) {
  if (special['7']) {
    aliyotCombine67(aliyot);
    aliyot['7'] = clone(special['7']);
    calculateNumVerses(aliyot['7']);
  }

  if (special['M']) {
    aliyot['M'] = clone(special['M']);
    calculateNumVerses(aliyot['M']);
  }
}
/**
 * @private
 * @param {Event} e
 * @param {string} key
 * @return {string}
 */


function getChanukahShabbatKey(e, key) {
  if (key == 'Shabbat Rosh Chodesh Chanukah') {
    return undefined;
  }

  if (e.chanukahDay) {
    return e.chanukahDay == 8 ? 'Shabbat Chanukah II' : 'Shabbat Chanukah';
  }

  return undefined;
}
/**
 * @private
 * @param {Event} ev the Hebcal event associated with this leyning
 * @return {any}
 */


function getSpecialHaftara(ev) {
  if (!ev instanceof core.Event) {
    throw new TypeError("Bad event argument: ".concat(ev));
  } else if (ev.getFlags() != core.flags.PARSHA_HASHAVUA) {
    throw new TypeError("Event must be parsha hashavua: ".concat(ev.getDesc()));
  }

  var parsha = ev.parsha;
  var name = parshaToString(parsha); // untranslated

  var hd = ev.getDate();
  var day = hd.getDate();

  if (name === 'Pinchas') {
    var month = hd.getMonth();

    if (month > core.months.TAMUZ || month === core.months.TAMUZ && day > 17) {
      return {
        haft: {
          k: 'Jeremiah',
          b: '1:1',
          e: '2:3'
        },
        reason: 'Pinchas occurring after 17 Tammuz'
      };
    }
  } else if ((day === 30 || day === 1) && (name === 'Masei' || name === 'Matot-Masei')) {
    return {
      haft: [{
        k: 'Jeremiah',
        b: '2:4',
        e: '2:28'
      }, {
        k: 'Jeremiah',
        b: '3:4',
        e: '3:4'
      }, {
        k: 'Isaiah',
        b: '66:1',
        e: '66:1'
      }, {
        k: 'Isaiah',
        b: '66:23',
        e: '66:23'
      }],
      reason: "".concat(name, " on Shabbat Rosh Chodesh")
    };
  }

  return false;
}
/**
 * Looks up regular leyning for a weekly parsha with no special readings
 * @param {string|string[]} parsha untranslated name like 'Pinchas' or ['Pinchas'] or ['Matot','Masei']
 * @return {Leyning} map of aliyot
 */


function getLeyningForParsha(parsha) {
  var isParshaString = typeof parsha === 'string';

  if (!isParshaString && (!Array.isArray(parsha) || parsha.length !== 1 && parsha.length !== 2)) {
    throw new TypeError("Bad parsha argument: ".concat(parsha));
  }

  var name = isParshaString ? parsha : parshaToString(parsha);
  var raw = parshiyotObj[name];
  var fullkriyah = Object.create(null);
  var book = BOOK[raw.book];
  Object.keys(raw.fullkriyah).forEach(function (num) {
    var src = raw.fullkriyah[num];
    var reading = {
      k: book,
      b: src.b,
      e: src.e
    };
    fullkriyah[num] = reading;
  });
  Object.values(fullkriyah).map(function (aliyah) {
    return calculateNumVerses(aliyah);
  });
  var parshaNameArray = isParshaString ? raw.combined ? [raw.p1, raw.p2] : [parsha] : parsha;
  var parts = makeLeyningParts(fullkriyah);
  var summary = makeSummaryFromParts(parts);
  /** @type {Leyning} */

  var result = {
    summary: summary,
    fullkriyah: fullkriyah
  };

  if (parts.length > 1) {
    result.summaryParts = parts;
  }

  var hkey = getHaftaraKey(parshaNameArray);
  var haft0 = parshiyotObj[hkey].haft;

  if (haft0) {
    var haft = result.haft = cloneHaftara(haft0);
    result.haftara = makeHaftaraSummary(haft);
    result.haftaraNumV = calculateHaftaraNumV(haft);
  }

  if (raw.seph) {
    var seph = result.seph = cloneHaftara(raw.seph);
    result.sephardic = makeHaftaraSummary(seph);
    result.sephardicNumV = calculateHaftaraNumV(seph);
  }

  var weekdaySrc = raw.weekday || parshiyotObj[parshaNameArray[0]].weekday;

  if (weekdaySrc) {
    var weekday = result.weekday = Object.create(null);
    ['1', '2', '3'].forEach(function (num) {
      var src = weekdaySrc[num];
      var aliyah = {
        k: book,
        b: src.b,
        e: src.e
      };
      calculateNumVerses(aliyah);
      weekday[num] = aliyah;
    });
  }

  return result;
}
/**
 * Looks up leyning for a regular Shabbat parsha.
 * @param {Event} ev the Hebcal event associated with this leyning
 * @param {boolean} [il] in Israel
 * @return {Leyning} map of aliyot
 */

function getLeyningForParshaHaShavua(ev) {
  var il = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!ev instanceof core.Event) {
    throw new TypeError("Bad event argument: ".concat(ev));
  } else if (ev.getFlags() != core.flags.PARSHA_HASHAVUA) {
    throw new TypeError("Event must be parsha hashavua: ".concat(ev.getDesc()));
  } // first, collect the default aliyot and haftara


  var parsha = ev.parsha;
  var result = getLeyningForParsha(parsha);
  var reason = Object.create(null);
  var hd = ev.getDate(); // Now, check for special maftir or haftara on same date

  var specialHaftara = specialReadings(hd, il, result.fullkriyah, reason);
  var updateHaftaraSummary = false;

  if (specialHaftara) {
    result.haft = cloneHaftara(specialHaftara);
    updateHaftaraSummary = true;
  }

  if (reason['7'] || reason['M']) {
    var parts = makeLeyningParts(result.fullkriyah);
    result.summary = makeSummaryFromParts(parts);
    result.summaryParts = parts;
  }

  var specialHaftara2 = getSpecialHaftara(ev);

  if (specialHaftara2) {
    result.haft = cloneHaftara(specialHaftara2.haft);
    updateHaftaraSummary = true;
    reason.haftara = specialHaftara2.reason;
  }

  if (Object.keys(reason).length) {
    result.reason = reason;
  }

  if (updateHaftaraSummary) {
    var haft = result.haft;
    result.haftara = makeHaftaraSummary(haft);
    result.haftaraNumV = calculateHaftaraNumV(haft);
  }

  return result;
}
/**
 * @private
 * @param {HDate} hd
 * @param {boolean} il
 * @param {Object<string,Aliyah>} aliyot
 * @param {Object<string,string>} reason
 * @return {string}
 */

function specialReadings(hd, il, aliyot, reason) {
  var haft;
  var specialHaft = false; // eslint-disable-next-line require-jsdoc

  function handleSpecial(special, key) {
    if (special.haft && !specialHaft) {
      haft = cloneHaftara(special.haft);
      reason.haftara = key;
      specialHaft = true;
    }

    if (special.fullkriyah) {
      mergeAliyotWithSpecial(aliyot, special.fullkriyah);
      Object.keys(special.fullkriyah).map(function (k) {
        return reason[k] = key;
      });
    }
  }

  var events0 = core.HebrewCalendar.getHolidaysOnDate(hd, il) || [];
  var events = events0.filter(function (ev) {
    return !(ev.getFlags() & core.flags.ROSH_CHODESH);
  });
  events.forEach(function (ev) {
    var key = getLeyningKeyForEvent(ev, il); //            console.log(hd.greg().toLocaleDateString(), name, ev.getDesc(), key);

    var special = festivals[key];

    if (special) {
      var shabbatChanukah = getChanukahShabbatKey(ev, key);

      if (shabbatChanukah) {
        // only for Shabbat Chanukah I or Shabbat Chanukah II. Note
        // this section doesn't apply to Shabbat Rosh Chodesh Chanukah; that
        // case gets handled below with the mergeAliyotWithSpecial() logic
        haft = cloneHaftara(festivals[shabbatChanukah].haft);
        specialHaft = true;
        reason.haftara = shabbatChanukah; // Aliyot 1-3 from regular daily reading becomes Maftir

        var maftir = aliyot['M'] = clone(special.fullkriyah['1']);
        maftir.e = special.fullkriyah['3'].e;
        calculateNumVerses(maftir);
        reason.M = key;
      } else {
        handleSpecial(special, key);
      }
    }
  });

  if (!haft) {
    var day = hd.getDate();

    if (day === 30 || day === 1) {
      var key = 'Shabbat Rosh Chodesh';
      var special = festivals[key];
      handleSpecial(special, key);
    } else {
      var tommorow = hd.next().getDate();

      if (tommorow === 30 || tommorow === 1) {
        var _key = 'Shabbat Machar Chodesh';
        var _special = festivals[_key];
        handleSpecial(_special, _key);
      }
    }
  }

  return haft;
}
/**
 * Formats an aliyah object like "Numbers 28:9-28:15"
 * @param {Aliyah} a aliyah
 * @return {string}
 */

function formatAliyahWithBook(a) {
  return "".concat(a.k, " ").concat(a.b, "-").concat(a.e);
}
/**
 * Formats an aliyah object like "Numbers 28:9-15"
 * @param {Aliyah} aliyah
 * @param {boolean} showBook
 * @return {string}
 */

function formatAliyahShort(aliyah, showBook) {
  var begin = aliyah.b;
  var end0 = aliyah.e;
  var prefix = showBook ? aliyah.k + ' ' : '';

  if (begin === end0) {
    return "".concat(prefix).concat(begin);
  }

  var cv1 = begin.split(':');
  var cv2 = end0.split(':');
  var end = cv1[0] === cv2[0] ? cv2[1] : end0;
  return "".concat(prefix).concat(begin, "-").concat(end);
}

/**
 * Represents triennial aliyot for a given date
 * @typedef {Object} TriennialAliyot
 * @property {Object<string,Aliyah>} aliyot - a map of aliyot 1-7 plus "M"
 * @property {number} yearNum - year number, 0-2
 * @property {Date} date - Shabbat date for when this parsha is read in this 3-year cycle
 * @property {boolean} [readSeparately] - true if a double parsha is read separately in year `yearNum`
 * @property {Date} [date1] - Shabbat date of the first part of a read-separately aliyah pair
 * @property {Date} [date2] - Shabbat date of the second part of a read-separately aliyah pair
 */

var VEZOT_HABERAKHAH = 'Vezot Haberakhah';
var isSometimesDoubled = Object.create(null);
doubled.forEach(function (id) {
  isSometimesDoubled[id] = true;
  isSometimesDoubled[id + 1] = true;
});
var triennialAliyot;
/** Triennial Torah readings */

var Triennial = /*#__PURE__*/function () {
  /**
   * Builds a Triennial object
   * @param {number} [hebrewYear] Hebrew Year (default current year)
   */
  function Triennial(hebrewYear) {
    _classCallCheck(this, Triennial);

    hebrewYear = hebrewYear || new core.HDate().getFullYear();

    if (hebrewYear < 5744) {
      throw new RangeError("Invalid Triennial year ".concat(hebrewYear));
    }

    if (!triennialAliyot) {
      triennialAliyot = Triennial.getTriennialAliyot();
    }

    this.startYear = Triennial.getCycleStartYear(hebrewYear);
    this.sedraArray = [];
    this.bereshit = Array(4);

    for (var yr = 0; yr < 4; yr++) {
      var sedra = core.HebrewCalendar.getSedra(this.startYear + yr, false);
      var arr = sedra.getSedraArray();
      this.bereshit[yr] = this.sedraArray.length + arr.indexOf(0);
      this.sedraArray = this.sedraArray.concat(arr);
    } // find the first Saturday on or after Rosh Hashana


    var rh = new core.HDate(1, core.months.TISHREI, this.startYear);
    var firstSaturday = rh.onOrAfter(6);
    this.firstSaturday = firstSaturday.abs();
    this.calcVariationOptions();
    this.readings = this.cycleReadings(this.variationOptions);
  }
  /**
   * @param {string} parsha parsha name ("Bereshit" or "Achrei Mot-Kedoshim")
   * @param {number} yearNum 0 through 2 for which year of Triennial cycle
   * @return {Object<string,Aliyah>} a map of aliyot 1-7 plus "M"
   */


  _createClass(Triennial, [{
    key: "getReading",
    value: function getReading(parsha, yearNum) {
      var reading = shallowCopy({}, this.readings[parsha][yearNum]);

      if (reading.aliyot) {
        Object.values(reading.aliyot).map(function (aliyah) {
          return calculateNumVerses(aliyah);
        });
      }

      return reading;
    }
    /**
     * @return {number}
     */

  }, {
    key: "getStartYear",
    value: function getStartYear() {
      return this.startYear;
    }
    /**
     * Returns triennial year 1, 2 or 3 based on this Hebrew year
     * @param {number} year Hebrew year
     * @return {number}
     */

  }, {
    key: "getThreeYearPattern",
    value:
    /**
     * First, determine if a doubled parsha is read [T]ogether or [S]eparately
     * in each of the 3 years. Yields a pattern like 'SSS', 'STS', 'TTT', 'TTS'.
     * @private
     * @param {number} id
     * @return {string}
     */
    function getThreeYearPattern(id) {
      var pattern = '';

      for (var yr = 0; yr <= 2; yr++) {
        var found = this.sedraArray.indexOf(-1 * id, this.bereshit[yr]);

        if (found > this.bereshit[yr + 1]) {
          found = -1;
        }

        var pat = found == -1 ? 'S' : 'T';
        pattern += pat;
      }

      return pattern;
    }
    /**
     * @private
     */

  }, {
    key: "calcVariationOptions",
    value: function calcVariationOptions() {
      var _this = this;

      var option = this.variationOptions = Object.create(null);
      doubled.forEach(function (id) {
        var pattern = _this.getThreeYearPattern(id);

        var name = getDoubledName(id); // Next, look up the pattern in JSON to determine readings for each year.
        // For "all-together", use "Y" pattern to imply Y.1, Y.2, Y.3

        var variation = pattern === 'TTT' ? 'Y' : parshiyotObj[name].triennial.patterns[pattern];

        if (typeof variation === 'undefined') {
          throw new Error("Can't find pattern ".concat(pattern, " for ").concat(name, ", startYear=").concat(_this.startYear));
        }

        var p1 = core.parshiot[id];
        var p2 = core.parshiot[id + 1];
        option[name] = option[p1] = option[p2] = variation;
      });
    }
    /**
     * @return {string}
     */

  }, {
    key: "debug",
    value: function debug() {
      var _this2 = this;

      var str = "Triennial cycle started year ".concat(this.startYear, "\n");
      doubled.forEach(function (id) {
        var pattern = _this2.getThreeYearPattern(id);

        var name = getDoubledName(id);
        var variation = _this2.variationOptions[name];
        str += "  ".concat(name, " ").concat(pattern, " (").concat(variation, ")\n");
      });
      return str;
    }
    /**
     * Builds a lookup table readings["Bereshit"][0], readings["Matot-Masei"][2]
     * @private
     * @param {Object} cycleOption
     * @return {Map<string,Object[]>}
     */

  }, {
    key: "cycleReadings",
    value: function cycleReadings(cycleOption) {
      var readings = Object.create(null);
      core.parshiot.forEach(function (parsha) {
        readings[parsha] = Array(3);
      });
      readings[VEZOT_HABERAKHAH] = Array(3);
      doubled.map(getDoubledName).forEach(function (parsha) {
        readings[parsha] = Array(3);
      });

      for (var yr = 0; yr <= 2; yr++) {
        this.cycleReadingsForYear(cycleOption, readings, yr);
      }

      return readings;
    }
    /**
     * @private
     * @param {string} option
     * @param {Map<string,Object[]>} readings
     * @param {number} yr
    */

  }, {
    key: "cycleReadingsForYear",
    value: function cycleReadingsForYear(option, readings, yr) {
      var _this3 = this;

      var startIdx = this.bereshit[yr];
      var endIdx = this.bereshit[yr + 1];

      var _loop = function _loop(i) {
        var id = _this3.sedraArray[i];

        if (typeof id !== 'number') {
          return "continue";
        }

        var h = id < 0 ? getDoubledName(-id) : core.parshiot[id];
        var variationKey = isSometimesDoubled[id] ? option[h] : 'Y';
        var variation = variationKey + '.' + (yr + 1);
        var a = triennialAliyot[h][variation];

        if (!a) {
          throw new Error("can't find ".concat(h, " year ").concat(yr, " (variation ").concat(variation, ")"));
        }

        var aliyot = clone(a); // calculate numVerses for the subset of aliyot that don't cross chapter boundaries

        Object.keys(aliyot).forEach(function (num) {
          return calculateNumVerses(aliyot[num]);
        });
        readings[h][yr] = {
          aliyot: aliyot,
          date: new core.HDate(_this3.firstSaturday + i * 7)
        };
      };

      for (var i = startIdx; i < endIdx; i++) {
        var _ret = _loop(i);

        if (_ret === "continue") continue;
      } // create links for doubled


      doubled.forEach(function (id) {
        var h = getDoubledName(id);
        var combined = readings[h][yr];
        var p1 = core.parshiot[id];
        var p2 = core.parshiot[id + 1];

        if (combined) {
          readings[p1][yr] = readings[p2][yr] = {
            readTogether: h,
            date: combined.date
          };
        } else {
          readings[h][yr] = {
            readSeparately: true,
            date1: readings[p1][yr].date,
            date2: readings[p2][yr].date
          };
        }
      });
      var vezotAliyot = triennialAliyot[VEZOT_HABERAKHAH]['Y.1'];
      readings[VEZOT_HABERAKHAH][yr] = {
        aliyot: vezotAliyot,
        date: new core.HDate(23, core.months.TISHREI, this.startYear + yr)
      };
    }
    /**
     * Walks parshiyotObj and builds lookup table for triennial aliyot
     * @private
     * @return {Object}
     */

  }], [{
    key: "getYearNumber",
    value: function getYearNumber(year) {
      if (year < 5744) {
        throw new RangeError("Invalid Triennial year ".concat(year));
      }

      return (year - 5744) % 3 + 1;
    }
    /**
     * Returns Hebrew year that this 3-year triennial cycle began
     * @param {number} year Hebrew year
     * @return {number}
     */

  }, {
    key: "getCycleStartYear",
    value: function getCycleStartYear(year) {
      return year - (this.getYearNumber(year) - 1);
    }
  }, {
    key: "getTriennialAliyot",
    value: function getTriennialAliyot() {
      var triennialAliyot = Object.create(null);
      var triennialAliyotAlt = Object.create(null); // build a lookup table so we don't have to follow num/variation/sameas

      Object.keys(parshiyotObj).forEach(function (parsha) {
        var value = parshiyotObj[parsha];
        var book = BOOK[value.book];

        if (value.triennial) {
          // Vezot Haberakhah has no triennial
          triennialAliyot[parsha] = Triennial.resolveSameAs(parsha, book, value.triennial);

          if (value.triennial.alt) {
            triennialAliyotAlt[parsha] = Triennial.resolveSameAs(parsha, book, value.triennial.alt);
          }
        }
      }); // TODO: handle triennialAliyotAlt also

      return triennialAliyot;
    }
    /**
     * Transforms input JSON with sameAs shortcuts like "D.2":"A.3" to
     * actual aliyot objects for a given variation/year
     * @private
     * @param {string} parsha
     * @param {string} book
     * @param {Object} triennial
     * @return {Object}
     */

  }, {
    key: "resolveSameAs",
    value: function resolveSameAs(parsha, book, triennial) {
      var variations = triennial.years || triennial.variations;

      if (typeof variations === 'undefined') {
        throw new Error("Parashat ".concat(parsha, " has no years or variations"));
      } // first pass, copy only alyiot definitions from parshiyotObj into lookup table


      var lookup = Object.create(null);
      Object.keys(variations).forEach(function (variation) {
        var aliyot = variations[variation];

        if (_typeof(aliyot) === 'object') {
          var dest = Object.create(null);
          Object.keys(aliyot).forEach(function (num) {
            var src = aliyot[num];
            var reading = {
              k: book,
              b: src.b,
              e: src.e
            };

            if (src.v) {
              reading.v = src.v;
            }

            dest[num] = reading;
          });
          lookup[variation] = dest;
        }
      }); // second pass to resolve sameas strings (to simplify later lookups)

      Object.keys(variations).forEach(function (variation) {
        var aliyot = variations[variation];

        if (typeof aliyot === 'string') {
          if (typeof lookup[aliyot] === 'undefined') {
            throw new Error("Can't find source for ".concat(parsha, " ").concat(variation, " sameas=").concat(aliyot));
          }

          lookup[variation] = lookup[aliyot];
        }
      });
      return lookup;
    }
  }]);

  return Triennial;
}();

var __cache = Object.create(null);
/**
 * Calculates the 3-year readings for a given year
 * @param {number} year Hebrew year
 * @return {Triennial}
 */


function getTriennial(year) {
  var cycleStartYear = Triennial.getCycleStartYear(year);
  var cached = __cache[cycleStartYear];

  if (cached) {
    return cached;
  }

  var tri = new Triennial(cycleStartYear);
  __cache[cycleStartYear] = tri;
  return tri;
}
/**
 * Looks up the triennial leyning for this Parashat HaShavua
 * @param {Event} ev
 * @param {boolean} [context=false] returns a reading wrapper object which includes `date`, `yearNum` and `aliyot`
 * @return {TriennialAliyot|Object<string,Aliyah>} a map of aliyot 1-7 plus "M"
 */

function getTriennialForParshaHaShavua(ev) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!ev instanceof core.Event) {
    throw new TypeError("Bad event argument: ".concat(ev));
  } else if (ev.getFlags() != core.flags.PARSHA_HASHAVUA) {
    throw new TypeError("Event must be parsha hashavua: ".concat(ev.getDesc()));
  }

  var hd = ev.getDate();
  var hyear0 = hd.getFullYear();
  var parsha = ev.parsha; // When Nitzavim & Vayeilech are not combined, they should each be read in their entirety.
  // Vayeilech can occur immediately after RH, so back up one year to pick up
  // the tail end of previous 3-year cycle.

  var hyear = parsha[0] === 'Vayeilech' && hd.getMonth() === core.months.TISHREI ? hyear0 - 1 : hyear0;
  var triennial = getTriennial(hyear);
  var startYear = triennial.getStartYear();
  var yearNum = hyear - startYear;
  var name = parshaToString(parsha); // untranslated

  var reading = triennial.getReading(name, yearNum);

  if (_typeof(reading) !== 'object') {
    throw new ReferenceError("Can't load reading for ".concat(name, " in ").concat(hyear, " (year number ").concat(yearNum, ")"));
  }

  var aliyotMap = shallowCopy({}, reading.aliyot); // possibly replace 7th aliyah and/or maftir

  var reason = Object.create(null);
  specialReadings(hd, false, aliyotMap, reason);
  Object.keys(reason).forEach(function (num) {
    if (aliyotMap[num]) {
      aliyotMap[num].reason = reason[num];
    }
  });

  if (context) {
    reading.yearNum = yearNum;
    reading.aliyot = aliyotMap;
    return reading;
  }

  return aliyotMap;
}

var uncurryThis = functionUncurryThis;
var PROPER_FUNCTION_NAME = functionName.PROPER;
var redefine = redefine$3.exports;
var anObject = anObject$6;
var isPrototypeOf = objectIsPrototypeOf;
var $toString = toString$2;
var fails = fails$e;
var regExpFlags = regexpFlags$1;

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var n$ToString = RegExpPrototype[TO_STRING];
var getFlags = uncurryThis(regExpFlags);

var NOT_GENERIC = fails(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = $toString(R.source);
    var rf = R.flags;
    var f = $toString(rf === undefined && isPrototypeOf(RegExpPrototype, R) && !('flags' in RegExpPrototype) ? getFlags(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

var fmt = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit'
});
/**
 * @private
 * @param {Date} dt
 * @return {string}
 */

function fmtDate(dt) {
  var s = fmt.format(dt).split(' ');
  return s[1].substring(0, 2) + '-' + s[0] + '-' + s[2];
}
/**
 * @private
 * @param {Event[]} events
 * @return {Object<string,boolean>}
 */


function getParshaDates(events) {
  var parshaEvents = events.filter(function (ev) {
    return ev.getFlags() === core.flags.PARSHA_HASHAVUA;
  });
  var parshaDates = parshaEvents.reduce(function (set, ev) {
    set[ev.getDate().toString()] = true;
    return set;
  }, {});
  return parshaDates;
}
/**
 * @private
 * @param {fs.WriteStream} stream
 * @param {number} hyear
 * @param {boolean} il
 */


function writeFullKriyahCsv(stream, hyear, il) {
  var events = core.HebrewCalendar.calendar({
    year: hyear,
    isHebrewYear: true,
    sedrot: true,
    il: il
  });
  var parshaDates = getParshaDates(events);
  stream.write('"Date","Parashah","Aliyah","Reading","Verses"\r\n');
  events.forEach(function (ev) {
    if (ev.getFlags() === core.flags.PARSHA_HASHAVUA || !parshaDates[ev.getDate().toString()]) {
      writeFullKriyahEvent(stream, ev, il);
    }
  });
}
/**
 * @private
 * @param {fs.WriteStream} stream
 * @param {number} hyear
 */

function writeTriennialCsv(stream, hyear) {
  var events = core.HebrewCalendar.calendar({
    year: hyear,
    isHebrewYear: true,
    numYears: 3,
    sedrot: true,
    il: false
  });
  var parshaDates = getParshaDates(events);
  stream.write('"Date","Parashah","Aliyah","Triennial Reading","Verses"\r\n');
  events.forEach(function (ev) {
    if (ev.getFlags() === core.flags.PARSHA_HASHAVUA || !parshaDates[ev.getDate().toString()]) {
      writeTriennialEvent(stream, ev);
    }
  });
}
/**
 * @private
 * @param {fs.WriteStream} stream
 * @param {Event} ev
 */

function writeTriennialEvent(stream, ev) {
  if (ignore(ev)) {
    return;
  }

  var isParsha = ev.getFlags() === core.flags.PARSHA_HASHAVUA;
  var reading0 = isParsha ? getTriennialForParshaHaShavua(ev) : getLeyningForHoliday(ev, false);

  if (!reading0) {
    return;
  }

  var reading;

  if (isParsha) {
    var fk = getLeyningForParshaHaShavua(ev, false);
    reading = {
      haftara: fk.haftara,
      haftaraNumV: fk.haftaraNumV,
      sephardic: fk.sephardic,
      sephardicNumV: fk.sephardicNumV,
      reason: fk.reason,
      fullkriyah: reading0
    };
  } else {
    reading = reading0;
  }

  writeCsvLines(stream, ev, reading, false);
}
/**
 * @private
 * @param {Event} ev
 * @return {boolean}
 */

function ignore(ev) {
  var mask = ev.getFlags();

  if (mask === core.flags.SPECIAL_SHABBAT) {
    return true;
  }

  if (mask !== core.flags.ROSH_CHODESH) {
    return false;
  }

  return ev.getDate().getDay() === 6;
}
/**
 * @private
 * @param {fs.WriteStream} stream
 * @param {Event} ev
 * @param {boolean} il
 */


function writeFullKriyahEvent(stream, ev, il) {
  if (ignore(ev)) {
    return;
  }

  var isParsha = ev.getFlags() === core.flags.PARSHA_HASHAVUA;
  var reading = isParsha ? getLeyningForParshaHaShavua(ev, il) : getLeyningForHoliday(ev, il);

  if (!reading) {
    return;
  }

  writeCsvLines(stream, ev, reading, il);
}
/**
 * @private
 * @param {fs.WriteStream} stream
 * @param {Event} ev
 * @param {Leyning} reading
 * @param {boolean} il
 */

function writeCsvLines(stream, ev, reading, il) {
  var isParsha = ev.getFlags() === core.flags.PARSHA_HASHAVUA;
  var parsha = isParsha ? ev.basename() : getLeyningKeyForEvent(ev, il) || ev.render();
  var date = fmtDate(ev.getDate().greg());
  var lines = getFullKriyahLines(reading);
  lines.forEach(function (s) {
    var code = s[0].charCodeAt(0);

    if (code < 48 || code > 57) {
      s[0] = "\"".concat(s[0], "\"");
    }

    stream.write("".concat(date, ",\"").concat(parsha, "\",").concat(s[0], ",\"").concat(s[1], "\",").concat(s[2], "\r\n"));
  });
  stream.write('\r\n');
}
/**
 * @private
 * @param {any} reading
 * @return {any[]}
 */


function getFullKriyahLines(reading) {
  var lines = [];

  if (reading.fullkriyah) {
    Object.keys(reading.fullkriyah).forEach(function (num) {
      var a = reading.fullkriyah[num];

      if (typeof a !== 'undefined') {
        var k = num == 'M' ? 'maf' : num;
        var aliyah = formatAliyahWithBook(a);

        if (reading.reason && reading.reason[num]) {
          aliyah += ' | ' + reading.reason[num];
        }

        lines.push([k, aliyah, a.v || '']);
      }
    });
  }

  var specialHaftara = false;

  if (reading.haftara) {
    var haftara = reading.haftara.replace(/,/g, ';');

    if (reading.reason && reading.reason.haftara) {
      specialHaftara = true;
      haftara += ' | ' + reading.reason.haftara;
    }

    lines.push(['Haftara', haftara, reading.haftaraNumV || '']);
  }

  if (reading.sephardic && !specialHaftara) {
    var sephardic = reading.sephardic.replace(/,/g, ';');
    lines.push(['Haftara for Sephardim', sephardic, reading.sephardicNumV || '']);
  }

  return lines;
}

exports.Triennial = Triennial;
exports.addSefariaLinksToLeyning = addSefariaLinksToLeyning;
exports.calculateHaftarahNumVerses = calculateHaftarahNumVerses;
exports.calculateNumVerses = calculateNumVerses;
exports.formatAliyahShort = formatAliyahShort;
exports.formatAliyahWithBook = formatAliyahWithBook;
exports.getLeyningForHoliday = getLeyningForHoliday;
exports.getLeyningForHolidayKey = getLeyningForHolidayKey;
exports.getLeyningForParsha = getLeyningForParsha;
exports.getLeyningForParshaHaShavua = getLeyningForParshaHaShavua;
exports.getLeyningKeyForEvent = getLeyningKeyForEvent;
exports.getTriennial = getTriennial;
exports.getTriennialForParshaHaShavua = getTriennialForParshaHaShavua;
exports.holidayReadings = festivals;
exports.makeLeyningParts = makeLeyningParts;
exports.makeLeyningSummary = makeLeyningSummary;
exports.makeSummaryFromParts = makeSummaryFromParts;
exports.parshaToString = parshaToString;
exports.parshiyot = parshiyotObj;
exports.specialReadings = specialReadings;
exports.writeFullKriyahCsv = writeFullKriyahCsv;
exports.writeTriennialCsv = writeTriennialCsv;

Object.defineProperty(exports, '__esModule', { value: true });

return exports;

})({}, hebcal);
