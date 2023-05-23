```jsx noeditor
import ComponentStylesDependency from '../../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="Suggest"
    isMobileComponent={false}
/>
```

```jsx
import {SuggestCustom} from '@sberbusiness/triplex/desktop/components/Suggest/SuggestCustom';
import {debounce} from '@sberbusiness/triplex/desktop/utils/debounce';

const getInitialState = () => ({
    query: '',
    page: 1,
    value: null,
    options: [],
    placeholder: 'Начните вводить',
    tooltipHint: 'Введите более трёх символов',
    saveFilterOnFocus: true,
    isTooltipOpened: false,
    loading: false,
    showListSpinner: false,
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
            this.setState({options: [], tooltipHint: 'Введите более трех символов'})
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
                tooltipHint: 'Введите более трех символов',
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
            data.showListSpinner = data.options.length !== total_count && !data.isTooltipOpened;

            if (data.isTooltipOpened) {
                data.tooltipHint = 'Совпадений не найдено';
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
        const {query, page, ...rest} = this.state;

        return (
            <SuggestCustom
                {...rest}
                onFilter={this.handleFilter}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onSelect={this.handleSelect}
                onScrollEnd={this.handleScrollEnd}
                renderTargetLabel={this.renderTargetLabel}
                renderDropdownItemLabel={this.renderDropdownItemLabel}
            />
        );
    }

    renderTargetLabel({onFocus, onClick, className, value, placeholder}) {
        return (
            <input
                className={className}
                value={value ? value.login : placeholder}
                readOnly={true}
                onFocus={onFocus}
                onClick={onClick}
            />
        );
    }

    renderDropdownItemLabel(props) {
        return props.option.login;
    }
}

<SuggestAsyncExample />
```
