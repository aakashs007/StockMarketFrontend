import React from 'react';
import Chart from '../chart';
import StockListing from '../stock_list';
import { connect } from "react-redux";
import { fetchCurrentStock, setCurrentStock } from '../../store/actions/fetchCurrentStock';
import { fetchStock } from '../../store/actions/fetchStock';
import { fetchStocksList } from '../../store/actions/fetchStocksList';
import { fetchTopStocks } from '../../store/actions/fetchTopStocks';
import './style.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  fetchDataOnRegularInterval() {
    this.props.fetchStock(this.props.stock_id);
    this.props.fetchTopStocks();
  }

  componentDidMount() {
    this.fetchDataOnRegularInterval();
  }

  getIcon() {
    // const { per_chng } = this.props.stock;

    if(this.props.stock?.per_chng < 0) {
      return(
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="#e75324" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>
      );
    } else {
      return(
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="#e75324" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
        </svg>        
      );
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">Paxcom Stock Prices</h1>
            <p class="lead">This is leading platform for realtime stock prices.</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12">
            <div className="d-flex justify-content-between align-items-center" style={{ margin: '1em 2em' }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>
                  <span className="mr-1">
                    {this.props.stock?.price || 0}
                  </span>
                  {this.getIcon()}
                </div>
                <div className="sub-text" style={{ color: (this.props.stock?.per_chng < 0) ? '#ce3e5e' : '#2b9c18' }}>{`(${this.props.stock?.per_chng || 0}%)`}</div>
              </div>
              <div>
                <div className="sub-text">Open</div>
                <div style={{ fontWeight: 'bold' }}>{this.props.stock?.open || 0}</div>
              </div>
              <div>
                <div className="sub-text">High</div>
                <div style={{ fontWeight: 'bold', color: '#2b9c18' }}>{this.props.stock?.high || 0}</div>
              </div>
              <div>
                <div className="sub-text">Low</div>
                <div style={{ fontWeight: 'bold', color: '#cb0508' }}>{this.props.stock?.low || 0}</div>
              </div>
            </div>
            <div style={{ border: '1px solid #e4e4e4', marginTop: '2em', marginBottom: '2em' }}>
              <Chart />
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12">
            <StockListing />
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state =>
  ({
    stock: state.StockReducer.stock,
    top_stocks: state.TopStocksReducer.top_stocks,
    error: state.CurrentStockReducer.error,
    stock_id: state.CurrentStockReducer.stock_id
  })

const mapDispatchToProps = dispatch =>
  ({
    fetchCurrentStock: (stock_id) => dispatch(fetchCurrentStock(stock_id)),
    fetchStock: (stock_id) => dispatch((fetchStock(stock_id))),
    fetchStocksList: () => dispatch((fetchStocksList())),
    fetchTopStocks: (n = 10) => dispatch((fetchTopStocks(n))),
    setCurrentStock: (stock_id) => dispatch((setCurrentStock(stock_id)))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Main);
