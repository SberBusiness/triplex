import React from 'react';
import {AccordionForm} from '@sberbusiness/triplex/components/AccordionForm/AccordionForm';
import {EStepStatus} from '@sberbusiness/triplex/components/Step/enums';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const [openItemId, setOpenItemId] = React.useState();

const title = <AccordionForm.Item.Title>Заголовок аккордеона</AccordionForm.Item.Title>;

const items = [
    {
        id: 'accordion-form-item-7',
        status: EStepStatus.SUCCESS,
    },
    {
        id: 'accordion-form-item-8',
        status: EStepStatus.ERROR,
    },
    {
        id: 'accordion-form-item-9',
        status: EStepStatus.DISABLED,
    },
];

const handleToggle = (open, id) => setOpenItemId(open ? id : undefined);

const renderAccordionFormItem = ({id, status}) => (
    <AccordionForm.Item key={id} id={id} title={title} status={status} opened={id == openItemId}>
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

<AccordionForm onToggle={handleToggle}>
    {items.map((item) => renderAccordionFormItem(item))}
</AccordionForm>