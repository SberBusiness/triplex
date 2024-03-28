import React from 'react';
import {mount} from 'enzyme';
import {SliderExtended} from '../SliderExtended';

describe('SliderExtended', () => {
    beforeEach(() => {
        allure.feature('SliderExtended');
    });

    it('allows passing date attributes to the components', () => {
        const wrapper = mount(
            <SliderExtended min={-10} max={90} step={1} data-wrapper-id="wrapper">
                <SliderExtended.Dot value={40} onChange={jest.fn()} data-dot-id="dot" />
                <SliderExtended.Marks data-marks-id="marks">
                    <SliderExtended.Mark value={40} data-mark-id="mark">
                        40
                    </SliderExtended.Mark>
                </SliderExtended.Marks>
            </SliderExtended>
        );

        expect(wrapper.exists('[data-wrapper-id="wrapper"]')).toEqual(true);
        expect(wrapper.exists('[data-dot-id="dot"]')).toEqual(true);
        expect(wrapper.exists('[data-marks-id="marks"]')).toEqual(true);
        expect(wrapper.exists('[data-mark-id="mark"]')).toEqual(true);
    });

    it('renders dot at the correct position', () => {
        const wrapper = mount(
            <SliderExtended min={-10} max={90} step={1}>
                <SliderExtended.Dot value={40} onChange={jest.fn()} data-dot-id={1} />
            </SliderExtended>
        );

        expect(wrapper.find('[data-dot-id=1]').at(0).getDOMNode().getAttribute('style')).toMatch('left: 50%');
    });

    it('renders dot at the correct position where reverse is true', () => {
        const wrapper = mount(
            <SliderExtended min={0} max={100} step={1} reverse>
                <SliderExtended.Dot value={40} onChange={jest.fn()} data-dot-id={1} />
            </SliderExtended>
        );

        expect(wrapper.find('[data-dot-id=1]').at(0).getDOMNode().getAttribute('style')).toMatch('left: 60%');
    });

    it('renders mark at the correct position', () => {
        const wrapper = mount(
            <SliderExtended min={0} max={100} step={1}>
                <SliderExtended.Marks>
                    <SliderExtended.Mark value={40} data-mark-id={1}>
                        40
                    </SliderExtended.Mark>
                </SliderExtended.Marks>
            </SliderExtended>
        );

        expect(wrapper.find('[data-mark-id=1]').at(0).getDOMNode().getAttribute('style')).toMatch('left: 40%');
    });

    it('renders mark at the correct position where reverse is true', () => {
        const wrapper = mount(
            <SliderExtended min={0} max={100} step={1} reverse>
                <SliderExtended.Marks>
                    <SliderExtended.Mark value={40} data-mark-id={1}>
                        40
                    </SliderExtended.Mark>
                </SliderExtended.Marks>
            </SliderExtended>
        );

        expect(wrapper.find('[data-mark-id=1]').at(0).getDOMNode().getAttribute('style')).toMatch('left: 60%');
    });

    it('renders track at the correct position', () => {
        const wrapper = mount(
            <SliderExtended min={0} max={100} step={1}>
                <SliderExtended.Dot value={40} onChange={jest.fn()} />
                <SliderExtended.Track data-track-id={1} />
            </SliderExtended>
        );

        expect(wrapper.find('[data-track-id=1]').at(0).getDOMNode().getAttribute('style')).toMatch('left: 0%; right: 60%;');
    });

    it('renders track at the correct position where reverse is true', () => {
        const wrapper = mount(
            <SliderExtended min={0} max={100} step={1} reverse>
                <SliderExtended.Dot value={40} onChange={jest.fn()} />
                <SliderExtended.Track data-track-id={1} />
            </SliderExtended>
        );

        expect(wrapper.find('[data-track-id=1]').at(0).getDOMNode().getAttribute('style')).toMatch('left: 60%; right: 0%;');
    });

    it('renders track at the correct position when two dots', () => {
        const wrapper = mount(
            <SliderExtended min={0} max={100} step={1}>
                <SliderExtended.Dot value={20} onChange={jest.fn()} />
                <SliderExtended.Track data-track-id={1} />
                <SliderExtended.Dot value={70} onChange={jest.fn()} />
            </SliderExtended>
        );

        expect(wrapper.find('[data-track-id=1]').at(0).getDOMNode().getAttribute('style')).toMatch('left: 20%; right: 30%;');
    });

    it('renders track at the correct position when two dots and reverse is true', () => {
        const wrapper = mount(
            <SliderExtended min={0} max={100} step={1} reverse>
                <SliderExtended.Dot value={20} onChange={jest.fn()} />
                <SliderExtended.Track data-track-id={1} />
                <SliderExtended.Dot value={70} onChange={jest.fn()} />
            </SliderExtended>
        );

        expect(wrapper.find('[data-track-id=1]').at(0).getDOMNode().getAttribute('style')).toMatch('left: 30%; right: 20%;');
    });
});
