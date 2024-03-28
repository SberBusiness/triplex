import React from 'react';
import {AccordionForm} from '@sberbusiness/triplex/components/AccordionForm/AccordionForm';
import {EStepStatus} from '@sberbusiness/triplex/components/Step/enums';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const title = <AccordionForm.Item.Title>Заголовок аккордеона</AccordionForm.Item.Title>;

const items = [
    {
        id: 'accordion-form-item-1',
        status: EStepStatus.SUCCESS,
    },
    {
        id: 'accordion-form-item-2',
        status: EStepStatus.WAIT,
    },
    {
        id: 'accordion-form-item-3',
        status: EStepStatus.DISABLED,
    },
];

const renderAccordionFormItem = ({id, status}) => (
    <AccordionForm.Item key={id} id={id} title={title} status={status}>
        <AccordionForm.Item.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </AccordionForm.Item.Content>
        <AccordionForm.Item.Footer>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                Button Name
            </Button>
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>
                Button Name
            </Button>
        </AccordionForm.Item.Footer>
    </AccordionForm.Item>
);

<AccordionForm>
    {items.map((item) => renderAccordionFormItem(item))}
</AccordionForm>