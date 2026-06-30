const fs = require('fs');
let code = fs.readFileSync('src/components/SellForm.tsx', 'utf8');
code = code.replace(/<ErrorMsg field="([^"]+)" \/>/g, "{renderErrorMsg('$1')}");
code = code.replace(/const ErrorMsg = React\.useCallback\(\(\{\s*field\s*\}\s*:\s*\{\s*field:\s*string\s*\}\)\s*=>\s*\{/, 'const renderErrorMsg = (field: string) => {');
code = code.replace(/\},\s*\[fieldErrors\]\)/, '}');
fs.writeFileSync('src/components/SellForm.tsx', code);
