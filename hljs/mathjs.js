function mathjs(hljs) {
  function either(args) {
    return '(' + args.join('|') + ')';
  }

  function keywords(args) {
    return '\\b' + either(args) + '\\b';
  }

  const OPERATORS = {
    scope: 'punctuation',
    begin: /[=+\-*/.^?!%'<>:~]+/,
  };

  const OPERATOR_KEYWORDS = {
    scope: 'punctuation',
    begin: keywords(['to', 'in', 'and', 'not', 'or', 'xor', 'mod']),
  };

  const NUMBER_KEYWORDS = {
    scope: 'number',
    begin: keywords(['true', 'false', 'end']),
  };

  const UNIT_LIST = Object.keys(math.Unit.UNITS).sort((a, b) => b.length - a.length);

  const PREFIXED_UNIT_LIST = UNIT_LIST.map(e => {
      const prefixes = Object.keys(math.Unit.UNITS[e].prefixes).filter(e => e);
      const prefix_re = prefixes.length ? either(prefixes) + '?' : '';
      return prefix_re + e;
  });

  const UNITS = {
    scope: 'class',
    begin: keywords(PREFIXED_UNIT_LIST),
  };

  const MATRIX = {
    scope: 'bullet',
    begin: /[\[\],;]/,
  };

  const FUNCTION_LIST = ['config', 'abs', 'acos', 'acosh', 'acot', 'acoth', 'acsc', 'acsch', 'add', 'addScalar', 'and',
    'arg', 'asec', 'asech', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'bellNumbers', 'bignumber', 'bin', 'bitAnd',
    'bitNot', 'bitOr', 'bitXor', 'boolean', 'catalan', 'cbrt', 'ceil', 'clone', 'column', 'combinations',
    'combinationsWithRep', 'compare', 'compareNatural', 'compareText', 'compile', 'complex', 'composition', 'concat',
    'conj', 'cos', 'cosh', 'cot', 'coth', 'count', 'createUnit', 'cross', 'csc', 'csch', 'ctranspose', 'cube', 'cumsum',
    'deepEqual', 'derivative', 'det', 'diag', 'diff', 'distance', 'divide', 'divideScalar', 'dot', 'dotDivide',
    'dotMultiply', 'dotPow', 'eigs', 'equal', 'equalScalar', 'equalText', 'erf', 'evaluate', 'exp', 'expm', 'expm1',
    'factorial', 'fft', 'filter', 'fix', 'flatten', 'floor', 'forEach', 'format', 'fraction', 'gamma', 'gcd',
    'getMatrixDataType', 'hasNumericValue', 'help', 'hex', 'hypot', 'identity', 'ifft', 'im', 'index', 'intersect',
    'inv', 'invmod', 'isInteger', 'isNaN', 'isNegative', 'isNumeric', 'isPositive', 'isPrime', 'isZero', 'kldivergence',
    'kron', 'larger', 'largerEq', 'lcm', 'leafCount', 'leftShift', 'lgamma', 'log', 'log10', 'log1p', 'log2', 'lsolve',
    'lsolveAll', 'lup', 'lusolve', 'mad', 'map', 'matrix', 'matrixFromColumns', 'matrixFromFunction', 'matrixFromRows',
    'max', 'mean', 'median', 'min', 'mod', 'mode', 'multinomial', 'multiply', 'multiplyScalar', 'norm', 'nthRoot',
    'nthRoots', 'number', 'numeric', 'oct', 'ones', 'or', 'parse', 'parser', 'partitionSelect', 'permutations',
    'pickRandom', 'pinv', 'pow', 'print', 'prod', 'qr', 'quantileSeq', 'random', 'randomInt', 'range', 'rationalize',
    're', 'replacer', 'reshape', 'resize', 'resolve', 'reviver', 'rightArithShift', 'rightLogShift', 'rotate',
    'rotationMatrix', 'round', 'row', 'sec', 'sech', 'setCartesian', 'setDifference', 'setDistinct', 'setIntersect',
    'setIsSubset', 'setMultiplicity', 'setPowerset', 'setSize', 'setSymDifference', 'setUnion', 'sign', 'simplify',
    'simplifyConstant', 'simplifyCore', 'sin', 'sinh', 'size', 'slu', 'smaller', 'smallerEq', 'sort', 'sparse',
    'splitUnit', 'sqrt', 'sqrtm', 'square', 'squeeze', 'std', 'stirlingS2', 'string', 'subset', 'subtract', 'sum',
    'symbolicEqual', 'tan', 'tanh', 'to', 'trace', 'transpose', 'typeOf', 'typed', 'unaryMinus', 'unaryPlus', 'unequal',
    'unit', 'usolve', 'usolveAll', 'variance', 'xgcd', 'xor', 'zeros'];

  const FUNCTIONS = {
    scope: 'title',
    begin: keywords(FUNCTION_LIST),
  };

  const VARIABLE = {
    scope: 'variable',
    begin: /[a-zA-Z_$][a-zA-Z0-9_$]*/,
  };

  return {
    name: 'mathjs',
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      NUMBER_KEYWORDS,
      OPERATORS,
      OPERATOR_KEYWORDS,
      UNITS,
      MATRIX,
      FUNCTIONS,
      VARIABLE,
    ],
  };
}

hljs.registerLanguage('mathjs', mathjs);
