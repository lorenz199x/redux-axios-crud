import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onUpdate } from '../redux/actions/index';


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
            category: '',
            userList: []
            // form: [...defaults]
        }
    }

   // componentDidMount() {
    //    let { user } = this.props;

    //   let filteredCustomers = user.filter(
    //                 (data) => {
    //                 return data.id === this.props.itemId;
           
    //             }
    //         );
    //         this.setState({
    //             title: filteredCustomers[0].title,
    //             category: filteredCustomers[0].category,
    //             userList: filteredCustomers

    //         });
	//}

    componentWillReceiveProps(){
        let { user } = this.props;
        let filteredCustomers = user.filter(
            (data) => {
                 return data.id === this.props.itemId;
            }
        );
        this.setState({
            title: filteredCustomers[0].title,
            category: filteredCustomers[0].category,
            userList: filteredCustomers
        });
    }

    onUpdate(e, id){
        e.preventDefault();
        this.props.onUpdate(id, this.state.title, this.state.category);
    }

    render() {
    
        return (
            <div className="col-xs-12">
                <form >
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
                        
                        <button type="submit" className="btn btn-primary" onClick={(e) => {this.onUpdate(e, this.state.userList[0].id)}}>  <span>Update</span> </button>
                </form>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ onUpdate }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Form);