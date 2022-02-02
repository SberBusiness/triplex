/**
 * Генерация списка файлов для рефакторинга.
 * grep -r -l "from '@sbbol/web-library/" ./src/@sbbol/web-library > jscodeshift-desktop-imports-files.txt
 *
 * Запуск рефакторинга.
 * npm run codemod:replace-desktop-imports -- --stdin < ./jscodeshift-desktop-imports-files.txt > jscodeshift-desktop-imports-files.log
 */

// Старый путь импортов.
const PREV_IMPORT_PATH_PREFIX = '@sbbol/web-library';
// Новый путь импортов.
const NEXT_IMPORT_PATH_PREFIX = '@sbbol/web-library/desktop';

export default (fileInfo, api) => {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);

    root.find(j.StringLiteral).filter(nodePath => {
        return nodePath.value.value.startsWith(PREV_IMPORT_PATH_PREFIX) && !nodePath.value.value.includes(NEXT_IMPORT_PATH_PREFIX)
    })
    .replaceWith((nodePath) => {
        const { node } = nodePath;
        node.value = node.value.replace(PREV_IMPORT_PATH_PREFIX, NEXT_IMPORT_PATH_PREFIX);

        return node;
    })

    return root.toSource();
};