/**
 * Замена attachTheme в FC.
 * Генерация списка файлов для рефакторинга.
 * grep -r -l "= attachTheme(" ./src/@sbbol/web-library > jscodeshift-remove-attach-theme-FC.txt
 *
 * Запуск рефакторинга.
 * npm run codemod:remove-attach-theme-FC -- --stdin < ./jscodeshift-remove-attach-theme-FC.txt > jscodeshift-remove-attach-theme-FC.log
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
        Удаление именованного экспорта, типа: export {ComponentName};
     */
    const exportComponent = root.find(j.ExportNamedDeclaration, {
        declaration: null
    });

    const exportComponentNodePath = exportComponent.get(0);

    const componentName = exportComponentNodePath.node.specifiers[0].exported.name;

    exportComponent.remove();

    // Изменение "let ComponentName = ..." на export const ComponentName = ...".
    root.find(j.VariableDeclaration, {
            declarations: [{
                id: {
                    name: componentName
                }
            }],
            kind: 'let'
        })
        .replaceWith((nodePath) => {
            const {node} = nodePath;
            node.kind = 'const';
            const nextExportNode = j.exportDeclaration(false, node);
            if (node.comments) {
                nextExportNode.comments = node.comments;
            }
            node.comments = [];
            return nextExportNode;
        })

    /*
        Удаление блоков вида:
        ComponentName = attachTheme(EGlobalMobileTheme.DEFAULT, {
            ComponentName: () => import('@sbbol/web-library/.../ComponentName/theme/default/ComponentName.less'),
        })(ComponentName);
     */
    root.find(j.ExpressionStatement)
        .filter(nodePath => nodePath.parentPath.name === 'body' && nodePath.value.expression.right.type === 'CallExpression' && nodePath.value.expression.right.callee.callee.name === 'attachTheme')
        .forEach(nodePath => {
            j(nodePath).remove();
        });

    // Удаление импортов attachTheme.
    root.find(j.ImportDeclaration).forEach(nodePath => {
        if ([IMPORT_ATTACH_THEME, IMPORT_E_GLOBAL_THEME, IMPORT_E_GLOBAL_MOBILE_THEME].includes(nodePath.value.source.value)) {
            j(nodePath).remove();
        }
        return true;
    })

    return root.toSource();
};