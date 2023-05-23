import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'Spoiler',
    [
        ['Default', {}],
        ['Expanded', {checkboxOptions: [{id: 'expanded', checked: true}]}, 500],
    ],
    encodeURI('/#!/Screenshot tests/Spoiler/Spoiler')
);
