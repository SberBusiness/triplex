### Custom view

```jsx
import {DropdownListContext} from '@sberbusiness/triplex/components/Dropdown/DropdownListContext';
import {SelectExtendedDropdownDefault} from '@sberbusiness/triplex/components/SelectExtended/components/SelectExtendedDropdownDefault';
import {decorate} from '@sberbusiness/triplex/utils/accountsUtils';
import {formatAmount} from '@sberbusiness/triplex/utils/amountUtils';
import {
    DropdownMobileBody,
    DropdownMobileClose,
    DropdownMobileHeader,
    DropdownMobileList,
    DropdownMobileListItem,
} from '@sberbusiness/triplex/components/Dropdown/mobile';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETextSize} from '@sberbusiness/triplex/components/Typography/enums';

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
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginBottom: '6px',
    },
    amount: {
        color: '#7d838a',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
};

const stylesAdditional = {
    optionDropdown: {
        ...styles.option,
        flexDirection: 'column',
    },
    labelDropdown: {
        ...styles.label,
        color: '#7d838a',
        marginBottom: '8px',
    },
    amountSelected: {
        ...styles.amount,
        width: '150px',
        textAlign: 'right',
    },
};

const renderTarget = (props) => (
    <SelectExtended.Target
        placeholder="Выберите значение"
        label={
            selected && (
                <div title={`${decorate(selected.label)} ${selected.amount}`} style={styles.option}>
                    <span style={styles.label}>{decorate(selected.label)}</span>
                    <span style={stylesAdditional.amountSelected}>
                        {formatAmount(selected.amount, 2)} {selected.currency}
                    </span>
                </div>
            )
        }
        aria-controls="select-extended-dropdown-custom"
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
            setOpened={setOpened}
            targetRef={targetRef}
            forwardedRef={dropdownRef}
            fixedWidth
            mobileViewProps={{
                children: (
                    <>
                        <DropdownMobileHeader closeButton={() => <DropdownMobileClose onClick={() => setOpened(false)} />}>
                            <Text tag="div" size={ETextSize.B1}>
                                Выберите значение
                            </Text>
                        </DropdownMobileHeader>
                        <DropdownMobileBody>
                            <DropdownMobileList>
                                {options.map((option) => {
                                    return (
                                        <DropdownMobileListItem
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
                                                style={stylesAdditional.optionDropdown}
                                            >
                                                <span style={styles.company}>{option.company}</span>
                                                <span style={stylesAdditional.labelDropdown}>{decorate(option.value)}</span>
                                                <span style={styles.amount}>
                                                    {formatAmount(option.amount, 2)} {option.currency}
                                                </span>
                                            </div>
                                        </DropdownMobileListItem>
                                    );
                                })}
                            </DropdownMobileList>
                        </DropdownMobileBody>
                    </>
                ),
            }}
        >
            <SelectExtended.Dropdown.List dropdownOpened={opened} id="select-extended-dropdown-custom">
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
                        <div title={`${option.company} ${option.label} ${decorate(option.label)}`} style={styles.option}>
                            <span style={styles.company}>{option.company}</span>
                            <span style={styles.label}>{decorate(option.value)}</span>
                            <span style={styles.amount}>
                                {formatAmount(option.amount, 2)} {option.currency}
                            </span>
                        </div>
                    </SelectExtended.Dropdown.List.Item>
                ))}
            </SelectExtended.Dropdown.List>
        </SelectExtended.Dropdown>
    </DropdownListContext.Provider>
);

<SelectExtended renderTarget={renderTarget} closeOnTab>
    {renderDropdown}
</SelectExtended>;
```

### Disabled state

```jsx
const [selected, setSelected] = React.useState();

const targetRef = React.useRef(null);

const options = [{value: 'i1', label: 'Первый'}];

const renderTarget = (props) => (
    <SelectExtended.Target
        disabled
        placeholder="Выберите значение"
        label={selected && <div>{selected.label}</div>}
        {...props}
        ref={targetRef}
    />
);

const renderDropdown = ({opened, setOpened, dropdownRef, ...rest}) => (
    <SelectExtended.Dropdown {...rest} opened={opened} targetRef={targetRef} forwardedRef={dropdownRef} fixedWidth>
        <SelectExtended.Dropdown.List dropdownOpened={opened}>
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
                    <div>{option.label}</div>
                </SelectExtended.Dropdown.List.Item>
            ))}
        </SelectExtended.Dropdown.List>
    </SelectExtended.Dropdown>
);

<SelectExtended renderTarget={renderTarget} closeOnTab>
    {renderDropdown}
</SelectExtended>;
```

### Error state

```jsx
import {DropdownListContext} from '@sberbusiness/triplex/components/Dropdown/DropdownListContext';
import {AlertContext} from '@sberbusiness/triplex/components/Alert/AlertContext/AlertContext';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {
    DropdownMobileBody,
    DropdownMobileClose,
    DropdownMobileHeader,
    DropdownMobileList,
    DropdownMobileListItem,
} from '@sberbusiness/triplex/components/Dropdown/mobile';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETextSize} from '@sberbusiness/triplex/components/Typography/enums';

const [selected, setSelected] = React.useState();
const [activeDescendant, setActiveDescendant] = React.useState();

const targetRef = React.useRef(null);

const options = [
    {value: 'i1', label: 'Первый'},
    {value: 'i2', label: 'Второй'},
    {value: 'i3', label: 'Третий'},
    {value: 'i4', label: 'Четвертый'},
    {value: 'i5', label: 'Пятый'},
    {value: 'i6', label: 'Шестой'},
    {value: 'i7', label: 'Седьмой'},
    {value: 'i8', label: 'Восьмой'},
    {value: 'i9', label: 'Девятый'},
    {value: 'i10', label: 'Десятый'},
];

const renderTarget = (props) => (
    <SelectExtended.Target
        error
        placeholder="Выберите значение"
        label={selected && <div>{selected.label}</div>}
        aria-controls="select-extended-dropdown-list-error"
        aria-activedescendant={activeDescendant}
        aria-invalid
        aria-errormessage="select-extender-error-id"
        {...props}
        ref={targetRef}
    />
);

const renderDropdown = ({opened, setOpened, dropdownRef, ...rest}) => (
    <DropdownListContext.Provider value={{activeDescendant, setActiveDescendant}}>
        <SelectExtended.Dropdown
            {...rest}
            opened={opened}
            setOpened={setOpened}
            targetRef={targetRef}
            forwardedRef={dropdownRef}
            fixedWidth
            mobileViewProps={{
                children: (
                    <>
                        <DropdownMobileHeader closeButton={() => <DropdownMobileClose onClick={() => setOpened(false)} />}>
                            <Text tag="div" size={ETextSize.B1}>
                                Выберите значение
                            </Text>
                        </DropdownMobileHeader>
                        <DropdownMobileBody>
                            <DropdownMobileList>
                                {options.map((option) => {
                                    return (
                                        <DropdownMobileListItem
                                            key={option.value}
                                            id={option.value}
                                            selected={selected && option.value === selected.value}
                                            onSelect={() => {
                                                setSelected(option);
                                                setOpened(false);
                                            }}
                                        >
                                            <div>{option.label}</div>
                                        </DropdownMobileListItem>
                                    );
                                })}
                            </DropdownMobileList>
                        </DropdownMobileBody>
                    </>
                ),
            }}
        >
            <SelectExtended.Dropdown.List dropdownOpened={opened} id="select-extended-dropdown-list-error">
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
                        <div>{option.label}</div>
                    </SelectExtended.Dropdown.List.Item>
                ))}
            </SelectExtended.Dropdown.List>
        </SelectExtended.Dropdown>
    </DropdownListContext.Provider>
);

<>
    <SelectExtended renderTarget={renderTarget} closeOnTab>
        {renderDropdown}
    </SelectExtended>
    <Gap size={8} />
    <AlertContext id="select-extender-error-id" type={EAlertType.ERROR}>
        Описание ошибки
    </AlertContext>
</>;
```

### With label

```jsx
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {DropdownListContext} from '@sberbusiness/triplex/components/Dropdown/DropdownListContext';
import {
    DropdownMobileBody,
    DropdownMobileClose,
    DropdownMobileHeader,
    DropdownMobileList,
    DropdownMobileListItem,
} from '@sberbusiness/triplex/components/Dropdown/mobile';
import {SelectExtendedDropdownDefault} from '@sberbusiness/triplex/components/SelectExtended/components/SelectExtendedDropdownDefault';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETextSize} from '@sberbusiness/triplex/components/Typography/enums';

const [selected, setSelected] = React.useState();
const [activeDescendant, setActiveDescendant] = React.useState();

const targetRef = React.useRef(null);

const options = [
    {value: 'i1', label: 'Яблоко'},
    {value: 'i2', label: 'Апельсин'},
    {value: 'i3', label: 'Лимон'},
    {value: 'i4', label: 'Груша'},
    {value: 'i5', label: 'Манго'},
    {value: 'i6', label: 'Авокадо'},
    {value: 'i7', label: 'Ананас'},
    {value: 'i8', label: 'Банан'},
    {value: 'i9', label: 'Гранат'},
    {value: 'i10', label: 'Киви'},
];

const renderTarget = (props) => (
    <SelectExtended.Target
        placeholder="Выберите значение"
        label={selected && <div>{selected.label}</div>}
        aria-labelledby="select-extended-label-id"
        aria-controls="select-extended-dropdown-list-with-label"
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
            setOpened={setOpened}
            targetRef={targetRef}
            forwardedRef={dropdownRef}
            fixedWidth
            mobileViewProps={{
                children: (
                    <>
                        <DropdownMobileHeader closeButton={() => <DropdownMobileClose onClick={() => setOpened(false)} />}>
                            <Text tag="div" size={ETextSize.B1}>
                                Выберите значение
                            </Text>
                        </DropdownMobileHeader>
                        <DropdownMobileBody>
                            <DropdownMobileList>
                                {options.map((option) => {
                                    return (
                                        <DropdownMobileListItem
                                            key={option.value}
                                            id={option.value}
                                            selected={selected && option.value === selected.value}
                                            onSelect={() => {
                                                setSelected(option);
                                                setOpened(false);
                                            }}
                                        >
                                            <div>{option.label}</div>
                                        </DropdownMobileListItem>
                                    );
                                })}
                            </DropdownMobileList>
                        </DropdownMobileBody>
                    </>
                ),
            }}
        >
            <SelectExtended.Dropdown.List dropdownOpened={opened} id="select-extended-dropdown-list-with-label">
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
                        <div>{option.label}</div>
                    </SelectExtended.Dropdown.List.Item>
                ))}
            </SelectExtended.Dropdown.List>
        </SelectExtended.Dropdown>
    </DropdownListContext.Provider>
);

<Field alignLabel>
    <Col size={3}>
        <Label>
            <Label.Text id="select-extended-label-id">Любимый фрукт</Label.Text>
        </Label>
    </Col>
    <Col size={9}>
        <SelectExtended renderTarget={renderTarget} closeOnTab>
            {renderDropdown}
        </SelectExtended>
    </Col>
</Field>;
```
