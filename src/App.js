import React, { Component } from 'react';
import {
  ReactiveBase,
  DataSearch,
  SelectedFilters,
  ReactiveList
} from '@appbaseio/reactivesearch';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import imageUrl from './images/visa.png';
import ReactDOM from 'react-dom'

const columns = [
  {
    Header: "Số hiệu thiết bị",
    accessor: "tid"
  },
  {
    Header: "Số hiệu Đvi",
    accessor: "mid"
  },
  {
    Header: "Mã chuẩn chi",
    accessor: "ma_chuan_chi"
  },
  {
    Header: 'Số lô',
    accessor: "so_lo"
  },
  {
    Header: 'Số tham chiếu',
    accessor: "so_tham_chieu"
  }
  
];
//const imageUrl = "src/images/visa.png"

class App extends Component {
  componentDidMount(){
    document.title = "TGD2 Card Number Searching"
  }
  render() {
    return (

      <ReactiveBase
        app="tgdd-card"
        url="https://elastic.munso.online"
      >
        <div className="App">

          <div className="navbar">
            <div className="logo">
              TGD2 Card Number Searching
            </div>


            <DataSearch
              className="datasearch"
              componentId="mainSearch"
              dataField={["card_number"]}
              queryFormat="and"
              placeholder="Search for a Card Number"
              innerClass={{
                "input": "searchbox",
                "list": "suggestionlist"
              }}
              autosuggest={true}
              iconPosition="left"
              filterLabel="search"
            />
          </div>
          <div className={"display"}>
            
            <div className={"mainBar"}>
              <div className={"row"}>
                <div className={"col col-md-5"}>
                  <h2>Kiểm tra thông tin</h2>
                  <span>Người dùng có thể kiểm tra thông tin thẻ hoặc địa chỉ email trong khoảng 31.000 giao dịch thẻ ngân hàng và 5.400.000 email tại Việt Nam bị phát tán lên mạng.</span>
                </div>
                <div className={"col col-md-7"}>
                  <center><img src={imageUrl} alt={imageUrl} /></center>
                </div>
              </div>
              <SelectedFilters />
              <ReactiveList
                componentId="card"
                dataField="card_number"
                title="Card List"
                from={0}
                size={500}
                showResultStats={false}
                onAllData={this.onAllData}
                pagination={false}
                react={{
                  "and": ["mainSearch","cardFilter"]
                }}
              />
              

            </div>
          </div>
        </div>
          
      </ReactiveBase>
      
    );
  }

onAllData(data) {
    return (
      <div>
        <ReactTable
          data={data}
          noDataText="Oh Noes!"
          columns={[
            {
              Header: "Số hiệu thiết bị",
              accessor: "tid"
            },
            {
              Header: "Tên đơn vị",
              accessor: "unit_name",              
              width: 220
            },
            {
              Header: "Card Type",
              accessor: "card_type",
              Cell: row => (
                <span>
                  <span style={{
                    color: row.row.card_type === 'BNVN' ? '#E91E63'
                      : row.row.card_type === 'CUPCARD' ? '#673AB7'
                      : row.row.card_type === 'GENT' ? '#4CAF50'
                      : row.row.card_type === 'JCB' ? '#2196F3'
                      : row.row.card_type === 'MAST' ? '#FF9800'
                      : '#607D8B',
                    transition: 'all .3s ease'
                  }}>
                    {row.row.card_type}
                  </span>
                </span>
              )
            },
            {
              Header: "Số thẻ",
              accessor: "card_number",              
              width: 150
            },
            {
              Header: "Ngày GD",
              accessor: "date"
            },
            {
              Header: "Giờ GD",
              accessor: "time"
            },
            {
              Header: "Ngày xử lý",
              accessor: "date"
            },            
            {
              Header: "Số tiền",
              accessor: "amount"
            },
            {
              Header: 'Phí (chưa VAT)',
              accessor: "fee_not_vat"
            },
            {
              Header: "VAT (của phí)",
              accessor: "vat_of_fee"
            },
            {
              Header: 'Tỷ lệ phí (%)',
              accessor: "fee_pecent"
            }
          ]}
          SubComponent={row => {
            var subtable = [];    
            subtable.push(row.original);   
            return (              
              <div style={{ padding: "20px" }}>
                <em>
                  Thông tin giao dịch chi tiết
                </em>
                <br />
                <br />
                <ReactTable
                  data={subtable}
                  columns={columns}
                  defaultPageSize={1}
                  showPagination={false}    
                />
              </div>
            );
          }}

          defaultPageSize={15}
          className="-striped -highlight"          
        />
        <br />
      </div>
    );

  }
}

export default App;
