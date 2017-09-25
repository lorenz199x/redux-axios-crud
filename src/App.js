import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

//import store from './redux/store/store';
import { connect } from 'react-redux';
import Form from './components/form';
import Header from './components/header';
import Table from './components/table';

//import { onChangeForm, onSubmitForm, onDelete } from './redux/actions/index';

const mapStateToProps = (state) => ({
	return: {
		user: state
	}
});

class App extends Component {
	// componentWillMount() {
	// 	this.props.dispatch(onChangeForm())
	// }
	
	render(){
		//console.log(this.props);
		
		return (
			<div className="App" >
				 <Header /> 
				<div className="App-intro">
					<div className="container">
						<Form />
						{/*<h1> {this.props.user}</h1>*/}
						<div className="col-xs-12">
							<Table  />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps)(App);

/*

var defaults = {
	title: '',
	category: ''
};
constructor() {
		super();

		this.state = {
			customers: [],
			action: 'add',
			formData: { ...defaults },
		};

		this.onChangeForm = this.onChangeForm.bind(this);
		this.edit = this.edit.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onSubmitForm = this.onSubmitForm.bind(this);
		//this.sortByAsc = this.sortByAsc.bind(this);
	}

	componentDidMount() {
		axios({
			url: 'http://localhost:4000/customers',
			method: 'GET'
		}).then(response => {
			this.setState({ customers: response.data });
		}).catch(error => {
			console.log(error);
		});
	}

	onChangeForm(e, field) {
		this.setState({
			formData: {
				...this.state.formData,
				[field]: e.target.value
			}
		});
	}
	
	edit(e, data) {
		this.setState({ action: 'edit', formData: data });
	}

	onDelete(e, data) {
		let { customers, formData } = this.state;
		axios({
			url: `http://localhost:4000/customers/${data.id}`,
			method: 'DELETE',
			data: formData
		}).then(response => {
			customers = [...this.state.customers];
			customers === customers.filter(d => {
				
				if (d.id !== data.id) {
					return data;
					
				}
				return data;
			});
			this.setState({ customers: response.data})
		}).catch(error => {
			console.log(error);
		});

		axios({
			url: 'http://localhost:4000/customers',
			method: 'GET'
		}).then(response => {
			this.setState({ customers: response.data });
		}).catch(error => {
			console.log(error);
		});
	}

	onSubmitForm(e) {
		let { action, customers, formData } = this.state;

		if (formData.title === '' || formData.category === '') {
			
			axios({
					url: 'http://localhost:4000/customers',
					method: 'POST',
					data: formData
				}).then(response => {
					this.setState({ customers: [...customers, response.data], action: 'add', formData: { ...defaults } })
				}).catch(error => {
					console.log(error);
				});
		} else {
			if (action === 'edit') {
				axios({
					url: `http://localhost:4000/customers/${formData.id}`,
					method: 'PUT',
					data: formData
				}).then(response => {
					customers = [...customers];
					customers = customers.map(d => {
						if (d.id === response.data.id) {
							d = response.data;
						}
						return d;
					});
					this.setState({ customers, action: 'add', formData: { ...defaults } })
				}).catch(error => {
					console.log(error);
				});
			} else {
				axios({
					url: 'http://localhost:4000/customers',
					method: 'POST',
					data: formData
				}).then(response => {
					this.setState({ customers: [...customers, response.data], action: 'add', formData: { ...defaults } })
				}).catch(error => {
					console.log(error);
				});
			}
		}
		e.preventDefault();
	}

	//  sortByAsc(e, data) {
    //     let { customers } = this.props;
    //     customers.sort((a, b) => { return a.title > b.title })
    //     .map((title, i) => 
    //     <Row key={i}>  {title.title}{title.category}</Row>)
    //     console.log(customers);
    // }

	render() {
		let { action, customers, formData } = this.state;

		return (
			<div className="App">
				 <Header /> 
				<div className="App-intro">
					<div className="container">
						<Form formData={formData} onChangeForm={this.onChangeForm} onSubmitForm={this.onSubmitForm} action={action} />

						<div className="col-xs-12">
							<Table customers={customers} edit={this.edit} onDelete={this.onDelete} />
						</div>
					</div>
				</div>
			</div>
		);
	}
 */
