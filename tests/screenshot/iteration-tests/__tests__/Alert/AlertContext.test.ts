import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'AlertContext',
    [
        ['info', {}],
        ['warning', {inputOptions: [{id: 'type', value: 'warning'}]}],
        ['error', {inputOptions: [{id: 'type', value: 'error'}]}],
        ['system', {inputOptions: [{id: 'type', value: 'system'}]}],
    ],
    encodeURI('/#!/Screenshot tests/AlertContext')
);
