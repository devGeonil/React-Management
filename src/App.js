import React, { Component } from 'react';
import Customer from "./components/Customer"

const customers = [
  {
    "id":1,
    "image":"https://placeimg.com/64/64/1",
    "name" : "geonil",
    "birthday" : "920105",
    "gender" : "mail",
    "job" : "dev"
  },
  {
    "id":2,
    "image":"https://placeimg.com/64/64/2",
    "name" : "gildong",
    "birthday" : "920512",
    "gender" : "femail",
    "job" : "dev1"
  },
  {
    "id":3,
    "image":"https://placeimg.com/64/64/3",
    "name" : "yoonha",
    "birthday" : "9244",
    "gender" : "femail",
    "job" : "dev2"
  }
]

class App extends Component {
  render() {
    return (
      <div>
        {
          customers.map((customer, index) => {
              return <Customer customer={customer} key={customer.id}/>
          })
        }
      </div>
    )
  }
}

export default App;
