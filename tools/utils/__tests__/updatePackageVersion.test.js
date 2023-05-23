const updatePackageVersion = require('../updatePackageVersion');

describe('updatePackageVersion', () => {
    it('Проверка основных сегментов версии', () => {
        //Arrange
        const content = '"version": "5.0.0-beta.2"';
        const segmentMajor = 'major';
        const segmentMinor = 'minor';
        const segmentPatch = 'patch';
        const emptyNewTag = 'empty';
        //Act
        const result1 = updatePackageVersion.updatePackageVersionInContent(segmentMajor, emptyNewTag, content);
        const result2 = updatePackageVersion.updatePackageVersionInContent(segmentMinor, emptyNewTag, content);
        const result3 = updatePackageVersion.updatePackageVersionInContent(segmentPatch, emptyNewTag, content);
        //Assert
        expect(result1).toStrictEqual('"version": "6.0.0"');
        expect(result2).toStrictEqual('"version": "5.1.0"');
        expect(result3).toStrictEqual('"version": "5.0.1"');
    });

    it('Обновляет тег', () => {
        //Arrange
        const content = '"version": "5.0.0-beta.2"';
        const sameSegment = 'same';
        const newTagAlpha = 'alpha';
        const newTagBeta = 'beta';
        const newTagRc = 'rc';
        //Act
        const result1 = updatePackageVersion.updatePackageVersionInContent(sameSegment, newTagAlpha, content);
        const result2 = updatePackageVersion.updatePackageVersionInContent(sameSegment, newTagBeta, content);
        const result3 = updatePackageVersion.updatePackageVersionInContent(sameSegment, newTagRc, content);
        //Assert
        expect(result1).toStrictEqual('"version": "5.0.0-alpha.0"');
        expect(result2).toStrictEqual('"version": "5.0.0-beta.3"');
        expect(result3).toStrictEqual('"version": "5.0.0-rc.0"');
    });

    it('Обновляет сегмент и тег', () => {
        //Arrange
        const content = '"version": "4.2.0-rc.1"';
        const segmentMajor = 'major';
        const newTagBeta = 'beta';
        //Act
        const result = updatePackageVersion.updatePackageVersionInContent(segmentMajor, newTagBeta, content);
        //Assert
        expect(result).toStrictEqual('"version": "5.0.0-beta.0"');
    });

    it('Оставляет тот же сегмент, но убирает тег (сценарий "Релиз")', () => {
        //Arrange
        const content = '"version": "5.0.0-rc.12"';
        const sameSegment = 'same';
        const emptyNewTag = 'empty';
        //Act
        const result = updatePackageVersion.updatePackageVersionInContent(sameSegment, emptyNewTag, content);
        //Assert
        expect(result).toStrictEqual('"version": "5.0.0"');
    });
});
