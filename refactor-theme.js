const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
    // Backgrounds
    { regex: /bg-slate-950(?![a-zA-Z0-9_-])/g, replacement: 'bg-white dark:bg-slate-950' },
    { regex: /bg-slate-900(?![a-zA-Z0-9_-])/g, replacement: 'bg-slate-50 dark:bg-slate-900' },
    { regex: /bg-slate-800\/50/g, replacement: 'bg-slate-100/50 dark:bg-slate-800/50' },
    { regex: /bg-slate-800(?![a-zA-Z0-9_/-])/g, replacement: 'bg-slate-100 dark:bg-slate-800' },
    { regex: /bg-slate-750/g, replacement: 'bg-slate-200 dark:bg-slate-750' },
    { regex: /bg-slate-700\/80/g, replacement: 'bg-slate-200/80 dark:bg-slate-700/80' },
    { regex: /bg-slate-700\/50/g, replacement: 'bg-slate-200/50 dark:bg-slate-700/50' },
    { regex: /bg-slate-700(?![a-zA-Z0-9_/-])/g, replacement: 'bg-slate-200 dark:bg-slate-700' },
    { regex: /bg-slate-600(?![a-zA-Z0-9_-])/g, replacement: 'bg-slate-300 dark:bg-slate-600' },

    // Borders
    { regex: /border-slate-700/g, replacement: 'border-slate-200 dark:border-slate-700' },
    { regex: /border-slate-600/g, replacement: 'border-slate-300 dark:border-slate-600' },

    // Text colors
    { regex: /text-white(?![a-zA-Z0-9_-])/g, replacement: 'text-slate-900 dark:text-white' },
    { regex: /text-white\/80/g, replacement: 'text-slate-700 dark:text-white/80' },
    { regex: /text-gray-300(?![a-zA-Z0-9_-])/g, replacement: 'text-slate-600 dark:text-gray-300' },
    { regex: /text-gray-400(?![a-zA-Z0-9_-])/g, replacement: 'text-slate-500 dark:text-gray-400' },
    { regex: /text-gray-500(?![a-zA-Z0-9_-])/g, replacement: 'text-slate-400 dark:text-gray-500' },

    // Gradients
    { regex: /from-slate-950/g, replacement: 'from-slate-100 dark:from-slate-950' },
    { regex: /via-slate-900/g, replacement: 'via-slate-50 dark:via-slate-900' },
    { regex: /to-slate-800/g, replacement: 'to-white dark:to-slate-800' },
    { regex: /from-slate-800/g, replacement: 'from-slate-100 dark:from-slate-800' },
    { regex: /to-slate-900/g, replacement: 'to-slate-50 dark:to-slate-900' },
    { regex: /from-slate-700/g, replacement: 'from-slate-200 dark:from-slate-700' },
];

function processDirectory(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            replacements.forEach(({ regex, replacement }) => {
                // Prevent double replacements (e.g. if dark:bg-slate-950 is already there)
                const safeRegex = new RegExp(`(?<!dark:)(?<!:)${regex.source}`, 'g');
                content = content.replace(safeRegex, replacement);
            });
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Processed: ${fullPath}`);
        }
    });
}

processDirectory(directoryPath);
console.log('✅ Done refactoring Tailwind classes!');
