const fs = require('fs');
const path = require('path');

fs.copyFileSync(path.resolve(__dirname, '../../src/common/utils/sha256.js'), path.resolve(__dirname, '../../out/common/utils/sha256.js'));