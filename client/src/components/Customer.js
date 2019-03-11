import React, { Component } from 'react';
import CustomerDelete from "./CustomerDelete";

//material-ui
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class Customer extends Component{
  render(){
    return(
      <TableRow>
        <TableCell>{this.props.customer.id}</TableCell>
        <TableCell><img src={this.props.customer.image} width="64" height="64" alt="profile"/></TableCell>
        <TableCell>{this.props.customer.cname}</TableCell>
        <TableCell>{this.props.customer.birthday}</TableCell>
        <TableCell>{this.props.customer.gender}</TableCell>
        <TableCell>{this.props.customer.job}</TableCell>
        <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.customer.id}/></TableCell>
      </TableRow>
    )
  }
}

export default Customer
