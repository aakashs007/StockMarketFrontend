import { SERVICES } from '../../services/services';

export const FETCH_STOCKS_LIST_PENDING = 'FETCH_STOCKS_LIST_PENDING';
export const FETCH_STOCKS_LIST_SUCCESS = 'FETCH_STOCKS_LIST_SUCCESS';
export const FETCH_STOCKS_LIST_ERROR = 'FETCH_STOCKS_LIST_ERROR';


export const fetchStocksListPending = () => {
  return {
    type: FETCH_STOCKS_LIST_PENDING
  };
}

export const fetchStocksListSuccess = (data) => {
  return {
    type: FETCH_STOCKS_LIST_SUCCESS,
    payload: data
  }
}

export const fetchStocksListError = (error) => {
  return {
    type: FETCH_STOCKS_LIST_ERROR,
    payload: error
  }
}

export const fetchStocksList = () => {
  return dispatch => {
    dispatch(fetchStocksListPending());

    const url = `${SERVICES.BASE_URL}/${SERVICES.apis.stocks_list.url}`;
  
    fetch(url)
    .then(res => res.json())
    .then(res => dispatch(fetchStocksListSuccess(res.data)))
    .catch(err => dispatch(fetchStocksListError(err)));
  }
}