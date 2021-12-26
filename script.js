const wait = 100;

function doMath(input) {
  let output = [];
  let scope = {};

  for (const line of input.split('\n')) {
    let output_line = '';
    if (line) {
      try {
        output_line = math.evaluate(line, scope);
      } catch(e) {
        output_line = e;
      }
    }
    output.push(output_line.toString());
  }

  results.updateCode(output.join('\n'));
}

var timer;

editor.onUpdate(code => {
  clearTimeout(timer);
  timer = setTimeout(doMath, wait, code);
});

doMath(editor.toString());
