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

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


const styles = theme => ({
  root:{
    widh:'100%',
    minWidth:1080
  },
  paper:{
    marginLeft:18,
    marginRight:18
  },
  tableHead:{
    fontSize:'1.0rem'
  },
  menu:{
    marginTop:15,
    marginBottom:15,
    display: 'flex',
    justifyContent:'center'
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
})


class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      customers:'',
      completed:0,
      searchKeyword:""
    }
  }


  stateRefresh = () =>{
    this.setState({
      customers:'',
      completed:0,
      searchKeyword:""
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

  handleValueChange = (e) =>{
      let nextState={};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
  }

  render() {
    const filteredComponents = (data) => {
      data = data.filter( c => {
        return c.cname.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map( c => {
        return <Customer stateRefresh={this.stateRefresh} customer={c} key={c.id}/>
      })
    }
    const {classes} = this.props;
    const cellList = ["번호","사진","이름","생년월일","성별","직업","설정"]
    return (
      <div className={classes.root}>
        <AppBar position="static">
           <Toolbar>
             <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
               <MenuIcon />
             </IconButton>
             <Typography className={classes.title} variant="h6" color="inherit" noWrap>
               고객 관린 시스템
             </Typography>
             <div className={classes.grow} />
             <div className={classes.search}>
               <div className={classes.searchIcon}>
                 <SearchIcon />
               </div>
               <InputBase
                 placeholder="검색하기.."
                 classes={{
                   root: classes.inputRoot,
                   input: classes.inputInput,
                 }}
                 name="searchKeyword"
                 value={this.state.searchKeyword}
                 onChange={this.handleValueChange}
               />
             </div>
           </Toolbar>
         </AppBar>
         <div className={classes.menu}>
           <CustomerAdd stateRefresh={this.stateRefresh}/>
         </div>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map( c => <TableCell className={classes.tableHead}>{c}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.customers ?
                filteredComponents(this.state.customers)
                // this.state.customers.map((customer, index) => {
                // return <Customer stateRefresh={this.stateRefresh} customer={customer} key={customer.id}/>
                // })
              : <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                  </TableCell>
                </TableRow>
            }
            </TableBody>
          </Table>
        </Paper>
      </div>

    )
  }
}

export default withStyles(styles)(App);
