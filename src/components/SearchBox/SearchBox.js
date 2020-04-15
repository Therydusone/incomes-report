import React from 'react';
import styled from 'styled-components'

const Styles = styled.div`
  input {
    height: 50px;
    width: 400px;
    padding: 10px;
    margin-bottom: 20px;
  }
`
const SearchBox = props => (
  <Styles>
  <input
    type='search'
    placeholder='search companies'
    onChange={props.onSearchChange}
  />
  </Styles>
);

export default SearchBox;