import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onSubmitForm, onUpdate} from '../redux/actions/index';

const mapStateToProps = (state) => {
    return {
        user: state.user.books
    }
}

class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            category: ''
        }
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
                        Title: <input type="text" className="form-control" placeholder="Title" value={this.state.title} onChange={ e => this.setState({title: e.target.value})} />
                    </div>
                    <div className="form-group">
                       Category: <select className="form-group" name="cats"  value={this.state.category} onChange={ e => this.setState({category: e.target.value})}>
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