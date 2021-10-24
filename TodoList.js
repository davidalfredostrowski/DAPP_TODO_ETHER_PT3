//import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'

import React, { Component } from "react";
import TestForm from './TestForm'

class TodoList extends Component {
	state = {
		todos: []
	};

addTodo = todo => {
	this.setState({
		todos: [todo, ...this.state.todos]
	});

};

	render() {
		return ( 
<div id="content">		   
	    <TestForm onSubmit={this.addTodo} />
            { JSON.stringify(this.state.todos)}
            <ul id="taskList" className="list-unstyled">
		<label> task 1</label>
		<label> task 2</label>
		<label> task e</label>
            </ul>
           <ul id="taskList" className="list-unstyled">
		{ this.props.tasks.map((task, key) => {
		  return(
		  <div className="taskTemplate" className="checkbox" key={key}>
		    <label>
		    	<input type="checkbox"/>
			<span className="content">{task.content}</span>
		    </label>
                  </div>             
  		)
	})}
            </ul>
            <ul id="completedTaskList" className="list-unstyled">
            </ul>     
</div>
		);
	}
}

export default TodoList;
