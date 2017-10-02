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
        this.handleQuery = this.handleQuery.bind(this);
        
        this.handleChange = this.handleChange.bind(this);
    }
   
   componentWillMount() {
    this.props.onChangeForm();
   }

    onDeleteForm(index){
        this.props.onDelete(index);
    }

    handleChange = (event) => {
        this.setState({
            search: event.target.value
            
        })
        this.handleQuery();
        
    }

    handleQuery() {
        let { user } = this.props;
        let user2 = [];
        
        this.props.user.forEach((user, index) => {
            if(user.title.toLowerCase().indexOf(this.state.search) > -1){
                user2.push(
                    user
                );
            }
        })
        this.setState({
            user2:user2
        });
        console.log('YOW', user2);
    }

    sortingName(){
        let { user } = this.props;
        let user2 = []
        this.setState(prevState => {
              this.state.user2.sort((a, b) => (a.title > b.title))
        });
        
    }

    componentWillReceiveProps (nextProps) {
        let { user } = this.props;
        let user2 = [];
        
        nextProps.user.forEach((user, index) => {
            if(user.title.toLowerCase().indexOf(this.state.search) > -1){
                user2.push(
                    user
                );
            }
        })
        this.setState({
            user2:user2
        });
        
        
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
                        <th> <input type="text" className="form-control" placeholder="Search" onChange={this.handleChange} /> </th>
                        <button onClick={this.sortingName}> sort </button>
                    </tr>
                </thead>
                <tbody>
                    {this.state.user2.map((user, index) => {
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