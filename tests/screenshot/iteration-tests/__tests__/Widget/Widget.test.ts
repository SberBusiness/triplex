import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest('Widget', [
    [
        'Closed state',
        {checkboxOptions: [{id: 'isOpen', checked: false}]},
    ], [
        'With Header Controls',
        {checkboxOptions: [{id: 'showHeaderControls', checked: true}]},
    ], [
        'Opened state',
        {checkboxOptions: [{id: 'isOpen', checked: true}]},
        1000
    ], [
        'Static Widget',
        {checkboxOptions: [{id: 'isStatic', checked: true}]},
        1000
    ],
], encodeURI('/#!/Screenshot tests/Widget'));
