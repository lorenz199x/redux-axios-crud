import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onChangeForm, onDelete } from '../redux/actions/index';

const mapStateToProps = (store) => {
	return {
		user: store.user.books,
	}
};

class Table extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            user2: [],
        }
    }
   
    componentDidMount() {
        this.props.onChangeForm();
    }

    onDeleteForm(index){
        this.props.onDelete(index);
    }

    handleChange = (event) => {
        this.setState({
            search: event.target.value
            
        })
    }

    render() {
        
        let { user } = this.props;
        let user2 = [];
        this.props.user.forEach((user, index) => {
            if(user.title.toLowerCase().indexOf(this.state.search) > -1){
                user2.push(
                    this.props.user[index]
                );
            }
        })

        return (
            <table className="table table-inverse">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Actions</th>
                        <th> <input type="text" className="form-control" placeholder="Search" onChange={this.handleChange} /> </th>
                    </tr>
                </thead>
                <tbody>
                    {user2.map((user, index) => {
                            return (
                                 <tr  key={index} data={user}>
                                    <td> {user.title} </td>
                                    <td >{user.category}</td>
                                
                                    <td>
                                        <button className="btn btn-info" onClick={()=> this.props.onChangeEdit(user.id)} >Edit</button>
                                        <button className="btn btn-danger" onClick={e => {this.onDeleteForm(user.id)}}>Delete</button>
                                    </td>
                                </tr> 
                            )
                        })}
                </tbody>
            </table>
        )   
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ onChangeForm, onDelete }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps )(Table);