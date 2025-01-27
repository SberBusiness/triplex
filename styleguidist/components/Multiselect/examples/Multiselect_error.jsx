import React, {useState, useRef} from 'react';
import {Multiselect} from '@sberbusiness/triplex/components/Multiselect/Multiselect';
import {Tag} from '@sberbusiness/triplex/components/Tag/Tag';
import {TagGroup} from '@sberbusiness/triplex/components/Tag/TagGroup';
import {ETagSize} from '@sberbusiness/triplex/components/Tag/enums';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {CheckboxTreeExtended} from '@sberbusiness/triplex/components/CheckboxTreeExtended/CheckboxTreeExtended';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {
    DropdownMobileBody,
    DropdownMobileClose,
    DropdownMobileFooter,
    DropdownMobileHeader,
    DropdownMobileInput,
} from '@sberbusiness/triplex/components/Dropdown/mobile';
import './multiselect-example.less';

/** Начальные значения дерева чекбоксов. */
const checkboxesInitial = [
    {
        id: 'multiselect-option-0',
        label: 'Все',
        checked: false,
        bulk: false,
        children: [
            {
                id: 'multiselect-option-1',
                label: 'Группа 1',
                checked: false,
                bulk: false,
                children: [
                    {
                        id: 'multiselect-option-1-1',
                        label: 'Значение 1-1',
                        checked: false,
                    },
                    {
                        id: 'multiselect-option-1-2',
                        label: 'Значение 1-2',
                        checked: false,
                    },
                    {
                        id: 'multiselect-option-1-3',
                        label: 'Значение 1-3',
                        checked: false,
                    },
                ],
            },
            {
                id: 'multiselect-option-2',
                label: 'Группа 2',
                checked: false,
                bulk: false,
                children: [
                    {
                        id: 'multiselect-option-2-1',
                        label: 'Значение 2-1',
                        checked: false,
                    },
                    {
                        id: 'multiselect-option-2-2',
                        label: 'Значение 2-2',
                        checked: false,
                    },
                ],
            },
            {
                id: 'multiselect-option-3',
                label: 'Значение 3',
                checked: false,
            },
        ],
    },
];

const [state, setState] = useState({
    checkboxes: checkboxesInitial,
    filter: '',
    filteredCheckboxesId: [],
});

const targetRef = useRef();

/** Рендерит tag с названием выбранного чекбокса. */
const renderTag = (tagId, tagText, onRemove) => (
    <Tag
        key={tagId}
        id={tagId}
        size={ETagSize.SM}
        onClick={(event) => event.stopPropagation()}
        onRemove={onRemove}
    >
        {tagText}
    </Tag>
);

/** Рендерит tag вида "Выбрано X значения", в случае если выбрано более 3 значений. */
const renderCountInfoTag = (count, onRemove) => {
    const tagText = `Выбрано ${count} значения`;
    return renderTag('many', tagText, onRemove);
};

/** Обход чекбоксов. */
const traverseCheckboxes = (checkboxes, callback) => {
    checkboxes.forEach((checkbox) => {
        if (checkbox.children) {
            traverseCheckboxes(checkbox.children, callback);
        }
        callback(checkbox);
    });
};

/** Обновление флага checked и bulk родителя, при изменении дочернего чекбокса. */
const checkParentCheckboxes = (checkbox) => {
    if (!checkbox.children) {
        return;
    }

    let checkedChildrenCount = 0;
    let bulkChildrenCount = 0;

    checkbox.children.forEach((child) => {
        child.checked ? checkedChildrenCount++ : '';
        child.bulk ? bulkChildrenCount++ : '';
    });

    // Все дочерние чекбоксы выбраны.
    if (checkedChildrenCount === checkbox.children.length) {
        checkbox.checked = true;
        checkbox.bulk = bulkChildrenCount !== 0;
    } else if (checkedChildrenCount > 0) {
        // Некоторые дочерние чекбоксы выбраны.
        checkbox.checked = true;
        checkbox.bulk = true;
    } else {
        // Все дочерние чекбоксы не выбраны.
        checkbox.checked = false;
    }
};

/** Обновление флага checked дочерних чекбоксов, при изменении родителя. */
const checkChildrenCheckboxes = (checkbox) => {
    if (!checkbox.children) {
        return;
    }

    checkbox.children.forEach((child) => {
        child.checked = checkbox.checked;
        checkChildrenCheckboxes(child);
    });
};

/** Обработчик изменения состояния чекбокса. */
const handleChange = (checkbox) => (event) => {
    const {checkboxes} = state;

    checkbox.checked = checkbox.bulk ? true : event.target.checked;

    // Обновление флага checked дочерних чекбоксов, при изменении родителя.
    checkChildrenCheckboxes(checkbox);

    // Обновление флага checked и bulk всех чекбоксов снизу вверх.
    traverseCheckboxes(checkboxes, checkParentCheckboxes);

    setState({...state, checkboxes: [...checkboxes]});
};

/** Рендерит чекбокс. */
const renderCheckboxNode = (checkbox) => {
    const {filteredCheckboxesId, filter} = state;

    // Текущий чекбокс не подходит под фильтр.
    if (filter && !filteredCheckboxesId.includes(checkbox.id)) {
        return null;
    }

    return (
        <CheckboxTreeExtended.Node
            key={checkbox.id}
            id={checkbox.id}
            checkbox={(props) => (
                <CheckboxTreeExtended.Checkbox
                    {...props}
                    bulk={checkbox.bulk}
                    checked={checkbox.checked}
                    onChange={handleChange(checkbox)}
                >
                    {checkbox.label}
                </CheckboxTreeExtended.Checkbox>
            )}
        >
            {checkbox.children && checkbox.children.map((child) => renderCheckboxNode(child))}
        </CheckboxTreeExtended.Node>
    );
};

/** Снимает выбор с чекбокса. Вызывается при клике на крестик тега. */
const unselectCheckbox = (id) => {
    const {checkboxes} = state;
    const nextCheckboxes = [...checkboxes];
    // Чекбокс, с которого сняли выбор.
    let changedCheckbox;

    traverseCheckboxes(nextCheckboxes, (checkbox) => {
        if (checkbox.id === id) {
            checkbox.checked = false;
            checkbox.bulk = false;
            changedCheckbox = checkbox;
        }
    });

    if (!changedCheckbox) {
        return;
    }

    checkChildrenCheckboxes(changedCheckbox);
    // Обновление флага checked и bulk всех чекбоксов снизу вверх.
    traverseCheckboxes(nextCheckboxes, checkParentCheckboxes);

    setState({...state, checkboxes: nextCheckboxes});
};

/** Снимает выбор со всех чекбоксов дерева. Вызывается при клике на крестик тега. */
const unselectAll = () => {
    const {checkboxes} = state;
    const nextCheckboxes = [...checkboxes];
    traverseCheckboxes(nextCheckboxes, (checkbox) => {
        checkbox.checked = false;
        checkbox.bulk = false;
    });

    setState({...state, checkboxes: nextCheckboxes});
};

/** Рендерит список тегов. */
const renderTags = () => {
    const {checkboxes} = state;
    const filtered = [];

    traverseCheckboxes(checkboxes, (checkbox) => {
        if (checkbox.checked && !checkbox.bulk && !checkbox.children) {
            filtered.push(checkbox);
        }
    });

    const length = filtered.length;

    if (length === 0) {
        return null;
    }

    if (length > 3) {
        return renderCountInfoTag(length, () => unselectAll());
    }

    return (
        <TagGroup size={ETagSize.SM}>
            {filtered.map((checkbox) =>
                renderTag(checkbox.id, checkbox.label, () => {
                    unselectCheckbox(checkbox.id);
                })
            )}
        </TagGroup>
    );
};

/** Рендерит нескрываемую часть Select. */
const renderTarget = (props) => (
    <Multiselect.Target
        label={renderTags()}
        placeholder="Выберите значение"
        {...props}
        ref={targetRef}
        error
    />
);

/** Обработчик нажатия - "Очистить фильтр". */
const handleClickClearFilter = () => {
    setState({...state, filter: '', filteredCheckboxesId: []});
    unselectAll();
};

/** Рендерит dropdown-часть Select. */
const renderDropdown = (dropdownProps) => {
    const {filter} = state;
    const {opened, setOpened, targetRef, dropdownRef} = dropdownProps;

    return (
        <Multiselect.Dropdown
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
                                onClick={handleClickClearFilter}
                            >
                                Сбросить
                            </Button>
                        </DropdownMobileFooter>
                    </>
                ),
            }}
        >
            <Multiselect.Dropdown.Header>
                <Input value={filter} placeholder="Начните вводить" onChange={handleFilterChange} />
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
                        onClick={handleClickClearFilter}
                    >
                        Сбросить
                    </Button>
                </Multiselect.Dropdown.Footer>
            </div>
        </Multiselect.Dropdown>
    );
};

/** Рендерит дерево чекбоксов. */
const renderDropdownContent = () => {
    const {checkboxes, filter, filteredCheckboxesId} = state;
    const renderCheckboxes = !filter || (filteredCheckboxesId.length && filter);

    return renderCheckboxes ? (
        <CheckboxTreeExtended>
            {checkboxes.map((checkbox) => renderCheckboxNode(checkbox))}
        </CheckboxTreeExtended>
    ) : (
        <div className="not-found">Ничего не найдено</div>
    );
};

/** Обработчик изменения значения фильтра. */
const handleFilterChange = (event) => {
    const {checkboxes} = state;
    const {value} = event.target;

    const filteredCheckboxes = [...checkboxes];
    const filteredCheckboxesId = new Set();

    const setFilteredValue = (checkbox) => {
        // Название чекбокса содержит подстроку фильтра.
        if (checkbox.label.toLowerCase().includes(value.toLowerCase())) {
            filteredCheckboxesId.add(checkbox.id);
        } else if (checkbox.children) {
            // Какой-то дочерний чекбокс добавлен содержит подстроку фильтра.
            const intersectionChildrenAndFiltered = checkbox.children
                .map((item) => item.id)
                .filter((id) => Array.from(filteredCheckboxesId).includes(id));
            intersectionChildrenAndFiltered.length && filteredCheckboxesId.add(checkbox.id);
        }
    };

    traverseCheckboxes(filteredCheckboxes, setFilteredValue);

    setState({...state, filter: value, filteredCheckboxesId: Array.from(filteredCheckboxesId)});
};

<Multiselect renderTarget={renderTarget} data-test-id="multiselect">
    {(dropdownProps) => renderDropdown(dropdownProps)}
</Multiselect>