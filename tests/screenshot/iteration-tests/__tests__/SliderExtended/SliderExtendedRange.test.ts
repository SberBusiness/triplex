import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest('SliderExtendedRange', [
    ['Default state'],
    [
        'Disabled state',
        {
            checkboxOptions: [{id: 'disabled', checked: true}],
        },
    ],
], encodeURI('/#!/Screenshot tests/SliderExtended/1'));
