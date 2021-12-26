function mathjs(hljs) {
  function either(args) {
    return '(' + args.join('|') + ')';
  }

  function keywords(args) {
    return '\\b' + either(args.split(' ')) + '\\b';
  }

  const OPERATORS = {
    scope: 'operator',
    begin: /[=+\-*/.^?!%'<>:~]+/,
  };

  const OPERATOR_KEYWORDS = {
    scope: 'operator',
    begin: keywords('to in and not or xor mod'),
  };

  const NUMBER_KEYWORDS = {
    scope: 'number',
    begin: keywords('true false'),
  };

  const UNIT_LIST = Object.keys(math.Unit.UNITS).sort((a, b) => b.length - a.length);

  const PREFIXED_UNIT_LIST = UNIT_LIST.map(e => {
      const prefixes = Object.keys(math.Unit.UNITS[e].prefixes).filter(e => e);
      const prefix_re = prefixes.length ? either(prefixes) + '?' : '';
      return prefix_re + e;
  });

  const UNITS = {
    scope: 'unit',
    begin: '\\b' + either(PREFIXED_UNIT_LIST) + '\\b',
  };

  const MATRIX = {
    scope: 'matrix',
    begin: /[\[\],;]/,
  };

  const FUNCTION_LIST = Object.getOwnPropertyNames(math).filter(e => typeof math[e] === 'function');

  const FUNCTIONS = {
    scope: 'function',
    begin: '\\b' + either(FUNCTION_LIST) + '\\b',
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
    ],
  };
}

hljs.registerLanguage('mathjs', mathjs);
