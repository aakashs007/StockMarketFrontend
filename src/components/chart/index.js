import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { connect } from "react-redux";

class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          zoomType: 'x'
        },
        title: {
          text: ''
        },
        xAxis: {
          type: 'datetime',
          labels: {
            //You can format the label according to your need
            // format: '{value:%H:%m}'
            formatter: function() {
              return Highcharts.dateFormat('%H:%M', this.value);
            }
          },
          tickPixelInterval: 150,
        },
        yAxis: {
          title: {
            text: 'Stock prices'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [{
          type: 'area',
          name: 'Stock prices',
          data: [],
          // pointInterval: 5*60 * 1000
        }]
      }
    }
  }

  componentDidUpdate() {
    const options = { ...this.state.options };
    if (options.title.text !== this.props.stock?.stock_name) {
      options.title.text = this.props.stock?.stock_name;
      options.series[0].data = this.props.stock?.values_with_time.map(val => {
        let d = new Date(val.time);
        return [Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()), val.price ]
      });
      this.setState({ options });
    }
  }

  render() {
    return (
      <React.Fragment>
        <HighchartsReact
          highcharts={Highcharts}
          options={this.state.options}
        />
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

export default connect(mapStateToProps, null)(Charts);
