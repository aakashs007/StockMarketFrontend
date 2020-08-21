import { SERVICES } from '../../services/services';

export const FETCH_TOP_STOCKS_PENDING = 'FETCH_TOP_STOCKS_PENDING';
export const FETCH_TOP_STOCKS_SUCCESS = 'FETCH_TOP_STOCKS_SUCCESS';
export const FETCH_TOP_STOCKS_ERROR = 'FETCH_TOP_STOCKS_ERROR';


export const fetchTopStocksPending = () => {
  return {
    type: FETCH_TOP_STOCKS_PENDING
  };
}

export const fetchTopStocksSuccess = (data) => {
  return {
    type: FETCH_TOP_STOCKS_SUCCESS,
    payload: data
  }
}

export const fetchTopStocksError = (error) => {
  return {
    type: FETCH_TOP_STOCKS_ERROR,
    payload: error
  }
}

export const fetchTopStocks = (n = 10) => {
  return dispatch => {
    dispatch(fetchTopStocksPending());

    const url = `${SERVICES.BASE_URL}/${SERVICES.apis.top_stocks.url}/${n}`;
  
    fetch(url)
    .then(res => res.json())
    .then(res => dispatch(fetchTopStocksSuccess(res.data)))
    .catch(err => dispatch(fetchTopStocksError(err)));
  }
}