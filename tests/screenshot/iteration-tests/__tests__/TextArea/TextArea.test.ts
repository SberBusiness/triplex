import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'TextArea',
    [
        ['Default state'],
        ['Value state', {inputOptions: [{id: 'value', value: 'Text'}]}],
        ['Error state', {checkboxOptions: [{id: 'error', checked: true}]}],
        ['Error state', {checkboxOptions: [{id: 'error', checked: true}]}],
        ['Disabled state', {checkboxOptions: [{id: 'disabled', checked: true}]}],
        ['Width restricted cols attr', {checkboxOptions: [{id: 'cols', checked: true}]}],
    ],
    encodeURI('/#!/Screenshot tests/TextArea')
);
