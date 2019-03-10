import React, { Component } from 'react';
import Customer from "./components/Customer";

//material-ui
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
  root:{
    widh:'100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table:{
    minWidth:1080
  }
})

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
    const {classes} = this.props;
    console.log(classes)
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>사진</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              customers.map((customer, index) => {
              return <Customer customer={customer} key={customer.id}/>
              })
            }
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(App);
