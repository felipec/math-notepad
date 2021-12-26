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

  const MATRIX = {
    scope: 'matrix',
    begin: /[\[\],;]/,
  };

  return {
    name: 'mathjs',
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      NUMBER_KEYWORDS,
      OPERATORS,
      OPERATOR_KEYWORDS,
      MATRIX,
    ],
  };
}

hljs.registerLanguage('mathjs', mathjs);
