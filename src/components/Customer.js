import React, { Component } from 'react';

class Customer extends Component{
  render(){
    return(
      <div>
        <CustomerProfile id={this.props.customer.id} name={this.props.customer.name} image={this.props.customer.image}/>
        <CustomerInfo birthday={this.props.customer.birthday} gender={this.props.customer.gender} job={this.props.customer.job}/>
      </div>
    )
  }
}


class CustomerProfile extends Component{
  render(){
    return (
      <div>
        <img src={this.props.image} alt="profile"/>
        <h2>{this.props.name} ({this.props.id})</h2>
      </div>
    )
  }
}

class CustomerInfo extends Component{
  render(){
    return(
      <div>
        <p>{this.props.birthday}</p>
        <p>{this.props.gender}</p>
        <p>{this.props.job}</p>
      </div>
    )
  }
}



export default Customer
