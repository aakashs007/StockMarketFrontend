import React from 'react';
import TableComponent from './components/table';
import { connect } from "react-redux";
import { setCurrentStock } from '../../store/actions/fetchCurrentStock';
import { fetchStock } from '../../store/actions/fetchStock';
import { fetchTopStocks } from '../../store/actions/fetchTopStocks';
import './style.scss';

class StockListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_tab: 1
    };

    this.changeStock = this.changeStock.bind(this);
  }

  changeTab(_tab) {
    this.setState({ current_tab: _tab });
  }

  changeStock(stock_id) {
    this.props.setCurrentStock(stock_id);
    this.props.fetchStock(stock_id);
  }

  renderGainLossTable() {
    return (
      <div className='table-responsive'>
        <TableComponent
          strip_colors={'#f4fdf0'}
          head_color={'#009900'}
          data={this.props.top_stocks?.gainers || []}
          changeStock={this.changeStock}
        />
        <TableComponent
          strip_colors={'#e3e3e3'}
          head_color={'#cb0505'}
          data={this.props.top_stocks?.losers || []}
          changeStock={this.changeStock}
        />

        <div>
          <span className="float-right crs-point d-none">
            <span className="mr-2" style={{ color: '#e86d24' }}>View All</span>
            <i className="fa fa-arrow-right" aria-hidden="true" style={{ color: "#e86d24" }}></i>
          </span>
        </div>
      </div>
    );
  }

  renderMostActiveTable() {
    return(
      <div className="d-flex align-items-center justify-content-center mt-5">
        NO DATA FOUND
        {/* <TableComponent 
          strip_colors={'#e3e3e3'}
          head_color={'#009900'}
        /> */}
      </div>
    );
  }

  render() {
    const { current_tab } = this.state;

    return (
      <React.Fragment>
        <ul className="nav nav-pills d-flex justify-content-center" style={{ background: '#efefef' }}>
          <li className="crs-point nav-item" onClick={(e) => this.changeTab(1)}>
            <a className={`nav-link ${current_tab === 1 ? 'active_tab' : 'inactive_tab'}`}>GAINERS/LOSERS</a>
          </li>
          <li class="crs-point nav-item" onClick={(e) => this.changeTab(2)}>
            <a class={`nav-link ${current_tab === 2 ? 'active_tab' : 'inactive_tab'}`}>MOST ACTIVE</a>
          </li>
        </ul>

        { current_tab === 1 ? this.renderGainLossTable() : this.renderMostActiveTable() }
      </React.Fragment>
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
    fetchStock: (stock_id) => dispatch((fetchStock(stock_id))),
    fetchTopStocks: (n = 10) => dispatch((fetchTopStocks(n))),
    setCurrentStock: (stock_id) => dispatch((setCurrentStock(stock_id))) 
  })

export default connect(mapStateToProps,mapDispatchToProps)(StockListing);
