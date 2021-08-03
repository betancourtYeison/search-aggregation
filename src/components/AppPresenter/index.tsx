/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { searchTypeSelector, setTypeAction } from '../../adapters';

import base64Icons from './../../assets/base64Icons';
import logo from './../../assets/logo.svg';

import { AppWrapper } from './../AppWrapper';
import Pagination from './../Pagination';
import Results from './../Results';
import ScrollToTop from './../ScrollToTop';
import Search from './../Search';
import Totals from './../Totals';

import { StateType } from '../../frameworks';

import './../../stylesheets/App.css';

type PropsSearch = {
  query: string;
  queryClass: string;
  searchActions: {
    updateFromQueryState: () => void;
    updatePage: (newPage: number, pageSize?: number) => void;
    updateQuery: (query: string) => void;
  };
  searchResults: {
    pageState: {
      currentPage: number;
      pageSize: number;
      totalPages: number;
      totalResults: number;
    };
    query: string;
    requestId: string;
    results: any;
  };
};

function App() {
  const dispatch = useDispatch();

  const searchType = useSelector((state: StateType) => searchTypeSelector(state));

  return (
    <AppWrapper>
      <Router>
        <ScrollToTop>
          <Route>
            {({ location, history }) => (
              <Search dispatch={dispatch} searchType={searchType} location={location} history={history}>
                {({ query, queryClass, searchActions, searchResults }: PropsSearch) => (
                  <div>
                    <div className={`search live-filtering ${queryClass}`}>
                      <div className="search__content">
                        <div className="search__header">
                          <div className="search__headings">
                            <div className="search__logo-wrap">
                              <img src={logo} alt="Dog Icon" className="search__logo" />
                            </div>
                            <h1 className="search__title">Search Aggregation</h1>
                          </div>
                          <div className="search__input-wrapper">
                            <a
                              href="#"
                              className="search__icon-wrap"
                              onClick={() => searchActions.updateFromQueryState()}
                            >
                              <img src={base64Icons.searchIcon} alt="Search Icon" className="search__icon" />
                            </a>
                            <input
                              className="search__text-input"
                              placeholder="Search..."
                              value={query}
                              onChange={(e) => searchActions.updateQuery(e.target.value)}
                            />
                            <input type="submit" value="Search" className="button search__submit" />
                            <div className="dropdown">
                              <button className="dropbtn">
                                {searchType.type.length === 0 ? 'Search by' : searchType.type}{' '}
                                <span className="caret"></span>
                              </button>
                              <div className="dropdown-content">
                                <a href="#" onClick={() => dispatch(setTypeAction('Google'))}>
                                  Google
                                </a>
                                <a href="#" onClick={() => dispatch(setTypeAction('Bing'))}>
                                  Bing
                                </a>
                                <a href="#" onClick={() => dispatch(setTypeAction('Both'))}>
                                  Both
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="search__body">
                          <div className="search-results">
                            <div className="results">
                              <div className="results__header">
                                <Totals {...searchResults.pageState} />
                                <div className="results__powered-by powered-by">Powered By Yeison Betancourt Solis</div>
                              </div>
                              <div className="results__body">
                                <Results searchResults={searchResults} />
                              </div>
                              <div className="results__footer">
                                <Pagination {...searchResults.pageState} onPage={searchActions.updatePage} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Search>
            )}
          </Route>
        </ScrollToTop>
      </Router>
    </AppWrapper>
  );
}

export default App;
