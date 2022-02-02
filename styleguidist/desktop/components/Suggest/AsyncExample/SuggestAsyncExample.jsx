import React from 'react';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {Gap} from '@sbbol/web-library/desktop/components/Gap/Gap';
import {SuggestCustom} from '@sbbol/web-library/desktop/components/Suggest/SuggestCustom';
import {debounce} from '@sbbol/web-library/desktop/utils/debounce';

const getInitialState = () => ({
    loading: false,
    error: false,
    disabled: false,
    saveOnFocus: true,
    notFound: false,
    isEndOfList: false,
    isTooltipOpened: false,
    options: [],
    value: null,
    queryString: '',
    placeholder: 'Начните вводить',
    page: 1,
});
class SuggestAsyncExample extends React.Component {
    constructor(props) {
        super(props);
        this.CACHE = new Map();
        this.SEARCH_URI = 'https://api.github.com/search/users';
        this.request = new XMLHttpRequest();
        this.state = getInitialState();
        // связывание контекста не имеет отношения к примеру.
        this.handleFilter = this.handleFilter.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleScrollEnd = this.handleScrollEnd.bind(this);
        this.handleAbort = this.handleAbort.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.isInCache = this.isInCache.bind(this);
        this.getOptionsFromCache = this.getOptionsFromCache.bind(this);
        this.getData = debounce(this.getData.bind(this), 1000);
    }
    componentWillUnmount() {
        this.request.abort();
        this.request = null;
    }
    componentDidMount() {
        this.request.onabort = this.handleAbort;
        this.request.onload = this.handleLoad;
    }
    handleFocus() {
        this.request.abort();
        this.setState(({value, queryString, options, ...rest}) => {
            const needRevertOptions = !!value && queryString.length && queryString !== value.login;
            let newOptions = options;
            let newPage = rest.page;
            if (value && this.isInCache(value.login) && needRevertOptions) {
                const {options, page} = this.getOptionsFromCache(value.login);
                newOptions = options;
                newPage = page;
            }
            return {
                ...rest,
                notFound: newOptions.length === 0,
                isTooltipOpened: queryString.length <= 3 && !value,
                options: newOptions,
                page: newPage
            }
        });
    }
    handleSelect(value) {
        this.setState((prev) => {
            const options = value && this.isInCache(value.login)  ?
                [...this.getOptionsFromCache(value.login).options] :
                value ?
                    [...prev.options] :
                    [];

            return {...prev, value, queryString: value ? value.login : '', isTooltipOpened: false, options,}
        });
    }
    handleFilter(query) {
        this.request.abort();
        if (query.length <= 3) {
            this.setState({queryString: query, options: [], notFound: false, isTooltipOpened: true, loading: false});
        } else if (this.isInCache(query)) {
            const cached = this.getOptionsFromCache(query);
            this.setState({isTooltipOpened: false, options: cached.options, queryString: query, loading: false, page: cached.page, notFound: cached.options.length === 0});
        } else {
            this.setState({isTooltipOpened: false, options: [], queryString: query, loading: true, page: 1}, () => {
                this.getData(query, this.state.page);
            });
        }
    }
    handleScrollEnd() {
        const {queryString} = this.state;
        this.setState(
            (prev) => ({loading: true, page: prev.page + 1}),
        () => this.getData(queryString, this.state.page)
        );
    }
    handleAbort() {
        this.setState({loading: false});
    }
    handleLoad() {
        const {items, total_count} = JSON.parse(this.request.response);

        this.setState((prev) => {
            let prevOptions = prev.options;
            let prevPage = prev.page;
            if (this.isInCache(prev.queryString)) {
                const {options} = this.getOptionsFromCache(prev.queryString);
                prevOptions = options;
            }
            const options = prevPage > 1 ? [...prevOptions, ...items] : items;
            this.setOptionsToCache(prev.queryString, options, prevPage);
            return {
                ...prev,
                isEndOfList: options.length === 0 || options.length === total_count,
                loading: false,
                options,
                notFound: options.length === 0,
                isTooltipOpened: false,
            };
        });
    }
    isInCache(key) {
        return this.CACHE.has(key);
    }
    getOptionsFromCache(key) {
        return this.CACHE.get(key);
    }
    setOptionsToCache(key, options, page) {
        this.CACHE.set(key, {options, page});
    }

    getData(query, page) {
        this.request.open('GET', this.getUrl(this.SEARCH_URI, query, page), true);
        this.request.responseType = 'text';
        this.request.send();
    }

    getUrl(prefix ,query, page) {
        return `${prefix}?q=${query}+in:login&page=${page}&per_page=50`;
    }

    render() {
        const {placeholder, disabled, error, loading, isTooltipOpened, isEndOfList, saveOnFocus, notFound, options, value} = this.state;
        const tooltipHint = notFound ? 'Совпадений не найдено' : 'Введите более трёх символов'
        return (
            <>
                {this.renderCheckboxes({error, disabled, saveOnFocus})}
                <Row>
                    <Col>
                        <SuggestCustom
                            placeholder={placeholder}
                            tooltipHint={tooltipHint}
                            disabled={disabled}
                            error={error}
                            loading={loading}
                            showListSpinner={!isEndOfList}
                            isTooltipOpened={isTooltipOpened || notFound}
                            saveFilterOnFocus={saveOnFocus}
                            value={value}
                            options={options}
                            onFilter={this.handleFilter}
                            onFocus={this.handleFocus}
                            onSelect={this.handleSelect}
                            onScrollEnd={this.handleScrollEnd}
                            renderTargetLabel={this.renderTargetLabel}
                            renderDropdownItemLabel={this.renderDropdownItemLabel}
                        />
                    </Col>
                </Row>
            </>
        );
    }

    renderTargetLabel({onFocus, onClick, className, value, placeholder}) {
        return <div className={className} onClick={onClick} onFocus={onFocus}>{value ? value.login : placeholder}</div>;
    }

    renderDropdownItemLabel(props) {
        return props.option.login;
    }

    renderCheckboxes(props) {
        return (
            <>
                <Row>
                    <Col>
                        <input id="error" type="checkbox" value={props.error} onChange={() => this.setState((prev) => ({error: !prev.error}))}/>
                        <label htmlFor="error">Error</label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input id="disabled" type="checkbox" value={props.disabled} onChange={() => this.setState((prev) => ({disabled: !prev.disabled}))}/>
                        <label htmlFor="disabled">Disabled</label>
                    </Col>
                </Row>
                {/*TODO добавить проп labelKey, упразднить зависимость от value.label*/}
                {/*<Row>*/}
                {/*    <Col>*/}
                {/*        <input id="saveOnFocus" type="checkbox" value={props.saveOnFocus} onChange={() => this.setState((prev) => ({saveOnFocus: !prev.saveOnFocus}))}/>*/}
                {/*        <label htmlFor="saveOnFocus">Save query on focus</label>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                <Row>
                    <Col><Gap /></Col>
                </Row>
            </>
        );
    }
}

// tslint:disable-next-line:no-unused-expression
<SuggestAsyncExample />;
