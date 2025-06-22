import React from 'react';
import {debounce} from '@sberbusiness/triplex/utils/debounce';
import {Suggest} from '@sberbusiness/triplex/components/Suggest/Suggest';

const getInitialState = () => ({
    value: undefined,
    options: [],
    tooltipHint: 'Введите не менее четырёх символов.',
    saveFilterOnFocus: true,
    isTooltipOpened: false,
    loading: false,
    query: '',
    page: 1,
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
            this.setState({options: [], tooltipHint: 'Введите не менее четырёх символов.'});
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
            this.setState({
                ...this.getDataFromCache(value.login),
                query: value.login,
                isTooltipOpened: false,
            });
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
                tooltipHint: 'Введите не менее четырёх символов.',
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
        const {items} = JSON.parse(this.request.response, (key, value) => {
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
        return `${prefix}?q=${encodeURIComponent(query)}+in:login&page=${page}&per_page=50`;
    }

    render() {
        const {value, options, tooltipHint, saveFilterOnFocus, isTooltipOpened, loading} = this.state;

        return (
            <Suggest
                value={value}
                options={options}
                placeholder="Начните вводить"
                tooltipHint={tooltipHint}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onFilter={this.handleFilter}
                onSelect={this.handleSelect}
                onScrollEnd={this.handleScrollEnd}
                saveFilterOnFocus={saveFilterOnFocus}
                isTooltipOpened={isTooltipOpened}
                showListSpinner={loading && options.length !== 0}
                loading={loading && options.length === 0}
            />
        );
    }
}

<SuggestAsyncExample />