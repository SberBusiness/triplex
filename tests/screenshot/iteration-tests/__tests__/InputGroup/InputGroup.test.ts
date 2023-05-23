import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'InputGroup',
    [
        ['Input NumberInput MaskedInput Select', {inputOptions: [{id: 'index', value: '0'}]}],
        ['Select Input NumberInput MaskedInput', {inputOptions: [{id: 'index', value: '1'}]}],
        ['MaskedInput Select Input NumberInput', {inputOptions: [{id: 'index', value: '2'}]}],
        ['NumberInput MaskedInput Select Input', {inputOptions: [{id: 'index', value: '3'}]}],
    ],
    encodeURI('/#!/Screenshot tests/InputGroup')
);
