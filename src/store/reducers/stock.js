import { 
  FETCH_STOCK_ERROR,
  FETCH_STOCK_SUCCESS,
  FETCH_STOCK_PENDING
} from '../actions/fetchStock';


const initialState = {
  stock: null,
  pending: false,
  error: null
};

const StockReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case FETCH_STOCK_PENDING:
      return { ...state,pending: true };

    case FETCH_STOCK_SUCCESS:
      return { ...state, pending: false, stock: actions.payload };
    
    case FETCH_STOCK_ERROR:
      return { ...state, pending: false, error: actions.payload };

    default: 
      return state;
  }
}

export default StockReducer;
