import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest('RadioYGroup', [
    ['selected', {checkboxOptions: [{id: 'disabled', checked: false}], inputOptions: [{id: 'value', value: 'third'}]}, 250],
    ['selected disabled', {checkboxOptions: [{id: 'disabled', checked: true}], inputOptions: [{id: 'value', value: 'third'}]}, 250],
]);
