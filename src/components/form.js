import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onSubmitForm, onChangeForm } from '../redux/actions/index';

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

    componentDidMount() {
        //this.props.dispatch(onSubmitForm())
    }

    onSubmitForm(e){
        e.preventDefault();
        this.props.onSubmitForm(this.state.title, this.state.category);
        console.log('Button', this.state);
    }

    render() {
        let { onSubmitForm } = this.props;
        console.log('Button', this.state);
        return (
            <div className="col-xs-12">
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Title" onChange={ event => this.setState({title: event.target.value})} />
                    </div>
                    <div className="form-group">
                        <select className="form-group" name="cats" onChange={ event => this.setState({category: event.target.value})}>
                            <option value="Web Design">Web Design </option>
                            <option value="Mobile Dev">Mobile Dev </option>
                            <option value="Web Dev">Web Dev </option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(e) => {this.onSubmitForm(e)}}> 
                        {/*{(action === 'edit')
                            ? <span>Update</span>
                            : <span>Add</span>s
                        }*/}
                        
                    </button>
                </form>
            </div>
        )
    }
}


export default connect(mapStateToProps, {onSubmitForm})(Form);


/*return (
            <div className="col-xs-12">
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Title" value={formData.title} onChange={e => onChangeForm(e, 'title')} />
                    </div>
                    <div className="form-group">
                        {/*<input type="text" className="form-control" placeholder="Category" value={formData.category} onChange={e => onChangeForm(e, 'category')} />}
                        <select className="form-group" name="cats" value={formData.category} onChange={e => onChangeForm(e, 'category')} >
                            <option value="Web Design">Web Design </option>
                            <option value="Mobile Dev">Mobile Dev </option>
                            <option value="Web Dev">Web Dev </option>
                        </select>
                    </div>
                    {/*<div className="form-group">
                        <input type="number" className="form-control" placeholder="Age" value={formData.age} onChange={e => onChangeForm(e, 'age')} />
                    </div>}
                    <button type="submit" className="btn btn-primary">
                        {(action === 'edit')
                            ? <span>Update</span>
                            : <span>Add</span>
                        }
                    </button>
                </form>
            </div>
        )
    */


    // https://www.udemy.com/javascript-es6-tutorial/
    // https://www.udemy.com/meteor-react-tutorial/
    // https://www.udemy.com/react-redux/
    // https://www.udemy.com/react-redux-tutorial/