import React from 'react';
import {AccordionForm} from '@sberbusiness/triplex/components/AccordionForm/AccordionForm';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const title = <AccordionForm.Item.Title>Заголовок аккордеона</AccordionForm.Item.Title>;

const handleRemove = (id) => document.getElementById(id).remove();

<div style={{paddingRight: 20}}>
    <AccordionForm>
        <AccordionForm.Item id="accordion-form-item-removable" title={title} onRemove={handleRemove}>
            <AccordionForm.Item.Content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                est laborum.
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
    </AccordionForm>
</div>