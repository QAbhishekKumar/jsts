import "./style.css";
import "highlight.js/styles/github-dark.css";

import { highlightTS } from "./jsts/utils";
import { getInterface } from "./jsts/jsts";
import { testJSON } from './input';

function handleOnInput(e: Event) {
  try {
    // @ts-ignore
    const inputObject = JSON.parse(e?.target?.value);
    const inferredTypes = getInterface(inputObject);
    document.querySelector<HTMLDivElement>("#output")!.innerHTML = `
<pre><code>
${highlightTS(inferredTypes.type)}

${highlightTS(Object.values(inferredTypes.byProducts).join("\n\n"))}
</code></pre>
`;
  } catch (err) {
    console.log(err);
    document.querySelector<HTMLDivElement>("#output")!.innerHTML = `
      <div class="error">Check if your JSON is valid?</div>
    `;
  }
}

document.getElementById("input")!.addEventListener("input", handleOnInput);

(function init() {
  const inferredTypes = getInterface(testJSON);
  document.querySelector<HTMLDivElement>("#output")!.innerHTML = `
<pre><code>
${highlightTS(inferredTypes.type)}

${highlightTS(Object.values(inferredTypes.byProducts).join("\n\n"))}
</code></pre>
`;
})();
