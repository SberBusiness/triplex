const fs = require('fs');
const path = require('path');
const getStyleConfigInput = require('./getStyleConfigInput');
const getStyleConfigOutput = require('./getStyleConfigOutput');
const packageJson = require('../../../package');
const rollup = require('rollup');
var uniq = require('lodash.uniq');
const getLessFileList = require('./getLessFileList');

const absoluteRootPath = path.resolve(__dirname, '../../../');
// Текущая версия npm пакета. Точки заменены на '-'. Например 10-0-5.
const currentPackageVersion = packageJson.version.replace(/\./g, '-')
// Папка со сгенерированными файлами.
const generatedDirName = 'src/generated';
// Файл со сгенерированными css-переменными.
const cssVariablesSourceFileName = 'themesCssVariables.css';

/**
 * Для каждой платформы записываем собранные общие бандлы со стилями.
 * @param cssContentByPlatform Контент в формате css для каждой платформы.
 */
function writeCommonCssBundles(cssContentByPlatform) {
    const outStyles = `${absoluteRootPath}/out/styles`;
    const fileName = 'styles.css';
    const cssVariablesContent = fs.readFileSync(`${generatedDirName}/${cssVariablesSourceFileName}`, 'utf8');

    for (const platformName in cssContentByPlatform) {
        const absoluteFilePath = `${outStyles}/${fileName}`;

        // Добавление css-переменных в общий бандл.
        const cssContent = `${cssVariablesContent}\n${cssContentByPlatform[platformName]}`;

        fs.writeFileSync(absoluteFilePath, cssContent);
    }
}

function replaceDesignTokenVersion(cssContent) {
    // Содержимое css-файла с добавленной версией npm пакета.
    let cssContentNext = cssContent;
    // Регулярное выражение, для поиска css-переменных.
    const cssVariableRegexp = /(--)[^\,\:\)]+/g;
    // Массив css-переменных файла.
    const cssVariableMatch = cssContent.match(cssVariableRegexp);

    if (cssVariableMatch) {
        // Массив css-переменных файла без повторений, содержащие подстроку -triplex.
        const cssVariableUniq = uniq(cssVariableMatch).filter(cssVariable => cssVariable.includes('--triplex'));

        if (cssVariableUniq.length) {
            // Замена 'version' на текущую версию npm пакета.
            cssVariableUniq.forEach(cssVariable => {
                // Добавлкение версии npm пакета в конец переменной.
                const cssVariableNameWithVersion = `var(${cssVariable}-${currentPackageVersion})`;
                // Название css-переменной без версии npm пакета.
                const regex = new RegExp(`var\\(${cssVariable}\\)`, 'g');
                cssContentNext = cssContentNext.replace(regex, cssVariableNameWithVersion)
            })
        }
    }

    return cssContentNext;
}

/**
 * Записываем бандл компонента со стилями.
 * @param relativeFilePath Относительный путь файла.
 * @param cssContent Контент бандла в формате css.
 */
function writeCssBundle(relativeFilePath, cssContent) {
    const absoluteFilePath = `${absoluteRootPath}/${relativeFilePath}`;

    /** Рекурсивно создаём каталоги по указанному пути. */
    fs.mkdirSync(path.dirname(absoluteFilePath), {recursive: true});

    /** Записываем бандл со стилями. */
    fs.writeFileSync(absoluteFilePath, cssContent);
}

const buildLess = async () => {
    const componentStylesByPlatform = getLessFileList(
        ['src/components'],
        [/protected/]
    );

    /** Общие стили всех бандлов сгруппированные по платформе. */
    const cssContentByPlatform = {};

    /** Итерируемся по платформам. */
    for (const platformName in componentStylesByPlatform) {
        const platform = componentStylesByPlatform[platformName];

        /** Итерируемся по компонентам. */
        for (const componentName in platform) {
            const componentLessPaths = platform[componentName];
            const pathlength = componentLessPaths.length;

            let configOutput = null;

            /** Итерируемся по файлам стилей компонента. */
            for (let i = 0; i < pathlength; i++) {
                const lessPath = componentLessPaths[i];

                /** Формируем входной конфиг сборки. */
                const configInput = getStyleConfigInput(lessPath);
                let bundle;

                try {
                    /** Rollup создание контекста бандла, до его формирования и транспиляции. */
                    bundle = await rollup.rollup(configInput.input);
                } catch (e) {
                    console.log(e);
                }

                /** Так как выходной файл стилей единственный, то выходной конфиг необходимо сформировать один раз. */
                if (!configOutput) {
                    configOutput = getStyleConfigOutput(lessPath, componentName);
                }

                /** Rollup формирование и транспиляция. */
                await bundle.generate(configOutput);

                /** Так как выходной файл стилей единственный, то записываем только после обработки всех бандлов компонента. */
                const isLastLessFile = i + 1 === pathlength;
                if (!isLastLessFile) {
                    continue;
                }

                /** Стили с текущей версией css переменных. */
                const cssContentWithCssVariableVersion = replaceDesignTokenVersion(configInput.shared.content);
                /** Записываем бандл компонента со стилями. */
                writeCssBundle(configOutput.file, cssContentWithCssVariableVersion);

                /** Аккумулируем стили по платформам для сохранения в общие файлы стилей. */
                cssContentByPlatform[platformName] = cssContentByPlatform[platformName] || [];
                cssContentByPlatform[platformName] += cssContentWithCssVariableVersion;

                /** Очищаем временное хранилище контента бандла для следующего бандла. */
                configInput.shared.content = '';
            }
        }
    }

    /** Для каждой платформы записываем собранные общие бандлы со стилями.*/
    writeCommonCssBundles(cssContentByPlatform);

    // Копирование файла с css-переменными.
    fs.copyFile(`${generatedDirName}/${cssVariablesSourceFileName}`,  `${absoluteRootPath}/out/styles/${cssVariablesSourceFileName}`, (err) => {
        if (err) throw err;
        console.log(`${generatedDirName}/${cssVariablesSourceFileName} was copied to ${absoluteRootPath}/out/styles/${cssVariablesSourceFileName}.`);
    });
};

buildLess();
