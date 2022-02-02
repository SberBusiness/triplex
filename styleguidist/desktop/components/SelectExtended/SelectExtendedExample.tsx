import React, {useState} from 'react';
import {
    ISelectExtendedDropdownProvideProps,
    ISelectExtendedTargetProvideProps,
    SelectExtended,
} from '@sbbol/web-library/desktop/components/Select/SelectExtended';
import {decorate} from '@sbbol/web-library/desktop/utils/accountsUtils';

interface ISelectExtendedExampleProps {
    disabled?: boolean;
    error?: boolean;
    loading?: boolean;
    // При передаче показывается placeholder вместо label.
    placeholder?: React.ReactNode;
    topOrientation: boolean;
}

const styles = {
    option: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    company: {
        overflow: 'hidden',
        whiteSpace: 'nowrap' as 'nowrap',
        textOverflow: 'ellipsis',
        width: '40%',
        paddingRight: '4px',
        color: '#7d838a',
    },
    amount: {
        flexGrow: 1,
        textAlign: 'right' as 'right',
        color: '#7d838a',
    },
    topOrientation: {
        top: 'auto',
        bottom: '36px',
    },
};

const options = [
    {
        value: '40702810205275000000',
        label: '40702810205275000000',
        company: 'Общество с ограниченной ответственностью "Ромашка"',
        amount: '1000000',
        currency: 'RUB',
    },
    {
        value: '40702840205275000001',
        label: '40702840205275000001',
        company: 'Общество с ограниченной ответственностью "Рога и копыта"',
        amount: '1000000000',
        currency: 'USD',
    },
    {
        value: '40702978205275000002',
        label: '40702978205275000002',
        company: 'Общество с ограниченной ответственностью "Небесная канцелярия"',
        amount: '99012385.34',
        currency: 'EUR',
    },
    {
        value: '40702608205275000003',
        label: '40702608205275000003',
        company: 'Общество с ограниченной ответственностью "Розовый кролик"',
        amount: '200000',
        currency: 'PHP',
    },
];

export const SelectExtendedExample: React.FC<ISelectExtendedExampleProps> = ({disabled, error, loading, placeholder, topOrientation}) => {
    const [selected, setSelected] = useState(options[1]);

    const renderTarget = (props: ISelectExtendedTargetProvideProps) => {
        return (
            <SelectExtended.Target
                label={
                    selected ? (
                        <div style={styles.option} title={`${decorate(selected.label)} ${selected.amount}`}>
                            <span style={styles.company}>{decorate(selected.label)}</span>
                            <span style={styles.amount}>{selected.amount}</span>
                        </div>
                    ) : (
                        ''
                    )
                }
                disabled={disabled}
                error={error}
                loading={loading}
                placeholder={placeholder}
                {...props}
            />
        );
    };

    return (
        <SelectExtended renderTarget={renderTarget}>
            {(dropdownProps: ISelectExtendedDropdownProvideProps) => (
                <SelectExtended.Dropdown style={topOrientation ? styles.topOrientation : undefined} {...dropdownProps}>
                    <SelectExtended.Dropdown.List dropdownOpened={dropdownProps.opened}>
                        {options.map((option) => (
                            <SelectExtended.Dropdown.List.Item
                                key={option.value}
                                id={option.value}
                                selected={option.value === selected.value}
                                onSelect={() => {
                                    setSelected(option);
                                    dropdownProps.setOpened(false);
                                }}
                            >
                                <div style={styles.option} title={`${option.company} ${option.label} ${decorate(option.label)}`}>
                                    <span style={styles.company}>{option.company}</span>
                                    <span>{decorate(option.label)}</span>
                                    <span style={styles.amount}>{decorate(option.label)}</span>
                                </div>
                            </SelectExtended.Dropdown.List.Item>
                        ))}
                    </SelectExtended.Dropdown.List>
                </SelectExtended.Dropdown>
            )}
        </SelectExtended>
    );
};
