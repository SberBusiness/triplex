## SBSansUI

Шрифт SBSansUI не входит в базовую сборку стилей библиотеки компонентов. 
Его можно добавить вручную:

```html
body {
    font-family: 'SBSansUI', sans-serif;
}

@font-face {
    font-family: 'SBSansUI';
    src:
        url('../fonts/SBSansUI/SBSansUI-Light.woff2') format('woff2'),
        url('../fonts/SBSansUI/SBSansUI-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
}

@font-face {
    font-family: 'SBSansUI';
    src:
        url('../fonts/SBSansUI/SBSansUI-Regular.woff2') format('woff2'),
        url('../fonts/SBSansUI/SBSansUI-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'SBSansUI';
    src:
        url('../fonts/SBSansUI/SBSansUI-Semibold.woff2') format('woff2'),
        url('../fonts/SBSansUI/SBSansUI-Semibold.woff') format('woff');
    font-weight: 500;
    font-style: normal;
}
```