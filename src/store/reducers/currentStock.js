import { 
  FETCH_CURRENT_STOCK_ERROR,
  FETCH_CURRENT_STOCK_SUCCESS,
  FETCH_CURRENT_STOCK_PENDING,
  SET_CURRENT_STOCK
} from '../actions/fetchCurrentStock';

const initialState = {
  stock_id: 1,
  current_stock: null,
  pending: false,
  error: null
};

const CurrentStockReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case FETCH_CURRENT_STOCK_PENDING:
      return { ...state,pending: true };

    case FETCH_CURRENT_STOCK_SUCCESS:
      const data = { ...actions.payload };
      return { ...state, pending: false, current_stock: data, stock_id: data.stock_id };
    
    case FETCH_CURRENT_STOCK_ERROR:
      return { ...state, pending: false, error: actions.payload };

    case SET_CURRENT_STOCK:
      return { ...state, pending: false, stock_id: actions.payload};

    default: 
      return state;
  }
}

export default CurrentStockReducer;
