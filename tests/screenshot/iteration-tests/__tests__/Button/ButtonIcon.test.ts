import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'ButtonIcon',
    [
        ['default'],
        ['focused', {checkboxOptions: [{id: 'focused', checked: true}]}],
        ['active', {checkboxOptions: [{id: 'active', checked: true}]}],
        ['focused circle', {checkboxOptions: [{id: 'focused', checked: true}], inputOptions: [{id: 'shape', value: 'circle'}]}],
    ],
    encodeURI('/#!/Screenshot tests/ButtonIcon')
);
