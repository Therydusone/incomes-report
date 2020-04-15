import React from 'react';

import './App.css';
import SearchBox from './components/SearchBox/SearchBox'
import Table from './components/Table/Table'




class App extends React.Component  {
  constructor() {
    super();

    this.state = {
      data: [],
      incomesData: [],
      totalIncome: [],
      averageIncome: [],
      lastIncome: [],
      searchField: '',
      columns: [
        {
          Header: 'Name',
          accessor: 'name'
        }, {
          Header: 'City',
          accessor: 'city'
        },
        {
          Header: 'Total Income',
          accessor: 'average-income'
        },
        {
          Header: 'Average Income',
          accessor: 'total-income'
        },
        {
          Header: 'Last Month Income',
          accessor: 'last-month-income'
        }
      ]
    };

  }
  
  async componentDidMount() {
    await this.getData();
    await this.TotalIncome();
  }

  async getData() {
    const response = await fetch('https://recruitment.hal.skygate.io/companies')
    const json = await response.json();
    this.setState({data: json});
    const incData = this.state.data
    let getIncomes = [];
    let onlyID = incData.map(value => value.id)
    onlyID.forEach(async function(item) {
      const response = await fetch(`https://recruitment.hal.skygate.io/incomes/${item}`)
      const json = await response.json();
      getIncomes.push(json)
    })
    this.setState({incomesData: getIncomes})
  }


  async TotalIncome() {
    console.log(this.state.incomesData.incomes)
    // let justIncomes = await data.map( val => val.incomes).flat()
    // console.log(justIncomes)
  }


  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
  };



  render() {

    const { data, searchField, columns } = this.state;
    const filteredCompanies = data.filter(data =>
      data.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className='App'>
        <h1>Financial Reports </h1>
        <SearchBox onSearchChange={this.onSearchChange} />
        <Table data={filteredCompanies} columns={columns} />
      </div>
    );
  }
}

export default App;


