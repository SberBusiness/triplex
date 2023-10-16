const fs = require('fs');
const path = require('path');

fs.copyFileSync(path.resolve(__dirname, '../../src/utils/sha256.js'), path.resolve(__dirname, '../../out/utils/sha256.js'));
