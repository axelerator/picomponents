(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// VIRTUAL-DOM WIDGETS


var _Markdown_toHtml = F3(function(options, factList, rawMarkdown)
{
	return _VirtualDom_custom(
		factList,
		{
			a: options,
			b: rawMarkdown
		},
		_Markdown_render,
		_Markdown_diff
	);
});



// WIDGET IMPLEMENTATION


function _Markdown_render(model)
{
	return A2(_Markdown_replace, model, _VirtualDom_doc.createElement('div'));
}


function _Markdown_diff(x, y)
{
	return x.b === y.b && x.a === y.a
		? false
		: _Markdown_replace(y);
}


var _Markdown_replace = F2(function(model, div)
{
	div.innerHTML = _Markdown_marked(model.b, _Markdown_formatOptions(model.a));
	return div;
});



// ACTUAL MARKDOWN PARSER


var _Markdown_marked = function() {
	// catch the `marked` object regardless of the outer environment.
	// (ex. a CommonJS module compatible environment.)
	// note that this depends on marked's implementation of environment detection.
	var module = {};
	var exports = module.exports = {};

	/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 * commit cd2f6f5b7091154c5526e79b5f3bfb4d15995a51
	 */
	(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^_\_([\s\S]+?)_\_(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|_\_)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^_\_(?=\S)([\s\S]*?\S)_\_(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0||prot.indexOf("data:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

	return module.exports;
}();


// FORMAT OPTIONS FOR MARKED IMPLEMENTATION

function _Markdown_formatOptions(options)
{
	function toHighlight(code, lang)
	{
		if (!lang && $elm$core$Maybe$isJust(options.defaultHighlighting))
		{
			lang = options.defaultHighlighting.a;
		}

		if (typeof hljs !== 'undefined' && lang && hljs.listLanguages().indexOf(lang) >= 0)
		{
			return hljs.highlight(lang, code, true).value;
		}

		return code;
	}

	var gfm = options.githubFlavored.a;

	return {
		highlight: toHighlight,
		gfm: gfm,
		tables: gfm && gfm.tables,
		breaks: gfm && gfm.breaks,
		sanitize: options.sanitize,
		smartypants: options.smartypants
	};
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$document = _Browser_document;
var $author$project$Main$Email = function (a) {
	return {$: 'Email', a: a};
};
var $author$project$Main$NothingYet = {$: 'NothingYet'};
var $axelerator$fancy_forms$FancyForms$FormState$alwaysValid = function (_v0) {
	return _List_Nil;
};
var $elm$html$Html$article = _VirtualDom_node('article');
var $elm$html$Html$footer = _VirtualDom_node('footer');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $author$project$Pico$outline = $elm$html$Html$Attributes$class('outline');
var $elm$html$Html$button = _VirtualDom_node('button');
var $author$project$Pico$elemWithClass = F3(
	function (node, className, attrs) {
		return node(
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class(className),
				attrs));
	});
var $author$project$Pico$secondaryButton = function (attrs) {
	return A3($author$project$Pico$elemWithClass, $elm$html$Html$button, 'secondary', attrs);
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Main$contactWithRemoveButton = F2(
	function (removeMsg, input) {
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$article,
				_List_Nil,
				_Utils_ap(
					input,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$footer,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$author$project$Pico$secondaryButton,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(removeMsg),
											$author$project$Pico$outline
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Remove')
										]))
								]))
						])))
			]);
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$Main$contactsWithAddButton = F2(
	function (addMsg, items) {
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_Utils_ap(
					items,
					_List_fromArray(
						[
							A2(
							$author$project$Pico$secondaryButton,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick(addMsg)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Add contact')
								]))
						])))
			]);
	});
var $axelerator$fancy_forms$FancyForms$FormState$FormState = function (a) {
	return {$: 'FormState', a: a};
};
var $axelerator$fancy_forms$FancyForms$FormState$blurAll = function (_v0) {
	var formState = _v0.a;
	return $axelerator$fancy_forms$FancyForms$FormState$FormState(
		_Utils_update(
			formState,
			{allBlurred: true}));
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $axelerator$fancy_forms$FancyForms$Form$form = F4(
	function (fieldWithErrors, validator, domId, fn) {
		return {
			blur: $axelerator$fancy_forms$FancyForms$FormState$blurAll,
			count: 0,
			domId: domId,
			fieldWithErrors: fieldWithErrors,
			fn: fn,
			initWithData: F2(
				function (_v0, fs) {
					return fs;
				}),
			isConsistent: function (_v1) {
				return true;
			},
			updates: $elm$core$Dict$empty,
			validator: validator
		};
	});
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $axelerator$fancy_forms$FancyForms$FormState$read = F2(
	function (fieldId, _v0) {
		var values = _v0.a.values;
		return A2(
			$elm$core$Maybe$withDefault,
			$elm$json$Json$Encode$object(_List_Nil),
			A2($elm$core$Dict$get, fieldId, values));
	});
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $axelerator$fancy_forms$FancyForms$FormState$blurChildren = F3(
	function (fieldId, widget, fs) {
		var formState = fs.a;
		var values = formState.values;
		var blurredModel = A2(
			$elm$core$Result$withDefault,
			$elm$json$Json$Encode$null,
			A2(
				$elm$core$Result$map,
				widget.encodeModel,
				A2(
					$elm$core$Result$map,
					widget.blur,
					A2(
						$elm$json$Json$Decode$decodeValue,
						widget.decoderModel,
						A2($axelerator$fancy_forms$FancyForms$FormState$read, fieldId, fs)))));
		return $axelerator$fancy_forms$FancyForms$FormState$FormState(
			_Utils_update(
				formState,
				{
					allBlurred: true,
					values: A3($elm$core$Dict$insert, fieldId, blurredModel, values)
				}));
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $axelerator$fancy_forms$FancyForms$FormState$NoEffect = {$: 'NoEffect'};
var $axelerator$fancy_forms$FancyForms$FormState$WasChanged = {$: 'WasChanged'};
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$json$Json$Decode$index = _Json_decodeIndex;
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $axelerator$fancy_forms$FancyForms$Form$encodedUpdate = F5(
	function (widget, mbTemplate, subfieldId, operation, modelVal) {
		var decoderMsg = widget.decoderMsg;
		var decoderModel = widget.decoderModel;
		var encodeModel = widget.encodeModel;
		var encodeSubfield = function (updatedModel) {
			if (subfieldId.$ === 'SingleValue') {
				return encodeModel(updatedModel);
			} else {
				var i = subfieldId.a;
				return A2(
					$elm$json$Json$Encode$list,
					encodeModel,
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (idx, e) {
								return _Utils_eq(idx, i) ? updatedModel : e;
							}),
						A2(
							$elm$core$Result$withDefault,
							_List_Nil,
							A2(
								$elm$json$Json$Decode$decodeValue,
								$elm$json$Json$Decode$list(decoderModel),
								modelVal))));
			}
		};
		var decodeSubfield = function () {
			if (subfieldId.$ === 'SingleValue') {
				return decoderModel;
			} else {
				var i = subfieldId.a;
				return A2($elm$json$Json$Decode$index, i, decoderModel);
			}
		}();
		var _v0 = _Utils_Tuple2(operation, subfieldId);
		_v0$3:
		while (true) {
			switch (_v0.a.$) {
				case 'Add':
					if (_v0.b.$ === 'ArrayElement') {
						var _v1 = _v0.a;
						return _Utils_Tuple2(
							function (list) {
								return A2(
									$elm$json$Json$Encode$list,
									encodeModel,
									_Utils_ap(
										list,
										_List_fromArray(
											[
												widget.init(
												A2($elm$core$Maybe$withDefault, widget._default, mbTemplate))
											])));
							}(
								A2(
									$elm$core$Result$withDefault,
									_List_Nil,
									A2(
										$elm$json$Json$Decode$decodeValue,
										$elm$json$Json$Decode$list(decoderModel),
										modelVal))),
							$axelerator$fancy_forms$FancyForms$FormState$WasChanged);
					} else {
						break _v0$3;
					}
				case 'Remove':
					if (_v0.b.$ === 'ArrayElement') {
						var _v2 = _v0.a;
						var i = _v0.b.a;
						return _Utils_Tuple2(
							A2(
								$elm$json$Json$Encode$list,
								encodeModel,
								function (list) {
									return _Utils_ap(
										A2($elm$core$List$take, i, list),
										A2($elm$core$List$drop, i + 1, list));
								}(
									A2(
										$elm$core$Result$withDefault,
										_List_Nil,
										A2(
											$elm$json$Json$Decode$decodeValue,
											$elm$json$Json$Decode$list(decoderModel),
											modelVal)))),
							$axelerator$fancy_forms$FancyForms$FormState$WasChanged);
					} else {
						break _v0$3;
					}
				default:
					var msgVal = _v0.a.a;
					var _v3 = _Utils_Tuple2(
						A2($elm$json$Json$Decode$decodeValue, decoderMsg, msgVal),
						A2($elm$json$Json$Decode$decodeValue, decodeSubfield, modelVal));
					if (_v3.a.$ === 'Ok') {
						if (_v3.b.$ === 'Ok') {
							var msg = _v3.a.a;
							var model = _v3.b.a;
							var updateResult = A2(widget.update, msg, model);
							return _Utils_Tuple2(
								encodeSubfield(updateResult.model),
								updateResult.effect);
						} else {
							var msg = _v3.a.a;
							var updateResult = A2(
								widget.update,
								msg,
								widget.init(widget._default));
							return _Utils_Tuple2(
								encodeSubfield(updateResult.model),
								updateResult.effect);
						}
					} else {
						return _Utils_Tuple2(modelVal, $axelerator$fancy_forms$FancyForms$FormState$NoEffect);
					}
			}
		}
		return _Utils_Tuple2(modelVal, $axelerator$fancy_forms$FancyForms$FormState$NoEffect);
	});
var $axelerator$fancy_forms$FancyForms$Form$extendConsistencyCheck = F3(
	function (previousChecks, newCheck, formState) {
		return previousChecks(formState) && newCheck(formState);
	});
var $axelerator$fancy_forms$FancyForms$Form$extendInit = F4(
	function (previousInit, nextInit, data, formState) {
		return A2(
			nextInit,
			data,
			A2(previousInit, data, formState));
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $axelerator$fancy_forms$FancyForms$Form$extractConsistencyCheck = F3(
	function (widget, fieldId, formState) {
		return A2(
			$elm$core$Result$withDefault,
			false,
			A2(
				$elm$core$Result$map,
				function (model) {
					return widget.isConsistent(model) && $elm$core$List$isEmpty(
						widget.validate(
							widget.value(model)));
				},
				A2(
					$elm$json$Json$Decode$decodeValue,
					widget.decoderModel,
					A2($axelerator$fancy_forms$FancyForms$FormState$read, fieldId, formState))));
	});
var $axelerator$fancy_forms$FancyForms$FormState$SingleValue = {$: 'SingleValue'};
var $axelerator$fancy_forms$FancyForms$FormState$toKey = F2(
	function (fieldId, subfieldId) {
		if (subfieldId.$ === 'SingleValue') {
			return fieldId;
		} else {
			var i = subfieldId.a;
			return fieldId + ('-' + $elm$core$String$fromInt(i));
		}
	});
var $axelerator$fancy_forms$FancyForms$FormState$write = F4(
	function (fieldId, subfieldId, _v0, value) {
		var formState = _v0.a;
		return $axelerator$fancy_forms$FancyForms$FormState$FormState(
			_Utils_update(
				formState,
				{
					values: A3(
						$elm$core$Dict$insert,
						A2($axelerator$fancy_forms$FancyForms$FormState$toKey, fieldId, subfieldId),
						value,
						formState.values)
				}));
	});
var $axelerator$fancy_forms$FancyForms$Form$extractListInit = F5(
	function (widget, fieldId, valueExtractor, formModel, formState) {
		var values = valueExtractor(formModel);
		var encodedValues = A2(
			$elm$core$List$map,
			widget.encodeModel,
			A2($elm$core$List$map, widget.init, values));
		var encodedListValue = A2($elm$json$Json$Encode$list, $elm$core$Basics$identity, encodedValues);
		return A4($axelerator$fancy_forms$FancyForms$FormState$write, fieldId, $axelerator$fancy_forms$FancyForms$FormState$SingleValue, formState, encodedListValue);
	});
var $axelerator$fancy_forms$FancyForms$FormState$Add = {$: 'Add'};
var $axelerator$fancy_forms$FancyForms$FormState$ArrayElement = function (a) {
	return {$: 'ArrayElement', a: a};
};
var $axelerator$fancy_forms$FancyForms$FormState$Blurred = {$: 'Blurred'};
var $axelerator$fancy_forms$FancyForms$Form$FormMsg = F3(
	function (a, b, c) {
		return {$: 'FormMsg', a: a, b: b, c: c};
	});
var $axelerator$fancy_forms$FancyForms$FormState$Remove = {$: 'Remove'};
var $axelerator$fancy_forms$FancyForms$FormState$Update = function (a) {
	return {$: 'Update', a: a};
};
var $axelerator$fancy_forms$FancyForms$Form$buildDomId = F3(
	function (parentDomId, fieldId, subfieldId) {
		return parentDomId + ('-' + (fieldId + function () {
			if (subfieldId.$ === 'SingleValue') {
				return '';
			} else {
				var i = subfieldId.a;
				return '-' + $elm$core$String$fromInt(i);
			}
		}()));
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $axelerator$fancy_forms$FancyForms$FormState$NotVisited = {$: 'NotVisited'};
var $axelerator$fancy_forms$FancyForms$FormState$wasAtLeast = F3(
	function (goal, fieldId, _v0) {
		var fieldStatus = _v0.a.fieldStatus;
		var allBlurred = _v0.a.allBlurred;
		var tested = A2(
			$elm$core$Maybe$withDefault,
			$axelerator$fancy_forms$FancyForms$FormState$NotVisited,
			A2($elm$core$Dict$get, fieldId, fieldStatus));
		if (allBlurred) {
			return true;
		} else {
			var _v1 = _Utils_Tuple2(tested, goal);
			switch (_v1.a.$) {
				case 'NotVisited':
					if (_v1.b.$ === 'NotVisited') {
						var _v2 = _v1.a;
						var _v3 = _v1.b;
						return true;
					} else {
						var _v4 = _v1.a;
						return false;
					}
				case 'Focused':
					switch (_v1.b.$) {
						case 'NotVisited':
							var _v5 = _v1.a;
							var _v6 = _v1.b;
							return true;
						case 'Focused':
							var _v7 = _v1.a;
							var _v8 = _v1.b;
							return true;
						default:
							var _v9 = _v1.a;
							return false;
					}
				case 'Changed':
					if (_v1.b.$ === 'Blurred') {
						var _v10 = _v1.a;
						var _v11 = _v1.b;
						return false;
					} else {
						var _v12 = _v1.a;
						return true;
					}
				default:
					if (_v1.b.$ === 'Blurred') {
						var _v13 = _v1.a;
						var _v14 = _v1.b;
						return true;
					} else {
						var _v15 = _v1.a;
						return false;
					}
			}
		}
	});
var $axelerator$fancy_forms$FancyForms$Form$mkListField = F5(
	function (fieldWithErrors, listWithAddButton, fieldWithRemoveButton, fieldId, widget) {
		var deserializeModel = function (formState) {
			return A2(
				$elm$core$Result$withDefault,
				_List_Nil,
				A2(
					$elm$json$Json$Decode$decodeValue,
					$elm$json$Json$Decode$list(widget.decoderModel),
					A2($axelerator$fancy_forms$FancyForms$FormState$read, fieldId, formState)));
		};
		var errors_ = function (formState) {
			return $elm$core$List$concat(
				A2(
					$elm$core$List$map,
					widget.validate,
					A2(
						$elm$core$List$map,
						widget.value,
						deserializeModel(formState))));
		};
		var value = function (formState) {
			return A2(
				$elm$core$List$map,
				widget.value,
				deserializeModel(formState));
		};
		var viewField = function (formState) {
			var parentDomId = formState.a.parentDomId;
			var toMsg_ = F2(
				function (i, html) {
					return A2(
						$elm$html$Html$map,
						function (msg) {
							return A3(
								$axelerator$fancy_forms$FancyForms$Form$FormMsg,
								fieldId,
								$axelerator$fancy_forms$FancyForms$FormState$ArrayElement(i),
								$axelerator$fancy_forms$FancyForms$FormState$Update(
									widget.encodeMsg(msg)));
						},
						html);
				});
			var toMsg = F2(
				function (i, html) {
					return A2(
						$elm$core$List$map,
						toMsg_(i),
						html);
				});
			var removeArrayElementMsg = function (x) {
				return A3(
					$axelerator$fancy_forms$FancyForms$Form$FormMsg,
					fieldId,
					$axelerator$fancy_forms$FancyForms$FormState$ArrayElement(x),
					$axelerator$fancy_forms$FancyForms$FormState$Remove);
			};
			var fieldErrors = A3($axelerator$fancy_forms$FancyForms$FormState$wasAtLeast, $axelerator$fancy_forms$FancyForms$FormState$Blurred, fieldId, formState) ? errors_(formState) : _List_Nil;
			var arrayElementHtml = F2(
				function (i, model) {
					return A3(
						widget.view,
						A3(
							$axelerator$fancy_forms$FancyForms$Form$buildDomId,
							parentDomId,
							fieldId,
							$axelerator$fancy_forms$FancyForms$FormState$ArrayElement(i)),
						_List_Nil,
						model);
				});
			var addRemoveButton = F2(
				function (i, html) {
					return A2(
						fieldWithRemoveButton,
						removeArrayElementMsg(i),
						html);
				});
			var inputHtml = $elm$core$List$concat(
				A2(
					$elm$core$List$indexedMap,
					addRemoveButton,
					A2(
						$elm$core$List$indexedMap,
						toMsg,
						A2(
							$elm$core$List$indexedMap,
							arrayElementHtml,
							deserializeModel(formState)))));
			var addArrayElementMsg = A3(
				$axelerator$fancy_forms$FancyForms$Form$FormMsg,
				fieldId,
				$axelerator$fancy_forms$FancyForms$FormState$ArrayElement(0),
				$axelerator$fancy_forms$FancyForms$FormState$Add);
			var addArrayElement = function (html) {
				return A2(listWithAddButton, addArrayElementMsg, html);
			};
			return A2(
				fieldWithErrors,
				fieldErrors,
				addArrayElement(inputHtml));
		};
		return {errors: errors_, id: fieldId, multiple: true, value: value, view: viewField};
	});
var $axelerator$fancy_forms$FancyForms$Form$listField = F6(
	function (listWithAddButton, fieldWithRemoveButton, template, extractDefault, widget, _v0) {
		var fn = _v0.fn;
		var count = _v0.count;
		var updates = _v0.updates;
		var fieldWithErrors = _v0.fieldWithErrors;
		var validator = _v0.validator;
		var blur = _v0.blur;
		var domId = _v0.domId;
		var isConsistent = _v0.isConsistent;
		var initWithData = _v0.initWithData;
		var fieldId = $elm$core$String$fromInt(count);
		return {
			blur: A2(
				$elm$core$Basics$composeR,
				blur,
				A2($axelerator$fancy_forms$FancyForms$FormState$blurChildren, fieldId, widget)),
			count: count + 1,
			domId: domId,
			fieldWithErrors: fieldWithErrors,
			fn: fn(
				A5($axelerator$fancy_forms$FancyForms$Form$mkListField, fieldWithErrors, listWithAddButton, fieldWithRemoveButton, fieldId, widget)),
			initWithData: A2(
				$axelerator$fancy_forms$FancyForms$Form$extendInit,
				initWithData,
				A3($axelerator$fancy_forms$FancyForms$Form$extractListInit, widget, fieldId, extractDefault)),
			isConsistent: A2(
				$axelerator$fancy_forms$FancyForms$Form$extendConsistencyCheck,
				isConsistent,
				A2($axelerator$fancy_forms$FancyForms$Form$extractConsistencyCheck, widget, fieldId)),
			updates: A3(
				$elm$core$Dict$insert,
				$elm$core$String$fromInt(count),
				A2(
					$axelerator$fancy_forms$FancyForms$Form$encodedUpdate,
					widget,
					$elm$core$Maybe$Just(template)),
				updates),
			validator: validator
		};
	});
var $axelerator$fancy_forms$FancyForms$Form$CustomEvent = function (a) {
	return {$: 'CustomEvent', a: a};
};
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $axelerator$fancy_forms$FancyForms$Form$decoderCustomFormMsg = A2(
	$elm$json$Json$Decode$map,
	$axelerator$fancy_forms$FancyForms$Form$CustomEvent,
	A2($elm$json$Json$Decode$field, 'customEvent', $elm$json$Json$Decode$value));
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $axelerator$fancy_forms$FancyForms$Form$decoderFieldOperation = A2(
	$elm$json$Json$Decode$andThen,
	function (kind) {
		switch (kind) {
			case 'add':
				return $elm$json$Json$Decode$succeed($axelerator$fancy_forms$FancyForms$FormState$Add);
			case 'remove':
				return $elm$json$Json$Decode$succeed($axelerator$fancy_forms$FancyForms$FormState$Remove);
			case 'update':
				return A2(
					$elm$json$Json$Decode$map,
					$axelerator$fancy_forms$FancyForms$FormState$Update,
					A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$value));
			default:
				return $elm$json$Json$Decode$fail('unknown kind');
		}
	},
	A2($elm$json$Json$Decode$field, 'kind', $elm$json$Json$Decode$string));
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $axelerator$fancy_forms$FancyForms$Form$decoderSubFieldId = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$andThen,
			function (i) {
				return $elm$json$Json$Decode$succeed(
					$axelerator$fancy_forms$FancyForms$FormState$ArrayElement(i));
			},
			$elm$json$Json$Decode$int),
			$elm$json$Json$Decode$null($axelerator$fancy_forms$FancyForms$FormState$SingleValue)
		]));
var $elm$json$Json$Decode$map3 = _Json_map3;
var $axelerator$fancy_forms$FancyForms$Form$decoderFormMsg_ = A4(
	$elm$json$Json$Decode$map3,
	$axelerator$fancy_forms$FancyForms$Form$FormMsg,
	A2($elm$json$Json$Decode$field, 'fieldId', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'subFieldId', $axelerator$fancy_forms$FancyForms$Form$decoderSubFieldId),
	A2($elm$json$Json$Decode$field, 'operation', $axelerator$fancy_forms$FancyForms$Form$decoderFieldOperation));
var $axelerator$fancy_forms$FancyForms$Form$decoderFormMsg = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[$axelerator$fancy_forms$FancyForms$Form$decoderCustomFormMsg, $axelerator$fancy_forms$FancyForms$Form$decoderFormMsg_]));
var $axelerator$fancy_forms$FancyForms$Form$encodeFieldOperation = function (operation) {
	switch (operation.$) {
		case 'Add':
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'kind',
						$elm$json$Json$Encode$string('add'))
					]));
		case 'Remove':
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'kind',
						$elm$json$Json$Encode$string('remove'))
					]));
		default:
			var v = operation.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'kind',
						$elm$json$Json$Encode$string('update')),
						_Utils_Tuple2('value', v)
					]));
	}
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $axelerator$fancy_forms$FancyForms$Form$encodeSubFieldId = function (subfieldId) {
	if (subfieldId.$ === 'SingleValue') {
		return $elm$json$Json$Encode$null;
	} else {
		var i = subfieldId.a;
		return $elm$json$Json$Encode$int(i);
	}
};
var $axelerator$fancy_forms$FancyForms$Form$encodeFormMsg = function (msg) {
	if (msg.$ === 'FormMsg') {
		var fieldId = msg.a;
		var subfieldId = msg.b;
		var operation = msg.c;
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'fieldId',
					$elm$json$Json$Encode$string(fieldId)),
					_Utils_Tuple2(
					'subFieldId',
					$axelerator$fancy_forms$FancyForms$Form$encodeSubFieldId(subfieldId)),
					_Utils_Tuple2(
					'operation',
					$axelerator$fancy_forms$FancyForms$Form$encodeFieldOperation(operation))
				]));
	} else {
		var v = msg.a;
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2('customEvent', v)
				]));
	}
};
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $axelerator$fancy_forms$FancyForms$FormState$Changed = {$: 'Changed'};
var $axelerator$fancy_forms$FancyForms$FormState$Focused = {$: 'Focused'};
var $axelerator$fancy_forms$FancyForms$FormState$decoderFieldStatus = A2(
	$elm$json$Json$Decode$andThen,
	function (s) {
		switch (s) {
			case 'NotVisited':
				return $elm$json$Json$Decode$succeed($axelerator$fancy_forms$FancyForms$FormState$NotVisited);
			case 'Focused':
				return $elm$json$Json$Decode$succeed($axelerator$fancy_forms$FancyForms$FormState$Focused);
			case 'Changed':
				return $elm$json$Json$Decode$succeed($axelerator$fancy_forms$FancyForms$FormState$Changed);
			case 'Blurred':
				return $elm$json$Json$Decode$succeed($axelerator$fancy_forms$FancyForms$FormState$Blurred);
			default:
				return $elm$json$Json$Decode$fail('invalid field status');
		}
	},
	$elm$json$Json$Decode$string);
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $elm$json$Json$Decode$map4 = _Json_map4;
var $axelerator$fancy_forms$FancyForms$FormState$formStateDecoder = A5(
	$elm$json$Json$Decode$map4,
	F4(
		function (parentDomId, values, fieldStatus, allBlurred) {
			return $axelerator$fancy_forms$FancyForms$FormState$FormState(
				{allBlurred: allBlurred, fieldStatus: fieldStatus, parentDomId: parentDomId, values: values});
		}),
	A2($elm$json$Json$Decode$field, 'parentDomId', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'values',
		$elm$json$Json$Decode$dict($elm$json$Json$Decode$value)),
	A2(
		$elm$json$Json$Decode$field,
		'fieldStatus',
		$elm$json$Json$Decode$dict($axelerator$fancy_forms$FancyForms$FormState$decoderFieldStatus)),
	A2($elm$json$Json$Decode$field, 'allBlurred', $elm$json$Json$Decode$bool));
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$json$Json$Encode$dict = F3(
	function (toKey, toValue, dictionary) {
		return _Json_wrap(
			A3(
				$elm$core$Dict$foldl,
				F3(
					function (key, value, obj) {
						return A3(
							_Json_addField,
							toKey(key),
							toValue(value),
							obj);
					}),
				_Json_emptyObject(_Utils_Tuple0),
				dictionary));
	});
var $axelerator$fancy_forms$FancyForms$FormState$encodeFieldStatus = function (status) {
	switch (status.$) {
		case 'NotVisited':
			return $elm$json$Json$Encode$string('NotVisited');
		case 'Focused':
			return $elm$json$Json$Encode$string('Focused');
		case 'Changed':
			return $elm$json$Json$Encode$string('Changed');
		default:
			return $elm$json$Json$Encode$string('Blurred');
	}
};
var $axelerator$fancy_forms$FancyForms$FormState$formStateEncode = function (_v0) {
	var parentDomId = _v0.a.parentDomId;
	var values = _v0.a.values;
	var fieldStatus = _v0.a.fieldStatus;
	var allBlurred = _v0.a.allBlurred;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'parentDomId',
				$elm$json$Json$Encode$string(parentDomId)),
				_Utils_Tuple2(
				'values',
				A3($elm$json$Json$Encode$dict, $elm$core$Basics$identity, $elm$core$Basics$identity, values)),
				_Utils_Tuple2(
				'fieldStatus',
				A3($elm$json$Json$Encode$dict, $elm$core$Basics$identity, $axelerator$fancy_forms$FancyForms$FormState$encodeFieldStatus, fieldStatus)),
				_Utils_Tuple2(
				'allBlurred',
				$elm$json$Json$Encode$bool(allBlurred))
			]));
};
var $axelerator$fancy_forms$FancyForms$FormState$init = F2(
	function (values, parentDomId) {
		return $axelerator$fancy_forms$FancyForms$FormState$FormState(
			{allBlurred: false, fieldStatus: $elm$core$Dict$empty, parentDomId: parentDomId, values: values});
	});
var $axelerator$fancy_forms$FancyForms$Form$init = F2(
	function (_v0, data) {
		var domId = _v0.domId;
		var initWithData = _v0.initWithData;
		return A2(
			initWithData,
			data,
			A2($axelerator$fancy_forms$FancyForms$FormState$init, $elm$core$Dict$empty, domId));
	});
var $axelerator$fancy_forms$FancyForms$FormState$justChanged = function (model) {
	return {effect: $axelerator$fancy_forms$FancyForms$FormState$WasChanged, model: model};
};
var $axelerator$fancy_forms$FancyForms$FormState$justChangedInternally = function (model) {
	return {effect: $axelerator$fancy_forms$FancyForms$FormState$NoEffect, model: model};
};
var $axelerator$fancy_forms$FancyForms$FormState$noAttributes = F2(
	function (_v0, _v1) {
		return _List_Nil;
	});
var $axelerator$fancy_forms$FancyForms$FormState$updateFieldStatus = F2(
	function (status, effect) {
		var _v0 = _Utils_Tuple2(status, effect);
		switch (_v0.a.$) {
			case 'NotVisited':
				switch (_v0.b.$) {
					case 'NoEffect':
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						return $axelerator$fancy_forms$FancyForms$FormState$NotVisited;
					case 'WasChanged':
						var _v3 = _v0.a;
						var _v4 = _v0.b;
						return $axelerator$fancy_forms$FancyForms$FormState$Changed;
					case 'WasFocused':
						var _v5 = _v0.a;
						var _v6 = _v0.b;
						return $axelerator$fancy_forms$FancyForms$FormState$Focused;
					default:
						var _v7 = _v0.a;
						var _v8 = _v0.b;
						return $axelerator$fancy_forms$FancyForms$FormState$Blurred;
				}
			case 'Focused':
				switch (_v0.b.$) {
					case 'NoEffect':
						var _v9 = _v0.a;
						var _v10 = _v0.b;
						return $axelerator$fancy_forms$FancyForms$FormState$Focused;
					case 'WasChanged':
						var _v11 = _v0.a;
						var _v12 = _v0.b;
						return $axelerator$fancy_forms$FancyForms$FormState$Changed;
					case 'WasFocused':
						var _v13 = _v0.a;
						var _v14 = _v0.b;
						return $axelerator$fancy_forms$FancyForms$FormState$Focused;
					default:
						var _v15 = _v0.a;
						var _v16 = _v0.b;
						return $axelerator$fancy_forms$FancyForms$FormState$Blurred;
				}
			case 'Changed':
				if (_v0.b.$ === 'WasBlurred') {
					var _v17 = _v0.a;
					var _v18 = _v0.b;
					return $axelerator$fancy_forms$FancyForms$FormState$Blurred;
				} else {
					var _v19 = _v0.a;
					return $axelerator$fancy_forms$FancyForms$FormState$Changed;
				}
			default:
				var _v20 = _v0.a;
				return $axelerator$fancy_forms$FancyForms$FormState$Blurred;
		}
	});
var $axelerator$fancy_forms$FancyForms$Form$updateField = F5(
	function (_v0, fieldId, subfieldId, operation, fs) {
		var updates = _v0.updates;
		var formState = fs.a;
		var updateFn = A2(
			$elm$core$Maybe$withDefault,
			F3(
				function (_v3, _v4, modelValue_) {
					return _Utils_Tuple2(modelValue_, $axelerator$fancy_forms$FancyForms$FormState$NoEffect);
				}),
			A2($elm$core$Dict$get, fieldId, updates));
		var modelValue = A2($axelerator$fancy_forms$FancyForms$FormState$read, fieldId, fs);
		var _v1 = A3(updateFn, subfieldId, operation, modelValue);
		var updatedModelValue = _v1.a;
		var effect = _v1.b;
		var fieldStatus = function () {
			var currentStatus = function () {
				var _v2 = A2($elm$core$Dict$get, fieldId, formState.fieldStatus);
				if (_v2.$ === 'Nothing') {
					return $axelerator$fancy_forms$FancyForms$FormState$NotVisited;
				} else {
					var status = _v2.a;
					return status;
				}
			}();
			return A3(
				$elm$core$Dict$insert,
				fieldId,
				A2($axelerator$fancy_forms$FancyForms$FormState$updateFieldStatus, currentStatus, effect),
				formState.fieldStatus);
		}();
		return $axelerator$fancy_forms$FancyForms$FormState$FormState(
			_Utils_update(
				formState,
				{
					fieldStatus: fieldStatus,
					values: A3($elm$core$Dict$insert, fieldId, updatedModelValue, formState.values)
				}));
	});
var $axelerator$fancy_forms$FancyForms$Form$toWidget = function (f) {
	var value_ = function (formState) {
		return f.fn.combine(formState);
	};
	return {
		blur: $axelerator$fancy_forms$FancyForms$FormState$blurAll,
		decoderModel: $axelerator$fancy_forms$FancyForms$FormState$formStateDecoder,
		decoderMsg: $axelerator$fancy_forms$FancyForms$Form$decoderFormMsg,
		_default: f.fn.combine(
			A2($axelerator$fancy_forms$FancyForms$FormState$init, $elm$core$Dict$empty, '')),
		encodeModel: $axelerator$fancy_forms$FancyForms$FormState$formStateEncode,
		encodeMsg: $axelerator$fancy_forms$FancyForms$Form$encodeFormMsg,
		init: function (data) {
			return A2($axelerator$fancy_forms$FancyForms$Form$init, f, data);
		},
		innerAttributes: $axelerator$fancy_forms$FancyForms$FormState$noAttributes,
		isConsistent: f.isConsistent,
		update: F2(
			function (msg, model) {
				if (msg.$ === 'FormMsg') {
					var fieldId = msg.a;
					var subfieldId = msg.b;
					var value = msg.c;
					return $axelerator$fancy_forms$FancyForms$FormState$justChanged(
						A5($axelerator$fancy_forms$FancyForms$Form$updateField, f, fieldId, subfieldId, value, model));
				} else {
					return $axelerator$fancy_forms$FancyForms$FormState$justChangedInternally(model);
				}
			}),
		validate: f.validator,
		value: value_,
		view: F3(
			function (domId, innerAttrs, fs) {
				var model = fs.a;
				return A2(
					f.fn.view,
					$axelerator$fancy_forms$FancyForms$FormState$FormState(
						_Utils_update(
							model,
							{parentDomId: domId})),
					f.validator(
						value_(fs)));
			})
	};
};
var $mgold$elm_nonempty_list$List$Nonempty$Nonempty = F2(
	function (a, b) {
		return {$: 'Nonempty', a: a, b: b};
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $mgold$elm_nonempty_list$List$Nonempty$filter = F3(
	function (p, d, _v0) {
		var x = _v0.a;
		var xs = _v0.b;
		if (p(x)) {
			return A2(
				$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
				x,
				A2($elm$core$List$filter, p, xs));
		} else {
			var _v1 = A2($elm$core$List$filter, p, xs);
			if (!_v1.b) {
				return A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, d, _List_Nil);
			} else {
				var y = _v1.a;
				var ys = _v1.b;
				return A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, y, ys);
			}
		}
	});
var $mgold$elm_nonempty_list$List$Nonempty$head = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return x;
};
var $axelerator$fancy_forms$FancyForms$Widgets$Dropdown$fromString = F2(
	function (nel, s) {
		return $mgold$elm_nonempty_list$List$Nonempty$head(
			A3(
				$mgold$elm_nonempty_list$List$Nonempty$filter,
				function (_v0) {
					var id = _v0.id;
					return _Utils_eq(s, id);
				},
				$mgold$elm_nonempty_list$List$Nonempty$head(nel),
				nel)).value;
	});
var $axelerator$fancy_forms$FancyForms$Widgets$Dropdown$init = F2(
	function (variants, v) {
		return $mgold$elm_nonempty_list$List$Nonempty$head(
			A3(
				$mgold$elm_nonempty_list$List$Nonempty$filter,
				function (_v0) {
					var value = _v0.value;
					return _Utils_eq(value, v);
				},
				$mgold$elm_nonempty_list$List$Nonempty$head(variants),
				variants)).id;
	});
var $axelerator$fancy_forms$FancyForms$Widgets$Dropdown$update = F2(
	function (id, _v0) {
		return $axelerator$fancy_forms$FancyForms$FormState$justChanged(id);
	});
var $mgold$elm_nonempty_list$List$Nonempty$toList = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return A2($elm$core$List$cons, x, xs);
};
var $axelerator$fancy_forms$FancyForms$Widgets$Dropdown$all = $mgold$elm_nonempty_list$List$Nonempty$toList;
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$option = _VirtualDom_node('option');
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$selected = $elm$html$Html$Attributes$boolProperty('selected');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $axelerator$fancy_forms$FancyForms$Widgets$Dropdown$view = F4(
	function (variants, _v0, innerAttrs, selectedId) {
		var selectedValue = A2($axelerator$fancy_forms$FancyForms$Widgets$Dropdown$fromString, variants, selectedId);
		var opt = function (_v1) {
			var id = _v1.id;
			var label = _v1.label;
			var value = _v1.value;
			return A2(
				$elm$html$Html$option,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$value(id),
						$elm$html$Html$Attributes$selected(
						_Utils_eq(selectedValue, value))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(label)
					]));
		};
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$select,
				_Utils_ap(
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('dropdown'),
							$elm$html$Html$Events$onInput($elm$core$Basics$identity)
						]),
					innerAttrs),
				A2(
					$elm$core$List$map,
					opt,
					$axelerator$fancy_forms$FancyForms$Widgets$Dropdown$all(variants)))
			]);
	});
var $axelerator$fancy_forms$FancyForms$Widgets$Dropdown$dropdown = function (variants) {
	return {
		blur: $elm$core$Basics$identity,
		decoderModel: $elm$json$Json$Decode$string,
		decoderMsg: $elm$json$Json$Decode$string,
		_default: $mgold$elm_nonempty_list$List$Nonempty$head(variants).value,
		encodeModel: $elm$json$Json$Encode$string,
		encodeMsg: $elm$json$Json$Encode$string,
		init: $axelerator$fancy_forms$FancyForms$Widgets$Dropdown$init(variants),
		innerAttributes: $axelerator$fancy_forms$FancyForms$FormState$noAttributes,
		isConsistent: function (_v0) {
			return true;
		},
		update: $axelerator$fancy_forms$FancyForms$Widgets$Dropdown$update,
		validate: $axelerator$fancy_forms$FancyForms$FormState$alwaysValid,
		value: $axelerator$fancy_forms$FancyForms$Widgets$Dropdown$fromString(variants),
		view: $axelerator$fancy_forms$FancyForms$Widgets$Dropdown$view(variants)
	};
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $author$project$Pico$invalid = A2($elm$html$Html$Attributes$attribute, 'aria-invalid', 'true');
var $author$project$Pico$Form$markAsInvalid = F2(
	function (errors, _v0) {
		return $elm$core$List$isEmpty(errors) ? _List_Nil : _List_fromArray(
			[$author$project$Pico$invalid]);
	});
var $axelerator$fancy_forms$FancyForms$FormState$withInnerAttributes = F2(
	function (f, widget) {
		var combined = F2(
			function (errors, value) {
				return _Utils_ap(
					A2(widget.innerAttributes, errors, value),
					A2(f, errors, value));
			});
		return _Utils_update(
			widget,
			{innerAttributes: combined});
	});
var $elm$html$Html$Attributes$for = $elm$html$Html$Attributes$stringProperty('htmlFor');
var $elm$html$Html$label = _VirtualDom_node('label');
var $author$project$Pico$Form$contentWithLabel = F3(
	function (labelText, domId, content) {
		return A2(
			$elm$core$List$cons,
			A2(
				$elm$html$Html$label,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$for(domId)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(labelText)
					])),
			content);
	});
var $axelerator$fancy_forms$FancyForms$Form$wrap = F2(
	function (widget, container) {
		return _Utils_update(
			widget,
			{
				view: F3(
					function (domId, innerAttrs, model) {
						return A2(
							container,
							domId,
							A3(widget.view, domId, innerAttrs, model));
					})
			});
	});
var $author$project$Pico$Form$withLabel = F2(
	function (labelText, wrapped) {
		return A2(
			$axelerator$fancy_forms$FancyForms$Form$wrap,
			wrapped,
			$author$project$Pico$Form$contentWithLabel(labelText));
	});
var $author$project$Pico$Form$dropdown = F2(
	function (labelText, variants) {
		return A2(
			$axelerator$fancy_forms$FancyForms$FormState$withInnerAttributes,
			$author$project$Pico$Form$markAsInvalid,
			A2(
				$author$project$Pico$Form$withLabel,
				labelText,
				$axelerator$fancy_forms$FancyForms$Widgets$Dropdown$dropdown(variants)));
	});
var $author$project$Main$emailOrEmpty = function (c) {
	if (c.$ === 'Email') {
		var email = c.a;
		return email;
	} else {
		return '';
	}
};
var $axelerator$fancy_forms$FancyForms$Form$extractInit = F5(
	function (widget, fieldId, valueExtractor, formModel, formState) {
		var value = valueExtractor(formModel);
		var encodedValue = widget.encodeModel(
			widget.init(value));
		return A4($axelerator$fancy_forms$FancyForms$FormState$write, fieldId, $axelerator$fancy_forms$FancyForms$FormState$SingleValue, formState, encodedValue);
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Result$toMaybe = function (result) {
	if (result.$ === 'Ok') {
		var v = result.a;
		return $elm$core$Maybe$Just(v);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $axelerator$fancy_forms$FancyForms$Form$mkField = F3(
	function (fieldWithErrors, fieldId, widget) {
		var deserializeModel = function (formState) {
			return $elm$core$Result$toMaybe(
				A2(
					$elm$json$Json$Decode$decodeValue,
					widget.decoderModel,
					A2($axelerator$fancy_forms$FancyForms$FormState$read, fieldId, formState)));
		};
		var errors_ = function (formState) {
			return A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				A2(
					$elm$core$Maybe$map,
					widget.validate,
					A2(
						$elm$core$Maybe$map,
						widget.value,
						deserializeModel(formState))));
		};
		var value = function (formState) {
			return A2(
				$elm$core$Maybe$withDefault,
				widget._default,
				A2(
					$elm$core$Maybe$map,
					widget.value,
					deserializeModel(formState)));
		};
		var viewField = function (formState) {
			var parentDomId = formState.a.parentDomId;
			var widgetModel = deserializeModel(formState);
			var toMsg = function (msg) {
				return function (v) {
					return A3(
						$axelerator$fancy_forms$FancyForms$Form$FormMsg,
						fieldId,
						$axelerator$fancy_forms$FancyForms$FormState$SingleValue,
						$axelerator$fancy_forms$FancyForms$FormState$Update(v));
				}(
					widget.encodeMsg(msg));
			};
			var fieldErrors = A3($axelerator$fancy_forms$FancyForms$FormState$wasAtLeast, $axelerator$fancy_forms$FancyForms$FormState$Blurred, fieldId, formState) ? errors_(formState) : _List_Nil;
			var innerAttrs = A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				A2(
					$elm$core$Maybe$map,
					function (v) {
						return A2(widget.innerAttributes, fieldErrors, v);
					},
					A2($elm$core$Maybe$map, widget.value, widgetModel)));
			var inputHtml = A2(
				$elm$core$List$map,
				$elm$html$Html$map(toMsg),
				A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					A2(
						$elm$core$Maybe$map,
						A2(widget.view, parentDomId + ('f-' + fieldId), innerAttrs),
						widgetModel)));
			return A2(fieldWithErrors, fieldErrors, inputHtml);
		};
		return {errors: errors_, id: fieldId, multiple: false, value: value, view: viewField};
	});
var $axelerator$fancy_forms$FancyForms$Form$field = F3(
	function (extractDefault, widget, _v0) {
		var fn = _v0.fn;
		var count = _v0.count;
		var updates = _v0.updates;
		var fieldWithErrors = _v0.fieldWithErrors;
		var validator = _v0.validator;
		var blur = _v0.blur;
		var domId = _v0.domId;
		var isConsistent = _v0.isConsistent;
		var initWithData = _v0.initWithData;
		var fieldId = $elm$core$String$fromInt(count);
		return {
			blur: A2(
				$elm$core$Basics$composeR,
				blur,
				A2($axelerator$fancy_forms$FancyForms$FormState$blurChildren, fieldId, widget)),
			count: count + 1,
			domId: domId,
			fieldWithErrors: fieldWithErrors,
			fn: fn(
				A3($axelerator$fancy_forms$FancyForms$Form$mkField, fieldWithErrors, fieldId, widget)),
			initWithData: A2(
				$axelerator$fancy_forms$FancyForms$Form$extendInit,
				initWithData,
				A3($axelerator$fancy_forms$FancyForms$Form$extractInit, widget, fieldId, extractDefault)),
			isConsistent: A2(
				$axelerator$fancy_forms$FancyForms$Form$extendConsistencyCheck,
				isConsistent,
				A2($axelerator$fancy_forms$FancyForms$Form$extractConsistencyCheck, widget, fieldId)),
			updates: A3(
				$elm$core$Dict$insert,
				fieldId,
				A2($axelerator$fancy_forms$FancyForms$Form$encodedUpdate, widget, $elm$core$Maybe$Nothing),
				updates),
			validator: validator
		};
	});
var $axelerator$fancy_forms$FancyForms$Widgets$Text$Blurred = {$: 'Blurred'};
var $axelerator$fancy_forms$FancyForms$Widgets$Text$Changed = function (a) {
	return {$: 'Changed', a: a};
};
var $axelerator$fancy_forms$FancyForms$Widgets$Text$Focused = {$: 'Focused'};
var $axelerator$fancy_forms$FancyForms$Widgets$Text$decoderMsg = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$andThen,
			function (s) {
				switch (s) {
					case 'Focused':
						return $elm$json$Json$Decode$succeed($axelerator$fancy_forms$FancyForms$Widgets$Text$Focused);
					case 'Blurred':
						return $elm$json$Json$Decode$succeed($axelerator$fancy_forms$FancyForms$Widgets$Text$Blurred);
					default:
						return $elm$json$Json$Decode$fail('Expected \'Focused\' or \'Blurred\'');
				}
			},
			$elm$json$Json$Decode$string),
			A2(
			$elm$json$Json$Decode$map,
			$axelerator$fancy_forms$FancyForms$Widgets$Text$Changed,
			A2($elm$json$Json$Decode$field, 'Changed', $elm$json$Json$Decode$string))
		]));
var $axelerator$fancy_forms$FancyForms$Widgets$Text$encodeMsg = function (msg) {
	switch (msg.$) {
		case 'Changed':
			var s = msg.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'Changed',
						$elm$json$Json$Encode$string(s))
					]));
		case 'Focused':
			return $elm$json$Json$Encode$string('Focused');
		default:
			return $elm$json$Json$Encode$string('Blurred');
	}
};
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$Events$onBlur = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'blur',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onFocus = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'focus',
		$elm$json$Json$Decode$succeed(msg));
};
var $axelerator$fancy_forms$FancyForms$FormState$WasBlurred = {$: 'WasBlurred'};
var $axelerator$fancy_forms$FancyForms$FormState$withBlur = function (model) {
	return {effect: $axelerator$fancy_forms$FancyForms$FormState$WasBlurred, model: model};
};
var $axelerator$fancy_forms$FancyForms$FormState$WasFocused = {$: 'WasFocused'};
var $axelerator$fancy_forms$FancyForms$FormState$withFocus = function (model) {
	return {effect: $axelerator$fancy_forms$FancyForms$FormState$WasFocused, model: model};
};
var $axelerator$fancy_forms$FancyForms$Widgets$Text$textInput = function (attrs) {
	return {
		blur: $elm$core$Basics$identity,
		decoderModel: $elm$json$Json$Decode$string,
		decoderMsg: $axelerator$fancy_forms$FancyForms$Widgets$Text$decoderMsg,
		_default: '',
		encodeModel: $elm$json$Json$Encode$string,
		encodeMsg: $axelerator$fancy_forms$FancyForms$Widgets$Text$encodeMsg,
		init: $elm$core$Basics$identity,
		innerAttributes: $axelerator$fancy_forms$FancyForms$FormState$noAttributes,
		isConsistent: function (_v0) {
			return true;
		},
		update: F2(
			function (msg, model) {
				switch (msg.$) {
					case 'Focused':
						return $axelerator$fancy_forms$FancyForms$FormState$withFocus(model);
					case 'Blurred':
						return $axelerator$fancy_forms$FancyForms$FormState$withBlur(model);
					default:
						var s = msg.a;
						return $axelerator$fancy_forms$FancyForms$FormState$justChanged(s);
				}
			}),
		validate: $axelerator$fancy_forms$FancyForms$FormState$alwaysValid,
		value: $elm$core$Basics$identity,
		view: F3(
			function (domId, innerAttrs, model) {
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						$elm$core$List$concat(
							_List_fromArray(
								[
									attrs,
									innerAttrs,
									_List_fromArray(
									[
										$elm$html$Html$Attributes$id(domId),
										$elm$html$Html$Events$onInput($axelerator$fancy_forms$FancyForms$Widgets$Text$Changed),
										$elm$html$Html$Events$onFocus($axelerator$fancy_forms$FancyForms$Widgets$Text$Focused),
										$elm$html$Html$Events$onBlur($axelerator$fancy_forms$FancyForms$Widgets$Text$Blurred),
										$elm$html$Html$Attributes$value(model)
									])
								])),
						_List_Nil)
					]);
			})
	};
};
var $author$project$Pico$Form$textInput = function (labelText) {
	return A2(
		$axelerator$fancy_forms$FancyForms$FormState$withInnerAttributes,
		$author$project$Pico$Form$markAsInvalid,
		A2(
			$author$project$Pico$Form$withLabel,
			labelText,
			$axelerator$fancy_forms$FancyForms$Widgets$Text$textInput(_List_Nil)));
};
var $author$project$Main$emailForm = A3(
	$axelerator$fancy_forms$FancyForms$Form$field,
	$author$project$Main$emailOrEmpty,
	$author$project$Pico$Form$textInput('E-Mail address'),
	A4(
		$axelerator$fancy_forms$FancyForms$Form$form,
		F2(
			function (_v0, html) {
				return html;
			}),
		$axelerator$fancy_forms$FancyForms$FormState$alwaysValid,
		'email-form',
		function (email) {
			return {
				combine: function (formState) {
					return $author$project$Main$Email(
						email.value(formState));
				},
				view: F2(
					function (formState, _v1) {
						return _List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_Nil,
								email.view(formState))
							]);
					})
			};
		}));
var $mgold$elm_nonempty_list$List$Nonempty$append = F2(
	function (_v0, _v1) {
		var x = _v0.a;
		var xs = _v0.b;
		var y = _v1.a;
		var ys = _v1.b;
		return A2(
			$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
			x,
			_Utils_ap(
				xs,
				A2($elm$core$List$cons, y, ys)));
	});
var $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$selectorFieldId = 'selectorValue';
var $elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
	});
var $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$variantWidgetInit = F3(
	function (variantWidgets, extractVariantName, value_) {
		var variantInit = F2(
			function (_v0, dict) {
				var variantName = _v0.a;
				var variantW = _v0.b;
				return function (v) {
					return A3($elm$core$Dict$insert, variantName, v, dict);
				}(
					variantW.encodeModel(
						variantW.init(value_)));
			});
		var values = A2(
			$elm$core$Dict$singleton,
			$axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$selectorFieldId,
			$elm$json$Json$Encode$string(
				extractVariantName(value_)));
		var values_ = A3(
			$elm$core$List$foldl,
			variantInit,
			values,
			$mgold$elm_nonempty_list$List$Nonempty$toList(variantWidgets));
		return $axelerator$fancy_forms$FancyForms$FormState$FormState(
			{allBlurred: false, fieldStatus: $elm$core$Dict$empty, parentDomId: '0', values: values_});
	});
var $axelerator$fancy_forms$FancyForms$Form$extractVariantInit = F6(
	function (variantsWithWidgets, fieldId, valueExtractor, variantNameExtractor, formModel, formState) {
		var value = valueExtractor(formModel);
		var encodedValue = $axelerator$fancy_forms$FancyForms$FormState$formStateEncode(
			A3($axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$variantWidgetInit, variantsWithWidgets, variantNameExtractor, value));
		return A4($axelerator$fancy_forms$FancyForms$FormState$write, fieldId, $axelerator$fancy_forms$FancyForms$FormState$SingleValue, formState, encodedValue);
	});
var $mgold$elm_nonempty_list$List$Nonempty$fromList = function (ys) {
	if (ys.b) {
		var x = ys.a;
		var xs = ys.b;
		return $elm$core$Maybe$Just(
			A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mgold$elm_nonempty_list$List$Nonempty$map = F2(
	function (f, _v0) {
		var x = _v0.a;
		var xs = _v0.b;
		return A2(
			$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
			f(x),
			A2($elm$core$List$map, f, xs));
	});
var $mgold$elm_nonempty_list$List$Nonempty$singleton = function (x) {
	return A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, x, _List_Nil);
};
var $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$blur = F3(
	function (variantSelector, variantWidgets, formState) {
		var withBlurredSelector = A3($axelerator$fancy_forms$FancyForms$FormState$blurChildren, $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$selectorFieldId, variantSelector, formState);
		var folder = F2(
			function (_v0, fs) {
				var fieldId = _v0.a;
				var widget = _v0.b;
				return A3($axelerator$fancy_forms$FancyForms$FormState$blurChildren, fieldId, widget, fs);
			});
		return A3($elm$core$List$foldl, folder, withBlurredSelector, variantWidgets);
	});
var $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$ForVariant = F2(
	function (a, b) {
		return {$: 'ForVariant', a: a, b: b};
	});
var $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$ForVariantSelect = function (a) {
	return {$: 'ForVariantSelect', a: a};
};
var $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$decoderMsg = A2(
	$elm$json$Json$Decode$andThen,
	function (kind) {
		switch (kind) {
			case 'ForVariantSelect':
				return A2(
					$elm$json$Json$Decode$map,
					$axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$ForVariantSelect,
					A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$value));
			case 'ForVariant':
				return A3(
					$elm$json$Json$Decode$map2,
					$axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$ForVariant,
					A2($elm$json$Json$Decode$field, 'variantName', $elm$json$Json$Decode$string),
					A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$value));
			default:
				return $elm$json$Json$Decode$fail('unknown kind');
		}
	},
	A2($elm$json$Json$Decode$field, 'kind', $elm$json$Json$Decode$string));
var $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$encodeMsg = function (msg) {
	if (msg.$ === 'ForVariantSelect') {
		var v = msg.a;
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'kind',
					$elm$json$Json$Encode$string('ForVariantSelect')),
					_Utils_Tuple2('value', v)
				]));
	} else {
		var variantName = msg.a;
		var v = msg.b;
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'kind',
					$elm$json$Json$Encode$string('ForVariant')),
					_Utils_Tuple2(
					'variantName',
					$elm$json$Json$Encode$string(variantName)),
					_Utils_Tuple2('value', v)
				]));
	}
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$value = F3(
	function (defaultVariantName, widget, formState) {
		return A2(
			$elm$core$Result$withDefault,
			defaultVariantName,
			A2(
				$elm$core$Result$map,
				widget.value,
				A2(
					$elm$json$Json$Decode$decodeValue,
					widget.decoderModel,
					A2($axelerator$fancy_forms$FancyForms$FormState$read, $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$selectorFieldId, formState))));
	});
var $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$selectedValue = F3(
	function (variantSelectWidget, variantWidgets, model) {
		var defaultVariantName = $mgold$elm_nonempty_list$List$Nonempty$head(variantWidgets).a;
		var selectedVariantName = A3($axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$value, defaultVariantName, variantSelectWidget, model);
		var selectedWidget = A2(
			$elm$core$Maybe$withDefault,
			$mgold$elm_nonempty_list$List$Nonempty$head(variantWidgets),
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (_v0) {
						var name = _v0.a;
						return _Utils_eq(name, selectedVariantName);
					},
					$mgold$elm_nonempty_list$List$Nonempty$toList(variantWidgets)))).b;
		return A2(
			$elm$core$Result$withDefault,
			selectedWidget._default,
			A2(
				$elm$core$Result$map,
				selectedWidget.value,
				A2(
					$elm$json$Json$Decode$decodeValue,
					selectedWidget.decoderModel,
					A2($axelerator$fancy_forms$FancyForms$FormState$read, selectedVariantName, model))));
	});
var $axelerator$fancy_forms$FancyForms$FormState$encodedUpdate = F4(
	function (widget, subfieldId, operation, modelVal) {
		var decoderMsg = widget.decoderMsg;
		var decoderModel = widget.decoderModel;
		var encodeModel = widget.encodeModel;
		var encodeSubfield = function (updatedModel) {
			if (subfieldId.$ === 'SingleValue') {
				return encodeModel(updatedModel);
			} else {
				var i = subfieldId.a;
				return A2(
					$elm$json$Json$Encode$list,
					encodeModel,
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (idx, e) {
								return _Utils_eq(idx, i) ? updatedModel : e;
							}),
						A2(
							$elm$core$Result$withDefault,
							_List_Nil,
							A2(
								$elm$json$Json$Decode$decodeValue,
								$elm$json$Json$Decode$list(decoderModel),
								modelVal))));
			}
		};
		var decodeSubfield = function () {
			if (subfieldId.$ === 'SingleValue') {
				return decoderModel;
			} else {
				var i = subfieldId.a;
				return A2($elm$json$Json$Decode$index, i, decoderModel);
			}
		}();
		var _v0 = _Utils_Tuple2(operation, subfieldId);
		_v0$3:
		while (true) {
			switch (_v0.a.$) {
				case 'Add':
					if (_v0.b.$ === 'ArrayElement') {
						var _v1 = _v0.a;
						return function (list) {
							return A2(
								$elm$json$Json$Encode$list,
								encodeModel,
								_Utils_ap(
									list,
									_List_fromArray(
										[
											widget.init(widget._default)
										])));
						}(
							A2(
								$elm$core$Result$withDefault,
								_List_Nil,
								A2(
									$elm$json$Json$Decode$decodeValue,
									$elm$json$Json$Decode$list(decoderModel),
									modelVal)));
					} else {
						break _v0$3;
					}
				case 'Remove':
					if (_v0.b.$ === 'ArrayElement') {
						var _v2 = _v0.a;
						var i = _v0.b.a;
						return A2(
							$elm$json$Json$Encode$list,
							encodeModel,
							function (list) {
								return _Utils_ap(
									A2($elm$core$List$take, i, list),
									A2($elm$core$List$drop, i + 1, list));
							}(
								A2(
									$elm$core$Result$withDefault,
									_List_Nil,
									A2(
										$elm$json$Json$Decode$decodeValue,
										$elm$json$Json$Decode$list(decoderModel),
										modelVal))));
					} else {
						break _v0$3;
					}
				default:
					var msgVal = _v0.a.a;
					var _v3 = _Utils_Tuple2(
						A2($elm$json$Json$Decode$decodeValue, decoderMsg, msgVal),
						A2($elm$json$Json$Decode$decodeValue, decodeSubfield, modelVal));
					if ((_v3.a.$ === 'Ok') && (_v3.b.$ === 'Ok')) {
						var msg = _v3.a.a;
						var model = _v3.b.a;
						return encodeSubfield(
							A2(widget.update, msg, model).model);
					} else {
						return modelVal;
					}
			}
		}
		return modelVal;
	});
var $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$widgetByName = F2(
	function (variantWidgets, variantName) {
		return A2(
			$elm$core$Maybe$withDefault,
			$mgold$elm_nonempty_list$List$Nonempty$head(variantWidgets).b,
			$elm$core$List$head(
				A2(
					$elm$core$List$map,
					$elm$core$Tuple$second,
					A2(
						$elm$core$List$filter,
						function (_v0) {
							var name = _v0.a;
							return _Utils_eq(name, variantName);
						},
						$mgold$elm_nonempty_list$List$Nonempty$toList(variantWidgets)))));
	});
var $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$update = F4(
	function (variantSelector, variantWidgets, msg, model) {
		if (msg.$ === 'ForVariant') {
			var variantName = msg.a;
			var subMsgVal = msg.b;
			return A4(
				$axelerator$fancy_forms$FancyForms$FormState$write,
				variantName,
				$axelerator$fancy_forms$FancyForms$FormState$SingleValue,
				model,
				A4(
					$axelerator$fancy_forms$FancyForms$FormState$encodedUpdate,
					A2($axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$widgetByName, variantWidgets, variantName),
					$axelerator$fancy_forms$FancyForms$FormState$SingleValue,
					$axelerator$fancy_forms$FancyForms$FormState$Update(subMsgVal),
					A2($axelerator$fancy_forms$FancyForms$FormState$read, variantName, model)));
		} else {
			var subMsgVal = msg.a;
			return A4(
				$axelerator$fancy_forms$FancyForms$FormState$write,
				$axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$selectorFieldId,
				$axelerator$fancy_forms$FancyForms$FormState$SingleValue,
				model,
				A4(
					$axelerator$fancy_forms$FancyForms$FormState$encodedUpdate,
					variantSelector,
					$axelerator$fancy_forms$FancyForms$FormState$SingleValue,
					$axelerator$fancy_forms$FancyForms$FormState$Update(subMsgVal),
					A2($axelerator$fancy_forms$FancyForms$FormState$read, $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$selectorFieldId, model)));
		}
	});
var $axelerator$fancy_forms$FancyForms$FormState$subId = F3(
	function (parentDomId, fieldId, subfieldId) {
		return A2(
			$elm$core$String$join,
			'-',
			_List_fromArray(
				[
					parentDomId,
					A2($axelerator$fancy_forms$FancyForms$FormState$toKey, fieldId, subfieldId)
				]));
	});
var $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$view = F6(
	function (defaultVariantName, variantSelectWidget, variantWidgets, domId, innerAttrs, model) {
		var variantView = function (_v1) {
			var variantName = _v1.a;
			var variantW = _v1.b;
			return A2(
				$elm$core$Result$withDefault,
				_List_fromArray(
					[
						$elm$html$Html$text('Could not decode variant')
					]),
				A2(
					$elm$core$Result$map,
					function (variantModel) {
						return A2(
							$elm$core$List$map,
							function (html) {
								return A2(
									$elm$html$Html$map,
									function (m) {
										return A2(
											$axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$ForVariant,
											variantName,
											variantW.encodeMsg(m));
									},
									html);
							},
							A3(
								variantW.view,
								_Utils_ap(domId, variantName),
								_List_Nil,
								variantModel));
					},
					A2(
						$elm$json$Json$Decode$decodeValue,
						variantW.decoderModel,
						A2($axelerator$fancy_forms$FancyForms$FormState$read, variantName, model))));
		};
		var selectedVariantName = A3($axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$value, defaultVariantName, variantSelectWidget, model);
		var variantSelectorHtml = A2(
			$elm$core$List$map,
			$elm$html$Html$map(
				function (msg) {
					return $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$ForVariantSelect(
						variantSelectWidget.encodeMsg(msg));
				}),
			A3(
				variantSelectWidget.view,
				A3($axelerator$fancy_forms$FancyForms$FormState$subId, domId, $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$selectorFieldId, $axelerator$fancy_forms$FancyForms$FormState$SingleValue),
				_List_Nil,
				variantSelectWidget.init(selectedVariantName)));
		var variantsHtml = $elm$core$List$concat(
			A2(
				$elm$core$List$map,
				variantView,
				A2(
					$elm$core$List$filter,
					function (_v0) {
						var name = _v0.a;
						return _Utils_eq(name, selectedVariantName);
					},
					variantWidgets)));
		return _Utils_ap(variantSelectorHtml, variantsHtml);
	});
var $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$variantWidget = F4(
	function (variantSelector, variantNameExtractor, defaultVariantName, variantWidgets) {
		return {
			blur: A2(
				$axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$blur,
				variantSelector,
				$mgold$elm_nonempty_list$List$Nonempty$toList(variantWidgets)),
			decoderModel: $axelerator$fancy_forms$FancyForms$FormState$formStateDecoder,
			decoderMsg: $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$decoderMsg,
			_default: $mgold$elm_nonempty_list$List$Nonempty$head(variantWidgets).b._default,
			encodeModel: $axelerator$fancy_forms$FancyForms$FormState$formStateEncode,
			encodeMsg: $axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$encodeMsg,
			init: A2($axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$variantWidgetInit, variantWidgets, variantNameExtractor),
			innerAttributes: $axelerator$fancy_forms$FancyForms$FormState$noAttributes,
			isConsistent: function (_v0) {
				return true;
			},
			update: F2(
				function (msg, model) {
					return $axelerator$fancy_forms$FancyForms$FormState$justChanged(
						A4($axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$update, variantSelector, variantWidgets, msg, model));
				}),
			validate: $axelerator$fancy_forms$FancyForms$FormState$alwaysValid,
			value: A2($axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$selectedValue, variantSelector, variantWidgets),
			view: A3(
				$axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$view,
				defaultVariantName,
				variantSelector,
				$mgold$elm_nonempty_list$List$Nonempty$toList(variantWidgets))
		};
	});
var $axelerator$fancy_forms$FancyForms$Form$fieldWithVariants = F6(
	function (extractDefault, variantSelector, defaultVariant, otherVariants, extractVariantName, _v0) {
		var fn = _v0.fn;
		var count = _v0.count;
		var updates = _v0.updates;
		var fieldWithErrors = _v0.fieldWithErrors;
		var validator = _v0.validator;
		var blur = _v0.blur;
		var domId = _v0.domId;
		var isConsistent = _v0.isConsistent;
		var initWithData = _v0.initWithData;
		var toWidgetVariant = function (_v3) {
			var n = _v3.a;
			var f = _v3.b;
			return _Utils_Tuple2(
				n,
				$axelerator$fancy_forms$FancyForms$Form$toWidget(f));
		};
		var otherAsNonEmptyList = $mgold$elm_nonempty_list$List$Nonempty$fromList(
			A2($elm$core$List$map, toWidgetVariant, otherVariants));
		var mkVariant = function (_v2) {
			var name = _v2.a;
			return {id: name, label: name, value: name};
		};
		var fieldId = $elm$core$String$fromInt(count);
		var defaultAsNonEmptyList = $mgold$elm_nonempty_list$List$Nonempty$singleton(
			toWidgetVariant(defaultVariant));
		var variantsWithWidgets = function () {
			if (otherAsNonEmptyList.$ === 'Just') {
				var nel = otherAsNonEmptyList.a;
				return A2($mgold$elm_nonempty_list$List$Nonempty$append, defaultAsNonEmptyList, nel);
			} else {
				return defaultAsNonEmptyList;
			}
		}();
		var widget = A4(
			$axelerator$fancy_forms$FancyForms$Widgets$VariantSelect$variantWidget,
			variantSelector(
				A2($mgold$elm_nonempty_list$List$Nonempty$map, mkVariant, variantsWithWidgets)),
			extractVariantName,
			$mgold$elm_nonempty_list$List$Nonempty$head(variantsWithWidgets).a,
			variantsWithWidgets);
		return {
			blur: A2(
				$elm$core$Basics$composeR,
				blur,
				A2($axelerator$fancy_forms$FancyForms$FormState$blurChildren, fieldId, widget)),
			count: count + 1,
			domId: domId,
			fieldWithErrors: fieldWithErrors,
			fn: fn(
				A3($axelerator$fancy_forms$FancyForms$Form$mkField, fieldWithErrors, fieldId, widget)),
			initWithData: A2(
				$axelerator$fancy_forms$FancyForms$Form$extendInit,
				initWithData,
				A4($axelerator$fancy_forms$FancyForms$Form$extractVariantInit, variantsWithWidgets, fieldId, extractDefault, extractVariantName)),
			isConsistent: A2(
				$axelerator$fancy_forms$FancyForms$Form$extendConsistencyCheck,
				isConsistent,
				A2($axelerator$fancy_forms$FancyForms$Form$extractConsistencyCheck, widget, fieldId)),
			updates: A3(
				$elm$core$Dict$insert,
				fieldId,
				A2($axelerator$fancy_forms$FancyForms$Form$encodedUpdate, widget, $elm$core$Maybe$Nothing),
				updates),
			validator: validator
		};
	});
var $author$project$Main$Phone = function (a) {
	return {$: 'Phone', a: a};
};
var $axelerator$fancy_forms$FancyForms$Widgets$Int$Blurred = {$: 'Blurred'};
var $axelerator$fancy_forms$FancyForms$Widgets$Int$Changed = function (a) {
	return {$: 'Changed', a: a};
};
var $axelerator$fancy_forms$FancyForms$Widgets$Int$Focused = {$: 'Focused'};
var $axelerator$fancy_forms$FancyForms$Widgets$Int$Model = F2(
	function (value, parsedValue) {
		return {parsedValue: parsedValue, value: value};
	});
var $axelerator$fancy_forms$FancyForms$Widgets$Int$decoderMsg = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$andThen,
			function (s) {
				switch (s) {
					case 'Focused':
						return $elm$json$Json$Decode$succeed($axelerator$fancy_forms$FancyForms$Widgets$Int$Focused);
					case 'Blurred':
						return $elm$json$Json$Decode$succeed($axelerator$fancy_forms$FancyForms$Widgets$Int$Blurred);
					default:
						return $elm$json$Json$Decode$fail('');
				}
			},
			$elm$json$Json$Decode$string),
			A2(
			$elm$json$Json$Decode$map,
			$axelerator$fancy_forms$FancyForms$Widgets$Int$Changed,
			A2($elm$json$Json$Decode$field, 'Changed', $elm$json$Json$Decode$string))
		]));
var $axelerator$fancy_forms$FancyForms$Widgets$Int$encodeMsg = function (msg) {
	switch (msg.$) {
		case 'Focused':
			return $elm$json$Json$Encode$string('Focused');
		case 'Blurred':
			return $elm$json$Json$Encode$string('Blurred');
		default:
			var s = msg.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'Changed',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $axelerator$fancy_forms$FancyForms$Widgets$Int$integerInput = function (attrs) {
	return {
		blur: $elm$core$Basics$identity,
		decoderModel: A3(
			$elm$json$Json$Decode$map2,
			$axelerator$fancy_forms$FancyForms$Widgets$Int$Model,
			A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$string),
			A2($elm$json$Json$Decode$field, 'parsedValue', $elm$json$Json$Decode$int)),
		decoderMsg: $axelerator$fancy_forms$FancyForms$Widgets$Int$decoderMsg,
		_default: 0,
		encodeModel: function (model) {
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'value',
						$elm$json$Json$Encode$string(model.value)),
						_Utils_Tuple2(
						'parsedValue',
						$elm$json$Json$Encode$int(model.parsedValue))
					]));
		},
		encodeMsg: $axelerator$fancy_forms$FancyForms$Widgets$Int$encodeMsg,
		init: function (i) {
			return {
				parsedValue: i,
				value: $elm$core$String$fromInt(i)
			};
		},
		innerAttributes: $axelerator$fancy_forms$FancyForms$FormState$noAttributes,
		isConsistent: function (_v0) {
			var parsedValue = _v0.parsedValue;
			var value = _v0.value;
			return _Utils_eq(
				$elm$core$String$toInt(value),
				$elm$core$Maybe$Just(parsedValue));
		},
		update: F2(
			function (msg, model) {
				switch (msg.$) {
					case 'Changed':
						var val = msg.a;
						return $axelerator$fancy_forms$FancyForms$FormState$justChanged(
							A2(
								$elm$core$Maybe$withDefault,
								_Utils_update(
									model,
									{value: val}),
								A2(
									$elm$core$Maybe$map,
									function (i) {
										return _Utils_update(
											model,
											{parsedValue: i, value: val});
									},
									$elm$core$String$toInt(val))));
					case 'Focused':
						return $axelerator$fancy_forms$FancyForms$FormState$withFocus(model);
					default:
						return $axelerator$fancy_forms$FancyForms$FormState$withBlur(model);
				}
			}),
		validate: $axelerator$fancy_forms$FancyForms$FormState$alwaysValid,
		value: function ($) {
			return $.parsedValue;
		},
		view: F3(
			function (domId, innerAttrs, model) {
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						$elm$core$List$concat(
							_List_fromArray(
								[
									attrs,
									innerAttrs,
									_List_fromArray(
									[
										$elm$html$Html$Attributes$id(domId),
										$elm$html$Html$Attributes$type_('number'),
										$elm$html$Html$Events$onInput($axelerator$fancy_forms$FancyForms$Widgets$Int$Changed),
										$elm$html$Html$Events$onFocus($axelerator$fancy_forms$FancyForms$Widgets$Int$Focused),
										$elm$html$Html$Events$onBlur($axelerator$fancy_forms$FancyForms$Widgets$Int$Blurred),
										$elm$html$Html$Attributes$value(model.value)
									])
								])),
						_List_Nil)
					]);
			})
	};
};
var $author$project$Pico$Form$integerInput = function (labelText) {
	return A2(
		$axelerator$fancy_forms$FancyForms$FormState$withInnerAttributes,
		$author$project$Pico$Form$markAsInvalid,
		A2(
			$author$project$Pico$Form$withLabel,
			labelText,
			$axelerator$fancy_forms$FancyForms$Widgets$Int$integerInput(_List_Nil)));
};
var $author$project$Main$numberDetails = function (c) {
	if (c.$ === 'Email') {
		return {countryCode: 0, number: 0};
	} else {
		var details = c.a;
		return details;
	}
};
var $author$project$Main$phoneForm = A3(
	$axelerator$fancy_forms$FancyForms$Form$field,
	A2(
		$elm$core$Basics$composeR,
		$author$project$Main$numberDetails,
		function ($) {
			return $.number;
		}),
	$author$project$Pico$Form$integerInput('Number'),
	A3(
		$axelerator$fancy_forms$FancyForms$Form$field,
		A2(
			$elm$core$Basics$composeR,
			$author$project$Main$numberDetails,
			function ($) {
				return $.countryCode;
			}),
		$author$project$Pico$Form$integerInput('Country code'),
		A4(
			$axelerator$fancy_forms$FancyForms$Form$form,
			F2(
				function (_v0, html) {
					return html;
				}),
			$axelerator$fancy_forms$FancyForms$FormState$alwaysValid,
			'email-form',
			F2(
				function (countryCode, number) {
					return {
						combine: function (formState) {
							return $author$project$Main$Phone(
								{
									countryCode: countryCode.value(formState),
									number: number.value(formState)
								});
						},
						view: F2(
							function (formState, _v1) {
								return _List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('grid')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$div,
												_List_Nil,
												countryCode.view(formState)),
												A2(
												$elm$html$Html$div,
												_List_Nil,
												number.view(formState))
											]))
									]);
							})
					};
				}))));
var $author$project$Main$variantForm = A6(
	$axelerator$fancy_forms$FancyForms$Form$fieldWithVariants,
	$elm$core$Basics$identity,
	$author$project$Pico$Form$dropdown('Contact'),
	_Utils_Tuple2('E-Mail', $author$project$Main$emailForm),
	_List_fromArray(
		[
			_Utils_Tuple2('Phone number', $author$project$Main$phoneForm)
		]),
	function (c) {
		if (c.$ === 'Email') {
			return 'E-Mail';
		} else {
			return 'Phone number';
		}
	},
	A4(
		$axelerator$fancy_forms$FancyForms$Form$form,
		F2(
			function (_v0, html) {
				return html;
			}),
		$axelerator$fancy_forms$FancyForms$FormState$alwaysValid,
		'variant-example',
		function (contact) {
			return {
				combine: function (formState) {
					return contact.value(formState);
				},
				view: F2(
					function (formState, _v1) {
						return contact.view(formState);
					})
			};
		}));
var $author$project$Main$combinedForm = A6(
	$axelerator$fancy_forms$FancyForms$Form$listField,
	$author$project$Main$contactsWithAddButton,
	$author$project$Main$contactWithRemoveButton,
	$author$project$Main$Email(''),
	$elm$core$Basics$identity,
	$axelerator$fancy_forms$FancyForms$Form$toWidget($author$project$Main$variantForm),
	A4(
		$axelerator$fancy_forms$FancyForms$Form$form,
		F2(
			function (_v0, html) {
				return html;
			}),
		$axelerator$fancy_forms$FancyForms$FormState$alwaysValid,
		'variant-example',
		function (contact) {
			return {
				combine: function (formState) {
					return contact.value(formState);
				},
				view: F2(
					function (formState, _v1) {
						return contact.view(formState);
					})
			};
		}));
var $axelerator$fancy_forms$FancyForms$Widgets$Date$Blurred = {$: 'Blurred'};
var $axelerator$fancy_forms$FancyForms$Widgets$Date$Changed = function (a) {
	return {$: 'Changed', a: a};
};
var $axelerator$fancy_forms$FancyForms$Widgets$Date$Focused = {$: 'Focused'};
var $axelerator$fancy_forms$FancyForms$Widgets$Date$Model = F2(
	function (value, parsedValue) {
		return {parsedValue: parsedValue, value: value};
	});
var $axelerator$fancy_forms$FancyForms$Widgets$Date$decoderMsg = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$andThen,
			function (s) {
				switch (s) {
					case 'Focused':
						return $elm$json$Json$Decode$succeed($axelerator$fancy_forms$FancyForms$Widgets$Date$Focused);
					case 'Blurred':
						return $elm$json$Json$Decode$succeed($axelerator$fancy_forms$FancyForms$Widgets$Date$Blurred);
					default:
						return $elm$json$Json$Decode$fail('');
				}
			},
			$elm$json$Json$Decode$string),
			A2(
			$elm$json$Json$Decode$map,
			$axelerator$fancy_forms$FancyForms$Widgets$Date$Changed,
			A2($elm$json$Json$Decode$field, 'Changed', $elm$json$Json$Decode$string))
		]));
var $axelerator$fancy_forms$FancyForms$Widgets$Date$encodeMsg = function (msg) {
	switch (msg.$) {
		case 'Focused':
			return $elm$json$Json$Encode$string('Focused');
		case 'Blurred':
			return $elm$json$Json$Encode$string('Blurred');
		default:
			var s = msg.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'Changed',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					var _v2 = callback(a);
					var parseB = _v2.a;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $justinmimbs$date$Date$deadEndToString = function (_v0) {
	var problem = _v0.problem;
	if (problem.$ === 'Problem') {
		var message = problem.a;
		return message;
	} else {
		return 'Expected a date in ISO 8601 format';
	}
};
var $elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var $elm$parser$Parser$Advanced$end = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				$elm$core$String$length(s.src),
				s.offset) ? A3($elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $justinmimbs$date$Date$MonthAndDay = F2(
	function (a, b) {
		return {$: 'MonthAndDay', a: a, b: b};
	});
var $justinmimbs$date$Date$OrdinalDay = function (a) {
	return {$: 'OrdinalDay', a: a};
};
var $justinmimbs$date$Date$WeekAndWeekday = F2(
	function (a, b) {
		return {$: 'WeekAndWeekday', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$backtrackable = function (_v0) {
	var parse = _v0.a;
	return $elm$parser$Parser$Advanced$Parser(
		function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 'Bad') {
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, false, x);
			} else {
				var a = _v1.b;
				var s1 = _v1.c;
				return A3($elm$parser$Parser$Advanced$Good, false, a, s1);
			}
		});
};
var $elm$parser$Parser$backtrackable = $elm$parser$Parser$Advanced$backtrackable;
var $elm$parser$Parser$Advanced$commit = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, true, a, s);
		});
};
var $elm$parser$Parser$commit = $elm$parser$Parser$Advanced$commit;
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var $elm$parser$Parser$mapChompedString = $elm$parser$Parser$Advanced$mapChompedString;
var $justinmimbs$date$Date$int1 = A2(
	$elm$parser$Parser$mapChompedString,
	F2(
		function (str, _v0) {
			return A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(str));
		}),
	$elm$parser$Parser$chompIf($elm$core$Char$isDigit));
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $justinmimbs$date$Date$int2 = A2(
	$elm$parser$Parser$mapChompedString,
	F2(
		function (str, _v0) {
			return A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(str));
		}),
	A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(_Utils_Tuple0),
			$elm$parser$Parser$chompIf($elm$core$Char$isDigit)),
		$elm$parser$Parser$chompIf($elm$core$Char$isDigit)));
var $justinmimbs$date$Date$int3 = A2(
	$elm$parser$Parser$mapChompedString,
	F2(
		function (str, _v0) {
			return A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(str));
		}),
	A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(_Utils_Tuple0),
				$elm$parser$Parser$chompIf($elm$core$Char$isDigit)),
			$elm$parser$Parser$chompIf($elm$core$Char$isDigit)),
		$elm$parser$Parser$chompIf($elm$core$Char$isDigit)));
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 'Expecting', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$core$Basics$not = _Basics_not;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$token = function (str) {
	return $elm$parser$Parser$Advanced$token(
		$elm$parser$Parser$toToken(str));
};
var $justinmimbs$date$Date$dayOfYear = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($elm$core$Basics$identity),
				$elm$parser$Parser$token('-')),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						$elm$parser$Parser$backtrackable(
						A2(
							$elm$parser$Parser$andThen,
							$elm$parser$Parser$commit,
							A2($elm$parser$Parser$map, $justinmimbs$date$Date$OrdinalDay, $justinmimbs$date$Date$int3))),
						A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							$elm$parser$Parser$succeed($justinmimbs$date$Date$MonthAndDay),
							$justinmimbs$date$Date$int2),
						$elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$ignorer,
										$elm$parser$Parser$succeed($elm$core$Basics$identity),
										$elm$parser$Parser$token('-')),
									$justinmimbs$date$Date$int2),
									$elm$parser$Parser$succeed(1)
								]))),
						A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed($justinmimbs$date$Date$WeekAndWeekday),
								$elm$parser$Parser$token('W')),
							$justinmimbs$date$Date$int2),
						$elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$ignorer,
										$elm$parser$Parser$succeed($elm$core$Basics$identity),
										$elm$parser$Parser$token('-')),
									$justinmimbs$date$Date$int1),
									$elm$parser$Parser$succeed(1)
								])))
					]))),
			$elm$parser$Parser$backtrackable(
			A2(
				$elm$parser$Parser$andThen,
				$elm$parser$Parser$commit,
				A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						$elm$parser$Parser$succeed($justinmimbs$date$Date$MonthAndDay),
						$justinmimbs$date$Date$int2),
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								$justinmimbs$date$Date$int2,
								$elm$parser$Parser$succeed(1)
							]))))),
			A2($elm$parser$Parser$map, $justinmimbs$date$Date$OrdinalDay, $justinmimbs$date$Date$int3),
			A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($justinmimbs$date$Date$WeekAndWeekday),
					$elm$parser$Parser$token('W')),
				$justinmimbs$date$Date$int2),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						$justinmimbs$date$Date$int1,
						$elm$parser$Parser$succeed(1)
					]))),
			$elm$parser$Parser$succeed(
			$justinmimbs$date$Date$OrdinalDay(1))
		]));
var $justinmimbs$date$Date$RD = function (a) {
	return {$: 'RD', a: a};
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$Basics$neq = _Utils_notEqual;
var $justinmimbs$date$Date$isLeapYear = function (y) {
	return ((!A2($elm$core$Basics$modBy, 4, y)) && (!(!A2($elm$core$Basics$modBy, 100, y)))) || (!A2($elm$core$Basics$modBy, 400, y));
};
var $justinmimbs$date$Date$daysBeforeMonth = F2(
	function (y, m) {
		var leapDays = $justinmimbs$date$Date$isLeapYear(y) ? 1 : 0;
		switch (m.$) {
			case 'Jan':
				return 0;
			case 'Feb':
				return 31;
			case 'Mar':
				return 59 + leapDays;
			case 'Apr':
				return 90 + leapDays;
			case 'May':
				return 120 + leapDays;
			case 'Jun':
				return 151 + leapDays;
			case 'Jul':
				return 181 + leapDays;
			case 'Aug':
				return 212 + leapDays;
			case 'Sep':
				return 243 + leapDays;
			case 'Oct':
				return 273 + leapDays;
			case 'Nov':
				return 304 + leapDays;
			default:
				return 334 + leapDays;
		}
	});
var $justinmimbs$date$Date$floorDiv = F2(
	function (a, b) {
		return $elm$core$Basics$floor(a / b);
	});
var $justinmimbs$date$Date$daysBeforeYear = function (y1) {
	var y = y1 - 1;
	var leapYears = (A2($justinmimbs$date$Date$floorDiv, y, 4) - A2($justinmimbs$date$Date$floorDiv, y, 100)) + A2($justinmimbs$date$Date$floorDiv, y, 400);
	return (365 * y) + leapYears;
};
var $justinmimbs$date$Date$daysInMonth = F2(
	function (y, m) {
		switch (m.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return $justinmimbs$date$Date$isLeapYear(y) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var $justinmimbs$date$Date$isBetweenInt = F3(
	function (a, b, x) {
		return (_Utils_cmp(a, x) < 1) && (_Utils_cmp(x, b) < 1);
	});
var $justinmimbs$date$Date$monthToName = function (m) {
	switch (m.$) {
		case 'Jan':
			return 'January';
		case 'Feb':
			return 'February';
		case 'Mar':
			return 'March';
		case 'Apr':
			return 'April';
		case 'May':
			return 'May';
		case 'Jun':
			return 'June';
		case 'Jul':
			return 'July';
		case 'Aug':
			return 'August';
		case 'Sep':
			return 'September';
		case 'Oct':
			return 'October';
		case 'Nov':
			return 'November';
		default:
			return 'December';
	}
};
var $elm$time$Time$Apr = {$: 'Apr'};
var $elm$time$Time$Aug = {$: 'Aug'};
var $elm$time$Time$Dec = {$: 'Dec'};
var $elm$time$Time$Feb = {$: 'Feb'};
var $elm$time$Time$Jan = {$: 'Jan'};
var $elm$time$Time$Jul = {$: 'Jul'};
var $elm$time$Time$Jun = {$: 'Jun'};
var $elm$time$Time$Mar = {$: 'Mar'};
var $elm$time$Time$May = {$: 'May'};
var $elm$time$Time$Nov = {$: 'Nov'};
var $elm$time$Time$Oct = {$: 'Oct'};
var $elm$time$Time$Sep = {$: 'Sep'};
var $justinmimbs$date$Date$numberToMonth = function (mn) {
	var _v0 = A2($elm$core$Basics$max, 1, mn);
	switch (_v0) {
		case 1:
			return $elm$time$Time$Jan;
		case 2:
			return $elm$time$Time$Feb;
		case 3:
			return $elm$time$Time$Mar;
		case 4:
			return $elm$time$Time$Apr;
		case 5:
			return $elm$time$Time$May;
		case 6:
			return $elm$time$Time$Jun;
		case 7:
			return $elm$time$Time$Jul;
		case 8:
			return $elm$time$Time$Aug;
		case 9:
			return $elm$time$Time$Sep;
		case 10:
			return $elm$time$Time$Oct;
		case 11:
			return $elm$time$Time$Nov;
		default:
			return $elm$time$Time$Dec;
	}
};
var $justinmimbs$date$Date$fromCalendarParts = F3(
	function (y, mn, d) {
		return (!A3($justinmimbs$date$Date$isBetweenInt, 1, 12, mn)) ? $elm$core$Result$Err(
			'Invalid date: ' + (('month ' + ($elm$core$String$fromInt(mn) + ' is out of range')) + (' (1 to 12)' + ('; received (year ' + ($elm$core$String$fromInt(y) + (', month ' + ($elm$core$String$fromInt(mn) + (', day ' + ($elm$core$String$fromInt(d) + ')'))))))))) : ((!A3(
			$justinmimbs$date$Date$isBetweenInt,
			1,
			A2(
				$justinmimbs$date$Date$daysInMonth,
				y,
				$justinmimbs$date$Date$numberToMonth(mn)),
			d)) ? $elm$core$Result$Err(
			'Invalid date: ' + (('day ' + ($elm$core$String$fromInt(d) + ' is out of range')) + ((' (1 to ' + ($elm$core$String$fromInt(
				A2(
					$justinmimbs$date$Date$daysInMonth,
					y,
					$justinmimbs$date$Date$numberToMonth(mn))) + ')')) + ((' for ' + $justinmimbs$date$Date$monthToName(
				$justinmimbs$date$Date$numberToMonth(mn))) + ((((mn === 2) && (d === 29)) ? (' (' + ($elm$core$String$fromInt(y) + ' is not a leap year)')) : '') + ('; received (year ' + ($elm$core$String$fromInt(y) + (', month ' + ($elm$core$String$fromInt(mn) + (', day ' + ($elm$core$String$fromInt(d) + ')'))))))))))) : $elm$core$Result$Ok(
			$justinmimbs$date$Date$RD(
				($justinmimbs$date$Date$daysBeforeYear(y) + A2(
					$justinmimbs$date$Date$daysBeforeMonth,
					y,
					$justinmimbs$date$Date$numberToMonth(mn))) + d)));
	});
var $justinmimbs$date$Date$fromOrdinalParts = F2(
	function (y, od) {
		var daysInYear = $justinmimbs$date$Date$isLeapYear(y) ? 366 : 365;
		return (!A3($justinmimbs$date$Date$isBetweenInt, 1, daysInYear, od)) ? $elm$core$Result$Err(
			'Invalid ordinal date: ' + (('ordinal-day ' + ($elm$core$String$fromInt(od) + ' is out of range')) + ((' (1 to ' + ($elm$core$String$fromInt(daysInYear) + ')')) + ((' for ' + $elm$core$String$fromInt(y)) + ('; received (year ' + ($elm$core$String$fromInt(y) + (', ordinal-day ' + ($elm$core$String$fromInt(od) + ')')))))))) : $elm$core$Result$Ok(
			$justinmimbs$date$Date$RD(
				$justinmimbs$date$Date$daysBeforeYear(y) + od));
	});
var $justinmimbs$date$Date$weekdayNumber = function (_v0) {
	var rd = _v0.a;
	var _v1 = A2($elm$core$Basics$modBy, 7, rd);
	if (!_v1) {
		return 7;
	} else {
		var n = _v1;
		return n;
	}
};
var $justinmimbs$date$Date$daysBeforeWeekYear = function (y) {
	var jan4 = $justinmimbs$date$Date$daysBeforeYear(y) + 4;
	return jan4 - $justinmimbs$date$Date$weekdayNumber(
		$justinmimbs$date$Date$RD(jan4));
};
var $justinmimbs$date$Date$firstOfYear = function (y) {
	return $justinmimbs$date$Date$RD(
		$justinmimbs$date$Date$daysBeforeYear(y) + 1);
};
var $justinmimbs$date$Date$is53WeekYear = function (y) {
	var wdnJan1 = $justinmimbs$date$Date$weekdayNumber(
		$justinmimbs$date$Date$firstOfYear(y));
	return (wdnJan1 === 4) || ((wdnJan1 === 3) && $justinmimbs$date$Date$isLeapYear(y));
};
var $justinmimbs$date$Date$fromWeekParts = F3(
	function (wy, wn, wdn) {
		var weeksInYear = $justinmimbs$date$Date$is53WeekYear(wy) ? 53 : 52;
		return (!A3($justinmimbs$date$Date$isBetweenInt, 1, weeksInYear, wn)) ? $elm$core$Result$Err(
			'Invalid week date: ' + (('week ' + ($elm$core$String$fromInt(wn) + ' is out of range')) + ((' (1 to ' + ($elm$core$String$fromInt(weeksInYear) + ')')) + ((' for ' + $elm$core$String$fromInt(wy)) + ('; received (year ' + ($elm$core$String$fromInt(wy) + (', week ' + ($elm$core$String$fromInt(wn) + (', weekday ' + ($elm$core$String$fromInt(wdn) + ')')))))))))) : ((!A3($justinmimbs$date$Date$isBetweenInt, 1, 7, wdn)) ? $elm$core$Result$Err(
			'Invalid week date: ' + (('weekday ' + ($elm$core$String$fromInt(wdn) + ' is out of range')) + (' (1 to 7)' + ('; received (year ' + ($elm$core$String$fromInt(wy) + (', week ' + ($elm$core$String$fromInt(wn) + (', weekday ' + ($elm$core$String$fromInt(wdn) + ')'))))))))) : $elm$core$Result$Ok(
			$justinmimbs$date$Date$RD(
				($justinmimbs$date$Date$daysBeforeWeekYear(wy) + ((wn - 1) * 7)) + wdn)));
	});
var $justinmimbs$date$Date$fromYearAndDayOfYear = function (_v0) {
	var y = _v0.a;
	var doy = _v0.b;
	switch (doy.$) {
		case 'MonthAndDay':
			var mn = doy.a;
			var d = doy.b;
			return A3($justinmimbs$date$Date$fromCalendarParts, y, mn, d);
		case 'WeekAndWeekday':
			var wn = doy.a;
			var wdn = doy.b;
			return A3($justinmimbs$date$Date$fromWeekParts, y, wn, wdn);
		default:
			var od = doy.a;
			return A2($justinmimbs$date$Date$fromOrdinalParts, y, od);
	}
};
var $justinmimbs$date$Date$int4 = A2(
	$elm$parser$Parser$mapChompedString,
	F2(
		function (str, _v0) {
			return A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(str));
		}),
	A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed(_Utils_Tuple0),
						$elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									$elm$parser$Parser$chompIf(
									function (c) {
										return _Utils_eq(
											c,
											_Utils_chr('-'));
									}),
									$elm$parser$Parser$succeed(_Utils_Tuple0)
								]))),
					$elm$parser$Parser$chompIf($elm$core$Char$isDigit)),
				$elm$parser$Parser$chompIf($elm$core$Char$isDigit)),
			$elm$parser$Parser$chompIf($elm$core$Char$isDigit)),
		$elm$parser$Parser$chompIf($elm$core$Char$isDigit)));
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $justinmimbs$date$Date$resultToParser = function (result) {
	if (result.$ === 'Ok') {
		var x = result.a;
		return $elm$parser$Parser$succeed(x);
	} else {
		var message = result.a;
		return $elm$parser$Parser$problem(message);
	}
};
var $justinmimbs$date$Date$parser = A2(
	$elm$parser$Parser$andThen,
	A2($elm$core$Basics$composeR, $justinmimbs$date$Date$fromYearAndDayOfYear, $justinmimbs$date$Date$resultToParser),
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($elm$core$Tuple$pair),
			$justinmimbs$date$Date$int4),
		$justinmimbs$date$Date$dayOfYear));
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $justinmimbs$date$Date$fromIsoString = A2(
	$elm$core$Basics$composeR,
	$elm$parser$Parser$run(
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			A2(
				$elm$parser$Parser$ignorer,
				$justinmimbs$date$Date$parser,
				A2(
					$elm$parser$Parser$andThen,
					$justinmimbs$date$Date$resultToParser,
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2($elm$parser$Parser$map, $elm$core$Result$Ok, $elm$parser$Parser$end),
								A2(
								$elm$parser$Parser$map,
								$elm$core$Basics$always(
									$elm$core$Result$Err('Expected a date only, not a date and time')),
								$elm$parser$Parser$chompIf(
									$elm$core$Basics$eq(
										_Utils_chr('T')))),
								$elm$parser$Parser$succeed(
								$elm$core$Result$Err('Expected a date only'))
							])))))),
	$elm$core$Result$mapError(
		A2(
			$elm$core$Basics$composeR,
			$elm$core$List$head,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Maybe$map($justinmimbs$date$Date$deadEndToString),
				$elm$core$Maybe$withDefault('')))));
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $justinmimbs$date$Date$fromOrdinalDate = F2(
	function (y, od) {
		var daysInYear = $justinmimbs$date$Date$isLeapYear(y) ? 366 : 365;
		return $justinmimbs$date$Date$RD(
			$justinmimbs$date$Date$daysBeforeYear(y) + A3($elm$core$Basics$clamp, 1, daysInYear, od));
	});
var $justinmimbs$date$Date$fromRataDie = function (rd) {
	return $justinmimbs$date$Date$RD(rd);
};
var $justinmimbs$date$Date$monthToNumber = function (m) {
	switch (m.$) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};
var $justinmimbs$date$Date$toCalendarDateHelp = F3(
	function (y, m, d) {
		toCalendarDateHelp:
		while (true) {
			var monthDays = A2($justinmimbs$date$Date$daysInMonth, y, m);
			var mn = $justinmimbs$date$Date$monthToNumber(m);
			if ((mn < 12) && (_Utils_cmp(d, monthDays) > 0)) {
				var $temp$y = y,
					$temp$m = $justinmimbs$date$Date$numberToMonth(mn + 1),
					$temp$d = d - monthDays;
				y = $temp$y;
				m = $temp$m;
				d = $temp$d;
				continue toCalendarDateHelp;
			} else {
				return {day: d, month: m, year: y};
			}
		}
	});
var $justinmimbs$date$Date$divWithRemainder = F2(
	function (a, b) {
		return _Utils_Tuple2(
			A2($justinmimbs$date$Date$floorDiv, a, b),
			A2($elm$core$Basics$modBy, b, a));
	});
var $justinmimbs$date$Date$year = function (_v0) {
	var rd = _v0.a;
	var _v1 = A2($justinmimbs$date$Date$divWithRemainder, rd, 146097);
	var n400 = _v1.a;
	var r400 = _v1.b;
	var _v2 = A2($justinmimbs$date$Date$divWithRemainder, r400, 36524);
	var n100 = _v2.a;
	var r100 = _v2.b;
	var _v3 = A2($justinmimbs$date$Date$divWithRemainder, r100, 1461);
	var n4 = _v3.a;
	var r4 = _v3.b;
	var _v4 = A2($justinmimbs$date$Date$divWithRemainder, r4, 365);
	var n1 = _v4.a;
	var r1 = _v4.b;
	var n = (!r1) ? 0 : 1;
	return ((((n400 * 400) + (n100 * 100)) + (n4 * 4)) + n1) + n;
};
var $justinmimbs$date$Date$toOrdinalDate = function (_v0) {
	var rd = _v0.a;
	var y = $justinmimbs$date$Date$year(
		$justinmimbs$date$Date$RD(rd));
	return {
		ordinalDay: rd - $justinmimbs$date$Date$daysBeforeYear(y),
		year: y
	};
};
var $justinmimbs$date$Date$toCalendarDate = function (_v0) {
	var rd = _v0.a;
	var date = $justinmimbs$date$Date$toOrdinalDate(
		$justinmimbs$date$Date$RD(rd));
	return A3($justinmimbs$date$Date$toCalendarDateHelp, date.year, $elm$time$Time$Jan, date.ordinalDay);
};
var $justinmimbs$date$Date$day = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.day;
	});
var $justinmimbs$date$Date$month = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.month;
	});
var $justinmimbs$date$Date$monthNumber = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToNumber);
var $justinmimbs$date$Date$ordinalDay = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toOrdinalDate,
	function ($) {
		return $.ordinalDay;
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $justinmimbs$date$Date$padSignedInt = F2(
	function (length, _int) {
		return _Utils_ap(
			(_int < 0) ? '-' : '',
			A3(
				$elm$core$String$padLeft,
				length,
				_Utils_chr('0'),
				$elm$core$String$fromInt(
					$elm$core$Basics$abs(_int))));
	});
var $justinmimbs$date$Date$monthToQuarter = function (m) {
	return (($justinmimbs$date$Date$monthToNumber(m) + 2) / 3) | 0;
};
var $justinmimbs$date$Date$quarter = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToQuarter);
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $elm$time$Time$Fri = {$: 'Fri'};
var $elm$time$Time$Mon = {$: 'Mon'};
var $elm$time$Time$Sat = {$: 'Sat'};
var $elm$time$Time$Sun = {$: 'Sun'};
var $elm$time$Time$Thu = {$: 'Thu'};
var $elm$time$Time$Tue = {$: 'Tue'};
var $elm$time$Time$Wed = {$: 'Wed'};
var $justinmimbs$date$Date$numberToWeekday = function (wdn) {
	var _v0 = A2($elm$core$Basics$max, 1, wdn);
	switch (_v0) {
		case 1:
			return $elm$time$Time$Mon;
		case 2:
			return $elm$time$Time$Tue;
		case 3:
			return $elm$time$Time$Wed;
		case 4:
			return $elm$time$Time$Thu;
		case 5:
			return $elm$time$Time$Fri;
		case 6:
			return $elm$time$Time$Sat;
		default:
			return $elm$time$Time$Sun;
	}
};
var $justinmimbs$date$Date$toWeekDate = function (_v0) {
	var rd = _v0.a;
	var wdn = $justinmimbs$date$Date$weekdayNumber(
		$justinmimbs$date$Date$RD(rd));
	var wy = $justinmimbs$date$Date$year(
		$justinmimbs$date$Date$RD(rd + (4 - wdn)));
	var week1Day1 = $justinmimbs$date$Date$daysBeforeWeekYear(wy) + 1;
	return {
		weekNumber: 1 + (((rd - week1Day1) / 7) | 0),
		weekYear: wy,
		weekday: $justinmimbs$date$Date$numberToWeekday(wdn)
	};
};
var $justinmimbs$date$Date$weekNumber = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toWeekDate,
	function ($) {
		return $.weekNumber;
	});
var $justinmimbs$date$Date$weekYear = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toWeekDate,
	function ($) {
		return $.weekYear;
	});
var $justinmimbs$date$Date$weekday = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$weekdayNumber, $justinmimbs$date$Date$numberToWeekday);
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $justinmimbs$date$Date$ordinalSuffix = function (n) {
	var nn = A2($elm$core$Basics$modBy, 100, n);
	var _v0 = A2(
		$elm$core$Basics$min,
		(nn < 20) ? nn : A2($elm$core$Basics$modBy, 10, nn),
		4);
	switch (_v0) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
};
var $justinmimbs$date$Date$withOrdinalSuffix = function (n) {
	return _Utils_ap(
		$elm$core$String$fromInt(n),
		$justinmimbs$date$Date$ordinalSuffix(n));
};
var $justinmimbs$date$Date$formatField = F4(
	function (language, _char, length, date) {
		switch (_char.valueOf()) {
			case 'y':
				if (length === 2) {
					return A2(
						$elm$core$String$right,
						2,
						A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$year(date))));
				} else {
					return A2(
						$justinmimbs$date$Date$padSignedInt,
						length,
						$justinmimbs$date$Date$year(date));
				}
			case 'Y':
				if (length === 2) {
					return A2(
						$elm$core$String$right,
						2,
						A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$weekYear(date))));
				} else {
					return A2(
						$justinmimbs$date$Date$padSignedInt,
						length,
						$justinmimbs$date$Date$weekYear(date));
				}
			case 'Q':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					case 2:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					case 3:
						return 'Q' + $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					case 4:
						return $justinmimbs$date$Date$withOrdinalSuffix(
							$justinmimbs$date$Date$quarter(date));
					case 5:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					default:
						return '';
				}
			case 'M':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$monthNumber(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$monthNumber(date)));
					case 3:
						return language.monthNameShort(
							$justinmimbs$date$Date$month(date));
					case 4:
						return language.monthName(
							$justinmimbs$date$Date$month(date));
					case 5:
						return A2(
							$elm$core$String$left,
							1,
							language.monthNameShort(
								$justinmimbs$date$Date$month(date)));
					default:
						return '';
				}
			case 'w':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$weekNumber(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$weekNumber(date)));
					default:
						return '';
				}
			case 'd':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$day(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$day(date)));
					case 3:
						return language.dayWithSuffix(
							$justinmimbs$date$Date$day(date));
					default:
						return '';
				}
			case 'D':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$ordinalDay(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$ordinalDay(date)));
					case 3:
						return A3(
							$elm$core$String$padLeft,
							3,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$ordinalDay(date)));
					default:
						return '';
				}
			case 'E':
				switch (length) {
					case 1:
						return language.weekdayNameShort(
							$justinmimbs$date$Date$weekday(date));
					case 2:
						return language.weekdayNameShort(
							$justinmimbs$date$Date$weekday(date));
					case 3:
						return language.weekdayNameShort(
							$justinmimbs$date$Date$weekday(date));
					case 4:
						return language.weekdayName(
							$justinmimbs$date$Date$weekday(date));
					case 5:
						return A2(
							$elm$core$String$left,
							1,
							language.weekdayNameShort(
								$justinmimbs$date$Date$weekday(date)));
					case 6:
						return A2(
							$elm$core$String$left,
							2,
							language.weekdayNameShort(
								$justinmimbs$date$Date$weekday(date)));
					default:
						return '';
				}
			case 'e':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$weekdayNumber(date));
					case 2:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$weekdayNumber(date));
					default:
						return A4(
							$justinmimbs$date$Date$formatField,
							language,
							_Utils_chr('E'),
							length,
							date);
				}
			default:
				return '';
		}
	});
var $justinmimbs$date$Date$formatWithTokens = F3(
	function (language, tokens, date) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (token, formatted) {
					if (token.$ === 'Field') {
						var _char = token.a;
						var length = token.b;
						return _Utils_ap(
							A4($justinmimbs$date$Date$formatField, language, _char, length, date),
							formatted);
					} else {
						var str = token.a;
						return _Utils_ap(str, formatted);
					}
				}),
			'',
			tokens);
	});
var $justinmimbs$date$Pattern$Literal = function (a) {
	return {$: 'Literal', a: a};
};
var $justinmimbs$date$Pattern$escapedQuote = A2(
	$elm$parser$Parser$ignorer,
	$elm$parser$Parser$succeed(
		$justinmimbs$date$Pattern$Literal('\'')),
	$elm$parser$Parser$token('\'\''));
var $justinmimbs$date$Pattern$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$parser$Parser$Advanced$getOffset = $elm$parser$Parser$Advanced$Parser(
	function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, s.offset, s);
	});
var $elm$parser$Parser$getOffset = $elm$parser$Parser$Advanced$getOffset;
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $justinmimbs$date$Pattern$fieldRepeats = function (str) {
	var _v0 = $elm$core$String$toList(str);
	if (_v0.b && (!_v0.b.b)) {
		var _char = _v0.a;
		return A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F2(
						function (x, y) {
							return A2($justinmimbs$date$Pattern$Field, _char, 1 + (y - x));
						})),
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$getOffset,
					$elm$parser$Parser$chompWhile(
						$elm$core$Basics$eq(_char)))),
			$elm$parser$Parser$getOffset);
	} else {
		return $elm$parser$Parser$problem('expected exactly one char');
	}
};
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $justinmimbs$date$Pattern$field = A2(
	$elm$parser$Parser$andThen,
	$justinmimbs$date$Pattern$fieldRepeats,
	$elm$parser$Parser$getChompedString(
		$elm$parser$Parser$chompIf($elm$core$Char$isAlpha)));
var $justinmimbs$date$Pattern$finalize = A2(
	$elm$core$List$foldl,
	F2(
		function (token, tokens) {
			var _v0 = _Utils_Tuple2(token, tokens);
			if (((_v0.a.$ === 'Literal') && _v0.b.b) && (_v0.b.a.$ === 'Literal')) {
				var x = _v0.a.a;
				var _v1 = _v0.b;
				var y = _v1.a.a;
				var rest = _v1.b;
				return A2(
					$elm$core$List$cons,
					$justinmimbs$date$Pattern$Literal(
						_Utils_ap(x, y)),
					rest);
			} else {
				return A2($elm$core$List$cons, token, tokens);
			}
		}),
	_List_Nil);
var $elm$parser$Parser$Advanced$lazy = function (thunk) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v0 = thunk(_Utils_Tuple0);
			var parse = _v0.a;
			return parse(s);
		});
};
var $elm$parser$Parser$lazy = $elm$parser$Parser$Advanced$lazy;
var $justinmimbs$date$Pattern$isLiteralChar = function (_char) {
	return (!_Utils_eq(
		_char,
		_Utils_chr('\''))) && (!$elm$core$Char$isAlpha(_char));
};
var $justinmimbs$date$Pattern$literal = A2(
	$elm$parser$Parser$map,
	$justinmimbs$date$Pattern$Literal,
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(_Utils_Tuple0),
				$elm$parser$Parser$chompIf($justinmimbs$date$Pattern$isLiteralChar)),
			$elm$parser$Parser$chompWhile($justinmimbs$date$Pattern$isLiteralChar))));
var $justinmimbs$date$Pattern$quotedHelp = function (result) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$andThen,
				function (str) {
					return $justinmimbs$date$Pattern$quotedHelp(
						_Utils_ap(result, str));
				},
				$elm$parser$Parser$getChompedString(
					A2(
						$elm$parser$Parser$ignorer,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed(_Utils_Tuple0),
							$elm$parser$Parser$chompIf(
								$elm$core$Basics$neq(
									_Utils_chr('\'')))),
						$elm$parser$Parser$chompWhile(
							$elm$core$Basics$neq(
								_Utils_chr('\'')))))),
				A2(
				$elm$parser$Parser$andThen,
				function (_v0) {
					return $justinmimbs$date$Pattern$quotedHelp(result + '\'');
				},
				$elm$parser$Parser$token('\'\'')),
				$elm$parser$Parser$succeed(result)
			]));
};
var $justinmimbs$date$Pattern$quoted = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($justinmimbs$date$Pattern$Literal),
		$elm$parser$Parser$chompIf(
			$elm$core$Basics$eq(
				_Utils_chr('\'')))),
	A2(
		$elm$parser$Parser$ignorer,
		$justinmimbs$date$Pattern$quotedHelp(''),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					$elm$parser$Parser$chompIf(
					$elm$core$Basics$eq(
						_Utils_chr('\''))),
					$elm$parser$Parser$end
				]))));
var $justinmimbs$date$Pattern$patternHelp = function (tokens) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$andThen,
				function (token) {
					return $justinmimbs$date$Pattern$patternHelp(
						A2($elm$core$List$cons, token, tokens));
				},
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[$justinmimbs$date$Pattern$field, $justinmimbs$date$Pattern$literal, $justinmimbs$date$Pattern$escapedQuote, $justinmimbs$date$Pattern$quoted]))),
				$elm$parser$Parser$lazy(
				function (_v0) {
					return $elm$parser$Parser$succeed(
						$justinmimbs$date$Pattern$finalize(tokens));
				})
			]));
};
var $justinmimbs$date$Pattern$fromString = function (str) {
	return A2(
		$elm$core$Result$withDefault,
		_List_fromArray(
			[
				$justinmimbs$date$Pattern$Literal(str)
			]),
		A2(
			$elm$parser$Parser$run,
			$justinmimbs$date$Pattern$patternHelp(_List_Nil),
			str));
};
var $justinmimbs$date$Date$formatWithLanguage = F2(
	function (language, pattern) {
		var tokens = $elm$core$List$reverse(
			$justinmimbs$date$Pattern$fromString(pattern));
		return A2($justinmimbs$date$Date$formatWithTokens, language, tokens);
	});
var $justinmimbs$date$Date$weekdayToName = function (wd) {
	switch (wd.$) {
		case 'Mon':
			return 'Monday';
		case 'Tue':
			return 'Tuesday';
		case 'Wed':
			return 'Wednesday';
		case 'Thu':
			return 'Thursday';
		case 'Fri':
			return 'Friday';
		case 'Sat':
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var $justinmimbs$date$Date$language_en = {
	dayWithSuffix: $justinmimbs$date$Date$withOrdinalSuffix,
	monthName: $justinmimbs$date$Date$monthToName,
	monthNameShort: A2(
		$elm$core$Basics$composeR,
		$justinmimbs$date$Date$monthToName,
		$elm$core$String$left(3)),
	weekdayName: $justinmimbs$date$Date$weekdayToName,
	weekdayNameShort: A2(
		$elm$core$Basics$composeR,
		$justinmimbs$date$Date$weekdayToName,
		$elm$core$String$left(3))
};
var $justinmimbs$date$Date$format = function (pattern) {
	return A2($justinmimbs$date$Date$formatWithLanguage, $justinmimbs$date$Date$language_en, pattern);
};
var $justinmimbs$date$Date$toIsoString = $justinmimbs$date$Date$format('yyyy-MM-dd');
var $justinmimbs$date$Date$toRataDie = function (_v0) {
	var rd = _v0.a;
	return rd;
};
var $axelerator$fancy_forms$FancyForms$Widgets$Date$dateInput = function (attrs) {
	return {
		blur: $elm$core$Basics$identity,
		decoderModel: A3(
			$elm$json$Json$Decode$map2,
			$axelerator$fancy_forms$FancyForms$Widgets$Date$Model,
			A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$string),
			A2(
				$elm$json$Json$Decode$map,
				$justinmimbs$date$Date$fromRataDie,
				A2($elm$json$Json$Decode$field, 'parsedValue', $elm$json$Json$Decode$int))),
		decoderMsg: $axelerator$fancy_forms$FancyForms$Widgets$Date$decoderMsg,
		_default: A2($justinmimbs$date$Date$fromOrdinalDate, 2024, 1),
		encodeModel: function (model) {
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'value',
						$elm$json$Json$Encode$string(model.value)),
						_Utils_Tuple2(
						'parsedValue',
						$elm$json$Json$Encode$int(
							$justinmimbs$date$Date$toRataDie(model.parsedValue)))
					]));
		},
		encodeMsg: $axelerator$fancy_forms$FancyForms$Widgets$Date$encodeMsg,
		init: function (i) {
			return {
				parsedValue: i,
				value: $justinmimbs$date$Date$toIsoString(i)
			};
		},
		innerAttributes: $axelerator$fancy_forms$FancyForms$FormState$noAttributes,
		isConsistent: function (_v0) {
			var parsedValue = _v0.parsedValue;
			var value = _v0.value;
			return _Utils_eq(
				$justinmimbs$date$Date$fromIsoString(value),
				$elm$core$Result$Ok(parsedValue));
		},
		update: F2(
			function (msg, model) {
				switch (msg.$) {
					case 'Changed':
						var val = msg.a;
						return $axelerator$fancy_forms$FancyForms$FormState$justChanged(
							A2(
								$elm$core$Result$withDefault,
								_Utils_update(
									model,
									{value: val}),
								A2(
									$elm$core$Result$map,
									function (i) {
										return _Utils_update(
											model,
											{parsedValue: i, value: val});
									},
									$justinmimbs$date$Date$fromIsoString(val))));
					case 'Focused':
						return $axelerator$fancy_forms$FancyForms$FormState$withFocus(model);
					default:
						return $axelerator$fancy_forms$FancyForms$FormState$withBlur(model);
				}
			}),
		validate: $axelerator$fancy_forms$FancyForms$FormState$alwaysValid,
		value: function ($) {
			return $.parsedValue;
		},
		view: F3(
			function (domId, innerAttrs, model) {
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						$elm$core$List$concat(
							_List_fromArray(
								[
									attrs,
									innerAttrs,
									_List_fromArray(
									[
										$elm$html$Html$Attributes$id(domId),
										$elm$html$Html$Attributes$type_('date'),
										$elm$html$Html$Events$onInput($axelerator$fancy_forms$FancyForms$Widgets$Date$Changed),
										$elm$html$Html$Events$onFocus($axelerator$fancy_forms$FancyForms$Widgets$Date$Focused),
										$elm$html$Html$Events$onBlur($axelerator$fancy_forms$FancyForms$Widgets$Date$Blurred),
										$elm$html$Html$Attributes$value(model.value)
									])
								])),
						_List_Nil)
					]);
			})
	};
};
var $author$project$Pico$Form$dateInput = function (labelText) {
	return A2(
		$axelerator$fancy_forms$FancyForms$FormState$withInnerAttributes,
		$author$project$Pico$Form$markAsInvalid,
		A2(
			$author$project$Pico$Form$withLabel,
			labelText,
			$axelerator$fancy_forms$FancyForms$Widgets$Date$dateInput(_List_Nil)));
};
var $author$project$Main$errorToString = function (e) {
	switch (e.$) {
		case 'NotValid':
			return '';
		case 'MustBeGreaterThan':
			var x = e.a;
			return 'Must be greater than ' + x;
		case 'MustBeLesserThan':
			var x = e.a;
			return 'Must be lesser than ' + x;
		case 'MustNotBeBlank':
			return 'Please enter a value';
		default:
			var myError = e.a;
			return 'Please give an even number';
	}
};
var $elm$html$Html$small = _VirtualDom_node('small');
var $author$project$Pico$errorView = F3(
	function (errorToString, errors, input) {
		return _Utils_ap(
			input,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$small,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(
							A2(
								$elm$core$String$join,
								' ',
								A2($elm$core$List$map, errorToString, errors)))
						]))
				]));
	});
var $axelerator$fancy_forms$FancyForms$FormState$CustomError = function (a) {
	return {$: 'CustomError', a: a};
};
var $author$project$Main$NotEven = {$: 'NotEven'};
var $author$project$Main$evenValidator = function (i) {
	return (!A2($elm$core$Basics$modBy, 2, i)) ? _List_Nil : _List_fromArray(
		[
			$axelerator$fancy_forms$FancyForms$FormState$CustomError($author$project$Main$NotEven)
		]);
};
var $axelerator$fancy_forms$FancyForms$Widgets$Float$Blurred = {$: 'Blurred'};
var $axelerator$fancy_forms$FancyForms$Widgets$Float$Changed = function (a) {
	return {$: 'Changed', a: a};
};
var $axelerator$fancy_forms$FancyForms$Widgets$Float$Focused = {$: 'Focused'};
var $axelerator$fancy_forms$FancyForms$Widgets$Float$Model = F2(
	function (value, parsedValue) {
		return {parsedValue: parsedValue, value: value};
	});
var $axelerator$fancy_forms$FancyForms$Widgets$Float$decoderMsg = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$andThen,
			function (s) {
				switch (s) {
					case 'Focused':
						return $elm$json$Json$Decode$succeed($axelerator$fancy_forms$FancyForms$Widgets$Float$Focused);
					case 'Blurred':
						return $elm$json$Json$Decode$succeed($axelerator$fancy_forms$FancyForms$Widgets$Float$Blurred);
					default:
						return $elm$json$Json$Decode$fail('');
				}
			},
			$elm$json$Json$Decode$string),
			A2(
			$elm$json$Json$Decode$map,
			$axelerator$fancy_forms$FancyForms$Widgets$Float$Changed,
			A2($elm$json$Json$Decode$field, 'Changed', $elm$json$Json$Decode$string))
		]));
var $axelerator$fancy_forms$FancyForms$Widgets$Float$encodeMsg = function (msg) {
	switch (msg.$) {
		case 'Focused':
			return $elm$json$Json$Encode$string('Focused');
		case 'Blurred':
			return $elm$json$Json$Encode$string('Blurred');
		default:
			var s = msg.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'Changed',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Encode$float = _Json_wrap;
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$core$String$toFloat = _String_toFloat;
var $axelerator$fancy_forms$FancyForms$Widgets$Float$floatInput = function (attrs) {
	return {
		blur: $elm$core$Basics$identity,
		decoderModel: A3(
			$elm$json$Json$Decode$map2,
			$axelerator$fancy_forms$FancyForms$Widgets$Float$Model,
			A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$string),
			A2($elm$json$Json$Decode$field, 'parsedValue', $elm$json$Json$Decode$float)),
		decoderMsg: $axelerator$fancy_forms$FancyForms$Widgets$Float$decoderMsg,
		_default: 0,
		encodeModel: function (model) {
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'value',
						$elm$json$Json$Encode$string(model.value)),
						_Utils_Tuple2(
						'parsedValue',
						$elm$json$Json$Encode$float(model.parsedValue))
					]));
		},
		encodeMsg: $axelerator$fancy_forms$FancyForms$Widgets$Float$encodeMsg,
		init: function (i) {
			return {
				parsedValue: i,
				value: $elm$core$String$fromFloat(i)
			};
		},
		innerAttributes: $axelerator$fancy_forms$FancyForms$FormState$noAttributes,
		isConsistent: function (_v0) {
			var parsedValue = _v0.parsedValue;
			var value = _v0.value;
			return _Utils_eq(
				$elm$core$String$toFloat(value),
				$elm$core$Maybe$Just(parsedValue));
		},
		update: F2(
			function (msg, model) {
				switch (msg.$) {
					case 'Changed':
						var val = msg.a;
						return $axelerator$fancy_forms$FancyForms$FormState$justChanged(
							A2(
								$elm$core$Maybe$withDefault,
								_Utils_update(
									model,
									{value: val}),
								A2(
									$elm$core$Maybe$map,
									function (i) {
										return _Utils_update(
											model,
											{parsedValue: i, value: val});
									},
									$elm$core$String$toFloat(val))));
					case 'Focused':
						return $axelerator$fancy_forms$FancyForms$FormState$withFocus(model);
					default:
						return $axelerator$fancy_forms$FancyForms$FormState$withBlur(model);
				}
			}),
		validate: $axelerator$fancy_forms$FancyForms$FormState$alwaysValid,
		value: function ($) {
			return $.parsedValue;
		},
		view: F3(
			function (domId, innerAttrs, model) {
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						$elm$core$List$concat(
							_List_fromArray(
								[
									attrs,
									innerAttrs,
									_List_fromArray(
									[
										$elm$html$Html$Attributes$id(domId),
										$elm$html$Html$Attributes$type_('number'),
										$elm$html$Html$Events$onInput($axelerator$fancy_forms$FancyForms$Widgets$Float$Changed),
										$elm$html$Html$Events$onFocus($axelerator$fancy_forms$FancyForms$Widgets$Float$Focused),
										$elm$html$Html$Events$onBlur($axelerator$fancy_forms$FancyForms$Widgets$Float$Blurred),
										$elm$html$Html$Attributes$value(model.value)
									])
								])),
						_List_Nil)
					]);
			})
	};
};
var $author$project$Pico$Form$floatInput = F2(
	function (labelText, attrs) {
		return A2(
			$axelerator$fancy_forms$FancyForms$FormState$withInnerAttributes,
			$author$project$Pico$Form$markAsInvalid,
			A2(
				$author$project$Pico$Form$withLabel,
				labelText,
				$axelerator$fancy_forms$FancyForms$Widgets$Float$floatInput(attrs)));
	});
var $author$project$Pico$grid = F2(
	function (className, cols) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('grid'),
					$elm$html$Html$Attributes$class(className)
				]),
			A2(
				$elm$core$List$map,
				$elm$html$Html$div(_List_Nil),
				cols));
	});
var $axelerator$fancy_forms$FancyForms$FormState$MustNotBeBlank = {$: 'MustNotBeBlank'};
var $axelerator$fancy_forms$FancyForms$Widgets$Text$notBlank = function (model) {
	return (model === '') ? _List_fromArray(
		[$axelerator$fancy_forms$FancyForms$FormState$MustNotBeBlank]) : _List_Nil;
};
var $elm$html$Html$Attributes$step = function (n) {
	return A2($elm$html$Html$Attributes$stringProperty, 'step', n);
};
var $axelerator$fancy_forms$FancyForms$Form$concatValidators = F2(
	function (validators, model) {
		return $elm$core$List$concat(
			A2(
				$elm$core$List$map,
				function (validator) {
					return validator(model);
				},
				validators));
	});
var $axelerator$fancy_forms$FancyForms$Form$validate = F2(
	function (validators, widget) {
		return _Utils_update(
			widget,
			{
				validate: $axelerator$fancy_forms$FancyForms$Form$concatValidators(validators)
			});
	});
var $author$project$Main$exampleForm = A3(
	$axelerator$fancy_forms$FancyForms$Form$field,
	function ($) {
		return $.dateInput;
	},
	$author$project$Pico$Form$dateInput('Date input'),
	A3(
		$axelerator$fancy_forms$FancyForms$Form$field,
		function ($) {
			return $.floatInput;
		},
		A2(
			$author$project$Pico$Form$floatInput,
			'Float input',
			_List_fromArray(
				[
					$elm$html$Html$Attributes$step('0.1')
				])),
		A3(
			$axelerator$fancy_forms$FancyForms$Form$field,
			function ($) {
				return $.integerInput;
			},
			A2(
				$axelerator$fancy_forms$FancyForms$Form$validate,
				_List_fromArray(
					[$author$project$Main$evenValidator]),
				$author$project$Pico$Form$integerInput('Integer input')),
			A3(
				$axelerator$fancy_forms$FancyForms$Form$field,
				function ($) {
					return $.stringInput;
				},
				A2(
					$axelerator$fancy_forms$FancyForms$Form$validate,
					_List_fromArray(
						[$axelerator$fancy_forms$FancyForms$Widgets$Text$notBlank]),
					$author$project$Pico$Form$textInput('String input')),
				A4(
					$axelerator$fancy_forms$FancyForms$Form$form,
					$author$project$Pico$errorView($author$project$Main$errorToString),
					$axelerator$fancy_forms$FancyForms$FormState$alwaysValid,
					'example-form',
					F4(
						function (stringInput, integerInput, floatInput, dateInput) {
							return {
								combine: function (formState) {
									return {
										dateInput: dateInput.value(formState),
										floatInput: floatInput.value(formState),
										integerInput: integerInput.value(formState),
										stringInput: stringInput.value(formState)
									};
								},
								view: F2(
									function (formState, _v0) {
										return _List_fromArray(
											[
												A2(
												$author$project$Pico$grid,
												'numberInputs',
												_List_fromArray(
													[
														integerInput.view(formState),
														floatInput.view(formState)
													])),
												A2(
												$author$project$Pico$grid,
												'',
												_List_fromArray(
													[
														stringInput.view(formState),
														dateInput.view(formState)
													]))
											]);
									})
							};
						}))))));
var $author$project$Pico$Modal$IsClosed = {$: 'IsClosed'};
var $author$project$Pico$Modal$init = $author$project$Pico$Modal$IsClosed;
var $author$project$Main$initExampleForm = {
	dateInput: A2($justinmimbs$date$Date$fromOrdinalDate, 2024, 15),
	floatInput: 1.0,
	integerInput: 0,
	stringInput: ''
};
var $author$project$Pico$Theme$Amber = {$: 'Amber'};
var $author$project$Pico$Centered = {$: 'Centered'};
var $author$project$Pico$Theme$SystemScheme = {$: 'SystemScheme'};
var $author$project$Main$initMainArgs = {colorScheme: $author$project$Pico$Theme$SystemScheme, layout: $author$project$Pico$Centered, theme: $author$project$Pico$Theme$Amber};
var $author$project$Main$initVariantForm = $author$project$Main$Email('');
var $elm$html$Html$fieldset = _VirtualDom_node('fieldset');
var $author$project$Pico$role = function (kind) {
	return A2($elm$html$Html$Attributes$attribute, 'role', kind);
};
var $author$project$Main$fieldWithRemoveButton = F2(
	function (removeMsg, input) {
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$fieldset,
				_List_fromArray(
					[
						$author$project$Pico$role('group')
					]),
				_Utils_ap(
					input,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick(removeMsg)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Remove')
								]))
						])))
			]);
	});
var $author$project$Main$listWithAddButton = F2(
	function (addMsg, items) {
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_Utils_ap(
					items,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick(addMsg)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Add todo')
								]))
						])))
			]);
	});
var $author$project$Main$listForm = A6(
	$axelerator$fancy_forms$FancyForms$Form$listField,
	$author$project$Main$listWithAddButton,
	$author$project$Main$fieldWithRemoveButton,
	'a new todo',
	$elm$core$Basics$identity,
	$axelerator$fancy_forms$FancyForms$Widgets$Text$textInput(_List_Nil),
	A4(
		$axelerator$fancy_forms$FancyForms$Form$form,
		F2(
			function (_v0, html) {
				return html;
			}),
		$axelerator$fancy_forms$FancyForms$FormState$alwaysValid,
		'lists-example',
		function (todos) {
			return {
				combine: function (formState) {
					return todos.value(formState);
				},
				view: F2(
					function (formState, _v1) {
						return todos.view(formState);
					})
			};
		}));
var $author$project$Pico$Theme$Dark = {$: 'Dark'};
var $author$project$Pico$Theme$Light = {$: 'Light'};
var $author$project$Main$toNonEmpty = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return A2(
		$elm$core$Maybe$withDefault,
		$mgold$elm_nonempty_list$List$Nonempty$singleton(x),
		$mgold$elm_nonempty_list$List$Nonempty$fromList(
			A2($elm$core$List$cons, x, xs)));
};
var $author$project$Main$colorSchemeVariants = $author$project$Main$toNonEmpty(
	_Utils_Tuple2(
		{id: 'system', label: 'System', value: $author$project$Pico$Theme$SystemScheme},
		_List_fromArray(
			[
				{id: 'light', label: 'Light', value: $author$project$Pico$Theme$Light},
				{id: 'dark', label: 'Dark', value: $author$project$Pico$Theme$Dark}
			])));
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm_explorations$markdown$Markdown$defaultOptions = {
	defaultHighlighting: $elm$core$Maybe$Nothing,
	githubFlavored: $elm$core$Maybe$Just(
		{breaks: false, tables: false}),
	sanitize: true,
	smartypants: false
};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm_explorations$markdown$Markdown$toHtmlWith = _Markdown_toHtml;
var $elm_explorations$markdown$Markdown$toHtml = $elm_explorations$markdown$Markdown$toHtmlWith($elm_explorations$markdown$Markdown$defaultOptions);
var $author$project$Main$markdown = $elm_explorations$markdown$Markdown$toHtml(_List_Nil);
var $elm$html$Html$Attributes$name = $elm$html$Html$Attributes$stringProperty('name');
var $author$project$Main$darkModeInfo = function (select_) {
	return _Utils_ap(
		_List_fromArray(
			[
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$name('darkmode')
					]),
				_List_Nil),
				A2(
				$elm$html$Html$h3,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Dark mode')
					])),
				$author$project$Main$markdown('\nPico.css comes with a dark mode option to enable it.\nThe second argument to the `main_` function is the color scheme.\n\nWe need to add attributes to the `<html>` element. To be able to do that _picomponents_\ncomes with a small webcomponent.\n\n> The script is in the `picomponent.js` in the packages root. You just need to include it in your Html\n> before initializing your Elm app.\n    ')
			]),
		select_);
};
var $author$project$Pico$FullWidth = {$: 'FullWidth'};
var $author$project$Main$layoutVariants = $author$project$Main$toNonEmpty(
	_Utils_Tuple2(
		{id: 'centered', label: 'Centered', value: $author$project$Pico$Centered},
		_List_fromArray(
			[
				{id: 'full', label: 'FullWidth', value: $author$project$Pico$FullWidth}
			])));
var $author$project$Pico$Theme$themeName = function (theme) {
	switch (theme.$) {
		case 'Amber':
			return 'Amber';
		case 'Blue':
			return 'Blue';
		case 'Cyan':
			return 'Cyan';
		case 'Fuchsia':
			return 'Fuchsia';
		case 'Green':
			return 'Green';
		case 'Grey':
			return 'Grey';
		case 'Indigo':
			return 'Indigo';
		case 'Jade':
			return 'Jade';
		case 'Lime':
			return 'Lime';
		case 'Orange':
			return 'Orange';
		case 'Pink':
			return 'Pink';
		case 'Pumpkin':
			return 'Pumpkin';
		case 'Purple':
			return 'Purple';
		case 'Red':
			return 'Red';
		case 'Sand':
			return 'Sand';
		case 'Slate':
			return 'Slate';
		case 'Violet':
			return 'Violet';
		case 'Yellow':
			return 'Yellow';
		default:
			return 'Zinc';
	}
};
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $elm$parser$Parser$deadEndsToString = function (deadEnds) {
	return 'TODO deadEndsToString';
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$HCode = function (a) {
	return {$: 'HCode', a: a};
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style1 = {$: 'Style1'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2 = {$: 'Style2'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3 = {$: 'Style3'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4 = {$: 'Style4'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5 = {$: 'Style5'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style6 = {$: 'Style6'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$syntaxToStyle = function (syntax) {
	switch (syntax.$) {
		case 'String':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2, 'elm-s');
		case 'BasicSymbol':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'elm-bs');
		case 'GroupSymbol':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'elm-gs');
		case 'Capitalized':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style6, 'elm-c');
		case 'Keyword':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'elm-k');
		case 'Function':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'elm-f');
		case 'TypeSignature':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'elm-ts');
		default:
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style1, 'elm-n');
	}
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$newLine = function (fragments) {
	return {fragments: fragments, highlight: $elm$core$Maybe$Nothing};
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$LineBreak = {$: 'LineBreak'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Comment = {$: 'Comment'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default = {$: 'Default'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toFragment = F2(
	function (toStyle, _v0) {
		var syntax = _v0.a;
		var text = _v0.b;
		switch (syntax.$) {
			case 'Normal':
				return {additionalClass: '', requiredStyle: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default, text: text};
			case 'Comment':
				return {additionalClass: '', requiredStyle: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Comment, text: text};
			case 'LineBreak':
				return {additionalClass: '', requiredStyle: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default, text: text};
			default:
				var c = syntax.a;
				var _v2 = toStyle(c);
				var requiredStyle = _v2.a;
				var additionalClass = _v2.b;
				return {additionalClass: additionalClass, requiredStyle: requiredStyle, text: text};
		}
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toLinesHelp = F3(
	function (toStyle, _v0, _v1) {
		var syntax = _v0.a;
		var text = _v0.b;
		var lines = _v1.a;
		var fragments = _v1.b;
		var maybeLastSyntax = _v1.c;
		if (_Utils_eq(syntax, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$LineBreak)) {
			return _Utils_Tuple3(
				A2(
					$elm$core$List$cons,
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$newLine(fragments),
					lines),
				_List_fromArray(
					[
						A2(
						$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toFragment,
						toStyle,
						_Utils_Tuple2(syntax, text))
					]),
				$elm$core$Maybe$Nothing);
		} else {
			if (_Utils_eq(
				$elm$core$Maybe$Just(syntax),
				maybeLastSyntax)) {
				if (fragments.b) {
					var headFrag = fragments.a;
					var tailFrags = fragments.b;
					return _Utils_Tuple3(
						lines,
						A2(
							$elm$core$List$cons,
							_Utils_update(
								headFrag,
								{
									text: _Utils_ap(text, headFrag.text)
								}),
							tailFrags),
						maybeLastSyntax);
				} else {
					return _Utils_Tuple3(
						lines,
						A2(
							$elm$core$List$cons,
							A2(
								$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toFragment,
								toStyle,
								_Utils_Tuple2(syntax, text)),
							fragments),
						maybeLastSyntax);
				}
			} else {
				return _Utils_Tuple3(
					lines,
					A2(
						$elm$core$List$cons,
						A2(
							$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toFragment,
							toStyle,
							_Utils_Tuple2(syntax, text)),
						fragments),
					$elm$core$Maybe$Just(syntax));
			}
		}
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toLines = F2(
	function (toStyle, revTokens) {
		return function (_v0) {
			var lines = _v0.a;
			var frags = _v0.b;
			return A2(
				$elm$core$List$cons,
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$newLine(frags),
				lines);
		}(
			A3(
				$elm$core$List$foldl,
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toLinesHelp(toStyle),
				_Utils_Tuple3(_List_Nil, _List_Nil, $elm$core$Maybe$Nothing),
				revTokens));
	});
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0.a;
			var _v1 = parse(s0);
			if (_v1.$ === 'Good') {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (step.$ === 'Loop') {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $elm$parser$Parser$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Comment = {$: 'Comment'};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr('\n'));
};
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile = F2(
	function (isNotRelevant, previousParser) {
		return A2(
			$elm$parser$Parser$ignorer,
			previousParser,
			$elm$parser$Parser$chompWhile(isNotRelevant));
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$inlineComment = A2(
	$elm$parser$Parser$map,
	function (b) {
		return _List_fromArray(
			[
				_Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Comment, b)
			]);
	},
	$elm$parser$Parser$getChompedString(
		A2(
			$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak),
			$elm$parser$Parser$symbol('--'))));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$addThen = F3(
	function (f, list, plist) {
		return A2(
			$elm$parser$Parser$andThen,
			function (n) {
				return f(
					_Utils_ap(n, list));
			},
			plist);
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$consThen = F3(
	function (f, list, pn) {
		return A2(
			$elm$parser$Parser$andThen,
			function (n) {
				return f(
					A2($elm$core$List$cons, n, list));
			},
			pn);
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedUnnestable = F2(
	function (options, revAList) {
		var defaultMap = options.defaultMap;
		var isNotRelevant = options.isNotRelevant;
		var end = options.end;
		var innerParsers = options.innerParsers;
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$map,
					$elm$core$Basics$always(
						A2(
							$elm$core$List$cons,
							defaultMap(end),
							revAList)),
					$elm$parser$Parser$symbol(end)),
					A2(
					$elm$parser$Parser$map,
					$elm$core$Basics$always(revAList),
					$elm$parser$Parser$end),
					A3(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$addThen,
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedUnnestable(options),
					revAList,
					$elm$parser$Parser$oneOf(innerParsers)),
					A3(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$consThen,
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedUnnestable(options),
					revAList,
					A2(
						$elm$parser$Parser$map,
						defaultMap,
						$elm$parser$Parser$getChompedString(
							A2(
								$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
								isNotRelevant,
								$elm$parser$Parser$chompIf(
									$elm$core$Basics$always(true))))))
				]));
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedNestable = F3(
	function (nestLevel, options, revAList) {
		var defaultMap = options.defaultMap;
		var isNotRelevant = options.isNotRelevant;
		var start = options.start;
		var end = options.end;
		var innerParsers = options.innerParsers;
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$andThen,
					function (n) {
						return (nestLevel === 1) ? $elm$parser$Parser$succeed(n) : A3($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedNestable, nestLevel - 1, options, n);
					},
					A2(
						$elm$parser$Parser$map,
						$elm$core$Basics$always(
							A2(
								$elm$core$List$cons,
								defaultMap(end),
								revAList)),
						$elm$parser$Parser$symbol(end))),
					A3(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$consThen,
					A2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedNestable, nestLevel + 1, options),
					revAList,
					A2(
						$elm$parser$Parser$map,
						defaultMap,
						$elm$parser$Parser$getChompedString(
							A2(
								$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
								isNotRelevant,
								$elm$parser$Parser$symbol(start))))),
					A3(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$addThen,
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedUnnestable(options),
					revAList,
					$elm$parser$Parser$oneOf(innerParsers)),
					A2(
					$elm$parser$Parser$map,
					$elm$core$Basics$always(revAList),
					$elm$parser$Parser$end),
					A3(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$consThen,
					A2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedNestable, nestLevel, options),
					revAList,
					A2(
						$elm$parser$Parser$map,
						defaultMap,
						$elm$parser$Parser$getChompedString(
							A2(
								$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
								isNotRelevant,
								$elm$parser$Parser$chompIf(
									$elm$core$Basics$always(true))))))
				]));
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedHelp = F2(
	function (options, revAList) {
		var start = options.start;
		var end = options.end;
		var isNotRelevant = options.isNotRelevant;
		var _v0 = _Utils_Tuple2(
			$elm$core$String$uncons(options.start),
			$elm$core$String$uncons(options.end));
		if (_v0.a.$ === 'Nothing') {
			var _v1 = _v0.a;
			return $elm$parser$Parser$problem('Trying to parse a delimited helper, but the start token cannot be an empty string!');
		} else {
			if (_v0.b.$ === 'Nothing') {
				var _v2 = _v0.b;
				return $elm$parser$Parser$problem('Trying to parse a delimited helper, but the end token cannot be an empty string!');
			} else {
				var _v3 = _v0.a.a;
				var startChar = _v3.a;
				var _v4 = _v0.b.a;
				var endChar = _v4.a;
				return options.isNestable ? A3(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedNestable,
					1,
					_Utils_update(
						options,
						{
							isNotRelevant: function (c) {
								return isNotRelevant(c) && ((!_Utils_eq(c, startChar)) && (!_Utils_eq(c, endChar)));
							}
						}),
					revAList) : A2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedUnnestable,
					_Utils_update(
						options,
						{
							isNotRelevant: function (c) {
								return isNotRelevant(c) && (!_Utils_eq(c, endChar));
							}
						}),
					revAList);
			}
		}
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited = function (options) {
	var start = options.start;
	var isNotRelevant = options.isNotRelevant;
	var defaultMap = options.defaultMap;
	return A2(
		$elm$parser$Parser$andThen,
		function (n) {
			return A2(
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedHelp,
				options,
				_List_fromArray(
					[n]));
		},
		A2(
			$elm$parser$Parser$map,
			$elm$core$Basics$always(
				defaultMap(start)),
			$elm$parser$Parser$symbol(start)));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineBreakList = A2(
	$elm$parser$Parser$map,
	function (_v0) {
		return _List_fromArray(
			[
				_Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$LineBreak, '\n')
			]);
	},
	$elm$parser$Parser$symbol('\n'));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$multilineComment = $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	{
		defaultMap: function (b) {
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Comment, b);
		},
		end: '-}',
		innerParsers: _List_fromArray(
			[$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineBreakList]),
		isNestable: true,
		isNotRelevant: function (c) {
			return !$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c);
		},
		start: '{-'
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$comment = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$inlineComment, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$multilineComment]));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$BasicSymbol = {$: 'BasicSymbol'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C = function (a) {
	return {$: 'C', a: a};
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Capitalized = {$: 'Capitalized'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$GroupSymbol = {$: 'GroupSymbol'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Keyword = {$: 'Keyword'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal = {$: 'Normal'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Number = {$: 'Number'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile = function (isNotRelevant) {
	return A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(_Utils_Tuple0),
			$elm$parser$Parser$chompIf(isNotRelevant)),
		$elm$parser$Parser$chompWhile(isNotRelevant));
};
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$basicSymbols = $elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr('|'),
			_Utils_chr('.'),
			_Utils_chr('='),
			_Utils_chr('\\'),
			_Utils_chr('/'),
			_Utils_chr('('),
			_Utils_chr(')'),
			_Utils_chr('-'),
			_Utils_chr('>'),
			_Utils_chr('<'),
			_Utils_chr(':'),
			_Utils_chr('+'),
			_Utils_chr('!'),
			_Utils_chr('$'),
			_Utils_chr('%'),
			_Utils_chr('&'),
			_Utils_chr('*')
		]));
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isBasicSymbol = function (c) {
	return A2($elm$core$Set$member, c, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$basicSymbols);
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$basicSymbol = $elm$parser$Parser$getChompedString(
	$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isBasicSymbol));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$groupSymbols = $elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr(','),
			_Utils_chr('['),
			_Utils_chr(']'),
			_Utils_chr('{'),
			_Utils_chr('}')
		]));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isGroupSymbol = function (c) {
	return A2($elm$core$Set$member, c, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$groupSymbols);
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isStringLiteralChar = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr('\"')) || _Utils_eq(
		c,
		_Utils_chr('\''));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isSpace = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr(' ')) || _Utils_eq(
		c,
		_Utils_chr('\t'));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace = function (c) {
	return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isSpace(c) || $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c);
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isVariableChar = function (c) {
	return !($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c) || ($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isBasicSymbol(c) || ($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isGroupSymbol(c) || $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isStringLiteralChar(c))));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$capitalized = $elm$parser$Parser$getChompedString(
	A2(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isVariableChar,
		$elm$parser$Parser$chompIf($elm$core$Char$isUpper)));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$groupSymbol = $elm$parser$Parser$getChompedString(
	$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isGroupSymbol));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Function = {$: 'Function'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$infixSet = $elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr('+'),
			_Utils_chr('-'),
			_Utils_chr('/'),
			_Utils_chr('*'),
			_Utils_chr('='),
			_Utils_chr('.'),
			_Utils_chr('$'),
			_Utils_chr('<'),
			_Utils_chr('>'),
			_Utils_chr(':'),
			_Utils_chr('&'),
			_Utils_chr('|'),
			_Utils_chr('^'),
			_Utils_chr('?'),
			_Utils_chr('%'),
			_Utils_chr('#'),
			_Utils_chr('@'),
			_Utils_chr('~'),
			_Utils_chr('!'),
			_Utils_chr(',')
		]));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isInfixChar = function (c) {
	return A2($elm$core$Set$member, c, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$infixSet);
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$infixParser = A2(
	$elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(
			$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Function),
			b);
	},
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(_Utils_Tuple0),
					$elm$parser$Parser$backtrackable(
						$elm$parser$Parser$symbol('('))),
				$elm$parser$Parser$backtrackable(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isInfixChar))),
			$elm$parser$Parser$backtrackable(
				$elm$parser$Parser$symbol(')')))));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$keywordSet = $elm$core$Set$fromList(
	_List_fromArray(
		['as', 'where', 'let', 'in', 'if', 'else', 'then', 'case', 'of', 'type', 'alias']));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isKeyword = function (str) {
	return A2($elm$core$Set$member, str, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$keywordSet);
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isNumber = function (c) {
	return $elm$core$Char$isDigit(c) || _Utils_eq(
		c,
		_Utils_chr('.'));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$positiveNumber = A2(
	$elm$parser$Parser$ignorer,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed(_Utils_Tuple0),
		$elm$parser$Parser$chompIf($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isNumber)),
	$elm$parser$Parser$chompWhile($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isNumber));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$negativeNumber = A2(
	$elm$parser$Parser$ignorer,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed(_Utils_Tuple0),
		$elm$parser$Parser$backtrackable(
			$elm$parser$Parser$symbol('-'))),
	$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$positiveNumber);
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$number = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$positiveNumber, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$negativeNumber]));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$variable = $elm$parser$Parser$getChompedString(
	A2(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isVariableChar,
		$elm$parser$Parser$chompIf($elm$core$Char$isLower)));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$weirdText = $elm$parser$Parser$getChompedString(
	$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isVariableChar));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBodyContent = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$map,
			function (b) {
				return _Utils_Tuple2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Number),
					b);
			},
			$elm$parser$Parser$getChompedString($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$number)),
			A2(
			$elm$parser$Parser$map,
			$elm$core$Basics$always(
				_Utils_Tuple2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Capitalized),
					'()')),
			$elm$parser$Parser$symbol('()')),
			$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$infixParser,
			A2(
			$elm$parser$Parser$map,
			function (b) {
				return _Utils_Tuple2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$BasicSymbol),
					b);
			},
			$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$basicSymbol),
			A2(
			$elm$parser$Parser$map,
			function (b) {
				return _Utils_Tuple2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$GroupSymbol),
					b);
			},
			$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$groupSymbol),
			A2(
			$elm$parser$Parser$map,
			function (b) {
				return _Utils_Tuple2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Capitalized),
					b);
			},
			$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$capitalized),
			A2(
			$elm$parser$Parser$map,
			function (n) {
				return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isKeyword(n) ? _Utils_Tuple2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Keyword),
					n) : _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, n);
			},
			$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$variable),
			A2(
			$elm$parser$Parser$map,
			function (b) {
				return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
			},
			$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$weirdText)
		]));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$String = {$: 'String'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$escapableSet = $elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr('\''),
			_Utils_chr('\"'),
			_Utils_chr('\\'),
			_Utils_chr('n'),
			_Utils_chr('r'),
			_Utils_chr('t'),
			_Utils_chr('b'),
			_Utils_chr('f'),
			_Utils_chr('v')
		]));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isEscapableChar = function (c) {
	return A2($elm$core$Set$member, c, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$escapableSet);
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$escapable = A2(
	$elm$parser$Parser$ignorer,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed(_Utils_Tuple0),
		$elm$parser$Parser$backtrackable(
			$elm$parser$Parser$symbol('\\'))),
	$elm$parser$Parser$chompIf($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isEscapableChar));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$elmEscapable = A2(
	$elm$parser$Parser$map,
	function (b) {
		return _List_fromArray(
			[
				_Utils_Tuple2(
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Capitalized),
				b)
			]);
	},
	$elm$parser$Parser$getChompedString($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$escapable));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isEscapable = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr('\\'));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$stringDelimiter = {
	defaultMap: function (b) {
		return _Utils_Tuple2(
			$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$String),
			b);
	},
	end: '\"',
	innerParsers: _List_fromArray(
		[$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineBreakList, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$elmEscapable]),
	isNestable: false,
	isNotRelevant: function (c) {
		return !($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c) || $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isEscapable(c));
	},
	start: '\"'
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$doubleQuote = $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$stringDelimiter);
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$quote = $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	_Utils_update(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$stringDelimiter,
		{end: '\'', start: '\''}));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$tripleDoubleQuote = $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	_Utils_update(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$stringDelimiter,
		{end: '\"\"\"', start: '\"\"\"'}));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$stringLiteral = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$tripleDoubleQuote, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$doubleQuote, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$quote]));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineBreak = A2(
	$elm$parser$Parser$map,
	function (_v0) {
		return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$LineBreak, '\n');
	},
	$elm$parser$Parser$symbol('\n'));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$space = A2(
	$elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
	},
	$elm$parser$Parser$getChompedString(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isSpace)));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$checkContext = function (revTokens) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStep(revTokens),
				$elm$parser$Parser$succeed(
				$elm$parser$Parser$Done(revTokens))
			]));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStep = function (revTokens) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$map,
				function (n) {
					return $elm$parser$Parser$Loop(
						A2($elm$core$List$cons, n, revTokens));
				},
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$space),
				A2(
				$elm$parser$Parser$andThen,
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$checkContext,
				A2(
					$elm$parser$Parser$map,
					function (n) {
						return A2($elm$core$List$cons, n, revTokens);
					},
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineBreak)),
				A2(
				$elm$parser$Parser$map,
				function (n) {
					return $elm$parser$Parser$Loop(
						_Utils_ap(n, revTokens));
				},
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$comment)
			]));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBody = function (revTokens) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStep(revTokens),
				A2(
				$elm$parser$Parser$map,
				function (ns) {
					return $elm$parser$Parser$Loop(
						_Utils_ap(ns, revTokens));
				},
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$stringLiteral),
				A2(
				$elm$parser$Parser$map,
				function (n) {
					return $elm$parser$Parser$Loop(
						A2($elm$core$List$cons, n, revTokens));
				},
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBodyContent),
				$elm$parser$Parser$succeed(
				$elm$parser$Parser$Done(revTokens))
			]));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$TypeSignature = {$: 'TypeSignature'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$fnSigIsNotRelevant = function (c) {
	return !($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c) || (_Utils_eq(
		c,
		_Utils_chr('(')) || (_Utils_eq(
		c,
		_Utils_chr(')')) || (_Utils_eq(
		c,
		_Utils_chr('-')) || _Utils_eq(
		c,
		_Utils_chr(','))))));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$fnSigContentHelp = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$map,
			$elm$core$Basics$always(
				_Utils_Tuple2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$TypeSignature),
					'()')),
			$elm$parser$Parser$symbol('()')),
			A2(
			$elm$parser$Parser$map,
			$elm$core$Basics$always(
				_Utils_Tuple2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$BasicSymbol),
					'->')),
			$elm$parser$Parser$symbol('->')),
			A2(
			$elm$parser$Parser$map,
			function (b) {
				return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
			},
			$elm$parser$Parser$getChompedString(
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
					function (c) {
						return _Utils_eq(
							c,
							_Utils_chr('(')) || (_Utils_eq(
							c,
							_Utils_chr(')')) || (_Utils_eq(
							c,
							_Utils_chr('-')) || _Utils_eq(
							c,
							_Utils_chr(','))));
					}))),
			A2(
			$elm$parser$Parser$map,
			function (b) {
				return _Utils_Tuple2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$TypeSignature),
					b);
			},
			$elm$parser$Parser$getChompedString(
				A2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$fnSigIsNotRelevant,
					$elm$parser$Parser$chompIf($elm$core$Char$isUpper)))),
			A2(
			$elm$parser$Parser$map,
			function (b) {
				return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
			},
			$elm$parser$Parser$getChompedString(
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$fnSigIsNotRelevant)))
		]));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$fnSigContent = function (revTokens) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStep(revTokens),
				A2(
				$elm$parser$Parser$map,
				function (n) {
					return $elm$parser$Parser$Loop(
						A2($elm$core$List$cons, n, revTokens));
				},
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$fnSigContentHelp),
				$elm$parser$Parser$succeed(
				$elm$parser$Parser$Done(revTokens))
			]));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionSignature = function (revTokens) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$map,
				$elm$parser$Parser$Done,
				A2(
					$elm$parser$Parser$andThen,
					function (ns) {
						return A2($elm$parser$Parser$loop, ns, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$fnSigContent);
					},
					A2(
						$elm$parser$Parser$map,
						$elm$core$Basics$always(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$BasicSymbol),
									':'),
								revTokens)),
						$elm$parser$Parser$symbol(':')))),
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStep(revTokens),
				A2(
				$elm$parser$Parser$map,
				$elm$parser$Parser$Done,
				A2($elm$parser$Parser$loop, revTokens, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBody)),
				$elm$parser$Parser$succeed(
				$elm$parser$Parser$Done(revTokens))
			]));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isCommentChar = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr('-')) || _Utils_eq(
		c,
		_Utils_chr('{'));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$commentChar = $elm$parser$Parser$getChompedString(
	$elm$parser$Parser$chompIf($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isCommentChar));
var $elm$parser$Parser$ExpectingKeyword = function (a) {
	return {$: 'ExpectingKeyword', a: a};
};
var $elm$parser$Parser$Advanced$keyword = function (_v0) {
	var kwd = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(kwd);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, kwd, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return (_Utils_eq(newOffset, -1) || (0 <= A3(
				$elm$parser$Parser$Advanced$isSubChar,
				function (c) {
					return $elm$core$Char$isAlphaNum(c) || _Utils_eq(
						c,
						_Utils_chr('_'));
				},
				newOffset,
				s.src))) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$keyword = function (kwd) {
	return $elm$parser$Parser$Advanced$keyword(
		A2(
			$elm$parser$Parser$Advanced$Token,
			kwd,
			$elm$parser$Parser$ExpectingKeyword(kwd)));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$modDecIsNotRelevant = function (c) {
	return !($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c) || ($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isCommentChar(c) || _Utils_eq(
		c,
		_Utils_chr('('))));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$mdpIsNotRelevant = function (c) {
	return !($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c) || ($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isCommentChar(c) || (_Utils_eq(
		c,
		_Utils_chr('(')) || (_Utils_eq(
		c,
		_Utils_chr(')')) || (_Utils_eq(
		c,
		_Utils_chr(',')) || _Utils_eq(
		c,
		_Utils_chr('.')))))));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$mdpnIsSpecialChar = function (c) {
	return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c) || ($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isCommentChar(c) || (_Utils_eq(
		c,
		_Utils_chr('(')) || _Utils_eq(
		c,
		_Utils_chr(')'))));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$checkContextNested = function (_v1) {
	var nestLevel = _v1.a;
	var revTokens = _v1.b;
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStepNested(
				_Utils_Tuple2(nestLevel, revTokens)),
				$elm$parser$Parser$succeed(
				$elm$parser$Parser$Done(revTokens))
			]));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStepNested = function (_v0) {
	var nestLevel = _v0.a;
	var revTokens = _v0.b;
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$map,
				function (n) {
					return $elm$parser$Parser$Loop(
						_Utils_Tuple2(
							nestLevel,
							A2($elm$core$List$cons, n, revTokens)));
				},
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$space),
				A2(
				$elm$parser$Parser$andThen,
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$checkContextNested,
				A2(
					$elm$parser$Parser$map,
					function (n) {
						return _Utils_Tuple2(
							nestLevel,
							A2($elm$core$List$cons, n, revTokens));
					},
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineBreak)),
				A2(
				$elm$parser$Parser$map,
				function (n) {
					return $elm$parser$Parser$Loop(
						_Utils_Tuple2(
							nestLevel,
							_Utils_ap(n, revTokens)));
				},
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$comment)
			]));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$modDecParNest = function (_v0) {
	var nestLevel = _v0.a;
	var revTokens = _v0.b;
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStepNested(
				_Utils_Tuple2(nestLevel, revTokens)),
				A2(
				$elm$parser$Parser$map,
				function (ns) {
					return $elm$parser$Parser$Loop(
						_Utils_Tuple2(nestLevel + 1, ns));
				},
				A2(
					$elm$parser$Parser$map,
					$elm$core$Basics$always(
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, '('),
							revTokens)),
					$elm$parser$Parser$symbol('('))),
				A2(
				$elm$parser$Parser$map,
				function (ns) {
					return (!nestLevel) ? $elm$parser$Parser$Done(ns) : $elm$parser$Parser$Loop(
						_Utils_Tuple2(nestLevel - 1, ns));
				},
				A2(
					$elm$parser$Parser$map,
					$elm$core$Basics$always(
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, ')'),
							revTokens)),
					$elm$parser$Parser$symbol(')'))),
				A2(
				$elm$parser$Parser$map,
				function (n) {
					return $elm$parser$Parser$Loop(
						_Utils_Tuple2(
							nestLevel,
							A2($elm$core$List$cons, n, revTokens)));
				},
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							A2(
							$elm$parser$Parser$map,
							function (b) {
								return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
							},
							$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$commentChar),
							A2(
							$elm$parser$Parser$map,
							function (s) {
								return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, s);
							},
							$elm$parser$Parser$getChompedString(
								$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
									A2($elm$core$Basics$composeL, $elm$core$Basics$not, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$mdpnIsSpecialChar))))
						]))),
				$elm$parser$Parser$succeed(
				$elm$parser$Parser$Done(revTokens))
			]));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$modDecParentheses = function (revTokens) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStep(revTokens),
				A2(
				$elm$parser$Parser$map,
				$elm$parser$Parser$Done,
				A2(
					$elm$parser$Parser$map,
					$elm$core$Basics$always(
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, ')'),
							revTokens)),
					$elm$parser$Parser$symbol(')'))),
				A2(
				$elm$parser$Parser$map,
				function (n) {
					return $elm$parser$Parser$Loop(
						A2($elm$core$List$cons, n, revTokens));
				},
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$infixParser,
							A2(
							$elm$parser$Parser$map,
							function (b) {
								return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
							},
							$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$commentChar),
							A2(
							$elm$parser$Parser$map,
							function (b) {
								return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
							},
							$elm$parser$Parser$getChompedString(
								$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
									function (c) {
										return _Utils_eq(
											c,
											_Utils_chr(',')) || _Utils_eq(
											c,
											_Utils_chr('.'));
									}))),
							A2(
							$elm$parser$Parser$map,
							function (b) {
								return _Utils_Tuple2(
									$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$TypeSignature),
									b);
							},
							$elm$parser$Parser$getChompedString(
								A2(
									$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
									$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$mdpIsNotRelevant,
									$elm$parser$Parser$chompIf($elm$core$Char$isUpper)))),
							A2(
							$elm$parser$Parser$map,
							function (b) {
								return _Utils_Tuple2(
									$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Function),
									b);
							},
							$elm$parser$Parser$getChompedString(
								$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$mdpIsNotRelevant)))
						]))),
				A2(
				$elm$parser$Parser$map,
				$elm$parser$Parser$Loop,
				A2(
					$elm$parser$Parser$andThen,
					function (n) {
						return A2(
							$elm$parser$Parser$loop,
							_Utils_Tuple2(0, n),
							$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$modDecParNest);
					},
					A2(
						$elm$parser$Parser$map,
						$elm$core$Basics$always(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, '('),
								revTokens)),
						$elm$parser$Parser$symbol('(')))),
				$elm$parser$Parser$succeed(
				$elm$parser$Parser$Done(revTokens))
			]));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$moduleDeclaration = function (revTokens) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStep(revTokens),
				A2(
				$elm$parser$Parser$map,
				$elm$parser$Parser$Loop,
				A2(
					$elm$parser$Parser$andThen,
					function (n) {
						return A2($elm$parser$Parser$loop, n, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$modDecParentheses);
					},
					A2(
						$elm$parser$Parser$map,
						$elm$core$Basics$always(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, '('),
								revTokens)),
						$elm$parser$Parser$symbol('(')))),
				A2(
				$elm$parser$Parser$map,
				function (n) {
					return $elm$parser$Parser$Loop(
						A2($elm$core$List$cons, n, revTokens));
				},
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							A2(
							$elm$parser$Parser$map,
							function (b) {
								return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
							},
							$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$commentChar),
							A2(
							$elm$parser$Parser$map,
							$elm$core$Basics$always(
								_Utils_Tuple2(
									$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Keyword),
									'exposing')),
							$elm$parser$Parser$keyword('exposing')),
							A2(
							$elm$parser$Parser$map,
							$elm$core$Basics$always(
								_Utils_Tuple2(
									$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Keyword),
									'as')),
							$elm$parser$Parser$keyword('as')),
							A2(
							$elm$parser$Parser$map,
							function (b) {
								return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
							},
							$elm$parser$Parser$getChompedString(
								$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$modDecIsNotRelevant)))
						]))),
				$elm$parser$Parser$succeed(
				$elm$parser$Parser$Done(revTokens))
			]));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$portDeclarationHelp = F2(
	function (revTokens, str) {
		return (str === 'module') ? A2(
			$elm$parser$Parser$loop,
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Keyword),
					str),
				revTokens),
			$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$moduleDeclaration) : A2(
			$elm$parser$Parser$loop,
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Function),
					str),
				revTokens),
			$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionSignature);
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$portDeclaration = function (revTokens) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStep(revTokens),
				A2(
				$elm$parser$Parser$map,
				$elm$parser$Parser$Done,
				A2(
					$elm$parser$Parser$andThen,
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$portDeclarationHelp(revTokens),
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$variable)),
				A2(
				$elm$parser$Parser$map,
				$elm$parser$Parser$Done,
				A2($elm$parser$Parser$loop, revTokens, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBody)),
				$elm$parser$Parser$succeed(
				$elm$parser$Parser$Done(revTokens))
			]));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineStartVariable = F2(
	function (revTokens, n) {
		return ((n === 'module') || (n === 'import')) ? A2(
			$elm$parser$Parser$loop,
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Keyword),
					n),
				revTokens),
			$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$moduleDeclaration) : ((n === 'port') ? A2(
			$elm$parser$Parser$loop,
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Keyword),
					n),
				revTokens),
			$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$portDeclaration) : ($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isKeyword(n) ? A2(
			$elm$parser$Parser$loop,
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Keyword),
					n),
				revTokens),
			$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBody) : A2(
			$elm$parser$Parser$loop,
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Function),
					n),
				revTokens),
			$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionSignature)));
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$mainLoop = function (revTokens) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$map,
				function (n) {
					return $elm$parser$Parser$Loop(
						A2($elm$core$List$cons, n, revTokens));
				},
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$space),
				A2(
				$elm$parser$Parser$map,
				function (n) {
					return $elm$parser$Parser$Loop(
						A2($elm$core$List$cons, n, revTokens));
				},
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineBreak),
				A2(
				$elm$parser$Parser$map,
				function (n) {
					return $elm$parser$Parser$Loop(
						_Utils_ap(n, revTokens));
				},
				$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$comment),
				A2(
				$elm$parser$Parser$map,
				$elm$parser$Parser$Loop,
				A2(
					$elm$parser$Parser$andThen,
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineStartVariable(revTokens),
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$variable)),
				A2(
				$elm$parser$Parser$map,
				$elm$parser$Parser$Loop,
				A2(
					$elm$parser$Parser$andThen,
					function (s) {
						return A2(
							$elm$parser$Parser$loop,
							_Utils_ap(s, revTokens),
							$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBody);
					},
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$stringLiteral)),
				A2(
				$elm$parser$Parser$map,
				$elm$parser$Parser$Loop,
				A2(
					$elm$parser$Parser$andThen,
					function (s) {
						return A2(
							$elm$parser$Parser$loop,
							A2($elm$core$List$cons, s, revTokens),
							$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBody);
					},
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBodyContent)),
				$elm$parser$Parser$succeed(
				$elm$parser$Parser$Done(revTokens))
			]));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$toRevTokens = A2($elm$parser$Parser$loop, _List_Nil, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$mainLoop);
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$toLines = A2(
	$elm$core$Basics$composeR,
	$elm$parser$Parser$run($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$toRevTokens),
	$elm$core$Result$map(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toLines($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$syntaxToStyle)));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$elm = A2(
	$elm$core$Basics$composeR,
	$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$toLines,
	$elm$core$Result$map($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$HCode));
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Add = {$: 'Add'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Del = {$: 'Del'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Normal = {$: 'Normal'};
var $elm$core$Basics$ge = _Utils_ge;
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$highlightLinesHelp = F5(
	function (maybeHighlight, start, end, index, line) {
		return ((_Utils_cmp(index, start) > -1) && (_Utils_cmp(index, end) < 0)) ? _Utils_update(
			line,
			{highlight: maybeHighlight}) : line;
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$highlightLines = F4(
	function (maybeHighlight, start, end, lines) {
		var length = $elm$core$List$length(lines);
		var start_ = (start < 0) ? (length + start) : start;
		var end_ = (end < 0) ? (length + end) : end;
		return A2(
			$elm$core$List$indexedMap,
			A3($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$highlightLinesHelp, maybeHighlight, start_, end_),
			lines);
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$highlightLines = F4(
	function (maybeHighlight, start, end, _v0) {
		var lines = _v0.a;
		var maybeHighlight_ = function () {
			if (maybeHighlight.$ === 'Nothing') {
				return $elm$core$Maybe$Nothing;
			} else {
				switch (maybeHighlight.a.$) {
					case 'Highlight':
						var _v2 = maybeHighlight.a;
						return $elm$core$Maybe$Just($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Normal);
					case 'Add':
						var _v3 = maybeHighlight.a;
						return $elm$core$Maybe$Just($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Add);
					default:
						var _v4 = maybeHighlight.a;
						return $elm$core$Maybe$Just($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Del);
				}
			}
		}();
		return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$HCode(
			A4($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$highlightLines, maybeHighlight_, start, end, lines));
	});
var $elm$html$Html$code = _VirtualDom_node('code');
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$requiredStyleToString = function (required) {
	return 'elmsh' + function () {
		switch (required.$) {
			case 'Default':
				return '0';
			case 'Comment':
				return '-comm';
			case 'Style1':
				return '1';
			case 'Style2':
				return '2';
			case 'Style3':
				return '3';
			case 'Style4':
				return '4';
			case 'Style5':
				return '5';
			case 'Style6':
				return '6';
			default:
				return '7';
		}
	}();
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$fragmentView = function (_v0) {
	var text = _v0.text;
	var requiredStyle = _v0.requiredStyle;
	var additionalClass = _v0.additionalClass;
	return (_Utils_eq(requiredStyle, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default) && $elm$core$String$isEmpty(additionalClass)) ? $elm$html$Html$text(text) : A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2(
						$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$requiredStyleToString(requiredStyle),
						!_Utils_eq(requiredStyle, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default)),
						_Utils_Tuple2('elmsh-' + additionalClass, additionalClass !== '')
					]))
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(text)
			]));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$lineView = F3(
	function (start, index, _v0) {
		var fragments = _v0.fragments;
		var highlight = _v0.highlight;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('elmsh-line', true),
							_Utils_Tuple2(
							'elmsh-hl',
							_Utils_eq(
								highlight,
								$elm$core$Maybe$Just($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Normal))),
							_Utils_Tuple2(
							'elmsh-add',
							_Utils_eq(
								highlight,
								$elm$core$Maybe$Just($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Add))),
							_Utils_Tuple2(
							'elmsh-del',
							_Utils_eq(
								highlight,
								$elm$core$Maybe$Just($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Del)))
						])),
					A2(
					$elm$html$Html$Attributes$attribute,
					'data-elmsh-lc',
					$elm$core$String$fromInt(start + index))
				]),
			A2($elm$core$List$map, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$fragmentView, fragments));
	});
var $elm$html$Html$pre = _VirtualDom_node('pre');
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$toInlineHtml = function (lines) {
	return A2(
		$elm$html$Html$code,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('elmsh')
			]),
		$elm$core$List$concat(
			A2(
				$elm$core$List$map,
				function (_v0) {
					var highlight = _v0.highlight;
					var fragments = _v0.fragments;
					return _Utils_eq(highlight, $elm$core$Maybe$Nothing) ? A2($elm$core$List$map, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$fragmentView, fragments) : _List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$classList(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'elmsh-hl',
											_Utils_eq(
												highlight,
												$elm$core$Maybe$Just($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Normal))),
											_Utils_Tuple2(
											'elmsh-add',
											_Utils_eq(
												highlight,
												$elm$core$Maybe$Just($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Add))),
											_Utils_Tuple2(
											'elmsh-del',
											_Utils_eq(
												highlight,
												$elm$core$Maybe$Just($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Del)))
										]))
								]),
							A2($elm$core$List$map, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$fragmentView, fragments))
						]);
				},
				lines)));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$toBlockHtml = F2(
	function (maybeStart, lines) {
		if (maybeStart.$ === 'Nothing') {
			return A2(
				$elm$html$Html$pre,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('elmsh')
					]),
				_List_fromArray(
					[
						$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$toInlineHtml(lines)
					]));
		} else {
			var start = maybeStart.a;
			return A2(
				$elm$html$Html$pre,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('elmsh')
					]),
				$elm$core$List$singleton(
					A2(
						$elm$html$Html$code,
						_List_Nil,
						A2(
							$elm$core$List$indexedMap,
							$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$lineView(start),
							lines))));
		}
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$toBlockHtml = F2(
	function (maybeStart, _v0) {
		var lines = _v0.a;
		return A2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$toBlockHtml, maybeStart, lines);
	});
var $author$project$Main$codeToHtml = F3(
	function (maybeStart, str, hlModel) {
		return function (result) {
			if (result.$ === 'Ok') {
				var a = result.a;
				return a;
			} else {
				var x = result.a;
				return $elm$html$Html$text(x);
			}
		}(
			A2(
				$elm$core$Result$mapError,
				$elm$parser$Parser$deadEndsToString,
				A2(
					$elm$core$Result$map,
					$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$toBlockHtml(maybeStart),
					A2(
						$elm$core$Result$map,
						A3($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$highlightLines, hlModel.mode, hlModel.start, hlModel.end),
						$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$elm(str)))));
	});
var $author$project$Main$defaultHighlightModel = {end: 0, mode: $elm$core$Maybe$Nothing, start: 0};
var $elm$virtual_dom$VirtualDom$lazy3 = _VirtualDom_lazy3;
var $elm$html$Html$Lazy$lazy3 = $elm$virtual_dom$VirtualDom$lazy3;
var $author$project$Main$viewCode = F2(
	function (showLineNrs, code) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('elmsh', true),
							_Utils_Tuple2('with-line-numbers', showLineNrs)
						]))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('view-container')
						]),
					_List_fromArray(
						[
							A4(
							$elm$html$Html$Lazy$lazy3,
							$author$project$Main$codeToHtml,
							$elm$core$Maybe$Just(1),
							code,
							$author$project$Main$defaultHighlightModel)
						]))
				]));
	});
var $author$project$Main$themeInfo = F2(
	function (select_, currentTheme) {
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$name('themes')
					]),
				_List_Nil),
				A2(
				$elm$html$Html$h3,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Themes')
					])),
				$author$project$Main$markdown('\nPico.css comes with [a variety of color themes](https://picocss.com/docs/color-schemes).\n\nEach has a dedicated CSS file that needs to be included.\nYou can use the `includeFromCDN` function to include the CSS for the given theme from a CDN.\n'),
				A2(
				$author$project$Pico$grid,
				'',
				_List_fromArray(
					[
						select_,
						_List_fromArray(
						[
							A2(
							$author$project$Main$viewCode,
							false,
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[
										'includeFromCDN ',
										$author$project$Pico$Theme$themeName(currentTheme)
									])))
						])
					])),
				$author$project$Main$markdown('Of course you can also download the CSS yourself and serve it yourself.')
			]);
	});
var $author$project$Pico$Theme$Blue = {$: 'Blue'};
var $author$project$Pico$Theme$Cyan = {$: 'Cyan'};
var $author$project$Pico$Theme$Fuchsia = {$: 'Fuchsia'};
var $author$project$Pico$Theme$Green = {$: 'Green'};
var $author$project$Pico$Theme$Grey = {$: 'Grey'};
var $author$project$Pico$Theme$Indigo = {$: 'Indigo'};
var $author$project$Pico$Theme$Jade = {$: 'Jade'};
var $author$project$Pico$Theme$Lime = {$: 'Lime'};
var $author$project$Pico$Theme$Orange = {$: 'Orange'};
var $author$project$Pico$Theme$Pink = {$: 'Pink'};
var $author$project$Pico$Theme$Pumpkin = {$: 'Pumpkin'};
var $author$project$Pico$Theme$Purple = {$: 'Purple'};
var $author$project$Pico$Theme$Red = {$: 'Red'};
var $author$project$Pico$Theme$Sand = {$: 'Sand'};
var $author$project$Pico$Theme$Slate = {$: 'Slate'};
var $author$project$Pico$Theme$Violet = {$: 'Violet'};
var $author$project$Pico$Theme$Yellow = {$: 'Yellow'};
var $author$project$Pico$Theme$Zinc = {$: 'Zinc'};
var $author$project$Pico$Theme$themes = _List_fromArray(
	[$author$project$Pico$Theme$Amber, $author$project$Pico$Theme$Blue, $author$project$Pico$Theme$Cyan, $author$project$Pico$Theme$Fuchsia, $author$project$Pico$Theme$Green, $author$project$Pico$Theme$Grey, $author$project$Pico$Theme$Indigo, $author$project$Pico$Theme$Jade, $author$project$Pico$Theme$Lime, $author$project$Pico$Theme$Orange, $author$project$Pico$Theme$Pink, $author$project$Pico$Theme$Pumpkin, $author$project$Pico$Theme$Purple, $author$project$Pico$Theme$Red, $author$project$Pico$Theme$Sand, $author$project$Pico$Theme$Slate, $author$project$Pico$Theme$Violet, $author$project$Pico$Theme$Yellow, $author$project$Pico$Theme$Zinc]);
var $author$project$Main$themeVariants = function () {
	var mkVariant = function (theme) {
		return {
			id: $author$project$Pico$Theme$themeName(theme),
			label: $author$project$Pico$Theme$themeName(theme),
			value: theme
		};
	};
	return A2(
		$elm$core$Maybe$withDefault,
		$mgold$elm_nonempty_list$List$Nonempty$singleton(
			mkVariant($author$project$Pico$Theme$Amber)),
		$mgold$elm_nonempty_list$List$Nonempty$fromList(
			A2($elm$core$List$map, mkVariant, $author$project$Pico$Theme$themes)));
}();
var $author$project$Main$mainArgsForm = A3(
	$axelerator$fancy_forms$FancyForms$Form$field,
	function ($) {
		return $.theme;
	},
	A2($author$project$Pico$Form$dropdown, '', $author$project$Main$themeVariants),
	A3(
		$axelerator$fancy_forms$FancyForms$Form$field,
		function ($) {
			return $.colorScheme;
		},
		A2($author$project$Pico$Form$dropdown, 'Color Scheme', $author$project$Main$colorSchemeVariants),
		A3(
			$axelerator$fancy_forms$FancyForms$Form$field,
			function ($) {
				return $.layout;
			},
			A2($author$project$Pico$Form$dropdown, 'Layout', $author$project$Main$layoutVariants),
			A4(
				$axelerator$fancy_forms$FancyForms$Form$form,
				F2(
					function (errors_, html) {
						return html;
					}),
				$axelerator$fancy_forms$FancyForms$FormState$alwaysValid,
				'mainargs',
				F3(
					function (layout, colorScheme, theme) {
						return {
							combine: function (formState) {
								return {
									colorScheme: colorScheme.value(formState),
									layout: layout.value(formState),
									theme: theme.value(formState)
								};
							},
							view: F2(
								function (formState, _v0) {
									return $elm$core$List$concat(
										_List_fromArray(
											[
												layout.view(formState),
												$author$project$Main$darkModeInfo(
												colorScheme.view(formState)),
												A2(
												$author$project$Main$themeInfo,
												theme.view(formState),
												theme.value(formState))
											]));
								})
						};
					})))));
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$init = function (_v0) {
	return _Utils_Tuple2(
		{
			buttonOutline: false,
			combinedFormState: A2(
				$axelerator$fancy_forms$FancyForms$Form$init,
				$author$project$Main$combinedForm,
				_List_fromArray(
					[
						$author$project$Main$Email('bFQpR@example.com')
					])),
			count: 0,
			exampleFormState: A2($axelerator$fancy_forms$FancyForms$Form$init, $author$project$Main$exampleForm, $author$project$Main$initExampleForm),
			linksAsButtons: false,
			listFormState: A2(
				$axelerator$fancy_forms$FancyForms$Form$init,
				$author$project$Main$listForm,
				_List_fromArray(
					['Get out of bed!'])),
			mainArgs: A2($axelerator$fancy_forms$FancyForms$Form$init, $author$project$Main$mainArgsForm, $author$project$Main$initMainArgs),
			testModal: {content: $author$project$Main$NothingYet, state: $author$project$Pico$Modal$init},
			variantFormState: A2($axelerator$fancy_forms$FancyForms$Form$init, $author$project$Main$variantForm, $author$project$Main$initVariantForm)
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Main$ForModal = function (a) {
	return {$: 'ForModal', a: a};
};
var $author$project$Pico$Modal$ClosingDone = {$: 'ClosingDone'};
var $author$project$Pico$Modal$OpeningDone = {$: 'OpeningDone'};
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $author$project$Pico$Modal$Close = {$: 'Close'};
var $author$project$Pico$Modal$Control = function (a) {
	return {$: 'Control', a: a};
};
var $author$project$Pico$Modal$Character = function (a) {
	return {$: 'Character', a: a};
};
var $author$project$Pico$Modal$toKey = function (string) {
	var _v0 = $elm$core$String$uncons(string);
	if ((_v0.$ === 'Just') && (_v0.a.b === '')) {
		var _v1 = _v0.a;
		var _char = _v1.a;
		return $author$project$Pico$Modal$Character(_char);
	} else {
		return $author$project$Pico$Modal$Control(string);
	}
};
var $author$project$Pico$Modal$keyDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$Pico$Modal$toKey,
	A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
var $author$project$Pico$Modal$modalEscape = function (toMsg) {
	return A2(
		$elm$json$Json$Decode$andThen,
		function (key) {
			return _Utils_eq(
				key,
				$author$project$Pico$Modal$Control('Escape')) ? $elm$json$Json$Decode$succeed(
				toMsg($author$project$Pico$Modal$Close)) : $elm$json$Json$Decode$fail('not escape');
		},
		$author$project$Pico$Modal$keyDecoder);
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyUp = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keyup');
var $author$project$Pico$Modal$subscription = F2(
	function (toMsg, modalState) {
		switch (modalState.$) {
			case 'IsOpen':
				return $elm$browser$Browser$Events$onKeyUp(
					$author$project$Pico$Modal$modalEscape(toMsg));
			case 'IsClosed':
				return $elm$core$Platform$Sub$none;
			default:
				switch (modalState.$) {
					case 'IsOpening':
						return A2(
							$elm$time$Time$every,
							800,
							function (_v2) {
								return toMsg($author$project$Pico$Modal$OpeningDone);
							});
					case 'IsClosing':
						return A2(
							$elm$time$Time$every,
							800,
							function (_v3) {
								return toMsg($author$project$Pico$Modal$ClosingDone);
							});
					default:
						return $elm$core$Platform$Sub$none;
				}
		}
	});
var $author$project$Main$subscriptions = function (model) {
	return A2($author$project$Pico$Modal$subscription, $author$project$Main$ForModal, model.testModal.state);
};
var $author$project$Main$FormResult = function (a) {
	return {$: 'FormResult', a: a};
};
var $author$project$Main$ModalExample = {$: 'ModalExample'};
var $author$project$Pico$Modal$IsClosing = {$: 'IsClosing'};
var $author$project$Pico$Modal$close = function (modalState) {
	if (modalState.$ === 'IsOpen') {
		return $author$project$Pico$Modal$IsClosing;
	} else {
		return modalState;
	}
};
var $axelerator$fancy_forms$FancyForms$Form$extract = function (_v0) {
	var fn = _v0.fn;
	return fn.combine;
};
var $axelerator$fancy_forms$FancyForms$FormState$NotValid = {$: 'NotValid'};
var $axelerator$fancy_forms$FancyForms$Form$addInvalidIfInconsistent = F3(
	function (form_, formState, errors) {
		return form_.isConsistent(formState) ? errors : A2($elm$core$List$cons, $axelerator$fancy_forms$FancyForms$FormState$NotValid, errors);
	});
var $axelerator$fancy_forms$FancyForms$Form$isValid = F2(
	function (form_, formState) {
		var fn = form_.fn;
		var validator = form_.validator;
		return $elm$core$List$isEmpty(
			A3(
				$axelerator$fancy_forms$FancyForms$Form$addInvalidIfInconsistent,
				form_,
				formState,
				validator(
					fn.combine(formState))));
	});
var $author$project$Pico$Modal$IsOpening = {$: 'IsOpening'};
var $author$project$Pico$Modal$open = function (modalState) {
	if (modalState.$ === 'IsClosed') {
		return $author$project$Pico$Modal$IsOpening;
	} else {
		return modalState;
	}
};
var $axelerator$fancy_forms$FancyForms$Form$update = F3(
	function (form_, msg, formState) {
		if (msg.$ === 'FormMsg') {
			var fieldId = msg.a;
			var subfieldId = msg.b;
			var op = msg.c;
			return A5($axelerator$fancy_forms$FancyForms$Form$updateField, form_, fieldId, subfieldId, op, formState);
		} else {
			return formState;
		}
	});
var $author$project$Pico$Modal$IsOpen = {$: 'IsOpen'};
var $author$project$Pico$Modal$update = F2(
	function (msg, modalState) {
		switch (msg.$) {
			case 'OpeningDone':
				return $author$project$Pico$Modal$IsOpen;
			case 'ClosingDone':
				return $author$project$Pico$Modal$IsClosed;
			default:
				return $author$project$Pico$Modal$IsClosing;
		}
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Noop':
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'ShowModalExample':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							testModal: {
								content: $author$project$Main$ModalExample,
								state: $author$project$Pico$Modal$open(model.testModal.state)
							}
						}),
					$elm$core$Platform$Cmd$none);
			case 'CloseModal':
				var modal_ = model.testModal;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							testModal: _Utils_update(
								modal_,
								{
									state: $author$project$Pico$Modal$close(modal_.state)
								})
						}),
					$elm$core$Platform$Cmd$none);
			case 'ForModal':
				var modalMsg = msg.a;
				var modal_ = model.testModal;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							testModal: _Utils_update(
								modal_,
								{
									state: A2($author$project$Pico$Modal$update, modalMsg, modal_.state)
								})
						}),
					$elm$core$Platform$Cmd$none);
			case 'ForForm':
				var formId = msg.a;
				var fMsg = msg.b;
				var model_ = function () {
					switch (formId.$) {
						case 'MainArgsForm':
							return _Utils_update(
								model,
								{
									mainArgs: A3($axelerator$fancy_forms$FancyForms$Form$update, $author$project$Main$mainArgsForm, fMsg, model.mainArgs)
								});
						case 'ExampleForm':
							return _Utils_update(
								model,
								{
									exampleFormState: A3($axelerator$fancy_forms$FancyForms$Form$update, $author$project$Main$exampleForm, fMsg, model.exampleFormState)
								});
						case 'ListForm':
							return _Utils_update(
								model,
								{
									listFormState: A3($axelerator$fancy_forms$FancyForms$Form$update, $author$project$Main$listForm, fMsg, model.listFormState)
								});
						case 'VariantForm':
							return _Utils_update(
								model,
								{
									variantFormState: A3($axelerator$fancy_forms$FancyForms$Form$update, $author$project$Main$variantForm, fMsg, model.variantFormState)
								});
						default:
							return _Utils_update(
								model,
								{
									combinedFormState: A3($axelerator$fancy_forms$FancyForms$Form$update, $author$project$Main$combinedForm, fMsg, model.combinedFormState)
								});
					}
				}();
				return _Utils_Tuple2(model_, $elm$core$Platform$Cmd$none);
			case 'SubmitForm':
				return A2($axelerator$fancy_forms$FancyForms$Form$isValid, $author$project$Main$exampleForm, model.exampleFormState) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							testModal: {
								content: $author$project$Main$FormResult(
									A2($axelerator$fancy_forms$FancyForms$Form$extract, $author$project$Main$exampleForm, model.exampleFormState)),
								state: $author$project$Pico$Modal$open(model.testModal.state)
							}
						}),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					_Utils_update(
						model,
						{
							exampleFormState: $axelerator$fancy_forms$FancyForms$FormState$blurAll(model.exampleFormState)
						}),
					$elm$core$Platform$Cmd$none);
			case 'ToggleOutline':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{buttonOutline: !model.buttonOutline}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{linksAsButtons: !model.linksAsButtons}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme = function (a) {
	return {$: 'Theme', a: a};
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex = function (a) {
	return {$: 'Hex', a: a};
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$DefaultColor = {$: 'DefaultColor'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$backgroundColor = function (background) {
	return {background: background, isBold: false, isItalic: false, isUnderline: false, text: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$DefaultColor};
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$noEmphasis = F2(
	function (text, background) {
		return {background: background, isBold: false, isItalic: false, isUnderline: false, text: text};
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor = function (text) {
	return {background: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$DefaultColor, isBold: false, isItalic: false, isUnderline: false, text: text};
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$GitHub$requiredStyles = {
	addition: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$backgroundColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#eaffea')),
	comment: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#969896')),
	_default: A2(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$noEmphasis,
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#24292e'),
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#ffffff')),
	deletion: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$backgroundColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#ffecec')),
	highlight: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$backgroundColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#fffbdd')),
	style1: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#005cc5')),
	style2: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#df5000')),
	style3: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#d73a49')),
	style4: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#0086b3')),
	style5: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#63a35c')),
	style6: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#005cc5')),
	style7: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#795da3'))
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$GitHub$theme = {customStyles: _List_Nil, requiredStyles: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$GitHub$requiredStyles};
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						$elm$core$List$cons,
						sep,
						A2($elm$core$List$cons, x, rest));
				});
			var spersed = A3($elm$core$List$foldr, step, _List_Nil, tl);
			return A2($elm$core$List$cons, hd, spersed);
		}
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$atRuleToFragment = function (a) {
	switch (a.$) {
		case 'Identifier':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'css-ar-i');
		case 'Prefix':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'css-ar-p');
		case 'Keyword':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'css-ar-k');
		default:
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'css-ar-v');
	}
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style7 = {$: 'Style7'};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attributeSelectorToFragment = function (att) {
	switch (att.$) {
		case 'AttributeName':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'css-s-a-an');
		case 'AttributeValue':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2, 'css-s-a-av');
		default:
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'css-s-a-o');
	}
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$selectorToFragment = function (s) {
	switch (s.$) {
		case 'Element':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'css-s-e');
		case 'Id':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'css-s-i');
		case 'Class':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'css-s-cl');
		case 'Combinator':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style7, 'css-s-c');
		case 'Universal':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'css-s-u');
		case 'AttributeSelector':
			var att = s.a;
			return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attributeSelectorToFragment(att);
		case 'PseudoElement':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default, 'css-s-pe');
		default:
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default, 'css-s-pc');
	}
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$syntaxToStyle = function (syntax) {
	switch (syntax.$) {
		case 'String':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2, 'css-s');
		case 'AtRule':
			var a = syntax.a;
			return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$atRuleToFragment(a);
		case 'Selector':
			var s = syntax.a;
			return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$selectorToFragment(s);
		case 'Property':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'css-p');
		case 'PropertyValue':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'css-pv');
		case 'Number':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style1, 'css-n');
		default:
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'css-u');
	}
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$syntaxToStyle = function (syntax) {
	switch (syntax.$) {
		case 'Number':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style1, 'js-n');
		case 'String':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2, 'js-s');
		case 'Keyword':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'js-k');
		case 'DeclarationKeyword':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'js-dk');
		case 'FunctionEval':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'js-fe');
		case 'Function':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'js-f');
		case 'LiteralKeyword':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style6, 'js-lk');
		case 'Param':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style7, 'js-p');
		default:
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'js-ce');
	}
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Nix$syntaxToStyle = function (syntax) {
	switch (syntax.$) {
		case 'Number':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style1, 'nix-n');
		case 'String':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2, 'nix-s');
		case 'Keyword':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'nix-k');
		case 'Operator':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'nix-o');
		case 'Function':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'nix-f');
		case 'Punctuation':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style6, 'nix-p');
		default:
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style7, 'nix-l');
	}
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$syntaxToStyle = function (syntax) {
	return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default, 'nolang');
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$syntaxToStyle = function (syntax) {
	switch (syntax.$) {
		case 'Number':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style1, 'py-n');
		case 'String':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2, 'py-s');
		case 'Keyword':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'py-k');
		case 'DeclarationKeyword':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'py-dk');
		case 'Function':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'py-f');
		case 'LiteralKeyword':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style6, 'py-lk');
		case 'Param':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style7, 'py-p');
		default:
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default, 'py-fe');
	}
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$syntaxToStyle = function (syntax) {
	switch (syntax.$) {
		case 'Number':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style1, 'sql-n');
		case 'String':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2, 'sql-s');
		case 'Keyword':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'sql-k');
		case 'Operator':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'sql-o');
		case 'Function':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'sql-f');
		case 'Punctuation':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style6, 'sql-p');
		default:
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style7, 'sql-l');
	}
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$syntaxToStyle = function (syntax) {
	switch (syntax.$) {
		case 'Tag':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'xml-t');
		case 'Attribute':
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'xml-a');
		default:
			return _Utils_Tuple2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2, 'xlm-av');
	}
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$Type$syntaxToSelector = function (syntax) {
	switch (syntax.$) {
		case 'Elm':
			var elmSyntax = syntax.a;
			return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$syntaxToStyle(elmSyntax).b;
		case 'Xml':
			var xmlSyntax = syntax.a;
			return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$syntaxToStyle(xmlSyntax).b;
		case 'Javascript':
			var jsSyntax = syntax.a;
			return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$syntaxToStyle(jsSyntax).b;
		case 'Css':
			var cssSyntax = syntax.a;
			return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$syntaxToStyle(cssSyntax).b;
		case 'Python':
			var pythonSyntax = syntax.a;
			return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$syntaxToStyle(pythonSyntax).b;
		case 'Sql':
			var sqlSyntax = syntax.a;
			return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$syntaxToStyle(sqlSyntax).b;
		case 'Nix':
			var nixSyntax = syntax.a;
			return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Nix$syntaxToStyle(nixSyntax).b;
		default:
			var noLangSyntax = syntax.a;
			return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$syntaxToStyle(noLangSyntax).b;
	}
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$Type$syntaxesToSelectors = function (syntaxes) {
	return $elm$core$String$concat(
		A2(
			$elm$core$List$intersperse,
			', ',
			A2(
				$elm$core$List$map,
				$elm$core$Basics$append('.elmsh-'),
				A2($elm$core$List$map, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$Type$syntaxToSelector, syntaxes))));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$colorToCss = F2(
	function (property, color) {
		switch (color.$) {
			case 'DefaultColor':
				return '';
			case 'Hex':
				var hex = color.a;
				return property + (hex + ';');
			case 'Rgb':
				var r = color.a;
				var g = color.b;
				var b = color.c;
				return $elm$core$String$concat(
					_List_fromArray(
						[
							property,
							'rgb(',
							$elm$core$String$fromInt(r),
							', ',
							$elm$core$String$fromInt(g),
							',',
							$elm$core$String$fromInt(b),
							');'
						]));
			default:
				var r = color.a;
				var g = color.b;
				var b = color.c;
				var a = color.d;
				return $elm$core$String$concat(
					_List_fromArray(
						[
							property,
							'rgba(',
							$elm$core$String$fromInt(r),
							', ',
							$elm$core$String$fromInt(g),
							',',
							$elm$core$String$fromInt(b),
							', ',
							$elm$core$String$fromFloat(a),
							');'
						]));
		}
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$emptyIfFalse = F2(
	function (bool, str) {
		return bool ? str : '';
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$styleToCss = function (_v0) {
	var isBold = _v0.isBold;
	var isItalic = _v0.isItalic;
	var isUnderline = _v0.isUnderline;
	var text = _v0.text;
	var background = _v0.background;
	return $elm$core$String$concat(
		_List_fromArray(
			[
				A2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$emptyIfFalse, isBold, 'font-weight: bold;'),
				A2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$emptyIfFalse, isItalic, 'font-style: italic;'),
				A2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$emptyIfFalse, isUnderline, 'text-decoration: underline;'),
				A2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$colorToCss, 'color: ', text),
				A2($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$colorToCss, 'background: ', background)
			]));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$toCssClass = function (_v0) {
	var selectors = _v0.a;
	var style = _v0.b;
	return $elm$core$String$isEmpty(selectors) ? '' : (selectors + (' {' + ($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$styleToCss(style) + '}')));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$toCss = function (classes) {
	return $elm$core$String$concat(
		A2($elm$core$List$map, $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$toCssClass, classes));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$Type$toCss = function (_v0) {
	var requiredStyles = _v0.requiredStyles;
	var customStyles = _v0.customStyles;
	return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$toCss(
		_Utils_ap(
			_List_fromArray(
				[
					_Utils_Tuple2('.elmsh', requiredStyles._default),
					_Utils_Tuple2('.elmsh-hl', requiredStyles.highlight),
					_Utils_Tuple2('.elmsh-add', requiredStyles.addition),
					_Utils_Tuple2('.elmsh-del', requiredStyles.deletion),
					_Utils_Tuple2('.elmsh-comm', requiredStyles.comment),
					_Utils_Tuple2('.elmsh1', requiredStyles.style1),
					_Utils_Tuple2('.elmsh2', requiredStyles.style2),
					_Utils_Tuple2('.elmsh3', requiredStyles.style3),
					_Utils_Tuple2('.elmsh4', requiredStyles.style4),
					_Utils_Tuple2('.elmsh5', requiredStyles.style5),
					_Utils_Tuple2('.elmsh6', requiredStyles.style6),
					_Utils_Tuple2('.elmsh7', requiredStyles.style7)
				]),
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$mapFirst($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$Type$syntaxesToSelectors),
				customStyles)));
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$GitHub$css = $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$Type$toCss($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$GitHub$theme);
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$gitHub = $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$GitHub$css;
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$gitHub = $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$gitHub);
var $author$project$Main$isLight = function (model) {
	var _v0 = A2($axelerator$fancy_forms$FancyForms$Form$extract, $author$project$Main$mainArgsForm, model.mainArgs).colorScheme;
	if (_v0.$ === 'Light') {
		return true;
	} else {
		return false;
	}
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Rgba = F4(
	function (a, b, c, d) {
		return {$: 'Rgba', a: a, b: b, c: c, d: d};
	});
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$italic = function (style) {
	return _Utils_update(
		style,
		{isItalic: true});
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$OneDark$requiredStyles = {
	addition: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$backgroundColor(
		A4($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Rgba, 40, 124, 82, 0.4)),
	comment: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$italic(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
			$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#5c6370'))),
	_default: A2(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$noEmphasis,
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#abb2bf'),
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#282c34')),
	deletion: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$backgroundColor(
		A4($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Rgba, 136, 64, 67, 0.4)),
	highlight: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$backgroundColor(
		A4($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Rgba, 229, 231, 235, 0.1)),
	style1: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#d19a66')),
	style2: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#98c379')),
	style3: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#c678dd')),
	style4: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#c678dd')),
	style5: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#61aeee')),
	style6: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#d19a66')),
	style7: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		$pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#abb2bf'))
};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$OneDark$theme = {customStyles: _List_Nil, requiredStyles: $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$OneDark$requiredStyles};
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$OneDark$css = $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$Type$toCss($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$OneDark$theme);
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$oneDark = $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$OneDark$css;
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$oneDark = $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme($pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$oneDark);
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$useTheme = function (_v0) {
	var theme = _v0.a;
	return A3(
		$elm$html$Html$node,
		'style',
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(theme)
			]));
};
var $author$project$Main$codeStyle = function (model) {
	return $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$useTheme(
		$author$project$Main$isLight(model) ? $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$gitHub : $pablohirafuji$elm_syntax_highlight$SyntaxHighlight$oneDark);
};
var $author$project$Main$containerClass = function (model) {
	var _v0 = A2($axelerator$fancy_forms$FancyForms$Form$extract, $author$project$Main$mainArgsForm, model.mainArgs).layout;
	if (_v0.$ === 'Centered') {
		return $elm$html$Html$Attributes$class('container');
	} else {
		return $elm$html$Html$Attributes$class('container-fluid');
	}
};
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$polygon = $elm$svg$Svg$trustedNode('polygon');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $author$project$Main$elmSvg = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$height('24'),
			$elm$svg$Svg$Attributes$viewBox('0 0 600 600')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$polygon,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$fill('currentColor'),
					$elm$svg$Svg$Attributes$points('0,20 280,300 0,580')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$polygon,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$fill('currentColor'),
					$elm$svg$Svg$Attributes$points('20,600 300,320 580,600')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$polygon,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$fill('currentColor'),
					$elm$svg$Svg$Attributes$points('320,0 600,0 600,280')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$polygon,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$fill('currentColor'),
					$elm$svg$Svg$Attributes$points('20,0 280,0 402,122 142,122')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$polygon,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$fill('currentColor'),
					$elm$svg$Svg$Attributes$points('170,150 430,150 300,280')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$polygon,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$fill('currentColor'),
					$elm$svg$Svg$Attributes$points('320,300 450,170 580,300 450,430')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$polygon,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$fill('currentColor'),
					$elm$svg$Svg$Attributes$points('470,450 600,320 600,580')
				]),
			_List_Nil)
		]));
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $author$project$Main$githubSvg = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$height('24'),
			$elm$svg$Svg$Attributes$width('24.25'),
			$elm$svg$Svg$Attributes$viewBox('0 0 496 512'),
			$elm$svg$Svg$Attributes$class('icon-github')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z')
				]),
			_List_Nil)
		]));
var $elm$html$Html$header = _VirtualDom_node('header');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$core$String$toLower = _String_toLower;
var $author$project$Pico$cdnUrl = function (theme) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			[
				'https://cdn.jsdelivr.net/npm/@picocss/pico@2/',
				'css/pico.',
				$elm$core$String$toLower(
				$author$project$Pico$Theme$themeName(theme)),
				'.min.css'
			]));
};
var $elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var $author$project$Pico$includeFromCDN = function (theme) {
	return A3(
		$elm$html$Html$node,
		'link',
		_List_fromArray(
			[
				$elm$html$Html$Attributes$rel('stylesheet'),
				$elm$html$Html$Attributes$href(
				$author$project$Pico$cdnUrl(theme))
			]),
		_List_Nil);
};
var $elm$html$Html$aside = _VirtualDom_node('aside');
var $author$project$Pico$contrastLink = function (attrs) {
	return A3($author$project$Pico$elemWithClass, $elm$html$Html$a, 'contrast', attrs);
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $author$project$Pico$secondaryLink = function (attrs) {
	return A3($author$project$Pico$elemWithClass, $elm$html$Html$a, 'secondary', attrs);
};
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$Main$leftNav = function (model) {
	return A2(
		$elm$html$Html$aside,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$author$project$Pico$contrastLink,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Getting started')
					])),
				A2(
				$elm$html$Html$ul,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Introduction')
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Installation')
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Usage')
									]))
							]))
					])),
				A2(
				$author$project$Pico$contrastLink,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$href('#layout')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Layout')
					])),
				A2(
				$elm$html$Html$ul,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('#containers')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Container')
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('#darkmode')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Dark mode')
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('#themes')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Themes')
									]))
							]))
					])),
				A2(
				$author$project$Pico$contrastLink,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$href('#theContent')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Content')
					])),
				A2(
				$elm$html$Html$ul,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('#typography')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Typography')
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('#buttons')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Buttons')
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('#links')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Links')
									]))
							]))
					])),
				A2(
				$elm$html$Html$span,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Forms')
					])),
				A2(
				$elm$html$Html$ul,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('#inputs')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Inputs')
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('#lists')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Lists')
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('#variants')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Variants')
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('#combo')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Combinations')
									]))
							]))
					])),
				A2(
				$elm$html$Html$span,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Components')
					])),
				A2(
				$elm$html$Html$ul,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('#accordion')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Accordion')
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('#modals')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Modal')
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('#tooltips')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Tooltip')
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('#loading')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Loading')
									]))
							]))
					]))
			]));
};
var $author$project$Pico$layoutClass = function (layout) {
	if (layout.$ === 'Centered') {
		return 'container';
	} else {
		return 'container-fluid';
	}
};
var $elm$html$Html$main_ = _VirtualDom_node('main');
var $author$project$Pico$main_ = F4(
	function (layout, colorScheme, attrs, children) {
		var themeAttribute = A2($elm$html$Html$Attributes$attribute, 'data-attribute', 'data-theme');
		var webComponent = A3(
			$elm$html$Html$node,
			'pico-class-updater',
			A2(
				$elm$core$List$cons,
				themeAttribute,
				function () {
					switch (colorScheme.$) {
						case 'Light':
							return _List_fromArray(
								[
									A2($elm$html$Html$Attributes$attribute, 'data-value', 'light')
								]);
						case 'Dark':
							return _List_fromArray(
								[
									A2($elm$html$Html$Attributes$attribute, 'data-value', 'dark')
								]);
						default:
							return _List_Nil;
					}
				}()),
			_List_Nil);
		var schemeClass = function () {
			switch (colorScheme.$) {
				case 'Light':
					return _List_fromArray(
						[
							A2($elm$html$Html$Attributes$attribute, 'data-theme', 'light')
						]);
				case 'Dark':
					return _List_fromArray(
						[
							A2($elm$html$Html$Attributes$attribute, 'data-theme', 'dark')
						]);
				default:
					return _List_Nil;
			}
		}();
		var attrs_ = $elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						$elm$html$Html$Attributes$class(
						$author$project$Pico$layoutClass(layout))
					]),
					schemeClass,
					attrs
				]));
		return A2(
			$elm$html$Html$main_,
			attrs_,
			A2($elm$core$List$cons, webComponent, children));
	});
var $author$project$Main$CloseModal = {$: 'CloseModal'};
var $author$project$Pico$aria = F2(
	function (name, value) {
		return A2($elm$html$Html$Attributes$attribute, 'aria-' + name, value);
	});
var $author$project$Main$modalExampleCode = '\ntype alias Model = { modalState : ModalState }\n\ninit = { modalState = Modal.init }\n\ntype Msg = OpenModal | ForModal Modal.Msg\n\nsubscriptions model = Modal.subscriptions\n\nupdate msg model =\n    case msg of\n        OpenModal ->\n            { model | modalState = Modal.open model.modalState }\n        ForModal msg ->\n            { model \n            | modalState = Modal.update msg model.modalState\n            }\n\nview model =\n    div []\n        [ Modal.view model.modalState [text "modal content"]\n        , button [onClick OpenModal] [text "open modal"]\n        ]\n';
var $author$project$Main$exampleModelContent = A2(
	$elm$html$Html$article,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$header,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Modal'),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($author$project$Main$CloseModal),
							A2($author$project$Pico$aria, 'label', 'Close'),
							$elm$html$Html$Attributes$rel('prev')
						]),
					_List_Nil)
				])),
			A2($author$project$Main$viewCode, true, $author$project$Main$modalExampleCode),
			A2(
			$elm$html$Html$footer,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($author$project$Main$CloseModal)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Close')
						]))
				]))
		]));
var $author$project$Main$sumbitFormContent = function (_v0) {
	var stringInput = _v0.stringInput;
	var integerInput = _v0.integerInput;
	var floatInput = _v0.floatInput;
	var dateInput = _v0.dateInput;
	return A2(
		$elm$html$Html$article,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$header,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Form submission'),
						A2(
						$elm$html$Html$footer,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Main$CloseModal),
										A2($author$project$Pico$aria, 'label', 'Close'),
										$elm$html$Html$Attributes$rel('prev')
									]),
								_List_Nil)
							]))
					])),
				A2(
				$author$project$Main$viewCode,
				false,
				A2(
					$elm$core$String$join,
					'\n',
					_List_fromArray(
						[
							'extracted : ExampleForm',
							'extracted = { stringInput = \"' + (stringInput + '\"'),
							'            , integerInput = ' + $elm$core$String$fromInt(integerInput),
							'            , floatInput = ' + $elm$core$String$fromFloat(floatInput),
							'            , dateInput = ' + $justinmimbs$date$Date$toIsoString(dateInput),
							'            }'
						])))
			]));
};
var $author$project$Main$modalContent = function (modal) {
	var _v0 = modal.content;
	switch (_v0.$) {
		case 'NothingYet':
			return _List_fromArray(
				[
					$elm$html$Html$text('')
				]);
		case 'ModalExample':
			return _List_fromArray(
				[$author$project$Main$exampleModelContent]);
		default:
			var inputs = _v0.a;
			return _List_fromArray(
				[
					$author$project$Main$sumbitFormContent(inputs)
				]);
	}
};
var $author$project$Pico$mkColumn = function (columns) {
	return A2(
		$elm$html$Html$ul,
		_List_Nil,
		A2(
			$elm$core$List$map,
			function (c) {
				return A2($elm$html$Html$li, _List_Nil, c);
			},
			columns));
};
var $elm$html$Html$nav = _VirtualDom_node('nav');
var $author$project$Pico$nav = function (columns) {
	return A2(
		$elm$html$Html$nav,
		_List_Nil,
		A2($elm$core$List$map, $author$project$Pico$mkColumn, columns));
};
var $elm$svg$Svg$Attributes$stopColor = _VirtualDom_attribute('stop-color');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$Attributes$style = _VirtualDom_attribute('style');
var $elm$svg$Svg$Attributes$version = _VirtualDom_attribute('version');
var $author$project$Main$picomponentsSvg = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$height('32'),
			$elm$svg$Svg$Attributes$version('1.1'),
			$elm$svg$Svg$Attributes$viewBox('0 0 27.476 4.1656')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('m3.0624 0.10375c-0.050667 0-0.099579 0.009973-0.14625 0.029973-0.043333 0.018667-0.082123 0.045433-0.11679 0.080099-0.033333 0.033333-0.060099 0.073224-0.080099 0.11989-0.019333 0.044-0.028939 0.091445-0.028939 0.14211l-0.00103 0.001034c0 0.050667 0.00997 0.099579 0.029973 0.14625 0.02 0.043333 0.046766 0.082123 0.080099 0.11679 0.034667 0.033333 0.073456 0.060099 0.11679 0.080099 0.046667 0.02 0.095579 0.029973 0.14625 0.029973 0.051333 0 0.098628-0.009973 0.14263-0.029973 0.046667-0.02 0.086557-0.046766 0.11989-0.080099 0.034667-0.034667 0.061433-0.073456 0.080099-0.11679 0.02-0.046667 0.029973-0.095579 0.029973-0.14625 0-0.051333-0.00997-0.099145-0.029973-0.14315-0.01867-0.046667-0.045436-0.086558-0.080103-0.11989-0.033333-0.034667-0.073224-0.061433-0.11989-0.080099-0.044-0.02-0.091295-0.029973-0.14263-0.029973zm3.6277 1.0232c-0.16333 0-0.31454 0.025298-0.45321 0.075965-0.13667 0.051333-0.25502 0.12188-0.35502 0.21188-0.099333 0.088-0.17655 0.19323-0.23255 0.31523-0.056 0.11867-0.084233 0.24773-0.084233 0.38706 0 0.15333 0.028233 0.29295 0.084233 0.41962 0.056 0.124 0.13263 0.23143 0.22996 0.32143 0.099333 0.09 0.21732 0.15907 0.35399 0.20774 0.13667 0.048667 0.28531 0.072864 0.44597 0.072864 0.16267 0 0.31336-0.024198 0.45269-0.072864 0.14067-0.048667 0.26122-0.11679 0.36122-0.20412 0.1-0.09 0.1781-0.19545 0.2341-0.31678 0.058667-0.12467 0.087851-0.26165 0.087851-0.41031s-0.028233-0.2833-0.084233-0.40463c-0.056-0.12467-0.13505-0.231-0.23771-0.31833-0.1-0.09-0.21945-0.15944-0.35812-0.20877-0.13667-0.050667-0.28494-0.075965-0.44494-0.075965zm-5.2788 0.010852c-0.24333 0-0.4359 0.088803-0.57723 0.26614v-0.20826h-0.66095v2.8081h0.66095v-1.1167c0.156 0.16133 0.35098 0.24185 0.58498 0.24185 0.134 0 0.25807-0.025665 0.37207-0.076999 0.11467-0.051333 0.21344-0.12188 0.29611-0.21188 0.084667-0.09 0.15022-0.19486 0.19689-0.3142 0.048667-0.11933 0.072864-0.24876 0.072864-0.38809 0-0.13867-0.024198-0.26831-0.072864-0.38964-0.046-0.122-0.11156-0.22833-0.19689-0.31833-0.085333-0.09-0.18668-0.16054-0.30334-0.21188-0.11467-0.053333-0.23859-0.080099-0.37259-0.080099zm3.405 0c-0.146 0-0.28408 0.025299-0.41342 0.075965-0.12667 0.049333-0.23563 0.11929-0.32763 0.20929-0.093333 0.087333-0.16681 0.19278-0.22014 0.31678-0.053333 0.122-0.080099 0.25751-0.080099 0.40618s0.028233 0.28366 0.084233 0.40566c0.055333 0.11867 0.12939 0.22206 0.22273 0.31006 0.094667 0.084667 0.20305 0.15074 0.32505 0.19741 0.124 0.046667 0.25416 0.069764 0.39016 0.069764 0.14667 0 0.30139-0.035271 0.46406-0.10594v-0.56328c-0.10667 0.085333-0.22224 0.12816-0.34624 0.12816-0.064 0-0.12384-0.011073-0.17984-0.033073s-0.10491-0.052285-0.14625-0.090951c-0.038667-0.042-0.069902-0.089812-0.094569-0.14314-0.022-0.056-0.033073-0.11657-0.033073-0.1819 0-0.068667 0.011073-0.1296 0.033073-0.18294 0.024667-0.056 0.05737-0.10344 0.098703-0.14211 0.041333-0.042 0.088778-0.073752 0.14211-0.095085 0.056-0.022 0.11547-0.032556 0.1788-0.032556 0.11733 0 0.23327 0.03879 0.34727 0.11679v-0.56276c-0.13667-0.068-0.28494-0.10232-0.44494-0.10232zm-2.0831 0.057878v1.8743h0.66198v-1.8743zm3.9569 0.50437c0.058 0 0.11248 0.01144 0.16382 0.034107 0.053333 0.021333 0.099094 0.051251 0.13643 0.089918 0.038667 0.039333 0.068585 0.085678 0.089918 0.13901 0.024667 0.051333 0.036691 0.10618 0.036691 0.16485 0 0.060667-0.012024 0.11772-0.036691 0.17105-0.021333 0.051333-0.051618 0.096577-0.090951 0.13591-0.036667 0.038667-0.08206 0.068951-0.13539 0.090951-0.051333 0.022-0.10582 0.033073-0.16382 0.033073-0.058667 0-0.11462-0.01144-0.16795-0.034107-0.051333-0.021333-0.096577-0.051251-0.13591-0.089918-0.036-0.039333-0.066285-0.084577-0.090951-0.13591-0.021333-0.053333-0.03204-0.11185-0.03204-0.17518h-0.00103c0-0.058667 0.01144-0.11315 0.034107-0.16382 0.024-0.051333 0.053918-0.096577 0.089918-0.13591 0.039333-0.038667 0.084577-0.068951 0.13591-0.090951 0.053333-0.022 0.10928-0.033073 0.16795-0.033073zm-5.4498 0.00775c0.060667 0 0.11662 0.012541 0.16795 0.037207 0.053333 0.021333 0.099311 0.051251 0.13798 0.089918 0.038667 0.039333 0.067851 0.085678 0.087851 0.13901 0.022 0.051333 0.033073 0.10618 0.033073 0.16485 0 0.056-0.012541 0.10953-0.037207 0.1602-0.021333 0.051333-0.051618 0.096577-0.090951 0.13591-0.036667 0.038667-0.080076 0.068951-0.13074 0.090951-0.051333 0.022-0.10618 0.033073-0.16485 0.033073-0.058667 0-0.11513-0.01144-0.16847-0.034107-0.050667-0.024-0.095543-0.053918-0.13488-0.089918-0.038667-0.039333-0.068951-0.084577-0.090951-0.13591-0.022-0.050667-0.033073-0.10567-0.033073-0.16433 0-0.058667 0.011073-0.11315 0.033073-0.16382 0.024-0.054 0.054285-0.10034 0.090951-0.13901 0.039333-0.039333 0.08421-0.069985 0.13488-0.091985 0.051333-0.021333 0.1067-0.03204 0.16537-0.03204z'),
					$elm$svg$Svg$Attributes$stopColor('#000000'),
					$elm$svg$Svg$Attributes$style('-inkscape-stroke:none;font-variation-settings:normal')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('m24.293 0.63396v0.56173h-0.22014v0.55243h0.22014v1.3219h0.65991v-1.3219h0.37672v-0.55243h-0.37672v-0.56173zm-8.7964 0.493c-0.16333 0-0.31402 0.025298-0.45269 0.075965-0.13667 0.051333-0.25502 0.12188-0.35502 0.21188-0.09933 0.088-0.17706 0.19323-0.23306 0.31523-0.056 0.11867-0.08423 0.24773-0.08423 0.38706 0 0.15333 0.02823 0.29295 0.08423 0.41962 0.056 0.124 0.13263 0.23143 0.22996 0.32143 0.09933 0.09 0.21732 0.15907 0.35399 0.20774 0.13667 0.048667 0.28531 0.072864 0.44597 0.072864 0.16267 0 0.31387-0.024198 0.45321-0.072864 0.14067-0.048667 0.2607-0.11679 0.3607-0.20412 0.1-0.09 0.1781-0.19545 0.2341-0.31678 0.05867-0.12467 0.08785-0.26165 0.08785-0.41031s-0.02772-0.2833-0.08372-0.40463c-0.056-0.12467-0.13556-0.231-0.23823-0.31833-0.1-0.09-0.21894-0.15944-0.3576-0.20877-0.13667-0.050667-0.28546-0.075965-0.44546-0.075965zm4.8985 0c-0.16067 0-0.30579 0.024198-0.43512 0.072864-0.12667 0.046-0.23505 0.11302-0.32505 0.20102-0.09 0.087333-0.15959 0.19425-0.20826 0.32091-0.04867 0.124-0.07287 0.26413-0.07287 0.42013 0 0.15133 0.02567 0.28743 0.077 0.40876 0.05067 0.122 0.12231 0.22723 0.21498 0.31523 0.09533 0.087333 0.2087 0.15546 0.34003 0.20412 0.13133 0.046667 0.27645 0.069764 0.43512 0.069764 0.516 0 0.83858-0.21419 0.96791-0.64286h-0.63976c-0.07267 0.11667-0.18105 0.17518-0.32505 0.17518-0.268 0-0.40205-0.1427-0.40205-0.42737h1.3917v-0.069764c0-0.16333-0.0231-0.30955-0.06976-0.43822-0.046-0.13133-0.11266-0.24213-0.19999-0.3328-0.088-0.089333-0.19528-0.15746-0.32195-0.20412-0.12667-0.048667-0.26885-0.072864-0.42685-0.072864zm6.0638 0c-0.12667 0-0.24209 0.015693-0.34675 0.047026-0.102 0.032-0.1897 0.076877-0.26304 0.13488-0.07333 0.058667-0.12928 0.13068-0.16795 0.21601-0.03867 0.082667-0.0584 0.17646-0.0584 0.28112 0 0.144 0.04041 0.25737 0.12041 0.34003 0.08267 0.08 0.22632 0.14094 0.43098 0.18294 0.06067 0.012 0.10906 0.024174 0.14573 0.036174 0.03867 0.01 0.06785 0.022024 0.08785 0.036691 0.01933 0.012 0.03187 0.026225 0.03721 0.042892 0.0067 0.014667 0.0098 0.034762 0.0098 0.059429 0 0.041333-0.01921 0.075137-0.05788 0.1018-0.03933 0.026667-0.0892 0.039791-0.14986 0.039791-0.166 0-0.3414-0.062988-0.52607-0.18965l-0.24185 0.46768c0.24667 0.144 0.4965 0.21601 0.74983 0.21601 0.13133 0 0.25174-0.01701 0.36174-0.051677 0.10933-0.031333 0.20276-0.076727 0.28009-0.13539 0.078-0.060667 0.13894-0.13473 0.18294-0.22273 0.044-0.087333 0.06615-0.18574 0.06615-0.29508 0-0.14667-0.04488-0.26612-0.13488-0.35812-0.09-0.095333-0.22646-0.16126-0.4098-0.19792l-0.1602-0.036174c-0.03933-0.01-0.06998-0.020557-0.09199-0.032556-0.01933-0.012-0.03297-0.024541-0.04031-0.037207-0.0047-0.014667-0.0067-0.032928-0.0067-0.054261 0-0.042 0.01811-0.074703 0.05478-0.098703 0.03867-0.024667 0.08905-0.037207 0.15038-0.037207 0.11667 0 0.2356 0.031752 0.3576 0.095085l0.22222-0.43099c-0.19467-0.08-0.39537-0.11989-0.60204-0.11989zm-13.337 0.010852c-0.24333 0-0.4359 0.088803-0.57723 0.26614v-0.20826h-0.66095v2.8081h0.66095v-1.1167c0.156 0.16133 0.35098 0.24185 0.58498 0.24185 0.13333 0 0.25741-0.025665 0.37207-0.076999 0.11467-0.051333 0.21344-0.12188 0.29611-0.21188 0.08467-0.09 0.15022-0.19486 0.19689-0.3142 0.04867-0.11933 0.07287-0.24876 0.07287-0.38809 0-0.13867-0.0242-0.26831-0.07287-0.38964-0.046-0.122-0.11156-0.22833-0.19689-0.31833-0.08533-0.09-0.18668-0.16054-0.30334-0.21188-0.11467-0.053333-0.23859-0.080099-0.37259-0.080099zm5.1398 0.018087c-0.12467 0-0.23305 0.019212-0.32505 0.057878-0.09267 0.036667-0.18426 0.11014-0.27492 0.22014v-0.23823h-0.65991v1.8743h0.66095v-1.001c0-0.124 0.02882-0.21926 0.08682-0.28526 0.06133-0.068 0.14794-0.1018 0.25994-0.1018 0.04133 0 0.08064 0.00609 0.11731 0.018087 0.036 0.012667 0.06834 0.033346 0.09767 0.062012 0.034 0.034667 0.05761 0.081011 0.07028 0.13901 0.01467 0.056 0.02171 0.13006 0.02171 0.22273v0.9462h0.66146v-1.1912c0-0.099333-0.01-0.18814-0.02997-0.26614-0.01933-0.078-0.05607-0.14854-0.11007-0.21188-0.06533-0.078-0.14563-0.13747-0.2403-0.1788-0.09267-0.044-0.20457-0.066146-0.3359-0.066146zm4.7889 0c-0.12467 0-0.23305 0.019212-0.32505 0.057878-0.09267 0.036667-0.18389 0.11014-0.27389 0.22014v-0.23823h-0.66198v1.8743h0.66198v-1.001c0-0.124 0.02882-0.21926 0.08682-0.28526 0.06133-0.068 0.14845-0.1018 0.26045-0.1018 0.04133 0 0.07976 0.00609 0.11576 0.018087 0.03667 0.012667 0.06989 0.033346 0.09922 0.062012 0.034 0.034667 0.0571 0.081011 0.06976 0.13901 0.014 0.056 0.02119 0.13006 0.02119 0.22273v0.9462h0.66198v-1.1912c0-0.099333-0.01-0.18814-0.02997-0.26614-0.01933-0.078-0.05607-0.14854-0.11007-0.21188-0.06533-0.078-0.14563-0.13747-0.2403-0.1788-0.09267-0.044-0.20457-0.066146-0.3359-0.066146zm-12.318 0.00723c-0.27467 0-0.48644 0.11799-0.63511 0.35399-0.146-0.23333-0.35814-0.35036-0.63614-0.35036-0.224 0-0.42602 0.086752-0.60669 0.25942v-0.23048h-0.66043v1.8743h0.66095v-0.92502c0-0.099333 0.00755-0.17963 0.022221-0.2403 0.016667-0.064 0.038446-0.1124 0.065113-0.14573 0.029333-0.036667 0.062036-0.060864 0.098703-0.072864 0.036667-0.012667 0.075973-0.01912 0.11731-0.01912 0.048667 0 0.091492 0.00704 0.12816 0.021704 0.036667 0.012667 0.065484 0.037381 0.086817 0.073381 0.024667 0.036667 0.042778 0.08653 0.054778 0.14986 0.012667 0.060667 0.01912 0.13876 0.01912 0.2341v0.92398h0.66095v-0.92398c0-0.30933 0.10596-0.46406 0.3173-0.46406 0.03933 0 0.07555 0.00609 0.10956 0.018087 0.034 0.012667 0.0637 0.035764 0.08837 0.069764 0.02667 0.034 0.04588 0.081445 0.05788 0.14211 0.01533 0.060667 0.02274 0.13876 0.02274 0.2341v0.92398h0.66043v-1.216c0-0.12467-0.01716-0.231-0.05116-0.31833-0.03133-0.088-0.07511-0.15854-0.13178-0.21188-0.05533-0.056-0.12199-0.096257-0.19999-0.12092-0.078-0.026667-0.16108-0.039791-0.24908-0.039791zm9.6796 0.39068c0.09733 0 0.18042 0.028233 0.24908 0.084233 0.068 0.056 0.11339 0.13006 0.13539 0.22273h-0.75603c0.01667-0.098 0.05656-0.17353 0.11989-0.22686 0.066-0.053333 0.14967-0.080099 0.25167-0.080099zm-4.916 0.14625c0.058 0 0.113 0.01144 0.16433 0.034107 0.05333 0.021333 0.09858 0.051251 0.13591 0.089918 0.03867 0.039333 0.06858 0.085678 0.08992 0.13901 0.02467 0.051333 0.03721 0.10618 0.03721 0.16485 0 0.060667-0.01254 0.11772-0.03721 0.17105-0.02133 0.051333-0.05162 0.096577-0.09095 0.13591-0.03667 0.038667-0.08154 0.068951-0.13488 0.090951-0.05133 0.022-0.10633 0.033073-0.16433 0.033073-0.05867 0-0.11462-0.01144-0.16795-0.034107-0.05133-0.021333-0.09658-0.051251-0.13591-0.089918-0.036-0.039333-0.06629-0.084577-0.09095-0.13591-0.022-0.053333-0.03307-0.11185-0.03307-0.17518 0-0.058667 0.01144-0.11315 0.03411-0.16382 0.024-0.051333 0.05392-0.096577 0.08992-0.13591 0.03933-0.038667 0.08458-0.068951 0.13591-0.090951 0.05333-0.022 0.10928-0.033073 0.16795-0.033073zm-2.5456 0.00775c0.06067 0 0.11662 0.012541 0.16795 0.037207 0.05333 0.021333 0.09931 0.051251 0.13798 0.089918 0.03867 0.039333 0.06785 0.085678 0.08785 0.13901 0.022 0.051333 0.03307 0.10618 0.03307 0.16485 0 0.056-0.01254 0.10953-0.03721 0.1602-0.02133 0.051333-0.05162 0.096577-0.09095 0.13591-0.03667 0.038667-0.08008 0.068951-0.13074 0.090951-0.05133 0.022-0.10618 0.033073-0.16485 0.033073-0.05867 0-0.11513-0.01144-0.16847-0.034107-0.05133-0.024-0.09621-0.053918-0.13488-0.089918-0.03867-0.039333-0.06895-0.084577-0.09095-0.13591-0.022-0.050667-0.03307-0.10567-0.03307-0.16433 0-0.058667 0.01107-0.11315 0.03307-0.16382 0.024-0.054 0.05428-0.10034 0.09095-0.13901 0.03867-0.039333 0.08354-0.069985 0.13488-0.091985 0.05133-0.021333 0.1067-0.03204 0.16537-0.03204z'),
					$elm$svg$Svg$Attributes$fill('none'),
					$elm$svg$Svg$Attributes$stopColor('#000000'),
					$elm$svg$Svg$Attributes$stroke('var(--pico-primary)'),
					$elm$svg$Svg$Attributes$strokeWidth('.1')
				]),
			_List_Nil)
		]));
var $author$project$Pico$Modal$styles = '\n:root {\n  --pico-scrollbar-width: 0px;\n}\n\n#modal {\n  display: flex;\n  z-index: 999;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  align-items: center;\n  justify-content: center;\n  width: inherit;\n  min-width: 100%;\n  height: inherit;\n  min-height: 100%;\n  padding: 0;\n  border: 0;\n  -webkit-backdrop-filter: var(--pico-modal-overlay-backdrop-filter);\n  backdrop-filter: var(--pico-modal-overlay-backdrop-filter);\n  background-color: var(--pico-modal-overlay-background-color);\n  color: var(--pico-color);\n}\n#modal article {\n  width: 100%;\n  max-height: calc(100vh - var(--pico-spacing) * 2);\n  margin: var(--pico-spacing);\n  overflow: auto;\n}\n@media (min-width: 576px) {\n  #modal article {\n    max-width: 510px;\n  }\n}\n@media (min-width: 768px) {\n  #modal article {\n    max-width: 700px;\n  }\n}\n#modal article > header > * {\n  margin-bottom: 0;\n}\n#modal article > header .close, #modal article > header :is(a, button)[rel=prev] {\n  margin: 0;\n  margin-left: var(--pico-spacing);\n  padding: 0;\n  float: right;\n}\n#modal article > footer {\n  text-align: right;\n}\n#modal article > footer button,\n#modal article > footer [role=button] {\n  margin-bottom: 0;\n}\n#modal article > footer button:not(:first-of-type),\n#modal article > footer [role=button]:not(:first-of-type) {\n  margin-left: calc(var(--pico-spacing) * 0.5);\n}\n#modal article .close, #modal article :is(a, button)[rel=prev] {\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  margin-top: calc(var(--pico-spacing) * -1);\n  margin-bottom: var(--pico-spacing);\n  margin-left: auto;\n  border: none;\n  background-image: var(--pico-icon-close);\n  background-position: center;\n  background-size: auto 1rem;\n  background-repeat: no-repeat;\n  background-color: transparent;\n  opacity: 0.5;\n  transition: opacity var(--pico-transition);\n}\n#modal article .close:is([aria-current]:not([aria-current=false]), :hover, :active, :focus), #modal article :is(a, button)[rel=prev]:is([aria-current]:not([aria-current=false]), :hover, :active, :focus) {\n  opacity: 1;\n}\n#modal:not([open]), #modal[open=false] {\n  display: none;\n}\n\n.modal-is-open {\n  padding-right: var(--pico-scrollbar-width, 0px);\n  overflow: hidden;\n  pointer-events: none;\n  touch-action: none;\n}\n.modal-is-open #modal {\n  pointer-events: auto;\n  touch-action: auto;\n}\n\n:where(.modal-is-opening, .modal-is-closing) #modal,\n:where(.modal-is-opening, .modal-is-closing) #modal > article {\n  animation-duration: 0.2s;\n  animation-timing-function: ease-in-out;\n  animation-fill-mode: both;\n}\n:where(.modal-is-opening, .modal-is-closing) #modal {\n  animation-duration: 0.8s;\n  animation-name: modal-overlay;\n}\n:where(.modal-is-opening, .modal-is-closing) #modal > article {\n  animation-delay: 0.2s;\n  animation-name: modal;\n}\n\n.modal-is-closing #modal,\n.modal-is-closing #modal > article {\n  animation-delay: 0s;\n  animation-direction: reverse;\n}\n\n@keyframes modal-overlay {\n  from {\n    -webkit-backdrop-filter: none;\n    backdrop-filter: none;\n    background-color: transparent;\n  }\n}\n@keyframes modal {\n  from {\n    transform: translateY(-100%);\n    opacity: 0;\n  }\n}\n';
var $author$project$Pico$Modal$view = F2(
	function (state, content) {
		var css = A3(
			$elm$html$Html$node,
			'style',
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text($author$project$Pico$Modal$styles)
				]));
		var classAttribute = A2($elm$html$Html$Attributes$attribute, 'data-attribute', 'class');
		var webComponent = A3(
			$elm$html$Html$node,
			'pico-class-updater',
			A2(
				$elm$core$List$cons,
				classAttribute,
				function () {
					switch (state.$) {
						case 'IsOpening':
							return _List_fromArray(
								[
									A2($elm$html$Html$Attributes$attribute, 'data-value', 'modal-is-opening modal-is-open')
								]);
						case 'IsOpen':
							return _List_fromArray(
								[
									A2($elm$html$Html$Attributes$attribute, 'data-value', 'modal-is-open')
								]);
						case 'IsClosing':
							return _List_fromArray(
								[
									A2($elm$html$Html$Attributes$attribute, 'data-value', 'modal-is-open modal-is-closing')
								]);
						default:
							return _List_fromArray(
								[
									A2($elm$html$Html$Attributes$attribute, 'data-value', '')
								]);
					}
				}()),
			_List_Nil);
		var attrs = function () {
			if (state.$ === 'IsClosed') {
				return _List_fromArray(
					[
						$elm$html$Html$Attributes$id('modal')
					]);
			} else {
				return _List_fromArray(
					[
						$elm$html$Html$Attributes$id('modal'),
						A2($elm$html$Html$Attributes$attribute, 'open', '')
					]);
			}
		}();
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					css,
					webComponent,
					A2($elm$html$Html$div, attrs, content)
				]));
	});
var $elm$html$Html$details = _VirtualDom_node('details');
var $elm$html$Html$summary = _VirtualDom_node('summary');
var $author$project$Pico$accordion = F3(
	function (attrs, sum, content) {
		return A2(
			$elm$html$Html$details,
			_List_Nil,
			A2(
				$elm$core$List$cons,
				A2($elm$html$Html$summary, attrs, sum),
				content));
	});
var $author$project$Pico$asButton = $author$project$Pico$role('button');
var $elm$html$Html$hr = _VirtualDom_node('hr');
var $author$project$Pico$hr = A2($elm$html$Html$hr, _List_Nil, _List_Nil);
var $elm$html$Html$section = _VirtualDom_node('section');
var $author$project$Main$viewAccordions = A2(
	$elm$html$Html$section,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h3,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Accordion')
				])),
			$author$project$Main$markdown('\nAccordions are sections of content that can be toggled by the user.\nThey\'re implemented in Pico as pure HTML, without JavaScript/Elm/state.\n'),
			A3(
			$author$project$Pico$accordion,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Basic accordion')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Lorem ipsum ..'),
					A2($author$project$Main$viewCode, false, 'accordion [] \n    [text "Basic accordion"] \n    [text "Lorem ipsum .."\n')
				])),
			$author$project$Pico$hr,
			A3(
			$author$project$Pico$accordion,
			_List_fromArray(
				[$author$project$Pico$asButton]),
			_List_fromArray(
				[
					$elm$html$Html$text('Button variant')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Lorem ipsum ..'),
					A2($author$project$Main$viewCode, false, 'accordion [asButton] \n    [text "Basic accordion"] \n    [text "Lorem ipsum .."\n')
				]))
		]));
var $author$project$Main$ToggleOutline = {$: 'ToggleOutline'};
var $author$project$Pico$contrastButton = function (attrs) {
	return A3($author$project$Pico$elemWithClass, $elm$html$Html$button, 'contrast', attrs);
};
var $author$project$Pico$inlineText = F2(
	function (elem, s) {
		return A2(
			elem,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text(s)
				]));
	});
var $elm$html$Html$mark = _VirtualDom_node('mark');
var $author$project$Pico$mark = $author$project$Pico$inlineText($elm$html$Html$mark);
var $elm$html$Html$p = _VirtualDom_node('p');
var $author$project$Pico$primaryButton = A2($author$project$Pico$elemWithClass, $elm$html$Html$button, 'primary');
var $author$project$Pico$switch = F2(
	function (attrs, lbl) {
		return A2(
			$elm$html$Html$label,
			_List_Nil,
			A2(
				$elm$core$List$cons,
				A2(
					$elm$html$Html$input,
					A2(
						$elm$core$List$cons,
						$author$project$Pico$role('switch'),
						A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$type_('checkbox'),
							attrs)),
					_List_Nil),
				lbl));
	});
var $elm$html$Html$td = _VirtualDom_node('td');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $author$project$Pico$mkTr = function (cells) {
	return A2(
		$elm$html$Html$tr,
		_List_Nil,
		A2(
			$elm$core$List$map,
			function (c) {
				return A2($elm$html$Html$td, _List_Nil, c);
			},
			cells));
};
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$tbody = _VirtualDom_node('tbody');
var $elm$html$Html$th = _VirtualDom_node('th');
var $elm$html$Html$thead = _VirtualDom_node('thead');
var $author$project$Pico$table = F3(
	function (attrs, header, rows) {
		return A2(
			$elm$html$Html$table,
			attrs,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$thead,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$tr,
							_List_Nil,
							A2(
								$elm$core$List$map,
								function (h) {
									return A2($elm$html$Html$th, _List_Nil, h);
								},
								header))
						])),
					A2(
					$elm$html$Html$tbody,
					_List_Nil,
					A2($elm$core$List$map, $author$project$Pico$mkTr, rows))
				]));
	});
var $author$project$Main$viewButtons = function (_v0) {
	var buttonOutline = _v0.buttonOutline;
	var _v1 = buttonOutline ? _Utils_Tuple2(
		_List_fromArray(
			[$author$project$Pico$outline]),
		'[ outline ] ') : _Utils_Tuple2(_List_Nil, '[] ');
	var buttonAttrs = _v1.a;
	var outlineTxt = _v1.b;
	return A2(
		$elm$html$Html$section,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h3,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Buttons')
					])),
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Buttons come in three styles:'),
						$author$project$Pico$mark('primary'),
						$elm$html$Html$text(', '),
						$author$project$Pico$mark('secondary'),
						$elm$html$Html$text(' and '),
						$author$project$Pico$mark('contrast')
					])),
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Optionally each of them can be rendered in an alternative outline style:'),
						A2(
						$author$project$Pico$switch,
						_List_fromArray(
							[
								$elm$html$Html$Events$onInput(
								function (_v2) {
									return $author$project$Main$ToggleOutline;
								})
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Outline')
							]))
					])),
				A3(
				$author$project$Pico$table,
				_List_Nil,
				_List_Nil,
				_List_fromArray(
					[
						_List_fromArray(
						[
							_List_fromArray(
							[
								A2(
								$author$project$Pico$primaryButton,
								buttonAttrs,
								_List_fromArray(
									[
										$elm$html$Html$text('Primary')
									]))
							]),
							_List_fromArray(
							[
								A2(
								$author$project$Main$viewCode,
								false,
								A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										['primaryButton', outlineTxt, '[ text \"Primary\" ]'])))
							])
						]),
						_List_fromArray(
						[
							_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryButton,
								buttonAttrs,
								_List_fromArray(
									[
										$elm$html$Html$text('Secondary')
									]))
							]),
							_List_fromArray(
							[
								A2(
								$author$project$Main$viewCode,
								false,
								A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										['secondaryButton ', outlineTxt, '[ text \"Secondary\" ]'])))
							])
						]),
						_List_fromArray(
						[
							_List_fromArray(
							[
								A2(
								$author$project$Pico$contrastButton,
								buttonAttrs,
								_List_fromArray(
									[
										$elm$html$Html$text('Contrast')
									]))
							]),
							_List_fromArray(
							[
								A2(
								$author$project$Main$viewCode,
								false,
								A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										['contrastButton ', outlineTxt, '[ text \"Contrast\" ]'])))
							])
						])
					]))
			]));
};
var $author$project$Main$ComboForm = {$: 'ComboForm'};
var $author$project$Main$ForForm = F2(
	function (a, b) {
		return {$: 'ForForm', a: a, b: b};
	});
var $author$project$Main$combinedFormCodeStr = 'combinedForm : Form (List Contact) MyError combinedForm =\n    Form.form\n        (\\_ html -> html) -- no custom errors to display\n        alwaysValid -- any contact is valid\n        "variant-example"\n        (\\contact ->\n            { view = \\formState _ -> contact.view formState\n            , combine = \\formState -> contact.value formState\n            }\n        )\n        |> listField\n            contactsWithAddButton\n            contactWithRemoveButton\n            (Email "")\n            identity\n            (Form.toWidget variantForm)\n\ncontactsWithAddButton addMsg items =\n    [ div [] <|\n        items\n            ++ [ button [ onClick addMsg ] [ text "Add contact" ] ]\n    ]\ncontactWithRemoveButton removeMsg input =\n    [ article [] <|\n        input\n            ++ [ secondaryButton [ onClick removeMsg ] [ text "Remove" ] ]\n    ]';
var $axelerator$fancy_forms$FancyForms$Form$render = F3(
	function (toMsg, form_, formState) {
		return A2(
			$elm$core$List$map,
			$elm$html$Html$map(toMsg),
			A2(
				form_.fn.view,
				formState,
				A3(
					$axelerator$fancy_forms$FancyForms$Form$addInvalidIfInconsistent,
					form_,
					formState,
					form_.validator(
						form_.fn.combine(formState)))));
	});
var $author$project$Main$viewCombo = function (model) {
	return A2(
		$elm$html$Html$section,
		_List_Nil,
		$elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						A2(
						$elm$html$Html$h3,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Combinations')
							]))
					]),
					_List_fromArray(
					[
						$author$project$Main$markdown('Consider this example ')
					]),
					_List_fromArray(
					[
						A3(
						$author$project$Pico$accordion,
						_List_fromArray(
							[
								$author$project$Pico$asButton,
								$elm$html$Html$Attributes$class('secondary')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('View full code')
							]),
						_List_fromArray(
							[
								A2($author$project$Main$viewCode, true, $author$project$Main$combinedFormCodeStr)
							]))
					]),
					A3(
					$axelerator$fancy_forms$FancyForms$Form$render,
					$author$project$Main$ForForm($author$project$Main$ComboForm),
					$author$project$Main$combinedForm,
					model.combinedFormState)
				])));
};
var $author$project$Main$viewContent = $author$project$Main$markdown('\n## Content\n\nPico has great styling for a lot of the most common HTML elements. And while it is pretty straightforward\nto use these in Elm we offer a few convience functions that cut down on the boilerplate. There are a few \nelements that never have content like the `<br>` element, while others nearly always contain exactly one\ntext node.\n\n');
var $author$project$Main$ExampleForm = {$: 'ExampleForm'};
var $author$project$Main$SubmitForm = {$: 'SubmitForm'};
var $author$project$Main$formCodeStr = ' type alias ExampleInputs =\n    { stringInput : String\n    , integerInput : Int\n    , floatInput : Float\n    , dateInput : Date\n    }\n\ninitExampleForm : ExampleInputs\ninitExampleForm =\n    { stringInput = ""\n    , integerInput = 0\n    , floatInput = 1.0\n    , dateInput = Date.fromOrdinalDate 2024 15\n    }\n\nexampleForm : Form ExampleInputs MyError\nexampleForm =\n    form\n        (errorView errorToString) -- defines how to render errors\n        alwaysValid -- this form doesn\'t have "form level" validations\n        "example-form"\n        (\\stringInput integerInput floatInput dateInput ->\n            { view = -- specifies how the input fields are layed out\n                \\formState _ ->\n                        [ grid "numberInputs"\n                                [ integerInput.view formState\n                                , floatInput.view formState\n                                ]\n                        , grid "" \n                            [ stringInput.view formState\n                            , dateInput.view formState\n                            ]\n                        ]\n            , combine = -- turns the input values into a single output value\n                \\formState ->\n                    { stringInput = stringInput.value formState\n                    , integerInput = integerInput.value formState\n                    , floatInput = floatInput.value formState\n                    , dateInput = dateInput.value formState\n                    }\n            }\n        ) -- finally we add the individual inputs and their validations\n        |> field .stringInput (Pico.Form.textInput "String input" |> validate [ notBlank ])\n        |> field .integerInput (Pico.Form.integerInput "Integer input" |> validate [ evenValidator ])\n        |> field .floatInput (Pico.Form.floatInput "Float input" [ step "0.1" ])\n        |> field .dateInput (Pico.Form.dateInput "Date input")\n-- example of a custom validation using a custom error type\nevenValidator : Validator Int MyError\nevenValidator i =\n    if modBy 2 i == 0 then\n        []\n    else\n        [ CustomError NotEven ]\n-- we need to supply a functino to convert errors into human readable strings\nerrorToString : Error MyError -> String\nerrorToString e =\n    case e of\n        NotValid ->\n            ""\n        MustBeGreaterThan x ->\n            "Must be greater than " ++ x\n        MustBeLesserThan x ->\n            "Must be lesser than " ++ x\n        MustNotBeBlank ->\n            "Please enter a value"\n        CustomError myError ->\n            case myError of\n                NotEven ->\n                    "Please give an even number"\n';
var $author$project$Main$viewForms = function (_v0) {
	var exampleFormState = _v0.exampleFormState;
	return A2(
		$elm$html$Html$section,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h3,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Forms')
					])),
				$author$project$Main$markdown('Providing a modern UX for forms comes with a lot of little challenges.\n[FancyForms](https://blog.axelerator.de/fancy-forms/) comes with good defaults without compromising on customization.\nWe provide helpers that produce markup so that Pico makes your forms look great!\n'),
				A3(
				$author$project$Pico$accordion,
				_List_fromArray(
					[
						$author$project$Pico$asButton,
						$elm$html$Html$Attributes$class('secondary')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('View code')
					]),
				_List_fromArray(
					[
						A2($author$project$Main$viewCode, true, $author$project$Main$formCodeStr)
					])),
				A2(
				$elm$html$Html$article,
				_List_Nil,
				_Utils_ap(
					A3(
						$axelerator$fancy_forms$FancyForms$Form$render,
						$author$project$Main$ForForm($author$project$Main$ExampleForm),
						$author$project$Main$exampleForm,
						exampleFormState),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$footer,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$author$project$Pico$primaryButton,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick($author$project$Main$SubmitForm)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Check the input value')
										])),
									A2($axelerator$fancy_forms$FancyForms$Form$isValid, $author$project$Main$exampleForm, exampleFormState) ? $elm$html$Html$text('') : $elm$html$Html$text(' The form input is not valid yet')
								]))
						])))
			]));
};
var $author$project$Main$markdownWithAnchor = F2(
	function (anchor, src) {
		return _Utils_Tuple2(
			anchor,
			$author$project$Main$markdown(src));
	});
var $author$project$Main$viewGettingStarted = _List_fromArray(
	[
		A2($author$project$Main$markdownWithAnchor, 'getting-started', '\n## Getting started\n\n**Picomponents** is an Elm package that provides a set of reusable\ncomponents using the [Pico.css](https://picocss.com/) framework.\nPico.css is a __Minimal CSS Framework for Semantic HTML__. \n\nThe goal is to make it as easy as possible to build good looking Elm applications.\n\nWe combine the the semantic beauty of [Pico.css](https://picocss.com/) with the modularity of\n[FancyForms](https://blog.axelerator.de/fancy-forms/) to provide an\neasy-to-use UI toolkit to build modern web applications.\n'),
		A2($author$project$Main$markdownWithAnchor, 'setup-started', '\n### Setup\n\nFirst you install `picomponents` like any other elm package:\n\n```\n$ elm install axelerator/picomponents\n```\n\nTo include the CSS in your HTML page you can either follow the instructions in\nthe [Pico docs](https://picocss.com/docs#install-manually) or use the `includeFromCDN` function\nin the `Pico` module.'),
		A2($author$project$Main$markdownWithAnchor, 'setup-started', '\n\n### JS interop\n\nThe _"modal"_ and the _"color scheme"_ functionality of Pico depends on attributes on the `html` element.\nThis is usually a bit tricky since Elm applications internally only have access\nto the part of the DOM that they control.\n\n`Picomponents` comes with a small webcomponent that manages the interactions with \nthe HTML element. \n\nFor those to work you need to include the webcomponent (`picomponent.js`) from the package\'s repository root.\n')
	]);
var $author$project$Main$ToggleLinksAsButtons = {$: 'ToggleLinksAsButtons'};
var $author$project$Main$asLinkExplanation = $author$project$Main$markdown('\nSometimes you need a link element to trigger a change, but you still want it to look like a button.\n\nFor this you can use the **TODO**[asButton](https://picocss.com/docs/button) attribute.\n');
var $author$project$Pico$primaryLink = A2($author$project$Pico$elemWithClass, $elm$html$Html$a, 'primary');
var $author$project$Main$viewLinks = function (_v0) {
	var linksAsButtons = _v0.linksAsButtons;
	var _v1 = linksAsButtons ? _Utils_Tuple2(
		_List_fromArray(
			[
				$author$project$Pico$asButton,
				$elm$html$Html$Attributes$href('#')
			]),
		'[ href \"#\", asButton ] ') : _Utils_Tuple2(
		_List_fromArray(
			[
				$elm$html$Html$Attributes$href('#')
			]),
		'[href \"#\"] ');
	var linkAttrs = _v1.a;
	var outlineTxt = _v1.b;
	return A2(
		$elm$html$Html$section,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h3,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Links')
					])),
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Links come in three styles:'),
						$author$project$Pico$mark('primary'),
						$elm$html$Html$text(', '),
						$author$project$Pico$mark('secondary'),
						$elm$html$Html$text(' and '),
						$author$project$Pico$mark('contrast')
					])),
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$author$project$Main$asLinkExplanation,
						A2(
						$author$project$Pico$switch,
						_List_fromArray(
							[
								$elm$html$Html$Events$onInput(
								function (_v2) {
									return $author$project$Main$ToggleLinksAsButtons;
								})
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Links as buttons')
							]))
					])),
				A3(
				$author$project$Pico$table,
				_List_Nil,
				_List_Nil,
				_List_fromArray(
					[
						_List_fromArray(
						[
							_List_fromArray(
							[
								A2(
								$author$project$Pico$primaryLink,
								linkAttrs,
								_List_fromArray(
									[
										$elm$html$Html$text('Primary')
									]))
							]),
							_List_fromArray(
							[
								A2(
								$author$project$Main$viewCode,
								false,
								A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										['primaryLink ', outlineTxt, '[ text \"Primary\" ]'])))
							])
						]),
						_List_fromArray(
						[
							_List_fromArray(
							[
								A2(
								$author$project$Pico$secondaryLink,
								linkAttrs,
								_List_fromArray(
									[
										$elm$html$Html$text('Secondary')
									]))
							]),
							_List_fromArray(
							[
								A2(
								$author$project$Main$viewCode,
								false,
								A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										['secondaryLink ', outlineTxt, '[ text \"Secondary\" ]'])))
							])
						]),
						_List_fromArray(
						[
							_List_fromArray(
							[
								A2(
								$author$project$Pico$contrastLink,
								linkAttrs,
								_List_fromArray(
									[
										$elm$html$Html$text('Contrast')
									]))
							]),
							_List_fromArray(
							[
								A2(
								$author$project$Main$viewCode,
								false,
								A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										['contrastLink ', outlineTxt, '[ text \"Contrast\" ]'])))
							])
						])
					]))
			]));
};
var $author$project$Main$ListForm = {$: 'ListForm'};
var $author$project$Main$listFormCodeStr = 'listForm : Form (List String) MyError\nlistForm =\n    Form.form\n        (\\_ html -> html) -- no validations, no errors to display\n        alwaysValid -- no custom validations\n        "lists-example"\n        (\\todos ->\n            { view = \\formState _ -> todos.view formState\n            , combine = \\formState -> todos.value formState\n            }\n        )\n        |> listField -- this makes it a list instead of a single field\n            listWithAddButton     -- defines where to position the add button\n            fieldWithRemoveButton -- defines where to position the remove button\n            "a new todo"          -- default content for new element\n            identity              -- how to get the list out of the form value\n            (FancyForms.Widgets.Text.textInput []) -- the widget to collect a single item\n\n\nfieldWithRemoveButton removeMsg input =\n    [ fieldset [ role "group" ] <|\n        input\n            ++ [ button [ onClick removeMsg ] [ text "Remove" ] ]\n    ]\n\n\nlistWithAddButton addMsg items =\n    [ div [] <|\n        items\n            ++ [ button [ onClick addMsg ] [ text "Add todo" ] ]\n    ]\n';
var $author$project$Main$viewLists = function (model) {
	return A2(
		$elm$html$Html$section,
		_List_Nil,
		$elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						A2(
						$elm$html$Html$h3,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Lists')
							])),
						$author$project$Main$markdown('\n_FancyForms comes with a function to add a `listField` to your form. This lets the user provide multiple values of the type\nof the given widget.\n\nWe also have to specify the UI elements for adding and removing values.\nHere is an example that collects a list of `String` values.\n')
					]),
					_List_fromArray(
					[
						A3(
						$author$project$Pico$accordion,
						_List_fromArray(
							[
								$author$project$Pico$asButton,
								$elm$html$Html$Attributes$class('secondary')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('View code')
							]),
						_List_fromArray(
							[
								A2($author$project$Main$viewCode, true, $author$project$Main$listFormCodeStr)
							]))
					]),
					A3(
					$axelerator$fancy_forms$FancyForms$Form$render,
					$author$project$Main$ForForm($author$project$Main$ListForm),
					$author$project$Main$listForm,
					model.listFormState)
				])));
};
var $author$project$Pico$busy = A2($elm$html$Html$Attributes$attribute, 'aria-busy', 'true');
var $author$project$Main$viewLoading = A2(
	$elm$html$Html$section,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h3,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Loading')
				])),
			$author$project$Main$markdown('Add the `busy` attribute to any element to show a loading indicator.'),
			A3(
			$author$project$Pico$table,
			_List_Nil,
			_List_Nil,
			_List_fromArray(
				[
					_List_fromArray(
					[
						_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[$author$project$Pico$busy]),
							_List_fromArray(
								[
									$elm$html$Html$text('Generating something')
								]))
						]),
						_List_fromArray(
						[
							A2($author$project$Main$viewCode, false, 'span [busy] [text \"Generating something\"] ]')
						])
					]),
					_List_fromArray(
					[
						_List_fromArray(
						[
							A2(
							$author$project$Pico$secondaryButton,
							_List_fromArray(
								[$author$project$Pico$busy]),
							_List_fromArray(
								[
									$elm$html$Html$text('On a button')
								]))
						]),
						_List_fromArray(
						[
							A2($author$project$Main$viewCode, false, 'secondaryButton [busy] [text \"On a button\"] ]')
						])
					])
				]))
		]));
var $author$project$Main$ShowModalExample = {$: 'ShowModalExample'};
var $author$project$Main$viewModal = A2(
	$elm$html$Html$section,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h3,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Modal')
				])),
			$author$project$Main$markdown('\nPico comes with everything you need to provide a beautiful modal UX. This includes \npretty fade-in animations, proper locking of the viewport and the ability to \nuse the escape key to close the modal.\n\nThe modal comes with its own lifecyle to support this. It also relies on a small\nJS script that you need to include in your HTML to interact with the HTML element.\n\n> The script is in the `picomponent.js` in the packages root. You just need to include it in your Html\n> before initializing your Elm app.\n\nClick the button below to check the content of this example modal to see how it works.\n'),
			A2(
			$author$project$Pico$primaryButton,
			_List_fromArray(
				[
					$elm$html$Html$Events$onClick($author$project$Main$ShowModalExample)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Open modal')
				]))
		]));
var $author$project$Main$MainArgsForm = {$: 'MainArgsForm'};
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $author$project$Main$layoutView = function (mainArgs) {
	var _v0 = A2($axelerator$fancy_forms$FancyForms$Form$extract, $author$project$Main$mainArgsForm, mainArgs);
	var layout = _v0.layout;
	var colorScheme = _v0.colorScheme;
	var currentColorSchemeName = function () {
		switch (colorScheme.$) {
			case 'Light':
				return 'Light';
			case 'Dark':
				return 'Dark';
			default:
				return 'SystemScheme';
		}
	}();
	var currentLayoutName = function () {
		if (layout.$ === 'Centered') {
			return 'Centered';
		} else {
			return 'FullWidth';
		}
	}();
	return _List_fromArray(
		[
			$author$project$Main$markdown('\n### Containers\n\nThe `main_` function creates the central content area. It takes two arguments:\nThe first one determines whether the content should be rendered in a centered or full width layout.\nThe second one determins light or dark mode.\n'),
			A2(
			$author$project$Main$viewCode,
			false,
			A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					['main_', currentLayoutName, currentColorSchemeName, '[ ]', '[...]'])))
		]);
};
var $author$project$Main$viewTheme = function (mainArgs) {
	return A2(
		$elm$html$Html$section,
		_List_Nil,
		$elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$name('containers')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$h2,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Layout')
							])),
						$author$project$Main$markdown('\nPico.css is relatively unopinionated what content areas to have on a page. It does offer a few light options to control the layout.\n                ')
					]),
					$author$project$Main$layoutView(mainArgs),
					A3(
					$axelerator$fancy_forms$FancyForms$Form$render,
					$author$project$Main$ForForm($author$project$Main$MainArgsForm),
					$author$project$Main$mainArgsForm,
					mainArgs)
				])));
};
var $elm$html$Html$em = _VirtualDom_node('em');
var $author$project$Pico$tooltip = $elm$html$Html$Attributes$attribute('data-tooltip');
var $author$project$Pico$tooltipBottom = function (c) {
	return _List_fromArray(
		[
			A2($elm$html$Html$Attributes$attribute, 'data-tooltip', c),
			A2($elm$html$Html$Attributes$attribute, 'data-placement', 'bottom')
		]);
};
var $author$project$Pico$tooltipLeft = function (c) {
	return _List_fromArray(
		[
			A2($elm$html$Html$Attributes$attribute, 'data-tooltip', c),
			A2($elm$html$Html$Attributes$attribute, 'data-placement', 'left')
		]);
};
var $author$project$Pico$tooltipRight = function (c) {
	return _List_fromArray(
		[
			A2($elm$html$Html$Attributes$attribute, 'data-tooltip', c),
			A2($elm$html$Html$Attributes$attribute, 'data-placement', 'right')
		]);
};
var $author$project$Main$viewTooltips = A2(
	$elm$html$Html$section,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h3,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Tooltips')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Tooltips can be added as `Html.Attribute` to arbitrary elements.')
				])),
			A3(
			$author$project$Pico$table,
			_List_Nil,
			_List_Nil,
			_List_fromArray(
				[
					_List_fromArray(
					[
						_List_fromArray(
						[
							$elm$html$Html$text('tooltip on '),
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('#'),
									$author$project$Pico$tooltip('I\'m a tooltip')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('a link')
								]))
						]),
						_List_fromArray(
						[
							A2($author$project$Main$viewCode, false, 'a [href \"#\", tooltip \"I\'m a tooltip\"] [ text \"tooltip on a link\" ] ')
						])
					]),
					_List_fromArray(
					[
						_List_fromArray(
						[
							A2(
							$author$project$Pico$primaryButton,
							_List_fromArray(
								[
									$author$project$Pico$tooltip('I\'m a tooltip')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('tooltip on a link')
								]))
						]),
						_List_fromArray(
						[
							A2($author$project$Main$viewCode, false, 'primaryButton [tooltip \"I\'m a tooltip\"] [ text \"tooltip on a link\" ] ')
						])
					])
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Positioning can be controlled by using one of the variants:')
				])),
			A3(
			$author$project$Pico$table,
			_List_Nil,
			_List_Nil,
			_List_fromArray(
				[
					_List_fromArray(
					[
						_List_fromArray(
						[
							A2(
							$elm$html$Html$em,
							$author$project$Pico$tooltipRight('I\'m a tooltip'),
							_List_fromArray(
								[
									$elm$html$Html$text('tooltip on the right')
								]))
						]),
						_List_fromArray(
						[
							A2($author$project$Main$viewCode, false, 'em (tooltipRight \"I\'m a tooltip\") [ text \"tooltip on the right\" ]')
						])
					]),
					_List_fromArray(
					[
						_List_fromArray(
						[
							A2(
							$elm$html$Html$em,
							$author$project$Pico$tooltipLeft('I\'m a tooltip'),
							_List_fromArray(
								[
									$elm$html$Html$text('tooltip on the left')
								]))
						]),
						_List_fromArray(
						[
							A2($author$project$Main$viewCode, false, 'em (tooltipLeft \"I\'m a tooltip\") [ text \"tooltip on the left\" ]')
						])
					]),
					_List_fromArray(
					[
						_List_fromArray(
						[
							A2(
							$elm$html$Html$em,
							$author$project$Pico$tooltipBottom('I\'m a tooltip'),
							_List_fromArray(
								[
									$elm$html$Html$text('tooltip on the bottom')
								]))
						]),
						_List_fromArray(
						[
							A2($author$project$Main$viewCode, false, 'em (tooltipBottom \"I\'m a tooltip\") [ text \"tooltip on the bottom\" ]')
						])
					])
				]))
		]));
var $elm$html$Html$abbr = _VirtualDom_node('abbr');
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $author$project$Pico$abbr = F2(
	function (abr, meaning) {
		return A2(
			$elm$html$Html$abbr,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$title(meaning)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(abr)
				]));
	});
var $elm$html$Html$b = _VirtualDom_node('b');
var $author$project$Pico$bold = $author$project$Pico$inlineText($elm$html$Html$b);
var $elm$html$Html$del = _VirtualDom_node('del');
var $author$project$Pico$deleted = $author$project$Pico$inlineText($elm$html$Html$del);
var $author$project$Pico$emphasis = $author$project$Pico$inlineText($elm$html$Html$em);
var $elm$html$Html$ins = _VirtualDom_node('ins');
var $author$project$Pico$inserted = $author$project$Pico$inlineText($elm$html$Html$ins);
var $elm$html$Html$i = _VirtualDom_node('i');
var $author$project$Pico$italic = $author$project$Pico$inlineText($elm$html$Html$i);
var $elm$html$Html$kbd = _VirtualDom_node('kbd');
var $author$project$Pico$kbd = $author$project$Pico$inlineText($elm$html$Html$kbd);
var $author$project$Pico$strikethrough = $author$project$Pico$inlineText(
	$elm$html$Html$node('strikethrough'));
var $elm$html$Html$sub = _VirtualDom_node('sub');
var $author$project$Pico$subscript = $author$project$Pico$inlineText($elm$html$Html$sub);
var $elm$html$Html$sup = _VirtualDom_node('sup');
var $author$project$Pico$superscript = $author$project$Pico$inlineText($elm$html$Html$sup);
var $elm$html$Html$u = _VirtualDom_node('u');
var $author$project$Pico$underline = $author$project$Pico$inlineText($elm$html$Html$u);
var $author$project$Main$inlineExamples = _List_fromArray(
	[
		_List_fromArray(
		[
			_Utils_Tuple2(
			A2($author$project$Pico$abbr, 'tldr', 'too long didn\'t  read'),
			'abbr \"tldr\" \"too long didn\'t  read\"'),
			_Utils_Tuple2(
			$author$project$Pico$bold('bold'),
			'bold \"bold\"')
		]),
		_List_fromArray(
		[
			_Utils_Tuple2(
			$author$project$Pico$italic('italic'),
			'italic \"italic\"'),
			_Utils_Tuple2(
			$author$project$Pico$emphasis('emphasis'),
			'emphasis \"emphasis\"')
		]),
		_List_fromArray(
		[
			_Utils_Tuple2(
			$author$project$Pico$deleted('deleted'),
			'deleted \"deleted\"'),
			_Utils_Tuple2(
			$author$project$Pico$inserted('inserted'),
			'inserted \"inserted\"')
		]),
		_List_fromArray(
		[
			_Utils_Tuple2(
			$author$project$Pico$kbd('kbd'),
			'kbd \"kbd\"'),
			_Utils_Tuple2(
			$author$project$Pico$mark('mark'),
			'mark \"mark\"')
		]),
		_List_fromArray(
		[
			_Utils_Tuple2(
			$author$project$Pico$strikethrough('strikethrough'),
			'strikethrough \"strikethrough\"'),
			_Utils_Tuple2(
			$author$project$Pico$underline('underline'),
			'underline \"underline\"')
		]),
		_List_fromArray(
		[
			_Utils_Tuple2(
			A2(
				$elm$html$Html$span,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Text '),
						$author$project$Pico$superscript('up high')
					])),
			'superscript \"up high\"'),
			_Utils_Tuple2(
			A2(
				$elm$html$Html$span,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Text '),
						$author$project$Pico$subscript('down low')
					])),
			'subscript \"down low\"')
		])
	]);
var $author$project$Main$markdownInfo = $author$project$Main$markdown('\n### Markdown\nSince pico.css is a (mostly) **classless** CSS framework we can also use [Markdown](https://package.elm-lang.org/packages/elm-explorations/markdown/latest/) and it "looks good" per default.\n\n- Here is a link to [Pico CSS](https://picocss.com/) `[Pico CSS](https://picocss)`.\n- Here is **some bold text** `**some bold text**`\n- Here is _some italic text_ `*some italic text*`\n');
var $author$project$Main$viewInlineExample = function (_v0) {
	var example = _v0.a;
	var code = _v0.b;
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				example,
				A2($author$project$Main$viewCode, false, code)
			]));
};
var $author$project$Main$viewInlineExamplePair = function (examples) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid')
			]),
		A2($elm$core$List$map, $author$project$Main$viewInlineExample, examples));
};
var $author$project$Main$viewTypography = A2(
	$elm$html$Html$section,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h3,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Typography')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Especially for the inline text elements you will often just pass in a single text node, so we offer the following shortcuts:')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('inline-examples')
				]),
			A2($elm$core$List$map, $author$project$Main$viewInlineExamplePair, $author$project$Main$inlineExamples)),
			$author$project$Main$markdownInfo
		]));
var $author$project$Main$VariantForm = {$: 'VariantForm'};
var $author$project$Main$variantFormCodeStr = 'variantForm : Form Contact MyError\nForm.form\n    (\\_ html -> html) -- no custom errors to display\n    alwaysValid -- any contact is valid\n    "variant-example"\n    (\\contact ->\n        { view = \\formState _ -> contact.view formState\n        , combine = \\formState -> contact.value formState\n        }\n    )\n    |> fieldWithVariants identity (dropdown "Contact")\n        ( "E-Mail", emailForm )\n        [ ( "Phone number", phoneForm ) ]\n        (\\c ->\n            case c of\n                Email _ ->\n                    "E-Mail"\n\n                Phone _ ->\n                    "Phone number"\n        )\n\nemailForm : Form Contact MyError\nemailForm =\n    Form.form\n        (\\_ html -> html) -- no custom errors to display\n        alwaysValid -- no custom validations\n        "email-form"\n        (\\email ->\n            { view = \\formState _ -> email.view formState\n            , combine = \\formState -> Email <| email.value formState\n            }\n        )\n        |> field emailOrEmpty (Pico.Form.textInput "E-Mail address")\n\nemailOrEmpty : Contact -> String\nemailOrEmpty c =\n    case c of\n        Email email -> email\n        _ -> ""\n\nphoneForm : Form Contact MyError\nphoneForm =\n    Form.form\n        (\\_ html -> html) -- no custom errors to display\n        alwaysValid -- no custom validations\n        "email-form"\n        (\\countryCode number ->\n            { view =\n                \\formState _ ->\n                    [ div [ class "grid" ]\n                        [ div [] <| countryCode.view formState\n                        , div [] <| number.view formState\n                        ]\n                    ]\n            , combine = \\formState -> Phone \n                { countryCode = (countryCode.value formState)\n                , number = (number.value formState)\n                }\n            }\n        )\n        |> field (numberDetails >> .countryCode) (Pico.Form.integerInput "Country code")\n        |> field (numberDetails >> .number) (Pico.Form.integerInput "Number")\n\nnumberDetails : Contact -> { countryCode: Int, number: Int }\nnumberDetails c =\n    case c of\n        Email _ -> { countryCode = 0 , number = 0 }\n        Phone details-> details\n';
var $author$project$Main$viewVariants = function (model) {
	return A2(
		$elm$html$Html$section,
		_List_Nil,
		$elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						A2(
						$elm$html$Html$h3,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Variants')
							]))
					]),
					_List_fromArray(
					[
						A2(
						$author$project$Pico$grid,
						'',
						_List_fromArray(
							[
								_List_fromArray(
								[
									$author$project$Main$markdown('Consider this example where we want to collect a `Contact` that can be either an `Email` or a `Phone`.\nIn this case the form will look different depending on which variant is selected.\n')
								]),
								_List_fromArray(
								[
									A2($author$project$Main$viewCode, false, 'type Contact\n    = Email String\n    | Phone { countryCode: Int, number: Int }\n')
								])
							]))
					]),
					_List_fromArray(
					[
						A3(
						$author$project$Pico$accordion,
						_List_fromArray(
							[
								$author$project$Pico$asButton,
								$elm$html$Html$Attributes$class('secondary')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('View full code')
							]),
						_List_fromArray(
							[
								A2($author$project$Main$viewCode, true, $author$project$Main$variantFormCodeStr)
							]))
					]),
					A3(
					$axelerator$fancy_forms$FancyForms$Form$render,
					$author$project$Main$ForForm($author$project$Main$VariantForm),
					$author$project$Main$variantForm,
					model.variantFormState)
				])));
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $author$project$Main$withAnchors = $elm$core$List$concatMap(
	function (_v0) {
		var name = _v0.a;
		var html = _v0.b;
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$href('#' + name)
					]),
				_List_Nil),
				html
			]);
	});
var $author$project$Main$view = function (model) {
	var _v0 = A2($axelerator$fancy_forms$FancyForms$Form$extract, $author$project$Main$mainArgsForm, model.mainArgs);
	var layout = _v0.layout;
	var colorScheme = _v0.colorScheme;
	var theme = _v0.theme;
	return {
		body: _List_fromArray(
			[
				A2(
				$author$project$Pico$Modal$view,
				model.testModal.state,
				$author$project$Main$modalContent(model.testModal)),
				$author$project$Pico$includeFromCDN(theme),
				$author$project$Main$codeStyle(model),
				A2(
				$elm$html$Html$header,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$author$project$Main$containerClass(model)
							]),
						_List_fromArray(
							[
								$author$project$Pico$nav(
								_List_fromArray(
									[
										_List_fromArray(
										[
											_List_fromArray(
											[$author$project$Main$picomponentsSvg])
										]),
										_List_fromArray(
										[
											_List_fromArray(
											[
												A2(
												$author$project$Pico$secondaryLink,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href('https://github.com/axelerator/picomponents')
													]),
												_List_fromArray(
													[$author$project$Main$githubSvg]))
											]),
											_List_fromArray(
											[
												A2(
												$author$project$Pico$secondaryLink,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href('https://package.elm-lang.org/packages/axelerator/picomponents/latest')
													]),
												_List_fromArray(
													[$author$project$Main$elmSvg]))
											])
										])
									]))
							]))
					])),
				A4(
				$author$project$Pico$main_,
				layout,
				colorScheme,
				_List_Nil,
				_List_fromArray(
					[
						$author$project$Main$leftNav(model),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('content')
							]),
						$elm$core$List$concat(
							_List_fromArray(
								[
									$author$project$Main$withAnchors($author$project$Main$viewGettingStarted),
									_List_fromArray(
									[
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$name('layout')
											]),
										_List_Nil),
										$author$project$Main$viewTheme(model.mainArgs),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$name('theContent')
											]),
										_List_Nil),
										$author$project$Main$viewContent,
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$name('typography')
											]),
										_List_Nil),
										$author$project$Main$viewTypography,
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$name('buttons')
											]),
										_List_Nil),
										$author$project$Main$viewButtons(model),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$name('links')
											]),
										_List_Nil),
										$author$project$Main$viewLinks(model),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$name('inputs')
											]),
										_List_Nil),
										$author$project$Main$viewForms(model),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$name('lists')
											]),
										_List_Nil),
										$author$project$Main$viewLists(model),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$name('variants')
											]),
										_List_Nil),
										$author$project$Main$viewVariants(model),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$name('combo')
											]),
										_List_Nil),
										$author$project$Main$viewCombo(model),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$name('accordion')
											]),
										_List_Nil),
										$author$project$Main$viewAccordions,
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$name('modals')
											]),
										_List_Nil),
										$author$project$Main$viewModal,
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$name('tooltips')
											]),
										_List_Nil),
										$author$project$Main$viewTooltips,
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$name('loading')
											]),
										_List_Nil),
										$author$project$Main$viewLoading
									])
								])))
					]))
			]),
		title: 'Picomponents'
	};
};
var $author$project$Main$main = $elm$browser$Browser$document(
	{init: $author$project$Main$init, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));