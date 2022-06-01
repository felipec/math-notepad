const wait = 100;

function showDoc(doc) {
  if (!doc) {
    help.style.display = 'none';
    return;
  }

  help_name.textContent = doc.name;
  help_description.textContent = doc.description;
  help_syntax.textContent = doc.syntax.join("\n");
  hljs.highlightElement(help_syntax);
  help_examples.textContent = doc.examples.join("\n");
  hljs.highlightElement(help_examples);
  help_seealso.textContent = doc.seealso.join(", ");
  help.style.display = 'block';
}

function doMath(input) {
  let output = [];
  let scope = {};
  let doc;

  for (const line of input.split('\n')) {
    let output_line = '';
    if (line) {
      if (line.startsWith('#')) {
        output_line = line;
      } else {
        try {
          const r = math.evaluate(line, scope);
          if (r.doc) doc = r.doc;
          else output_line = math.format(r, 14);
        } catch(e) {
          output_line = e.toString();
        }
      }
    }
    output.push(output_line);
  }

  results.updateCode(output.join('\n'));
  showDoc(doc);
}

var timer;

editor.onUpdate(code => {
  clearTimeout(timer);
  timer = setTimeout(doMath, wait, code);
});

hljs.configure({ ignoreUnescapedHTML: true });
doMath(editor.toString());
