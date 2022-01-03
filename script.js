const wait = 100;

function doMath(input) {
  let output = [];
  let scope = {};

  for (const line of input.split('\n')) {
    let output_line = '';
    if (line) {
      if (line.startsWith('#')) {
        output_line = line;
      } else {
        try {
          output_line = math.format(math.evaluate(line, scope), 14);
        } catch(e) {
          output_line = e.toString();
        }
      }
    }
    output.push(output_line);
  }

  results.updateCode(output.join('\n'));
}

var timer;

editor.onUpdate(code => {
  clearTimeout(timer);
  timer = setTimeout(doMath, wait, code);
});

hljs.configure({ ignoreUnescapedHTML: true });
doMath(editor.toString());
