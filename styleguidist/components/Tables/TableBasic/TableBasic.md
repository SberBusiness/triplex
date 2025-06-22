```jsx {"file": "./examples/TableBasic_default.jsx"}
```

### Empty (no data)

```jsx {"file": "./examples/TableBasic_empty.jsx"}
```

### Loading state

```jsx {"file": "./examples/TableBasic_loading.jsx"}
```

### Sorting by sum

```jsx {"file": "./examples/TableBasic_sorting.jsx"}
```

### Pagination

```jsx {"file": "./examples/TableBasic_pagination.jsx"}
```

### TableFooter (row selection)

```jsx {"file": "./examples/TableBasic_selection.jsx"}
```

### TabsLine

```jsx {"file": "./examples/TableBasic_TabsLine.jsx"}
```

### FilterPanel (Quick Filter)

```jsx {"file": "./examples/TableBasic_QuickFilter.jsx"}
```

### FilterPanel (Added Filter)

```jsx {"file": "./examples/TableBasic_FilterPanel.jsx"}
```

### Базовая настройка колонок

Реализуется через компоненты TableBasicSettings, ColumnSettings и CheckboxYGroup.
Отображение колонки зависит от свойства hidden в объекте, описывающем column.

```jsx {"file": "./examples/TableBasic_SettingsColumnExample.jsx"}
```

### Расширенная настройка колонок

Позволяет скрывать/показывать не только колонки, но и элементы внутри колонок.
Реализуется через компоненты TableBasicSettings, ColumnSettings и CheckboxTree.
Отображение колонки зависит от свойства hidden в объекте, описывающем column.
Логика отображения элементов внутри колонок всегда кастомная, это только один из возможных вариантов.

```jsx {"file": "./examples/TableBasic_SettingsColumnExtendedExample.jsx"}
```

### Таблица с объединенными ячейками

```jsx {"file": "./examples/TableBasic_span.jsx"}
```

### Horizontal scroll

Для корректного отображения скролла необходимо обернуть компонент MasterTable.TableBasic в элемент со свойством overflow: auto hidden.

```jsx {"file": "./examples/TableBasic_horizontal_scroll.jsx"}
```
