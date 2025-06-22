/* eslint-env node */
/** Создание объекта ошибки. */
function createErrorWithMessage(msg) {
    const helpMessage =
        'Пример правильного использования: npm run updatePackageVersion -- "-major -beta".\n' +
        'Первым аргументом необходимо передать сегмент поднятия версии: -major, -minor, -patch или -same что бы оставить текущей.\n' +
        'Вторым аргументом необходимо передать тег: -alpha, -beta, -rc, -hotfix или -empty что бы удалить тег.\n';
    return Error(`${msg}\n${helpMessage}`);
}

/** Основная функция, заменяющая версию. */
function getUpdatedVersion(version, segment, newTag) {
    const pattern = /(\d+).(\d+).(\d+)(?:-(alpha|beta|rc|hotfix).(\d+))?/g;
    let [match, major, minor, patch, tag, tagVersion] = pattern.exec(version);

    switch (segment) {
        case 'major': {
            major = Number(major) + 1;
            minor = 0;
            patch = 0;
            tagVersion = tag = '';
            break;
        }
        case 'minor': {
            minor = Number(minor) + 1;
            patch = 0;
            tagVersion = tag = '';
            break;
        }
        case 'patch': {
            patch = Number(patch) + 1;
            tagVersion = tag = '';
            break;
        }
        case 'same': {
            break;
        }
        default: {
            throw createErrorWithMessage(`Сегмент '${segment}' не распознан!`);
        }
    }

    if (!newTag) {
        throw createErrorWithMessage(`Не указан обязательный параметр новый tag!`);
    } else if (newTag === tag) {
        tagVersion = String(Number(tagVersion || 0) + 1);
    } else if (newTag === 'empty') {
        tagVersion = tag = '';
    } else {
        tag = newTag;
        tagVersion = '0';
    }

    const newTagSubstring = !!tag && !!tagVersion ? `-${tag}.${tagVersion}` : '';

    return `${major}.${minor}.${patch}${newTagSubstring}`;
}

module.exports = {getUpdatedVersion, createErrorWithMessage};
