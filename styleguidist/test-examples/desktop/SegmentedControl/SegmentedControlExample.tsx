import React from 'react';
import {ESegmentedControlType, SegmentedControl} from '@sbbol/web-library/desktop/components/SegmentedControl/SegmentedControl';
import {
    TSegmentedControlMultipleOnSelect,
    TSegmentedControlMultipleValue,
} from '@sbbol/web-library/desktop/components/SegmentedControl/types';

interface ISegmentedControlExampleProps {
    disabled?: boolean;
    onSelect: TSegmentedControlMultipleOnSelect;
    segments: Array<{
        title: string;
        value: string;
    }>;
    value: TSegmentedControlMultipleValue;
}

export const SegmentedControlExample: React.FC<ISegmentedControlExampleProps> = ({disabled, onSelect, segments, value}) => (
    <SegmentedControl disabled={disabled} onSelect={onSelect} value={value} type={ESegmentedControlType.MULTIPLE}>
        {segments.map((segment) => (
            <SegmentedControl.Segment key={segment.value} value={segment.value}>
                {segment.title}
            </SegmentedControl.Segment>
        ))}
    </SegmentedControl>
);
