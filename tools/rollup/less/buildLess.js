const fs = require('fs');
const path = require('path');
const getStyleConfigInput = require('./getStyleConfigInput');
const getStyleConfigOutput = require('./getStyleConfigOutput');
const rollup = require('rollup');
const getLessFileList = require('./getLessFileList');

const absoluteRootPath = path.resolve(__dirname, '../../../');

/**
 * Для каждой платформы записываем собранные общие бандлы со стилями.
 * @param cssContentByPlatform Контент в формате css для каждой платформы.
 */
function writeCommonCssBundles(cssContentByPlatform) {
    const outStyles = `${absoluteRootPath}/out/styles`;
    const fileName = 'styles.css';

    for (const platformName in cssContentByPlatform) {
        const absoluteFilePath = `${outStyles}/${platformName}/${fileName}`;

        fs.writeFileSync(absoluteFilePath, cssContentByPlatform[platformName]);
    }
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
        ['src/desktop/components', 'src/mobile/components'],
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

                /** Записываем бандл компонента со стилями. */
                writeCssBundle(configOutput.file, configInput.shared.content);

                /** Аккумулируем стили по платформам для сохранения в общие файлы стилей. */
                cssContentByPlatform[platformName] = cssContentByPlatform[platformName] || [];
                cssContentByPlatform[platformName] += configInput.shared.content;

                /** Очищаем временное хранилище контента бандла для следующего бандла. */
                configInput.shared.content = '';
            }
        }
    }

    /** Для каждой платформы записываем собранные общие бандлы со стилями.*/
    writeCommonCssBundles(cssContentByPlatform);
};

buildLess();