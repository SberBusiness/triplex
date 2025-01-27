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
import {ISelectExtendedDropdownProvideProps} from '@sberbusiness/triplex/components/SelectExtended/SelectExtended';
import {EListItemStatus} from './listItemsData';

// Список опций мультиселекта Статус.
export const optionsMultiselectStatus = [
    {id: 'optionsMultiselectStatus-1', label: 'Создан', value: 'sozdan'},
    {
        id: 'optionsMultiselectStatus-2',
        label: 'Ошибка контроля',
        value: 'oshibkakontrolja',
    },
    {id: 'optionsMultiselectStatus-3', label: 'Отозван', value: 'otozvan'},
    {
        id: 'optionsMultiselectStatus-4',
        label: 'Запрошен отзыв',
        value: 'zaproshenotzyv',
    },
    {
        id: 'optionsMultiselectStatus-5',
        label: 'Импортирован',
        value: 'importirovan',
    },
    {id: 'optionsMultiselectStatus-6', label: 'Подписан', value: 'podpisan'},
];

const CHIP_LABEL = 'Статус';

interface IMultiselectStatusProps {
    // Массив статусов.
    value: Array<EListItemStatus>;
    // Обработчик изменения статусов.
    onChange: (value: Array<EListItemStatus>) => void;
}

const MultiselectStatus: React.FC<IMultiselectStatusProps> = ({onChange, value}) => {
    // Значение фильтра списка опций.
    const [filter, setFilter] = useState('');

    const handleChangeCheckboxAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = event.target;

        if (checked) {
            onChange([
                'sozdan',
                'oshibkakontrolja',
                'otozvan',
                'zaproshenotzyv',
                'importirovan',
                'podpisan',
            ] as EListItemStatus[]);
        } else {
            onChange([]);
        }
    };

    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {checked, value: newValue} = event.target;

        if (checked) {
            onChange([...value, newValue as EListItemStatus]);
        } else {
            onChange([...value.filter((v) => v !== newValue)]);
        }
    };

    const renderDropdownContent = () => {
        // Под фильтр не попадает ни одно значение.
        if (
            !optionsMultiselectStatus.some((option) =>
                option.label.toLowerCase().includes(filter.toLowerCase())
            )
        ) {
            return <div className="not-found">Ничего не найдено</div>;
        }

        return (
            <div style={{padding: '16px'}}>
                <CheckboxYGroup>
                    {'все статусы'.includes(filter.toLowerCase()) ? (
                        <Checkbox
                            id="optionsMultiselectStatus-0"
                            checked={value.length === 6}
                            key="optionsMultiselectStatus-0"
                            value="All"
                            onChange={handleChangeCheckboxAll}
                        >
                            Все статусы
                        </Checkbox>
                    ) : null}

                    {optionsMultiselectStatus.map((checkbox) => {
                        if (checkbox.label.toLowerCase().includes(filter.toLowerCase())) {
                            return (
                                <Checkbox
                                    id={checkbox.id}
                                    checked={value.includes(checkbox.value as EListItemStatus)}
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

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    const renderDropdownMultiselect = ({
        opened,
        setOpened,
        targetRef,
        dropdownRef,
    }: ISelectExtendedDropdownProvideProps) => (
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
                            <DropdownMobileInput
                                placeholder="Введите значение"
                                value={filter}
                                onChange={handleFilterChange}
                            />
                            <DropdownMobileClose onClick={() => setOpened(false)} />
                        </DropdownMobileHeader>
                        <DropdownMobileBody>{renderDropdownContent()}</DropdownMobileBody>
                        <DropdownMobileFooter>
                            <Button
                                theme={EButtonTheme.SECONDARY}
                                size={EButtonSize.MD}
                                onClick={() => setOpened(false)}
                            >
                                Выбрать
                            </Button>
                            <Button
                                theme={EButtonTheme.LINK}
                                size={EButtonSize.MD}
                                onClick={() => {
                                    setFilter('');
                                    onChange([]);
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
                    <Button
                        theme={EButtonTheme.SECONDARY}
                        size={EButtonSize.SM}
                        onClick={() => setOpened(false)}
                    >
                        Выбрать
                    </Button>
                    <Button
                        theme={EButtonTheme.LINK}
                        size={EButtonSize.SM}
                        onClick={() => setFilter('')}
                    >
                        Сбросить
                    </Button>
                </Multiselect.Dropdown.Footer>
            </div>
        </Multiselect.Dropdown>
    );

    const getLabel = () => {
        if (!value.length) {
            // Ничего не выбрано, отображается название чипса.
            return CHIP_LABEL;
        } else if (value.length === 1) {
            // Выбран один вариант, отображается выбранный вариант.
            return optionsMultiselectStatus.filter((option) => option.value === value[0])[0].label;
        }

        return `${CHIP_LABEL}: ${value.length}`;
    };

    return (
        <ChipMultiselect
            clearSelected={() => {
                onChange([]);
            }}
            selected={Boolean(value.length)}
            label={getLabel()}
        >
            {(dropdownProps) => renderDropdownMultiselect(dropdownProps)}
        </ChipMultiselect>
    );
};

export default MultiselectStatus;
