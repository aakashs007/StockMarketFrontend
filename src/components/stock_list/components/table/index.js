import React from 'react';
import './style.scss';

const TableComponent = (props) => {
  const table_heads = ['SYMBOL','LTP','%CHNG','VOLUME'];

  let { data } = props;
  if(data.length > 4) {
    data = data.slice(0,4)
  }

  const strip_color = props.strip_colors || '#f4fdf0';
  const head_color = props.head_color || '#009900';

  return (
    <table className="table">
      <thead>
        <tr style={{background: head_color}}>
          {table_heads.map(head => <th className="table-th1">{ head }</th>)}
        </tr>
      </thead>
      <tbody>
        {
          data.map((row,i) => 
          <tr className="crsr-ptr" style={(i%2 !== 0) ? {background: strip_color} : {}} onClick={(e) => props.changeStock(row.stock_id)}>
            <td className="text-over">{ row.stock_name }</td>
            <td>{ row.ltp }</td>
            <td style={{color: head_color}}>{ row.per_chng }</td>
            <td>{ row.volume }</td>
          </tr>)
        }
      </tbody>
    </table>
  );
}

export default TableComponent;