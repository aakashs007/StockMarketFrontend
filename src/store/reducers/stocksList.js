import { 
  FETCH_STOCKS_LIST_PENDING,
  FETCH_STOCKS_LIST_SUCCESS,
  FETCH_STOCKS_LIST_ERROR
} from '../actions/fetchStocksList';


const initialState = {
  stocks_list: null,
  pending: false,
  error: null
};

const StocksListReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case FETCH_STOCKS_LIST_PENDING:
      return { ...state,pending: true };

    case FETCH_STOCKS_LIST_SUCCESS:
      return { ...state, pending: false, stocks_list: actions.payload };
    
    case FETCH_STOCKS_LIST_ERROR:
      return { ...state, pending: false, error: actions.payload };

    default: 
      return state;
  }
}

export default StocksListReducer;
