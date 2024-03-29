import {SliderExtendedUtils} from '../SliderExtendedUtils';
import {ISliderExtendedDot, ISliderExtendedStep} from '../SliderExtendedContext';

describe('SliderExtendedUtils', () => {
    beforeEach(() => {
        allure.feature('SliderExtendedUtils');
    });

    it('getNormalizedValue returns normalized value when positive min and max', () => {
        const min = 0;
        const max = 100;

        expect(SliderExtendedUtils.getNormalizedValue({max, min, value: -10})).toBe(0);
        expect(SliderExtendedUtils.getNormalizedValue({max, min, value: 0})).toBe(0);
        expect(SliderExtendedUtils.getNormalizedValue({max, min, value: 50})).toBe(50);
        expect(SliderExtendedUtils.getNormalizedValue({max, min, value: 100})).toBe(100);
        expect(SliderExtendedUtils.getNormalizedValue({max, min, value: 110})).toBe(100);
    });

    it('getNormalizedValue returns normalized value when negative min', () => {
        const min = -10;
        const max = 10;

        expect(SliderExtendedUtils.getNormalizedValue({max, min, value: -10})).toBe(0);
        expect(SliderExtendedUtils.getNormalizedValue({max, min, value: 5})).toBe(75);
        expect(SliderExtendedUtils.getNormalizedValue({max, min, value: 0})).toBe(50);
        expect(SliderExtendedUtils.getNormalizedValue({max, min, value: 10})).toBe(100);
    });

    it('getNormalizedValue returns normalized value when negative min and max', () => {
        const min = -20;
        const max = -10;

        expect(SliderExtendedUtils.getNormalizedValue({max, min, value: -20})).toBe(0);
        expect(SliderExtendedUtils.getNormalizedValue({max, min, value: -15})).toBe(50);
        expect(SliderExtendedUtils.getNormalizedValue({max, min, value: -10})).toBe(100);
    });

    it('getNearestDotByValue returns nearest dot', () => {
        const dots: ISliderExtendedDot[] = [
            {changeValue: jest.fn(), id: '1', normalizedValue: 10, stepIndex: 0, value: 10},
            {changeValue: jest.fn(), id: '2', normalizedValue: 20, stepIndex: 1, value: 20},
        ];

        const value = 12;

        expect(SliderExtendedUtils.getNearestDotByValue({dots, value})).toEqual(dots[0]);
    });

    it('getNearestStep returns nearest step', () => {
        const steps: ISliderExtendedStep[] = [
            {normalizedValue: 10, value: 10},
            {normalizedValue: 20, value: 20},
        ];

        const normalizedValue = 12;

        expect(SliderExtendedUtils.getNearestStep({normalizedValue, steps})).toEqual(steps[0]);
    });

    it('getStepIndexByNormalizedValue returns step index', () => {
        const steps: ISliderExtendedStep[] = [
            {normalizedValue: 10, value: 10},
            {normalizedValue: 20, value: 20},
        ];

        const normalizedValue = 10;

        expect(SliderExtendedUtils.getStepIndexByNormalizedValue({normalizedValue, steps})).toBe(0);
    });
});
