import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import { getContact } from '../actions/contactActions';

const res = getContact();
console.log(res);


const contactList = JSON.parse('[{"number":"1","street":"Rue Saint-Laurent","city":"Paris 10e Arrondissement","postcode":"75010","firstname":"Aaron","lastname":"Desamparo"}, {"number":"123","street":"Rue Du Faubourg Saint-Martin","city":"Paris 10e Arrondissement","postcode":"75010","firstname":"Abbey","lastname":"Desan"},{"number":"72","street":"Rue De Dantzig","city":"Paris 15e Arrondissement","postcode":"75015","firstname":"Abbie","lastname":"Aaby"}]');

contactList.map(function(element) {
  element.address = element.number + ' ' + element.street + ', ' + element.postcode + ' ' + element.city;
  return element;
});


export default class ContactTable extends React.Component {
  constructor(props) {
        super(props);
        this.state = {};
    }

  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps() {}
  shouldComponentUpdate() {}
  componentWillUpdate() {}
  componentWillUnmount() {}

  render() {
    const selectRowProp = {
      mode: "radio",
      clickToSelect: true
    };

    return (
      <BootstrapTable data={contactList} insertRow={true} deleteRow={true} striped={true} selectRow={selectRowProp} hover={true}>
        <TableHeaderColumn isKey={true} dataField="lastname">LastName</TableHeaderColumn>
        <TableHeaderColumn dataField="firstname">FirstName</TableHeaderColumn>
        <TableHeaderColumn dataField="address">Address</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
ContactTable.displayName = 'ContactTable';
ContactTable.propTypes = {};
ContactTable.defaultProps = {};
