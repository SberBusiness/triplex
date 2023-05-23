import React from 'react';
import {XStepper} from '@sberbusiness/triplex/desktop/components/XStepper/XStepper';
import {EStepStatus} from '@sberbusiness/triplex/desktop/components/Step/enums';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';

// Todo для тестирования скриншотами сделать что-то осмысленное и управляемое
const Step_0 = {
    step: 1,
    status: EStepStatus.SUCCESS,
    children: 'Success',
    label: 'Success',
    onClick: () => console.log('1'),
    active: false,
};
const Step_1 = {
    step: 2,
    status: EStepStatus.WAIT,
    children: 'Wait',
    label: 'Wait',
    onClick: () => console.log('2'),
    active: true,
};
const Step_2 = {
    step: 3,
    status: EStepStatus.WARNING,
    children: 'Warning',
    label: 'Warning',
    onClick: () => console.log('3'),
    active: false,
};
const Step_3 = {
    step: 4,
    status: EStepStatus.ERROR,
    children: 'Error',
    label: 'Error',
    onClick: () => console.log('4'),
    active: false,
};
const Step_4 = {
    step: 5,
    status: EStepStatus.DISABLED,
    children: 'Disabled',
    label: 'Disabled',
    onClick: () => console.log('5'),
    active: false,
};

const checkboxOptions = [];

const XStepperExample = () => {
    return (
        <>
            <ComponentOptions checkboxOptions={checkboxOptions} />
            <ComponentPreview>
                <XStepper steps={[Step_0, Step_1, Step_2, Step_3, Step_4]} />
            </ComponentPreview>
        </>
    );
};

// tslint:disable-next-line:no-unused-expression
<XStepperExample />;
