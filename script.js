const wait = 100;

var editor = ace.edit(input, {
  theme: 'ace/theme/monokai',
  printMargin: false,
});

var results = ace.edit(output, {
  printMargin: false,
  readOnly: true,
});

function doMath(input) {
  let output = [];
  let scope = {};

  for (const line of input.split('\n')) {
    output.push(math.evaluate(line, scope));
  }

  results.setValue(output.join('\n'));
}

var timer;

function onChange(change) {
  clearTimeout(timer);
  timer = setTimeout(doMath, wait, editor.getValue());
}

editor.on('change', onChange);

doMath(editor.getValue());
