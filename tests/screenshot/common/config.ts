// URL сервиса скриншотного тестирования. При локальном тестировании - http://localhost:58002.
const screenshotServerURL = process.env.SCREENSHOT_SERVICE_HOST ? `http://${process.env.SCREENSHOT_SERVICE_HOST}:${process.env.SCREENSHOT_SERVICE_PORT}` : 'http://localhost:58002';
// URL сервера Styleguidist. При локальном тестировании - http://host.docker.internal:6060.
const styleguidistServerURL = process.env.STYLEGUIDIST_HOST ? `http://${process.env.STYLEGUIDIST_HOST}:${process.env.STYLEGUIDIST_PORT}` : 'http://host.docker.internal:6060';

const config = {
    pictureStorage: {
        iterationTestsImagesFolder: '../iteration-tests/images',
    },
    screenshotServerURL,
    styleguidist: {
        defaultSelector: '.component-preview',
        serverURL: styleguidistServerURL,
    },
};

export default config;
