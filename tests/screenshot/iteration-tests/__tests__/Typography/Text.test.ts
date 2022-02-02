import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'Text',
    [
        ['General', {}],
        ['Secondary', {inputOptions: [{id: 'type', value: 'secondary'}]}],
        ['Success', {inputOptions: [{id: 'type', value: 'success'}]}],
        ['Warning', {inputOptions: [{id: 'type', value: 'warning'}]}],
        ['Danger', {inputOptions: [{id: 'type', value: 'danger'}]}],
        ['Disabled', {inputOptions: [{id: 'type', value: 'disabled'}]}],
        ['Light', {inputOptions: [{id: 'weight', value: 'light'}]}],
        ['Regular', {inputOptions: [{id: 'weight', value: 'regular'}]}],
        ['Semibold', {inputOptions: [{id: 'weight', value: 'semibold'}]}],
        ['Bold', {inputOptions: [{id: 'weight', value: 'bold'}]}],
        ['Extra', {inputOptions: [{id: 'line', value: 'extra'}]}],
        ['Underline', {checkboxOptions: [{id: 'underline', checked: true}]}],
        ['Strikethrough', {checkboxOptions: [{id: 'strikethrough', checked: true}]}],
        [
            'Underline and strikethrough',
            {
                checkboxOptions: [
                    {id: 'underline', checked: true},
                    {id: 'strikethrough', checked: true},
                ],
            },
        ],
    ],
    encodeURI('/#!/Screenshot tests/Typography/Text')
);
