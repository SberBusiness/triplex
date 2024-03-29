const fs = require('fs');
const path = require('path');
const {version} = require('./package');
const propsParser = require('./styleguidist/config/styleguidist.docgen.config')
const sections = require('./styleguidist/config/styleguidist.sections.config');
const webpackConfig = require('./styleguidist/config/styleguidist.webpack.config');

module.exports = {
    pagePerSection: true,
    theme: {
        fontFamily: {
            base: '"Roboto", sans-serif',
        },
    },
    template: {
        head: {
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no'
                }
            ],
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
        ComponentsListRenderer: path.join(__dirname, './styleguidist/config/components/ComponentsList/ComponentsListRenderer.tsx'),
        HeadingRenderer: path.join(__dirname, './styleguidist/config/components/Heading/HeadingRenderer.tsx'),
        LinkRenderer: path.join(__dirname, './styleguidist/config/components/Link/LinkRenderer.tsx'),
        LogoRenderer: path.join(__dirname, './styleguidist/config/components/Logo/LogoRenderer.tsx'),
        ParaRenderer: path.join(__dirname, './styleguidist/config/components/Para/ParaRenderer.tsx'),
        PathlineRenderer: path.join(__dirname, './styleguidist/config/components/Pathline/PathlineRenderer.tsx'),
        PlaygroundRenderer: path.join(__dirname, './styleguidist/config/components/Playground/PlaygroundRenderer.tsx'),
        ReactComponentRenderer: path.join(__dirname, './styleguidist/config/components/ReactComponent/ReactComponentRenderer.tsx'),
        SectionRenderer: path.join(__dirname, './styleguidist/config/components/Section/SectionRenderer.tsx'),
        SectionHeadingRenderer: path.join(__dirname, './styleguidist/config/components/SectionHeading/SectionHeadingRenderer.tsx'),
        StyleGuideRenderer: path.join(__dirname, './styleguidist/config/components/StyleGuide/StyleGuideRenderer.tsx'),
        TabButtonRenderer: path.join(__dirname, './styleguidist/config/components/TabButton/TabButton.tsx'),
        TableRenderer: path.join(__dirname, './styleguidist/config/components/Table/TableRenderer.tsx'),
        ToolbarButtonRenderer: path.join(__dirname, './styleguidist/config/components/ToolbarButton/ToolbarButton.tsx'),
        VersionRenderer: path.join(__dirname, './styleguidist/config/components/Version/VersionRenderer.tsx'),
        'slots/CodeTabButton': path.join(__dirname, './styleguidist/config/components/slots/CodeTabButton.tsx'),
        'slots/IsolateButton': path.join(__dirname, './styleguidist/config/components/slots/IsolateButton.tsx'),
        'slots/UsageTabButton': path.join(__dirname, './styleguidist/config/components/slots/UsageTabButton.tsx'),
        Markdown: path.join(__dirname, './styleguidist/config/components/CustomMarkdown/CustomMarkdown.tsx'),
        StyleGuide: path.join(__dirname, './styleguidist/config/components/StyleGuideWrapper.tsx'),
        TableOfContentsRenderer: path.join(__dirname, './styleguidist/config/components/TableOfContents/TableOfContentsRenderer.tsx'),
        Wrapper: path.join(__dirname, './styleguidist/config/components/CustomWrapper/CustomWrapper.tsx'),
    },
    getExampleFilename(componentPath) {
        return componentPath
            .replace('src', 'styleguidist')
            .replace(/\.(ts|tsx)$/, '.md');
    },
    propsParser,
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
    version,
};
