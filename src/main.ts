import "./style.css";
import { getInterface } from "./jsts/jsts";

document.querySelector<HTMLDivElement>("#output")!.innerHTML = `
<pre></pre>
`;

function handleOnInput(e: Event) {
  try {
    // @ts-ignore
    const inputObject = JSON.parse(e?.target?.value);
    const inferredTypes = getInterface(inputObject);
    document.querySelector<HTMLDivElement>("#output")!.innerHTML = `
<pre><code>
${inferredTypes.type}

${Object.values(inferredTypes.byProducts).join("\n\n")}
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
