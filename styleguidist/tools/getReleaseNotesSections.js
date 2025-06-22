/* eslint-env node */
const fs = require('fs');
const path = require('path');

// Путь к папке с release notes.
const RELEASE_NOTES_FOLDER_PATH = path.resolve(__dirname, '../../docs/release-notes');

/**
 * Возвращает конфиг секций Release Notes для Styleguidist.
 * @param notesPath - папка, в которой лежат release notes.
 */
const getReleaseNotesSections = (notesPath = RELEASE_NOTES_FOLDER_PATH) => {
    const notesInCurrentFolder = [];

    fs.readdir(path.resolve(__dirname, notesPath), (err, files) => {
        if (err) {
            throw new Error('Ошибка чтения директории с release notes.');
        }
        files.sort((a, b) => b.localeCompare(a, "en-US", {numeric: true}));
        for (const file of files) {
            if (fs.statSync(path.resolve(notesPath, file)).isDirectory()) {
                const nestedSection = {
                    name: file,
                    sections: getReleaseNotesSections(path.resolve(notesPath, file)),
                };
                notesInCurrentFolder.push(nestedSection);
            } else if (path.extname(file) === '.md') {
                notesInCurrentFolder.push({
                    name: file,
                    content: path.join(notesPath, file),
                });
            }
        }
    });

    return notesInCurrentFolder;
};

exports.getReleaseNotesSections = getReleaseNotesSections;
