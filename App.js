import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'

import TodoList from './TodoList'

class App extends Component {
	componentWillMount(){
		this.loadBlockchainData()
	}


	async loadBlockchainData(){

	//const wb3 = new Web3(Web3.givenProvider || "http://ec2... does not work")
	const web3 = new Web3( "http://ec2-34-220-121-81.us-west-2.compute.amazonaws.com:8545")
	const network = await web3.eth.net.getNetworkType()
	console.log( "network:", network)
	const accounts = await web3.eth.getAccounts()
	console.log("account", accounts[0])
	this.setState({ account: accounts[0] })	
	const todoList  = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
	this.setState({ todoList }) 
	const taskCount = await todoList.methods.taskCount().call()
	console.log("todoList", todoList)
	this.setState( {taskCount} )
	for (var i = 1;i <= taskCount; i++){
		const task = await todoList.methods.tasks(i).call()
		this.setState({
			tasks: [...this.state.tasks,task]
		})
	}
	console.log("tasks", this.state.tasks)
	}
  constructor(props){
	  	super(props)
	  	this.state = {account: '',
		taskCount: 0,
		tasks: []
		}
  }

state = { visible: true
};



	render() {
		return ( 
		<div>		   
			<TodoList tasks={this.state.tasks}/>
 
            <ul id="completedTaskList" className="list-unstyled">
            </ul>
		</div>

		);
	}
}

export default App;
