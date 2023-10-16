import {shallow} from 'enzyme';
import React from 'react';
import {ESegmentedControlType, SegmentedControl} from '@sberbusiness/triplex/components/SegmentedControl/SegmentedControl';
import {allure} from '@jest/unit/allure-report';

describe('SegmentedControl', () => {
    beforeEach(() => {
        allure.feature('SegmentedControl');
    });

    it('allows passing date attributes to the container', () => {
        const wrapper = shallow(
            <SegmentedControl data-custom-attr="container" type={ESegmentedControlType.SINGLE} onSelect={jest.fn()} value="1">
                <SegmentedControl.Segment value="1">Title</SegmentedControl.Segment>
            </SegmentedControl>
        );

        expect(wrapper.find('[data-custom-attr="container"]')).toHaveLength(1);
    });

    it('allows passing date attributes to children', () => {
        const wrapper = shallow(
            <SegmentedControl type={ESegmentedControlType.SINGLE} onSelect={jest.fn()} value="1">
                <SegmentedControl.Segment data-custom-attr="child" value="1">
                    Title
                </SegmentedControl.Segment>
                <SegmentedControl.Segment data-custom-attr="child" value="2">
                    Title
                </SegmentedControl.Segment>
            </SegmentedControl>
        );

        expect(wrapper.find('[data-custom-attr="child"]')).toHaveLength(2);
    });
});
