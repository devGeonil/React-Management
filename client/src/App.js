import React, { Component } from 'react';
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";

//material-ui
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
  root:{
    widh:'100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table:{
    minWidth:1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})


class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      customers:'',
      completed:0
    }
  }


  stateRefresh = () =>{
    this.setState({
      customers:'',
      completed:0
    });
    this.callApi()
    .then(res => this.setState({customers:res}))
    .catch(error => console.log(error))
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }


  componentDidMount(){

    this.timer = setInterval(this.progress, 20);

    this.callApi()
    .then(res => this.setState({customers:res}))
    .catch(error => console.log(error))
  }

  callApi = async () => {
    return await fetch("/api/customers").then(res => res.json())
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
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
                <TableCell>설정</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.customers ?
                this.state.customers.map((customer, index) => {
                return <Customer stateRefresh={this.stateRefresh} customer={customer} key={customer.id}/>
                })
              : <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                  </TableCell>
                </TableRow>
            }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>

    )
  }
}

export default withStyles(styles)(App);
