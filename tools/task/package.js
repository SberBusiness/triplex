const fs = require('fs');
const {
    name,
    version,
    description,
    author,
    license,
    peerDependencies,
    dependencies
} = require('../../package');

/**
 * Создаём package.json для публикуемой библиотеки.
 */

fs.writeFileSync('out/package.json', JSON.stringify({
    name,
    version,
    description,
    author,
    license,
    peerDependencies,
    dependencies,
    types: 'index.d.ts'
}, null, '    '));
