/**
 * Замена attachTheme в React.Component.
 * Генерация списка файлов для рефакторинга.
 * grep -r -l "@attachTheme(" ./src/@sbbol/web-library > jscodeshift-remove-attach-theme-Class.txt
 *
 * Запуск рефакторинга.
 * npm run codemod:remove-attach-theme-Class -- --stdin < ./jscodeshift-remove-attach-theme-Class.txt > jscodeshift-remove-attach-theme-Class.log
 */

// Импорт attachTheme.
const IMPORT_ATTACH_THEME = '@sbbol/web-library/common/utils/themes/attachTheme';
// Импорт EGlobalMobileTheme.
const IMPORT_E_GLOBAL_MOBILE_THEME = '@sbbol/web-library/mobile/enums/EGlobalMobileTheme';
// Импорт EGlobalTheme.
const IMPORT_E_GLOBAL_THEME = '@sbbol/web-library/desktop/common/enums/EGlobalTheme';

export default (fileInfo, api) => {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);

    /*
        Удаление блоков вида:
        @attachTheme(EGlobalTheme.DEFAULT, {
            Field: () => import('@sbbol/web-library/desktop/components/Field/theme/default/Field.less'),
        })
     */
    const componentClassNodePath = root.find(j.ExportNamedDeclaration, {
        declaration: {
            type: "ClassDeclaration"
        }
    }).get(0)

    componentClassNodePath.node.declaration.decorators = []

    // Удаление импортов attachTheme.
    root.find(j.ImportDeclaration).forEach(nodePath => {
        if ([IMPORT_ATTACH_THEME, IMPORT_E_GLOBAL_THEME, IMPORT_E_GLOBAL_MOBILE_THEME].includes(nodePath.value.source.value)) {
            j(nodePath).remove();
        }
        return true;
    })

    return root.toSource();
};