```jsx
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {EDropdownDirection, EDropdownAlignment} from '@sberbusiness/triplex/desktop/components/Dropdown/Dropdown';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';
import {DropdownListContext} from '@sberbusiness/triplex/desktop/components/Dropdown/DropdownListContext';
import {uniqueId} from '@sberbusiness/triplex/common/utils/uniqueId';

const [opened, setOpened] = React.useState(false);
const [direction, setDirection] = React.useState(undefined);
const [alignment, setAlignment] = React.useState(undefined);
const [activeDescendant, setActiveDescendant] = React.useState();

const targetRef = React.useRef();
const dropdownRef = React.useRef();

const options = [
    {id: 'buttonDropdownExtendedOption1', label: 'Текст строки меню 1', onSelect: () => alert('Выбран пункт меню 1.')},
    {id: 'buttonDropdownExtendedOption2', label: 'Текст строки меню 2', onSelect: () => alert('Выбран пункт меню 2.')},
    {id: 'buttonDropdownExtendedOption3', label: 'Текст строки меню 3', onSelect: () => alert('Выбран пункт меню 3.')},
    {id: 'buttonDropdownExtendedOption4', label: 'Текст строки меню 4', onSelect: () => alert('Выбран пункт меню 4.')},
    {id: 'buttonDropdownExtendedOption5', label: 'Текст строки меню 5', onSelect: () => alert('Выбран пункт меню 5.')},
];

const renderControlPanel = () => (
    <ExampleControlPanel>
        <input type="checkbox" checked={opened} onChange={setOpened} data-label="Opened" />
        <select value={direction} onChange={(event) => setDirection(event.target.value)} data-label="Direction">
            {Object.values(EDropdownDirection).map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <select value={alignment} onChange={(event) => setAlignment(event.target.value)} data-label="Alignment">
            {Object.values(EDropdownAlignment).map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
    </ExampleControlPanel>
);

const renderButton = ({opened, setOpened}) => (
    <Button 
        theme={EButtonTheme.DOTS} 
        size={EButtonSize.MD} 
        onClick={() => setOpened(!opened)} 
        aria-haspopup="listbox"
        aria-expanded={opened}
        aria-controls="dropdown-list-id"
        aria-activedescendant={activeDescendant}
        ref={targetRef}
    >
        Button Name
    </Button>
);

const renderDropdown = ({opened, className}) => (
    <DropdownListContext.Provider value={{activeDescendant, setActiveDescendant}}>
        <ButtonDropdownExtended.Dropdown
            className={className}
            opened={opened}
            targetRef={targetRef}
            forwardedRef={dropdownRef}
            direction={direction}
            alignment={alignment}
        >
            <ButtonDropdownExtended.Dropdown.List dropdownOpened={opened} id="dropdown-list-id">
                {options.map((option, index) => (
                    <ButtonDropdownExtended.Dropdown.List.Item
                        key={index}
                        id={option.id}
                        onSelect={() => {
                            setOpened(false);
                            option.onSelect();
                        }}
                    >
                        {option.label}
                    </ButtonDropdownExtended.Dropdown.List.Item>
                ))}
            </ButtonDropdownExtended.Dropdown.List>
        </ButtonDropdownExtended.Dropdown>
    </DropdownListContext.Provider>
);

<>
    {renderControlPanel()}
    <ButtonDropdownExtended
        className="button-dropdown-extended"
        opened={opened}
        setOpened={setOpened}
        renderButton={renderButton}
        renderDropdown={renderDropdown}
        dropdownRef={dropdownRef}
    />
</>
```
