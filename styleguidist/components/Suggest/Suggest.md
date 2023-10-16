### Sync usage

```jsx
import {ComponentControlPanel} from "../common/ComponentControlPanel/ComponentControlPanel";

const [disabled, setDisabled] = React.useState(false);
const [error, setError] = React.useState(false);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={disabled} setChecked={setDisabled}>
            Disabled
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={error} setChecked={setError}>
            Error
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

const data = [
    {
        value: '1',
        label: 'Анапсиды',
        labelReactNode: (
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>Анапсиды</div>
                <div>0001231</div>
            </div>
        ),
    },
    {value: '2', label: 'Синапсиды'},
    {value: '3', label: 'Диапсиды'},
    {value: '4', label: 'В кладистике нет настолько длинных названий отрядов/подотрядов, чтобы вылезать за границы дозволенного'},
];

const SuggestSyncExample = () => {
    // Работа с данными.
    const [state, setState] = React.useState({
        options: data,
        value: null,
        isTooltipOpened: false,
    });

    const onFocus = () =>
        setState({
            ...state,
            options: data,
            isTooltipOpened: false,
        });

    const handleSelect = (value) =>
        setState({
            ...state,
            value,
            // Эмуляция внешнего обновления списка.
            options: [...state.options],
        });

    const filterFn = (query) => {
        const options = data.filter((item) => {
            const q = query.toLowerCase();
            const i = item.label.toLowerCase();

            return i.indexOf(q) !== -1;
        });

        setState({
            ...state,
            options,
            isTooltipOpened: options.length === 0,
        });
    };

    return (
        <Suggest
            data-test-id="sync-suggest"
            disabled={disabled}
            error={error}
            loading={state.isLoading}
            value={state.value}
            onFilter={filterFn}
            options={state.options}
            onFocus={onFocus}
            onSelect={handleSelect}
            saveFilterOnFocus={false}
            tooltipHint="Совпадений не найдено."
            isTooltipOpened={state.isTooltipOpened}
            placeholder="Начните вводить"
        />
    );
};

<>
    {renderControlPanel()}
    <SuggestSyncExample />
</>
```

### Async usage

```jsx
import {debounce} from '@sberbusiness/triplex/utils/debounce';

const getInitialState = () => ({
    query: '',
    page: 1,
    value: null,
    options: [],
    placeholder: 'Начните вводить',
    tooltipHint: 'Введите более трёх символов.',
    saveFilterOnFocus: true,
    isTooltipOpened: false,
    loading: false,
});

class SuggestAsyncExample extends React.Component {
    constructor(props) {
        super(props);
        this.CACHE = new Map();
        this.SEARCH_URL = 'https://api.github.com/search/users';
        this.request = new XMLHttpRequest();
        this.state = getInitialState();
        // Связывание контекста не имеет отношения к примеру.
        this.handleFilter = this.handleFilter.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleScrollEnd = this.handleScrollEnd.bind(this);
        this.handleAbort = this.handleAbort.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.isInCache = this.isInCache.bind(this);
        this.getDataFromCache = this.getDataFromCache.bind(this);
        this.sendRequest = debounce(this.sendRequest.bind(this), 1000);
    }

    componentDidMount() {
        this.request.onabort = this.handleAbort;
        this.request.onload = this.handleLoad;
    }

    componentWillUnmount() {
        this.request.abort();
        this.request = null;
    }

    handleFocus() {
        const {value} = this.state;
        
        if (!value) {
            this.setState({options: [], tooltipHint: 'Введите более трёх символов.'})
        } else if (!this.isInCache(value.login)) {
            this.setState({options: [], loading: true, page: 1}, () => {
                this.sendRequest(value.login, this.state.page);
            });
        }
    }

    handleBlur() {
        this.request.abort();
    }

    handleSelect(value) {
        if (value !== this.state.value) {
            this.setState({value, query: value.login});
        } else if (!value) {
            this.setState({query: '', isTooltipOpened: false, loading: false});
        } else if (this.isInCache(value.login)) {
            this.setState({...this.getDataFromCache(value.login), query: value.login, isTooltipOpened: false});
        } else if (this.state.loading) {
            this.setState({loading: false});
        }
    }

    handleFilter(query) {
        this.request.abort();

        if (query.length <= 3) {
            this.setState({
                query,
                options: [],
                isTooltipOpened: !!query.length,
                tooltipHint: 'Введите более трёх символов.',
                loading: false,
            });
        } else if (this.isInCache(query)) {
            this.setState({query, ...this.getDataFromCache(query), loading: false});
        } else {
            this.setState({query, options: [], isTooltipOpened: false, loading: true, page: 1}, () => {
                this.sendRequest(query, this.state.page);
            });
        }
    }

    handleScrollEnd() {
        const {query} = this.state;

        this.setState(
            (prev) => ({loading: true, page: prev.page + 1}),
            () => this.sendRequest(query, this.state.page)
        );
    }

    handleAbort() {
        this.setState({loading: false});
    }

    handleLoad() {
        const {items, total_count} = JSON.parse(this.request.response, (key, value) => {
            if (value.login) {
                value.label = value.login;
            }

            return value;
        });

        this.setState((prevState) => {
            const {query, options, page} = prevState;
            const data = {page, loading: false};

            data.options = this.isInCache(query) ? [...options, ...items] : items;
            data.isTooltipOpened = data.options.length === 0;

            if (data.isTooltipOpened) {
                data.tooltipHint = 'Совпадений не найдено.';
            }

            this.setDataToCache(query, data);

            return {...prevState, ...data};
        });
    }

    isInCache(key) {
        return this.CACHE.has(key);
    }

    getDataFromCache(key) {
        return this.CACHE.get(key);
    }

    setDataToCache(key, data) {
        this.CACHE.set(key, data);
    }

    sendRequest(query, page) {
        if (this.state.loading && query === this.state.query) {
            this.request.open('GET', this.getUrl(this.SEARCH_URL, query, page), true);
            this.request.send();
        }
    }

    getUrl(prefix, query, page) {
        return `${prefix}?q=${query}+in:login&page=${page}&per_page=50`;
    }

    render() {
        const {loading, options, query, page, ...rest} = this.state;

        return (
            <Suggest
                {...rest}
                onFilter={this.handleFilter}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onSelect={this.handleSelect}
                onScrollEnd={this.handleScrollEnd}
                options={options}
                loading={loading && options.length === 0}
                showListSpinner={loading && options.length !== 0}
            />
        );
    }
}

<SuggestAsyncExample />
```
