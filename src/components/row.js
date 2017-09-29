import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onUpdate } from '../redux/actions/index';


const mapStateToProps = (state) => {
    return {
        user: state.user.books
    }
}

var defaults = {
	title: '',
	category: '',
};



class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            form: [...defaults]
        }
    }

    // componentDidMount() {
    //     let id = this.props.itemId;
	// 	axios({
	// 		url: `http://localhost:4000/customers/${id}`,
	// 		method: 'GET'
	// 	}).then(response => {
	// 		console.log('RESPONSE', response)
	// 	}).catch(error => {
	// 		console.log(error);
	// 	});
	// }



   
    textField(e, field) {
        this.setState({
            form: { ...this.state.form},
            [field]: e.target.value
        })
    }

    onUpdate(e, id){
        e.preventDefault();
        this.props.onUpdate(id, this.state.title, this.state.category);
    }

    render() {
        let { user } = this.props;

      let filteredCustomers = user.filter(
                    (data) => {
                    return data.id === this.props.itemId;
           
                }
            );
            // this.setState({
            //     title: filteredCustomers[0].title,
            //     category: filteredCustomers[0].category
            // });

        console.log(filteredCustomers);
        return (
            <div className="col-xs-12">
                <form >
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Title"   value={filteredCustomers[0].title} onChange={ e => this.textField(e, 'title')} />
                    </div>
                    <div className="form-group">
                        <select className="form-group" name="cats"  value={ filteredCustomers[0].category } onChange={ e => this.textField(e, 'category')}>
                            <option value="Web Design">Web Design </option>
                            <option value="Mobile Dev">Mobile Dev </option>
                            <option value="Web Dev">Web Dev </option>
                        </select>
                    </div>
                        
                        <button type="submit" className="btn btn-primary" onClick={(e) => {this.onUpdate(e, filteredCustomers[0].id)}}>  <span>Update</span> </button>
                </form>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ onUpdate }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Form);