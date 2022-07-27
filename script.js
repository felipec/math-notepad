const wait = 100;

const intro = '# intro';

const intro_doc = {
  description: 'You can type math.js expressions and see the result.',
  examples: [
    '2 + 2',
    'round(e, 3)',
    'log(100000, 10)',
    '10cm to inch',
    'sin(90 deg)',
    'det([-1, 2; 3, 1])',
    '1 kg * 1 m / s^2',
    'help("round")',
  ]
}

function showDoc(doc) {
  if (!doc) {
    help.style.display = 'none';
    return;
  }

  help_name.textContent = doc.name;
  help_description.textContent = doc.description;
  help_syntax_code.textContent = doc.syntax?.join("\n");
  hljs.highlightElement(help_syntax_code);
  help_examples_code.textContent = doc.examples?.join("\n");
  hljs.highlightElement(help_examples_code);
  help_seealso_text.textContent = doc.seealso?.join(", ");
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
        if (line == '# intro') doc = intro_doc;
        output_line = '#';
      } else {
        try {
          const r = math.evaluate(line, scope);
          if (r) {
            if (r.doc) doc = r.doc;
            else output_line = math.format(r, 14);
          }
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

function dropHandler(ev) {
  ev.preventDefault();

  const file = ev.dataTransfer.items[0].getAsFile();
  file.text().then(e => editor.updateCode(e));
}

async function start(url) {
  let code = intro;
  if (url) code = await (await fetch(url)).text();
  editor.updateCode(code);
  doMath(editor.toString());
}

var timer;

editor.onUpdate(code => {
  clearTimeout(timer);
  timer = setTimeout(doMath, wait, code);
});

hljs.configure({ ignoreUnescapedHTML: true });

const params = new URLSearchParams(window.location.search);
start(params.get('input'));
