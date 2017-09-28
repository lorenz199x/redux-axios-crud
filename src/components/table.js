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
   
    componentDidMount() {
        this.props.onChangeForm();
    }

    onDeleteForm(index){
        this.props.onDelete(index);
    }

    render() {
        
        let { user } = this.props;
        return (
            <table className="table table-inverse">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Actions</th>
                        <th> <input type="text" className="form-control" placeholder="Search" /> </th>
                        <th> ^ </th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((user, index) => {
                            return (
                                 <tr  key={index}>
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