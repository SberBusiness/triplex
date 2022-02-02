import fs from 'fs';

// Проверяет существует ли директория.
const checkDirIfExistSync = (path: string): boolean => {
    try {
        // Директория существует.
        fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
        return true;
    } catch (err) {
        // Директория не существует.
        return false;
    }
};

export default checkDirIfExistSync;
