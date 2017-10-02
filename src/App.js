import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Form from './components/form';
import Header from './components/header';
import Table from './components/table';
import FormUpdate from './components/row';

const mapStateToProps = (state) => {
	return {
		user: state
	}
};

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			status: '',
			id: null
		}
		this.toEdit = this.toEdit.bind(this);
		this.back = this.back.bind(this);
	}

	back(){
		this.setState({
			status: '',
			id: null
		})
	}

	toEdit(itemId){
		this.setState({
		
			status: 'edit',
			id: itemId
		})
	}
	
	render(){
		
		return (
			<div className="App" >
				 <Header /> 
				<div className="App-intro">
					<div className="container">
						{(this.state.status==='edit')?
						 <FormUpdate back={this.back} itemId={this.state.id}/> : <Form />
						}
						<div className="col-xs-12">
							<Table onChangeEdit={this.toEdit}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps)(App);