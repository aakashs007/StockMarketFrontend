import { SERVICES } from '../../services/services';

export const FETCH_STOCK_PENDING = 'FETCH_STOCK_PENDING';
export const FETCH_STOCK_SUCCESS = 'FETCH_STOCK_SUCCESS';
export const FETCH_STOCK_ERROR = 'FETCH_STOCK_ERROR';


export const fetchStockPending = () => {
  return {
    type: FETCH_STOCK_PENDING
  };
}

export const fetchStockSuccess = (data) => {
  return {
    type: FETCH_STOCK_SUCCESS,
    payload: data
  }
}

export const fetchStockError = (error) => {
  return {
    type: FETCH_STOCK_ERROR,
    payload: error
  }
}

export const fetchStock = (stock_id) => {
  return dispatch => {
    dispatch(fetchStockPending());

    const url = `${SERVICES.BASE_URL}/${SERVICES.apis.stock_data.url}/${stock_id}`;
  
    fetch(url)
    .then(res => res.json())
    .then(res => dispatch(fetchStockSuccess(res.data)))
    .catch(err => dispatch(fetchStockError(err)));
  }
}