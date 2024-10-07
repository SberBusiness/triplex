```jsx
import React, {useState} from 'react';
import {ChipMultiselect} from '@sberbusiness/triplex/components/Chip';
import {Multiselect} from '@sberbusiness/triplex/components/Multiselect/Multiselect';
import {
    DropdownMobileBody,
    DropdownMobileClose,
    DropdownMobileFooter,
    DropdownMobileHeader,
    DropdownMobileInput,
} from '@sberbusiness/triplex/components/Dropdown/mobile';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {CheckboxYGroup} from '@sberbusiness/triplex/components/Checkbox/CheckboxYGroup';
import {Checkbox} from '@sberbusiness/triplex/components/Checkbox/Checkbox';

const optionsMultiselect = [
    {id: 'optionsMultiselect-1', label: 'Создан', value: 'i1'},
    {id: 'optionsMultiselect-2', label: 'Отправлен', value: 'i2'},
    {id: 'optionsMultiselect-3', label: 'Подписан', value: 'i3'},
    {id: 'optionsMultiselect-4', label: 'Ожидает', value: 'i4'},
    {id: 'optionsMultiselect-5', label: 'Черновик', value: 'i5'},
];

const CHIP_LABEL = 'Статус';

// Id выбранных чекбоксов.
const [checkedCheckboxesId, setCheckedCheckboxesId] = useState([]);
// Значение фильтра списка опций.
const [filter, setFilter] = useState('');

const handleChangeCheckbox = (event) => {
    const {checked, id} = event.target;

    if (checked) {
        setCheckedCheckboxesId((prevCheckedCheckboxesId) => [...prevCheckedCheckboxesId, id]);
    } else {
        setCheckedCheckboxesId((prevCheckedCheckboxesId) => [...prevCheckedCheckboxesId.filter((a) => a !== id)]);
    }
};

const renderDropdownContent = () => {
    // Под фильтр не попадает ни одно значение.
    if (!optionsMultiselect.some((option) => option.label.toLowerCase().includes(filter.toLowerCase()))) {
        return <div className="not-found">Ничего не найдено</div>;
    }

    return (
        <div style={{padding: '16px'}}>
            <CheckboxYGroup>
                {optionsMultiselect.map((checkbox) => {
                    if (checkbox.label.toLowerCase().includes(filter.toLowerCase())) {
                        return (
                            <Checkbox
                                id={checkbox.id}
                                checked={checkedCheckboxesId.includes(checkbox.id)}
                                key={checkbox.id}
                                value={checkbox.value}
                                onChange={handleChangeCheckbox}
                            >
                                {checkbox.label}
                            </Checkbox>
                        );
                    }
                })}
            </CheckboxYGroup>
        </div>
    );
};

const handleFilterChange = (event) => {
    setFilter(event.target.value);
};

const renderDropdownMultiselect = ({opened, setOpened, targetRef, dropdownRef}) => (
    <Multiselect.Dropdown
        fixedWidth={false}
        opened={opened}
        setOpened={setOpened}
        targetRef={targetRef}
        forwardedRef={dropdownRef}
        data-test-id="Example_Multiselect.Dropdown"
        mobileViewProps={{
            children: (
                <>
                    <DropdownMobileHeader>
                        <DropdownMobileInput placeholder="Введите значение" value={filter} onChange={handleFilterChange} />
                        <DropdownMobileClose onClick={() => setOpened(false)} />
                    </DropdownMobileHeader>
                    <DropdownMobileBody>{renderDropdownContent()}</DropdownMobileBody>
                    <DropdownMobileFooter>
                        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpened(false)}>
                            Выбрать
                        </Button>
                        <Button
                            theme={EButtonTheme.LINK}
                            size={EButtonSize.MD}
                            onClick={() => {
                                setFilter('');
                                setCheckedCheckboxesId([]);
                            }}
                        >
                            Сбросить
                        </Button>
                    </DropdownMobileFooter>
                </>
            ),
        }}
    >
        <Multiselect.Dropdown.Header>
            <Input placeholder="Введите значение" value={filter} onChange={handleFilterChange} />
        </Multiselect.Dropdown.Header>
        <div style={{position: 'relative'}}>
            <Multiselect.Dropdown.Content>{renderDropdownContent()}</Multiselect.Dropdown.Content>
            <Multiselect.Dropdown.Footer>
                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM} onClick={() => setOpened(false)}>
                    Выбрать
                </Button>
                <Button theme={EButtonTheme.LINK} size={EButtonSize.SM} onClick={() => setFilter('')}>
                    Сбросить
                </Button>
            </Multiselect.Dropdown.Footer>
        </div>
    </Multiselect.Dropdown>
);

const getLabel = () => {
    if (!checkedCheckboxesId.length) {
        // Ничего не выбрано, отображается название чипса.
        return CHIP_LABEL;
    } else if (checkedCheckboxesId.length === 1) {
        // Выбран один вариант, отображается выбранный вариант.
        return optionsMultiselect.filter(option => option.id === checkedCheckboxesId[0])[0].label;
    }
    
    return `${CHIP_LABEL}:${checkedCheckboxesId.length}`;
}

<ChipMultiselect
    clearSelected={() => {
        setCheckedCheckboxesId([]);
    }}
    selected={Boolean(checkedCheckboxesId.length)}
    label={getLabel()}
>
    {(dropdownProps) => renderDropdownMultiselect(dropdownProps)}
</ChipMultiselect>
```
