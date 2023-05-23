import React from 'react';
import {Multiselect} from '@sberbusiness/triplex/desktop/components/Multiselect/Multiselect';
import {ETagSize} from '@sberbusiness/triplex/desktop/components/Tag/enums';
import {Tag} from '@sberbusiness/triplex/desktop/components/Tag/Tag';
import {TagGroup} from '@sberbusiness/triplex/desktop/components/Tag/TagGroup';
import {Input} from '@sberbusiness/triplex/desktop/components/Input/Input';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {ISelectExtendedTargetProvideProps} from '@sberbusiness/triplex/desktop/components/SelectExtended/SelectExtended';
import {IMultiselectDropdownProvideProps} from '@sberbusiness/triplex/desktop/components/Multiselect/components/MultiselectDropdown';
import {SpinnerWidget} from '@sberbusiness/triplex/desktop/components/SpinnerWidget/SpinnerWidget';
import {CheckboxTreeExtended} from '@sberbusiness/triplex/desktop/components/CheckboxTreeExtended/CheckboxTreeExtended';

interface ISelectExtendedExampleProps {
    disabled?: boolean;
    error?: boolean;
    loading?: boolean;
    hasSearchInput?: boolean;
}

/**
 * Свойства чекбокса, для построения дерева чекбоксов.
 */
interface ICheckboxData {
    id: string;
    label: string;
    checked: boolean;
    bulk?: boolean;
    children?: ICheckboxData[];
}

/**
 * Начальные значения дерева чекбоксов.
 */
const checkboxesInitial: ICheckboxData[] = [
    {
        id: '1',
        label: 'Группа 1',
        checked: false,
        bulk: false,
        children: [
            {
                id: '1-1',
                label: 'Значение 1-1',
                checked: false,
                bulk: false,
                children: [
                    {
                        id: '1-1-1',
                        label: 'Значение 1-1-1',
                        checked: false,
                    },
                    {
                        id: '1-1-2',
                        label: 'Значение 1-1-2',
                        checked: false,
                    },
                    {
                        id: '1-1-3',
                        label: 'Значение 1-1-3',
                        checked: false,
                    },
                ],
            },
            {
                id: '1-2',
                label: 'Значение 1-2',
                checked: false,
            },
        ],
    },
    {
        id: '2',
        label: 'Группа 2',
        checked: false,
        bulk: false,
        children: [
            {
                id: '2-1',
                label: 'Значение 2-1',
                checked: false,
            },
            {
                id: '2-2',
                label: 'Значение 2-2',
                checked: false,
            },
        ],
    },
    {
        id: '3',
        label: 'Значение 3',
        checked: true,
    },
];

/**
 * Рендерит tag с названием выбранного чекбокса.
 */
const renderTag = (tagId: string, tagText: string, onRemove: () => void) => (
    <Tag id={tagId} size={ETagSize.SM} onRemove={onRemove} key={tagId} onClick={(e) => e.stopPropagation()}>
        {tagText}
    </Tag>
);

/**
 * Рендерит tag вида "Выбрано X значения", в случае если выбрано более 3 значений.
 */
const renderCountInfoTag = (count: number, onRemove: () => void): JSX.Element => {
    const tagText = `Выбрано ${count} значения`;
    return renderTag('many', tagText, onRemove);
};

interface IMultiselectExampleState {
    // Текущее значение строки фильтрации.
    filter: string;
    // Массив id чекбоксов, подходящих под текущий фильтр.
    filteredCheckboxesId: string[];
    // Массив дерева чекбоксов.
    checkboxes: ICheckboxData[];
}

export class MultiselectExample extends React.PureComponent<ISelectExtendedExampleProps, IMultiselectExampleState> {
    state: IMultiselectExampleState = {
        filter: '',
        filteredCheckboxesId: [],
        checkboxes: checkboxesInitial,
    };

    targetRef = React.createRef<HTMLDivElement>();

    inputFilterNode: HTMLInputElement | null = null;

    prevOpenedDropdown = false;

    /**
     * Обход ICheckboxData[].
     */
    traverseCheckboxes = (checkboxes: ICheckboxData[], callback: (checkbox: ICheckboxData) => void): void => {
        checkboxes.forEach((checkbox) => {
            if (checkbox.children) this.traverseCheckboxes(checkbox.children, callback);
            callback(checkbox);
        });
    };

    // Обновление флага checked и bulk родителя, при изменении дочернего чекбокса.
    checkParentCheckboxes = (checkbox: ICheckboxData): void => {
        if (!checkbox.children) {
            return;
        }

        let checkedChildrenCount = 0;
        let bulkChildrenCount = 0;

        checkbox.children.forEach((c) => {
            c.checked ? checkedChildrenCount++ : '';
            c.bulk ? bulkChildrenCount++ : '';
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

    // Обновление флага checked дочерних чекбоксов, при изменении родителя.
    checkChildrenCheckboxes = (checkbox: ICheckboxData): void => {
        if (!checkbox.children) {
            return;
        }

        checkbox.children.forEach((c) => {
            c.checked = checkbox.checked;
            this.checkChildrenCheckboxes(c);
        });
    };

    /**
     * Обработчик изменения состояния чекбокса.
     */
    handleChange = (checkbox: ICheckboxData) => (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {checked} = event.target;
        const {checkboxes} = this.state;

        checkbox.checked = checkbox.bulk ? true : checked;

        // Обновление флага checked дочерних чекбоксов, при изменении родителя.
        this.checkChildrenCheckboxes(checkbox);

        // Обновление флага checked и bulk всех чекбоксов снизу вверх.
        this.traverseCheckboxes(checkboxes, this.checkParentCheckboxes);

        this.setState({checkboxes: [...checkboxes]});
    };

    /**
     * Рендерит чекбокс.
     */
    renderNode = (checkbox: ICheckboxData): React.ReactNode => {
        const {filteredCheckboxesId, filter} = this.state;

        // Текущий чекбокс не подходит под фильтр.
        if (filter && !filteredCheckboxesId.includes(checkbox.id)) {
            return null;
        }

        return (
            <CheckboxTreeExtended.Node
                id={checkbox.id}
                key={checkbox.id}
                checkbox={(props) => (
                    <CheckboxTreeExtended.Checkbox
                        {...props}
                        onChange={this.handleChange(checkbox)}
                        bulk={checkbox.bulk}
                        checked={checkbox.checked}
                    >
                        {checkbox.label}
                    </CheckboxTreeExtended.Checkbox>
                )}
            >
                {/* @ts-ignore */}
                {checkbox.children && checkbox.children.map((n) => this.renderNode(n))}
            </CheckboxTreeExtended.Node>
        );
    };

    /**
     * Снимает выбор с чекбокса. Вызывается при клике на крестик тега.
     */
    unselectCheckbox = (id: string): void => {
        const {checkboxes} = this.state;
        const nextCheckboxes = [...checkboxes];
        // Чекбокс, с которого сняли выбор.
        let changedCheckbox: ICheckboxData | undefined;

        this.traverseCheckboxes(nextCheckboxes, (checkbox: ICheckboxData) => {
            if (checkbox.id === id) {
                checkbox.checked = false;
                checkbox.bulk = false;
                changedCheckbox = checkbox;
            }
        });

        if (!changedCheckbox) {
            return;
        }

        this.checkChildrenCheckboxes(changedCheckbox);
        // Обновление флага checked и bulk всех чекбоксов снизу вверх.
        this.traverseCheckboxes(nextCheckboxes, this.checkParentCheckboxes);

        this.setState({checkboxes: nextCheckboxes});
    };

    /**
     * Снимает выбор со всех чекбоксов дерева. Вызывается при клике на крестик тега.
     */
    unselectAll = (): void => {
        const {checkboxes} = this.state;
        const nextCheckboxes = [...checkboxes];
        this.traverseCheckboxes(nextCheckboxes, (checkbox: ICheckboxData) => {
            checkbox.checked = false;
            checkbox.bulk = false;
        });

        this.setState({checkboxes: nextCheckboxes});
    };

    /**
     * Рендерит список тегов.
     */
    renderTags = (): React.ReactNode => {
        const {checkboxes} = this.state;
        const filtered: ICheckboxData[] = [];
        this.traverseCheckboxes(checkboxes, (checkbox: ICheckboxData) => {
            if (checkbox.checked && !checkbox.bulk && !checkbox.children) {
                filtered.push(checkbox);
            }
        });
        const length = filtered.length;

        if (length === 0) {
            return null;
        }

        if (length > 3) {
            return renderCountInfoTag(length, () => {
                this.unselectAll();
            });
        }

        return (
            <TagGroup size={ETagSize.SM}>
                {filtered.map((checkbox) =>
                    renderTag(checkbox.id, checkbox.label, () => {
                        this.unselectCheckbox(checkbox.id);
                    })
                )}
            </TagGroup>
        );
    };

    /**
     * Рендерит нескрываемую часть Select.
     */
    renderTarget = (props: ISelectExtendedTargetProvideProps): JSX.Element => {
        const {disabled, error} = this.props;

        return (
            <Multiselect.Target
                label={this.renderTags()}
                placeholder="Выберите значение"
                error={error}
                disabled={disabled}
                ref={this.targetRef}
                {...props}
            />
        );
    };

    /**
     * Обработчик нажатия - "Очистить фильтр".
     */
    handleClickClearFilter = (): void => {
        this.setState({filter: '', filteredCheckboxesId: []});
        this.unselectAll();
    };

    /**
     * Устанавливает ref на input.
     */
    private setInputFilterNode = (ref: HTMLInputElement) => (this.inputFilterNode = ref);

    /**
     * Рендерит dropdown-часть Select.
     */
    renderDropdown = (dropdownProps: IMultiselectDropdownProvideProps): React.ReactNode => {
        const {loading, hasSearchInput} = this.props;
        const {filter} = this.state;
        const {opened, targetRef, dropdownRef} = dropdownProps;

        if (!this.prevOpenedDropdown && dropdownProps.opened) {
            requestAnimationFrame(() => this.inputFilterNode?.focus());
        }

        this.prevOpenedDropdown = dropdownProps.opened;

        return (
            <Multiselect.Dropdown
                opened={opened}
                targetRef={targetRef}
                forwardedRef={dropdownRef}
                data-test-id="Example_Multiselect.Dropdown"
            >
                {hasSearchInput && (
                    <Multiselect.Dropdown.Header>
                        <Input value={filter} onChange={this.handleFilterChange} ref={this.setInputFilterNode} />
                    </Multiselect.Dropdown.Header>
                )}
                <div style={{position: 'relative'}}>
                    <Multiselect.Dropdown.Content>{this.renderDropdownContent()}</Multiselect.Dropdown.Content>
                    <Multiselect.Dropdown.Footer>
                        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM} onClick={() => dropdownProps.setOpened(false)}>
                            Выбрать
                        </Button>
                        <Button theme={EButtonTheme.LINK} size={EButtonSize.SM} onClick={this.handleClickClearFilter}>
                            Сбросить
                        </Button>
                    </Multiselect.Dropdown.Footer>
                    {loading && <SpinnerWidget />}
                </div>
            </Multiselect.Dropdown>
        );
    };

    /**
     * Рендерит дерево чекбоксов.
     */
    renderDropdownContent = (): React.ReactNode => {
        const {checkboxes, filter, filteredCheckboxesId} = this.state;
        const renderCheckboxes = !filter || (filteredCheckboxesId.length && filter);

        return renderCheckboxes ? (
            <CheckboxTreeExtended>
                {/* @ts-ignore */}
                {checkboxes.map((checkbox) => this.renderNode(checkbox))}
            </CheckboxTreeExtended>
        ) : (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>Ничего не найдено</div>
        );
    };

    /**
     * Обработчик изменения значения фильтра.
     */
    handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {checkboxes} = this.state;
        const {value} = e.target;

        const filteredCheckboxes: Array<ICheckboxData & {filtered?: boolean}> = [...checkboxes];
        const filteredCheckboxesId = new Set<string>();

        const setFilteredValue = (checkbox: ICheckboxData & {filtered?: boolean}) => {
            // Название чекбокса содержит подстроку фильтра.
            if (checkbox.label.toLowerCase().includes(value.toLowerCase())) {
                filteredCheckboxesId.add(checkbox.id);
            } else if (checkbox.children) {
                // Какой-то дочерний чекбокс добавлен содержит подстроку фильтра.
                const intersectionChildrenAndFiltered = checkbox.children
                    .map((c) => c.id)
                    .filter((id) => Array.from(filteredCheckboxesId).includes(id));
                intersectionChildrenAndFiltered.length && filteredCheckboxesId.add(checkbox.id);
            }
        };

        this.traverseCheckboxes(filteredCheckboxes, setFilteredValue);

        this.setState({
            filter: value,
            filteredCheckboxesId: Array.from(filteredCheckboxesId),
        });
    };

    render(): React.ReactNode {
        return (
            <Multiselect renderTarget={this.renderTarget} data-test-id="Example_Multiselect">
                {(dropdownProps: IMultiselectDropdownProvideProps) => this.renderDropdown(dropdownProps)}
            </Multiselect>
        );
    }
}
