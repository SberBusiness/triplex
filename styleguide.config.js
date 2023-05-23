const path = require('path');
const {sections} = require('./styleguidist/config/styleguidist.sections.config');
const webpackConfig = require('./styleguidist/config/styleguidist.webpack.config');
const fs = require('fs');

module.exports = {
    pagePerSection: true,
    theme: {
        fontFamily: {
            base: '"Roboto", sans-serif',
        },
        sidebarWidth: 300,
    },
    template: {
        head: {
            scripts: [
                {
                    src: './styleguidist/public/gtm.js',
                }, {
                    // Скрипт обратной связи в Jira.
                    src:
                        'https://sbtatlas.sigma.sbrf.ru/jira/s/d41d8cd98f00b204e9800998ecf8427e-CDN/ysjv9y/805006/bbbe3b77172f966b31f08ab7da14db44/2.2.4.7/_/download/batch/com.atlassian.plugins.jquery:jquery/com.atlassian.plugins.jquery:jquery.js?collectorId=e35580a9',
                }, {
                    // Скрипт обратной связи в Jira.
                    src:
                        'https://sbtatlas.sigma.sbrf.ru/jira/s/34d89b404b18c9b021fce0934969cc08-T/ysjv9y/805006/bbbe3b77172f966b31f08ab7da14db44/4.0.0/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=ru-RU&collectorId=e35580a9',
                },
            ],
        },
    },
    styleguideDir: 'styleguidistDist',
    styleguideComponents: {
        'slots/CodeTabButton': path.join(
            __dirname,
            './styleguidist/config/components/CustomCodeTabButton/CustomCodeTabButton.tsx'
        ),
        ComponentsListRenderer: path.join(
            __dirname,
            './styleguidist/config/components/CustomComponentsListRenderer/CustomComponentsListRenderer.tsx'
        ),
        Pathline: path.join(__dirname, './styleguidist/config/components/PathlineWrapper.tsx'),
        StyleGuide: path.join(__dirname, './styleguidist/config/components/StyleGuideWrapper.tsx'),
        Wrapper: path.join(__dirname, './styleguidist/config/components/CustomWrapper/CustomWrapper.tsx'),
        Logo: path.join(__dirname, './styleguidist/config/components/LogoRenderer/LogoRenderer.tsx'),
        SectionHeadingRenderer: path.join(__dirname, './styleguidist/config/components/SectionHeadingRendererWrapper.tsx'),
        PlaygroundRenderer: path.join(__dirname, './styleguidist/config/components/PlaygroundRendererWrapper.tsx'),
        Markdown: path.join(__dirname, './styleguidist/config/components/CustomMarkdown/CustomMarkdown.tsx'),
        TableOfContentsRenderer: path.join(__dirname, './styleguidist/config/components/CustomTableOfContentsRenderer/CustomTableOfContentsRenderer.tsx'),
    },
    getExampleFilename(componentPath) {
        return componentPath
            .replace('src', 'styleguidist')
            .replace(/\.(ts|tsx)$/, '.md');
    },
    propsParser: require('react-docgen-typescript').withCompilerOptions({esModuleInterop: true}).parse,
    require: [
        // Полифиллы для IE11.
        'core-js/stable',
        'regenerator-runtime/runtime',
        path.join(__dirname, 'styleguidist/config/styles/global-style.less'),
    ],
    sections,
    webpackConfig,
    updateExample(props, exampleFilePath) {
        const {settings, lang} = props;

        if (settings && typeof settings.file === 'string') {
            const filepath = path.resolve(path.dirname(exampleFilePath), settings.file);
            const {file, ...restSettings} = settings;

            return {
                content: fs.readFileSync(filepath, 'utf8'),
                settings: restSettings,
                lang
            };
        }
        return props;
    },
    tocMode: 'collapse',
    title: 'Triplex',
};
