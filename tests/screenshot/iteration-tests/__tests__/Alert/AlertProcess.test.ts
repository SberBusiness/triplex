import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'AlertProcess',
    [
        ['AlertProcess Info default icon', {inputOptions: [{id: 'type', value: 'info'}]}],
        ['AlertProcess Warning default icon', {inputOptions: [{id: 'type', value: 'warning'}]}],
        ['AlertProcess Error default icon', {inputOptions: [{id: 'type', value: 'error'}]}],
        ['AlertProcess Feature default icon', {inputOptions: [{id: 'type', value: 'feature'}]}],
        [
            'AlertProcess Info custom icon',
            {checkboxOptions: [{id: 'customIcon', checked: true}], inputOptions: [{id: 'type', value: 'info'}]},
        ],
        [
            'AlertProcess Warning custom icon',
            {checkboxOptions: [{id: 'customIcon', checked: true}], inputOptions: [{id: 'type', value: 'warning'}]},
        ],
        [
            'AlertProcess Error custom icon',
            {checkboxOptions: [{id: 'customIcon', checked: true}], inputOptions: [{id: 'type', value: 'error'}]},
        ],
        [
            'AlertProcess Future custom icon',
            {checkboxOptions: [{id: 'customIcon', checked: true}], inputOptions: [{id: 'type', value: 'feature'}]},
        ],
    ],
    encodeURI('/#!/Screenshot tests/AlertProcess')
);
