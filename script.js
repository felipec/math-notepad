const wait = 100;

const parser = self.math.parser()
function doMath(input) {
  if (input) {
    let output = [];
    const inputs = input.split('\n');
    parser.clear();
    inputs.forEach((input, inputIndex) => {
      try {
        output_line = parser.evaluate(input);
      }
      catch (e) {
        output_line = e;
      }
      // Checks for unwanted outputs like [], function() ..., null, etc.
      if (output_line && output_line.toString() != "[]" && typeof (output_line) != "function" && output_line.toString() != "[object Object]") {
        // Formats the output to show from which line it comes from and accounts for multiple line outputs
        output.push((inputIndex + 1) + ":" + math.format(output_line,14).split("\n").map(l => "\t" + l).join("\n"))
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
