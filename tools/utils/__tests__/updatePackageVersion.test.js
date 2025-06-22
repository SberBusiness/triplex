/* eslint-env node */
const {getUpdatedVersion} = require('../updatePackageVersion');

describe('updatePackageVersion', () => {
    it('Проверка основных сегментов версии', () => {
        // Arrange
        const version = '5.0.0-beta.2';
        const segmentMajor = 'major';
        const segmentMinor = 'minor';
        const segmentPatch = 'patch';
        const emptyNewTag = 'empty';
        // Act
        const result1 = getUpdatedVersion(version, segmentMajor, emptyNewTag);
        const result2 = getUpdatedVersion(version, segmentMinor, emptyNewTag);
        const result3 = getUpdatedVersion(version, segmentPatch, emptyNewTag);
        // Assert
        expect(result1).toStrictEqual('6.0.0');
        expect(result2).toStrictEqual('5.1.0');
        expect(result3).toStrictEqual('5.0.1');
    });

    it('Обновляет тег', () => {
        // Arrange
        const version = '5.0.0-beta.2';
        const sameSegment = 'same';
        const newTagAlpha = 'alpha';
        const newTagBeta = 'beta';
        const newTagRc = 'rc';
        // Act
        const result1 = getUpdatedVersion(version, sameSegment, newTagAlpha);
        const result2 = getUpdatedVersion(version, sameSegment, newTagBeta);
        const result3 = getUpdatedVersion(version, sameSegment, newTagRc);
        // Assert
        expect(result1).toStrictEqual('5.0.0-alpha.0');
        expect(result2).toStrictEqual('5.0.0-beta.3');
        expect(result3).toStrictEqual('5.0.0-rc.0');
    });

    it('Обновляет сегмент и тег', () => {
        // Arrange
        const version = '4.2.0-rc.1';
        const segmentMajor = 'major';
        const newTagBeta = 'beta';
        // Act
        const result = getUpdatedVersion(version, segmentMajor, newTagBeta);
        // Assert
        expect(result).toStrictEqual('5.0.0-beta.0');
    });

    it('Оставляет тот же сегмент, но убирает тег (сценарий "Релиз")', () => {
        // Arrange
        const version = '5.0.0-rc.12';
        const sameSegment = 'same';
        const emptyNewTag = 'empty';
        // Act
        const result = getUpdatedVersion(version, sameSegment, emptyNewTag);
        // Assert
        expect(result).toStrictEqual('5.0.0');
    });
});
