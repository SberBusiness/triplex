```jsx
import {DropdownListContext} from '@sberbusiness/triplex/components/Dropdown/DropdownListContext';
import {decorate} from '@sberbusiness/triplex/utils/accountsUtils';
import {formatAmount} from '@sberbusiness/triplex/utils/amountUtils';

const [selected, setSelected] = React.useState();
const [activeDescendant, setActiveDescendant] = React.useState();

const targetRef = React.useRef(null);

const options = [
    {
        value: '40702810205275000000',
        label: decorate('40702810205275000000'),
        company: 'Общество с ограниченной ответственностью "Ромашка"',
        amount: '654675765',
        currency: 'RUB',
    },
    {
        value: '40702840205275000001',
        label: decorate('40702810205275000001'),
        company: 'Общество с ограниченной ответственностью "Рога и копыта"',
        amount: '654675765',
        currency: 'RUB',
    },
    {
        value: '40702978205275000002',
        label: decorate('40702810205275000002'),
        company: 'Общество с ограниченной ответственностью "Небесная канцелярия"',
        amount: '654675765',
        currency: 'RUB',
    },
    {
        value: '40702608205275000003',
        label: decorate('40702810205275000003'),
        company: 'Общество с ограниченной ответственностью "Розовый кролик"',
        amount: '654675765',
        currency: 'RUB',
    },
];

const styles = {
    option: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    label: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    company: {
        width: '50%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    amount: {
        width: '150px',
        textAlign: 'right',
        color: '#7d838a',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
};

const renderTarget = (props) => (
    <SelectExtended.Target
        placeholder="Выберите значение"
        label={
            selected && (
                <div title={`${decorate(selected.label)} ${selected.amount}`} style={styles.option}>
                    <span style={styles.label}>{decorate(selected.label)}</span>
                    <span style={styles.amount}>{formatAmount(selected.amount, 2)} {selected.currency}</span>
                </div>
            )
        }
        aria-controls="select-extended-dropdown-list"
        aria-activedescendant={activeDescendant}
        {...props}
        ref={targetRef}
    />
);

const renderDropdown = ({opened, setOpened, dropdownRef, ...rest}) => (
    <DropdownListContext.Provider value={{activeDescendant, setActiveDescendant}}>
        <SelectExtended.Dropdown
            {...rest}
            opened={opened}
            targetRef={targetRef}
            forwardedRef={dropdownRef}
            fixedWidth
        >
            <SelectExtended.Dropdown.List dropdownOpened={opened} id="select-extended-dropdown-list">
                {options.map((option) => (
                    <SelectExtended.Dropdown.List.Item
                        key={option.value}
                        id={option.value}
                        selected={selected && option.value === selected.value}
                        onSelect={() => {
                            setSelected(option);
                            setOpened(false);
                        }}
                    >
                        <div
                            title={`${option.company} ${option.label} ${decorate(option.label)}`}
                            style={styles.option}
                        >
                            <span style={styles.company}>{option.company}</span>
                            <span style={styles.label}>{decorate(option.value)}</span>
                            <span style={styles.amount}>{formatAmount(option.amount, 2)} {option.currency}</span>
                        </div>
                    </SelectExtended.Dropdown.List.Item>
                ))}
            </SelectExtended.Dropdown.List>
        </SelectExtended.Dropdown>
    </DropdownListContext.Provider>
);

<SelectExtended renderTarget={renderTarget} closeOnTab>
    {renderDropdown}
</SelectExtended>
```
