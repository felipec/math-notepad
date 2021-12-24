const wait = 100;

var editor = ace.edit(input, {
  theme: 'ace/theme/monokai',
  mode: 'ace/mode/python',
  printMargin: false,
});

var results = ace.edit(output, {
  printMargin: false,
  readOnly: true,
});

function doMath(input) {
  results.setValue('');

  let scope = {};

  for (const line of input.split('\n')) {
    let output = '';
    if (line) {
      try {
        output = math.evaluate(line, scope);
      } catch(e) {
        output = e;
      }
    }
    results.insert(output.toString() + '\n');
  }

  /* Remove extra newline */
  results.setValue(results.getValue().slice(0, -1));
  results.clearSelection();
}

var timer;

function onChange(change) {
  clearTimeout(timer);
  timer = setTimeout(doMath, wait, editor.getValue());
}

editor.on('change', onChange);

doMath(editor.getValue());
