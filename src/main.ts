import './style.css'
import { getInterface } from './jsts/jsts';
import { input } from './input';

const inferredTypes = getInterface(input);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<h1>works well without function</h1>
<pre><code>
${inferredTypes.type}

${Object.values(inferredTypes.byProducts).join('\n\n')}
</code></pre>
`;
