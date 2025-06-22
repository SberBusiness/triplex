const fs = require('fs');
const os = require('os');
const path = require('path');

// Категории иконок
const iconsCategories = [
    {
        name: 'Accent',
        short: ['Acc']
    },
    {
        name: 'Marketing',
        short: ['Mrk']
    },
    {
        name: 'Product',
        short: ['Prd', 'Prdx']
    },
    {
        name: 'Service',
        short: ['Srv', 'Srvx']
    },
    {
        name: 'Navigation',
        short: ['Nav']
    },
    {
        name: 'Statuses',
        short: ['Sts']
    },
    {
        name: 'Brand',
        short: ['Brd']
    },
    {
        name: 'Animated',
        short: ['Ani']
    },
    {
        name: 'Illustrative',
        short: ['Ill']
    },
];

// Категории иллюстраций
const illustrationsCategories = [
    {
        name: 'ScreenMarket',
        short: ['Scrmrkt']
    },
    {
        name: 'ScreenSystem',
        short: ['Scrsyst']
    },
];

const iconsFolder = path.resolve(__dirname, '../../node_modules/@sberbusiness/icons');
const illustrationsFolder = path.resolve(__dirname, '../../node_modules/@sberbusiness/illustrations');

const getCategoryIcons = folder =>
    fs.readdirSync(folder)
        .filter(file => file.endsWith('.d.ts'))
        .map(file => file.split('.')[0]);

const generateIndex = (folder, categories) => {
    const deprecated = [];
    const categoryIcons = getCategoryIcons(folder);

    const generateCategoryIndex = category => {
        const categoryIndex = categoryIcons
            .filter(iconName => {
                const iconData = fs.readFileSync(path.resolve(folder, `${iconName}.d.ts`), 'utf8');
                if (/@deprecated/.test(iconData)) {
                    deprecated.push(iconName);
                }
                return category.short.some(short => new RegExp(`${short}(Icon|Illustration)`, 'g').test(iconName))
            })
            .map(iconName => `export {${iconName}} from './${iconName}';`)
            .join(os.EOL);

        fs.writeFileSync(path.resolve(folder, `${category.name}Index.js`), categoryIndex, {encoding: 'utf-8'});
    };

    categories.forEach(generateCategoryIndex);

    fs.writeFileSync(path.resolve(folder, 'deprecated.json'), JSON.stringify(deprecated), {encoding: 'utf-8'});
};

generateIndex(iconsFolder, iconsCategories);
generateIndex(illustrationsFolder, illustrationsCategories);
