import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest('SliderExtended', [
    ['Default state'],
    [
        'Disabled state',
        {checkboxOptions: [{id: 'disabled', checked: true}],},
    ], [
        'With min value',
        {inputOptions: [{id: 'value', value: '0'}]},
        1000,
    ], [
        'With max value',
        {inputOptions: [{id: 'value', value: '100'}]},
        1000,
    ]
], encodeURI('/#!/Screenshot tests/SliderExtended/0'));
