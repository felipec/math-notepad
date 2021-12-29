const wait = 100;

const parser = self.math.parser()
function doMath(input) {
  if (input) {
    let output = [];
    const inputs = input.split('\n');
    parser.clear();
    inputs.forEach((input, I) => {
      try {
        output_line = parser.evaluate(input);
      }
      catch (e) {
        output_line = e;
      }
      if (output_line && output_line.toString() != "[]" && typeof (output_line) != "function" && output_line.toString() != "[object Object]") {
        output.push((I + 1) + ":" + output_line.toString().split("\n").map(l => "\t" + l).join("\n"))
      }
    })
    results.updateCode(output.join("\n"))
  }
}

var timer;

editor.onUpdate(code => {
  clearTimeout(timer);
  timer = setTimeout(doMath, wait, code);
});

hljs.configure({ ignoreUnescapedHTML: true });
doMath(editor.toString());