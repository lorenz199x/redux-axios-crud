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
        this.sortingName = this.sortingName.bind(this);        
        this.handleChange = this.handleChange.bind(this);
    }
   
   componentWillMount() {
    this.props.onChangeForm();
    console.log('componentWillMount');
   }

    onDeleteForm(index){
        this.props.onDelete(index);
    }

    handleChange = (event) => {
        this.setState({
            search: event.target.value
        }) 

        this.props.onChangeForm();
    }

    sortingName(){
    
        this.setState(prevState => {
              this.state.user2.sort((a, b) => (a.title > b.title))
        });
        console.log('sortingName');
    }

    componentWillReceiveProps (nextProps) {
        let user2 = [];
        
        nextProps.user.forEach((user, index) => {
            if(user.title.toLowerCase().indexOf(this.state.search) > -1){
                user2.push(
                    user
                );
            }
        })
        this.setState({
            user2
        });
        
    }

    render() {
        
        // let { user } = this.props;
         let user2 = [];
        
        // user.forEach((user, index) => {
        //     if(user.title.toLowerCase().indexOf(this.state.search) > -1){
        //         user2.push(
        //             this.props.user[index]
        //         );
        //     }
       

        return (
            <table className="table table-inverse">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Actions</th>
                        <th> <input type="text" className="form-control" placeholder="Search" onChange={this.handleChange} /> </th>
                        <th> <button onClick={this.sortingName}> sort </button></th>
                    </tr>
                </thead>
                <tbody>
                    {(this.state.search.length === 0 )? this.state.user2.map((user, index) => {
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
                        }): 
                        user2.map((user, index) => {
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
                        }) }
                </tbody>
            </table>
        )   
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ onChangeForm, onDelete }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps )(Table);