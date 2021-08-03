import { Component } from 'react';
import { debounce } from 'lodash';
import queryString from 'query-string';

import { setTypeAction } from '../../adapters';
import { SearchType } from '../../entities';

const REACT_APP_API_KEY_GOOGLE = process.env.REACT_APP_API_KEY_GOOGLE;
const REACT_APP_CX_GOOGLE = process.env.REACT_APP_CX_GOOGLE;
const REACT_APP_URL_GOOGLE = process.env.REACT_APP_URL_GOOGLE;

const REACT_APP_API_KEY_BING = process.env.REACT_APP_API_KEY_BING;
const REACT_APP_URL_BING = process.env.REACT_APP_URL_BING;

interface Props {
  dispatch: any;
  searchType: SearchType;
  location: any;
  history: any;
}

interface State {
  pageState: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalResults: number;
  };
  query: string;
  requestId: string;
  results: Array<any>;
}

/**
 * Component to handle search logic
 *
 * @export
 * @class Search
 * @extends {Component<Props, State>}
 */
export default class Search extends Component<Props, State> {
  /**
   * Creates an instance of DocumentsScreen.
   * @param {*} props
   * @memberof DocumentsScreen
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      pageState: {
        currentPage: 0,
        pageSize: 10,
        totalPages: 0,
        totalResults: 0,
      },
      query: '',
      requestId: '',
      results: [],
    };
  }

  componentDidMount() {
    this.updateFromQueryState();
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.location.search !== prevProps.location.search ||
      this.props.searchType.type !== prevProps.searchType.type
    ) {
      this.updateFromQueryState();
    }
  }

  /**
   * Function to update query params with new query
   *
   * @memberof Search
   */
  updateQuery = (query: string) => {
    const { history } = this.props;
    history.push('?' + queryString.stringify({ q: query }));
  };

  /**
   * Function to update query params with new page
   *
   * @memberof Search
   */
  updatePage = (newPage: number, pageSize?: number) => {
    const { history } = this.props;
    history.push('?' + queryString.stringify({ ...this.getQueryState(), page: newPage }));
  };

  /**
   * Function to parse params to fetch
   *
   * @memberof Search
   */
  parseUrlWithParams = (url: string, params: any) => {
    const esc = encodeURIComponent;
    const paramsParsed = Object.keys(params)
      .map((k) => esc(k) + '=' + esc(params[k]))
      .join('&');
    return `${url}?${paramsParsed}`;
  };

  /**
   * Function to set data from apis
   *
   * @memberof Search
   */
  setDataFromApi = ({ r, type }: { r: any; type: string }) => {
    let { q, page } = this.getQueryState();
    this.setState({
      pageState: {
        currentPage: isNaN(Number(page)) ? 1 : Number(page),
        pageSize: type === 'Both' ? 20 : 10,
        totalPages:
          Number(
            r.searchInformation && r.searchInformation.totalResults
              ? r.searchInformation.totalResults
              : r.webPages.totalEstimatedMatches,
          ) / 10,
        totalResults: Number(
          r.searchInformation && r.searchInformation.totalResults
            ? r.searchInformation.totalResults
            : r.webPages.totalEstimatedMatches,
        ),
      },
      query: `${q}`,
      requestId: type,
      results: r.items ? r.items : r.webPages.value,
    });
  };

  /**
   * Function to update from query state
   *
   * @memberof Search
   */
  updateFromQueryState = () => {
    let { q, page } = this.getQueryState();
    q = q || '';
    let pageParsed = typeof page === 'string' ? page : 1;
    pageParsed = parseInt(`${pageParsed}`, 10);
    pageParsed = isNaN(pageParsed) ? 1 : pageParsed;
    pageParsed = pageParsed * 10 - 9;
    this.callApi({ query: q, page: pageParsed, type: this.props.searchType.type });
  };

  /**
   * Function to call api
   *
   * @memberof Search
   */
  callApi = debounce(({ query, page = 1, type }) => {
    if (query.length === 0) {
      this.setState({ query });
      return;
    }

    if (type.length === 0) {
      this.props.dispatch(setTypeAction('Google'));
    }

    if (type === 'Google') {
      const params = {
        key: REACT_APP_API_KEY_GOOGLE,
        cx: REACT_APP_CX_GOOGLE,
        start: page,
        q: query,
      };
      const url = this.parseUrlWithParams(REACT_APP_URL_GOOGLE || '', params);

      return fetch(url)
        .then((v) => v.json())
        .then((r) => this.setDataFromApi({ r, type }))
        .catch((e) => console.error(e));
    } else if (type === 'Bing') {
      const params = {
        q: query,
        offset: page,
      };
      const url = this.parseUrlWithParams(REACT_APP_URL_BING || '', params);

      return fetch(url, { headers: new Headers({ 'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY_BING || '' }) })
        .then((v) => v.json())
        .then((r) => this.setDataFromApi({ r, type }))
        .catch((e) => console.error(e));
    } else {
      const paramsGoogle = {
        key: REACT_APP_API_KEY_GOOGLE,
        cx: REACT_APP_CX_GOOGLE,
        start: page,
        q: query,
      };
      const urlGoogle = this.parseUrlWithParams(REACT_APP_URL_GOOGLE || '', paramsGoogle);

      const paramsBing = {
        q: query,
        offset: page,
      };
      const urlBing = this.parseUrlWithParams(REACT_APP_URL_BING || '', paramsBing);

      return Promise.all([
        fetch(urlGoogle),
        fetch(urlBing, { headers: new Headers({ 'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY_BING || '' }) }),
      ])
        .then((responses) => Promise.all(responses.map((v) => v.json())))
        .then((r) => {
          const items: any = [];
          r[0].items.forEach((item: any, index: number) => {
            items.push({ ...item, type: 'Google' });
            items.push({ ...r[1].webPages.value[index], type: 'Bing' });
          });
          const newR = {
            searchInformation: {
              totalResults:
                Number(r[0].searchInformation.totalResults) > Number(r[1].webPages.totalEstimatedMatches)
                  ? Number(r[0].searchInformation.totalResults)
                  : Number(r[1].webPages.totalEstimatedMatches),
            },
            items,
          };
          this.setDataFromApi({ r: newR, type });
        })
        .catch((e) => console.error(e));
    }
  }, 200);

  /**
   * Function to get query state
   *
   * @memberof Search
   */
  getQueryState = () => queryString.parse(this.props.location.search);

  render() {
    const { children }: any = this.props;
    const { pageState, query, requestId, results } = this.state;
    const { q } = this.getQueryState();
    const queryClass = query ? 'active-search' : '';
    console.log('children', children);
    return children({
      query: q,
      queryState: this.getQueryState(),
      queryClass: queryClass,
      searchActions: {
        updateFromQueryState: this.updateFromQueryState,
        updatePage: this.updatePage,
        updateQuery: this.updateQuery,
      },
      searchResults: {
        pageState,
        query,
        requestId,
        results,
      },
    });
  }
}
