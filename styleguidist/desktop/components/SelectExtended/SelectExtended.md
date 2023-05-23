```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="SelectExtended"
    isMobileComponent={false} 
/>
```

```jsx
import {SelectExtended} from '@sberbusiness/triplex/desktop/components/SelectExtended/SelectExtended';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';
import {decorate} from '@sberbusiness/triplex/desktop/utils/accountsUtils';
import {formatAmount} from '@sberbusiness/triplex/desktop/utils/amountUtils';
import {DropdownListContext} from '@sberbusiness/triplex/desktop/components/Dropdown/DropdownListContext';

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
        width: '120px',
        textAlign: 'right',
        color: '#7d838a',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
};

const [loading, setLoading] = React.useState(false);
const [error, setError] = React.useState(false);
const [disabled, setDisabled] = React.useState(false);
const [activeDescendant, setActiveDescendant] = React.useState();
const [selected, setSelected] = React.useState(options[1]);
const targetRef = React.useRef(null);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <input type="checkbox" checked={loading} onChange={(event) => setLoading(event.target.checked)} data-label="Loading" />
        <input type="checkbox" checked={error} onChange={(event) => setError(event.target.checked)} data-label="Error" />
        <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} data-label="Disabled" />
    </ExampleControlPanel>
);


const renderTarget = (props) => (
    <SelectExtended.Target
        label={
            selected ? (
                <div style={styles.option} title={`${decorate(selected.label)} ${selected.amount}`}>
                    <span style={styles.label}>{decorate(selected.label)}</span>
                    <span style={styles.amount}>{formatAmount(selected.amount, 2)}</span>
                </div>
            ) : null
        }
        loading={loading}
        error={error}
        disabled={disabled}
        ref={targetRef}
        aria-controls="unique-id-for-accessibility"
        aria-activedescendant={activeDescendant}
        {...props}
    />
);

<>
    {renderControlPanel()}
    
    <SelectExtended renderTarget={renderTarget}>
        {(dropdownProps) => (
            <DropdownListContext.Provider value={{activeDescendant, setActiveDescendant}}>
                <SelectExtended.Dropdown
                    opened={dropdownProps.opened && !loading}
                    targetRef={targetRef}
                    forwardedRef={dropdownProps.dropdownRef}
                    fixedWidth={true}
                >
                    <SelectExtended.Dropdown.List dropdownOpened={dropdownProps.opened} id="unique-id-for-accessibility">
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
                                    <span style={styles.label}>{decorate(option.value)}</span>
                                    <span style={styles.amount}>{formatAmount(option.amount, 2)}</span>
                                </div>
                            </SelectExtended.Dropdown.List.Item>
                        ))}
                    </SelectExtended.Dropdown.List>
                </SelectExtended.Dropdown>
            </DropdownListContext.Provider>
        )}
    </SelectExtended>
</>
```