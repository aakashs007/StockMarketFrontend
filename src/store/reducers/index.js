import { combineReducers } from 'redux';
import CurrentStockReducer from './currentStock';
import StockReducer from './stock';
import TopStocksReducer from './topStocks';
import StocksListReducer from './stocksList';

export default combineReducers({
  CurrentStockReducer,
  StockReducer,
  TopStocksReducer,
  StocksListReducer
});
