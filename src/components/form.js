import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onSubmitForm, onUpdate} from '../redux/actions/index';

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

    textField(e, field) {
        this.setState({
            form: { ...this.state.form},
            [field]: e.target.value
        })
    }

    onUpdate(id){
        this.props.onUpdate(this.state.title, this.state.category); 
    }

    onSubmitForm(e){
        e.preventDefault();
        this.props.onSubmitForm(this.state.title, this.state.category);
    }
    

    render() {
        let { onSubmitForm} = this.props;
        return (
            <div className="col-xs-12">
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Title"  onChange={ e => this.textField(e, 'title')} />
                    </div>
                    <div className="form-group">
                        <select className="form-group" name="cats"  onChange={ e => this.textField(e, 'category')}>
                            <option value="Web Design">Web Design </option>
                            <option value="Mobile Dev">Mobile Dev </option>
                            <option value="Web Dev">Web Dev </option>
                        </select>
                    </div>
                        <button type="submit" className="btn btn-primary" onClick={(e) => {this.onSubmitForm(e)}}>  <span>Add</span> </button>
                </form>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ onSubmitForm, onUpdate }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Form);