import { 
  FETCH_TOP_STOCKS_PENDING,
  FETCH_TOP_STOCKS_SUCCESS,
  FETCH_TOP_STOCKS_ERROR
} from '../actions/fetchTopStocks';


const initialState = {
  top_stocks: null,
  pending: false,
  error: null
};

const TopStocksReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case FETCH_TOP_STOCKS_PENDING:
      return { ...state,pending: true };

    case FETCH_TOP_STOCKS_SUCCESS:
      return { ...state, pending: false, top_stocks: actions.payload };
    
    case FETCH_TOP_STOCKS_ERROR:
      return { ...state, pending: false, error: actions.payload };

    default: 
      return state;
  }
}

export default TopStocksReducer;
