import { SERVICES } from '../../services/services';

export const FETCH_CURRENT_STOCK_PENDING = 'FETCH_CURRENT_STOCK_PENDING';
export const FETCH_CURRENT_STOCK_SUCCESS = 'FETCH_CURRENT_STOCK_SUCCESS';
export const FETCH_CURRENT_STOCK_ERROR = 'FETCH_CURRENT_STOCK_ERROR';
export const SET_CURRENT_STOCK = 'SET_CURRENT_STOCK';

export const fetchCurrentStockPending = () => {
  return {
    type: FETCH_CURRENT_STOCK_PENDING
  };
}

export const fetchCurrentStockSuccess = (data) => {
  return {
    type: FETCH_CURRENT_STOCK_SUCCESS,
    payload: data
  }
}

export const fetchCurrentStockError = (error) => {
  return {
    type: FETCH_CURRENT_STOCK_ERROR,
    payload: error
  }
}

export const setCurrentStock = (stock_id) => {
  return {
    type: SET_CURRENT_STOCK,
    payload: stock_id
  };
}

export const fetchCurrentStock = (stock_id) => {

  return dispatch => {
    dispatch(fetchCurrentStockPending());

    const url = `${SERVICES.BASE_URL}/${SERVICES.apis.current_stock.url}/${stock_id}`;
  
    fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log('=================',res);
      return dispatch(fetchCurrentStockSuccess(res.data));
    }).catch(err => dispatch(fetchCurrentStockError(err)));
  }
}