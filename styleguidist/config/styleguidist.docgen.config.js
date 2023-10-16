module.exports = require('react-docgen-typescript').withCompilerOptions(
    {
        esModuleInterop: true,
    },
    {
        propFilter: (prop) => {
            if (prop.declarations !== undefined && prop.declarations.length > 0) {
                const hasPropAdditionalDescription = prop.declarations.find((declaration) => {
                    return !declaration.fileName.includes('node_modules');
                });
                return Boolean(hasPropAdditionalDescription);
            }
            return true;
        },
    }
).parse;
