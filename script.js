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
  console.debug('do math');
}

var timer;

function onChange(change) {
  clearTimeout(timer);
  timer = setTimeout(doMath, wait, editor.getValue());
}

editor.on('change', onChange);

doMath(editor.getValue());
